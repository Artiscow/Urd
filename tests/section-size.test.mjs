/**
 * Contract tests for the top-edge drag (section-size.js): the section
 * grows/shrinks at the top and the blocks follow along, with clamps so
 * that content never ends up above the section top and the section never
 * gets smaller than the minimum height.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { topDrag } = await engineImport('section-size.js');

const grid = { size: 8 };

test('drag up: minHeight grows and the blocks move down, in grid steps', () => {
  const r = topDrag({ dyPointer: -50, minHeightPx: 400, blockYs: [40, 120], grid });
  // 50 px up snaps to 48 (the nearest step of 8).
  assert.equal(r.dy, 48);
  assert.equal(r.minHeightPx, 448);
});

test('drag down: clamped against the lowest block y (no block above the top)', () => {
  const r = topDrag({ dyPointer: 200, minHeightPx: 400, blockYs: [40, 120], grid });
  assert.equal(r.dy, -40);
  assert.equal(r.minHeightPx, 360);
});

test('drag down: clamped against the minimum height (grid.size * 3)', () => {
  const r = topDrag({ dyPointer: 500, minHeightPx: 60, blockYs: [400], grid });
  // The height room is 60 - 24 = 36; the block room 400. The smallest wins.
  assert.equal(r.dy, -36);
  assert.equal(r.minHeightPx, 24);
});

test('a block hanging above the top (negative y) stops shrinking entirely', () => {
  const r = topDrag({ dyPointer: 100, minHeightPx: 400, blockYs: [-30, 200], grid });
  assert.equal(r.dy, 0);
  assert.equal(r.minHeightPx, 400);
});

test('Shift/free: pixel-exact without snapping', () => {
  const r = topDrag({ dyPointer: -50, minHeightPx: 400, blockYs: [40], grid, free: true });
  assert.equal(r.dy, 50);
  assert.equal(r.minHeightPx, 450);
});

test('empty section: only the minimum height clamps', () => {
  const r = topDrag({ dyPointer: 900, minHeightPx: 200, blockYs: [], grid });
  assert.equal(r.dy, -(200 - 24));
  assert.equal(r.minHeightPx, 24);
});

test('snap turned off in the grid also gives pixel precision', () => {
  const r = topDrag({ dyPointer: -13, minHeightPx: 400, blockYs: [], grid: { size: 8, snap: false } });
  assert.equal(r.dy, 13);
  assert.equal(r.minHeightPx, 413);
});
