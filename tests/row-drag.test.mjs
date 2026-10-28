/**
 * Reordering a flat list by dragging (editor/src/lib/row-drag.js, the Collections panel's entries): the landing place from the pointer, and the list in its new order.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rowDropAt, reorderRows, stepAmong } from '../editor/src/lib/row-drag.js';

const rows = [
  { id: 'a', top: 0, bottom: 40 },
  { id: 'b', top: 50, bottom: 90 },
  { id: 'c', top: 100, bottom: 140 },
];

test('the dragged box lands beside the first row any part of it touches: before it moving up, after it moving down', () => {
  // c (40 tall) held at y 55: its box spans 35 to 75 and touches a's foot; moving up it lands before a.
  assert.deepEqual(rowDropAt(rows, 'c', 55), { id: 'a', pos: 'before' });
  // a held at y 85: its box spans 65 to 105 and touches b and c; moving down it lands after the lowest, c.
  assert.deepEqual(rowDropAt(rows, 'a', 85), { id: 'c', pos: 'after' });
  // a held at y 70: the box spans 50 to 90, b alone; after b.
  assert.deepEqual(rowDropAt(rows, 'a', 70), { id: 'b', pos: 'after' });
});

test('above every row the box lands first, below every row last', () => {
  assert.deepEqual(rowDropAt(rows, 'c', -30), { id: 'a', pos: 'before' });
  assert.deepEqual(rowDropAt(rows, 'a', 300), { id: 'c', pos: 'after' });
});

test('a landing place that changes nothing gives no drop', () => {
  // c held over its own place touches nothing else.
  assert.equal(rowDropAt(rows, 'c', 120), null);
  // b pulled a little up touches a, landing before a would be a move; pulled just onto its own place, nothing.
  assert.equal(rowDropAt(rows, 'b', 70), null);
  assert.equal(rowDropAt([], 'a', 10), null);
  assert.equal(rowDropAt(rows, 'zz', 10), null);
  assert.equal(rowDropAt([rows[0]], 'a', 10), null);
});

test('the list is reordered by the drop, and left alone when the drop names a row it does not hold', () => {
  const list = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  const idOf = (r) => r.id;
  assert.deepEqual(reorderRows(list, idOf, 'c', { id: 'a', pos: 'before' }).map(idOf), ['c', 'a', 'b']);
  assert.deepEqual(reorderRows(list, idOf, 'a', { id: 'c', pos: 'after' }).map(idOf), ['b', 'c', 'a']);
  assert.deepEqual(reorderRows(list, idOf, 'a', { id: 'b', pos: 'after' }).map(idOf), ['b', 'a', 'c']);
  assert.equal(reorderRows(list, idOf, 'zz', { id: 'a', pos: 'before' }), list);
  assert.equal(reorderRows(list, idOf, 'a', { id: 'zz', pos: 'before' }), list);
});

test('a step moves a row past the next row that can move, and the rows that cannot keep their places', () => {
  // d1 and d2 are dated (kept by date on the page); u1, u2 and u3 are undated and move.
  const list = [{ id: 'u1' }, { id: 'd1', date: '2026-01-01' }, { id: 'u2' }, { id: 'd2', date: '2026-02-01' }, { id: 'u3' }];
  const canMove = (r) => !r.date;
  const idOf = (r) => r.id;
  assert.deepEqual(stepAmong(list, canMove, idOf, 'u2', -1).map(idOf), ['u2', 'd1', 'u1', 'd2', 'u3']);
  assert.deepEqual(stepAmong(list, canMove, idOf, 'u2', 1).map(idOf), ['u1', 'd1', 'u3', 'd2', 'u2']);
  assert.equal(stepAmong(list, canMove, idOf, 'u1', -1), list);
  assert.equal(stepAmong(list, canMove, idOf, 'u3', 1), list);
  assert.equal(stepAmong(list, canMove, idOf, 'd1', 1), list);
});
