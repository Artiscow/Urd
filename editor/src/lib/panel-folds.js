/**
 * The folds a panel's tab lists in its menu (shell/PanelTab.svelte): in the strip under the top bar and in the panel's own tabs, a mouse resting on the tab, or the down arrow key on it, opens a menu of the panel's folds, and a row opens the panel with that fold unfolded.
 * Each fold is named by its id, which stands as `data-fold` on its `details.group` in the panel (the row kit's Fold sets it from its `id`), and by the dictionary key of its name; `when` leaves out a fold the panel draws only in some cases.
 * A fold that holds one button and nothing else is `press`: its row in the menu is that button, pressed at once (Footer's Design opens the design picker), with no fold to unfold, and `icon` names the mark the row carries for it (lib/icons.js).
 * `group` puts a long panel's folds in short groups by purpose, each under a small label in the menu (the «Grouped» tab menus, the default); a panel's folds stand in the panel in the same order, so a group's folds are next to each other there too.
 * A panel left out has no menu. Pure, node-tested (tests/panel-folds.test.mjs, which holds the ids to the panels' markup).
 */

/** The panels' folds, in the order the panels draw them. */
export const PANEL_FOLDS = {
  site: [
    { id: 'identity', key: 'group.siteIdentity', group: 'about' },
    { id: 'region', key: 'group.siteRegion', group: 'about' },
    { id: 'width', key: 'lbl.contentWidth', group: 'look' },
    { id: 'calendars', key: 'group.siteCalendars', group: 'content' },
    { id: 'links', key: 'group.siteLinks', group: 'content' },
    { id: 'shop', key: 'group.siteShop', group: 'shop' },
  ],
  legal: [
    { id: 'who', key: 'legal.group.who' },
    { id: 'privacy', key: 'legal.group.privacy' },
    { id: 'terms', key: 'legal.group.terms', when: (ctx) => ctx.legal?.terms.shown === true },
  ],
  theme: [
    { id: 'presets', key: 'lbl.themePresets' },
    { id: 'colours', key: 'lbl.colors' },
    { id: 'typography', key: 'group.typography' },
    { id: 'shape', key: 'group.shape' },
  ],
  nav: [
    { id: 'items', key: 'group.menuItems', group: 'content' },
    { id: 'logo', key: 'group.logo', group: 'content' },
    { id: 'layout', key: 'group.navLayoutSize', group: 'look' },
    { id: 'colours', key: 'group.navColoursFrame', group: 'look' },
    { id: 'mobile', key: 'group.mobile', group: 'behaviour' },
    { id: 'scroll', key: 'group.navScrollPages', group: 'behaviour' },
    { id: 'tools', key: 'group.tools', group: 'extras' },
    { id: 'announcement', key: 'group.announcement', group: 'extras' },
  ],
  footer: [
    { id: 'pages', key: 'group.showOnPages' },
    { id: 'design', key: 'lbl.design', press: true, icon: 'designs', group: 'look' },
    { id: 'startpoint', key: 'group.startpoint', group: 'look' },
    { id: 'appearance', key: 'group.appearance', group: 'look' },
    { id: 'brand', key: 'group.brand', group: 'content' },
    { id: 'columns', key: 'group.columns', group: 'content' },
    { id: 'shared', key: 'group.footerShared', group: 'content' },
    { id: 'cta', key: 'group.cta', group: 'content' },
    { id: 'bottom', key: 'group.footerBottom', group: 'bottom' },
  ],
};

/** How the tabs' menus set their rows apart (Urd settings «Tab menus»): in groups under small labels, with a hairline between the rows, or as a plain list. */
export const TAB_MENU_STYLES = ['groups', 'lines', 'plain'];

/** The stored style, the groups for anything else. */
export function tabMenuStyleOf(raw) {
  return TAB_MENU_STYLES.includes(raw) ? raw : 'groups';
}

/**
 * A menu's rows in their groups: each run of folds with the same `group` is one group, under its label's key (`menuGroup.<group>`), or under none where the folds have no group.
 * @param {Array<{id: string, group?: string}>} folds
 * @returns {Array<{label: string|null, folds: object[]}>}
 */
export function foldGroups(folds) {
  const groups = [];
  for (const fold of folds) {
    const label = fold.group ? `menuGroup.${fold.group}` : null;
    const last = groups.at(-1);
    if (last && last.label === label) last.folds.push(fold);
    else groups.push({ label, folds: [fold] });
  }
  return groups;
}

/**
 * The Collections tab's rows (shell/PanelTab.svelte): each collection by its name, with its entries in the order the Collections panel lists them (a product catalogue as stored, the others newest first), for the submenu beside its row.
 * @param {string[]} ids The collections, in the site's order
 * @param {Record<string, {name?: string, kind?: string, entries?: object[]}>} views The collections as the editor holds them
 * @param {(entries: object[], newestFirst: boolean) => object[]} sort The engine's sortEntries (collections.js)
 * @returns {Array<{id: string, name: string, entries: object[]}>}
 */
export function collectionMenuRows(ids, views, sort) {
  return (ids ?? []).map((id) => {
    const view = views?.[id];
    const entries = view?.entries ?? [];
    return { id, name: view?.name || id, entries: view?.kind === 'products' ? entries : sort(entries, true) };
  });
}

/**
 * The folds a panel's menu lists now: those it draws in the case at hand.
 * @param {string} panel The panel's id
 * @param {{site?: object, legal?: object|null}} ctx The site as drafted, and the Legal panel's state
 * @returns {Array<{id: string, key: string, press?: boolean, group?: string}>} Empty for a panel without a menu
 */
export function panelFolds(panel, ctx = {}) {
  return (PANEL_FOLDS[panel] ?? []).filter((fold) => !fold.when || fold.when(ctx));
}
