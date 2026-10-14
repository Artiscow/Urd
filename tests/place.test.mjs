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

const { toolbarAnchor } = await engineImport('place.js');

test('toolbarAnchor: an unrotated block anchors at its own corner', () => {
  assert.deepEqual(toolbarAnchor(200, 100, 0, false), { left: 0, top: 0 });
  assert.deepEqual(toolbarAnchor(200, 100, 0, true), { left: 0, top: 100 });
});

test('toolbarAnchor: a rotated block anchors at the screen bounding box, carried back through the rotation', () => {
  // The anchor rotated forward about the centre must land on the bounding box's corner.
  const onScreen = (w, h, deg, p) => {
    const t = (deg * Math.PI) / 180;
    const x = p.left - w / 2;
    const y = p.top - h / 2;
    return { x: x * Math.cos(t) - y * Math.sin(t), y: x * Math.sin(t) + y * Math.cos(t) };
  };
  for (const deg of [-15, 15, 45, -90, 120, 180]) {
    const w = 300;
    const h = 80;
    const t = (deg * Math.PI) / 180;
    const bw = w * Math.abs(Math.cos(t)) + h * Math.abs(Math.sin(t));
    const bh = w * Math.abs(Math.sin(t)) + h * Math.abs(Math.cos(t));
    const top = onScreen(w, h, deg, toolbarAnchor(w, h, deg, false));
    assert.ok(Math.abs(top.x + bw / 2) < 0.02 && Math.abs(top.y + bh / 2) < 0.02, `top at ${deg}°`);
    const under = onScreen(w, h, deg, toolbarAnchor(w, h, deg, true));
    assert.ok(Math.abs(under.x + bw / 2) < 0.02 && Math.abs(under.y - bh / 2) < 0.02, `under at ${deg}°`);
  }
});
