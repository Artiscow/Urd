/**
 * The handlers of the preview's messages: edits, moves, growth, the mobile review, sections, deletion and the sticky dock.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { DOCK_OPTIONS } from '../menu/options.js';
import { makeId } from '$engine/sections/presets.js';
import { claimAnchors } from '$engine/anchor-model.js';
import { ta } from '$engine/i18n.js';
import { fitMoves } from '$engine/push-model.js';
import { historyState } from './history.svelte.js';
import { pageState } from './page.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';

/** Screen-docked block dragged to a new anchor point in the preview. The
 *  dock point applies to both surfaces (a window anchor, not layout), so
 *  mobile review is not triggered. */
function handleStickyDock(msg) {
  const { section, block } = pageState.readBlock(msg.sectionId, msg.blockId);
  if (!section || !block?.sticky) return;
  if (!DOCK_OPTIONS.some(([value]) => value === msg.dock)) return;
  historyState.pushHistory(`sticky-dock:${msg.blockId}`);
  block.sticky = { ...block.sticky, dock: msg.dock };
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageState.pageId, section);
  pageState.syncSelectedBlock();
}

/** "Pin the group" from the multi-select bar: the whole selection shares
 *  one sticky group and is pinned as one unit, or dissolved again. ONE
 *  undo step for the whole selection, like the other group actions. */
function handleStickyGroup(msg) {
  const ids = msg.blockIds ?? [];
  const { section } = pageState.readBlock(msg.sectionId, ids[0]);
  if (!section || !ids.length) return;
  historyState.pushHistory(`sticky-group:${msg.sectionId}`);
  const group = msg.on ? makeId('stk') : null;
  for (const block of section.blocks) {
    if (!ids.includes(block.id)) continue;
    // Off: the pinning is removed entirely. On: existing offset/limit is
    // kept so a block that was already pinned does not lose its settings.
    block.sticky = group ? { offset: 16, until: null, ...block.sticky, group } : null;
  }
  pageState.markDesktopChange(section, 'block-edited');
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageState.pageId, section);
  pageState.syncSelectedBlock();
  shellState.setStatus(ta(msg.on ? 'status.stickyGrouped' : 'status.stickyUngrouped'));
}

/** Click-and-type change from the iframe: update the draft. The iframe
 *  already shows the change, so we do not push back (that would break focus). */
function handleEdit(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  const block = section?.blocks.find((b) => b.id === msg.blockId);
  if (!block) return;
  historyState.pushHistory(`edit:${msg.blockId}`);
  block.props = msg.props;
  pageState.store.save();
  historyState.updateDirty();
  if (pageState.selectedBlock?.blockId === msg.blockId) pageState.syncSelectedBlock();
  // The image editor requests a rerender on image swap (empty blocks
  // have no img to update live); text editing never does (an echo
  // mid-typing would lose the caret).
  if (msg.rerender) previewState.bridge?.sendSection(pageState.pageId, section);
  shellState.status = '';
  // Typing in a block that follows its content changes its height too; the
  // fit comes back without drawing the section again, so the caret stays.
  pageState.fitBlockSoon(section.id, block);
}

/** Drag/resize from the iframe: the iframe already shows the snapped
 *  position, so we just record it in the draft. */
function handleMove(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  const block = section?.blocks.find((b) => b.id === msg.blockId);
  if (!block) return;
  // coalesce: automatic growth during typing belongs to the same undo
  // step as the typing itself. groupKey (from the z reordering) gathers
  // moves of SEVERAL blocks into one step.
  historyState.pushHistory(msg.coalesce ? `edit:${msg.groupKey ?? msg.blockId}` : 'move-block');
  const key = msg.frameKey === 'mobile' ? 'mobile' : 'desktop';
  const width = block.frames.desktop?.w;
  block.frames[key] = msg.frame;
  if (key === 'desktop') pageState.markDesktopChange(section, 'desktop-changed-after-mobile');
  pageState.store.save();
  historyState.updateDirty();
  if (pageState.selectedBlock?.blockId === msg.blockId) pageState.syncSelectedBlock();
  // A block that follows its content flows in its new width, and its frame
  // is fitted to the height the content takes there (ADR-0025).
  if (key === 'desktop' && msg.frame?.w !== width) pageState.fitBlockSoon(section.id, block);
  // A block pinned to a new width in the row grid takes a new height on the phone.
  else if (key === 'mobile') pageState.phoneFitSoon(section.id, block);
}

/** A height the preview reports for a block (urd-grow): from a plugin copy
 *  of the former data-block plugins on its own render, or as the answer to
 *  the fit of a block that follows its content (`fit`, urd-fit-block). ONLY
 *  h changes, never x/y, so a dragged block is never teleported back. */
function handleGrow(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  const block = section?.blocks.find((b) => b.id === msg.blockId);
  if (!block?.frames?.desktop || block.frames.desktop.h === msg.h) return;
  if (msg.fit) {
    // A fit is for the desktop frame, and only the latest one asked for counts.
    if (previewState.viewMode === 'desktop' && msg.seq === pageState.fitSeq.get(msg.blockId)) applyFit(section, block, msg.h);
    return;
  }
  // Autogrowth is a MEASUREMENT, not an edit: data blocks report their
  // height on EVERY render, and the measurement varies with content,
  // feed responses and window. The measurement is therefore recorded in
  // BOTH the draft and the comparison baseline, so it never by itself
  // constitutes "unpublished changes".
  pageState.store.amendBaseline((base) => {
    const s = base.sections.find((x) => x.id === msg.sectionId);
    const b = s?.blocks.find((x) => x.id === msg.blockId);
    if (b?.frames?.desktop) b.frames.desktop.h = msg.h;
  });
  if (pageState.store.hasDraft()) historyState.pushHistory(`edit:${msg.blockId}`);
  block.frames.desktop.h = msg.h;
  // save() cleans the draft key when the measurement was the only difference.
  pageState.store.save();
  historyState.updateDirty();
  if (pageState.selectedBlock?.blockId === msg.blockId) pageState.syncSelectedBlock();
}

/** The frame of a block that follows its content, fitted to the height the
 *  content takes (ADR-0025 decision 5). The fit is part of the edit that
 *  asked for it: no undo step of its own, and it is a change to publish
 *  like the edit. A taller frame moves the blocks below as far as the push
 *  pass already showed them (fitMoves), so the page does not move, and the
 *  section's own height stays the owner's; the preview gets the frames
 *  without drawing the section again. */
function applyFit(section, block, h) {
  const moves = fitMoves(section.blocks, block.id, h);
  const frames = {};
  block.frames.desktop = { ...block.frames.desktop, h };
  frames[block.id] = block.frames.desktop;
  for (const [id, y] of moves) {
    const other = section.blocks.find((b) => b.id === id);
    if (!other?.frames?.desktop) continue;
    other.frames.desktop = { ...other.frames.desktop, y };
    frames[id] = other.frames.desktop;
  }
  pageState.markDesktopChange(section, 'block-edited');
  pageState.store.save();
  historyState.updateDirty();
  if (pageState.selectedBlock?.blockId === block.id) pageState.syncSelectedBlock();
  previewState.bridge?.sendFrames(section.id, $state.snapshot(frames));
}

/** ↺ in mobile view: reset mobile overrides, the whole section or one
 *  block (ADR-0019). hideMobile is kept: visibility is intent. */
function handleMobileReset(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  if (!section) return;
  historyState.pushHistory('mobile-reset');
  if (msg.blockId) {
    const block = section.blocks.find((b) => b.id === msg.blockId);
    if (block) block.frames.mobile = null;
  } else {
    for (const block of section.blocks) block.frames.mobile = null;
  }
  // Without overrides there is nothing left that can drift from desktop.
  if (!pageState.hasMobileOverrides(section) && section.responsive?.mobile) {
    section.responsive.mobile.attention = null;
  }
  pageState.store.save();
  historyState.updateDirty();
  shellState.updateAttention();
  previewState.bridge?.sendSection(pageState.pageId, section);
}

/** Arrow move in the mobile reading order: record the new mobileOrder
 *  key and rerender the section, so the auto placement reshuffles. */
function handleMobileOrder(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  const block = section?.blocks.find((b) => b.id === msg.blockId);
  if (!block || typeof msg.mobileOrder !== 'number') return;
  historyState.pushHistory('mobile-order');
  block.mobileOrder = msg.mobileOrder;
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageState.pageId, section);
}

/** ✓ in mobile view: the mobile layout has been reviewed. */
function handleReviewDone(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  if (!section?.responsive?.mobile) return;
  historyState.pushHistory('review-done');
  section.responsive.mobile.attention = null;
  pageState.store.save();
  historyState.updateDirty();
  shellState.updateAttention();
}

/** Block flags from the preview: decor (the entrance wave) and/or hideMobile. */
/** A pasted style's block-level fields (block-style.js): animation, hover, size, height and fit, written as one undo step; null clears a field. */
const STYLE_FIELDS = ['animation', 'hover', 'size', 'sizeMin', 'sizeMax', 'height', 'fit', 'fitMin'];
function handleBlockStyle(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  const block = section?.blocks.find((b) => b.id === msg.blockId);
  if (!block || !msg.fields || typeof msg.fields !== 'object') return;
  historyState.pushHistory('block-style');
  for (const key of STYLE_FIELDS) {
    if (!(key in msg.fields)) continue;
    if (msg.fields[key] === null || msg.fields[key] === undefined) delete block[key];
    else block[key] = structuredClone(msg.fields[key]);
  }
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageState.pageId, section);
  if (pageState.selectedBlock?.blockId === msg.blockId) pageState.syncSelectedBlock();
}

function handleBlockFlag(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  const block = section?.blocks.find((b) => b.id === msg.blockId);
  if (!block) return;
  historyState.pushHistory('block-flag');
  if (typeof msg.decor === 'boolean') block.decor = msg.decor;
  if (typeof msg.hideMobile === 'boolean') block.hideMobile = msg.hideMobile;
  pageState.store.save();
  historyState.updateDirty();
  // hideMobile changes the mobile render; in mobile view the section
  // must be redrawn for the block to actually appear or disappear.
  if (typeof msg.hideMobile === 'boolean' && previewState.viewMode === 'mobile') {
    previewState.bridge?.sendSection(pageState.pageId, section);
  }
  if (pageState.selectedBlock?.blockId === msg.blockId) pageState.syncSelectedBlock();
}

/** New section from "+ New section" in the iframe (the section is
 *  already built by the preset's create() in there). */
function handleAddSection(msg) {
  historyState.pushHistory('add-section');
  // Guard: a section MUST have an id (the schema requires it). The core
  // presets set it themselves, but a plugin preset can forget it, and an
  // id-less section would make the page file invalid on publish. Assign
  // one here if it is missing.
  if (!msg.section.id) msg.section.id = makeId('sec');
  // Names the page already uses arrive as name-2 (a section template).
  claimAnchors([msg.section], pageState.store.data);
  pageState.store.data.sections.splice(msg.index, 0, msg.section);
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendPage(pageState.pageId, pageState.store.data);
  // The new section is selected and Properties opens, ready for tuning.
  pageState.activeSectionId = msg.section.id;
  pageState.syncSectionMirrors(msg.section);
  // The grid overlay has its own toggle; a panel switch does not touch it.
  shellState.activePanel = 'properties';
}

function handleMoveSection(msg) {
  const s = pageState.store.data.sections;
  const i = s.findIndex((x) => x.id === msg.sectionId);
  const j = i + msg.dir;
  if (i < 0 || j < 0 || j >= s.length) return;
  historyState.pushHistory('move-section');
  [s[i], s[j]] = [s[j], s[i]];
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendPage(pageState.pageId, pageState.store.data);
}

function handleDeleteSection(msg) {
  historyState.pushHistory('delete-section');
  if (msg.sectionId === pageState.activeSectionId) {
    pageState.activeSectionId = null;
    pageState.sectionGrid = null;
  }
  // A selected block in the deleted section must not linger in the Properties panel.
  if (pageState.selectedBlock?.sectionId === msg.sectionId) pageState.selectedBlock = null;
  pageState.store.data.sections = pageState.store.data.sections.filter((x) => x.id !== msg.sectionId);
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendPage(pageState.pageId, pageState.store.data);
}

/** Height drag in the iframe: the iframe already shows the new height,
 *  so we just record it. */
function handleSectionSize(msg) {
  const section = pageState.store.data.sections.find((x) => x.id === msg.sectionId);
  if (!section) return;
  historyState.pushHistory('section-size');
  section.size = { ...section.size, minHeight: msg.minHeight };
  // The top-edge handle: the section grew/shrank at the top, and all the
  // blocks are shifted in the SAME undo step (the content stood visually
  // still in the preview; the new y values are recorded here).
  for (const move of msg.moves ?? []) {
    const block = section.blocks.find((b) => b.id === move.blockId);
    if (!block) continue;
    block.frames.desktop = { ...block.frames.desktop, y: block.frames.desktop.y + move.dy };
  }
  if (msg.moves?.length) {
    pageState.markDesktopChange(section, 'section-height');
    if (pageState.selectedBlock?.sectionId === msg.sectionId) pageState.syncSelectedBlock();
  }
  if (msg.sectionId === pageState.activeSectionId) pageState.sectionMinHeight = msg.minHeight;
  pageState.store.save();
  historyState.updateDirty();
}

/** Block dropped in another section: move it there in the draft. */
function handleMoveBlockSection(msg) {
  const from = pageState.store.data.sections.find((s) => s.id === msg.fromSectionId);
  const to = pageState.store.data.sections.find((s) => s.id === msg.toSectionId);
  const block = from?.blocks.find((b) => b.id === msg.blockId);
  if (!from || !to || !block) return;
  // groupKey: the drop belongs to the undo step of the frames its drag
  // settled in the source section.
  historyState.pushHistory(msg.groupKey ? `edit:${msg.groupKey}` : 'move-block');
  from.blocks = from.blocks.filter((b) => b.id !== msg.blockId);
  block.frames.desktop = msg.frame;
  // The mobile layout is re-derived in the new section.
  block.frames.mobile = null;
  to.blocks.push(block);
  pageState.markDesktopChange(from, 'block-moved');
  pageState.markDesktopChange(to, 'block-moved');
  pageState.store.save();
  historyState.updateDirty();
  shellState.updateAttention();
  // Only the two sections, never the whole page: a full send rebuilds the
  // document from scratch, and the browser clamps the scroll position
  // while it is collapsed. No section is added, removed or reordered here.
  previewState.bridge?.sendSection(pageState.pageId, from);
  previewState.bridge?.sendSection(pageState.pageId, to);
  if (pageState.selectedBlock?.blockId === msg.blockId) {
    pageState.selectedBlock = { ...pageState.selectedBlock, sectionId: msg.toSectionId };
    pageState.syncSelectedBlock();
  }
}

/** Deletion: remove from the draft and rerender the section in the iframe. */
function handleDelete(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  if (!section) return;
  // blockIds (multi-select): the whole selection is deleted as ONE undo step.
  const ids = msg.blockIds ?? [msg.blockId];
  historyState.pushHistory('delete-block');
  section.blocks = section.blocks.filter((b) => !ids.includes(b.id));
  if (ids.includes(pageState.selectedBlock?.blockId)) pageState.selectedBlock = null;
  pageState.markDesktopChange(section, 'block-deleted');
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageState.pageId, section);
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const bridgeState = {
  handleStickyDock,
  handleStickyGroup,
  handleEdit,
  handleMove,
  handleGrow,
  applyFit,
  handleMobileReset,
  handleMobileOrder,
  handleReviewDone,
  handleBlockFlag,
  handleBlockStyle,
  handleAddSection,
  handleMoveSection,
  handleDeleteSection,
  handleSectionSize,
  handleMoveBlockSection,
  handleDelete,
};
