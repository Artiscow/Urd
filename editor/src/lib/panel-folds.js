/**
 * The folds a panel's tab lists in its menu (shell/PanelTab.svelte), each by its `data-fold` id and its name's key.
 * A row opens the panel with that fold unfolded.
 */

/** The panels' folds, in the order the panels draw them: `when` draws one in some cases, `press` presses its one button, `group` sets its label in the menu. */
export const PANEL_FOLDS = {
  site: [
    { id: 'identity', key: 'group.siteIdentity', group: 'about' },
    { id: 'region', key: 'group.siteRegion', group: 'about' },
    { id: 'width', key: 'lbl.contentWidth', group: 'look' },
    { id: 'totop', key: 'group.siteToTop', group: 'look' },
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
    { id: 'presets', key: 'group.footerPresets', press: true, look: true, icon: 'designs', group: 'look' },
    { id: 'appearance', key: 'group.appearance', group: 'look' },
    { id: 'brand', key: 'group.brand', group: 'content' },
    { id: 'columns', key: 'group.columns', group: 'content' },
    { id: 'shared', key: 'group.footerShared', group: 'content' },
    { id: 'cta', key: 'group.cta', group: 'content' },
    { id: 'bottom', key: 'group.footerBottom', group: 'bottom' },
  ],
};

/** How the tabs' menus set their rows apart (Urd settings «Panel menus»): in groups under small labels, with a hairline between the rows, or as a plain list. */
export const TAB_MENU_STYLES = ['groups', 'lines', 'plain'];

/** The stored style, the groups for anything else. */
export function tabMenuStyleOf(raw) {
  return TAB_MENU_STYLES.includes(raw) ? raw : 'groups';
}

/**
 * A menu's rows in their groups: each run of folds with the same `group`, under its label's key (`menuGroup.<group>`) or under none.
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
 * The Collections tab's rows (shell/PanelTab.svelte): each collection by its name, with its entries in the Collections panel's order for the submenu beside it.
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
 * @param {{site?: object, legal?: object|null, designs?: string}} ctx The site as drafted, the Legal panel's state, and how a look is chosen (menu.designsPref)
 * @returns {Array<{id: string, key: string, press?: boolean, group?: string}>} Empty for a panel without a menu
 */
export function panelFolds(panel, ctx = {}) {
  return (PANEL_FOLDS[panel] ?? []).filter((fold) => !fold.when || fold.when(ctx))
    .map(({ look, ...fold }) => (look && ctx.designs === 'inline' ? { ...fold, press: false, icon: undefined } : fold));
}
