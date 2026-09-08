/**
 * Contract tests for the table block's pure logic (normalizeRows) and the
 * defaults shape. DOM rendering is tested manually (the test rounds).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { tableBlock, normalizeRows } = await engineImport('blocks/table.js');

test('normalizeRows: short rows are padded to a rectangle', () => {
  assert.deepEqual(normalizeRows([['a', 'b', 'c'], ['d']]), [['a', 'b', 'c'], ['d', '', '']]);
});

test('normalizeRows: garbage gives at least 1 x 1, strings only', () => {
  assert.deepEqual(normalizeRows(undefined), [['']]);
  assert.deepEqual(normalizeRows([]), [['']]);
  assert.deepEqual(normalizeRows([[1, null], 'ikke en rad']), [['1', '']]);
});

test('defaults: header row, row lines and a 3 x 3 seeded grid', () => {
  const d = tableBlock.defaults();
  assert.equal(tableBlock.version, 1);
  assert.equal(d.header, true);
  assert.equal(d.lines, 'rows');
  assert.equal(d.rows.length, 3);
  assert.ok(d.rows.every((row) => row.length === 3));
});
