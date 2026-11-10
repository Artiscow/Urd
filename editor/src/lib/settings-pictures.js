/**
 * The pictures of the Urd settings' look choices (settings-model.js), shown the way the design picker shows a design: each a small drawing of the admin with the choice marked, in the text colour with the accent on what the choice changes.
 * Drawn as SVG strings, the way preset-thumb.js draws the section presets, so the pictures follow the admin theme; the theme swatches alone carry their own colours, the palettes of app.css.
 * Pure, node-tested (tests/settings-model.test.mjs).
 */

const ACCENT = 'var(--urd-color-accent, #7c5cff)';

/** The admin themes' colours, as app.css paints them, for the swatches. */
export const THEME_SWATCHES = {
  purple: { bg: '#0b0e17', surface: '#151a2b', accent: '#7c5cff', text: '#e8eaf0' },
  well: { bg: '#0b1418', surface: '#13232a', accent: '#2ec8b5', text: '#e4eef0' },
  gold: { bg: '#100e0a', surface: '#1c1812', accent: '#d9a441', text: '#ede8dc' },
  grey: { bg: '#0e0f11', surface: '#191b1e', accent: '#5f6a75', text: '#e6e8ea' },
  aurora: { bg: '#232831', surface: '#2e3440', accent: '#5e81ac', text: '#eceff4' },
  dusk: { bg: '#16161e', surface: '#1a1b26', accent: '#3d59a1', text: '#c0caf5' },
  ember: { bg: '#1d2021', surface: '#282828', accent: '#d65d0e', text: '#ebdbb2' },
};

const W = 64;
const H = 40;

/** A picture's frame: the admin's window, with the drawing inside it. */
const frame = (inner) => `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true" fill="none"><rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="3" stroke="currentColor" opacity="0.35"/>${inner}</svg>`;

/** A faint surface. */
const dim = (x, y, w, h, o = 0.14) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="currentColor" opacity="${o}"/>`;
/** An accent mark. */
const acc = (x, y, w, h, r = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${ACCENT}"/>`;
/** A line of text or a tab, faint. */
const line = (x, y, w, h = 2) => dim(x, y, w, h, 0.45);
/** The top bar across the frame. */
const topbar = () => dim(1, 1, W - 2, 6, 0.18);
/** The stage, the dark surface the page stands on. */
const stage = (x, y = 7) => `<rect x="${x}" y="${y}" width="${W - 1 - x}" height="${H - 1 - y}" fill="currentColor" opacity="0.05"/>`;

/** A block on the page, selected: its box with the accent's ring. */
const block = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1" fill="currentColor" opacity="0.3" stroke="${ACCENT}" stroke-width="0.8"/>`;

const LAYOUTS = {
  rail: topbar() + dim(1, 7, 8, H - 8) + acc(3, 10, 4, 4) + line(3, 17, 4, 4) + line(3, 24, 4, 4) + dim(9, 7, 18, H - 8, 0.08) + stage(27),
  sidebar: topbar() + dim(1, 7, 20, H - 8) + acc(4, 11, 10, 2) + line(4, 16, 13, 2) + line(4, 21, 9, 2) + line(4, 26, 12, 2) + dim(21, 7, 14, H - 8, 0.08) + stage(35),
  'panel-tabs': topbar() + dim(1, 7, 26, H - 8, 0.08) + acc(3, 10, 6, 3) + line(11, 10, 6, 3) + line(19, 10, 6, 3) + line(3, 18, 18, 2) + line(3, 23, 14, 2) + stage(27),
  'top-tabs': topbar() + dim(1, 7, W - 2, 6, 0.1) + acc(4, 9, 7, 2) + line(13, 9, 7, 2) + line(22, 9, 7, 2) + line(31, 9, 7, 2) + line(40, 9, 7, 2) + dim(1, 13, 22, H - 14, 0.08) + stage(23, 13),
  'page-tabs': topbar() + acc(44, 2.5, 12, 3) + dim(1, 7, 26, H - 8, 0.08) + acc(3, 10, 7, 3) + line(12, 10, 6, 3) + line(20, 10, 5, 3) + line(3, 18, 18, 2) + line(3, 23, 14, 2) + stage(27),
};

const PLACES = {
  dialog: topbar() + stage(1) + dim(12, 9, 40, 24, 0.22) + dim(12, 9, 13, 24, 0.14) + acc(14, 12, 9, 2) + line(14, 16, 8, 2) + line(14, 20, 9, 2) + line(28, 13, 20, 2) + line(28, 18, 20, 2) + line(28, 23, 20, 2),
  panel: topbar() + dim(1, 7, 22, H - 8, 0.22) + acc(3, 10, 12, 2) + line(3, 15, 16, 2) + line(3, 20, 14, 2) + line(3, 25, 16, 2) + stage(23),
  sheet: topbar() + stage(1) + dim(8, 9, 48, 24, 0.22) + acc(11, 12, 7, 5) + line(20, 12, 7, 5, 5) + line(29, 12, 7, 5, 5) + acc(11, 20, 7, 5) + line(20, 20, 7, 5, 5) + line(40, 13, 13, 2) + line(40, 18, 13, 2) + line(40, 23, 13, 2),
};

const UPDATE_NOTICES = {
  dot: topbar() + dim(1, 7, 8, H - 8) + line(3, 10, 4, 4) + line(3, 17, 4, 4) + line(3, 24, 4, 4) + `<circle cx="7" cy="25" r="1.8" fill="${ACCENT}"/>` + stage(9),
  pill: topbar() + acc(42, 2, 14, 4, 2) + dim(1, 7, 8, H - 8) + line(3, 10, 4, 4) + line(3, 17, 4, 4) + stage(9),
};

const ADD_BLOCKS = {
  side: dim(1, 1, 62, 38, 0.06) + dim(6, 6, 18, 28, 0.14) + acc(8, 9, 10, 2) + line(8, 14, 12, 2) + line(8, 19, 9, 2) + line(8, 24, 12, 2)
    + line(28, 8, 8, 6, 6) + line(39, 8, 8, 6, 6) + line(50, 8, 8, 6, 6) + line(28, 17, 8, 6, 6) + line(39, 17, 8, 6, 6) + line(50, 17, 8, 6, 6) + line(28, 26, 8, 6, 6) + line(39, 26, 8, 6, 6),
  slim: dim(1, 1, 62, 38, 0.06) + dim(18, 4, 28, 32, 0.14) + acc(21, 8, 16, 2) + line(21, 13, 20, 2) + line(21, 18, 14, 2) + line(21, 23, 18, 2) + line(21, 28, 12, 2),
};

const LAYOUT_PICKERS = {
  strip: dim(1, 1, 62, 38, 0.06) + dim(4, 4, 56, 9, 0.16) + acc(7, 6, 6, 5) + line(15, 6, 6, 5, 5) + line(23, 6, 6, 5, 5) + line(31, 6, 6, 5, 5) + line(39, 6, 6, 5, 5) + dim(4, 16, 56, 20, 0.1),
  menu: dim(1, 1, 62, 38, 0.06) + dim(14, 4, 36, 32, 0.16) + acc(17, 8, 9, 6) + line(28, 8, 9, 6, 6) + line(39, 8, 8, 6, 6) + line(17, 17, 9, 6, 6) + line(28, 17, 9, 6, 6) + line(39, 17, 8, 6, 6) + line(17, 26, 9, 6, 6) + line(28, 26, 9, 6, 6),
};

/** The element menu's forms: beside the block in two columns or one, docked in the panel column in one column or with tabs, and beside the block with tabs. */
const MENU_WIDTHS = {
  wide: dim(1, 1, 62, 38, 0.06) + dim(4, 4, 56, 32, 0.14) + acc(7, 7, 22, 2) + line(7, 12, 22, 2) + line(7, 17, 17, 2) + line(7, 22, 22, 2) + line(7, 27, 14, 2) + line(35, 7, 22, 2) + line(35, 12, 18, 2) + line(35, 17, 22, 2) + line(35, 22, 15, 2),
  narrow: dim(1, 1, 62, 38, 0.06) + dim(20, 4, 24, 32, 0.14) + acc(23, 7, 6, 3) + line(30, 7, 5, 3, 3) + line(36, 7, 5, 3, 3) + line(23, 14, 18, 2) + line(23, 19, 15, 2) + line(23, 24, 18, 2) + line(23, 29, 12, 2),
  docked: topbar() + dim(1, 7, 8, H - 8) + dim(9, 7, 22, H - 8, 0.2) + acc(11, 10, 12, 2) + line(11, 15, 17, 2) + line(11, 20, 14, 2) + line(11, 25, 17, 2) + line(11, 30, 12, 2) + stage(31) + block(38, 16, 18, 11),
  'docked-tabs': topbar() + dim(1, 7, 8, H - 8) + dim(9, 7, 22, H - 8, 0.2) + line(11, 9, 17, 3, 1) + acc(11, 15, 5, 2.5) + line(17, 15, 5, 2.5) + line(23, 15, 5, 2.5) + line(11, 21, 17, 2) + line(11, 26, 14, 2) + line(11, 31, 17, 2) + stage(31) + block(38, 16, 18, 11),
  tabs: dim(1, 1, 62, 38, 0.06) + block(6, 14, 12, 10) + dim(22, 4, 36, 32, 0.14) + acc(25, 8, 7, 2.5) + line(33, 8, 7, 2.5) + line(41, 8, 7, 2.5) + line(25, 15, 28, 2) + line(25, 20, 22, 2) + line(25, 25, 28, 2) + line(25, 30, 18, 2),
};

const LINK_EDITORS = {
  dialog: dim(1, 1, 62, 38, 0.06) + dim(14, 8, 36, 24, 0.22) + acc(17, 12, 10, 2) + line(17, 17, 30, 4, 4) + line(17, 24, 14, 3) + line(40, 24, 7, 3),
  popover: dim(1, 1, 62, 38, 0.06) + dim(4, 6, 22, 28, 0.1) + line(7, 10, 16, 3) + acc(7, 16, 16, 4) + line(7, 24, 12, 3) + dim(28, 13, 32, 16, 0.22) + line(31, 16, 26, 4, 4) + line(31, 23, 10, 2),
};

const COLLECTIONS_LAYOUTS = {
  drill: topbar() + dim(1, 7, 8, H - 8) + dim(9, 7, 22, H - 8, 0.2) + line(11, 10, 10, 2) + dim(11, 14, 18, 6, 0.16) + acc(26, 16, 2, 2) + dim(11, 22, 18, 6, 0.16) + line(26, 24, 2, 2) + dim(11, 30, 18, 6, 0.16) + line(26, 32, 2, 2) + stage(31),
  columns: topbar() + dim(1, 7, 8, H - 8) + dim(9, 7, 40, H - 8, 0.2) + dim(9, 7, 15, H - 8, 0.12) + line(11, 10, 11, 3) + acc(11, 15, 11, 3) + line(11, 20, 11, 3) + line(11, 25, 11, 3) + line(27, 10, 18, 2) + line(27, 15, 14, 2) + line(27, 20, 18, 4, 4) + stage(49),
  table: topbar() + dim(1, 7, 8, H - 8) + dim(9, 7, 54, H - 8, 0.2) + line(11, 10, 30, 2) + acc(11, 15, 30, 3) + line(11, 20, 30, 2) + line(11, 25, 30, 2) + line(11, 30, 30, 2) + dim(44, 7, 19, H - 8, 0.12) + line(46, 11, 14, 2) + line(46, 16, 12, 2) + line(46, 21, 14, 4, 4),
};

const CSV_PREVIEWS = {
  dialog: topbar() + dim(1, 7, 8, H - 8) + dim(9, 7, 18, H - 8, 0.08) + stage(27) + dim(15, 10, 36, 25, 0.24) + acc(18, 13, 4, 2) + line(23, 13, 10, 2) + acc(18, 18, 2, 2) + line(22, 18, 22, 2) + line(18, 22, 26, 2) + line(18, 26, 20, 2) + acc(40, 30, 9, 3),
  panel: topbar() + dim(1, 7, 8, H - 8) + dim(9, 7, 22, H - 8, 0.22) + line(11, 10, 12, 2) + acc(11, 15, 2, 2) + line(15, 15, 13, 2) + line(11, 20, 17, 2) + line(11, 25, 15, 2) + acc(20, 33, 9, 3) + stage(31),
  table: topbar() + dim(1, 7, 8, H - 8) + dim(9, 7, 54, H - 8, 0.2) + line(11, 10, 20, 2) + acc(52, 10, 9, 3) + line(11, 15, 50, 1, 1) + line(11, 19, 12, 2) + acc(26, 18, 10, 4) + line(39, 19, 12, 2) + line(11, 24, 12, 2) + line(26, 24, 10, 2) + acc(39, 23, 12, 4) + line(11, 29, 12, 2) + line(26, 29, 10, 2) + line(39, 29, 12, 2),
};

/** A page's settings: a dialog with the pages down its left, a step in the panel with the fields under each other, or a table with a row per page. */
const PAGE_SETTINGS = {
  dialog: topbar() + dim(1, 7, 8, H - 8) + dim(9, 7, 18, H - 8, 0.08) + stage(27) + dim(14, 10, 38, 24, 0.24) + dim(14, 10, 11, 24, 0.14) + line(16, 13, 7, 2) + acc(16, 17, 7, 2) + line(16, 21, 7, 2) + line(28, 13, 14, 2) + line(28, 18, 20, 3, 1) + line(28, 24, 20, 3, 1) + acc(28, 29, 8, 2),
  step: topbar() + dim(1, 7, 8, H - 8) + dim(9, 7, 22, H - 8, 0.22) + acc(11, 10, 3, 2) + line(15, 10, 10, 2) + line(11, 15, 17, 3, 1) + line(11, 20, 17, 3, 1) + acc(11, 25, 2, 2) + line(14, 25, 12, 2) + line(11, 30, 17, 3, 1) + stage(31),
  table: topbar() + dim(1, 7, 8, H - 8) + dim(9, 7, 54, H - 8, 0.2) + line(11, 10, 50, 1, 1) + line(11, 14, 10, 2) + acc(26, 14, 2, 2) + line(32, 14, 12, 2) + line(48, 14, 12, 2) + line(11, 19, 10, 2) + line(26, 19, 2, 2) + line(32, 19, 12, 2) + line(48, 19, 12, 2) + line(11, 24, 10, 2) + line(26, 24, 2, 2) + line(32, 24, 12, 2) + line(48, 24, 12, 2) + line(11, 29, 10, 2) + line(26, 29, 2, 2) + line(32, 29, 12, 2),
};

/** How a button answers a press: a button in the middle of each picture, drawn as it stands mid-press, with the feel's own mark. */
const btn = (x, y, w, h, o = 0.5) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="currentColor" opacity="${o}"/>`;
const PRESS = {
  press: btn(22, 15, 20, 10, 0.18) + btn(24, 16, 16, 8) + `<path d="M17 20h3M44 20h3" stroke="currentColor" stroke-width="1.4" opacity="0.55"/>`,
  nudge: btn(22, 14, 20, 10, 0.18) + btn(22, 16, 20, 10) + `<path d="M32 6v5M30 9l2 2 2-2" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.6"/>`,
  sink: btn(22, 15, 20, 10, 0.35) + `<rect x="22" y="15" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.55"/>`,
  ripple: btn(18, 14, 28, 12, 0.3) + `<circle cx="28" cy="20" r="5" fill="${ACCENT}" opacity="0.55"/><circle cx="28" cy="20" r="2" fill="${ACCENT}"/>`,
  ring: btn(22, 15, 20, 10) + `<rect x="19" y="12" width="26" height="16" rx="5" stroke="${ACCENT}" stroke-width="2"/>`,
  spring: btn(24, 16, 16, 8) + `<path d="M18 14l-3-2M18 26l-3 2M46 14l3-2M46 26l3 2" stroke="currentColor" stroke-width="1.4" opacity="0.55"/>`,
};

/** How a tab's menu sets its rows apart: a tab over a menu of short rows, in groups under small labels, with a hairline between the rows, or as a plain list. */
const tabMenu = (inner) => dim(18, 3, 16, 4, 0.4) + `<rect x="14" y="8" width="36" height="29" rx="2" fill="currentColor" opacity="0.12"/>` + inner;
const row = (y, w) => line(18, y, w);
const TAB_MENUS = {
  groups: tabMenu(dim(18, 11, 7, 1.5, 0.35) + row(14, 20) + row(18, 16) + dim(18, 23, 9, 1.5, 0.35) + row(26, 22) + row(30, 14) + `<rect x="17" y="17" width="30" height="4" rx="1" fill="${ACCENT}" opacity="0.35"/>`),
  lines: tabMenu(row(11, 20) + dim(18, 15, 28, 0.6, 0.3) + row(17, 16) + dim(18, 21, 28, 0.6, 0.3) + row(23, 22) + dim(18, 27, 28, 0.6, 0.3) + row(29, 14) + dim(18, 33, 28, 0.6, 0.3)),
  plain: tabMenu(row(11, 20) + row(16, 16) + row(21, 22) + row(26, 14) + row(31, 18)),
};

/** Where the sidebar shows a panel's folds: under the open panel's word, indented, or in a flyout beside the word. */
const sideWords = () => topbar() + dim(1, 7, 20, H - 8) + line(4, 10, 11, 2) + stage(21);
const SIDEBAR_FOLDS = {
  tree: sideWords() + acc(4, 14, 12, 2) + line(7, 18, 9, 1.5) + line(7, 21, 11, 1.5) + line(7, 24, 8, 1.5) + line(4, 28, 10, 2) + line(4, 32, 12, 2),
  hover: sideWords() + line(4, 14, 12, 2) + acc(4, 18, 10, 2) + line(7, 22, 9, 1.5) + line(7, 25, 11, 1.5) + line(7, 28, 8, 1.5) + line(4, 32, 12, 2) + `<path d="M15 17l0 6 1.6-1.6 1.4 2.6 1-.5-1.4-2.6 2.2-.1z" fill="currentColor" opacity="0.7"/>`,
  flyout: sideWords() + acc(4, 14, 12, 2) + line(4, 18, 10, 2) + line(4, 22, 12, 2) + line(4, 26, 9, 2) + `<rect x="22" y="12" width="20" height="18" rx="2" fill="currentColor" opacity="0.18"/>` + line(25, 15, 12, 1.5) + line(25, 19, 14, 1.5) + line(25, 23, 10, 1.5) + line(25, 27, 13, 1.5),
};

/** Where a dragged row will land: a list of rows with the dragged one faint at the top and its card under the pointer, and a dashed slot, or a line with a ring at its start, between two rows. */
const listRows = (ys) => ys.map((y) => dim(14, y, 36, 4, 0.3)).join('') + dim(14, 6, 36, 4, 0.1);
const dragCard = (y) => `<rect x="24" y="${y}" width="30" height="5.5" rx="1.5" fill="currentColor" opacity="0.6" stroke="${ACCENT}" stroke-width="0.8"/>`;
const DRAG_MARKS = {
  slot: listRows([12, 18, 30]) + `<rect x="14.5" y="24.5" width="35" height="3.5" rx="1" stroke="${ACCENT}" stroke-width="0.8" stroke-dasharray="2 1.4"/>` + dragCard(17.5),
  line: listRows([12, 18, 24, 30]) + acc(16, 22.4, 34, 1.2, 0.6) + `<circle cx="15" cy="23" r="1.3" stroke="${ACCENT}" stroke-width="0.8"/>` + dragCard(14.5),
};

/** The admin designs (lib/admin-designs.js), each the whole admin with a block selected on the page: the menu floating beside it under the strip of panels; the page's tabs with a bar on the block and a small panel beside it; the sidebar of words with a docked panel of tabs; and the rail with one long column of headed sections. */
const ADMIN_DESIGN_PICS = {
  floating: topbar() + dim(1, 7, W - 2, 6, 0.1) + acc(4, 9, 7, 2) + line(13, 9, 7, 2) + line(22, 9, 7, 2) + line(31, 9, 7, 2) + stage(1, 13) + block(10, 20, 16, 10)
    + dim(31, 15, 29, 22, 0.24) + acc(33, 17, 10, 2) + line(33, 22, 10, 2) + line(33, 26, 8, 2) + line(33, 30, 10, 2) + line(46, 22, 10, 2) + line(46, 26, 9, 2) + line(46, 30, 7, 2),
  panels: topbar() + acc(4, 2.5, 8, 3) + line(14, 2.5, 7, 3) + line(23, 2.5, 7, 3) + stage(1) + block(10, 20, 22, 11) + acc(10, 15, 15, 3.5, 1.5)
    + dim(36, 12, 22, 17, 0.24) + line(38, 15, 9, 2) + line(49, 15, 7, 2) + line(38, 20, 16, 2) + line(38, 24, 13, 2),
  side: topbar() + dim(1, 7, 14, H - 8) + acc(3, 10, 9, 2) + line(3, 15, 8, 2) + line(3, 20, 10, 2) + line(3, 25, 7, 2)
    + dim(15, 7, 20, H - 8, 0.2) + acc(17, 9, 5, 2.5) + line(23, 9, 5, 2.5) + line(29, 9, 4, 2.5) + line(17, 15, 15, 2) + line(17, 19, 12, 2) + line(17, 23, 15, 2) + line(17, 27, 10, 2) + stage(35) + block(40, 18, 18, 10),
  column: topbar() + dim(1, 7, 8, H - 8) + acc(3, 10, 4, 4) + line(3, 17, 4, 4) + line(3, 24, 4, 4) + dim(9, 7, 22, H - 8, 0.2)
    + acc(11, 9, 8, 1.5) + line(11, 12, 17, 2) + line(11, 15, 14, 2) + acc(11, 19, 8, 1.5) + line(11, 22, 17, 2) + line(11, 25, 15, 2) + acc(11, 29, 8, 1.5) + line(11, 32, 17, 2) + stage(31) + block(37, 16, 20, 12),
};

/** What stands first in the element menu: the Pinned rows over the groups, the same as tiles, the search field alone, or a chip for each area. */
const menuBox = () => dim(1, 1, 62, 38, 0.06) + dim(14, 3, 36, 34, 0.14);
const groupsBelow = (y) => [0, 5, 10, 15].filter((d) => y + d < 34).map((d) => line(17, y + d, 28, 3, 1)).join('');
const SHORTCUTS = {
  pinned: menuBox() + acc(17, 6, 8, 1.5) + line(17, 10, 28, 2) + line(17, 14, 22, 2) + dim(17, 18.5, 30, 0.6, 0.3) + groupsBelow(22),
  tiles: menuBox() + acc(17, 6, 14, 7, 1.5) + dim(33, 6, 14, 7, 0.35) + dim(17, 15, 14, 7, 0.35) + dim(33, 15, 14, 7, 0.35) + groupsBelow(25),
  search: menuBox() + `<rect x="17" y="6" width="30" height="5" rx="2.5" stroke="${ACCENT}" stroke-width="0.8"/>` + groupsBelow(15),
  chips: menuBox() + acc(17, 6, 8, 3.5, 1.75) + dim(27, 6, 8, 3.5, 0.35) + dim(37, 6, 9, 3.5, 0.35) + line(17, 13, 10, 1.5) + groupsBelow(17),
};

/** The way to add a capability: a «+» in the menu's head, a dashed chip for each at an area's foot, or one dashed add button there, each over the groups of the menu. */
const groupLines = (y, n) => Array.from({ length: n }, (_, i) => line(17, y + i * 5, 28, 3, 1)).join('');
const plusMark = (x, y) => acc(x, y + 1.5, 4, 1, 0.3) + acc(x + 1.5, y, 1, 4, 0.3);
const dashed = (x, y, w, h, r) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" stroke="${ACCENT}" stroke-width="0.6" stroke-dasharray="1.2 0.8"/>`;
const CAP_ADD_PICS = {
  head: menuBox() + line(17, 5.5, 14, 2) + plusMark(43, 4.5) + groupLines(11, 5),
  chips: menuBox() + line(17, 5.5, 14, 2) + groupLines(10, 3) + line(17, 25.5, 10, 1.2) + dashed(17, 28.5, 8.5, 3.6, 1.8) + dashed(27, 28.5, 8.5, 3.6, 1.8) + dashed(37, 28.5, 8.5, 3.6, 1.8),
  button: menuBox() + line(17, 5.5, 14, 2) + groupLines(10, 3) + dashed(17, 27.5, 28, 5, 1) + plusMark(19, 28),
  folded: menuBox() + line(17, 5.5, 14, 2) + groupLines(10, 2) + `<rect x="17" y="20" width="28" height="4" rx="1" stroke="${ACCENT}" stroke-width="0.6"/>` + line(19, 21.2, 9, 1.6) + line(37, 21.2, 6, 1.6) + line(17, 28, 7, 1.2) + line(27, 28, 7, 1.2) + line(37, 28, 7, 1.2),
  icons: menuBox() + line(17, 5.5, 10, 2) + dashed(32, 4.5, 4, 4, 0.8) + dashed(37.5, 4.5, 4, 4, 0.8) + acc(43, 4.5, 4, 4, 0.8) + groupLines(11, 5),
};

/** How a look is chosen: a menu whose design is a row with its small picture and its name, or a heading over the designs' pictures, the chosen one ringed, each over the groups below. */
const lookTile = (x, y, on = false) => `<rect x="${x}" y="${y}" width="8.5" height="6" rx="1" fill="currentColor" opacity="${on ? 0.42 : 0.28}"${on ? ` stroke="${ACCENT}" stroke-width="0.9"` : ''}/>`;
const DESIGN_CHOICE_PICS = {
  row: menuBox() + dim(17, 6, 30, 7, 0.22) + acc(18.5, 7.5, 6, 4, 0.8) + line(27, 8.5, 9, 2) + line(39, 8.5, 6, 2) + groupsBelow(16),
  inline: menuBox() + line(17, 5, 8, 1.5) + lookTile(17, 8, true) + lookTile(27.75, 8) + lookTile(38.5, 8) + lookTile(17, 15.5) + lookTile(27.75, 15.5) + lookTile(38.5, 15.5) + groupsBelow(24),
};

/**
 * The bar over a selected block («Toolbar» and «Toolbar look»), drawn as the canvas draws it: a text block selected on a page, its bar above it, each tool its own small drawing (TOOL_ICONS, the same figures as the canvas's own), the main act a word drawn as a short line on its button.
 * The forms show their own tools: every group a tool (Full bar); every action ending in the red cross (Quick); a word with Motion and Placement (Essentials) and the short bar (Minimal), each with what ⋮ opens beside it.
 * The looks show the same bar of a text block, so only the look changes; the two area looks show an image block's tools, whose groups stand in three areas.
 */
const TOOL_ICONS = {
  grip: '<circle cx="9" cy="6" r="1.9"/><circle cx="15" cy="6" r="1.9"/><circle cx="9" cy="12" r="1.9"/><circle cx="15" cy="12" r="1.9"/><circle cx="9" cy="18" r="1.9"/><circle cx="15" cy="18" r="1.9"/>',
  more: '<circle cx="12" cy="5" r="2.3"/><circle cx="12" cy="12" r="2.3"/><circle cx="12" cy="19" r="2.3"/>',
  type: '<path d="M5 20L12 4l7 16M8 14h8"/>',
  box: '<rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 10h8M8 14h5"/>',
  motion: '<path d="M3 7h8M3 12h12M3 17h8M16 7l5 5-5 5"/>',
  arrange: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 14l9 5 9-5"/>',
  gear: '<circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
  front: '<path d="M5 4h14M12 20V9M7 13l5-5 5 5"/>',
  back: '<path d="M5 20h14M12 4v11M7 11l5 5 5-5"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 18h3"/>',
  dup: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h9"/>',
  del: '<path d="M6 6l12 12M18 6L6 18"/>',
  picture: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M21 16l-5-5-9 9"/>',
  link: '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
  palette: '<circle cx="12" cy="12" r="8.5"/><circle cx="9" cy="9" r="1.2"/><circle cx="14.5" cy="8.5" r="1.2"/><circle cx="8.5" cy="14" r="1.2"/>',
};
const FILLED = new Set(['grip', 'more']);
/** One tool's drawing, `size` wide, centred on (cx, cy), in `ink`. */
const toolIcon = (name, cx, cy, size, ink) => {
  const k = size / 24;
  const paint = FILLED.has(name) ? `fill="${ink}"` : `fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"`;
  return `<g transform="translate(${cx - size / 2} ${cy - size / 2}) scale(${k})" ${paint}>${TOOL_ICONS[name]}</g>`;
};
const sq = (x, y, w, h, fill, o = 1, r = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" opacity="${o}"/>`;
const DARK = '#1b252d';
const INK_DARK = '#0d1a1f';
const INK_LIGHT = '#e2e5e8';
const RED = '#c0392b';
/** The page and the selected text block under every bar. */
const scene = () => dim(1, 1, 62, 38, 0.06) + block(6, 22, 52, 14) + line(9, 25.5, 34, 1.6) + line(9, 29, 28, 1.6) + line(9, 32.5, 20, 1.6);
/** The tools of a text block's bar where every group is a tool: Typography, Text box, Motion and Placement, the gear and ⋮. */
const TEXT_TOOLS = ['type', 'box', 'motion', 'arrange', 'gear', 'more'];
/** An image block's tools by area, for the looks that set the areas apart. */
const IMAGE_AREAS = [['picture', 'link'], ['palette', 'motion'], ['arrange']];

/**
 * A bar of tiles, each tool its own filled button (the accent squares and their kin): the main act a wider tile with a word's line, the rest a square each with its drawing.
 * `groups` splits the tools into clusters set a little apart, each in its own shade; `caps` draws each tool's caption under its drawing; `del` paints the last tool red.
 */
function tileBar({ tools = TEXT_TOOLS, groups = null, lead = true, y = 11, cell = 7, h = 7.6, r = 1, caps = false, del = false, shades = [ACCENT] } = {}) {
  let x = 6;
  let out = '';
  const size = Math.min(cell, h) * 0.68;
  if (lead) {
    out += sq(x, y, 11, h, ACCENT, 1, r) + sq(x + 2.5, y + h / 2 - 0.55, 6, 1.1, INK_DARK, 0.85, 0.5);
    x += 12;
  }
  const clusters = groups ?? [tools];
  clusters.forEach((list, ci) => {
    list.forEach((name, i) => {
      const last = del && ci === clusters.length - 1 && i === list.length - 1;
      out += sq(x, y, cell - 0.5, h, last ? RED : shades[ci % shades.length], 1, r);
      const iconY = caps ? y + h * 0.38 : y + h / 2;
      out += toolIcon(name, x + (cell - 0.5) / 2, iconY, size, last ? '#fff' : INK_DARK);
      if (caps) out += sq(x + 1, y + h - 2.1, cell - 2.5, 0.8, INK_DARK, 0.6, 0.3);
      x += cell;
    });
    x += groups ? 1.4 : 0;
  });
  return out;
}

/**
 * A bar on one body (the strip, the glass and the capsules): the body behind, the main act a filled button with a word's line, the tools as drawings on the body with no boxes of their own.
 * `seps` sets lines between the clusters of `groups`.
 */
function bodyBar({ tools = TEXT_TOOLS, groups = null, y = 10.5, h = 8.6, cell = 6.8, fill = DARK, opacity = 1, r = 2, ink = INK_LIGHT, leadFill = ACCENT, leadInk = INK_DARK, rim = null } = {}) {
  const clusters = groups ?? [tools];
  const count = clusters.reduce((n, list) => n + list.length, 0);
  const width = 13 + count * cell + (clusters.length - 1) * 2 + 2;
  let out = sq(5, y, width, h, fill, opacity, r);
  if (rim) out += `<rect x="5.25" y="${y + 0.25}" width="${width - 0.5}" height="${h - 0.5}" rx="${r}" fill="none" stroke="${rim}" stroke-width="0.4" opacity="0.3"/>`;
  const pad = 1.3;
  out += sq(6.4, y + pad, 11, h - pad * 2, leadFill, 1, Math.min(r, (h - pad * 2) / 2)) + sq(8.9, y + h / 2 - 0.55, 6, 1.1, leadInk, 0.85, 0.5);
  let x = 19;
  const size = Math.min(cell, h) * 0.66;
  clusters.forEach((list, ci) => {
    if (ci) {
      out += sq(x - 0.2, y + 1.6, 0.5, h - 3.2, ink, 0.35, 0);
      x += 2;
    }
    for (const name of list) {
      out += toolIcon(name, x + cell / 2, y + h / 2, size, ink);
      x += cell;
    }
  });
  return out;
}

/** What a press on ⋮ opens, drawn just right of it level with the bar: a small dark card with its title and two rows. */
const openBox = (x) => sq(x, 11, 19, 15, DARK, 0.94, 1.5) + line(x + 2, 13.5, 9, 1.5) + sq(x + 2, 17, 15, 3, '#fff', 0.14, 0.8) + sq(x + 2, 21.5, 15, 3, '#fff', 0.14, 0.8);

const TOOLBARS = {
  groups: scene() + tileBar(),
  full: scene() + tileBar({ lead: false, tools: ['grip', 'front', 'back', 'phone', 'dup', 'gear', 'del'], del: true }),
  // A word for the main act with Motion and Placement, and a short bar: each with what ⋮ opens standing just right of it
  panels: scene() + tileBar({ tools: ['motion', 'arrange', 'more'] }) + openBox(40),
  short: scene() + tileBar({ lead: false, tools: ['grip', 'gear', 'more'] }) + openBox(28),
};

const TOOLBAR_LOOK_PICS = {
  'glass-accent': scene() + bodyBar({ fill: DARK, opacity: 0.5, ink: '#fff', rim: '#fff' }),
  squares: scene() + tileBar(),
  strip: scene() + bodyBar(),
  areas: scene() + tileBar({ groups: IMAGE_AREAS, shades: ['#7fd9cd', ACCENT, '#1f9e8f'], lead: false }),
  captions: scene() + tileBar({ y: 9, h: 10, cell: 7.2, caps: true }),
  glass: scene() + bodyBar({ fill: DARK, opacity: 0.5, ink: '#fff', rim: '#fff', leadFill: '#fff', leadInk: INK_DARK }),
  large: scene() + tileBar({ tools: ['type', 'box', 'motion', 'arrange'], y: 8, h: 10, cell: 9, r: 2.5 }),
  capsule: scene() + bodyBar({ r: 4 }),
  white: scene() + bodyBar({ fill: '#fff', ink: '#23272c', r: 4 }),
  'glass-capsule': scene() + bodyBar({ fill: DARK, opacity: 0.5, ink: '#fff', rim: '#fff', r: 4, leadFill: '#fff', leadInk: INK_DARK }),
  'capsule-areas': scene() + bodyBar({ groups: IMAGE_AREAS, r: 4 }),
  'large-capsule': scene() + bodyBar({ tools: ['type', 'box', 'motion', 'arrange', 'more'], y: 8, h: 11, cell: 7.6, r: 5.5 }),
  soft: scene() + bodyBar({ r: 2.2 }),
};

const LOOKS = {
  adminDesign: ADMIN_DESIGN_PICS,
  toolbar: TOOLBARS,
  toolbarLook: TOOLBAR_LOOK_PICS,
  shortcuts: SHORTCUTS,
  capAdd: CAP_ADD_PICS,
  designs: DESIGN_CHOICE_PICS,
  layout: LAYOUTS,
  place: PLACES,
  updateNotice: UPDATE_NOTICES,
  addBlock: ADD_BLOCKS,
  layoutPicker: LAYOUT_PICKERS,
  menuWidth: MENU_WIDTHS,
  linkEditor: LINK_EDITORS,
  collectionsLayout: COLLECTIONS_LAYOUTS,
  csvPreview: CSV_PREVIEWS,
  pageSettings: PAGE_SETTINGS,
  press: PRESS,
  tabMenus: TAB_MENUS,
  sidebarFolds: SIDEBAR_FOLDS,
  dragMark: DRAG_MARKS,
};

/** A theme's swatch: its background with its surface, a line in its accent and a line in its text colour. */
export function themeSwatch(id) {
  const t = THEME_SWATCHES[id];
  if (!t) return null;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true" fill="none"><rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="3" fill="${t.bg}" stroke="currentColor" opacity="0.9"/><rect x="1" y="1" width="20" height="${H - 2}" rx="2" fill="${t.surface}"/><rect x="4" y="6" width="12" height="3" rx="1" fill="${t.accent}"/><rect x="4" y="13" width="14" height="2" fill="${t.text}" opacity="0.6"/><rect x="4" y="18" width="10" height="2" fill="${t.text}" opacity="0.6"/><rect x="26" y="8" width="30" height="4" rx="1" fill="${t.text}" opacity="0.8"/><rect x="26" y="16" width="24" height="2" fill="${t.text}" opacity="0.45"/><rect x="26" y="21" width="28" height="2" fill="${t.text}" opacity="0.45"/><rect x="26" y="28" width="12" height="5" rx="2.5" fill="${t.accent}"/></svg>`;
}

/** The picture of one option of a look, or null for an option no picture is drawn for. */
export function settingPicture(look, id) {
  if (look === 'theme') return themeSwatch(id);
  const inner = LOOKS[look]?.[id];
  return inner ? frame(inner) : null;
}

/** The ids every look has a picture for, for the test that holds the pictures complete against the options. */
export function picturedIds(look) {
  if (look === 'theme') return Object.keys(THEME_SWATCHES);
  return Object.keys(LOOKS[look] ?? {});
}
