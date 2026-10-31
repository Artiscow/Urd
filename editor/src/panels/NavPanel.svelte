<script>
  /* The Nav panel: the logo, the menu items with their drag order, the bar's variant, size, surface and behaviour, the launcher and the announcement strip. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import ColorPicker from '../lib/ColorPicker.svelte';
  import MarkPicker from '../lib/MarkPicker.svelte';
  import { PAD_Y, TEXT_SIZE, PAD_X, GAP, PILL_WIDTH, SHRINK_TO, SHRINK_AT, SHRINK_MS, COL_WIDTH, LOGO_SIZE, RADIUS, SIZE_IDS, clampRange, effectivePadY, effectiveTextSize, sizePresetOf } from '../lib/nav-size.js';
  import Dropdown from '../lib/Dropdown.svelte';
  import Choice from '../lib/Choice.svelte';
  import { ta } from '$engine/i18n.js';
  import { fontChoices } from '$engine/fonts.js';
  import { resolveLink, toolOrder, burgerModel, BURGER_ICONS, LAUNCHER_BOUNDS } from '$engine/nav-model.js';
  import { iconSvg, ICON_LIBRARY } from '$engine/icons.js';
  import { ICONS } from '../lib/icons.js';
  import BackgroundEditor from '../section/BackgroundEditor.svelte';
  import LinkField from '../lib/LinkField.svelte';
  import { linkOf, setLinkOn, linkText } from '../lib/link-edit.js';
  const ed = getContext('urd-editor');
  const grid = $derived(ed.grid);
  const siteDraft = $derived(ed.siteDraft);
  const bridge = $derived(ed.bridge);
  const { addPage, compressOrTrim, navBgCtx, setStatus, siteMutate, themeSwatches } = ed;

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

  // The burger's drawings, as nav.js draws them; «none» is a bare frame.
  const burgerSvg = (body) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">${body}</svg>`;
  const BURGER_TILE_ICONS = {
    lines: burgerSvg('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    handle: burgerSvg('<path d="M4 9h16M4 15h16"/>'),
    dots: burgerSvg('<g fill="currentColor" stroke="none"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></g>'),
    grid: burgerSvg('<g fill="currentColor" stroke="none"><circle cx="6" cy="6" r="1.6"/><circle cx="12" cy="6" r="1.6"/><circle cx="18" cy="6" r="1.6"/><circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/><circle cx="6" cy="18" r="1.6"/><circle cx="12" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/></g>'),
    none: burgerSvg('<rect x="4" y="4" width="16" height="16" rx="3" stroke-opacity="0.35"/>'),
  };
  /** The burger as the engine will draw it; the bare «none» tile is offered only beside the word. */
  const burgerLook = $derived(burgerModel(siteDraft?.nav?.style ?? {}));
  const burgerOptions = $derived(BURGER_ICONS.filter((id) => id !== 'none' || burgerLook.showLabel).map((id) => [id, ta(`opt.burger.${id}`)]));

  /** One field of nav.style.burger; the object leaves the file when nothing is set. */
  function setNavBurger(key, value) {
    siteMutate(`edit:nav-burger-${key}`, () => {
      siteDraft.nav.style ??= {};
      const burger = { ...(siteDraft.nav.style.burger ?? {}) };
      if (value === undefined) delete burger[key];
      else burger[key] = value;
      if (Object.keys(burger).length) siteDraft.nav.style.burger = burger;
      else delete siteDraft.nav.style.burger;
    });
  }

  /** Per-page visibility: the menu shows on all pages except those in nav.hideOn. */
  function toggleNavOnPage(pageId, show) {
    siteMutate('nav', () => {
      const hide = new Set(siteDraft.nav.hideOn ?? []);
      if (show) hide.delete(pageId); else hide.add(pageId);
      if (hide.size) siteDraft.nav.hideOn = [...hide]; else delete siteDraft.nav.hideOn;
    });
  }

  /** Whether any page is without the menu, which is when the way to reach it matters. */
  const navHidesSome = $derived((siteDraft?.nav?.hideOn ?? []).length > 0);

  /** How the menu is reached on an unticked page (nav.hideMode); hidden leaves the file. */
  function setNavHideMode(mode) {
    siteMutate('nav', () => {
      if (mode === 'hidden') delete siteDraft.nav.hideMode; else siteDraft.nav.hideMode = mode;
    });
  }

  /** The pull tab's design: the owner's own once any field of nav.tab is set; the choice alone opens the fields. */
  let tabOwnChoice = $state(null);
  const tabOwn = $derived(tabOwnChoice ?? Boolean(siteDraft?.nav?.tab && Object.keys(siteDraft.nav.tab).length));
  function setTabOwn(own) {
    tabOwnChoice = own;
    if (!own) siteMutate('nav', () => { delete siteDraft.nav.tab; });
  }

  /** One field of the pull tab (nav.tab); the object leaves the file when nothing is set. */
  function setNavTab(key, value) {
    siteMutate(`edit:nav-tab-${key}`, () => {
      const tab = { ...(siteDraft.nav.tab ?? {}) };
      if (value === undefined || value === '') delete tab[key]; else tab[key] = value;
      if (Object.keys(tab).length) siteDraft.nav.tab = tab; else delete siteDraft.nav.tab;
    });
  }

  /** The tab's mark from the picker: an image wins, an icon clears it. */
  function setNavTabMark(mark) {
    siteMutate('nav', () => {
      const tab = { ...(siteDraft.nav.tab ?? {}) };
      if (mark.image) tab.image = mark.image; else delete tab.image;
      if (mark.icon) tab.icon = mark.icon; else delete tab.icon;
      if (Object.keys(tab).length) siteDraft.nav.tab = tab; else delete siteDraft.nav.tab;
    });
  }

  async function uploadNavTabImage(file) {
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      siteMutate('nav', () => { siteDraft.nav.tab = { ...(siteDraft.nav.tab ?? {}), image: img.dataUrl }; });
    } catch {
      setStatus(ta('status.imageReadErrorSvg'), 'error');
    }
  }

  // The launcher's three designs, drawn as the panel they give: tiles in
  // three columns, rows with a small mark, or image cards in two columns.
  const LAUNCHER_VIEW_ICONS = {
    'grid': subSvg('<rect x="1" y="1" width="46" height="32" rx="3" stroke-opacity="0.35"/><rect x="6" y="6" width="10" height="10" rx="2.5" fill="currentColor" fill-opacity="0.3" stroke="none"/><rect x="19" y="6" width="10" height="10" rx="2.5" fill="currentColor" fill-opacity="0.3" stroke="none"/><rect x="32" y="6" width="10" height="10" rx="2.5" fill="currentColor" fill-opacity="0.3" stroke="none"/><path d="M7 20h8M20 20h8M33 20h8" stroke-opacity="0.7"/><path d="M6 26h10M19 26h10M32 26h10" stroke-opacity="0.35"/>'),
    'list': subSvg('<rect x="1" y="1" width="46" height="32" rx="3" stroke-opacity="0.35"/><rect x="6" y="6" width="7" height="7" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none"/><rect x="6" y="17" width="7" height="7" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none"/><path d="M17 9.5h24M17 20.5h18" stroke-opacity="0.7"/>'),
    'cover': subSvg('<rect x="1" y="1" width="46" height="32" rx="3" stroke-opacity="0.35"/><rect x="6" y="6" width="16" height="12" rx="2.5" fill="currentColor" fill-opacity="0.3" stroke="none"/><rect x="26" y="6" width="16" height="12" rx="2.5" fill="currentColor" fill-opacity="0.3" stroke="none"/><path d="M6 14h16M26 14h16" stroke-opacity="0.55" stroke-width="3"/><path d="M6 23h12M26 23h12" stroke-opacity="0.35"/>'),
  };

  /** The title typed for «new page as menu item» in the Nav panel. */
  let navNewPageTitle = $state('');

  function addPageAsNavItem() {
    if (!navNewPageTitle.trim()) return;
    ed.newPageTitle = navNewPageTitle;
    ed.newPageTemplate = null;
    // The title stays in the field when the slug is rejected, so it can be
    // corrected rather than typed again.
    if (addPage() !== false) navNewPageTitle = '';
  }

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

  function setNavLayout(value) {
    siteMutate('nav', () => { siteDraft.nav.layout = value; });
  }

  /** Whether a tool has a card in the panel: the theme button only with an alt theme to switch to. */
  const toolShown = (id) => id !== 'theme' || !!siteDraft.theme?.alt?.tokens;

  /** The tools with a card, in the cluster's order. */
  const shownTools = $derived(toolOrder(siteDraft?.nav?.style ?? {}).filter(toolShown));

  /** The tool cluster's order (nav.style.tools.order): the list is stored whole. A tool
      without a card is stepped over, so every press moves something visible. */
  function moveTool(id, dir) {
    const order = toolOrder(siteDraft.nav.style ?? {});
    const from = order.indexOf(id);
    let to = from + dir;
    while (to >= 0 && to < order.length && !toolShown(order[to])) to += dir;
    if (from < 0 || to < 0 || to >= order.length) return;
    [order[from], order[to]] = [order[to], order[from]];
    setNavTools('order', order);
  }

  function setNavTools(key, value) {
    siteMutate(`edit:nav-tools-${key}`, () => {
      siteDraft.nav.style ??= {};
      const next = { ...(siteDraft.nav.style.tools ?? {}) };
      if (value === undefined) delete next[key];
      else next[key] = value;
      if (Object.keys(next).length) siteDraft.nav.style.tools = next;
      else delete siteDraft.nav.style.tools;
    });
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

  /** The three-state mobile switches: '' is «same as desktop», the other
   *  two write the boolean the phone should use. */
  const navMobileFlag = (key) => {
    const v = siteDraft?.nav?.style?.mobile?.[key];
    return v === undefined ? '' : (v ? 'on' : 'off');
  };

  const setNavMobileFlag = (key, v) => setNavMobile(key, v === '' ? undefined : v === 'on');

  /** The phone's border: '' is «same as desktop», none removes it there. */
  const setNavMobileBorder = (side) => setNavMobile('border', side ? { ...(siteDraft.nav.style?.mobile?.border ?? {}), side } : undefined);

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

  /** The launcher button's default mark, drawn as the menu draws it. */
  const LAUNCHER_DOTS = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">'
    + [6, 12, 18].flatMap((y) => [6, 12, 18].map((x) => `<circle cx="${x}" cy="${y}" r="1.6"/>`)).join('')
    + '</svg>';

  /** Which shortcut row is open in the Tools group; one at a time. */
  let launcherOpen = $state(null);

  /**
   * The marks already uploaded for this launcher, the button's included:
   * the picker offers them again, so one image can serve several shortcuts.
   */
  function launcherImages() {
    const launcher = siteDraft.nav?.launcher;
    return [launcher?.image, ...(launcher?.links ?? []).map((link) => link.image)].filter(Boolean);
  }

  /** The picker hands over both fields at once: an image wins, an icon clears it. */
  function setLauncherMark(i, mark) {
    siteMutate('nav', () => {
      siteDraft.nav.launcher ??= { links: [] };
      const row = i === null ? siteDraft.nav.launcher : siteDraft.nav.launcher.links[i];
      if (mark.image) row.image = mark.image;
      else delete row.image;
      if (mark.icon) row.icon = mark.icon;
      else delete row.icon;
    });
  }

  /** A field on the launcher itself; undefined removes it. */
  function setLauncher(key, value) {
    siteMutate(`edit:nav-launcher-${key}`, () => {
      siteDraft.nav.launcher ??= { links: [] };
      if (value === undefined) delete siteDraft.nav.launcher[key];
      else siteDraft.nav.launcher[key] = value;
    });
  }

  /** One of the launcher's own px values, within its bounds; an empty field gives the part back to the size. */
  function setLauncherPx(event, key) {
    const raw = event.target.value;
    setLauncher(key, raw === '' ? undefined : clampRange(raw, LAUNCHER_BOUNDS[key], undefined));
    event.target.value = siteDraft.nav.launcher?.[key] ?? '';
  }

  function addLauncherLink() {
    siteMutate('nav', () => {
      siteDraft.nav.launcher ??= { links: [] };
      siteDraft.nav.launcher.links ??= [];
      siteDraft.nav.launcher.links.push({ label: ta('seed.link'), href: '', icon: 'globe' });
    });
  }

  function removeLauncherLink(i) {
    siteMutate('nav', () => { siteDraft.nav.launcher.links.splice(i, 1); });
  }

  function moveLauncherLink(i, dir) {
    siteMutate('nav', () => {
      const links = siteDraft.nav.launcher.links;
      const j = i + dir;
      if (j < 0 || j >= links.length) return;
      [links[i], links[j]] = [links[j], links[i]];
    });
  }

  function setLauncherLink(i, key, value) {
    siteMutate(`edit:nav-launcher-${key}-${i}`, () => { siteDraft.nav.launcher.links[i][key] = value; });
  }

  /**
   * An own image for the button or for one shortcut (i = null is the
   * button): the same webp flow as the logo, materialized into media/ on
   * publish.
   */
  async function uploadLauncherImage(file, i) {
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      siteMutate('nav', () => {
        siteDraft.nav.launcher ??= { links: [] };
        if (i === null) siteDraft.nav.launcher.image = img.dataUrl;
        else siteDraft.nav.launcher.links[i].image = img.dataUrl;
      });
    } catch {
      setStatus(ta('status.imageReadErrorSvg'), 'error');
    }
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

  /** How far down the shrink starts, and how long it takes; the defaults are
   *  never stored, like the other size fields. */
  function setNavShrinkAt(px) {
    const v = clampRange(px, SHRINK_AT, 80);
    setNavStyle('shrinkAt', v === 80 ? undefined : v);
  }

  function setNavShrinkMs(ms) {
    const v = clampRange(ms, SHRINK_MS, 220);
    setNavStyle('shrinkMs', v === 220 ? undefined : v);
  }

  /** The effect color on hover: only where the style has an effect, with a
      label saying what the color actually controls in the chosen style. */
  const HOVER_COLOR_LABELS = {
    underline: [ta('hoverColor.underline.label'), ta('hoverColor.underline.title')],
    pill: [ta('hoverColor.pill.label'), ta('hoverColor.pill.title')],
    lift: [ta('hoverColor.lift.label'), ta('hoverColor.lift.title')],
  };

  const hoverColorLabel = $derived(HOVER_COLOR_LABELS[siteDraft?.nav?.style?.hover] ?? null);

  /** The launcher's three designs, for the desktop panel and the mobile menu alike. */
  const launcherViewOptions = $derived([
    ['grid', ta('opt.launcherView.grid')],
    ['list', ta('opt.launcherView.list')],
    ['cover', ta('opt.launcherView.cover')],
  ]);

  /** The submenu designs on offer: the column has no card, flat surface or flyout. */
  const subStyleOptions = $derived(sideVariant
    ? [['card', ta('common.standard')], ['pills', ta('opt.sub.pills')], ['lines', ta('opt.sub.lines')]]
    : [['card', ta('opt.sub.card')], ['flat', ta('opt.sub.flat')], ['pills', ta('opt.sub.pills')], ['lines', ta('opt.sub.lines')], ['flyout', ta('opt.sub.flyout')]]);

  /** Variant (additive): the default (bar) is not stored in the file. The
      three floating forms are presets of the corner rounding, so a switch
      clears a rounding value entered for the previous form. */
  function setNavVariant(value) {
    if ((siteDraft.nav.variant ?? 'bar') === value) return;
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

  function setNavLabel(i, value) {
    siteMutate(`edit:nav-label-${i}`, () => { siteDraft.nav.items[i].label = value; });
  }

  /** The item at a place in the menu: the top level (i), a submenu item (i, j) or a second-level item (i, j, k). */
  function navNode(i, j = null, k = null) {
    let node = siteDraft.nav.items[i];
    if (j !== null) node = node.children[j];
    if (k !== null) node = node.children[k];
    return node;
  }

  /** An emptied name takes the linked page's title, the link's address, or the seed word, so no item is published without a name (the schema's minLength 1). */
  function fillNavLabel(i, j = null, k = null) {
    const node = navNode(i, j, k);
    if (node?.label?.trim()) return;
    const page = node.page ? siteDraft.pages.find((p) => p.id === node.page) : null;
    siteMutate(`edit:nav-label-fill-${i}-${j}-${k}`, () => { node.label = page?.title || node.href || ta('seed.link'); });
  }

  /** A menu item's link, or a submenu item's (j, and k one level down), from the link editor; an item with a submenu and no link is the submenu's opener. */
  function setNavLink(i, j, link, k = null) {
    siteMutate('nav', () => setLinkOn(navNode(i, j, k), link));
  }

  /** The one-line description under an item at any level; an emptied field leaves the file. */
  function setNavDescription(i, j, k, value) {
    siteMutate(`edit:nav-desc-${i}-${j}-${k}`, () => {
      const node = navNode(i, j, k);
      if (value.trim()) node.description = value; else delete node.description;
    });
  }

  /** A top-level item's look (item.look): a button, or plain, which leaves the file. */
  function setNavLook(i, look) {
    siteMutate('nav', () => {
      if (look === 'button') siteDraft.nav.items[i].look = 'button'; else delete siteDraft.nav.items[i].look;
    });
  }

  /** The card's closing: its fold shrinks its one grid row to nothing, the mirror of the opening animation in app.css. */
  function foldOut(node, { duration }) {
    return { duration, easing: cubicOut, css: (t) => `grid-template-rows: ${t}fr` };
  }

  /** The marks on a closed row: the button look and a description. */
  const PILL_ICON = '<svg width="14" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="8" width="18" height="8" rx="4"/></svg>';
  const DESC_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h9"/></svg>';
  const CHEV_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

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
      stood (a drop inside the list has already taken it and cleared the position). A drag
      cancelled with Escape reports no drop effect and moves nothing; so does a release
      outside the admin's own document, which the effect below cannot accept. */
  function endNavDrag(e) {
    if (navDrop && e?.dataTransfer?.dropEffect !== 'none') dropNavRow(navDrop.key);
    navDrag = ''; navDrop = null;
  }

  // While a menu row is dragged the whole admin document accepts the drop, so a release
  // beside the list is a drop (with an effect) and Escape is the only cancel.
  $effect(() => {
    if (!navDrag) return;
    const accept = (e) => e.preventDefault();
    window.addEventListener('dragover', accept);
    window.addEventListener('drop', accept);
    return () => {
      window.removeEventListener('dragover', accept);
      window.removeEventListener('drop', accept);
    };
  });

  /** The drag's own data type: a row key that no text field can take as text. */
  const NAV_DRAG_TYPE = 'application/x-urd-nav-row';

  /** Drag over the whole list: over a row the row's zones decide; in a gap, on the clone or below
      the last row the nearest row by its midpoint decides, so the clone never flips while it pushes
      the rows. Below everything the drop is the end of the top level. */
  function onNavListDragOver(e) {
    if (!navDrag) return;
    const rows = [...e.currentTarget.querySelectorAll('.nav-item:not(.ghost):not(.grand)')];
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
      if (src.parent && src.parent.children.length === 0) {
        // An empty submenu is removed from the file; a pure opener left
        // without children has no target and gets the front page, so the
        // item stays valid (the same rule as removeNavChild).
        delete src.parent.children;
        if (!src.parent.page && !src.parent.href) src.parent.page = siteDraft.pages[0].id;
      }
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

  /** A new submenu item under a top-level item, or under a submenu item (j) as the second level. */
  function addNavChild(i, j = null) {
    siteMutate('nav', () => {
      const item = navNode(i, j);
      item.children ??= [];
      item.children.push({ label: ta('seed.link'), page: siteDraft.pages[0].id });
    });
  }

  function setNavChildLabel(i, j, value, k = null) {
    siteMutate(`edit:nav-child-label-${i}-${j}-${k}`, () => { navNode(i, j, k).label = value; });
  }

  /** Moves a submenu item (i, j), or a second-level item (i, j, k), one step within its list. */
  function moveNavChild(i, j, dir, k = null) {
    const children = k === null ? navNode(i).children : navNode(i, j).children;
    const at = k === null ? j : k;
    const to = at + dir;
    if (to < 0 || to >= children.length) return;
    siteMutate('nav', () => { [children[at], children[to]] = [children[to], children[at]]; });
  }

  /** Removes a submenu item (i, j), or a second-level item (i, j, k). */
  function removeNavChild(i, j, k = null) {
    siteMutate('nav', () => {
      const item = k === null ? navNode(i) : navNode(i, j);
      item.children.splice(k === null ? j : k, 1);
      if (item.children.length === 0) {
        // An empty submenu is removed from the file; a pure opener without
        // children has no target and gets the front page, so the item
        // stays valid.
        delete item.children;
        if (!item.page && !item.href && !item.target) item.page = siteDraft.pages[0].id;
      }
    });
  }
</script>

<div class="panel-body">
  <!-- Eight groups by what the owner sets together, in the order a menu is set up: the items, the logo, the bar's layout and size, its colours and frame,
       the phone, scrolling and the pages the menu shows on, the tools beside the burger and the announcement bar. -->
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
      <div class="nav-head">
        <span class="nav-grip">{@html GRIP_ICON}</span>
        <span class="nav-head-name ghost-name">{g.label}</span>
        <span class="nav-head-link ghost-target">{g.target}</span>
      </div>
    </div>
  {/snippet}
  <!-- One row per item at every level: closed it is one line with the name,
       the link, small marks for what is set and the arrows; open it is a
       card with every field. One row is open at a time. The top two levels
       are reordered by dragging the row's head (a faint clone shows where
       the row lands, the middle of a top-level row takes it in as a child,
       and the grip column of a child row leads back out); the second level
       is ordered with the arrows alone. -->
  {#snippet navCard(node, key, level, i, j, k, index, count)}
    {@const open = navSel === key}
    <div class="nav-item" class:child={level === 1} class:grand={level === 2} class:open class:dragging={navDrag === key}
      data-key={level < 2 ? key : undefined}
      class:drop-target={level === 0 && navDrop?.key === key && navDrop.pos === 'into'}>
      <!-- The head is the handle: the fields sit in the body, so a drag never fights a text selection -->
      <div class="nav-head" draggable={level < 2 ? 'true' : undefined} title={level < 2 ? ta('tip.nav.dragItem') : undefined}
        onclick={(e) => { e.stopPropagation(); navSel = open ? '' : key; }}
        ondragstart={(e) => { if (level === 2) { e.preventDefault(); return; } e.stopPropagation(); navDrag = key; e.dataTransfer?.setData(NAV_DRAG_TYPE, key); }}
        ondragend={endNavDrag}>
        {#if level < 2}<span class="nav-grip">{@html GRIP_ICON}</span>{/if}
        <span class="nav-head-name">{node.label || ta('seed.link')}</span>
        <span class="nav-head-link">{linkText(linkOf(node), { pages: siteDraft.pages }) || (node.children?.length ? ta('opt.noLink') : '')}</span>
        {#if node.look === 'button'}<span class="nav-head-mark" title={ta('opt.navLook.button')}>{@html PILL_ICON}</span>{/if}
        {#if node.description}<span class="nav-head-mark" title={node.description}>{@html DESC_ICON}</span>{/if}
        {#if node.children?.length}<span class="nav-item-sub" title={ta('tip.nav.hasSubmenu')}>{@html SUB_ICON}</span>{/if}
        <span class="nav-head-tools" onclick={(e) => e.stopPropagation()}>
          <button class="ghost nav-act" title={ta('tip.moveUp')} disabled={index === 0}
            onclick={() => (level === 0 ? moveNavItem(i, -1) : moveNavChild(i, j, -1, level === 2 ? k : null))}>{@html ICONS.up}</button>
          <button class="ghost nav-act" title={ta('tip.moveDown')} disabled={index === count - 1}
            onclick={() => (level === 0 ? moveNavItem(i, 1) : moveNavChild(i, j, 1, level === 2 ? k : null))}>{@html ICONS.down}</button>
        </span>
        <button class="ghost nav-act nav-chev" aria-expanded={open} title={ta('tip.nav.openItem')} aria-label={ta('tip.nav.openItem')}>{@html CHEV_ICON}</button>
      </div>
      {#if open}
        <!-- The fold grows from nothing as the card opens (a CSS animation on the wrapper, drawn with the first frame) and shrinks back as it closes -->
        <div class="nav-fold" out:foldOut={{ duration: ed.reducedMotion ? 0 : 160 }}>
        <div class="nav-body">
          <span class="nav-body-label">{ta('lbl.name')}</span>
          <input class="field-filled" value={node.label} title={level === 0 ? ta('tip.nav.itemLabel') : ta('tip.nav.childLabel')}
            oninput={(e) => (level === 0 ? setNavLabel(i, e.target.value) : setNavChildLabel(i, j, e.target.value, level === 2 ? k : null))}
            onblur={() => fillNavLabel(i, level === 0 ? null : j, level === 2 ? k : null)} />
          <span class="nav-body-label">{ta('lbl.link')}</span>
          <!-- An item with items under it may have no link and is then their opener -->
          <LinkField scope="site" value={linkOf(node)} title={ta('tip.linkTarget')} removable={Boolean(node.children?.length)}
            placeholder={node.children?.length ? ta('opt.noLink') : ''}
            onchange={(link) => setNavLink(i, level === 0 ? null : j, link, level === 2 ? k : null)} />
          <span class="nav-body-label">{ta('ph.nav.itemDescription')}</span>
          <input class="field-filled" value={node.description ?? ''} placeholder={ta('ph.nav.itemDescription')} title={ta('tip.nav.itemDescription')}
            oninput={(e) => setNavDescription(i, level === 0 ? null : j, level === 2 ? k : null, e.target.value)} />
          {#if level === 0}
            <div class="nav-body-wide">
              <Choice label={ta('lbl.navItemLook')} title={ta('tip.nav.itemButton')} value={node.look === 'button' ? 'button' : 'plain'}
                options={[['plain', ta('opt.navLook.plain')], ['button', ta('opt.navLook.button')]]}
                onchange={(v) => setNavLook(i, v)} />
            </div>
          {/if}
          <div class="nav-body-actions">
            {#if level < 2}
              <button class="ghost action" onclick={() => addNavChild(i, level === 0 ? null : j)}>{level === 0 ? ta('ui.addMenuChild') : ta('ui.addMenuGrandchild')}</button>
            {/if}
            <span class="nav-body-spacer"></span>
            <button class="ghost nav-act" title={level === 0 ? ta('tip.nav.removeItem') : ta('tip.nav.removeChild')}
              onclick={() => { navSel = ''; if (level === 0) removeNavItem(i); else removeNavChild(i, j, level === 2 ? k : null); }}>{@html ICONS.cross}</button>
          </div>
        </div>
        </div>
      {/if}
    </div>
  {/snippet}
  <div class="nav-list" role="list"
    ondragover={onNavListDragOver}
    ondrop={(e) => { e.preventDefault(); dropNavRow(navDrop?.key ?? ''); }}>
  {#each siteDraft.nav.items as item, i (i)}
    {@const key = `${i}`}
    {#if navDrop?.key === key && navDrop.pos === 'before'}{@render navGhost(false)}{/if}
    {@render navCard(item, key, 0, i, null, null, i, siteDraft.nav.items.length)}
    {#each item.children ?? [] as child, j (j)}
      {@const ckey = `${i}.${j}`}
      {#if navDrop?.key === ckey && navDrop.pos === 'before'}{@render navGhost(true)}{/if}
      {@render navCard(child, ckey, 1, i, j, null, j, item.children.length)}
      {#each child.children ?? [] as grand, k (k)}
        {@render navCard(grand, `${i}.${j}.${k}`, 2, i, j, k, k, child.children.length)}
      {/each}
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
      <!-- The submenus' look and behaviour, once an item has a submenu -->
      {#if siteDraft.nav.items?.some((item) => item.children?.length)}
      <hr class="gridmenu-divider" />
      <p class="mini-label group-sub">{ta('group.submenu')}</p>
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
      {#if sideVariant}
        <!-- The column: accordions, or every submenu open from the start
             (then the arrow is a choice of its own, off by default) -->
        <Choice label={ta('lbl.sideSubs')} title={ta('tip.nav.sideSubs')} value={siteDraft.nav.style?.sideSubs ?? 'collapsed'}
          options={[['collapsed', ta('opt.mobileSubs.collapsed')], ['expanded', ta('opt.mobileSubs.expanded')]]}
          onchange={(v) => setNavStyle('sideSubs', v === 'collapsed' ? undefined : v)} />
        {#if siteDraft.nav.style?.sideSubs === 'expanded'}
          <label class="gridmenu-snap" title={ta('tip.nav.sideSubArrow')}>
            <input type="checkbox" checked={siteDraft.nav.style?.sideSubArrow === true}
              onchange={(e) => setNavStyle('sideSubArrow', e.target.checked ? true : undefined)} />
            {ta('lbl.sideSubArrow')}
          </label>
        {/if}
      {/if}
      {#if !sideVariant || siteDraft.nav.style?.sideSubs !== 'expanded'}
        <Choice label={ta('lbl.subOpen')} title={ta('tip.nav.subOpen')} value={siteDraft.nav.style?.subOpen ?? 'hover'}
          options={[['hover', ta('opt.subOpen.hover')], ['stay', ta('opt.subOpen.stay')], ['click', ta('opt.subOpen.click')]]}
          onchange={(v) => setNavStyle('subOpen', v === 'hover' ? undefined : v)} />
      {/if}
      {#if siteDraft.nav.style?.subStyle === 'pills'}
        <label title={ta('tip.nav.subPillColor')}>{ta('lbl.subPillColor')}
          <ColorPicker value={siteDraft.nav.style?.subPillColor ?? 'surface'} tokens={themeSwatches()}
            label={ta('tip.nav.subPillColorPick')} onchange={(hex) => setNavStyle('subPillColor', hex)} /></label>
      {/if}
      <Choice label={ta('lbl.columns')} title={ta('tip.nav.subColumns')} value={String(siteDraft.nav.style?.subColumns ?? 1)}
        options={[['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']]}
        onchange={(v) => setNavStyle('subColumns', Number(v) > 1 ? Number(v) : undefined)} />
      {/if}
    </div>
  </details>
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
            options={fontChoices(ta, [['', ta('common.inherit')]])}
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
    <summary>{ta('group.navLayoutSize')}</summary>
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
            placeholder={siteDraft.nav.variant === 'floating-square' ? '0' : ''}
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
          <input type="checkbox" checked={siteDraft.nav.style?.inset !== false}
            onchange={(e) => setNavStyle('inset', e.target.checked ? undefined : false)} />
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
      <hr class="gridmenu-divider" />
      <p class="mini-label group-sub" title={ta('tip.nav.sizePreset')}>{ta('lbl.size')}</p>
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
  <details class="group">
    <summary>{ta('group.navColoursFrame')}</summary>
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
      <hr class="gridmenu-divider" />
      <p class="mini-label group-sub">{ta('lbl.background')}</p>
      {#if siteDraft.nav.style?.atTop === 'clear' && !sideVariant}
        <span class="field-note" title={ta('tip.nav.bgAtTop')}><i class="note-dot"></i>{ta('lbl.navBgOnScroll')}</span>
      {/if}
      <BackgroundEditor bg={navBgCtx} layers={siteDraft.nav?.style?.background?.layers ?? []} />
      {#if !sideVariant}
        <hr class="gridmenu-divider" />
        <p class="mini-label group-sub">{ta('group.navFrame')}</p>
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
  <details class="group">
    <summary title={ta('tip.nav.mobileSame')}>{ta('group.mobile')}</summary>
    <div class="group-items">
      <!-- Two parts: the bar on a phone, where every choice starts on «same as on the desktop» and only then writes a value of its own, and the menu the burger opens.
           The floating and column fields have no counterpart here: the phone is a bar with a burger, where they do nothing. -->
      <p class="mini-label group-sub">{ta('lbl.navPhoneBar')}</p>
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
        <label class="field-stack" title={ta('tip.nav.mobileSize')}>
          <span class="mini-label">{ta('lbl.size')}</span>
          <Dropdown filled value={siteDraft.nav.style?.mobile?.size ?? ''}
            options={[['', ta('lbl.navSameAsDesktop')], ...SIZE_IDS.map((id) => [id, ta(`opt.size.${id}`)])]}
            onchange={(v) => setNavMobile('size', v || undefined)} />
        </label>
        <label class="field-stack" title={ta('tip.nav.mobileBorder')}>
          <span class="mini-label">{ta('lbl.navBorder')}</span>
          <Dropdown filled value={siteDraft.nav.style?.mobile?.border?.side ?? ''}
            options={[['', ta('lbl.navSameAsDesktop')], ['none', ta('common.none')], ['bottom', ta('opt.navBorder.bottom')], ['top', ta('opt.navBorder.top')], ['both', ta('opt.navBorder.both')], ['all', ta('opt.navBorder.all')]]}
            onchange={(v) => setNavMobileBorder(v)} />
        </label>
      </div>
      <!-- Width and colour only where the phone draws a border of its own -->
      {#if siteDraft.nav.style?.mobile?.border?.side && siteDraft.nav.style.mobile.border.side !== 'none'}
        <span class="toolbar-row ctl-end">
          <span class="mini-label" title={ta('tip.nav.borderWidth')}>{ta('lbl.navBorderWidth')}</span>
          <input type="number" class="tb-num" min="1" max="8" title={ta('tip.nav.borderWidth')}
            value={siteDraft.nav.style.mobile.border.width ?? 1}
            onchange={(e) => {
              const w = clampRange(e.target.value, { min: 1, max: 8 }, 1);
              const border = { ...siteDraft.nav.style.mobile.border };
              if (w === 1) delete border.width; else border.width = w;
              setNavMobile('border', border);
              e.target.value = siteDraft.nav.style.mobile.border.width ?? 1;
            }} />
          <span class="mini-label" title={ta('tip.nav.borderColorPick')}>{ta('lbl.navBorderColor')}</span>
          <ColorPicker value={siteDraft.nav.style.mobile.border.color ?? 'text'} tokens={themeSwatches()}
            label={ta('tip.nav.borderColorPick')}
            onchange={(hex) => setNavMobile('border', { ...siteDraft.nav.style.mobile.border, color: hex })} />
        </span>
      {/if}
      <Choice label={ta('lbl.navPlacement')} title={ta('tip.nav.mobileLayout')} value={siteDraft.nav.style?.mobile?.layout ?? ''}
        options={[['', ta('lbl.navSameAsDesktop')], ['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
        onchange={(v) => setNavMobile('layout', v || undefined)} />
      <Choice label={ta('lbl.navToolButtons')} title={ta('tip.nav.mobileTools')} value={siteDraft.nav.style?.mobile?.tools?.side ?? ''}
        options={[['', ta('lbl.navSameAsDesktop')], ['start', ta('common.left')], ['end', ta('common.right')]]}
        onchange={(v) => setNavMobile('tools', v ? { side: v } : undefined)} />
      <!-- Over the top section and the content width: the bar only, the floating forms and the column are out of the flow already -->
      {#if !floatingVariant && !sideVariant}
        <Choice label={ta('lbl.navOverlay')} title={ta('tip.nav.mobileOverlay')} value={navMobileFlag('overlay')}
          options={[['', ta('lbl.navSameAsDesktop')], ['on', ta('common.on')], ['off', ta('common.off')]]}
          onchange={(v) => setNavMobileFlag('overlay', v)} />
        <Choice label={ta('lbl.navInset')} title={ta('tip.nav.inset')} value={navMobileFlag('inset')}
          options={[['', ta('lbl.navSameAsDesktop')], ['on', ta('common.on')], ['off', ta('common.off')]]}
          onchange={(v) => setNavMobileFlag('inset', v)} />
      {/if}
      <hr class="gridmenu-divider" />
      <p class="mini-label group-sub">{ta('lbl.navPhoneMenu')}</p>
      <Choice label={ta('lbl.mobileMenu')} title={ta('tip.nav.mobileMenu')} value={siteDraft.nav.style?.mobileMenu ?? 'dropdown'}
        options={[['dropdown', ta('opt.mobileMenu.dropdown')], ['sheet', ta('opt.mobileMenu.sheet')]]}
        onchange={(v) => setNavStyle('mobileMenu', v === 'dropdown' ? undefined : v)} />
      {#if siteDraft.nav.style?.mobileMenu === 'sheet'}
          <label class="field-stack" title={ta('tip.nav.sheetMotion')}>
            <span class="mini-label">{ta('lbl.sheetMotion')}</span>
            <Dropdown filled value={siteDraft.nav.style?.sheetMotion ?? 'top'}
              options={['top', 'bottom', 'left', 'right', 'fade', 'none'].map((m) => [m, ta(`opt.sheetMotion.${m}`)])}
              onchange={(v) => setNavStyle('sheetMotion', v === 'top' ? undefined : v)} />
          </label>
      {/if}
      <!-- The burger's drawing and the word beside it; the bare tile only once the word is on -->
      <div class="ctl-field" title={ta('tip.nav.burgerIcon')}>
        <span class="mini-label">{ta('lbl.burgerIcon')}</span>
        <div class="tile-grid" class:cols-5={burgerLook.showLabel} class:cols-4={!burgerLook.showLabel} role="group" aria-label={ta('lbl.burgerIcon')}>
          {#each burgerOptions as [v, text] (v)}
            <button type="button" class="tile" class:on={burgerLook.icon === v} aria-pressed={burgerLook.icon === v}
              onclick={() => setNavBurger('icon', v === 'lines' ? undefined : v)}>{@html BURGER_TILE_ICONS[v]}<span>{text}</span></button>
          {/each}
        </div>
      </div>
      <label class="gridmenu-snap" title={ta('tip.nav.burgerLabel')}>
        <input type="checkbox" checked={burgerLook.showLabel}
          onchange={(e) => setNavBurger('showLabel', e.target.checked ? true : undefined)} />
        {ta('lbl.burgerLabel')}
      </label>
      {#if burgerLook.showLabel}
        <input placeholder={ta('ph.nav.burgerLabel')} title={ta('tip.nav.burgerText')}
          value={siteDraft.nav.style?.burger?.label ?? ''}
          oninput={(e) => setNavBurger('label', e.target.value.trim() ? e.target.value : undefined)} />
      {/if}
      {#if siteDraft.nav.style?.mobileMenu === 'sheet'}
        <label class="gridmenu-snap" title={ta('tip.nav.sheetLogo')}>
          <input type="checkbox" checked={siteDraft.nav.style?.sheetLogo === true}
            onchange={(e) => setNavStyle('sheetLogo', e.target.checked ? true : undefined)} />
          {ta('lbl.sheetLogo')}
        </label>
        {#if siteDraft.theme?.alt?.tokens && siteDraft.nav.style?.tools?.theme !== false}
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
        <!-- Only with a strip to move: without it the setting does nothing -->
        {#if siteDraft.nav.announcement?.show}
          <label class="gridmenu-snap" title={ta('tip.nav.sheetAnnounce')}>
            <input type="checkbox" checked={siteDraft.nav.style?.sheetAnnounce === true}
              onchange={(e) => setNavStyle('sheetAnnounce', e.target.checked ? true : undefined)} />
            {ta('lbl.sheetAnnounce')}
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
        <label title={ta('tip.nav.sheetTextColorPick')}>{ta('lbl.textColor')}
          <ColorPicker value={siteDraft.nav.style?.sheet?.textColor ?? siteDraft.nav.style?.textColor ?? 'text'} tokens={themeSwatches()}
            label={ta('tip.nav.sheetTextColorPick')} onchange={(hex) => setNavSheet('textColor', hex)} /></label>
      {/if}
      {#if siteDraft.nav.items?.some((item) => item.children?.length)}
        <Choice label={ta('lbl.mobileSubs')} title={ta('tip.nav.mobileSubs')} value={siteDraft.nav.style?.mobileSubs ?? 'collapsed'}
          options={[['collapsed', ta('opt.mobileSubs.collapsed')], ['expanded', ta('opt.mobileSubs.expanded')]]}
          onchange={(v) => setNavStyle('mobileSubs', v === 'collapsed' ? undefined : v)} />
      {/if}
    </div>
  </details>
  <details class="group">
    <summary>{ta('group.navScrollPages')}</summary>
    <div class="group-items">
      <!-- What happens when the page scrolls (the bar and the floating forms; the column stands still), then the pages the menu shows on -->
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
            <div class="ctl-row" title={ta('tip.nav.shrinkAt')}>
              <span class="mini-label ctl-name">{ta('lbl.navShrinkAt')}</span>
              <input type="range" min="0" max="400" step="10"
                value={siteDraft.nav.style?.shrinkAt ?? 80}
                oninput={(e) => setNavShrinkAt(e.target.valueAsNumber)} />
              <span class="gridmenu-value">{siteDraft.nav.style?.shrinkAt ?? 80} px</span>
            </div>
            <div class="ctl-row" title={ta('tip.nav.shrinkMs')}>
              <span class="mini-label ctl-name">{ta('lbl.navShrinkMs')}</span>
              <input type="range" min="0" max="1200" step="20"
                value={siteDraft.nav.style?.shrinkMs ?? 220}
                oninput={(e) => setNavShrinkMs(e.target.valueAsNumber)} />
              <span class="gridmenu-value">{siteDraft.nav.style?.shrinkMs ?? 220} ms</span>
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
      <hr class="gridmenu-divider" />
      {/if}
      <p class="mini-label group-sub" title={ta('tip.nav.hideMode')}>{ta('group.showNavOnPages')}</p>
      <!-- Two pages to a row, so a site with many pages keeps a short list -->
      <div class="page-switches">
        {#each siteDraft.pages ?? [] as pg (pg.id)}
          <label class="gridmenu-snap" title={ta('tip.nav.hideOnPage')}>
            <input type="checkbox"
              checked={!(siteDraft.nav.hideOn ?? []).includes(pg.id)}
              onchange={(e) => toggleNavOnPage(pg.id, e.target.checked)} />
            <span class="page-switch-name">{pg.title || pg.id}</span>
          </label>
        {/each}
      </div>
      <!-- How the menu is reached on the unticked pages, and the pull tab's design once a reveal is chosen -->
      {#if navHidesSome}
        <Choice label={ta('lbl.navHideMode')} title={ta('tip.nav.hideMode')} value={siteDraft.nav.hideMode ?? 'hidden'}
          options={['hidden', 'hover', 'ghost', 'tab'].map((m) => [m, ta(`opt.navHide.${m}`)])}
          onchange={setNavHideMode} />
        {#if (siteDraft.nav.hideMode ?? 'hidden') !== 'hidden'}
          <Choice label={ta('lbl.navTab')} title={ta('tip.nav.tabDesign')} value={tabOwn ? 'own' : 'default'}
            options={[['default', ta('opt.navTab.default')], ['own', ta('opt.navTab.own')]]}
            onchange={(v) => setTabOwn(v === 'own')} />
          {#if tabOwn}
            <div class="lrow-fields">
              <span class="lrow-actions">
                <MarkPicker icon={siteDraft.nav.tab?.icon ?? ''} image={siteDraft.nav.tab?.image ?? ''} images={[...launcherImages(), siteDraft.nav.tab?.image].filter(Boolean)}
                  klass="linkish" label={ta('tip.nav.tabMark')}
                  onpick={setNavTabMark} onfile={uploadNavTabImage}>
                  {ta('mp.changeMark')}
                </MarkPicker>
                {#if siteDraft.nav.tab?.image}
                  <img class="tab-mark-preview" src={siteDraft.nav.tab.image} alt="" />
                {:else if siteDraft.nav.tab?.icon}
                  <span class="tab-mark-preview">{@html iconSvg(siteDraft.nav.tab.icon) || ''}</span>
                {/if}
              </span>
              <input class="field-filled" value={siteDraft.nav.tab?.label ?? ''} placeholder={ta('ph.nav.burgerLabel')} title={ta('tip.nav.tabLabel')}
                onchange={(e) => setNavTab('label', e.target.value.trim())} />
              <label title={ta('tip.nav.tabColor')}>{ta('lbl.colour')}
                <ColorPicker value={siteDraft.nav.tab?.color ?? 'surface'} tokens={themeSwatches()}
                  label={ta('tip.nav.tabColor')} onchange={(hex) => setNavTab('color', hex)} /></label>
              <label title={ta('tip.nav.tabTextColor')}>{ta('lbl.textColor')}
                <ColorPicker value={siteDraft.nav.tab?.textColor ?? 'text'} tokens={themeSwatches()}
                  label={ta('tip.nav.tabTextColor')} onchange={(hex) => setNavTab('textColor', hex)} /></label>
            </div>
          {/if}
        {/if}
      {/if}
    </div>
  </details>
  <!-- The tool cluster: the buttons that stand beside the burger. Each
       tool is switched on here, beside its own settings -->
  <details class="group">
    <summary title={ta('tip.nav.tools')}>{ta('group.tools')}</summary>
    <div class="group-items">
      <!-- The tool cluster (theme, cart, burger) at the end or the start of the
           bar; in the column that is the bottom or the top, with its own alignment -->
      {#if sideVariant}
        <Choice label={ta('lbl.toolsSide')} title={ta('tip.nav.toolsSideColumn')} value={siteDraft.nav.style?.tools?.side ?? 'end'}
          options={[['start', ta('opt.toolsSide.top')], ['end', ta('opt.toolsSide.bottom')]]}
          onchange={(v) => setNavTools('side', v === 'start' ? 'start' : undefined)} />
        <Choice label={ta('lbl.toolsAlign')} title={ta('tip.nav.toolsAlign')} value={siteDraft.nav.style?.tools?.align ?? 'center'}
          options={[['start', ta('opt.toolsAlign.start')], ['center', ta('opt.toolsAlign.center')], ['end', ta('opt.toolsAlign.end')], ['spread', ta('opt.toolsAlign.spread')]]}
          onchange={(v) => setNavTools('align', v === 'center' ? undefined : v)} />
      {:else}
        <Choice label={ta('lbl.toolsSide')} title={ta('tip.nav.toolsSide')} value={siteDraft.nav.style?.tools?.side ?? 'end'}
          options={[['start', ta('opt.toolsSide.start')], ['end', ta('opt.toolsSide.end')]]}
          onchange={(v) => setNavTools('side', v === 'start' ? 'start' : undefined)} />
      {/if}
      <!-- The cluster's order is the panel's order: each tool is moved
           with its own arrows, and the menu follows -->
      {#snippet toolMove(id, n)}
        <span class="tool-move">
          <button class="ghost row-tool" title={ta('tip.moveUp')} disabled={n === 0}
            onclick={(e) => { e.preventDefault(); e.stopPropagation(); moveTool(id, -1); }}>{@html ICONS.up}</button>
          <button class="ghost row-tool" title={ta('tip.moveDown')} disabled={n === shownTools.length - 1}
            onclick={(e) => { e.preventDefault(); e.stopPropagation(); moveTool(id, 1); }}>{@html ICONS.down}</button>
        </span>
      {/snippet}
      {#each shownTools as id, n (id)}
        {#if id === 'theme'}
          {#if siteDraft.theme?.alt?.tokens}
          <div class="mini-card">
            <span class="tool-head"><span class="mini-label">{ta('lbl.themeToggle')}</span>{@render toolMove(id, n)}</span>
            <label class="gridmenu-snap" title={ta('tip.nav.themeToggle')}>
              <input type="checkbox" checked={siteDraft.nav.style?.tools?.theme !== false}
                onchange={(e) => setNavTools('theme', e.target.checked ? undefined : false)} />
              {ta('lbl.showInMenu')}
            </label>
          </div>
          {/if}
        {:else if id === 'links'}
        <div class="mini-card">
          <span class="tool-head"><span class="mini-label">{ta('lbl.navToolLinks')}</span>{@render toolMove(id, n)}</span>
          <label class="gridmenu-snap" title={ta('tip.nav.toolLinks')}>
            <input type="checkbox" checked={siteDraft.nav.style?.tools?.links === true}
              onchange={(e) => setNavTools('links', e.target.checked ? true : undefined)} />
            {ta('lbl.showInMenu')}
          </label>
          <button class="ghost action" onclick={() => { ed.siteLinksOpen = true; ed.openPanel('site'); }}>{ta('ui.editSiteLinks')}</button>
        </div>
        {:else if id === 'cart'}
        <div class="mini-card">
          <span class="tool-head"><span class="mini-label">{ta('lbl.cart')}</span>{@render toolMove(id, n)}</span>
          <label class="gridmenu-snap" title={ta('tip.nav.cart')}>
            <input type="checkbox" checked={siteDraft.nav.cart?.show === true}
              onchange={(e) => siteMutate('nav', () => {
                if (e.target.checked) siteDraft.nav.cart = { ...(siteDraft.nav.cart ?? {}), show: true };
                else delete siteDraft.nav.cart;
              })} />
            {ta('lbl.showInMenu')}
          </label>
          {#if siteDraft.nav.cart?.show}
            <LinkField scope="site" label={ta('lbl.checkoutPage')} title={ta('tip.cart.checkout')} pagesOnly value={linkOf(siteDraft.nav.cart)}
              onchange={(link) => siteMutate('nav', () => setLinkOn(siteDraft.nav.cart, link))} />
            <label title={ta('tip.product.currency')}>{ta('lbl.currency')}
              <input value={siteDraft.nav.cart.currency ?? 'kr'}
                onchange={(e) => siteMutate('nav', () => { siteDraft.nav.cart.currency = e.target.value.trim() || 'kr'; })} /></label>
          {/if}
        </div>
        {:else}
        <div class="mini-card">
          <span class="tool-head" title={ta('tip.nav.launcher')}><span class="mini-label">{ta('group.launcher')}</span>{@render toolMove(id, n)}</span>
            <label class="gridmenu-snap" title={ta('tip.nav.launcher')}>
            <input type="checkbox" checked={siteDraft.nav.launcher?.show === true}
              onchange={(e) => setLauncher('show', e.target.checked ? true : undefined)} />
            {ta('lbl.showInMenu')}
          </label>
          {#if siteDraft.nav.launcher?.show === true}
          <!-- The design as small drawings of the panel each one gives -->
            <div class="ctl-field">
              <span class="mini-label">{ta('lbl.design')}</span>
              <div class="tile-grid cols-3" role="group" aria-label={ta('lbl.design')}>
                {#each launcherViewOptions as [v, text] (v)}
                  <button type="button" class="tile" class:on={(siteDraft.nav.launcher?.view ?? 'grid') === v}
                    aria-pressed={(siteDraft.nav.launcher?.view ?? 'grid') === v}
                    onclick={() => setLauncher('view', v === 'grid' ? undefined : v)}>{@html LAUNCHER_VIEW_ICONS[v]}<span>{text}</span></button>
                {/each}
              </div>
            </div>
            <!-- The size: one choice for the panel, the marks and the names together, then each on its own (empty = follows the size) -->
            <Choice rows label={ta('lbl.launcherSize')} title={ta('tip.nav.launcherSize')} value={siteDraft.nav.launcher?.size ?? 'md'}
              options={SIZE_IDS.map((id) => [id, ta(`opt.size.${id}`)])}
              onchange={(v) => setLauncher('size', v === 'md' ? undefined : v)} />
            <div class="ctl-triple">
              {#each [['width', 'lbl.launcherWidth', 'tip.nav.launcherWidth'], ['iconSize', 'lbl.launcherIconSize', 'tip.nav.launcherIconSize'], ['textSize', 'lbl.launcherTextSize', 'tip.nav.launcherTextSize']] as [key, label, tip] (key)}
                <div class="ctl-field" title={ta(tip)}>
                  <span class="mini-label">{ta(label)}</span>
                  <input type="number" class="tb-num" min={LAUNCHER_BOUNDS[key].min} max={LAUNCHER_BOUNDS[key].max} placeholder={ta('common.auto')}
                    value={siteDraft.nav.launcher?.[key] ?? ''}
                    onchange={(e) => setLauncherPx(e, key)} />
                </div>
              {/each}
            </div>
            <!-- The mobile menu can carry another design than the desktop panel -->
            <Choice label={ta('lbl.launcherMobileView')} title={ta('tip.nav.launcherMobileView')}
              value={siteDraft.nav.launcher?.mobileView ?? ''}
              options={[['', ta('lbl.navSameAsDesktop')], ...launcherViewOptions]}
              onchange={(v) => setLauncher('mobileView', v || undefined)} />
            <Choice label={ta('lbl.launcherLongNames')} title={ta('tip.nav.launcherLongNames')}
              value={siteDraft.nav.launcher?.longNames ?? 'cut'}
              options={[['cut', ta('opt.launcherLongNames.cut')], ['wrap', ta('opt.launcherLongNames.wrap')]]}
              onchange={(v) => setLauncher('longNames', v === 'cut' ? undefined : v)} />
            <div class="ctl-row" title={ta('tip.nav.launcherMobileMax')}>
              <span class="mini-label ctl-name">{ta('lbl.launcherMobileMax')}</span>
              <input type="range" min="1" max="24" step="1"
                value={siteDraft.nav.launcher?.mobileMax ?? 6}
                oninput={(e) => setLauncher('mobileMax', e.target.valueAsNumber === 6 ? undefined : e.target.valueAsNumber)} />
              <span class="gridmenu-value">{siteDraft.nav.launcher?.mobileMax ?? 6}</span>
            </div>
            <label class="gridmenu-snap" title={ta('tip.nav.launcherTitle')}>
              <input type="checkbox" checked={siteDraft.nav.launcher?.showTitle !== false}
                onchange={(e) => setLauncher('showTitle', e.target.checked ? undefined : false)} />
              {ta('lbl.launcherShowTitle')}
            </label>
            {#if siteDraft.nav.launcher?.showTitle !== false}
              <label class="field-stack" title={ta('tip.nav.launcherTitleText')}>
                <span class="mini-label">{ta('lbl.launcherTitle')}</span>
                <input type="text" class="field-filled" placeholder={ta('ph.launcherTitle')}
                  value={siteDraft.nav.launcher?.title ?? ''}
                  onchange={(e) => setLauncher('title', e.target.value.trim() || undefined)} />
              </label>
            {/if}
            <!-- The button itself: the same picker as the shortcuts, where
                 no mark at all means the nine drawn dots -->
            <div class="mini-card">
              <span class="mini-label">{ta('lbl.launcherButton')}</span>
              <span class="lbtn-pick">
                <MarkPicker icon={siteDraft.nav.launcher?.icon ?? ''} image={siteDraft.nav.launcher?.image ?? ''}
                  images={launcherImages()} klass="lbtn-mark" noneLabel={ta('opt.launcherDots')}
                  label={ta('tip.nav.launcherIcon')}
                  onpick={(mark) => setLauncherMark(null, mark)} onfile={(file) => uploadLauncherImage(file, null)}>
                  {#if siteDraft.nav.launcher?.image}
                    <img src={siteDraft.nav.launcher.image} alt="" />
                  {:else if siteDraft.nav.launcher?.icon}
                    {@html iconSvg(siteDraft.nav.launcher.icon) || ''}
                  {:else}
                    {@html LAUNCHER_DOTS}
                  {/if}
                </MarkPicker>
                <span class="lbtn-name">
                  {#if siteDraft.nav.launcher?.image}{ta('mp.ownImage')}
                  {:else if siteDraft.nav.launcher?.icon}{ta(ICON_LIBRARY[siteDraft.nav.launcher.icon]?.labelKey ?? 'common.none')}
                  {:else}{ta('opt.launcherDots')}{/if}
                </span>
              </span>
            </div>
            <!-- One row per shortcut. Closed it is a line: mark, name and the
             arrows; a target that goes nowhere shows its warning there too.
             Open, the row is a card with a live tile: the preview is drawn as
             the menu will draw it, and it is itself the mark picker. -->
        {#each siteDraft.nav.launcher?.links ?? [] as link, i (i)}
          {@const broken = resolveLink(link, siteDraft.pages).missing}
          <div class="lrow" class:open={launcherOpen === i}>
            <div class="lrow-head" role="button" tabindex="0"
              onclick={() => (launcherOpen = launcherOpen === i ? null : i)}
              onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); launcherOpen = launcherOpen === i ? null : i; } }}>
              <span class="lrow-mark" aria-hidden="true">
                {#if link.image}<img src={link.image} alt="" />{:else}{@html iconSvg(link.icon) || ''}{/if}
              </span>
              <span class="lrow-name">{link.label || ta('seed.link')}</span>
              {#if broken}
                <span class="lrow-warn" title={ta('tip.badTarget')}>{@html ICONS.warn}</span>
              {/if}
              <span class="row-tools" role="none"
                onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
                <button class="ghost row-tool" title={ta('tip.moveUp')} onclick={() => moveLauncherLink(i, -1)}
                  disabled={i === 0}>{@html ICONS.up}</button>
                <button class="ghost row-tool" title={ta('tip.moveDown')} onclick={() => moveLauncherLink(i, 1)}
                  disabled={i === siteDraft.nav.launcher.links.length - 1}>{@html ICONS.down}</button>
              </span>
              <span class="lrow-chev" aria-hidden="true">{@html ICONS.caret}</span>
            </div>
            {#if launcherOpen === i}
              <div class="lrow-body">
                <!-- The tile as the menu draws it, and the way to change the mark -->
                <MarkPicker icon={link.icon ?? ''} image={link.image ?? ''} images={launcherImages()}
                  klass="lrow-tile" label={ta('mp.pickMark')}
                  onpick={(mark) => setLauncherMark(i, mark)} onfile={(file) => uploadLauncherImage(file, i)}>
                  <span class="lrow-tile-mark">
                    {#if link.image}<img src={link.image} alt="" />{:else if link.icon}{@html iconSvg(link.icon) || ''}{/if}
                  </span>
                  <span class="lrow-tile-name">{link.label || ta('seed.link')}</span>
                </MarkPicker>
                <div class="lrow-fields">
                  <input class="field-filled" value={link.label} title={ta('tip.nav.launcherLabel')}
                    placeholder={ta('lbl.text')}
                    onchange={(e) => setLauncherLink(i, 'label', e.target.value)} />
                  <LinkField scope="site" value={linkOf(link)} title={ta('tip.link.field')} removable={false}
                    onchange={(next) => siteMutate(`nav-launcher-link-${i}`, () => setLinkOn(siteDraft.nav.launcher.links[i], next))} />
                  <span class="lrow-actions">
                    <MarkPicker icon={link.icon ?? ''} image={link.image ?? ''} images={launcherImages()}
                      klass="linkish" label={ta('mp.pickMark')}
                      onpick={(mark) => setLauncherMark(i, mark)} onfile={(file) => uploadLauncherImage(file, i)}>
                      {ta('mp.changeMark')}
                    </MarkPicker>
                    <button class="linkish danger" title={ta('tip.removeLink')}
                      onclick={() => removeLauncherLink(i)}>{ta('ui.remove')}</button>
                  </span>
                </div>
              </div>
            {/if}
          </div>
        {/each}
        <button class="ghost action" onclick={addLauncherLink}>{ta('ui.addLauncherLink')}</button>
          {/if}
        </div>
        {/if}
      {/each}
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
        <!-- The strip's link, set in the link editor -->
        <LinkField scope="site" label={ta('lbl.link')} title={ta('tip.nav.announceLink')} value={linkOf(siteDraft.nav.announcement)}
          onchange={(link) => siteMutate('nav-announce-link', () => {
            const next = { ...(siteDraft.nav.announcement ?? {}) };
            setLinkOn(next, link);
            siteDraft.nav.announcement = next;
          })} />
        <!-- Only where the strip can scroll away: a sticky bar in the flow -->
        {#if siteDraft.nav.sticky !== false && !floatingVariant && !sideVariant && !siteDraft.nav.overlay}
          <label class="gridmenu-snap" title={ta('tip.nav.announceSticky')}>
            <input type="checkbox" checked={siteDraft.nav.announcement?.sticky !== false}
              onchange={(e) => setNavAnnouncement('sticky', e.target.checked ? undefined : false)} />
            {ta('lbl.announceSticky')}
          </label>
        {/if}
        <!-- Only where the menu slides out from under the strip -->
        {#if siteDraft.nav.scroll === 'hide' && siteDraft.nav.sticky !== false && !sideVariant && siteDraft.nav.announcement?.sticky !== false}
          <label class="gridmenu-snap" title={ta('tip.nav.announceFollowNav')}>
            <input type="checkbox" checked={siteDraft.nav.announcement?.followNav === true}
              onchange={(e) => setNavAnnouncement('followNav', e.target.checked ? true : undefined)} />
            {ta('lbl.announceFollowNav')}
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
        <!-- The dismissal is remembered per browser, in the preview as on the
             published page, so the strip needs a way back while editing. -->
        {#if siteDraft.nav.announcement?.dismiss !== false}
          <button class="ghost" title={ta('tip.nav.announceShowAgain')}
            onclick={() => bridge?.sendAnnounceReset()}>{ta('lbl.announceShowAgain')}</button>
        {/if}
        <label title={ta('tip.nav.announceColor')}>{ta('lbl.background')}
          <ColorPicker value={siteDraft.nav.announcement?.color ?? 'accent'} tokens={themeSwatches()}
            label={ta('tip.nav.announceColor')} onchange={(hex) => setNavAnnouncement('color', hex)} /></label>
        <label title={ta('tip.nav.announceTextColor')}>{ta('lbl.textColor')}
          <ColorPicker value={siteDraft.nav.announcement?.textColor ?? 'accent-text'} tokens={themeSwatches()}
            label={ta('tip.nav.announceTextColor')} onchange={(hex) => setNavAnnouncement('textColor', hex)} /></label>
      {/if}
    </div>
  </details>
</div>
