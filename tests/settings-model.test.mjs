/**
 * The Urd settings as data (editor/src/lib/settings-model.js) and their pictures (settings-pictures.js): every setting's keys exist in the admin base, every pictured option has its picture, the stored place and picture choice are normalised, the sections stand in their three groups with the admin design's parts in its own, and the search and the sheet's sides filter the sections.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SETTINGS_BANDS, SETTINGS_GROUPS, SETTINGS_PLACES, settingsPlace, settingsPictures, pictured, settingMatches, visibleGroups, inBands } from '../editor/src/lib/settings-model.js';
import { settingPicture, picturedIds, THEME_SWATCHES } from '../editor/src/lib/settings-pictures.js';
import { engineImport } from './_engine.mjs';

const dict = (await engineImport('locales/admin/nb.js')).default.strings;

/** A context with the editor fields the settings read, as the windows pass it. */
function ctx() {
  const ed = {
    ADMIN_THEMES: Object.keys(THEME_SWATCHES).map((id) => [id, id]),
    ADMIN_LAYOUT_OPTIONS: ['rail', 'sidebar', 'panel-tabs', 'top-tabs', 'page-tabs'].map((id) => [id, id]),
    SETTINGS_PLACE_OPTIONS: SETTINGS_PLACES.map((id) => [id, id]),
    SETTINGS_PICTURES_OPTIONS: [['pictures', 'Pictures'], ['words', 'Words']],
    UPDATE_NOTICE_OPTIONS: [['dot', 'Dot'], ['pill', 'Pill']],
    PANELS_PREF_OPTIONS: [['remember', 'Remember'], ['reset', 'None'], ['fixed', 'Same']],
    PANELS_START_OPTIONS: [['pages', 'Pages'], ['site', 'Site']],
    panelsStart: 'pages',
    COLLECTIONS_LAYOUT_OPTIONS: [['drill', 'Step in'], ['columns', 'Two columns'], ['table', 'Table']],
    collectionsLayout: 'drill',
    CSV_PREVIEW_OPTIONS: [['dialog', 'Dialog'], ['panel', 'In the panel'], ['table', 'Table']],
    csvPreviewPref: 'dialog',
    PAGE_SETTINGS_OPTIONS: [['dialog', 'Dialog'], ['step', 'In the panel'], ['table', 'Table']],
    pageSettingsPref: 'dialog',
    PRESS_OPTIONS: ['ripple', 'press', 'nudge', 'sink', 'ring', 'spring'].map((id) => [id, id]),
    pressFeel: 'ripple',
    DRAG_MARK_OPTIONS: [['slot', 'Slot'], ['line', 'Line']],
    dragMark: 'slot',
    TAB_MENU_OPTIONS: ['groups', 'lines', 'plain'].map((id) => [id, id]),
    tabMenus: 'groups',
    tabMenuStay: 'stay',
    SIDEBAR_FOLDS_OPTIONS: [['tree', 'tree'], ['hover', 'hover'], ['flyout', 'flyout']],
    sidebarFolds: 'tree',
    panelTabMenus: false,
    adminLangOptions: () => [['nb', 'Norsk bokmål']],
    adminTheme: 'grey', adminLayout: 'rail', settingsPlace: 'dialog', settingsPictures: 'pictures', adminLangChoice: 'auto',
    addBlockMenuPref: 'side', toolbarPref: 'groups', toolbarLookPref: 'squares', toolbarGearPref: 'off', toolbarPhonePref: 'on', toolbarDesignPref: 'small', toolbarSizePref: 'regular', layoutPickerPref: 'strip', linkEditorPref: 'dialog', spellcheckPref: 'on', panelsPref: 'remember',
    siteDraft: { admin: {}, analytics: {} },
  };
  const designs = { options: [['floating', 'Floating menu'], ['panels', 'Small panels'], ['side', 'Side panel'], ['column', 'One column']], values: {}, state: { design: 'floating', changed: [] }, apply() {} };
  return { ed, ta: (k) => k, menu: { formPref: 'wide', foldsPref: 'left', extraPref: 'shown', capListPref: 'list', capAddPref: 'head', shortcutsPref: 'pinned', designsPref: 'row' }, setMenuFormPref() {}, setFoldsPref() {}, setExtraPref() {}, setCapListPref() {}, setCapAddPref() {}, setShortcutsPref() {}, setDesignsPref() {}, designs };
}

/** A setting by its id. */
const row = (id) => SETTINGS_GROUPS.flatMap((g) => g.settings).find((s) => s.id === id);

test('every setting names keys the admin base holds, and reads its value through the context', () => {
  const c = ctx();
  for (const band of SETTINGS_BANDS) {
    assert.ok(dict[band.labelKey], `${band.id}: ${band.labelKey}`);
    assert.ok(dict[band.tipKey], `${band.id}: ${band.tipKey}`);
  }
  for (const group of SETTINGS_GROUPS) {
    assert.ok(dict[group.labelKey], `${group.id}: ${group.labelKey}`);
    if (group.tipKey) assert.ok(dict[group.tipKey], `${group.id}: ${group.tipKey}`);
    for (const s of group.settings) {
      assert.ok(dict[s.labelKey], `${s.id}: ${s.labelKey}`);
      assert.ok(dict[s.tipKey], `${s.id}: ${s.tipKey}`);
      if (s.placeholderKey) assert.ok(dict[s.placeholderKey], `${s.id}: ${s.placeholderKey}`);
      assert.notEqual(s.get(c), undefined, `${s.id} reads a value`);
      if (s.options) assert.ok(s.options(c).length >= 2, `${s.id} offers a choice`);
    }
  }
});

test('every option of a pictured setting has its picture, and no picture is drawn for an option that is gone', () => {
  const c = ctx();
  for (const group of SETTINGS_GROUPS) {
    for (const s of group.settings) {
      if (!s.look) continue;
      const ids = s.options(c).map(([id]) => id);
      for (const id of ids) assert.ok(settingPicture(s.look, id), `${s.look}/${id}`);
      assert.deepEqual(picturedIds(s.look).sort(), [...ids].sort(), `${s.look} draws exactly its options`);
    }
  }
  assert.equal(settingPicture('layout', 'nonsense'), null);
  // The looks that set the tools apart by area are offered only with a form whose tools belong to areas, or while chosen.
  const looks = (form, chosen = 'squares') => SETTINGS_GROUPS.flatMap((g) => g.settings).find((x) => x.id === 'toolbarLook').options({ ...c, ed: { ...c.ed, toolbarPref: form, toolbarLookPref: chosen } }).map(([id]) => id);
  assert.ok(!looks('full').includes('areas') && looks('groups').includes('areas') && looks('panels').includes('capsule-areas'));
  assert.ok(looks('short', 'areas').includes('areas'));
  assert.ok(pictured(row('theme'), 'pictures'));
  assert.ok(!pictured(row('theme'), 'words'));
  assert.ok(pictured(row('adminDesign'), 'pictures'), 'the admin designs are chosen as the other looks are, from their pictures');
});

test('the stored place and picture choice fall to the dialog and to pictures', () => {
  assert.equal(settingsPlace(null), 'dialog');
  assert.equal(settingsPlace('panel'), 'panel');
  assert.equal(settingsPlace('sheet'), 'sheet');
  assert.equal(settingsPlace('popover'), 'dialog');
  assert.equal(settingsPictures(undefined), 'pictures');
  assert.equal(settingsPictures('words'), 'words');
});

test('the search keeps the settings a word of the query names, and the sheet splits the look from the rest', () => {
  const c = ctx();
  assert.ok(settingMatches(row('theme'), 'settings.THEME', c));
  assert.ok(!settingMatches(row('theme'), 'nothing-here', c));
  // With the search in every language, the context's match decides: a word of another language finds the setting.
  assert.ok(settingMatches(row('theme'), 'tema', { ...c, match: (text, q) => q === 'tema' && text === c.ta(row('theme').labelKey) }));
  // The admin design is found by a design's name.
  assert.deepEqual(visibleGroups('small panels', null, c).map((g) => g.id), ['design']);
  const all = visibleGroups('', null, c);
  assert.deepEqual(all.map((g) => g.id), ['design', 'menu', 'panels', 'canvas', 'look', 'editing', 'window', 'site']);
  // A setting under another (`parent`) stands with it, so «After a pick» goes with «Tab menus» into the look and brings it into the rest.
  const look = visibleGroups('', 'look', c).flatMap((g) => g.settings);
  assert.ok(look.every((s) => s.look || look.some((p) => p.id === s.parent)));
  assert.ok(look.some((s) => s.design), 'the admin design stands with the looks');
  const plain = visibleGroups('', 'plain', c).flatMap((g) => g.settings);
  // A pictured setting stands on the plain side only beside its family: as the parent of a plain setting there, or as a child of that parent.
  assert.ok(plain.every((s) => !s.look || plain.some((child) => child.parent === s.id) || plain.some((p) => p.id === s.parent)));
  assert.deepEqual(new Set([...look, ...plain].map((s) => s.id)), new Set(all.flatMap((g) => g.settings).map((s) => s.id)));
  assert.deepEqual(visibleGroups('spellcheck', null, c).map((g) => [g.id, g.settings.map((s) => s.id)]), [['editing', ['spellcheck']]]);
  c.ed.siteDraft = null;
  assert.ok(!visibleGroups('', null, c).some((g) => g.id === 'site'));
});

test('the panel to start with stands under its choice only while «Always the same panel» is chosen, and a search for either shows both', () => {
  const c = ctx();
  const ids = (q) => visibleGroups(q, null, c).find((g) => g.id === 'window')?.settings.map((s) => s.id);
  assert.deepEqual(ids(''), ['panels']);
  c.ed.panelsPref = 'fixed';
  assert.deepEqual(ids(''), ['panels', 'panelsStart']);
  assert.deepEqual(ids('settings.panelsStart'), ['panels', 'panelsStart']);
  assert.deepEqual(ids('settings.panels'), ['panels', 'panelsStart']);
  c.ed.panelsPref = 'folded';
  c.ed.adminLayout = 'rail';
  const panels = SETTINGS_GROUPS.find((g) => g.id === 'window').settings.find((s) => s.id === 'panels');
  assert.equal(panels.get(c), 'reset', 'the folded column reads as no panel in a layout without the column');
});

test('the sections stand in three groups: the admin design with every part, Local settings with none, and This site, shared', () => {
  const c = ctx();
  assert.deepEqual(SETTINGS_BANDS.map((b) => b.id), ['design', 'local', 'site']);
  for (const group of SETTINGS_GROUPS) assert.ok(SETTINGS_BANDS.some((b) => b.id === group.band), `${group.id} stands in a group`);
  const bands = inBands(visibleGroups('', null, c));
  assert.deepEqual(bands.map((b) => [b.id, b.groups.map((g) => g.id)]), [['design', ['design', 'menu', 'panels', 'canvas']], ['local', ['look', 'editing', 'window']], ['site', ['site']]]);
  const settings = (band) => SETTINGS_GROUPS.filter((g) => g.band === band).flatMap((g) => g.settings);
  assert.ok(settings('design')[0].design, 'the admin design stands first');
  assert.ok(settings('design').slice(1).every((s) => s.part), 'every row under the admin design is one of its parts');
  assert.ok(!settings('local').some((s) => s.part) && !settings('site').some((s) => s.part), 'no design sets a local or a shared setting');
  assert.ok(SETTINGS_GROUPS.filter((g) => g.band === 'site').every((g) => g.shared));
  // A search that leaves one section keeps its group alone.
  assert.deepEqual(inBands(visibleGroups('spellcheck', null, c)).map((b) => b.id), ['local']);
});
