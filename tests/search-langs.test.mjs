/**
 * Search in every language (search-langs.js, 0.7.10.5): a word typed in any built-in admin language finds the labels the menus show in the current one.
 * The pure core is driven with small dictionaries, and once with the real five, so a renamed key or label still finds its translations.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { buildIndex, makeLanguageSearch } = await engineImport('search-langs.js');

const nb = { 'blocks.calendar': 'Kalender', 'lbl.textColor': 'Tekstfarge', 'lbl.vertical': 'Vertikal', 'tip.long': 'En lang setning om kalenderen som forklarer en innstilling i detalj', 'lbl.count': '{n} kalendere' };
const en = { 'blocks.calendar': 'Calendar', 'lbl.textColor': 'Text colour', 'lbl.vertical': 'Vertical', 'tip.long': 'A long sentence about the calendar that explains a setting in detail', 'lbl.count': '{n} calendars' };
const tr = { 'blocks.calendar': 'Takvim', 'lbl.textColor': 'Metin rengi', 'lbl.vertical': 'Dikey' };
const english = (key) => en[key] ?? key;

test('buildIndex: labels only, without sentences and placeholders', () => {
  const index = buildIndex([nb, en]);
  const keys = index.map((e) => e.key);
  assert.ok(keys.includes('blocks.calendar'));
  assert.ok(!keys.includes('tip.long'), 'a sentence is no label');
  assert.ok(!keys.includes('lbl.count'), 'a string with a placeholder is left out');
  assert.deepEqual(index.find((e) => e.key === 'blocks.calendar').texts.sort(), ['calendar', 'kalender']);
});

test('a Norwegian or Turkish word finds the English label', () => {
  const { matchAny, labelsFor } = makeLanguageSearch(buildIndex([nb, en, tr]), english);
  assert.deepEqual(labelsFor('kalender'), ['calendar']);
  assert.ok(matchAny('Calendar', 'kalender'));
  assert.ok(matchAny('Calendar', 'takvim'));
  assert.ok(matchAny('Calendar', 'Kalénder'), 'case and diacritics do not matter');
  assert.ok(!matchAny('Vertical', 'kalender'));
});

test('a short word is matched at the start of a word, a longer one inside a compound too', () => {
  const { matchAny } = makeLanguageSearch(buildIndex([nb, en]), english);
  assert.ok(matchAny('Calendar', 'kal'), '«kal» starts «Kalender»');
  assert.ok(!matchAny('Vertical', 'kal'), '«kal» inside «Vertikal» is no hit at three letters');
  assert.ok(!matchAny('Vertical', 'ikal'), '«ikal» inside «Vertikal» is no hit at four letters');
  assert.ok(matchAny('Text colour', 'farge'), '«farge» inside «Tekstfarge» at five letters');
  assert.ok(!matchAny('Calendar', 'ka'), 'two letters find nothing in other languages');
});

test('word by word, and the words a menu row shows beside its label', () => {
  const { matchAny } = makeLanguageSearch(buildIndex([nb, en]), english);
  assert.ok(matchAny('Text colour The colour of the words', 'tekst farge'));
  assert.ok(matchAny('Colours Text colour', 'colour tekst'), 'a word as typed and a word through another language');
  assert.ok(!matchAny('Background', 'tekst farge'));
});

test('a word in the current language matches as typed, and nothing more', () => {
  const { matchAny } = makeLanguageSearch(buildIndex([nb, en]), english);
  assert.ok(matchAny('Calendar', 'cal'));
  assert.ok(!matchAny('Vertical', 'calendar'));
});

test('searchItemsAny: the hits as typed come before the hits through another language', () => {
  const dicts = [{ ...nb, 'blocks.table': 'Tabell' }, { ...en, 'blocks.table': 'Table' }];
  const current = (key) => dicts[1][key] ?? key;
  const { searchItemsAny } = makeLanguageSearch(buildIndex(dicts), current);
  const items = ['Vertical', 'Table', 'Calendar', 'Tabulator'].map((label) => ({ label }));
  assert.deepEqual(searchItemsAny(items, 'tab', (i) => i.label).map((i) => i.label), ['Table', 'Tabulator']);
  assert.deepEqual(searchItemsAny(items, 'kalender', (i) => i.label).map((i) => i.label), ['Calendar']);
  assert.deepEqual(searchItemsAny(items, '', (i) => i.label).length, 4);
});

test('the real dictionaries: the calendar block found from every built-in language', async () => {
  const codes = ['nb', 'nn', 'en-GB', 'se', 'tr'];
  const dicts = Object.fromEntries(await Promise.all(codes.map(async (c) => [c, (await engineImport(`locales/admin/${c}.js`)).default.strings])));
  const index = buildIndex(Object.values(dicts));
  const inEnglish = makeLanguageSearch(index, (key) => dicts['en-GB'][key] ?? dicts.nb[key] ?? key);
  const inBokmal = makeLanguageSearch(index, (key) => dicts.nb[key] ?? key);
  const calendar = dicts['en-GB']['blocks.calendar'];
  assert.ok(inEnglish.matchAny(calendar, 'kalender'), 'bokmål in an English menu');
  assert.ok(inEnglish.matchAny(calendar, dicts.tr['blocks.calendar']), 'Turkish in an English menu');
  assert.ok(inBokmal.matchAny(dicts.nb['blocks.calendar'], 'calendar'), 'English in a bokmål menu');
  assert.ok(inEnglish.matchAny(dicts['en-GB']['blocks.timeline'], 'tid'), 'three letters of «Tidslinje» find Timeline');
});

test('the real dictionaries: a short label found through another language matches only as a word', async () => {
  const codes = ['nb', 'nn', 'en-GB', 'se', 'tr'];
  const dicts = Object.fromEntries(await Promise.all(codes.map(async (c) => [c, (await engineImport(`locales/admin/${c}.js`)).default.strings])));
  const index = buildIndex(Object.values(dicts));
  const inEnglish = makeLanguageSearch(index, (key) => dicts['en-GB'][key] ?? dicts.nb[key] ?? key);
  const inBokmal = makeLanguageSearch(index, (key) => dicts.nb[key] ?? key);
  assert.ok(inBokmal.matchAny(dicts.nb['lbl.size'], 'size'), '«size» finds the size setting');
  assert.ok(!inBokmal.matchAny('Normal', 'size'), '«Mål» for «size» does not match inside «Normal»');
  assert.ok(!inBokmal.matchAny('Smal skjerm', 'size'));
  assert.ok(!inBokmal.matchAny('Standard', 'year'), '«År» for «year» does not match inside «Standard»');
  assert.ok(!inEnglish.matchAny('Small', 'alle'), '«all» for «alle» does not match inside «Small»');
  const blocks = Object.entries(dicts['en-GB']).filter(([key]) => /^blocks\.[a-z]+$/.test(key)).map(([, label]) => ({ label }));
  assert.deepEqual(inEnglish.searchItemsAny(blocks, 'açık', (b) => b.label), [], 'a two-letter label («On») is not used');
});
