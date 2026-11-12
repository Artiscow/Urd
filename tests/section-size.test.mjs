/**
 * Contract tests for the seam grip (section-size.js seamDrag): the pill grows the section above as it is dragged down and the section below at its top as it is dragged up, the tabs shrink the section they stand in and stop at its content unless Alt is held, and a section that changes at its top takes its blocks with it.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { seamDrag } = await engineImport('section-size.js');

const grid = { size: 8 };
const above = { heightPx: 560, contentBottom: 400 };
const below = { heightPx: 520, blockYs: [72, 160] };

test('the pill dragged down grows the section above, in grid steps', () => {
  const r = seamDrag({ part: 'grow', dyPointer: 50, above, below, grid });
  assert.equal(r.side, 'above');
  // 50 px snaps to 48, the nearest step of 8.
  assert.equal(r.heightPx, 608);
  assert.equal(r.dy, 0);
});

test('the pill dragged up grows the section below at its top, its blocks moving down with it', () => {
  const r = seamDrag({ part: 'grow', dyPointer: -40, above, below, grid });
  assert.equal(r.side, 'below');
  assert.equal(r.heightPx, 560);
  assert.equal(r.dy, 40);
});

test('the pill never shrinks: a seam with one section grows only that one', () => {
  assert.equal(seamDrag({ part: 'grow', dyPointer: -40, above, below: null, grid }).side, null, 'the last seam has nothing below to grow');
  assert.equal(seamDrag({ part: 'grow', dyPointer: 40, above: null, below, grid }).side, null, 'the first seam has nothing above to grow');
  assert.equal(seamDrag({ part: 'grow', dyPointer: 2, above, below, grid }).side, null, 'a drag under half a step changes nothing');
});

test('the tab above shrinks the section above and stops at its lowest element', () => {
  const some = seamDrag({ part: 'shrinkAbove', dyPointer: -80, above, below, grid });
  assert.deepEqual([some.side, some.heightPx, some.stopped, some.overlaps], ['above', 480, false, false]);
  const far = seamDrag({ part: 'shrinkAbove', dyPointer: -400, above, below, grid });
  assert.deepEqual([far.heightPx, far.stopped, far.overlaps], [400, true, false]);
  assert.equal(seamDrag({ part: 'shrinkAbove', dyPointer: 80, above, below, grid }).heightPx, 560, 'dragged down it does nothing');
});

test('with Alt the tab above passes the content, down to the minimum height', () => {
  const r = seamDrag({ part: 'shrinkAbove', dyPointer: -900, above, below, grid, past: true });
  assert.equal(r.heightPx, 24);
  assert.equal(r.overlaps, true);
});

test('the tab below shrinks the section below at its top, its blocks moving up, and stops where the topmost meets the edge', () => {
  const some = seamDrag({ part: 'shrinkBelow', dyPointer: 40, above, below, grid });
  assert.deepEqual([some.side, some.heightPx, some.dy, some.stopped], ['below', 480, -40, false]);
  const far = seamDrag({ part: 'shrinkBelow', dyPointer: 300, above, below, grid });
  assert.deepEqual([far.heightPx, far.dy, far.stopped, far.overlaps], [448, -72, true, false]);
});

test('with Alt the tab below lets the blocks hang above the section top', () => {
  const r = seamDrag({ part: 'shrinkBelow', dyPointer: 120, above, below, grid, past: true });
  assert.equal(r.dy, -120);
  assert.equal(r.overlaps, true);
});

test('a block already hanging above the top stops the tab below without Alt', () => {
  const r = seamDrag({ part: 'shrinkBelow', dyPointer: 80, above, below: { heightPx: 400, blockYs: [-16, 100] }, grid });
  assert.equal(r.dy, 0);
  assert.equal(r.stopped, true);
});

test('Ctrl or Cmd, or a grid without snapping, gives a free height', () => {
  assert.equal(seamDrag({ part: 'grow', dyPointer: 13, above, below, grid, free: true }).heightPx, 573);
  assert.equal(seamDrag({ part: 'grow', dyPointer: 13, above, below, grid: { size: 8, snap: false } }).heightPx, 573);
});

test('no section is ever smaller than three grid steps', () => {
  const r = seamDrag({ part: 'shrinkBelow', dyPointer: 500, above, below: { heightPx: 60, blockYs: [] }, grid });
  assert.equal(r.heightPx, 24);
});
