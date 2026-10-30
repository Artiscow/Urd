/**
 * The gradient bar's stop helpers (editor/src/lib/gradient-stops.js): the position order, a pointer's place, the widest gap and a colour added at a position.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sortStops, pointerAt, widestGapAt, addStopAt } from '../editor/src/lib/gradient-stops.js';

test('the stops are sorted by position, stable at one position, the positions kept as stored inside 0 to 100', () => {
  const sorted = sortStops([{ color: 'b', at: 60 }, { color: 'a', at: 20.25 }, { color: 'c', at: 60 }, { color: 'd', at: 140 }]);
  assert.deepEqual(sorted, [{ color: 'a', at: 20.25 }, { color: 'b', at: 60 }, { color: 'c', at: 60 }, { color: 'd', at: 100 }]);
  assert.deepEqual(sortStops(undefined), []);
});

test('a pointer on the bar reads as a position', () => {
  const rect = { left: 100, width: 200 };
  assert.equal(pointerAt(100, rect), 0);
  assert.equal(pointerAt(150, rect), 25);
  assert.equal(pointerAt(400, rect), 100);
  assert.equal(pointerAt(50, { left: 0, width: 0 }), 0);
});

test('the widest gap is found with the edges counted, and a new colour lands in its middle with the nearest colour and its opacity', () => {
  assert.equal(widestGapAt([{ at: 0 }, { at: 100 }]), 50);
  assert.equal(widestGapAt([{ at: 10 }, { at: 20 }]), 60);
  assert.equal(widestGapAt([]), 50);
  const added = addStopAt([{ color: '#000', at: 0 }, { color: '#fff', at: 100 }], 30);
  assert.deepEqual(added, [{ color: '#000', at: 0 }, { color: '#000', at: 30 }, { color: '#fff', at: 100 }]);
  assert.deepEqual(addStopAt([], 40), [{ color: '#ffffff', at: 40 }]);
  assert.deepEqual(addStopAt([{ color: '#000', at: 22.5, alpha: 0 }, { color: '#000', at: 72.5, alpha: 0.7 }], 30), [{ color: '#000', at: 22.5, alpha: 0 }, { color: '#000', at: 30, alpha: 0 }, { color: '#000', at: 72.5, alpha: 0.7 }]);
});
