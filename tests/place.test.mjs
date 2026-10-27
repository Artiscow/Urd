/**
 * Contract tests for click placement (place.js): "+ New block" where you
 * click must center the frame on the point, clamp within the section and
 * snap to the grid.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { frameAtPoint, menuFit, shiftInto, flyoutFit } = await engineImport('place.js');

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

test('the block menu hangs down while it fits, and turns up or holds to the room when it does not', () => {
  const at = { anchorTop: 100, anchorBottom: 130, gap: 6, viewport: 800 };
  assert.deepEqual(menuFit({ ...at, height: 340 }), { up: false, room: null });
  // Low on the screen: more room above, and the menu fits there whole.
  assert.deepEqual(menuFit({ ...at, anchorTop: 600, anchorBottom: 630, height: 340 }), { up: true, room: null });
  // A short screen: the larger side wins, and the menu is held to it.
  assert.deepEqual(menuFit({ ...at, anchorTop: 150, anchorBottom: 180, viewport: 420, height: 340 }), { up: false, room: 226 });
  assert.deepEqual(menuFit({ ...at, anchorTop: 250, anchorBottom: 280, viewport: 420, height: 340 }), { up: true, room: 236 });
  // Never held below the least height.
  assert.deepEqual(menuFit({ ...at, anchorTop: 60, anchorBottom: 90, viewport: 200, height: 340, min: 160 }), { up: false, room: 160 });
});

test('a box is moved sideways just enough to stay on the screen', () => {
  assert.equal(shiftInto(100, 300, 1000), 0);
  assert.equal(shiftInto(-40, 300, 1000), 48);
  assert.equal(shiftInto(800, 300, 1000), -108);
  // Wider than the screen: the left edge stays in view.
  assert.equal(shiftInto(20, 1200, 1000), -12);
});

test('the slim menu\'s side panel opens right, turns left at the edge, and stays above the bottom', () => {
  const base = { menuLeft: 100, menuRight: 340, rowTop: 200, width: 220, height: 190, viewportW: 1200, viewportH: 800, gap: 6 };
  assert.deepEqual(flyoutFit(base), { left: false, top: 200, room: null });
  assert.equal(flyoutFit({ ...base, menuLeft: 900, menuRight: 1140 }).left, true);
  // No room on either side: the side with more room.
  assert.equal(flyoutFit({ ...base, menuLeft: 100, menuRight: 340, viewportW: 500 }).left, false);
  assert.equal(flyoutFit({ ...base, rowTop: 700 }).top, 602);
  assert.deepEqual(flyoutFit({ ...base, height: 900 }), { left: false, top: 8, room: 784 });
});
