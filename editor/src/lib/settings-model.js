/**
 * Urd's own settings as data (the Urd settings, the gear): the groups, and in each group the settings with their keys, their kind and the editor fields they read and write.
 * The three windows the settings open in (settings/SettingsDialog.svelte for the dialog and the sheet, panels/SettingsPanel.svelte for the panel) draw the same rows from this list, so a setting is declared once.
 * A setting's `options`, `get` and `set` take the context the window passes: `{ ed, ta, menu, setMenuWidthPref }`.
 * Pure, node-tested (tests/settings-model.test.mjs).
 */
import { panelsPrefIn } from './panels-start.js';

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
 * The groups and their settings.
 * `kind`: `choice` (one of the options; a picture per option when `look` names a picture set and the pictures are on), `seg` (segment buttons) and `text` (a text field).
 * `shared` on a group: its values live in the site and are shared by everyone who edits it.
 * `when` on a group or a setting: whether it is shown at all.
 * `parent` on a setting: the setting it belongs to, drawn directly under it and shown with it.
 */
export const SETTINGS_GROUPS = [
  {
    id: 'look',
    labelKey: 'settings.group.look',
    settings: [
      { id: 'theme', labelKey: 'settings.theme', tipKey: 'topbar.adminTheme.title', kind: 'choice', look: 'theme',
        options: (c) => c.ed.ADMIN_THEMES, get: (c) => c.ed.adminTheme, set: (c, v) => { c.ed.adminTheme = v; } },
      { id: 'layout', labelKey: 'settings.layout', tipKey: 'tip.settings.layout', kind: 'choice', look: 'layout',
        options: (c) => c.ed.ADMIN_LAYOUT_OPTIONS, get: (c) => c.ed.adminLayout, set: (c, v) => c.ed.setAdminLayout(v) },
      { id: 'place', labelKey: 'settings.place', tipKey: 'tip.settings.place', kind: 'choice', look: 'place',
        options: (c) => c.ed.SETTINGS_PLACE_OPTIONS, get: (c) => c.ed.settingsPlace, set: (c, v) => c.ed.setSettingsPlace(v) },
      { id: 'pictures', labelKey: 'settings.pictures', tipKey: 'tip.settings.pictures', kind: 'seg',
        options: (c) => c.ed.SETTINGS_PICTURES_OPTIONS, get: (c) => c.ed.settingsPictures, set: (c, v) => c.ed.setSettingsPictures(v) },
      { id: 'language', labelKey: 'settings.language', tipKey: 'topbar.language.title', kind: 'choice',
        options: (c) => [['auto', c.ta('lang.auto')], ...c.ed.adminLangOptions()], get: (c) => c.ed.adminLangChoice, set: (c, v) => c.ed.setAdminLang(v) },
    ],
  },
  {
    id: 'editing',
    labelKey: 'settings.group.editing',
    settings: [
      { id: 'addBlockMenu', labelKey: 'settings.addBlockMenu', tipKey: 'tip.settings.addBlockMenu', kind: 'choice', look: 'addBlock',
        options: (c) => [['side', c.ta('settings.addBlockMenuSide')], ['slim', c.ta('settings.addBlockMenuSlim')]],
        get: (c) => c.ed.addBlockMenuPref, set: (c, v) => c.ed.setAddBlockMenu(v) },
      { id: 'layoutPicker', labelKey: 'settings.layoutPicker', tipKey: 'tip.settings.layoutPicker', kind: 'choice', look: 'layoutPicker',
        options: (c) => [['strip', c.ta('settings.layoutPickerStrip')], ['menu', c.ta('settings.layoutPickerMenu')]],
        get: (c) => c.ed.layoutPickerPref, set: (c, v) => c.ed.setLayoutPicker(v) },
      { id: 'menuWidth', labelKey: 'settings.menuWidth', tipKey: 'tip.settings.menuWidth', kind: 'choice', look: 'menuWidth',
        options: (c) => [['wide', c.ta('settings.menuWide')], ['narrow', c.ta('settings.menuNarrow')]],
        get: (c) => c.menu.widthPref, set: (c, v) => c.setMenuWidthPref(v) },
      { id: 'collectionsLayout', labelKey: 'settings.collectionsLayout', tipKey: 'tip.settings.collectionsLayout', kind: 'choice', look: 'collectionsLayout',
        options: (c) => c.ed.COLLECTIONS_LAYOUT_OPTIONS, get: (c) => c.ed.collectionsLayout, set: (c, v) => c.ed.setCollectionsLayout(v) },
      { id: 'csvPreview', labelKey: 'settings.csvPreview', tipKey: 'tip.settings.csvPreview', kind: 'choice', look: 'csvPreview',
        options: (c) => c.ed.CSV_PREVIEW_OPTIONS, get: (c) => c.ed.csvPreviewPref, set: (c, v) => c.ed.setCsvPreview(v) },
      { id: 'linkEditor', labelKey: 'settings.linkEditor', tipKey: 'tip.settings.linkEditor', kind: 'choice', look: 'linkEditor',
        options: (c) => [['dialog', c.ta('opt.linkEditor.dialog')], ['popover', c.ta('opt.linkEditor.popover')]],
        get: (c) => c.ed.linkEditorPref, set: (c, v) => c.ed.setLinkEditor(v) },
      { id: 'spellcheck', labelKey: 'settings.spellcheck', tipKey: 'tip.settings.spellcheck', kind: 'seg',
        options: (c) => [['on', c.ta('common.on')], ['off', c.ta('common.off')]],
        get: (c) => c.ed.spellcheckPref, set: (c, v) => c.ed.setSpellcheck(v) },
    ],
  },
  {
    id: 'window',
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
    labelKey: 'settings.group.site',
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

/** Whether a setting answers to a search: a word of the query in its name or in one of its options. */
export function settingMatches(setting, query, c) {
  const q = (query ?? '').trim().toLowerCase();
  if (!q) return true;
  const words = [c.ta(setting.labelKey), ...(setting.options ? setting.options(c).map(([, label]) => label) : [])];
  return words.some((w) => String(w).toLowerCase().includes(q));
}

/**
 * The groups with the settings that answer the search and the side of the sheet asked for (`only`: 'look' for the pictured choices, 'plain' for the rest, null for all); a group with nothing left is dropped.
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
