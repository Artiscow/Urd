/**
 * The element menu's own state (0.7.26.2), shared by every copy of the menu
 * (the Properties panel, the floating menu and the search's copy of the
 * areas): the width the floating menu opens in, the room it has, the two
 * search queries, the tab of the narrow menu, the groups left open, and the
 * quick row's choices per block type.
 */
import { SvelteSet } from 'svelte/reactivity';
import { readChoices, writeChoices, togglePin, NO_CHOICE } from '../lib/quick-row.js';

/** The admin setting is the width a menu opens in, kept in the browser; the button in the menu's head switches for the session. */
const MENU_WIDTH_KEY = 'urd-admin-menu-width';
/** The floating menu's width with the three areas as columns. */
export const MENU_WIDE_W = 740;

export const menu = $state({
  widthPref: localStorage.getItem(MENU_WIDTH_KEY) === 'narrow' ? 'narrow' : 'wide',
  wide: localStorage.getItem(MENU_WIDTH_KEY) !== 'narrow',
  /** The room for the floating menu: from the right edge of the admin's own panels to the window's edge. */
  min: 8,
  room: Infinity,
  /** The search, one for each place the menu is drawn: the floating menu's head and the Properties panel. */
  menuQuery: '',
  propsQuery: '',
  /** The Content/Style/Placement tab of the narrow menu, remembered across selections. */
  tab: 'content',
});

/** Whether the floating menu stands wide: chosen wide, and with the room for it. */
export function menuIsWide() {
  return menu.wide && menu.room >= MENU_WIDE_W;
}

export function setMenuWidthPref(v) {
  menu.widthPref = v === 'narrow' ? 'narrow' : 'wide';
  menu.wide = menu.widthPref === 'wide';
  if (menu.widthPref === 'narrow') localStorage.setItem(MENU_WIDTH_KEY, 'narrow');
  else localStorage.removeItem(MENU_WIDTH_KEY);
}

/** The menu never lies over the panels: measured from the preview frame's left edge. */
export function measureMenuRoom(left) {
  menu.min = Math.round(left) + 8;
  menu.room = window.innerWidth - menu.min - 8;
}

/** The groups of the element menu that stand open, by id; a group stays as it was left when another block is selected. */
export const menuOpen = new SvelteSet();

/* The quick row (0.7.20.3, lib/quick-row.js): what the owner pinned or took
   out, kept per block type in the browser. */
const quick = $state({ choices: readChoices(localStorage) });

export function quickChoice(type) {
  return quick.choices[type] ?? NO_CHOICE;
}

export function setQuickChoice(type, choice) {
  quick.choices = { ...quick.choices, [type]: choice };
  writeChoices(localStorage, $state.snapshot(quick.choices));
}

/** The pin beside a setting, or on its tile: the setting joins the row or leaves it. */
export function pinToggle(type, id) {
  setQuickChoice(type, togglePin(type, quickChoice(type), id));
}
