/**
 * The Urd settings as data (editor/src/lib/settings-model.js) and their pictures (settings-pictures.js): every setting's keys exist in the admin base, every pictured option has its picture, the stored place and picture choice are normalised, and the search and the sheet's sides filter the groups.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SETTINGS_GROUPS, SETTINGS_PLACES, settingsPlace, settingsPictures, pictured, settingMatches, visibleGroups } from '../editor/src/lib/settings-model.js';
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
    TAB_MENU_OPTIONS: ['groups', 'lines', 'plain'].map((id) => [id, id]),
    tabMenus: 'groups',
    tabMenuStay: 'stay',
    adminLangOptions: () => [['nb', 'Norsk bokmål']],
    adminTheme: 'grey', adminLayout: 'rail', settingsPlace: 'dialog', settingsPictures: 'pictures', adminLangChoice: 'auto',
    addBlockMenuPref: 'side', layoutPickerPref: 'strip', linkEditorPref: 'dialog', spellcheckPref: 'on', panelsPref: 'remember',
    siteDraft: { admin: {}, analytics: {} },
  };
  return { ed, ta: (k) => k, menu: { widthPref: 'wide' }, setMenuWidthPref() {} };
}

test('every setting names keys the admin base holds, and reads its value through the context', () => {
  const c = ctx();
  for (const group of SETTINGS_GROUPS) {
    assert.ok(dict[group.labelKey], `${group.id}: ${group.labelKey}`);
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
  assert.ok(pictured(SETTINGS_GROUPS[0].settings[0], 'pictures'));
  assert.ok(!pictured(SETTINGS_GROUPS[0].settings[0], 'words'));
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
  assert.ok(settingMatches(SETTINGS_GROUPS[0].settings[0], 'settings.THEME', c));
  assert.ok(!settingMatches(SETTINGS_GROUPS[0].settings[0], 'nothing-here', c));
  const all = visibleGroups('', null, c);
  assert.deepEqual(all.map((g) => g.id), ['look', 'editing', 'window', 'site']);
  const look = visibleGroups('', 'look', c).flatMap((g) => g.settings);
  assert.ok(look.every((s) => s.look));
  const plain = visibleGroups('', 'plain', c).flatMap((g) => g.settings);
  assert.ok(plain.every((s) => !s.look));
  assert.equal(look.length + plain.length, all.flatMap((g) => g.settings).length);
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
