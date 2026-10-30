/**
 * The shell's state: the admin theme and language, the status toast, the sign-in, the confirmation dialog, the setup wizard, the panel choice and its preferences, the top bar's fold steps, the guides and the grid buttons, the keyboard, and the startup.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { ta } from '$engine/i18n.js';
import { relativeLuminance, contrastRatio } from '$engine/theme.js';
import { liftSiteFile, SITE_SCHEMA_VERSION } from '$engine/migrate.js';
import { createDraftStore } from '../lib/draftStore.js';
import { tick } from 'svelte';
import { ICONS } from '../lib/icons.js';
import { opensShortcuts } from '../lib/shortcuts.js';
import { collectionsState } from './collections.svelte.js';
import { historyState } from './history.svelte.js';
import { pageState } from './page.svelte.js';
import { paletteState } from './palette.svelte.js';
import { pluginsState } from './plugins.svelte.js';
import { previewState } from './preview.svelte.js';
import { siteState } from './site.svelte.js';
import { templatesState } from './templates.svelte.js';
import { updaterState } from './updater.svelte.js';

/**
 * The admin's own color theme (the editor ONLY - the site's theme is
 * controlled by the user in the Theme panel). Picked in the top bar,
 * stored per browser. The palettes are defined as CSS variables in the
 * style block below.
 */
const ADMIN_THEMES = $derived([
  ['purple', ta('adminTheme.purple')],
  ['well', ta('adminTheme.well')],
  ['gold', ta('adminTheme.gold')],
  ['grey', ta('adminTheme.grey')],
  ['aurora', ta('adminTheme.aurora')],
  ['dusk', ta('adminTheme.dusk')],
  ['ember', ta('adminTheme.ember')],
]);

// The stored id may predate ADR-0021 (Norwegian theme ids); it is mapped on
// read and the effect below writes the current id back.
const LEGACY_ADMIN_THEMES = { lilla: 'purple', bronn: 'well', gull: 'gold', graa: 'grey', nordlys: 'aurora', skumring: 'dusk', glo: 'ember' };

let adminTheme = $state((() => {
  const stored = localStorage.getItem('urd-admin-theme');
  return LEGACY_ADMIN_THEMES[stored] ?? stored ?? 'grey';
})());

/** Reports the admin's theme colors to the preview: the editor menus in
 *  there (block menu, section gallery) follow the admin, not the page.
 *  Read from the document's actual variables, so the palettes live in
 *  one place. */
function sendAdminTheme() {
  const style = getComputedStyle(document.documentElement);
  const accent = style.getPropertyValue('--urd-color-accent').trim();
  previewState.bridge?.sendAdminTheme({
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

/** null = publishing layer unavailable (e.g. a simple local server without functions) */
let auth = $state(null);

/** Number of sections on the page that need mobile review */
let attentionCount = $state(0);

function updateAttention() {
  attentionCount = pageState.store?.data.sections
    .filter((s) => s.responsive?.mobile?.attention?.needed).length ?? 0;
}

/** The review badge: switch to mobile view and scroll to the first
 *  section that needs review. The scroll is sent after the viewport
 *  effect has flushed (postMessage is FIFO, so the order is guaranteed). */
function jumpToAttention() {
  const target = pageState.store?.data.sections.find((s) => s.responsive?.mobile?.attention?.needed);
  previewState.deviceId = 'mobile';
  if (target) setTimeout(() => previewState.bridge?.sendScrollSection(target.id), 0);
}

// A click anywhere in the admin outside the block menu closes it (clicks
// in the preview are handled via onSelectBlock; iframe clicks never reach here).
// A dialog over the menu (the design picker, the icon editor) is work the
// menu opened: a press in it, and its own Escape, leave the menu open.
function onPointerdownWindow(e) {
  if (!pageState.blockMenu) return;
  if (e.target instanceof Element && e.target.closest('.block-menu, dialog')) return;
  pageState.blockMenu = null;
}

function onKeydown(e) {
  if (e.key === 'Escape' && pageState.blockMenu && !(e.target instanceof Element && e.target.closest('dialog'))) {
    pageState.blockMenu = null;
    return;
  }
  // «?» opens the shortcut sheet wherever in the panels it is not typed: a toggle, a slider or a colour keeps the focus after a choice and takes no text, so it lets the key through, and a dialog over the editor keeps it.
  const focus = e.target;
  const typed = focus instanceof HTMLElement
    && (focus.isContentEditable || focus.tagName === 'TEXTAREA' || focus.tagName === 'SELECT'
      || (focus.tagName === 'INPUT' && !['checkbox', 'radio', 'range', 'color'].includes(focus.type))
      || Boolean(focus.closest('dialog, [role="dialog"]')));
  if (opensShortcuts(e, typed)) {
    e.preventDefault();
    openShortcuts();
    return;
  }
  if (!(e.ctrlKey || e.metaKey)) return;
  // A dialog over the editor (the link editor, the design picker) keeps its keys: the page behind it is not changed.
  if (e.target instanceof Element && e.target.closest('dialog')) return;
  const key = e.key.toLowerCase();
  // Ctrl+K outside a text opens the command palette, and Ctrl+Shift+P everywhere a browser keeps Ctrl+K for itself; in a text Ctrl+K stays the link key (the text toolbar's).
  if ((key === 'k' && !e.altKey && !e.shiftKey) || (key === 'p' && e.shiftKey && !e.altKey)) {
    if (typed && key === 'k') return;
    e.preventDefault();
    paletteState.openPalette();
    return;
  }
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
    if (inTextField || !pageState.selectedBlock || previewState.viewMode === 'mobile') return;
    e.preventDefault();
    previewState.bridge?.sendDuplicate();
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
  if (key === 'y' || e.shiftKey) historyState.redo();
  else historyState.undo();
}

async function init() {
  siteState.site = liftSiteFile(await (await fetch('/content/site.json')).json());
  siteState.siteStore = createDraftStore('urd-draft-site', () => siteState.site, draftSaveError);
  // Site drafts with a higher schemaVersion than the engine are
  // discarded, the same guard as for page drafts (liftSiteFile would
  // otherwise let them through).
  if ((siteState.siteStore.data.schemaVersion ?? 1) > SITE_SCHEMA_VERSION) {
    console.warn(`Urd: the site draft has schemaVersion ${siteState.siteStore.data.schemaVersion} (the engine has ${SITE_SCHEMA_VERSION}) and is discarded`);
    // site is $state: structuredClone on the proxy throws (the snapshot lesson).
    siteState.siteStore.replace($state.snapshot(siteState.site));
  }
  // Drafts in an older format can sit in localStorage: lift them.
  siteState.siteStore.replace(liftSiteFile(siteState.siteStore.data));
  siteState.siteStore.save();
  siteState.linkSiteDraft();
  siteState.grid = { snap: true, ...siteState.siteDraft.grid };
  await pageState.selectPage(new URLSearchParams(location.search).get('page') ?? siteState.siteDraft.pages[0].id);
  await pluginsState.initPlugins();
  await collectionsState.initCollections();
  await templatesState.initTemplates();
  await checkAuth();
  // The publish baseline requires login: signed out, the call would just
  // produce 401 noise in the console. After login (OAuth redirect) the
  // page reloads, so the baseline is fetched here then.
  if (auth) updaterState.refreshBaseSha();
  // A panel remembered from the last visit opens with its data.
  loadPanelData();
  // The setup wizard: first visit on a fresh clone and not dismissed
  // before. Triggered ONLY by the template's explicit signal (site.setup);
  // the wizard removes the field on completion, so it never shows again.
  if (siteState.siteDraft.site.setup === true && !localStorage.getItem('urd-setup-done')) {
    setupName = siteState.siteDraft.site.title;
    setupAccent = siteState.siteDraft.theme.tokens.color.accent;
    setupBg = siteState.siteDraft.theme.tokens.color.bg;
    showSetup = true;
  }
}

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
  siteState.siteMutate('setup', () => {
    siteState.siteDraft.site.title = name;
    siteState.siteDraft.nav.logo = { type: 'text', value: name };
    siteState.siteDraft.theme.tokens.color.accent = setupAccent;
    siteState.siteDraft.theme.tokens.color.bg = setupBg;
    // The signal is spent: the next publish removes it from site.json, so
    // the wizard never runs again for other editors.
    delete siteState.siteDraft.site.setup;
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

const PANEL_LABELS = $derived(Object.fromEntries(PANEL_GROUPS.flat().map((id) => [id, ta(`panel.${id}`)])));

// A remembered id from an older version may name a panel that is gone.
if (activePanel && !PANEL_GROUPS.flat().includes(activePanel)) activePanel = null;

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
    for (const lang of pluginsState.pluginInfo[id]?.languages ?? []) {
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
  const options = sortLangs([...LANG_OPTIONS, ...packLangOptions(pluginsState.publishedPluginIds, 'admin')]);
  const known = adminLangChoice === 'auto' || options.some(([code]) => code === adminLangChoice);
  return known ? options : [[adminLangChoice, adminLangChoice], ...options];
}

/** The visitor language follows the draft: site.lang is published
 *  together with the plugin draft, so a pack enabled now applies to the
 *  same publish. */
const sitePackLangs = () => packLangOptions(pluginsState.pluginsView?.enabled ?? [], 'site');

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
  if (activePanel === 'history') updaterState.loadHistory();
  if (activePanel === 'update' && !updaterState.updateBusy) updaterState.loadUpdateCheck();
}

/** Reduced motion: exit transitions (the draft cluster) become a plain cut. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

/** The browser's own spell check on the texts while editing: on unless the owner turns it off (a site in a language the browser has no dictionary for underlines every word). */
let spellcheckPref = $state(localStorage.getItem('urd-spellcheck') === 'off' ? 'off' : 'on');

function setSpellcheck(v) {
  spellcheckPref = v === 'off' ? 'off' : 'on';
  if (spellcheckPref === 'off') localStorage.setItem('urd-spellcheck', 'off');
  else localStorage.removeItem('urd-spellcheck');
  previewState.bridge?.sendSpellcheck(spellcheckPref === 'on');
}

/** Where the link editor opens: a dialog over the page (the default), or a small panel beside the field that opened it. */
let linkEditorPref = $state(localStorage.getItem('urd-link-editor') === 'popover' ? 'popover' : 'dialog');

function setLinkEditor(v) {
  linkEditorPref = v === 'popover' ? 'popover' : 'dialog';
  if (linkEditorPref === 'popover') localStorage.setItem('urd-link-editor', 'popover');
  else localStorage.removeItem('urd-link-editor');
}

function setLayoutPicker(v) {
  layoutPickerPref = v === 'menu' ? 'menu' : 'strip';
  if (layoutPickerPref === 'menu') localStorage.setItem('urd-layout-picker', 'menu');
  else localStorage.removeItem('urd-layout-picker');
}

/** The form of the canvas's «+ New block» menu: the groups on the side (the default), or the slim list with the blocks added last first. The preview reads the key on every open, as it does the layout picker's. */
let addBlockMenuPref = $state(localStorage.getItem('urd-add-block-menu') === 'slim' ? 'slim' : 'side');

function setAddBlockMenu(v) {
  addBlockMenuPref = v === 'slim' ? 'slim' : 'side';
  if (addBlockMenuPref === 'slim') localStorage.setItem('urd-add-block-menu', 'slim');
  else localStorage.removeItem('urd-add-block-menu');
}

let settingsEl = $state(null);

/** The shortcut sheet (lib/ShortcutSheet.svelte): opened by «?» in the panels and on the page, from the Urd settings and from the setup wizard. */
let shortcutsOpen = $state(false);

/**
 * Opens the shortcut sheet over the editor.
 * It stays shut while a confirmation or the icon editor is open, overlays that answer Escape themselves, and it closes the light menus first (the Urd settings, a tool menu, a page's menu), which close on any Escape or outside press.
 */
function openShortcuts() {
  if (confirmBox || siteState.iconEditorImage) return;
  settingsOpen = false;
  toolMenu = null;
  siteState.pageMenuFor = null;
  shortcutsOpen = true;
}

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

function toggleGuides() {
  guidesOn = !guidesOn;
  localStorage.setItem('urd-guides', guidesOn ? '1' : '0');
  previewState.bridge?.sendShowGuides(guidesOn);
}

/** The grid overlay on/off: its own toggle next to the guides,
 *  independent of the Grid panel, remembered in localStorage like them. */
let gridOn = $state(localStorage.getItem('urd-grid-overlay') === '1');

function toggleGrid() {
  gridOn = !gridOn;
  localStorage.setItem('urd-grid-overlay', gridOn ? '1' : '0');
  previewState.bridge?.sendShowGrid(gridOn);
}

/* Submenu (one level, additive): the children always have their own
 * target; the parent can additionally be a pure opener ('__none' in
 * setNavTarget). */


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

/** The effects of this module, run once by the shell at its start. */
export function effects() {

  $effect(() => {
    document.documentElement.dataset.adminTheme = adminTheme;
    localStorage.setItem('urd-admin-theme', adminTheme);
    sendAdminTheme();
  });

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

  $effect(() => {
    if (panelsPref === 'reset') { localStorage.removeItem(PANEL_OPEN_KEY); return; }
    if (activePanel) localStorage.setItem(PANEL_OPEN_KEY, activePanel);
    else localStorage.removeItem(PANEL_OPEN_KEY);
  });

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

  $effect(() => {
    void activePanel;
    tick().then(syncPanelFolds);
  });

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
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const shellState = {
  get ADMIN_THEMES() { return ADMIN_THEMES; },
  LEGACY_ADMIN_THEMES,
  get adminTheme() { return adminTheme; },
  set adminTheme(v) { adminTheme = v; },
  sendAdminTheme,
  readableOn,
  get status() { return status; },
  set status(v) { status = v; },
  get statusKind() { return statusKind; },
  set statusKind(v) { statusKind = v; },
  get statusSeq() { return statusSeq; },
  set statusSeq(v) { statusSeq = v; },
  setStatus,
  draftSaveError,
  writeDraftKey,
  get auth() { return auth; },
  set auth(v) { auth = v; },
  get attentionCount() { return attentionCount; },
  set attentionCount(v) { attentionCount = v; },
  updateAttention,
  jumpToAttention,
  onPointerdownWindow,
  onKeydown,
  init,
  get confirmBox() { return confirmBox; },
  set confirmBox(v) { confirmBox = v; },
  askConfirm,
  askPrompt,
  answerConfirm,
  get confirmDownOnOverlay() { return confirmDownOnOverlay; },
  set confirmDownOnOverlay(v) { confirmDownOnOverlay = v; },
  get showSetup() { return showSetup; },
  set showSetup(v) { showSetup = v; },
  get setupName() { return setupName; },
  set setupName(v) { setupName = v; },
  get setupAccent() { return setupAccent; },
  set setupAccent(v) { setupAccent = v; },
  get setupBg() { return setupBg; },
  set setupBg(v) { setupBg = v; },
  closeSetup,
  applySetup,
  PANELS_PREF_KEY,
  PANEL_OPEN_KEY,
  get panelsPref() { return panelsPref; },
  set panelsPref(v) { panelsPref = v; },
  setPanelsPref,
  get activePanel() { return activePanel; },
  set activePanel(v) { activePanel = v; },
  PANEL_GROUPS,
  PANEL_GROUP_KEYS,
  get PANEL_LABELS() { return PANEL_LABELS; },
  PANEL_INTROS,
  LANG_OPTIONS,
  sortLangs,
  packLangOptions,
  adminLangOptions,
  sitePackLangs,
  adminLangChoice,
  setAdminLang,
  togglePanel,
  loadPanelData,
  reducedMotion,
  checkAuth,
  get guidesOn() { return guidesOn; },
  set guidesOn(v) { guidesOn = v; },
  get settingsOpen() { return settingsOpen; },
  get spellcheckPref() { return spellcheckPref; },
  setSpellcheck,
  get linkEditorPref() { return linkEditorPref; },
  setLinkEditor,
  set settingsOpen(v) { settingsOpen = v; },
  get layoutPickerPref() { return layoutPickerPref; },
  set layoutPickerPref(v) { layoutPickerPref = v; },
  setLayoutPicker,
  get addBlockMenuPref() { return addBlockMenuPref; },
  setAddBlockMenu,
  get shortcutsOpen() { return shortcutsOpen; },
  set shortcutsOpen(v) { shortcutsOpen = v; },
  openShortcuts,
  get settingsEl() { return settingsEl; },
  set settingsEl(v) { settingsEl = v; },
  FOLD_MQ,
  get toolMenu() { return toolMenu; },
  set toolMenu(v) { toolMenu = v; },
  get toolMenuEl() { return toolMenuEl; },
  set toolMenuEl(v) { toolMenuEl = v; },
  get folded() { return folded; },
  set folded(v) { folded = v; },
  toggleGuides,
  get gridOn() { return gridOn; },
  set gridOn(v) { gridOn = v; },
  toggleGrid,
  get panelEl() { return panelEl; },
  set panelEl(v) { panelEl = v; },
  get panelHasGroups() { return panelHasGroups; },
  set panelHasGroups(v) { panelHasGroups = v; },
  get panelAllOpen() { return panelAllOpen; },
  set panelAllOpen(v) { panelAllOpen = v; },
  allOpen,
  syncPanelFolds,
  togglePanelGroups,
  decorateSubFolds,
  effects,
};
