/**
 * Urd's own settings as data (the Urd settings, the gear): the groups, the sections in each group, and in each section the settings with their keys, their kind and the editor fields they read and write.
 * The three windows the settings open in (settings/SettingsDialog.svelte for the dialog and the sheet, panels/SettingsPanel.svelte for the panel) draw the same rows from this list, so a setting is declared once.
 * A setting's `options`, `get` and `set` take the context the window passes: `{ ed, ta, menu, setMenuFormPref, setFoldsPref, setExtraPref, setShortcutsPref, designs }`, where `designs` holds the admin designs' options, the design that stands and the way to apply one (state/admin-design.svelte.js).
 * Pure, node-tested (tests/settings-model.test.mjs).
 */
import { panelsPrefIn } from './panels-start.js';
import { MENU_FORMS, FOLDS_MODES, EXTRA_MODES, SHORTCUTS_MODES, DESIGN_CHOICES, TOOLBAR_FORMS, TOOLBAR_LOOKS, AREA_LOOKS, TOOL_FORMS, TOOLBAR_SIZES, TOOLBAR_DESIGNS } from '../menu/forms.js';

/** Where the settings open: a dialog with the groups as sections down its left, a panel in the panel column, or a sheet with the look choices at the left and the rest as rows at the right. */
export const SETTINGS_PLACES = ['dialog', 'panel', 'sheet'];

/** The stored place, the dialog for anything else. */
export function settingsPlace(raw) {
  return SETTINGS_PLACES.includes(raw) ? raw : 'dialog';
}

/** How a look choice is shown: as a picture of each choice, or as words in a dropdown. */
export function settingsPictures(raw) {
  return raw === 'words' ? 'words' : 'pictures';
}

/**
 * The window's three groups, in the order the list shows them: the admin design with its parts (ADR-0030), the settings kept in this browser that no design sets, and the site's own, shared by everyone who edits it.
 */
export const SETTINGS_BANDS = [
  { id: 'design', labelKey: 'adminDesign.row', tipKey: 'tip.settings.band.design' },
  { id: 'local', labelKey: 'settings.band.local', tipKey: 'tip.settings.band.local' },
  { id: 'site', labelKey: 'settings.group.site', tipKey: 'tip.settings.shared', shared: true },
];

/**
 * The sections, each in its group (`band`), and in each section the settings.
 * `kind`: `choice` (one of the options; a picture per option when `look` names a picture set and the pictures are on), `seg` (a few words side by side) and `text` (a text field).
 * `design` on a setting: it is the admin design, read and chosen through the context's `designs`, with the parts that differ and the ways back beside it.
 * `tipKey` on a section: what its settings act on, shown on its heading.
 * `shared` on a section: its values live in the site and are shared by everyone who edits it.
 * `when` on a section or a setting: whether it is shown at all.
 * `parent` on a setting: the setting it belongs to, drawn directly under it and shown with it.
 * `part` on a setting: it is a part of the admin designs (lib/admin-designs.js), which a design sets with every other part.
 */
/** Whether the layout opens menus of folds, so their look and «After a pick» have something to set. */
const menusShown = (c) => {
  if (c.ed.adminLayout === 'panel-tabs') return c.ed.panelTabMenus === true;
  if (c.ed.adminLayout === 'sidebar') return c.ed.sidebarFolds === 'flyout';
  return true;
};

export const SETTINGS_GROUPS = [
  {
    id: 'design',
    band: 'design',
    labelKey: 'adminDesign.row',
    tipKey: 'tip.settings.band.design',
    settings: [
      { id: 'adminDesign', design: true, labelKey: 'adminDesign.row', tipKey: 'tip.adminDesign.row', kind: 'choice', look: 'adminDesign',
        options: (c) => c.designs.options, get: (c) => c.designs.state.design, set: (c, v) => c.designs.apply(v) },
    ],
  },
  {
    id: 'menu',
    band: 'design',
    labelKey: 'settings.group.menu',
    tipKey: 'tip.settings.group.menu',
    settings: [
      { id: 'menuWidth', part: true, labelKey: 'settings.menuWidth', tipKey: 'tip.settings.menuWidth', kind: 'choice', look: 'menuWidth',
        options: (c) => MENU_FORMS.map((id) => [id, c.ta(`opt.menuForm.${id}`)]),
        get: (c) => c.menu.formPref, set: (c, v) => c.setMenuFormPref(v) },
      { id: 'folds', part: true, labelKey: 'adminPart.folds', tipKey: 'tip.adminPart.folds', kind: 'seg',
        options: (c) => FOLDS_MODES.map((id) => [id, c.ta(`opt.folds.${id}`)]),
        get: (c) => c.menu.foldsPref, set: (c, v) => c.setFoldsPref(v) },
      { id: 'designs', part: true, labelKey: 'adminPart.designs', tipKey: 'tip.adminPart.designs', kind: 'choice', look: 'designs',
        options: (c) => DESIGN_CHOICES.map((id) => [id, c.ta(`opt.designChoice.${id}`)]),
        get: (c) => c.menu.designsPref, set: (c, v) => c.setDesignsPref(v) },
      // What the design button on a block's bar opens, on every form of the bar: the small window by default or the full one, set under how a look is chosen; the full window stands first, as the row above names it.
      { id: 'toolbarDesign', part: true, parent: 'designs', labelKey: 'adminPart.toolbarDesign', tipKey: 'tip.adminPart.toolbarDesign', kind: 'seg',
        options: (c) => ['full', 'small'].filter((id) => TOOLBAR_DESIGNS.includes(id)).map((id) => [id, c.ta(`opt.toolbarDesign.${id}`)]), get: (c) => c.ed.toolbarDesignPref, set: (c, v) => c.ed.setToolbarDesign(v) },
      { id: 'extra', part: true, labelKey: 'adminPart.extra', tipKey: 'tip.adminPart.extra', kind: 'seg',
        options: (c) => EXTRA_MODES.map((id) => [id, c.ta(`opt.extraSettings.${id}`)]),
        get: (c) => c.menu.extraPref, set: (c, v) => c.setExtraPref(v) },
      // The chips jump between areas that stand under each other, so a form with tabs offers them only while they are chosen.
      { id: 'shortcuts', part: true, labelKey: 'adminPart.shortcuts', tipKey: 'tip.adminPart.shortcuts', kind: 'choice', look: 'shortcuts',
        options: (c) => SHORTCUTS_MODES.filter((id) => id !== 'chips' || !['tabs', 'docked-tabs'].includes(c.menu.formPref) || c.menu.shortcutsPref === 'chips')
          .map((id) => [id, c.ta(`opt.shortcuts.${id}`)]),
        get: (c) => c.menu.shortcutsPref, set: (c, v) => c.setShortcutsPref(v) },
    ],
  },
  {
    id: 'panels',
    band: 'design',
    labelKey: 'settings.group.panels',
    tipKey: 'tip.settings.group.panels',
    settings: [
      { id: 'layout', part: true, labelKey: 'settings.layout', tipKey: 'tip.settings.layout', kind: 'choice', look: 'layout',
        options: (c) => c.ed.ADMIN_LAYOUT_OPTIONS, get: (c) => c.ed.adminLayout, set: (c, v) => c.ed.setAdminLayout(v) },
      // The sidebar of words shows a panel's folds under the open panel's word, or beside each word.
      { id: 'sidebarFolds', part: true, parent: 'layout', labelKey: 'settings.sidebarFolds', tipKey: 'tip.settings.sidebarFolds', kind: 'choice', look: 'sidebarFolds',
        when: (c) => c.ed.adminLayout === 'sidebar',
        options: (c) => c.ed.SIDEBAR_FOLDS_OPTIONS, get: (c) => c.ed.sidebarFolds, set: (c, v) => c.ed.setSidebarFolds(v) },
      // The panel's own tabs open no menus unless they are switched on.
      { id: 'panelTabMenus', part: true, parent: 'layout', labelKey: 'settings.panelTabMenus', tipKey: 'tip.settings.panelTabMenus', kind: 'seg',
        when: (c) => c.ed.adminLayout === 'panel-tabs',
        options: (c) => [['on', c.ta('common.on')], ['off', c.ta('common.off')]],
        get: (c) => (c.ed.panelTabMenus ? 'on' : 'off'), set: (c, v) => c.ed.setPanelTabMenus(v) },
      // The menus of folds stand under the strip's tabs, beside the Site menu's rows and the rail's icons, beside the sidebar's words where they open there, and under the panel's own tabs where those are switched on.
      { id: 'tabMenus', part: true, labelKey: 'settings.tabMenus', tipKey: 'tip.settings.tabMenus', kind: 'choice', look: 'tabMenus',
        when: menusShown,
        options: (c) => c.ed.TAB_MENU_OPTIONS, get: (c) => c.ed.tabMenus, set: (c, v) => c.ed.setTabMenus(v) },
      { id: 'tabMenuStay', part: true, parent: 'tabMenus', labelKey: 'settings.tabMenuStay', tipKey: 'tip.settings.tabMenuStay', kind: 'seg',
        when: menusShown,
        options: (c) => [['close', c.ta('opt.tabMenuStay.close')], ['stay', c.ta('opt.tabMenuStay.stay')]],
        get: (c) => c.ed.tabMenuStay, set: (c, v) => c.ed.setTabMenuStay(v) },
      { id: 'linkEditor', part: true, labelKey: 'settings.linkEditor', tipKey: 'tip.settings.linkEditor', kind: 'choice', look: 'linkEditor',
        options: (c) => [['dialog', c.ta('opt.linkEditor.dialog')], ['popover', c.ta('opt.linkEditor.popover')]],
        get: (c) => c.ed.linkEditorPref, set: (c, v) => c.ed.setLinkEditor(v) },
      { id: 'pageSettings', part: true, labelKey: 'settings.pageSettings', tipKey: 'tip.settings.pageSettings', kind: 'choice', look: 'pageSettings',
        options: (c) => c.ed.PAGE_SETTINGS_OPTIONS, get: (c) => c.ed.pageSettingsPref, set: (c, v) => c.ed.setPageSettingsPref(v) },
      { id: 'collectionsLayout', part: true, labelKey: 'settings.collectionsLayout', tipKey: 'tip.settings.collectionsLayout', kind: 'choice', look: 'collectionsLayout',
        options: (c) => c.ed.COLLECTIONS_LAYOUT_OPTIONS, get: (c) => c.ed.collectionsLayout, set: (c, v) => c.ed.setCollectionsLayout(v) },
      { id: 'csvPreview', part: true, labelKey: 'settings.csvPreview', tipKey: 'tip.settings.csvPreview', kind: 'choice', look: 'csvPreview',
        options: (c) => c.ed.CSV_PREVIEW_OPTIONS, get: (c) => c.ed.csvPreviewPref, set: (c, v) => c.ed.setCsvPreview(v) },
      { id: 'place', part: true, labelKey: 'settings.place', tipKey: 'tip.settings.place', kind: 'choice', look: 'place',
        options: (c) => c.ed.SETTINGS_PLACE_OPTIONS, get: (c) => c.ed.settingsPlace, set: (c, v) => c.ed.setSettingsPlace(v) },
    ],
  },
  {
    id: 'canvas',
    band: 'design',
    labelKey: 'settings.group.canvas',
    tipKey: 'tip.settings.group.canvas',
    settings: [
      { id: 'toolbar', part: true, labelKey: 'adminPart.toolbar', tipKey: 'tip.adminPart.toolbar', kind: 'choice', look: 'toolbar',
        options: (c) => TOOLBAR_FORMS.map((id) => [id, c.ta(`opt.toolbar.${id}`)]), get: (c) => c.ed.toolbarPref, set: (c, v) => c.ed.setToolbar(v) },
      // The looks that set the tools apart by area are offered with the forms whose tools belong to areas, or while chosen.
      { id: 'toolbarLook', part: true, parent: 'toolbar', labelKey: 'adminPart.toolbarLook', tipKey: 'tip.adminPart.toolbarLook', kind: 'choice', look: 'toolbarLook',
        options: (c) => TOOLBAR_LOOKS.filter((id) => !AREA_LOOKS.includes(id) || TOOL_FORMS.includes(c.ed.toolbarPref) || c.ed.toolbarLookPref === id)
          .map((id) => [id, c.ta(`opt.toolbarLook.${id}`)]),
        get: (c) => c.ed.toolbarLookPref, set: (c, v) => c.ed.setToolbarLook(v) },
      // The gear on a bar whose tools open the settings themselves; the other forms always have it.
      { id: 'toolbarGear', part: true, parent: 'toolbar', labelKey: 'adminPart.toolbarGear', tipKey: 'tip.adminPart.toolbarGear', kind: 'seg',
        when: (c) => TOOL_FORMS.includes(c.ed.toolbarPref),
        options: (c) => [['on', c.ta('opt.showHide.show')], ['off', c.ta('opt.showHide.hide')]], get: (c) => c.ed.toolbarGearPref, set: (c, v) => c.ed.setToolbarGear(v) },
      // The phone button on every bar but the full bar of actions, which always has it.
      { id: 'toolbarPhone', part: true, parent: 'toolbar', labelKey: 'adminPart.toolbarPhone', tipKey: 'tip.adminPart.toolbarPhone', kind: 'seg',
        when: (c) => c.ed.toolbarPref !== 'full',
        options: (c) => [['on', c.ta('opt.showHide.show')], ['off', c.ta('opt.showHide.hide')]], get: (c) => c.ed.toolbarPhonePref, set: (c, v) => c.ed.setToolbarPhone(v) },
      { id: 'toolbarSize', part: true, parent: 'toolbar', labelKey: 'settings.toolbarSize', tipKey: 'tip.settings.toolbarSize', kind: 'seg',
        options: (c) => ['small', 'regular', 'medium', 'large'].filter((id) => TOOLBAR_SIZES.includes(id)).map((id) => [id, c.ta(`opt.toolbarSize.${id}`)]), get: (c) => c.ed.toolbarSizePref, set: (c, v) => c.ed.setToolbarSize(v) },
      { id: 'addBlockMenu', part: true, labelKey: 'settings.addBlockMenu', tipKey: 'tip.settings.addBlockMenu', kind: 'choice', look: 'addBlock',
        options: (c) => [['side', c.ta('settings.addBlockMenuSide')], ['slim', c.ta('settings.addBlockMenuSlim')]],
        get: (c) => c.ed.addBlockMenuPref, set: (c, v) => c.ed.setAddBlockMenu(v) },
      { id: 'layoutPicker', part: true, labelKey: 'settings.layoutPicker', tipKey: 'tip.settings.layoutPicker', kind: 'choice', look: 'layoutPicker',
        options: (c) => [['strip', c.ta('settings.layoutPickerStrip')], ['menu', c.ta('settings.layoutPickerMenu')]],
        get: (c) => c.ed.layoutPickerPref, set: (c, v) => c.ed.setLayoutPicker(v) },
    ],
  },
  {
    id: 'look',
    band: 'local',
    labelKey: 'settings.group.look',
    settings: [
      { id: 'theme', labelKey: 'settings.theme', tipKey: 'topbar.adminTheme.title', kind: 'choice', look: 'theme',
        options: (c) => c.ed.ADMIN_THEMES, get: (c) => c.ed.adminTheme, set: (c, v) => { c.ed.adminTheme = v; } },
      { id: 'language', labelKey: 'settings.language', tipKey: 'topbar.language.title', kind: 'choice',
        options: (c) => [['auto', c.ta('lang.auto')], ...c.ed.adminLangOptions()], get: (c) => c.ed.adminLangChoice, set: (c, v) => c.ed.setAdminLang(v) },
      { id: 'press', labelKey: 'settings.press', tipKey: 'tip.settings.press', kind: 'choice', look: 'press',
        options: (c) => c.ed.PRESS_OPTIONS, get: (c) => c.ed.pressFeel, set: (c, v) => c.ed.setPressFeel(v) },
      { id: 'pictures', labelKey: 'settings.pictures', tipKey: 'tip.settings.pictures', kind: 'seg',
        options: (c) => c.ed.SETTINGS_PICTURES_OPTIONS, get: (c) => c.ed.settingsPictures, set: (c, v) => c.ed.setSettingsPictures(v) },
    ],
  },
  {
    id: 'editing',
    band: 'local',
    labelKey: 'settings.group.editing',
    settings: [
      { id: 'spellcheck', labelKey: 'settings.spellcheck', tipKey: 'tip.settings.spellcheck', kind: 'seg',
        options: (c) => [['on', c.ta('common.on')], ['off', c.ta('common.off')]],
        get: (c) => c.ed.spellcheckPref, set: (c, v) => c.ed.setSpellcheck(v) },
      { id: 'dragMark', labelKey: 'settings.dragMark', tipKey: 'tip.settings.dragMark', kind: 'choice', look: 'dragMark',
        options: (c) => c.ed.DRAG_MARK_OPTIONS, get: (c) => c.ed.dragMark, set: (c, v) => c.ed.setDragMark(v) },
    ],
  },
  {
    id: 'window',
    band: 'local',
    labelKey: 'settings.group.window',
    settings: [
      { id: 'panels', labelKey: 'settings.panels', tipKey: 'tip.settings.panels', kind: 'choice',
        options: (c) => c.ed.PANELS_PREF_OPTIONS, get: (c) => panelsPrefIn(c.ed.panelsPref, c.ed.adminLayout), set: (c, v) => c.ed.setPanelsPref(v) },
      { id: 'panelsStart', parent: 'panels', labelKey: 'settings.panelsStart', tipKey: 'tip.settings.panelsStart', kind: 'choice',
        when: (c) => c.ed.panelsPref === 'fixed',
        options: (c) => c.ed.PANELS_START_OPTIONS, get: (c) => c.ed.panelsStart, set: (c, v) => c.ed.setPanelsStart(v) },
    ],
  },
  {
    id: 'site',
    band: 'site',
    labelKey: 'settings.group.site',
    tipKey: 'tip.settings.shared',
    shared: true,
    when: (c) => !!c.ed.siteDraft,
    settings: [
      { id: 'updateNotice', labelKey: 'settings.updateNotice', tipKey: 'tip.settings.updateNotice', kind: 'choice', look: 'updateNotice',
        options: (c) => c.ed.UPDATE_NOTICE_OPTIONS, get: (c) => c.ed.siteDraft?.admin?.updateNotice ?? 'dot', set: (c, v) => c.ed.setUpdateNotice(v) },
      { id: 'analytics', labelKey: 'lbl.analyticsToken', tipKey: 'tip.analytics', kind: 'text', placeholderKey: 'ph.analyticsToken',
        get: (c) => c.ed.siteDraft?.analytics?.token ?? '', set: (c, v) => c.ed.setAnalyticsToken(v) },
    ],
  },
];

/** Whether a setting has a picture per option: a `look` and the pictures on. */
export function pictured(setting, pictures) {
  return setting.kind === 'choice' && !!setting.look && pictures === 'pictures';
}

/** Whether a setting answers to a search: the query in its name or in one of its options, through `c.match(text, query)` where the context has it (the search in every language), else as typed. */
export function settingMatches(setting, query, c) {
  const q = (query ?? '').trim().toLowerCase();
  if (!q) return true;
  const words = [c.ta(setting.labelKey), ...(setting.options ? setting.options(c).map(([, label]) => label) : [])];
  return words.some((w) => (c.match ? c.match(String(w), q) : String(w).toLowerCase().includes(q)));
}

/**
 * The sections with the settings that answer the search and the side of the sheet asked for (`only`: 'look' for the pictured choices, 'plain' for the rest, null for all); a section with nothing left is dropped.
 * A setting whose `when` fails is left out; a setting with a `parent` stands and falls with its parent, so a search that finds either shows both.
 */
export function visibleGroups(query, only, c) {
  const out = [];
  for (const group of SETTINGS_GROUPS) {
    if (group.when && !group.when(c)) continue;
    const live = group.settings.filter((s) => !s.when || s.when(c));
    const keep = new Set();
    for (const s of live) {
      if (only === 'look' && !s.look) continue;
      if (only === 'plain' && s.look) continue;
      if (!settingMatches(s, query, c)) continue;
      keep.add(s.id);
      if (s.parent) keep.add(s.parent);
    }
    for (const s of live) if (s.parent && keep.has(s.parent)) keep.add(s.id);
    const settings = live.filter((s) => keep.has(s.id));
    if (settings.length) out.push({ ...group, settings });
  }
  return out;
}

/** The sections as their groups hold them, in the groups' order; a group with no section left is dropped. */
export function inBands(groups) {
  return SETTINGS_BANDS.map((band) => ({ ...band, groups: groups.filter((g) => g.band === band.id) })).filter((b) => b.groups.length);
}
