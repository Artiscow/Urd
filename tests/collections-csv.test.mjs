/**
 * Contract tests for the collections CSV import/export (engine/collections-csv.js):
 * round trip, RFC 4180 quoting, the list fields (|), the number fields and
 * header-driven interpretation. The panel flow (download/file read) is tested
 * manually.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { entriesToCsv, csvToEntries, parseCsv } = await engineImport('collections-csv.js');

// Deliberate Norwegian fixture entries: this is user collection content.
const ENTRIES = [
  { id: 'sjokoladekake', title: 'Sjokoladekake', text: 'Saftig, med "mørk" ganache', price: 350, badge: 'Bestselger', sizes: ['Liten', 'Stor'] },
  { id: 'boller', title: 'Kanelboller, 6 stk.', price: 120, memberPrice: 100, colors: [{ name: 'Grønn', image: '/media/x.webp' }, { name: 'Rosa' }] },
];

test('entriesToCsv: header + rows, commas and quotes are wrapped', () => {
  const csv = entriesToCsv(ENTRIES);
  const lines = csv.trim().split('\n');
  assert.ok(lines[0].startsWith('id,title,'));
  assert.equal(lines.length, 3);
  assert.ok(csv.includes('"Kanelboller, 6 stk."'));
  assert.ok(csv.includes('"Saftig, med ""mørk"" ganache"'));
  assert.ok(csv.includes('Liten|Stor'));
  assert.ok(csv.includes('Grønn|Rosa'));
});

test('round trip: export then import preserves fields (color images excepted)', () => {
  const { entries, skipped } = csvToEntries(entriesToCsv(ENTRIES));
  assert.equal(skipped, 0);
  assert.equal(entries.length, 2);
  assert.equal(entries[0].id, 'sjokoladekake');
  assert.equal(entries[0].price, 350);
  assert.deepEqual(entries[0].sizes, ['Liten', 'Stor']);
  assert.equal(entries[1].memberPrice, 100);
  assert.deepEqual(entries[1].colors, [{ name: 'Grønn' }, { name: 'Rosa' }]);
});

test('parseCsv: quotes with newlines and CRLF, empty rows are discarded', () => {
  const rows = parseCsv('a,"b\nc",d\r\n\r\ne,f,g\n');
  assert.deepEqual(rows, [['a', 'b\nc', 'd'], ['e', 'f', 'g']]);
});

test('csvToEntries: header-driven order, comma decimals, rows without a title are skipped', () => {
  const parsed = csvToEntries('price,title\n"49,50",Bolle\n120,\n');
  assert.equal(parsed.entries.length, 1);
  assert.equal(parsed.entries[0].price, 49.5);
  assert.equal(parsed.entries[0].id, '');
  assert.equal(parsed.skipped, 1);
});

test('csvToEntries: without a title column or rows gives null', () => {
  assert.equal(csvToEntries('id,name\n1,x\n'), null);
  assert.equal(csvToEntries('id,title\n'), null);
  assert.equal(csvToEntries(''), null);
});

test('entriesToCsv: an entry that links a page or a spot on it is written as the address the page draws', () => {
  const pages = [{ id: 'kaker', path: '/kaker' }];
  const csv = entriesToCsv([{ id: 'a', title: 'A', page: 'kaker', target: 'sec-1' }, { id: 'b', title: 'B', page: 'borte' }], pages);
  const [, first, second] = csv.trim().split('\n');
  assert.ok(first.includes('/kaker#sec-1'));
  assert.ok(!second.includes('borte'), 'a page that is gone gives no address');
});

test('csvToEntries: an address that names a page of the register is read back as that page and its spot', () => {
  const pages = [{ id: 'kaker', path: '/kaker' }];
  const csv = entriesToCsv([{ id: 'a', title: 'A', page: 'kaker', target: 'sec-1' }, { id: 'b', title: 'B', href: '/annet' }, { id: 'c', title: 'C', href: 'https://x.no' }], pages);
  const { entries } = csvToEntries(csv, pages);
  assert.deepEqual([entries[0].page, entries[0].target, entries[0].href], ['kaker', 'sec-1', undefined]);
  assert.equal(entries[1].href, '/annet', 'a path that names no page stays an address');
  assert.equal(entries[2].href, 'https://x.no');
});
