/**
 * What the CSV import's previews show of a plan (editor/src/lib/csv-preview.js): the groups and chips, a changed row's values old to new, and a table cell with what it held.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
import { groupsOf, chipsOf, changeOf, summaryOf, cellOf } from '../editor/src/lib/csv-preview.js';

const { readCsv, importPlan, csvCell } = await engineImport('collections-csv.js');
/** A stand-in for the editor's plainTitle: the words of a simple rich text. */
const plain = (html) => String(html).split(/<[^>]*>/).join(' ').replace(/\s+/g, ' ').trim();

// Deliberate Norwegian fixture entries: this is user collection content.
const ENTRIES = [
  { id: 'boller', title: 'Kanelboller', price: 120, sizes: ['Liten'] },
  { id: 'kake', title: 'Kake', price: 350 },
  { id: 'jul', title: 'Julekake', price: 320 },
];
const plan = importPlan(ENTRIES, readCsv('id;title;price;sizes\nboller;Kanelboller;130;Liten|Stor\nkake;Kake;350;\n;Bolle;ca. 90;\n;Ny;45;\n', 'products').rows);

test('groupsOf and chipsOf: what needs the owner first, each status once with its count, a chip narrowing the list', () => {
  assert.deepEqual(groupsOf(plan).map((g) => g.status), ['refused', 'new', 'changed', 'same', 'missing']);
  assert.deepEqual(groupsOf(plan, 'changed').map((g) => g.items.length), [1]);
  assert.deepEqual(chipsOf(plan), [{ status: 'all', n: 5 }, { status: 'refused', n: 1 }, { status: 'new', n: 1 }, { status: 'changed', n: 1 }, { status: 'same', n: 1 }, { status: 'missing', n: 1 }]);
  assert.deepEqual(groupsOf(null), []);
});

test('changeOf: a value field shows old to new in words, the rest is named alone', () => {
  const item = plan.items.find((i) => i.status === 'changed');
  assert.deepEqual(item.changes, ['price', 'sizes']);
  assert.deepEqual(changeOf('price', item.before, item.entry, plain), { field: 'price', from: '120', to: '130' });
  assert.deepEqual(changeOf('sizes', item.before, item.entry, plain), { field: 'sizes', from: 'Liten', to: 'Liten, Stor' });
  assert.deepEqual(changeOf('imageStyle', item.before, item.entry, plain), { field: 'imageStyle' });
  assert.deepEqual(changeOf('quantity', {}, { quantity: { max: 5 } }, plain), { field: 'quantity', from: '', to: '1-5' });
  assert.deepEqual(changeOf('title', { title: '<b>Kake</b>' }, { title: 'Bolle' }, plain), { field: 'title', from: 'Kake', to: 'Bolle' });
});

test('summaryOf: a product\'s price and sizes, another entry\'s date', () => {
  assert.equal(summaryOf(ENTRIES[0], 'products'), '120 · Liten');
  assert.equal(summaryOf({ date: '2026-11-02' }, 'news'), '2026-11-02');
});

test('cellOf: the file\'s cell for a refused row with the bad one marked, and a changed cell with what it held', () => {
  const cell = (entry, column) => csvCell(entry, column);
  const refused = plan.items.find((i) => i.status === 'refused');
  assert.deepEqual(cellOf(refused, 'price', cell), { text: 'ca. 90', was: null, bad: true });
  assert.deepEqual(cellOf(refused, 'title', cell), { text: 'Bolle', was: null, bad: false });
  const changed = plan.items.find((i) => i.status === 'changed');
  assert.deepEqual(cellOf(changed, 'price', cell), { text: '130', was: '120', bad: false });
  assert.deepEqual(cellOf(changed, 'title', cell), { text: 'Kanelboller', was: null, bad: false });
  const skipped = importPlan(ENTRIES, readCsv('id,title,price\nboller,Kanelboller,130\n', 'products').rows, { matched: 'skip' }).items[0];
  assert.deepEqual(cellOf(skipped, 'price', cell), { text: '130', was: '120', bad: false }, 'a skipped row shows what it would have set');
});
