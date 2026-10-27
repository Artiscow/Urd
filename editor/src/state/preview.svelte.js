/**
 * The preview: the iframe and the bridge to it, the device and the zoom, the Screen setting, the chrome, and the light or dark preview mode.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { ownWindowWidthOf, screenSetting, screenViewport } from '../lib/own-screen.js';
import { contentBand } from '../lib/content-width.js';
import { ta } from '$engine/i18n.js';
import { previewScale } from '../lib/preview-scale.js';
import { resolveThemeMode } from '$engine/theme.js';
import { createPreviewBridge } from '../lib/previewBridge.js';
import { tick } from 'svelte';
import { blocksState } from './blocks.svelte.js';
import { bridgeState } from './bridge.svelte.js';
import { collectionsState } from './collections.svelte.js';
import { historyState } from './history.svelte.js';
import { pageState } from './page.svelte.js';
import { pluginsState } from './plugins.svelte.js';
import { shellState } from './shell.svelte.js';
import { siteState } from './site.svelte.js';
import { templatesState } from './templates.svelte.js';
import { linkState } from './link.svelte.js';
import { emailLike } from '../lib/link-edit.js';

let iframeEl = $state(null);

/** Clean preview: hides all editing handles in the iframe */
let chromeVisible = $state(true);

/** The canvas target device (ADR-0018, the Squarespace model): each button
 *  is a REAL screen size, not a view mode. Then there is no "wrong" mode
 *  to be in. Screen is the owner's own browser window width by default
 *  (the window the published page is compared in), or an editing size
 *  chosen per browser (lib/own-screen.js, the Wix Studio model) with an
 *  optional height; only a set height pins both axes.
 *  The fixed devices pin the width and fill the panel.
 *  `viewport` is what the ENGINE gets to know (it only knows
 *  desktop/mobile), so tablet and laptop are desktop view to the engine. */
let ownWidth = $state(ownWindowWidthOf(typeof window !== 'undefined' ? window : null) ?? 1920);

/** The Screen preference, per browser like the admin theme and language. */
const SCREEN_PREF_KEY = 'urd-admin-screen';

function readScreenPref() {
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(SCREEN_PREF_KEY) ?? 'null'); } catch { raw = null; }
  return screenSetting(raw, ownWidth);
}

let screenPref = $state(readScreenPref());

/** Writes through the normaliser, so the stored object is always valid. */
function setScreenPref(patch) {
  screenPref = screenSetting({ ...$state.snapshot(screenPref), ...patch }, ownWidth);
  try { localStorage.setItem(SCREEN_PREF_KEY, JSON.stringify(screenPref)); } catch { /* blocked storage: the choice lasts the session */ }
}

let screenTarget = $derived(screenViewport(screenPref, ownWidth));

const FIXED_DEVICES = [
  { id: 'laptop', width: 1280, height: null, viewport: 'desktop' },
  { id: 'tablet', width: 810, height: null, viewport: 'desktop' },
  { id: 'mobile', width: 390, height: null, viewport: 'mobile' },
];

let devices = $derived([
  { id: 'desktop', width: screenTarget.width, height: screenTarget.height || null, viewport: 'desktop' },
  ...FIXED_DEVICES,
]);

/** The device tooltip: Screen names its mode, the fixed devices their size. */
function deviceTip(d) {
  const c = contentBand(siteState.layoutWidth, siteState.layoutGutter, d.width).width;
  const key = d.id !== 'desktop' ? `tip.view.${d.id}`
    : screenPref.mode === 'own' ? 'tip.view.desktop'
    : d.height ? 'tip.view.desktopSizeH' : 'tip.view.desktopSize';
  return ta(key, { w: d.width, h: d.height ?? 0, c });
}

let deviceId = $state('desktop');

let device = $derived(devices.find((d) => d.id === deviceId) ?? devices[0]);

/** The engine's viewport. Everything that asks "are we on mobile" reads this.
 *  A Screen narrower than the site's mobile breakpoint is mobile to the
 *  engine, as the published page is in that window. */
let viewMode = $derived(device.viewport === 'mobile' || device.width <= (siteState.siteDraft?.breakpoints?.mobile ?? 640) ? 'mobile' : 'desktop');

// Scaled canvas: the iframe renders the page in a full window viewport
// (same as a visitor with a full window) and is scaled down to fit
// .frame-wrap, instead of reflowing into the space left over after the
// chrome. The render is then identical to the published page; only the
// display size (zoom) changes. See lib/preview-scale.js.
let frameWrapEl = $state(null);

let frameW = $state(0);            // measured inner surface of .frame-wrap (px)
          // measured inner surface of .frame-wrap (px)
let frameH = $state(0);

/** Zoom for the editing canvas: 'fit' adapts to the window, 'full' = true 1:1. */
let zoomMode = $state('fit'); // 'fit' | 'manual' (stepped with +/-)
 // 'fit' | 'manual' (stepped with +/-)
let manualZoom = $state(1);

let targetW = $derived(device.width);

/** The pinned viewport height; 0 (fill the panel) for everything but an
 *  editing size with a height set. */
let targetH = $derived(device.height ?? 0);

// A pinned height fits both axes; otherwise the scale is WIDTH-driven,
// see the comment at iframeH.
let scale = $derived(zoomMode === 'manual'
  ? manualZoom
  : previewScale(frameW, targetW, 'fit', frameH, targetH));

/** The zoom steppers: 10 percentage-point steps from the current view, clamped 10-400 %. */
function stepZoom(dir) {
  const next = Math.min(400, Math.max(10, (Math.round(Math.round(scale * 100) / 10) + dir) * 10));
  manualZoom = next / 100;
  zoomMode = 'manual';
}

// An editing size with a height set: the iframe stands in that height,
// the stage's bottom edge is the fold, and the panel's surplus below it
// is the letterbox surface. Every other case FILLS the panel: the iframe
// is made correspondingly taller, so the scaled height covers .frame-wrap
// without bars, at the price of a fold that follows the panel's aspect
// ratio rather than a real screen's.
let iframeH = $derived(targetH > 0 ? targetH : (scale > 0 ? frameH / scale : frameH));

let stageW = $derived(targetW * scale);

let stageH = $derived(targetH > 0 ? targetH * scale : frameH);

/** Can the canvas be panned? Only after zooming MANUALLY past the surface.
 *
 *  In fit mode the surface must never scroll: the page already has its
 *  own scrollbar inside the iframe, and a scrollbar around the canvas on
 *  top of that is both one scrollbar too many and a self-reinforcing loop
 *  (the scrollbar eats space, the surface measures narrower, the canvas
 *  rescales, the scrollbar comes and goes, and the page pumps). The 1 px
 *  tolerance keeps it from flipping back and forth right at the edge. */
let canPan = $derived(stageW > frameW + 1 || stageH > frameH + 1);

// Raw state, so a part that keeps the bridge in a $derived follows a reload of the preview; the bridge is a plain object, never proxied.
let bridge = $state.raw(null);

/** The preview's light/dark mode: a stored choice wins, otherwise the OS
 *  (same resolution as the engine's applyTheme). The iframe toggle
 *  writes localStorage from its own browsing context, so the storage
 *  event reaches the admin window. */
const readPreviewMode = () => {
  let stored = null;
  try { stored = localStorage.getItem('urd-theme-mode'); } catch { /* private mode: follow the OS */ }
  return resolveThemeMode(siteState.siteDraft?.theme?.scheme, stored,
    window.matchMedia('(prefers-color-scheme: dark)').matches);
};

let previewMode = $state('light');

function onIframeLoad() {
  bridge?.destroy();
  // A click in the preview (block, text field, canvas) closes the block
  // menu. The iframe is same-origin, so we listen directly; the gear
  // click closes first and reopens via the urd-block-menu message
  // afterwards (it arrives later).
  iframeEl?.contentDocument?.addEventListener('pointerdown', () => {
    if (pageState.blockMenu) pageState.blockMenu = null;
  }, true);
  bridge = createPreviewBridge(iframeEl, {
    onEdit: bridgeState.handleEdit,
    onMove: bridgeState.handleMove,
    onGrow: bridgeState.handleGrow,
    onDelete: bridgeState.handleDelete,
    onAddSection: bridgeState.handleAddSection,
    onMoveSection: bridgeState.handleMoveSection,
    onDeleteSection: bridgeState.handleDeleteSection,
    onSectionSize: bridgeState.handleSectionSize,
    onUndo: (msg) => (msg.redo ? historyState.redo() : historyState.undo()),
    onSelectSection: pageState.onSelectSection,
    onSelectBlock: pageState.onSelectBlock,
    onBlockMenu: pageState.onBlockMenu,
    onMenuArea: pageState.onMenuArea,
    onReady,
    onNavigate,
    onLinkEdit,
    onAddBlock: (msg) => blocksState.insertBlock(msg.sectionId, msg.block),
    onAddBlocks: (msg) => blocksState.insertBlocks(msg.sectionId, msg.blocks, msg.minBottom, msg.moves),
    onRequestBlock: blocksState.handleRequestBlock,
    onCalendarDesigns: (msg) => { pageState.designPicker = { mode: 'add', place: { sectionId: msg.sectionId, at: msg.at } }; },
    onMoveBlockSection: bridgeState.handleMoveBlockSection,
    onMobileReset: bridgeState.handleMobileReset,
    onMobileOrder: bridgeState.handleMobileOrder,
    onReviewDone: bridgeState.handleReviewDone,
    onBlockFlag: bridgeState.handleBlockFlag,
    onBlockStyle: bridgeState.handleBlockStyle,
    onCollectionEdit: collectionsState.handleCollectionEdit,
    onOpenEntry: collectionsState.openEntry,
    onCollectionAdd: collectionsState.handleCollectionAdd,
    onSaveTemplate: templatesState.handleSaveTemplate,
    onStickyGroup: bridgeState.handleStickyGroup,
    onStickyDock: bridgeState.handleStickyDock,
    onDeleteTemplate: templatesState.handleDeleteTemplate,
    onApplyLayout: pageState.handleApplyLayout,
    onPluginBlocks: (msg) => { pluginsState.pluginBlocks = msg.blocks ?? []; },
    // Side-by-side column width dragged in the preview: bursts in the
    // same drag coalesce into ONE undo step (the edit: prefix).
    onNavWidth: (msg) => siteState.siteMutate('edit:nav-width', () => {
      siteState.siteDraft.nav.style ??= {};
      siteState.siteDraft.nav.style.width = msg.width;
    }),
  });
}

/** The fragment of a link in the preview that named a spot on another page, jumped to once that page has loaded (onReady). */
let pendingAnchor = '';

/** The engine in the iframe is listening now: send the draft and the current editor state. */
async function onReady() {
  await pageState.pageLoading;
  await pluginsState.pluginsReady;
  // The plugin draft's enabled list and the view choice: the preview
  // loads plugins from the DRAFT, and the viewport follows the editor's
  // choice (not the iframe width).
  bridge?.sendPlugins($state.snapshot(pluginsState.pluginsView)?.enabled ?? []);
  bridge?.sendViewport(viewMode);
  // The zoom is sent on every ready handshake, so the handles are
  // counter-scaled to admin size from the first render.
  bridge?.sendZoom(scale);
  collectionsState.pushCollectionsToPreview();
  templatesState.pushTemplatesToPreview();
  if (siteState.siteStore.hasDraft()) siteState.pushSiteToPreview();
  // Unpublished pages do not exist on the server (the iframe falls back
  // to the front page): the editor's data is the source and must always be sent.
  const unpublished = !siteState.site.pages.some((p) => p.id === pageState.pageId);
  if (pageState.store.hasDraft() || unpublished) bridge?.sendPage(pageState.pageId, pageState.store.data);
  if (!chromeVisible) bridge?.sendChrome(false);
  if (shellState.gridOn) bridge?.sendShowGrid(true);
  if (shellState.spellcheckPref === 'off') bridge?.sendSpellcheck(false);
  if (shellState.guidesOn) bridge?.sendShowGuides(true);
  shellState.sendAdminTheme();
  // A link from another page to a spot on this one: the jump follows the draft, so it lands in the page as edited.
  if (pendingAnchor) bridge?.sendScrollAnchor(pendingAnchor);
  pendingAnchor = '';
}

/** Internal link clicked in the preview: switch page properly, and jump to the spot the link's fragment names. */
function onNavigate(msg) {
  const path = msg.path.replace(/\/$/, '') || '/';
  const entry = siteState.siteDraft.pages.find((p) => p.path === path);
  if (!entry) return;
  const hash = typeof msg.hash === 'string' && msg.hash.length > 1 ? msg.hash : '';
  if (entry.id !== pageState.pageId) {
    pendingAnchor = hash;
    pageState.selectPage(entry.id);
  } else if (hash) {
    bridge?.sendScrollAnchor(hash);
  }
}

/**
 * The text toolbar's link or Ctrl+K in the preview: the link editor opens on the link at the caret, and its answer goes back to the text.
 * Selected words that are an email address or a phone number (eight to fifteen digits, spaces allowed, a + first) are offered as one.
 * The link is an undo step of its own: the text's change it comes back as starts a new step.
 */
function onLinkEdit(msg) {
  const words = typeof msg.text === 'string' ? msg.text.trim() : '';
  const digits = words.replace(/\s/g, '');
  const offered = msg.value ?? (emailLike(words) ? `mailto:${words}` : /^\+?\d{8,15}$/.test(digits) ? `tel:${digits}` : null);
  linkState.openLink({
    value: offered,
    removable: Boolean(msg.value),
    here: pageState.pageId,
    // Words in a text keep their link as an address, which a PDF held until publishing cannot be.
    upload: false,
    apply: (link) => {
      historyState.lastHistoryKey = null;
      bridge?.sendLinkApply(link);
    },
  });
}

/** Plugin changes require a fresh boot in the preview (an import cannot be undone); onReady sends the new list. */
function reloadPreview() {
  if (iframeEl) iframeEl.src = iframeEl.src;
}

/** The panel's place in the list while Clean view has it hidden. */
let panelScroll = 0;

async function toggleChrome() {
  // display: none keeps the folds' open state but drops the scroll
  // position, so it is read on the way out and put back on the way in.
  if (chromeVisible) panelScroll = shellState.panelEl?.scrollTop ?? 0;
  chromeVisible = !chromeVisible;
  bridge?.sendChrome(chromeVisible);
  // The Clean view shows the page as a visitor sees it: the element menu closes with the handles.
  if (!chromeVisible) pageState.blockMenu = null;
  if (!chromeVisible) return;
  await tick();
  // The panel has no scroll range until the browser has laid it out
  // again, so the restore waits for a frame.
  requestAnimationFrame(() => { if (shellState.panelEl) shellState.panelEl.scrollTop = panelScroll; });
}

/** The effects of this module, run once by the shell at its start. */
export function effects() {

  // A click anywhere in the admin (panels, top bar) closes open menus in
  // the preview; the iframe's own outside-click listeners never see these clicks.
  $effect(() => {
    const closeMenus = () => bridge?.sendCloseMenus();
    document.addEventListener('pointerdown', closeMenus, true);
    return () => document.removeEventListener('pointerdown', closeMenus, true);
  });

  // The preview's viewport follows the view choice, not the iframe width:
  // a narrow admin window must never tip the preview into mobile and hide
  // the structure tools.
  $effect(() => {
    const mode = viewMode;
    bridge?.sendViewport(mode);
  });

  // The zoom is reported so the editing handles can counter-scale and stay
  // the same size as the admin panels (see urd-zoom in previewBridge).
  $effect(() => {
    const z = scale;
    bridge?.sendZoom(z);
  });

  // The own window width follows the browser: a resize or a zoom change
  // changes the width the window reports.
  $effect(() => {
    const onResize = () => { ownWidth = ownWindowWidthOf(window) ?? ownWidth; };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  // .frame-wrap changes size on panel/rail open-close AND window resize;
  // measure it so the scale always fits the actual canvas surface.
  $effect(() => {
    const el = frameWrapEl;
    if (!el || typeof ResizeObserver === 'undefined') return;
    // clientWidth/Height, NOT getBoundingClientRect: the rect is the border
    // box and includes any scrollbars, while the content box is the surface
    // the canvas can actually use. The content box also yields integers, so
    // float rounding cannot make a canvas a fraction of a pixel too wide.
    const measure = () => {
      frameW = el.clientWidth; frameH = el.clientHeight;
    };
    measure(); // immediately, so the first frame does not flash at scale 1
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  });

  $effect(() => {
    previewMode = readPreviewMode();
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const update = (e) => {
      if (e instanceof StorageEvent && e.key && e.key !== 'urd-theme-mode') return;
      previewMode = readPreviewMode();
    };
    mq.addEventListener('change', update);
    window.addEventListener('storage', update);
    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('storage', update);
    };
  });
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const previewState = {
  get iframeEl() { return iframeEl; },
  set iframeEl(v) { iframeEl = v; },
  get chromeVisible() { return chromeVisible; },
  set chromeVisible(v) { chromeVisible = v; },
  get ownWidth() { return ownWidth; },
  set ownWidth(v) { ownWidth = v; },
  SCREEN_PREF_KEY,
  readScreenPref,
  get screenPref() { return screenPref; },
  set screenPref(v) { screenPref = v; },
  setScreenPref,
  get screenTarget() { return screenTarget; },
  set screenTarget(v) { screenTarget = v; },
  FIXED_DEVICES,
  get devices() { return devices; },
  set devices(v) { devices = v; },
  deviceTip,
  get deviceId() { return deviceId; },
  set deviceId(v) { deviceId = v; },
  get device() { return device; },
  set device(v) { device = v; },
  get viewMode() { return viewMode; },
  set viewMode(v) { viewMode = v; },
  get frameWrapEl() { return frameWrapEl; },
  set frameWrapEl(v) { frameWrapEl = v; },
  get frameW() { return frameW; },
  set frameW(v) { frameW = v; },
  get frameH() { return frameH; },
  set frameH(v) { frameH = v; },
  get zoomMode() { return zoomMode; },
  set zoomMode(v) { zoomMode = v; },
  get manualZoom() { return manualZoom; },
  set manualZoom(v) { manualZoom = v; },
  get targetW() { return targetW; },
  set targetW(v) { targetW = v; },
  get targetH() { return targetH; },
  set targetH(v) { targetH = v; },
  get scale() { return scale; },
  set scale(v) { scale = v; },
  stepZoom,
  get iframeH() { return iframeH; },
  set iframeH(v) { iframeH = v; },
  get stageW() { return stageW; },
  set stageW(v) { stageW = v; },
  get stageH() { return stageH; },
  set stageH(v) { stageH = v; },
  get canPan() { return canPan; },
  set canPan(v) { canPan = v; },
  get bridge() { return bridge; },
  set bridge(v) { bridge = v; },
  readPreviewMode,
  get previewMode() { return previewMode; },
  set previewMode(v) { previewMode = v; },
  onIframeLoad,
  onReady,
  onNavigate,
  reloadPreview,
  get panelScroll() { return panelScroll; },
  set panelScroll(v) { panelScroll = v; },
  toggleChrome,
  effects,
};
