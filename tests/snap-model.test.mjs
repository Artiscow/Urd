/**
 * The snapping rules of the canvas (snap-model.js, 0.7.10): the
 * tolerance that follows the zoom, the edge and centre lines, the equal gaps,
 * the axis lock, the guides' shares and the marks a drag shows.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { SNAP_SCREEN_PX, snapTolerance, edgeSnap, gapSnap, lockAxis, GRID_LOOKS, gridLookOf, gridLine, SNAP_SHARES, guideShares, strongShare, dragMarks, measureAt } = await engineImport('snap-model.js');

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


test('edgeSnap: a preferred line within reach wins over a nearer one, so a box can be centred', () => {
  const quarter = { at: 352, from: 0, to: 600, surface: true };
  const mid = { at: 704, from: 0, to: 600, surface: true, prefer: true };
  // A box 699 px wide: its start is 1 px from the quarter, its middle 3.5 px from the midline.
  assert.equal(edgeSnap(351, 699, [quarter, mid], 8).target, mid);
  assert.equal(edgeSnap(351, 699, [quarter, { ...mid, prefer: false }], 8).target, quarter, 'without the mark the nearest wins');
  // Its start 7 px from the quarter, its middle 9.5 px from the midline.
  assert.equal(edgeSnap(345, 699, [quarter, mid], 8).target, quarter, 'out of reach the midline does not pull');
  // A neighbour's edge 1 px from the box's start beats the midline 3.5 px from its middle: aligning with a block stays in reach.
  const neighbour = { at: 352, from: 700, to: 900 };
  assert.equal(edgeSnap(351, 699, [neighbour, mid], 8).target, neighbour);
});

test('gridLine: the grid counted out from the middle, so a line stands on the centre at every width and cell size, the part cells at the two edges are equal, and an even number of cells can stand centred', () => {
  for (const step of [1.11, 2.5, 3.7, 6.25, 13]) {
    assert.equal(gridLine(50, step), 50, `${step}: a line on the centre`);
    assert.equal(gridLine(50 + step * 3 + step * 0.4, step), 50 + step * 3, `${step}: the nearest line to the right`);
    assert.equal(gridLine(50 - step * 2 - step * 0.4, step), 50 - step * 2, `${step}: the nearest line to the left`);
    // The lines nearest the two edges stand as far in from each.
    const first = 50 - Math.floor(50 / step) * step;
    const last = 50 + Math.floor(50 / step) * step;
    assert.ok(Math.abs(first - (100 - last)) < 1e-9, `${step}: the part cells at the edges are equal`);
    // A block of twelve cells, snapped where it is held a little off the middle, stands centred.
    const w = 12 * step;
    const x = gridLine(50 - w / 2 + step * 0.3, step);
    assert.ok(Math.abs(x + w / 2 - 50) < 1e-9, `${step}: twelve cells centred`);
  }
});

test('the grid\'s looks: lines, the default, dots, and in a drag only; anything else reads as lines', () => {
  assert.deepEqual(GRID_LOOKS, ['lines', 'dots', 'drag']);
  for (const look of GRID_LOOKS) assert.equal(gridLookOf(look), look);
  assert.equal(gridLookOf(null), 'lines');
  assert.equal(gridLookOf('columns'), 'lines');
});

test('the guides\' shares: the twelfths on the desktop with the quarters, thirds and half strong, the quarters on the phone; a block snaps to the strong ones', () => {
  const desk = guideShares(false);
  assert.equal(desk.length, 11);
  assert.deepEqual(desk.filter(strongShare).map((s) => Math.round(s * 100)), [25, 33, 50, 67, 75]);
  assert.deepEqual(guideShares(true), [0.25, 0.5, 0.75]);
  assert.deepEqual(SNAP_SHARES.map((s) => Math.round(s * 100)), [25, 33, 50, 67, 75]);
});

test('dragMarks: a centre line runs through the block and on to the nearest block it lines up with, a notch on that block\'s facing edge', () => {
  // A card centred under one picture, a second block further below on the same centre.
  const marks = dragMarks(690, 201, { from: 430, to: 531 }, [{ at: 790.5, from: 156, to: 356 }, { at: 790.5, from: 700, to: 800 }]);
  assert.deepEqual(marks, [{ at: 790.5, part: 'middle', from: 356, to: 531, notch: 356 }]);
  // A centre on a line of the content alone: the line spans the block, no further.
  assert.deepEqual(dragMarks(490, 221, { from: 308, to: 352 }, [{ at: 600.5, from: 0, to: 680, share: 0.5 }]), [{ at: 600.5, part: 'middle', from: 308, to: 352, share: 0.5 }]);
  assert.deepEqual(dragMarks(10, 20, { from: 0, to: 10 }, [{ at: 500, from: 0, to: 600 }]), [], 'no line, nothing drawn');
});

test('dragMarks: an edge line spans the block and every block it lines up with, and keeps a share it stands on', () => {
  const marks = dragMarks(600, 210, { from: 386, to: 566 }, [{ at: 600, from: 156, to: 356 }, { at: 600, from: 0, to: 680, share: 0.5 }]);
  assert.deepEqual(marks, [{ at: 600, part: 'start', from: 156, to: 566, share: 0.5 }]);
  const end = dragMarks(100, 50, { from: 0, to: 40 }, [{ at: 150, from: 60, to: 90 }]);
  assert.deepEqual(end, [{ at: 150, part: 'end', from: 0, to: 90 }]);
});

test('measureAt: a gap\'s measure stands on the guide nearest the middle of its span, a strong one first, else at the middle', () => {
  const lines = guideShares(false).map((share) => ({ at: 100 + 1000 * share, strong: strongShare(share) }));
  assert.equal(measureAt(490, 711, lines), 600);
  assert.equal(Math.round(measureAt(100, 500, lines)), 350, 'the strong 25 % before the nearer faint lines');
  assert.equal(measureAt(10, 50, lines), 30, 'no line inside, the middle');
  assert.equal(measureAt(10, 50), 30);
});
