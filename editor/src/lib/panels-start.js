/**
 * What the admin shows when it is loaded again («Panels on a fresh load» in the Urd settings): the panel last open, and in the tab layouts whether its column was folded; no panel; always the same panel; or, in the tab layouts, the column folded to its handle.
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

/** The choices that make sense in a layout: the folded column only where the column stands. */
export function panelsPrefsFor(layout) {
  return COLUMN_LAYOUTS.includes(layout) ? PANELS_PREFS : PANELS_PREFS.filter((p) => p !== 'folded');
}

/** The choice in effect in a layout: the folded column is no panel where there is no column to fold. */
export function panelsPrefIn(pref, layout) {
  const p = panelsPrefOf(pref);
  return p === 'folded' && !COLUMN_LAYOUTS.includes(layout) ? 'reset' : p;
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
