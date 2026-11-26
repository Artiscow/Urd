/**
 * What the admin shows when loaded again («Open panel»): the panel last open, no panel, always the same panel, or the column folded to its handle.
 */

/** The choices, the first the default. */
export const PANELS_PREFS = ['remember', 'reset', 'fixed', 'folded'];

/** The layouts that keep the panel's column standing with its tabs, and so can fold it to a handle. */
export const COLUMN_LAYOUTS = ['panel-tabs', 'page-tabs'];

/** The panel «Always the same panel» opens until another is chosen. */
export const PANELS_START_DEFAULT = 'pages';

/** The stored choice, the default for anything else. */
export function panelsPrefOf(raw) {
  return PANELS_PREFS.includes(raw) ? raw : 'remember';
}

/** The choices a layout offers: the folded column only where the column stands, and no «Start with none» in «The page's tabs and a Site menu». */
export function panelsPrefsFor(layout) {
  if (layout === 'page-tabs') return PANELS_PREFS.filter((p) => p !== 'reset');
  return COLUMN_LAYOUTS.includes(layout) ? PANELS_PREFS : PANELS_PREFS.filter((p) => p !== 'folded');
}

/** The choice in effect in a layout: the folded column is no panel where there is no column, and no panel the folded column in «The page's tabs and a Site menu». */
export function panelsPrefIn(pref, layout) {
  const p = panelsPrefOf(pref);
  if (p === 'folded' && !COLUMN_LAYOUTS.includes(layout)) return 'reset';
  if (p === 'reset' && layout === 'page-tabs') return 'folded';
  return p;
}

/**
 * The panel and the fold the admin starts with.
 * A stored id that names no panel opens none, or the default panel for the chosen one.
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
 * In «The page's tabs and a Site menu» the column never stands open without a panel: it folds to its handle.
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
