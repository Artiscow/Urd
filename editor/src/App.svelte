<script>
  // The editor shell: preview iframe with the real page, click-and-type
  // on text blocks, drafts in localStorage and a publish button against
  // /api/github/commit.
  import { tick } from 'svelte';
  import { fly } from 'svelte/transition';
  import { createDraftStore } from './lib/draftStore.js';
  import ColorPicker from './lib/ColorPicker.svelte';
  import GlyphPicker from './lib/GlyphPicker.svelte';
  import { createPreviewBridge } from './lib/previewBridge.js';
  import { previewScale } from './lib/preview-scale.js';
  import { deployTargets, awaitServed } from './lib/deploy-wait.js';
  import {
    ownWindowWidthOf, screenSetting, screenViewport,
    SCREEN_WIDTH_MIN, SCREEN_WIDTH_MAX, SCREEN_HEIGHT_MIN, SCREEN_HEIGHT_MAX,
  } from './lib/own-screen.js';
  import {
    WIDTH_MIN, WIDTH_MAX, WIDTH_STEP, GUTTER_MIN, GUTTER_MAX, GUTTER_STEP,
    WIDTH_PRESETS, GUTTER_PRESETS, REF_SCREENS,
    clampWidth, clampGutter, contentBand, presetOf, bindingWidth,
  } from './lib/content-width.js';
  import {
    PAD_Y, TEXT_SIZE, PAD_X, GAP, PILL_WIDTH, SHRINK_TO, COL_WIDTH, LOGO_SIZE, RADIUS, SIZE_IDS,
    clampRange, effectivePadY, effectiveTextSize, sizePresetOf,
  } from './lib/nav-size.js';
  import Dropdown from './lib/Dropdown.svelte';
  import Choice from './lib/Choice.svelte';
  // Drawn tiles for the Nav panel's picture choices (ADR-0009: drawn SVG, never characters).
  const navSvg = (body) => `<svg width="40" height="26" viewBox="0 0 40 26" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${body}</svg>`;
  const NAV_VARIANT_ICONS = {
    'bar': navSvg('<rect x="1" y="1" width="38" height="7" rx="1"/><rect x="1" y="11" width="38" height="14" rx="1" stroke-opacity="0.35"/>'),
    'floating': navSvg('<rect x="5" y="2" width="30" height="7" rx="3.5"/><rect x="1" y="11" width="38" height="14" rx="1" stroke-opacity="0.35"/>'),
    'floating-square': navSvg('<rect x="5" y="2" width="30" height="7"/><rect x="1" y="11" width="38" height="14" rx="1" stroke-opacity="0.35"/>'),
    'floating-tab': navSvg('<path d="M5 1h30v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><rect x="1" y="11" width="38" height="14" rx="1" stroke-opacity="0.35"/>'),
    'side-left': navSvg('<rect x="1" y="1" width="9" height="24" rx="1"/><rect x="13" y="1" width="26" height="24" rx="1" stroke-opacity="0.35"/>'),
    'side-right': navSvg('<rect x="30" y="1" width="9" height="24" rx="1"/><rect x="1" y="1" width="26" height="24" rx="1" stroke-opacity="0.35"/>'),
  };
  const NAV_BORDER_ICONS = {
    '': navSvg('<rect x="1" y="4" width="38" height="18" rx="1" stroke-opacity="0.35"/>'),
    'bottom': navSvg('<rect x="1" y="4" width="38" height="18" rx="1" stroke-opacity="0.35"/><path d="M1 22h38" stroke-width="2.5"/>'),
    'top': navSvg('<rect x="1" y="4" width="38" height="18" rx="1" stroke-opacity="0.35"/><path d="M1 4h38" stroke-width="2.5"/>'),
    'both': navSvg('<rect x="1" y="4" width="38" height="18" rx="1" stroke-opacity="0.35"/><path d="M1 4h38M1 22h38" stroke-width="2.5"/>'),
    'all': navSvg('<rect x="1" y="4" width="38" height="18" rx="1" stroke-width="2.5"/>'),
  };
  const subSvg = (body) => `<svg width="48" height="34" viewBox="0 0 48 34" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${body}</svg>`;
  const SUB_STYLE_ICONS = {
    'card': subSvg('<path d="M14 1h20" stroke-opacity="0.5"/><rect x="10" y="6" width="28" height="24" rx="3" fill="currentColor" fill-opacity="0.18"/><path d="M15 13h18M15 19h14M15 25h16" stroke-opacity="0.8"/>'),
    'flat': subSvg('<path d="M14 1h20" stroke-opacity="0.5"/><rect x="1" y="6" width="46" height="24" fill="currentColor" fill-opacity="0.12" stroke="none"/><path d="M15 13h18M15 19h14M15 25h16" stroke-opacity="0.8"/>'),
    'pills': subSvg('<path d="M14 1h20" stroke-opacity="0.5"/><rect x="10" y="7" width="28" height="6" rx="3" fill="currentColor" fill-opacity="0.35" stroke="none"/><rect x="10" y="16" width="28" height="6" rx="3" fill="currentColor" fill-opacity="0.2" stroke="none"/><rect x="10" y="25" width="28" height="6" rx="3" fill="currentColor" fill-opacity="0.2" stroke="none"/>'),
    'lines': subSvg('<path d="M14 1h20" stroke-opacity="0.5"/><path d="M12 12h24M12 21h24M12 30h24" stroke-opacity="0.8"/>'),
    'flyout': subSvg('<path d="M14 1h20" stroke-opacity="0.5"/><rect x="1" y="6" width="46" height="24" fill="currentColor" fill-opacity="0.12" stroke="none"/><path d="M6 13h10M6 19h8M22 13h10M22 19h8M38 13h6M38 19h4" stroke-opacity="0.8"/>'),
  };
  /** The title typed for «new page as menu item» in the Nav panel. */
  let navNewPageTitle = $state('');
  function addPageAsNavItem() {
    if (!navNewPageTitle.trim()) return;
    newPageTitle = navNewPageTitle;
    newPageTemplate = null;
    addPage();
    navNewPageTitle = '';
  }
  import IconEditor from './lib/IconEditor.svelte';
  // The editor shares the migration code with the engine (same file, bundled in).
  import { defaultFormFields } from '$engine/blocks/form.js';
  import { liftPageFile, liftSiteFile, PAGE_SCHEMA_VERSION, SITE_SCHEMA_VERSION } from '$engine/migrate.js';
  import { ta, taApiError, adminLang as currentAdminLang } from '$engine/i18n.js';
  import { validateManifest, satisfiesEngine } from '$engine/plugins.js';
  import { makeId } from '$engine/sections/presets.js';
  import { templateId, TEMPLATE_SCHEMA_VERSION, TEMPLATE_KINDS, clonePageForInsert } from '$engine/templates-model.js';
  import { entriesToCsv, csvToEntries } from '$engine/collections-csv.js';
  import { buildSitemapXml, buildRobotsTxt, buildRssXml, FEED_KINDS } from '$engine/feeds.js';
  import { pageThumb } from '$engine/preset-thumb.js';
  import { PAGE_PRESETS, buildPagePreset } from '$engine/page-presets.js';
  import { searchItems as searchBlockItems } from '$engine/palette-search.js';
  // The background and animation definitions are reused for labels and
  // defaults, so the editor and the engine never drift apart.
  import { colorLayer } from '$engine/backgrounds/color.js';
  import { gradientLayer } from '$engine/backgrounds/gradient.js';
  import { glowLayer } from '$engine/backgrounds/glow.js';
  import { grainLayer } from '$engine/backgrounds/grain.js';
  import { imageLayer } from '$engine/backgrounds/image.js';
  import { slideshowLayer } from '$engine/backgrounds/slideshow.js';
  import { videoLayer } from '$engine/backgrounds/video.js';
  import { footerThumb } from '$engine/footer-thumb.js';
  import { coreAnimations } from '$engine/animations/core.js';
  import { SECTION_THEME_LABELS, sectionThemeVars, contrastRatio, relativeLuminance, buildThemeCss, safeCssValue, resolveThemeMode, activeTokens } from '$engine/theme.js';
  import { compressToWebp, svgToDataUrl, tightSvgViewBox, svgViewBox, slugify, contentHash, mediaExtension, WARN_BYTES, VIDEO_WARN_BYTES, VIDEO_MAX_BYTES } from '$engine/imageTools.js';
  import { FONT_STACKS } from '$engine/fonts.js';
  import { frameAtPoint } from '$engine/place.js';
  import { iconSvg, ICON_CATEGORIES, ICON_LIBRARY } from '$engine/icons.js';

  /** The background layer types in the order they are offered in the panel. */
  const BG_TYPES = [
    ['color', colorLayer],
    ['gradient', gradientLayer],
    ['glow', glowLayer],
    ['image', imageLayer],
    ['slideshow', slideshowLayer],
    ['video', videoLayer],
    ['grain', grainLayer],
  ];
  const BG_DEFS = Object.fromEntries(BG_TYPES);

  /** Drawn SVG icons (stroke style, currentColor) - never emoji. */
  const ICONS = {
    copy: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    phone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="8" y="3" width="8" height="18" rx="2"/><path d="M11 17.5h2"/></svg>',
    pencil: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4L8 20l-5 1 1-5L17 3z"/></svg>',
    eye: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/></svg>',
    warn: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L2 20h20L12 3z"/><path d="M12 10v4"/><path d="M12 17.2h.01"/></svg>',
    up: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V4"/><path d="M5 11l7-7 7 7"/></svg>',
    down: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16"/><path d="M5 13l7 7 7-7"/></svg>',
    right: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><path d="M13 5l7 7-7 7"/></svg>',
    cross: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 5l14 14"/><path d="M19 5L5 19"/></svg>',
    plus: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
    minus: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    gear: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    // Guides: a box with crossed alignment lines, distinguishable from the
    // grid button next to it.
    guides: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20" stroke-dasharray="3 3"/><rect x="7.5" y="7.5" width="9" height="9" rx="1.5"/></svg>',
    kebab: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>',
    bookmark: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><path d="M12 7v6M9 10h6"/></svg>',
    fit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4"/></svg>',
    gridToggle: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>',
    // Discard draft: restore, i.e. an arrow with a clock face. NOT a plain
    // back arrow, which is the universal undo glyph; discard is not undo.
    restore: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 9"/><path d="M12 8v4.5l3 1.8"/></svg>',
    // Expand or collapse every group fold at once: two chevrons that point
    // outwards while the next click expands, and turn inwards (the .collapse
    // state on the button, animated in CSS) while the next click collapses.
    foldToggle: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path class="ft-top" d="M7 9l5-5 5 5"/><path class="ft-bot" d="M7 15l5 5 5-5"/></svg>',
    // The dropdown marker on the collapsed tool menus. Its own small chevron,
    // not `down`, which is the move-down arrow and reads as an action.
    caret: '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
    // View site: opens a new tab, so an arrow leaving a frame. A real icon,
    // not a character in the text: the button is icon-only on narrow windows.
    external: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4l-8 8"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    // The target devices in the canvas switcher: desktop, laptop, tablet, phone
    device_desktop: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="13" rx="2"/><path d="M8 21h8M12 16v5"/></svg>',
    device_laptop: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 19h20"/></svg>',
    device_tablet: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M11 18.5h2"/></svg>',
    device_mobile: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18.5h2"/></svg>',
  };

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
    redoStack.push(snapshot());
    restore(history.pop());
    lastHistoryKey = null;
    setStatus(ta('status.undone'));
  }

  function redo() {
    if (!redoStack.length) return;
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
  let activePanel = $state(null);
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
    // The grid is shown in the preview while the Grid panel is open.
    // The grid overlay is controlled by its own toggle, not by the panel being open.
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

  /** Reduced motion: exit transitions (the draft cluster) become a plain cut. */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** The anchor points for "pin to screen": vertical-horizontal, as
   *  dockPosition in the engine reads them. */
  const DOCK_OPTIONS = [
    ['top-left', 'opt.dock.topLeft'], ['top-center', 'opt.dock.topCenter'], ['top-right', 'opt.dock.topRight'],
    ['middle-left', 'opt.dock.middleLeft'], ['middle-center', 'opt.dock.middleCenter'], ['middle-right', 'opt.dock.middleRight'],
    ['bottom-left', 'opt.dock.bottomLeft'], ['bottom-center', 'opt.dock.bottomCenter'], ['bottom-right', 'opt.dock.bottomRight'],
  ];

  /** The "let go" options for sticky: only the sections AFTER the block's
   *  own (pinning backwards makes no sense; settings are shown only when
   *  relevant). */
  function stickyUntilOptions() {
    const sections = store?.data.sections ?? [];
    const idx = sections.findIndex((s) => s.id === selectedBlock?.sectionId);
    // A block whose section is not found offers its own section only; a
    // slice from -1 would list every section under the wrong numbers.
    if (idx < 0) return [['', ta('opt.sticky.ownSection')]];
    return [
      ['', ta('opt.sticky.ownSection')],
      ...sections.slice(idx + 1).map((s, i) => [s.id, ta('opt.sticky.atSection', { n: idx + 2 + i })]),
    ];
  }

  function onBlockMenu(msg) {
    onSelectBlock(msg);
    if (!selectedBlock) return;
    const MENU_W = 300;
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

  /** Shrink on narrower screens (render.js, ADR-0024): block-level fields on
   *  every block. Content blocks zoom their content to fit; the types below
   *  (the engine's FIT_BY_WIDTH in push-model.js) keep a floor on their
   *  frame's width instead, so the option labels differ. The absence of the
   *  fields is wrap (content) or follow the width (frame). */
  const FIT_BY_WIDTH = new Set(['image', 'video', 'shape', 'icon']);
  function setBlockFit(mode) {
    mutateBlock(`edit:${selectedBlock.blockId}:fit`, (b) => {
      if (mode === 'shrink') {
        b.fit = 'shrink';
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

  /* The field contract (plugin blocks, `fields` in urd-plugin-blocks):
     drafts and search status for place fields, keyed per block+field so a
     block switch shows the selected block's own values. */
  let placeDrafts = $state({});
  let placeStatus = $state({});
  let placeBusy = $state(false);

  /* The Content/Style tab in the block properties (ADR-0016). The choice is
     remembered across selections, so a styling pass over several blocks
     avoids switching tab per block. */
  let propsTab = $state('content');

  const clampField = (f, v) => {
    if (!Number.isFinite(v)) v = f.min ?? 0;
    if (f.min != null) v = Math.max(f.min, v);
    if (f.max != null) v = Math.min(f.max, v);
    return v;
  };

  /** The place field writes the text to the field's key and coordinates to
   *  lat/lon: "lat, lon" is parsed locally, links are written untouched
   *  (the plugin interprets them at render), everything else is geocoded
   *  via /api/geocode. */
  async function searchPlace(f) {
    const blockId = selectedBlock.blockId;
    const k = `${blockId}:${f.key}`;
    const raw = (placeDrafts[k] ?? selectedBlock.props[f.key] ?? '').trim();
    placeStatus[k] = null;
    const coords = raw.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
    if (!raw || coords || /^https?:\/\//i.test(raw)) {
      setBlockProps(f.key, { [f.key]: raw, lat: coords ? Number(coords[1]) : null, lon: coords ? Number(coords[2]) : null });
      return;
    }
    placeBusy = true;
    placeStatus[k] = { text: ta('props.place.searching'), err: false };
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(raw)}`);
      const data = await res.json().catch(() => null);
      // The selection may have switched block while the search was in
      // flight: then the reply must be discarded, otherwise the coordinates
      // are written to the wrong block's props.
      if (selectedBlock?.blockId !== blockId) return;
      if (res.ok && Number.isFinite(data?.lat)) {
        setBlockProps(f.key, { [f.key]: raw, lat: data.lat, lon: data.lon });
        placeStatus[k] = null;
      } else {
        placeStatus[k] = { text: taApiError(data) ?? ta('props.place.notFound'), err: true };
      }
    } catch {
      placeStatus[k] = { text: ta('props.place.failed'), err: true };
    } finally {
      placeBusy = false;
    }
  }

  function setBlockFrame(field, value) {
    if (!Number.isFinite(value)) return;
    mutateBlock(`edit:frame-${selectedBlock.blockId}:${field}`, (b) => {
      b.frames.desktop = { ...b.frames.desktop, [field]: value };
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

  /* The FAQ block: the question list is edited here; the texts also directly in the preview. */

  /* The form block (Content): send mode, recipient or endpoint, the field
     list and the texts. The field ids follow the engine's shape (a short
     random id, like the former config panel); the option list follows only
     the types that use it. */
  const FORM_FIELD_TYPES = ['text', 'email', 'tel', 'textarea', 'select', 'checkbox', 'radio', 'date'];
  const FORM_OPTION_TYPES = new Set(['select', 'radio']);
  const formFieldId = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(3));
    return 'f' + [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  };
  function setFormField(i, patch) {
    mutateBlock(`edit:${selectedBlock.blockId}:field${i}`, (b) => {
      const next = { ...b.props.fields[i], ...patch };
      if (!FORM_OPTION_TYPES.has(next.type)) delete next.options;
      else next.options ??= [];
      b.props.fields[i] = next;
    });
  }
  function setFormFieldOptions(i, text) {
    setFormField(i, { options: String(text).split(',').map((v) => v.trim()).filter(Boolean) });
  }
  function addFormField() {
    mutateBlock('form-field', (b) => {
      (b.props.fields ??= []).push({ id: formFieldId(), label: ta('form.newField'), type: 'text', required: false });
    });
  }
  function removeFormField(i) {
    mutateBlock('form-field', (b) => { b.props.fields.splice(i, 1); });
  }
  function moveFormField(i, dir) {
    const j = i + dir;
    mutateBlock('form-field', (b) => {
      if (j < 0 || j >= b.props.fields.length) return;
      [b.props.fields[i], b.props.fields[j]] = [b.props.fields[j], b.props.fields[i]];
    });
  }
  /* The calendar block (Content): one source per line. */
  function setCalendarSources(text) {
    setBlockProp('sources', String(text).split('\n').map((s) => s.trim()).filter(Boolean));
  }

  function setFaqItem(i, patch) {
    mutateBlock(`edit:${selectedBlock.blockId}:faq${i}`, (b) => {
      b.props.items[i] = { ...b.props.items[i], ...patch };
    });
  }

  function addFaqItem() {
    mutateBlock('faq-item', (b) => {
      (b.props.items ??= []).push({ q: ta('seed.faq.newQ'), a: ta('seed.faq.answer') });
    });
  }

  function removeFaqItem(i) {
    mutateBlock('faq-item', (b) => { b.props.items.splice(i, 1); });
  }

  function moveFaqItem(i, dir) {
    const j = i + dir;
    mutateBlock('faq-item', (b) => {
      if (j < 0 || j >= b.props.items.length) return;
      [b.props.items[i], b.props.items[j]] = [b.props.items[j], b.props.items[i]];
    });
  }

  /* The timeline block: the event list is edited here; the texts also directly in the preview. */

  function setTlItem(i, patch) {
    mutateBlock(`edit:${selectedBlock.blockId}:tl${i}`, (b) => {
      b.props.items[i] = { ...b.props.items[i], ...patch };
    });
  }

  function addTlItem() {
    mutateBlock('tl-item', (b) => {
      (b.props.items ??= []).push({ year: '', title: ta('seed.timeline.newTitle'), text: '' });
    });
  }

  function removeTlItem(i) {
    mutateBlock('tl-item', (b) => { b.props.items.splice(i, 1); });
  }

  function moveTlItem(i, dir) {
    const j = i + dir;
    mutateBlock('tl-item', (b) => {
      if (j < 0 || j >= b.props.items.length) return;
      [b.props.items[i], b.props.items[j]] = [b.props.items[j], b.props.items[i]];
    });
  }

  function setBlockDecor(on) {
    mutateBlock('decor', (b) => { b.decor = on; });
  }

  /** The table's shape: rows/columns are added and removed at the end;
   *  the row set is rectangularized first, so hand-edited data is tolerated. */
  function tableResize(dRows, dCols) {
    mutateBlock(`edit:${selectedBlock.blockId}:table-form`, (b) => {
      let rows = (Array.isArray(b.props.rows) && b.props.rows.length ? b.props.rows : [['']])
        .map((row) => (Array.isArray(row) ? row.map((cell) => String(cell ?? '')) : ['']));
      const cols = Math.max(1, ...rows.map((row) => row.length));
      rows = rows.map((row) => [...row, ...Array(cols - row.length).fill('')]);
      if (dRows > 0) rows.push(Array(cols).fill(''));
      else if (dRows < 0 && rows.length > 1) rows.pop();
      if (dCols > 0) rows = rows.map((row) => [...row, '']);
      else if (dCols < 0 && cols > 1) rows = rows.map((row) => row.slice(0, cols - 1));
      b.props.rows = rows;
    });
  }

  /** The share buttons' services: the choices are stored in a fixed display order. */
  function toggleShareService(service, on) {
    mutateBlock(`edit:${selectedBlock.blockId}:share`, (b) => {
      const order = ['facebook', 'x', 'linkedin', 'whatsapp', 'email', 'copy'];
      const set = new Set(b.props.services ?? []);
      if (on) set.add(service);
      else set.delete(service);
      b.props.services = order.filter((s) => set.has(s));
    });
  }

  /** Audio file to data URL in the draft; publishing writes it to media/.
   *  Audio is not compressed (no canvas path), so the size is warned about. */
  function setAudioFile(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setBlockProp('src', String(reader.result ?? ''));
      if (file.size > WARN_BYTES) {
        setStatus(ta('status.audioLarge', { kb: Math.round(file.size / 1024) }), 'error');
      }
    };
    reader.onerror = () => setStatus(ta('status.imageReadError'), 'error');
    reader.readAsDataURL(file);
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

  /** Replace the image in an image block (same webp flow as + Image). */
  async function replaceImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
        b.props.src = img.dataUrl;
        b.props.alt = b.props.alt || slugify(file.name).replaceAll('-', ' ');
      });
    } catch {
      setStatus(ta('status.imageReadError'), 'error');
    }
  }

  /** The quote block's portrait (the card variant): same webp path as the image block. */
  async function setQuotePortrait(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      mutateBlock(`edit:${selectedBlock.blockId}`, (b) => { b.props.image = img.dataUrl; });
    } catch {
      setStatus(ta('status.imageReadError'), 'error');
    }
  }

  // FONT_STACKS lives in the engine's fonts.js (shared with the text editor
  // bar's typography row).

  /** Names of the block types in the panel. */
  const BLOCK_LABELS = { text: ta('blocks.text'), button: ta('blocks.button'), image: ta('blocks.image'), shape: ta('blocks.shape'), video: ta('blocks.video'), icon: ta('blocks.icon'), gallery: ta('blocks.gallery'), faq: ta('blocks.faq'), collection: ta('blocks.collection'), timeline: ta('blocks.timeline'), quote: ta('blocks.quote'), stats: ta('blocks.stats'), table: ta('blocks.table'), share: ta('blocks.share'), countdown: ta('blocks.countdown'), audio: ta('blocks.audio'), product: ta('blocks.product'), cart: ta('blocks.cart'), checkout: ta('blocks.checkout'), map: ta('blocks.map'), form: ta('blocks.form'), calendar: ta('blocks.calendar') };
  const SHAPE_KINDS = [
    ['line', ta('shape.line')], ['arrow', ta('shape.arrow')], ['circle', ta('shape.circle')],
    ['rect', ta('shape.rect')], ['triangle', ta('shape.triangle')],
  ];
  const COLOR_TOKENS = [
    ['accent', ta('color.accent')], ['text', ta('color.text')], ['surface', ta('color.surface')], ['bg', ta('color.bg')],
  ];

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

  function syncSectionMirrors(section) {
    sectionGrid = section?.grid ? { ...section.grid } : null;
    sectionMinHeight = section?.size?.minHeight ?? '';
    sectionBg = JSON.parse(JSON.stringify(section?.background?.layers ?? []));
    sectionAnim = section?.animation ? JSON.parse(JSON.stringify(section.animation)) : null;
    sectionHover = section?.hover ? JSON.parse(JSON.stringify(section.hover)) : null;
    sectionTheme = section?.theme ?? '';
  }

  /* Measurements for the "Cover"/"Show all" buttons on image background
     layers: the section box (measured in the preview iframe, same-origin)
     and the image's natural size let us compute the scale that exactly
     fills/shows the whole image. */
  let secBox = $state(null);            // { w, h } for the selected section
  const imgNat = $state({});            // src -> { w, h } (natural image size)

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
  // Load the images' natural sizes (for the space calculation).
  $effect(() => {
    for (const l of sectionBg) {
      const src = l?.props?.src;
      if (l?.type === 'image' && src && !imgNat[src]) {
        const im = new Image();
        im.onload = () => { imgNat[src] = { w: im.naturalWidth, h: im.naturalHeight }; };
        im.src = src;
      }
    }
  });

  /** Ready-made section theme (role set): presentation, no mobile invalidation. */
  function setSectionTheme(role) {
    mutateSection('section-theme', (s) => {
      if (role) s.theme = role; else delete s.theme;
    });
  }

  /** The role-set samples in Properties: substitute the page's ACTUAL
   *  theme colors into the role recipes, so each sample is live
   *  (ADR-0016). The recipes reference only the --urd-base-* copies, so a
   *  plain text substitution yields valid CSS colors (color-mix survives). */
  function sectionThemeSample(role) {
    // The samples follow the preview's active mode (previewPalette merges
    // alt tokens via the engine's activeTokens, so scheme: 'dark' resolves correctly).
    const pal = previewPalette;
    const subst = (v) => v
      .replaceAll('var(--urd-base-bg)', pal.bg)
      .replaceAll('var(--urd-base-surface)', pal.surface)
      .replaceAll('var(--urd-base-text)', pal.text)
      .replaceAll('var(--urd-base-accent)', pal.accent)
      .replaceAll('var(--urd-base-accent-text)', pal['accent-text'] ?? readableOn(themeHex(pal.accent ?? '#000000', pal)));
    const vars = sectionThemeVars(role);
    return {
      bg: vars['--urd-color-bg'] ? subst(vars['--urd-color-bg']) : pal.bg,
      surface: vars['--urd-color-surface'] ? subst(vars['--urd-color-surface']) : pal.surface,
      text: vars['--urd-color-text'] ? subst(vars['--urd-color-text']) : pal.text,
      accent: vars['--urd-color-accent'] ? subst(vars['--urd-color-accent']) : pal.accent,
    };
  }

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

  /* ---------- The background editor ---------- */

  /** Selected layer type for "+ Add layer" */
  let newBgType = $state('color');

  /* The background editor is shared between section, nav and footer via a
     snippet (backgroundLayers) that shares this component's scoped styles.
     Each handler takes a `bg` context {mutate, keyPrefix, keyId}:
     `mutate(key, fn)` where fn(target) mutates target.background
     (section / nav.style / footer), keyPrefix/keyId give stable history
     coalescing keys per target. */

  function addBgLayer(bg, type) {
    bg.mutate(bg.keyPrefix, (t) => {
      t.background ??= { version: 1, layers: [] };
      t.background.layers.push({ type, version: BG_DEFS[type].version ?? 1, props: BG_DEFS[type].defaults() });
    });
  }

  function removeBgLayer(bg, i) {
    bg.mutate(bg.keyPrefix, (t) => {
      t.background.layers.splice(i, 1);
      // An empty layer list cleans background away entirely, so targets
      // without a background do not carry an empty {version,layers} object
      // (and nav/footer fall back to flat).
      if (!t.background.layers.length) delete t.background;
    });
  }

  function moveBgLayer(bg, i, dir) {
    const j = i + dir;
    bg.mutate(bg.keyPrefix, (t) => {
      const layers = t.background.layers;
      if (j < 0 || j >= layers.length) return;
      [layers[i], layers[j]] = [layers[j], layers[i]];
    });
  }

  function setBgProp(bg, i, name, value) {
    bg.mutate(`edit:${bg.keyPrefix}-${bg.keyId}-${i}-${name}`, (t) => {
      t.background.layers[i].props[name] = value;
    });
  }

  /* Focal-point drag on the image background layer: a small preview box
     where dragging a point sets x/y (0..1) at once. Same focus idea as the
     image editor. */
  function startFocalDrag(event, bg, i, axes = 'xy') {
    event.preventDefault();
    const pad = event.currentTarget;
    // Pointer capture on the pad element: it then gets ALL pointer events
    // until the button is released, also when the mouse drags across the
    // preview iframe (which otherwise eats them, so the drag "sticks"
    // after releasing outside).
    pad.setPointerCapture?.(event.pointerId);
    const move = (e) => {
      const r = pad.getBoundingClientRect();
      if (axes.includes('x')) {
        const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        setBgProp(bg, i, 'x', Math.round(x * 100) / 100);
      }
      if (axes.includes('y')) {
        const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        setBgProp(bg, i, 'y', Math.round(y * 100) / 100);
      }
    };
    move(event);
    const up = () => {
      pad.removeEventListener('pointermove', move);
      pad.removeEventListener('pointerup', up);
      pad.removeEventListener('pointercancel', up);
    };
    pad.addEventListener('pointermove', move);
    pad.addEventListener('pointerup', up);
    pad.addEventListener('pointercancel', up);
  }

  /* Size (custom size mode): the stepper/number field writes `size` as a
     fraction, clamped to 10-400 %. */
  const clampBgSize = (v) => Math.min(4, Math.max(0.1, v));
  function stepBgSize(bg, i, cur, delta) {
    setBgProp(bg, i, 'size', clampBgSize(Math.round((cur + delta) * 100) / 100));
  }
  function setBgSizePct(bg, i, pct) {
    const n = Number(pct);
    if (Number.isFinite(n)) setBgProp(bg, i, 'size', clampBgSize(n / 100));
  }
  /* "Cover"/"Show all": compute the scale from the image and section sizes
     and set it, so Fill/Show-all become presets that can be fine-tuned
     further (not separate modes). r = the height/width ratio between
     section and image at 100 % width. */
  function setBgFillSize(bg, i, layer, mode) {
    const nat = imgNat[layer.props.src];
    if (!nat?.w || !nat?.h || !secBox?.w || !secBox?.h) return;
    const r = (secBox.h * nat.w) / (secBox.w * nat.h);
    const size = mode === 'cover' ? Math.max(1, r) : Math.min(1, r);
    if (layer.props.fit === 'tile' || layer.props.fit === 'repeat') setBgProp(bg, i, 'fit', 'plain');
    setBgProp(bg, i, 'size', clampBgSize(Math.round(size * 100) / 100));
  }

  /* The gradient editor (free stops + linear/radial). */

  function gradientProps(layer) {
    return layer.props;
  }

  function mutateGradient(bg, i, key, fn) {
    bg.mutate(key, (t) => {
      fn(t.background.layers[i].props);
    });
  }

  function setGradProp(bg, i, name, value) {
    mutateGradient(bg, i, `edit:${bg.keyPrefix}-${bg.keyId}-${i}-${name}`, (p) => { p[name] = value; });
  }

  /** A shape switch resets the animation if it does not exist for the new shape. */
  const GRAD_ANIMATIONS = {
    linear: [['none', ta('common.none')], ['pan', ta('opt.gradAnim.pan')], ['pan-loop', ta('opt.gradAnim.panLoop')], ['rotate', ta('opt.gradAnim.rotate')]],
    radial: [['none', ta('common.none')], ['pulse', ta('opt.gradAnim.pulse')], ['orbit', ta('opt.gradAnim.orbit')]],
  };

  function setGradKind(bg, i, kind) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      p.kind = kind;
      if (!GRAD_ANIMATIONS[kind].some(([id]) => id === (p.animation ?? 'none'))) p.animation = 'none';
    });
  }

  function setGradStop(bg, i, si, patch) {
    mutateGradient(bg, i, `edit:${bg.keyPrefix}-${bg.keyId}-${i}-stop${si}`, (p) => {
      p.stops[si] = { ...p.stops[si], ...patch };
    });
  }

  /** New color at the bottom of the list, with a share equal to the average. */
  function addGradStop(bg, i) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      const avg = Math.round(p.stops.reduce((a, s) => a + (Number(s.share) || 0), 0) / p.stops.length) || 50;
      p.stops.push({ color: p.stops[p.stops.length - 1]?.color ?? '#ffffff', share: avg });
    });
  }

  function removeGradStop(bg, i, si) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      if (p.stops.length > 2) p.stops.splice(si, 1);
    });
  }

  function reorderGradStop(bg, i, from, to) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      const [moved] = p.stops.splice(from, 1);
      p.stops.splice(to, 0, moved);
    });
  }

  /** Ongoing drag reordering of gradient colors: {layer, from, insert}
   *  or null. insert is the insertion slot (0..count), drawn as a line
   *  above the row (or below the last one). */
  let stopDrag = $state(null);

  /** Pointer-based drag (not HTML5 dnd: it gives neither a visual
   *  indicator nor a reliable drop on the neighboring row). The dragged
   *  row is dimmed, and the insertion line follows the pointer; the drop
   *  performs ONE undo step. */
  function startStopDrag(bg, event, layerI, si) {
    if (event.button !== 0) return;
    event.preventDefault();
    const container = event.currentTarget.closest('.bg-layer');
    const row = event.currentTarget.closest('.grad-stop');
    stopDrag = { layer: layerI, from: si, insert: si };

    // Ghost row: a copy of the whole row (with the color) follows the
    // pointer, so you see WHAT you are dragging, not just where it lands.
    // Inline style, since the copy lives on document.body outside the
    // component tree.
    const rect = row.getBoundingClientRect();
    const grabY = event.clientY - rect.top;
    const ghost = row.cloneNode(true);
    ghost.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;`
      + `width:${rect.width}px;display:flex;align-items:center;gap:0.4rem;`
      + 'pointer-events:none;z-index:1000;opacity:0.92;padding:2px 4px;'
      + 'background:var(--urd-color-surface);border:1px solid var(--urd-color-accent);border-radius:6px;';
    document.body.appendChild(ghost);

    const move = (ev) => {
      ghost.style.top = `${ev.clientY - grabY}px`;
      const rects = [...container.querySelectorAll('.grad-stop')].map((r) => r.getBoundingClientRect());
      let insert = rects.length;
      for (let k = 0; k < rects.length; k++) {
        if (ev.clientY < rects[k].top + rects[k].height / 2) {
          insert = k;
          break;
        }
      }
      stopDrag = { ...stopDrag, insert };
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      ghost.remove();
      const drag = stopDrag;
      stopDrag = null;
      if (!drag) return;
      const to = drag.insert > drag.from ? drag.insert - 1 : drag.insert;
      if (to !== drag.from) reorderGradStop(bg, drag.layer, drag.from, to);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  /** Change the layer type afterwards (the layer keeps its slot, props reset). */
  function changeBgLayerType(bg, i, type) {
    bg.mutate(bg.keyPrefix, (t) => {
      if (t.background.layers[i].type === type) return;
      t.background.layers[i] = { type, version: BG_DEFS[type].version ?? 1, props: BG_DEFS[type].defaults() };
    });
  }

  /** Background image: same webp flow as the image block. */
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
    return isSvg ? svgAutoTrim(file) : compressToWebp(file);
  }

  async function setBgImage(bg, i, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      setBgProp(bg, i, 'src', img.dataUrl);
    } catch {
      setStatus(ta('status.imageReadError'), 'error');
    }
  }

  /** Video file to data URL in the draft (the media limits from
   *  imageTools: hard cap and warning); publishing writes it to media/
   *  like the images. */
  function setBgVideo(bg, i, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!['video/mp4', 'video/webm'].includes(file.type)) {
      setStatus(ta('status.videoFormat'), 'error');
      return;
    }
    if (file.size > VIDEO_MAX_BYTES) {
      setStatus(ta('status.videoTooLarge', { mb: (file.size / 1_000_000).toFixed(1), max: Math.round(VIDEO_MAX_BYTES / 1_000_000) }), 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setBgProp(bg, i, 'src', String(reader.result ?? ''));
      if (file.size > VIDEO_WARN_BYTES) {
        setStatus(ta('status.videoLarge', { mb: (file.size / 1_000_000).toFixed(1) }), 'error');
      }
    };
    reader.onerror = () => setStatus(ta('status.imageReadError'), 'error');
    reader.readAsDataURL(file);
  }

  /** The poster image for the video layer (the still shown with reduced motion). */
  async function setBgPoster(bg, i, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      setBgProp(bg, i, 'poster', img.dataUrl);
    } catch {
      setStatus(ta('status.imageReadError'), 'error');
    }
  }

  /* The slideshow layer: the image list is edited like the other
     background layers, but with multi-select upload (the whole batch in
     ONE undo step). */

  async function addBgGalleryImages(bg, i, event) {
    const files = [...(event.target.files ?? [])];
    event.target.value = '';
    if (!files.length) return;
    setStatus(ta('status.compressingImages'));
    const { images, failed, big } = await compressMany(files);
    if (images.length) {
      bg.mutate(bg.keyPrefix, (t) => {
        const props = t.background.layers[i].props;
        props.images ??= [];
        props.images.push(...images.map(({ src }) => ({ src, x: 0.5, y: 0.5 })));
      });
    }
    reportUpload(images.length, failed, big);
  }

  function moveBgGalleryImage(bg, i, j, dir) {
    bg.mutate(bg.keyPrefix, (t) => {
      const arr = t.background.layers[i].props.images;
      const k = j + dir;
      if (k < 0 || k >= arr.length) return;
      [arr[j], arr[k]] = [arr[k], arr[j]];
    });
  }

  function removeBgGalleryImage(bg, i, j) {
    bg.mutate(bg.keyPrefix, (t) => { t.background.layers[i].props.images.splice(j, 1); });
  }

  function setBgGalleryImageProp(bg, i, j, name, value) {
    bg.mutate(`edit:${bg.keyPrefix}g-${bg.keyId}-${i}-${j}-${name}`, (t) => {
      t.background.layers[i].props.images[j][name] = value;
    });
  }

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

  /** The Theme panel's derived state (the Colors area). */
  const PALETTE_KEYS = [['bg', ta('palette.bg'), ta('palette.bgShort')], ['surface', ta('palette.surface'), ta('palette.surfaceShort')], ['text', ta('palette.text'), ta('palette.textShort')], ['accent', ta('palette.accent'), ta('palette.accentShort')], ['accent-text', ta('palette.accentText'), ta('palette.accentTextShort')]];
  const dualMode = $derived(!!siteDraft?.theme.alt);
  const altAuto = $derived(siteDraft?.theme.alt?.auto === true);
  const stdMode = $derived(siteDraft?.theme.scheme === 'dark' ? 'dark' : 'light');
  const lightPal = $derived(siteDraft?.theme.tokens.color ?? {});
  const darkPal = $derived({ ...(siteDraft?.theme.tokens.color ?? {}), ...(siteDraft?.theme.alt?.tokens?.color ?? {}) });

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

  function setSectionAnimation(type) {
    mutateSection('section-anim', (s) => {
      normalizeAnim(s);
      s.animation = type ? animObj(type) : null;
    });
    bridge?.sendDemoAnim(activeSectionId);
  }

  function setSectionHover(type) {
    mutateSection('section-hover', (s) => {
      normalizeAnim(s);
      s.hover = type ? animObj(type) : null;
    });
  }

  function setSectionAnimProp(name, value) {
    if (!Number.isFinite(value)) return;
    mutateSection('edit:section-anim', (s) => {
      if (s.animation) s.animation.props[name] = value;
    });
    bridge?.sendDemoAnim(activeSectionId);
  }

  /** String prop on the section animation (stagger pattern and effect). */
  function setSectionAnimStr(name, value) {
    mutateSection('edit:section-anim', (s) => {
      if (s.animation) s.animation.props[name] = value;
    });
    bridge?.sendDemoAnim(activeSectionId);
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
  let historyBusy = $state(false);

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

  // The history dates follow the admin language (Intl has all the
  // built-ins). A language-pack language can be a code Intl rejects: then
  // we fall back to the browser's own format instead of taking down the panel.
  const historyDate = (() => {
    const opts = { dateStyle: 'short', timeStyle: 'short' };
    try {
      return new Intl.DateTimeFormat(currentAdminLang(), opts);
    } catch {
      return new Intl.DateTimeFormat(undefined, opts);
    }
  })();

  /**
   * After a revert the editor still shows the content from BEFORE the
   * revert (the restored version exists on the server only after deploy).
   * Publishing from that state would silently reintroduce what was
   * reverted - so publishing is blocked until the admin is reloaded.
   */
  let revertedSinceLoad = false;

  async function revertLast() {
    const last = historyList?.[0];
    if (!last || historyBusy) return;
    const ok = await askConfirm({
      title: ta('confirm.revert.title'),
      lines: [
        `«${last.message}»`,
        ta('confirm.revert.body'),
      ],
      okLabel: ta('confirm.revert.ok'),
      cancelLabel: ta('confirm.cancel'),
    });
    if (!ok) return;
    historyBusy = true;
    setStatus(ta('status.reverting'));
    try {
      const res = await fetch('/api/github/revert', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ expect: last.sha }),
      });
      if (res.ok) {
        const { sha } = await res.json().catch(() => ({}));
        if (sha) baseSha = sha;
        else refreshBaseSha();
        revertedSinceLoad = true;
        setStatus(ta('status.revertDone'), 'ok');
        awaitRevertDeploy();
      } else if (res.status === 409) {
        setStatus(ta('status.revertConflict'), 'error');
      } else {
        setStatus(taApiError(await res.json().catch(() => null)) ?? ta('status.revertFailed'), 'error');
      }
    } catch {
      setStatus(ta('status.publishLayerUnreachable'), 'error');
    }
    historyBusy = false;
    loadHistory();
  }

  /**
   * After a revert: poll the served content files until the deploy is
   * actually out, discard the drafts (the server is now the source of
   * truth) and reload the admin automatically - instead of asking the
   * owner to reload. If none of the files change within the deadline
   * (slow rollout, or a publish that only touched files we do not poll),
   * the current block and message are kept.
   */
  async function awaitRevertDeploy() {
    const paths = ['/content/site.json', ...siteDraft.pages.map((p) => `/${p.file}`)];
    const snap = async () => {
      const out = {};
      for (const path of paths) {
        try {
          out[path] = await (await fetch(path, { cache: 'no-store' })).text();
        } catch {
          out[path] = null;
        }
      }
      return out;
    };
    const before = await snap();
    for (let attempt = 0; attempt < 18; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      const now = await snap();
      if (paths.some((path) => now[path] !== null && before[path] !== null && now[path] !== before[path])) {
        setStatus(ta('status.revertDeployed'), 'ok');
        // The drafts describe the state from BEFORE the revert; the server
        // is the source of truth now.
        for (const key of Object.keys(localStorage).filter((k) => k.startsWith('urd-draft-'))) {
          localStorage.removeItem(key);
        }
        await new Promise((resolve) => setTimeout(resolve, 800));
        location.reload();
        return;
      }
    }
    setStatus(ta('status.revertDeployTimeout'), 'error');
  }

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

  function toggleUpdateSkip(path) {
    const next = new Set(updateSkip);
    if (next.has(path)) next.delete(path);
    else next.add(path);
    updateSkip = next;
  }

  async function runUpdate() {
    if (!updateInfo || updateInfo.upToDate || updateBusy) return;
    const skipped = [...updateSkip];
    const applied = updateInfo.changes.filter((c) => !updateSkip.has(c.path));
    const editedAtom = applied.filter((c) => c.atom && c.conflict);
    const ok = await askConfirm({
      title: ta('confirm.update.title'),
      lines: [
        ta('confirm.update.body', {
          target: updateInfo.target,
          writes: applied.filter((c) => c.action === 'write').length,
          deletes: applied.filter((c) => c.action === 'delete').length,
        }),
        ...(editedAtom.length > 0
          ? [ta('confirm.update.warnEdited', { paths: editedAtom.map((c) => c.path).join(', ') })]
          : []),
      ],
      okLabel: ta('confirm.update.ok'),
      cancelLabel: ta('confirm.cancel'),
    });
    if (!ok) return;
    updateBusy = true;
    setStatus(ta('update.running', { target: updateInfo.target }));
    try {
      const res = await fetch('/api/github/update', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ to: updateInfo.target, expect: updateInfo.head, skip: skipped }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        setStatus(ta('update.committed', { target: updateInfo.target }), 'ok');
        await awaitUpdateDeploy(updateInfo.target.replace(/^v/, ''));
      } else if (res.status === 409) {
        setStatus(taApiError(data) ?? ta('update.checkFailed'), 'error');
        // Awaited: otherwise updateBusy is cleared during the re-check, and
        // the panel sits blank in a window where an extra check can slip through.
        await loadUpdateCheck();
      } else {
        setStatus(taApiError(data) ?? ta('update.failed'), 'error');
      }
    } catch {
      setStatus(ta('status.publishLayerUnreachable'), 'error');
    }
    updateBusy = false;
  }

  /**
   * After the update commit: poll /urd.json until the engine field reports
   * the target version (the deploy is out), and reload the admin so the
   * new bundle and engine take effect. The drafts are kept: the updater
   * never touches user-owned files, so they are just as valid afterwards.
   */
  async function awaitUpdateDeploy(version) {
    for (let attempt = 0; attempt < 18; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      try {
        const data = await (await fetch('/urd.json', { cache: 'no-store' })).json();
        if (data?.engine === version) {
          setStatus(ta('update.deployed'), 'ok');
          await new Promise((resolve) => setTimeout(resolve, 800));
          location.reload();
          return;
        }
      } catch { /* temporarily down during rollout: keep polling */ }
    }
    setStatus(ta('update.deployTimeout'), 'error');
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

  /* The starter-pack thumbnails are built once (create() per section is
     cheap, but the grid rerenders on every keystroke in the name field). */
  const builtinPageThumbs = Object.fromEntries(PAGE_PRESETS.map((p) => [
    p.id, pageThumb(buildPagePreset(p.id, { pageId: 'preview', title: '' })),
  ]));

  /** The site's color tokens as inline vars on the template thumbnail
   *  grids: the thumbnails draw with var(--urd-color-*) and must show the
   *  SITE's palette, not the admin's (the admin never loads
   *  content/theme.css). Invalid values are dropped. */
  const thumbThemeStyle = $derived.by(() => {
    const c = siteDraft?.theme?.tokens?.color ?? {};
    return ['bg', 'surface', 'text', 'accent']
      .filter((k) => typeof c[k] === 'string' && safeCssValue(c[k]))
      .map((k) => `--urd-color-${k}: ${c[k]};`)
      .join(' ');
  });

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
      return;
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
    } catch {
      setStatus(ta('status.imageReadError'), 'error');
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

  function setLogo(patch) {
    siteMutate('edit:nav-logo', () => {
      siteDraft.nav.logo = { type: 'text', value: '', ...siteDraft.nav.logo, ...patch };
    });
  }

  /**
   * Logo type switch. value means text (text/both) or image URL (image),
   * so the fields are moved along when the meaning shifts.
   */
  function setLogoType(type) {
    siteMutate('nav', () => {
      siteDraft.nav.logo ??= { type: 'text', value: siteDraft.site.title };
      const logo = siteDraft.nav.logo;
      const imageInValue = logo.type === 'image';
      if (type === 'both') {
        if (imageInValue) {
          logo.image = logo.value;
          logo.value = siteDraft.site.title;
        }
        logo.image ??= '';
        logo.size ??= 32;
      } else if (type === 'image') {
        if (!imageInValue) logo.value = logo.image ?? '';
        delete logo.image;
        logo.size ??= 32;
      } else {
        if (imageInValue) logo.value = siteDraft.site.title;
        delete logo.image;
      }
      logo.type = type;
    });
  }

  /** Logo image: same webp flow as the image block (materialized on publish). */
  async function uploadLogoImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      siteMutate('nav', () => {
        const logo = siteDraft.nav.logo;
        if (logo.type === 'both') logo.image = img.dataUrl;
        else logo.value = img.dataUrl;
      });
    } catch {
      setStatus(ta('status.imageReadErrorSvg'), 'error');
    }
  }

  /** Site icon (favicon): small webp, materialized on publish. */
  // The icon editor (IconEditor): the source being edited. null = closed.
  let iconEditorImage = $state(null);

  async function uploadSiteIcon(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const isSvg = file.type === 'image/svg+xml' || /\.svg$/i.test(file.name || '');
    if (isSvg) {
      // The SVG is auto-trimmed (viewBox tightened to the subject) BEFORE
      // the icon editor, so the rasterized favicon is filled tightly by
      // the mark. The favicon stays raster: universal support (Safari does
      // not use SVG favicons).
      try {
        const img = await svgAutoTrim(file);
        iconEditorImage = img.dataUrl;
      } catch {
        setStatus(ta('status.imageReadErrorSvg'), 'error');
      }
      return;
    }
    // Read the raw file at full resolution, so the editor has something to crop and zoom in.
    const reader = new FileReader();
    reader.onload = () => { iconEditorImage = String(reader.result); };
    reader.onerror = () => setStatus(ta('status.imageReadError'), 'error');
    reader.readAsDataURL(file);
  }

  function applyIcon(dataUrl) {
    siteMutate('edit:site-icon', () => { siteDraft.site.icon = dataUrl; });
    iconEditorImage = null;
  }

  function removeSiteIcon() {
    siteMutate('edit:site-icon', () => { delete siteDraft.site.icon; });
  }

  /** The site name (site.title): half the tab title (`<page> - <name>`)
   *  and the default text in the menu logo. edit: key so a typing session
   *  becomes one undo step. */
  function setSiteName(value) {
    siteMutate('edit:site-title', () => { siteDraft.site.title = value; });
  }

  /** The site description (site.description): used by search engines and when sharing. */
  function setSiteDescription(value) {
    siteMutate('edit:site-desc', () => { siteDraft.site.description = value; });
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
  let widthPreset = $derived(presetOf(layoutWidth));
  let gutterPreset = $derived(GUTTER_PRESETS.find((p) => p.gutter === layoutGutter)?.id ?? null);
  /** A hand-edited margin outside the scale would be invisible in the
   *  normal view, so Advanced starts open when the value matches no step. */
  let gutterAdvanced = $state(false);
  /** The slider needs a number even when the width is set to "full". */
  let widthSlider = $derived(layoutWidth === 'full' ? WIDTH_MAX : clampWidth(layoutWidth));
  /** The sample: one strip per reference screen, with the share and whether the width binds there. */
  let widthBands = $derived(REF_SCREENS.map((screen) => ({
    screen,
    ...contentBand(layoutWidth, layoutGutter, screen),
  })));

  function setLayout(patch, key) {
    siteMutate(key, () => {
      const next = { ...(siteDraft.layout ?? {}), contentWidth: layoutWidth, gutter: layoutGutter, ...patch };
      for (const k of Object.keys(next)) if (next[k] === undefined) delete next[k];
      siteDraft.layout = next;
    });
  }
  const setContentWidth = (w) => setLayout({ contentWidth: w === 'full' ? 'full' : clampWidth(w) }, 'edit:site-width');
  const setContentGutter = (g) => setLayout({ gutter: clampGutter(g) }, 'edit:site-gutter');

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
  function setSiteLang(v) {
    siteMutate('site', () => { siteDraft.site.lang = v; });
  }

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

  function setNavLayout(value) {
    siteMutate('nav', () => { siteDraft.nav.layout = value; });
  }

  function setNavStyle(name, value) {
    siteMutate(`edit:nav-style-${name}`, () => {
      siteDraft.nav.style ??= {};
      // Defaults are not stored in the file (a call with undefined removes the field).
      if (value === undefined) delete siteDraft.nav.style[name];
      else siteDraft.nav.style[name] = value;
    });
  }

  /** Variant derivations for the panel: side-by-side and floating show their own options. */
  const sideVariant = $derived(siteDraft?.nav?.variant === 'side-left' || siteDraft?.nav?.variant === 'side-right');
  const floatingVariant = $derived(['floating', 'floating-square', 'floating-tab'].includes(siteDraft?.nav?.variant));

  /* ---------- Nav size (ADR-0023) ---------- */

  /** The highlighted size preset (null while a free value overrides it) and
      the values the sliders start at: what the bar actually renders. */
  const navSizePreset = $derived(sizePresetOf(siteDraft?.nav?.style));
  const navPadY = $derived(effectivePadY(siteDraft?.nav?.style, siteDraft?.nav?.variant));
  const navTextSize = $derived(effectiveTextSize(siteDraft?.nav?.style));

  /** A size preset: md is the default and is not stored; the free values it
      replaces are removed in the same history step. */
  function setNavSizePreset(id) {
    siteMutate('nav', () => {
      siteDraft.nav.style ??= {};
      if (id === 'md') delete siteDraft.nav.style.size;
      else siteDraft.nav.style.size = id;
      delete siteDraft.nav.style.padY;
      delete siteDraft.nav.style.textSize;
    });
  }

  /** A number field for a nav size value: empty (or garbage) removes the
      field, anything else is clamped; the field then shows what was stored. */
  function onNavSizeInput(e, key, range) {
    const raw = e.target.value;
    setNavStyle(key, raw === '' ? undefined : clampRange(raw, range, undefined));
    e.target.value = siteDraft.nav.style?.[key] ?? '';
  }

  /** The mobile overrides (nav.style.mobile): an emptied object is removed. */
  function setNavMobile(key, value) {
    siteMutate(`edit:nav-mobile-${key}`, () => {
      siteDraft.nav.style ??= {};
      const mobile = { ...(siteDraft.nav.style.mobile ?? {}) };
      if (value === undefined) delete mobile[key];
      else mobile[key] = value;
      if (Object.keys(mobile).length) siteDraft.nav.style.mobile = mobile;
      else delete siteDraft.nav.style.mobile;
    });
  }

  const navMobilePadY = $derived(siteDraft?.nav?.style?.mobile?.padY ?? navPadY);
  const navMobileTextSize = $derived(siteDraft?.nav?.style?.mobile?.textSize ?? navTextSize);

  /** The announcement bar (nav.announcement): an emptied object is removed. */
  function setNavAnnouncement(key, value) {
    siteMutate(`edit:nav-announce-${key}`, () => {
      const next = { ...(siteDraft.nav.announcement ?? {}) };
      if (value === undefined) delete next[key];
      else next[key] = value;
      if (Object.keys(next).length) siteDraft.nav.announcement = next;
      else delete siteDraft.nav.announcement;
    });
  }

  /** The sheet's own surface (nav.style.sheet): an emptied object is removed. */
  function setNavSheet(key, value) {
    siteMutate(`edit:nav-sheet-${key}`, () => {
      siteDraft.nav.style ??= {};
      const sheet = { ...(siteDraft.nav.style.sheet ?? {}) };
      if (value === undefined) delete sheet[key];
      else sheet[key] = value;
      if (Object.keys(sheet).length) siteDraft.nav.style.sheet = sheet;
      else delete siteDraft.nav.style.sheet;
    });
  }

  /** The number beside a desktop size slider: empty restores the preset; the
      field then shows what the bar renders. */
  function onNavSizeField(e, key, range) {
    const raw = e.target.value;
    setNavStyle(key, raw === '' ? undefined : clampRange(raw, range, undefined));
    e.target.value = key === 'padY' ? navPadY : navTextSize;
  }

  /** The number beside a mobile size slider: empty restores the desktop value. */
  function onNavMobileField(e, key, range) {
    const raw = e.target.value;
    setNavMobile(key, raw === '' ? undefined : clampRange(raw, range, undefined));
    e.target.value = siteDraft.nav.style?.mobile?.[key] ?? '';
  }


  /** The scroll shrink factor is stored as a fraction; 0.5 is the default and is not stored. */
  function setNavShrinkTo(percent) {
    const factor = clampRange(percent / 100, SHRINK_TO, 0.5);
    setNavStyle('shrinkTo', factor === 0.5 ? undefined : factor);
  }

  /** The effect color on hover: only where the style has an effect, with a
      label saying what the color actually controls in the chosen style. */
  const HOVER_COLOR_LABELS = {
    underline: [ta('hoverColor.underline.label'), ta('hoverColor.underline.title')],
    pill: [ta('hoverColor.pill.label'), ta('hoverColor.pill.title')],
    lift: [ta('hoverColor.lift.label'), ta('hoverColor.lift.title')],
  };
  const hoverColorLabel = $derived(HOVER_COLOR_LABELS[siteDraft?.nav?.style?.hover] ?? null);
  /** The submenu designs on offer: the column has no card, flat surface or flyout. */
  const subStyleOptions = $derived(sideVariant
    ? [['card', ta('common.standard')], ['pills', ta('opt.sub.pills')], ['lines', ta('opt.sub.lines')]]
    : [['card', ta('opt.sub.card')], ['flat', ta('opt.sub.flat')], ['pills', ta('opt.sub.pills')], ['lines', ta('opt.sub.lines')], ['flyout', ta('opt.sub.flyout')]]);

  /** Variant (additive): the default (bar) is not stored in the file. The
      three floating forms are presets of the corner rounding, so a switch
      clears a rounding value entered for the previous form. */
  function setNavVariant(value) {
    siteMutate('nav', () => {
      if (value === 'bar') delete siteDraft.nav.variant;
      else siteDraft.nav.variant = value;
      if (siteDraft.nav.style) delete siteDraft.nav.style.radius;
    });
  }

  /** Glow around the floating pill: off is the default and is not stored in the file. */
  function setNavGlow(on) {
    siteMutate('nav', () => {
      siteDraft.nav.style ??= {};
      if (on) siteDraft.nav.style.glow = true;
      else delete siteDraft.nav.style.glow;
    });
  }

  /** Air above the pill: on is the default and is not stored in the file. */
  function setNavTopGap(on) {
    siteMutate('nav', () => {
      siteDraft.nav.style ??= {};
      if (on) delete siteDraft.nav.style.topGap;
      else siteDraft.nav.style.topGap = false;
    });
  }

  /** Hover style (additive): the default is not stored in the file. */
  function setNavHover(value) {
    siteMutate('nav', () => {
      siteDraft.nav.style ??= {};
      if (value === 'standard') delete siteDraft.nav.style.hover;
      else siteDraft.nav.style.hover = value;
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

  const COLLECTION_KINDS = [
    ['news', ta('collectionKind.news')],
    ['notices', ta('collectionKind.notices')],
    ['publications', ta('collectionKind.publications')],
    ['products', ta('collectionKind.products')],
    ['custom', ta('collectionKind.custom')],
  ];

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

  function setEntryField(id, entryId, field, value) {
    mutateCollection(id, `edit:collection:${id}:${entryId}:${field}`, (data) => {
      const entry = data.entries.find((e) => e.id === entryId);
      if (!entry) return;
      if (value === '' && field !== 'title') delete entry[field];
      else entry[field] = value;
    });
  }

  function moveEntry(id, index, dir) {
    mutateCollection(id, `collection:${id}:move-entry`, (data) => {
      const j = index + dir;
      if (j < 0 || j >= data.entries.length) return;
      [data.entries[index], data.entries[j]] = [data.entries[j], data.entries[index]];
    });
  }

  function removeEntry(id, entryId) {
    mutateCollection(id, `collection:${id}:remove-entry`, (data) => {
      data.entries = data.entries.filter((e) => e.id !== entryId);
    });
  }

  /** Entry image: same webp flow as block images; materialized on publish. */
  async function setEntryImage(id, entryId, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const img = await compressOrTrim(file);
    setEntryField(id, entryId, 'image', img.dataUrl);
  }

  /** The product fields (kind products): the size list is written comma-separated. */
  function setEntrySizes(id, entryId, text) {
    const sizes = text.split(',').map((s) => s.trim()).filter(Boolean);
    setEntryField(id, entryId, 'sizes', sizes.length ? sizes : '');
  }

  function addEntryColor(id, entryId) {
    mutateCollection(id, `collection:${id}:${entryId}:colors`, (data) => {
      const entry = data.entries.find((e) => e.id === entryId);
      if (!entry) return;
      entry.colors = [...(entry.colors ?? []), { name: ta('ph.colorName') }];
    });
  }

  function setEntryColor(id, entryId, index, field, value) {
    mutateCollection(id, `edit:collection:${id}:${entryId}:color:${index}:${field}`, (data) => {
      const color = data.entries.find((e) => e.id === entryId)?.colors?.[index];
      if (!color) return;
      // The name can never be emptied (the schema requires it); the image can be removed.
      if (field === 'image' && !value) delete color.image;
      else if (value) color[field] = value;
    });
  }

  async function setEntryColorImage(id, entryId, index, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const img = await compressOrTrim(file);
    setEntryColor(id, entryId, index, 'image', img.dataUrl);
  }

  function removeEntryColor(id, entryId, index) {
    mutateCollection(id, `collection:${id}:${entryId}:colors`, (data) => {
      const entry = data.entries.find((e) => e.id === entryId);
      if (!entry?.colors) return;
      entry.colors = entry.colors.filter((_, i) => i !== index);
      if (!entry.colors.length) delete entry.colors;
    });
  }

  /** CSV export: the entries are downloaded as <id>.csv. */
  function exportCollectionCsv(id) {
    const data = collectionStores[id]?.data;
    if (!data) return;
    const url = URL.createObjectURL(new Blob([entriesToCsv(data.entries)], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /** CSV import: REPLACES the collection's entries with the rows from the
   *  file (undo exists). Missing/invalid ids get new ones; pure parsing
   *  lives in engine/collections-csv.js. */
  async function importCollectionCsv(id, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const parsed = csvToEntries(await file.text());
    if (!parsed) {
      setStatus(ta('status.csvInvalid'), 'error');
      return;
    }
    const used = new Set();
    for (const entry of parsed.entries) {
      if (!/^[a-z0-9][a-z0-9-]*$/.test(entry.id) || used.has(entry.id)) entry.id = makeId('entry');
      used.add(entry.id);
    }
    mutateCollection(id, `collection:${id}:import`, (data) => { data.entries = parsed.entries; });
    setStatus(ta('status.csvImported', { count: String(parsed.entries.length) }), 'ok');
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
  let newPluginId = $state('');
  let pluginError = $state('');
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

  /** Manifest CSP needs NOT already in the live CSP: only those are shown
   *  in the instructions (settings are shown only when relevant). */
  function cspMissing(csp) {
    const need = [
      ...(csp.scriptSrc ?? []).map((host) => ['script-src', host]),
      ...(csp.connectSrc ?? []).map((host) => ['connect-src', host]),
      ...(csp.frameSrc ?? []).map((host) => ['frame-src', host]),
    ];
    if (!liveCsp || liveCsp.unknown) return [];
    const present = { 'script-src': liveCsp.scriptSrc, 'connect-src': liveCsp.connectSrc, 'frame-src': liveCsp.frameSrc };
    return need.filter(([dir, host]) => !present[dir]?.has(host)).map(([dir, host]) => `${dir} ${host}`);
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

  async function addPlugin() {
    pluginError = '';
    const id = newPluginId.trim().toLowerCase();
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) {
      pluginError = ta('plugin.invalidId');
      return;
    }
    if (knownPlugins().includes(id)) {
      pluginError = ta('plugin.alreadyListed');
      return;
    }
    await loadPluginInfo(id);
    if (pluginInfo[id].errors.length) {
      pluginError = ta('plugin.invalidManifest', { errors: pluginInfo[id].errors.join('; ') });
      return;
    }
    setPluginEnabled(id, true);
    newPluginId = '';
  }

  function addFoundPlugin(id) {
    pluginsFound = pluginsFound.filter((x) => x !== id);
    setPluginEnabled(id, true);
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

  function setFooterBrand(field, value) {
    footerMutate(`edit:footer-brand-${field}`, (f) => {
      f.brand ??= {};
      if (value.trim()) f.brand[field] = value; else delete f.brand[field];
      if (!f.brand.title && !f.brand.tagline && !f.brand.logo) delete f.brand;
    });
  }

  /* Footer logo (text/logo/both, mirrors the nav logo): uploaded to webp,
     materialized to media/ on publish. */
  function setFooterBrandMode(value) {
    footerMutate('footer', (f) => {
      f.brand ??= {};
      if (value === 'image' || value === 'both') f.brand.mode = value; else delete f.brand.mode;
    });
  }
  async function uploadFooterLogo(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      footerMutate('footer', (f) => { f.brand ??= {}; f.brand.logo = img.dataUrl; if (!f.brand.mode) f.brand.mode = 'both'; });
    } catch {
      setStatus(ta('status.imageReadErrorSvg'), 'error');
    }
  }
  function removeFooterLogo() {
    footerMutate('footer', (f) => {
      if (!f.brand) return;
      delete f.brand.logo; delete f.brand.mode; delete f.brand.logoHeight;
      if (!f.brand.title && !f.brand.tagline) delete f.brand;
    });
  }
  function setFooterLogoHeight(value) {
    footerMutate('edit:footer-logo-height', (f) => {
      f.brand ??= {};
      const n = Number(value);
      if (Number.isFinite(n)) f.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n)));
    });
  }

  function setFooterCopyright(value) {
    footerMutate('edit:footer-copyright', (f) => {
      if (value.trim()) f.copyright = value; else delete f.copyright;
    });
  }

  /* Footer templates: eight research-based starting layouts, built from
     the site's own pages and title. They fill the footer; everything can
     be edited further. Each has a small thumb description for the visual
     template picker (footerThumb). */
  const FOOTER_TEMPLATES = [
    { id: 'minimal', label: ta('footerTemplate.minimal'), thumb: { center: true, social: 2, baselineLinks: 1 } },
    { id: 'centered', label: ta('footerTemplate.centered'), thumb: { center: true, row: true, social: 3 } },
    { id: 'columns', label: ta('footerTemplate.columns'), thumb: { tag: true, cols: 3, social: 3, baselineLinks: 2 } },
    { id: 'sitemap', label: ta('footerTemplate.sitemap'), thumb: { tag: true, fat: true, cols: 4, social: 4, baselineLinks: 3 } },
    { id: 'newsletter', label: ta('footerTemplate.newsletter'), thumb: { tag: true, cta: true, cols: 2, social: 2, baselineLinks: 1 } },
    { id: 'bigcta', label: ta('footerTemplate.bigcta'), thumb: { center: true, bigcta: true, baselineLinks: 2 } },
    { id: 'contact', label: ta('footerTemplate.contact'), thumb: { tag: true, cols: 3, social: 2, baselineLinks: 1 } },
    { id: 'mega', label: ta('footerTemplate.mega'), thumb: { tag: true, mega: true, cols: 2, social: 4, baselineLinks: 2 } },
  ];

  function footerTemplateConfig(name) {
    // ALWAYS a neutral placeholder, NEVER the site title: the site title
    // can contain anything (e.g. a version number on a test site), and
    // sample text must never carry a version number. The owner types in
    // their own name.
    const title = ta('seed.orgName');
    const pages = siteDraft.pages ?? [];
    const pageLinks = (n) => pages.slice(0, n).map((p) => ({ label: p.title || p.id, page: p.id }));
    const soc = (ids) => ids.map((icon) => ({ icon, url: `https://${icon}.com` }));
    const ext = (label, href) => ({ label, href });
    const copyright = `© ${title}`;
    if (name === 'minimal') {
      return { align: 'center', brand: { title }, social: soc(['facebook', 'instagram']),
        copyright, baseline: [ext(ta('seed.footer.privacy'), '#')] };
    }
    if (name === 'centered') {
      return { align: 'center', brand: { title }, linkRow: pageLinks(5),
        social: soc(['facebook', 'instagram', 'x']), copyright: `${copyright} · ${ta('seed.footer.madeWith')}` };
    }
    if (name === 'columns') {
      return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline1') },
        columns: [
          { title: ta('seed.footer.colPages'), links: pageLinks(4) },
          { title: ta('seed.footer.colCompany'), links: [ext(ta('seed.footer.about'), '#'), ext(ta('seed.join'), '#'), ext(ta('seed.footer.press'), '#')] },
          { title: ta('seed.footer.colResources'), links: [ext(ta('seed.footer.bylaws'), '#'), ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.contact'), '#')] },
        ],
        social: soc(['facebook', 'instagram', 'linkedin']), copyright,
        baseline: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.terms'), '#')] };
    }
    if (name === 'sitemap') {
      return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline2') },
        columns: [
          { title: ta('seed.footer.colExplore'), links: [ext(ta('seed.footer.home'), '#'), ext(ta('seed.footer.events'), '#'), ext(ta('seed.footer.gallery'), '#'), ext(ta('seed.footer.blog'), '#')] },
          { title: ta('seed.footer.colCompany'), links: [ext(ta('seed.footer.about'), '#'), ext(ta('seed.footer.history'), '#'), ext(ta('seed.footer.press'), '#'), ext(ta('seed.footer.contact'), '#')] },
          { title: ta('seed.footer.colSupport'), links: [ext(ta('seed.join'), '#'), ext(ta('seed.footer.faq'), '#'), ext(ta('seed.footer.help'), '#')] },
          { title: ta('seed.footer.colLegal'), links: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.terms'), '#'), ext(ta('seed.footer.bylaws'), '#')] },
        ],
        social: soc(['facebook', 'instagram', 'linkedin', 'youtube']), copyright,
        baseline: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.terms'), '#'), ext(ta('seed.footer.cookies'), '#')] };
    }
    if (name === 'newsletter') {
      return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline3') },
        cta: { kind: 'newsletter', heading: ta('seed.footer.newsletterHeading'), label: ta('seed.footer.newsletterButton'), recipient: ta('seed.email'), success: ta('seed.footer.newsletterSuccess') },
        columns: [
          { title: ta('seed.footer.colPages'), links: pageLinks(4) },
          { title: ta('seed.footer.colMore'), links: [ext(ta('seed.footer.about'), '#'), ext(ta('seed.footer.contact'), '#'), ext(ta('seed.footer.privacy'), '#')] },
        ],
        social: soc(['facebook', 'instagram']), copyright, baseline: [ext(ta('seed.footer.privacy'), '#')] };
    }
    if (name === 'bigcta') {
      return { align: 'center',
        cta: { kind: 'button', big: true, heading: ta('seed.footer.ctaHeading'), sub: ta('seed.footer.ctaSub'), label: ta('seed.join'), href: '#' },
        linkRow: pageLinks(4), social: soc(['facebook', 'instagram', 'x']), copyright,
        baseline: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.terms'), '#')] };
    }
    if (name === 'contact') {
      return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline4') },
        columns: [
          { title: ta('seed.footer.colVisit'), links: [ext(ta('seed.footer.address'), '#'), ext(ta('seed.email'), `mailto:${ta('seed.email')}`), ext(ta('seed.phone'), `tel:${ta('seed.phone').replace(/\s+/g, '')}`)] },
          { title: ta('seed.footer.colHours'), links: [ext(ta('seed.footer.hours1'), '#'), ext(ta('seed.footer.hours2'), '#')] },
          { title: ta('seed.footer.colPages'), links: pageLinks(4) },
        ],
        social: soc(['facebook', 'instagram']), copyright, baseline: [ext(ta('seed.footer.privacy'), '#')] };
    }
    // mega: columns + background layers (glow + grain).
    return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline5') },
      columns: [
        { title: ta('seed.footer.colExplore'), links: pageLinks(4) },
        { title: ta('seed.footer.colFollow'), links: [ext(ta('seed.footer.newsletter'), '#'), ext(ta('seed.email'), `mailto:${ta('seed.email')}`)] },
      ],
      social: soc(['facebook', 'instagram', 'linkedin', 'youtube']), copyright,
      baseline: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.madeWith'), '#')],
      background: { version: 1, layers: [
        { type: 'glow', version: glowLayer.version ?? 1, props: { ...glowLayer.defaults(), color: 'accent', x: 0.12, y: 0, radius: 0.6, opacity: 0.45 } },
        { type: 'grain', version: grainLayer.version ?? 1, props: { ...grainLayer.defaults(), opacity: 0.08 } },
      ] } };
  }

  /** Apply a footer layout: replaces the content fields and turns the footer on. */
  function applyFooterTemplate(name) {
    footerMutate('footer-template', (f) => {
      const t = footerTemplateConfig(name);
      f.show = true;
      delete f.text; // "Simple text" is the legacy form; the templates use the rich footer.
      for (const k of ['align', 'brand', 'columns', 'social', 'copyright', 'baseline', 'linkRow', 'cta', 'columnsAlign', 'background']) {
        if (t[k] !== undefined) f[k] = t[k]; else delete f[k];
      }
    });
  }

  /* Generic link-list handlers for the bottom-line links (baseline) and
     the doormat row (linkRow) - same shape as the column links, but on a
     flat list. */
  function addFooterListLink(field) {
    footerMutate('footer', (f) => {
      f[field] ??= [];
      f[field].push(siteDraft.pages[0] ? { label: ta('seed.link'), page: siteDraft.pages[0].id } : { label: ta('seed.link'), href: 'https://' });
    });
  }
  function removeFooterListLink(field, i) {
    footerMutate('footer', (f) => { f[field].splice(i, 1); if (!f[field].length) delete f[field]; });
  }
  function moveFooterListLink(field, i, dir) {
    footerMutate('footer', (f) => {
      const a = f[field]; const j = i + dir;
      if (j < 0 || j >= a.length) return;
      [a[i], a[j]] = [a[j], a[i]];
    });
  }
  function setFooterListLinkLabel(field, i, value) {
    footerMutate(`edit:footer-${field}-label-${i}`, (f) => { f[field][i].label = value; });
  }
  function setFooterListLinkTarget(field, i, value) {
    footerMutate('footer', (f) => {
      const link = f[field][i];
      if (value === '__href') { delete link.page; link.href = link.href ?? 'https://'; }
      else { link.page = value; delete link.href; }
    });
  }
  function setFooterListLinkHref(field, i, value) {
    footerMutate(`edit:footer-${field}-href-${i}`, (f) => { f[field][i].href = value; });
  }

  /** Column alignment: the heading of a wide (two-part) column. */
  function setFooterColumnsAlign(value) {
    footerMutate('footer', (f) => { if (value === 'center') f.columnsAlign = 'center'; else delete f.columnsAlign; });
  }

  /* Call to action (CTA): a button (link) or newsletter (email field). */
  function enableFooterCta(on) {
    footerMutate('footer', (f) => { if (on) f.cta ??= { kind: 'button', label: ta('seed.join') }; else delete f.cta; });
  }
  function setFooterCtaField(field, value) {
    footerMutate(`edit:footer-cta-${field}`, (f) => {
      f.cta ??= {};
      if (value === '' || value == null || value === false) delete f.cta[field];
      else f.cta[field] = value;
    });
  }
  function setFooterCtaTarget(value) {
    footerMutate('footer', (f) => {
      f.cta ??= {};
      if (value === '__href') { delete f.cta.page; f.cta.href = f.cta.href ?? 'https://'; }
      else { f.cta.page = value; delete f.cta.href; }
    });
  }

  /** Per-page visibility: the footer shows on all pages except those in hideOn. */
  function toggleFooterOnPage(pageId, show) {
    footerMutate('footer', (f) => {
      const hide = new Set(f.hideOn ?? []);
      if (show) hide.delete(pageId); else hide.add(pageId);
      if (hide.size) f.hideOn = [...hide]; else delete f.hideOn;
    });
  }


  function addFooterColumn() {
    footerMutate('footer', (f) => {
      f.columns ??= [];
      f.columns.push({ title: ta('seed.column'), links: [{ label: ta('seed.link'), page: siteDraft.pages[0].id }] });
    });
  }

  function removeFooterColumn(ci) {
    footerMutate('footer', (f) => { f.columns.splice(ci, 1); if (!f.columns.length) delete f.columns; });
  }

  function moveFooterColumn(ci, dir) {
    footerMutate('footer', (f) => {
      const j = ci + dir;
      if (j < 0 || j >= f.columns.length) return;
      [f.columns[ci], f.columns[j]] = [f.columns[j], f.columns[ci]];
    });
  }

  function setFooterColumnTitle(ci, value) {
    footerMutate(`edit:footer-col-title-${ci}`, (f) => { f.columns[ci].title = value; });
  }

  function addFooterLink(ci) {
    footerMutate('footer', (f) => {
      f.columns[ci].links ??= [];
      f.columns[ci].links.push({ label: ta('seed.link'), page: siteDraft.pages[0].id });
    });
  }

  function removeFooterLink(ci, li) {
    footerMutate('footer', (f) => { f.columns[ci].links.splice(li, 1); });
  }

  function moveFooterLink(ci, li, dir) {
    footerMutate('footer', (f) => {
      const links = f.columns[ci].links;
      const j = li + dir;
      if (j < 0 || j >= links.length) return;
      [links[li], links[j]] = [links[j], links[li]];
    });
  }

  function setFooterLinkLabel(ci, li, value) {
    footerMutate(`edit:footer-link-label-${ci}-${li}`, (f) => { f.columns[ci].links[li].label = value; });
  }

  function setFooterLinkTarget(ci, li, value) {
    footerMutate('footer', (f) => {
      const link = f.columns[ci].links[li];
      if (value === '__href') { delete link.page; link.href = link.href ?? 'https://'; }
      else { link.page = value; delete link.href; }
    });
  }

  function setFooterLinkHref(ci, li, value) {
    footerMutate(`edit:footer-link-href-${ci}-${li}`, (f) => { f.columns[ci].links[li].href = value; });
  }

  function addFooterSocial() {
    footerMutate('footer', (f) => { f.social ??= []; f.social.push({ icon: 'facebook', url: 'https://' }); });
  }

  function removeFooterSocial(si) {
    footerMutate('footer', (f) => { f.social.splice(si, 1); if (!f.social.length) delete f.social; });
  }

  function moveFooterSocial(si, dir) {
    footerMutate('footer', (f) => {
      const j = si + dir;
      if (j < 0 || j >= f.social.length) return;
      [f.social[si], f.social[j]] = [f.social[j], f.social[si]];
    });
  }

  function setFooterSocialIcon(si, id) {
    footerMutate('footer', (f) => { f.social[si].icon = id; });
  }

  function setFooterSocialUrl(si, value) {
    footerMutate(`edit:footer-social-url-${si}`, (f) => { f.social[si].url = value; });
  }

  // The social icons in the dropdown: the social and communication
  // categories from the icon library.
  const SOCIAL_ICON_OPTIONS = ICON_CATEGORIES
    .filter(([cat]) => cat === 'iconCat.social' || cat === 'iconCat.communication')
    .flatMap(([, ids]) => ids.map((id) => [id, ta(ICON_LIBRARY[id].labelKey)]));

  function setNavLabel(i, value) {
    siteMutate(`edit:nav-label-${i}`, () => { siteDraft.nav.items[i].label = value; });
  }

  /** Target: a page from the registry, '__href' = external link, or
   *  '__none' = a pure opener for the submenu (offered only for items with
   *  a submenu). The schema allows only one of page/href, so the rest are
   *  removed. */
  function setNavTarget(i, value) {
    siteMutate('nav', () => {
      const item = siteDraft.nav.items[i];
      if (value === '__href') {
        delete item.page;
        item.href = item.href ?? 'https://';
      } else if (value === '__none') {
        delete item.page;
        delete item.href;
      } else {
        item.page = value;
        delete item.href;
      }
    });
  }

  function setNavHref(i, value) {
    siteMutate(`edit:nav-href-${i}`, () => { siteDraft.nav.items[i].href = value; });
  }

  function moveNavItem(i, dir) {
    const j = i + dir;
    const items = siteDraft.nav.items;
    if (j < 0 || j >= items.length) return;
    siteMutate('nav', () => { [items[i], items[j]] = [items[j], items[i]]; });
  }

  function removeNavItem(i) {
    siteMutate('nav', () => { siteDraft.nav.items.splice(i, 1); });
  }

  /** The menu item whose actions are shown ('i' or 'i.j'); a click on a row selects it. */
  let navSel = $state('');
  /** Drag reorder: the row being dragged, as its key, and the reorder itself. */
  let navDrag = $state('');
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
  /** Where the dragged row would land: { key, pos } with pos before, after or into; null = nowhere. */
  let navDrop = $state(null);
  /** The row at a key: its list, index and parent (null at the top level). */
  function navRowAt(key) {
    const [a, b] = key.split('.').map(Number);
    const items = siteDraft.nav.items;
    return b === undefined ? { list: items, index: a, parent: null } : { list: items[a].children, index: b, parent: items[a] };
  }
  /** The drop position over a row from the pointer. On a top-level row the left quarter decides
      before or after by the row's midline, and everything right of it is into: the dragged row
      becomes the row's last child, so a drag a quarter of the way to the right, or a hover over
      the row itself, nests it. A row with a submenu can not be nested, and nothing nests under a
      child (one level). On a child row the grip column is the way out: there the drop lands at the
      top level, after the whole submenu. A position that would change nothing gives no drop. */
  function navDropAt(row, key, clientX, clientY) {
    if (!navDrag || navDrag === key) return null;
    const rect = row.getBoundingClientRect();
    const y = (clientY - rect.top) / rect.height;
    const x = clientX - rect.left;
    const src = navRowAt(navDrag); const tgt = navRowAt(key);
    const moving = src.list[src.index];
    let drop;
    if (tgt.parent) {
      drop = x < 28 ? { key: key.split('.')[0], pos: 'after' } : { key, pos: y < 0.5 ? 'before' : 'after' };
    } else if (!moving.children?.length && x > rect.width * 0.25) {
      drop = { key, pos: 'into' };
    } else {
      drop = { key, pos: y < 0.5 ? 'before' : 'after' };
    }
    return navDropOrNull(drop, moving, src);
  }
  /** The drop unless the row would land exactly where it is. A submenu never nests: a row with
      children dropped among another row's children lands after that row instead, and a row's
      own children are no place for it. */
  function navDropOrNull(drop, moving, src) {
    let dest = navRowAt(drop.key);
    if (dest.parent) {
      if (dest.parent === moving) return null;
      if (moving.children?.length) {
        drop = { key: drop.key.split('.')[0], pos: 'after' };
        dest = navRowAt(drop.key);
      }
    }
    const targetObj = dest.list[dest.index];
    if (drop.pos === 'into') {
      const kids = targetObj.children ?? [];
      if (kids.length && kids[kids.length - 1] === moving) return null;
      return drop;
    }
    const list = dest.parent ? dest.parent.children : siteDraft.nav.items;
    const after = list.filter((it) => it !== moving);
    const idx = after.indexOf(targetObj) + (drop.pos === 'after' ? 1 : 0);
    if (list === src.list && idx === src.index) return null;
    return drop;
  }
  /** The dragged row's name and target, for the faint clone at the landing place. */
  function navGhostText() {
    if (!navDrag) return { label: '', target: '' };
    const src = navRowAt(navDrag); const it = src.list[src.index];
    const page = it.page ? siteDraft.pages.find((p) => p.id === it.page) : null;
    return { label: it.label, target: page ? page.title : (it.href ?? ta('opt.noLink')) };
  }
  /** The end of a drag: a release outside the list still lands the row where the clone last
      stood (a drop inside the list has already taken it and cleared the position). */
  function endNavDrag() {
    if (navDrop) dropNavRow(navDrop.key);
    navDrag = ''; navDrop = null;
  }
  /** Drag over the whole list: over a row the row's zones decide; in a gap, on the clone or below
      the last row the nearest row by its midpoint decides, so the clone never flips while it pushes
      the rows. Below everything the drop is the end of the top level. */
  function onNavListDragOver(e) {
    if (!navDrag) return;
    const rows = [...e.currentTarget.querySelectorAll('.nav-item:not(.ghost)')];
    if (!rows.length) return;
    const hit = rows.find((r) => { const b = r.getBoundingClientRect(); return e.clientY >= b.top && e.clientY <= b.bottom; });
    let drop = null;
    if (hit) {
      drop = navDropAt(hit, hit.dataset.key, e.clientX, e.clientY);
    } else {
      const src = navRowAt(navDrag); const moving = src.list[src.index];
      const next = rows.find((r) => { const b = r.getBoundingClientRect(); return b.top + b.height / 2 > e.clientY; });
      if (next) {
        drop = next.dataset.key === navDrag ? null : navDropOrNull({ key: next.dataset.key, pos: 'before' }, moving, src);
      } else {
        const lastTop = [...rows].reverse().find((r) => !r.classList.contains('child'));
        drop = lastTop.dataset.key === navDrag ? null : navDropOrNull({ key: lastTop.dataset.key, pos: 'after' }, moving, src);
      }
    }
    if (!drop) { navDrop = null; return; }
    e.preventDefault();
    if (navDrop?.key !== drop.key || navDrop?.pos !== drop.pos) navDrop = drop;
  }
  /** The drop: the dragged row leaves its list and lands before or after the target, or as the
      target's last child. Moving between levels is allowed; an emptied submenu disappears. */
  function dropNavRow(targetKey) {
    const from = navDrag; const drop = navDrop;
    navDrag = ''; navDrop = null;
    if (!from || !drop || drop.key !== targetKey || from === targetKey) return;
    {
      // The same guard as navDropOrNull, so a stale position can never nest a submenu.
      const src = navRowAt(from); const tgt = navRowAt(targetKey);
      const moving = src.list[src.index];
      if (tgt.parent && (tgt.parent === moving || moving.children?.length)) return;
      if (drop.pos === 'into' && moving.children?.length) return;
    }
    siteMutate('nav', () => {
      const items = siteDraft.nav.items;
      const src = navRowAt(from); const tgt = navRowAt(targetKey);
      const moving = src.list[src.index];
      const targetObj = tgt.list[tgt.index];
      if (moving === targetObj) return;
      src.list.splice(src.index, 1);
      if (src.parent && src.parent.children.length === 0) delete src.parent.children;
      if (drop.pos === 'into') {
        targetObj.children ??= [];
        targetObj.children.push(moving);
      } else {
        const list = tgt.parent ? tgt.parent.children : items;
        const idx = list.indexOf(targetObj) + (drop.pos === 'after' ? 1 : 0);
        list.splice(idx, 0, moving);
      }
      // A row that becomes a child needs a target of its own (a pure opener has none).
      if (!moving.page && moving.href == null && !moving.children?.length) moving.page = siteDraft.pages[0].id;
    });
    navSel = '';
  }
  const GRIP_ICON = '<svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="1.3"/><circle cx="7" cy="3" r="1.3"/><circle cx="3" cy="8" r="1.3"/><circle cx="7" cy="8" r="1.3"/><circle cx="3" cy="13" r="1.3"/><circle cx="7" cy="13" r="1.3"/></svg>';
  const SUB_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  function addNavItem() {
    siteMutate('nav', () => {
      siteDraft.nav.items.push({ label: ta('seed.link'), page: siteDraft.pages[0].id });
    });
  }

  /* Submenu (one level, additive): the children always have their own
   * target; the parent can additionally be a pure opener ('__none' in
   * setNavTarget). */

  function addNavChild(i) {
    siteMutate('nav', () => {
      const item = siteDraft.nav.items[i];
      item.children ??= [];
      item.children.push({ label: ta('seed.link'), page: siteDraft.pages[0].id });
    });
  }

  function setNavChildLabel(i, j, value) {
    siteMutate(`edit:nav-child-label-${i}-${j}`, () => { siteDraft.nav.items[i].children[j].label = value; });
  }

  function setNavChildTarget(i, j, value) {
    siteMutate('nav', () => {
      const child = siteDraft.nav.items[i].children[j];
      if (value === '__href') {
        delete child.page;
        child.href = child.href ?? 'https://';
      } else {
        child.page = value;
        delete child.href;
      }
    });
  }

  function setNavChildHref(i, j, value) {
    siteMutate(`edit:nav-child-href-${i}-${j}`, () => { siteDraft.nav.items[i].children[j].href = value; });
  }

  function moveNavChild(i, j, dir) {
    const k = j + dir;
    const children = siteDraft.nav.items[i].children;
    if (k < 0 || k >= children.length) return;
    siteMutate('nav', () => { [children[j], children[k]] = [children[k], children[j]]; });
  }

  function removeNavChild(i, j) {
    siteMutate('nav', () => {
      const item = siteDraft.nav.items[i];
      item.children.splice(j, 1);
      if (item.children.length === 0) {
        // An empty submenu is removed from the file; a pure opener without
        // children has no target and gets the front page, so the item
        // stays valid.
        delete item.children;
        if (!item.page && !item.href) item.page = siteDraft.pages[0].id;
      }
    });
  }

  /* ---------- The Theme panel ---------- */

  function setColorToken(name, value) {
    siteMutate(`edit:theme-color-${name}`, () => {
      siteDraft.theme.tokens.color[name] = value;
      // An auto-derived dark theme follows the light colors automatically.
      if (siteDraft.theme.alt?.auto) siteDraft.theme.alt.tokens.color = suggestAltColors();
    });
  }

  /** The value a palette cell shows when the token is absent: the text on
      accent is what the browser chooses (black or white against the accent,
      contrast-color() in theme.js), everything else the background. */
  function paletteFallback(key, pal) {
    if (key === 'accent-text') return readableOn(themeHex(pal.accent ?? '#000000', pal));
    return pal.bg;
  }

  /** Auto = no accent-text token in either theme: the browser chooses the text colour. */
  const accentTextAuto = $derived(!siteDraft?.theme?.tokens?.color?.['accent-text'] && !siteDraft?.theme?.alt?.tokens?.color?.['accent-text']);

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

  function setAccentTextAuto(auto) {
    siteMutate('edit:theme-color-accent-text', () => {
      if (auto) {
        delete siteDraft.theme.tokens.color['accent-text'];
        if (siteDraft.theme.alt?.tokens?.color) delete siteDraft.theme.alt.tokens.color['accent-text'];
      } else {
        siteDraft.theme.tokens.color['accent-text'] = paletteFallback('accent-text', lightPal);
        if (siteDraft.theme.alt?.auto) siteDraft.theme.alt.tokens.color = suggestAltColors();
      }
    });
  }

  function setFontToken(name, value) {
    siteMutate('theme', () => { siteDraft.theme.tokens.font[name] = value; });
  }

  function setRadiusToken(name, value) {
    siteMutate('theme', () => { siteDraft.theme.tokens.radius[name] = value; });
  }

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

  function setAltColorToken(name, value) {
    siteMutate(`edit:theme-alt-${name}`, () => {
      siteDraft.theme.alt.tokens.color[name] = value;
      // Setting a dark color yourself turns off the auto derivation.
      siteDraft.theme.alt.auto = false;
    });
  }

  function setThemeScheme(value) {
    siteMutate('theme', () => {
      if (value === 'light') delete siteDraft.theme.scheme;
      else siteDraft.theme.scheme = value;
    });
  }

  /** Light and dark mode on/off: creates (auto-derived) or removes the alt theme. */
  function setDualMode(on) {
    siteMutate('theme', () => {
      if (on) siteDraft.theme.alt = { auto: true, tokens: { color: suggestAltColors() } };
      else delete siteDraft.theme.alt;
    });
  }

  /** Dark colors: Auto (derived from the light ones) or Custom (set manually). */
  function setAltAuto(auto) {
    siteMutate('theme', () => {
      siteDraft.theme.alt ??= { tokens: { color: suggestAltColors() } };
      siteDraft.theme.alt.auto = auto;
      if (auto) siteDraft.theme.alt.tokens.color = suggestAltColors();
    });
  }

  /** The font dropdown's options: known stacks + any current custom one. */
  function fontOptions(which) {
    const cur = siteDraft.theme.tokens.font[which];
    return [
      ...(FONT_STACKS.some(([, v]) => v === cur) ? [] : [[cur, ta('opt.customFont')]]),
      ...FONT_STACKS.map(([name, value]) => [value, ta(name)]),
    ];
  }

  /** Corner radius from a slider (px). */
  const radiusNum = (v) => parseInt(v, 10) || 0;
  function setRadiusPx(name, n) { setRadiusToken(name, `${n}px`); }

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

  function toggleChrome() {
    chromeVisible = !chromeVisible;
    bridge?.sendChrome(chromeVisible);
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
    block.frames[key] = msg.frame;
    if (key === 'desktop') markDesktopChange(section, 'desktop-changed-after-mobile');
    store.save();
    updateDirty();
    if (selectedBlock?.blockId === msg.blockId) syncSelectedBlock();
  }

  /** Automatic height growth posted by plugin copies of the former data-block plugins (urd-grow):
   *  ONLY h changes, never x/y, so a dragged block is never teleported
   *  back. Coalesces with the block's edit (same undo step). */
  function handleGrow(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    const block = section?.blocks.find((b) => b.id === msg.blockId);
    if (!block?.frames?.desktop || block.frames.desktop.h === msg.h) return;
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
    pushHistory('move-block');
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
    bridge?.sendPage(pageId, store.data);
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
  /** w in percent of the section width, h in px (physical units). */
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
    map: { type: 'map', props: { location: '', zoom: 15, height: 320 }, w: 60, h: 360 },
    form: {
      type: 'form',
      props: {
        recipient: '', subject: '', mode: 'mailto', endpoint: '',
        submitLabel: ta('form.sendDefault'), successText: ta('form.thanksDefault'),
        fields: defaultFormFields(),
      },
      w: 50, h: 380,
    },
    calendar: { type: 'calendar', props: { sources: [], view: 'list', limit: 6, showCategories: true, showSubscribe: true }, w: 60, h: 320 },
    'calendar-cards': { type: 'calendar', props: { sources: [], view: 'cards', limit: 6, showCategories: true, showSubscribe: true }, w: 88, h: 320 },
    'calendar-month': { type: 'calendar', props: { sources: [], view: 'month', limit: 6, showCategories: true, showSubscribe: true }, w: 88, h: 480 },
    'calendar-next': { type: 'calendar', props: { sources: [], view: 'next', limit: 6, showCategories: true, showSubscribe: true }, w: 40, h: 180 },
    icon: { type: 'icon', decor: true, hideMobile: true, props: { glyph: '★', color: 'accent', size: 48 }, w: 8, h: 64 },
    collection: { type: 'collection', props: { collection: null, view: 'cards', limit: 6, newestFirst: true }, w: 90, h: 200 },
    gallery: { type: 'gallery', props: { images: [], view: 'grid', columns: 3, gap: 12, radius: 'md', lightbox: true, interval: 5 }, w: 90, h: 320 },
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
    product: { type: 'product', props: { collection: null, limit: 0, columns: 0, currency: 'kr' }, w: 90, h: 300 },
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

  function addBlock(kind) {
    requestPlacement(buildBlock(kind));
  }

  /** The plugin blocks in the Blocks panel: the preview reported
   *  type/label/defaults at plugin load (urd-plugin-blocks), so the block
   *  can be built here. */
  let pluginBlocks = $state([]);
  /** Core blocks whose Content panel is the field contract (the same
   *  renderer as plugin fields): place search, numbers, toggles, selects. */
  const CORE_FIELDS = {
    map: [
      { key: 'location', type: 'place', label: ta('lbl.mapLocation'), placeholder: ta('ph.mapLocation') },
      { key: 'zoom', type: 'number', label: ta('lbl.mapZoom'), min: 1, max: 19 },
      { key: 'height', type: 'number', label: ta('lbl.mapHeight'), min: 120, max: 900, step: 10 },
    ],
  };

  function addPluginBlock(entry, extraProps = {}) {
    // pluginBlocks is $state: structuredClone on a reactive proxy throws
    // DataCloneError (same trap as postMessage). Snapshot yields plain
    // objects; it also works on non-reactive values.
    const raw = $state.snapshot(entry);
    requestPlacement({
      id: makeId('blk'),
      type: raw.type,
      version: raw.version ?? 1,
      decor: false,
      props: { ...(raw.defaults ?? {}), ...$state.snapshot(extraProps) },
      animation: null,
      frames: { desktop: { x: 25, y: 40, w: 50, h: 260, z: 1, rot: 0 }, mobile: null },
    });
  }

  /* The block search in the panel (a flat hit list). The index is built
     from the VISIBLE labels the panel already shows: core blocks, shapes,
     block-group templates and plugin blocks (variants flattened). */
  let blockSearch = $state('');

  function panelBlockItems() {
    const items = [
      { label: ta('blocks.text'), act: 'block', kind: 'text' },
      { label: ta('ui.textBox'), act: 'block', kind: 'text-box' },
      { label: ta('blocks.button'), act: 'block', kind: 'button' },
      { label: ta('blocks.image'), act: 'image' },
      { label: ta('blocks.video'), act: 'block', kind: 'video' },
      { label: ta('blocks.icon'), act: 'block', kind: 'icon' },
      { label: ta('blocks.map'), act: 'block', kind: 'map' },
      { label: ta('blocks.form'), act: 'block', kind: 'form' },
      { label: `${ta('blocks.calendar')}: ${ta('calendar.viewList')}`, act: 'block', kind: 'calendar' },
      { label: `${ta('blocks.calendar')}: ${ta('calendar.viewCards')}`, act: 'block', kind: 'calendar-cards' },
      { label: `${ta('blocks.calendar')}: ${ta('calendar.viewMonth')}`, act: 'block', kind: 'calendar-month' },
      { label: `${ta('blocks.calendar')}: ${ta('calendar.viewNext')}`, act: 'block', kind: 'calendar-next' },
      { label: ta('blocks.collection'), act: 'block', kind: 'collection' },
      { label: ta('blocks.faq'), act: 'block', kind: 'faq' },
      { label: ta('blocks.timeline'), act: 'block', kind: 'timeline' },
      { label: ta('blocks.quote'), act: 'block', kind: 'quote' },
      { label: ta('blocks.stats'), act: 'block', kind: 'stats' },
      { label: ta('blocks.table'), act: 'block', kind: 'table' },
      { label: ta('blocks.share'), act: 'block', kind: 'share' },
      { label: ta('blocks.countdown'), act: 'block', kind: 'countdown' },
      { label: ta('blocks.audio'), act: 'block', kind: 'audio' },
      { label: ta('blocks.product'), act: 'block', kind: 'product' },
      { label: ta('blocks.cart'), act: 'block', kind: 'cart' },
      { label: ta('blocks.checkout'), act: 'block', kind: 'checkout' },
      { label: ta('ui.emptyGallery'), act: 'block', kind: 'gallery' },
      { label: ta('ui.galleryWithImages'), act: 'galleryImages' },
      { label: ta('shape.line'), act: 'block', kind: 'shape-line' },
      { label: ta('shape.arrow'), act: 'block', kind: 'shape-arrow' },
      { label: ta('shape.circle'), act: 'block', kind: 'shape-circle' },
      { label: ta('shape.rect'), act: 'block', kind: 'shape-rect' },
      { label: ta('shape.triangle'), act: 'block', kind: 'shape-triangle' },
    ];
    for (const id of templateIds) {
      const tpl = templateStores[id]?.data?.mal;
      if (tpl?.kind === 'blocks') items.push({ label: tpl.name, act: 'template', id });
    }
    for (const entry of pluginBlocks) {
      if (entry.variants?.length) {
        for (const variant of entry.variants) {
          items.push({ label: `${entry.label}: ${variant.label}`, act: 'plugin', entry, props: variant.props });
        }
      } else {
        items.push({ label: entry.label, act: 'plugin', entry });
      }
    }
    return items;
  }

  function runPanelItem(item) {
    if (item.act === 'block') addBlock(item.kind);
    else if (item.act === 'plugin') addPluginBlock(item.entry, item.props ?? {});
    else if (item.act === 'template') bridge?.sendInsertTemplate(item.id);
  }

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

  /** + Image: compress to webp and put in the draft as a data URL.
   *  On publish it is materialized to a file in media/. */
  async function addImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setStatus(ta('status.compressingImage'));
    let img;
    try {
      img = await compressOrTrim(file);
    } catch {
      setStatus(ta('status.imageReadError'), 'error');
      return;
    }

    // Start width 30 % of the section; the height follows the image's
    // aspect ratio with an assumed section width (freely adjusted afterwards anyway).
    const height = Math.round((img.height / img.width) * 0.3 * (iframeEl?.clientWidth ?? 1280));
    requestPlacement({
      id: makeId('blk'),
      type: 'image',
      version: 1,
      props: { src: img.dataUrl, alt: slugify(file.name).replaceAll('-', ' '), fit: 'cover', radius: 'md', href: null },
      animation: null,
      frames: { desktop: { x: 4, y: 8, w: 30, h: Math.max(40, height), z: 1, rot: 0 }, mobile: null },
    });
    if (img.bytes > WARN_BYTES) {
      setStatus(ta('status.imageLarge', { kb: Math.round(img.bytes / 1024) }), 'error');
    } else {
      setStatus('');
    }
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

  /** "Gallery with images" in the palette: build the block pre-filled. */
  async function addGalleryBlock(event) {
    const files = [...(event.target.files ?? [])];
    event.target.value = '';
    if (!files.length) return;
    setStatus(ta('status.compressingImages'));
    const { images, failed, big } = await compressMany(files);
    if (!images.length) {
      reportUpload(0, failed, big);
      return;
    }
    const block = buildBlock('gallery');
    block.props.images = images;
    requestPlacement(block);
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

  /** The background layers' images (image + slideshow) - shared by section, nav and footer. */
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
      {#if chromeVisible}
        <nav class="rail">
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
                <!-- The Screen device (ADR-0018 addendum): its own window
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
          <aside class="panel" bind:this={panelEl}>
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
              <div class="panel-body">
                {#each siteDraft.pages as p (p.id)}
                  <div class="page-row" class:current={p.id === pageId}>
                    <input class="page-title" value={p.title} title={ta('tip.pages.title')}
                      onchange={(e) => renamePage(p, e.target.value)} />
                    {#if p.path === '/'}
                      <span class="page-path" title={ta('tip.pages.homeLocked')}>/</span>
                    {:else}
                      <input class="page-slug" value={p.path.slice(1)} title={ta('tip.pages.slug')}
                        onchange={(e) => setPageSlug(p, e.target.value)} />
                    {/if}
                    {#if missingSeo[p.id]}
                      <span class="seo-warn" title={ta('tip.pages.missingDescription')}>{@html ICONS.warn}</span>
                    {/if}
                    <span class="row-tools">
                      <button class="ghost row-tool" title={ta('tip.pages.open')}
                        disabled={p.id === pageId} onclick={() => selectPage(p.id)}>{@html ICONS.right}</button>
                      <span class="page-menu-wrap">
                        <button class="ghost row-tool" title={ta('tip.pages.menu')}
                          onclick={() => (pageMenuFor = pageMenuFor === p.id ? null : p.id)}>{@html ICONS.kebab}</button>
                        {#if pageMenuFor === p.id}
                          <div class="page-menu">
                            <button class="ghost" onclick={() => savePageAsTemplate(p)}>
                              {@html ICONS.bookmark} {ta('ui.savePageTemplate')}</button>
                            {#if p.path !== '/'}
                              <button class="ghost danger" title={ta('tip.pages.delete')}
                                onclick={() => { pageMenuFor = null; deletePage(p); }}>
                                {@html ICONS.cross} {ta('ui.deletePage')}</button>
                            {/if}
                          </div>
                        {/if}
                      </span>
                    </span>
                  </div>
                {/each}
                <details class="group">
                  <summary>{ta('ui.seoGroup', { page: siteDraft.pages.find((p) => p.id === pageId)?.title ?? '' })}</summary>
                  <div class="group-items">
                    <label title={ta('tip.seo.description')}>{ta('lbl.seoDescription')}
                      <textarea rows="2" value={seoDraft.description}
                        onchange={(e) => setPageSeo('description', e.target.value)}></textarea>
                    </label>
                    <label title={ta('tip.seo.ogTitle')}>{ta('lbl.ogTitle')}
                      <input value={seoDraft.ogTitle}
                        placeholder={siteDraft.pages.find((p) => p.id === pageId)?.title ?? ''}
                        onchange={(e) => setPageSeo('ogTitle', e.target.value)} />
                    </label>
                    <label title={ta('tip.seo.ogDescription')}>{ta('lbl.ogDescription')}
                      <textarea rows="2" value={seoDraft.ogDescription} placeholder={seoDraft.description}
                        onchange={(e) => setPageSeo('ogDescription', e.target.value)}></textarea>
                    </label>
                    <label title={ta('tip.seo.ogImage')}>{ta('lbl.ogImage')}
                      {#if seoDraft.ogImage}
                        <img class="site-icon-preview" src={seoDraft.ogImage} alt={ta('lbl.ogImage')} />
                      {/if}
                    </label>
                    <span class="toolbar-row">
                      <label class="ghost filepick tb-grow" title={ta('tip.seo.ogImage')}>
                        {seoDraft.ogImage ? ta('ui.changeImage') : ta('ui.chooseImage')}
                        <input type="file" accept="image/*" onchange={uploadOgImage} />
                      </label>
                      {#if seoDraft.ogImage}
                        <button class="ghost row-tool" title={ta('tip.seo.removeOgImage')}
                          onclick={() => setPageSeo('ogImage', '')}>{@html ICONS.cross}</button>
                      {/if}
                    </span>
                    <label class="gridmenu-snap" title={ta('tip.seo.hideFromSearch')}>
                      <input type="checkbox"
                        checked={siteDraft.pages.find((p) => p.id === pageId)?.noindex === true}
                        onchange={(e) => setPageNoindex(e.target.checked)} />
                      {ta('lbl.hideFromSearch')}
                    </label>
                  </div>
                </details>
                <hr class="gridmenu-divider" />
                <input placeholder={ta('ph.newPageName')} bind:value={newPageTitle}
                  onkeydown={(e) => e.key === 'Enter' && addPage()} />
                <button class="ghost action" title={ta('hint.pages.autoMenu')}
                  onclick={addPage} disabled={!newPageTitle.trim()}>{ta('ui.createPage')}</button>
                <span class="mini-label">{ta('canvas.tabPresets')}</span>
                <div class="page-template-grid" style={thumbThemeStyle}>
                  <div class="page-template-card" class:picked={newPageTemplate === null}>
                    <button class="page-template-pick" title={ta('tip.pages.blankPick')}
                      onclick={() => (newPageTemplate = null)}>
                      <span class="page-template-thumb">{@html pageThumb({ sections: [] })}</span>
                      <span class="page-template-name">{ta('ui.blankPage')}</span>
                    </button>
                  </div>
                  {#each PAGE_PRESETS as p (p.id)}
                    <div class="page-template-card" class:picked={newPageTemplate === `preset:${p.id}`}>
                      <button class="page-template-pick" title={ta('tip.pages.templatePick', { name: ta(p.labelKey) })}
                        onclick={() => (newPageTemplate = newPageTemplate === `preset:${p.id}` ? null : `preset:${p.id}`)}>
                        <span class="page-template-thumb">{@html builtinPageThumbs[p.id]}</span>
                        <span class="page-template-name">{ta(p.labelKey)}</span>
                      </button>
                    </div>
                  {/each}
                </div>
                {#if templateIds.some((id) => templateStores[id]?.data?.mal?.kind === 'page')}
                  <span class="mini-label">{ta('canvas.tabMyTemplates')}</span>
                  <div class="page-template-grid" style={thumbThemeStyle}>
                    {#each templateIds.filter((id) => templateStores[id]?.data?.mal?.kind === 'page') as id (id)}
                      <div class="page-template-card" class:picked={newPageTemplate === id}>
                        <button class="page-template-pick" title={ta('tip.pages.templatePick', { name: templateStores[id].data.mal.name })}
                          onclick={() => (newPageTemplate = newPageTemplate === id ? null : id)}>
                          <span class="page-template-thumb">{@html pageThumb(templateStores[id].data.page)}</span>
                          <span class="page-template-name">{templateStores[id].data.mal.name}</span>
                        </button>
                        <button class="page-template-del" title={ta('canvas.deleteTemplate')}
                          onclick={() => handleDeleteTemplate({ id })}>{@html ICONS.cross}</button>
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            {:else if activePanel === 'nav'}
              <div class="panel-body">
                <details class="group">
                  <summary title={ta('hint.nav.logoHome')}>{ta('group.logo')}</summary>
                  <div class="group-items">
                    <Choice label={ta('common.type')} value={siteDraft.nav.logo?.type ?? 'text'}
                      options={[['text', ta('blocks.text')], ['image', ta('blocks.image')], ['both', ta('opt.logo.both')]]}
                      onchange={(v) => setLogoType(v)} />
                    {#if (siteDraft.nav.logo?.type ?? 'text') !== 'image'}
                      <input value={siteDraft.nav.logo?.value ?? ''} placeholder={ta('ph.nav.logoName')}
                        oninput={(e) => setLogo({ value: e.target.value })} />
                      <!-- Style row like a word processor: font | px | B I -->
                      <span class="toolbar-row">
                        <Dropdown title={ta('tip.nav.logoFont')}
                          value={siteDraft.nav.logo?.font ?? ''}
                          options={[['', ta('common.inherit')], ...FONT_STACKS.map(([name, value]) => [value, ta(name)])]}
                          onchange={(v) => setLogo({ font: v || undefined })} />
                        <input type="number" class="tb-num" min="8" max="96" placeholder="px"
                          title={ta('tip.nav.textSize')}
                          value={siteDraft.nav.logo?.textSize ?? ''}
                          onchange={(e) => setLogo({ textSize: e.target.value ? Number(e.target.value) : undefined })} />
                        <button class="tbtn" title={ta('format.bold')} class:active={siteDraft.nav.logo?.bold !== false}
                          onclick={() => setLogo({ bold: siteDraft.nav.logo?.bold === false })}><b>{ta('format.boldLetter')}</b></button>
                        <button class="tbtn" title={ta('format.italic')} class:active={Boolean(siteDraft.nav.logo?.italic)}
                          onclick={() => setLogo({ italic: !siteDraft.nav.logo?.italic })}><i>{ta('format.italicLetter')}</i></button>
                      </span>
                    {/if}
                    {#if (siteDraft.nav.logo?.type ?? 'text') !== 'text'}
                      {@const logoSrc = siteDraft.nav.logo?.type === 'image' ? siteDraft.nav.logo?.value : siteDraft.nav.logo?.image}
                      <!-- The image as a thumbnail beside its picker, then the three sizes on one row -->
                      <div class="logo-pick">
                        <span class="logo-thumb">
                          {#if logoSrc}<img src={logoSrc} alt="" />{/if}
                        </span>
                        <span class="logo-pick-col">
                          <label class="ghost filepick" title={ta('tip.webpAuto')}>
                            {logoSrc ? ta('ui.changeImage') : ta('ui.chooseImage')}
                            <input type="file" accept="image/*" onchange={uploadLogoImage} />
                          </label>
                          {#if logoSrc}<span class="logo-file">{logoSrc.split('/').pop()}</span>{/if}
                        </span>
                      </div>
                      <div class="ctl-triple">
                        <div class="ctl-field" title={ta('tip.nav.logoHeight')}>
                          <span class="mini-label">{ta('lbl.height')}</span>
                          <input type="number" class="tb-num" min="12" max="128"
                            value={siteDraft.nav.logo?.size ?? 32}
                            onchange={(e) => setLogo({ size: Number(e.target.value) })} />
                        </div>
                        <div class="ctl-field" title={ta('tip.nav.logoHeightMobile')}>
                          <span class="mini-label">{ta('lbl.onMobile')}</span>
                          <input type="number" class="tb-num" min={LOGO_SIZE.min} max={LOGO_SIZE.max} placeholder={ta('lbl.navSameAsDesktop')}
                            value={siteDraft.nav.logo?.mobileSize ?? ''}
                            onchange={(e) => {
                              const raw = e.target.value;
                              setLogo({ mobileSize: raw === '' ? undefined : clampRange(raw, LOGO_SIZE, undefined) });
                              e.target.value = siteDraft.nav.logo?.mobileSize ?? '';
                            }} />
                        </div>
                        <div class="ctl-field" title={ta('tip.nav.logoRadius')}>
                          <span class="mini-label">{ta('lbl.rounding')}</span>
                          <input type="number" class="tb-num" min="0" max="64"
                            value={siteDraft.nav.logo?.radius ?? 0}
                            onchange={(e) => setLogo({ radius: Number(e.target.value) })} />
                        </div>
                      </div>
                    {/if}
                    {#if siteDraft.nav.logo?.type === 'both'}
                      <Choice label={ta('lbl.order')} value={siteDraft.nav.logo?.order ?? 'image-first'}
                        options={[['image-first', ta('opt.logo.imageFirst')], ['text-first', ta('opt.logo.textFirst')]]}
                        onchange={(v) => setLogo({ order: v })} />
                    {/if}
                  </div>
                </details>
                <details class="group">
                  <summary>{ta('group.appearance')}</summary>
                  <div class="group-items">
                    <!-- Six section folds (the frame-group pattern): Layout, Size, Frame,
                         Behaviour, Colours and Background. Variant-bound rows sit
                         directly under the variant choice, and the mobile overrides
                         live inside Size behind a Screen | Phone switch. -->
                    <details class="group frame-group sub-fold">
                      <summary>{ta('group.navLayout')}</summary>
                      <div class="group-items">
                        <!-- The six menu forms as drawn tiles -->
                        <div class="ctl-field" title={ta('tip.nav.variant')}>
                          <span class="mini-label">{ta('lbl.navVariant')}</span>
                          <div class="tile-grid cols-3" role="group" aria-label={ta('lbl.navVariant')}>
                            {#each [['bar', ta('opt.navVariant.bar')], ['floating', ta('opt.navVariant.floating')], ['floating-square', ta('opt.navVariant.floatingSquare')], ['floating-tab', ta('opt.navVariant.floatingTab')], ['side-left', ta('opt.navVariant.sideLeft')], ['side-right', ta('opt.navVariant.sideRight')]] as [v, text] (v)}
                              <button type="button" class="tile" class:on={(siteDraft.nav.variant ?? 'bar') === v} aria-pressed={(siteDraft.nav.variant ?? 'bar') === v}
                                onclick={() => setNavVariant(v)}>{@html NAV_VARIANT_ICONS[v]}<span>{text}</span></button>
                            {/each}
                          </div>
                        </div>
                        <!-- The tool cluster (theme, cart, burger) at the end or the start of the bar -->
                        <Choice label={ta('lbl.toolsSide')} title={ta('tip.nav.toolsSide')} value={siteDraft.nav.style?.tools?.side ?? 'end'}
                          options={[['start', ta('opt.toolsSide.start')], ['end', ta('opt.toolsSide.end')]]}
                          onchange={(v) => setNavStyle('tools', v === 'start' ? { side: 'start' } : undefined)} />
                        {#if floatingVariant}
                          <!-- The floating menu's maximum width: the content width, or a px value (empty = 1100) -->
                          <Choice label={ta('lbl.navPillWidth')} title={ta('tip.nav.pillWidth')} value={siteDraft.nav.style?.pillWidth === 'content' ? 'content' : 'custom'}
                            options={[['content', ta('opt.pillWidth.content')], ['custom', ta('opt.pillWidth.custom')]]}
                            onchange={(v) => setNavStyle('pillWidth', v === 'content' ? 'content' : undefined)} />
                          {#if siteDraft.nav.style?.pillWidth !== 'content'}
                            <span class="toolbar-row" title={ta('tip.nav.pillWidthPx')}>
                              <span class="mini-label tb-grow">{ta('lbl.navPillWidthPx')}</span>
                              <input type="number" class="tb-num" min={PILL_WIDTH.min} max={PILL_WIDTH.max} step={PILL_WIDTH.step} placeholder="1100"
                                value={typeof siteDraft.nav.style?.pillWidth === 'number' ? siteDraft.nav.style.pillWidth : ''}
                                onchange={(e) => onNavSizeInput(e, 'pillWidth', PILL_WIDTH)} />
                            </span>
                          {/if}
                          <!-- The corner rounding as a value; empty = the variant's preset -->
                          <span class="toolbar-row" title={ta('tip.nav.radius')}>
                            <span class="mini-label tb-grow">{ta('lbl.navRadius')}</span>
                            <input type="number" class="tb-num" min={RADIUS.min} max={RADIUS.max} step={RADIUS.step}
                              placeholder={siteDraft.nav.variant === 'floating-square' ? '0' : siteDraft.nav.variant === 'floating-tab' ? '12' : '999'}
                              value={typeof siteDraft.nav.style?.radius === 'number' ? siteDraft.nav.style.radius : ''}
                              onchange={(e) => onNavSizeInput(e, 'radius', RADIUS)} />
                          </span>
                        {/if}
                        {#if sideVariant}
                          <Choice label={ta('lbl.navPlacement')} value={siteDraft.nav.style?.sidePlacement ?? 'top'}
                            options={[['top', ta('opt.place.top')], ['middle', ta('opt.place.middle')], ['bottom', ta('opt.place.bottom')]]}
                            onchange={(v) => setNavStyle('sidePlacement', v === 'top' ? undefined : v)} />
                        {:else}
                          <!-- Left means after the logo (the tip says so); the short words keep the segment on one row -->
                          <Choice label={ta('lbl.navPlacement')} title={ta('opt.layout.leftAfterLogo')} value={siteDraft.nav.layout ?? 'right'}
                            options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
                            onchange={(v) => setNavLayout(v)} />
                        {/if}
                        {#if floatingVariant}
                          <label class="gridmenu-snap" title={ta('tip.nav.glow')}>
                            <input type="checkbox" checked={siteDraft.nav.style?.glow === true}
                              onchange={(e) => setNavGlow(e.target.checked)} />
                            {ta('lbl.navGlow')}
                          </label>
                          <label class="gridmenu-snap" title={ta('tip.nav.topGap')}>
                            <input type="checkbox" checked={siteDraft.nav.style?.topGap !== false}
                              onchange={(e) => setNavTopGap(e.target.checked)} />
                            {ta('lbl.navTopGap')}
                          </label>
                        {/if}
                        {#if !floatingVariant && !sideVariant}
                          <label class="gridmenu-snap" title={ta('tip.nav.overlay')}>
                            <input type="checkbox" checked={siteDraft.nav.overlay === true}
                              onchange={(e) => siteMutate('nav', () => { if (e.target.checked) siteDraft.nav.overlay = true; else delete siteDraft.nav.overlay; })} />
                            {ta('lbl.navOverlay')}
                          </label>
                          <label class="gridmenu-snap" title={ta('tip.nav.inset')}>
                            <input type="checkbox" checked={siteDraft.nav.style?.inset === true}
                              onchange={(e) => setNavStyle('inset', e.target.checked ? true : undefined)} />
                            {ta('lbl.navInset')}
                          </label>
                        {/if}
                        {#if sideVariant}
                          <Choice label={ta('lbl.textAlign')} title={ta('tip.nav.sideAlign')} value={siteDraft.nav.style?.sideAlign ?? 'left'}
                            options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
                            onchange={(v) => setNavStyle('sideAlign', v === 'left' ? undefined : v)} />
                          <!-- The column width as a number, next to the drag at the column edge (250 = the default, not stored) -->
                          <span class="toolbar-row" title={ta('tip.nav.colWidth')}>
                            <span class="mini-label tb-grow">{ta('lbl.navColWidth')}</span>
                            <input type="number" class="tb-num" min={COL_WIDTH.min} max={COL_WIDTH.max}
                              value={siteDraft.nav.style?.width ?? 250}
                              onchange={(e) => {
                                const w = clampRange(e.target.value, COL_WIDTH, 250);
                                setNavStyle('width', w === 250 ? undefined : w);
                                e.target.value = siteDraft.nav.style?.width ?? 250;
                              }} />
                          </span>
                        {/if}
                      </div>
                    </details>
                    <hr class="gridmenu-divider" />
                    <details class="group frame-group sub-fold">
                      <summary title={ta('tip.nav.sizePreset')}>{ta('lbl.size')}</summary>
                      <div class="group-items">
                        <!-- The four presets, then the free values that replace the
                             preset's parts: the sliders start where the bar renders,
                             and the number beside each is editable. The column has its
                             own padding, so it shows no thickness, side padding or item
                             spacing. The mobile overrides sit in the Mobile fold. -->
                        <div class="seg cw-seg" title={ta('tip.nav.sizePreset')}>
                          {#each SIZE_IDS as id (id)}
                            <button class:on={navSizePreset === id} onclick={() => setNavSizePreset(id)}>{ta(`opt.size.${id}`)}</button>
                          {/each}
                        </div>
                        <!-- The free values behind an Adjust fold, so the presets carry the fold -->
                        <details class="sub-inset">
                          <summary>{ta('lbl.adjust')}</summary>
                          <div class="sub-inset-body">
                        {#if !sideVariant}
                          <div class="ctl-row" title={ta('tip.nav.thickness')}>
                            <span class="mini-label ctl-name">{ta('lbl.navThickness')}</span>
                            <input type="range" min={PAD_Y.min} max={PAD_Y.max} step={PAD_Y.step}
                              value={navPadY}
                              oninput={(e) => setNavStyle('padY', e.target.valueAsNumber)} />
                            <input type="number" class="tb-num" min={PAD_Y.min} max={PAD_Y.max}
                              value={navPadY}
                              onchange={(e) => onNavSizeField(e, 'padY', PAD_Y)} />
                          </div>
                        {/if}
                        <div class="ctl-row" title={ta('tip.nav.menuTextSize')}>
                          <span class="mini-label ctl-name">{ta('lbl.navTextSize')}</span>
                          <input type="range" min={TEXT_SIZE.min} max={TEXT_SIZE.max} step={TEXT_SIZE.step}
                            value={navTextSize}
                            oninput={(e) => setNavStyle('textSize', e.target.valueAsNumber)} />
                          <input type="number" class="tb-num" min={TEXT_SIZE.min} max={TEXT_SIZE.max}
                            value={navTextSize}
                            onchange={(e) => onNavSizeField(e, 'textSize', TEXT_SIZE)} />
                        </div>
                        {#if !sideVariant}
                          <div class="ctl-pair">
                            <div class="ctl-field" title={ta('tip.nav.padX')}>
                              <span class="mini-label">{ta('lbl.navPadX')}</span>
                              <input type="number" class="tb-num" min={PAD_X.min} max={PAD_X.max} placeholder={ta('common.auto')}
                                value={siteDraft.nav.style?.padX ?? ''}
                                onchange={(e) => onNavSizeInput(e, 'padX', PAD_X)} />
                            </div>
                            <div class="ctl-field" title={ta('tip.nav.gap')}>
                              <span class="mini-label">{ta('lbl.navGap')}</span>
                              <input type="number" class="tb-num" min={GAP.min} max={GAP.max} placeholder={ta('common.auto')}
                                value={siteDraft.nav.style?.gap ?? ''}
                                onchange={(e) => onNavSizeInput(e, 'gap', GAP)} />
                            </div>
                          </div>
                        {/if}
                          </div>
                        </details>
                      </div>
                    </details>
                    <hr class="gridmenu-divider" />
                    <details class="group frame-group sub-fold">
                      <summary>{ta('group.navFrame')}</summary>
                      <div class="group-items">
                        {#if !sideVariant}
                          <!-- Border on the bar: the side as drawn tiles, then width and colour on one row once a side is chosen -->
                          <div class="ctl-field" title={ta('tip.nav.border')}>
                            <span class="mini-label">{ta('lbl.navBorder')}</span>
                            <div class="tile-grid cols-5" role="group" aria-label={ta('lbl.navBorder')}>
                              {#each [['', ta('common.none')], ['bottom', ta('opt.navBorder.bottom')], ['top', ta('opt.navBorder.top')], ['both', ta('opt.navBorder.both')], ['all', ta('opt.navBorder.all')]] as [v, text] (v)}
                                <button type="button" class="tile" class:on={(siteDraft.nav.style?.border?.side ?? '') === v} aria-pressed={(siteDraft.nav.style?.border?.side ?? '') === v}
                                  onclick={() => setNavStyle('border', v ? { ...(siteDraft.nav.style?.border ?? {}), side: v } : undefined)}>{@html NAV_BORDER_ICONS[v]}<span>{text}</span></button>
                              {/each}
                            </div>
                          </div>
                          {#if siteDraft.nav.style?.border?.side}
                            <span class="toolbar-row ctl-end">
                              <span class="mini-label" title={ta('tip.nav.borderWidth')}>{ta('lbl.navBorderWidth')}</span>
                              <input type="number" class="tb-num" min="1" max="8" title={ta('tip.nav.borderWidth')}
                                value={siteDraft.nav.style.border.width ?? 1}
                                onchange={(e) => {
                                  const w = clampRange(e.target.value, { min: 1, max: 8 }, 1);
                                  const border = { ...siteDraft.nav.style.border };
                                  if (w === 1) delete border.width; else border.width = w;
                                  setNavStyle('border', border);
                                  e.target.value = siteDraft.nav.style.border.width ?? 1;
                                }} />
                              <span class="mini-label" title={ta('tip.nav.borderColorPick')}>{ta('lbl.navBorderColor')}</span>
                              <ColorPicker value={siteDraft.nav.style.border.color ?? 'text'} tokens={themeSwatches()}
                                label={ta('tip.nav.borderColorPick')}
                                onchange={(hex) => setNavStyle('border', { ...siteDraft.nav.style.border, color: hex })} />
                            </span>
                          {/if}
                        {/if}
                        {#if !floatingVariant && !sideVariant}
                          <Choice label={ta('lbl.navShadow')} title={ta('tip.nav.shadow')} value={siteDraft.nav.style?.shadow ?? ''}
                            options={[['', ta('common.none')], ['soft', ta('opt.navShadow.soft')], ['strong', ta('opt.navShadow.strong')]]}
                            onchange={(v) => setNavStyle('shadow', v || undefined)} />
                        {/if}
                      </div>
                    </details>
                    <hr class="gridmenu-divider" />
                    <details class="group frame-group sub-fold">
                      <summary>{ta('group.navBehaviour')}</summary>
                      <div class="group-items">
                        <!-- Two cards: what happens when the page scrolls, and the cart -->
                        {#if !sideVariant}
                        <div class="mini-card">
                          <span class="mini-label">{ta('group.navScrolling')}</span>
                          <label class="gridmenu-snap" title={ta('tip.nav.sticky')}>
                            <input type="checkbox" checked={siteDraft.nav.sticky !== false}
                              onchange={(e) => siteMutate('nav', () => { siteDraft.nav.sticky = e.target.checked; })} />
                            {ta('lbl.navSticky')}
                          </label>
                          {#if siteDraft.nav.sticky !== false}
                            <Choice label={ta('lbl.navScroll')} title={ta('tip.nav.scroll')} value={siteDraft.nav.scroll ?? 'none'}
                              options={[['none', ta('opt.scroll.none')], ['shrink', ta('opt.scroll.shrink')], ['hide', ta('opt.scroll.hide')]]}
                              onchange={(v) => siteMutate('nav', () => {
                                if (v === 'none') delete siteDraft.nav.scroll; else siteDraft.nav.scroll = v;
                              })} />
                            {#if siteDraft.nav.scroll === 'shrink'}
                              <!-- The compact state: how much of the thickness remains, and whether the logo image follows -->
                              <div class="ctl-row" title={ta('tip.nav.shrinkTo')}>
                                <span class="mini-label ctl-name">{ta('lbl.navShrinkTo')}</span>
                                <input type="range" min="30" max="80" step="5"
                                  value={Math.round((siteDraft.nav.style?.shrinkTo ?? 0.5) * 100)}
                                  oninput={(e) => setNavShrinkTo(e.target.valueAsNumber)} />
                                <span class="gridmenu-value">{Math.round((siteDraft.nav.style?.shrinkTo ?? 0.5) * 100)}%</span>
                              </div>
                              {#if (siteDraft.nav.logo?.type ?? 'text') !== 'text'}
                                <label class="gridmenu-snap" title={ta('tip.nav.shrinkLogo')}>
                                  <input type="checkbox" checked={siteDraft.nav.style?.shrinkLogo === true}
                                    onchange={(e) => setNavStyle('shrinkLogo', e.target.checked ? true : undefined)} />
                                  {ta('lbl.navShrinkLogo')}
                                </label>
                              {/if}
                            {/if}
                          {/if}
                          <!-- Transparent at the top: the surface appears once the page is scrolled -->
                          <label class="gridmenu-snap" title={ta('tip.nav.atTop')}>
                            <input type="checkbox" checked={siteDraft.nav.style?.atTop === 'clear'}
                              onchange={(e) => setNavStyle('atTop', e.target.checked ? 'clear' : undefined)} />
                            {ta('lbl.navAtTop')}
                          </label>
                        </div>
                        {/if}
                        <div class="mini-card">
                          <span class="mini-label">{ta('lbl.cart')}</span>
                          <label class="gridmenu-snap" title={ta('tip.nav.cart')}>
                            <input type="checkbox" checked={siteDraft.nav.cart?.show === true}
                              onchange={(e) => siteMutate('nav', () => {
                                if (e.target.checked) siteDraft.nav.cart = { ...(siteDraft.nav.cart ?? {}), show: true };
                                else delete siteDraft.nav.cart;
                              })} />
                            {ta('lbl.showInMenu')}
                          </label>
                          {#if siteDraft.nav.cart?.show}
                            <label class="field-stack" title={ta('tip.cart.checkout')}>
                              <span class="mini-label">{ta('lbl.checkoutPage')}</span>
                              <Dropdown filled value={siteDraft.nav.cart?.href ?? ''}
                                options={[['', ta('common.none')], ...siteDraft.pages.map((p) => [p.path, p.title])]}
                                onchange={(v) => siteMutate('nav', () => {
                                  if (v) siteDraft.nav.cart.href = v; else delete siteDraft.nav.cart.href;
                                })} />
                            </label>
                          {/if}
                        </div>
                      </div>
                    </details>
                    <hr class="gridmenu-divider" />
                    <details class="group frame-group sub-fold">
                      <summary title={ta('tip.nav.mobileSame')}>{ta('group.mobile')}</summary>
                      <div class="group-items">
                        <!-- The mobile overrides of the size (empty = as on desktop),
                             then the burger's target, the full-screen menu's options
                             and surface, and the submenu behaviour; every field with
                             its label above, short ones two to a row -->
                        <div class="ctl-pair">
                          {#if !sideVariant}
                            <div class="ctl-field" title={ta('tip.nav.thickness')}>
                              <span class="mini-label">{ta('lbl.navThickness')}</span>
                              <input type="number" class="tb-num" min={PAD_Y.min} max={PAD_Y.max}
                                placeholder={ta('lbl.navSameAsDesktop')}
                                value={siteDraft.nav.style?.mobile?.padY ?? ''}
                                onchange={(e) => onNavMobileField(e, 'padY', PAD_Y)} />
                            </div>
                          {/if}
                          <div class="ctl-field" title={ta('tip.nav.menuTextSize')}>
                            <span class="mini-label">{ta('lbl.navTextSize')}</span>
                            <input type="number" class="tb-num" min={TEXT_SIZE.min} max={TEXT_SIZE.max}
                              placeholder={ta('lbl.navSameAsDesktop')}
                              value={siteDraft.nav.style?.mobile?.textSize ?? ''}
                              onchange={(e) => onNavMobileField(e, 'textSize', TEXT_SIZE)} />
                          </div>
                        </div>
                        <div class="ctl-pair">
                          <label class="field-stack" title={ta('tip.nav.mobileMenu')}>
                            <span class="mini-label">{ta('lbl.mobileMenu')}</span>
                            <Dropdown filled value={siteDraft.nav.style?.mobileMenu ?? 'dropdown'}
                              options={[['dropdown', ta('opt.mobileMenu.dropdown')], ['sheet', ta('opt.mobileMenu.sheet')]]}
                              onchange={(v) => setNavStyle('mobileMenu', v === 'dropdown' ? undefined : v)} />
                          </label>
                          {#if siteDraft.nav.style?.mobileMenu === 'sheet'}
                            <label class="field-stack" title={ta('tip.nav.sheetMotion')}>
                              <span class="mini-label">{ta('lbl.sheetMotion')}</span>
                              <Dropdown filled value={siteDraft.nav.style?.sheetMotion ?? 'top'}
                                options={['top', 'bottom', 'left', 'right', 'fade', 'none'].map((m) => [m, ta(`opt.sheetMotion.${m}`)])}
                                onchange={(v) => setNavStyle('sheetMotion', v === 'top' ? undefined : v)} />
                            </label>
                          {/if}
                        </div>
                        {#if siteDraft.nav.style?.mobileMenu === 'sheet'}
                          <label class="gridmenu-snap" title={ta('tip.nav.sheetLogo')}>
                            <input type="checkbox" checked={siteDraft.nav.style?.sheetLogo === true}
                              onchange={(e) => setNavStyle('sheetLogo', e.target.checked ? true : undefined)} />
                            {ta('lbl.sheetLogo')}
                          </label>
                          {#if siteDraft.theme?.alt?.tokens}
                            <label class="gridmenu-snap" title={ta('tip.nav.sheetTheme')}>
                              <input type="checkbox" checked={siteDraft.nav.style?.sheetTheme === true}
                                onchange={(e) => setNavStyle('sheetTheme', e.target.checked ? true : undefined)} />
                              {ta('lbl.sheetTheme')}
                            </label>
                          {/if}
                          {#if siteDraft.nav.cart?.show}
                            <label class="gridmenu-snap" title={ta('tip.nav.sheetCart')}>
                              <input type="checkbox" checked={siteDraft.nav.style?.sheetCart === true}
                                onchange={(e) => setNavStyle('sheetCart', e.target.checked ? true : undefined)} />
                              {ta('lbl.sheetCart')}
                            </label>
                          {/if}
                          {#if siteDraft.nav.style?.sheetTheme || siteDraft.nav.style?.sheetCart}
                            <label class="gridmenu-snap" title={ta('tip.nav.sheetToolLabels')}>
                              <input type="checkbox" checked={siteDraft.nav.style?.sheetToolLabels === true}
                                onchange={(e) => setNavStyle('sheetToolLabels', e.target.checked ? true : undefined)} />
                              {ta('lbl.sheetToolLabels')}
                            </label>
                          {/if}
                          <!-- The menu's own surface: colour, opacity and text colour; the blur as a switch -->
                          <div class="ctl-row" title={ta('tip.nav.sheetBg')}>
                            <span class="mini-label ctl-name">{ta('lbl.background')}</span>
                            <ColorPicker value={siteDraft.nav.style?.sheet?.bg ?? 'surface'} tokens={themeSwatches()}
                              label={ta('tip.nav.sheetBg')} onchange={(hex) => setNavSheet('bg', hex)} />
                            <input type="range" min="0" max="100" step="1" title={ta('tip.nav.sheetOpacity')}
                              value={Math.round((siteDraft.nav.style?.sheet?.bgOpacity ?? 0.85) * 100)}
                              oninput={(e) => setNavSheet('bgOpacity', e.target.valueAsNumber / 100)} />
                            <span class="gridmenu-value">{Math.round((siteDraft.nav.style?.sheet?.bgOpacity ?? 0.85) * 100)}%</span>
                          </div>
                          <label class="gridmenu-snap" title={ta('tip.nav.sheetBlur')}>
                            <input type="checkbox" checked={siteDraft.nav.style?.sheet?.blur ?? siteDraft.nav.style?.blur !== false}
                              onchange={(e) => setNavSheet('blur', e.target.checked)} />
                            {ta('lbl.sheetBlur')}
                          </label>
                          <label>{ta('lbl.textColor')}
                            <ColorPicker value={siteDraft.nav.style?.sheet?.textColor ?? siteDraft.nav.style?.textColor ?? 'text'} tokens={themeSwatches()}
                              label={ta('tip.nav.sheetTextColorPick')} onchange={(hex) => setNavSheet('textColor', hex)} /></label>
                        {/if}
                        {#if siteDraft.nav.items?.some((item) => item.children?.length)}
                          <label class="field-stack" title={ta('tip.nav.mobileSubs')}>
                            <span class="mini-label">{ta('lbl.mobileSubs')}</span>
                            <Dropdown filled value={siteDraft.nav.style?.mobileSubs ?? 'collapsed'}
                              options={[['collapsed', ta('opt.mobileSubs.collapsed')], ['expanded', ta('opt.mobileSubs.expanded')]]}
                              onchange={(v) => setNavStyle('mobileSubs', v === 'collapsed' ? undefined : v)} />
                          </label>
                        {/if}
                      </div>
                    </details>
                    <hr class="gridmenu-divider" />
                    <details class="group frame-group sub-fold">
                      <summary>{ta('group.navColours')}</summary>
                      <div class="group-items">
                        <!-- The hover styles as samples of a menu word drawn with each style -->
                        <div class="ctl-field">
                          <span class="mini-label">{ta('lbl.navHover')}</span>
                          <div class="tile-grid cols-5" role="group" aria-label={ta('lbl.navHover')}>
                            {#each [['standard', ta('opt.hover.standard')], ['underline', ta('opt.hover.underline')], ['pill', ta('opt.hover.pill')], ['lift-plain', ta('opt.hover.liftPlain')], ['lift', ta('opt.hover.lift')]] as [v, text] (v)}
                              <button type="button" class="tile hover-tile" class:on={(siteDraft.nav.style?.hover ?? 'standard') === v} aria-pressed={(siteDraft.nav.style?.hover ?? 'standard') === v}
                                onclick={() => setNavHover(v)}><span class="hover-sample hover-{v}">{ta('seed.home')}</span><span>{text}</span></button>
                            {/each}
                          </div>
                        </div>
                        {#if siteDraft.nav.style?.hover === 'lift'}
                          <div class="ctl-row" title={ta('tip.nav.hoverGlow')}>
                            <span class="mini-label ctl-name">{ta('lbl.glowStrength')}</span>
                            <input type="range" min="0.1" max="1" step="0.01"
                              value={siteDraft.nav.style?.hoverGlow ?? 0.6}
                              oninput={(e) => setNavStyle('hoverGlow', Number(e.target.value))} />
                            <span class="gridmenu-value">{Math.round((siteDraft.nav.style?.hoverGlow ?? 0.6) * 100)}%</span>
                          </div>
                        {/if}
                        <!-- The colours as a row of swatches with their names beneath -->
                        <div class="swatch-row">
                          {#if hoverColorLabel}
                            <div class="swatch-cell" title={hoverColorLabel[1]}>
                              <ColorPicker value={siteDraft.nav.style?.hoverColor ?? 'accent'} tokens={themeSwatches()}
                                label={hoverColorLabel[1]} onchange={(hex) => setNavStyle('hoverColor', hex)} />
                              <span class="mini-label">{hoverColorLabel[0]}</span>
                            </div>
                          {/if}
                          <div class="swatch-cell" title={ta('tip.nav.hoverTextColor')}>
                            <ColorPicker value={siteDraft.nav.style?.hoverTextColor ?? 'accent'} tokens={themeSwatches()}
                              label={ta('tip.nav.hoverTextColorPick')} onchange={(hex) => setNavStyle('hoverTextColor', hex)} />
                            <span class="mini-label">{ta('lbl.hoverTextColor')}</span>
                          </div>
                          <div class="swatch-cell" title={ta('tip.nav.textColorPick')}>
                            <ColorPicker value={siteDraft.nav.style?.textColor ?? 'text'} tokens={themeSwatches()}
                              label={ta('tip.nav.textColorPick')} onchange={(hex) => setNavStyle('textColor', hex)} />
                            <span class="mini-label">{ta('lbl.textColor')}</span>
                          </div>
                        </div>
                        <label class="gridmenu-snap" title={ta('tip.nav.blur')}>
                          <input type="checkbox" checked={siteDraft.nav.style?.blur !== false}
                            onchange={(e) => setNavStyle('blur', e.target.checked)} />
                          {ta('lbl.navBlur')}
                        </label>
                      </div>
                    </details>
                    <hr class="gridmenu-divider" />
                    <details class="group frame-group sub-fold">
                      <summary>{ta('lbl.background')}</summary>
                      <div class="group-items">
                        {@render backgroundLayers(navBgCtx, siteDraft.nav?.style?.background?.layers ?? [])}
                      </div>
                    </details>
                  </div>
                </details>
                <details class="group">
                  <summary title={ta('tip.nav.announce')}>{ta('group.announcement')}</summary>
                  <div class="group-items">
                    <!-- The strip above the menu: off by default, the fields appear when on -->
                    <label class="gridmenu-snap" title={ta('tip.nav.announce')}>
                      <input type="checkbox" checked={siteDraft.nav.announcement?.show === true}
                        onchange={(e) => setNavAnnouncement('show', e.target.checked ? true : undefined)} />
                      {ta('lbl.announceShow')}
                    </label>
                    {#if siteDraft.nav.announcement?.show}
                      <label class="field-stack" title={ta('tip.nav.announce')}>
                        <span class="mini-label">{ta('lbl.text')}</span>
                        <input type="text" class="field-filled" value={siteDraft.nav.announcement?.text ?? ''}
                          onchange={(e) => setNavAnnouncement('text', e.target.value.trim() || undefined)} />
                      </label>
                      <!-- A page from the register, or a free link with its own field -->
                      <label title={ta('tip.nav.announceLink')}>{ta('lbl.link')}
                        <Dropdown value={siteDraft.nav.announcement?.page ?? (siteDraft.nav.announcement?.href !== undefined ? 'custom' : '')}
                          options={[['', ta('common.none')], ...siteDraft.pages.map((p) => [p.id, p.title]), ['custom', ta('opt.announceLink.custom')]]}
                          onchange={(v) => siteMutate('edit:nav-announce-link', () => {
                            const next = { ...(siteDraft.nav.announcement ?? {}) };
                            delete next.page; delete next.href;
                            if (v === 'custom') next.href = '';
                            else if (v) next.page = v;
                            siteDraft.nav.announcement = next;
                          })} /></label>
                      {#if siteDraft.nav.announcement?.href !== undefined && !siteDraft.nav.announcement?.page}
                        <label class="field-stack" title={ta('tip.nav.announceHref')}>
                          <span class="mini-label">{ta('lbl.announceHref')}</span>
                          <input type="text" class="field-filled" placeholder="https://" value={siteDraft.nav.announcement?.href ?? ''}
                            onchange={(e) => setNavAnnouncement('href', e.target.value.trim())} />
                        </label>
                      {/if}
                      <!-- Only where the strip can scroll away: a sticky bar in the flow -->
                      {#if siteDraft.nav.sticky !== false && !floatingVariant && !sideVariant && !siteDraft.nav.overlay}
                        <label class="gridmenu-snap" title={ta('tip.nav.announceSticky')}>
                          <input type="checkbox" checked={siteDraft.nav.announcement?.sticky !== false}
                            onchange={(e) => setNavAnnouncement('sticky', e.target.checked ? undefined : false)} />
                          {ta('lbl.announceSticky')}
                        </label>
                      {/if}
                      {#if sideVariant}
                        <Choice label={ta('lbl.announcePlace')} title={ta('tip.nav.announcePlace')}
                          value={siteDraft.nav.announcement?.place ?? 'nav'}
                          options={[['nav', ta('opt.announcePlace.nav')], ['page', ta('opt.announcePlace.page')], ['content', ta('opt.announcePlace.content')]]}
                          onchange={(v) => setNavAnnouncement('place', v === 'nav' ? undefined : v)} />
                      {/if}
                      <label class="gridmenu-snap" title={ta('tip.nav.announceDismiss')}>
                        <input type="checkbox" checked={siteDraft.nav.announcement?.dismiss !== false}
                          onchange={(e) => setNavAnnouncement('dismiss', e.target.checked ? undefined : false)} />
                        {ta('lbl.announceDismiss')}
                      </label>
                      <label title={ta('tip.nav.announceColor')}>{ta('lbl.background')}
                        <ColorPicker value={siteDraft.nav.announcement?.color ?? 'accent'} tokens={themeSwatches()}
                          label={ta('tip.nav.announceColor')} onchange={(hex) => setNavAnnouncement('color', hex)} /></label>
                      <label title={ta('tip.nav.announceTextColor')}>{ta('lbl.textColor')}
                        <ColorPicker value={siteDraft.nav.announcement?.textColor ?? 'accent-text'} tokens={themeSwatches()}
                          label={ta('tip.nav.announceTextColor')} onchange={(hex) => setNavAnnouncement('textColor', hex)} /></label>
                    {/if}
                  </div>
                </details>
                <details class="group">
                  <summary>{ta('group.submenu')}</summary>
                  <div class="group-items">
                    <!-- Side variant: the submenus are accordions in the
                         column, so the card frame, flat surface and flyout
                         make no sense there -->
                    <!-- The designs as small drawings of the submenu hanging under its item -->
                    <div class="ctl-field">
                      <span class="mini-label">{ta('lbl.design')}</span>
                      <div class="tile-grid" class:cols-5={!sideVariant} class:cols-3={sideVariant} role="group" aria-label={ta('lbl.design')}>
                        {#each subStyleOptions as [v, text] (v)}
                          <button type="button" class="tile" class:on={(siteDraft.nav.style?.subStyle ?? 'card') === v} aria-pressed={(siteDraft.nav.style?.subStyle ?? 'card') === v}
                            onclick={() => setNavStyle('subStyle', v === 'card' ? undefined : v)}>{@html SUB_STYLE_ICONS[v]}<span>{text}</span></button>
                        {/each}
                      </div>
                    </div>
                    {#if siteDraft.nav.items?.some((item) => item.children?.length)}
                      <Choice label={ta('lbl.subOpen')} title={ta('tip.nav.subOpen')} value={siteDraft.nav.style?.subOpen ?? 'hover'}
                        options={[['hover', ta('opt.subOpen.hover')], ['stay', ta('opt.subOpen.stay')], ['click', ta('opt.subOpen.click')]]}
                        onchange={(v) => setNavStyle('subOpen', v === 'hover' ? undefined : v)} />
                    {/if}
                    {#if siteDraft.nav.style?.subStyle === 'pills'}
                      <label title={ta('tip.nav.subPillColor')}>{ta('lbl.subPillColor')}
                        <ColorPicker value={siteDraft.nav.style?.subPillColor ?? 'surface'} tokens={themeSwatches()}
                          label={ta('tip.nav.subPillColorPick')} onchange={(hex) => setNavStyle('subPillColor', hex)} /></label>
                    {/if}
                    <label title={ta('tip.nav.subColumns')}>{ta('lbl.columns')}
                      <input type="number" min="1" max="4" value={siteDraft.nav.style?.subColumns ?? 1}
                        onchange={(e) => setNavStyle('subColumns', Number(e.target.value) > 1 ? Number(e.target.value) : undefined)} /></label>
                  </div>
                </details>
                <details class="group">
                  <summary title={ta('hint.nav.submenu')}>{ta('group.menuItems')}</summary>
                  <div class="group-items">
                <!-- One compact row per item: grip, the name with its target beneath,
                     a submenu marker, and the actions as a small grid on the row under
                     the pointer or the selected one. Rows are reordered by dragging: a
                     faint clone of the row shows where it lands, the middle of a
                     top-level row takes it in as a child, and the grip column of a child
                     row leads back out to the top level. -->
                {#snippet navGhost(child)}
                  {@const g = navGhostText()}
                  <!-- The faint clone at the landing place -->
                  <div class="nav-item ghost" class:child aria-hidden="true">
                    <span class="nav-grip">{@html GRIP_ICON}</span>
                    <div class="nav-item-main">
                      <span class="nav-item-name ghost-name">{g.label}</span>
                      <span class="ghost-target">{g.target}</span>
                    </div>
                  </div>
                {/snippet}
                <div class="nav-list" role="list"
                  ondragover={onNavListDragOver}
                  ondrop={(e) => { e.preventDefault(); dropNavRow(navDrop?.key ?? ''); }}>
                {#each siteDraft.nav.items as item, i (i)}
                  {@const key = `${i}`}
                  {#if navDrop?.key === key && navDrop.pos === 'before'}{@render navGhost(false)}{/if}
                  <div class="nav-item" class:selected={navSel === key} class:dragging={navDrag === key} data-key={key}
                    class:drop-target={navDrop?.key === key && navDrop.pos === 'into'}
                    onclick={() => { navSel = key; }}>
                    <!-- The grip alone is draggable: a draggable row would take the mouse
                         from the name field's text selection. -->
                    <span class="nav-grip" title={ta('tip.nav.dragItem')} draggable="true"
                      ondragstart={(e) => { navDrag = key; e.dataTransfer?.setData('text/plain', key); }}
                      ondragend={endNavDrag}>{@html GRIP_ICON}</span>
                    <div class="nav-item-main">
                      <input class="nav-item-name" value={item.label} title={ta('tip.nav.itemLabel')}
                        oninput={(e) => setNavLabel(i, e.target.value)} />
                      <div class="nav-item-target">
                        <Dropdown compact value={item.page ?? (item.href != null ? '__href' : '__none')} title={ta('tip.linkTarget')}
                          options={[...siteDraft.pages.map((p) => [p.id, p.title]), ['__href', ta('opt.linkHref')],
                            ...(item.children ? [['__none', ta('opt.noLink')]] : [])]}
                          onchange={(v) => setNavTarget(i, v)} />
                        {#if !item.page && item.href != null}
                          <input class="nav-item-href" value={item.href} placeholder={ta('ph.hrefAnchor')}
                            title={ta('tip.hrefAnchor')}
                            onchange={(e) => setNavHref(i, e.target.value)} />
                        {/if}
                      </div>
                    </div>
                    {#if item.children?.length}<span class="nav-item-sub" title={ta('tip.nav.hasSubmenu')}>{@html SUB_ICON}</span>{/if}
                    <span class="nav-actions">
                      <button class="ghost nav-act" title={ta('tip.nav.addChild')}
                        onclick={() => addNavChild(i)}>{@html ICONS.plus}</button>
                      <button class="ghost nav-act" title={ta('tip.moveUp')} onclick={() => moveNavItem(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
                      <button class="ghost nav-act" title={ta('tip.nav.removeItem')}
                        onclick={() => removeNavItem(i)}>{@html ICONS.cross}</button>
                      <button class="ghost nav-act" title={ta('tip.moveDown')} onclick={() => moveNavItem(i, 1)}
                        disabled={i === siteDraft.nav.items.length - 1}>{@html ICONS.down}</button>
                    </span>
                    <button class="ghost row-tool nav-more" title={ta('tip.nav.itemActions')} aria-label={ta('tip.nav.itemActions')}
                      onclick={() => { navSel = key; }}>{@html ICONS.kebab}</button>
                  </div>
                  {#each item.children ?? [] as child, j (j)}
                    {@const ckey = `${i}.${j}`}
                    {#if navDrop?.key === ckey && navDrop.pos === 'before'}{@render navGhost(true)}{/if}
                    <div class="nav-item child" class:selected={navSel === ckey} class:dragging={navDrag === ckey} data-key={ckey}
                      onclick={(e) => { e.stopPropagation(); navSel = ckey; }}>
                      <span class="nav-grip" title={ta('tip.nav.dragItem')} draggable="true"
                        ondragstart={(e) => { e.stopPropagation(); navDrag = ckey; e.dataTransfer?.setData('text/plain', ckey); }}
                        ondragend={endNavDrag}>{@html GRIP_ICON}</span>
                      <div class="nav-item-main">
                        <input class="nav-item-name" value={child.label} title={ta('tip.nav.childLabel')}
                          oninput={(e) => setNavChildLabel(i, j, e.target.value)} />
                        <div class="nav-item-target">
                          <Dropdown compact value={child.page ?? '__href'} title={ta('tip.linkTarget')}
                            options={[...siteDraft.pages.map((p) => [p.id, p.title]), ['__href', ta('opt.linkHref')]]}
                            onchange={(v) => setNavChildTarget(i, j, v)} />
                          {#if !child.page}
                            <input class="nav-item-href" value={child.href ?? ''} placeholder={ta('ph.hrefAnchor')}
                              title={ta('tip.hrefAnchor')}
                              onchange={(e) => setNavChildHref(i, j, e.target.value)} />
                          {/if}
                        </div>
                      </div>
                      <span class="nav-actions">
                        <button class="ghost nav-act" title={ta('tip.moveUp')} onclick={() => moveNavChild(i, j, -1)} disabled={j === 0}>{@html ICONS.up}</button>
                        <button class="ghost nav-act" title={ta('tip.nav.removeChild')}
                          onclick={() => removeNavChild(i, j)}>{@html ICONS.cross}</button>
                        <button class="ghost nav-act" title={ta('tip.moveDown')} onclick={() => moveNavChild(i, j, 1)}
                          disabled={j === item.children.length - 1}>{@html ICONS.down}</button>
                      </span>
                      <button class="ghost row-tool nav-more" title={ta('tip.nav.itemActions')} aria-label={ta('tip.nav.itemActions')}
                        onclick={(e) => { e.stopPropagation(); navSel = ckey; }}>{@html ICONS.kebab}</button>
                    </div>
                    {#if navDrop?.key === ckey && navDrop.pos === 'after'}{@render navGhost(true)}{/if}
                  {/each}
                  {#if navDrop?.key === key && navDrop.pos === 'into'}{@render navGhost(true)}{/if}
                  {#if navDrop?.key === key && navDrop.pos === 'after'}{@render navGhost(false)}{/if}
                {/each}
                </div>
                    <button class="ghost action" onclick={addNavItem}>{ta('ui.addMenuItem')}</button>
                    <!-- A new blank page that goes straight into the menu -->
                    <span class="toolbar-row" title={ta('tip.nav.newPageAsItem')}>
                      <input class="tb-grow" placeholder={ta('ph.nav.newPageTitle')} bind:value={navNewPageTitle}
                        onkeydown={(e) => { if (e.key === 'Enter') addPageAsNavItem(); }} />
                      <button class="ghost action" disabled={!navNewPageTitle.trim()} onclick={addPageAsNavItem}>{ta('ui.newPageAsItem')}</button>
                    </span>
                  </div>
                </details>
              </div>
            {:else if activePanel === 'site'}
              <div class="panel-body">
                <label title={ta('tip.site.name')}>{ta('lbl.name')}
                  <input value={siteDraft.site.title ?? ''} placeholder={ta('ph.site.name')}
                    oninput={(e) => setSiteName(e.target.value)} />
                </label>
                <label title={ta('tip.site.description')}>{ta('lbl.description')}
                  <input value={siteDraft.site.description ?? ''} placeholder={ta('ph.site.description')}
                    oninput={(e) => setSiteDescription(e.target.value)} />
                </label>
                <label title={ta('site.langTitle')}>{ta('site.langLabel')}
                  <Dropdown value={siteLangValue()} options={siteLangOptions()}
                    onchange={(v) => setSiteLang(v)} /></label>
                <hr class="gridmenu-divider" />
                <p class="panel-strong" title={ta('tip.site.contentWidth')}>{ta('lbl.contentWidth')}</p>
                <!-- Live sample: one strip per common screen width, so it is
                     visible WHERE the width binds and where it goes fluid. -->
                <div class="sample cw-sample">
                  {#each widthBands as band (band.screen)}
                    <div class="cw-row">
                      <span class="mini-label cw-screen">{band.screen}</span>
                      <span class="cw-bar" class:fluid={!band.bound}>
                        <span class="cw-fill" style="width:{band.pct}%"></span>
                      </span>
                      <span class="gridmenu-value cw-margin">{band.bound ? `${band.margin}` : '-'}</span>
                    </div>
                  {/each}
                  <div class="cw-legend">
                    <span class="mini-label">{ta('lbl.screenPx')}</span>
                    <span class="mini-label">{ta('lbl.marginPx')}</span>
                  </div>
                  {#if layoutWidth !== 'full'}
                    <div class="mini-label cw-binds">{ta('lbl.bindsFrom', { n: bindsFrom })}</div>
                  {/if}
                </div>
                <div class="seg cw-seg">
                  {#each WIDTH_PRESETS as p (p.id)}
                    <button class:on={widthPreset === p.id}
                      onclick={() => setContentWidth(p.width)}>{ta(`lbl.width.${p.id}`)}</button>
                  {/each}
                </div>
                {#if layoutWidth !== 'full'}
                  <div class="ctl-row" title={ta('tip.site.contentWidthFree')}>
                    <span class="mini-label">{ta('lbl.widthFree')}</span>
                    <input type="range" min={WIDTH_MIN} max={WIDTH_MAX} step={WIDTH_STEP}
                      value={widthSlider}
                      oninput={(e) => setContentWidth(e.target.valueAsNumber)} />
                    <span class="gridmenu-value">{widthSlider} px</span>
                  </div>
                {/if}
                <p class="mini-label" title={ta('tip.site.gutter')}>{ta('lbl.gutter')}</p>
                <div class="seg cw-seg">
                  {#each GUTTER_PRESETS as p (p.id)}
                    <button class:on={gutterPreset === p.id}
                      onclick={() => setContentGutter(p.gutter)}>{ta(`lbl.gutter.${p.id}`)}</button>
                  {/each}
                </div>
                <details class="group" open={gutterPreset === null || gutterAdvanced}
                  ontoggle={(e) => (gutterAdvanced = e.currentTarget.open)}>
                  <summary>{ta('group.advanced')}</summary>
                  <div class="group-items">
                    <div class="ctl-row" title={ta('tip.site.gutterVw')}>
                      <span class="mini-label">{ta('lbl.gutterVw')}</span>
                      <input type="range" min={GUTTER_MIN} max={GUTTER_MAX} step={GUTTER_STEP}
                        value={layoutGutter}
                        oninput={(e) => setContentGutter(e.target.valueAsNumber)} />
                      <span class="gridmenu-value">{layoutGutter} vw</span>
                    </div>
                  </div>
                </details>
                <hr class="gridmenu-divider" />
                <label>{ta('lbl.siteIcon')}
                  {#if siteDraft.site.icon}
                    <img class="site-icon-preview" src={siteDraft.site.icon} alt={ta('lbl.siteIcon')} />
                  {/if}
                </label>
                <span class="toolbar-row">
                  <label class="ghost filepick tb-grow" title={ta('tip.site.icon')}>
                    {siteDraft.site.icon ? ta('ui.changeIcon') : ta('ui.chooseIcon')}
                    <input type="file" accept="image/*" onchange={uploadSiteIcon} />
                  </label>
                  {#if siteDraft.site.icon}
                    <button class="ghost row-tool" title={ta('tip.site.editIcon')}
                      onclick={() => (iconEditorImage = siteDraft.site.icon)}>{@html ICONS.pencil ?? '✎'}</button>
                    <button class="ghost row-tool" title={ta('tip.site.removeIcon')}
                      onclick={removeSiteIcon}>{@html ICONS.cross}</button>
                  {/if}
                </span>
              </div>
            {:else if activePanel === 'theme'}
              <div class="panel-body">
                {#snippet themePreview(pal, cap)}
                  <div class="theme-pvw">
                    {#if cap}<div class="mini-label tpv-cap">{cap}</div>{/if}
                    <div class="tpv-demo" style="--tv-bg:{themeHex(pal.bg, pal)};--tv-surface:{themeHex(pal.surface, pal)};--tv-text:{themeHex(pal.text, pal)};--tv-accent:{themeHex(pal.accent, pal)};--tv-accent-ink:{themeHex(pal['accent-text'] ?? readableOn(themeHex(pal.accent ?? '#000000', pal)), pal)}">
                      <div class="tpv-h">{ta('preview.heading')}</div>
                      <div class="tpv-card">{ta('preview.cardBody')}</div>
                      <div class="tpv-row"><span class="tpv-btn">{ta('preview.button')}</span><span class="tpv-lnk">{ta('preview.link')}</span></div>
                    </div>
                  </div>
                {/snippet}
                <p class="panel-strong">{ta('lbl.themePresets')}</p>
                <div class="theme-presets">
                  {#each THEME_PRESETS as pr (pr.id)}
                    <button type="button" class="theme-preset" class:sel={activeThemePreset === pr.id}
                      title={`${pr.name} - ${pr.note}`} onclick={() => applyThemePreset(pr)}>
                      <span class="tp-band">
                        <i style="background:{pr.light.bg}"></i><i style="background:{pr.light.surface}"></i><i style="background:{pr.light.accent}"></i><i style="background:{pr.light.text}"></i>
                      </span>
                      <small>{pr.name}</small>
                    </button>
                  {/each}
                </div>
                <p class="panel-strong">{ta('lbl.colors')}</p>
                <label class="gridmenu-snap" title={ta('tip.theme.dualMode')}>
                  <input type="checkbox" checked={dualMode}
                    onchange={(e) => setDualMode(e.target.checked)} />
                  {ta('lbl.dualMode')}
                </label>
                {#if dualMode}
                  <div class="ctl-row autorow">
                    <span class="autolbl">{ta('lbl.darkColors')}</span>
                    <span class="seg">
                      <button type="button" class:on={altAuto} title={ta('hint.theme.autoDark')}
                        onclick={() => setAltAuto(true)}>{ta('opt.auto')}</button>
                      <button type="button" class:on={!altAuto} onclick={() => setAltAuto(false)}>{ta('opt.custom')}</button>
                    </span>
                  </div>
                {/if}

                <div class="ctl-row palhead">
                  {#if dualMode}<span class="mini-label">{ta('lbl.light')}</span>{/if}
                  <button type="button" class="chip" class:accent={stdMode === 'light'}
                    title={ta('tip.theme.defaultScheme')} onclick={() => setThemeScheme('light')}>{ta('common.standard')}</button>
                </div>
                <div class="palcells">
                  {#each PALETTE_KEYS as [key, full, short] (key)}
                    <div class="palcol">
                      <ColorPicker value={siteDraft.theme.tokens.color[key] ?? paletteFallback(key, lightPal)}
                        tokens={themeSwatches()} label={full} onchange={(hex) => setColorToken(key, hex)} />
                      <span class="palcap">{short}</span>
                      <b class="palhex">{themeHex(siteDraft.theme.tokens.color[key] ?? paletteFallback(key, lightPal), lightPal)}</b>
                    </div>
                  {/each}
                </div>

                {#if dualMode}
                  <div class="ctl-row palhead">
                    <span class="mini-label">{ta('lbl.dark')}</span>
                    <button type="button" class="chip" class:accent={stdMode === 'dark'}
                      title={ta('tip.theme.darkDefault')} onclick={() => setThemeScheme('dark')}>{ta('common.standard')}</button>
                  </div>
                  <div class="palcells" class:autopal={altAuto}>
                    {#each PALETTE_KEYS as [key, full, short] (key)}
                      <div class="palcol">
                        <ColorPicker value={siteDraft.theme.alt.tokens.color[key] ?? darkPal[key] ?? paletteFallback(key, darkPal)}
                          tokens={themeSwatches()} label={ta('theme.darkColorLabel', { name: full })} onchange={(hex) => setAltColorToken(key, hex)} />
                        <span class="palcap">{short}</span>
                        <b class="palhex">{themeHex(siteDraft.theme.alt.tokens.color[key] ?? darkPal[key] ?? paletteFallback(key, darkPal), darkPal)}</b>
                      </div>
                    {/each}
                  </div>
                {/if}

                <!-- Auto for the text on accent: no token in either mode, the browser
                     picks black or white against the accent (contrast-color()). Its own
                     row below both palettes, since it applies to light and dark alike. -->
                <div class="ctl-row palauto-row" title={ta('tip.theme.accentTextAuto')}>
                  <span class="mini-label ctl-name">{ta('palette.accentText')}</span>
                  <button type="button" class="chip palauto" class:accent={accentTextAuto}
                    onclick={() => setAccentTextAuto(!accentTextAuto)}>{ta('opt.auto')}</button>
                </div>

                <div class="theme-previews">
                  {@render themePreview(lightPal, dualMode ? ta('lbl.light') : '')}
                  {#if dualMode}{@render themePreview(darkPal, ta('lbl.dark'))}{/if}
                </div>

                <details class="group">
                  <summary>{ta('group.typography')}</summary>
                  <div class="group-items">
                    <label>{ta('lbl.headings')}
                      <Dropdown value={siteDraft.theme.tokens.font.heading} options={fontOptions('heading')}
                        onchange={(v) => setFontToken('heading', v)} /></label>
                    <label>{ta('lbl.bodyText')}
                      <Dropdown value={siteDraft.theme.tokens.font.body} options={fontOptions('body')}
                        onchange={(v) => setFontToken('body', v)} /></label>
                    <div class="sample typo-sample">
                      <div class="ts-h" style="font-family:{siteDraft.theme.tokens.font.heading}">{ta('preview.heading')}</div>
                      <div class="ts-b" style="font-family:{siteDraft.theme.tokens.font.body}">{ta('preview.bodySample')}</div>
                    </div>
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.shape')}</summary>
                  <div class="group-items">
                    <div class="sample form-prev" style="--r-sm:{siteDraft.theme.tokens.radius.sm};--r-md:{siteDraft.theme.tokens.radius.md}">
                      <span class="fp-btn">{ta('preview.button')}</span>
                      <span class="fp-card">{ta('preview.card')}</span>
                    </div>
                    <label class="ctl-row">{ta('lbl.smallCorners')}<span class="gridmenu-value">{siteDraft.theme.tokens.radius.sm}</span></label>
                    <input type="range" min="0" max="24" step="1" value={radiusNum(siteDraft.theme.tokens.radius.sm)}
                      oninput={(e) => setRadiusPx('sm', Number(e.target.value))} />
                    <label class="ctl-row">{ta('lbl.largeCorners')}<span class="gridmenu-value">{siteDraft.theme.tokens.radius.md}</span></label>
                    <input type="range" min="0" max="40" step="1" value={radiusNum(siteDraft.theme.tokens.radius.md)}
                      oninput={(e) => setRadiusPx('md', Number(e.target.value))} /></div>
                </details>
              </div>
            {:else if activePanel === 'blocks'}
              <div class="panel-body" class:locked={viewMode === 'mobile'}
                title={viewMode === 'mobile' ? ta('tip.blocks.mobileLocked') : undefined}>
                <input type="text" bind:value={blockSearch}
                  placeholder={ta('canvas.searchBlocks')} title={ta('canvas.searchBlocks')} />
                {#if blockSearch.trim()}
                  <!-- An active search shows a flat, ranked hit list instead
                       of the groups. -->
                  {#each searchBlockItems(panelBlockItems(), blockSearch, (item) => item.label) as item (item.label)}
                    {#if item.act === 'image'}
                      <label class="ghost filepick" title={ta('tip.webpAuto')}>
                        {item.label}
                        <input type="file" accept="image/*" onchange={addImage} />
                      </label>
                    {:else if item.act === 'galleryImages'}
                      <label class="ghost filepick" title={ta('tip.blocks.galleryImages')}>
                        {item.label}
                        <input type="file" accept="image/*" multiple onchange={addGalleryBlock} />
                      </label>
                    {:else}
                      <button class="ghost" onclick={() => runPanelItem(item)}>{item.label}</button>
                    {/if}
                  {:else}
                    <p class="panel-hint">{ta('canvas.searchEmpty')}</p>
                  {/each}
                {:else}
                <details class="group">
                  <summary>{ta('blocks.text')}</summary>
                  <div class="group-items">
                    <button class="ghost" onclick={() => addBlock('text')}>{ta('blocks.text')}</button>
                    <button class="ghost" onclick={() => addBlock('text-box')}
                      title={ta('tip.blocks.textBox')}>{ta('ui.textBox')}</button>
                  </div>
                </details>
                <button class="ghost" onclick={() => addBlock('button')}>{ta('blocks.button')}</button>
                <label class="ghost filepick" title={ta('tip.webpAuto')}>
                  {ta('blocks.image')}
                  <input type="file" accept="image/*" onchange={addImage} />
                </label>
                <button class="ghost" title={ta('tip.blocks.video')}
                  onclick={() => addBlock('video')}>{ta('blocks.video')}</button>
                <button class="ghost" title={ta('tip.blocks.icon')}
                  onclick={() => addBlock('icon')}>{ta('blocks.icon')}</button>
                <button class="ghost" title={ta('tip.blocks.map')}
                  onclick={() => addBlock('map')}>{ta('blocks.map')}</button>
                <button class="ghost" title={ta('tip.blocks.form')}
                  onclick={() => addBlock('form')}>{ta('blocks.form')}</button>
                <button class="ghost" title={ta('tip.blocks.collection')}
                  onclick={() => addBlock('collection')}>{ta('blocks.collection')}</button>
                <button class="ghost" title={ta('tip.blocks.faq')}
                  onclick={() => addBlock('faq')}>{ta('blocks.faq')}</button>
                <button class="ghost" title={ta('tip.blocks.timeline')}
                  onclick={() => addBlock('timeline')}>{ta('blocks.timeline')}</button>
                <button class="ghost" title={ta('tip.blocks.quote')}
                  onclick={() => addBlock('quote')}>{ta('blocks.quote')}</button>
                <button class="ghost" title={ta('tip.blocks.stats')}
                  onclick={() => addBlock('stats')}>{ta('blocks.stats')}</button>
                <button class="ghost" title={ta('tip.blocks.table')}
                  onclick={() => addBlock('table')}>{ta('blocks.table')}</button>
                <button class="ghost" title={ta('tip.blocks.share')}
                  onclick={() => addBlock('share')}>{ta('blocks.share')}</button>
                <button class="ghost" title={ta('tip.blocks.countdown')}
                  onclick={() => addBlock('countdown')}>{ta('blocks.countdown')}</button>
                <button class="ghost" title={ta('tip.blocks.audio')}
                  onclick={() => addBlock('audio')}>{ta('blocks.audio')}</button>
                <button class="ghost" title={ta('tip.blocks.product')}
                  onclick={() => addBlock('product')}>{ta('blocks.product')}</button>
                <button class="ghost" title={ta('tip.blocks.cart')}
                  onclick={() => addBlock('cart')}>{ta('blocks.cart')}</button>
                <button class="ghost" title={ta('tip.blocks.checkout')}
                  onclick={() => addBlock('checkout')}>{ta('blocks.checkout')}</button>
                <details class="group">
                  <summary>{ta('blocks.gallery')}</summary>
                  <div class="group-items">
                    <button class="ghost" title={ta('tip.blocks.gallery')}
                      onclick={() => addBlock('gallery')}>{ta('ui.emptyGallery')}</button>
                    <label class="ghost filepick" title={ta('tip.blocks.galleryImages')}>
                      {ta('ui.galleryWithImages')}
                      <input type="file" accept="image/*" multiple onchange={addGalleryBlock} />
                    </label>
                  </div>
                </details>
                <details class="group">
                  <summary>{ta('blocks.calendar')}</summary>
                  <div class="group-items">
                    <button class="ghost" title={ta('tip.blocks.calendar')} onclick={() => addBlock('calendar')}>{ta('calendar.viewList')}</button>
                    <button class="ghost" title={ta('tip.blocks.calendar')} onclick={() => addBlock('calendar-cards')}>{ta('calendar.viewCards')}</button>
                    <button class="ghost" title={ta('tip.blocks.calendar')} onclick={() => addBlock('calendar-month')}>{ta('calendar.viewMonth')}</button>
                    <button class="ghost" title={ta('tip.blocks.calendar')} onclick={() => addBlock('calendar-next')}>{ta('calendar.viewNext')}</button>
                  </div>
                </details>
                <details class="group">
                  <summary>{ta('group.shapes')}</summary>
                  <div class="group-items">
                    <button class="ghost" onclick={() => addBlock('shape-line')}>{ta('shape.line')}</button>
                    <button class="ghost" onclick={() => addBlock('shape-arrow')}>{ta('shape.arrow')}</button>
                    <button class="ghost" onclick={() => addBlock('shape-circle')}>{ta('shape.circle')}</button>
                    <button class="ghost" onclick={() => addBlock('shape-rect')}>{ta('shape.rect')}</button>
                    <button class="ghost" onclick={() => addBlock('shape-triangle')}>{ta('shape.triangle')}</button>
                  </div>
                </details>
                {#if templateIds.some((id) => templateStores[id]?.data?.mal?.kind === 'blocks')}
                  {@const blockGroupTemplates = templateIds.filter((id) => templateStores[id]?.data?.mal?.kind === 'blocks')}
                  <details class="group">
                    <summary>{ta('canvas.tabMyTemplates')}</summary>
                    <div class="group-items">
                      {#each blockGroupTemplates as id (id)}
                        <button class="ghost" title={ta('canvas.insertGroup')}
                          onclick={() => bridge?.sendInsertTemplate(id)}>{templateStores[id].data.mal.name}</button>
                      {/each}
                    </div>
                  </details>
                {/if}
                {#if pluginBlocks.length}
                  <details class="group">
                    <summary>{ta('panel.plugins')}</summary>
                    <div class="group-items">
                      {#each pluginBlocks as entry (entry.type)}
                        {#if entry.variants?.length}
                          <details class="group">
                            <summary>{entry.label}</summary>
                            <div class="group-items">
                              {#each entry.variants as variant (variant.label)}
                                <button class="ghost" title={ta('tip.blocks.fromPlugin', { plugin: entry.plugin })}
                                  onclick={() => addPluginBlock(entry, variant.props)}>{variant.label}</button>
                              {/each}
                            </div>
                          </details>
                        {:else}
                          <button class="ghost" title={ta('tip.blocks.fromPlugin', { plugin: entry.plugin })}
                            onclick={() => addPluginBlock(entry)}>{entry.label}</button>
                        {/if}
                      {/each}
                    </div>
                  </details>
                {/if}
                {/if}
              </div>
            {:else if activePanel === 'grid'}
              <div class="panel-body">
                <label>
                  {ta('lbl.gridSize')}
                  <span class="gridmenu-value">{grid.size} px</span>
                </label>
                <input type="range" min="4" max="96" step="2" value={grid.size}
                  oninput={(e) => setGrid('size', Number(e.target.value))} />
                <label class="gridmenu-snap">
                  <input type="checkbox" checked={grid.snap !== false}
                    onchange={(e) => setGrid('snap', e.target.checked)} />
                  {ta('lbl.gridSnap')}
                </label>

              </div>
            {:else if activePanel === 'properties'}
              <div class="panel-body">
                {#if selectedBlock}
                  <p class="panel-strong">{ta('blocks.suffix', { label: BLOCK_LABELS[selectedBlock.type] ?? selectedBlock.type })}</p>
                  {@render blockPropsUI()}
                {:else if activeSectionId}
                  <p class="panel-strong">{ta('lbl.section')}</p>
                  <label title={ta('hint.props.minHeight')}>{ta('lbl.minHeight')}
                    <input class="token-input" value={sectionMinHeight} placeholder={ta('ph.minHeight')}
                      onchange={(e) => setSectionHeight(e.target.value)} /></label>
                  <hr class="gridmenu-divider" />
                  <label class="gridmenu-snap">
                    <input type="checkbox" checked={sectionGrid !== null}
                      onchange={(e) => toggleSectionGrid(e.target.checked)} />
                    {ta('lbl.sectionGrid')}
                  </label>
                  {#if sectionGrid}
                    <label>
                      {ta('lbl.gridSize')}
                      <span class="gridmenu-value">{sectionGrid.size} px</span>
                    </label>
                    <input type="range" min="4" max="96" step="2" value={sectionGrid.size}
                      oninput={(e) => setSectionGrid('size', Number(e.target.value))} />
                  {/if}

                  <hr class="gridmenu-divider" />
                  <p class="panel-strong" title={ta('tip.props.sectionTheme')}>{ta('lbl.sectionTheme')}</p>
                  <div class="rs-grid">
                    {#each [['', 'common.standard'], ...Object.entries(SECTION_THEME_LABELS)] as [id, key] (id)}
                      {@const c = sectionThemeSample(id)}
                      <button class="rs-card" class:on={sectionTheme === id}
                        title={ta('tip.props.sectionTheme')} onclick={() => setSectionTheme(id)}>
                        <span class="rs-sample" style="background: {c.bg}">
                          <i class="rs-line" style="background: {c.text}"></i>
                          <i class="rs-chip" style="background: {c.surface}"></i>
                          <i class="rs-dot" style="background: {c.accent}"></i>
                        </span>
                        <span class="rs-name">{ta(key)}</span>
                      </button>
                    {/each}
                  </div>
                  <label title={ta('tip.props.anchor')}>{ta('lbl.anchor')}
                    <span class="row-tools">
                      <span class="gridmenu-value">#{activeSectionId}</span>
                      <button class="ghost row-tool" title={ta('tip.props.copyAnchor')}
                        onclick={() => navigator.clipboard?.writeText(`#${activeSectionId}`)}>{@html ICONS.copy}</button>
                    </span></label>

                  <hr class="gridmenu-divider" />
                  <p class="panel-strong">{ta('lbl.background')}</p>
                  {@render backgroundLayers(sectionBgCtx, sectionBg)}

                  <hr class="gridmenu-divider" />
                  <label title={ta('tip.props.sectionAnim')}>{ta('lbl.animIn')}
                    <Dropdown value={isEntrance(sectionAnim) ? sectionAnim.type : ''}
                      options={ENTRANCE_OPTIONS}
                      onchange={(v) => setSectionAnimation(v || null)} /></label>
                  {#if isEntrance(sectionAnim)}
                    <label>{ta('lbl.durationMs')}
                      <input type="number" min="100" max="4000" step="100" value={sectionAnim.props.duration}
                        onchange={(e) => setSectionAnimProp('duration', Number(e.target.value))} /></label>
                    <label>{ta('lbl.delayMs')}
                      <input type="number" min="0" max="4000" step="100" value={sectionAnim.props.delay ?? 0}
                        onchange={(e) => setSectionAnimProp('delay', Number(e.target.value))} /></label>
                    {#if sectionAnim.type === 'stagger'}
                      <label title={ta('tip.props.staggerEffect')}>{ta('lbl.staggerEffect')}
                        <Dropdown value={sectionAnim.props.effect ?? 'slide-up'}
                          options={[['fade-in', ta('anim.fadeIn')], ['slide-up', ta('anim.slideUp')], ['zoom-in', ta('anim.zoomIn')]]}
                          onchange={(v) => setSectionAnimStr('effect', v)} /></label>
                      <label title={ta('tip.props.staggerStep')}>{ta('lbl.stepMs')}
                        <input type="number" min="0" max="1000" step="10" value={sectionAnim.props.step ?? 90}
                          onchange={(e) => setSectionAnimProp('step', Number(e.target.value))} /></label>
                      <label title={ta('tip.props.staggerPattern')}>{ta('lbl.pattern')}
                        <Dropdown value={sectionAnim.props.pattern ?? 'sequence'}
                          options={[['sequence', ta('opt.stagger.sequence')], ['columns', ta('opt.stagger.columns')],
                            ['rows', ta('opt.stagger.rows')], ['center', ta('opt.stagger.center')]]}
                          onchange={(v) => setSectionAnimStr('pattern', v)} /></label>
                    {/if}
                  {/if}
                  <label title={ta('tip.props.sectionHover')}>{ta('lbl.onHover')}
                    <Dropdown value={sectionHover?.type ?? (sectionAnim && !isEntrance(sectionAnim) ? sectionAnim.type : '')}
                      options={HOVER_OPTIONS}
                      onchange={(v) => setSectionHover(v || null)} /></label>
                {:else}
                  <p class="panel-hint">{ta('hint.props.empty')}</p>
                {/if}
              </div>
            {:else if activePanel === 'footer'}
              <div class="panel-body">
                <label class="gridmenu-snap" title={ta('tip.footer.show')}>
                  <input type="checkbox" checked={Boolean(siteDraft.footer?.show)}
                    onchange={(e) => footerMutate('footer', (f) => { f.show = e.target.checked; })} />
                  {ta('lbl.showFooter')}
                </label>

                {#if siteDraft.footer?.show}
                  <details class="group">
                    <summary>{ta('group.showOnPages')}</summary>
                    <div class="group-items">
                      {#each siteDraft.pages ?? [] as pg (pg.id)}
                        <label class="gridmenu-snap" title={ta('tip.footer.hideOnPage')}>
                          <input type="checkbox"
                            checked={!(siteDraft.footer?.hideOn ?? []).includes(pg.id)}
                            onchange={(e) => toggleFooterOnPage(pg.id, e.target.checked)} />
                          {pg.title || pg.id}
                        </label>
                      {/each}
                    </div>
                  </details>
                {/if}

                <details class="group">
                  <summary>{ta('group.startpoint')}</summary>
                  <div class="group-items">
                    <div class="footer-tpick">
                      {#each FOOTER_TEMPLATES as t (t.id)}
                        <button class="footer-tp" title={ta('tip.footer.template', { label: t.label })}
                          onclick={() => applyFooterTemplate(t.id)}>
                          <span class="footer-tp-thumb">{@html footerThumb(t.thumb)}</span>
                          <span class="footer-tp-name">{t.label}</span>
                        </button>
                      {/each}
                    </div>
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.brand')}</summary>
                  <div class="group-items">
                    <label title={ta('tip.footer.brandTitle')}>{ta('lbl.title')}
                      <input value={siteDraft.footer?.brand?.title ?? ''} placeholder={ta('ph.footer.brandTitle')}
                        oninput={(e) => setFooterBrand('title', e.target.value)} /></label>
                    <label title={ta('tip.footer.tagline')}>{ta('lbl.tagline')}
                      <input value={siteDraft.footer?.brand?.tagline ?? ''}
                        oninput={(e) => setFooterBrand('tagline', e.target.value)} /></label>
                    <label title={ta('tip.footer.brandMode')}>{ta('lbl.brandMode')}
                      <Dropdown value={siteDraft.footer?.brand?.mode ?? 'text'}
                        options={[['text', ta('blocks.text')], ['image', ta('opt.brand.image')], ['both', ta('opt.brand.both')]]}
                        onchange={(v) => setFooterBrandMode(v)} /></label>
                    {#if (siteDraft.footer?.brand?.mode ?? 'text') !== 'text'}
                      <span class="toolbar-row">
                        <label class="ghost filepick tb-grow" title={ta('tip.webpAutoPublish')}>
                          {siteDraft.footer?.brand?.logo ? ta('ui.changeLogo') : ta('ui.uploadLogo')}
                          <input type="file" accept="image/*" onchange={uploadFooterLogo} />
                        </label>
                        {#if siteDraft.footer?.brand?.logo}
                          <button class="ghost row-tool" title={ta('tip.footer.removeLogo')}
                            onclick={removeFooterLogo}>{@html ICONS.cross}</button>
                        {/if}
                      </span>
                      {#if siteDraft.footer?.brand?.logo}
                        <label>{ta('lbl.logoHeight')}
                          <span class="gridmenu-value">{siteDraft.footer?.brand?.logoHeight ?? 40} px</span></label>
                        <input type="range" min="16" max="160" step="2" value={siteDraft.footer?.brand?.logoHeight ?? 40}
                          oninput={(e) => setFooterLogoHeight(e.target.value)} />
                      {/if}
                    {/if}
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.columns')}</summary>
                  <div class="group-items">
                    {#each siteDraft.footer?.columns ?? [] as col, ci}
                      <div class="nav-row">
                        <input value={col.title} title={ta('tip.footer.columnTitle')}
                          oninput={(e) => setFooterColumnTitle(ci, e.target.value)} />
                        <span class="row-tools">
                          <button class="ghost row-tool" title={ta('tip.footer.addLink')}
                            onclick={() => addFooterLink(ci)}>{@html ICONS.plus}</button>
                          <button class="ghost row-tool" onclick={() => moveFooterColumn(ci, -1)} disabled={ci === 0}>{@html ICONS.up}</button>
                          <button class="ghost row-tool" onclick={() => moveFooterColumn(ci, 1)}
                            disabled={ci === siteDraft.footer.columns.length - 1}>{@html ICONS.down}</button>
                          <button class="ghost row-tool" title={ta('tip.footer.removeColumn')}
                            onclick={() => removeFooterColumn(ci)}>{@html ICONS.cross}</button>
                        </span>
                      </div>
                      {#each col.links ?? [] as link, li}
                        <div class="nav-row nav-sub-row">
                          <input value={link.label} title={ta('tip.linkLabel')}
                            oninput={(e) => setFooterLinkLabel(ci, li, e.target.value)} />
                          <span class="row-tools">
                            <button class="ghost row-tool" onclick={() => moveFooterLink(ci, li, -1)} disabled={li === 0}>{@html ICONS.up}</button>
                            <button class="ghost row-tool" onclick={() => moveFooterLink(ci, li, 1)}
                              disabled={li === col.links.length - 1}>{@html ICONS.down}</button>
                            <button class="ghost row-tool" title={ta('tip.removeLink')}
                              onclick={() => removeFooterLink(ci, li)}>{@html ICONS.cross}</button>
                          </span>
                          <span class="nav-target">
                            <Dropdown value={link.page ?? '__href'} title={ta('tip.linkTarget')}
                              options={[...siteDraft.pages.map((p) => [p.id, p.title]), ['__href', ta('opt.linkHref')]]}
                              onchange={(v) => setFooterLinkTarget(ci, li, v)} />
                          </span>
                          {#if !link.page}
                            <input class="nav-target" value={link.href ?? ''} placeholder={ta('ph.hrefAnchor')}
                              title={ta('tip.hrefAnchor')}
                              onchange={(e) => setFooterLinkHref(ci, li, e.target.value)} />
                          {/if}
                        </div>
                      {/each}
                    {/each}
                    <button class="ghost action" onclick={addFooterColumn}>{ta('ui.addColumn')}</button>
                    <label title={ta('tip.footer.columnsAlign')}>{ta('lbl.splitColumnAlign')}
                      <Dropdown value={siteDraft.footer?.columnsAlign ?? 'left'}
                        options={[['left', ta('common.left')], ['center', ta('common.center')]]}
                        onchange={(v) => setFooterColumnsAlign(v)} /></label>
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.social')}</summary>
                  <div class="group-items">
                    {#each siteDraft.footer?.social ?? [] as soc, si}
                      <div class="nav-row">
                        <span class="nav-line">
                          <span class="footer-soc-preview" aria-hidden="true">{@html iconSvg(soc.icon) || ''}</span>
                          <Dropdown value={soc.icon} title={ta('blocks.icon')} options={SOCIAL_ICON_OPTIONS}
                            onchange={(v) => setFooterSocialIcon(si, v)} />
                        </span>
                        <span class="row-tools">
                          <button class="ghost row-tool" onclick={() => moveFooterSocial(si, -1)} disabled={si === 0}>{@html ICONS.up}</button>
                          <button class="ghost row-tool" onclick={() => moveFooterSocial(si, 1)}
                            disabled={si === siteDraft.footer.social.length - 1}>{@html ICONS.down}</button>
                          <button class="ghost row-tool" title={ta('tip.removeLink')}
                            onclick={() => removeFooterSocial(si)}>{@html ICONS.cross}</button>
                        </span>
                        <input class="nav-target" value={soc.url} placeholder={ta('ph.hrefMailto')}
                          onchange={(e) => setFooterSocialUrl(si, e.target.value)} />
                      </div>
                    {/each}
                    <button class="ghost action" onclick={addFooterSocial}>{ta('ui.addSocial')}</button>
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.cta')}</summary>
                  <div class="group-items">
                    <label class="gridmenu-snap" title={ta('tip.footer.cta')}>
                      <input type="checkbox" checked={Boolean(siteDraft.footer?.cta)}
                        onchange={(e) => enableFooterCta(e.target.checked)} />
                      {ta('lbl.showCta')}
                    </label>
                    {#if siteDraft.footer?.cta}
                      {@const cta = siteDraft.footer.cta}
                      <label title={ta('tip.footer.ctaKind')}>{ta('common.type')}
                        <Dropdown value={cta.kind ?? 'button'}
                          options={[['button', ta('opt.cta.button')], ['newsletter', ta('opt.cta.newsletter')]]}
                          onchange={(v) => setFooterCtaField('kind', v)} /></label>
                      <label class="gridmenu-snap" title={ta('tip.footer.ctaBig')}>
                        <input type="checkbox" checked={cta.big === true}
                          onchange={(e) => setFooterCtaField('big', e.target.checked)} />
                        {ta('lbl.bigCentered')}
                      </label>
                      <label title={ta('tip.footer.ctaHeading')}>{ta('lbl.heading')}
                        <input value={cta.heading ?? ''} placeholder={ta('ph.footer.ctaHeading')}
                          oninput={(e) => setFooterCtaField('heading', e.target.value)} /></label>
                      <label title={ta('tip.footer.ctaSub')}>{ta('lbl.subText')}
                        <input value={cta.sub ?? ''}
                          oninput={(e) => setFooterCtaField('sub', e.target.value)} /></label>
                      <label title={ta('tip.footer.ctaLabel')}>{ta('lbl.buttonText')}
                        <input value={cta.label ?? ''} placeholder={ta('ph.footer.ctaLabel')}
                          oninput={(e) => setFooterCtaField('label', e.target.value)} /></label>
                      {#if (cta.kind ?? 'button') === 'button'}
                        <label title={ta('tip.footer.ctaTarget')}>{ta('lbl.buttonTarget')}
                          <Dropdown value={cta.page ?? '__href'}
                            options={[...siteDraft.pages.map((p) => [p.id, p.title]), ['__href', ta('opt.linkHrefMailto')]]}
                            onchange={(v) => setFooterCtaTarget(v)} /></label>
                        {#if !cta.page}
                          <input value={cta.href ?? ''} placeholder={ta('ph.hrefMailtoAnchor')}
                            title={ta('tip.hrefAnchor')}
                            onchange={(e) => setFooterCtaField('href', e.target.value)} />
                        {/if}
                      {:else}
                        <label title={ta('tip.footer.ctaEndpoint')}>{ta('lbl.newsletterEndpoint')}
                          <input value={cta.endpoint ?? ''} placeholder={ta('ph.endpoint')}
                            onchange={(e) => setFooterCtaField('endpoint', e.target.value)} /></label>
                        <label title={ta('tip.footer.ctaRecipient')}>{ta('lbl.recipientFallback')}
                          <input value={cta.recipient ?? ''} placeholder={ta('ph.email')}
                            onchange={(e) => setFooterCtaField('recipient', e.target.value)} /></label>
                        <label title={ta('tip.footer.ctaSuccess')}>{ta('lbl.confirmation')}
                          <input value={cta.success ?? ''} placeholder={ta('ph.footer.ctaSuccess')}
                            oninput={(e) => setFooterCtaField('success', e.target.value)} /></label>
                      {/if}
                    {/if}
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.linkRow')}</summary>
                  <div class="group-items">
                    {@render footerLinkList('linkRow', siteDraft.footer?.linkRow ?? [])}
                    <button class="ghost action" onclick={() => addFooterListLink('linkRow')}>{ta('ui.addRowLink')}</button>
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.appearance')}</summary>
                  <div class="group-items">
                    {#if siteDraft.footer?.cta?.big !== true}
                      <label title={ta('tip.footer.align')}>{ta('lbl.align')}
                        <Dropdown value={siteDraft.footer?.align ?? 'left'}
                          options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
                          onchange={(v) => footerMutate('footer', (f) => { f.align = v; })} /></label>
                      <hr class="gridmenu-divider" />
                    {/if}
                    <p class="panel-strong">{ta('lbl.background')}</p>
                    {@render backgroundLayers(footerBgCtx, siteDraft.footer?.background?.layers ?? [])}
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.baseline')}</summary>
                  <div class="group-items">
                    <label title={ta('tip.footer.copyright')}>{ta('lbl.copyright')}
                      <input value={siteDraft.footer?.copyright ?? ''} placeholder={ta('ph.footer.copyright')}
                        oninput={(e) => setFooterCopyright(e.target.value)} /></label>
                    <p class="panel-strong">{ta('lbl.baselineLinks')}</p>
                    {@render footerLinkList('baseline', siteDraft.footer?.baseline ?? [])}
                    <button class="ghost action" onclick={() => addFooterListLink('baseline')}>{ta('ui.addBaselineLink')}</button>
                  </div>
                </details>
              </div>
            {:else if activePanel === 'collections'}
              <div class="panel-body">
                {#if collectionIds.length}
                  <label>{ta('blocks.collection')}
                    <Dropdown value={activeCollection ?? ''}
                      options={[['', ta('common.choose')], ...collectionIds.map((id) => [id, collectionsView[id]?.name ?? id])]}
                      onchange={(v) => (activeCollection = v || null)} /></label>
                {/if}
                {#if activeCollection && collectionsView[activeCollection]}
                  {@const collectionView = collectionsView[activeCollection]}
                  <span class="toolbar-row">
                    <button class="ghost action" onclick={() => addCollectionEntry(activeCollection)}>{ta('ui.addEntry')}</button>
                    <button class="ghost action" title={ta('tip.collections.exportCsv')}
                      onclick={() => exportCollectionCsv(activeCollection)}>{ta('ui.exportCsv')}</button>
                    <label class="ghost filepick" title={ta('tip.collections.importCsv')}>
                      {ta('ui.importCsv')}
                      <input type="file" accept=".csv,text/csv" onchange={(e) => importCollectionCsv(activeCollection, e)} />
                    </label>
                    <button class="ghost row-tool" title={ta('tip.collections.deleteCollection')}
                      onclick={() => removeCollection(activeCollection)}>{@html ICONS.cross}</button>
                  </span>
                  {#each collectionView.entries as entry, i (entry.id)}
                    <!-- Collapsible entry: title + date in the summary, the fields inside (panel space) -->
                    <details class="group collection-entry">
                      <summary>{plainTitle(entry.title)}{collectionView.kind === 'products'
                        ? (entry.price != null ? ` · ${entry.price}` : '')
                        : (entry.date ? ` · ${entry.date}` : '')}</summary>
                      <div class="group-items">
                        <span class="toolbar-row">
                          <input value={entry.title} title={ta('lbl.title')}
                            onchange={(e) => setEntryField(activeCollection, entry.id, 'title', e.target.value || ta('ui.untitled'))} />
                          <span class="row-tools">
                            <button class="ghost row-tool" onclick={() => moveEntry(activeCollection, i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
                            <button class="ghost row-tool" onclick={() => moveEntry(activeCollection, i, 1)}
                              disabled={i === collectionView.entries.length - 1}>{@html ICONS.down}</button>
                            <button class="ghost row-tool" title={ta('tip.collections.deleteEntry')}
                              onclick={() => removeEntry(activeCollection, entry.id)}>{@html ICONS.cross}</button>
                          </span>
                        </span>
                        {#if collectionView.kind !== 'products'}
                          <label>{ta('lbl.date')}
                            <input type="date" value={entry.date ?? ''}
                              onchange={(e) => setEntryField(activeCollection, entry.id, 'date', e.target.value)} /></label>
                        {/if}
                        <textarea rows="3" placeholder={ta('ph.collections.text')}
                          value={entry.text ?? ''}
                          onchange={(e) => setEntryField(activeCollection, entry.id, 'text', e.target.value)}></textarea>
                        {#if collectionView.kind !== 'products'}
                          <label>{ta('lbl.link')}
                            <input value={entry.href ?? ''} placeholder={ta('ph.collections.href')}
                              onchange={(e) => setEntryField(activeCollection, entry.id, 'href', e.target.value)} /></label>
                        {/if}
                        <span class="toolbar-row">
                          <label class="ghost filepick">
                            {entry.image ? ta('ui.changeImage') : ta('ui.addImage')}
                            <input type="file" accept="image/*" onchange={(e) => setEntryImage(activeCollection, entry.id, e)} />
                          </label>
                          {#if entry.image}
                            <img class="site-icon-preview" src={entry.image} alt="" />
                            <button class="ghost row-tool" title={ta('tip.removeImage')}
                              onclick={() => setEntryField(activeCollection, entry.id, 'image', '')}>{@html ICONS.cross}</button>
                          {/if}
                        </span>
                        {#if collectionView.kind === 'products'}
                          <!-- The product fields (the shop): price, member price, badge, sizes and colors. -->
                          <label>{ta('lbl.price')}
                            <input type="number" min="0" step="0.01" value={entry.price ?? ''}
                              onchange={(e) => setEntryField(activeCollection, entry.id, 'price', e.target.value === '' ? '' : Number(e.target.value))} /></label>
                          <label title={ta('tip.entry.memberPrice')}>{ta('lbl.memberPrice')}
                            <input type="number" min="0" step="0.01" value={entry.memberPrice ?? ''}
                              onchange={(e) => setEntryField(activeCollection, entry.id, 'memberPrice', e.target.value === '' ? '' : Number(e.target.value))} /></label>
                          <label title={ta('tip.entry.badge')}>{ta('lbl.productBadge')}
                            <input value={entry.badge ?? ''}
                              onchange={(e) => setEntryField(activeCollection, entry.id, 'badge', e.target.value)} /></label>
                          <label title={ta('tip.entry.sizes')}>{ta('lbl.sizes')}
                            <input value={(entry.sizes ?? []).join(', ')} placeholder={ta('ph.sizes')}
                              onchange={(e) => setEntrySizes(activeCollection, entry.id, e.target.value)} /></label>
                          {#each entry.colors ?? [] as color, ci (ci)}
                            <span class="toolbar-row">
                              <input value={color.name} placeholder={ta('ph.colorName')}
                                onchange={(e) => setEntryColor(activeCollection, entry.id, ci, 'name', e.target.value)} />
                              <label class="ghost filepick">
                                {color.image ? ta('ui.changeImage') : ta('ui.addImage')}
                                <input type="file" accept="image/*" onchange={(e) => setEntryColorImage(activeCollection, entry.id, ci, e)} />
                              </label>
                              {#if color.image}
                                <img class="site-icon-preview" src={color.image} alt="" />
                              {/if}
                              <button class="ghost row-tool" onclick={() => removeEntryColor(activeCollection, entry.id, ci)}>{@html ICONS.cross}</button>
                            </span>
                          {/each}
                          <button class="ghost action" title={ta('tip.entry.colors')}
                            onclick={() => addEntryColor(activeCollection, entry.id)}>{ta('ui.addColor')}</button>
                        {/if}
                      </div>
                    </details>
                  {/each}
                  {#if !collectionView.entries.length}
                    <p class="panel-hint">{ta('hint.collections.empty')}</p>
                  {/if}
                  <hr class="gridmenu-divider" />
                {/if}
                <label>{ta('lbl.newCollectionName')}
                  <input bind:value={newCollectionName} placeholder={ta('ph.collections.name')}
                    onkeydown={(e) => e.key === 'Enter' && addCollection()} /></label>
                <label>{ta('common.type')}
                  <Dropdown value={newCollectionKind}
                    options={COLLECTION_KINDS}
                    onchange={(v) => (newCollectionKind = v)} /></label>
                <button class="ghost action" onclick={addCollection} disabled={!newCollectionName.trim()}>{ta('ui.createCollection')}</button>
              </div>
            {:else if activePanel === 'plugins'}
              <div class="panel-body">
                {#if !knownPlugins().length}
                  <p class="panel-hint">{ta('hint.plugins.empty')}</p>
                {/if}
                {#each knownPlugins() as id (id)}
                  {@const info = pluginInfo[id]}
                  {@const enabled = (pluginsView?.enabled ?? []).includes(id)}
                  <div class="plugin-row" class:plugin-broken={info?.errors?.length}>
                    <span class="plugin-head">
                      <span class="plugin-name">{info?.names?.[currentAdminLang()] ?? info?.name ?? id}</span>
                      {#if info?.version}<span class="plugin-meta">v{info.version}</span>{/if}
                      <span class="row-tools">
                        <label class="gridmenu-snap plugin-toggle" title={enabled ? ta('tip.plugins.on') : ta('tip.plugins.off')}>
                          <input type="checkbox" checked={enabled} disabled={Boolean(info?.errors?.length)}
                            onchange={(e) => setPluginEnabled(id, e.target.checked)} />
                          {enabled ? ta('ui.on') : ta('ui.off')}
                        </label>
                        <button class="ghost row-tool" title={ta('tip.plugins.remove')}
                          onclick={() => removePlugin(id)}>{@html ICONS.cross}</button>
                      </span>
                    </span>
                    {#if info?.errors?.length}
                      <p class="panel-hint plugin-warn">{info.errors.join('; ')}</p>
                    {:else if info && !info.satisfied}
                      <p class="panel-hint plugin-warn">{ta('plugin.engineMismatch', { required: info.requiresEngine, current: pluginEngine })}</p>
                    {:else if info?.csp && cspMissing(info.csp).length}
                      <p class="panel-hint plugin-warn">{ta('plugin.cspNeeded', { list: cspMissing(info.csp).join(', ') })}</p>
                    {/if}
                    {#if info?.languages?.length}
                      <p class="panel-hint">{ta('plugin.languages', { list: info.languages.map((l) => l.name).join(', ') })}</p>
                    {/if}
                  </div>
                {/each}
                {#if pluginsFound.length}
                  <hr class="gridmenu-divider" />
                  <p class="panel-strong">{ta('hint.plugins.found')}</p>
                  {#each pluginsFound as id (id)}
                    <div class="plugin-row">
                      <span class="plugin-head">
                        <span class="plugin-name">{pluginInfo[id]?.names?.[currentAdminLang()] ?? pluginInfo[id]?.name ?? id}</span>
                        {#if pluginInfo[id]?.version}<span class="plugin-meta">v{pluginInfo[id].version}</span>{/if}
                        <span class="row-tools">
                          <button class="ghost row-tool" title={ta('tip.plugins.addFound')}
                            onclick={() => addFoundPlugin(id)}>{@html ICONS.right}</button>
                        </span>
                      </span>
                    </div>
                  {/each}
                {/if}
                {#if pluginDiscovery === 'ok'}
                  {#if !pluginsFound.length}
                    <p class="panel-hint">{ta('hint.plugins.autoDiscover')}</p>
                  {/if}
                {:else}
                  <!-- Fallback when repo discovery is unavailable (local server / not logged in) -->
                  <hr class="gridmenu-divider" />
                  <input placeholder={ta('ph.plugins.folder')} bind:value={newPluginId}
                    onkeydown={(e) => e.key === 'Enter' && addPlugin()} />
                  <button class="ghost action" onclick={addPlugin} disabled={!newPluginId.trim()}>{ta('ui.addPlugin')}</button>
                  {#if pluginError}
                    <p class="panel-hint plugin-warn">{pluginError}</p>
                  {/if}
                {/if}
              </div>
            {:else if activePanel === 'history'}
              <div class="panel-body">
                {#if historyList === null}
                  <p class="panel-hint">{ta('hint.history.loading')}</p>
                {:else}
                  {#if historyError}
                    <p class="panel-hint">{historyError}</p>
                  {/if}
                  {#if historyList.length > 0}
                    <button class="ghost" onclick={revertLast}
                      disabled={historyBusy || !auth?.allowed}
                      title={auth?.allowed ? ta('tip.history.revert') : ta('tip.history.needsAccess')}>
                      {ta('ui.revertLast')}
                    </button>
                    {#each historyList as c, i (c.sha)}
                      <div class="history-row" class:head={i === 0}>
                        <span class="history-msg" title={c.sha}>{c.message}</span>
                        <span class="history-meta">
                          {c.author}{c.date ? ` · ${historyDate.format(new Date(c.date))}` : ''}
                        </span>
                      </div>
                    {/each}
                  {/if}
                {/if}
              </div>
            {:else if activePanel === 'update'}
              <div class="panel-body">
                {#if updateBusy && !updateInfo}
                  <p class="panel-hint">{ta('update.checking')}</p>
                {:else if updateError}
                  <p class="panel-hint">{updateError}</p>
                  <button class="ghost" onclick={loadUpdateCheck}>{ta('update.retry')}</button>
                {:else if updateInfo}
                  <div class="update-versions">
                    <span class="update-from">{ta('update.current', { version: updateInfo.current })}</span>
                    {#if !updateInfo.upToDate}
                      <span class="update-arrow">{@html ICONS.right}</span>
                      <span class="badge">{updateInfo.target}</span>
                    {/if}
                  </div>
                  {#if updateInfo.upToDate}
                    <p class="panel-hint">{ta('update.upToDate')}</p>
                  {:else}
                    <p class="update-summary">{ta('update.summary', {
                      writes: updateInfo.changes.filter((c) => c.action === 'write').length,
                      deletes: updateInfo.changes.filter((c) => c.action === 'delete').length,
                    })}</p>
                    {#if updateInfo.notes}
                      <details class="group">
                        <summary>{ta('update.aboutVersion', { target: updateInfo.target })}</summary>
                        <div class="group-items">
                          <p class="update-notes">{updateInfo.notes}</p>
                        </div>
                      </details>
                    {/if}
                    {#if updateInfo.headers?.upstream}
                      <details class="group">
                        <summary title={ta('update.headersManual')}>
                          <span class="update-warn">{@html ICONS.warn}</span> {ta('update.headersTitle')}
                        </summary>
                        <div class="group-items">
                          <pre class="update-headers">{updateInfo.headers.upstream}</pre>
                        </div>
                      </details>
                    {/if}
                    <!-- Hand-edited engine files must be seen without a click;
                         the rest of the atom group is one combined swap and
                         is folded away. -->
                    {#each updateInfo.changes.filter((c) => c.atom && c.conflict) as c (c.path)}
                      <div class="update-row">
                        <span class="update-path" title={c.path}>{c.path}</span>
                        <span class="update-flags">
                          {#if c.action === 'delete'}<span class="chip">{ta('update.actionDelete')}</span>{/if}
                          <span class="update-warn" title={ta(`update.conflict.${c.conflict}`)}>{@html ICONS.warn}</span>
                        </span>
                      </div>
                    {/each}
                    <details class="group">
                      <summary title={ta('update.atomGroup.title')}>
                        {ta('update.atomTitle')} · {updateInfo.changes.filter((c) => c.atom).length}
                      </summary>
                      <div class="group-items">
                        {#each updateInfo.changes.filter((c) => c.atom && !c.conflict) as c (c.path)}
                          <div class="update-row">
                            <span class="update-path" title={c.path}>{c.path}</span>
                            {#if c.action === 'delete'}<span class="chip">{ta('update.actionDelete')}</span>{/if}
                          </div>
                        {/each}
                      </div>
                    </details>
                    {#if updateInfo.changes.some((c) => !c.atom)}
                      <div class="ctl-row update-opt-head">
                        <p class="panel-strong">{ta('update.optionalTitle')}</p>
                        <span class="mini-label">{ta('update.keepMine')}</span>
                      </div>
                      {#each updateInfo.changes.filter((c) => !c.atom) as c (c.path)}
                        <div class="update-row">
                          <span class="update-path" class:skipped={updateSkip.has(c.path)} title={c.path}>{c.path}</span>
                          <span class="update-flags">
                            {#if c.action === 'delete'}<span class="chip">{ta('update.actionDelete')}</span>{/if}
                            {#if c.conflict}<span class="update-warn" title={ta(`update.conflict.${c.conflict}`)}>{@html ICONS.warn}</span>{/if}
                            <input type="checkbox" checked={updateSkip.has(c.path)}
                              onchange={() => toggleUpdateSkip(c.path)}
                              title={ta('update.keepMine.title')} aria-label={ta('update.keepMine')} />
                          </span>
                        </div>
                      {/each}
                    {/if}
                    <button class="primary update-run" onclick={runUpdate}
                      disabled={updateBusy || !auth?.allowed}
                      title={auth?.allowed ? ta('update.run.title') : ta('tip.history.needsAccess')}>
                      {ta('update.run', { target: updateInfo.target })}
                    </button>
                  {/if}
                {/if}
              </div>
            {/if}
          </aside>
        {/if}
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

{#snippet backgroundLayers(bg, layers)}
  {#each layers as layer, i (i)}
    <div class="bg-layer">
      <span class="nav-line">
        <Dropdown value={layer.type} title={ta('tip.bg.changeType')}
          options={BG_TYPES.map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])}
          onchange={(v) => changeBgLayerType(bg, i, v)} />
        <span class="row-tools">
          <button class="ghost row-tool" title={ta('hint.bg.order')}
            onclick={() => moveBgLayer(bg, i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
          <button class="ghost row-tool" title={ta('hint.bg.order')}
            onclick={() => moveBgLayer(bg, i, 1)}
            disabled={i === layers.length - 1}>{@html ICONS.down}</button>
          <button class="ghost row-tool" title={ta('tip.bg.removeLayer')} onclick={() => removeBgLayer(bg, i)}>{@html ICONS.cross}</button>
        </span>
      </span>
      {#if layer.type === 'color'}
        <label>{ta('lbl.color')}
          <ColorPicker value={layer.props.value} tokens={themeSwatches()}
            label={ta('tip.bg.layerColor')} onchange={(hex) => setBgProp(bg, i, 'value', hex)} /></label>
        <label>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((layer.props.opacity ?? 1) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={layer.props.opacity ?? 1}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
      {:else if layer.type === 'gradient'}
        {@const g = gradientProps(layer)}
        {@const shareSum = g.stops.reduce((a, s) => a + Math.max(0, Number(s.share) || 0), 0)}
        <label>{ta('blocks.shape')}
          <Dropdown value={g.kind ?? 'linear'}
            options={[['linear', ta('opt.grad.linear')], ['radial', ta('opt.grad.radial')]]}
            onchange={(v) => setGradKind(bg, i, v)} /></label>
        {#each g.stops as stop, si (si)}
          <span class="nav-line grad-stop"
            class:dragging={stopDrag?.layer === i && stopDrag.from === si}
            class:drop-above={stopDrag?.layer === i && stopDrag.insert === si}
            class:drop-below={stopDrag?.layer === i && stopDrag.insert === g.stops.length && si === g.stops.length - 1}>
            <span class="grad-grip" title={ta('tip.bg.dragStop')}
              onpointerdown={(e) => startStopDrag(bg, e, i, si)}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><circle cx="5" cy="3" r="1.4"/><circle cx="11" cy="3" r="1.4"/><circle cx="5" cy="8" r="1.4"/><circle cx="11" cy="8" r="1.4"/><circle cx="5" cy="13" r="1.4"/><circle cx="11" cy="13" r="1.4"/></svg>
            </span>
            <ColorPicker value={stop.color} tokens={themeSwatches()}
              label={ta('tip.bg.stopColor')} onchange={(hex) => setGradStop(bg, i, si, { color: hex })} />
            <input type="range" class="tb-grow" min="0" max="100" step="1" value={stop.share ?? 50}
              title={ta('tip.bg.stopShare')}
              oninput={(e) => setGradStop(bg, i, si, { share: Number(e.target.value) })} />
            <span class="gridmenu-value">{shareSum > 0 ? Math.round((Math.max(0, Number(stop.share) || 0) / shareSum) * 100) : Math.round(100 / g.stops.length)}%</span>
            {#if g.stops.length > 2}
              <button class="ghost row-tool" title={ta('tip.bg.removeStop')}
                onclick={() => removeGradStop(bg, i, si)}>{@html ICONS.cross}</button>
            {/if}
          </span>
        {/each}
        <button class="ghost action" title={ta('tip.bg.addStop')}
          onclick={() => addGradStop(bg, i)}>{ta('ui.addStop')}</button>
        {#if (g.kind ?? 'linear') === 'radial'}
          <label>{ta('lbl.centerX')}
            <span class="gridmenu-value">{Math.round((g.x ?? 0.5) * 100)}%</span></label>
          <input type="range" min="0" max="1" step="0.01" value={g.x ?? 0.5}
            oninput={(e) => setGradProp(bg, i, 'x', Number(e.target.value))} />
          <label>{ta('lbl.centerY')}
            <span class="gridmenu-value">{Math.round((g.y ?? 0.5) * 100)}%</span></label>
          <input type="range" min="0" max="1" step="0.01" value={g.y ?? 0.5}
            oninput={(e) => setGradProp(bg, i, 'y', Number(e.target.value))} />
        {:else}
          <label>{ta('lbl.angle')}
            <span class="gridmenu-value">{g.angle}°</span></label>
          <input type="range" min="0" max="360" step="5" value={g.angle}
            oninput={(e) => setGradProp(bg, i, 'angle', Number(e.target.value))} />
        {/if}
        <label>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((g.opacity ?? 1) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={g.opacity ?? 1}
          oninput={(e) => setGradProp(bg, i, 'opacity', Number(e.target.value))} />
        <label title={ta('tip.bg.motion')}>{ta('lbl.motion')}
          <Dropdown value={g.animation ?? 'none'}
            options={GRAD_ANIMATIONS[(g.kind ?? 'linear') === 'radial' ? 'radial' : 'linear']}
            onchange={(v) => setGradProp(bg, i, 'animation', v)} /></label>
      {:else if layer.type === 'glow'}
        <label>{ta('lbl.color')}
          <ColorPicker value={layer.props.color} tokens={themeSwatches()}
            label={ta('tip.bg.glowColor')} onchange={(hex) => setBgProp(bg, i, 'color', hex)} /></label>
        <label>{ta('lbl.posX')}
          <span class="gridmenu-value">{Math.round(layer.props.x * 100)}%</span></label>
        <input type="range" min="0" max="1" step="0.01" value={layer.props.x}
          oninput={(e) => setBgProp(bg, i, 'x', Number(e.target.value))} />
        <label>{ta('lbl.posY')}
          <span class="gridmenu-value">{Math.round(layer.props.y * 100)}%</span></label>
        <input type="range" min="0" max="1" step="0.01" value={layer.props.y}
          oninput={(e) => setBgProp(bg, i, 'y', Number(e.target.value))} />
        <label>{ta('lbl.size')}
          <span class="gridmenu-value">{Math.round(layer.props.radius * 100)}%</span></label>
        <input type="range" min="0.1" max="1" step="0.01" value={layer.props.radius}
          oninput={(e) => setBgProp(bg, i, 'radius', Number(e.target.value))} />
        <label>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round(layer.props.opacity * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={layer.props.opacity}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
      {:else if layer.type === 'grain'}
        <label>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round(layer.props.opacity * 100)}%</span></label>
        <input type="range" min="0" max="1" step="0.01" value={layer.props.opacity}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
      {:else if layer.type === 'image'}
        <label class="ghost filepick" title={ta('tip.webpAuto')}>
          {layer.props.src ? ta('ui.changeImage') : ta('ui.chooseImage')}
          <input type="file" accept="image/*" onchange={(e) => setBgImage(bg, i, e)} />
        </label>
        {@const isTile = layer.props.fit === 'tile' || layer.props.fit === 'repeat'}
        <label title={ta('tip.bg.fit')}>{ta('lbl.fit')}
          <Dropdown value={isTile ? 'tile' : 'plain'}
            options={[['plain', ta('opt.img.plain')], ['tile', ta('opt.img.tile')]]}
            onchange={(v) => setBgProp(bg, i, 'fit', v)} /></label>
        <label title={ta('tip.bg.size')}>{ta('lbl.size')}</label>
        <div class="sizestep">
          <button type="button" title={ta('tip.smaller')} onclick={() => stepBgSize(bg, i, layer.props.size ?? 1, -0.05)}>−</button>
          <input type="number" min="10" max="400" value={Math.round((layer.props.size ?? 1) * 100)}
            onchange={(e) => setBgSizePct(bg, i, e.target.value)} />
          <span class="sizeunit">%</span>
          <button type="button" title={ta('tip.larger')} onclick={() => stepBgSize(bg, i, layer.props.size ?? 1, 0.05)}>+</button>
        </div>
        {#if !isTile}
          <div class="sizefill">
            <button type="button" class="ghost" title={ta('tip.bg.cover')} onclick={() => setBgFillSize(bg, i, layer, 'cover')}>{ta('ui.cover')}</button>
            <button type="button" class="ghost" title={ta('opt.fitFrame.contain')} onclick={() => setBgFillSize(bg, i, layer, 'contain')}>{ta('opt.fit.contain')}</button>
          </div>
          <label title={ta('tip.bg.position')}>{ta('lbl.position')}</label>
          <div class="focalpad" onpointerdown={(e) => startFocalDrag(e, bg, i, 'xy')}
            style="--fx:{Math.max(0, Math.min(1, layer.props.x ?? 0.5)) * 100}%; --fy:{Math.max(0, Math.min(1, layer.props.y ?? 0.5)) * 100}%">
            <span class="focaldot"></span>
          </div>
          <label class="sub">{ta('lbl.horizontal')}
            <span class="gridmenu-value">{Math.round((layer.props.x ?? 0.5) * 100)}%</span></label>
          <input type="range" min="-0.5" max="1.5" step="0.01" value={layer.props.x ?? 0.5}
            oninput={(e) => setBgProp(bg, i, 'x', Number(e.target.value))} />
          <label class="sub">{ta('lbl.vertical')}
            <span class="gridmenu-value">{Math.round((layer.props.y ?? 0.5) * 100)}%</span></label>
          <input type="range" min="-0.5" max="1.5" step="0.01" value={layer.props.y ?? 0.5}
            oninput={(e) => setBgProp(bg, i, 'y', Number(e.target.value))} />
        {/if}
        <label>{ta('lbl.blur')}
          <span class="gridmenu-value">{layer.props.blur ?? 0} px</span></label>
        <input type="range" min="0" max="20" step="1" value={layer.props.blur ?? 0}
          oninput={(e) => setBgProp(bg, i, 'blur', Number(e.target.value))} />
        <label>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((layer.props.opacity ?? 1) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={layer.props.opacity ?? 1}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
        <label class="gridmenu-snap" title={ta('tip.bg.parallax')}>
          <input type="checkbox" checked={(layer.props.parallax ?? 0) > 0}
            onchange={(e) => setBgProp(bg, i, 'parallax', e.target.checked ? 0.3 : 0)} />
          {ta('lbl.parallax')}
        </label>
        {#if (layer.props.parallax ?? 0) > 0}
          <label>{ta('lbl.parallaxStrength')}
            <span class="gridmenu-value">{Math.round((layer.props.parallax ?? 0) * 100)}%</span></label>
          <input type="range" min="0.1" max="1" step="0.01" value={layer.props.parallax ?? 0.3}
            oninput={(e) => setBgProp(bg, i, 'parallax', Number(e.target.value))} />
          <label title={ta('tip.bg.bleed')}>{ta('lbl.bleed')}
            <Dropdown value={layer.props.bleed ?? 'none'}
              options={[['none', ta('common.none')], ['up', ta('opt.bleed.up')], ['down', ta('opt.bleed.down')], ['both', ta('opt.brand.both')]]}
              onchange={(v) => setBgProp(bg, i, 'bleed', v)} /></label>
        {/if}
      {:else if layer.type === 'slideshow'}
        <label class="ghost filepick" title={ta('tip.bg.addImages')}>
          {ta('ui.addImages')}
          <input type="file" accept="image/*" multiple onchange={(e) => addBgGalleryImages(bg, i, e)} />
        </label>
        {#each layer.props.images ?? [] as img, j (j)}
          <span class="toolbar-row">
            <img class="site-icon-preview" src={img.src} alt="" />
            <span class="row-tools">
              <button class="ghost row-tool" onclick={() => moveBgGalleryImage(bg, i, j, -1)} disabled={j === 0}>{@html ICONS.up}</button>
              <button class="ghost row-tool" onclick={() => moveBgGalleryImage(bg, i, j, 1)}
                disabled={j === layer.props.images.length - 1}>{@html ICONS.down}</button>
              <button class="ghost row-tool" title={ta('tip.removeImage')}
                onclick={() => removeBgGalleryImage(bg, i, j)}>{@html ICONS.cross}</button>
            </span>
          </span>
          <label>{ta('lbl.focusX')}
            <span class="gridmenu-value">{Math.round((img.x ?? 0.5) * 100)}%</span></label>
          <input type="range" min="0" max="1" step="0.01" value={img.x ?? 0.5}
            oninput={(e) => setBgGalleryImageProp(bg, i, j, 'x', Number(e.target.value))} />
          <label>{ta('lbl.focusY')}
            <span class="gridmenu-value">{Math.round((img.y ?? 0.5) * 100)}%</span></label>
          <input type="range" min="0" max="1" step="0.01" value={img.y ?? 0.5}
            oninput={(e) => setBgGalleryImageProp(bg, i, j, 'y', Number(e.target.value))} />
        {/each}
        <label>{ta('lbl.fit')}
          <Dropdown value={layer.props.fit ?? 'cover'}
            options={[['cover', ta('opt.fit.cover')], ['contain', ta('opt.fit.contain')]]}
            onchange={(v) => setBgProp(bg, i, 'fit', v)} /></label>
        <label title={ta('hint.bg.gallery')}>{ta('lbl.secondsPerImage')}
          <input type="number" min="2" max="120" value={layer.props.interval ?? 6}
            onchange={(e) => setBgProp(bg, i, 'interval', Number(e.target.value))} /></label>
        <label>{ta('lbl.transition')}
          <span class="gridmenu-value">{(layer.props.fade ?? 1.5).toFixed(1)} s</span></label>
        <input type="range" min="0" max="5" step="0.1" value={layer.props.fade ?? 1.5}
          oninput={(e) => setBgProp(bg, i, 'fade', Number(e.target.value))} />
        <label>{ta('lbl.blur')}
          <span class="gridmenu-value">{layer.props.blur ?? 0} px</span></label>
        <input type="range" min="0" max="20" step="1" value={layer.props.blur ?? 0}
          oninput={(e) => setBgProp(bg, i, 'blur', Number(e.target.value))} />
        <label>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((layer.props.opacity ?? 1) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={layer.props.opacity ?? 1}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
        <p class="panel-hint">{ta('hint.bg.gallery')}</p>
      {:else if layer.type === 'video'}
        <label class="ghost filepick" title={ta('tip.bg.videoFile')}>
          {layer.props.src ? ta('ui.changeVideo') : ta('ui.chooseVideo')}
          <input type="file" accept="video/mp4,video/webm" onchange={(e) => setBgVideo(bg, i, e)} />
        </label>
        <label class="ghost filepick" title={ta('tip.bg.poster')}>
          {layer.props.poster ? ta('ui.changeImage') : ta('ui.choosePoster')}
          <input type="file" accept="image/*" onchange={(e) => setBgPoster(bg, i, e)} />
        </label>
        <label title={ta('tip.bg.fit')}>{ta('lbl.fit')}
          <Dropdown value={layer.props.fit ?? 'cover'}
            options={[['cover', ta('opt.fit.cover')], ['contain', ta('opt.fit.contain')]]}
            onchange={(v) => setBgProp(bg, i, 'fit', v)} /></label>
        <label class="sub">{ta('lbl.horizontal')}
          <span class="gridmenu-value">{Math.round((layer.props.x ?? 0.5) * 100)}%</span></label>
        <input type="range" min="0" max="1" step="0.01" value={layer.props.x ?? 0.5}
          oninput={(e) => setBgProp(bg, i, 'x', Number(e.target.value))} />
        <label class="sub">{ta('lbl.vertical')}
          <span class="gridmenu-value">{Math.round((layer.props.y ?? 0.5) * 100)}%</span></label>
        <input type="range" min="0" max="1" step="0.01" value={layer.props.y ?? 0.5}
          oninput={(e) => setBgProp(bg, i, 'y', Number(e.target.value))} />
        <label>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((layer.props.opacity ?? 1) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={layer.props.opacity ?? 1}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
        <label class="gridmenu-snap" title={ta('tip.bg.parallax')}>
          <input type="checkbox" checked={(layer.props.parallax ?? 0) > 0}
            onchange={(e) => setBgProp(bg, i, 'parallax', e.target.checked ? 0.3 : 0)} />
          {ta('lbl.parallax')}
        </label>
        {#if (layer.props.parallax ?? 0) > 0}
          <label>{ta('lbl.parallaxStrength')}
            <span class="gridmenu-value">{Math.round((layer.props.parallax ?? 0) * 100)}%</span></label>
          <input type="range" min="0.1" max="1" step="0.01" value={layer.props.parallax ?? 0.3}
            oninput={(e) => setBgProp(bg, i, 'parallax', Number(e.target.value))} />
        {/if}
      {/if}
    </div>
  {/each}
  <label>{ta('lbl.newLayer')}
    <Dropdown value={newBgType}
      options={BG_TYPES.map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])}
      onchange={(v) => (newBgType = v)} /></label>
  <button class="ghost action" onclick={() => addBgLayer(bg, newBgType)}>{ta('ui.addLayer')}</button>
{/snippet}

{#snippet footerLinkList(field, links)}
  {#each links as link, li}
    <div class="nav-row nav-sub-row">
      <input value={link.label} title={ta('tip.linkLabel')}
        oninput={(e) => setFooterListLinkLabel(field, li, e.target.value)} />
      <span class="row-tools">
        <button class="ghost row-tool" onclick={() => moveFooterListLink(field, li, -1)} disabled={li === 0}>{@html ICONS.up}</button>
        <button class="ghost row-tool" onclick={() => moveFooterListLink(field, li, 1)}
          disabled={li === links.length - 1}>{@html ICONS.down}</button>
        <button class="ghost row-tool" title={ta('tip.removeLink')}
          onclick={() => removeFooterListLink(field, li)}>{@html ICONS.cross}</button>
      </span>
      <span class="nav-target">
        <Dropdown value={link.page ?? '__href'} title={ta('tip.linkTarget')}
          options={[...siteDraft.pages.map((p) => [p.id, p.title]), ['__href', ta('opt.linkHref')]]}
          onchange={(v) => setFooterListLinkTarget(field, li, v)} />
      </span>
      {#if !link.page}
        <input class="nav-target" value={link.href ?? ''} placeholder={ta('ph.hrefAnchor')}
          title={ta('tip.hrefAnchor')}
          onchange={(e) => setFooterListLinkHref(field, li, e.target.value)} />
      {/if}
    </div>
  {/each}
{/snippet}

{#snippet kortstilUI()}
  {@const bs = selectedBlock.props.boxStyle ?? {}}
  <label>{ta('lbl.blockColor')}
    <ColorPicker value={bs.bg ?? ''} tokens={themeSwatches()} allowClear
      label={ta('tip.box.bg')}
      onchange={(hex) => setBoxStyle({ bg: hex || null })} /></label>
  <label>{ta('lbl.shadow')}
    <Dropdown value={bs.shadow ?? ''}
      options={[['', ta('common.none')], ['soft', ta('opt.shadow.soft')], ['strong', ta('opt.shadow.strong')]]}
      onchange={(v) => setBoxStyle({ shadow: v || null })} /></label>
  {#if bs.shadow}
    <label>{ta('lbl.shadowColor')}
      <ColorPicker value={bs.shadowColor ?? ''} tokens={themeSwatches()} allowClear
        label={ta('tip.box.shadowColor')}
        onchange={(hex) => setBoxStyle({ shadowColor: hex || null })} /></label>
  {/if}
  <label>{ta('lbl.border')}
    <Dropdown value={bs.border === 'none' ? 'none' : bs.border ? 'custom' : ''}
      options={[['', ta('opt.border.theme')], ['none', ta('common.none')], ['custom', ta('opt.border.custom')]]}
      onchange={(v) => setBoxStyle({ border: v === 'custom' ? { color: 'accent', width: 1 } : v || null })} /></label>
  {#if bs.border !== 'none'}
    <!-- Border color/thickness is ALSO shown for the theme (thin) border:
         picking a color turns it into its own (colorable) border. -->
    {@const bd = typeof bs.border === 'object' ? bs.border : { color: 'text', width: 1 }}
    <label>{ta('lbl.borderColor')}
      <ColorPicker value={bd.color} tokens={themeSwatches()}
        label={ta('tip.box.borderColor')} onchange={(hex) => setBoxStyle({ border: { ...bd, color: hex } })} /></label>
    <label>{ta('lbl.thicknessPx')}
      <span class="num-stepper">
        <button type="button" title={ta('tip.thinner')} aria-label={ta('tip.thinner')}
          onclick={() => setBoxStyle({ border: { ...bd, width: Math.max(1, bd.width - 1) } })}>−</button>
        <input type="number" min="1" max="12" step="1" value={bd.width}
          onchange={(e) => setBoxStyle({ border: { ...bd, width: Math.min(12, Math.max(1, Number(e.target.value) || 1)) } })} />
        <button type="button" title={ta('tip.thicker')} aria-label={ta('tip.thicker')}
          onclick={() => setBoxStyle({ border: { ...bd, width: Math.min(12, bd.width + 1) } })}>+</button>
      </span></label>
  {/if}
  <label class="gridmenu-snap" title={ta('tip.box.glass')}>
    <input type="checkbox" checked={Boolean(bs.glass)}
      onchange={(e) => setBoxStyle({ glass: e.target.checked || null })} />
    {ta('lbl.glass')}
  </label>
{/snippet}

{#snippet blockPropsUI()}
  <!-- The Content/Style model (ADR-0016): Content is what the block says
       and shows, Style is appearance, motion and placement. -->
  <div class="props-tabs">
    <span class="seg">
      <button type="button" class:on={propsTab === 'content'}
        onclick={() => (propsTab = 'content')}>{ta('props.tabContent')}</button>
      <button type="button" class:on={propsTab === 'style'}
        onclick={() => (propsTab = 'style')}>{ta('props.tabStyle')}</button>
    </span>
  </div>

  {#if propsTab === 'content'}
    {#if selectedBlock.type === 'text'}
      <!-- Text, font and size are set inline with the text editor's
           toolbar; the block has no content fields in the panel. -->
      <p class="panel-hint">{ta('hint.textInline')}</p>
    {:else if selectedBlock.type === 'form'}
      <label title={ta('form.modeTitle')}>{ta('form.mode')}
        <Dropdown value={selectedBlock.props.mode ?? 'mailto'}
          options={[['mailto', ta('form.modeMailto')], ['endpoint', ta('form.modeEndpoint')]]}
          onchange={(v) => setBlockProp('mode', v)} /></label>
      {#if (selectedBlock.props.mode ?? 'mailto') === 'endpoint'}
        <label title={ta('form.endpointNote')}>{ta('form.endpoint')}
          <input value={selectedBlock.props.endpoint ?? ''} placeholder={ta('form.endpointPh')}
            onchange={(e) => setBlockProp('endpoint', e.target.value.trim())} /></label>
      {:else}
        <label>{ta('form.recipient')}
          <input value={selectedBlock.props.recipient ?? ''} placeholder={ta('form.recipientPh')}
            onchange={(e) => setBlockProp('recipient', e.target.value.trim())} /></label>
        <label>{ta('form.subject')}
          <input value={selectedBlock.props.subject ?? ''} placeholder={ta('form.subjectPh')}
            onchange={(e) => setBlockProp('subject', e.target.value.trim())} /></label>
      {/if}
      <p class="panel-strong">{ta('form.fields')}</p>
      {#each selectedBlock.props.fields ?? [] as field, i (field.id ?? i)}
        <span class="nav-line">
          <input value={field.label} placeholder={ta('form.fieldNamePh')}
            onchange={(e) => setFormField(i, { label: e.target.value.trim() || ta('form.fieldFallback') })} />
          <Dropdown value={field.type ?? 'text'}
            options={FORM_FIELD_TYPES.map((t) => [t, ta(`form.type${t[0].toUpperCase()}${t.slice(1)}`)])}
            onchange={(v) => setFormField(i, { type: v })} />
          <span class="row-tools">
            <button class="ghost row-tool" onclick={() => moveFormField(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
            <button class="ghost row-tool" onclick={() => moveFormField(i, 1)}
              disabled={i === (selectedBlock.props.fields?.length ?? 0) - 1}>{@html ICONS.down}</button>
            <button class="ghost row-tool" title={ta('form.removeField')} onclick={() => removeFormField(i)}>{@html ICONS.cross}</button>
          </span>
        </span>
        <label class="gridmenu-snap">
          <input type="checkbox" checked={field.required === true}
            onchange={(e) => setFormField(i, { required: e.target.checked })} />
          {ta('form.required')}
        </label>
        {#if FORM_OPTION_TYPES.has(field.type)}
          <input value={(field.options ?? []).join(', ')} placeholder={ta('form.optionsPh')}
            onchange={(e) => setFormFieldOptions(i, e.target.value)} />
        {/if}
      {/each}
      <button class="ghost action" onclick={addFormField}>{ta('form.addField')}</button>
      <label>{ta('lbl.buttonText')}
        <input value={selectedBlock.props.submitLabel ?? ''} placeholder={ta('form.sendDefault')}
          onchange={(e) => setBlockProp('submitLabel', e.target.value.trim() || ta('form.sendDefault'))} /></label>
      <label>{ta('form.receipt')}
        <input value={selectedBlock.props.successText ?? ''} placeholder={ta('form.thanksDefault')}
          onchange={(e) => setBlockProp('successText', e.target.value.trim() || ta('form.thanksDefault'))} /></label>
    {:else if selectedBlock.type === 'calendar'}
      <label>{ta('calendar.sources')}
        <textarea rows="3" placeholder={ta('calendar.sourcesPh')} spellcheck="false"
          value={(selectedBlock.props.sources ?? []).join('\n')}
          onchange={(e) => setCalendarSources(e.target.value)}></textarea></label>
      <label>{ta('lbl.view')}
        <Dropdown value={selectedBlock.props.view ?? 'list'}
          options={[['list', ta('calendar.viewList')], ['cards', ta('calendar.viewCards')], ['month', ta('calendar.viewMonth')], ['next', ta('calendar.viewNext')]]}
          onchange={(v) => setBlockProp('view', v)} /></label>
      {#if (selectedBlock.props.view ?? 'list') === 'list' || selectedBlock.props.view === 'cards'}
        <label title={ta('tip.collection.limit')}>{ta('lbl.maxCount')}
          <input type="number" min="1" max="50" value={selectedBlock.props.limit ?? 6}
            onchange={(e) => setBlockProp('limit', Math.max(1, Math.min(50, Number(e.target.value) || 6)))} /></label>
      {/if}
      <label class="gridmenu-snap">
        <input type="checkbox" checked={selectedBlock.props.showCategories !== false}
          onchange={(e) => setBlockProp('showCategories', e.target.checked)} />
        {ta('calendar.showCategories')}
      </label>
      <label class="gridmenu-snap">
        <input type="checkbox" checked={selectedBlock.props.showSubscribe !== false}
          onchange={(e) => setBlockProp('showSubscribe', e.target.checked)} />
        {ta('calendar.showSubscribe')}
      </label>
    {:else if selectedBlock.type === 'faq'}
      <label class="gridmenu-snap" title={ta('tip.faq.multi')}>
        <input type="checkbox" checked={Boolean(selectedBlock.props.multi)}
          onchange={(e) => setBlockProp('multi', e.target.checked)} />
        {ta('lbl.faqMulti')}
      </label>
      <p class="panel-strong">{ta('lbl.questions')}</p>
      {#each selectedBlock.props.items ?? [] as item, i (i)}
        <span class="nav-line">
          <input value={item.q} title={ta('tip.faq.question')}
            onchange={(e) => setFaqItem(i, { q: e.target.value })} />
          <span class="row-tools">
            <button class="ghost row-tool" onclick={() => moveFaqItem(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
            <button class="ghost row-tool" onclick={() => moveFaqItem(i, 1)}
              disabled={i === (selectedBlock.props.items?.length ?? 0) - 1}>{@html ICONS.down}</button>
            <button class="ghost row-tool" title={ta('tip.faq.remove')} onclick={() => removeFaqItem(i)}>{@html ICONS.cross}</button>
          </span>
        </span>
      {/each}
      <button class="ghost action" onclick={addFaqItem}>{ta('ui.addQuestion')}</button>
    {:else if selectedBlock.type === 'timeline'}
      <p class="panel-strong">{ta('lbl.timelineItems')}</p>
      {#each selectedBlock.props.items ?? [] as item, i (i)}
        <span class="nav-line">
          <input class="tl-year" value={item.year} placeholder={ta('ph.tlYear')} title={ta('tip.timeline.year')}
            onchange={(e) => setTlItem(i, { year: e.target.value })} />
          <input value={item.title} title={ta('tip.timeline.title')}
            onchange={(e) => setTlItem(i, { title: e.target.value })} />
          <span class="row-tools">
            <button class="ghost row-tool" onclick={() => moveTlItem(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
            <button class="ghost row-tool" onclick={() => moveTlItem(i, 1)}
              disabled={i === (selectedBlock.props.items?.length ?? 0) - 1}>{@html ICONS.down}</button>
            <button class="ghost row-tool" title={ta('tip.timeline.remove')} onclick={() => removeTlItem(i)}>{@html ICONS.cross}</button>
          </span>
        </span>
        <input value={item.text} placeholder={ta('ph.tlText')} title={ta('tip.timeline.text')}
          onchange={(e) => setTlItem(i, { text: e.target.value })} />
      {/each}
      <button class="ghost action" onclick={addTlItem}>{ta('ui.addTlItem')}</button>
    {:else if selectedBlock.type === 'quote'}
      <label>{ta('lbl.quoteText')}
        <input value={selectedBlock.props.text ?? ''}
          onchange={(e) => setBlockProp('text', e.target.value)} /></label>
      <label>{ta('lbl.quoteName')}
        <input value={selectedBlock.props.attribution ?? ''}
          onchange={(e) => setBlockProp('attribution', e.target.value)} /></label>
      <label>{ta('lbl.quoteRole')}
        <input value={selectedBlock.props.role ?? ''}
          onchange={(e) => setBlockProp('role', e.target.value)} /></label>
    {:else if selectedBlock.type === 'stats'}
      <label>{ta('lbl.statValue')}
        <input value={selectedBlock.props.value ?? ''} title={ta('tip.stat.value')}
          onchange={(e) => setBlockProp('value', e.target.value)} /></label>
      <label>{ta('lbl.statPrefix')}
        <input value={selectedBlock.props.prefix ?? ''}
          onchange={(e) => setBlockProp('prefix', e.target.value)} /></label>
      <label>{ta('lbl.statSuffix')}
        <input value={selectedBlock.props.suffix ?? ''}
          onchange={(e) => setBlockProp('suffix', e.target.value)} /></label>
      <label>{ta('lbl.statLabel')}
        <input value={selectedBlock.props.label ?? ''}
          onchange={(e) => setBlockProp('label', e.target.value)} /></label>
    {:else if selectedBlock.type === 'table'}
      <!-- The cells are typed directly on the canvas; the panel owns the grid's shape. -->
      <span class="toolbar-row">
        <button class="ghost" onclick={() => tableResize(1, 0)}>{ta('ui.addRow')}</button>
        <button class="ghost" onclick={() => tableResize(-1, 0)}>{ta('ui.removeRow')}</button>
      </span>
      <span class="toolbar-row">
        <button class="ghost" onclick={() => tableResize(0, 1)}>{ta('ui.addColumn')}</button>
        <button class="ghost" onclick={() => tableResize(0, -1)}>{ta('ui.removeColumn')}</button>
      </span>
      <label class="gridmenu-snap" title={ta('tip.table.header')}>
        <input type="checkbox" checked={selectedBlock.props.header !== false}
          onchange={(e) => setBlockProp('header', e.target.checked)} />
        {ta('lbl.tableHeader')}
      </label>
    {:else if selectedBlock.type === 'share'}
      {#each [['facebook', 'Facebook'], ['x', 'X'], ['linkedin', 'LinkedIn'], ['whatsapp', 'WhatsApp'], ['email', ta('opt.share.email')], ['copy', ta('opt.share.copy')]] as [service, label] (service)}
        <label class="gridmenu-snap">
          <input type="checkbox" checked={(selectedBlock.props.services ?? []).includes(service)}
            onchange={(e) => toggleShareService(service, e.target.checked)} />
          {label}
        </label>
      {/each}
    {:else if selectedBlock.type === 'countdown'}
      <label>{ta('lbl.countdownTarget')}
        <input type="datetime-local" value={selectedBlock.props.target ?? ''}
          onchange={(e) => setBlockProp('target', e.target.value)} /></label>
      <label title={ta('tip.countdown.done')}>{ta('lbl.countdownDone')}
        <input value={selectedBlock.props.doneText ?? ''}
          onchange={(e) => setBlockProp('doneText', e.target.value)} /></label>
    {:else if selectedBlock.type === 'audio'}
      <label class="ghost filepick" title={ta('tip.blocks.audioFile')}>
        {ta('ui.chooseAudio')}
        <input type="file" accept="audio/*" onchange={setAudioFile} />
      </label>
      {#if selectedBlock.props.src}
        <button class="ghost" onclick={() => setBlockProp('src', '')}>{ta('ui.removeAudio')}</button>
      {/if}
      <label>{ta('lbl.audioTitle')}
        <input value={selectedBlock.props.title ?? ''}
          onchange={(e) => setBlockProp('title', e.target.value)} /></label>
      <label class="gridmenu-snap">
        <input type="checkbox" checked={Boolean(selectedBlock.props.loop)}
          onchange={(e) => setBlockProp('loop', e.target.checked)} />
        {ta('lbl.audioLoop')}
      </label>
    {:else if selectedBlock.type === 'button'}
      <label>{ta('blocks.text')}
        <input value={selectedBlock.props.label}
          onchange={(e) => setBlockProp('label', e.target.value)} /></label>
      <label>{ta('lbl.goesTo')}
        <Dropdown value={selectedBlock.props.page ?? '__href'}
          options={[...siteDraft.pages.map((p) => [p.id, p.title]), ['__href', ta('opt.externalLink')]]}
          onchange={(v) => {
            const page = v === '__href' ? null : v;
            mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
              b.props.page = page;
              if (page) b.props.href = null;
            });
          }} /></label>
      {#if !selectedBlock.props.page}
        <input placeholder={ta('ph.url')}
          value={selectedBlock.props.href === '#' ? '' : selectedBlock.props.href ?? ''}
          onchange={(e) => setBlockProp('href', e.target.value || null)} />
      {/if}
    {:else if selectedBlock.type === 'image'}
      <label class="ghost filepick">
        {ta('ui.changeImage')}
        <input type="file" accept="image/*" onchange={replaceImage} />
      </label>
      <label>{ta('lbl.description')}
        <input value={selectedBlock.props.alt ?? ''} placeholder={ta('ph.altText')}
          onchange={(e) => setBlockProp('alt', e.target.value)} /></label>
      <label>{ta('lbl.link')}
        <input value={selectedBlock.props.href ?? ''} placeholder={ta('ph.optionalImageLink')}
          onchange={(e) => setBlockProp('href', e.target.value || null)} /></label>
      {#if !selectedBlock.props.href}
        <label class="gridmenu-snap" title={ta('tip.lightbox')}>
          <input type="checkbox" checked={Boolean(selectedBlock.props.lightbox)}
            onchange={(e) => setBlockProp('lightbox', e.target.checked)} />
          {ta('lbl.lightbox')}
        </label>
      {/if}
    {:else if selectedBlock.type === 'video'}
      <label title={ta('hint.video')}>{ta('lbl.videoUrl')}</label>
      <input value={selectedBlock.props.url ?? ''} placeholder={ta('ph.videoUrl')}
        onchange={(e) => setBlockProp('url', e.target.value)} />
      <label>{ta('lbl.videoTitle')}
        <input value={selectedBlock.props.title ?? ''}
          onchange={(e) => setBlockProp('title', e.target.value)} /></label>
    {:else if selectedBlock.type === 'icon'}
      <label>{ta('blocks.icon')}
        <span class="toolbar-row">
          <GlyphPicker value={selectedBlock.props.glyph ?? '★'}
            icon={selectedBlock.props.icon ?? null}
            image={selectedBlock.props.image ?? null}
            onpick={(glyph) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
              b.props.glyph = glyph;
              b.props.icon = null;
              b.props.image = null;
            })}
            onicon={(id) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
              b.props.icon = id;
              b.props.image = null;
            })}
            onimage={(dataUrl) => setBlockProp('image', dataUrl)} />
          {#if !selectedBlock.props.icon}
            <input class="token-input" value={selectedBlock.props.glyph ?? ''} maxlength="4"
              title={ta('tip.icon.typeGlyph')}
              onchange={(e) => setBlockProp('glyph', e.target.value || '★')} />
          {:else}
            <button class="ghost" title={ta('tip.icon.backToGlyph')}
              onclick={() => setBlockProp('icon', null)}>{ta('ui.removeDrawnIcon')}</button>
          {/if}
        </span></label>
      {#if selectedBlock.props.image}
        <span class="toolbar-row" title={ta('hint.icon.ownImage')}>
          <img class="site-icon-preview" src={selectedBlock.props.image} alt={ta('gp.ownIcon')} />
          <button class="ghost" onclick={() => setBlockProp('image', null)}>{ta('ui.removeOwnIcon')}</button>
        </span>
      {/if}
    {:else if selectedBlock.type === 'collection'}
      <label title={ta('tip.collection.source')}>{ta('blocks.collection')}
        <Dropdown value={selectedBlock.props.collection ?? ''}
          options={[['', ta('common.choose')], ...collectionIds.map((id) => [id, collectionsView[id]?.name ?? id])]}
          onchange={(v) => setBlockProp('collection', v || null)} /></label>
      <label title={ta('tip.collection.limit')}>{ta('lbl.maxCount')}
        <input type="number" min="0" max="100" value={selectedBlock.props.limit ?? 6}
          onchange={(e) => setBlockProp('limit', Number(e.target.value))} /></label>
      <label class="gridmenu-snap">
        <input type="checkbox" checked={selectedBlock.props.newestFirst !== false}
          onchange={(e) => setBlockProp('newestFirst', e.target.checked)} />
        {ta('lbl.newestFirst')}
      </label>
    {:else if selectedBlock.type === 'product'}
      <label title={ta('tip.product.source')}>{ta('blocks.collection')}
        <Dropdown value={selectedBlock.props.collection ?? ''}
          options={[['', ta('common.choose')], ...collectionIds.filter((id) => collectionsView[id]?.kind === 'products').map((id) => [id, collectionsView[id]?.name ?? id])]}
          onchange={(v) => setBlockProp('collection', v || null)} /></label>
      {#if selectedBlock.props.collection && collectionsView[selectedBlock.props.collection]?.kind === 'products'}
        <span class="toolbar-row">
          <button class="ghost action" title={ta('tip.product.addProduct')}
            onclick={() => addCollectionEntry(selectedBlock.props.collection)}>{ta('ui.addProduct')}</button>
          <button class="ghost action" title={ta('tip.product.editCatalog')}
            onclick={() => { activeCollection = selectedBlock.props.collection; activePanel = 'collections'; }}>{ta('ui.editCatalog')}</button>
        </span>
      {:else if !collectionIds.some((id) => collectionsView[id]?.kind === 'products')}
        <button class="ghost action" title={ta('tip.product.createCatalog')}
          onclick={createCatalogForBlock}>{ta('ui.createCatalog')}</button>
      {/if}
      <label title={ta('tip.collection.limit')}>{ta('lbl.maxCount')}
        <input type="number" min="0" max="100" value={selectedBlock.props.limit ?? 0}
          onchange={(e) => setBlockProp('limit', Number(e.target.value))} /></label>
      <label title={ta('tip.product.currency')}>{ta('lbl.currency')}
        <input value={selectedBlock.props.currency ?? 'kr'}
          onchange={(e) => setBlockProp('currency', e.target.value)} /></label>
    {:else if selectedBlock.type === 'cart'}
      <label title={ta('tip.cart.checkout')}>{ta('lbl.checkoutPage')}
        <Dropdown value={selectedBlock.props.href ?? ''}
          options={[['', ta('common.none')], ...siteDraft.pages.map((p) => [p.path, p.title])]}
          onchange={(v) => setBlockProp('href', v)} /></label>
      <label title={ta('tip.product.currency')}>{ta('lbl.currency')}
        <input value={selectedBlock.props.currency ?? 'kr'}
          onchange={(e) => setBlockProp('currency', e.target.value)} /></label>
    {:else if selectedBlock.type === 'checkout'}
      <label title={ta('tip.checkout.recipient')}>{ta('lbl.recipientEmail')}
        <input type="email" value={selectedBlock.props.recipient ?? ''}
          onchange={(e) => setBlockProp('recipient', e.target.value.trim())} /></label>
      <label title={ta('tip.checkout.endpoint')}>{ta('lbl.endpointUrl')}
        <input type="url" value={selectedBlock.props.endpoint ?? ''}
          onchange={(e) => setBlockProp('endpoint', e.target.value.trim())} /></label>
      <label title={ta('tip.checkout.vipps')}>{ta('lbl.vippsNumber')}
        <input value={selectedBlock.props.vipps ?? ''}
          onchange={(e) => setBlockProp('vipps', e.target.value.trim())} /></label>
      <label class="gridmenu-snap" title={ta('tip.checkout.vippsCheckout')}>
        <input type="checkbox" checked={selectedBlock.props.vippsCheckout === true}
          onchange={(e) => setBlockProp('vippsCheckout', e.target.checked)} />
        {ta('lbl.vippsCheckout')}
      </label>
      <label title={ta('tip.product.currency')}>{ta('lbl.currency')}
        <input value={selectedBlock.props.currency ?? 'kr'}
          onchange={(e) => setBlockProp('currency', e.target.value)} /></label>
    {:else if selectedBlock.type === 'gallery'}
      <label class="ghost filepick" title={ta('tip.gallery.addImages')}>
        {ta('ui.addImages')}
        <input type="file" accept="image/*" multiple onchange={addGalleryImages} />
      </label>
      {#each selectedBlock.props.images ?? [] as img, i (i)}
        <div class="bg-layer">
          <span class="toolbar-row" title={ta('hint.gallery')}>
            <img class="site-icon-preview" src={img.src} alt="" />
            <span class="row-tools">
              <button class="ghost row-tool" onclick={() => moveGalleryImage(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
              <button class="ghost row-tool" onclick={() => moveGalleryImage(i, 1)}
                disabled={i === selectedBlock.props.images.length - 1}>{@html ICONS.down}</button>
              <button class="ghost row-tool" title={ta('tip.removeImage')} onclick={() => removeGalleryImage(i)}>{@html ICONS.cross}</button>
            </span>
          </span>
          <label>{ta('lbl.description')}
            <input value={img.alt ?? ''} placeholder={ta('ph.altShort')}
              onchange={(e) => setGalleryImageField(i, 'alt', e.target.value)} /></label>
          <label>{ta('lbl.link')}
            <input value={img.href ?? ''} placeholder={ta('ph.galleryHref')}
              onchange={(e) => setGalleryImageField(i, 'href', e.target.value || null)} /></label>
        </div>
      {/each}
    {:else if selectedBlock.type === 'shape'}
      <label>{ta('blocks.shape')}
        <Dropdown value={selectedBlock.props.kind}
          options={SHAPE_KINDS}
          onchange={(v) => setBlockProp('kind', v)} /></label>
    {:else}
      <!-- The field contract: core blocks listed in CORE_FIELDS and plugin
           defs with `fields` get their settings rendered here; a plugin
           block without fields gets the button that opens its own config
           panel in the preview (a plugin copy of the former calendar or form). -->
      {@const pluginFields = CORE_FIELDS[selectedBlock.type] ?? pluginBlocks.find((b) => b.type === selectedBlock.type)?.fields ?? []}
      {#if pluginFields.length}
        {#each pluginFields as f (f.key)}
          {#if f.type === 'place'}
            {@const k = `${selectedBlock.blockId}:${f.key}`}
            <label>{f.label}
              <input type="text" placeholder={f.placeholder}
                value={placeDrafts[k] ?? selectedBlock.props[f.key] ?? ''}
                oninput={(e) => { placeDrafts[k] = e.target.value; }}
                onkeydown={(e) => { if (e.key === 'Enter') searchPlace(f); }} /></label>
            <button class="ghost" disabled={placeBusy} onclick={() => searchPlace(f)}>{ta('props.place.search')}</button>
            {#if placeStatus[k]}
              <p class="panel-hint" class:place-error={placeStatus[k].err}>{placeStatus[k].text}</p>
            {/if}
          {:else if f.type === 'number'}
            <label>{f.label}
              <input type="number" min={f.min} max={f.max} step={f.step ?? 1}
                value={selectedBlock.props[f.key]}
                onchange={(e) => setBlockProp(f.key, clampField(f, Number(e.target.value)))} /></label>
          {:else if f.type === 'toggle'}
            <label class="gridmenu-snap">
              <input type="checkbox" checked={Boolean(selectedBlock.props[f.key])}
                onchange={(e) => setBlockProp(f.key, e.target.checked)} />
              {f.label}
            </label>
          {:else if f.type === 'select'}
            <label>{f.label}
              <Dropdown value={selectedBlock.props[f.key]}
                options={(f.options ?? []).map((o) => [o.value, o.label])}
                onchange={(v) => setBlockProp(f.key, v)} /></label>
          {:else}
            <label>{f.label}
              <input type="text" placeholder={f.placeholder} value={selectedBlock.props[f.key] ?? ''}
                onchange={(e) => setBlockProp(f.key, e.target.value)} /></label>
          {/if}
        {/each}
      {:else}
        <button class="ghost" title={ta('hint.pluginBlock')}
          onclick={() => bridge?.sendOpenConfig(selectedBlock.blockId)}>{ta('ui.settings')}</button>
      {/if}
    {/if}
  {:else}
    {#if selectedBlock.type === 'text'}
      <label>{ta('lbl.align')}
        <Dropdown value={selectedBlock.props.align ?? 'left'}
          options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
          onchange={(v) => setBlockProp('align', v)} /></label>
      <label class="gridmenu-snap">
        <input type="checkbox" checked={Boolean(selectedBlock.props.box)}
          onchange={(e) => setBlockProp('box', e.target.checked)} />
        {ta('lbl.textBoxToggle')}
      </label>
      {#if selectedBlock.props.box}
        {@render kortstilUI()}
      {/if}
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'faq'}
      <p class="panel-strong">{ta('lbl.cardStyle')}</p>
      {@render kortstilUI()}
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'timeline'}
      <label>{ta('lbl.variant')}
        <Dropdown value={selectedBlock.props.variant ?? 'left'}
          options={[['left', ta('opt.timeline.left')], ['alternating', ta('opt.timeline.alternating')]]}
          onchange={(v) => setBlockProp('variant', v)} /></label>
      <label>{ta('lbl.timelineMarker')}
        <Dropdown value={selectedBlock.props.marker ?? 'filled'}
          options={[['filled', ta('opt.timeline.filled')], ['ring', ta('opt.timeline.ring')]]}
          onchange={(v) => setBlockProp('marker', v)} /></label>
      <label>{ta('lbl.color')}
        <ColorPicker value={selectedBlock.props.accent ?? 'accent'} tokens={themeSwatches()}
          onchange={(v) => setBlockProp('accent', v === 'accent' ? null : v)} /></label>
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'quote'}
      <label>{ta('lbl.variant')}
        <Dropdown value={selectedBlock.props.variant ?? 'large'}
          options={[['large', ta('opt.quote.large')], ['short', ta('opt.quote.short')]]}
          onchange={(v) => setBlockProp('variant', v)} /></label>
      {#if selectedBlock.props.variant === 'short'}
        <label class="ghost filepick">
          {ta('ui.quotePortrait')}
          <input type="file" accept="image/*" onchange={setQuotePortrait} />
        </label>
        {#if selectedBlock.props.image}
          <button class="ghost" onclick={() => setBlockProp('image', '')}>{ta('ui.quotePortraitRemove')}</button>
        {/if}
      {/if}
      <label>{ta('lbl.color')}
        <ColorPicker value={selectedBlock.props.accent ?? 'accent'} tokens={themeSwatches()}
          onchange={(v) => setBlockProp('accent', v === 'accent' ? null : v)} /></label>
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'stats'}
      <label class="gridmenu-snap" title={ta('tip.stat.countUp')}>
        <input type="checkbox" checked={selectedBlock.props.countUp !== false}
          onchange={(e) => setBlockProp('countUp', e.target.checked)} />
        {ta('lbl.statCountUp')}
      </label>
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'table'}
      <label>{ta('lbl.tableLines')}
        <Dropdown value={selectedBlock.props.lines ?? 'rows'}
          options={[['rows', ta('opt.table.rows')], ['grid', ta('opt.table.grid')], ['none', ta('common.none')]]}
          onchange={(v) => setBlockProp('lines', v)} /></label>
      <label class="gridmenu-snap">
        <input type="checkbox" checked={Boolean(selectedBlock.props.striped)}
          onchange={(e) => setBlockProp('striped', e.target.checked)} />
        {ta('lbl.tableStriped')}
      </label>
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'share'}
      <label>{ta('lbl.variant')}
        <Dropdown value={selectedBlock.props.variant ?? 'icons'}
          options={[['icons', ta('opt.share.icons')], ['labels', ta('opt.share.labels')]]}
          onchange={(v) => setBlockProp('variant', v)} /></label>
      <label>{ta('lbl.size')}
        <input type="number" min="24" max="64" value={selectedBlock.props.size ?? 38}
          onchange={(e) => setBlockProp('size', Number(e.target.value) || 38)} /></label>
      <label>{ta('lbl.color')}
        <ColorPicker value={selectedBlock.props.color || 'accent'} tokens={themeSwatches()}
          onchange={(v) => setBlockProp('color', v === 'accent' ? '' : v)} /></label>
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'countdown'}
      <label>{ta('lbl.variant')}
        <Dropdown value={selectedBlock.props.variant ?? 'boxes'}
          options={[['boxes', ta('opt.countdown.boxes')], ['plain', ta('opt.countdown.plain')]]}
          onchange={(v) => setBlockProp('variant', v)} /></label>
      <label class="gridmenu-snap">
        <input type="checkbox" checked={selectedBlock.props.showSeconds !== false}
          onchange={(e) => setBlockProp('showSeconds', e.target.checked)} />
        {ta('lbl.countdownSeconds')}
      </label>
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'button'}
      <label>{ta('lbl.style')}
        <Dropdown value={selectedBlock.props.style}
          options={[['primary', ta('opt.btn.primary')], ['secondary', ta('opt.btn.secondary')]]}
          onchange={(v) => setBlockProp('style', v)} /></label>
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'image'}
      <label>{ta('lbl.fit')}
        <Dropdown value={selectedBlock.props.fit ?? 'cover'}
          options={[['cover', ta('opt.fitFrame.cover')], ['contain', ta('opt.fitFrame.contain')]]}
          onchange={(v) => setBlockProp('fit', v)} /></label>
      <label>{ta('lbl.radius')}
        <Dropdown value={selectedBlock.props.radius ?? ''}
          options={[['', ta('common.none')], ['sm', ta('opt.size.sm')], ['md', ta('opt.radius.md')]]}
          onchange={(v) => setBlockProp('radius', v || null)} /></label>
      <label>{ta('lbl.focusX')}
        <span class="gridmenu-value">{Math.round((selectedBlock.props.x ?? 0.5) * 100)}%</span></label>
      <input type="range" min="0" max="1" step="0.01" value={selectedBlock.props.x ?? 0.5}
        oninput={(e) => setBlockProp('x', Number(e.target.value))} />
      <label>{ta('lbl.focusY')}
        <span class="gridmenu-value">{Math.round((selectedBlock.props.y ?? 0.5) * 100)}%</span></label>
      <input type="range" min="0" max="1" step="0.01" value={selectedBlock.props.y ?? 0.5}
        oninput={(e) => setBlockProp('y', Number(e.target.value))} />
      <label title={ta('tip.zoomCrop')}>{ta('lbl.zoom')}
        <span class="gridmenu-value">{(selectedBlock.props.zoom ?? 1).toFixed(2)}x</span></label>
      <input type="range" min="1" max="3" step="0.01" value={selectedBlock.props.zoom ?? 1}
        oninput={(e) => setBlockProp('zoom', Number(e.target.value))} />
      <label>{ta('lbl.brightness')}
        <span class="gridmenu-value">{Math.round((selectedBlock.props.brightness ?? 1) * 100)}%</span></label>
      <input type="range" min="0.2" max="2" step="0.01" value={selectedBlock.props.brightness ?? 1}
        oninput={(e) => setBlockProp('brightness', Number(e.target.value))} />
      <label>{ta('lbl.contrast')}
        <span class="gridmenu-value">{Math.round((selectedBlock.props.contrast ?? 1) * 100)}%</span></label>
      <input type="range" min="0.2" max="2" step="0.01" value={selectedBlock.props.contrast ?? 1}
        oninput={(e) => setBlockProp('contrast', Number(e.target.value))} />
      <label>{ta('lbl.saturate')}
        <span class="gridmenu-value">{Math.round((selectedBlock.props.saturate ?? 1) * 100)}%</span></label>
      <input type="range" min="0" max="2" step="0.01" value={selectedBlock.props.saturate ?? 1}
        oninput={(e) => setBlockProp('saturate', Number(e.target.value))} />
      <button class="ghost action" title={ta('tip.resetAdjust')}
        onclick={() => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
          b.props.brightness = 1; b.props.contrast = 1; b.props.saturate = 1;
        })}>{ta('ui.resetAdjust')}</button>
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'icon'}
      <label>{ta('lbl.sizePx')}
        <input type="number" min="8" max="400" value={selectedBlock.props.size ?? 48}
          onchange={(e) => setBlockProp('size', Number(e.target.value))} /></label>
      <label title={ta('hint.icon.color')}>{ta('lbl.color')}
        <ColorPicker value={selectedBlock.props.color ?? 'accent'} tokens={themeSwatches()}
          onchange={(v) => setBlockProp('color', v)} /></label>
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'collection'}
      <label>{ta('lbl.view')}
        <Dropdown value={selectedBlock.props.view ?? 'cards'}
          options={[['cards', ta('opt.collectionView.cards')], ['list', ta('opt.collectionView.list')], ['archive', ta('opt.collectionView.archive')]]}
          onchange={(v) => setBlockProp('view', v)} /></label>
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'product'}
      <label title={ta('tip.product.columns')}>{ta('lbl.columns')}
        <input type="number" min="0" max="6" value={selectedBlock.props.columns ?? 0}
          onchange={(e) => setBlockProp('columns', Number(e.target.value))} /></label>
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'cart'}
      <label>{ta('lbl.view')}
        <Dropdown value={selectedBlock.props.variant ?? 'button'}
          options={[['button', ta('opt.cart.button')], ['icon', ta('opt.cart.icon')]]}
          onchange={(v) => setBlockProp('variant', v)} /></label>
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'gallery'}
      <label>{ta('lbl.view')}
        <Dropdown value={selectedBlock.props.view ?? 'grid'}
          options={[['grid', ta('opt.galleryView.grid')], ['carousel', ta('opt.galleryView.carousel')], ['slides', ta('opt.galleryView.slides')]]}
          onchange={(v) => setBlockProp('view', v)} /></label>
      {#if (selectedBlock.props.view ?? 'grid') === 'grid'}
        <label>{ta('lbl.columns')}
          <input type="number" min="1" max="6" value={selectedBlock.props.columns ?? 3}
            onchange={(e) => setBlockProp('columns', Number(e.target.value))} /></label>
        <label>{ta('lbl.imageGap')}
          <span class="gridmenu-value">{selectedBlock.props.gap ?? 12} px</span></label>
        <input type="range" min="0" max="32" step="2" value={selectedBlock.props.gap ?? 12}
          oninput={(e) => setBlockProp('gap', Number(e.target.value))} />
      {/if}
      {#if selectedBlock.props.view === 'slides'}
        <label>{ta('lbl.secondsPerImage')}
          <input type="number" min="2" max="60" value={selectedBlock.props.interval ?? 5}
            onchange={(e) => setBlockProp('interval', Number(e.target.value))} /></label>
      {/if}
      <label>{ta('lbl.radius')}
        <Dropdown value={selectedBlock.props.radius ?? ''}
          options={[['', ta('common.none')], ['sm', ta('opt.size.sm')], ['md', ta('opt.radius.md')]]}
          onchange={(v) => setBlockProp('radius', v || null)} /></label>
      <label class="gridmenu-snap" title={ta('tip.lightbox')}>
        <input type="checkbox" checked={selectedBlock.props.lightbox !== false}
          onchange={(e) => setBlockProp('lightbox', e.target.checked)} />
        {ta('lbl.lightbox')}
      </label>
      <hr class="gridmenu-divider" />
    {:else if selectedBlock.type === 'shape'}
      <label>{ta('lbl.color')}
        <Dropdown value={selectedBlock.props.color}
          options={COLOR_TOKENS}
          onchange={(v) => setBlockProp('color', v)} /></label>
      <label>{ta('lbl.thickness')}
        <input type="number" min="1" max="40" value={selectedBlock.props.thickness}
          onchange={(e) => setBlockProp('thickness', Number(e.target.value))} /></label>
      {#if selectedBlock.props.kind === 'line' || selectedBlock.props.kind === 'arrow'}
        <!-- A line's length is its frame width, in percent of the content
             surface, so it can be set without reaching the resize corner. -->
        <label>{ta('lbl.length')}
          <input type="number" min="1" max={Math.max(1, Math.round(100 - selectedBlock.frame.x))} step="0.5" value={selectedBlock.frame.w}
            onchange={(e) => setBlockFrame('w', Math.min(Number(e.target.value), 100 - selectedBlock.frame.x))} /></label>
      {/if}
      <label class="gridmenu-snap" title={ta('tip.shape.fill')}>
        <input type="checkbox" checked={Boolean(selectedBlock.props.fill)}
          onchange={(e) => setBlockProp('fill', e.target.checked ? selectedBlock.props.color : null)} />
        {ta('lbl.filled')}
      </label>
      <hr class="gridmenu-divider" />
    {/if}

    <!-- Shrink on narrower screens: block-level on every block (ADR-0024); the content zooms to fit, or the frame keeps a floor -->
    <label title={ta('tip.fit')}>{ta('lbl.fit')}
      <Dropdown value={selectedBlock.fit === 'shrink' ? 'shrink' : 'wrap'}
        options={FIT_BY_WIDTH.has(selectedBlock.type)
          ? [['wrap', ta('opt.fit.fluid')], ['shrink', ta('opt.fit.floor')]]
          : [['wrap', ta('opt.fit.wrap')], ['shrink', ta('opt.fit.shrink')]]}
        onchange={(v) => setBlockFit(v)} /></label>
    {#if selectedBlock.fit === 'shrink'}
      <div class="ctl-row" title={ta('tip.fitMin')}>
        <span class="mini-label">{ta('lbl.fitMin')}</span>
        <input type="range" min="1" max="100" step="1"
          value={Math.round((selectedBlock.fitMin ?? 0.6) * 100)}
          oninput={(e) => setBlockFitMin(e.target.valueAsNumber / 100)} />
        <span class="gridmenu-value">{Math.round((selectedBlock.fitMin ?? 0.6) * 100)} %</span>
      </div>
    {/if}
    <hr class="gridmenu-divider" />
    <label title={ta('tip.props.blockAnim')}>{ta('lbl.animIn')}
      <Dropdown value={isEntrance(selectedBlock.animation) ? selectedBlock.animation.type : ''}
        options={BLOCK_ENTRANCE_OPTIONS}
        onchange={(v) => setBlockAnimation(v || null)} /></label>
    {#if isEntrance(selectedBlock.animation)}
      <label>{ta('lbl.durationMs')}
        <input type="number" min="100" max="4000" step="100"
          value={selectedBlock.animation.props.duration}
          onchange={(e) => setBlockAnimProp('duration', Number(e.target.value))} /></label>
      <label>{ta('lbl.delayMs')}
        <input type="number" min="0" max="4000" step="100"
          value={selectedBlock.animation.props.delay}
          onchange={(e) => setBlockAnimProp('delay', Number(e.target.value))} /></label>
    {/if}
    <label title={ta('tip.props.blockHover')}>{ta('lbl.onHover')}
      <Dropdown value={selectedBlock.hover?.type ?? (selectedBlock.animation && !isEntrance(selectedBlock.animation) ? selectedBlock.animation.type : '')}
        options={HOVER_OPTIONS}
        onchange={(v) => setBlockHover(v || null)} /></label>

    {#if viewMode === 'desktop'}
      <hr class="gridmenu-divider" />
      <label class="gridmenu-snap" title={ta('tip.sticky')}>
        <input type="checkbox" checked={Boolean(selectedBlock.sticky)}
          onchange={(e) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
            b.sticky = e.target.checked ? { offset: 16, until: null } : null;
          })} />
        {ta('lbl.sticky')}
      </label>
      {#if selectedBlock.sticky}
        <label title={ta('tip.stickyMode')}>{ta('lbl.stickyMode')}
          <Dropdown value={selectedBlock.sticky.mode ?? 'scroll'}
            options={[['scroll', ta('opt.sticky.modeScroll')], ['screen', ta('opt.sticky.modeScreen')]]}
            onchange={(v) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
              b.sticky = { ...b.sticky, mode: v };
            })} /></label>
        <!-- The offset applies only to edges the block is actually docked
             to: with both axes centered it has no effect and is hidden. -->
        {#if selectedBlock.sticky.mode !== 'screen' || (selectedBlock.sticky.dock ?? 'bottom-right') !== 'middle-center'}
          <label title={selectedBlock.sticky.mode === 'screen' ? ta('tip.stickyEdge') : ta('tip.stickyOffset')}>
            {selectedBlock.sticky.mode === 'screen' ? ta('lbl.stickyEdge') : ta('lbl.stickyOffset')}
            <input type="number" min="0" max="400" value={selectedBlock.sticky.offset ?? 16}
              onchange={(e) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
                b.sticky = { ...b.sticky, offset: Math.max(0, Number(e.target.value) || 0) };
              })} /></label>
        {/if}
        {#if selectedBlock.sticky.mode === 'screen'}
          <label title={ta('tip.stickyDock')}>{ta('lbl.stickyDock')}
            <Dropdown value={selectedBlock.sticky.dock ?? 'bottom-right'}
              options={DOCK_OPTIONS.map(([v, key]) => [v, ta(key)])}
              onchange={(v) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
                b.sticky = { ...b.sticky, dock: v };
              })} /></label>
        {:else}
          <label title={ta('tip.stickyUntil')}>{ta('lbl.stickyUntil')}
            <Dropdown value={selectedBlock.sticky.until ?? ''}
              options={stickyUntilOptions()}
              onchange={(v) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
                b.sticky = { ...b.sticky, until: v || null };
              })} /></label>
        {/if}
      {/if}
    {/if}

    <hr class="gridmenu-divider" />
    <details class="group frame-group">
      <summary title={ta('hint.placement')}>{ta('group.placement')}</summary>
      <div class="group-items">
        {#if viewMode === 'desktop'}
          <div class="frame-grid">
            <label>{ta('frame.x')}<input type="number" step="0.5" value={selectedBlock.frame.x}
              onchange={(e) => setBlockFrame('x', Number(e.target.value))} /></label>
            <label>{ta('frame.y')}<input type="number" step="1" value={selectedBlock.frame.y}
              onchange={(e) => setBlockFrame('y', Number(e.target.value))} /></label>
            <label>{ta('frame.w')}<input type="number" step="0.5" min="1" value={selectedBlock.frame.w}
              onchange={(e) => setBlockFrame('w', Number(e.target.value))} /></label>
            <label>{ta('frame.h')}<input type="number" step="1" min="1" value={selectedBlock.frame.h}
              onchange={(e) => setBlockFrame('h', Number(e.target.value))} /></label>
            <label title={ta('tip.frameZ')}>
              {ta('frame.z')}<input type="number" step="1" value={selectedBlock.frame.z ?? 1}
              onchange={(e) => setBlockFrame('z', Number(e.target.value))} /></label>
            <label>{ta('frame.rot')}<input type="number" step="1" value={selectedBlock.frame.rot ?? 0}
              onchange={(e) => setBlockFrame('rot', Number(e.target.value))} /></label>
          </div>
        {/if}
        <label class="gridmenu-snap" title={ta('tip.hideMobile')}>
          <input type="checkbox" checked={selectedBlock.hideMobile}
            onchange={(e) => setBlockHideMobile(e.target.checked)} />
          {ta('lbl.hideMobile')}
        </label>
        <label class="gridmenu-snap" title={ta('tip.decor')}>
          <input type="checkbox" checked={selectedBlock.decor}
            onchange={(e) => setBlockDecor(e.target.checked)} />
          {ta('lbl.decor')}
        </label>
      </div>
    </details>
  {/if}
{/snippet}

<!-- The block menu: all block settings in a floating menu next to the
     block (the calendar pattern; opened from the gear on the block's
     toolbar). The same snippet as the Properties panel, so the two never
     diverge. -->
{#if blockMenu && selectedBlock}
  <div class="block-menu" style="left: {blockMenu.left}px; top: {blockMenu.top}px">
    <header class="block-menu-head">
      <span>{ta('blocks.suffix', { label: BLOCK_LABELS[selectedBlock.type] ?? selectedBlock.type })}</span>
      <button class="ghost row-tool" title={ta('tip.closeEsc')} onclick={() => (blockMenu = null)}>{@html ICONS.cross}</button>
    </header>
    <div class="panel-body block-menu-body">
      {@render blockPropsUI()}
    </div>
  </div>
{/if}

<style>
  /* The admin's color themes: override the engine's default variables
     ONLY in the admin document (the preview iframe has its own document
     and follows the user's theme). Picked in the top bar. */
  /* The Urd brand palette (logo/mark): well-teal primary, with all the
     color variants kept. A fixed brand color, independent of the admin theme. */
  :global(:root) {
    --urd-brand: #15b39a;         /* well-teal (primary, Urd's well + Yggdrasil) */
    --urd-brand-bronze: #c9a227;  /* runestone bronze */
    --urd-brand-indigo: #7c5cff;  /* fate indigo */
    --urd-brand-mono: #eaf1ed;    /* monochrome (off-white) */
  }

  :global(:root[data-admin-theme='purple']) {
    --urd-color-bg: #0b0e17;
    --urd-color-surface: #151a2b;
    --urd-color-accent: #7c5cff;
    --urd-color-text: #e8eaf0;
  }

  :global(:root[data-admin-theme='well']) {
    --urd-color-bg: #0b1418;
    --urd-color-surface: #13232a;
    --urd-color-accent: #2ec8b5;
    --urd-color-text: #e4eef0;
  }

  :global(:root[data-admin-theme='gold']) {
    --urd-color-bg: #100e0a;
    --urd-color-surface: #1c1812;
    --urd-color-accent: #d9a441;
    --urd-color-text: #ede8dc;
  }

  :global(:root[data-admin-theme='grey']) {
    --urd-color-bg: #0e0f11;
    --urd-color-surface: #191b1e;
    --urd-color-accent: #5f6a75;
    --urd-color-text: #e6e8ea;
  }

  /* Nordlys: the Nord palette (arctic, low saturation) */
  :global(:root[data-admin-theme='aurora']) {
    --urd-color-bg: #232831;
    --urd-color-surface: #2e3440;
    --urd-color-accent: #5e81ac;
    --urd-color-text: #eceff4;
  }

  /* Skumring: Tokyo Night (neon night, blue) */
  :global(:root[data-admin-theme='dusk']) {
    --urd-color-bg: #16161e;
    --urd-color-surface: #1a1b26;
    --urd-color-accent: #3d59a1;
    --urd-color-text: #c0caf5;
  }

  /* Glo: Gruvbox (warm, glowing orange) */
  :global(:root[data-admin-theme='ember']) {
    --urd-color-bg: #1d2021;
    --urd-color-surface: #282828;
    --urd-color-accent: #d65d0e;
    --urd-color-text: #ebdbb2;
  }

  /* Our own slim, dark scrollbar across the admin, so it does not stand out */
  :global(*) {
    scrollbar-width: thin;
    scrollbar-color: rgb(255 255 255 / 22%) transparent;
  }

  :global(::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }

  :global(::-webkit-scrollbar-thumb) {
    background: rgb(255 255 255 / 22%);
    border-radius: 999px;
  }

  :global(::-webkit-scrollbar-track) {
    background: transparent;
  }

  .editor {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .topbar.hidden {
    display: none;
  }

  .chrome-restore {
    position: fixed;
    /* Below the site's own top bar, clear of both nav and scrollbar */
    top: 64px;
    right: 28px;
    z-index: 200;
    font: inherit;
    color: #fff;
    background: var(--urd-color-accent, #7c5cff);
    border: 0;
    border-radius: 999px;
    padding: 0.4em 1em;
    cursor: pointer;
    opacity: 0.55;
  }

  .chrome-restore:hover {
    opacity: 1;
  }

  .topbar {
    display: flex;
    /* The bar NEVER wraps to two rows: the height is fixed, and what does
       not fit is folded away in steps (see the fold steps at the bottom of
       the file). */
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem 0.75rem;
    /* More air on the right: Publish is the last thing the eye lands on
       and must not stick to the window edge. */
    padding: 0.6rem 1.4rem 0.6rem 1rem;
    background: var(--urd-color-surface, #151a23);
    border-bottom: 1px solid rgb(255 255 255 / 8%);
    font-size: 0.9rem;
  }

  /* .rail-brand owns the mark's shape; only the glyph's and word's own sizes live here. */
  .brand-mark {
    width: 1.4rem;
    height: 1.4rem;
    flex: none;
  }
  .brand-word {
    letter-spacing: 0.01em;
  }

  /* Three groups on one row: left (tools), middle (draft status) and
     right (view/publishing). None of them wrap. */
  .topbar-group {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5rem 0.75rem;
    /* min-width: auto (inherited) stops the group at min-content, i.e.
       the page-name button's min-width plus the rest of the controls. */
  }

  /* The controls keep their natural width: the fold steps, not shrinking,
     make room. Only the page name below is allowed to give way. */
  .topbar-group > * {
    flex: none;
  }

  /* The page name is free text and is therefore the only thing allowed to
     shrink. Block display gives an ellipsis instead of the buttons' inline-flex. */
  .topbar .page-btn {
    display: block;
    flex: 0 1 auto;
    min-width: 3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .topbar-right {
    margin-left: auto;
    justify-content: flex-end;
    flex: none;
  }

  /* Buttons with an SVG icon: icon and text in line, vertically centered */
  .topbar .ghost,
  .chrome-restore,
  .badge.attention {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
  }

  .badge {
    background: var(--urd-color-accent, #7c5cff);
    color: #fff;
    border-radius: 999px;
    padding: 0.15em 0.7em;
    font-size: 0.78rem;
  }

  /* Status messages as a toast in the bottom right: does not disturb the
     top bar and can be read wherever you are working */
  .toast {
    position: fixed;
    bottom: 22px;
    /* Clear of the preview's scrollbar and the right edge */
    right: 34px;
    z-index: 300;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    max-width: 44ch;
    padding: 0.6em 0.9em;
    font-size: 0.85rem;
    border-radius: 10px;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    box-shadow: 0 8px 24px rgb(0 0 0 / 45%);
  }

  .toast.ok {
    border-color: rgb(46 204 113 / 45%);
    color: #7ee2a8;
  }

  .toast.error {
    border-color: rgb(231 76 60 / 45%);
    color: #f5a09a;
  }

  .toast-x {
    border: 0;
    padding: 0 0.2em;
    font-size: 1rem;
    line-height: 1;
    opacity: 0.6;
  }

  .toast-x:hover {
    opacity: 1;
  }

  .who {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    opacity: 0.7;
    font-size: 0.82rem;
  }

  /* The workspace: panel picker rail | panel (optional) | preview */
  .workspace {
    flex: 1;
    display: flex;
    min-height: 0;
  }

  /* A tight rail: narrow, no gaps between the items, and monospace that
     ties the rail to Urd's own tone. Twelve items should take a small
     corner of the canvas height, not most of it. */
  .rail {
    display: flex;
    flex-direction: column;
    /* The longest label is "Oppdatering": eleven characters in 0.74rem
       monospace is just over 80 px, plus twice 0.9rem indent. 8.5rem gives
       air without the rail taking space from the canvas. */
    width: 8.5rem;
    flex: none;
    gap: 0;
    padding: 0.55rem 0;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.74rem;
    background: var(--urd-color-surface, #151a23);
    border-right: 1px solid rgb(255 255 255 / 8%);
    overflow-y: auto;
  }

  .rail button {
    border: 0;
    background: transparent;
    font-family: inherit;
    font-size: inherit;
    padding: 0.24rem 0.9rem;
    /* The global button style makes all buttons inline-flex with
       justify-content: center. On a flex container that overrides all
       text alignment, so text-align alone has no effect here. */
    justify-content: flex-start;
    text-align: left;
    border-radius: 0;
    opacity: 0.75;
  }

  .rail button:hover {
    opacity: 1;
    background: rgb(255 255 255 / 6%);
  }

  /* Active is marked by background + edge alone: the font weight does NOT
     change, otherwise the text shifts slightly on every selection. */
  /* The settings gear at the bottom of the rail + the popover above it.
     position: fixed is not clipped by the rail's overflow. */
  /* Uppercase label above each group, so the three levels read as groups
     and not as one long list. */
  .rail-group {
    font-size: 0.54rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.45;
    padding: 0.8rem 0.9rem 0.15rem;
  }

  .rail-group:first-child { padding-top: 0.2rem; }

  /* The mark lives at the bottom by the gear: mark on the left, settings
     on the right, with a divider above. */
  .rail-settings {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.55rem 0 0.1rem;
    border-top: 1px solid rgb(255 255 255 / 10%);
    margin-inline: 0.9rem;
  }

  .rail-brand {
    display: inline-flex;
    /* The rune stands on the word's baseline: the svg (with no baseline of
       its own) is aligned by its bottom edge, which is the glyph's foot
       thanks to the cropped viewBox. */
    align-items: baseline;
    gap: 0.35rem;
    min-width: 0;
    font-weight: 700;
    font-size: 0.8rem;
  }

  /* Height in em: the rune stays just above cap height, as in the logo file. */
  .rail-brand .brand-mark { width: auto; height: 0.8em; flex: none; }

  .rail-gear {
    /* The mark stands on the left and takes the width; the gear is square. */
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em !important;
  }

  .rail-gear.active {
    border-color: var(--urd-color-accent, #7c5cff) !important;
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 18%, transparent) !important;
  }

  .settings-pop {
    position: fixed;
    left: 10px;
    bottom: 52px;
    z-index: 100002;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 178px;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid rgb(255 255 255 / 12%);
    background: var(--urd-color-surface, #151a23);
    box-shadow: 0 10px 30px rgb(0 0 0 / 35%);
  }

  .settings-pop label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.8rem;
  }

  /* Active is colored text with a line at the left edge, not a filled
     pill: twelve filled pills stacked read heavy, and the line reads more
     clearly as "you are here" in a list. */
  .rail button.active {
    opacity: 1;
    background: transparent;
    color: var(--urd-color-accent, #7c5cff);
    box-shadow: inset 2px 0 0 var(--urd-color-accent, #7c5cff);
  }


  .panel {
    width: 300px;
    flex-shrink: 0;
    /* The scrollbar's gutter is always reserved (a thin one), so the
       content keeps its width whether the panel scrolls or not; the gutter
       itself gives the air at the right edge. */
    padding: 0.9rem 0.6rem 0.9rem 0.9rem;
    background: var(--urd-color-surface, #151a23);
    border-right: 1px solid rgb(255 255 255 / 8%);
    overflow-y: auto;
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    font-size: 0.88rem;
  }

  .panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin: 0 0 0.8rem;
  }

  .panel h2 {
    margin: 0;
    font-size: 0.95rem;
  }

  :global(.fold-sub) {
    margin-left: auto;
    margin-right: 0.6em;
  }

  /* The fold-all toggle: the chevrons point outwards (expand) and flip
     inwards (collapse) around their own centres. */
  :global(.fold-toggle .ft-top),
  :global(.fold-toggle .ft-bot) {
    transform-box: view-box;
    transition: transform 0.2s ease;
  }

  :global(.fold-toggle .ft-top) { transform-origin: 12px 7px; }
  :global(.fold-toggle .ft-bot) { transform-origin: 12px 17px; }

  :global(.fold-toggle.collapse .ft-top),
  :global(.fold-toggle.collapse .ft-bot) {
    transform: scaleY(-1);
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.fold-toggle .ft-top),
    :global(.fold-toggle .ft-bot) {
      transition: none;
    }
  }

  .fold-all,
  :global(.fold-sub) {
    display: inline-flex;
    align-items: center;
    padding: 3px 5px;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 5px;
    color: inherit;
    opacity: 0.7;
    cursor: pointer;
  }

  .fold-all:hover,
  :global(.fold-sub:hover) {
    opacity: 1;
  }

  .panel-body {
    display: grid;
    /* minmax(0, 1fr): the column can never grow wider than the panel, so
       the rows are squeezed instead of causing horizontal scrolling */
    grid-template-columns: minmax(0, 1fr);
    gap: 0.6rem;
  }

  /* The block menu: a floating version of the Properties content next to the block */
  .block-menu {
    position: fixed;
    z-index: 320;
    width: 300px;
    max-height: min(70vh, 560px);
    display: flex;
    flex-direction: column;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 10px;
    box-shadow: 0 12px 32px rgb(0 0 0 / 50%);
  }

  .block-menu-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.55rem 0.8rem;
    font-weight: 600;
    font-size: 0.85rem;
    border-bottom: 1px solid rgb(255 255 255 / 12%);
  }

  .block-menu-body {
    padding: 0.7rem 0.8rem 0.9rem;
    overflow-y: auto;
    min-height: 0;
  }

  /* Checkboxes as modern toggles: a pill with a sliding knob */
  input[type='checkbox'] {
    appearance: none;
    width: 2.1rem;
    height: 1.2rem;
    flex-shrink: 0;
    position: relative;
    border: 1px solid rgb(255 255 255 / 25%);
    border-radius: 999px;
    background: rgb(255 255 255 / 10%);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  input[type='checkbox']::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(1.2rem - 6px);
    height: calc(1.2rem - 6px);
    border-radius: 50%;
    background: #e8eaf0;
    transition: transform 0.15s ease;
  }

  input[type='checkbox']:checked {
    background: var(--urd-color-accent, #7c5cff);
    border-color: var(--urd-color-accent, #7c5cff);
  }

  input[type='checkbox']:checked::after {
    transform: translateX(0.9rem);
  }

  /* All the "row buttons" in the panel (blocks, groups, file picker)
     share the same height and layout, so the list looks even */
  .panel-body .ghost,
  .group summary {
    display: flex;
    align-items: center;
    min-height: 2.2rem;
    padding: 0.35em 0.8em;
    box-sizing: border-box;
  }

  /* List buttons in the panels are left-aligned (the rows must read as a
     list), even though buttons otherwise center their content. Action
     buttons (.action: create page, add layer, etc.) are centered like
     regular buttons. */
  .panel-body .ghost {
    justify-content: flex-start;
  }

  .panel-body .ghost.action {
    justify-content: center;
    text-align: center;
  }

  .panel-body label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    font-size: 0.85rem;
  }

  .panel-body input[type='range'] {
    width: 100%;
    accent-color: var(--urd-color-accent, #7c5cff);
  }

  .panel-body button,
  .panel-body .filepick {
    text-align: left;
  }

  .panel-body.locked {
    opacity: 0.35;
    pointer-events: none;
  }

  /* Shared control height (2.2rem) and size in the panels: fields and
     buttons must line up wherever they stand */
  .panel-body input:not([type]),
  .panel-body input[type='text'],
  .panel-body input[type='number'] {
    font: inherit;
    font-size: 0.85rem;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    height: 2.2rem;
    padding: 0 0.5em;
    min-width: 0;
  }

  /* Number stepper (−/[number]/+), like the size field in the text editor. */
  .num-stepper {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .num-stepper input[type='number'] {
    width: 3.4rem;
    text-align: center;
    appearance: textfield;
    -moz-appearance: textfield;
  }

  .num-stepper input[type='number']::-webkit-outer-spin-button,
  .num-stepper input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .num-stepper button {
    width: 2.2rem;
    height: 2.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    cursor: pointer;
  }

  .num-stepper button:hover {
    background: rgb(255 255 255 / 10%);
  }

  /* The page and nav rows: title/label takes the space, the tools are narrow */
  .page-row {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  /* The warning marker for pages without a meta description (Search and sharing) */
  .seo-warn {
    display: inline-flex;
    flex: none;
    color: #e2b84a;
  }

  .collection-entry {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.35rem;
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 8px;
    padding: 0.5rem 0.6rem;
  }

  .plugin-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.2rem;
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 8px;
    padding: 0.5rem 0.6rem;
  }

  .plugin-row.plugin-broken {
    border-color: color-mix(in srgb, #e05252 55%, transparent);
  }

  .plugin-head {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    min-width: 0;
  }

  .plugin-name {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .plugin-meta {
    font-size: 0.75rem;
    opacity: 0.6;
  }

  .plugin-head .row-tools {
    margin-left: auto;
    align-items: center;
  }

  .plugin-toggle {
    font-size: 0.8rem;
  }

  .plugin-warn {
    color: #e2b84a;
  }

  .page-row.current {
    border-left: 2px solid var(--urd-color-accent, #7c5cff);
    padding-left: 0.4rem;
  }

  /* The list of menu items, with a strip under the last row to drop on. */
  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 14px;
  }

  /* The menu items as compact rows: grip, name over target, marker, actions. */
  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.4rem 0.3rem 0.3rem;
    border-radius: 7px;
    background: color-mix(in srgb, currentColor 3%, transparent);
  }

  .nav-item.selected {
    background: color-mix(in srgb, var(--urd-color-accent) 12%, transparent);
  }

  .nav-item.child {
    margin-left: 1.3rem;
  }

  .nav-grip {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.1rem;
    opacity: 0.45;
    cursor: grab;
  }

  .nav-item:hover .nav-grip,
  .nav-item.selected .nav-grip {
    opacity: 0.8;
  }

  .nav-item-main {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* The name is the row's text: no frame until it has focus (the selector
     outranks the panel's shared field rule) */
  .panel-body input.nav-item-name {
    height: 1.5rem;
    padding: 0 0.2rem;
    border-color: transparent;
    background: transparent;
    font-size: 0.85rem;
  }

  .panel-body input.nav-item-name:focus {
    border-color: var(--urd-color-accent);
    outline: none;
  }

  /* Where a dragged row lands: a faint clone of it, dashed, in the gap or
     indented as a child */
  .nav-item.ghost {
    opacity: 0.55;
    border: 1px dashed var(--urd-color-accent);
    background: color-mix(in srgb, var(--urd-color-accent) 10%, transparent);
    min-height: 2.9rem;
  }

  .ghost-name {
    display: block;
    height: 1.5rem;
    line-height: 1.5rem;
    padding: 0 0.2rem;
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ghost-target {
    display: block;
    padding: 0 0.2rem;
    font-size: 0.72rem;
    opacity: 0.75;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .nav-item.dragging {
    opacity: 0.3;
  }

  /* The row that takes the dragged row in as a child */
  .nav-item.drop-target {
    background: color-mix(in srgb, var(--urd-color-accent) 18%, transparent);
    outline: 1px dashed var(--urd-color-accent);
    outline-offset: -1px;
  }

  /* The actions: a two-by-two grid of small buttons at the right, shown on the
     row under the pointer and on the selected row; the other rows show the dots */
  .nav-actions {
    flex: 0 0 auto;
    display: none;
    grid-template-columns: 1fr 1fr;
    gap: 3px;
  }

  .nav-item:hover .nav-actions,
  .nav-item.selected .nav-actions {
    display: grid;
  }

  .nav-item:hover .nav-more,
  .nav-item.selected .nav-more {
    display: none;
  }

  .panel-body .nav-act {
    width: 1.5rem;
    height: 1.4rem;
    min-height: 0;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .nav-item-target {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    min-width: 0;
  }

  .nav-item-target > :global(.dd) {
    flex: 0 1 auto;
    max-width: 100%;
  }

  .panel-body input.nav-item-href {
    flex: 1 1 4rem;
    min-width: 3rem;
    height: 1.5rem;
    font-size: 0.72rem;
    padding: 0 0.3rem;
  }

  .nav-item-sub {
    flex: 0 0 auto;
    display: inline-flex;
    opacity: 0.55;
  }

  .panel-body .nav-more {
    height: 1.8rem;
    width: 1.8rem;
    opacity: 0.55;
  }

  .nav-item:hover .nav-more {
    opacity: 1;
  }

  /* The social icon's preview in the Footer panel */
  .footer-soc-preview {
    flex: 0 0 1.15rem;
    width: 1.15rem;
    height: 1.15rem;
    color: inherit;
    opacity: 0.85;
  }
  .footer-soc-preview :global(svg) {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* The visual footer template picker: a thumbnail grid (footerThumb SVG). */
  .footer-tpick {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
  }
  .footer-tp {
    display: grid;
    gap: 0.3rem;
    padding: 0.35rem;
    border: 1.5px solid rgb(255 255 255 / 12%);
    border-radius: 0.5rem;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .footer-tp:hover {
    border-color: var(--urd-color-accent, #7c5cff);
  }
  .footer-tp-thumb {
    display: block;
    border-radius: 0.35rem;
    overflow: hidden;
    border: 1px solid rgb(255 255 255 / 10%);
    aspect-ratio: 16 / 8;
  }
  .footer-tp-thumb :global(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }
  .footer-tp-name {
    font-size: 0.72rem;
    font-weight: 600;
    text-align: center;
  }

  /* Submenu rows: indented under the parent item, with a marked edge */
  .nav-line {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    min-width: 0;
  }

  .page-title,
  .nav-line input {
    flex: 1 1 0;
    min-width: 0;
  }

  .page-slug {
    flex: 0 0 5.5rem;
    min-width: 0;
    opacity: 0.8;
  }

  /* The timeline panel's year field: narrow, the title takes the rest of the row. */
  .nav-line input.tl-year {
    flex: 0 0 3.6rem;
  }

  .page-path {
    opacity: 0.6;
    padding: 0 0.4rem;
  }

  .row-tools {
    display: flex;
    gap: 0.2rem;
    flex-shrink: 0;
    /* Stretch to the row's height, so the buttons match the field's height */
    align-self: stretch;
  }

  /* The gradient colors' drag handle: the order is dragged with the
     pointer (startStopDrag); the row is dimmed and the insertion line follows */
  .grad-grip {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    cursor: grab;
    opacity: 0.55;
    touch-action: none;
  }

  .grad-grip:hover {
    opacity: 1;
  }

  .grad-stop {
    align-items: center;
    gap: 0.4rem;
  }

  .grad-stop.dragging {
    opacity: 0.45;
  }

  .grad-stop.drop-above {
    box-shadow: 0 -2px 0 0 var(--urd-color-accent);
  }

  .grad-stop.drop-below {
    box-shadow: 0 2px 0 0 var(--urd-color-accent);
  }

  /* Compact color buttons in the gradient rows (same height as the row buttons) */
  .grad-stop :global(.cp-swatch) {
    width: 1.7rem;
    height: 1.7rem;
  }

  .row-tool {
    padding: 0.2em 0.5em;
    font-size: 0.8rem;
  }

  /* Row buttons (arrows/cross): fixed square width and centered glyph,
     follows the field's height - not the block buttons' min height or the
     panel list's left alignment */
  .panel-body .row-tool {
    min-height: 0;
    height: 100%;
    width: 2.1rem;
    padding: 0;
    justify-content: center;
  }

  /* The kebab menu per page row: anchored in the row, floats above the
     panel; closing (outside click/Escape/blur) is handled in the script. */
  .page-menu-wrap {
    position: relative;
    display: inline-flex;
    align-self: stretch;
  }

  .page-menu {
    position: absolute;
    top: calc(100% + 0.25rem);
    right: 0;
    z-index: 40;
    min-width: 10.5rem;
    display: grid;
    gap: 0.15rem;
    padding: 0.3rem;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 9px;
    box-shadow: 0 14px 30px -16px rgb(0 0 0 / 80%);
  }

  .page-menu .ghost {
    display: flex;
    align-items: center;
    gap: 0.5em;
    white-space: nowrap;
  }

  .page-menu .ghost.danger {
    color: #e05252;
  }

  /* The "new page from template" grid: cards with a page thumbnail; the
     picked card decides what + Create page starts from. */
  .page-template-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.45rem;
  }

  .page-template-card {
    position: relative;
    min-width: 0;
  }

  .page-template-pick {
    width: 100%;
    display: grid;
    gap: 0.3rem;
    justify-items: center;
    padding: 0.4rem;
    font: inherit;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 9px;
    cursor: pointer;
  }

  .page-template-card.picked .page-template-pick {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .page-template-thumb {
    width: 100%;
  }

  .page-template-thumb :global(svg) {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .page-template-name {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.75rem;
    opacity: 0.85;
  }

  .page-template-del {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    width: 1.4rem;
    height: 1.4rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 999px;
    background: rgb(0 0 0 / 55%);
    color: inherit;
    cursor: pointer;
    opacity: 0.75;
  }

  .page-template-del:hover {
    opacity: 1;
  }

  /* The section theme picker: live samples in the site's actual theme
     colors - a background with a text line, card chip and accent dot. */
  .rs-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.35rem;
  }

  .rs-card {
    display: grid;
    gap: 0.25rem;
    min-width: 0;
    padding: 0.3rem;
    font: inherit;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 8px;
    cursor: pointer;
  }

  .rs-card.on {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .rs-sample {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 2rem;
    padding: 0 6px;
    border-radius: 5px;
    border: 1px solid rgb(0 0 0 / 15%);
  }

  .rs-sample i {
    display: block;
    border-radius: 2px;
  }

  .rs-line {
    flex: 1;
    height: 3px;
    opacity: 0.75;
  }

  .rs-chip {
    width: 15px;
    height: 11px;
    border: 1px solid rgb(0 0 0 / 10%);
  }

  .rs-dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
  }

  .rs-name {
    font-size: 0.72rem;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .token-input {
    width: 5rem;
    text-align: right;
  }

  .panel-strong {
    margin: 0;
    font-weight: 600;
  }

  .site-icon-preview {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 4px;
    object-fit: cover;
  }

  /* The background layers in the section properties */
  .bg-layer {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.4rem;
    padding: 0.4rem 0 0.5rem 0.5rem;
    border-left: 2px solid rgb(255 255 255 / 12%);
  }

  /* Compact toolbar rows (word-processor style) in the panels */
  .toolbar-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    min-width: 0;
  }

  .panel-body .toolbar-row .tb-num,
  .panel-body .ctl-row .tb-num {
    width: 3.4rem;
    flex: 0 0 auto;
    padding: 0 0.3em;
    text-align: center;
  }

  /* The Nav panel's size rows: a fixed-width name, the slider, an editable
     number; two number fields side by side; the section folds inside
     Appearance keep the group indent once. */
  .ctl-row .ctl-name { flex: 0 0 4.4rem; }
  .ctl-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; align-items: end; }
  .ctl-field { display: grid; gap: 4px; min-width: 0; }
  .panel-body .ctl-field .tb-num { width: 100%; padding: 0 0.3em; text-align: center; }
  .toolbar-row.ctl-end { justify-content: flex-end; gap: 0.4rem; }
  .nav-view-seg { align-self: flex-start; }
  .sub-fold .group-items { padding-left: 0.2rem; }
  .sub-fold summary { min-height: 1.8rem; }

  .panel-body .toolbar-row .tbtn {
    flex: 0 0 auto;
    width: 2.2rem;
    min-height: 0;
    height: 2.2rem;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .toolbar-row .tbtn.active {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 18%, transparent);
  }

  .panel-body .toolbar-row .tb-grow {
    flex: 1 1 0;
    min-width: 0;
  }

  /* The History panel */
  .history-row {
    display: grid;
    gap: 0.15rem;
    padding: 0.35rem 0 0.4rem 0.5rem;
    border-left: 2px solid rgb(255 255 255 / 12%);
    font-size: 0.83rem;
  }

  .history-row.head {
    border-left-color: var(--urd-color-accent, #7c5cff);
  }

  .history-msg {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .history-meta {
    opacity: 0.55;
    font-size: 0.76rem;
  }

  /* The Update panel: version card, folded groups and file rows in the
     panel idiom. */
  .update-versions { display: flex; align-items: center; gap: 0.45rem; font-size: 0.85rem; }
  .update-from { opacity: 0.7; }
  .update-arrow { display: inline-flex; opacity: 0.55; }
  .update-summary { margin: -0.25rem 0 0; font-size: 0.78rem; opacity: 0.65; }
  .update-notes { margin: 0; font-size: 0.78rem; white-space: pre-wrap; overflow-wrap: anywhere; }

  .update-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.16rem 0;
    font-size: 0.78rem;
  }

  .update-path {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    direction: rtl; /* long paths are clipped at the START, the file name is what matters */
    text-align: left;
  }

  .update-path.skipped {
    opacity: 0.45;
    text-decoration: line-through;
  }

  .update-flags { display: flex; align-items: center; gap: 0.4rem; flex: none; }

  .update-warn { color: #e0b04a; display: inline-flex; }

  .update-opt-head { margin-top: 0.2rem; }

  .update-headers {
    max-height: 10rem;
    overflow: auto;
    font-size: 0.7rem;
    background: rgb(0 0 0 / 25%);
    border-radius: 6px;
    padding: 0.5rem;
    user-select: all;
    margin: 0;
  }

  .update-run { margin-top: 0.5rem; width: 100%; }

  /* The setup wizard */
  .confirm-line {
    opacity: 0.9;
    margin: 0;
  }

  .setup-overlay {
    position: fixed;
    inset: 0;
    z-index: 400;
    display: grid;
    place-items: center;
    background: rgb(0 0 0 / 55%);
  }

  .setup-card {
    display: grid;
    gap: 0.8rem;
    width: min(26rem, calc(100vw - 2rem));
    padding: 1.4rem;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 12px;
    box-shadow: 0 16px 48px rgb(0 0 0 / 55%);
  }

  .setup-card h2 {
    margin: 0;
    font-size: 1.15rem;
  }

  .setup-card label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    font-size: 0.88rem;
  }

  .setup-card input:not([type='color']) {
    flex: 1 1 55%;
    min-width: 0;
    font: inherit;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    height: 2.2rem;
    padding: 0 0.6em;
  }

  .setup-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.6rem;
  }

  /* Fields inside panel labels must never blow up the width */
  .panel-body label > input {
    min-width: 0;
    max-width: 100%;
  }

  /* Picture choices: a grid of drawn tiles, the chosen one on the accent. */
  .tile-grid { display: grid; gap: 6px; }
  .tile-grid.cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .tile-grid.cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .tile {
    display: flex; flex-direction: column; align-items: center; gap: 5px;
    padding: 8px 2px 6px; min-width: 0;
    background: color-mix(in srgb, currentColor 5%, transparent);
    border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
    border-radius: 8px; cursor: pointer; color: inherit; opacity: 0.75;
    font: 600 10px system-ui, sans-serif; text-align: center;
  }
  .tile span { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tile.on { opacity: 1; border-color: var(--urd-color-accent); background: color-mix(in srgb, var(--urd-color-accent) 22%, transparent); }
  .tile:focus-visible { outline: 2px solid var(--urd-color-accent); outline-offset: -2px; }
  /* The hover samples draw the menu word with the style itself. */
  .hover-sample { display: inline-block; font: 13px Georgia, serif; color: var(--urd-color-accent); height: 22px; line-height: 22px; }
  .hover-sample.hover-underline { text-decoration: underline; text-underline-offset: 3px; }
  .hover-sample.hover-pill { color: var(--urd-color-bg); background: var(--urd-color-accent); padding: 0 8px; border-radius: 999px; }
  .hover-sample.hover-lift-plain { translate: 0 -2px; }
  .hover-sample.hover-lift { text-shadow: 0 3px 10px color-mix(in srgb, var(--urd-color-accent) 70%, transparent); }
  /* Colours as a row of swatches with the name beneath each. */
  .swatch-row { display: flex; justify-content: space-around; gap: 8px; }
  .swatch-cell { display: flex; flex-direction: column; align-items: center; gap: 5px; text-align: center; min-width: 0; }
  /* The logo's thumbnail beside its picker, and three sizes on one row. */
  .logo-pick { display: flex; align-items: center; gap: 12px; }
  .logo-thumb {
    width: 52px; height: 52px; flex: 0 0 auto; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center;
    background: color-mix(in srgb, currentColor 8%, transparent); border: 1px solid color-mix(in srgb, currentColor 14%, transparent); overflow: hidden;
  }
  .logo-thumb img { max-width: 44px; max-height: 44px; }
  .logo-pick-col { display: flex; flex-direction: column; gap: 4px; min-width: 0; flex: 1; }
  .logo-file { font-size: 11px; opacity: 0.6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .ctl-triple { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; align-items: end; }
  /* A small titled card inside a fold (Behaviour). */
  .mini-card {
    display: flex; flex-direction: column; gap: 10px; padding: 10px 12px;
    background: color-mix(in srgb, currentColor 4%, transparent); border: 1px solid color-mix(in srgb, currentColor 10%, transparent); border-radius: 9px;
  }
  /* The Adjust fold inside Size: the free values behind the presets. */
  .sub-inset > summary { cursor: pointer; font-size: 0.85rem; list-style: none; display: flex; align-items: center; justify-content: space-between; }
  .sub-inset > summary::after { content: ''; width: 7px; height: 7px; border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor; rotate: 45deg; opacity: 0.6; margin-right: 4px; }
  .sub-inset[open] > summary::after { rotate: -135deg; }
  .sub-inset-body { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; padding: 10px 12px; background: color-mix(in srgb, currentColor 4%, transparent); border-radius: 8px; }

  /* A text field with its label above in capitals (the announcement's text and
     address): filled, without a frame, an accent underline while it has focus. */
  .panel-body label.field-stack {
    flex-direction: column;
    align-items: stretch;
    gap: 5px;
  }

  .panel-body .field-filled {
    background: color-mix(in srgb, currentColor 7%, transparent);
    border: 0;
    border-bottom: 2px solid transparent;
    border-radius: 6px 6px 2px 2px;
  }

  .panel-body .field-filled:focus {
    outline: none;
    border-bottom-color: var(--urd-color-accent);
  }

  /* A dropdown under a stacked label fills the row. */
  .panel-body label.field-stack > :global(.dd) {
    flex: 1 1 auto;
    width: 100%;
  }

  /* A dropdown beside its label: bounded, never the whole remaining width, so
     the row reads label then control; the label text wraps if it must. */
  .panel-body label > :global(.dd) {
    flex: 0 1 11rem;
    min-width: 8rem;
  }

  .panel-body textarea {
    font: inherit;
    font-size: 0.85rem;
    line-height: 1.4;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    padding: 0.4em 0.5em;
    min-width: 0;
    resize: vertical;
  }

  /* The position/size fields in Properties: two columns of narrow fields */
  .frame-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 0.4rem 0.6rem;
  }

  .frame-grid input {
    width: 4.2rem;
  }

  /* Groups in the panel (Text, Shapes): look like the block buttons, but
     with an arrow - open into a vertical list of blocks below */
  .group summary {
    list-style: none;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
  }

  /* The fold marker: a drawn chevron that points along the row while the
     group is closed and turns down when it opens. Child combinators keep a
     closed group inside an open one at its own state. */
  .group summary::after {
    content: '';
    flex-shrink: 0;
    width: 0.55em;
    height: 0.55em;
    background: currentColor;
    opacity: 0.6;
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 6l6 6-6 6'/%3E%3C/svg%3E") center / contain no-repeat;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 6l6 6-6 6'/%3E%3C/svg%3E") center / contain no-repeat;
    transition: transform 0.18s ease;
  }

  .group[open] > summary::after {
    transform: rotate(90deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .group summary::after {
      transition: none;
    }
  }

  .group[open] > summary {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  /* The placement group is a SECTION fold, not a chip: drop the pill
     frame, let it read as a simple heading row. */
  .frame-group summary {
    border: 0;
    border-radius: 0;
    padding-left: 0.1em;
    font-weight: 600;
    opacity: 0.9;
  }

  .frame-group[open] > summary {
    border-color: transparent;
  }

  /* Groups are grid items: without min-width 0 they refuse to shrink to
     the panel width, and the content (color pickers, toggles) is cut at the edge */
  .group {
    min-width: 0;
  }

  .group-items {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.4rem;
    margin-top: 0.4rem;
    padding-left: 0.8rem;
  }

  .panel-hint {
    margin: 0;
    font-size: 0.8rem;
    opacity: 0.65;
  }

  /* The field contract's search status (place fields): errors in destructive red. */
  .panel-hint.place-error {
    color: #e05252;
    opacity: 1;
  }

  /* The panel language (ADR-0016): shared building blocks all the panels
     compose. The context classes further down carry only margins and
     child styles, never their own copies of these recipes. */
  .ctl-row { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
  .mini-label { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.6; }
  .chip { border: 1px solid color-mix(in srgb, currentColor 30%, transparent); border-radius: 999px; padding: 2px 9px; font: 600 10px system-ui, sans-serif; background: transparent; color: inherit; opacity: 0.75; }
  button.chip { cursor: pointer; }
  .chip.accent { border-color: var(--urd-color-accent); background: color-mix(in srgb, var(--urd-color-accent) 20%, transparent); opacity: 1; }
  .sample { padding: 11px 12px; background: color-mix(in srgb, currentColor 5%, transparent); border: 1px solid color-mix(in srgb, currentColor 12%, transparent); border-radius: 9px; }

  /* The content-width sample (ADR-0018): one strip per common screen
     width. The track is the screen, the fill is the content surface, so
     the ratio between them IS the setting. A fluid strip (the width does
     not bind there) is drawn dimmed, so it is visible where the setting
     actually has effect. */
  .cw-sample { display: grid; gap: 5px; }
  .cw-row { display: grid; grid-template-columns: 2.6rem 1fr 2.2rem; align-items: center; gap: 8px; }
  .cw-screen { text-align: right; opacity: 0.55; }
  .cw-bar {
    position: relative;
    display: block;
    height: 13px;
    border-radius: 3px;
    background: color-mix(in srgb, currentColor 10%, transparent);
    border: 1px solid color-mix(in srgb, currentColor 14%, transparent);
    overflow: hidden;
  }
  .cw-fill {
    display: block;
    height: 100%;
    margin-inline: auto;
    background: var(--urd-color-accent);
    transition: width 0.12s ease;
  }
  .cw-bar.fluid .cw-fill { background: color-mix(in srgb, var(--urd-color-accent) 35%, transparent); }
  .cw-margin { text-align: right; font-size: 10px; opacity: 0.7; }
  .cw-legend { display: flex; justify-content: space-between; padding-top: 2px; opacity: 0.45; }
  .cw-binds { padding-top: 7px; text-transform: none; letter-spacing: 0; opacity: 0.55; }
  .cw-seg { display: flex; width: 100%; }
  .cw-seg button { flex: 1; white-space: nowrap; }
  /* The sliders in the control rows: the label on the left, the value at
     the far right, the track takes the rest. */
  .ctl-row input[type="range"] { flex: 1; min-width: 0; }

  /* The Content/Style tabs at the top of the block properties (ADR-0016):
     full width, otherwise the segment control's usual recipe. */
  .props-tabs { display: flex; margin-bottom: 2px; }
  .props-tabs .seg { flex: 1; }
  .props-tabs .seg button { flex: 1; padding: 5px 0; font-size: 12px; }

  /* Theme suggestions: a row of palette thumbnails (all on one row) */
  .theme-presets { display: flex; gap: 6px; margin: 6px 0 12px; }
  .theme-preset {
    flex: 1; min-width: 0; padding: 0; cursor: pointer; color: inherit; background: transparent;
    display: flex; flex-direction: column; align-items: stretch;
    border: 1px solid color-mix(in srgb, currentColor 18%, transparent); border-radius: 9px; overflow: hidden;
  }
  .theme-preset:hover { border-color: var(--urd-color-accent); }
  .theme-preset.sel { outline: 2px solid var(--urd-color-accent); outline-offset: 1px; }
  .theme-preset .tp-band { display: flex; height: 22px; }
  .theme-preset .tp-band i { flex: 1; }
  .theme-preset small { display: block; text-align: center; font-size: 9px; padding: 2px 0 3px; opacity: 0.8; }

  /* Colors: Auto/Custom, palette rows (Light+Dark), Standard chip */
  .autorow { margin: 8px 0 2px; }
  .autorow .autolbl { font-size: 0.85rem; opacity: 0.75; }
  .seg { display: inline-flex; border: 1px solid color-mix(in srgb, currentColor 18%, transparent); border-radius: 999px; overflow: hidden; }
  .seg button { border: 0; background: transparent; color: inherit; font: 600 11px system-ui, sans-serif; padding: 3px 11px; cursor: pointer; }
  .seg button.on { background: var(--urd-color-accent); color: var(--urd-color-bg); }
  .palhead { margin: 13px 0 6px; }
  .palcells { display: flex; gap: 6px; }
  .palcells .palcol { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: stretch; gap: 4px; }
  .palcells :global(.cp) { display: block; width: 100%; }
  .palcells :global(.cp-swatch) { width: 100%; height: 32px; }
  .palcells .palcap { text-align: center; font-size: 9px; opacity: 0.6; }
  .palcells .palhex { text-align: center; font: 400 9px ui-monospace, monospace; opacity: 0.7; letter-spacing: -0.02em; }
  .palauto-row { margin-top: 8px; }
  .palauto-row .palauto { font-size: 11px; padding: 2px 9px; }
  .palcells.autopal .palcol { opacity: 0.7; }

  /* Preview: how each color affects the page (light + dark with dual mode) */
  .theme-previews { display: flex; gap: 10px; margin-top: 13px; }
  .theme-pvw { flex: 1; min-width: 0; }
  .tpv-cap { margin-bottom: 5px; }
  .tpv-demo { border-radius: 9px; border: 1px solid color-mix(in srgb, currentColor 12%, transparent); background: var(--tv-bg); color: var(--tv-text); padding: 9px 10px 10px; }
  .tpv-h { font-weight: 700; font-size: 12px; margin-bottom: 5px; }
  .tpv-card { background: var(--tv-surface); border: 1px solid color-mix(in srgb, var(--tv-text) 12%, transparent); border-radius: 7px; padding: 6px 8px; font-size: 10px; color: color-mix(in srgb, var(--tv-text) 62%, transparent); margin-bottom: 8px; }
  .tpv-row { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
  .tpv-btn { background: var(--tv-accent); color: var(--tv-accent-ink); font: 600 10.5px system-ui, sans-serif; padding: 5px 11px; border-radius: 999px; }
  .tpv-lnk { color: var(--tv-accent); font: 600 10.5px system-ui, sans-serif; border-bottom: 1.5px solid currentColor; }

  /* Typography sample + shape corner sample (the surface comes from .sample) */
  .typo-sample { margin-top: 10px; }
  .typo-sample .ts-h { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
  .typo-sample .ts-b { font-size: 12.5px; opacity: 0.7; line-height: 1.5; }
  .form-prev { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .form-prev .fp-btn { background: var(--urd-color-accent); color: var(--urd-color-bg); font: 600 12px system-ui, sans-serif; padding: 8px 15px; border-radius: var(--r-sm); }
  .form-prev .fp-card { flex: 1; height: 42px; border: 1px solid color-mix(in srgb, currentColor 25%, transparent); border-radius: var(--r-md); display: grid; place-items: center; font-size: 11px; opacity: 0.7; }

  /* Toggle rows as modern settings: text on the left, the toggle at the
     far right (the markup has the input first; row-reverse flips it) */
  .gridmenu-snap {
    flex-direction: row-reverse;
    justify-content: space-between;
    text-align: left;
  }

  .gridmenu-value {
    font-variant-numeric: tabular-nums;
    opacity: 0.75;
  }

  /* Image background layer: focal-point pad (drag), sub-sliders and size stepper */
  .focalpad {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    margin: 4px 0 6px;
    border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
    border-radius: 8px;
    background: color-mix(in srgb, currentColor 7%, transparent);
    cursor: crosshair;
    touch-action: none;
  }
  .focaldot {
    position: absolute;
    left: var(--fx, 50%);
    top: var(--fy, 50%);
    width: 14px;
    height: 14px;
    transform: translate(-50%, -50%);
    border: 2px solid var(--urd-color-accent, #15b39a);
    border-radius: 50%;
    background: color-mix(in srgb, var(--urd-color-accent, #15b39a) 30%, transparent);
    box-shadow: 0 0 0 1px rgb(0 0 0 / 45%);
    pointer-events: none;
  }
  label.sub {
    font-size: 0.85em;
    opacity: 0.8;
  }
  .sizestep {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 2px 0 6px;
  }
  .sizestep button {
    width: 28px;
    height: 28px;
    border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
    border-radius: 7px;
    background: transparent;
    color: inherit;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
  }
  .sizestep button:hover { border-color: var(--urd-color-accent); }
  .sizestep input {
    width: 60px;
    text-align: center;
    padding: 5px 4px;
    border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
    border-radius: 7px;
    background: transparent;
    color: inherit;
    font-variant-numeric: tabular-nums;
  }
  .sizeunit { opacity: 0.6; }
  /* "Cover" / "Show all" quick buttons for Size */
  .sizefill { display: flex; gap: 6px; margin: 0 0 8px; }
  .sizefill button {
    flex: 1;
    padding: 5px 8px;
    border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
    border-radius: 7px;
    background: transparent;
    color: inherit;
    font-size: 0.85em;
    cursor: pointer;
  }
  .sizefill button:hover { border-color: var(--urd-color-accent); }

  .gridmenu-divider {
    border: 0;
    border-top: 1px solid rgb(255 255 255 / 12%);
    margin: 0.2rem 0;
  }

  .filepick {
    cursor: pointer;
  }

  .filepick input {
    display: none;
  }

  button,
  .ghost {
    font: inherit;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    padding: 0.35em 0.8em;
    cursor: pointer;
    text-decoration: none;
  }

  /* Buttons must LOOK like buttons: a filled surface, clear hover and a
     small press on click. Fields (input) stay flat. */
  button,
  .ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4em;
    background: rgb(255 255 255 / 7%);
    transition: background 0.12s ease, border-color 0.12s ease, transform 0.05s ease;
  }

  button:hover:not(:disabled),
  .ghost:hover {
    background: rgb(255 255 255 / 13%);
    border-color: rgb(255 255 255 / 38%);
  }

  button:active:not(:disabled) {
    transform: translateY(1px);
  }

  /* Controls must not inherit the page's airy line-height (1.6 from
     base.css via font: inherit): a tight line box gives even centering */
  button,
  .ghost,
  input {
    line-height: 1.3;
  }

  button:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .primary {
    background: var(--urd-color-accent, #7c5cff);
    border-color: transparent;
    color: #fff;
  }




  .frame-wrap {
    flex: 1;
    min-height: 0;
    /* No scrollbar around the canvas: the page scrolls inside the iframe
       with its OWN scrollbar, so one here would be the second. Only
       manual zoom past the surface enables panning (.pan). */
    overflow: hidden;
    display: flex;
    /* 'safe' keeps the top/left from being clipped when the canvas is
       larger than the surface (100% mode): it is then anchored instead of
       centered away. */
    justify-content: safe center;
    align-items: safe center;
    background: #08090d;            /* letterbox surface around the canvas */
  }

  /* Manual zoom past the surface: then panning MUST be possible to reach the rest. */
  .frame-wrap.pan {
    overflow: auto;
  }

  /* A pinned viewport height (an editing size with a height set): the stage
     sits at the top, its bottom edge is the fold, and the surface below it
     is the letterbox that reads as "below the fold". */
  .frame-wrap.fold {
    align-items: safe flex-start;
  }

  /* The stage box has the SCALED size; the iframe inside stands in the
     full target viewport and is scaled with transform (see markup), so
     the render is identical to the published page - only the display
     size changes. */
  .stage {
    flex: 0 0 auto;
    position: relative;
  }

  iframe {
    border: 0;
    background: #fff;
    display: block;
  }

  /* Mobile view: the iframe stands at 390px (the engine's matchMedia is
     driven by urd-viewport, not the width) and is scaled to fit; dark backdrop. */
  .frame-wrap.mobile {
    background: #08090d;
  }

  .frame-wrap.mobile .stage {
    border-radius: 12px;
    overflow: hidden;
  }

  .viewswitch,
  .zoomswitch {
    display: flex;
    gap: 2px;
    align-items: center;
  }

  /* The tool clusters: a light frame around each group, with an
     uppercase label in front. The buttons inside lose their own border,
     so the group reads as one unit instead of three or four loose buttons. */
  .toolgrp {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 2px;
    border: 1px solid rgb(255 255 255 / 11%);
    border-radius: 8px;
  }

  .toolgrp .ghost { border-color: transparent; }
  .toolgrp .ghost.active { border-color: var(--urd-color-accent, #7c5cff); }

  .tool-cap {
    font-size: 0.56rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.5;
    white-space: nowrap;
  }

  /* The draft status stands in its own group between the tools and
     publishing, so it does not read as part of either. */
  .topbar-draft {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex: none;
    /* Anchor for the confirmation pill, which floats below the bar. */
    position: relative;
  }

  /* Shell for the exit transition: chip + discard slide out as ONE piece. */
  .draft-cluster {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .draft-chip {
    /* Flex, not inline: the short form "!" must center in a circle with a
       set width and height at the narrowest fold step. */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-color: color-mix(in srgb, #e2b84a 55%, transparent);
    background: color-mix(in srgb, #e2b84a 13%, transparent);
    color: #e2b84a;
    opacity: 1;
    /* .chip is 10px, sized for the panels where the surrounding text is
       small. In the top bar the buttons use font: inherit (0.9rem), so
       the chip must go up to avoid being half the size of everything
       next to it. */
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.3em 0.8em;
  }

  /* Widest: a full pill with the text. From the first fold step: just the
     circle. Armed, it grows TO THE LEFT, so everything to the right
     stands still as you click. */
  .discard-dot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    height: 1.7rem;
    padding: 0 0.75rem 0 0.6rem;
    flex: none;
    border: 1px solid color-mix(in srgb, #e2705f 55%, transparent);
    background: color-mix(in srgb, #e2705f 12%, transparent);
    color: #e2705f;
    border-radius: 999px;
    cursor: pointer;
    font: inherit;
    font-size: 0.78rem;
  }

  /* :not(:disabled) gives the hover rules in the discard family as many
     parts as the global `button:hover:not(:disabled)`, so the red surface
     wins over the white veil there. */
  .discard-dot:hover:not(:disabled) {
    background: color-mix(in srgb, #e2705f 22%, transparent);
    border-color: color-mix(in srgb, #e2705f 70%, transparent);
  }

  /* Armed changes color, not width: the confirmation lives in the pill below. */
  .discard-dot.armed,
  .discard-dot.armed:hover:not(:disabled) {
    background: #d94f3d;
    border-color: #d94f3d;
    color: #fff;
  }

  .discard-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  /* The confirmation floats below the top bar, centered under the button
     it belongs to. Its own surface and its own click target: a new
     position requires a deliberate hit, so a quick double click on the
     discard button cannot throw away the draft by accident. */
  .discard-confirm {
    position: absolute;
    top: calc(100% + 0.6rem);
    left: 50%;
    /* Centred with the translate property, not transform: the global
       button:active rule sets transform, and a transform here would be
       replaced by it while the pointer is held down, moving the pill out
       from under the pointer before the release. */
    translate: -50% 0;
    z-index: 100002;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    white-space: nowrap;
    padding: 0.4rem 0.95rem;
    border: 1px solid color-mix(in srgb, #e2705f 55%, transparent);
    border-radius: 999px;
    /* Rest borrows the discard button's resting dress: dark surface, red
       border, red text. A solid surface here keeps the pill readable
       without frost support; the frost is added in @supports below. */
    background: var(--urd-color-surface, #151a23);
    color: #e2705f;
    font: inherit;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 8px 22px rgb(0 0 0 / 40%);
  }

  /* Under the pointer it fills completely: the dangerous action flares
     into color the moment it can be triggered. */
  .discard-confirm:hover:not(:disabled) {
    background: #d94f3d;
    border-color: #d94f3d;
    color: #fff;
  }

  @supports (backdrop-filter: blur(1px)) {
    .discard-confirm {
      background: color-mix(in srgb, var(--urd-color-surface, #151a23) 72%, transparent);
      backdrop-filter: blur(14px);
    }
    /* The frost applies to the resting state. Hover is solid red,
       regardless of what lies behind. */
    .discard-confirm:hover:not(:disabled) {
      background: #d94f3d;
      backdrop-filter: none;
    }
  }

  /* ---- Foldetrinnene (the fold steps; tests/topbar-fold.test.mjs anchors
     on this heading) ---------------------------------------------------------
     The top bar keeps one height and folds in fixed steps, in this order:
     the discard text, the group labels, the button texts on the right,
     and then the clusters ONE AT A TIME. The thresholds are calibrated
     for the LONGEST language (Turkish), not Bokmål, so a step never kicks
     in too late and forces the bar to wrap. The last three each have a
     twin in FOLD_MQ. The short forms are hidden here, before the steps
     that turn them on: equal specificity means source order decides. */
  .badge-mini,
  .chip-mini { display: none; }

  /* Step 1: the discard button drops its text and becomes the circle. */
  @media (max-width: 1499px) {
    .discard-dot {
      width: 1.7rem;
      padding: 0;
    }
    .discard-label { display: none; }
  }

  /* Step 2: the uppercase labels above the clusters disappear. The
     cluster frames remain, so the three groups still read separately. */
  @media (max-width: 1359px) {
    .tool-cap { display: none; }
  }

  /* Step 3: the buttons on the right become pure icons, and the GitHub
     user yields. Publish always keeps its word: it is the bar's only
     dangerous action. */
  @media (max-width: 1179px) {
    .btn-label { display: none; }
    .badge-mini { display: inline; }
    .who { display: none; }
  }

  /* Step 4: the View cluster becomes a menu (FOLD_MQ.view). Grid and
     guides are toggled rarely, so it yields first of the three. */
  @media (max-width: 1079px) {
    .topbar { gap: 0.5rem; }
    .topbar-group { gap: 0.5rem; }
  }

  /* Step 5: the Device cluster becomes a menu (FOLD_MQ.device) and the status becomes "!". */
  @media (max-width: 999px) {
    .chip-full { display: none; }
    .chip-mini { display: inline; }
    /* The status becomes a circle the size of the discard circle next to
       it, so the two read as one pair instead of pill plus dot. */
    .draft-chip {
      width: 1.7rem;
      height: 1.7rem;
      padding: 0;
    }
  }

  /* Step 6: the Zoom cluster becomes a menu (FOLD_MQ.zoom). Zoom is
     adjusted most often of the three and therefore keeps plus and minus
     the longest. Gaps and edge margins are tightened fully at the same
     time: now they are the last thing left to take. */
  @media (max-width: 919px) {
    .topbar {
      gap: 0.4rem;
      padding-inline: 0.7rem;
    }
    .topbar-group { gap: 0.4rem; }
  }

  /* The shell around the clusters exists only as ONE node for the
     outside-click test; it must not create a box, so the children sit
     directly in the top bar's flex. */
  .toolset { display: contents; }

  /* The folded clusters: a button carrying the current value, and a
     popover below. Only one is open at a time. */
  .toolmenu {
    position: relative;
    display: inline-flex;
  }

  .toolmenu > .ghost {
    gap: 0.25em;
    padding: 0.35em 0.55em;
  }

  /* The zoom number alternates between two and three digits. A fixed
     width with tabular figures keeps the button equally wide across the
     whole scale and fills the surface. */
  .zoom-cap {
    min-width: 2.6em;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  .tool-pop {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 100002;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 10.5rem;
    padding: 6px;
    border-radius: 10px;
    border: 1px solid rgb(255 255 255 / 12%);
    background: var(--urd-color-surface, #151a23);
    box-shadow: 0 10px 30px rgb(0 0 0 / 35%);
  }

  /* Vertical menu: icon and text start at the left edge, not centered
     as the global button style does. */
  .tool-pop .ghost {
    justify-content: flex-start;
    width: 100%;
    border-color: transparent;
  }

  .tool-pop .ghost.active {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 15%, transparent);
  }

  /* The Screen setting inside a tool menu: the mode segment and the size
     fields on one compact row. */
  .tool-pop .seg {
    align-self: flex-start;
    margin: 2px 4px 4px;
  }

  .tool-pop .tb-num {
    width: 3.6rem;
    padding: 0 0.3em;
    text-align: center;
  }

  .tool-pop .mini-label {
    margin: 0 2px 0 6px;
  }

  .tool-pop-row {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .tool-pop-row .ghost {
    width: auto;
    justify-content: center;
  }

  .viewswitch .active,
  .zoomswitch .active {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 15%, transparent);
  }

  .zoom-readout {
    font-size: 0.8rem;
    opacity: 0.7;
    padding: 0 0.3em;
    min-width: 3.2em;
    text-align: right;
  }

  .badge.attention {
    background: rgb(226 184 74 / 20%);
    color: #e2b84a;
    border: 0;
    font: inherit;
    font-size: 0.78rem;
    cursor: pointer;
  }

  .loading {
    padding: 2rem;
    text-align: center;
  }
</style>
