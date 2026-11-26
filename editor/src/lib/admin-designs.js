/**
 * The admin designs as data (ADR-0030): the parts a design is made of, each with its stored key, options and default, and the designs, each a full set of parts.
 */
import { SETTINGS_PLACES } from './settings-model.js';
import { COLLECTION_LAYOUTS, CSV_PREVIEWS } from './collection-layout.js';
import { PAGE_SETTINGS_LAYOUTS } from './page-settings.js';
import { TAB_MENU_STYLES } from './panel-folds.js';
import { PHONE_PANEL_LAYOUTS, PHONE_COLUMN_LOOKS } from './phone-panel.js';
import { MENU_FORMS, FOLDS_MODES, EXTRA_MODES, SHORTCUTS_MODES, DESIGN_CHOICES, TOOLBAR_FORMS, TOOLBAR_LOOKS, TOOLBAR_GEARS, TOOLBAR_PHONES, TOOLBAR_PHONE_PLACES, TOOLBAR_SIZES, TOOLBAR_DESIGNS, CAP_LISTS, CAP_ADD_FORMS } from '../menu/forms.js';

/** How the panels are reached (Urd settings «Panel navigation»), the first the default: the strip under the top bar. */
export const ADMIN_LAYOUTS = ['top-tabs', 'rail', 'sidebar', 'panel-tabs', 'page-tabs'];

/**
 * The parts: `key` where each is stored, `options` its values with the default first, and `setting` the Urd settings row that sets it.
 * @type {Array<{ id: string, key: string, options: string[], setting: string|null, builds?: string, labelKey?: string, optionKey?: string }>}
 */
export const PARTS = [
  // The element menu: its form, its folds, its toolbar, its designs and extras, and what stands first in it.
  { id: 'menu', key: 'urd-admin-menu-width', options: MENU_FORMS, setting: 'menuWidth', optionKey: 'opt.menuForm' },
  { id: 'folds', key: 'urd-folds', options: FOLDS_MODES, setting: 'folds', labelKey: 'adminPart.folds', optionKey: 'opt.folds' },
  { id: 'toolbar', key: 'urd-block-toolbar', options: TOOLBAR_FORMS, setting: 'toolbar', labelKey: 'adminPart.toolbar', optionKey: 'opt.toolbar' },
  { id: 'toolbarLook', key: 'urd-toolbar-look', options: TOOLBAR_LOOKS, setting: 'toolbarLook', labelKey: 'adminPart.toolbarLook', optionKey: 'opt.toolbarLook' },
  { id: 'toolbarGear', key: 'urd-toolbar-gear', options: TOOLBAR_GEARS, setting: 'toolbarGear', labelKey: 'adminPart.toolbarGear' },
  { id: 'toolbarPhone', key: 'urd-toolbar-phone', options: TOOLBAR_PHONES, setting: 'toolbarPhone', labelKey: 'adminPart.toolbarPhone' },
  { id: 'toolbarDesign', key: 'urd-toolbar-design', options: TOOLBAR_DESIGNS, setting: 'toolbarDesign', labelKey: 'adminPart.toolbarDesign', optionKey: 'opt.toolbarDesign' },
  { id: 'toolbarSize', key: 'urd-toolbar-size', options: TOOLBAR_SIZES, setting: 'toolbarSize', labelKey: 'settings.toolbarSize', optionKey: 'opt.toolbarSize' },
  { id: 'toolbarPhonePlace', key: 'urd-toolbar-phone-place', options: TOOLBAR_PHONE_PLACES, setting: 'toolbarPhonePlace', labelKey: 'adminPart.toolbarPhonePlace', optionKey: 'opt.toolbarPhonePlace' },
  { id: 'designs', key: 'urd-design-choice', options: DESIGN_CHOICES, setting: 'designs', labelKey: 'adminPart.designs', optionKey: 'opt.designChoice' },
  { id: 'extra', key: 'urd-extra-settings', options: EXTRA_MODES, setting: 'extra', labelKey: 'adminPart.extra', optionKey: 'opt.extraSettings' },
  { id: 'capAdd', key: 'urd-add-capability', options: CAP_ADD_FORMS, setting: 'capAdd', labelKey: 'adminPart.capAdd', optionKey: 'opt.capAdd' },
  { id: 'capList', key: 'urd-cap-list', options: CAP_LISTS, setting: 'capList', labelKey: 'adminPart.capList', optionKey: 'opt.capList' },
  { id: 'shortcuts', key: 'urd-menu-shortcuts', options: SHORTCUTS_MODES, setting: 'shortcuts', labelKey: 'adminPart.shortcuts', optionKey: 'opt.shortcuts' },
  // The panels' and windows' choices.
  { id: 'layout', key: 'urd-admin-layout', options: ADMIN_LAYOUTS, setting: 'layout' },
  { id: 'sidebarFolds', key: 'urd-sidebar-folds', options: ['tree', 'hover', 'flyout'], setting: 'sidebarFolds' },
  { id: 'panelTabMenus', key: 'urd-panel-tab-menus', options: ['off', 'on'], setting: 'panelTabMenus' },
  { id: 'tabMenus', key: 'urd-tab-menus', options: TAB_MENU_STYLES, setting: 'tabMenus' },
  { id: 'tabMenuStay', key: 'urd-tab-menu-stay', options: ['stay', 'close'], setting: 'tabMenuStay' },
  { id: 'place', key: 'urd-settings-place', options: SETTINGS_PLACES, setting: 'place' },
  { id: 'addBlockMenu', key: 'urd-add-block-menu', options: ['side', 'slim'], setting: 'addBlockMenu' },
  { id: 'layoutPicker', key: 'urd-layout-picker', options: ['strip', 'menu'], setting: 'layoutPicker' },
  { id: 'linkEditor', key: 'urd-link-editor', options: ['dialog', 'popover'], setting: 'linkEditor' },
  { id: 'pageSettings', key: 'urd-page-settings', options: PAGE_SETTINGS_LAYOUTS, setting: 'pageSettings' },
  { id: 'collectionsLayout', key: 'urd-collections-layout', options: COLLECTION_LAYOUTS, setting: 'collectionsLayout' },
  { id: 'csvPreview', key: 'urd-csv-preview', options: CSV_PREVIEWS, setting: 'csvPreview' },
  { id: 'phonePanel', key: 'urd-phone-panel', options: PHONE_PANEL_LAYOUTS, setting: 'phonePanel', labelKey: 'settings.phonePanel', optionKey: 'opt.phonePanel' },
  { id: 'phoneColumn', key: 'urd-phone-column', options: PHONE_COLUMN_LOOKS, setting: 'phoneColumn', labelKey: 'settings.phoneColumn', optionKey: 'opt.phoneColumn' },
];

/** A part's default: its first option. */
export const partDefault = (part) => part.options[0];

/**
 * The designs in the picker's order, the default first.
 * A part a design leaves at null has no effect in it: the design writes its default, and it is not weighed.
 * @type {Array<{ id: string, labelKey: string, parts: Record<string, string|null> }>}
 */
export const ADMIN_DESIGNS = [
  {
    id: 'floating',
    labelKey: 'adminDesign.floating',
    parts: {
      menu: 'wide', folds: 'left', toolbar: 'groups', toolbarLook: 'glass-accent', toolbarGear: 'on', toolbarPhone: 'on', toolbarSize: 'regular', toolbarPhonePlace: 'canvas', toolbarDesign: 'small', designs: 'row', extra: 'menu', capAdd: 'folded', capList: null, shortcuts: 'search',
      layout: 'top-tabs', sidebarFolds: null, panelTabMenus: null, tabMenus: 'groups', tabMenuStay: 'stay', place: 'dialog',
      addBlockMenu: 'side', layoutPicker: 'strip', linkEditor: 'dialog', pageSettings: 'dialog', collectionsLayout: 'drill', csvPreview: 'dialog', phonePanel: 'dock', phoneColumn: 'table',
    },
  },
  {
    id: 'panels',
    labelKey: 'adminDesign.panels',
    parts: {
      menu: 'tabs', folds: 'one', toolbar: 'panels', toolbarLook: 'capsule', toolbarGear: 'off', toolbarPhone: 'on', toolbarSize: 'regular', toolbarPhonePlace: 'canvas', toolbarDesign: 'small', designs: 'inline', extra: 'shown', capAdd: 'head', capList: 'list', shortcuts: 'search',
      layout: 'page-tabs', sidebarFolds: null, panelTabMenus: null, tabMenus: 'lines', tabMenuStay: 'close', place: 'dialog',
      addBlockMenu: 'slim', layoutPicker: 'menu', linkEditor: 'popover', pageSettings: 'dialog', collectionsLayout: 'table', csvPreview: 'dialog', phonePanel: 'dock', phoneColumn: 'table',
    },
  },
  {
    id: 'side',
    labelKey: 'adminDesign.side',
    parts: {
      menu: 'docked-tabs', folds: 'left', toolbar: 'short', toolbarLook: 'strip', toolbarGear: null, toolbarPhone: 'on', toolbarSize: 'regular', toolbarPhonePlace: 'canvas', toolbarDesign: 'small', designs: 'inline', extra: 'menu', capAdd: 'head', capList: 'list', shortcuts: 'pinned',
      layout: 'sidebar', sidebarFolds: 'tree', panelTabMenus: null, tabMenus: null, tabMenuStay: null, place: 'panel',
      addBlockMenu: 'side', layoutPicker: 'strip', linkEditor: 'dialog', pageSettings: 'step', collectionsLayout: 'columns', csvPreview: 'panel', phonePanel: 'dock', phoneColumn: 'table',
    },
  },
  {
    id: 'column',
    labelKey: 'adminDesign.column',
    parts: {
      menu: 'docked', folds: 'all', toolbar: 'full', toolbarLook: 'squares', toolbarGear: null, toolbarPhone: null, toolbarSize: 'regular', toolbarPhonePlace: 'canvas', toolbarDesign: 'full', designs: 'row', extra: 'shown', capAdd: 'head', capList: 'list', shortcuts: 'chips',
      layout: 'rail', sidebarFolds: null, panelTabMenus: null, tabMenus: 'plain', tabMenuStay: 'stay', place: 'sheet',
      addBlockMenu: 'slim', layoutPicker: 'menu', linkEditor: 'popover', pageSettings: 'table', collectionsLayout: 'table', csvPreview: 'table', phonePanel: 'dock', phoneColumn: 'table',
    },
  },
];

/** The words of the design row: its name, and its value where parts differ from the design that stands («Floating menu, changed»). */
export const DESIGN_ROW_KEY = 'adminDesign.row';
export const DESIGN_CHANGED_KEY = 'adminDesign.changed';

/** The default design: the one every part's default makes. */
export const DEFAULT_DESIGN = ADMIN_DESIGNS[0].id;

/**
 * Every part's value, read from what is stored: an absent or unknown value is the default.
 * @param {(key: string) => string|null} get Reads a stored value (localStorage.getItem)
 * @returns {Record<string, string>}
 */
export function readParts(get) {
  const values = {};
  for (const part of PARTS) {
    const raw = get(part.key);
    values[part.id] = part.options.includes(raw) ? raw : partDefault(part);
  }
  return values;
}

/**
 * The design that stands and the parts that differ from it: the design whose weighed parts differ least from the values, the earlier one on a tie.
 * @param {Record<string, string>} values Every part's value (readParts)
 * @param {typeof ADMIN_DESIGNS} [designs] The designs to weigh against
 * @returns {{ design: string, changed: string[] }}
 */
export function designState(values, designs = ADMIN_DESIGNS) {
  let best = null;
  for (const design of designs) {
    const changed = PARTS.filter((part) => design.parts[part.id] != null && values[part.id] !== design.parts[part.id]).map((part) => part.id);
    if (!best || changed.length < best.changed.length) best = { design: design.id, changed };
  }
  return best;
}

/**
 * What choosing a design writes: every part's stored value, null where the part goes back to its default and its key is removed.
 * @param {string} designId
 * @returns {Array<{ key: string, value: string|null }>}
 */
export function designWrites(designId) {
  const design = ADMIN_DESIGNS.find((d) => d.id === designId) ?? ADMIN_DESIGNS[0];
  return PARTS.map((part) => {
    const value = design.parts[part.id] ?? partDefault(part);
    return { key: part.key, value: value === partDefault(part) ? null : value };
  });
}

/**
 * What puts the parts back as they were, the one step that takes a design back: the writes of the values read before it.
 * @param {Record<string, string>} values The values before (readParts)
 * @returns {Array<{ key: string, value: string|null }>}
 */
export function restoreWrites(values) {
  return PARTS.map((part) => {
    const value = part.options.includes(values[part.id]) ? values[part.id] : partDefault(part);
    return { key: part.key, value: value === partDefault(part) ? null : value };
  });
}

/** The rounds of changed defaults, each with its mark and the parts' earlier defaults, read once in a browser. */
const EARLIER_ROUNDS = [
  { mark: 'urd-earlier-defaults-read', defaults: { capAdd: 'head', shortcuts: 'pinned' } },
  { mark: 'urd-earlier-defaults-read-2', defaults: { extra: 'shown' } },
];

/** The key that marks the first round's earlier defaults as read, so they are read once: after it, a key that holds nothing is the new default. */
export const EARLIER_READ_KEY = EARLIER_ROUNDS[0].mark;

/** The marks of every round. */
export const EARLIER_READ_KEYS = EARLIER_ROUNDS.map((round) => round.mark);

/**
 * Keeps a design chosen before a default changed: for each round once, its earlier defaults are written where they make a design other than the default.
 * @param {(key: string) => string|null} get Reads a stored value (localStorage.getItem)
 * @returns {Array<{ key: string, value: string }>}
 */
export function earlierDefaultWrites(get) {
  const writes = [];
  const written = new Map();
  const now = (key) => (written.has(key) ? written.get(key) : get(key));
  EARLIER_ROUNDS.forEach((round, i) => {
    if (now(round.mark) != null) return;
    const mark = { key: round.mark, value: '1' };
    const write = (w) => { writes.push(w); written.set(w.key, w.value); };
    const partsOf = (defaults) => PARTS.filter((part) => part.id in defaults);
    // An earlier default was never stored while it was the default, so one that is stored was written under the new defaults.
    if (partsOf(round.defaults).some((part) => now(part.key) === round.defaults[part.id])) {
      write(mark);
      return;
    }
    const absent = partsOf(round.defaults).filter((part) => now(part.key) == null);
    if (!absent.length) {
      write(mark);
      return;
    }
    // The defaults as they stood before this round: its own and every later round's earlier ones.
    const then = Object.assign({}, ...EARLIER_ROUNDS.slice(i).map((r) => r.defaults));
    const values = readParts(now);
    for (const part of partsOf(then)) if (now(part.key) == null) values[part.id] = then[part.id];
    const earlier = ADMIN_DESIGNS.map((d) => (d.id === DEFAULT_DESIGN ? { ...d, parts: { ...d.parts, ...then } } : d));
    if (designState(values, earlier).design !== DEFAULT_DESIGN) for (const part of absent) write({ key: part.key, value: round.defaults[part.id] });
    write(mark);
  });
  return writes;
}
