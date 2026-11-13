/**
 * The preview: the iframe and the bridge to it, the device and the zoom, the Screen setting, the chrome, and the light or dark preview mode.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { ownWindowWidthOf, screenSetting, screenViewport, screenIcon as screenIconOf, SCREEN_SIZES } from '../lib/own-screen.js';
import { contentBand } from '../lib/content-width.js';
import { ta } from '$engine/i18n.js';
import { previewScale } from '../lib/preview-scale.js';
import { PHONE_SIZES, phoneSetting, phoneViewport, snapWidth } from '../lib/preview-width.js';
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
import { draftsState } from './drafts.svelte.js';
import { pictureEditorState } from './picture-editor.svelte.js';
import { paletteState } from './palette.svelte.js';
import { siteState } from './site.svelte.js';
import { templatesState } from './templates.svelte.js';
import { linkState } from './link.svelte.js';
import { emailLike } from '../lib/link-edit.js';
import { stoodOf, readStood, keepStood, canvasTop } from '../lib/reload-place.js';

let iframeEl = $state(null);

/** Clean preview: hides all editing handles in the iframe */
let chromeVisible = $state(true);

/** The canvas target devices (ADR-0018, the Squarespace model): each is a
 *  REAL screen size, not a view mode, so there is no "wrong" mode to be in.
 *  Screen is the owner's own browser window width by default (the window the
 *  published page is compared in), a common screen size with its height, or
 *  an own size (lib/own-screen.js); the Phone is a phone or tablet size
 *  (lib/preview-width.js). Both are split buttons whose fold-out holds the
 *  sizes; a size with a height pins both axes and shows the fold.
 *  `viewport` is what the ENGINE gets to know (it only knows
 *  desktop/mobile): the Screen is desktop view, and the Phone's size is
 *  mobile below the site's phone breakpoint and desktop above it (a tablet). */
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
  freeWidth = null;
}

let screenTarget = $derived(screenViewport(screenPref, ownWidth));

/** The Phone device's size (lib/preview-width.js): a preset with its height, the width alone, or an own size; per browser like the Screen's editing size. */
const PHONE_PREF_KEY = 'urd-admin-phone';

function readPhonePref() {
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(PHONE_PREF_KEY) ?? 'null'); } catch { raw = null; }
  return phoneSetting(raw);
}

let phonePref = $state(readPhonePref());

function setPhonePref(patch) {
  phonePref = phoneSetting({ ...$state.snapshot(phonePref), ...patch });
  try { localStorage.setItem(PHONE_PREF_KEY, JSON.stringify(phonePref)); } catch { /* blocked storage: the choice lasts the session */ }
  freeWidth = null;
}

let phoneTarget = $derived(phoneViewport(phonePref));

let devices = $derived([
  { id: 'desktop', width: screenTarget.width, height: screenTarget.height || null, viewport: 'desktop' },
  { id: 'mobile', width: phoneTarget.width, height: phoneTarget.height || null, viewport: phoneTarget.width <= (siteState.siteDraft?.breakpoints?.mobile ?? 640) ? 'mobile' : 'desktop' },
]);

/** The icon the Screen button shows: a laptop while a laptop size is chosen. */
const screenIcon = $derived(screenIconOf(screenPref));

/** The icon the Phone button shows: a tablet while a tablet size is chosen. */
const phoneIcon = $derived(phoneTarget.width > (siteState.siteDraft?.breakpoints?.mobile ?? 640) ? 'device_tablet' : 'device_mobile');

/** A width dragged at the canvas's edge, in canvas px; null while a device stands. Not remembered: the sizes to come back to are the devices'. */
let freeWidth = $state(null);

/** The widths a dragged edge snaps to: the devices', the screen and phone sizes' and the site's phone breakpoint. */
const dragStops = $derived([...devices.map((d) => d.width), ...SCREEN_SIZES.map((s) => s.width), ...PHONE_SIZES.map((p) => p.width), siteState.siteDraft?.breakpoints?.mobile ?? 640]);

/** Sets the dragged width, snapped to the stops within the tolerance given in canvas px. */
function setFreeWidth(width, tolerance = 0) {
  freeWidth = snapWidth(width, dragStops, tolerance);
}

/** The device tooltip: the Screen and the Phone name their size, a dragged width its number. */
function deviceTip(d) {
  const c = Math.round(contentBand(siteState.layoutWidth, siteState.layoutGutter, d.width).width);
  const key = d.id === 'free' ? 'tip.view.free'
    : d.id === 'mobile' ? (d.viewport === 'desktop' ? 'tip.view.tabletH' : d.height ? 'tip.view.mobileH' : 'tip.view.mobile')
    : screenPref.size === 'window' ? 'tip.view.desktop'
    : d.height ? 'tip.view.desktopSizeH' : 'tip.view.desktopSize';
  return ta(key, { w: d.width, h: d.height ?? 0, c });
}

/** Where the admin stood before a reload of the tab (lib/reload-place.js): its device is taken at once, and its selection and the canvas's scroll once the canvas first stands (onReady). */
let stood = stoodOf(readStood(), ['desktop', 'mobile']);

let deviceId = $state(stood.device ?? 'desktop');

/** Where the canvas is scrolled on its page, measured a moment after each scroll, and kept as the admin is left. */
let canvasPlace = null;
let canvasPlaceTimer = 0;

let device = $derived(freeWidth
  ? { id: 'free', width: freeWidth, height: null, viewport: 'desktop' }
  : devices.find((d) => d.id === deviceId) ?? devices[0]);

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
  // menu and the top bar's tool menu. The iframe is same-origin, so we
  // listen directly. A press on a bar button that opens the menu (the gear,
  // a tool, the design button, marked `data-opens-menu` by the engine)
  // leaves the menu to the message that follows it, which opens the tool's
  // group inside the menu standing open, closes it at a second press, or
  // opens another (onBlockMenu and onSectionMenu in page.svelte.js).
  iframeEl?.contentWindow?.addEventListener('scroll', () => {
    clearTimeout(canvasPlaceTimer);
    canvasPlaceTimer = setTimeout(() => {
      const top = canvasTop(iframeEl?.contentDocument);
      canvasPlace = top ? { page: pageState.pageId, ...top } : null;
    }, 150);
  }, { passive: true });
  iframeEl?.contentDocument?.addEventListener('pointerdown', (event) => {
    if (pageState.blockMenu && !event.target?.closest?.('[data-opens-menu]')) pageState.blockMenu = null;
    if (shellState.toolMenu) shellState.toolMenu = null;
    if (draftsState.draftsOpen && !draftsState.draftsPinned) draftsState.closeDrafts();
  }, true);
  bridge = createPreviewBridge(iframeEl, {
    onEdit: bridgeState.handleEdit,
    onRedrawSection: bridgeState.handleRedrawSection,
    onPictureEdit: (msg) => pictureEditorState.openPicture(msg),
    onMove: bridgeState.handleMove,
    onGrow: bridgeState.handleGrow,
    onDelete: bridgeState.handleDelete,
    onAddSection: bridgeState.handleAddSection,
    onMoveSection: bridgeState.handleMoveSection,
    onDeleteSection: bridgeState.handleDeleteSection,
    onDuplicateSection: bridgeState.handleDuplicateSection,
    onClipboard: bridgeState.handleClipboard,
    onPasteSection: bridgeState.handlePasteSection,
    onSectionSize: bridgeState.handleSectionSize,
    onUndo: (msg) => (msg.redo ? historyState.redo() : historyState.undo()),
    onSelectSection: pageState.onSelectSection,
    onSelectBlock: pageState.onSelectBlock,
    onBlockMenu: pageState.onBlockMenu,
    onSectionMenu: pageState.onSectionMenu,
    onBlockDesign: pageState.onBlockDesign,
    onMenuArea: pageState.onMenuArea,
    onReady,
    onNavigate,
    onLinkEdit,
    onAddBlock: (msg) => blocksState.insertBlock(msg.sectionId, msg.block),
    onAddBlocks: (msg) => blocksState.insertBlocks(msg.sectionId, msg.blocks, msg.minBottom, msg.moves),
    onRequestBlock: blocksState.handleRequestBlock,
    onCalendarDesigns: (msg) => { pageState.designPicker = { mode: 'add', place: { sectionId: msg.sectionId, at: msg.at } }; },
    onShortcuts: () => shellState.openShortcuts(),
    onToggleGrid: () => shellState.toggleGrid(),
    onPalette: () => paletteState.openPalette(),
    onSaveKey: () => draftsState.saveKey(),
    onCommands: (msg) => { paletteState.pluginCommands = msg.commands; },
    onMoveBlockSection: bridgeState.handleMoveBlockSection,
    onMobileReset: bridgeState.handleMobileReset,
    onMobileOrder: bridgeState.handleMobileOrder,
    onReviewDone: bridgeState.handleReviewDone,
    onBlockFlag: bridgeState.handleBlockFlag,
    onBlockStyle: bridgeState.handleBlockStyle,
    onCollectionEdit: collectionsState.handleCollectionEdit,
    onOpenEntry: collectionsState.openEntry,
    // The canvas opens only the Nav panel, at one of the folds its tab's menu lists or at its top.
    onOpenPanel: (msg) => {
      if (msg.panel !== 'nav') return;
      const name = (value) => (typeof value === 'string' && /^[a-z]+$/.test(value) ? value : null);
      if (name(msg.fold)) shellState.showFold('nav', name(msg.fold), { part: name(msg.part) });
      else shellState.activePanel = 'nav';
    },
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
  // The bridge is built anew for every load of the canvas: a look that stands holds the draft's sends and the page's edits from the first message, and onReady draws it again.
  bridge.setLooking(Boolean(look));
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
  // A copy made on another page pastes on this one.
  if (bridgeState.clipboard) bridge?.sendClipboard(bridgeState.clipboard);
  // A publish whose deploy is not out yet: the iframe has read the files from before it.
  if (siteState.siteStore.hasDraft() || pageState.held.has('content/site.json')) siteState.pushSiteToPreview();
  // Unpublished pages do not exist on the server (the iframe falls back
  // to the front page): the editor's data is the source and must always be sent.
  const unpublished = !siteState.site.pages.some((p) => p.id === pageState.pageId);
  if (pageState.store.hasDraft() || unpublished || pageState.held.has(pageState.pageEntry()?.file)) bridge?.sendPage(pageState.pageId, pageState.store.data);
  if (!chromeVisible) bridge?.sendChrome(false);
  if (shellState.gridOn) bridge?.sendShowGrid(true);
  if (shellState.spellcheckPref === 'off') bridge?.sendSpellcheck(false);
  if (shellState.guidesOn) bridge?.sendShowGuides(true);
  shellState.sendAdminTheme();
  // A link from another page to a spot on this one: the jump follows the draft, so it lands in the page as edited.
  if (pendingAnchor) bridge?.sendScrollAnchor(pendingAnchor);
  pendingAnchor = '';
  // A canvas loaded again while a saved draft is looked at shows it again; another page ends the look.
  if (look && look.pageId !== pageState.pageId) endLook();
  else if (look) sendLooked();
  // The first canvas after a reload comes back to where the admin stood on its page: the section or the block selected, then the scroll.
  const back = stood;
  stood = null;
  if (back?.page === pageState.pageId) {
    if (back.blockId) bridge?.sendSelect(back.blockId);
    else if (back.sectionId) {
      pageState.activeSectionId = back.sectionId;
      bridge?.sendActiveSection(back.sectionId);
    }
    if (back.top) bridge?.sendScrollTo(back.top.sectionId, back.top.offset);
  }
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

/**
 * Looking at a saved draft in the canvas (the Drafts window, ADR-0032): the saved version drawn in this browser's place, with editing paused until «Back to mine» (endLook).
 * The page's handles are off, its edits dropped and the draft's own sends held by the bridge (lib/previewBridge.js setLooking), the element menu closed and the measures asked for before dropped, so nothing of the saved version is written into this browser's draft; the page switching ends it.
 * `look`: what is looked at (`part`, its `name`, where and when it was saved, `from` and `when`), the saved `page` and the saved `site` where they are sent, this browser's version of the page (`mine`, null where it is the open page's), the device the canvas showed before (`device`), and, with `both`, which of the two the canvas shows (`showing`: 'saved' or 'mine').
 */
let look = $state.raw(null);
/** Counts the looks started and ended, so a look whose saved version is still being read starts only where nothing has happened meanwhile. */
let lookTurns = 0;

/** The version the look shows, sent to the canvas with its handles off, each time with the site settings it stands in, so a saved site from one look never stays for the next; a bridge made anew for a reloaded canvas is told to hold the draft again. */
function sendLooked() {
  if (!look || !bridge) return;
  bridge.setLooking(true);
  const site = $state.snapshot(siteState.siteDraft);
  if (look.showing === 'mine') bridge.sendLook(pageState.pageId, look.mine ?? $state.snapshot(pageState.store.data), site);
  else bridge.sendLook(pageState.pageId, look.page, look.site ?? site);
  bridge.sendChrome(false);
}

/**
 * Starts looking at a saved draft, on the phone where asked; the element menu and the top bar's menus close, and the device the canvas showed comes back as the look ends.
 * @param {{part: string, name: string, from?: string, when?: string, page?: object|null, site?: object|null, mine?: object|null, both?: boolean, phone?: boolean}} what
 */
function startLook({ part, name, from = '', when = '', page = null, site = null, mine = null, both = false, phone = false }) {
  if (!bridge || (!page && !site)) return;
  pageState.blockMenu = null;
  shellState.toolMenu = null;
  pageState.dropFits();
  lookTurns += 1;
  look = { part, name, from, when, page, site, mine, both, showing: 'saved', pageId: pageState.pageId, device: look?.device ?? deviceId };
  if (phone) {
    deviceId = 'mobile';
    freeWidth = null;
  }
  sendLooked();
}

/** «Look at both»: the saved version or this browser's in the canvas. */
function showLooked(showing) {
  if (!look || look.showing === showing) return;
  look = { ...look, showing };
  sendLooked();
}

/** «Back to mine»: this browser's version in the canvas again, with its handles as the Clean view has them. */
function endLook() {
  if (!look) return;
  if (deviceId !== look.device) {
    deviceId = look.device;
    freeWidth = null;
  }
  look = null;
  lookTurns += 1;
  bridge?.setLooking(false);
  siteState.pushSiteToPreview();
  bridge?.sendPage(pageState.pageId, pageState.store.data);
  bridge?.sendChrome(chromeVisible);
}

async function toggleChrome() {
  // A look keeps the canvas's handles off and the admin as it stands, until it ends.
  if (look) return;
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

  // Where the admin stands is kept as it is left, so a reload of the tab comes back to it (lib/reload-place.js).
  $effect(() => {
    const keep = () => keepStood({
      page: pageState.pageId,
      device: deviceId,
      sectionId: pageState.activeSectionId ?? null,
      blockId: pageState.selectedBlock?.blockId ?? null,
      top: canvasPlace?.page === pageState.pageId ? { sectionId: canvasPlace.sectionId, offset: canvasPlace.offset } : null,
    });
    window.addEventListener('pagehide', keep);
    return () => window.removeEventListener('pagehide', keep);
  });

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
  /** The saved draft looked at in the canvas, or null. */
  get looking() { return look; },
  /** Counts the looks started and ended. */
  get lookTurns() { return lookTurns; },
  startLook,
  showLooked,
  endLook,
  set chromeVisible(v) { chromeVisible = v; },
  get ownWidth() { return ownWidth; },
  set ownWidth(v) { ownWidth = v; },
  SCREEN_PREF_KEY,
  readScreenPref,
  get screenPref() { return screenPref; },
  get screenIcon() { return screenIcon; },
  SCREEN_SIZES,
  set screenPref(v) { screenPref = v; },
  setScreenPref,
  get screenTarget() { return screenTarget; },
  set screenTarget(v) { screenTarget = v; },
  get devices() { return devices; },
  set devices(v) { devices = v; },
  deviceTip,
  get deviceId() { return deviceId; },
  set deviceId(v) { deviceId = v; freeWidth = null; },
  get phonePref() { return phonePref; },
  get phoneIcon() { return phoneIcon; },
  setPhonePref,
  PHONE_SIZES,
  get freeWidth() { return freeWidth; },
  setFreeWidth,
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
