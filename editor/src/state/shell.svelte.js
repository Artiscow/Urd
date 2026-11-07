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
import { UPDATE_NOTICES, updateNoticeForm } from '../lib/update-notice.js';
import { SETTINGS_PLACES, settingsPlace as settingsPlaceOf, settingsPictures as settingsPicturesOf } from '../lib/settings-model.js';
import { panelsPrefOf, panelsPrefsFor, startPanels, PANELS_START_DEFAULT, foldsEmpty, unfoldedPanel } from '../lib/panels-start.js';
import { COLLECTION_LAYOUTS, collectionLayoutOf, CSV_PREVIEWS, csvPreviewOf } from '../lib/collection-layout.js';
import { PAGE_SETTINGS_LAYOUTS, pageSettingsLayoutOf } from '../lib/page-settings.js';
import { PRESS_FEELS, pressFeelOf, pressTarget, ripple } from '../lib/press-feel.js';
import { TAB_MENU_STYLES, tabMenuStyleOf } from '../lib/panel-folds.js';
import { collectionsState } from './collections.svelte.js';
import { historyState } from './history.svelte.js';
import { pageState } from './page.svelte.js';
import { paletteState } from './palette.svelte.js';
import { pluginsState } from './plugins.svelte.js';
import { previewState } from './preview.svelte.js';
import { siteState } from './site.svelte.js';
import { pictureEditorState } from './picture-editor.svelte.js';
import { templatesState } from './templates.svelte.js';
import { redirectsState } from './redirects.svelte.js';
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
/** The status line's one action beside its words, such as «Undo» after a delete of several entries; a new status clears it. */
let statusAction = $state(null);

function setStatus(msg, kind = 'info', action = null) {
  status = msg;
  statusKind = kind;
  statusAction = msg && action && typeof action.run === 'function' ? { label: String(action.label ?? ''), run: action.run } : null;
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
  // The review is of the phone layout: a Phone standing at a tablet size or an own width above the breakpoint takes the phone preset first.
  if (previewState.devices.find((d) => d.id === 'mobile')?.viewport !== 'mobile') previewState.setPhonePref({ size: 'phone' });
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
  await redirectsState.initRedirects();
  // The steps kept from the last session in this browser, taken up when the drafts are the ones they were kept with.
  await historyState.loadKept();
  await checkAuth();
  // The publish baseline requires login: signed out, the call would just
  // produce 401 noise in the console. After login (OAuth redirect) the
  // page reloads, so the baseline is fetched here then.
  if (auth) updaterState.refreshBaseSha();
  // The update check runs at the start for a publisher, so a new Urd is told in the admin's navigation without the Updates panel open.
  if (auth?.allowed) updaterState.loadUpdateCheck();
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

/** sections: several things to weigh in one question, each under its own heading ({heading, lines}), as publishing asks; danger: the answer undoes much, and its button is dark red. */
function askConfirm({ title, lines = [], sections = [], okLabel = ta('confirm.ok'), cancelLabel = ta('confirm.cancel'), danger = false }) {
  return new Promise((resolve) => {
    confirmBox = { title, lines, sections, okLabel, cancelLabel, danger, resolve };
  });
}

/** Like askConfirm, but with a text field: resolves with the text on OK, null on cancel. */
function askPrompt({ title, lines = [], value = '', placeholder = '', okLabel = ta('confirm.ok'), cancelLabel = ta('confirm.cancel') }) {
  return new Promise((resolve) => {
    confirmBox = { title, lines, okLabel, cancelLabel, resolve, prompt: true, value, placeholder };
  });
}

/**
 * Asks where the visitors of an address go (a page deleted or hidden): the front page, another page from `options` ([path, title]), or nowhere.
 * Resolves with { to } (a path, or null for «not found»), or null when the owner cancels.
 */
function askDestination({ title, lead, okLabel, options = [] }) {
  return new Promise((resolve) => {
    confirmBox = { title, lines: [], okLabel, cancelLabel: ta('confirm.cancel'), resolve, destination: { lead, choice: 'front', page: options[0]?.[0] ?? null, options } };
  });
}

function answerConfirm(ok) {
  const box = confirmBox;
  confirmBox = null;
  if (!box) return;
  if (box.destination) {
    const d = box.destination;
    box.resolve(ok ? { to: d.choice === 'front' ? '/' : d.choice === 'page' ? d.page : null } : null);
    return;
  }
  box.resolve(box.prompt ? (ok ? box.value : null) : ok);
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
/* What the admin shows when it is loaded again («Panels on a fresh load», lib/panels-start.js): the panel last open and its fold, no panel, always the same panel, or the folded column.
   Personal workspace preferences in localStorage (like theme and language), with only the non-default stored.
   Clean view keeps the folds on its own (the rail and the panel are hidden, not unmounted); this is about a fresh load of the admin. */
const PANELS_PREF_KEY = 'urd-admin-panels';

const PANEL_OPEN_KEY = 'urd-admin-panel-open';

const PANEL_FOLDED_KEY = 'urd-admin-panel-folded';

const PANELS_START_KEY = 'urd-admin-panels-start';

let panelsPref = $state(panelsPrefOf(localStorage.getItem(PANELS_PREF_KEY)));

function setPanelsPref(v) {
  panelsPref = panelsPrefOf(v);
  if (panelsPref === 'remember') localStorage.removeItem(PANELS_PREF_KEY);
  else localStorage.setItem(PANELS_PREF_KEY, panelsPref);
}

/** The panel «Always the same panel» opens; checked against the panels once they are known below. */
let panelsStart = $state(localStorage.getItem(PANELS_START_KEY) ?? PANELS_START_DEFAULT);

function setPanelsStart(v) {
  panelsStart = v;
  if (v === PANELS_START_DEFAULT) localStorage.removeItem(PANELS_START_KEY);
  else localStorage.setItem(PANELS_START_KEY, v);
}

/** The open panel; set from the stored choice once the panels are known below. */
let activePanel = $state(null);

/**
 * How the panels are reached (the Urd settings, «Panel navigation»): an icon rail, the sidebar of words, tabs at the top of the panel in three groups, a strip of every panel under the top bar, or the page's panels as tabs with the site's in a menu.
 * A personal workspace preference in localStorage, like the theme; the rail is the default and is not stored.
 * The rail, the sidebar and the strip toggle a panel; the two tab forms keep the panel's column standing with the tabs, folded to a handle at the edge when the owner asks (`panelFolded`), and the rail lets the panel fold away.
 */
const ADMIN_LAYOUTS = ['rail', 'sidebar', 'panel-tabs', 'top-tabs', 'page-tabs'];

const ADMIN_LAYOUT_KEY = 'urd-admin-layout';

let adminLayout = $state(ADMIN_LAYOUTS.includes(localStorage.getItem(ADMIN_LAYOUT_KEY)) ? localStorage.getItem(ADMIN_LAYOUT_KEY) : 'rail');

function setAdminLayout(v) {
  adminLayout = ADMIN_LAYOUTS.includes(v) ? v : 'rail';
  // The column folded because no panel was open in «The page's tabs» stands open in a layout that keeps it with its tabs.
  if (!activePanel && adminLayout !== 'page-tabs') panelFolded = false;
  if (adminLayout === 'rail') localStorage.removeItem(ADMIN_LAYOUT_KEY);
  else localStorage.setItem(ADMIN_LAYOUT_KEY, adminLayout);
  if (toolMenu === 'site') toolMenu = null;
}

const ADMIN_LAYOUT_OPTIONS = $derived(ADMIN_LAYOUTS.map((id) => [id, ta(`opt.adminLayout.${id}`)]));

/** The update notice drawn now (lib/update-notice.js): `dot` on the Updates panel's icon, word or tab, `pill` in the top bar, null while no update is out. */
const updateNotice = $derived(updateNoticeForm(updaterState.updateAvailable, siteState.siteDraft?.admin?.updateNotice, folded.view));

const UPDATE_NOTICE_OPTIONS = $derived(UPDATE_NOTICES.map((id) => [id, ta(`opt.updateNotice.${id}`)]));

/** Whether the tab layouts' column is folded to a handle at the edge; a panel opened from anywhere unfolds it (the activePanel setter). */
let panelFolded = $state(false);

/** The panel open last, which the handle opens again in «The page's tabs» (lib/panels-start.js unfoldedPanel). */
let lastPanel = null;

/** The handle at the column's edge: the column unfolds, in «The page's tabs» with the panel last open, since it never stands empty there. */
function unfoldPanel() {
  const panel = unfoldedPanel(adminLayout, activePanel, lastPanel);
  panelFolded = false;
  if (panel !== activePanel) {
    activePanel = panel;
    loadPanelData();
  }
}

/** The panels grouped by workflow: build the page, style the site,
 *  tools. Shown with dividers in the panel picker. The ids are stable
 *  English identifiers (never display text); PANEL_LABELS owns what the
 *  user sees. */
const PANEL_GROUPS = [
  ['pages', 'blocks', 'properties', 'grid'],
  ['site', 'legal', 'theme', 'nav', 'footer', 'collections', 'plugins'],
  ['history', 'update'],
];

/** Uppercase label above each group in the rail, in the same order. */
const PANEL_GROUP_KEYS = ['rail.thisPage', 'rail.site', 'rail.system'];

/** The panels' names, and the settings panel's (panels/SettingsPanel.svelte), which stands in no group since the gear opens it. */
const PANEL_LABELS = $derived({ ...Object.fromEntries(PANEL_GROUPS.flat().map((id) => [id, ta(`panel.${id}`)])), settings: ta('settings.title') });

// The panel and the fold the admin starts with; a remembered id from an older version may name a panel that is gone.
{
  const panels = PANEL_GROUPS.flat();
  const start = startPanels({ pref: panelsPref, layout: adminLayout, panels, stored: localStorage.getItem(PANEL_OPEN_KEY), storedFolded: localStorage.getItem(PANEL_FOLDED_KEY) === '1', start: panelsStart });
  activePanel = start.panel;
  panelFolded = start.folded;
  if (!panels.includes(panelsStart)) panelsStart = PANELS_START_DEFAULT;
}

/** «Panels on a fresh load»: the folded column only in the layouts that keep the column. */
const PANELS_PREF_LABELS = { remember: 'settings.panelsRemember', reset: 'settings.panelsReset', fixed: 'settings.panelsFixed', folded: 'settings.panelsFolded' };

const PANELS_PREF_OPTIONS = $derived(panelsPrefsFor(adminLayout).map((id) => [id, ta(PANELS_PREF_LABELS[id])]));

const PANELS_START_OPTIONS = $derived(PANEL_GROUPS.flat().map((id) => [id, PANEL_LABELS[id]]));

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
  toolMenu = null;
  panelFolded = false;
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

/** Whether Urd's own settings stand open over the admin (settings/SettingsDialog.svelte): the dialog or the sheet, by `settingsPlace`; the panel form is the panel id `settings` in activePanel instead. */
let settingsOpen = $state(false);

/**
 * Where the Urd settings open («Settings window», lib/settings-model.js): the dialog with sections (the default), the panel in the panel column, or the sheet with the look at the left; and whether a look choice is shown as pictures or as words («Look choices»).
 * Personal workspace preferences in localStorage, like the theme; the defaults are not stored.
 * A change of place while the settings are open moves them: the dialog closes and the panel opens, or the other way round.
 */
const SETTINGS_PLACE_KEY = 'urd-settings-place';

const SETTINGS_PICTURES_KEY = 'urd-settings-pictures';

let settingsPlace = $state(settingsPlaceOf(localStorage.getItem(SETTINGS_PLACE_KEY)));

let settingsPictures = $state(settingsPicturesOf(localStorage.getItem(SETTINGS_PICTURES_KEY)));

function setSettingsPlace(v) {
  const next = settingsPlaceOf(v);
  if (next === settingsPlace) return;
  const wasOpen = settingsOpen || activePanel === 'settings';
  settingsPlace = next;
  if (next === 'dialog') localStorage.removeItem(SETTINGS_PLACE_KEY);
  else localStorage.setItem(SETTINGS_PLACE_KEY, next);
  if (!wasOpen) return;
  if (next === 'panel') { settingsOpen = false; activePanel = 'settings'; panelFolded = false; }
  else { if (activePanel === 'settings') activePanel = null; settingsOpen = true; }
}

function setSettingsPictures(v) {
  settingsPictures = settingsPicturesOf(v);
  if (settingsPictures === 'words') localStorage.setItem(SETTINGS_PICTURES_KEY, 'words');
  else localStorage.removeItem(SETTINGS_PICTURES_KEY);
}

/** How the Collections panel shows a collection («Collections editor», lib/collection-layout.js): stepping in (the default, not stored), two columns in a widened panel, or a table over the page; kept per browser. */
const COLLECTIONS_LAYOUT_KEY = 'urd-collections-layout';

let collectionsLayout = $state(collectionLayoutOf(localStorage.getItem(COLLECTIONS_LAYOUT_KEY)));

function setCollectionsLayout(v) {
  collectionsLayout = collectionLayoutOf(v);
  if (collectionsLayout === 'drill') localStorage.removeItem(COLLECTIONS_LAYOUT_KEY);
  else localStorage.setItem(COLLECTIONS_LAYOUT_KEY, collectionsLayout);
}

const COLLECTIONS_LAYOUT_OPTIONS = $derived(COLLECTION_LAYOUTS.map((id) => [id, ta(`opt.collectionsLayout.${id}`)]));

/** How the admin's buttons answer a press («Button press», lib/press-feel.js): Ripple by default, not stored; kept per browser. */
const PRESS_KEY = 'urd-press';

let pressFeel = $state(pressFeelOf(localStorage.getItem(PRESS_KEY)));

function setPressFeel(v) {
  pressFeel = pressFeelOf(v);
  if (pressFeel === 'ripple') localStorage.removeItem(PRESS_KEY);
  else localStorage.setItem(PRESS_KEY, pressFeel);
}

const PRESS_OPTIONS = $derived(PRESS_FEELS.map((id) => [id, ta(`opt.press.${id}`)]));

/** How the tabs' menus set their rows apart (Urd settings «Tab menus», lib/panel-folds.js): the groups by default, remembered per browser. */
const TAB_MENUS_KEY = 'urd-tab-menus';
let tabMenus = $state(tabMenuStyleOf(localStorage.getItem(TAB_MENUS_KEY)));

function setTabMenus(v) {
  tabMenus = tabMenuStyleOf(v);
  if (tabMenus === 'groups') localStorage.removeItem(TAB_MENUS_KEY);
  else localStorage.setItem(TAB_MENUS_KEY, tabMenus);
}

const TAB_MENU_OPTIONS = $derived(TAB_MENU_STYLES.map((id) => [id, ta(`opt.tabMenus.${id}`)]));

/** Whether a tab's menu stays open after a row is picked until the mouse leaves it (the default), or closes at the pick (Urd settings «After a pick»), remembered per browser. */
const TAB_MENU_STAY_KEY = 'urd-tab-menu-stay';
let tabMenuStay = $state(localStorage.getItem(TAB_MENU_STAY_KEY) === 'close' ? 'close' : 'stay');

function setTabMenuStay(v) {
  tabMenuStay = v === 'close' ? 'close' : 'stay';
  if (tabMenuStay === 'stay') localStorage.removeItem(TAB_MENU_STAY_KEY);
  else localStorage.setItem(TAB_MENU_STAY_KEY, tabMenuStay);
}

/** Where the sidebar of words shows a panel's folds (Urd settings «Folds in the sidebar»): under the open panel's word as a tree (the default, not stored), under the word the mouse rests on, or in a flyout beside each word; kept per browser. */
const SIDEBAR_FOLDS_KEY = 'urd-sidebar-folds';
const SIDEBAR_FOLDS = ['tree', 'hover', 'flyout'];
const sidebarFoldsOf = (v) => (SIDEBAR_FOLDS.includes(v) ? v : 'tree');
let sidebarFolds = $state(sidebarFoldsOf(localStorage.getItem(SIDEBAR_FOLDS_KEY)));

function setSidebarFolds(v) {
  sidebarFolds = sidebarFoldsOf(v);
  if (sidebarFolds === 'tree') localStorage.removeItem(SIDEBAR_FOLDS_KEY);
  else localStorage.setItem(SIDEBAR_FOLDS_KEY, sidebarFolds);
}

const SIDEBAR_FOLDS_OPTIONS = $derived(SIDEBAR_FOLDS.map((id) => [id, ta(`opt.sidebarFolds.${id}`)]));

/** Whether the panel's own tabs («Tabs at the top of the panel») open a menu of a panel's folds (Urd settings «Menus under the tabs»): off by default, on where chosen; kept per browser. */
const PANEL_TAB_MENUS_KEY = 'urd-panel-tab-menus';
let panelTabMenus = $state(localStorage.getItem(PANEL_TAB_MENUS_KEY) === 'on');

function setPanelTabMenus(v) {
  panelTabMenus = v === 'on' || v === true;
  if (panelTabMenus) localStorage.setItem(PANEL_TAB_MENUS_KEY, 'on');
  else localStorage.removeItem(PANEL_TAB_MENUS_KEY);
}

/** Where a page's settings open («Page settings», lib/page-settings.js): a dialog over the admin (the default, not stored), a step in the Pages panel, or a table of every page over the canvas; kept per browser. */
const PAGE_SETTINGS_KEY = 'urd-page-settings';

let pageSettingsPref = $state(pageSettingsLayoutOf(localStorage.getItem(PAGE_SETTINGS_KEY)));

function setPageSettingsPref(v) {
  pageSettingsPref = pageSettingsLayoutOf(v);
  if (pageSettingsPref === 'dialog') localStorage.removeItem(PAGE_SETTINGS_KEY);
  else localStorage.setItem(PAGE_SETTINGS_KEY, pageSettingsPref);
}

const PAGE_SETTINGS_OPTIONS = $derived(PAGE_SETTINGS_LAYOUTS.map((id) => [id, ta(`opt.pageSettings.${id}`)]));

/** Where a collection's CSV import shows what it will do («Import preview», lib/collection-layout.js): a dialog (the default, not stored), a step in the panel, or a table over the page; kept per browser. */
const CSV_PREVIEW_KEY = 'urd-csv-preview';

let csvPreviewPref = $state(csvPreviewOf(localStorage.getItem(CSV_PREVIEW_KEY)));

function setCsvPreview(v) {
  csvPreviewPref = csvPreviewOf(v);
  if (csvPreviewPref === 'dialog') localStorage.removeItem(CSV_PREVIEW_KEY);
  else localStorage.setItem(CSV_PREVIEW_KEY, csvPreviewPref);
}

const CSV_PREVIEW_OPTIONS = $derived(CSV_PREVIEWS.map((id) => [id, ta(`opt.csvPreview.${id}`)]));

const SETTINGS_PLACE_OPTIONS = $derived(SETTINGS_PLACES.map((id) => [id, ta(`opt.settingsPlace.${id}`)]));

const SETTINGS_PICTURES_OPTIONS = $derived([['pictures', ta('opt.settingsPictures.pictures')], ['words', ta('opt.settingsPictures.words')]]);

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

/** The shortcut sheet (lib/ShortcutSheet.svelte): opened by «?» in the panels and on the page, from the Urd settings and from the setup wizard. */
let shortcutsOpen = $state(false);

/**
 * Opens the shortcut sheet over the editor.
 * It stays shut while a confirmation or the image editor is open, overlays that answer Escape themselves, and it closes the Urd settings dialog, a tool menu and a page's menu first, so the sheet is the one thing open over the editor.
 */
function openShortcuts() {
  if (confirmBox || pictureEditorState.picture) return;
  settingsOpen = false;
  toolMenu = null;
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

/** The room the Site menu takes in the top bar, per layout: the clusters fold that much earlier there, so the bar still holds Publish at its right edge; the CSS ladder has the same steps under `.editor[data-layout]` (tests/topbar-fold.test.mjs). */
const FOLD_OFFSET = { 'page-tabs': 80 };

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

/** A fold asked for by a link or a tab's menu (lib/panel-folds.js): once its panel stands open, the fold is unfolded alone, the panel's other folds closing, brought into view and its heading lit for a moment, or, for a fold that holds one button (`press`), the button is pressed. */
let foldFocus = $state(null);

/** Opens a panel at one of its folds, by the fold's `data-fold`; `press` presses the fold's one button instead. */
function showFold(panel, fold, { press = false } = {}) {
  foldFocus = { panel, fold, press };
  activePanel = panel;
}

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

  // In «The page's tabs» the column folds once no panel is open (closed by its tab, its head's fold button or the Site menu), rather than standing with the page's tabs alone; the panel open last is kept for the handle.
  $effect(() => {
    if (activePanel && activePanel !== 'settings') lastPanel = activePanel;
    if (foldsEmpty(adminLayout, activePanel) && !panelFolded) panelFolded = true;
  });

  // A fold asked for: unfolded alone, brought into view, its heading focused and lit, once its panel has drawn it; a fold the panel does not draw now leaves the panel as it opens.
  // The panel's other folds close with their own motion (app.css, 0.24 s), and the scroll waits for it, so the fold asked for is brought to where it stands once they have closed.
  $effect(() => {
    const want = foldFocus;
    if (!want || activePanel !== want.panel || !panelEl) return;
    tick().then(() => {
      if (foldFocus !== want) return;
      foldFocus = null;
      const fold = panelEl?.querySelector(`details.group[data-fold="${CSS.escape(want.fold)}"]`);
      if (!fold) return;
      if (want.press) {
        fold.querySelector(':scope > .group-items > button')?.click();
        return;
      }
      for (const other of panelEl.querySelectorAll('details.group[open]')) {
        const topLevel = !other.parentElement?.closest('details.group');
        if (topLevel && other !== fold && !other.contains(fold)) other.open = false;
      }
      fold.open = true;
      const bring = () => fold.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'auto' : 'smooth' });
      if (reducedMotion) bring();
      else setTimeout(bring, 260);
      fold.querySelector(':scope > summary')?.focus({ preventScroll: true });
      fold.classList.add('fold-lit');
      setTimeout(() => fold.classList.remove('fold-lit'), 1400);
    });
  });

  $effect(() => {
    document.documentElement.dataset.adminTheme = adminTheme;
    localStorage.setItem('urd-admin-theme', adminTheme);
    sendAdminTheme();
  });

  // The press feel on the root, where app.css reads it; the ripple is drawn by a listener of its own, there only while it is chosen, and never under reduced motion.
  $effect(() => {
    document.documentElement.dataset.press = pressFeel;
    if (pressFeel !== 'ripple') return;
    const onDown = (e) => {
      if (e.button !== 0 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const control = pressTarget(e.target);
      if (control) ripple(control, e);
    };
    document.addEventListener('pointerdown', onDown, true);
    return () => document.removeEventListener('pointerdown', onDown, true);
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
    if (panelsPref !== 'remember') {
      localStorage.removeItem(PANEL_OPEN_KEY);
      localStorage.removeItem(PANEL_FOLDED_KEY);
      return;
    }
    if (activePanel) localStorage.setItem(PANEL_OPEN_KEY, activePanel);
    else localStorage.removeItem(PANEL_OPEN_KEY);
    if (panelFolded) localStorage.setItem(PANEL_FOLDED_KEY, '1');
    else localStorage.removeItem(PANEL_FOLDED_KEY);
  });


  $effect(() => {
    const extra = FOLD_OFFSET[adminLayout] ?? 0;
    const offs = Object.entries(FOLD_MQ).map(([key, px]) => {
      const mq = window.matchMedia(`(max-width: ${px + extra}px)`);
      const sync = () => { folded[key] = mq.matches; };
      sync();
      mq.addEventListener('change', sync);
      return () => mq.removeEventListener('change', sync);
    });
    return () => offs.forEach((off) => off());
  });

  /* A cluster that has unfolded again has no menu; the choice is cleaned up with it. The Site menu, the devices' sizes, the page switcher and the steps belong to no cluster. */
  $effect(() => {
    if (toolMenu && !['site', 'phone', 'screen', 'page', 'steps'].includes(toolMenu) && !folded[toolMenu]) toolMenu = null;
  });

  /* One open tool menu at a time, same closing pattern as the settings. A question asked from a menu (the steps' «Discard drafts») is part of it: pressing in the question or answering it with Escape leaves the menu open. */
  $effect(() => {
    if (!toolMenu) return;
    const onDown = (e) => { if (!toolMenuEl?.contains(e.target) && !e.target?.closest?.('.confirm-dialog')) toolMenu = null; };
    const onKey = (e) => { if (e.key === 'Escape' && !confirmBox) toolMenu = null; };
    // Focus moving into the preview (a jump between steps selects a block there) is no press outside: a press in the preview closes the menu from there (preview.svelte.js).
    const onBlur = () => { if (document.activeElement?.tagName !== 'IFRAME') toolMenu = null; };
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
  get statusAction() { return statusAction; },
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
  askDestination,
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
  get panelsStart() { return panelsStart; },
  setPanelsStart,
  get PANELS_PREF_OPTIONS() { return PANELS_PREF_OPTIONS; },
  get PANELS_START_OPTIONS() { return PANELS_START_OPTIONS; },
  get activePanel() { return activePanel; },
  set activePanel(v) { activePanel = v; if (v) panelFolded = false; },
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
  ADMIN_LAYOUTS,
  get ADMIN_LAYOUT_OPTIONS() { return ADMIN_LAYOUT_OPTIONS; },
  get updateNotice() { return updateNotice; },
  get UPDATE_NOTICE_OPTIONS() { return UPDATE_NOTICE_OPTIONS; },
  get panelFolded() { return panelFolded; },
  set panelFolded(v) { panelFolded = v; },
  unfoldPanel,
  get adminLayout() { return adminLayout; },
  set adminLayout(v) { adminLayout = v; },
  setAdminLayout,
  get layoutPickerPref() { return layoutPickerPref; },
  set layoutPickerPref(v) { layoutPickerPref = v; },
  setLayoutPicker,
  get addBlockMenuPref() { return addBlockMenuPref; },
  setAddBlockMenu,
  get shortcutsOpen() { return shortcutsOpen; },
  set shortcutsOpen(v) { shortcutsOpen = v; },
  openShortcuts,
  get collectionsLayout() { return collectionsLayout; },
  setCollectionsLayout,
  get COLLECTIONS_LAYOUT_OPTIONS() { return COLLECTIONS_LAYOUT_OPTIONS; },
  get csvPreviewPref() { return csvPreviewPref; },
  get pageSettingsPref() { return pageSettingsPref; },
  get pressFeel() { return pressFeel; },
  get tabMenus() { return tabMenus; },
  setTabMenus,
  get tabMenuStay() { return tabMenuStay; },
  setTabMenuStay,
  get TAB_MENU_OPTIONS() { return TAB_MENU_OPTIONS; },
  get sidebarFolds() { return sidebarFolds; },
  setSidebarFolds,
  get SIDEBAR_FOLDS_OPTIONS() { return SIDEBAR_FOLDS_OPTIONS; },
  get panelTabMenus() { return panelTabMenus; },
  setPanelTabMenus,
  setPressFeel,
  get PRESS_OPTIONS() { return PRESS_OPTIONS; },
  setPageSettingsPref,
  get PAGE_SETTINGS_OPTIONS() { return PAGE_SETTINGS_OPTIONS; },
  setCsvPreview,
  get CSV_PREVIEW_OPTIONS() { return CSV_PREVIEW_OPTIONS; },
  get settingsPlace() { return settingsPlace; },
  setSettingsPlace,
  get settingsPictures() { return settingsPictures; },
  setSettingsPictures,
  get SETTINGS_PLACE_OPTIONS() { return SETTINGS_PLACE_OPTIONS; },
  get SETTINGS_PICTURES_OPTIONS() { return SETTINGS_PICTURES_OPTIONS; },
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
  showFold,
  decorateSubFolds,
  effects,
};
