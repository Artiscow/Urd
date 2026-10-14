/**
 * The snapping rules of the desktop canvas (snap-model.js, 0.7.10): the
 * tolerance that follows the zoom, the edge and centre lines, the equal gaps
 * and the axis lock.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { SNAP_SCREEN_PX, snapTolerance, edgeSnap, gapSnap, lockAxis } = await engineImport('snap-model.js');

test('snapTolerance: eight screen px, in the page\'s px at every zoom', () => {
  assert.equal(SNAP_SCREEN_PX, 8);
  assert.equal(snapTolerance(1), 8);
  // Zoomed out to 50 %, the chrome scale is 2: a snap reaches 16 page px, which is 8 on screen.
  assert.equal(snapTolerance(2), 16);
  assert.equal(snapTolerance('1.6667'), 8 * 1.6667);
  assert.equal(snapTolerance(''), 8);
  assert.equal(snapTolerance(0), 8);
});

test('edgeSnap: the nearest line wins, by the start, the middle or the end of the box', () => {
  const targets = [{ at: 100, from: 0, to: 50 }, { at: 200, from: 10, to: 60 }];
  // A 40 px box starting at 103: its start is 3 from 100.
  assert.deepEqual(edgeSnap(103, 40, targets, 8), { d: -3, target: targets[0], edge: 'start' });
  // Starting at 177: its middle (197) is 3 from 200, closer than its end (217).
  assert.deepEqual(edgeSnap(177, 40, targets, 8), { d: 3, target: targets[1], edge: 'middle' });
  // Its end at 204: 4 from 200.
  assert.equal(edgeSnap(164, 40, targets, 8).edge, 'end');
  // Out of reach: nothing.
  assert.equal(edgeSnap(130, 40, targets, 8), null);
  assert.equal(edgeSnap(130, 40, [], 8), null);
});

test('gapSnap: the box lands beyond a pair at the pair\'s own gap, or between them with the same air on both sides', () => {
  const pair = [{ start: 0, end: 100 }, { start: 130, end: 230 }];
  // After the pair: at 260, the gap of 30 repeated.
  assert.deepEqual(gapSnap(256, 50, pair, 8), { d: 4, gaps: [{ from: 100, to: 130 }, { from: 230, to: 260 }] });
  // Before the pair: a 50 px box at -80 keeps 30 to the first.
  assert.deepEqual(gapSnap(-85, 50, pair, 8), { d: 5, gaps: [{ from: -30, to: 0 }, { from: 100, to: 130 }] });
  // Between a wider pair: 300 of room, a 100 px box, 100 of air on each side.
  const wide = [{ start: 0, end: 100 }, { start: 400, end: 500 }];
  assert.deepEqual(gapSnap(195, 100, wide, 8), { d: 5, gaps: [{ from: 100, to: 200 }, { from: 300, to: 400 }] });
  // No room between: no centring, and the order of the input does not matter.
  assert.equal(gapSnap(110, 50, [pair[1], pair[0]], 8), null);
  assert.equal(gapSnap(500, 50, pair, 8), null);
  assert.equal(gapSnap(500, 50, [pair[0]], 8), null);
});

test('lockAxis: the smaller delta is dropped', () => {
  assert.deepEqual(lockAxis(10, 3), { dx: 10, dy: 0 });
  assert.deepEqual(lockAxis(-2, 9), { dx: 0, dy: 9 });
  assert.deepEqual(lockAxis(4, 4), { dx: 4, dy: 0 });
});
