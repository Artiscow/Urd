/**
 * The handlers of the preview's messages: edits, moves, growth, the mobile review, sections, deletion and the sticky dock.
 */
import { DOCK_OPTIONS } from '../menu/options.js';
import { makeId } from '$engine/sections/presets.js';
import { claimAnchors } from '$engine/anchor-model.js';
import { duplicatedSection } from '../lib/duplicate.js';
import { pasteIndex } from '$engine/clipboard-model.js';
import { ta } from '$engine/i18n.js';
import { fitMoves, shapeHeight, followsContent, PHONE_DESIGNS, PHONE_WORDS, phoneWordsOf, phoneWordsChange } from '$engine/push-model.js';
import { wholeStyleHtml } from '$engine/text-whole.js';
import { flowing, unpinned } from '$engine/phone-moves.js';
import { historyState } from './history.svelte.js';
import { pageState } from './page.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';

/** A screen-docked block dragged to a new dock point in the preview, which holds on both screens and so asks no phone review. */
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

/** "Pin the group" from the multi-select bar: the selection shares one sticky group and is pinned as one, or dissolved, in one undo step. */
function handleStickyGroup(msg) {
  const ids = msg.blockIds ?? [];
  const { section } = pageState.readBlock(msg.sectionId, ids[0]);
  if (!section || !ids.length) return;
  historyState.pushHistory(`sticky-group:${msg.sectionId}`);
  const group = msg.on ? makeId('stk') : null;
  // Pinning on the phone too is the group's one choice, kept when any of its blocks had it.
  const phone = section.blocks.some((block) => ids.includes(block.id) && block.sticky?.phone === true);
  for (const block of section.blocks) {
    if (!ids.includes(block.id)) continue;
    // Off removes the pinning; on keeps a pinned block's own offset and limit.
    block.sticky = group ? { offset: 16, until: null, ...block.sticky, group } : null;
    if (block.sticky) {
      if (phone) block.sticky.phone = true;
      else delete block.sticky.phone;
    }
  }
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageState.pageId, section);
  pageState.syncSelectedBlock();
  shellState.setStatus(ta(msg.on ? 'status.stickyGrouped' : 'status.stickyUngrouped'));
}

/** A block's words as the draft holds them, the desktop's and the phone's own, handed to the page's copy of its section without drawing it again (urd-block-words). */
function sendWords(section, block) {
  previewState.bridge?.sendBlockWords(section.id, block.id, $state.snapshot(block.props), block.phoneProps ? $state.snapshot(block.phoneProps) : null);
}

/** A click-and-type change from the iframe, written into the draft; the iframe already shows it, so nothing is sent back. */
function handleEdit(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  const block = section?.blocks.find((b) => b.id === msg.blockId);
  if (!block) return;
  // The caret where the typing began goes with the step, for the undo to put back.
  const caret = Number.isFinite(msg.caret) ? { blockId: msg.blockId, offset: msg.caret } : null;
  // Words written in the phone view go into phoneProps (ADR-0033), those equal to the desktop's left out; the desktop's props and frame stay.
  if (msg.phone) {
    historyState.pushHistory(`edit:phone-words-${msg.blockId}`, { caret });
    const words = phoneWordsChange(block.type, block.props, block.phoneProps, msg.props ?? {});
    if (words) block.phoneProps = words;
    else {
      delete block.phoneProps;
      pageState.clearReviewWithoutOverrides(section);
    }
    pageState.store.save();
    historyState.updateDirty();
    if (pageState.selectedBlock?.blockId === msg.blockId) pageState.syncSelectedBlock();
    // The page keeps the words in its own copy without drawing the block again, so the caret stays and a later drawing reads them.
    sendWords(section, block);
    shellState.status = '';
    return;
  }
  historyState.pushHistory(`edit:${msg.blockId}`, { caret });
  // A font or size for the whole text, set in the desktop view, reaches the phone's words in the same step (ADR-0033) and asks no review.
  const whole = pageState.takeWholeStyle(msg.blockId);
  if (whole && typeof block.phoneProps?.html === 'string') block.phoneProps = { ...block.phoneProps, html: wholeStyleHtml(block.phoneProps.html, whole) };
  // The desktop's words changed under words of the phone's own: the section is flagged for the phone's review, naming the block.
  else if (Object.keys(phoneWordsOf(block.type, block.phoneProps)).length && (PHONE_WORDS[block.type] ?? []).some((key) => msg.props?.[key] !== block.props?.[key])) {
    pageState.markWordsBehind(section, block.id);
  }
  // An edit on the canvas keeps the block's stored design, though a block drawn in its phone design (PHONE_DESIGNS) sends that design back.
  const props = { ...msg.props };
  const designProp = PHONE_DESIGNS[block.type];
  if (designProp) {
    if (block.props?.[designProp] === undefined) delete props[designProp];
    else props[designProp] = block.props[designProp];
  }
  block.props = props;
  pageState.store.save();
  historyState.updateDirty();
  if (pageState.selectedBlock?.blockId === msg.blockId) pageState.syncSelectedBlock();
  sendWords(section, block);
  // The image editor asks for a redraw as an image is swapped; text editing never does, as it would lose the caret.
  if (msg.rerender) previewState.bridge?.sendSection(pageState.pageId, section);
  shellState.status = '';
  // Typing in a block that follows its content changes its height; the fit comes back without drawing the section again, so the caret stays.
  pageState.fitBlockSoon(section.id, block);
}

/** A block with a phone design crossed its width's line in the preview: the section is sent again from the draft, with all typed since, in the other design. */
function handleRedrawSection(msg) {
  const section = pageState.store?.data.sections.find((s) => s.id === msg.sectionId);
  if (section) previewState.bridge?.sendSection(pageState.pageId, section);
}

/** A drag or a resize from the iframe, which already shows the snapped frame, written into the draft. */
function handleMove(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  const block = section?.blocks.find((b) => b.id === msg.blockId);
  if (!block) return;
  // coalesce: growth while typing joins the typing's undo step; groupKey (the z reordering) gathers the moves of several blocks into one step.
  historyState.pushHistory(msg.coalesce ? `edit:${msg.groupKey ?? msg.blockId}` : 'move-block');
  const key = msg.frameKey === 'mobile' ? 'mobile' : 'desktop';
  const width = block.frames.desktop?.w;
  const phoneWidth = block.frames.mobile?.w;
  const before = key === 'desktop' ? pageState.pinnedKey(section) : null;
  block.frames[key] = msg.frame;
  // A block placed on the phone takes or gives back the room below the section's blocks in the same step, so the section keeps its height.
  if (key === 'mobile' && Number.isInteger(msg.room?.bottom) && msg.room.bottom >= 0) pageState.writePhoneRoom(section, 'bottom', msg.room.bottom);
  // The section's other blocks pinned on the phone, given the rows that keep them where they stood as the grid changed under them, in the same step.
  if (key === 'mobile' && Array.isArray(msg.others)) {
    for (const other of msg.others) {
      const pinned = section.blocks.find((b) => b.id === other?.blockId && b.id !== block.id);
      if (pinned && Number.isInteger(other.frame?.row) && other.frame.row > 0 && Number.isFinite(pinned.frames.mobile?.row)) pinned.frames.mobile = { ...pinned.frames.mobile, row: other.frame.row };
    }
  }
  // A desktop move that reshaped the phone around a pinned block flags it for review; a move on the phone is seen as it is made.
  if (key === 'desktop') pageState.markPinnedMoved(section, before);
  else pageState.phoneSeen([section.id]);
  pageState.store.save();
  historyState.updateDirty();
  if (pageState.selectedBlock?.blockId === msg.blockId) pageState.syncSelectedBlock();
  // A block that follows its content flows in its new width, its frame fitted to the height the content takes there (ADR-0025).
  if (key === 'desktop' && msg.frame?.w !== width) pageState.fitBlockSoon(section.id, block);
  // A block pinned to a new width in the row grid takes a new height on the phone.
  else if (key === 'mobile' && msg.frame?.w !== phoneWidth) pageState.phoneFitSoon(section.id, block);
}

/** A height the preview reports (urd-grow): a plugin copy's own, or the fit of a block that follows its content (`fit`); only h changes, never x or y. */
function handleGrow(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  const block = section?.blocks.find((b) => b.id === msg.blockId);
  if (!block?.frames?.desktop) return;
  if (msg.fit) {
    // A fit counts only for a block that still follows its content, and only the latest one asked for.
    if (!followsContent(block)) return;
    // A video that keeps a shape takes the height its width gives at the design width, whatever width the preview's surface has.
    const h = shapeHeight(block, pageState.designWidth(section.id)) || msg.h;
    if (block.frames.desktop.h !== h && previewState.viewMode === 'desktop' && msg.seq === pageState.fitSeq.get(msg.blockId)) applyFit(section, block, h);
    return;
  }
  if (block.frames.desktop.h === msg.h) return;
  // A plugin copy's own height is a measurement, not an edit (ADR-0024): written into the draft in memory and the baseline both, and not stored.
  pageState.store.amendBaseline((base) => {
    const s = base.sections.find((x) => x.id === msg.sectionId);
    const b = s?.blocks.find((x) => x.id === msg.blockId);
    if (b?.frames?.desktop) b.frames.desktop.h = msg.h;
  });
  block.frames.desktop.h = msg.h;
  if (pageState.selectedBlock?.blockId === msg.blockId) pageState.syncSelectedBlock();
}

/** Fits a block that follows its content to its height (ADR-0025) within the edit that asked, moving the blocks below as the push pass showed them (fitMoves). */
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
  pageState.store.save();
  historyState.updateDirty();
  if (pageState.selectedBlock?.blockId === block.id) pageState.syncSelectedBlock();
  previewState.bridge?.sendFrames(section.id, $state.snapshot(frames));
}

/** A block pinned on the phone unpinned: back into the phone's order, its cells and turn kept; a section left with nothing that can fall behind loses its flag. */
function handlePhoneUnpin(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  const block = section?.blocks.find((b) => b.id === msg.blockId);
  if (!block || flowing(block)) return;
  historyState.pushHistory('phone-unpin');
  block.frames.mobile = unpinned(block.frames.mobile);
  pageState.clearReviewWithoutOverrides(section);
  pageState.store.save();
  historyState.updateDirty();
  if (pageState.selectedBlock?.blockId === block.id) pageState.syncSelectedBlock();
  previewState.bridge?.sendSection(pageState.pageId, section);
}

/** ↺ in mobile view: resets the mobile frames of the whole section or one block (ADR-0019), keeping hideMobile. */
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
  pageState.clearReviewWithoutOverrides(section);
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageState.pageId, section);
}

/** A move in the phone's reading order from the preview (the bar's arrows, Alt with an arrow key), one undo step; a burst of keys is one step. */
function handlePhoneOrder(msg) {
  pageState.changeSectionPhone(msg.sectionId, msg.change, msg.coalesce ? `edit:phone-step-${msg.blockId}` : 'phone-order');
}

/** A preset of the phone view's «Phone layout» strip (phone-layouts.js): its cells, and the order it reads, one undo step. */
function handlePhoneLayout(msg) {
  pageState.changeSectionPhone(msg.sectionId, msg.change, msg.follow ? 'phone-layout:then' : 'phone-layout');
  // A preset makes the blocks it puts side by side the same height, as part of its step.
  if (msg.preset) previewState.bridge?.sendPhoneSameHeight(msg.sectionId, true);
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

/** A pasted style's block-level fields (block-style.js): animation, hover, size and the phone's own, height and fit, written as one undo step; null clears a field. */
const STYLE_FIELDS = ['animation', 'hover', 'size', 'phoneSize', 'sizeMin', 'sizeMax', 'height', 'fit', 'fitMin'];
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

/** Block flags from the preview: decor (the entrance wave), hideMobile, and hideDesktop taken away from the desktop section bar's list. */
function handleBlockFlag(msg) {
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  const block = section?.blocks.find((b) => b.id === msg.blockId);
  if (!block) return;
  historyState.pushHistory('block-flag');
  const phoneOnly = Boolean(block.hideDesktop);
  if (typeof msg.decor === 'boolean') block.decor = msg.decor;
  if (typeof msg.hideMobile === 'boolean') block.hideMobile = msg.hideMobile;
  // Hidden on phones and shown on phones only cannot both hold: hiding on phones lifts the other, as the menu's switch does (setBlockHideMobile).
  if (msg.hideMobile === true || msg.hideDesktop === false) delete block.hideDesktop;
  pageState.store.save();
  historyState.updateDirty();
  // hideMobile changes the mobile render and hideDesktop the desktop's; in that view the section must be redrawn for the block to actually appear or disappear.
  if ((typeof msg.hideMobile === 'boolean' && previewState.viewMode === 'mobile') || (phoneOnly && !block.hideDesktop && previewState.viewMode === 'desktop')) {
    previewState.bridge?.sendSection(pageState.pageId, section);
  }
  if (pageState.selectedBlock?.blockId === msg.blockId) pageState.syncSelectedBlock();
}

/** A new section from the iframe, built there by its preset's create(). */
function handleAddSection(msg) {
  historyState.pushHistory('add-section');
  // A section the preset gave no id gets one, as the schema requires.
  if (!msg.section.id) msg.section.id = makeId('sec');
  // Names the page already uses arrive as name-2 (a section template).
  claimAnchors([msg.section], pageState.store.data);
  pageState.store.data.sections.splice(msg.index, 0, msg.section);
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendPage(pageState.pageId, pageState.store.data);
  // The new section is selected, on the page too, and Properties opens, ready for tuning.
  previewState.bridge?.sendActiveSection(msg.section.id);
  pageState.activeSectionId = msg.section.id;
  pageState.syncSectionMirrors(msg.section);
  // The grid overlay has its own toggle; a panel switch does not touch it.
  shellState.activePanel = 'properties';
}

/** Duplicates a section from its toolbar or right-click menu: the copy lands below with fresh ids and free anchor names, selected, in one undo step. */
function handleDuplicateSection(msg) {
  const copy = duplicatedSection(pageState.store.data, msg.sectionId, makeId);
  if (!copy) return;
  historyState.pushHistory('duplicate-section');
  pageState.store.data.sections.splice(copy.index, 0, copy.section);
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendPage(pageState.pageId, pageState.store.data);
  previewState.bridge?.sendActiveSection(copy.section.id);
  pageState.activeSectionId = copy.section.id;
  pageState.syncSectionMirrors(copy.section);
  shellState.activePanel = 'properties';
}

/** The last copy or cut on the page (the urd-clipboard message, a plain object): handed to every page the preview loads, so it pastes on another page. */
let clipboard = null;

/** A copy or a cut in the preview: kept for the next page, and named in the status line. */
function handleClipboard(msg) {
  const clip = msg.clipboard;
  if (!clip || typeof clip !== 'object') return;
  clipboard = clip;
  const cut = msg.cut === true;
  if (clip.kind === 'section') {
    shellState.setStatus(ta(cut ? 'status.sectionCut' : 'status.sectionCopied'), 'ok');
    return;
  }
  const n = Array.isArray(clip.blocks) ? clip.blocks.length : 0;
  shellState.setStatus(ta(`${cut ? 'status.blocksCut' : 'status.blocksCopied'}${n === 1 ? '.one' : ''}`, { n }), 'ok');
}

/** A section pasted from the clipboard, already with fresh ids: below the section named, or last, as a new section lands. */
function handlePasteSection(msg) {
  if (!msg.section || typeof msg.section !== 'object') return;
  handleAddSection({ index: pasteIndex(pageState.store.data.sections, msg.afterId ?? null), section: msg.section });
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
    // The section's settings, open in the floating menu, go with it.
    if (pageState.blockMenu?.section) pageState.blockMenu = null;
  }
  // A selected block in the deleted section must not linger in the Properties panel.
  if (pageState.selectedBlock?.sectionId === msg.sectionId) pageState.selectedBlock = null;
  pageState.store.data.sections = pageState.store.data.sections.filter((x) => x.id !== msg.sectionId);
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendPage(pageState.pageId, pageState.store.data);
}

/** A height drag in the iframe, which already shows the new height, written into the draft. */
function handleSectionSize(msg) {
  const section = pageState.store.data.sections.find((x) => x.id === msg.sectionId);
  if (!section) return;
  historyState.pushHistory('section-size');
  section.size = { ...section.size, minHeight: msg.minHeight };
  // The seam grip changed the section at its top: its blocks' new y values, which kept them still in the preview, go into the same undo step.
  for (const move of msg.moves ?? []) {
    const block = section.blocks.find((b) => b.id === move.blockId);
    if (!block) continue;
    block.frames.desktop = { ...block.frames.desktop, y: block.frames.desktop.y + move.dy };
  }
  if (msg.moves?.length) {
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
  // groupKey: the drop joins the undo step of the frames its drag settled in the source section.
  historyState.pushHistory(msg.groupKey ? `edit:${msg.groupKey}` : 'move-block');
  from.blocks = from.blocks.filter((b) => b.id !== msg.blockId);
  block.frames.desktop = msg.frame;
  // The mobile layout is re-derived in the new section, and a place in the phone order, which names blocks of the old one, is left behind.
  block.frames.mobile = null;
  delete block.phonePlace;
  to.blocks.push(block);
  pageState.markPinnedBehind(from);
  pageState.markPinnedBehind(to);
  pageState.clearReviewWithoutOverrides(from);
  pageState.store.save();
  historyState.updateDirty();
  shellState.updateAttention();
  // Only the two sections are sent, not the whole page, so the canvas keeps its scroll.
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
  pageState.markPinnedBehind(section);
  // A deleted block may have been the last that could fall behind: the flag goes with it.
  pageState.clearReviewWithoutOverrides(section);
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageState.pageId, section);
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const bridgeState = {
  handleStickyDock,
  handleStickyGroup,
  handleEdit,
  handleRedrawSection,
  handleMove,
  handleGrow,
  applyFit,
  handleMobileReset,
  handlePhoneUnpin,
  handlePhoneOrder,
  handlePhoneLayout,
  handleReviewDone,
  handleBlockFlag,
  handleBlockStyle,
  handleAddSection,
  handleDuplicateSection,
  handleClipboard,
  handlePasteSection,
  get clipboard() { return clipboard; },
  handleMoveSection,
  handleDeleteSection,
  handleSectionSize,
  handleMoveBlockSection,
  handleDelete,
};
