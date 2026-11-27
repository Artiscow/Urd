/**
 * The shell's state: the admin theme and language, the status, the sign-in, the confirmation, the setup wizard, the panels, the keyboard and the startup.
 */
import { ta } from '$engine/i18n.js';
import { TOOLBAR_FORMS, TOOLBAR_LOOKS, TOOLBAR_SIZES, TOOLBAR_GEARS, TOOLBAR_PHONES, TOOLBAR_PHONE_PLACES, TOOLBAR_DESIGNS } from '../menu/forms.js';
import { relativeLuminance, contrastRatio } from '$engine/theme.js';
import { liftSiteFile, SITE_SCHEMA_VERSION } from '$engine/migrate.js';
import { createDraftStore } from '../lib/draftStore.js';
import { PHONE_PANEL_LAYOUTS, PHONE_COLUMN_LOOKS } from '../lib/phone-panel.js';
import { tick } from 'svelte';
import { ICONS } from '../lib/icons.js';
import { opensShortcuts, togglesGrid } from '../lib/shortcuts.js';
import { GRID_LOOKS, gridLookOf } from '$engine/snap-model.js';
import { UPDATE_NOTICES, updateNoticeForm } from '../lib/update-notice.js';
import { SETTINGS_PLACES, settingsPlace as settingsPlaceOf, settingsPictures as settingsPicturesOf } from '../lib/settings-model.js';
import { ADMIN_LAYOUTS } from '../lib/admin-designs.js';
import { panelsPrefOf, panelsPrefsFor, startPanels, PANELS_START_DEFAULT, foldsEmpty, unfoldedPanel } from '../lib/panels-start.js';
import { COLLECTION_LAYOUTS, collectionLayoutOf, CSV_PREVIEWS, csvPreviewOf } from '../lib/collection-layout.js';
import { PAGE_SETTINGS_LAYOUTS, pageSettingsLayoutOf } from '../lib/page-settings.js';
import { PRESS_FEELS, pressFeelOf, pressTarget, ripple } from '../lib/press-feel.js';
import { COVER_LOOKS, coverLookOf } from '../lib/canvas-cover.js';
import { TAB_MENU_STYLES, tabMenuStyleOf } from '../lib/panel-folds.js';
import { collectionsState } from './collections.svelte.js';
import { historyState } from './history.svelte.js';
import { savedState } from './saved.svelte.js';
import { draftsState } from './drafts.svelte.js';
import { pageState } from './page.svelte.js';
import { paletteState } from './palette.svelte.js';
import { pluginsState } from './plugins.svelte.js';
import { previewState } from './preview.svelte.js';
import { siteState } from './site.svelte.js';
import { pictureEditorState } from './picture-editor.svelte.js';
import { templatesState } from './templates.svelte.js';
import { redirectsState } from './redirects.svelte.js';
import { partsState, PANEL_PARTS } from '../lib/parts.svelte.js';
import { updaterState } from './updater.svelte.js';

/** The admin's own colour themes, picked in the top bar and stored per browser; the site's theme is the Theme panel's. */
const ADMIN_THEMES = $derived([
  ['purple', ta('adminTheme.purple')],
  ['well', ta('adminTheme.well')],
  ['gold', ta('adminTheme.gold')],
  ['grey', ta('adminTheme.grey')],
  ['aurora', ta('adminTheme.aurora')],
  ['dusk', ta('adminTheme.dusk')],
  ['ember', ta('adminTheme.ember')],
]);

// A stored Norwegian theme id is mapped on read, and the effect below writes the current id back.
const LEGACY_ADMIN_THEMES = { lilla: 'purple', bronn: 'well', gull: 'gold', graa: 'grey', nordlys: 'aurora', skumring: 'dusk', glo: 'ember' };

let adminTheme = $state((() => {
  const stored = localStorage.getItem('urd-admin-theme');
  return LEGACY_ADMIN_THEMES[stored] ?? stored ?? 'grey';
})());

/** Reports the admin's theme colours to the preview, read from the document's variables, so the editor's menus there follow the admin. */
function sendAdminTheme() {
  const style = getComputedStyle(document.documentElement);
  const accent = style.getPropertyValue('--urd-color-accent').trim();
  previewState.bridge?.sendAdminTheme({
    bg: style.getPropertyValue('--urd-color-bg').trim(),
    surface: style.getPropertyValue('--urd-color-surface').trim(),
    accent,
    text: style.getPropertyValue('--urd-color-text').trim(),
    // Readable text on the admin accent, black or white by its contrast.
    'accent-text': readableOn(accent),
  });
}

/** Black or white text - whichever has the best WCAG contrast against the background. */
function readableOn(bg) {
  const l = relativeLuminance(bg);
  if (l == null) return '#ffffff';
  return (contrastRatio(bg, '#ffffff') ?? 0) >= (contrastRatio(bg, '#000000') ?? 0) ? '#ffffff' : '#000000';
}

let status = $state('');

/** 'info' | 'ok' | 'error' - controls the color of the status chip */
let statusKind = $state('info');

let statusSeq = 0;

/** The status line's one action beside its words, such as «Undo» after a delete of several entries; a new status clears it. */
let statusAction = $state(null);

/** Sets the status message; an 'ok' message clears itself after 8 s. */
function setStatus(msg, kind = 'info', action = null) {
  status = msg;
  statusKind = kind;
  statusAction = msg && action && typeof action.run === 'function' ? { label: String(action.label ?? ''), run: action.run } : null;
  // A screen reader speaks the status where the browser has ariaNotify (ADR-0011); an error goes ahead of anything it has queued.
  if (msg) globalThis.document?.ariaNotify?.(msg, { priority: kind === 'error' ? 'high' : 'normal' });
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
  const msg = ta('status.storageFull');
  // Set once while it stands, so a screen reader does not speak it again at every save.
  if (status === msg && statusKind === 'error') return;
  setStatus(msg, 'error');
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

/** The phone view at a phone's size: a Phone standing at a tablet size or an own width above the breakpoint takes the phone preset first. */
function toPhoneView() {
  if (previewState.devices.find((d) => d.id === 'mobile')?.viewport !== 'mobile') previewState.setPhonePref({ size: 'phone' });
  previewState.deviceId = 'mobile';
}

/** The review badge: the phone view, scrolled to the first section that needs review once the view has changed. */
function jumpToAttention() {
  const target = pageState.store?.data.sections.find((s) => s.responsive?.mobile?.attention?.needed);
  toPhoneView();
  if (target) setTimeout(() => previewState.bridge?.sendScrollSection(target.id), 0);
}

/** «Look on the phone» from the phone check: the phone view at the section, on this page or on another page once its canvas is ready. */
async function lookOnPhone(id, sectionId) {
  toPhoneView();
  if (id === pageState.pageId) {
    setTimeout(() => previewState.bridge?.sendScrollSection(sectionId), 0);
    return;
  }
  previewState.scrollOnReady(sectionId);
  await pageState.selectPage(id);
}

// A press in the admin outside the block menu closes it; one in a dialog over the menu leaves it open.
function onPointerdownWindow(e) {
  if (!pageState.blockMenu) return;
  // A tool of the phone view's bar that opens the menu (CanvasBar.svelte) leaves it to its press, which closes it at a second one, as on the page.
  if (e.target instanceof Element && e.target.closest('.block-menu, dialog, [data-opens-menu]')) return;
  pageState.blockMenu = null;
}

/** Whether a dropdown's list or a colour picker stands open inside the floating menu. */
const openInMenu = () => Boolean(document.querySelector('.block-menu :is(.dd-pop, .cp-pop):popover-open, .block-menu :is(.dd-pop, .cp-pop):not([popover])'));

function onKeydown(e) {
  if (e.key === 'Escape' && pageState.blockMenu && !(e.target instanceof Element && e.target.closest('dialog'))) {
    // Escape closes what stands open inside the menu first (a list that stays open after a choice, a colour picker); the menu itself goes at the next one.
    if (openInMenu()) return;
    pageState.blockMenu = null;
    return;
  }
  // Escape ends a look at a saved draft, and while one stands the keys that would change the draft rest (state/preview.svelte.js).
  if (previewState.looking && !(e.target instanceof Element && e.target.closest('dialog'))) {
    if (e.key === 'Escape') {
      previewState.endLook();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && ['z', 'y', 'd', 'v', 'x'].includes(e.key.toLowerCase()) && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault();
      return;
    }
  }
  // «?» opens the shortcut sheet wherever it is not typed: a toggle, a slider or a colour lets the key through, and a dialog keeps it.
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
  // G shows or hides the grid, as the top bar's Grid button does, wherever in the panels it is not typed.
  if (togglesGrid(e, typed)) {
    e.preventDefault();
    toggleGrid();
    return;
  }
  if (!(e.ctrlKey || e.metaKey)) return;
  // A dialog over the editor (the link editor, the design picker) keeps its keys: the page behind it is not changed.
  if (e.target instanceof Element && e.target.closest('dialog')) return;
  const key = e.key.toLowerCase();
  // Ctrl+S anywhere in the admin saves the ticked drafts (state/drafts.svelte.js), in place of the browser's saving of the page.
  if (key === 's' && !e.altKey && !e.shiftKey) {
    e.preventDefault();
    draftsState.saveKey();
    return;
  }
  // Ctrl+K outside a text opens the command palette, and Ctrl+Shift+P anywhere; in a text Ctrl+K stays the link key.
  if ((key === 'k' && !e.altKey && !e.shiftKey) || (key === 'p' && e.shiftKey && !e.altKey)) {
    if (typed && key === 'k') return;
    e.preventDefault();
    paletteState.openPalette();
    return;
  }
  // Ctrl+D duplicates the selected block in the preview; only a text field keeps the browser's shortcut.
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
  // A text field keeps the browser's own undo; numbers, toggles, sliders and colour pickers use the editor's history.
  const nativeUndo = t instanceof HTMLElement
    && (t.isContentEditable || t.tagName === 'TEXTAREA'
      || (t.tagName === 'INPUT' && !['number', 'checkbox', 'range', 'color'].includes(t.type)));
  if (nativeUndo) return;
  e.preventDefault();
  if (key === 'y' || e.shiftKey) historyState.redo();
  else historyState.undo();
}

async function init() {
  // The sign-in is asked for beside the rest of the load; one due for renewal is renewed before any other call reaches GitHub.
  const due = renewDue();
  const signedIn = checkAuth();
  if (due) await signedIn;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && renewDue()) checkAuth();
  });
  // A tab showing the sign-in as ended asks again as another tab plans a new renewal, which it does only with a sign-in that holds.
  window.addEventListener('storage', (event) => {
    if (event.key === RENEW_KEY && event.newValue && !auth?.loggedIn) checkAuth();
  });
  // The saved drafts are met before any store is built (ADR-0032, meetOnLoad), and the site is set together with its draft.
  const meeting = savedState.meetOnLoad();
  const siteFile = fetch('/content/site.json').then((res) => res.json());
  const published = liftSiteFile(await siteFile);
  await meeting;
  siteState.site = published;
  siteState.siteStore = createDraftStore('urd-draft-site', () => siteState.site, draftSaveError);
  // A site draft with a higher schemaVersion than the engine's is discarded, as a page draft is.
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
  // The page the address names (selectPage writes it there, so a reload opens it again), or the first page where it names none of the site's.
  const named = new URLSearchParams(location.search).get('page');
  // The page, the plugins, the collections, the templates and the redirects are read together: none reads another's store.
  await Promise.all([
    pageState.selectPage(siteState.siteDraft.pages.some((p) => p.id === named) ? named : siteState.siteDraft.pages[0].id),
    pluginsState.initPlugins(),
    collectionsState.initCollections(),
    templatesState.initTemplates(),
    redirectsState.initRedirects(),
  ]);
  // The steps kept from the last session in this browser, taken up when the drafts are the ones they were kept with.
  await historyState.loadKept();
  await signedIn;
  // The publish baseline is fetched only when signed in.
  if (auth) updaterState.refreshBaseSha();
  // The update check runs at the start for a publisher, so a new Urd is told in the admin's navigation without the Updates panel open.
  if (auth?.allowed) updaterState.loadUpdateCheck();
  // A panel remembered from the last visit opens with its data.
  loadPanelData();
  // A draft saved on another device that this browser has not seen is told now, and as the tab comes back into view (ADR-0032).
  savedState.watchSaves();
  // The setup wizard, on the template's signal (site.setup) where this browser has not closed it.
  if (siteState.siteDraft.site.setup === true && !localStorage.getItem('urd-setup-done')) {
    setupName = siteState.siteDraft.site.title;
    setupAccent = siteState.siteDraft.theme.tokens.color.accent;
    setupBg = siteState.siteDraft.theme.tokens.color.bg;
    showSetup = true;
  }
}

// The editor's own confirm(): a promise-based modal, one at a time.
let confirmBox = $state(null);

/** `sections`: several things to weigh, each under its heading ({heading, lines}); `danger`: the answer undoes much, and its button is dark red. */
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
 * Asks where the visitors of a deleted or hidden page's address go: the front page, a page from `options`, or nowhere.
 * Resolves with { to }, or null on cancel.
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

// Whether a press began on the backdrop, so a text drag out of the card does not close it.
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
    // The signal is spent: the next publish removes it from site.json.
    delete siteState.siteDraft.site.setup;
  });
  closeSetup();
  setStatus(ta('status.setupDone'), 'ok');
}

/* What the admin shows when it is loaded again («Open panel», lib/panels-start.js), stored per browser where it is not the default. */
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

/** Whether the open panel is drawn: a panel loaded on demand once its code is in, so what reaches into it waits for it. */
const panelDrawn = $derived(!PANEL_PARTS[activePanel] || Boolean(partsState.loaded[PANEL_PARTS[activePanel]]));

/** How the panels are reached («Panel navigation»): the rail by default, the sidebar, the panel's tabs, the strip or the page's tabs, stored per browser. */
const ADMIN_LAYOUT_KEY = 'urd-admin-layout';

let adminLayout = $state(ADMIN_LAYOUTS.includes(localStorage.getItem(ADMIN_LAYOUT_KEY)) ? localStorage.getItem(ADMIN_LAYOUT_KEY) : ADMIN_LAYOUTS[0]);

function setAdminLayout(v) {
  adminLayout = ADMIN_LAYOUTS.includes(v) ? v : ADMIN_LAYOUTS[0];
  // The column folded because no panel was open in «The page's tabs and a Site menu» stands open in a layout that keeps it with its tabs.
  if (!activePanel && adminLayout !== 'page-tabs') panelFolded = false;
  if (adminLayout === ADMIN_LAYOUTS[0]) localStorage.removeItem(ADMIN_LAYOUT_KEY);
  else localStorage.setItem(ADMIN_LAYOUT_KEY, adminLayout);
  if (toolMenu === 'site') toolMenu = null;
}

const ADMIN_LAYOUT_OPTIONS = $derived(ADMIN_LAYOUTS.map((id) => [id, ta(`opt.adminLayout.${id}`)]));

/** The update notice drawn now (lib/update-notice.js): `dot` on the Updates panel's icon, word or tab, `pill` in the top bar, null while no update is out. */
const updateNotice = $derived(updateNoticeForm(updaterState.updateAvailable, siteState.siteDraft?.admin?.updateNotice, folded.view));

const UPDATE_NOTICE_OPTIONS = $derived(UPDATE_NOTICES.map((id) => [id, ta(`opt.updateNotice.${id}`)]));

/** Whether the tab layouts' column is folded to a handle at the edge; a panel opened from anywhere unfolds it (the activePanel setter). */
let panelFolded = $state(false);

/** The panel open last, which the handle opens again in «The page's tabs and a Site menu» (lib/panels-start.js unfoldedPanel). */
let lastPanel = null;

/** The handle at the column's edge: the column unfolds, in «The page's tabs and a Site menu» with the panel last open, since it never stands empty there. */
function unfoldPanel() {
  const panel = unfoldedPanel(adminLayout, activePanel, lastPanel);
  panelFolded = false;
  if (panel !== activePanel) {
    activePanel = panel;
    loadPanelData();
  }
}

/** The panels grouped by workflow, with dividers in the panel picker; PANEL_LABELS holds their names, and Drafts opens a window. */
const PANEL_GROUPS = [
  ['pages', 'blocks', 'properties', 'phone'],
  ['site', 'legal', 'theme', 'nav', 'footer', 'collections', 'plugins'],
  ['drafts', 'history', 'update'],
];

/** The tabs that open a window of their own, never the panel column. */
const WINDOW_TABS = ['drafts'];

/** The panels the column can hold. */
const PANEL_IDS = PANEL_GROUPS.flat().filter((id) => !WINDOW_TABS.includes(id));

/** Uppercase label above each group in the rail, in the same order. */
const PANEL_GROUP_KEYS = ['rail.thisPage', 'rail.site', 'rail.system'];

/** The panels' names, and the settings panel's (panels/SettingsPanel.svelte), which stands in no group since the gear opens it. */
const PANEL_LABELS = $derived({ ...Object.fromEntries(PANEL_GROUPS.flat().map((id) => [id, ta(`panel.${id}`)])), settings: ta('settings.title') });

/** The panel the admin starts with, until it first stands: it opens with the admin, not at the owner's press (openedAtStart). */
let startPanel = null;

// The panel and the fold the admin starts with; a remembered id from an older version may name a panel that is gone.
{
  const panels = PANEL_IDS;
  const start = startPanels({ pref: panelsPref, layout: adminLayout, panels, stored: localStorage.getItem(PANEL_OPEN_KEY), storedFolded: localStorage.getItem(PANEL_FOLDED_KEY) === '1', start: panelsStart });
  activePanel = start.panel;
  // A panel folded away at the start stands first when the owner unfolds it, which is an opening of their own.
  startPanel = start.folded ? null : start.panel;
  panelFolded = start.folded;
  if (!panels.includes(panelsStart)) panelsStart = PANELS_START_DEFAULT;
}

/**
 * Whether a panel stands because the admin started with it, asked as it first stands (PhonePanel.svelte).
 * Asked once: a later standing is the owner's opening.
 * @param {string} id
 * @returns {boolean}
 */
function openedAtStart(id) {
  const at = startPanel === id;
  startPanel = null;
  return at;
}

/** «Open panel»: the folded column only in the layouts that keep the column. */
const PANELS_PREF_LABELS = { remember: 'settings.panelsRemember', reset: 'settings.panelsReset', fixed: 'settings.panelsFixed', folded: 'settings.panelsFolded' };

const PANELS_PREF_OPTIONS = $derived(panelsPrefsFor(adminLayout).map((id) => [id, ta(PANELS_PREF_LABELS[id])]));

const PANELS_START_OPTIONS = $derived(PANEL_IDS.map((id) => [id, PANEL_LABELS[id]]));

/* The panel intros, a tooltip on the panel's title (ADR-0016), their keys joined with line breaks. */
const PANEL_INTROS = {
  pages: ['hint.pages.drafts'],
  blocks: ['hint.blocks.intro'],
  phone: ['hint.phone.intro'],
  collections: ['hint.collections.intro'],
  plugins: ['hint.plugins.intro'],
  history: ['hint.history.intro'],
};

/** The admin languages under their own names, never translated; a choice is kept per browser (urd-admin-lang). */
const LANG_OPTIONS = [
  ['se', 'Davvisámegiella'],
  ['en-GB', 'English (UK)'],
  ['nb', 'Norsk bokmål'],
  ['nn', 'Norsk nynorsk'],
  ['tr', 'Türkçe'],
];

/** Languages by their own names, as the built-ins are. */
const sortLangs = (list) => [...list].sort((a, b) => a[1].localeCompare(b[1]));

function packLangOptions(ids, kind) {
  const out = [];
  for (const id of ids) {
    for (const lang of pluginsState.pluginInfo[id]?.languages ?? []) {
      // A broken entry (no name or code, or a built-in code) is skipped, as the engine's loading skips it.
      if (lang?.[kind] !== true) continue;
      if (typeof lang.code !== 'string' || typeof lang.name !== 'string' || !lang.name) continue;
      if (LANG_OPTIONS.some(([code]) => code === lang.code)) continue;
      if (!out.some(([code]) => code === lang.code)) out.push([lang.code, lang.name]);
    }
  }
  return out;
}

/** The admin languages follow the published plugin list, which the engine reads at startup; a stored choice not among them stands as its own option. */
function adminLangOptions() {
  const options = sortLangs([...LANG_OPTIONS, ...packLangOptions(pluginsState.publishedPluginIds, 'admin')]);
  const known = adminLangChoice === 'auto' || options.some(([code]) => code === adminLangChoice);
  return known ? options : [[adminLangChoice, adminLangChoice], ...options];
}

/** The visitor languages follow the draft: site.lang is published together with the plugin draft. */
const sitePackLangs = () => packLangOptions(pluginsState.pluginsView?.enabled ?? [], 'site');

const adminLangChoice = localStorage.getItem('urd-admin-lang') ?? 'auto';

function setAdminLang(v) {
  if (v === adminLangChoice) return;
  if (v === 'auto') localStorage.removeItem('urd-admin-lang');
  else localStorage.setItem('urd-admin-lang', v);
  // A language switch is a reload: the dictionaries are read at startup.
  location.reload();
}

function togglePanel(name) {
  if (WINDOW_TABS.includes(name)) {
    draftsState.toggleDrafts();
    return;
  }
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

/** Where the time the sign-in is next renewed is kept, in milliseconds since 1970: a personal workspace value, shared by the editor's tabs. */
const RENEW_KEY = 'urd-sign-in-renew';
/** How long before the planned renewal a call that reaches GitHub renews first, in milliseconds (RENEW_SOON in functions/_lib/session.js). */
const RENEW_LEAD = 5 * 60 * 1000;
/** The longest wait planned, in seconds, so a far time never overflows the timer. */
const RENEW_LONGEST = 24 * 60 * 60;
let renewTimer = null;
/** The status call on its way, which a second ask in this tab shares. */
let asking = null;

function renewAt() {
  try {
    return Number(localStorage.getItem(RENEW_KEY)) || 0;
  } catch {
    return 0;
  }
}

/** Whether the sign-in is due for renewal (functions/_lib/session.js), or within `lead` milliseconds of it. */
function renewDue(lead = 0) {
  const at = renewAt();
  return at > 0 && Date.now() >= at - lead;
}

/** Asks for the sign-in again in `seconds`, where the status gave a time; without one, nothing is planned and the kept time goes. */
function planRenewal(seconds) {
  clearTimeout(renewTimer);
  renewTimer = null;
  const wait = typeof seconds === 'number' && seconds > 0 ? Math.min(seconds, RENEW_LONGEST) : 0;
  try {
    if (wait) localStorage.setItem(RENEW_KEY, String(Date.now() + wait * 1000));
    else localStorage.removeItem(RENEW_KEY);
  } catch { /* storage refused: the timer below still asks */ }
  if (wait) renewTimer = setTimeout(() => checkAuth(), wait * 1000);
}

/** Renews the sign-in first where it falls due within RENEW_LEAD, before a call that reaches GitHub (a publish, a save of drafts). */
async function renewIfDue() {
  if (renewDue(RENEW_LEAD)) await checkAuth({ soon: true });
}

/** The status call, one at a time across the editor's tabs where the browser has Web Locks, so a tab asks with the cookies another was given. */
function askStatus(soon) {
  const ask = () => fetch(soon ? '/api/github/me?soon=1' : '/api/github/me');
  return navigator.locks?.request ? navigator.locks.request('urd-sign-in', ask) : ask();
}

/**
 * The sign-in status (api/github/me.js), which renews a sign-in that has fallen due; one call at a time in a tab.
 * A refused renewal is asked again once.
 * @param {{soon?: boolean}} [opts] soon: renew where the sign-in falls due within RENEW_LEAD
 */
function checkAuth(opts) {
  asking ??= readStatus(opts).finally(() => { asking = null; });
  return asking;
}

async function readStatus({ soon = false } = {}, retried = false) {
  let data = null;
  try {
    const res = await askStatus(soon);
    if (res.ok) data = await res.json();
    else if (res.status < 500) {
      auth = null;
      planRenewal();
      return;
    }
  } catch { /* no answer: handled below */ }
  if (!data) {
    if (renewDue()) planRenewal(60);
    return;
  }
  if (data.renewFailed && !data.loggedIn && !retried) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return readStatus({ soon }, true);
  }
  auth = data;
  if (!data.renewFailed) planRenewal(data.renewIn);
}

/** «Sign out» (TopBar): the server expires the session and revokes its token (api/github/logout.js), and the sign-in status is read again. */
async function signOut() {
  try {
    const res = await fetch('/api/github/logout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    if (!res.ok) throw new Error(String(res.status));
    // A status call already on its way carries the cookies from before; the status is read anew after it.
    await asking;
    await checkAuth();
    setStatus(ta('status.signedOut'));
  } catch {
    setStatus(ta('status.signOutFailed'), 'error');
  }
}

/** Guides on or off, kept per browser and set again in onReady. */
let guidesOn = $state(localStorage.getItem('urd-guides') === '1');

/** The live phone beside the desktop canvas (shell/LivePhone.svelte), kept per browser while it is on. */
let livePhoneOn = $state(localStorage.getItem('urd-live-phone') === '1');

function toggleLivePhone() {
  livePhoneOn = !livePhoneOn;
  if (livePhoneOn) localStorage.setItem('urd-live-phone', '1');
  else localStorage.removeItem('urd-live-phone');
}

/** Whether the Urd settings stand open as the dialog or the sheet (settings/SettingsDialog.svelte); the panel form is `settings` in activePanel. */
let settingsOpen = $state(false);

/** Where the Urd settings open («Settings window») and whether their look choices show pictures, kept per browser; a change of place moves open settings. */
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

/** How the Collections panel shows a collection («Collections editor»): stepping in by default, two columns, or a table over the page; kept per browser. */
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

/** What covers the canvas and the live phone while a page loads («Canvas loading», lib/canvas-cover.js): the rune circle by default; kept per browser. */
const CANVAS_COVER_KEY = 'urd-canvas-cover';

let canvasCover = $state(coverLookOf(localStorage.getItem(CANVAS_COVER_KEY)));

function setCanvasCover(v) {
  canvasCover = coverLookOf(v);
  if (canvasCover === 'circle') localStorage.removeItem(CANVAS_COVER_KEY);
  else localStorage.setItem(CANVAS_COVER_KEY, canvasCover);
}

const CANVAS_COVER_OPTIONS = $derived(COVER_LOOKS.map((id) => [id, ta(`opt.canvasCover.${id}`)]));

/** How a list shows where a dragged row will land («Moving rows»): the slot by default, or the line; kept per browser. */
const DRAG_MARK_KEY = 'urd-drag-mark';
const DRAG_MARKS = ['slot', 'line'];
let dragMark = $state(localStorage.getItem(DRAG_MARK_KEY) === 'line' ? 'line' : 'slot');

function setDragMark(v) {
  dragMark = v === 'line' ? 'line' : 'slot';
  if (dragMark === 'slot') localStorage.removeItem(DRAG_MARK_KEY);
  else localStorage.setItem(DRAG_MARK_KEY, dragMark);
}

const DRAG_MARK_OPTIONS = $derived(DRAG_MARKS.map((id) => [id, ta(`opt.dragMark.${id}`)]));

/** How the tabs' menus set their rows apart (Urd settings «Panel menus», lib/panel-folds.js): the groups by default, remembered per browser. */
const TAB_MENUS_KEY = 'urd-tab-menus';
let tabMenus = $state(tabMenuStyleOf(localStorage.getItem(TAB_MENUS_KEY)));

function setTabMenus(v) {
  tabMenus = tabMenuStyleOf(v);
  if (tabMenus === 'groups') localStorage.removeItem(TAB_MENUS_KEY);
  else localStorage.setItem(TAB_MENUS_KEY, tabMenus);
}

const TAB_MENU_OPTIONS = $derived(TAB_MENU_STYLES.map((id) => [id, ta(`opt.tabMenus.${id}`)]));

/** Whether a tab's menu stays open after a pick until the mouse leaves it (the default), or closes («After a pick»); kept per browser. */
const TAB_MENU_STAY_KEY = 'urd-tab-menu-stay';
let tabMenuStay = $state(localStorage.getItem(TAB_MENU_STAY_KEY) === 'close' ? 'close' : 'stay');

function setTabMenuStay(v) {
  tabMenuStay = v === 'close' ? 'close' : 'stay';
  if (tabMenuStay === 'stay') localStorage.removeItem(TAB_MENU_STAY_KEY);
  else localStorage.setItem(TAB_MENU_STAY_KEY, tabMenuStay);
}

/** Where the sidebar of words shows a panel's folds («Folds in the sidebar»): a tree under the open panel by default, under the hovered word, or a flyout. */
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

/** Whether the panel's own tabs open a menu of a panel's folds («Menus under the tabs»): off by default; kept per browser. */
const PANEL_TAB_MENUS_KEY = 'urd-panel-tab-menus';
let panelTabMenus = $state(localStorage.getItem(PANEL_TAB_MENUS_KEY) === 'on');

function setPanelTabMenus(v) {
  panelTabMenus = v === 'on' || v === true;
  if (panelTabMenus) localStorage.setItem(PANEL_TAB_MENUS_KEY, 'on');
  else localStorage.removeItem(PANEL_TAB_MENUS_KEY);
}

/** Where a page's settings open («Page settings»): a dialog by default, a step in the Pages panel, or a table of every page; kept per browser. */
const PAGE_SETTINGS_KEY = 'urd-page-settings';

let pageSettingsPref = $state(pageSettingsLayoutOf(localStorage.getItem(PAGE_SETTINGS_KEY)));

function setPageSettingsPref(v) {
  pageSettingsPref = pageSettingsLayoutOf(v);
  if (pageSettingsPref === 'dialog') localStorage.removeItem(PAGE_SETTINGS_KEY);
  else localStorage.setItem(PAGE_SETTINGS_KEY, pageSettingsPref);
}

const PAGE_SETTINGS_OPTIONS = $derived(PAGE_SETTINGS_LAYOUTS.map((id) => [id, ta(`opt.pageSettings.${id}`)]));

/** Where a CSV import shows what it will do («CSV import preview»): a dialog by default, a step in the panel, or a table over the page; kept per browser. */
const CSV_PREVIEW_KEY = 'urd-csv-preview';

let csvPreviewPref = $state(csvPreviewOf(localStorage.getItem(CSV_PREVIEW_KEY)));

function setCsvPreview(v) {
  csvPreviewPref = csvPreviewOf(v);
  if (csvPreviewPref === 'dialog') localStorage.removeItem(CSV_PREVIEW_KEY);
  else localStorage.setItem(CSV_PREVIEW_KEY, csvPreviewPref);
}

const CSV_PREVIEW_OPTIONS = $derived(CSV_PREVIEWS.map((id) => [id, ta(`opt.csvPreview.${id}`)]));

/** Where the Phone panel's blocks in their order stand (lib/phone-panel.js), and whether its column at the stage's edge stands open or folded. */
let phonePanelPref = $state(storedOf('urd-phone-panel', PHONE_PANEL_LAYOUTS));
const setPhonePanel = (v) => { phonePanelPref = keepOf('urd-phone-panel', PHONE_PANEL_LAYOUTS, v); };
const PHONE_PANEL_OPTIONS = $derived(PHONE_PANEL_LAYOUTS.map((id) => [id, ta(`opt.phonePanel.${id}`)]));
/** How the column at the stage's right edge is drawn (lib/phone-panel.js). */
let phoneColumnPref = $state(storedOf('urd-phone-column', PHONE_COLUMN_LOOKS));
const setPhoneColumn = (v) => { phoneColumnPref = keepOf('urd-phone-column', PHONE_COLUMN_LOOKS, v); };
const PHONE_COLUMN_OPTIONS = $derived(PHONE_COLUMN_LOOKS.map((id) => [id, ta(`opt.phoneColumn.${id}`)]));
const PHONE_DOCK_STATES = ['open', 'folded'];
let phoneDockOpen = $state(storedOf('urd-phone-dock', PHONE_DOCK_STATES) === 'open');
const setPhoneDockOpen = (open) => { phoneDockOpen = keepOf('urd-phone-dock', PHONE_DOCK_STATES, open ? 'open' : 'folded') === 'open'; };

const SETTINGS_PLACE_OPTIONS = $derived(SETTINGS_PLACES.map((id) => [id, ta(`opt.settingsPlace.${id}`)]));

const SETTINGS_PICTURES_OPTIONS = $derived([['pictures', ta('opt.settingsPictures.pictures')], ['words', ta('opt.settingsPictures.words')]]);

/* The layout picker's form: a strip above the section by default, or a gallery menu; the preview reads its key at every opening. */
let layoutPickerPref = $state(localStorage.getItem('urd-layout-picker') === 'menu' ? 'menu' : 'strip');

/** The browser's own spell check on the texts while editing: on unless the owner turns it off. */
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

/** The form of the canvas's «+ New block» menu: the groups on the side by default, or the slim list; the preview reads the key at every opening. */
let addBlockMenuPref = $state(localStorage.getItem('urd-add-block-menu') === 'slim' ? 'slim' : 'side');

function setAddBlockMenu(v) {
  addBlockMenuPref = v === 'slim' ? 'slim' : 'side';
  if (addBlockMenuPref === 'slim') localStorage.setItem('urd-add-block-menu', 'slim');
  else localStorage.removeItem('urd-add-block-menu');
}

/** A setting's stored value from its list, the list's first where it holds none of the list. */
function storedOf(key, list) {
  const v = localStorage.getItem(key);
  return list.includes(v) ? v : list[0];
}

function keepOf(key, list, v) {
  const value = list.includes(v) ? v : list[0];
  if (value === list[0]) localStorage.removeItem(key);
  else localStorage.setItem(key, value);
  return value;
}

let toolbarPref = $state(storedOf('urd-block-toolbar', TOOLBAR_FORMS));
const setToolbar = (v) => { toolbarPref = keepOf('urd-block-toolbar', TOOLBAR_FORMS, v); };
let toolbarLookPref = $state(storedOf('urd-toolbar-look', TOOLBAR_LOOKS));
const setToolbarLook = (v) => { toolbarLookPref = keepOf('urd-toolbar-look', TOOLBAR_LOOKS, v); };
let toolbarGearPref = $state(storedOf('urd-toolbar-gear', TOOLBAR_GEARS));
const setToolbarGear = (v) => { toolbarGearPref = keepOf('urd-toolbar-gear', TOOLBAR_GEARS, v); };
let toolbarPhonePref = $state(storedOf('urd-toolbar-phone', TOOLBAR_PHONES));
const setToolbarPhone = (v) => { toolbarPhonePref = keepOf('urd-toolbar-phone', TOOLBAR_PHONES, v); };
let toolbarDesignPref = $state(storedOf('urd-toolbar-design', TOOLBAR_DESIGNS));
const setToolbarDesign = (v) => { toolbarDesignPref = keepOf('urd-toolbar-design', TOOLBAR_DESIGNS, v); };
let toolbarSizePref = $state(storedOf('urd-toolbar-size', TOOLBAR_SIZES));
const setToolbarSize = (v) => { toolbarSizePref = keepOf('urd-toolbar-size', TOOLBAR_SIZES, v); };
let toolbarPhonePlacePref = $state(storedOf('urd-toolbar-phone-place', TOOLBAR_PHONE_PLACES));
const setToolbarPhonePlace = (v) => { toolbarPhonePlacePref = keepOf('urd-toolbar-phone-place', TOOLBAR_PHONE_PLACES, v); };

/** The shortcut sheet (lib/ShortcutSheet.svelte): opened by «?» in the panels and on the page, from the Urd settings and from the setup wizard. */
let shortcutsOpen = $state(false);

/**
 * Opens the shortcut sheet, closing the Urd settings and the tool menu first.
 * It stays shut while a confirmation or the image editor is open.
 */
function openShortcuts() {
  if (confirmBox || pictureEditorState.picture) return;
  settingsOpen = false;
  toolMenu = null;
  shortcutsOpen = true;
}

/* The widths at which the top bar's clusters fold into menus, View first and Zoom last, equal to the media queries (tests/topbar-fold.test.mjs). */
const FOLD_MQ = { view: 1079, device: 999, zoom: 919 };

/** The room the Site menu takes in the top bar, per layout, by which the clusters fold earlier; the CSS has the same steps (tests/topbar-fold.test.mjs). */
const FOLD_OFFSET = { 'page-tabs': 80 };

let toolMenu = $state(null);

let toolMenuEl = $state(null);

let folded = $state({ view: false, device: false, zoom: false });

function toggleGuides() {
  guidesOn = !guidesOn;
  localStorage.setItem('urd-guides', guidesOn ? '1' : '0');
  previewState.bridge?.sendShowGuides(guidesOn);
}

/** The grid overlay on or off, apart from the Grid panel, kept per browser. */
let gridOn = $state(localStorage.getItem('urd-grid-overlay') === '1');

function toggleGrid() {
  gridOn = !gridOn;
  localStorage.setItem('urd-grid-overlay', gridOn ? '1' : '0');
  previewState.bridge?.sendShowGrid(gridOn);
}

/** How the grid is drawn (snap-model.js GRID_LOOKS): lines by default, dots, or only in a drag; kept per browser and read by the preview. */
let gridLook = $state(gridLookOf(localStorage.getItem('urd-grid-look')));

function setGridLook(v) {
  gridLook = gridLookOf(v);
  if (gridLook === 'lines') localStorage.removeItem('urd-grid-look');
  else localStorage.setItem('urd-grid-look', gridLook);
  // What stands on the page is drawn again in the new look.
  if (gridOn) previewState.bridge?.sendShowGrid(true);
  if (guidesOn) previewState.bridge?.sendShowGuides(true);
}

const GRID_LOOK_OPTIONS = $derived(GRID_LOOKS.map((id) => [id, ta(`opt.gridLook.${id}`)]));

// The panel's fold-all buttons act on its drawn details elements, shown only for a panel with group folds.
let panelEl = $state(null);

/** A fold asked for by a link or a tab's menu, unfolded alone and lit once its panel stands, its one button pressed (`press`) or a card in it opened (`part`). */
let foldFocus = $state(null);

/** Opens a panel at one of its folds, by its `data-fold`; `press` presses the fold's one button instead, and `part` opens a card in the fold. */
function showFold(panel, fold, { press = false, part = null } = {}) {
  foldFocus = { panel, fold, press, part };
  activePanel = panel;
  panelFolded = false;
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

// A group that holds sub-folds gets a fold-all button of its own in its summary row, kept up by an observer as groups come and go.
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

  // In «The page's tabs and a Site menu» the column folds once no panel is open, and the panel open last is kept for the handle.
  $effect(() => {
    if (activePanel && activePanel !== 'settings') lastPanel = activePanel;
    if (foldsEmpty(adminLayout, activePanel) && !panelFolded) panelFolded = true;
  });

  // A fold asked for is unfolded alone, focused and lit once its panel has drawn it, and brought into view once the other folds have closed.
  $effect(() => {
    const want = foldFocus;
    if (!want || activePanel !== want.panel || !panelEl || !panelDrawn) return;
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
      // A panel opened by the menu is drawn in this same frame; the fold's closed style and size are read first, so its opening grows from the fold as it stands closed.
      void getComputedStyle(fold, '::details-content').blockSize;
      void fold.offsetHeight;
      fold.open = true;
      const part = want.part ? fold.querySelector(`[data-part="${CSS.escape(want.part)}"]`) : null;
      part?.querySelector(':scope > [aria-expanded="false"]')?.click();
      const target = part ?? fold;
      const bring = () => target.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'auto' : 'smooth' });
      if (reducedMotion) bring();
      else setTimeout(bring, 260);
      (part?.querySelector(':scope > [aria-expanded]') ?? fold.querySelector(':scope > summary'))?.focus({ preventScroll: true });
      fold.classList.add('fold-lit');
      setTimeout(() => fold.classList.remove('fold-lit'), 1400);
    });
  });

  $effect(() => {
    document.documentElement.dataset.adminTheme = adminTheme;
    localStorage.setItem('urd-admin-theme', adminTheme);
    sendAdminTheme();
  });

  // The drag mark on the root, where the row kit's drag reads it as a drag starts.
  $effect(() => {
    if (dragMark === 'line') document.documentElement.dataset.dragMark = 'line';
    else delete document.documentElement.dataset.dragMark;
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

  // Escape cancels the confirmation, through a listener of its own that keeps the key from the block menu behind it.
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

  /* A cluster that has unfolded again has no menu, so its choice is cleared; the Site menu, the sizes, the page switcher and the steps belong to no cluster. */
  $effect(() => {
    if (toolMenu && !['site', 'phone', 'screen', 'page', 'steps', 'publish'].includes(toolMenu) && !folded[toolMenu]) toolMenu = null;
  });

  /* One open tool menu at a time; a press in a question asked from the menu, or Escape answering it, leaves the menu open. */
  $effect(() => {
    if (!toolMenu) return;
    const onDown = (e) => { if (!toolMenuEl?.contains(e.target) && !e.target?.closest?.('.confirm-dialog, .publish-wrap')) toolMenu = null; };
    const onKey = (e) => { if (e.key === 'Escape' && !confirmBox) toolMenu = null; };
    // Focus moving into the preview is no press outside: a press in the preview closes the menu from there (preview.svelte.js).
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
    // toggle does not bubble, so it is captured at the panel for the head button to follow folds opened by hand.
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
  toPhoneView,
  lookOnPhone,
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
  openedAtStart,
  get activePanel() { return activePanel; },
  get panelDrawn() { return panelDrawn; },
  set activePanel(v) {
    if (WINDOW_TABS.includes(v)) {
      draftsState.openDrafts();
      return;
    }
    activePanel = v;
    if (v) panelFolded = false;
  },
  PANEL_GROUPS,
  PANEL_IDS,
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
  renewIfDue,
  signOut,
  get guidesOn() { return guidesOn; },
  set guidesOn(v) { guidesOn = v; },
  get livePhoneOn() { return livePhoneOn; },
  toggleLivePhone,
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
  get toolbarPref() { return toolbarPref; },
  setToolbar,
  get toolbarLookPref() { return toolbarLookPref; },
  setToolbarLook,
  get toolbarGearPref() { return toolbarGearPref; },
  setToolbarGear,
  get toolbarPhonePref() { return toolbarPhonePref; },
  setToolbarPhone,
  get toolbarPhonePlacePref() { return toolbarPhonePlacePref; },
  setToolbarPhonePlace,
  get toolbarDesignPref() { return toolbarDesignPref; },
  setToolbarDesign,
  get toolbarSizePref() { return toolbarSizePref; },
  setToolbarSize,
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
  get canvasCover() { return canvasCover; },
  setCanvasCover,
  get CANVAS_COVER_OPTIONS() { return CANVAS_COVER_OPTIONS; },
  get dragMark() { return dragMark; },
  setDragMark,
  get DRAG_MARK_OPTIONS() { return DRAG_MARK_OPTIONS; },
  setPageSettingsPref,
  get PAGE_SETTINGS_OPTIONS() { return PAGE_SETTINGS_OPTIONS; },
  setCsvPreview,
  get CSV_PREVIEW_OPTIONS() { return CSV_PREVIEW_OPTIONS; },
  get phonePanelPref() { return phonePanelPref; },
  setPhonePanel,
  get PHONE_PANEL_OPTIONS() { return PHONE_PANEL_OPTIONS; },
  get phoneColumnPref() { return phoneColumnPref; },
  setPhoneColumn,
  get PHONE_COLUMN_OPTIONS() { return PHONE_COLUMN_OPTIONS; },
  get phoneDockOpen() { return phoneDockOpen; },
  setPhoneDockOpen,
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
  get gridLook() { return gridLook; },
  get GRID_LOOK_OPTIONS() { return GRID_LOOK_OPTIONS; },
  setGridLook,
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
