/**
 * The element menu's own state (0.7.26.2), shared by every copy of the menu (the Properties panel, the floating menu and the search's copy of the areas): the form the menu opens in and the four choices beside it (ADR-0030's parts), the room it has, the two search queries, the tab in view, and the Pinned choices per block type.
 * Which groups stand open is kept with every other surface's folds (lib/folds.svelte.js).
 */
import { readChoices, writeChoices, togglePin, NO_CHOICE } from '../lib/quick-row.js';
import { MENU_FORMS, FOLDS_MODES, EXTRA_MODES, SHORTCUTS_MODES, DESIGN_CHOICES, CAP_LISTS, CAP_ADD_FORMS } from './forms.js';

/**
 * The form a menu opens in (Urd settings «Element menu»), kept in the browser under `urd-admin-menu-width`, where «narrow» is the form one column beside the block: beside the block in two columns or one, docked in the panel column in one column or with tabs, or beside the block with tabs.
 * The button in the menu's head switches between wide and the chosen form for the session.
 */
const MENU_FORM_KEY = 'urd-admin-menu-width';
const menuFormOf = (v) => (MENU_FORMS.includes(v) ? v : 'wide');

/** How folds behave («Folds»): as the owner left them, one open at a time in an area, or all open. */
const FOLDS_KEY = 'urd-folds';

/** Whether every setting in a fold is shown, or the first and the changed ones with the rest added from a menu («Extra settings»). */
const EXTRA_KEY = 'urd-extra-settings';

/** How a look is chosen («Designs»): a row that opens the design picker, or the designs' pictures in place (lib/rows/LookChoice.svelte). */
const DESIGN_CHOICE_KEY = 'urd-design-choice';

/** What stands first in the menu («Shortcuts»): the Pinned rows, the same rows as tiles, the search field alone, or chips that jump to each area. */
const SHORTCUTS_KEY = 'urd-menu-shortcuts';

/** How the «+» list shows what a block can take («The add list»): a list, or tiles in two columns. */
const CAP_LIST_KEY = 'urd-cap-list';

/** The way to add a capability («Extra settings style»): the «+» in the menu's head, chips at the foot of each area, or an add button at the foot of each area. */
const CAP_ADD_KEY = 'urd-add-capability';

const stored = (key, list) => (list.includes(localStorage.getItem(key)) ? localStorage.getItem(key) : list[0]);

/** The floating menu's width with the areas poured through two columns (app.css, .block-menu.wide), and a small panel's, one group from a tool of the bar (.block-menu.small). */
export const MENU_WIDE_W = 660;
export const MENU_SMALL_W = 320;

export const menu = $state({
  formPref: menuFormOf(localStorage.getItem(MENU_FORM_KEY)),
  wide: menuFormOf(localStorage.getItem(MENU_FORM_KEY)) === 'wide',
  foldsPref: stored(FOLDS_KEY, FOLDS_MODES),
  extraPref: stored(EXTRA_KEY, EXTRA_MODES),
  designsPref: stored(DESIGN_CHOICE_KEY, DESIGN_CHOICES),
  shortcutsPref: stored(SHORTCUTS_KEY, SHORTCUTS_MODES),
  capListPref: stored(CAP_LIST_KEY, CAP_LISTS),
  capAddPref: stored(CAP_ADD_KEY, CAP_ADD_FORMS),
  /** How many times «All open» has been chosen this session, so each choice opens every fold again (lib/rows/Fold.svelte). */
  foldsRound: 0,
  /** The area in view in a menu with tabs, for the session. */
  tab: 'content',
  /** The room for the floating menu: from the right edge of the admin's own panels to the window's edge. */
  min: 8,
  room: Infinity,
  /** The search, one for each place the menu is drawn: the floating menu's head and the Properties panel. */
  menuQuery: '',
  propsQuery: '',
  /** Where the owner dragged the floating menu, kept for the session; null = beside the block (lib/menu-place.js). */
  place: null,
  /** Whether the wide floating menu gives way to one column for the block it is opened at, where it would cover more than a tenth of the block beyond what the column covers (wideFits in lib/menu-place.js); the head button takes it back to wide. */
  cramped: false,
});

/** Whether the floating menu stands wide: chosen wide, with the room for it, and not given way to one column beside its block. */
export function menuIsWide() {
  return menu.wide && menu.room >= MENU_WIDE_W && !menu.cramped;
}

/** A choice kept only where it differs from its default, the list's first. */
function keep(key, value, list) {
  if (value === list[0]) localStorage.removeItem(key);
  else localStorage.setItem(key, value);
}

export function setMenuFormPref(v) {
  menu.formPref = menuFormOf(v);
  menu.wide = menu.formPref === 'wide';
  keep(MENU_FORM_KEY, menu.formPref, MENU_FORMS);
}

export function setFoldsPref(v) {
  menu.foldsPref = FOLDS_MODES.includes(v) ? v : FOLDS_MODES[0];
  if (menu.foldsPref === 'all') menu.foldsRound += 1;
  keep(FOLDS_KEY, menu.foldsPref, FOLDS_MODES);
}

export function setExtraPref(v) {
  menu.extraPref = EXTRA_MODES.includes(v) ? v : EXTRA_MODES[0];
  keep(EXTRA_KEY, menu.extraPref, EXTRA_MODES);
}

export function setDesignsPref(v) {
  menu.designsPref = DESIGN_CHOICES.includes(v) ? v : DESIGN_CHOICES[0];
  keep(DESIGN_CHOICE_KEY, menu.designsPref, DESIGN_CHOICES);
}

export function setCapListPref(v) {
  menu.capListPref = CAP_LISTS.includes(v) ? v : CAP_LISTS[0];
  keep(CAP_LIST_KEY, menu.capListPref, CAP_LISTS);
}

export function setCapAddPref(v) {
  menu.capAddPref = CAP_ADD_FORMS.includes(v) ? v : CAP_ADD_FORMS[0];
  keep(CAP_ADD_KEY, menu.capAddPref, CAP_ADD_FORMS);
}

export function setShortcutsPref(v) {
  menu.shortcutsPref = SHORTCUTS_MODES.includes(v) ? v : SHORTCUTS_MODES[0];
  keep(SHORTCUTS_KEY, menu.shortcutsPref, SHORTCUTS_MODES);
}

/** Whether the menu opens docked in the panel column rather than beside the block. */
export function menuDocked() {
  return menu.formPref === 'docked' || menu.formPref === 'docked-tabs';
}

/** How the areas are laid out now: two columns while the menu stands wide, one area at a time behind tabs in the forms with tabs, else under each other. */
export function menuLayout() {
  if (menuIsWide()) return 'wide';
  return menu.formPref === 'tabs' || menu.formPref === 'docked-tabs' ? 'tabs' : 'narrow';
}

/** The menu never lies over the panels: measured from the preview frame's left edge. */
export function measureMenuRoom(left) {
  menu.min = Math.round(left) + 8;
  menu.room = window.innerWidth - menu.min - 8;
}

/** The three areas, in the order of the keys 1, 2 and 3. */
export const MENU_AREAS = ['content', 'style', 'placement'];

/**
 * The keys of the areas (0.7.20.9): scrolls to where the area starts, in its column when wide and stacked when narrow.
 * Unless the focus is in the search field, it puts the focus on the area's first group head or button (never the help chip, never a field), so the next key is still the menu's.
 * `root` is the menu the key was pressed in (the floating menu, or the Properties panel's body).
 */
export function chooseArea(area, root = null) {
  if (!MENU_AREAS.includes(area)) return;
  menu.tab = area;
  // In a menu with tabs the area is drawn once its tab is chosen, so it is found on the next frame.
  requestAnimationFrame(() => {
    const col = root?.querySelector(`.emenu-cols [data-area="${area}"]`);
    if (!col) return;
    col.scrollIntoView({ block: 'start' });
    if (!document.activeElement?.classList.contains('menu-search')) col.querySelector('summary, button:not(.help-chip, .cap-remove, [data-cap-add])')?.focus();
  });
}

/* Pinned (0.7.20.3, lib/quick-row.js): what the owner pinned or took out, kept per block type in the browser. */
const quick = $state({ choices: readChoices(localStorage) });

export function quickChoice(type) {
  return quick.choices[type] ?? NO_CHOICE;
}

export function setQuickChoice(type, choice) {
  quick.choices = { ...quick.choices, [type]: choice };
  writeChoices(localStorage, $state.snapshot(quick.choices));
}

/** The pin beside a setting: the setting joins Pinned or leaves it. */
export function pinToggle(type, id) {
  setQuickChoice(type, togglePin(type, quickChoice(type), id));
}
