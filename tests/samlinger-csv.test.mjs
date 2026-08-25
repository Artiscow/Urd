/**
 * Kontraktstester for samlingenes CSV-import/-eksport (engine/samlinger-csv.js):
 * runde-tripp, RFC 4180-anførselstegn, listefeltene (|), tallfeltene og
 * header-styrt tolkning. Panel-flyten (nedlasting/fil-les) testes manuelt.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { entriesToCsv, csvToEntries, parseCsv } = await engineImport('samlinger-csv.js');

const ENTRIES = [
  { id: 'sjokoladekake', title: 'Sjokoladekake', text: 'Saftig, med "mørk" ganache', price: 350, badge: 'Bestselger', sizes: ['Liten', 'Stor'] },
  { id: 'boller', title: 'Kanelboller, 6 stk.', price: 120, memberPrice: 100, colors: [{ name: 'Grønn', image: '/media/x.webp' }, { name: 'Rosa' }] },
];

test('entriesToCsv: header + rader, komma og anførselstegn pakkes', () => {
  const csv = entriesToCsv(ENTRIES);
  const lines = csv.trim().split('\n');
  assert.ok(lines[0].startsWith('id,title,'));
  assert.equal(lines.length, 3);
  assert.ok(csv.includes('"Kanelboller, 6 stk."'));
  assert.ok(csv.includes('"Saftig, med ""mørk"" ganache"'));
  assert.ok(csv.includes('Liten|Stor'));
  assert.ok(csv.includes('Grønn|Rosa'));
});

test('runde-tripp: eksport → import bevarer felter (fargebilder unntatt)', () => {
  const { entries, skipped } = csvToEntries(entriesToCsv(ENTRIES));
  assert.equal(skipped, 0);
  assert.equal(entries.length, 2);
  assert.equal(entries[0].id, 'sjokoladekake');
  assert.equal(entries[0].price, 350);
  assert.deepEqual(entries[0].sizes, ['Liten', 'Stor']);
  assert.equal(entries[1].memberPrice, 100);
  assert.deepEqual(entries[1].colors, [{ name: 'Grønn' }, { name: 'Rosa' }]);
});

test('parseCsv: anførselstegn med linjeskift og CRLF, tomme rader forkastes', () => {
  const rows = parseCsv('a,"b\nc",d\r\n\r\ne,f,g\n');
  assert.deepEqual(rows, [['a', 'b\nc', 'd'], ['e', 'f', 'g']]);
});

test('csvToEntries: header-styrt rekkefølge, komma-desimal, rader uten tittel hoppes', () => {
  const parsed = csvToEntries('price,title\n"49,50",Bolle\n120,\n');
  assert.equal(parsed.entries.length, 1);
  assert.equal(parsed.entries[0].price, 49.5);
  assert.equal(parsed.entries[0].id, '');
  assert.equal(parsed.skipped, 1);
});

test('csvToEntries: uten title-kolonne eller rader gir null', () => {
  assert.equal(csvToEntries('id,name\n1,x\n'), null);
  assert.equal(csvToEntries('id,title\n'), null);
  assert.equal(csvToEntries(''), null);
});
