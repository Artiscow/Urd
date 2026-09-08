/**
 * Contract tests for click placement (place.js): "+ New block" where you
 * click must center the frame on the point, clamp within the section and
 * snap to the grid.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { frameAtPoint } = await engineImport('place.js');

const grid = { size: 8 };

test('centered on the click point, snapped to the grid', () => {
  const pos = frameAtPoint({ x: 50, y: 200, w: 30, h: 100, grid });
  assert.equal(pos.x, 35);
  // 200 - 50 = 150, snapped to the nearest step of 8 (152).
  assert.equal(pos.y, 152);
});

test('clamped against the left and right edge', () => {
  assert.equal(frameAtPoint({ x: 2, y: 100, w: 30, h: 40, grid }).x, 0);
  assert.equal(frameAtPoint({ x: 99, y: 100, w: 30, h: 40, grid }).x, 70);
});

test('y never below 0 (click near the section top)', () => {
  assert.equal(frameAtPoint({ x: 50, y: 10, w: 20, h: 200, grid }).y, 0);
});

test('snapping off: pixel-exact', () => {
  const pos = frameAtPoint({ x: 50, y: 203, w: 30, h: 100, grid: { size: 8, snap: false } });
  assert.equal(pos.y, 153);
  const pos2 = frameAtPoint({ x: 50, y: 203, w: 30, h: 100, grid, snap: false });
  assert.equal(pos2.y, 153);
});

test('wider than the section: x is clamped to 0', () => {
  assert.equal(frameAtPoint({ x: 50, y: 100, w: 120, h: 40, grid }).x, 0);
});

test('x is rounded to two decimals', () => {
  const pos = frameAtPoint({ x: 33.333, y: 100, w: 10, h: 40, grid });
  assert.equal(pos.x, 28.33);
});
