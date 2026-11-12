/**
 * What the admin shows when it is loaded again («Open panel» in the Urd settings): the panel last open, and in the tab layouts whether its column was folded; no panel; always the same panel; or, in the tab layouts, the column folded to its handle.
 * Pure, node-tested (tests/panels-start.test.mjs).
 */

/** The choices, the first the default. */
export const PANELS_PREFS = ['remember', 'reset', 'fixed', 'folded'];

/** The layouts that keep the panel's column standing with its tabs, and so can fold it to a handle (App.svelte). */
export const COLUMN_LAYOUTS = ['panel-tabs', 'page-tabs'];

/** The panel «Always the same panel» opens until another is chosen. */
export const PANELS_START_DEFAULT = 'pages';

/** The stored choice, the default for anything else. */
export function panelsPrefOf(raw) {
  return PANELS_PREFS.includes(raw) ? raw : 'remember';
}

/** The choices that make sense in a layout: the folded column only where the column stands, and in «The page's tabs», whose column folds whenever no panel is open, no separate «no panel». */
export function panelsPrefsFor(layout) {
  if (layout === 'page-tabs') return PANELS_PREFS.filter((p) => p !== 'reset');
  return COLUMN_LAYOUTS.includes(layout) ? PANELS_PREFS : PANELS_PREFS.filter((p) => p !== 'folded');
}

/** The choice in effect in a layout: the folded column is no panel where there is no column to fold, and no panel is the folded column in «The page's tabs». */
export function panelsPrefIn(pref, layout) {
  const p = panelsPrefOf(pref);
  if (p === 'folded' && !COLUMN_LAYOUTS.includes(layout)) return 'reset';
  if (p === 'reset' && layout === 'page-tabs') return 'folded';
  return p;
}

/**
 * The panel and the fold the admin starts with.
 * A remembered or chosen id that names no panel any more (the settings panel, which the gear opens, or a panel from an older version) opens none, or the default panel for the chosen one.
 * @param {{pref: string|null, layout: string, panels: string[], stored: string|null, storedFolded: boolean, start: string|null}} o
 * @returns {{panel: string|null, folded: boolean}}
 */
export function startPanels({ pref, layout, panels, stored, storedFolded, start }) {
  const known = (id) => (panels.includes(id) ? id : null);
  switch (panelsPrefIn(pref, layout)) {
    case 'reset':
      return { panel: null, folded: false };
    case 'fixed':
      return { panel: known(start) ?? known(PANELS_START_DEFAULT), folded: false };
    case 'folded':
      return { panel: null, folded: true };
    default:
      return { panel: known(stored), folded: COLUMN_LAYOUTS.includes(layout) && !!storedFolded };
  }
}

/**
 * The page's tabs with the site in a menu («page-tabs»): its column never stands open without a panel, since only the page's tabs would stand in it; it folds to its handle, and the handle opens the panel last open (Pages where none has been).
 * @param {string} layout
 * @param {string|null} panel The open panel
 * @returns {boolean} Whether the column folds
 */
export function foldsEmpty(layout, panel) {
  return layout === 'page-tabs' && !panel;
}

/**
 * The panel the handle opens: the one already open, else in «page-tabs» the one last open, or Pages.
 * @param {string} layout
 * @param {string|null} panel
 * @param {string|null} last
 * @returns {string|null}
 */
export function unfoldedPanel(layout, panel, last) {
  if (panel || layout !== 'page-tabs') return panel;
  return last && last !== 'settings' ? last : PANELS_START_DEFAULT;
}
