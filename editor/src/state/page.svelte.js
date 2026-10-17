/**
 * The page draft: the store, the selected block and its mutators, the fits, the section mirrors and their mutators, the animations, and the page switch.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { tick } from 'svelte';
import { measureMenuRoom as measureRoom, menu, MENU_WIDE_W, chooseArea } from '../menu/state.svelte.js';
import { placeBesideBlock, clampPlace } from '../lib/menu-place.js';
import { ta } from '$engine/i18n.js';
import { followsContent, FETCHES_CONTENT, blockSize, fitMoves, sizeRange, SIZE_TEXT, STRETCHES } from '$engine/push-model.js';
import { createPhoneFit } from '../lib/phone-fit.js';
import { calDesign, calView, calPhoneView, calCardDesign } from '$engine/calendar-designs.js';
import { coreAnimations } from '$engine/animations/core.js';
import { PAGE_SCHEMA_VERSION, liftPageFile } from '$engine/migrate.js';
import { makeId } from '$engine/sections/presets.js';
import { createDraftStore } from '../lib/draftStore.js';
import { collectionsState } from './collections.svelte.js';
import { historyState } from './history.svelte.js';
import { mediaState } from './media.svelte.js';
import { pluginsState } from './plugins.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';
import { siteState } from './site.svelte.js';

let pageId = $state(null);

/**
 * Desktop structure change in a manually mobile-adapted section:
 * flag the section for mobile review (rules in docs/SCHEMA.md#mobile-review).
 */
/** "Switch layout": the variant's frames + minHeight are recorded as ONE
 *  undo step; mobile review is flagged as for other desktop changes. */
function handleApplyLayout(msg) {
  const section = store.data.sections.find((x) => x.id === msg.sectionId);
  if (!section) return;
  historyState.pushHistory('layout');
  for (const move of msg.frames ?? []) {
    const block = section.blocks.find((b) => b.id === move.blockId);
    if (block) block.frames.desktop = { ...block.frames.desktop, ...move.frame };
  }
  section.size = { ...section.size, minHeight: msg.minHeight };
  markDesktopChange(section, 'layout-changed');
  if (msg.sectionId === activeSectionId) sectionMinHeight = msg.minHeight;
  if (selectedBlock?.sectionId === msg.sectionId) syncSelectedBlock();
  store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageId, section);
}

/** Does the section have at least one block with a mobile override (ADR-0019)? */
function hasMobileOverrides(section) {
  return section?.blocks?.some((b) => b.frames?.mobile) ?? false;
}

function markDesktopChange(section, reason) {
  // Only sections with overrides can drift from desktop; the rest are
  // re-derived on every render and never need review.
  if (!section || !hasMobileOverrides(section)) return;
  if (section.responsive?.mobile?.attention?.needed) return;
  section.responsive = {
    ...(section.responsive ?? {}),
    mobile: {
      ...(section.responsive?.mobile ?? { mode: 'auto' }),
      attention: { needed: true, reason, since: new Date().toISOString() },
    },
  };
  shellState.updateAttention();
  previewState.bridge?.sendAttention(section.id, true);
}

let store = null;

/**
 * Newly published pages that do not yet exist on the server: the draft is
 * kept as the source until the deploy finishes, but must not count as
 * "unpublished". Cleaned up automatically the first time the page is
 * loaded from the server.
 */
const pendingPublished = new Set();

const pageEntry = () => siteState.siteDraft.pages.find((p) => p.id === pageId);

/**
 * The selected block in the preview, as a reactive COPY for the
 * Properties panel (the draft data itself is not reactive). Synced from
 * the draft on selection, on panel changes and on changes made in the
 * iframe.
 */
let selectedBlock = $state(null);

function readBlock(sectionId, blockId) {
  const section = store?.data.sections.find((s) => s.id === sectionId);
  const block = section?.blocks.find((b) => b.id === blockId);
  return { section, block };
}

function syncSelectedBlock() {
  if (!selectedBlock) return;
  const { block } = readBlock(selectedBlock.sectionId, selectedBlock.blockId);
  if (!block) {
    selectedBlock = null;
    return;
  }
  selectedBlock = {
    sectionId: selectedBlock.sectionId,
    blockId: selectedBlock.blockId,
    type: block.type,
    decor: Boolean(block.decor),
    hideMobile: Boolean(block.hideMobile),
    fit: block.fit === 'shrink' || block.fit === 'both' ? block.fit : undefined,
    fitMin: typeof block.fitMin === 'number' ? block.fitMin : undefined,
    size: typeof block.size === 'number' ? block.size : undefined,
    sizeMin: typeof block.sizeMin === 'number' ? block.sizeMin : undefined,
    sizeMax: typeof block.sizeMax === 'number' ? block.sizeMax : undefined,
    height: block.height ? JSON.parse(JSON.stringify(block.height)) : null,
    props: JSON.parse(JSON.stringify(block.props)),
    frame: { ...block.frames.desktop },
    // The phone placement: the row the block is pinned to, or null while it flows in the reading order (ADR-0019).
    mobileRow: Number.isFinite(block.frames.mobile?.row) ? block.frames.mobile.row : null,
    animation: block.animation ? JSON.parse(JSON.stringify(block.animation)) : null,
    hover: block.hover ? JSON.parse(JSON.stringify(block.hover)) : null,
    sticky: block.sticky ? JSON.parse(JSON.stringify(block.sticky)) : null,
  };
}

function onSelectBlock(msg) {
  // A click in the preview (block or canvas) closes the block menu.
  // onBlockMenu calls this BEFORE opening the menu, so reopening works.
  blockMenu = null;
  if (!msg.blockId) {
    selectedBlock = null;
    return;
  }
  selectedBlock = { sectionId: msg.sectionId, blockId: msg.blockId };
  // The block's section becomes the palette target (block gestures do not
  // post urd-select-section, so Properties is not torn from the block to
  // the section).
  if (msg.sectionId) activeSectionId = msg.sectionId;
  syncSelectedBlock();
  // Only a NEW SECTION opens the Properties panel automatically; a block
  // click never does.
}

/** The block menu (the gear on the block's toolbar): position in editor
 *  coordinates, null = closed. The content is the same snippet as the
 *  Properties panel. */
let blockMenu = $state(null);

/** The room for the floating menu (menu/state.svelte.js): measured from
 *  the preview frame's left edge, and again when the window resizes while
 *  the menu is open. */
function measureMenuRoom() {
  measureRoom(previewState.frameWrapEl?.getBoundingClientRect().left ?? 0);
}

/** The design picker (DesignPicker) over the editor: 'set' changes the selected calendar's design, 'add' adds a calendar in the chosen design; null = closed. */
let designPicker = $state(null);

/** The element menu's search belongs to one block's menu, so another
 *  block, or the floating menu closing, empties it (menu/state.svelte.js). */
let searchBlockId = null;

/** 1, 2 or 3 pressed on a selected block in the preview: the area in the floating menu when it is open, else in the Properties panel, which is opened. */
function onMenuArea(msg) {
  if (!selectedBlock) return;
  if (!blockMenu) shellState.activePanel = 'properties';
  tick().then(() => chooseArea(msg.area, document.querySelector('.block-menu') ?? document.querySelector('.panel-body')));
}

/** The block the floating menu was opened at, in the iframe's own coordinates, so «back beside the block» can place the menu again. */
let menuAnchor = null;

function onBlockMenu(msg) {
  onSelectBlock(msg);
  if (!selectedBlock) return;
  menuAnchor = msg.rect;
  blockMenu = menuPlaceFor(msg.rect);
}

/** The menu's box as the stylesheet sizes it (app.css .block-menu): the width for the chosen form, the height its ceiling. */
function menuSize() {
  measureMenuRoom();
  return {
    w: Math.min(menu.wide && menu.room >= MENU_WIDE_W ? MENU_WIDE_W : 400, window.innerWidth - 16),
    h: Math.min(window.innerHeight * 0.72, 620),
  };
}

/**
 * Where the floating menu stands for a block: where the owner dragged it this
 * session, else beside the block (lib/menu-place.js). ir is the SCALED iframe
 * rect and rect the block in the iframe's OWN coordinates, so inner points
 * are multiplied by the scale before being added to the iframe's window
 * position (visual = ir + scale * inner).
 */
function menuPlaceFor(rect) {
  const size = menuSize();
  const view = { w: window.innerWidth, h: window.innerHeight };
  if (menu.place) return clampPlace(menu.place, size, view, menu.min);
  const ir = previewState.iframeEl?.getBoundingClientRect();
  if (!ir) return { left: menu.min, top: 8 };
  const s = previewState.scale;
  const block = { left: ir.left + s * rect.left, top: ir.top + s * rect.top, right: ir.left + s * rect.right, bottom: ir.top + s * rect.bottom };
  const { left, top } = placeBesideBlock(block, size, view, { min: menu.min });
  return { left, top };
}

/** The menu dragged by its head: the place is kept for the session and the menu stands there for every block. The menu's own measured box, when given, is what is kept inside the window. */
function moveBlockMenu(place, size = menuSize()) {
  const next = clampPlace(place, size, { w: window.innerWidth, h: window.innerHeight }, menu.min);
  menu.place = next;
  blockMenu = next;
}

/** «Back beside the block»: the remembered place is dropped, and the menu stands beside the block it was opened at. */
function menuBackToBlock() {
  menu.place = null;
  if (menuAnchor) blockMenu = menuPlaceFor(menuAnchor);
}

/** Shared flow for block changes from the Properties panel. */
function mutateBlock(key, fn) {
  const { section, block } = readBlock(selectedBlock?.sectionId, selectedBlock?.blockId);
  if (!block) return;
  // key null = the caller has already pushed history (multiple steps in ONE undo step).
  if (key) historyState.pushHistory(key);
  fn(block, section);
  markDesktopChange(section, 'block-edited');
  store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageId, section);
  syncSelectedBlock();
  fitBlockSoon(section.id, block);
}

function setBlockProp(name, value) {
  // The key includes the property name: changing the label and then the
  // style must be TWO undo steps, while a burst in the same field coalesces.
  mutateBlock(`edit:${selectedBlock.blockId}:${name}`, (b) => { b.props[name] = value; });
}

/** Multiple props in ONE undo step (the field contract's place field writes three). */
function setBlockProps(name, patch) {
  mutateBlock(`edit:${selectedBlock.blockId}:${name}`, (b) => { Object.assign(b.props, patch); });
}

/** A group's reset (0.7.20.5): when any of its settings holds a value other
 *  than its default, the patch that brings the defaults back as one undo
 *  step; else null, so the group carries no mark. An absent setting is its
 *  default. */
function groupReset(id, defaults) {
  const p = selectedBlock.props;
  const changed = Object.entries(defaults).some(([k, d]) => p[k] !== undefined && JSON.stringify(p[k]) !== JSON.stringify(d));
  return changed ? () => setBlockProps(id, { ...defaults }) : null;
}

/** How many of a group's settings hold their own value, for its closed value. */
function groupChanged(defaults) {
  const p = selectedBlock.props;
  return Object.entries(defaults).filter(([k, d]) => p[k] !== undefined && JSON.stringify(p[k]) !== JSON.stringify(d)).length;
}

const onOff = () => [['on', ta('common.on')], ['off', ta('common.off')]];

/** A band's reach (ribbon-model.js): the content surface by default, the window, or the block's own box. */
const RIBBON_REACH = () => [['canvas', ta('opt.ribbonWidth.content')], ['page', ta('opt.ribbonWidth.page')], ['content', ta('opt.ribbonWidth.own')]];

const ribbonReach = (w) => (w === 'canvas' || w === 'page' ? w : 'content');

const RIBBON_MOTIONS = () => [['roll', ta('opt.ribbonMotion.roll')], ['sway', ta('opt.ribbonMotion.sway')],
  ['step', ta('opt.ribbonMotion.step')], ['none', ta('opt.ribbonMotion.none')]];

/** Where a button goes: a page of the site, or an address of its own. */
function buttonTargets() {
  return [...siteState.siteDraft.pages.map((pg) => [pg.id, pg.title]), ['__href', ta('opt.externalLink')]];
}

function setButtonTarget(v) {
  const page = v === '__href' ? null : v;
  mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
    b.props.page = page;
    if (page) b.props.href = null;
  });
}

/** The image editor in the preview, opened from the block's menu (the floating menu steps aside for it). */
function openImageEditor() {
  previewState.bridge?.sendOpenImageEditor(selectedBlock.blockId);
  blockMenu = null;
}

/** A block whose height follows its content (ADR-0025) has its frame fitted
 *  after every edit that can change the height (its settings, its text, its
 *  width): the preview is asked for the height the content needs and
 *  answers with it (urd-fit-block, urd-grow). Desktop frame only. */
const fitTimers = new Map();

/** The latest fit asked for per block: an answer to an earlier one, or to
 *  one asked for before an undo, is dropped. */
const fitSeq = new Map();

let fitCount = 0;

function fitBlockSoon(sectionId, block) {
  phoneFitSoon(sectionId, block);
  if (previewState.viewMode !== 'desktop' || !followsContent(block)) return;
  clearTimeout(fitTimers.get(block.id));
  const seq = ++fitCount;
  fitSeq.set(block.id, seq);
  fitTimers.set(block.id, setTimeout(() => previewState.bridge?.sendFitBlock(sectionId, block.id, seq), 60));
}

/* The phone height of a block that fetches its content (0.7.21.7,
   lib/phone-fit.js): after every edit that can change it, a hidden preview
   at the phone width is asked for the height the block takes there, and it
   is stored as the block's mobileHeight, which the loading state stands at
   on the phone. Like the desktop fit it is part of the edit that asked for
   it: no undo step of its own. */
const phoneSeq = new Map();

let phoneFit = null;

let phonePlugins = '';

function phoneFitSoon(sectionId, block) {
  if (!FETCHES_CONTENT.has(block.type) || !followsContent(block)) return;
  phoneFit ??= createPhoneFit({
    title: () => ta('canvas.phoneMeasure'),
    prepare: (post, first) => {
      // The plugins only when they changed: the preview loads them anew.
      const enabled = $state.snapshot(pluginsState.pluginsView)?.enabled ?? [];
      const key = JSON.stringify(enabled);
      if (first || key !== phonePlugins) post({ type: 'urd-plugins', enabled });
      phonePlugins = key;
      post({ type: 'urd-site', site: $state.snapshot(siteState.siteDraft) });
      post({ type: 'urd-collections', collections: $state.snapshot(collectionsState.collectionsView) ?? {} });
    },
    onHeight: applyPhoneHeight,
  });
  const seq = ++fitCount;
  phoneSeq.set(block.id, seq);
  phoneFit.request(pageId, $state.snapshot(store.data), sectionId, block.id, seq);
}

function applyPhoneHeight(forPage, blockId, h, seq) {
  if (forPage !== pageId || seq !== phoneSeq.get(blockId)) return;
  const block = store.data.sections.flatMap((s) => s.blocks).find((b) => b.id === blockId);
  const next = Math.round(h);
  if (!block || !(next > 0) || block.mobileHeight === next) return;
  block.mobileHeight = next;
  store.save();
  historyState.updateDirty();
}

/** Forgets the fits still waiting, on the desktop and the phone: their answers would measure a draft that is gone. */
function dropFits() {
  for (const timer of fitTimers.values()) clearTimeout(timer);
  fitTimers.clear();
  fitSeq.clear();
  phoneSeq.clear();
  phoneFit?.cancel();
}

/** A design with a view of its own writes that view too, so an engine without the design still draws the right data. */
function setCalendarDesign(id) {
  const def = calDesign(id);
  // A «Coming up» design starts with three events in the card and three under «Later», unless the counts are already set.
  const counts = def.view === 'next'
    ? { nextCount: selectedBlock.props.nextCount ?? 3, laterCount: selectedBlock.props.laterCount ?? 3 }
    : {};
  // The plain design shows the five plain views: a week, day or year left by a design goes back to the list.
  const plainView = def.id === 'plain' && !['list', 'cards', 'month', 'agenda', 'next'].includes(calView(selectedBlock.props)) ? { view: 'list' } : {};
  // setBlockProps fits the frame to the new design.
  setBlockProps('design', { design: def.id === 'plain' ? undefined : def.id, ...(def.view ? { view: def.view } : {}), ...plainView, ...counts });
}

/** The phone design the selected calendar draws on a phone (calPhoneView): stored only when it is not the design's own default, and the legacy switch is cleared. */
function setCalendarPhoneView(id) {
  const fallback = calPhoneView({ ...selectedBlock.props, phoneView: undefined, phoneDesign: undefined });
  setBlockProps('phoneView', { phoneView: id === fallback ? undefined : id, phoneDesign: undefined });
}

/** The card design the selected calendar's card wears (calCardDesign): stored only when it is not the design's own default. */
function setCalendarCard(id) {
  const fallback = calCardDesign({ ...selectedBlock.props, card: undefined });
  setBlockProp('card', id === fallback ? undefined : id);
}

function setBlockFit(mode) {
  mutateBlock(`edit:${selectedBlock.blockId}:fit`, (b) => {
    if (mode === 'shrink' || mode === 'both') {
      b.fit = mode;
      b.fitMin ??= 0.6;
    } else {
      delete b.fit;
      delete b.fitMin;
    }
  });
}

function setBlockFitMin(value) {
  mutateBlock(`edit:${selectedBlock.blockId}:fitMin`, (b) => { b.fitMin = value; });
}

/* The block's size (ADR-0025 decision 6): the whole block, text included,
   drawn smaller or larger, and held where its base text meets a bound the
   owner set (sizeRange). The default is stored as nothing, and a block
   back at full size drops its bounds with it. The frame follows the size,
   so the content keeps its lines: the width by the ratio, capped at the
   canvas edge, and the height the same way where the block owns it, with
   the blocks below moved as for a fit; a block whose height follows its
   content is fitted by the preview after the edit (fitBlockSoon). */
/* One slider gesture is computed from where it began (sizeGesture: the
   block's size, its frame and the other blocks' places then), so a slide
   up and back returns the frame and the blocks below to where they were,
   also when the width met the canvas edge on the way. */
let sizeGesture = null;

function sizeStart(b, section) {
  return {
    blockId: b.id,
    size: blockSize(b),
    frame: { ...b.frames.desktop },
    ys: new Map(section.blocks.filter((x) => x.frames?.desktop).map((x) => [x.id, x.frames.desktop.y])),
  };
}

/* Stores a size and scales the frame to it from where a gesture began. */
function applySize(b, section, g, value) {
  if (value === 1) {
    delete b.size;
    delete b.sizeMin;
    delete b.sizeMax;
  } else {
    b.size = value;
  }
  // Back to where the gesture began, then scaled from there.
  for (const x of section.blocks) {
    if (x.id !== b.id && x.frames?.desktop && g.ys.has(x.id)) x.frames.desktop = { ...x.frames.desktop, y: g.ys.get(x.id) };
  }
  b.frames.desktop = { ...g.frame };
  const ratio = blockSize(b) / g.size;
  if (ratio === 1) return;
  const frame = { ...g.frame, w: Math.min(Math.round(g.frame.w * ratio * 100) / 100, Math.round((100 - g.frame.x) * 100) / 100) };
  if (!followsContent(b)) {
    frame.h = Math.max(1, Math.round(g.frame.h * ratio));
    for (const [id, y] of fitMoves(section.blocks, b.id, frame.h)) {
      const other = section.blocks.find((x) => x.id === id);
      if (other?.frames?.desktop) other.frames.desktop = { ...other.frames.desktop, y };
    }
  }
  b.frames.desktop = frame;
}

function setBlockSize(value) {
  mutateBlock(`edit:${selectedBlock.blockId}:size`, (b, section) => {
    if (sizeGesture?.blockId !== b.id) sizeGesture = sizeStart(b, section);
    const { min, max } = sizeRange(b);
    applySize(b, section, sizeGesture, Math.round(Math.min(max, Math.max(min, value)) * 100) / 100);
  });
}

/* A bound on the base text is the owner's own, and an empty field removes
   it. A bound that moves the end of the range past the size takes the size
   with it, and the frame follows as for the slider. The size is first
   stored as it is drawn, so a stored size outside the range never comes
   back when a bound widens it. */
function setBlockSizeBound(name, value) {
  sizeGesture = null;
  mutateBlock(`edit:${selectedBlock.blockId}:${name}`, (b, section) => {
    const g = sizeStart(b, section);
    if (g.size !== 1) b.size = g.size;
    const n = Math.round(Number(value));
    if (Number.isFinite(n) && n > 0) b[name] = Math.min(SIZE_TEXT.max, Math.max(SIZE_TEXT.min, n));
    else delete b[name];
    const size = blockSize(b);
    if (size !== g.size) applySize(b, section, g, size);
  });
}

/* The height of a block whose height follows its content by default
   (ADR-0025 decision 3): «Own height» is stored as `height: { mode: 'own' }`
   with the content's place in the box beside it, and the frame keeps the
   height it has until it is dragged. Back to the content removes the field,
   and the fit that follows the edit takes the frame to the content. */
function setBlockHeightMode(mode) {
  mutateBlock(`edit:${selectedBlock.blockId}:height`, (b) => {
    if (mode === 'own') b.height = { mode: 'own' };
    else delete b.height;
  });
}

function setBlockHeightAlign(align) {
  mutateBlock(`edit:${selectedBlock.blockId}:heightAlign`, (b) => {
    b.height = { mode: 'own' };
    if (align !== 'top') b.height.align = align;
  });
}

/** Whether stretch is offered: the block types that fill their box, and the
 *  calendar in the plain list and card views, which spread their rows and cards. */
function canStretch() {
  const b = selectedBlock;
  if (STRETCHES.has(b.type)) return true;
  if (b.type !== 'calendar') return false;
  const def = calDesign(b.props.design);
  return !def.module && ['list', 'cards'].includes(def.view);
}

function setBlockFrame(field, value) {
  if (!Number.isFinite(value)) return;
  mutateBlock(`edit:frame-${selectedBlock.blockId}:${field}`, (b) => {
    b.frames.desktop = { ...b.frames.desktop, [field]: value };
  });
}

/** The width in px the selected block's canvas has at the design width
 *  (ADR-0018): the site's content width, or its section's own px width
 *  when that is narrower; 0 on a full-width site or section, or a section
 *  width that is not in px, where nothing has a design size. The engine
 *  computes the same in renderSection. */
function designWidth() {
  const section = store.data.sections.find((s) => s.id === selectedBlock?.sectionId);
  const sec = section?.size?.maxWidth;
  const site = typeof siteState.layoutWidth === 'number' ? siteState.layoutWidth : 0;
  if (sec === 'full') return 0;
  if (sec) return /^\d+(\.\d+)?px$/.test(sec) ? Math.min(parseFloat(sec), site || Infinity) : 0;
  return site;
}

/* A shape's size in px at the design width: the frame's width is stored
   in percent of the content surface, so px and percent convert through
   designWidth(). A line takes the width alone; a shape's height follows
   its own ratio. Where there is no design width the fields are not shown. */
function shapePx(pct) {
  return Math.round((pct / 100) * designWidth());
}

function setShapeSizePx(px, keepRatio) {
  const dw = designWidth();
  if (!Number.isFinite(px) || px < 4 || !(dw > 0)) return;
  const { x, w, h } = selectedBlock.frame;
  const nw = Math.max(0.5, Math.min(Math.round((px / dw) * 200) / 2, Math.round((100 - x) * 2) / 2));
  const nh = keepRatio ? Math.max(1, Math.round(h * (nw / w))) : h;
  if (!Number.isFinite(nw) || !Number.isFinite(nh)) return;
  mutateBlock(`edit:frame-${selectedBlock.blockId}:size`, (b) => {
    b.frames.desktop = { ...b.frames.desktop, w: nw, h: nh };
  });
}

/** The card style (boxStyle, additive): null values in the patch remove
 *  the field, and an empty object is removed entirely (= the base style). */
function setBoxStyle(patch) {
  mutateBlock(`edit:${selectedBlock.blockId}:boxStyle`, (b) => {
    const next = { ...(b.props.boxStyle ?? {}), ...patch };
    for (const k of Object.keys(next)) {
      if (next[k] == null) delete next[k];
    }
    if (Object.keys(next).length) b.props.boxStyle = next;
    else delete b.props.boxStyle;
  });
}

function setBlockDecor(on) {
  mutateBlock('decor', (b) => { b.decor = on; });
}

/** Hide on mobile is a MOBILE intent, not a desktop change: it bypasses
 *  mutateBlock so the review flag is never triggered by it (same rule as
 *  the phone toggle in the canvas, ADR-0019). */
function setBlockHideMobile(on) {
  const { section, block } = readBlock(selectedBlock?.sectionId, selectedBlock?.blockId);
  if (!block) return;
  historyState.pushHistory('hide-mobile');
  block.hideMobile = on;
  store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageId, section);
  syncSelectedBlock();
}

/** The most recently clicked section in the preview: the palette adds
 *  new blocks here, and the grid menu can give it its own grid. */
let activeSectionId = $state(null);

/** Mirror of the active section's grid override (null = inherits) */
let sectionGrid = $state(null);

/** Mirror of the active section's minimum height (for the Properties panel) */
let sectionMinHeight = $state('');

/** Mirror of the active section's background layers and animation */
let sectionBg = $state([]);

let sectionAnim = $state(null);

let sectionHover = $state(null);

/** Mirror of the active section's role set (section theme), '' = Default */
let sectionTheme = $state('');

/** The section's shape dividers, { top?, bottom? } (a copy for the panel, like the mirrors above). */
let sectionDivider = $state({});

function syncSectionMirrors(section) {
  sectionGrid = section?.grid ? { ...section.grid } : null;
  sectionMinHeight = section?.size?.minHeight ?? '';
  sectionBg = JSON.parse(JSON.stringify(section?.background?.layers ?? []));
  sectionAnim = section?.animation ? JSON.parse(JSON.stringify(section.animation)) : null;
  sectionHover = section?.hover ? JSON.parse(JSON.stringify(section.hover)) : null;
  sectionTheme = section?.theme ?? '';
  sectionDivider = section?.divider ? JSON.parse(JSON.stringify(section.divider)) : {};
}

/* Measurements for the "Cover"/"Show all" buttons on image background
   layers: the section box (measured in the preview iframe, same-origin)
   and the image's natural size let us compute the scale that exactly
   fills/shows the whole image. */
let secBox = $state(null);            // { w, h } for the selected section
          // { w, h } for the selected section

function measureSecBox() {
  try {
    const doc = previewState.iframeEl?.contentDocument;
    const el = doc?.querySelector(`.urd-section[data-section-id="${activeSectionId}"]`);
    const r = el?.getBoundingClientRect();
    secBox = r && r.width ? { w: r.width, h: r.height } : null;
  } catch { secBox = null; }
}

function onSelectSection(msg) {
  activeSectionId = msg.sectionId;
  syncSectionMirrors(store?.data.sections.find((s) => s.id === msg.sectionId));
  // «Section settings» in the preview's right-click menu: the Properties panel on the section.
  if (msg.open) shellState.activePanel = 'properties';
}

/** Shared flow for section changes from the Properties panel. */
function mutateSection(key, fn) {
  const section = store.data.sections.find((s) => s.id === activeSectionId);
  if (!section) return;
  historyState.pushHistory(key);
  fn(section);
  store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageId, section);
  syncSectionMirrors(section);
}

/** The video block's own film (source 'file'). */
function setBlockVideoFile(event) {
  const file = event.target.files?.[0];
  event.target.value = '';
  if (file) mediaState.readVideoFile(file, 'status.videoFileFormat', (dataUrl) => setBlockProp('src', dataUrl));
}

/** The video block's poster: the still shown before the film plays. */
async function setBlockVideoPoster(event) {
  const file = event.target.files?.[0];
  event.target.value = '';
  if (!file) return;
  try {
    const img = await mediaState.compressOrTrim(file);
    setBlockProp('poster', img.dataUrl);
  } catch (err) {
    shellState.setStatus(mediaState.imageErrorText(err), 'error');
  }
}

const sectionBgCtx = $derived({ mutate: mutateSection, keyPrefix: 'bg', keyId: activeSectionId });

function animObj(type) {
  return { type, version: coreAnimations[type].version, props: coreAnimations[type].defaults() };
}

/** Entrance animation and hover effect are independent fields
 *  (animation/hover) and can be combined. Older pages can have a hover
 *  effect stored in animation: it is normalized to hover on the next edit. */
const isEntrance = (anim) => Boolean(anim && coreAnimations[anim.type]?.entrance);

const ENTRANCE_OPTIONS = $derived([['', ta('common.none')],
  ...Object.entries(coreAnimations).filter(([, def]) => def.entrance).map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])]);

// The block dropdown: group animations (stagger) are section-level and
// do nothing on a block - they are filtered out here.
const BLOCK_ENTRANCE_OPTIONS = $derived(ENTRANCE_OPTIONS.filter(([id]) => !coreAnimations[id]?.group));

const HOVER_OPTIONS = $derived([['', ta('common.none')],
  ...Object.entries(coreAnimations).filter(([, def]) => !def.entrance).map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])]);

function normalizeAnim(target) {
  if (target.animation && !isEntrance(target.animation)) {
    target.hover ??= target.animation;
    target.animation = null;
  }
}

function setBlockAnimation(type) {
  mutateBlock(`edit:anim-${selectedBlock.blockId}`, (b) => {
    normalizeAnim(b);
    b.animation = type ? animObj(type) : null;
  });
  // Play the animation once as a demo (after the rerender; postMessage is ordered).
  if (selectedBlock) previewState.bridge?.sendDemoAnim(selectedBlock.sectionId, selectedBlock.blockId);
}

function setBlockHover(type) {
  mutateBlock(`edit:hover-${selectedBlock.blockId}`, (b) => {
    normalizeAnim(b);
    b.hover = type ? animObj(type) : null;
  });
}

function setBlockAnimProp(name, value) {
  if (!Number.isFinite(value)) return;
  mutateBlock(`edit:anim-${selectedBlock.blockId}:${name}`, (b) => {
    if (b.animation) b.animation.props[name] = value;
  });
  if (selectedBlock) previewState.bridge?.sendDemoAnim(selectedBlock.sectionId, selectedBlock.blockId);
}

/** Height from the Properties panel: px number or CSS value (40vh, 50%). */
function setSectionHeight(raw) {
  const section = store.data.sections.find((s) => s.id === activeSectionId);
  if (!section) return;
  const value = raw.trim();
  if (!value) return;
  const minHeight = /^\d+$/.test(value) ? `${value}px` : value;
  historyState.pushHistory('section-size');
  section.size = { ...section.size, minHeight };
  sectionMinHeight = minHeight;
  store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageId, section);
}

function targetSection() {
  return store.data.sections.find((s) => s.id === activeSectionId) ?? store.data.sections[0];
}

function toggleSectionGrid(on) {
  const section = store.data.sections.find((s) => s.id === activeSectionId);
  if (!section) return;
  historyState.pushHistory('grid:section');
  section.grid = on ? { ...siteState.siteStore.data.grid } : null;
  sectionGrid = section.grid ? { ...section.grid } : null;
  store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageId, section);
  if (shellState.gridOn) previewState.bridge?.sendShowGrid(true);
}

function setSectionGrid(field, value) {
  const section = store.data.sections.find((s) => s.id === activeSectionId);
  if (!section?.grid) return;
  historyState.pushHistory('grid:section');
  section.grid = { ...section.grid, [field]: value };
  sectionGrid = { ...section.grid };
  store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageId, section);
  if (shellState.gridOn) previewState.bridge?.sendShowGrid(true);
}

/** Runs while a page's data loads; urd-ready waits on this. */
let pageLoading = null;

/** Empty page for newly created pages (must validate against the page schema). */
function blankPage(entry) {
  return {
    schemaVersion: PAGE_SCHEMA_VERSION,
    meta: { id: entry.id, title: entry.title },
    sections: [{
      id: makeId('sec'),
      version: 1,
      preset: 'blank',
      size: { minHeight: '40vh' },
      grid: null,
      background: { version: 1, layers: [{ type: 'color', version: 1, props: { value: 'bg' } }] },
      blocks: [],
    }],
  };
}

async function selectPage(id, { keepHistory = false } = {}) {
  pageId = id;
  pageLoading = (async () => {
    const entry = pageEntry();
    // New pages do not exist on the server yet: 404, or an SPA fallback
    // answering 200 with HTML (json() throws). Then a blank page is the
    // baseline, and any draft in localStorage wins regardless.
    let published = null;
    try {
      const res = await fetch(`/${entry.file}`);
      // Older page files are lifted to the current format before editing,
      // so drafts and publishing are always on the latest schemaVersion.
      // Old drafts in localStorage are lifted too.
      if (res.ok) published = liftPageFile(await res.json(), siteState.siteStore.data);
    } catch { /* new, unpublished page */ }
    if (published) {
      // The page is out on the server: any wait-for-deploy marker is done
      // (store.save() below cleans the draft if it is identical).
      pendingPublished.delete(id);
    } else {
      published = blankPage(entry);
    }
    store = createDraftStore(`urd-draft-${id}`, () => published, shellState.draftSaveError);
    // A draft with a HIGHER schemaVersion than the engine (written by a
    // newer Urd) can neither be edited nor published safely: liftPageFile
    // lets it pass untouched, the layers render as placeholders, and a
    // publish would cement it. Discard the draft; the server is the
    // source of truth.
    if ((store.data.schemaVersion ?? 1) > PAGE_SCHEMA_VERSION) {
      console.warn(`Urd: the draft for '${id}' has schemaVersion ${store.data.schemaVersion} (the engine has ${PAGE_SCHEMA_VERSION}) and is discarded`);
      store.replace(structuredClone(published));
    }
    store.replace(liftPageFile(store.data, siteState.siteStore.data));
    store.save();
    // The undo history survives page switches: snapshots carry pageId,
    // and restore switches back to the right page. Without keepHistory
    // only the coalesce key is cleared, so the next change always gets
    // its own step.
    if (!keepHistory) historyState.lastHistoryKey = null;
    activeSectionId = null;
    sectionGrid = null;
    historyState.updateDirty();
    siteState.readSeoDraft();
    shellState.updateAttention();
    shellState.status = '';
  })();
  await pageLoading;
  // The iframe switches src via pageId; the draft is pushed when the
  // engine reports ready (urd-ready), never on iframe load (no one is
  // listening yet then).
}

/** Another page's current data: draft, else published, else blank. */
async function readPageDraft(entry) {
  const raw = localStorage.getItem(`urd-draft-${entry.id}`);
  if (raw) {
    try { return JSON.parse(raw); } catch { /* corrupt: fetched again */ }
  }
  try {
    const res = await fetch(`/${entry.file}`);
    if (res.ok) return liftPageFile(await res.json(), siteState.siteStore.data);
  } catch { /* unpublished page without a draft */ }
  return blankPage(entry);
}

/** Changes another page's draft (creates a draft from published as needed). */
async function patchPageDraft(entry, fn) {
  const page = await readPageDraft(entry);
  fn(page);
  shellState.writeDraftKey(`urd-draft-${entry.id}`, JSON.stringify(page));
  historyState.updateDirty();
}

/** + Add images to a selected gallery block: the whole batch in ONE undo step. */
async function addGalleryImages(event) {
  const files = [...(event.target.files ?? [])];
  event.target.value = '';
  if (!files.length) return;
  shellState.setStatus(ta('status.compressingImages'));
  const { images, failed, big } = await mediaState.compressMany(files);
  if (images.length) mutateBlock('gallery-add', (b) => { b.props.images.push(...images); });
  mediaState.reportUpload(images.length, failed, big);
}

function moveGalleryImage(i, dir) {
  mutateBlock('gallery-move', (b) => {
    const j = i + dir;
    if (j < 0 || j >= b.props.images.length) return;
    [b.props.images[i], b.props.images[j]] = [b.props.images[j], b.props.images[i]];
  });
}

function removeGalleryImage(i) {
  mutateBlock('gallery-remove', (b) => { b.props.images.splice(i, 1); });
}

function setGalleryImageField(i, field, value) {
  mutateBlock(`edit:${selectedBlock.blockId}:img${i}-${field}`, (b) => { b.props.images[i][field] = value; });
}

/** The size slider's gesture ends: the next slide starts from where the block then stands. */
function endSizeGesture() {
  sizeGesture = null;
}

/** The effects of this module, run once by the shell at its start. */
export function effects() {

  $effect(() => {
    if (!blockMenu) return;
    measureMenuRoom();
    window.addEventListener('resize', measureMenuRoom);
    return () => window.removeEventListener('resize', measureMenuRoom);
  });

  $effect(() => {
    if (designPicker?.mode === 'set' && selectedBlock?.type !== 'calendar') designPicker = null;
  });

  $effect(() => {
    const id = selectedBlock?.blockId ?? null;
    if (id === searchBlockId) return;
    searchBlockId = id;
    menu.menuQuery = '';
    menu.propsQuery = '';
  });

  $effect(() => {
    if (!blockMenu) menu.menuQuery = '';
  });

  // Re-measure when the selected section changes (after the preview has
  // rendered) and when the preview iframe resizes.
  $effect(() => {
    activeSectionId; sectionBg;
    requestAnimationFrame(() => requestAnimationFrame(measureSecBox));
  });

  $effect(() => {
    const el = previewState.iframeEl;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => measureSecBox());
    ro.observe(el);
    return () => ro.disconnect();
  });
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const pageState = {
  /** The page's sections, for the parts that list them (the sticky «until» choice). */
  get sections() { return store?.data.sections ?? []; },
  get pageId() { return pageId; },
  set pageId(v) { pageId = v; },
  handleApplyLayout,
  hasMobileOverrides,
  markDesktopChange,
  get store() { return store; },
  set store(v) { store = v; },
  pendingPublished,
  pageEntry,
  get selectedBlock() { return selectedBlock; },
  set selectedBlock(v) { selectedBlock = v; },
  readBlock,
  syncSelectedBlock,
  onSelectBlock,
  get blockMenu() { return blockMenu; },
  set blockMenu(v) { blockMenu = v; },
  moveBlockMenu,
  menuBackToBlock,
  onMenuArea,
  measureMenuRoom,
  get designPicker() { return designPicker; },
  set designPicker(v) { designPicker = v; },
  get searchBlockId() { return searchBlockId; },
  set searchBlockId(v) { searchBlockId = v; },
  onBlockMenu,
  mutateBlock,
  setBlockProp,
  setBlockProps,
  groupReset,
  groupChanged,
  onOff,
  RIBBON_REACH,
  ribbonReach,
  RIBBON_MOTIONS,
  buttonTargets,
  setButtonTarget,
  openImageEditor,
  fitTimers,
  fitSeq,
  get fitCount() { return fitCount; },
  set fitCount(v) { fitCount = v; },
  fitBlockSoon,
  phoneSeq,
  get phoneFit() { return phoneFit; },
  set phoneFit(v) { phoneFit = v; },
  get phonePlugins() { return phonePlugins; },
  set phonePlugins(v) { phonePlugins = v; },
  phoneFitSoon,
  applyPhoneHeight,
  dropFits,
  setCalendarDesign,
  setCalendarPhoneView,
  setCalendarCard,
  setBlockFit,
  setBlockFitMin,
  get sizeGesture() { return sizeGesture; },
  set sizeGesture(v) { sizeGesture = v; },
  setBlockSize,
  setBlockSizeBound,
  setBlockHeightMode,
  setBlockHeightAlign,
  canStretch,
  setBlockFrame,
  designWidth,
  shapePx,
  setShapeSizePx,
  setBoxStyle,
  setBlockDecor,
  setBlockHideMobile,
  get activeSectionId() { return activeSectionId; },
  set activeSectionId(v) { activeSectionId = v; },
  get sectionGrid() { return sectionGrid; },
  set sectionGrid(v) { sectionGrid = v; },
  get sectionMinHeight() { return sectionMinHeight; },
  set sectionMinHeight(v) { sectionMinHeight = v; },
  get sectionBg() { return sectionBg; },
  set sectionBg(v) { sectionBg = v; },
  get sectionAnim() { return sectionAnim; },
  set sectionAnim(v) { sectionAnim = v; },
  get sectionHover() { return sectionHover; },
  set sectionHover(v) { sectionHover = v; },
  get sectionTheme() { return sectionTheme; },
  set sectionTheme(v) { sectionTheme = v; },
  get sectionDivider() { return sectionDivider; },
  set sectionDivider(v) { sectionDivider = v; },
  syncSectionMirrors,
  get secBox() { return secBox; },
  set secBox(v) { secBox = v; },
  measureSecBox,
  onSelectSection,
  mutateSection,
  setBlockVideoFile,
  setBlockVideoPoster,
  get sectionBgCtx() { return sectionBgCtx; },
  animObj,
  isEntrance,
  get ENTRANCE_OPTIONS() { return ENTRANCE_OPTIONS; },
  get BLOCK_ENTRANCE_OPTIONS() { return BLOCK_ENTRANCE_OPTIONS; },
  get HOVER_OPTIONS() { return HOVER_OPTIONS; },
  normalizeAnim,
  setBlockAnimation,
  setBlockHover,
  setBlockAnimProp,
  setSectionHeight,
  targetSection,
  toggleSectionGrid,
  setSectionGrid,
  get pageLoading() { return pageLoading; },
  set pageLoading(v) { pageLoading = v; },
  blankPage,
  selectPage,
  readPageDraft,
  patchPageDraft,
  addGalleryImages,
  moveGalleryImage,
  removeGalleryImage,
  setGalleryImageField,
  endSizeGesture,
  effects,
};
