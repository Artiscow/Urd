/**
 * Kontraktstester for tabell-blokkens rene logikk (normalizeRows) og
 * defaults-formen. DOM-rendering testes manuelt (testrundene).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { tabellBlock, normalizeRows } = await engineImport('blocks/tabell.js');

test('normalizeRows: korte rader fylles ut til rektangel', () => {
  assert.deepEqual(normalizeRows([['a', 'b', 'c'], ['d']]), [['a', 'b', 'c'], ['d', '', '']]);
});

test('normalizeRows: søppel gir minst 1 x 1, kun strenger', () => {
  assert.deepEqual(normalizeRows(undefined), [['']]);
  assert.deepEqual(normalizeRows([]), [['']]);
  assert.deepEqual(normalizeRows([[1, null], 'ikke en rad']), [['1', '']]);
});

test('defaults: overskriftsrad, radlinjer og 3 x 3 seededet rutenett', () => {
  const d = tabellBlock.defaults();
  assert.equal(tabellBlock.version, 1);
  assert.equal(d.header, true);
  assert.equal(d.lines, 'rows');
  assert.equal(d.rows.length, 3);
  assert.ok(d.rows.every((row) => row.length === 3));
});
