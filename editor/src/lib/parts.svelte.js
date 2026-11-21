/**
 * The parts of the admin loaded as they are first wanted, each split off by the build into a file of its own beside editor.js: the windows and the panels opened now and then (drawn by lib/LazyPart.svelte).
 * Once the canvas has opened, the parts not loaded yet are fetched while the browser is idle, so a part opened later is drawn at once.
 */

/** Each part's code, by the name the admin asks for it by. */
const LOADERS = {
  NavPanel: () => import('../panels/NavPanel.svelte'),
  SitePanel: () => import('../panels/SitePanel.svelte'),
  LegalPanel: () => import('../panels/LegalPanel.svelte'),
  ThemePanel: () => import('../panels/ThemePanel.svelte'),
  FooterPanel: () => import('../panels/FooterPanel.svelte'),
  CollectionsPanel: () => import('../panels/CollectionsPanel.svelte'),
  PluginsPanel: () => import('../panels/PluginsPanel.svelte'),
  HistoryPanel: () => import('../panels/HistoryPanel.svelte'),
  UpdatePanel: () => import('../panels/UpdatePanel.svelte'),
  SettingsPanel: () => import('../panels/SettingsPanel.svelte'),
  LivePhone: () => import('../shell/LivePhone.svelte'),
  ImportTable: () => import('../panels/collections/ImportTable.svelte'),
  ImportDialog: () => import('../panels/collections/ImportDialog.svelte'),
  PageSettingsTable: () => import('../panels/pages/PageSettingsTable.svelte'),
  PageSettingsDialog: () => import('../panels/pages/PageSettingsDialog.svelte'),
  CollectionsTable: () => import('../panels/collections/CollectionsTable.svelte'),
  DesignPicker: () => import('./DesignPicker.svelte'),
  LinkDialog: () => import('./LinkDialog.svelte'),
  SettingsDialog: () => import('../settings/SettingsDialog.svelte'),
  ShortcutSheet: () => import('./ShortcutSheet.svelte'),
  RedirectsDialog: () => import('../shell/RedirectsDialog.svelte'),
  PictureEditor: () => import('./PictureEditor.svelte'),
  SetupWizard: () => import('../shell/SetupWizard.svelte'),
  DraftsWindow: () => import('../shell/DraftsWindow.svelte'),
};

/** The side panels loaded on demand, by the panel's id: the shell holds what reaches into a panel until its code is in (shellState.panelDrawn). */
export const PANEL_PARTS = Object.freeze({
  nav: 'NavPanel',
  site: 'SitePanel',
  legal: 'LegalPanel',
  theme: 'ThemePanel',
  footer: 'FooterPanel',
  collections: 'CollectionsPanel',
  plugins: 'PluginsPanel',
  history: 'HistoryPanel',
  update: 'UpdatePanel',
  settings: 'SettingsPanel',
});

/** The parts whose code is in, by name. */
let loaded = $state.raw({});
/** Each part's load on its way or done; a load that failed is let go, so the part can be asked for again. */
const loading = new Map();

/** A part's code, asked for once; the promise settles once the part can be drawn, or fails where its file cannot be had. */
function load(name) {
  if (!loading.has(name)) {
    loading.set(name, LOADERS[name]().then((module) => {
      loaded = { ...loaded, [name]: module.default };
    }, (err) => {
      loading.delete(name);
      throw err;
    }));
  }
  return loading.get(name);
}

/** Fetches every part not loaded yet, a failed one left to be asked for when it is wanted. */
function loadAll() {
  return Promise.all(Object.keys(LOADERS).map((name) => load(name).catch(() => {})));
}

let preloading = false;

/** Fetches every part not loaded yet once the browser is idle; a browser without idle callbacks fetches them a moment later. */
function preload() {
  if (preloading) return;
  preloading = true;
  if (typeof requestIdleCallback === 'function') requestIdleCallback(() => loadAll(), { timeout: 3000 });
  else setTimeout(loadAll, 500);
}

export const partsState = {
  get loaded() { return loaded; },
  load,
  preload,
  loadAll,
  /** The names a part can be asked for by. */
  names: Object.freeze(Object.keys(LOADERS)),
};
