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

const MENU_WIDTHS = {
  wide: dim(1, 1, 62, 38, 0.06) + dim(4, 4, 56, 32, 0.14) + acc(7, 7, 14, 2) + line(7, 12, 14, 2) + line(7, 17, 11, 2) + line(24, 7, 14, 2) + line(24, 12, 12, 2) + line(24, 17, 14, 2) + line(41, 7, 14, 2) + line(41, 12, 13, 2) + line(41, 17, 10, 2),
  narrow: dim(1, 1, 62, 38, 0.06) + dim(20, 4, 24, 32, 0.14) + acc(23, 7, 6, 3) + line(30, 7, 5, 3, 3) + line(36, 7, 5, 3, 3) + line(23, 14, 18, 2) + line(23, 19, 15, 2) + line(23, 24, 18, 2) + line(23, 29, 12, 2),
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

const LOOKS = {
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
