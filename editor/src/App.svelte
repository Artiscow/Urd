<script>
  // The editor shell: preview iframe with the real page, click-and-type
  // on text blocks, drafts in localStorage and a publish button against
  // /api/github/commit.
  import { tick, setContext } from 'svelte';
  import { fly } from 'svelte/transition';
  import { createDraftStore } from './lib/draftStore.js';
  import ColorPicker from './lib/ColorPicker.svelte';

  import { createPreviewBridge } from './lib/previewBridge.js';
  import { createPhoneFit } from './lib/phone-fit.js';
  import { menu, setMenuWidthPref, measureMenuRoom as measureRoom, MENU_WIDE_W } from './menu/state.svelte.js';
  import { DOCK_OPTIONS } from './menu/options.js';
  import ElementMenu from './menu/ElementMenu.svelte';
  import FloatingMenu from './menu/FloatingMenu.svelte';

  import BlocksPanel from './panels/BlocksPanel.svelte';
  import PropertiesPanel from './panels/PropertiesPanel.svelte';
  import CollectionsPanel from './panels/CollectionsPanel.svelte';
  import PluginsPanel from './panels/PluginsPanel.svelte';
  import HistoryPanel from './panels/HistoryPanel.svelte';
  import UpdatePanel from './panels/UpdatePanel.svelte';

  import PagesPanel from './panels/PagesPanel.svelte';
  import NavPanel from './panels/NavPanel.svelte';
  import SitePanel from './panels/SitePanel.svelte';
  import ThemePanel from './panels/ThemePanel.svelte';
  import GridPanel from './panels/GridPanel.svelte';
  import FooterPanel from './panels/FooterPanel.svelte';
  import { previewScale } from './lib/preview-scale.js';
  import { deployTargets, awaitServed } from './lib/deploy-wait.js';
  import { ownWindowWidthOf, screenSetting, screenViewport, SCREEN_WIDTH_MIN, SCREEN_WIDTH_MAX, SCREEN_HEIGHT_MIN, SCREEN_HEIGHT_MAX } from './lib/own-screen.js';
  import { contentBand, bindingWidth } from './lib/content-width.js';

  import Dropdown from './lib/Dropdown.svelte';

  import IconEditor from './lib/IconEditor.svelte';
  import DesignPicker from './lib/DesignPicker.svelte';
  // The editor shares the migration code with the engine (same file, bundled in).
  import { defaultFormFields } from '$engine/blocks/form.js';
  import { liftPageFile, liftSiteFile, PAGE_SCHEMA_VERSION, SITE_SCHEMA_VERSION } from '$engine/migrate.js';
  import { ta, taApiError } from '$engine/i18n.js';
  import { validateManifest, satisfiesEngine } from '$engine/plugins.js';
  import { makeId } from '$engine/sections/presets.js';
  import { templateId, TEMPLATE_SCHEMA_VERSION, TEMPLATE_KINDS, clonePageForInsert } from '$engine/templates-model.js';

  import { buildSitemapXml, buildRobotsTxt, buildRssXml, FEED_KINDS } from '$engine/feeds.js';

  import { buildPagePreset } from '$engine/page-presets.js';

  // The background and animation definitions are reused for labels and
  // defaults, so the editor and the engine never drift apart.
  import { colorLayer } from '$engine/backgrounds/color.js';
  import { gradientLayer } from '$engine/backgrounds/gradient.js';
  import { glowLayer } from '$engine/backgrounds/glow.js';
  import { grainLayer } from '$engine/backgrounds/grain.js';
  import { patternLayer } from '$engine/backgrounds/pattern.js';

  import { imageLayer } from '$engine/backgrounds/image.js';
  import { slideshowLayer } from '$engine/backgrounds/slideshow.js';

  import { videoLayer } from '$engine/backgrounds/video.js';

  import { coreAnimations } from '$engine/animations/core.js';
  import { contrastRatio, relativeLuminance, buildThemeCss, resolveThemeMode, activeTokens } from '$engine/theme.js';
  import { compressToWebp, svgToDataUrl, tightSvgViewBox, svgViewBox, slugify, contentHash, mediaExtension, WARN_BYTES, VIDEO_WARN_BYTES, VIDEO_MAX_BYTES, ANIMATED_WARN_BYTES, ANIMATED_MAX_BYTES } from '$engine/imageTools.js';
  import { FONT_STACKS } from '$engine/fonts.js';

  import { frameAtPoint } from '$engine/place.js';
  import { FETCHES_CONTENT, STRETCHES, followsContent, fitMoves, SIZE_TEXT, blockSize } from '$engine/push-model.js';

  import { calDesign, calView } from '$engine/calendar-designs.js';

  /** The background layer types in the order they are offered in the panel. */
  const BG_TYPES = [
    ['color', colorLayer],
    ['gradient', gradientLayer],
    ['glow', glowLayer],
    ['image', imageLayer],
    ['slideshow', slideshowLayer],
    ['video', videoLayer],
    ['pattern', patternLayer],
    ['grain', grainLayer],
  ];
  const BG_DEFS = Object.fromEntries(BG_TYPES);

  import { ICONS } from './lib/icons.js';

  /**
   * The admin's own color theme (the editor ONLY - the site's theme is
   * controlled by the user in the Theme panel). Picked in the top bar,
   * stored per browser. The palettes are defined as CSS variables in the
   * style block below.
   */
  const ADMIN_THEMES = [
    ['purple', ta('adminTheme.purple')],
    ['well', ta('adminTheme.well')],
    ['gold', ta('adminTheme.gold')],
    ['grey', ta('adminTheme.grey')],
    ['aurora', ta('adminTheme.aurora')],
    ['dusk', ta('adminTheme.dusk')],
    ['ember', ta('adminTheme.ember')],
  ];
  // The stored id may predate ADR-0021 (Norwegian theme ids); it is mapped on
  // read and the effect below writes the current id back.
  const LEGACY_ADMIN_THEMES = { lilla: 'purple', bronn: 'well', gull: 'gold', graa: 'grey', nordlys: 'aurora', skumring: 'dusk', glo: 'ember' };
  let adminTheme = $state((() => {
    const stored = localStorage.getItem('urd-admin-theme');
    return LEGACY_ADMIN_THEMES[stored] ?? stored ?? 'grey';
  })());

  $effect(() => {
    document.documentElement.dataset.adminTheme = adminTheme;
    localStorage.setItem('urd-admin-theme', adminTheme);
    sendAdminTheme();
  });

  /** Reports the admin's theme colors to the preview: the editor menus in
   *  there (block menu, section gallery) follow the admin, not the page.
   *  Read from the document's actual variables, so the palettes live in
   *  one place. */
  function sendAdminTheme() {
    const style = getComputedStyle(document.documentElement);
    const accent = style.getPropertyValue('--urd-color-accent').trim();
    bridge?.sendAdminTheme({
      bg: style.getPropertyValue('--urd-color-bg').trim(),
      surface: style.getPropertyValue('--urd-color-surface').trim(),
      accent,
      text: style.getPropertyValue('--urd-color-text').trim(),
      // Readable text ON the admin accent: pick black or white by the
      // accent's luminance, so white-on-light never occurs.
      'accent-text': readableOn(accent),
    });
  }

  /** Black or white text - whichever has the best WCAG contrast against the background. */
  function readableOn(bg) {
    const l = relativeLuminance(bg);
    if (l == null) return '#ffffff';
    return (contrastRatio(bg, '#ffffff') ?? 0) >= (contrastRatio(bg, '#0b0e14') ?? 0) ? '#ffffff' : '#0b0e14';
  }

  let site = $state(null);
  let pageId = $state(null);
  let dirty = $state(false);
  let status = $state('');
  /** 'info' | 'ok' | 'error' - controls the color of the status chip */
  let statusKind = $state('info');
  let statusSeq = 0;

  /** Set the status message; 'ok' messages clear themselves after 8 s. */
  function setStatus(msg, kind = 'info') {
    status = msg;
    statusKind = kind;
    const mine = ++statusSeq;
    if (kind === 'ok') {
      setTimeout(() => {
        if (statusSeq === mine) {
          status = '';
          statusKind = 'info';
        }
      }, 8000);
    }
  }
  /** Shared error message when a draft does not fit in localStorage (used by all draftStores). */
  function draftSaveError() {
    setStatus(ta('status.storageFull'), 'error');
  }

  /** Direct draft write (outside draftStore) with the same quota guard. */
  function writeDraftKey(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      draftSaveError();
    }
  }

  let iframeEl = $state(null);
  /** null = publishing layer unavailable (e.g. a simple local server without functions) */
  let auth = $state(null);
  /** Mirror of the site draft's grid: square cells, one size */
  let grid = $state({ size: 16, snap: true });

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
    const c = contentBand(layoutWidth, layoutGutter, d.width).width;
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
  let viewMode = $derived(device.viewport === 'mobile' || device.width <= (siteDraft?.breakpoints?.mobile ?? 640) ? 'mobile' : 'desktop');

  // Scaled canvas: the iframe renders the page in a full window viewport
  // (same as a visitor with a full window) and is scaled down to fit
  // .frame-wrap, instead of reflowing into the space left over after the
  // chrome. The render is then identical to the published page; only the
  // display size (zoom) changes. See lib/preview-scale.js.
  let frameWrapEl = $state(null);
  let frameW = $state(0);            // measured inner surface of .frame-wrap (px)
  let frameH = $state(0);
  /** Zoom for the editing canvas: 'fit' adapts to the window, 'full' = true 1:1. */
  let zoomMode = $state('fit'); // 'fit' | 'manual' (stepped with +/-)
  let manualZoom = $state(1);
  /** The window width from which the content actually reaches the design
   *  width. Shown under the sample, since it is not "width plus margins"
   *  when the margin is relative. */
  let bindsFrom = $derived(bindingWidth(layoutWidth, layoutGutter));
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
  /** Number of sections on the page that need mobile review */
  let attentionCount = $state(0);

  function updateAttention() {
    attentionCount = store?.data.sections
      .filter((s) => s.responsive?.mobile?.attention?.needed).length ?? 0;
  }

  /** The review badge: switch to mobile view and scroll to the first
   *  section that needs review. The scroll is sent after the viewport
   *  effect has flushed (postMessage is FIFO, so the order is guaranteed). */
  function jumpToAttention() {
    const target = store?.data.sections.find((s) => s.responsive?.mobile?.attention?.needed);
    deviceId = 'mobile';
    if (target) setTimeout(() => bridge?.sendScrollSection(target.id), 0);
  }

  /**
   * Desktop structure change in a manually mobile-adapted section:
   * flag the section for mobile review (rules in docs/SCHEMA.md#mobile-review).
   */
  /** "Switch layout": the variant's frames + minHeight are recorded as ONE
   *  undo step; mobile review is flagged as for other desktop changes. */
  function handleApplyLayout(msg) {
    const section = store.data.sections.find((x) => x.id === msg.sectionId);
    if (!section) return;
    pushHistory('layout');
    for (const move of msg.frames ?? []) {
      const block = section.blocks.find((b) => b.id === move.blockId);
      if (block) block.frames.desktop = { ...block.frames.desktop, ...move.frame };
    }
    section.size = { ...section.size, minHeight: msg.minHeight };
    markDesktopChange(section, 'layout-changed');
    if (msg.sectionId === activeSectionId) sectionMinHeight = msg.minHeight;
    if (selectedBlock?.sectionId === msg.sectionId) syncSelectedBlock();
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
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
    updateAttention();
    bridge?.sendAttention(section.id, true);
  }

  let store = null;
  let siteStore = null;
  let bridge = null;

  /**
   * Reactive mirror of the site DRAFT (pages, nav, theme): the panels read
   * and mutate this. `site` is the PUBLISHED state and is only used as the
   * diff baseline when publishing (deleted/moved pages).
   */
  let siteDraft = $state(null);

  /** Links siteDraft and siteStore to the same object (via the Svelte proxy). */
  function linkSiteDraft() {
    siteDraft = siteStore.data;
    siteStore.replace(siteDraft);
  }

  /**
   * The site draft for the preview. ALWAYS through this: siteDraft is a
   * Svelte proxy, and postMessage (structured clone) throws DataCloneError
   * on proxies - $state.snapshot yields a plain object.
   */
  function pushSiteToPreview() {
    bridge?.sendSite($state.snapshot(siteDraft));
  }

  /**
   * Newly published pages that do not yet exist on the server: the draft is
   * kept as the source until the deploy finishes, but must not count as
   * "unpublished". Cleaned up automatically the first time the page is
   * loaded from the server.
   */
  const pendingPublished = new Set();

  const pageEntry = () => siteDraft.pages.find((p) => p.id === pageId);

  function updateDirty() {
    // Drafts on ALL pages count, not just the current one - but not newly
    // published pages that are just waiting for deploy.
    const anyPageDraft = siteDraft?.pages?.some((p) =>
      !pendingPublished.has(p.id) && localStorage.getItem(`urd-draft-${p.id}`) !== null) ?? false;
    const anyCollectionDraft = collectionsIndexStore?.hasDraft()
      || Object.values(collectionStores).some((st) => st.hasDraft());
    const anyTemplateDraft = templatesIndexStore?.hasDraft()
      || Object.values(templateStores).some((st) => st.hasDraft());
    dirty = anyPageDraft
      || (store?.hasDraft() && !pendingPublished.has(pageId))
      || siteStore?.hasDraft() || pluginsStore?.hasDraft() || anyCollectionDraft || anyTemplateDraft || false;
  }

  /**
   * Undo/redo: snapshot-based history over the page, site, collection and
   * plugin drafts. pushHistory is called BEFORE every mutation; the keys
   * are used to merge bursts of the same action (each keystroke in a text
   * block must not become its own undo step).
   */
  const history = [];
  const redoStack = [];
  let lastHistoryKey = null;

  function snapshot() {
    // pageId is included: undo across page switches must put the page
    // content back on the PAGE it came from, not into the current page's draft.
    // Collections/plugins are null until their init flow has FINISHED (the
    // collectionsReady flag, not merely the index store existing: the stores
    // fill asynchronously afterwards, and a snapshot from that window would
    // miss collections that an undo would then delete); restore skips the
    // null parts.
    return JSON.stringify({
      pageId,
      page: store.data,
      site: siteStore.data,
      collectionsIndex: collectionsReady ? collectionsIndexStore.data : null,
      collections: collectionsReady
        ? Object.fromEntries(Object.entries(collectionStores).map(([id, st]) => [id, st.data]))
        : {},
      templatesIndex: templatesReady ? templatesIndexStore.data : null,
      templates: templatesReady
        ? Object.fromEntries(Object.entries(templateStores).map(([id, st]) => [id, st.data]))
        : {},
      plugins: pluginsStore?.data ?? null,
    });
  }

  function pushHistory(key) {
    if (key === lastHistoryKey && (key.startsWith('edit:') || key.startsWith('grid:'))) return;
    history.push(snapshot());
    if (history.length > 50) history.shift();
    redoStack.length = 0;
    lastHistoryKey = key;
  }

  function restore(snap) {
    const { pageId: snapPageId, page, site: siteSnap, collectionsIndex, collections, templatesIndex, templates, plugins } = JSON.parse(snap);
    siteStore.replace(siteSnap);
    linkSiteDraft();
    siteStore.save();
    grid = { snap: true, ...siteDraft.grid };
    pushSiteToPreview();
    // Collections/templates/plugins are restored BEFORE the page-switch
    // branch below, otherwise cross-page undo would lose those parts of the snapshot.
    restoreCollections(collectionsIndex, collections ?? {});
    restoreTemplates(templatesIndex, templates ?? {});
    restorePlugins(plugins);

    // The snapshot belongs to another page (undo across a page switch): put
    // the page content back as a draft THERE, and switch to it.
    if (snapPageId && snapPageId !== pageId && siteDraft.pages.some((p) => p.id === snapPageId)) {
      writeDraftKey(`urd-draft-${snapPageId}`, JSON.stringify(page));
      selectPage(snapPageId, { keepHistory: true });
      updateDirty();
      return;
    }

    store.replace(page);
    store.save();
    updateDirty();
    updateAttention();
    // The panel mirrors must follow the restored data, otherwise the
    // Properties/section panel shows stale values and the undo looks dead.
    syncSelectedBlock();
    syncSectionMirrors(store.data.sections.find((s) => s.id === activeSectionId));
    // Undo can remove the page you are on (an undone page creation):
    // then switch to the front page instead of being left hanging.
    if (!siteDraft.pages.some((p) => p.id === pageId)) {
      selectPage(siteDraft.pages[0].id, { keepHistory: true });
    } else {
      bridge?.sendPage(pageId, store.data);
    }
  }

  /** Restore the collection drafts from a snapshot (null = taken before init, skip).
   *  Missing stores are recreated against the published baseline; stores outside the snapshot are removed. */
  function restoreCollections(indexSnap, collectionsSnap) {
    if (!collectionsIndexStore || !indexSnap) return;
    const current = JSON.stringify({
      index: collectionsIndexStore.data,
      collections: Object.fromEntries(Object.entries(collectionStores).map(([id, st]) => [id, st.data])),
    });
    if (current === JSON.stringify({ index: indexSnap, collections: collectionsSnap })) return;
    collectionsIndexStore.replace(indexSnap);
    collectionsIndexStore.save();
    for (const id of Object.keys(collectionStores)) {
      if (!(id in collectionsSnap)) {
        localStorage.removeItem(`urd-draft-collection-${id}`);
        localStorage.removeItem(`urd-draft-samling-${id}`);
        delete collectionStores[id];
      }
    }
    for (const [id, data] of Object.entries(collectionsSnap)) {
      if (!collectionStores[id]) {
        // Undone deletion: the baseline is the published state, or "does
        // not exist" (null) for a collection that never got published
        // (mirrors addCollection, so hasDraft() stays true until publish).
        const baseline = publishedCollections[id] ?? null;
        collectionStores[id] = createDraftStore(`urd-draft-collection-${id}`, () => baseline, draftSaveError, `urd-draft-samling-${id}`);
      }
      collectionStores[id].replace(data);
      collectionStores[id].save();
    }
    collectionIds = [...(indexSnap.samlinger ?? [])];
    if (activeCollection && !collectionIds.includes(activeCollection)) activeCollection = null;
    syncCollectionsView();
  }

  /** Restore the template drafts from a snapshot (null = taken before init, skip).
   *  Mirrors restoreCollections, with a "does not exist" baseline for never-published templates. */
  function restoreTemplates(indexSnap, templatesSnap) {
    if (!templatesIndexStore || !indexSnap) return;
    const current = JSON.stringify({
      index: templatesIndexStore.data,
      templates: Object.fromEntries(Object.entries(templateStores).map(([id, st]) => [id, st.data])),
    });
    if (current === JSON.stringify({ index: indexSnap, templates: templatesSnap })) return;
    templatesIndexStore.replace(indexSnap);
    templatesIndexStore.save();
    for (const id of Object.keys(templateStores)) {
      if (!(id in templatesSnap)) {
        localStorage.removeItem(`urd-draft-template-${id}`);
        localStorage.removeItem(`urd-draft-mal-${id}`);
        delete templateStores[id];
      }
    }
    for (const [id, data] of Object.entries(templatesSnap)) {
      if (!templateStores[id]) {
        templateStores[id] = createDraftStore(`urd-draft-template-${id}`, () => publishedTemplates[id] ?? null, draftSaveError, `urd-draft-mal-${id}`);
      }
      templateStores[id].replace(data);
      templateStores[id].save();
    }
    templateIds = [...(indexSnap.maler ?? [])];
    updateDirty();
    pushTemplatesToPreview();
  }

  /** Restore the plugin draft from a snapshot (null = taken before init, skip).
   *  Diff-guarded: only a real plugin change should cost a preview reboot. */
  function restorePlugins(pluginsSnap) {
    if (!pluginsStore || !pluginsSnap) return;
    if (JSON.stringify(pluginsStore.data) === JSON.stringify(pluginsSnap)) return;
    pluginsStore.replace(pluginsSnap);
    pluginsStore.save();
    syncPluginsView();
    reloadPreview();
  }

  function undo() {
    if (!history.length) return;
    dropFits();
    redoStack.push(snapshot());
    restore(history.pop());
    lastHistoryKey = null;
    setStatus(ta('status.undone'));
  }

  function redo() {
    if (!redoStack.length) return;
    dropFits();
    history.push(snapshot());
    restore(redoStack.pop());
    lastHistoryKey = null;
    setStatus(ta('status.redone'));
  }

  // A click anywhere in the admin outside the block menu closes it (clicks
  // in the preview are handled via onSelectBlock; iframe clicks never reach here).
  function onPointerdownWindow(e) {
    if (!blockMenu) return;
    if (e.target instanceof Element && e.target.closest('.block-menu')) return;
    blockMenu = null;
  }

  function onKeydown(e) {
    if (e.key === 'Escape' && blockMenu) {
      blockMenu = null;
      return;
    }
    if (!(e.ctrlKey || e.metaKey)) return;
    const key = e.key.toLowerCase();
    // Ctrl+D with focus in the admin panels: duplicate the selected block
    // in the preview (otherwise the shortcut opens the browser's bookmark
    // dialog). Only real TEXT FIELDS keep the browser shortcut; numbers,
    // toggles and sliders (where focus lingers after a panel choice) must
    // not swallow Ctrl+D.
    if (key === 'd') {
      const t = e.target;
      const inTextField = t instanceof HTMLElement
        && (t.isContentEditable || t.tagName === 'TEXTAREA'
          || (t.tagName === 'INPUT' && !['number', 'checkbox', 'range', 'color'].includes(t.type)));
      if (inTextField || !selectedBlock || viewMode === 'mobile') return;
      e.preventDefault();
      bridge?.sendDuplicate();
      return;
    }
    if (key !== 'z' && key !== 'y') return;
    const t = e.target;
    // Free-text fields keep the browser's own undo; everything else
    // (numbers, toggles, sliders, COLOR PICKERS - focus lingers in them
    // after a choice) uses the editor's history.
    const nativeUndo = t instanceof HTMLElement
      && (t.isContentEditable || t.tagName === 'TEXTAREA'
        || (t.tagName === 'INPUT' && !['number', 'checkbox', 'range', 'color'].includes(t.type)));
    if (nativeUndo) return;
    e.preventDefault();
    if (key === 'y' || e.shiftKey) redo();
    else undo();
  }

  async function init() {
    site = liftSiteFile(await (await fetch('/content/site.json')).json());
    siteStore = createDraftStore('urd-draft-site', () => site, draftSaveError);
    // Site drafts with a higher schemaVersion than the engine are
    // discarded, the same guard as for page drafts (liftSiteFile would
    // otherwise let them through).
    if ((siteStore.data.schemaVersion ?? 1) > SITE_SCHEMA_VERSION) {
      console.warn(`Urd: the site draft has schemaVersion ${siteStore.data.schemaVersion} (the engine has ${SITE_SCHEMA_VERSION}) and is discarded`);
      // site is $state: structuredClone on the proxy throws (the snapshot lesson).
      siteStore.replace($state.snapshot(site));
    }
    // Drafts in an older format can sit in localStorage: lift them.
    siteStore.replace(liftSiteFile(siteStore.data));
    siteStore.save();
    linkSiteDraft();
    grid = { snap: true, ...siteDraft.grid };
    await selectPage(new URLSearchParams(location.search).get('page') ?? siteDraft.pages[0].id);
    await initPlugins();
    await initCollections();
    await initTemplates();
    await checkAuth();
    // The publish baseline requires login: signed out, the call would just
    // produce 401 noise in the console. After login (OAuth redirect) the
    // page reloads, so the baseline is fetched here then.
    if (auth) refreshBaseSha();
    // A panel remembered from the last visit opens with its data.
    loadPanelData();
    // The setup wizard: first visit on a fresh clone and not dismissed
    // before. Triggered ONLY by the template's explicit signal (site.setup);
    // the wizard removes the field on completion, so it never shows again.
    if (siteDraft.site.setup === true && !localStorage.getItem('urd-setup-done')) {
      setupName = siteDraft.site.title;
      setupAccent = siteDraft.theme.tokens.color.accent;
      setupBg = siteDraft.theme.tokens.color.bg;
      showSetup = true;
    }
  }

  /* ---------- The confirmation dialog ---------- */

  // The editor's own replacement for confirm(): a promise-based modal in
  // the same style as the setup wizard. Only one at a time (publishing and
  // undo are sequential flows).
  let confirmBox = $state(null);

  function askConfirm({ title, lines = [], okLabel = ta('confirm.ok'), cancelLabel = ta('confirm.cancel') }) {
    return new Promise((resolve) => {
      confirmBox = { title, lines, okLabel, cancelLabel, resolve };
    });
  }

  /** Like askConfirm, but with a text field: resolves with the text on OK, null on cancel. */
  function askPrompt({ title, lines = [], value = '', placeholder = '', okLabel = ta('confirm.ok'), cancelLabel = ta('confirm.cancel') }) {
    return new Promise((resolve) => {
      confirmBox = { title, lines, okLabel, cancelLabel, resolve, prompt: true, value, placeholder };
    });
  }

  function answerConfirm(ok) {
    confirmBox?.resolve(confirmBox.prompt ? (ok ? confirmBox.value : null) : ok);
    confirmBox = null;
  }

  // Distinguishes a click on the backdrop from a text drag that started
  // inside the card: both end with the same click target, but only the
  // former began on the backdrop.
  let confirmDownOnOverlay = false;

  // Escape cancels, like every other closable surface in the editor. Its
  // own listener rather than the global keydown handler: the dialog must
  // respond to Escape as long as focus is in the admin document, and
  // stopPropagation keeps the same keystroke from also closing the block
  // menu behind it. No blur closing (a modal must survive the preview
  // iframe taking focus).
  $effect(() => {
    if (!confirmBox) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      answerConfirm(false);
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  });

  /* ---------- The setup wizard ---------- */

  let showSetup = $state(false);
  let setupName = $state('');
  let setupAccent = $state('#7c5cff');
  let setupBg = $state('#0b0e14');

  function closeSetup() {
    localStorage.setItem('urd-setup-done', '1');
    showSetup = false;
  }

  function applySetup() {
    const name = setupName.trim();
    if (!name) return;
    siteMutate('setup', () => {
      siteDraft.site.title = name;
      siteDraft.nav.logo = { type: 'text', value: name };
      siteDraft.theme.tokens.color.accent = setupAccent;
      siteDraft.theme.tokens.color.bg = setupBg;
      // The signal is spent: the next publish removes it from site.json, so
      // the wizard never runs again for other editors.
      delete siteDraft.site.setup;
    });
    closeSetup();
    setStatus(ta('status.setupDone'), 'ok');
  }

  /** Active panel in the left panel picker (null = closed) */
  /* Whether the panels come back as they were left when the admin is loaded
     again: a personal workspace preference in localStorage (like theme and
     language), with only the non-default stored. Clean view keeps the folds
     on its own (the rail and the panel are hidden, not unmounted); this is
     about a fresh load of the admin. */
  const PANELS_PREF_KEY = 'urd-admin-panels';
  const PANEL_OPEN_KEY = 'urd-admin-panel-open';
  let panelsPref = $state(localStorage.getItem(PANELS_PREF_KEY) === 'reset' ? 'reset' : 'remember');
  function setPanelsPref(v) {
    panelsPref = v === 'reset' ? 'reset' : 'remember';
    if (panelsPref === 'reset') localStorage.setItem(PANELS_PREF_KEY, 'reset');
    else localStorage.removeItem(PANELS_PREF_KEY);
  }
  let activePanel = $state(panelsPref === 'reset' ? null : localStorage.getItem(PANEL_OPEN_KEY));
  /** The panels grouped by workflow: build the page, style the site,
   *  tools. Shown with dividers in the panel picker. The ids are stable
   *  English identifiers (never display text); PANEL_LABELS owns what the
   *  user sees. */
  const PANEL_GROUPS = [
    ['pages', 'blocks', 'properties', 'grid'],
    ['site', 'theme', 'nav', 'footer', 'collections', 'plugins'],
    ['history', 'update'],
  ];
  /** Uppercase label above each group in the rail, in the same order. */
  const PANEL_GROUP_KEYS = ['rail.thisPage', 'rail.site', 'rail.system'];
  const PANEL_LABELS = Object.fromEntries(PANEL_GROUPS.flat().map((id) => [id, ta(`panel.${id}`)]));
  // A remembered id from an older version may name a panel that is gone.
  if (activePanel && !PANEL_LABELS[activePanel]) activePanel = null;
  $effect(() => {
    if (panelsPref === 'reset') { localStorage.removeItem(PANEL_OPEN_KEY); return; }
    if (activePanel) localStorage.setItem(PANEL_OPEN_KEY, activePanel);
    else localStorage.removeItem(PANEL_OPEN_KEY);
  });

  /* The panel intros (the prose rule, ADR-0016): the explanation lives as
     a tooltip on the panel title, never as a paragraph in the panel.
     Panels without an entry have no intro; multiple keys are joined with
     line breaks. */
  const PANEL_INTROS = {
    pages: ['hint.pages.drafts'],
    blocks: ['hint.blocks.intro'],
    grid: ['hint.grid.intro', 'hint.grid.section'],
    collections: ['hint.collections.intro'],
    plugins: ['hint.plugins.intro'],
    history: ['hint.history.intro'],
  };

  /** The admin language picker: the languages under their OWN names
   *  (endonyms, never translated, never flags); "Automatic" follows the
   *  device language and is the default - a choice is remembered per
   *  browser (urd-admin-lang). */
  const LANG_OPTIONS = [
    ['se', 'Davvisámegiella'],
    ['en-GB', 'English (UK)'],
    ['nb', 'Norsk bokmål'],
    ['nn', 'Norsk nynorsk'],
    ['tr', 'Türkçe'],
  ];

  /** Languages from language-pack plugins: codes the engine does not have
   *  built in. Alphabetical by the language's own name, like the built-ins. */
  const sortLangs = (list) => [...list].sort((a, b) => a[1].localeCompare(b[1]));
  function packLangOptions(ids, kind) {
    const out = [];
    for (const id of ids) {
      for (const lang of pluginInfo[id]?.languages ?? []) {
        // Raw manifest data: a broken entry (missing name/code, or with a
        // built-in code) is skipped instead of taking down the panel - the
        // engine's loading filters the same way, so the picker must never
        // promise more.
        if (lang?.[kind] !== true) continue;
        if (typeof lang.code !== 'string' || typeof lang.name !== 'string' || !lang.name) continue;
        if (LANG_OPTIONS.some(([code]) => code === lang.code)) continue;
        if (!out.some(([code]) => code === lang.code)) out.push([lang.code, lang.name]);
      }
    }
    return out;
  }
  /** The admin picker follows the PUBLISHED plugin list: that is what the
   *  engine reads at startup, so a choice from here works right away. A
   *  stored choice that no longer exists (the pack was removed) is kept as
   *  its own option, so the picker never stands empty. */
  function adminLangOptions() {
    const options = sortLangs([...LANG_OPTIONS, ...packLangOptions(publishedPluginIds, 'admin')]);
    const known = adminLangChoice === 'auto' || options.some(([code]) => code === adminLangChoice);
    return known ? options : [[adminLangChoice, adminLangChoice], ...options];
  }
  /** The visitor language follows the draft: site.lang is published
   *  together with the plugin draft, so a pack enabled now applies to the
   *  same publish. */
  const sitePackLangs = () => packLangOptions(pluginsView?.enabled ?? [], 'site');
  const adminLangChoice = localStorage.getItem('urd-admin-lang') ?? 'auto';
  function setAdminLang(v) {
    if (v === adminLangChoice) return;
    if (v === 'auto') localStorage.removeItem('urd-admin-lang');
    else localStorage.setItem('urd-admin-lang', v);
    // A language switch is a reload (the Publii model): the dictionaries
    // are read at startup, and the iframe follows.
    location.reload();
  }

  function togglePanel(name) {
    activePanel = activePanel === name ? null : name;
    loadPanelData();
  }
  /** The panels that show fetched data ask for it when they open, a remembered one at startup too. */
  function loadPanelData() {
    if (activePanel === 'history') loadHistory();
    if (activePanel === 'update' && !updateBusy) loadUpdateCheck();
  }

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
    measureRoom(frameWrapEl?.getBoundingClientRect().left ?? 0);
  }
  $effect(() => {
    if (!blockMenu) return;
    measureMenuRoom();
    window.addEventListener('resize', measureMenuRoom);
    return () => window.removeEventListener('resize', measureMenuRoom);
  });
  /** The design picker (DesignPicker) over the editor: 'set' changes the selected calendar's design, 'add' adds a calendar in the chosen design; null = closed. */
  let designPicker = $state(null);
  $effect(() => {
    if (designPicker?.mode === 'set' && selectedBlock?.type !== 'calendar') designPicker = null;
  });

  /** The element menu's search belongs to one block's menu, so another
   *  block, or the floating menu closing, empties it (menu/state.svelte.js). */
  let searchBlockId = null;
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
  /** Reduced motion: exit transitions (the draft cluster) become a plain cut. */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onBlockMenu(msg) {
    onSelectBlock(msg);
    if (!selectedBlock) return;
    measureMenuRoom();
    const MENU_W = Math.min(menu.wide && menu.room >= MENU_WIDE_W ? MENU_WIDE_W : 400, window.innerWidth - 16);
    const ir = iframeEl?.getBoundingClientRect();
    if (!ir) return;
    // Beside the block: to the right if there is room, otherwise to the
    // left, clamped inside the window (the menu itself scrolls when height
    // is short). ir is the SCALED iframe rect; msg.rect is the block in the
    // iframe's OWN (unscaled) coordinates, so inner points must be
    // multiplied by scale before being added to the iframe's window
    // position (visual = ir + scale * inner).
    let left = ir.left + scale * msg.rect.right + 12;
    if (left + MENU_W > window.innerWidth - 8) {
      left = Math.max(8, ir.left + scale * msg.rect.left - MENU_W - 12);
    }
    const maxTop = window.innerHeight - Math.min(window.innerHeight * 0.7, 560) - 8;
    const top = Math.min(Math.max(8, ir.top + scale * msg.rect.top), Math.max(8, maxTop));
    blockMenu = { left, top };
  }

  /** Shared flow for block changes from the Properties panel. */
  function mutateBlock(key, fn) {
    const { section, block } = readBlock(selectedBlock?.sectionId, selectedBlock?.blockId);
    if (!block) return;
    // key null = the caller has already pushed history (multiple steps in ONE undo step).
    if (key) pushHistory(key);
    fn(block, section);
    markDesktopChange(section, 'block-edited');
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
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
    return [...siteDraft.pages.map((pg) => [pg.id, pg.title]), ['__href', ta('opt.externalLink')]];
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
    bridge?.sendOpenImageEditor(selectedBlock.blockId);
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
    if (viewMode !== 'desktop' || !followsContent(block)) return;
    clearTimeout(fitTimers.get(block.id));
    const seq = ++fitCount;
    fitSeq.set(block.id, seq);
    fitTimers.set(block.id, setTimeout(() => bridge?.sendFitBlock(sectionId, block.id, seq), 60));
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
        const enabled = $state.snapshot(pluginsView)?.enabled ?? [];
        const key = JSON.stringify(enabled);
        if (first || key !== phonePlugins) post({ type: 'urd-plugins', enabled });
        phonePlugins = key;
        post({ type: 'urd-site', site: $state.snapshot(siteDraft) });
        post({ type: 'urd-collections', collections: $state.snapshot(collectionsView) ?? {} });
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
    updateDirty();
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
     drawn smaller or larger, with the bounds its base text never passes.
     The default is stored as nothing, and a block back at full size drops
     its bounds with it. The frame follows the size, so the content keeps
     its lines: the width by the ratio, capped at the canvas edge, and the
     height the same way where the block owns it, with the blocks below
     moved as for a fit; a block whose height follows its content is fitted
     by the preview after the edit (fitBlockSoon). */
  /* One slider gesture is computed from where it began (sizeGesture: the
     block's size, its frame and the other blocks' places then), so a slide
     up and back returns the frame and the blocks below to where they were,
     also when the width met the canvas edge on the way. */
  let sizeGesture = null;
  function setBlockSize(value) {
    mutateBlock(`edit:${selectedBlock.blockId}:size`, (b, section) => {
      if (sizeGesture?.blockId !== b.id) {
        sizeGesture = {
          blockId: b.id,
          size: blockSize(b),
          frame: { ...b.frames.desktop },
          ys: new Map(section.blocks.filter((x) => x.frames?.desktop).map((x) => [x.id, x.frames.desktop.y])),
        };
      }
      if (value === 1) {
        delete b.size;
        delete b.sizeMin;
        delete b.sizeMax;
      } else {
        b.size = value;
      }
      const g = sizeGesture;
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
    });
  }
  function setBlockSizeBound(name, value) {
    const fallback = name === 'sizeMin' ? SIZE_TEXT.minDefault : SIZE_TEXT.maxDefault;
    mutateBlock(`edit:${selectedBlock.blockId}:${name}`, (b) => {
      const n = Math.round(Number(value));
      if (Number.isFinite(n) && n > 0 && n !== fallback) b[name] = Math.min(SIZE_TEXT.max, Math.max(SIZE_TEXT.min, n));
      else delete b[name];
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
    const site = typeof layoutWidth === 'number' ? layoutWidth : 0;
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
    pushHistory('hide-mobile');
    block.hideMobile = on;
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    syncSelectedBlock();
  }

  // FONT_STACKS lives in the engine's fonts.js (shared with the text editor
  // bar's typography row).

  /** Names of the block types in the panel. */
  const BLOCK_LABELS = { text: ta('blocks.text'), button: ta('blocks.button'), image: ta('blocks.image'), shape: ta('blocks.shape'), video: ta('blocks.video'), icon: ta('blocks.icon'), gallery: ta('blocks.gallery'), faq: ta('blocks.faq'), collection: ta('blocks.collection'), timeline: ta('blocks.timeline'), quote: ta('blocks.quote'), stats: ta('blocks.stats'), ribbon: ta('blocks.ribbon'), table: ta('blocks.table'), share: ta('blocks.share'), countdown: ta('blocks.countdown'), audio: ta('blocks.audio'), product: ta('blocks.product'), cart: ta('blocks.cart'), checkout: ta('blocks.checkout'), map: ta('blocks.map'), form: ta('blocks.form'), calendar: ta('blocks.calendar') };

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

  function measureSecBox() {
    try {
      const doc = iframeEl?.contentDocument;
      const el = doc?.querySelector(`.urd-section[data-section-id="${activeSectionId}"]`);
      const r = el?.getBoundingClientRect();
      secBox = r && r.width ? { w: r.width, h: r.height } : null;
    } catch { secBox = null; }
  }

  // Re-measure when the selected section changes (after the preview has
  // rendered) and when the preview iframe resizes.
  $effect(() => {
    activeSectionId; sectionBg;
    requestAnimationFrame(() => requestAnimationFrame(measureSecBox));
  });
  $effect(() => {
    const el = iframeEl;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => measureSecBox());
    ro.observe(el);
    return () => ro.disconnect();
  });

  function onSelectSection(msg) {
    activeSectionId = msg.sectionId;
    syncSectionMirrors(store?.data.sections.find((s) => s.id === msg.sectionId));
  }

  /** Shared flow for section changes from the Properties panel. */
  function mutateSection(key, fn) {
    const section = store.data.sections.find((s) => s.id === activeSectionId);
    if (!section) return;
    pushHistory(key);
    fn(section);
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    syncSectionMirrors(section);
  }

  /* ---------- The uploads ---------- */

  /* The background editor itself is section/BackgroundEditor.svelte; what
     stays here is shared by every upload in the editor: the SVG trim, the
     image compression and the video reading. */

  /* Measures the subject's extent in an SVG via canvas pixels (the SVG is
     rendered as an IMAGE, not live DOM - safe: no script execution, and
     svgToDataUrl has already rejected script SVGs). Returns the bounding
     box in the SVG's user coordinates. */
  async function svgContentBBox(dataUrl, vb) {
    try {
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = dataUrl; });
      const W = 320;
      const H = Math.max(1, Math.round((W * vb[3]) / vb[2]));
      const canvas = document.createElement('canvas');
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, W, H);
      const data = ctx.getImageData(0, 0, W, H).data;
      let minx = W, miny = H, maxx = -1, maxy = -1;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          if (data[(y * W + x) * 4 + 3] > 8) {
            if (x < minx) minx = x; if (x > maxx) maxx = x;
            if (y < miny) miny = y; if (y > maxy) maxy = y;
          }
        }
      }
      if (maxx < minx) return null;
      const sx = vb[2] / W, sy = vb[3] / H;
      return { x: vb[0] + minx * sx, y: vb[1] + miny * sy, width: (maxx - minx + 1) * sx, height: (maxy - miny + 1) * sy };
    } catch { return null; }
  }

  /* Uploaded SVG: validate + auto-trim (tighten the viewBox to the
     subject, remove dead space) so Cover/scale/position behave around the
     logo itself. Falls back gracefully to the untrimmed SVG if something
     cannot be measured. */
  async function svgAutoTrim(file) {
    const text = await file.text();
    const first = svgToDataUrl(text); // validates (throws on script SVG) + encodes
    const vb = svgViewBox(text);
    if (!vb) return first;
    const bbox = await svgContentBBox(first.dataUrl, vb);
    if (!bbox) return first;
    const trimmed = tightSvgViewBox(text, bbox);
    if (trimmed === text) return first;
    try { return svgToDataUrl(trimmed); } catch { return first; }
  }

  /* SVGs are auto-trimmed (viewBox tightened to the subject); raster is
     compressed to webp. Shared entry for all image uploads, so an SVG
     logo/icon fills its space. */
  async function compressOrTrim(file) {
    const isSvg = file.type === 'image/svg+xml' || /\.svg$/i.test(file.name || '');
    if (isSvg) return svgAutoTrim(file);
    const img = await compressToWebp(file);
    // An animation is kept as the file it is, so its size is the owner's to know about.
    if (img.animated && img.bytes > ANIMATED_WARN_BYTES) {
      setStatus(ta('status.animatedLarge', { mb: (img.bytes / 1_000_000).toFixed(1) }), 'error');
    }
    return img;
  }

  /** What to say when an image could not be taken: a too-large animation names its size and the limit. */
  function imageErrorText(err) {
    if (err?.code === 'animatedTooLarge') {
      return ta('status.animatedTooLarge', { mb: (err.bytes / 1_000_000).toFixed(1), max: Math.round(ANIMATED_MAX_BYTES / 1_000_000) });
    }
    return ta('status.imageReadError');
  }

  /** A video file as a data URL for the draft, inside the media limits from imageTools (the
      hard cap and the warning); publishing writes it to media/ like the images. */
  function readVideoFile(file, formatKey, done) {
    if (!['video/mp4', 'video/webm'].includes(file.type)) {
      setStatus(ta(formatKey), 'error');
      return;
    }
    if (file.size > VIDEO_MAX_BYTES) {
      setStatus(ta('status.videoTooLarge', { mb: (file.size / 1_000_000).toFixed(1), max: Math.round(VIDEO_MAX_BYTES / 1_000_000) }), 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      done(String(reader.result ?? ''));
      if (file.size > VIDEO_WARN_BYTES) {
        setStatus(ta('status.videoLarge', { mb: (file.size / 1_000_000).toFixed(1) }), 'error');
      }
    };
    reader.onerror = () => setStatus(ta('status.imageReadError'), 'error');
    reader.readAsDataURL(file);
  }

  /** The video block's own film (source 'file'). */
  function setBlockVideoFile(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) readVideoFile(file, 'status.videoFileFormat', (dataUrl) => setBlockProp('src', dataUrl));
  }

  /** The video block's poster: the still shown before the film plays. */
  async function setBlockVideoPoster(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      setBlockProp('poster', img.dataUrl);
    } catch (err) {
      setStatus(imageErrorText(err), 'error');
    }
  }

  /** A fresh seed for a scatter the owner wants to keep: never 0, which means the visit's. */
  const newSeed = () => 1 + (crypto.getRandomValues(new Uint32Array(1))[0] % 1000000);

  /* The slideshow layer: the image list is edited like the other
     background layers, but with multi-select upload (the whole batch in
     ONE undo step). */

  /** The bg contexts for the three targets (section/nav/footer). The
   *  section uses the sectionBg mirror; nav/footer read reactively from
   *  siteDraft. */
  function navBgMutate(key, fn) {
    siteMutate(key, () => { siteDraft.nav.style ??= {}; fn(siteDraft.nav.style); });
  }
  const sectionBgCtx = $derived({ mutate: mutateSection, keyPrefix: 'bg', keyId: activeSectionId });
  const navBgCtx = { mutate: navBgMutate, keyPrefix: 'navbg', keyId: 'nav' };
  const footerBgCtx = { mutate: footerMutate, keyPrefix: 'footerbg', keyId: 'footer' };

  /** The preview's light/dark mode: a stored choice wins, otherwise the OS
   *  (same resolution as the engine's applyTheme). The iframe toggle
   *  writes localStorage from its own browsing context, so the storage
   *  event reaches the admin window. */
  const readPreviewMode = () => {
    let stored = null;
    try { stored = localStorage.getItem('urd-theme-mode'); } catch { /* private mode: follow the OS */ }
    return resolveThemeMode(siteDraft?.theme?.scheme, stored,
      window.matchMedia('(prefers-color-scheme: dark)').matches);
  };
  let previewMode = $state('light');
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
  /** The palette as the canvas actually shows it (active mode, alt merge via the engine). */
  const previewPalette = $derived(siteDraft?.theme ? (activeTokens(siteDraft.theme, previewMode).color ?? {}) : {});

  /** The theme colors as quick picks in the color picker (the picker
   *  resolves token names itself, so no hexFor conversion is needed).
   *  The samples follow the preview's active light/dark mode. */
  const themeSwatches = () => Object.entries(previewPalette);

  /* ---------- Animations ---------- */

  function animObj(type) {
    return { type, version: coreAnimations[type].version, props: coreAnimations[type].defaults() };
  }

  /** Entrance animation and hover effect are independent fields
   *  (animation/hover) and can be combined. Older pages can have a hover
   *  effect stored in animation: it is normalized to hover on the next edit. */
  const isEntrance = (anim) => Boolean(anim && coreAnimations[anim.type]?.entrance);
  const ENTRANCE_OPTIONS = [['', ta('common.none')],
    ...Object.entries(coreAnimations).filter(([, def]) => def.entrance).map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])];
  // The block dropdown: group animations (stagger) are section-level and
  // do nothing on a block - they are filtered out here.
  const BLOCK_ENTRANCE_OPTIONS = ENTRANCE_OPTIONS.filter(([id]) => !coreAnimations[id]?.group);
  const HOVER_OPTIONS = [['', ta('common.none')],
    ...Object.entries(coreAnimations).filter(([, def]) => !def.entrance).map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])];

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
    if (selectedBlock) bridge?.sendDemoAnim(selectedBlock.sectionId, selectedBlock.blockId);
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
    if (selectedBlock) bridge?.sendDemoAnim(selectedBlock.sectionId, selectedBlock.blockId);
  }

  /** Height from the Properties panel: px number or CSS value (40vh, 50%). */
  function setSectionHeight(raw) {
    const section = store.data.sections.find((s) => s.id === activeSectionId);
    if (!section) return;
    const value = raw.trim();
    if (!value) return;
    const minHeight = /^\d+$/.test(value) ? `${value}px` : value;
    pushHistory('section-size');
    section.size = { ...section.size, minHeight };
    sectionMinHeight = minHeight;
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
  }

  function targetSection() {
    return store.data.sections.find((s) => s.id === activeSectionId) ?? store.data.sections[0];
  }

  function toggleSectionGrid(on) {
    const section = store.data.sections.find((s) => s.id === activeSectionId);
    if (!section) return;
    pushHistory('grid:section');
    section.grid = on ? { ...siteStore.data.grid } : null;
    sectionGrid = section.grid ? { ...section.grid } : null;
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    if (gridOn) bridge?.sendShowGrid(true);
  }

  function setSectionGrid(field, value) {
    const section = store.data.sections.find((s) => s.id === activeSectionId);
    if (!section?.grid) return;
    pushHistory('grid:section');
    section.grid = { ...section.grid, [field]: value };
    sectionGrid = { ...section.grid };
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    if (gridOn) bridge?.sendShowGrid(true);
  }

  /** The grid controls: changes are stored in the site draft and pushed
   *  live. The grid is only a snapping tool; changing it never moves content. */
  function setGrid(field, value) {
    pushHistory('grid:site');
    grid = { ...grid, [field]: value };
    siteStore.data.grid = { ...siteStore.data.grid, [field]: value };
    siteStore.save();
    updateDirty();
    pushSiteToPreview();
    // sendSite rerenders the page; turn the grid overlay back on afterwards
    // (postMessage is ordered, so this arrives after the rerender).
    if (gridOn) bridge?.sendShowGrid(true);
  }

  async function checkAuth() {
    try {
      const res = await fetch('/api/github/me');
      if (res.ok) {
        auth = await res.json();
      } else if (res.status !== 503) {
        auth = null;
      }
      // 503 = GitHub is down at the moment: keep the login status we have.
    } catch {
      auth = null;
    }
  }

  /**
   * The HEAD commit when the editor loaded (or last published): the
   * baseline for the conflict warning. null = unknown (not logged in /
   * local server), in which case the check is silently skipped.
   */
  let baseSha = null;

  async function refreshBaseSha() {
    try {
      const res = await fetch('/api/github/latest');
      if (res.ok) baseSha = (await res.json()).head ?? null;
    } catch { /* publishing layer unavailable */ }
  }

  /**
   * Conflict check before publishing: has someone else published since we
   * loaded, and do we touch the same files? Returns {ok, head}: ok=false
   * means the editor canceled; head is the HEAD we observed and is sent as
   * expect to the commit endpoint (closes the window between check and
   * commit server-side).
   */
  async function confirmNoConflict(files) {
    if (!baseSha) {
      // The baseline slipped at load (GitHub down): fetch HEAD now, so
      // expect at least closes the commit window. Without the original
      // baseline we cannot diff, so the editor must make the call
      // explicitly instead of the guard being silently skipped.
      await refreshBaseSha();
      const ok = await askConfirm({
        title: ta('confirm.conflictUnknown.title'),
        lines: [
          ta('confirm.conflictUnknown.body'),
          ta('confirm.conflictUnknown.warning'),
        ],
        okLabel: ta('confirm.publishAnyway'),
        cancelLabel: ta('confirm.cancel'),
      });
      return { ok, head: baseSha };
    }
    let data = null;
    try {
      const res = await fetch(`/api/github/latest?base=${baseSha}`);
      if (res.ok) data = await res.json().catch(() => null);
    } catch { /* unavailable: we do not stop the publish over that */ }
    if (!data?.head) return { ok: true, head: null };

    const head = data.head;
    if (head === baseSha) return { ok: true, head };

    const mine = new Set(files.map((f) => f.path));
    // Truncated diff (very large changes): we do NOT know whether there is
    // overlap, so the editor must make the call.
    const overlap = data.truncated
      ? [ta('confirm.conflict.truncated')]
      : (data.changedFiles ?? []).filter((p) => mine.has(p));
    if (overlap.length === 0) return { ok: true, head };

    const ok = await askConfirm({
      title: ta('confirm.conflict.title'),
      lines: [
        ta('confirm.conflict.intro'),
        ...overlap.map((p) => `• ${p}`),
        ta('confirm.conflict.warning'),
      ],
      okLabel: ta('confirm.publishAnyway'),
      cancelLabel: ta('confirm.cancel'),
    });
    return { ok, head };
  }

  /* ---------- The History panel ---------- */

  /** null = not loaded yet; [] = loaded and empty */
  let historyList = $state(null);
  let historyError = $state('');

  async function loadHistory() {
    historyError = '';
    try {
      const res = await fetch('/api/github/history');
      if (res.ok) {
        historyList = (await res.json()).commits;
      } else if (res.status === 401) {
        historyList = [];
        historyError = ta('status.historyLoginRequired');
      } else {
        historyList = [];
        historyError = taApiError(await res.json().catch(() => null)) ?? ta('status.historyFetchFailed');
      }
    } catch {
      historyList = [];
      historyError = ta('status.historyUnavailable');
    }
  }

  /**
   * After a revert the editor still shows the content from BEFORE the
   * revert (the restored version exists on the server only after deploy).
   * Publishing from that state would silently reintroduce what was
   * reverted - so publishing is blocked until the admin is reloaded.
   */
  let revertedSinceLoad = false;

  /** The publish whose deploy is being awaited: a newer publish makes an
   *  older wait fall silent instead of reporting a stale result. */
  let publishWave = 0;

  /**
   * After a publish: poll the committed content files until the site serves
   * them (lib/deploy-wait.js), so the status can say «live» rather than just
   * «committed». Nothing is reloaded and no draft changes: the drafts already
   * are the published state.
   */
  async function awaitPublishDeploy(files) {
    const wave = ++publishWave;
    // The status sequence at the publish: any message shown since (a
    // revert, a login prompt) makes the wait fall silent instead of
    // overwriting it.
    const seq = statusSeq;
    const live = await awaitServed(deployTargets(files));
    if (wave !== publishWave || seq !== statusSeq) return;
    if (live) setStatus(ta('status.publishLive'), 'ok');
    else setStatus(ta('status.publishDeployTimeout'), 'error');
  }

  /* ---------- The updater (ADR-0014) ---------- */

  /** The response from the GET check (null = not loaded yet). */
  let updateInfo = $state(null);
  let updateError = $state(null);
  let updateBusy = $state(false);
  /** Optional files the owner wants to keep their own version of (only
   *  outside the engine atom group; the server validates the same). */
  let updateSkip = $state(new Set());

  async function loadUpdateCheck() {
    updateBusy = true;
    updateError = null;
    updateInfo = null;
    try {
      const res = await fetch('/api/github/update');
      const data = await res.json().catch(() => null);
      if (res.ok) {
        updateInfo = data;
        updateSkip = new Set();
      } else {
        updateError = taApiError(data) ?? ta('update.checkFailed');
      }
    } catch {
      updateError = ta('status.publishLayerUnreachable');
    }
    updateBusy = false;
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
        if (res.ok) published = liftPageFile(await res.json(), siteStore.data);
      } catch { /* new, unpublished page */ }
      if (published) {
        // The page is out on the server: any wait-for-deploy marker is done
        // (store.save() below cleans the draft if it is identical).
        pendingPublished.delete(id);
      } else {
        published = blankPage(entry);
      }
      store = createDraftStore(`urd-draft-${id}`, () => published, draftSaveError);
      // A draft with a HIGHER schemaVersion than the engine (written by a
      // newer Urd) can neither be edited nor published safely: liftPageFile
      // lets it pass untouched, the layers render as placeholders, and a
      // publish would cement it. Discard the draft; the server is the
      // source of truth.
      if ((store.data.schemaVersion ?? 1) > PAGE_SCHEMA_VERSION) {
        console.warn(`Urd: the draft for '${id}' has schemaVersion ${store.data.schemaVersion} (the engine has ${PAGE_SCHEMA_VERSION}) and is discarded`);
        store.replace(structuredClone(published));
      }
      store.replace(liftPageFile(store.data, siteStore.data));
      store.save();
      // The undo history survives page switches: snapshots carry pageId,
      // and restore switches back to the right page. Without keepHistory
      // only the coalesce key is cleared, so the next change always gets
      // its own step.
      if (!keepHistory) lastHistoryKey = null;
      activeSectionId = null;
      sectionGrid = null;
      updateDirty();
      readSeoDraft();
      updateAttention();
      status = '';
    })();
    await pageLoading;
    // The iframe switches src via pageId; the draft is pushed when the
    // engine reports ready (urd-ready), never on iframe load (no one is
    // listening yet then).
  }

  function onIframeLoad() {
    bridge?.destroy();
    // A click in the preview (block, text field, canvas) closes the block
    // menu. The iframe is same-origin, so we listen directly; the gear
    // click closes first and reopens via the urd-block-menu message
    // afterwards (it arrives later).
    iframeEl?.contentDocument?.addEventListener('pointerdown', () => {
      if (blockMenu) blockMenu = null;
    }, true);
    bridge = createPreviewBridge(iframeEl, {
      onEdit: handleEdit,
      onMove: handleMove,
      onGrow: handleGrow,
      onDelete: handleDelete,
      onAddSection: handleAddSection,
      onMoveSection: handleMoveSection,
      onDeleteSection: handleDeleteSection,
      onSectionSize: handleSectionSize,
      onUndo: (msg) => (msg.redo ? redo() : undo()),
      onSelectSection,
      onSelectBlock,
      onBlockMenu,
      onReady,
      onNavigate,
      onAddBlock: (msg) => insertBlock(msg.sectionId, msg.block),
      onAddBlocks: (msg) => insertBlocks(msg.sectionId, msg.blocks, msg.minBottom, msg.moves),
      onRequestBlock: handleRequestBlock,
      onMoveBlockSection: handleMoveBlockSection,
      onMobileReset: handleMobileReset,
      onMobileOrder: handleMobileOrder,
      onReviewDone: handleReviewDone,
      onBlockFlag: handleBlockFlag,
      onCollectionEdit: handleCollectionEdit,
      onCollectionAdd: handleCollectionAdd,
      onSaveTemplate: handleSaveTemplate,
      onStickyGroup: handleStickyGroup,
      onStickyDock: handleStickyDock,
      onDeleteTemplate: handleDeleteTemplate,
      onApplyLayout: handleApplyLayout,
      onPluginBlocks: (msg) => { pluginBlocks = msg.blocks ?? []; },
      // Side-by-side column width dragged in the preview: bursts in the
      // same drag coalesce into ONE undo step (the edit: prefix).
      onNavWidth: (msg) => siteMutate('edit:nav-width', () => {
        siteDraft.nav.style ??= {};
        siteDraft.nav.style.width = msg.width;
      }),
    });
  }

  /** The engine in the iframe is listening now: send the draft and the current editor state. */
  async function onReady() {
    await pageLoading;
    await pluginsReady;
    // The plugin draft's enabled list and the view choice: the preview
    // loads plugins from the DRAFT, and the viewport follows the editor's
    // choice (not the iframe width).
    bridge?.sendPlugins($state.snapshot(pluginsView)?.enabled ?? []);
    bridge?.sendViewport(viewMode);
    // The zoom is sent on every ready handshake, so the handles are
    // counter-scaled to admin size from the first render.
    bridge?.sendZoom(scale);
    pushCollectionsToPreview();
    pushTemplatesToPreview();
    if (siteStore.hasDraft()) pushSiteToPreview();
    // Unpublished pages do not exist on the server (the iframe falls back
    // to the front page): the editor's data is the source and must always be sent.
    const unpublished = !site.pages.some((p) => p.id === pageId);
    if (store.hasDraft() || unpublished) bridge?.sendPage(pageId, store.data);
    if (!chromeVisible) bridge?.sendChrome(false);
    if (gridOn) bridge?.sendShowGrid(true);
    if (guidesOn) bridge?.sendShowGuides(true);
    sendAdminTheme();
  }

  /** Guides on/off: a personal workspace preference, remembered in
   *  localStorage (not page data) and re-established in onReady. */
  let guidesOn = $state(localStorage.getItem('urd-guides') === '1');

  /* The Urd settings (admin theme + language) live in a popover at the
     bottom of the rail, not in the top bar. Closed by outside click and Escape. */
  let settingsOpen = $state(false);

  /* The switch-layout picker's form: a strip above the section (default)
     or a gallery menu; a personal workspace preference in localStorage
     (like theme/language). The preview reads the key on every opening
     (shared origin), so the switch works without a reload. */
  let layoutPickerPref = $state(localStorage.getItem('urd-layout-picker') === 'menu' ? 'menu' : 'strip');
  function setLayoutPicker(v) {
    layoutPickerPref = v === 'menu' ? 'menu' : 'strip';
    if (layoutPickerPref === 'menu') localStorage.setItem('urd-layout-picker', 'menu');
    else localStorage.removeItem('urd-layout-picker');
  }
  let settingsEl = $state(null);
  $effect(() => {
    if (!settingsOpen) return;
    const onDown = (e) => { if (!settingsEl?.contains(e.target)) settingsOpen = false; };
    const onKey = (e) => { if (e.key === 'Escape') settingsOpen = false; };
    // A click in the preview iframe never reaches the editor's document;
    // the iframe takes focus and the admin window blurs - same closing
    // pattern as ColorPicker.
    const onBlur = () => { settingsOpen = false; };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey);
    window.addEventListener('blur', onBlur);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', onBlur);
    };
  });

  /* The top bar folds in fixed steps instead of wrapping to two rows.
     Most steps are pure CSS at the bottom of the file, but the three that
     swap a tool cluster for a menu change STRUCTURE and must therefore
     also be read in JS. The clusters yield one at a time, ordered by how
     often they are used: View first, then Device, and Zoom last. The
     numbers here are exactly the same as the media queries, not a
     measurement of the content, and the twinship is guarded in
     tests/topbar-fold.test.mjs. */
  const FOLD_MQ = { view: 1079, device: 999, zoom: 919 };
  let toolMenu = $state(null);
  let toolMenuEl = $state(null);
  let folded = $state({ view: false, device: false, zoom: false });
  $effect(() => {
    const offs = Object.entries(FOLD_MQ).map(([key, px]) => {
      const mq = window.matchMedia(`(max-width: ${px}px)`);
      const sync = () => { folded[key] = mq.matches; };
      sync();
      mq.addEventListener('change', sync);
      return () => mq.removeEventListener('change', sync);
    });
    return () => offs.forEach((off) => off());
  });

  /* A cluster that has unfolded again has no menu; the choice is cleaned up with it. */
  $effect(() => {
    if (toolMenu && !folded[toolMenu]) toolMenu = null;
  });

  /* One open tool menu at a time, same closing pattern as the settings. */
  $effect(() => {
    if (!toolMenu) return;
    const onDown = (e) => { if (!toolMenuEl?.contains(e.target)) toolMenu = null; };
    const onKey = (e) => { if (e.key === 'Escape') toolMenu = null; };
    const onBlur = () => { toolMenu = null; };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey);
    window.addEventListener('blur', onBlur);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', onBlur);
    };
  });

  function toggleGuides() {
    guidesOn = !guidesOn;
    localStorage.setItem('urd-guides', guidesOn ? '1' : '0');
    bridge?.sendShowGuides(guidesOn);
  }

  /** The grid overlay on/off: its own toggle next to the guides,
   *  independent of the Grid panel, remembered in localStorage like them. */
  let gridOn = $state(localStorage.getItem('urd-grid-overlay') === '1');
  function toggleGrid() {
    gridOn = !gridOn;
    localStorage.setItem('urd-grid-overlay', gridOn ? '1' : '0');
    bridge?.sendShowGrid(gridOn);
  }

  /** Internal link clicked in the preview: switch page properly. */
  function onNavigate(msg) {
    const path = msg.path.replace(/\/$/, '') || '/';
    const entry = siteDraft.pages.find((p) => p.path === path);
    if (entry && entry.id !== pageId) selectPage(entry.id);
  }

  /**
   * Shared flow for all site changes from the panels (pages, nav, theme):
   * history BEFORE the mutation, then save, mark and push live to the
   * preview. Keys with the edit: prefix are merged in the undo history
   * (bursts of keystrokes/color drags become one undo step).
   */
  function siteMutate(key, fn) {
    pushHistory(key);
    fn();
    siteStore.save();
    updateDirty();
    pushSiteToPreview();
  }

  /* ---------- The Pages panel ---------- */

  let newPageTitle = $state('');

  /* "New page from template": the grid below the create field picks what
     the next new page starts from; null is a blank page, a 'preset:<id>'
     is a built-in starter pack, anything else is a user page template. */
  let newPageTemplate = $state(null);

  /* The kebab menu per page row: the id of the row with an open menu.
     Closed by outside click, Escape and window blur (the settings pattern). */
  let pageMenuFor = $state(null);
  $effect(() => {
    if (!pageMenuFor) return;
    const onDown = (e) => { if (!e.target.closest?.('.page-menu-wrap')) pageMenuFor = null; };
    const onKey = (e) => { if (e.key === 'Escape') pageMenuFor = null; };
    const onBlur = () => { pageMenuFor = null; };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey);
    window.addEventListener('blur', onBlur);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', onBlur);
    };
  });

  /** Mirrors guard.js: directories that can never become pages. */
  const RESERVED_SLUGS = ['admin', 'api', 'assets', 'content', 'media', 'plugins', 'functions', 'readme'];

  function pageSlugError(slug, ignoreId = null) {
    if (!slug) return ta('error.pageNeedsName');
    if (RESERVED_SLUGS.includes(slug)) return ta('error.reservedName', { slug });
    if (siteDraft.pages.some((p) => p.id !== ignoreId && (p.path === `/${slug}` || p.id === slug))) {
      return ta('error.pageExists');
    }
    return null;
  }

  function addPage() {
    const title = newPageTitle.trim();
    const slug = slugify(title);
    const err = pageSlugError(slug);
    if (err) {
      setStatus(err, 'error');
      return false;
    }
    // Starter packs are built fresh (create() yields new ids and
    // translated seeds); user templates store origin ids, so the clone
    // re-ids everything and sets meta to the new page (the re-id rule in
    // SCHEMA.md). The liftPageFile wash makes templates stored under older
    // schema versions safe.
    const templatePage = newPageTemplate && !newPageTemplate.startsWith('preset:')
      ? templateStores[newPageTemplate]?.data?.page : null;
    const fresh = newPageTemplate?.startsWith('preset:')
      ? (buildPagePreset(newPageTemplate.slice(7), { pageId: slug, title }) ?? blankPage({ id: slug, title }))
      : templatePage
        ? clonePageForInsert(liftPageFile(JSON.parse(JSON.stringify(templatePage)), siteStore.data), makeId, { id: slug, title })
        : blankPage({ id: slug, title });
    siteMutate('pages', () => {
      siteDraft.pages.push({ id: slug, title, path: `/${slug}`, file: `content/pages/${slug}.json` });
      // New pages go straight into the menu; the Nav panel can remove them.
      siteDraft.nav.items.push({ label: title, page: slug });
    });
    // The page's own draft, ready to publish.
    writeDraftKey(`urd-draft-${slug}`, JSON.stringify(fresh));
    updateDirty();
    newPageTitle = '';
    newPageTemplate = null;
    selectPage(slug);
  }

  /** The kebab menu's "Save as template": the page's current data into the template core. */
  async function savePageAsTemplate(entry) {
    pageMenuFor = null;
    const data = entry.id === pageId
      ? JSON.parse(JSON.stringify(store.data))
      : await readPageDraft(entry);
    await saveTemplate('page', data);
  }

  function renamePage(entry, rawTitle) {
    const title = rawTitle.trim();
    if (!title || title === entry.title) return;
    const old = entry.title;
    siteMutate('pages', () => {
      entry.title = title;
      // Menu items still carrying the old name follow along.
      for (const item of siteDraft.nav.items) {
        if (item.page === entry.id && item.label === old) item.label = title;
      }
    });
    // The page file's meta.title is kept in step (it drives the tab title).
    if (entry.id === pageId) {
      store.data.meta.title = title;
      store.save();
      updateDirty();
      bridge?.sendPage(pageId, store.data);
    } else {
      patchPageDraft(entry, (p) => { p.meta.title = title; });
    }
  }

  /** Reactive mirror of the open page's SEO fields (the Pages panel reads
   *  this; the truth lives in store.data.meta and is mirrored in on page switch). */
  let seoDraft = $state({ description: '', ogTitle: '', ogDescription: '', ogImage: '' });

  function readSeoDraft() {
    const meta = store?.data?.meta ?? {};
    seoDraft = {
      description: meta.description ?? '',
      ogTitle: meta.og?.title ?? '',
      ogDescription: meta.og?.description ?? '',
      ogImage: meta.og?.image ?? '',
    };
  }

  /** The SEO fields on the open page (Search and sharing). Empty fields
   *  are deleted from meta, so the page file stays clean; the og object is
   *  removed when emptied. */
  function setPageSeo(field, rawValue) {
    const value = String(rawValue ?? '').trim();
    if (field === 'description') {
      if (value) store.data.meta.description = value;
      else delete store.data.meta.description;
    } else {
      const key = { ogTitle: 'title', ogDescription: 'description', ogImage: 'image' }[field];
      const og = { ...(store.data.meta.og ?? {}) };
      if (value) og[key] = value;
      else delete og[key];
      if (Object.keys(og).length) store.data.meta.og = og;
      else delete store.data.meta.og;
    }
    store.save();
    updateDirty();
    readSeoDraft();
    const entry = siteDraft.pages.find((p) => p.id === pageId);
    missingSeo[pageId] = entry?.noindex ? false : !store.data.meta.description;
  }

  /** Hide from search engines: the flag lives in the PAGE REGISTRY
   *  (site.json), so publishing can filter the sitemap without loading all
   *  the page files. */
  function setPageNoindex(checked) {
    const entry = siteDraft.pages.find((p) => p.id === pageId);
    if (!entry) return;
    siteMutate('edit:page-noindex', () => {
      if (checked) entry.noindex = true;
      else delete entry.noindex;
    });
    // Hidden pages are outside search and are never marked as lacking.
    missingSeo[pageId] = checked ? false : !store?.data?.meta?.description;
  }

  /** Pages missing a meta description (the warning marker in the Pages
   *  panel): computed when the panel opens; the open page updates on edit. */
  let missingSeo = $state({});

  async function refreshMissingSeo() {
    const out = {};
    for (const entry of siteDraft.pages) {
      if (entry.noindex) continue;
      if (entry.id === pageId) {
        out[entry.id] = !store?.data?.meta?.description;
        continue;
      }
      const page = await readPageDraft(entry);
      out[entry.id] = !page?.meta?.description;
    }
    missingSeo = out;
  }

  $effect(() => {
    if (activePanel === 'pages' && pageId) refreshMissingSeo();
  });

  /** The sharing image: compressed like other images and materialized to
   *  media/ on publish. */
  async function uploadOgImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      setPageSeo('ogImage', img.dataUrl);
    } catch (err) {
      setStatus(imageErrorText(err), 'error');
    }
  }

  /** Another page's current data: draft, else published, else blank. */
  async function readPageDraft(entry) {
    const raw = localStorage.getItem(`urd-draft-${entry.id}`);
    if (raw) {
      try { return JSON.parse(raw); } catch { /* corrupt: fetched again */ }
    }
    try {
      const res = await fetch(`/${entry.file}`);
      if (res.ok) return liftPageFile(await res.json(), siteStore.data);
    } catch { /* unpublished page without a draft */ }
    return blankPage(entry);
  }

  /** Changes another page's draft (creates a draft from published as needed). */
  async function patchPageDraft(entry, fn) {
    const page = await readPageDraft(entry);
    fn(page);
    writeDraftKey(`urd-draft-${entry.id}`, JSON.stringify(page));
    updateDirty();
  }

  function setPageSlug(entry, rawSlug) {
    const slug = slugify(rawSlug);
    if (entry.path === '/' || `/${slug}` === entry.path) return;
    const err = pageSlugError(slug, entry.id);
    if (err) {
      setStatus(err, 'error');
      return;
    }
    // Only the address changes; the id (and thus the draft key and file
    // name) remains, so internal references (nav) never break. Publishing
    // cleans the old address's index.html via the diff against the
    // published site.json.
    siteMutate('pages', () => {
      entry.path = `/${slug}`;
    });
  }

  function deletePage(entry) {
    if (entry.path === '/') return; // the front page can never be deleted
    siteMutate('pages', () => {
      siteDraft.pages = siteDraft.pages.filter((p) => p.id !== entry.id);
      // Items with a submenu survive their own page being deleted: the
      // target is removed and the item becomes a pure opener, so the
      // children (which can point to living pages) do not vanish silently.
      // Submenu items that pointed to the page are cleaned up; items left
      // with neither target nor children are removed entirely.
      siteDraft.nav.items = siteDraft.nav.items.filter((i) => i.page !== entry.id || i.children);
      for (const item of siteDraft.nav.items) {
        if (item.page === entry.id) delete item.page;
        if (!item.children) continue;
        item.children = item.children.filter((c) => c.page !== entry.id);
        if (item.children.length === 0) delete item.children;
      }
      siteDraft.nav.items = siteDraft.nav.items.filter((i) => i.page || i.href || i.children);
    });
    // The page's own draft is kept: Ctrl+Z restores everything.
    if (entry.id === pageId) selectPage(siteDraft.pages[0].id);
    setStatus(ta('status.pageRemoved'));
  }

  /* ---------- The Nav panel ---------- */

  /** Site icon (favicon): small webp, materialized on publish. */
  // The icon editor (IconEditor): the source being edited. null = closed.
  let iconEditorImage = $state(null);

  function applyIcon(dataUrl) {
    siteMutate('edit:site-icon', () => { siteDraft.site.icon = dataUrl; });
    iconEditorImage = null;
  }

  /** Visitor measurement (site.analytics): a site value published with the
   *  site, edited behind the gear; an empty token removes the field. */
  function setAnalyticsToken(value) {
    const token = String(value ?? '').trim();
    siteMutate('edit:site-analytics', () => {
      if (token) siteDraft.analytics = { token };
      else delete siteDraft.analytics;
    });
  }

  /** The content width (site.layout.contentWidth, ADR-0018): the design
   *  width the blocks' percentages are measured against. The model
   *  (limits, quick picks, reference screens, band calculation) lives as
   *  pure functions in lib/content-width.js, so the sample computes on
   *  the same thing the engine does. */
  let layoutWidth = $derived(siteDraft?.layout?.contentWidth ?? 1440);
  /** The side margin in percent of the window width (vw), not px. */
  let layoutGutter = $derived(siteDraft?.layout?.gutter ?? 6);
  /** The visitor language (site.lang, ADR-0012): the legacy value 'no' is
   *  shown as Bokmål; a hand-edited value outside the list is preserved as
   *  its own option at the top so opening the panel breaks nothing. */
  function siteLangValue() {
    const cur = siteDraft.site.lang ?? 'no';
    return cur === 'no' ? 'nb' : cur;
  }
  function siteLangOptions() {
    const cur = siteLangValue();
    const options = sortLangs([...LANG_OPTIONS, ...sitePackLangs()]);
    const known = options.some(([code]) => code === cur);
    return [...(known ? [] : [[cur, cur]]), ...options];
  }
  /** The site's calendars (site.calendars): registered once with their settings, and picked by the calendar blocks as references. */
  let siteCalendarsOpen = $state(false);
  /** The id of the calendar whose row stands open in the Site panel; one at a time. */
  let openSiteCalendar = $state(null);
  /** A calendar's colour as CSS for a swatch: a hex value as it is, a theme token through its variable, none as the accent the engine falls back to. */
  /** The calendar whose name field gets the caret once its row stands open: the one just added. */
  let focusSiteCalendar = $state(null);
  $effect(() => {
    const id = focusSiteCalendar;
    if (!id) return;
    focusSiteCalendar = null;
    tick().then(() => document.querySelector(`[data-cal-name="${id}"]`)?.focus());
  });
  const siteCalendars = () => siteDraft?.site?.calendars ?? [];
  const siteCalendarById = (id) => siteCalendars().find((cal) => cal.id === id) ?? null;
  /** Adds a calendar and returns its id; `seed` carries an address, a name and a colour from a block's row. */
  function addSiteCalendar(seed = {}) {
    const cal = { id: makeId('cal'), url: '', ...seed };
    siteMutate('site', () => { (siteDraft.site.calendars ??= []).unshift(cal); });
    openSiteCalendar = cal.id;
    focusSiteCalendar = cal.id;
    siteCalendarsOpen = true;
    return cal.id;
  }
  /** The site's time zone (site.timeZone): stored only when Intl knows the name; an empty field removes it. */
  let siteZoneBad = $state(false);

  // The admin tab shows the site icon when it exists, otherwise the Urd
  // mark (same SVG as in admin/index.html; it cannot be read from the
  // link element, because favicon-boot.js may already have swapped it).
  // Only known icon shapes are let through (data:image or a site-relative
  // path), so draft data can never become an active URL.
  const URD_MARK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
  // Anchored regex instead of startsWith: CodeQL recognizes RegExp.test as
  // a barrier, so the alerts on this flow are closed.
  const SAFE_ICON_RE = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
  $effect(() => {
    // Until the draft is loaded, favicon-boot.js controls the tab;
    // touching it here would make the icon flash.
    if (!siteDraft?.site) return;
    const href = siteDraft.site.icon;
    const link = document.querySelector('link[rel="icon"]');
    if (!link) return;
    if (typeof href !== 'string' || !href) {
      link.href = URD_MARK_ICON;
      return;
    }
    if (!SAFE_ICON_RE.test(href)) return;
    link.href = href;
  });

  /* ---------- Nav size (ADR-0023) ---------- */

  /* The link launcher (nav.launcher): the shortcuts behind the launcher
   * button. The last removed shortcut takes the object with it, so a site
   * without a launcher carries no field. */

  function clearLauncherImage(i) {
    siteMutate('nav', () => {
      if (i === null) delete siteDraft.nav.launcher.image;
      else delete siteDraft.nav.launcher.links[i].image;
    });
  }

  /* ---------- The Collections panel (ADR-0007) ---------- */

  // Collections are shared site data (like nav/footer): an index file +
  // one file per collection, each with its own draftStore. Editing goes
  // through the Ctrl+Z history (like pages/site).
  let collectionsIndexStore = null;
  let collectionStores = {};
  /** Published baseline per collection id: used when undo recreates a deleted collection's store. */
  let publishedCollections = {};
  /** True only once initCollections has filled ALL stores; snapshot() includes collections only then. */
  let collectionsReady = false;
  let collectionIds = $state([]);
  let collectionsView = $state({});
  let activeCollection = $state(null);
  let newCollectionName = $state('');
  let newCollectionKind = $state('news');

  /* ---------- Templates: user templates in content/maler/ ---------- */
  // Same pattern as collections: an index store + one store per template
  // file, with a "does not exist" baseline (null) until the first publish.
  let templatesIndexStore = null;
  let templateStores = {};
  /** Published baseline per template id (null = never published): used when undo recreates a deleted template's store. */
  let publishedTemplates = {};
  /** True only once initTemplates has filled ALL stores; snapshot() includes templates only then. */
  let templatesReady = false;
  let templateIds = $state([]);

  async function initTemplates() {
    let index = { version: 1, maler: [] };
    try {
      index = await (await fetch('/content/maler.json')).json();
    } catch { /* no index is perfectly fine */ }
    templatesIndexStore = createDraftStore('urd-draft-templates', () => index, draftSaveError, 'urd-draft-maler');
    templateIds = [...(templatesIndexStore.data.maler ?? [])];
    for (const id of templateIds) {
      let published = null;
      try {
        published = await (await fetch(`/content/maler/${id}.json`)).json();
      } catch { /* new, unpublished template */ }
      publishedTemplates[id] = published;
      templateStores[id] = createDraftStore(`urd-draft-template-${id}`, () => published, draftSaveError, `urd-draft-mal-${id}`);
      // Drafts from a newer editor are discarded (same guard as page/site).
      if ((templateStores[id].data?.schemaVersion ?? 1) > TEMPLATE_SCHEMA_VERSION) templateStores[id].reset();
    }
    templatesReady = true;
    pushTemplatesToPreview();
  }

  /** Send the template drafts to the preview's My templates tab (plain copies, never $state proxies). */
  function pushTemplatesToPreview() {
    const list = templateIds
      .map((id) => (templateStores[id]?.data ? { id, ...JSON.parse(JSON.stringify(templateStores[id].data)) } : null))
      .filter(Boolean)
      .map(({ id, mal, section, blocks, page }) => ({ id, name: mal.name, kind: mal.kind, section, blocks, page }));
    bridge?.sendTemplates(list);
  }

  /** "Save as template" from the preview (section/block group); page
   *  templates come editor-internally from the Pages panel via the same core. */
  function handleSaveTemplate(msg) {
    const kind = TEMPLATE_KINDS.includes(msg.kind) ? msg.kind : 'section';
    return saveTemplate(kind, msg[kind]);
  }

  /** Screen-docked block dragged to a new anchor point in the preview. The
   *  dock point applies to both surfaces (a window anchor, not layout), so
   *  mobile review is not triggered. */
  function handleStickyDock(msg) {
    const { section, block } = readBlock(msg.sectionId, msg.blockId);
    if (!section || !block?.sticky) return;
    if (!DOCK_OPTIONS.some(([value]) => value === msg.dock)) return;
    pushHistory(`sticky-dock:${msg.blockId}`);
    block.sticky = { ...block.sticky, dock: msg.dock };
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    syncSelectedBlock();
  }

  /** "Pin the group" from the multi-select bar: the whole selection shares
   *  one sticky group and is pinned as one unit, or dissolved again. ONE
   *  undo step for the whole selection, like the other group actions. */
  function handleStickyGroup(msg) {
    const ids = msg.blockIds ?? [];
    const { section } = readBlock(msg.sectionId, ids[0]);
    if (!section || !ids.length) return;
    pushHistory(`sticky-group:${msg.sectionId}`);
    const group = msg.on ? makeId('stk') : null;
    for (const block of section.blocks) {
      if (!ids.includes(block.id)) continue;
      // Off: the pinning is removed entirely. On: existing offset/limit is
      // kept so a block that was already pinned does not lose its settings.
      block.sticky = group ? { offset: 16, until: null, ...block.sticky, group } : null;
    }
    markDesktopChange(section, 'block-edited');
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    syncSelectedBlock();
    setStatus(ta(msg.on ? 'status.stickyGrouped' : 'status.stickyUngrouped'));
  }

  /** Shared template saving: name it, slug to id, save as a draft. */
  async function saveTemplate(kind, payload) {
    if (!payload || !templatesIndexStore) return;
    const name = (await askPrompt({
      title: ta('canvas.templateNamePrompt'),
      placeholder: ta('ph.templateName'),
    }))?.trim();
    if (!name) return;
    const id = templateId(name);
    if (!id) {
      setStatus(ta('status.invalidName'), 'error');
      return;
    }
    if (templateIds.includes(id)) {
      setStatus(ta('status.templateExists'), 'error');
      return;
    }
    pushHistory('templates');
    const fresh = { schemaVersion: TEMPLATE_SCHEMA_VERSION, mal: { name, kind }, [kind]: payload };
    templateStores[id] = createDraftStore(`urd-draft-template-${id}`, () => null, draftSaveError, `urd-draft-mal-${id}`);
    templateStores[id].replace(fresh);
    templateStores[id].save();
    templatesIndexStore.data.maler = [...templateIds, id];
    templatesIndexStore.save();
    templateIds = [...templateIds, id];
    setStatus(ta('status.templateSaved', { name }), 'ok');
    updateDirty();
    pushTemplatesToPreview();
  }

  /** The delete button in the My templates tab: confirm, remove the file draft and the index entry. */
  async function handleDeleteTemplate(msg) {
    const tpl = templateStores[msg.id]?.data?.mal;
    if (!tpl) return;
    const ok = await askConfirm({ title: ta('confirm.deleteTemplate', { name: tpl.name }) });
    if (!ok) return;
    pushHistory('templates');
    if (newPageTemplate === msg.id) newPageTemplate = null;
    localStorage.removeItem(`urd-draft-template-${msg.id}`);
    localStorage.removeItem(`urd-draft-mal-${msg.id}`);
    delete templateStores[msg.id];
    templatesIndexStore.data.maler = templateIds.filter((x) => x !== msg.id);
    templatesIndexStore.save();
    templateIds = templateIds.filter((x) => x !== msg.id);
    updateDirty();
    pushTemplatesToPreview();
  }

  async function initCollections() {
    let index = { version: 1, samlinger: [] };
    try {
      index = await (await fetch('/content/collections.json')).json();
    } catch { /* no index is perfectly fine */ }
    collectionsIndexStore = createDraftStore('urd-draft-collections', () => index, draftSaveError, 'urd-draft-samlinger');
    collectionIds = [...(collectionsIndexStore.data.samlinger ?? [])];
    for (const id of collectionIds) {
      let published = null;
      try {
        published = await (await fetch(`/content/samlinger/${id}.json`)).json();
      } catch { /* new, unpublished collection */ }
      // An unpublished collection has the baseline "does not exist"
      // (null), never a synthetic published state: otherwise the draft can
      // equal the false baseline, hasDraft() turn false, and the index be
      // published without the file (index/file drift).
      publishedCollections[id] = published;
      collectionStores[id] = createDraftStore(`urd-draft-collection-${id}`, () => published, draftSaveError, `urd-draft-samling-${id}`);
      if (!published && !collectionStores[id].data) {
        // Index without a file and without a draft (drifted deploy): give
        // an empty draft so the panel works; the does-not-exist baseline
        // makes the file publish on the next publish and heals the drift.
        collectionStores[id].replace({ schemaVersion: 1, id, name: id, kind: 'custom', entries: [] });
        collectionStores[id].save();
      }
    }
    collectionsReady = true;
    syncCollectionsView();
  }

  function syncCollectionsView(pushPreview = true) {
    const view = {};
    for (const id of collectionIds) {
      if (collectionStores[id]) view[id] = JSON.parse(JSON.stringify(collectionStores[id].data));
    }
    collectionsView = view;
    // On click-and-type in the block itself the preview push is skipped:
    // the iframe already shows the text, and a rerender mid-typing would
    // lose the caret.
    if (pushPreview) pushCollectionsToPreview();
  }

  /** Send the collection drafts to the preview (plain copies; $state proxies can never be postMessaged). */
  function pushCollectionsToPreview() {
    bridge?.sendCollections($state.snapshot(collectionsView) ?? {});
  }

  /** Shared flow for collection changes: history, mutate, save, update
   *  the mirror and the preview. key is the undo key (the edit: prefix
   *  coalesces bursts of the same action). */
  function mutateCollection(id, key, fn, pushPreview = true) {
    const store = collectionStores[id];
    if (!store) return;
    pushHistory(key);
    fn(store.data);
    store.save();
    updateDirty();
    syncCollectionsView(pushPreview);
  }

  /** The "+ Product" adder in the product block (urd-collection-add from the iframe). */
  function handleCollectionAdd(msg) {
    // Deleted/unknown collection: no-op (the guard also prevents a dead undo step).
    if (!collectionStores[msg.collection]) return;
    addCollectionEntry(msg.collection);
  }

  /** Plain text from a rich-text title: parsed in an inert document (same
   *  approach as the engine's sanitize.js), never with a regex that can
   *  leave remnants. */
  function plainTitle(html) {
    const doc = new DOMParser().parseFromString(String(html ?? ''), 'text/html');
    return (doc.body.textContent ?? '').trim();
  }

  /** Click-and-type/image swap in the collection block (urd-collection-edit from the iframe). */
  function handleCollectionEdit(msg) {
    const { collection, entryId, field, value } = msg;
    if (!['title', 'text', 'image', 'imageAlt', 'imageStyle'].includes(field)) return;
    // An empty title is not kept (the schema requires a title); the old
    // title remains until something is typed. The title is rich text, so
    // emptiness is judged without markup.
    if (field === 'title' && !plainTitle(value)) return;
    mutateCollection(collection, `edit:collection:${collection}:${entryId}:${field}`, (data) => {
      const entry = data.entries.find((e) => e.id === entryId);
      if (!entry) return;
      if (value === '' && field !== 'title') delete entry[field];
      else entry[field] = value;
    }, field === 'image');
  }

  /** Creates and activates a collection (the caller owns the history step). */
  function insertCollection(id, name, kind) {
    const fresh = { schemaVersion: 1, id, name, kind, entries: [] };
    // The baseline is "does not exist" (null) until the first publish: a
    // fresh collection must have hasDraft() true, otherwise the index is
    // published without the file.
    collectionStores[id] = createDraftStore(`urd-draft-collection-${id}`, () => null, draftSaveError, `urd-draft-samling-${id}`);
    collectionStores[id].replace(fresh);
    collectionStores[id].save();
    collectionsIndexStore.data.samlinger = [...collectionIds, id];
    collectionsIndexStore.save();
    collectionIds = [...collectionIds, id];
    activeCollection = id;
    updateDirty();
    syncCollectionsView();
  }

  function addCollection() {
    const name = newCollectionName.trim();
    if (!name) return;
    const id = slugify(name);
    if (!id || collectionIds.includes(id)) {
      setStatus(id ? ta('status.collectionExists') : ta('status.invalidName'), 'error');
      return;
    }
    pushHistory('collections');
    insertCollection(id, name, newCollectionKind);
    newCollectionName = '';
  }

  /** "+ Create product catalog" in the product block's Properties: collection + binding in ONE undo step. */
  function createCatalogForBlock() {
    const name = ta('seed.productCatalogName');
    const base = slugify(name) || 'collection';
    let id = base;
    // Slug dedup: a non-product collection can already own the base name.
    for (let n = 2; collectionIds.includes(id); n += 1) id = `${base}-${n}`;
    pushHistory('collections');
    insertCollection(id, name, 'products');
    mutateBlock(null, (b) => { b.props.collection = id; });
  }

  function removeCollection(id) {
    pushHistory('collections');
    localStorage.removeItem(`urd-draft-collection-${id}`);
        localStorage.removeItem(`urd-draft-samling-${id}`);
    delete collectionStores[id];
    collectionsIndexStore.data.samlinger = collectionIds.filter((x) => x !== id);
    collectionsIndexStore.save();
    collectionIds = collectionIds.filter((x) => x !== id);
    if (activeCollection === id) activeCollection = null;
    updateDirty();
    syncCollectionsView();
  }

  function addCollectionEntry(id) {
    mutateCollection(id, `collection:${id}:add-entry`, (data) => {
      if (data.kind === 'products') {
        // Products: no date (irrelevant), the price is set in the panel;
        // added LAST so the adder card in the preview gets the new card
        // next to it.
        data.entries.push({ id: makeId('entry'), title: ta('seed.newProduct'), text: '' });
      } else {
        data.entries.unshift({
          id: makeId('entry'),
          title: ta('seed.newEntry'),
          date: new Date().toISOString().slice(0, 10),
          text: '',
        });
      }
    });
  }

  /* ---------- The Plugins panel ---------- */

  // plugins.json goes through the same draft flow as the rest: changes are
  // drafts until they are published. Note: the preview loads plugins from
  // the SERVER at boot, so activation shows only after publish and deploy.
  let pluginsStore = null;
  /** Explicit promise that exists from the first moment: onReady ALWAYS
   *  waits on it, so a fast iframe can never get an empty plugin list. */
  let resolvePluginsReady;
  const pluginsReady = new Promise((resolve) => { resolvePluginsReady = resolve; });
  let pluginsView = $state(null);
  let pluginInfo = $state({});
  let pluginEngine = $state('0.0.0');
  /** Plugin directories found in the repo (via the publishing layer) that are not in plugins.json yet. */
  let pluginsFound = $state([]);
  /** The plugins enabled in the PUBLISHED plugins.json (not the draft):
   *  the admin language picker can only offer language packs the engine
   *  can already load. */
  let publishedPluginIds = $state([]);
  /** 'pending' | 'ok' | 'unavailable': the type-a-name field is only a fallback when discovery does not work. */
  let pluginDiscovery = $state('pending');

  /** All plugin ids the panel knows: enabled + disabled (the directories remain in the repo). */
  const knownPlugins = () => [...new Set([...(pluginsView?.enabled ?? []), ...(pluginsView?.disabled ?? [])])];

  function syncPluginsView() {
    pluginsView = JSON.parse(JSON.stringify(pluginsStore.data));
  }

  /** The site's LIVE CSP, read from the response headers (Cloudflare sets
   *  it from _headers on all paths). null = not loaded; {unknown: true} =
   *  no CSP header (local development): then nothing is blocked, and the
   *  instructions would just be noise. */
  let liveCsp = $state(null);

  async function loadLiveCsp() {
    try {
      const res = await fetch('/urd.json', { cache: 'no-store' });
      const header = res.headers.get('content-security-policy');
      if (!header) { liveCsp = { unknown: true }; return; }
      const directive = (name) => new Set(
        (header.split(';').map((s) => s.trim()).find((s) => s.startsWith(`${name} `)) ?? '')
          .split(/\s+/).slice(1),
      );
      liveCsp = { frameSrc: directive('frame-src'), connectSrc: directive('connect-src'), scriptSrc: directive('script-src') };
    } catch {
      liveCsp = { unknown: true };
    }
  }

  async function initPlugins() {
    loadLiveCsp();
    let published = { version: 1, enabled: [] };
    try {
      published = await (await fetch('/plugins/plugins.json')).json();
    } catch { /* no plugin index is perfectly fine */ }
    publishedPluginIds = published.enabled ?? [];
    pluginsStore = createDraftStore('urd-draft-plugins', () => published, draftSaveError);
    syncPluginsView();
    try {
      pluginEngine = (await (await fetch('/urd.json')).json()).engine ?? '0.0.0';
    } catch { /* without the manifest, version requirements are shown unassessed */ }
    for (const id of knownPlugins()) loadPluginInfo(id);
    discoverPlugins();
    resolvePluginsReady();
    // Belt and suspenders against the ready race: if the iframe has
    // already reported in, the list is pushed now.
    bridge?.sendPlugins($state.snapshot(pluginsView)?.enabled ?? []);
  }

  /** Asks the publishing layer for the plugin directories in the repo
   *  (static hosting cannot list directories). An unavailable endpoint
   *  (local server, not logged in) is perfectly fine: then the
   *  type-a-name flow applies. */
  async function discoverPlugins() {
    try {
      const res = await fetch('/api/github/plugins');
      if (!res.ok) {
        useCachedDiscovery();
        return;
      }
      const { plugins } = await res.json();
      localStorage.setItem('urd-plugins-found', JSON.stringify(plugins ?? []));
      pluginsFound = (plugins ?? []).filter((id) => !knownPlugins().includes(id));
      for (const id of pluginsFound) loadPluginInfo(id);
      pluginDiscovery = 'ok';
    } catch {
      useCachedDiscovery();
    }
  }

  /** Rate-limited/unavailable endpoint: show the last known find list from the local cache instead of nothing. */
  function useCachedDiscovery() {
    try {
      const cached = JSON.parse(localStorage.getItem('urd-plugins-found') ?? '[]');
      if (Array.isArray(cached) && cached.length) {
        pluginsFound = cached.filter((id) => !knownPlugins().includes(id));
        for (const id of pluginsFound) loadPluginInfo(id);
        pluginDiscovery = 'ok';
        return;
      }
    } catch { /* a corrupt cache is ignored */ }
    pluginDiscovery = 'unavailable';
  }

  /** Fetches and assesses one plugin's manifest (name, version, requirements, provides, csp). */
  async function loadPluginInfo(id) {
    try {
      const manifest = await (await fetch(`/plugins/${id}/plugin.json`)).json();
      const errors = validateManifest(manifest);
      pluginInfo[id] = {
        ...manifest,
        errors,
        satisfied: errors.length === 0 && satisfiesEngine(pluginEngine, manifest.requiresEngine),
      };
    } catch {
      pluginInfo[id] = { name: id, errors: [ta('plugin.manifestNotFound', { id })], satisfied: false };
    }
  }

  function setPluginEnabled(id, on) {
    pushHistory('plugins');
    const d = pluginsStore.data;
    d.enabled = (d.enabled ?? []).filter((x) => x !== id);
    d.disabled = (d.disabled ?? []).filter((x) => x !== id);
    if (on) d.enabled.push(id);
    else d.disabled.push(id);
    pluginsStore.save();
    updateDirty();
    syncPluginsView();
    reloadPreview();
  }

  /** Plugin changes require a fresh boot in the preview (an import cannot be undone); onReady sends the new list. */
  function reloadPreview() {
    if (iframeEl) iframeEl.src = iframeEl.src;
  }

  /** Removes the plugin from both lists; the directory itself in plugins/ remains in the repo. */
  function removePlugin(id) {
    pushHistory('plugins');
    const d = pluginsStore.data;
    d.enabled = (d.enabled ?? []).filter((x) => x !== id);
    d.disabled = (d.disabled ?? []).filter((x) => x !== id);
    pluginsStore.save();
    updateDirty();
    syncPluginsView();
    reloadPreview();
  }

  /* ---------- The Footer panel ---------- */

  function footerMutate(key, fn) {
    siteMutate(key, () => {
      siteDraft.footer ??= { version: 1, show: false, text: '', align: 'center' };
      fn(siteDraft.footer);
    });
  }

  /* Rich footer (additive): brand, columns, social links, bottom line and
   * background. Mirrors the nav handlers, but through footerMutate. */

  function moveNavItemTo(from, to) {
    const items = siteDraft.nav.items;
    if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return;
    siteMutate('nav', () => { const [it] = items.splice(from, 1); items.splice(to, 0, it); });
  }
  function moveNavChildTo(i, from, to) {
    const children = siteDraft.nav.items[i].children;
    if (from === to || from < 0 || to < 0 || from >= children.length || to >= children.length) return;
    siteMutate('nav', () => { const [it] = children.splice(from, 1); children.splice(to, 0, it); });
  }
  /* Submenu (one level, additive): the children always have their own
   * target; the parent can additionally be a pure opener ('__none' in
   * setNavTarget). */

  /* ---------- The Theme panel ---------- */

  // The panel's fold-all buttons act on the rendered details elements; the
  // buttons are shown only for a panel that has group folds at all.
  let panelEl = $state(null);
  let panelHasGroups = $state(false);
  let panelAllOpen = $state(false);
  const allOpen = (list) => list.length > 0 && [...list].every((d) => d.open);
  function syncPanelFolds() {
    const groups = panelEl?.querySelectorAll('details.group') ?? [];
    panelHasGroups = groups.length > 0;
    panelAllOpen = allOpen(groups);
  }
  $effect(() => {
    void activePanel;
    tick().then(syncPanelFolds);
  });
  function togglePanelGroups() {
    const open = !panelAllOpen;
    panelEl?.querySelectorAll('details.group').forEach((d) => { d.open = open; });
    syncPanelFolds();
  }

  // A group that holds sub-folds gets its own fold-all button in the
  // summary row, for the sub-folds alone; it expands while any sub-fold is
  // closed and collapses once all are open. Decorated from the DOM
  // (idempotent) and kept up by an observer, since groups come and go with
  // the draft.
  function decorateSubFolds(root) {
    for (const group of root.querySelectorAll('details.group')) {
      const summary = group.querySelector(':scope > summary');
      if (!summary || summary.querySelector('.fold-sub')) continue;
      const subs = () => group.querySelectorAll(':scope > .group-items details.group');
      if (!subs().length) continue;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'fold-sub fold-toggle';
      button.innerHTML = ICONS.foldToggle;
      const sync = () => {
        const collapse = allOpen(subs());
        button.classList.toggle('collapse', collapse);
        button.title = ta(collapse ? 'ui.collapseSub' : 'ui.expandSub');
        button.setAttribute('aria-label', button.title);
      };
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const open = !button.classList.contains('collapse');
        group.open = true;
        subs().forEach((d) => { d.open = open; });
        sync();
      });
      group.addEventListener('toggle', sync, true);
      sync();
      summary.appendChild(button);
    }
  }
  $effect(() => {
    const el = panelEl;
    if (!el) return;
    const observer = new MutationObserver(() => { decorateSubFolds(el); syncPanelFolds(); });
    observer.observe(el, { childList: true, subtree: true });
    // toggle does not bubble: captured at the panel, so the head button
    // follows folds the user opens and closes by hand.
    el.addEventListener('toggle', syncPanelFolds, true);
    decorateSubFolds(el);
    return () => { observer.disconnect(); el.removeEventListener('toggle', syncPanelFolds, true); };
  });

  /* ---------- The light/dark toggle (alternate theme) ---------- */

  /** Inverts the lightness of a #rrggbb color (HSL: L -> 1-L); anything
   *  else passes untouched. Used as a SUGGESTION for the alt theme - the
   *  owner adjusts it afterwards. */
  function invertLightness(hex) {
    const m = /^#([0-9a-f]{6})$/i.exec(hex ?? '');
    if (!m) return hex;
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    const l = (max + min) / 2;
    const d = max - min;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    if (d !== 0) {
      if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h = (h * 60 + 360) % 360;
    }
    const li = 1 - l;
    const c = (1 - Math.abs(2 * li - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const mm = li - c / 2;
    const [rr, gg, bb] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x]
      : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
    const toHex = (v) => Math.round((v + mm) * 255).toString(16).padStart(2, '0');
    return `#${toHex(rr)}${toHex(gg)}${toHex(bb)}`;
  }

  function suggestAltColors() {
    return Object.fromEntries(
      Object.entries(siteDraft.theme.tokens.color).map(([name, value]) => [name, invertLightness(value)]),
    );
  }

  function createAltTheme() {
    siteMutate('theme', () => {
      siteDraft.theme.alt = { tokens: { color: suggestAltColors() } };
    });
  }

  function reSuggestAltTheme() {
    siteMutate('theme', () => {
      siteDraft.theme.alt.tokens.color = suggestAltColors();
    });
  }

  function removeAltTheme() {
    siteMutate('theme', () => { delete siteDraft.theme.alt; });
  }

  /** Resolves a token value to hex for preview (token names are looked up in the palette). */
  const themeHex = (v, pal) => (v && pal && pal[v]) ? pal[v] : v;

  /* Ready-made theme suggestions: fill all color tokens + light/dark in
     one click, then the owner fine-tunes freely (a starting point, like
     the section themes). Fonts/radii are untouched. Natt is dark-first
     (scheme dark); the rest are light with a dark alt. */
  const THEME_PRESET_KEYS = ['bg', 'surface', 'text', 'accent', 'accent-text'];
  const THEME_PRESETS = [
    { id: 'well', name: ta('themePreset.well.name'), note: ta('themePreset.well.note'),
      light: { bg: '#f6faf8', surface: '#ffffff', text: '#16211d', accent: '#15b39a', 'accent-text': '#04241d' },
      dark: { bg: '#0e1512', surface: '#17211d', text: '#eaf1ed', accent: '#22c3a8', 'accent-text': '#04241d' } },
    { id: 'stone', name: ta('themePreset.stone.name'), note: ta('themePreset.stone.note'),
      light: { bg: '#f4f2ed', surface: '#ffffff', text: '#262019', accent: '#8a5a41', 'accent-text': '#ffffff' },
      dark: { bg: '#17130e', surface: '#221c15', text: '#efe8dd', accent: '#c0906f', 'accent-text': '#1a1109' } },
    { id: 'plum', name: ta('themePreset.plum.name'), note: ta('themePreset.plum.note'),
      light: { bg: '#faf5ff', surface: '#ffffff', text: '#2a1546', accent: '#7c3aed', 'accent-text': '#ffffff' },
      dark: { bg: '#140f20', surface: '#1f1733', text: '#ece5f8', accent: '#a97cf6', 'accent-text': '#170a2c' } },
    { id: 'rose', name: ta('themePreset.rose.name'), note: ta('themePreset.rose.note'),
      light: { bg: '#faf5f6', surface: '#ffffff', text: '#241a1d', accent: '#b04a63', 'accent-text': '#ffffff' },
      dark: { bg: '#171015', surface: '#22181c', text: '#f1e6ea', accent: '#d98098', 'accent-text': '#2a0f18' } },
    { id: 'ocean', name: ta('themePreset.ocean.name'), note: ta('themePreset.ocean.note'),
      light: { bg: '#f1f6fb', surface: '#ffffff', text: '#13202b', accent: '#1a6fa8', 'accent-text': '#ffffff' },
      dark: { bg: '#0a1420', surface: '#12202f', text: '#e2edf5', accent: '#47a6df', 'accent-text': '#06131f' } },
    { id: 'night', name: ta('themePreset.night.name'), note: ta('themePreset.night.note'), scheme: 'dark',
      light: { bg: '#f5f6fb', surface: '#ffffff', text: '#171a2b', accent: '#4f5ed6', 'accent-text': '#ffffff' },
      dark: { bg: '#0d0f1a', surface: '#171b2e', text: '#e7e9f5', accent: '#8091ff', 'accent-text': '#0a0c18' } },
  ];

  /** Apply a theme suggestion: main mode + alt mode are filled from the palette. */
  function applyThemePreset(pr) {
    siteMutate('theme', () => {
      const dark = pr.scheme === 'dark';
      const main = dark ? pr.dark : pr.light;
      const other = dark ? pr.light : pr.dark;
      for (const k of THEME_PRESET_KEYS) siteDraft.theme.tokens.color[k] = main[k];
      if (dark) siteDraft.theme.scheme = 'dark'; else delete siteDraft.theme.scheme;
      siteDraft.theme.alt = { tokens: { color: { ...other } } };
    });
  }

  /** Which suggestion matches the current palette (for highlighting); null once the owner has fine-tuned. */
  const activeThemePreset = $derived.by(() => {
    if (!siteDraft) return null;
    const cur = siteDraft.theme.tokens.color;
    const alt = siteDraft.theme.alt?.tokens?.color ?? {};
    const dark = siteDraft.theme.scheme === 'dark';
    return THEME_PRESETS.find((pr) => {
      const main = dark ? pr.dark : pr.light;
      const other = dark ? pr.light : pr.dark;
      return THEME_PRESET_KEYS.every((k) => cur[k] === main[k] && alt[k] === other[k]);
    })?.id ?? null;
  });

  /** The panel's place in the list while Clean view has it hidden. */
  let panelScroll = 0;
  async function toggleChrome() {
    // display: none keeps the folds' open state but drops the scroll
    // position, so it is read on the way out and put back on the way in.
    if (chromeVisible) panelScroll = panelEl?.scrollTop ?? 0;
    chromeVisible = !chromeVisible;
    bridge?.sendChrome(chromeVisible);
    // The Clean view shows the page as a visitor sees it: the element menu closes with the handles.
    if (!chromeVisible) blockMenu = null;
    if (!chromeVisible) return;
    await tick();
    // The panel has no scroll range until the browser has laid it out
    // again, so the restore waits for a frame.
    requestAnimationFrame(() => { if (panelEl) panelEl.scrollTop = panelScroll; });
  }

  /** Click-and-type change from the iframe: update the draft. The iframe
   *  already shows the change, so we do not push back (that would break focus). */
  function handleEdit(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    const block = section?.blocks.find((b) => b.id === msg.blockId);
    if (!block) return;
    pushHistory(`edit:${msg.blockId}`);
    block.props = msg.props;
    store.save();
    updateDirty();
    if (selectedBlock?.blockId === msg.blockId) syncSelectedBlock();
    // The image editor requests a rerender on image swap (empty blocks
    // have no img to update live); text editing never does (an echo
    // mid-typing would lose the caret).
    if (msg.rerender) bridge?.sendSection(pageId, section);
    status = '';
    // Typing in a block that follows its content changes its height too; the
    // fit comes back without drawing the section again, so the caret stays.
    fitBlockSoon(section.id, block);
  }

  /** Drag/resize from the iframe: the iframe already shows the snapped
   *  position, so we just record it in the draft. */
  function handleMove(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    const block = section?.blocks.find((b) => b.id === msg.blockId);
    if (!block) return;
    // coalesce: automatic growth during typing belongs to the same undo
    // step as the typing itself. groupKey (from the z reordering) gathers
    // moves of SEVERAL blocks into one step.
    pushHistory(msg.coalesce ? `edit:${msg.groupKey ?? msg.blockId}` : 'move-block');
    const key = msg.frameKey === 'mobile' ? 'mobile' : 'desktop';
    const width = block.frames.desktop?.w;
    block.frames[key] = msg.frame;
    if (key === 'desktop') markDesktopChange(section, 'desktop-changed-after-mobile');
    store.save();
    updateDirty();
    if (selectedBlock?.blockId === msg.blockId) syncSelectedBlock();
    // A block that follows its content flows in its new width, and its frame
    // is fitted to the height the content takes there (ADR-0025).
    if (key === 'desktop' && msg.frame?.w !== width) fitBlockSoon(section.id, block);
    // A block pinned to a new width in the row grid takes a new height on the phone.
    else if (key === 'mobile') phoneFitSoon(section.id, block);
  }

  /** A height the preview reports for a block (urd-grow): from a plugin copy
   *  of the former data-block plugins on its own render, or as the answer to
   *  the fit of a block that follows its content (`fit`, urd-fit-block). ONLY
   *  h changes, never x/y, so a dragged block is never teleported back. */
  function handleGrow(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    const block = section?.blocks.find((b) => b.id === msg.blockId);
    if (!block?.frames?.desktop || block.frames.desktop.h === msg.h) return;
    if (msg.fit) {
      // A fit is for the desktop frame, and only the latest one asked for counts.
      if (viewMode === 'desktop' && msg.seq === fitSeq.get(msg.blockId)) applyFit(section, block, msg.h);
      return;
    }
    // Autogrowth is a MEASUREMENT, not an edit: data blocks report their
    // height on EVERY render, and the measurement varies with content,
    // feed responses and window. The measurement is therefore recorded in
    // BOTH the draft and the comparison baseline, so it never by itself
    // constitutes "unpublished changes".
    store.amendBaseline((base) => {
      const s = base.sections.find((x) => x.id === msg.sectionId);
      const b = s?.blocks.find((x) => x.id === msg.blockId);
      if (b?.frames?.desktop) b.frames.desktop.h = msg.h;
    });
    if (store.hasDraft()) pushHistory(`edit:${msg.blockId}`);
    block.frames.desktop.h = msg.h;
    // save() cleans the draft key when the measurement was the only difference.
    store.save();
    updateDirty();
    if (selectedBlock?.blockId === msg.blockId) syncSelectedBlock();
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
    markDesktopChange(section, 'block-edited');
    store.save();
    updateDirty();
    if (selectedBlock?.blockId === block.id) syncSelectedBlock();
    bridge?.sendFrames(section.id, $state.snapshot(frames));
  }

  /** ↺ in mobile view: reset mobile overrides, the whole section or one
   *  block (ADR-0019). hideMobile is kept: visibility is intent. */
  function handleMobileReset(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    if (!section) return;
    pushHistory('mobile-reset');
    if (msg.blockId) {
      const block = section.blocks.find((b) => b.id === msg.blockId);
      if (block) block.frames.mobile = null;
    } else {
      for (const block of section.blocks) block.frames.mobile = null;
    }
    // Without overrides there is nothing left that can drift from desktop.
    if (!hasMobileOverrides(section) && section.responsive?.mobile) {
      section.responsive.mobile.attention = null;
    }
    store.save();
    updateDirty();
    updateAttention();
    bridge?.sendSection(pageId, section);
  }

  /** Arrow move in the mobile reading order: record the new mobileOrder
   *  key and rerender the section, so the auto placement reshuffles. */
  function handleMobileOrder(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    const block = section?.blocks.find((b) => b.id === msg.blockId);
    if (!block || typeof msg.mobileOrder !== 'number') return;
    pushHistory('mobile-order');
    block.mobileOrder = msg.mobileOrder;
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
  }

  /** ✓ in mobile view: the mobile layout has been reviewed. */
  function handleReviewDone(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    if (!section?.responsive?.mobile) return;
    pushHistory('review-done');
    section.responsive.mobile.attention = null;
    store.save();
    updateDirty();
    updateAttention();
  }

  /** Block flags from the preview: decor (the entrance wave) and/or hideMobile. */
  function handleBlockFlag(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    const block = section?.blocks.find((b) => b.id === msg.blockId);
    if (!block) return;
    pushHistory('block-flag');
    if (typeof msg.decor === 'boolean') block.decor = msg.decor;
    if (typeof msg.hideMobile === 'boolean') block.hideMobile = msg.hideMobile;
    store.save();
    updateDirty();
    // hideMobile changes the mobile render; in mobile view the section
    // must be redrawn for the block to actually appear or disappear.
    if (typeof msg.hideMobile === 'boolean' && viewMode === 'mobile') {
      bridge?.sendSection(pageId, section);
    }
    if (selectedBlock?.blockId === msg.blockId) syncSelectedBlock();
  }

  /** New section from "+ New section" in the iframe (the section is
   *  already built by the preset's create() in there). */
  function handleAddSection(msg) {
    pushHistory('add-section');
    // Guard: a section MUST have an id (the schema requires it). The core
    // presets set it themselves, but a plugin preset can forget it, and an
    // id-less section would make the page file invalid on publish. Assign
    // one here if it is missing.
    if (!msg.section.id) msg.section.id = makeId('sec');
    store.data.sections.splice(msg.index, 0, msg.section);
    store.save();
    updateDirty();
    bridge?.sendPage(pageId, store.data);
    // The new section is selected and Properties opens, ready for tuning.
    activeSectionId = msg.section.id;
    syncSectionMirrors(msg.section);
    // The grid overlay has its own toggle; a panel switch does not touch it.
    activePanel = 'properties';
  }

  function handleMoveSection(msg) {
    const s = store.data.sections;
    const i = s.findIndex((x) => x.id === msg.sectionId);
    const j = i + msg.dir;
    if (i < 0 || j < 0 || j >= s.length) return;
    pushHistory('move-section');
    [s[i], s[j]] = [s[j], s[i]];
    store.save();
    updateDirty();
    bridge?.sendPage(pageId, store.data);
  }

  function handleDeleteSection(msg) {
    pushHistory('delete-section');
    if (msg.sectionId === activeSectionId) {
      activeSectionId = null;
      sectionGrid = null;
    }
    // A selected block in the deleted section must not linger in the Properties panel.
    if (selectedBlock?.sectionId === msg.sectionId) selectedBlock = null;
    store.data.sections = store.data.sections.filter((x) => x.id !== msg.sectionId);
    store.save();
    updateDirty();
    bridge?.sendPage(pageId, store.data);
  }

  /** Height drag in the iframe: the iframe already shows the new height,
   *  so we just record it. */
  function handleSectionSize(msg) {
    const section = store.data.sections.find((x) => x.id === msg.sectionId);
    if (!section) return;
    pushHistory('section-size');
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
      markDesktopChange(section, 'section-height');
      if (selectedBlock?.sectionId === msg.sectionId) syncSelectedBlock();
    }
    if (msg.sectionId === activeSectionId) sectionMinHeight = msg.minHeight;
    store.save();
    updateDirty();
  }

  /** Block dropped in another section: move it there in the draft. */
  function handleMoveBlockSection(msg) {
    const from = store.data.sections.find((s) => s.id === msg.fromSectionId);
    const to = store.data.sections.find((s) => s.id === msg.toSectionId);
    const block = from?.blocks.find((b) => b.id === msg.blockId);
    if (!from || !to || !block) return;
    // groupKey: the drop belongs to the undo step of the frames its drag
    // settled in the source section.
    pushHistory(msg.groupKey ? `edit:${msg.groupKey}` : 'move-block');
    from.blocks = from.blocks.filter((b) => b.id !== msg.blockId);
    block.frames.desktop = msg.frame;
    // The mobile layout is re-derived in the new section.
    block.frames.mobile = null;
    to.blocks.push(block);
    markDesktopChange(from, 'block-moved');
    markDesktopChange(to, 'block-moved');
    store.save();
    updateDirty();
    updateAttention();
    // Only the two sections, never the whole page: a full send rebuilds the
    // document from scratch, and the browser clamps the scroll position
    // while it is collapsed. No section is added, removed or reordered here.
    bridge?.sendSection(pageId, from);
    bridge?.sendSection(pageId, to);
    if (selectedBlock?.blockId === msg.blockId) {
      selectedBlock = { ...selectedBlock, sectionId: msg.toSectionId };
      syncSelectedBlock();
    }
  }

  /** Deletion: remove from the draft and rerender the section in the iframe. */
  function handleDelete(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    if (!section) return;
    // blockIds (multi-select): the whole selection is deleted as ONE undo step.
    const ids = msg.blockIds ?? [msg.blockId];
    pushHistory('delete-block');
    section.blocks = section.blocks.filter((b) => !ids.includes(b.id));
    if (ids.includes(selectedBlock?.blockId)) selectedBlock = null;
    markDesktopChange(section, 'block-deleted');
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
  }

  /** The block palette: a new block ready to be dragged where it belongs. */
  /** w in percent of the section width, h in px (physical units). The wide
   *  blocks are 88.89 %, which is 80 of the content surface's 90 grid cells
   *  at the default width: an even cell count leaves five cells on each side,
   *  so snapping can reach the centred position. */
  const BLOCK_DEFAULTS = {
    text: { type: 'text', props: { html: ta('seed.text'), align: 'left' }, w: 33, h: 28 },
    'text-box': { type: 'text', props: { html: ta('seed.textBox'), align: 'left', box: true }, w: 30, h: 150 },
    button: { type: 'button', props: { label: ta('seed.newButton'), page: null, href: null, style: 'primary' }, w: 20, h: 36 },
    'shape-line': { type: 'shape', decor: true, hideMobile: true, props: { kind: 'line', color: 'accent', thickness: 2, fill: null }, w: 25, h: 8 },
    'shape-arrow': { type: 'shape', decor: true, hideMobile: true, props: { kind: 'arrow', color: 'accent', thickness: 2, fill: null }, w: 25, h: 16 },
    'shape-circle': { type: 'shape', decor: true, hideMobile: true, props: { kind: 'circle', color: 'accent', thickness: 2, fill: null }, w: 10, h: 110 },
    'shape-rect': { type: 'shape', decor: true, hideMobile: true, props: { kind: 'rect', color: 'accent', thickness: 2, fill: null }, w: 20, h: 110 },
    'shape-triangle': { type: 'shape', decor: true, hideMobile: true, props: { kind: 'triangle', color: 'accent', thickness: 2, fill: null }, w: 10, h: 110 },
    image: { type: 'image', props: { src: '', alt: '', fit: 'cover', radius: 'md', href: null }, w: 30, h: 220 },
    video: { type: 'video', props: { url: '', title: 'Video' }, w: 45, h: 300 },
    map: { type: 'map', props: { location: '', zoom: 15 }, w: 60, h: 360 },
    form: {
      type: 'form',
      props: {
        recipient: '', subject: '', mode: 'mailto', endpoint: '',
        submitLabel: ta('form.sendDefault'), successText: ta('form.thanksDefault'),
        fields: defaultFormFields(),
      },
      w: 50, h: 380,
    },
    calendar: { type: 'calendar', props: { sources: [], view: 'list', limit: 6, showCategories: false, showSubscribe: false, showSignup: false }, w: 60, h: 320 },
    'calendar-cards': { type: 'calendar', props: { sources: [], view: 'cards', limit: 6, showCategories: false, showSubscribe: false, showSignup: false }, w: 88, h: 320 },
    'calendar-month': { type: 'calendar', props: { sources: [], view: 'month', limit: 6, showCategories: false, showSubscribe: false, showSignup: false }, w: 88, h: 480 },
    'calendar-next': { type: 'calendar', props: { sources: [], view: 'next', limit: 6, nextCount: 3, laterCount: 3, showCategories: false, showSubscribe: false, showSignup: false }, w: 40, h: 180 },
    'calendar-agenda': { type: 'calendar', props: { sources: [], view: 'agenda', limit: 8, showCategories: false, showSubscribe: false, showSignup: false }, w: 60, h: 360 },
    icon: { type: 'icon', decor: true, hideMobile: true, props: { glyph: '★', color: 'accent', size: 48 }, w: 8, h: 64 },
    collection: { type: 'collection', props: { collection: null, view: 'cards', limit: 6, newestFirst: true }, w: 88.89, h: 200 },
    gallery: { type: 'gallery', props: { images: [], view: 'grid', columns: 3, gap: 12, radius: 'md', lightbox: true, interval: 5, width: 'canvas' }, w: 88.89, h: 320 },
    faq: {
      type: 'faq',
      props: {
        items: [
          { q: ta('seed.faq.q1'), a: ta('seed.faq.answer') },
          { q: ta('seed.faq.q2'), a: ta('seed.faq.answer') },
          { q: ta('seed.faq.q3'), a: ta('seed.faq.answer') },
        ],
        multi: false,
      },
      w: 50, h: 220,
    },
    timeline: {
      type: 'timeline',
      props: {
        items: [
          { year: '2019', title: ta('seed.timeline.t1'), text: ta('seed.timeline.text') },
          { year: '2022', title: ta('seed.timeline.t2'), text: ta('seed.timeline.text') },
          { year: '2026', title: ta('seed.timeline.t3'), text: ta('seed.timeline.text') },
        ],
        variant: 'left',
        marker: 'filled',
        accent: null,
      },
      w: 42, h: 260,
    },
    quote: {
      type: 'quote',
      props: { text: ta('seed.quoteBlock.text'), attribution: ta('seed.quoteBlock.name'), role: ta('seed.quoteBlock.role'), variant: 'large', image: '', accent: null },
      w: 44, h: 180,
    },
    stats: {
      type: 'stats',
      props: { value: '4800', prefix: '', suffix: '+', label: ta('seed.statsBlock.label'), countUp: true },
      w: 20, h: 90,
    },
    ribbon: {
      type: 'ribbon',
      props: {
        items: [ta('seed.ribbonBlock.a'), ta('seed.ribbonBlock.b'), ta('seed.ribbonBlock.c')],
        sep: 'dot', speed: 60, direction: 'left', pauseOnHover: true, width: 'canvas',
        variant: 'band', size: 'md', caps: false, tilt: 0, fade: true, gap: 40,
      },
      w: 88.89, h: 70,
    },
    table: {
      type: 'table',
      props: {
        header: true,
        striped: false,
        lines: 'rows',
        rows: [
          [ta('seed.table.h1'), ta('seed.table.h2'), ta('seed.table.h3')],
          [ta('seed.table.r1c1'), ta('seed.table.r1c2'), ''],
          [ta('seed.table.r2c1'), ta('seed.table.r2c2'), ''],
        ],
      },
      w: 50, h: 160,
    },
    share: {
      type: 'share',
      props: { services: ['facebook', 'x', 'linkedin', 'whatsapp', 'email', 'copy'], variant: 'icons', size: 38, color: '' },
      w: 34, h: 48,
    },
    countdown: {
      type: 'countdown',
      // The target is seeded 30 days ahead (at 18:00), so the block counts from the start.
      props: {
        target: (() => {
          const d = new Date(Date.now() + 30 * 86400 * 1000);
          const p = (n) => String(n).padStart(2, '0');
          return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T18:00`;
        })(),
        doneText: ta('seed.countdown.done'),
        variant: 'boxes',
        showSeconds: true,
      },
      w: 40, h: 110,
    },
    audio: { type: 'audio', props: { src: '', title: '', loop: false }, w: 34, h: 80 },
    product: { type: 'product', props: { collection: null, limit: 0, columns: 0, currency: 'kr' }, w: 88.89, h: 300 },
    cart: { type: 'cart', props: { variant: 'button', href: '', currency: 'kr' }, w: 16, h: 48 },
    checkout: { type: 'checkout', props: { recipient: '', endpoint: '', vipps: '', currency: 'kr', vippsCheckout: false }, w: 44, h: 430 },
  };

  function buildBlock(kind) {
    const d = BLOCK_DEFAULTS[kind];
    if (!d) return null;
    return {
      id: makeId('blk'),
      type: d.type,
      version: 1,
      // Shapes are decor by default: outside the entrance wave (decor) and
      // hidden on mobile (hideMobile); both can be turned off per block.
      decor: Boolean(d.decor),
      hideMobile: Boolean(d.hideMobile),
      props: structuredClone(d.props),
      animation: null,
      frames: { desktop: { x: 4, y: 8, w: d.w, h: d.h, z: 1, rot: 0 }, mobile: null },
    };
  }

  /** The iframe places the block in the middle of the viewport (it knows
   *  where the user has scrolled) and reports back via urd-add-block → insertBlock. */
  function requestPlacement(block) {
    if (bridge) {
      bridge.sendPlaceBlock(block);
    } else {
      insertBlock(targetSection()?.id, block);
    }
  }

  function insertBlock(sectionId, block) {
    const section = store.data.sections.find((s) => s.id === sectionId) ?? store.data.sections[0];
    if (!section) return;
    pushHistory('add-block');
    // New and duplicated blocks go to the TOP of the stacking order, so
    // they never hide behind what is already in the section.
    const topZ = Math.max(0, ...section.blocks.map((b) => b.frames?.desktop?.z ?? 1)) + 1;
    if (block.frames?.desktop) block.frames.desktop = { ...block.frames.desktop, z: topZ };
    section.blocks.push(block);
    markDesktopChange(section, 'block-added');
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    // A block that follows its content (ADR-0025) gets its frame fitted to what it shows.
    fitBlockSoon(section.id, block);
  }

  /** The "+ card/row" button on a section: the preset item arrives as a
   *  group of blocks in ONE undo step. moves shifts existing blocks at the
   *  same time (FAQ pushes the closing line down), in the same step. The
   *  section grows to minBottom when the min height is in px (the item
   *  presets always use px). */
  function insertBlocks(sectionId, blocks, minBottom, moves) {
    const section = store.data.sections.find((s) => s.id === sectionId);
    if (!section || !blocks?.length) return;
    pushHistory('add-blocks');
    for (const move of moves ?? []) {
      const block = section.blocks.find((b) => b.id === move.blockId);
      if (block && typeof move.dy === 'number') {
        block.frames.desktop = { ...block.frames.desktop, y: block.frames.desktop.y + move.dy };
      }
    }
    section.blocks.push(...blocks);
    const current = String(section.size?.minHeight ?? '');
    if (minBottom && current.endsWith('px') && Number.parseFloat(current) < minBottom) {
      section.size = { ...section.size, minHeight: `${minBottom}px` };
    }
    markDesktopChange(section, 'block-added');
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
  }

  /** The size a new calendar starts at, by the view its design shows; the frame is fitted to the design once it is placed. */
  const CAL_KIND_BY_VIEW = { list: 'calendar', cards: 'calendar-cards', month: 'calendar-month', next: 'calendar-next', agenda: 'calendar-agenda', week: 'calendar-month', day: 'calendar', year: 'calendar-month' };

  /** A new calendar in one of the designs (the palette's thumbnails and the palette search). */
  function addCalendarDesign(id) {
    const design = calDesign(id);
    const block = buildBlock(CAL_KIND_BY_VIEW[design.view] ?? 'calendar');
    if (!block) return;
    block.props = {
      ...block.props,
      ...(design.view ? { view: design.view } : {}),
      ...(design.id === 'plain' ? {} : { design: design.id }),
      ...(design.view === 'next' ? { nextCount: 3, laterCount: 3 } : {}),
    };
    requestPlacement(block);
  }

  /** The plugin blocks in the Blocks panel: the preview reported
   *  type/label/defaults at plugin load (urd-plugin-blocks), so the block
   *  can be built here. */
  let pluginBlocks = $state([]);

  /** "+ Add block" in a section: build the block and put it there. With a
   *  click point (msg.at, from a double click on the section surface) the
   *  block lands centered on the point, clamped and snapped
   *  (frameAtPoint); without one it is centered horizontally. Image
   *  starts empty (picked in Properties - a file dialog cannot be opened
   *  from a postMessage). */
  function handleRequestBlock(msg) {
    const block = buildBlock(msg.kind);
    if (!block) return;
    if (msg.at && typeof msg.at.x === 'number' && typeof msg.at.y === 'number') {
      const section = store.data.sections.find((s) => s.id === msg.sectionId);
      const grid = section?.grid ?? siteDraft.grid;
      const pos = frameAtPoint({
        x: msg.at.x,
        y: msg.at.y,
        w: block.frames.desktop.w,
        h: block.frames.desktop.h,
        grid,
      });
      block.frames.desktop.x = pos.x;
      block.frames.desktop.y = pos.y;
    } else {
      block.frames.desktop.x = Math.round(((100 - block.frames.desktop.w) / 2) * 100) / 100;
      block.frames.desktop.y = 40;
    }
    insertBlock(msg.sectionId, block);
    // The new block is selected (the preview does not know the id until
    // the rerender; selectById replies with urd-select-block, so the
    // Properties panel follows). Same UX as the palette.
    bridge?.sendSelect(block.id);
    if (msg.kind === 'image') setStatus(ta('status.imageBlockAdded'));
    if (msg.kind === 'gallery') setStatus(ta('status.galleryBlockAdded'));
  }

  /** Multiple images in one upload (the galleries): compress all;
   *  one unreadable image does not stop the rest of the batch. */
  async function compressMany(fileList) {
    const images = [];
    let failed = 0;
    let big = 0;
    for (const file of fileList) {
      try {
        const img = await compressOrTrim(file);
        if (img.bytes > WARN_BYTES) big += 1;
        images.push({ src: img.dataUrl, alt: slugify(file.name).replaceAll('-', ' '), href: null, style: {} });
      } catch {
        failed += 1;
      }
    }
    return { images, failed, big };
  }

  function reportUpload(ok, failed, big) {
    if (failed) setStatus(ta('status.imagesReadFailed', { n: failed }), 'error');
    else if (big) setStatus(ta('status.imagesLarge', { n: big }), 'error');
    else setStatus(ok ? '' : ta('status.noImagesAdded'));
  }

  /** + Add images to a selected gallery block: the whole batch in ONE undo step. */
  async function addGalleryImages(event) {
    const files = [...(event.target.files ?? [])];
    event.target.value = '';
    if (!files.length) return;
    setStatus(ta('status.compressingImages'));
    const { images, failed, big } = await compressMany(files);
    if (images.length) mutateBlock('gallery-add', (b) => { b.props.images.push(...images); });
    reportUpload(images.length, failed, big);
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

  /**
   * Turns unpublished images (data URLs in the draft) into files in
   * media/, and switches src to the path. Returns the file list for the
   * commit. The same image content yields the same file name
   * (deterministic hash), so republishing never duplicates files.
   */
  /** Turns a data URL in obj[field] into a media file; mutates obj.
   *  Images and audio share the flow; mediaExtension picks the extension. */
  function materializeField(obj, field, name, files) {
    const src = obj?.[field];
    if (!src?.startsWith('data:image/') && !src?.startsWith('data:audio/') && !src?.startsWith('data:video/')) return;
    const base64 = src.split(',', 2)[1];
    const path = `media/${slugify(name || 'image')}-${contentHash(base64)}.${mediaExtension(src)}`;
    files.push({ path, content: base64, encoding: 'base64' });
    obj[field] = `/${path}`;
  }

  /** One collection entry's images: the main image + the product colors' images (kind products). */
  function materializeEntryImages(entry, files) {
    materializeField(entry, 'image', entry.title, files);
    for (const color of entry.colors ?? []) materializeField(color, 'image', `${entry.title}-${color.name}`, files);
  }

  /** The background layers' images (image and slideshow) - shared by section, nav and footer. */
  function materializeBackground(background, files) {
    for (const layer of background?.layers ?? []) {
      if (layer.type === 'image') materializeField(layer.props, 'src', 'background', files);
      if (layer.type === 'slideshow') {
        for (const img of layer.props.images ?? []) materializeField(img, 'src', 'background', files);
      }
      if (layer.type === 'video') {
        materializeField(layer.props, 'src', 'video', files);
        materializeField(layer.props, 'poster', 'plakat', files);
      }
    }
  }

  /** One block's images - shared by page publishing and block-group templates. */
  function materializeBlockImages(block, files) {
    if (block.type === 'image') materializeField(block.props, 'src', block.props.alt, files);
    // The icon block's own uploaded icon is published as a media file the same way.
    if (block.type === 'icon') materializeField(block.props, 'image', 'ikon', files);
    if (block.type === 'gallery') {
      for (const img of block.props.images ?? []) materializeField(img, 'src', img.alt || 'gallery', files);
    }
    if (block.type === 'audio') materializeField(block.props, 'src', block.props.title || 'lyd', files);
    // The video block's own film and its poster (source 'file').
    if (block.type === 'video') {
      materializeField(block.props, 'src', block.props.title || 'video', files);
      materializeField(block.props, 'poster', 'poster', files);
    }
  }

  /** One section's images (background + blocks) - shared by page publishing and section templates. */
  function materializeSection(section, files) {
    // Background images follow the same flow as image blocks.
    materializeBackground(section.background, files);
    for (const block of section.blocks) materializeBlockImages(block, files);
  }

  function materializeImages(page) {
    const files = [];
    // The sharing image (meta.og.image) is materialized like the block images.
    if (page.meta?.og) materializeField(page.meta.og, 'image', 'share', files);
    for (const section of page.sections) materializeSection(section, files);
    return files;
  }

  /** Logo uploads in the site draft (nav.logo) are materialized the same way. */
  function materializeSiteImages(site) {
    const files = [];
    const logo = site.nav?.logo;
    if (logo?.type === 'image') materializeField(logo, 'value', 'logo', files);
    if (logo?.type === 'both') materializeField(logo, 'image', 'logo', files);
    // The legacy single nav background image (back compat) + the layered
    // backgrounds on nav and footer.
    if (site.nav?.style) materializeField(site.nav.style, 'image', 'menu', files);
    materializeBackground(site.nav?.style?.background, files);
    materializeBackground(site.footer?.background, files);
    if (site.footer?.brand) materializeField(site.footer.brand, 'logo', 'footer-logo', files);
    // The launcher's own mark on the button, and one per shortcut.
    if (site.nav?.launcher) {
      materializeField(site.nav.launcher, 'image', 'snarvei', files);
      for (const link of site.nav.launcher.links ?? []) materializeField(link, 'image', 'snarvei', files);
    }
    materializeField(site.site, 'icon', 'ikon', files);
    return files;
  }

  // "Discard draft" requires two clicks on TWO different surfaces: the
  // first click arms the button, and the confirmation is its own floating
  // pill below the top bar. The button keeps its width when armed. A click
  // anywhere else, Escape or focus into the preview disarms.
  let discardArmed = $state(false);
  let discardWrapEl = $state(null);

  function requestDiscard() {
    discardArmed = !discardArmed;
  }

  function confirmDiscard() {
    discardArmed = false;
    try {
      discard();
      setStatus(ta('ui.discarded'), 'info');
    } catch (err) {
      // A failed discard must never pass silently: the drafts may be half
      // reset, and the owner needs to know that a reload is the way out.
      console.error('Urd: discard failed', err);
      setStatus(String(err?.message ?? err), 'error');
    }
  }

  $effect(() => {
    if (!discardArmed) return;
    // `contains` against the bound shell covers both the button and the
    // pill, also when the hit lands on an SVG node inside them. Same
    // pattern as the settings and the tool menus.
    // The confirmation is taken here, in the capture phase on window,
    // and not left to the pill's own delegated handler: the click then
    // counts whatever else runs on the way down to the pill.
    const disarm = (e) => {
      if (!discardWrapEl?.contains(e.target)) { discardArmed = false; return; }
      if (e.target instanceof Element && e.target.closest('.discard-confirm')) {
        e.preventDefault();
        e.stopPropagation();
        confirmDiscard();
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') discardArmed = false;
    };
    // A click in the preview (the iframe) never reaches this document, but
    // moves focus out of the window - window blur covers that. A blur that
    // arrives while the pointer is held down on the button or the pill is
    // not that click: it would unmount the pill under the pointer before
    // its own click lands, so it is ignored until the pointer is released.
    let held = false;
    const onDown = (e) => { held = !!discardWrapEl?.contains(e.target); };
    const onUp = () => { held = false; };
    const onBlur = () => { if (!held) discardArmed = false; };
    // Outside clicks disarm on click: the confirmation pill is then
    // unmounted only after the click it may have targeted has landed.
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('pointerup', onUp, true);
    window.addEventListener('click', disarm, true);
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('pointerup', onUp, true);
      window.removeEventListener('click', disarm, true);
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('blur', onBlur);
    };
  });

  function discard() {
    pushHistory('discard');
    for (const p of siteDraft.pages) {
      if (p.id !== pageId && !pendingPublished.has(p.id)) localStorage.removeItem(`urd-draft-${p.id}`);
    }
    const freshPage = store.reset();
    siteStore.reset();
    if (pluginsStore) {
      pluginsStore.reset();
      syncPluginsView();
    }
    if (collectionsIndexStore) {
      collectionsIndexStore.reset();
      collectionIds = [...(collectionsIndexStore.data.samlinger ?? [])];
      for (const id of Object.keys(collectionStores)) {
        if (collectionIds.includes(id)) collectionStores[id].reset();
        else delete collectionStores[id];
      }
      syncCollectionsView();
    }
    if (templatesIndexStore) {
      templatesIndexStore.reset();
      templateIds = [...(templatesIndexStore.data.maler ?? [])];
      // Never-published templates (does-not-exist baseline) vanish with the
      // draft; published ones return to the published state.
      for (const id of Object.keys(templateStores)) {
        if (templateIds.includes(id)) templateStores[id].reset();
        else { localStorage.removeItem(`urd-draft-template-${id}`);
        localStorage.removeItem(`urd-draft-mal-${id}`); delete templateStores[id]; }
      }
      pushTemplatesToPreview();
    }
    linkSiteDraft();
    grid = { snap: true, ...siteDraft.grid };
    updateDirty();
    status = '';
    pushSiteToPreview();
    // Discarding can remove the page you are on (an unpublished new page).
    if (!siteDraft.pages.some((p) => p.id === pageId)) {
      selectPage(siteDraft.pages[0].id);
    } else {
      bridge?.sendPage(pageId, freshPage);
    }
  }

  async function publish() {
    if (revertedSinceLoad) {
      setStatus(ta('status.revertReloadBeforePublish'), 'error');
      return;
    }
    if (updateBusy) {
      // Publishing writes slug copies from the SERVED root index; in the
      // deploy window after an engine update it still points to the
      // deleted engine directory, and the copies would break all the
      // subpages (ADR-0013).
      setStatus(ta('update.publishBlocked'), 'error');
      return;
    }
    setStatus(ta('status.publishing'));
    const files = [];
    const publishedTitles = [];
    const draftKeys = [];
    const newPageIds = [];

    // ALL pages with drafts are published, not just the current one.
    for (const entry of siteDraft.pages) {
      const key = `urd-draft-${entry.id}`;
      const isNew = pendingPublished.has(entry.id) || !site.pages.some((p) => p.id === entry.id);
      let page = null;
      if (entry.id === pageId && (store.hasDraft() || isNew)) {
        page = store.data;
      } else if (entry.id !== pageId) {
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            page = liftPageFile(JSON.parse(raw), siteStore.data);
          } catch { /* a corrupt draft is skipped */ }
        }
      }
      // A new page must NEVER be published without a page file (visitors
      // would get a dead address): if the draft is missing, a blank page
      // is published.
      if (!page && isNew) page = blankPage(entry);
      if (!page) continue;
      // Clone before materializing: the drafts in memory are untouched
      // until the commit actually succeeds (an aborted publish must never
      // leave image references to files that do not exist).
      const out = JSON.parse(JSON.stringify(page));
      // Unpublished images become their own files in media/ in the same commit.
      files.push(...materializeImages(out));
      files.push({ path: entry.file, content: JSON.stringify(out, null, 2) + '\n', encoding: 'utf-8' });
      publishedTitles.push(entry.title);
      // New pages do not exist on the server until the deploy finishes:
      // the draft is kept as the source until then, and cleaned up
      // automatically on the next visit.
      if (isNew) newPageIds.push(entry.id);
      else draftKeys.push(key);
    }

    if (siteStore.hasDraft()) {
      // Clone here too: logo uploads are materialized without touching the
      // draft in memory until the commit is safely in.
      const siteOut = JSON.parse(JSON.stringify(siteDraft));
      files.push(...materializeSiteImages(siteOut));
      files.push({ path: 'content/site.json', content: JSON.stringify(siteOut, null, 2) + '\n', encoding: 'utf-8' });
      // Materialize the theme as render-blocking light-dark() CSS
      // (FOUC-free first paint). One file covers all pages; the index.html
      // copies link to it.
      files.push({ path: 'content/theme.css', content: buildThemeCss(siteOut.theme), encoding: 'utf-8' });
      draftKeys.push('urd-draft-site');
      // Name WHAT in the site setup changed (for the history).
      const eq = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
      if (!eq(site.theme, siteDraft.theme)) publishedTitles.push(ta('publish.part.theme'));
      if (!eq(site.nav, siteDraft.nav)) publishedTitles.push(ta('publish.part.nav'));
      if (!eq(site.footer, siteDraft.footer)) publishedTitles.push(ta('publish.part.footer'));
      if (!eq(site.pages, siteDraft.pages)) publishedTitles.push(ta('publish.part.pages'));
      if (!eq(site.grid, siteDraft.grid)) publishedTitles.push(ta('publish.part.grid'));
      if ((site.site.icon ?? null) !== (siteDraft.site.icon ?? null)) publishedTitles.push(ta('publish.part.icon'));
      const { icon: a, ...restA } = site.site;
      const { icon: b, ...restB } = siteDraft.site;
      if (!eq(restA, restB)) publishedTitles.push(ta('publish.part.siteInfo'));
    }

    // Collections: changed files, the index file and deletions (diff against the published index).
    const changedCollections = Object.entries(collectionStores).filter(([, st]) => st.hasDraft());
    if (changedCollections.length || collectionsIndexStore?.hasDraft()) {
      for (const [id, st] of changedCollections) {
        const out = JSON.parse(JSON.stringify(st.data));
        for (const entry of out.entries) materializeEntryImages(entry, files);
        files.push({ path: `content/samlinger/${id}.json`, content: JSON.stringify(out, null, 2) + '\n', encoding: 'utf-8' });
        // Dated collections get an RSS feed in the same publish (the SEO
        // package): the entries as plain text, the addresses from the
        // origin the admin runs on.
        if (FEED_KINDS.includes(out.kind)) {
          files.push({
            path: `content/samlinger/${id}.xml`,
            content: buildRssXml({
              title: out.name ?? id,
              origin: location.origin,
              path: `/content/samlinger/${id}.xml`,
              items: out.entries.map((e) => ({
                id: e.id, title: plainTitle(e.title), text: plainTitle(e.text), date: e.date, href: e.href,
              })),
            }),
            encoding: 'utf-8',
          });
        }
        draftKeys.push(`urd-draft-samling-${id}`);
      }
      if (collectionsIndexStore?.hasDraft()) {
        files.push({ path: 'content/collections.json', content: JSON.stringify(collectionsIndexStore.data, null, 2) + '\n', encoding: 'utf-8' });
        draftKeys.push('urd-draft-collections', 'urd-draft-samlinger');
        // Collections removed from the index are deleted from the repo (if
        // also created in the same publish, the create list above wins).
        let publishedIndex = { samlinger: [] };
        try {
          publishedIndex = await (await fetch('/content/collections.json')).json();
        } catch { /* no published index yet */ }
        const created = new Set(files.map((f) => f.path));
        for (const id of publishedIndex.samlinger ?? []) {
          const path = `content/samlinger/${id}.json`;
          if (!collectionIds.includes(id) && !created.has(path)) files.push({ path, delete: true });
        }
      }
      publishedTitles.push(ta('publish.part.collections'));
    }

    // Template changes are published as content/maler/ files + index, the
    // same pattern as collections; images in the template are materialized
    // to media/.
    const changedTemplates = Object.entries(templateStores).filter(([, st]) => st.hasDraft());
    if (changedTemplates.length || templatesIndexStore?.hasDraft()) {
      for (const [id, st] of changedTemplates) {
        const out = JSON.parse(JSON.stringify(st.data));
        if (out.section) materializeSection(out.section, files);
        for (const block of out.blocks ?? []) materializeBlockImages(block, files);
        for (const section of out.page?.sections ?? []) materializeSection(section, files);
        files.push({ path: `content/maler/${id}.json`, content: JSON.stringify(out, null, 2) + '\n', encoding: 'utf-8' });
        draftKeys.push(`urd-draft-mal-${id}`);
      }
      if (templatesIndexStore?.hasDraft()) {
        files.push({ path: 'content/maler.json', content: JSON.stringify(templatesIndexStore.data, null, 2) + '\n', encoding: 'utf-8' });
        draftKeys.push('urd-draft-templates', 'urd-draft-maler');
        // Templates removed from the index are deleted from the repo (if
        // the id is also created in the same publish, the create list wins).
        let publishedIndex = { maler: [] };
        try {
          publishedIndex = await (await fetch('/content/maler.json')).json();
        } catch { /* no published index yet */ }
        const created = new Set(files.map((f) => f.path));
        for (const id of publishedIndex.maler ?? []) {
          const path = `content/maler/${id}.json`;
          if (!templateIds.includes(id) && !created.has(path)) files.push({ path, delete: true });
        }
      }
      publishedTitles.push(ta('publish.part.templates'));
    }

    // Plugin changes (enabled/disabled/added) are published as plugins.json.
    if (pluginsStore?.hasDraft()) {
      files.push({ path: 'plugins/plugins.json', content: JSON.stringify(pluginsStore.data, null, 2) + '\n', encoding: 'utf-8' });
      draftKeys.push('urd-draft-plugins');
      publishedTitles.push(ta('publish.part.plugins'));
    }

    // Page routing on all static hosts: every page except the front page
    // gets its own <path>/index.html (a copy of the root index.html; the
    // engine routes on pathname). Generated on every publish - unchanged
    // copies yield identical blobs and thus no diff in the commit.
    try {
      const html = await (await fetch('/index.html')).text();
      for (const p of siteDraft.pages) {
        if (p.path !== '/') {
          files.push({ path: `${p.path.slice(1)}/index.html`, content: html, encoding: 'utf-8' });
        }
      }
    } catch { /* without the index copies the site still works on SPA hosts */ }

    // The visibility files (the SEO package): sitemap and robots are
    // regenerated on every publish from the origin the admin runs on -
    // unchanged content yields identical blobs and no diff, like the
    // index copies.
    files.push({ path: 'sitemap.xml', content: buildSitemapXml(siteDraft.pages, location.origin), encoding: 'utf-8' });
    files.push({ path: 'robots.txt', content: buildRobotsTxt(location.origin), encoding: 'utf-8' });

    // Deleted and moved pages: diff against the published site.json. The
    // server silently skips paths already gone from the repo. A path ALSO
    // created in the same commit (two pages swapping addresses) must not
    // be deleted: the last entry with the same path wins in the Git tree,
    // so such a deletion would remove the new copy.
    const created = new Set(files.map((f) => f.path));
    const del = (path) => { if (!created.has(path)) files.push({ path, delete: true }); };
    for (const p of site.pages) {
      const still = siteDraft.pages.find((q) => q.id === p.id);
      if (!still) {
        del(p.file);
        if (p.path !== '/') del(`${p.path.slice(1)}/index.html`);
      } else if (still.path !== p.path && p.path !== '/') {
        del(`${p.path.slice(1)}/index.html`);
      }
    }

    // Conflict warning: if someone else has published since we loaded and
    // we touch the same files, the editor must actively choose to publish anyway.
    const conflict = await confirmNoConflict(files);
    if (!conflict.ok) {
      setStatus(ta('status.publishAborted'), 'error');
      return;
    }

    const body = {
      message: ta('publish.commitMessage', { titles: publishedTitles.join(', ') || ta('publish.theSite') }),
      files,
      // The HEAD the conflict check saw: the server rejects with 409 if
      // someone manages to publish inside the commit window itself.
      ...(conflict.head ? { expect: conflict.head } : {}),
    };
    let res = null;
    try {
      res = await fetch('/api/github/commit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch { /* network errors are handled below */ }

    if (res?.ok) {
      // New HEAD = our commit: the conflict baseline moves forward.
      const { sha } = await res.json().catch(() => ({}));
      if (sha) baseSha = sha;
      else refreshBaseSha();
      // Mirror the materialization into memory now that the commit is
      // safely in (the same deterministic paths the clones got).
      materializeImages(store.data);
      materializeSiteImages(siteDraft);
      // The drafts ARE now the published state; keep the data in memory
      // (the server serves old JSON until the deploy finishes) and remove
      // only the markers.
      for (const key of draftKeys) localStorage.removeItem(key);
      for (const id of newPageIds) pendingPublished.add(id);
      // Published baseline = the draft: rebuild the store baselines, so
      // "Discard draft" never rolls back past this publish.
      site = JSON.parse(JSON.stringify(siteDraft));
      siteStore = createDraftStore('urd-draft-site', () => site, draftSaveError);
      linkSiteDraft();
      if (pluginsStore) {
        const publishedPlugins = JSON.parse(JSON.stringify(pluginsStore.data));
        pluginsStore = createDraftStore('urd-draft-plugins', () => publishedPlugins, draftSaveError);
        syncPluginsView();
      }
      if (collectionsIndexStore) {
        // Mirror the materialization into memory (the same deterministic paths the clones got).
        for (const st of Object.values(collectionStores)) {
          for (const entry of st.data.entries) materializeEntryImages(entry, []);
        }
        const publishedIndex = JSON.parse(JSON.stringify(collectionsIndexStore.data));
        collectionsIndexStore = createDraftStore('urd-draft-collections', () => publishedIndex, draftSaveError, 'urd-draft-samlinger');
        publishedCollections = {};
        for (const id of collectionIds) {
          if (!collectionStores[id]) continue;
          const publishedCollection = JSON.parse(JSON.stringify(collectionStores[id].data));
          publishedCollections[id] = publishedCollection;
          collectionStores[id] = createDraftStore(`urd-draft-collection-${id}`, () => publishedCollection, draftSaveError, `urd-draft-samling-${id}`);
        }
        syncCollectionsView();
      }
      if (templatesIndexStore) {
        // Mirror the materialization into memory (the same deterministic paths the clones got).
        for (const st of Object.values(templateStores)) {
          if (st.data?.section) materializeSection(st.data.section, []);
          for (const block of st.data?.blocks ?? []) materializeBlockImages(block, []);
          for (const section of st.data?.page?.sections ?? []) materializeSection(section, []);
        }
        const publishedTemplateIndex = JSON.parse(JSON.stringify(templatesIndexStore.data));
        templatesIndexStore = createDraftStore('urd-draft-templates', () => publishedTemplateIndex, draftSaveError, 'urd-draft-maler');
        publishedTemplates = {};
        for (const id of templateIds) {
          if (!templateStores[id]) continue;
          const publishedTemplate = JSON.parse(JSON.stringify(templateStores[id].data));
          publishedTemplates[id] = publishedTemplate;
          templateStores[id] = createDraftStore(`urd-draft-template-${id}`, () => publishedTemplate, draftSaveError, `urd-draft-mal-${id}`);
        }
        pushTemplatesToPreview();
      }
      grid = { snap: true, ...siteDraft.grid };
      const pageSnap = JSON.parse(JSON.stringify(store.data));
      store = createDraftStore(`urd-draft-${pageId}`, () => pageSnap, draftSaveError);
      if (pendingPublished.has(pageId)) {
        // New page: the draft is the source until the deploy finishes - keep it.
        writeDraftKey(`urd-draft-${pageId}`, JSON.stringify(pageSnap));
      }
      updateDirty();
      // The wait keeps the message up (info never auto-clears) until the
      // site serves the commit or the wait gives up.
      setStatus(ta('status.published'), 'info');
      awaitPublishDeploy(files);
    } else if (res?.status === 401) {
      const data = await res.json().catch(() => null);
      setStatus(data?.code === 'loginExpired'
        ? ta('status.loginExpired')
        : ta('status.loginRequired', { reason: taApiError(data) ?? ta('status.unknownReason') }), 'error');
      await checkAuth();
    } else if (res?.status === 403) {
      setStatus(taApiError(await res.json().catch(() => null)) ?? ta('status.noPublishAccess'), 'error');
    } else if (res?.status === 409) {
      // Someone published inside the commit window itself: the drafts are
      // untouched, and baseSha stands still, so a retry runs the conflict
      // check again and picks up the fresh changes.
      setStatus(ta('status.publishRace'), 'error');
    } else if (res) {
      setStatus(taApiError(await res.json().catch(() => null))
        ?? ta('status.publishFailed'), 'error');
    } else {
      setStatus(ta('status.publishUnavailable'), 'error');
    }
  }

  init();

  /** The size slider's gesture ends: the next slide starts from where the block then stands. */
  function endSizeGesture() {
    sizeGesture = null;
  }

  /* The element menu's handle on the editor (menu/ElementMenu.svelte, its
     families and Placement): the state it reads, as getters so a read follows
     the state, and the functions it writes through. The drafts and their
     mutators move into state modules with the later stages of 0.7.26; until
     then the menu takes them from here. */
  setContext('urd-editor', {
    get selectedBlock() { return selectedBlock; },
    get siteDraft() { return siteDraft; },
    get viewMode() { return viewMode; },
    get sections() { return store?.data.sections ?? []; },
    get collectionIds() { return collectionIds; },
    get collectionsView() { return collectionsView; },
    get pluginBlocks() { return pluginBlocks; },
    get bridge() { return bridge; },
    blockLabel: (type) => BLOCK_LABELS[type] ?? type,
    blockEntranceOptions: () => BLOCK_ENTRANCE_OPTIONS,
    hoverOptions: () => HOVER_OPTIONS,
    isEntrance,
    themeSwatches,
    siteCalendars,
    siteCalendarById,
    addSiteCalendar,
    newSeed,
    setStatus,
    mutateBlock,
    setBlockProp,
    setBlockProps,
    setBlockFrame,
    setBlockFit,
    setBlockFitMin,
    setBlockSize,
    endSizeGesture,
    setBlockSizeBound,
    setBlockHeightMode,
    setBlockHeightAlign,
    canStretch,
    setBlockHideMobile,
    setBlockDecor,
    setBlockAnimation,
    setBlockHover,
    setBlockAnimProp,
    designWidth,
    shapePx,
    setShapeSizePx,
    setBoxStyle,
    buttonTargets,
    setButtonTarget,
    openImageEditor,
    compressOrTrim,
    imageErrorText,
    setBlockVideoFile,
    setBlockVideoPoster,
    addGalleryImages,
    moveGalleryImage,
    removeGalleryImage,
    setGalleryImageField,
    addCollectionEntry,
    createCatalogForBlock,
    /** The Site panel, opened at its calendars; the Collections panel, opened at one collection; the calendar design picker. */
    openPanel: (panel, opts = {}) => {
      if (opts.calendars) siteCalendarsOpen = true;
      activePanel = panel;
    },
    openCollection: (id) => {
      activeCollection = id;
      activePanel = 'collections';
    },
    openDesignPicker: () => {
      designPicker = { mode: 'set' };
    },
    /* What the site panels (panels/*.svelte) read and write through, 0.7.26.3. */
    get activePanel() { return activePanel; },
    get missingSeo() { return missingSeo; },
    get pageId() { return pageId; },
    get seoDraft() { return seoDraft; },
    get templateIds() { return templateIds; },
    get newPageTemplate() { return newPageTemplate; },
    set newPageTemplate(v) { newPageTemplate = v; },
    get newPageTitle() { return newPageTitle; },
    set newPageTitle(v) { newPageTitle = v; },
    get pageMenuFor() { return pageMenuFor; },
    set pageMenuFor(v) { pageMenuFor = v; },
    addPage,
    deletePage,
    handleDeleteTemplate,
    renamePage,
    savePageAsTemplate,
    selectPage,
    setPageNoindex,
    setPageSeo,
    setPageSlug,
    templateStores,
    uploadOgImage,
    get grid() { return grid; },
    navBgCtx,
    siteMutate,
    get bindsFrom() { return bindsFrom; },
    get layoutGutter() { return layoutGutter; },
    get layoutWidth() { return layoutWidth; },
    get site() { return site; },
    get iconEditorImage() { return iconEditorImage; },
    set iconEditorImage(v) { iconEditorImage = v; },
    get openSiteCalendar() { return openSiteCalendar; },
    set openSiteCalendar(v) { openSiteCalendar = v; },
    get siteCalendarsOpen() { return siteCalendarsOpen; },
    set siteCalendarsOpen(v) { siteCalendarsOpen = v; },
    get siteZoneBad() { return siteZoneBad; },
    set siteZoneBad(v) { siteZoneBad = v; },
    siteLangOptions,
    siteLangValue,
    svgAutoTrim,
    get activeThemePreset() { return activeThemePreset; },
    THEME_PRESETS,
    applyThemePreset,
    readableOn,
    suggestAltColors,
    themeHex,
    setGrid,
    footerBgCtx,
    footerMutate,
    /* What the site panels (panels/*.svelte) read and write through, 0.7.26.3. */
    get iframeEl() { return iframeEl; },
    get designPicker() { return designPicker; },
    set designPicker(v) { designPicker = v; },
    addCalendarDesign,
    buildBlock,
    compressMany,
    reportUpload,
    requestPlacement,
    get activeSectionId() { return activeSectionId; },
    get previewPalette() { return previewPalette; },
    get sectionAnim() { return sectionAnim; },
    get sectionBg() { return sectionBg; },
    get sectionBgCtx() { return sectionBgCtx; },
    get sectionDivider() { return sectionDivider; },
    get sectionGrid() { return sectionGrid; },
    get sectionHover() { return sectionHover; },
    get sectionMinHeight() { return sectionMinHeight; },
    get sectionTheme() { return sectionTheme; },
    BLOCK_LABELS,
    ENTRANCE_OPTIONS,
    HOVER_OPTIONS,
    animObj,
    mutateSection,
    normalizeAnim,
    setSectionGrid,
    setSectionHeight,
    toggleSectionGrid,
    get collectionStores() { return collectionStores; },
    get activeCollection() { return activeCollection; },
    set activeCollection(v) { activeCollection = v; },
    get newCollectionKind() { return newCollectionKind; },
    set newCollectionKind(v) { newCollectionKind = v; },
    get newCollectionName() { return newCollectionName; },
    set newCollectionName(v) { newCollectionName = v; },
    addCollection,
    mutateCollection,
    plainTitle,
    removeCollection,
    get liveCsp() { return liveCsp; },
    get pluginDiscovery() { return pluginDiscovery; },
    get pluginEngine() { return pluginEngine; },
    get pluginInfo() { return pluginInfo; },
    get pluginsView() { return pluginsView; },
    get pluginsFound() { return pluginsFound; },
    set pluginsFound(v) { pluginsFound = v; },
    knownPlugins,
    loadPluginInfo,
    removePlugin,
    setPluginEnabled,
    get auth() { return auth; },
    get historyError() { return historyError; },
    get historyList() { return historyList; },
    get baseSha() { return baseSha; },
    set baseSha(v) { baseSha = v; },
    get revertedSinceLoad() { return revertedSinceLoad; },
    set revertedSinceLoad(v) { revertedSinceLoad = v; },
    askConfirm,
    loadHistory,
    refreshBaseSha,
    get updateError() { return updateError; },
    get updateInfo() { return updateInfo; },
    get updateBusy() { return updateBusy; },
    set updateBusy(v) { updateBusy = v; },
    get updateSkip() { return updateSkip; },
    set updateSkip(v) { updateSkip = v; },
    loadUpdateCheck,
    get secBox() { return secBox; },
    BG_DEFS,
    BG_TYPES,
    readVideoFile,
  });
</script>

<svelte:window onkeydown={onKeydown} onpointerdown={onPointerdownWindow} />

<div class="editor">
  {#if !chromeVisible}
    <!-- Clean view: all editor UI is hidden so the page gets the full surface -->
    <button class="chrome-restore" onclick={toggleChrome} title={ta('tip.backToEdit')}>{@html ICONS.pencil} {ta('ui.edit')}</button>
  {/if}

  <header class="topbar" class:hidden={!chromeVisible}>
    <span class="topbar-group">
      {#if site}
        <!-- Current page: a click opens the Pages panel; the page you are
             on must stay visible -->
        <button class="ghost page-btn" title={ta('tip.switchPage')}
          onclick={() => togglePanel('pages')}>{pageEntry()?.title ?? ''}</button>

        <!-- The clusters fold one at a time (FOLD_MQ), not all at the same
             threshold: a single step swapping eleven controls for three
             menu buttons would be too big a jump. A folded cluster carries
             its own current value on the button (device icon, zoom
             percent), so the state can be read without opening the menu.

             `display: contents` on the shell: it exists only so the
             outside-click test has ONE node to ask, and must not create
             its own box in the bar. -->
        <span class="toolset" bind:this={toolMenuEl}>
          {#if folded.device}
            <span class="toolmenu">
              <button class="ghost" class:active={toolMenu === 'device'}
                title={ta('lbl.group.device')}
                onclick={() => (toolMenu = toolMenu === 'device' ? null : 'device')}
                >{@html ICONS[`device_${deviceId}`]}{@html ICONS.caret}</button>
              {#if toolMenu === 'device'}
                <div class="tool-pop">
                  {#each devices as d (d.id)}
                    <button class="ghost" class:active={deviceId === d.id}
                      onclick={() => { deviceId = d.id; toolMenu = null; }}
                      title={deviceTip(d)}
                      >{@html ICONS[`device_${d.id}`]} {ta(`lbl.device.${d.id}`)}</button>
                  {/each}
                </div>
              {/if}
            </span>
          {:else}
            <!-- Eleven controls in a row with identical borders read as one
                 strip. Three labeled clusters instead: Device, Zoom, View. -->
            <span class="tool-cap">{ta('lbl.group.device')}</span>
            <span class="viewswitch toolgrp">
              {#each devices as d (d.id)}
                <button class="ghost" class:active={deviceId === d.id}
                  onclick={() => (deviceId = d.id)}
                  title={deviceTip(d)}
                  >{@html ICONS[`device_${d.id}`]}</button>
              {/each}
            </span>
          {/if}

          {#if folded.zoom}
            <span class="toolmenu">
              <button class="ghost" class:active={toolMenu === 'zoom'}
                title={ta('lbl.group.zoom')}
                onclick={() => (toolMenu = toolMenu === 'zoom' ? null : 'zoom')}
                ><span class="zoom-cap">{Math.round(scale * 100)}%</span>{@html ICONS.caret}</button>
              {#if toolMenu === 'zoom'}
                <!-- The menu stays open while stepping: zoom is adjusted in
                     several clicks, and a menu that closed on every click
                     would have to be reopened for each step. -->
                <div class="tool-pop">
                  <div class="tool-pop-row">
                    <button class="ghost" onclick={() => stepZoom(-1)} title={ta('tip.zoomOut')}>{@html ICONS.minus}</button>
                    <span class="zoom-readout" title={ta('tip.zoomCurrent')}>{Math.round(scale * 100)}%</span>
                    <button class="ghost" onclick={() => stepZoom(1)} title={ta('tip.zoomIn')}>{@html ICONS.plus}</button>
                  </div>
                  <button class="ghost" class:active={zoomMode === 'fit'}
                    onclick={() => (zoomMode = 'fit')} title={ta('tip.zoomFit')}
                    >{@html ICONS.fit} {ta('lbl.zoom.fit')}</button>
                </div>
              {/if}
            </span>
          {:else}
            <span class="tool-cap">{ta('lbl.group.zoom')}</span>
            <span class="zoomswitch toolgrp">
              <button class="ghost" onclick={() => stepZoom(-1)} title={ta('tip.zoomOut')}>{@html ICONS.minus}</button>
              <span class="zoom-readout" title={ta('tip.zoomCurrent')}>{Math.round(scale * 100)}%</span>
              <button class="ghost" onclick={() => stepZoom(1)} title={ta('tip.zoomIn')}>{@html ICONS.plus}</button>
              <button class="ghost" class:active={zoomMode === 'fit'}
                onclick={() => (zoomMode = 'fit')} title={ta('tip.zoomFit')}>{@html ICONS.fit}</button>
            </span>
          {/if}

          {#if folded.view}
            <span class="toolmenu">
              <button class="ghost" class:active={toolMenu === 'view' || gridOn || guidesOn}
                title={ta('lbl.group.view')}
                onclick={() => (toolMenu = toolMenu === 'view' ? null : 'view')}
                >{@html ICONS.gridToggle}{@html ICONS.caret}</button>
              {#if toolMenu === 'view'}
                <div class="tool-pop">
                  <button class="ghost" class:active={gridOn} onclick={toggleGrid}
                    title={ta('tip.gridToggle')}>{@html ICONS.gridToggle} {ta('lbl.view.grid')}</button>
                  <button class="ghost" class:active={guidesOn} onclick={toggleGuides}
                    title={ta('tip.guides')}>{@html ICONS.guides} {ta('lbl.view.guides')}</button>
                </div>
              {/if}
            </span>
          {:else}
            <span class="tool-cap">{ta('lbl.group.view')}</span>
            <span class="toolgrp">
              <button class="ghost" class:active={gridOn} onclick={toggleGrid}
                title={ta('tip.gridToggle')}>{@html ICONS.gridToggle}</button>
              <button class="ghost" class:active={guidesOn} onclick={toggleGuides}
                title={ta('tip.guides')}>{@html ICONS.guides}</button>
            </span>
          {/if}
        </span>
      {/if}

      {#if attentionCount > 0}
        <button class="badge attention" onclick={jumpToAttention}
          title={ta('tip.attention')}>
          {@html ICONS.phone}
          <span class="btn-label">{ta(attentionCount === 1 ? 'ui.attentionOne' : 'ui.attentionMany', { n: attentionCount })}</span>
          <span class="badge-mini">{attentionCount}</span>
        </button>
      {/if}

    </span>

    <span class="topbar-group topbar-draft">
      {#if dirty}
        <!-- The cluster slides out to the right with a quick fade when the
             draft is discarded or published; the space collapses only
             afterwards, so the bar never jumps mid-motion. Reduced motion
             gives a plain cut. -->
        <span class="draft-cluster" out:fly={{ x: 24, duration: reducedMotion ? 0 : 150 }}>
        <!-- The status is a STATE, not an action: the pill shape remains,
             but with the chip idiom rather than a filled accent surface
             (ADR-0016), so Publish is the only filled surface in the bar. -->
        <!-- The narrowest step shows only the exclamation mark; the title
             carries the word, and both forms are aria-hidden so screen
             readers get it once. -->
        <span class="chip draft-chip" title={ta('ui.unpublished')} aria-label={ta('ui.unpublished')}>
          <span class="chip-full" aria-hidden="true">{ta('ui.unpublished')}</span>
          <span class="chip-mini" aria-hidden="true">!</span>
        </span>
        <!-- Discard is destructive and would otherwise take prime space. A
             full pill when there is room, otherwise a small red circle.
             The restore glyph, not a back arrow: the latter means undo.
             The button keeps its width when armed; the confirmation comes
             as its own pill below the bar. -->
        <!-- The shell exists for the anchoring: the pill is centered under
             the BUTTON, not under the group, so it points at what it confirms. -->
        <span class="discard-wrap" bind:this={discardWrapEl}>
          <button class="discard-dot" class:armed={discardArmed} onclick={requestDiscard}
            title={discardArmed ? ta('tip.discardArmed') : ta('tip.discard')}
          >{@html ICONS.restore}<span class="discard-label">{ta('ui.discard')}</span></button>
          {#if discardArmed}
            <button class="discard-confirm" onclick={confirmDiscard} title={ta('tip.discardArmed')}
              >{@html ICONS.restore} {ta('ui.discardConfirm')}</button>
          {/if}
        </span>
        </span>
      {/if}
    </span>

    <span class="topbar-group topbar-right">
    {#if site}
      <button
        class="ghost"
        onclick={toggleChrome}
        title={chromeVisible ? ta('tip.chromeHide') : ta('tip.chromeShow')}
      >{#if chromeVisible}{@html ICONS.eye} <span class="btn-label">{ta('ui.cleanView')}</span>{:else}{@html ICONS.pencil} <span class="btn-label">{ta('ui.edit')}</span>{/if}</button>
      {#if auth?.loggedIn}
        <span class="who" title={auth.allowed ? ta('tip.hasPublishAccess') : ta('tip.noPublishAccess')}>
          {#if !auth.allowed}{@html ICONS.warn}{/if}{auth.login}
        </span>
      {:else if auth}
        <!-- Login keeps its text at all widths: without an icon the button
             would be empty, and it is the entry point to publishing at all. -->
        <a class="ghost" href="/api/github/login">{ta('ui.loginGitHub')}</a>
      {/if}
      <a class="ghost" href={pageEntry()?.path ?? '/'} target="_blank" rel="noopener"
        title={ta('ui.viewSite')}>{@html ICONS.external} <span class="btn-label">{ta('ui.viewSite')}</span></a>
      <button class="primary" onclick={publish} disabled={!dirty}>{ta('ui.publish')}</button>
    {/if}
    </span>
  </header>

  {#if site}
    <div class="workspace">
      <!-- Clean view hides the rail and the panel rather than unmounting them:
           the folds keep their own open state in the DOM, which lives only
           as long as the subtree does. -->
      <nav class="rail" class:hidden={!chromeVisible}>
        {#each PANEL_GROUPS as group, gi (gi)}
          <!-- Uppercase label above each group: page tools, site settings
               and system read as three levels. -->
          <span class="rail-group">{ta(PANEL_GROUP_KEYS[gi])}</span>
          {#each group as name (name)}
            <button class:active={activePanel === name} onclick={() => togglePanel(name)}>{PANEL_LABELS[name]}</button>
          {/each}
        {/each}
        <span class="rail-settings" bind:this={settingsEl}>
          <!-- The mark lives at the bottom of the rail by the gear, not in
               the top bar: there it would take the space the discard
               confirmation needs to grow. -->
          <span class="rail-brand" title="Urd">
            <!-- The viewBox is cropped to the glyph's visual box (stroke
                 included), so the svg bottom IS the rune's foot and the
                 baseline alignment lands. -->
            <svg class="brand-mark" viewBox="10.3 8.3 19.4 25.4" aria-hidden="true"><path d="M12 32V10l16 6.5V32" fill="none" stroke="var(--urd-brand)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span class="brand-word">Urd</span>
          </span>
          <button class="rail-gear" class:active={settingsOpen} title={ta('settings.title')}
            onclick={() => (settingsOpen = !settingsOpen)}>{@html ICONS.gear}</button>
          {#if settingsOpen}
            <div class="settings-pop">
              <p class="panel-strong">{ta('settings.title')}</p>
              <label title={ta('topbar.adminTheme.title')}>{ta('settings.theme')}
                <Dropdown value={adminTheme} options={ADMIN_THEMES} onchange={(v) => (adminTheme = v)} /></label>
              <label title={ta('topbar.language.title')}>{ta('settings.language')}
                <Dropdown value={adminLangChoice} options={[['auto', ta('lang.auto')], ...adminLangOptions()]} onchange={setAdminLang} /></label>
              <label title={ta('tip.settings.layoutPicker')}>{ta('settings.layoutPicker')}
                <Dropdown value={layoutPickerPref}
                  options={[['strip', ta('settings.layoutPickerStrip')], ['menu', ta('settings.layoutPickerMenu')]]}
                  onchange={setLayoutPicker} /></label>
              <label title={ta('tip.settings.menuWidth')}>{ta('settings.menuWidth')}
                <Dropdown value={menu.widthPref}
                  options={[['wide', ta('settings.menuWide')], ['narrow', ta('settings.menuNarrow')]]}
                  onchange={setMenuWidthPref} /></label>
              <label title={ta('tip.settings.panels')}>{ta('settings.panels')}
                <Dropdown value={panelsPref}
                  options={[['remember', ta('settings.panelsRemember')], ['reset', ta('settings.panelsReset')]]}
                  onchange={setPanelsPref} /></label>
              <!-- The Screen device (ADR-0018, Consequences): its own window
                   width, or an editing size with an optional height. An
                   admin preference like the theme and the language, so it
                   lives here and not in the device strip. -->
              <p class="mini-label" title={ta('tip.screen.mode')}>{ta('settings.screen')}</p>
              <div class="seg" title={ta('tip.screen.mode')}>
                <button type="button" class:on={screenPref.mode === 'own'}
                  onclick={() => setScreenPref({ mode: 'own' })}>{ta('lbl.screen.own')}</button>
                <button type="button" class:on={screenPref.mode === 'custom'}
                  onclick={() => setScreenPref({ mode: 'custom' })}>{ta('lbl.screen.size')}</button>
              </div>
              {#if screenPref.mode === 'custom'}
                <div class="ctl-row">
                  <span class="mini-label">{ta('lbl.screen.w')}</span>
                  <input type="number" class="tb-num" min={SCREEN_WIDTH_MIN} max={SCREEN_WIDTH_MAX} step="10"
                    title={ta('tip.screen.width', { min: SCREEN_WIDTH_MIN, max: SCREEN_WIDTH_MAX })}
                    value={screenPref.width} onchange={(e) => { setScreenPref({ width: Number(e.target.value) }); e.target.value = screenPref.width; }} />
                  <span class="mini-label">{ta('lbl.screen.h')}</span>
                  <input type="number" class="tb-num" min="0" max={SCREEN_HEIGHT_MAX} step="10" placeholder="0"
                    title={ta('tip.screen.height', { min: SCREEN_HEIGHT_MIN, max: SCREEN_HEIGHT_MAX })}
                    value={screenPref.height || ''} onchange={(e) => { setScreenPref({ height: Number(e.target.value) }); e.target.value = screenPref.height || ''; }} />
                </div>
              {/if}
              <!-- Visitor measurement: the one SITE value in this pop (site.analytics,
                   published with the site), placed where the owner looks for Urd's own settings. -->
              {#if siteDraft}
                <p class="mini-label" title={ta('tip.analytics')}>{ta('settings.analytics')}</p>
                <label title={ta('tip.analytics')}>{ta('lbl.analyticsToken')}
                  <input type="text" placeholder={ta('ph.analyticsToken')} spellcheck="false"
                    value={siteDraft.analytics?.token ?? ''}
                    onchange={(e) => setAnalyticsToken(e.target.value)} /></label>
              {/if}
            </div>
          {/if}
        </span>
      </nav>

      {#if activePanel}
        <aside class="panel" class:hidden={!chromeVisible} bind:this={panelEl}>
          <div class="panel-head">
            <h2 title={PANEL_INTROS[activePanel]?.map((k) => ta(k)).join('\n')}>{PANEL_LABELS[activePanel]}</h2>
            {#if panelHasGroups}
              <button type="button" class="fold-all fold-toggle" class:collapse={panelAllOpen}
                title={ta(panelAllOpen ? 'ui.collapseAll' : 'ui.expandAll')}
                aria-label={ta(panelAllOpen ? 'ui.collapseAll' : 'ui.expandAll')}
                onclick={togglePanelGroups}>{@html ICONS.foldToggle}</button>
            {/if}
          </div>

          {#if activePanel === 'pages'}
            <PagesPanel />
          {:else if activePanel === 'nav'}
            <NavPanel />
          {:else if activePanel === 'site'}
            <SitePanel />
          {:else if activePanel === 'theme'}
            <ThemePanel />
          {:else if activePanel === 'blocks'}
            <BlocksPanel />
          {:else if activePanel === 'grid'}
            <GridPanel />
          {:else if activePanel === 'properties'}
            <PropertiesPanel />
          {:else if activePanel === 'footer'}
            <FooterPanel />
          {:else if activePanel === 'collections'}
            <CollectionsPanel />
          {:else if activePanel === 'plugins'}
            <PluginsPanel />
          {:else if activePanel === 'history'}
            <HistoryPanel />
          {:else if activePanel === 'update'}
            <UpdatePanel />
          {/if}
        </aside>
      {/if}

      <div class="frame-wrap" class:mobile={viewMode === 'mobile'} class:pan={canPan} class:fold={targetH > 0} bind:this={frameWrapEl}>
        <!-- .stage has the SCALED size, so scrolling/centering gets a real
             box (a transformed iframe alone does not expand its parent's scroll). -->
        <div class="stage" style="width:{stageW}px; height:{stageH}px">
          <iframe
            bind:this={iframeEl}
            title={ta('ui.previewTitle')}
            src={`/?page=${pageId}&preview=1`}
            onload={onIframeLoad}
            style="width:{targetW}px; height:{iframeH}px; transform:scale({scale}); transform-origin:top left"
          ></iframe>
        </div>
      </div>
    </div>
  {:else}
    <p class="loading">{ta('ui.loading')}</p>
  {/if}

  {#if iconEditorImage}
    <IconEditor image={iconEditorImage} onapply={applyIcon} oncancel={() => (iconEditorImage = null)} />
  {/if}
  {#if designPicker}
    <DesignPicker mode={designPicker.mode} current={designPicker.mode === 'set' ? calDesign(selectedBlock?.props.design).id : null}
      site={siteDraft ? $state.snapshot(siteDraft) : null} page={store?.data ? $state.snapshot(store.data) : null}
      onpick={(id) => { if (designPicker.mode === 'add') addCalendarDesign(id); else setCalendarDesign(id); designPicker = null; }}
      onclose={() => (designPicker = null)} />
  {/if}

  {#if confirmBox}
    <!-- A click on the backdrop cancels (same as the lightbox ::backdrop).
         Closing happens on click, not pointerdown, so the click finishes
         before the dialog disappears and never hits the panel below. -->
    <!-- The backdrop is a mouse shortcut: Escape is the keyboard path and
         the Cancel button the focusable one. -->
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="setup-overlay"
      onpointerdown={(e) => (confirmDownOnOverlay = e.target === e.currentTarget)}
      onclick={(e) => confirmDownOnOverlay && e.target === e.currentTarget && answerConfirm(false)}>
      <div class="setup-card">
        <h2>{confirmBox.title}</h2>
        {#each confirmBox.lines as line (line)}
          <p class="panel-hint confirm-line">{line}</p>
        {/each}
        {#if confirmBox.prompt}
          <!-- svelte-ignore a11y_autofocus (single-field modal: focus belongs in the field) -->
          <input autofocus bind:value={confirmBox.value} placeholder={confirmBox.placeholder}
            onkeydown={(e) => e.key === 'Enter' && confirmBox.value.trim() && answerConfirm(true)} />
        {/if}
        <span class="setup-actions">
          <button class="ghost" onclick={() => answerConfirm(false)}>{confirmBox.cancelLabel}</button>
          <button class="primary" onclick={() => answerConfirm(true)}>{confirmBox.okLabel}</button>
        </span>
      </div>
    </div>
  {/if}

  {#if showSetup}
    <!-- Setup wizard: first visit on a fresh clone -->
    <div class="setup-overlay">
      <div class="setup-card">
        <h2>{ta('setup.title')}</h2>
        <p class="panel-hint">{ta('setup.intro')}</p>
        <label>{ta('setup.nameLabel')}
          <input bind:value={setupName} placeholder={ta('ph.setup.name')}
            onkeydown={(e) => e.key === 'Enter' && applySetup()} /></label>
        <label>{ta('setup.accentLabel')}
          <ColorPicker value={setupAccent} label={ta('setup.accentPick')} onchange={(hex) => (setupAccent = hex)} /></label>
        <label>{ta('setup.bgLabel')}
          <ColorPicker value={setupBg} label={ta('setup.bgLabel')} onchange={(hex) => (setupBg = hex)} /></label>
        <p class="panel-hint">{ta('setup.outro')}</p>
        <span class="setup-actions">
          <button class="ghost" onclick={closeSetup}>{ta('setup.skip')}</button>
          <button class="primary" onclick={applySetup} disabled={!setupName.trim()}>{ta('setup.start')}</button>
        </span>
      </div>
    </div>
  {/if}

  {#if status}
    <div class="toast" class:ok={statusKind === 'ok'} class:error={statusKind === 'error'}>
      <span>{status}</span>
      <button class="toast-x" onclick={() => setStatus('')} title={ta('ui.close')}>×</button>
    </div>
  {/if}
</div>

{#if blockMenu && selectedBlock}
  <FloatingMenu pos={blockMenu} onclose={() => (blockMenu = null)} />
{/if}

