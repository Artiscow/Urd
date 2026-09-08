/**
 * Contract tests for the multi-selection logic (selection.js):
 * marquee hits, align/distribute and group offset on paste.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { blocksInRect, alignMoves, distributeMoves, groupDelta } = await engineImport('selection.js');

test('blocksInRect: partial overlap counts, neighbours outside are not hit', () => {
  const blocks = [
    { id: 'a', left: 0, top: 0, right: 100, bottom: 50 },
    { id: 'b', left: 200, top: 0, right: 300, bottom: 50 },
    { id: 'c', left: 50, top: 100, right: 150, bottom: 200 },
  ];
  assert.deepEqual(blocksInRect({ left: 90, top: 40, right: 210, bottom: 120 }, blocks), ['a', 'b', 'c']);
  assert.deepEqual(blocksInRect({ left: 110, top: 0, right: 190, bottom: 90 }, blocks), []);
  // Edge-to-edge (without overlap) is not a hit.
  assert.deepEqual(blocksInRect({ left: 100, top: 0, right: 200, bottom: 50 }, blocks), []);
});

test('alignMoves: left/center/right within the selection\'s own box', () => {
  const items = [
    { id: 'a', x: 10, y: 0, w: 20, h: 40 },
    { id: 'b', x: 40, y: 100, w: 40, h: 40 },
  ];
  assert.deepEqual(alignMoves(items, 'left'), [{ id: 'b', x: 10 }]);
  assert.deepEqual(alignMoves(items, 'right'), [{ id: 'a', x: 60 }]);
  // The box is 10..80: center 45; a (w 20) -> 35, b (w 40) -> 25.
  assert.deepEqual(alignMoves(items, 'center'), [{ id: 'a', x: 35 }, { id: 'b', x: 25 }]);
});

test('alignMoves: top/middle/bottom use y/h in px', () => {
  const items = [
    { id: 'a', x: 0, y: 20, w: 10, h: 60 },
    { id: 'b', x: 50, y: 100, w: 10, h: 20 },
  ];
  assert.deepEqual(alignMoves(items, 'top'), [{ id: 'b', y: 20 }]);
  // The bottom is 120 (b): a (h 60) is moved to 60, b already sits there.
  assert.deepEqual(alignMoves(items, 'bottom'), [{ id: 'a', y: 60 }]);
  // The box is 20..120: middle 70; a -> 40, b -> 60.
  assert.deepEqual(alignMoves(items, 'middle'), [{ id: 'a', y: 40 }, { id: 'b', y: 60 }]);
});

test('alignMoves: fewer than two blocks gives no moves', () => {
  assert.deepEqual(alignMoves([{ id: 'a', x: 0, y: 0, w: 10, h: 10 }], 'left'), []);
});

test('distributeMoves: first and last stay, the air between becomes equal', () => {
  const items = [
    { id: 'a', x: 0, y: 0, w: 10, h: 10 },
    { id: 'b', x: 12, y: 0, w: 10, h: 10 },
    { id: 'c', x: 70, y: 0, w: 10, h: 10 },
  ];
  // Span 0..80, blocks 30, air 50 -> 25 per gap; b -> 35.
  assert.deepEqual(distributeMoves(items, 'x'), [{ id: 'b', x: 35 }]);
  // Fewer than three: no moves.
  assert.deepEqual(distributeMoves(items.slice(0, 2), 'x'), []);
});

test('distributeMoves: vertical with unsorted input', () => {
  // Deliberate Norwegian ids ('midt', 'topp', 'bunn'): plain fixture data.
  const items = [
    { id: 'midt', x: 0, y: 90, w: 10, h: 20 },
    { id: 'topp', x: 0, y: 0, w: 10, h: 40 },
    { id: 'bunn', x: 0, y: 200, w: 10, h: 40 },
  ];
  // Span 0..240, blocks 100, air 140 -> 70 per gap; midt -> 110.
  assert.deepEqual(distributeMoves(items, 'y'), [{ id: 'midt', y: 110 }]);
});

test('groupDelta: the group is clamped as a whole without distorting the layout', () => {
  const frames = [
    { x: 80, y: 40, w: 15, h: 20 },
    { x: 60, y: 100, w: 20, h: 20 },
  ];
  // A wanted +10 % would send 80+15 to 105: clamped to +5.
  assert.deepEqual(groupDelta(frames, 10, 16), { dx: 5, dy: 16 });
  // Down/left: never past the left edge or above the top.
  assert.deepEqual(groupDelta(frames, -70, -50), { dx: -60, dy: -40 });
  // An empty selection is a zero point.
  assert.deepEqual(groupDelta([], 5, 5), { dx: 0, dy: 0 });
});
