/**
 * The admin designs as data (ADR-0030): the parts a design is made of, each with its stored key, its options and its default, and the four designs, each a full set of parts.
 * A part is stored only where it differs from its default, under the key it has always had, so an owner with nothing stored stands in the default design and one with stored choices stands in it with those parts changed, with no migration.
 * Which design stands, and which parts differ from it, is read from the parts (designState) and never stored; choosing a design writes every part at once (designWrites), and the values before it are what takes it back as one step (restoreWrites).
 * A design never touches what is the owner's own taste or the site's: the colour theme, the language, the button press, look choices as pictures or words, spell check, moving rows, the panels on a fresh load, the update notice and the analytics token are no parts.
 * Pure, node-tested (tests/admin-designs.test.mjs); the state that applies a design comes with the settings window that offers it.
 */
import { SETTINGS_PLACES } from './settings-model.js';
import { COLLECTION_LAYOUTS, CSV_PREVIEWS } from './collection-layout.js';
import { PAGE_SETTINGS_LAYOUTS } from './page-settings.js';
import { TAB_MENU_STYLES } from './panel-folds.js';
import { MENU_FORMS, FOLDS_MODES, EXTRA_MODES, SHORTCUTS_MODES, DESIGN_CHOICES, TOOLBAR_FORMS, TOOLBAR_LOOKS, TOOLBAR_GEARS, TOOLBAR_PHONES, TOOLBAR_SIZES, TOOLBAR_DESIGNS, CAP_LISTS } from '../menu/forms.js';

/** How the panels are reached (Urd settings «Panel navigation»), the first the default: the strip under the top bar. */
export const ADMIN_LAYOUTS = ['top-tabs', 'rail', 'sidebar', 'panel-tabs', 'page-tabs'];

/**
 * The parts, in the order the settings window lists them.
 * `key` is where the part is stored, `options` its values with the default first, `setting` the row of the Urd settings that sets it today (lib/settings-model.js, marked `part`), and `labelKey`/`optionKey` the words a new part is drawn with.
 * A part with no row yet (`setting: null`) names the step that builds what it chooses (`builds`).
 * @type {Array<{ id: string, key: string, options: string[], setting: string|null, builds?: string, labelKey?: string, optionKey?: string }>}
 */
export const PARTS = [
  // The element menu: where it opens and how it is laid out, «narrow» being the form one column beside the block; then how its folds behave, whether every setting is shown, and what stands first in it.
  { id: 'menu', key: 'urd-admin-menu-width', options: MENU_FORMS, setting: 'menuWidth', optionKey: 'opt.menuForm' },
  { id: 'folds', key: 'urd-folds', options: FOLDS_MODES, setting: 'folds', labelKey: 'adminPart.folds', optionKey: 'opt.folds' },
  { id: 'toolbar', key: 'urd-block-toolbar', options: TOOLBAR_FORMS, setting: 'toolbar', labelKey: 'adminPart.toolbar', optionKey: 'opt.toolbar' },
  { id: 'toolbarLook', key: 'urd-toolbar-look', options: TOOLBAR_LOOKS, setting: 'toolbarLook', labelKey: 'adminPart.toolbarLook', optionKey: 'opt.toolbarLook' },
  { id: 'toolbarGear', key: 'urd-toolbar-gear', options: TOOLBAR_GEARS, setting: 'toolbarGear', labelKey: 'adminPart.toolbarGear' },
  { id: 'toolbarPhone', key: 'urd-toolbar-phone', options: TOOLBAR_PHONES, setting: 'toolbarPhone', labelKey: 'adminPart.toolbarPhone' },
  { id: 'toolbarDesign', key: 'urd-toolbar-design', options: TOOLBAR_DESIGNS, setting: 'toolbarDesign', labelKey: 'adminPart.toolbarDesign', optionKey: 'opt.toolbarDesign' },
  { id: 'toolbarSize', key: 'urd-toolbar-size', options: TOOLBAR_SIZES, setting: 'toolbarSize', labelKey: 'settings.toolbarSize', optionKey: 'opt.toolbarSize' },
  { id: 'designs', key: 'urd-design-choice', options: DESIGN_CHOICES, setting: 'designs', labelKey: 'adminPart.designs', optionKey: 'opt.designChoice' },
  { id: 'extra', key: 'urd-extra-settings', options: EXTRA_MODES, setting: 'extra', labelKey: 'adminPart.extra', optionKey: 'opt.extraSettings' },
  { id: 'capList', key: 'urd-cap-list', options: CAP_LISTS, setting: 'capList', labelKey: 'adminPart.capList', optionKey: 'opt.capList' },
  { id: 'shortcuts', key: 'urd-menu-shortcuts', options: SHORTCUTS_MODES, setting: 'shortcuts', labelKey: 'adminPart.shortcuts', optionKey: 'opt.shortcuts' },
  // The choices Urd settings has today, each a part under the key it has always had.
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
];

/** A part's default: its first option. */
export const partDefault = (part) => part.options[0];

/**
 * The designs, in the order the design picker shows them, the default first.
 * A part a design leaves at null has no effect in it (what it chooses between is not there, as the tabs' menus in the sidebar whose folds stand as a tree): the design writes its default, and the part is not weighed when the standing design is read.
 * @type {Array<{ id: string, labelKey: string, parts: Record<string, string|null> }>}
 */
export const ADMIN_DESIGNS = [
  {
    id: 'floating',
    labelKey: 'adminDesign.floating',
    parts: {
      menu: 'wide', folds: 'left', toolbar: 'groups', toolbarLook: 'glass-accent', toolbarGear: 'on', toolbarPhone: 'on', toolbarSize: 'regular', toolbarDesign: 'small', designs: 'row', extra: 'shown', capList: 'list', shortcuts: 'pinned',
      layout: 'top-tabs', sidebarFolds: null, panelTabMenus: null, tabMenus: 'groups', tabMenuStay: 'stay', place: 'dialog',
      addBlockMenu: 'side', layoutPicker: 'strip', linkEditor: 'dialog', pageSettings: 'dialog', collectionsLayout: 'drill', csvPreview: 'dialog',
    },
  },
  {
    id: 'panels',
    labelKey: 'adminDesign.panels',
    parts: {
      menu: 'tabs', folds: 'one', toolbar: 'panels', toolbarLook: 'capsule', toolbarGear: 'off', toolbarPhone: 'on', toolbarSize: 'regular', toolbarDesign: 'small', designs: 'inline', extra: 'shown', capList: 'list', shortcuts: 'search',
      layout: 'page-tabs', sidebarFolds: null, panelTabMenus: null, tabMenus: 'lines', tabMenuStay: 'close', place: 'dialog',
      addBlockMenu: 'slim', layoutPicker: 'menu', linkEditor: 'popover', pageSettings: 'dialog', collectionsLayout: 'table', csvPreview: 'dialog',
    },
  },
  {
    id: 'side',
    labelKey: 'adminDesign.side',
    parts: {
      menu: 'docked-tabs', folds: 'left', toolbar: 'short', toolbarLook: 'strip', toolbarGear: null, toolbarPhone: 'on', toolbarSize: 'regular', toolbarDesign: 'small', designs: 'inline', extra: 'menu', capList: 'list', shortcuts: 'pinned',
      layout: 'sidebar', sidebarFolds: 'tree', panelTabMenus: null, tabMenus: null, tabMenuStay: null, place: 'panel',
      addBlockMenu: 'side', layoutPicker: 'strip', linkEditor: 'dialog', pageSettings: 'step', collectionsLayout: 'columns', csvPreview: 'panel',
    },
  },
  {
    id: 'column',
    labelKey: 'adminDesign.column',
    parts: {
      menu: 'docked', folds: 'all', toolbar: 'full', toolbarLook: 'squares', toolbarGear: null, toolbarPhone: null, toolbarSize: 'regular', toolbarDesign: 'full', designs: 'row', extra: 'shown', capList: 'list', shortcuts: 'chips',
      layout: 'rail', sidebarFolds: null, panelTabMenus: null, tabMenus: 'plain', tabMenuStay: 'stay', place: 'sheet',
      addBlockMenu: 'slim', layoutPicker: 'menu', linkEditor: 'popover', pageSettings: 'table', collectionsLayout: 'table', csvPreview: 'table',
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
 * The design that stands and the parts that differ from it: the design whose weighed parts differ least from the values, the earlier design on a tie, so nothing stored reads as the default design with nothing changed.
 * @param {Record<string, string>} values Every part's value (readParts)
 * @returns {{ design: string, changed: string[] }}
 */
export function designState(values) {
  let best = null;
  for (const design of ADMIN_DESIGNS) {
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
