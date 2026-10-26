/**
 * The keyboard walk through a picker's cells (editor/src/lib/cell-walk.js, 0.7.10.7): an arrow moves to the nearest cell in its direction, keeping to the row or the column.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

const { nearestCell } = await import(new URL('../editor/src/lib/cell-walk.js', import.meta.url).href);

/** A grid of 30 px cells, `cols` to a row, as the pickers draw them. */
const grid = (count, cols) => Array.from({ length: count }, (_, i) => ({ left: (i % cols) * 30, top: Math.floor(i / cols) * 30, width: 28, height: 28 }));

test('the arrows walk a full grid by one cell and one row', () => {
  const rects = grid(16, 8);
  assert.equal(nearestCell(rects, 0, 1, 0), 1, 'right');
  assert.equal(nearestCell(rects, 1, -1, 0), 0, 'left');
  assert.equal(nearestCell(rects, 2, 0, 1), 10, 'down keeps the column');
  assert.equal(nearestCell(rects, 10, 0, -1), 2, 'up keeps the column');
});

test('at an edge there is nowhere to go', () => {
  const rects = grid(16, 8);
  assert.equal(nearestCell(rects, 7, 1, 0), -1, 'the row\'s end');
  assert.equal(nearestCell(rects, 3, 0, -1), -1, 'the top row');
  assert.equal(nearestCell(rects, 12, 0, 1), -1, 'the last row');
});

test('down from a column the short last row lacks lands on the nearest cell of that row', () => {
  const rects = grid(10, 8);
  assert.equal(nearestCell(rects, 6, 0, 1), 9, 'the last row holds two cells');
});

test('a group heading between two grids is passed over: down goes to the next grid\'s cell below', () => {
  const first = grid(8, 8);
  const second = grid(8, 8).map((r) => ({ ...r, top: r.top + 60 }));
  assert.equal(nearestCell([...first, ...second], 4, 0, 1), 12);
});
