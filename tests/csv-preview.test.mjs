/**
 * What the CSV import's previews show of a plan (editor/src/lib/csv-preview.js): the groups and chips, a changed row's values old to new, and a table cell with what it held.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { engineImport } from './_engine.mjs';
import { groupsOf, chipsOf, changeOf, summaryOf, cellOf } from '../editor/src/lib/csv-preview.js';

const { readCsv, importPlan, csvCell, decodeCsv } = await engineImport('collections-csv.js');
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

test('a CSV import stores nothing while it waits, its choices and its cancel included, and Import stores the plan as one undo step', async () => {
  const state = readFileSync(new URL('../editor/src/state/collections.svelte.js', import.meta.url), 'utf8');
  const fn = (name) => {
    const start = state.search(new RegExp(`\\n(?:async )?function ${name}\\(`)) + 1;
    assert.ok(start > 0, `${name} is found`);
    return state.slice(start, state.indexOf('\n}\n', start) + 2);
  };
  const names = ['startCsvImport', 'setCsvImport', 'cancelCsvImport', 'applyCsvImport', 'mutateCollection'];
  const stored = { schemaVersion: 1, id: 'kaker', name: 'Kaker', kind: 'products', entries: structuredClone(ENTRIES) };
  const steps = [];
  const told = [];
  let saves = 0;
  let ids = 0;
  const store = { data: structuredClone(stored), save: () => { saves += 1; } };
  const imports = new Function('collectionsView', 'collectionStores', 'historyState', 'shellState', 'siteState', 'readCsv', 'decodeCsv', 'importPlan', 'makeId', '$state', 'ta', 'counted', 'adminLang', 'doneWithUndo', 'syncCollectionsView',
    `let csvImport = null;\n${names.map(fn).join('\n')}\nreturn { ${names.slice(0, 4).join(', ')}, get waiting() { return csvImport; } };`)(
    { kaker: structuredClone(stored) }, { kaker: store }, { pushHistory: (key) => steps.push(key), updateDirty() {} },
    { setStatus() {}, csvPreviewPref: 'dialog', activePanel: 'collections', panelFolded: false }, { siteDraft: { pages: [] } },
    readCsv, decodeCsv, importPlan, (prefix) => `${prefix}-${(ids += 1)}`, { snapshot: structuredClone }, (key) => key, (key, n) => `${key} ${n}`, () => 'en', (words) => told.push(words), () => {});
  const text = 'id;title;price\nboller;Kanelboller;130\n;Ny;45\n';
  const file = { name: 'kaker.csv', arrayBuffer: async () => new TextEncoder().encode(text).buffer };
  const untouched = (when) => {
    assert.deepEqual(store.data, stored, `${when}: the collection is as it was`);
    assert.deepEqual([steps.length, saves], [0, 0], `${when}: no undo step and no save`);
  };
  await imports.startCsvImport('kaker', file);
  assert.ok(imports.waiting, 'the import waits');
  untouched('read');
  imports.setCsvImport({ matched: 'skip' });
  imports.setCsvImport({ missing: 'remove' });
  imports.setCsvImport({ view: 'table' });
  untouched('choices');
  imports.cancelCsvImport();
  assert.equal(imports.waiting, null);
  untouched('cancelled');
  await imports.startCsvImport('kaker', file);
  imports.setCsvImport({ missing: 'remove' });
  imports.applyCsvImport();
  assert.equal(imports.waiting, null, 'the import has ended');
  assert.deepEqual(steps, ['collection:kaker:import'], 'one undo step');
  assert.equal(saves, 1);
  assert.equal(told.length, 1, 'offered as Undo in the status line');
  let made = 0;
  const plan = importPlan(structuredClone(ENTRIES), readCsv(text, 'products').rows, { matched: 'update', missing: 'remove' }, (prefix) => `${prefix}-${(made += 1)}`);
  assert.deepEqual(store.data.entries, plan.entries, 'the plan with the choices made');
  assert.deepEqual(store.data.entries.map((e) => e.title), ['Kanelboller', 'Ny']);
  // The import's parts ask the editor for nothing else that stores: its choices, its cancel, Import, and an entry's plain title.
  for (const part of ['ImportDialog', 'ImportStep', 'ImportChoices', 'ImportTable', 'ImportSummary']) {
    const source = readFileSync(new URL(`../editor/src/panels/collections/${part}.svelte`, import.meta.url), 'utf8');
    const asked = new Set([...source.matchAll(/\bed\.(\w+)\(/g)].map((m) => m[1]));
    assert.deepEqual([...asked].filter((name) => !['setCsvImport', 'cancelCsvImport', 'applyCsvImport', 'plainTitle'].includes(name)), [], part);
    assert.doesNotMatch(source, /from '[^']*\/state\//, `${part} imports no state module`);
    if (asked.has('applyCsvImport')) assert.match(source, /onclick=\{\(\) => ed\.applyCsvImport\(\)\}>\{ta\('csv\.apply'\)\}<\/button>/, `${part}: Import alone stores`);
  }
});
