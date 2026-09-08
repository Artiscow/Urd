/**
 * Contract tests for the sticky state (sticky-model.js): pinning and release are computed purely from scroll position and document measures; the DOM part in sticky.js builds only on these answers.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { stickyState, groupBox, dockPosition, nearestDock } = await engineImport('sticky-model.js');

// Default setup: section from 1000, block 200 into the section, 100 tall,
// own section bottom at 2000, pinned 16 px from the viewport top.
const m = { sectionTop: 1000, blockY: 200, blockH: 100, limitBottom: 2000, offset: 16 };

test('before the pin point: the block stays in its normal position', () => {
  assert.deepEqual(stickyState(0, m), { mode: 'static' });
  // Exactly at the pin point (block top == offset) it is still static.
  assert.deepEqual(stickyState(1000 + 200 - 16, m), { mode: 'static' });
});

test('past the pin point: fixed at the offset distance', () => {
  assert.deepEqual(stickyState(1185, m), { mode: 'fixed', top: 16 });
  assert.deepEqual(stickyState(1600, m), { mode: 'fixed', top: 16 });
});

test('at the release limit: the block parks where the limit is', () => {
  // The limit 2000: the block bottom (offset 16 + h 100 = 116 below the
  // viewport top) would cross 2000 when scrollY > 1884.
  assert.deepEqual(stickyState(1885, m), { mode: 'parked', y: 2000 - 1000 - 100 });
});

test('until in a later section: stays fixed past its own section bottom', () => {
  const longOne = { ...m, limitBottom: 5000 };
  assert.deepEqual(stickyState(2500, longOne), { mode: 'fixed', top: 16 });
  assert.deepEqual(stickyState(4900, longOne), { mode: 'parked', y: 5000 - 1000 - 100 });
});

test('offset is respected in both pin and release', () => {
  const highOffset = { ...m, offset: 80 };
  assert.deepEqual(stickyState(1000 + 200 - 80, highOffset), { mode: 'static' });
  assert.deepEqual(stickyState(1121, highOffset), { mode: 'fixed', top: 80 });
});

test('invalid/too early limit: always static', () => {
  // The limit lies ABOVE the block's natural place (parked y < blockY).
  const earlyOne = { ...m, limitBottom: 1250 };
  assert.deepEqual(stickyState(0, earlyOne), { mode: 'static' });
  assert.deepEqual(stickyState(5000, earlyOne), { mode: 'static' });
});

test('a block taller than the room between offset and limit: parks instead of pinning', () => {
  const narrowOne = { ...m, blockY: 900, blockH: 900, limitBottom: 2800 };
  // The pin point is reached, but offset 16 + height 900 never fits above
  // the limit: the block goes straight to parked without pinning.
  const state = stickyState(1900, narrowOne);
  assert.equal(state.mode, 'parked');
  assert.equal(state.y, 2800 - 1000 - 900);
});

// Group pinning: the blocks pin as ONE unit and keep their relative placement,
// instead of all stacking on top of each other at the viewport top.
test('groupBox: the bounding box of the members', () => {
  assert.deepEqual(groupBox([
    { x: 10, y: 100, w: 50, h: 20 },
    { x: 30, y: 140, w: 40, h: 60 },
  ]), { x: 10, y: 100, w: 60, h: 100 });
});

test('groupBox: a single member gives that member\'s own box', () => {
  assert.deepEqual(groupBox([{ x: 5, y: 7, w: 11, h: 13 }]), { x: 5, y: 7, w: 11, h: 13 });
});

test('groupBox: the group pins as the box, and the members keep their spacing', () => {
  const items = [{ x: 0, y: 200, w: 100, h: 40 }, { x: 0, y: 300, w: 100, h: 40 }];
  const box = groupBox(items);
  const state = stickyState(1000 + box.y - 16 + 1, { ...m, blockY: box.y, blockH: box.h });
  assert.equal(state.mode, 'fixed');
  // Member two must sit 100 px below member one, as in the section.
  assert.equal(state.top + (items[1].y - box.y) - (state.top + (items[0].y - box.y)), 100);
});

// Viewport docking: the box is placed at a fixed point in the viewport.
const VIEW = { w: 1000, h: 800 };
const BOX = { w: 200, h: 100 };

test('dockPosition: the corners are measured from their own edges', () => {
  assert.deepEqual(dockPosition('top-left', 24, BOX, VIEW), { left: 24, top: 24 });
  assert.deepEqual(dockPosition('top-right', 24, BOX, VIEW), { left: 776, top: 24 });
  assert.deepEqual(dockPosition('bottom-left', 24, BOX, VIEW), { left: 24, top: 676 });
  assert.deepEqual(dockPosition('bottom-right', 24, BOX, VIEW), { left: 776, top: 676 });
});

test('dockPosition: center axes are centered and ignore the margin', () => {
  assert.deepEqual(dockPosition('middle-center', 24, BOX, VIEW), { left: 400, top: 350 });
  assert.deepEqual(dockPosition('top-center', 24, BOX, VIEW), { left: 400, top: 24 });
  assert.deepEqual(dockPosition('middle-left', 24, BOX, VIEW), { left: 24, top: 350 });
});

test('dockPosition: the default and an invalid dock is bottom right', () => {
  assert.deepEqual(dockPosition(undefined, 0, BOX, VIEW), { left: 800, top: 700 });
  assert.deepEqual(dockPosition('', 0, BOX, VIEW), { left: 800, top: 700 });
});

test('dockPosition: a box larger than the viewport is never pushed outside', () => {
  const big = { w: 1200, h: 900 };
  const pos = dockPosition('bottom-right', 24, big, VIEW);
  assert.deepEqual(pos, { left: 0, top: 0 });
  assert.deepEqual(dockPosition('middle-center', 0, big, VIEW), { left: 0, top: 0 });
});

test('nearestDock: the center point chooses in the three-way grid', () => {
  const view = { w: 900, h: 600 };
  assert.equal(nearestDock({ left: 10, top: 10, w: 100, h: 50 }, view), 'top-left');
  assert.equal(nearestDock({ left: 750, top: 500, w: 100, h: 50 }, view), 'bottom-right');
  assert.equal(nearestDock({ left: 400, top: 275, w: 100, h: 50 }, view), 'middle-center');
  assert.equal(nearestDock({ left: 400, top: 10, w: 100, h: 50 }, view), 'top-center');
  assert.equal(nearestDock({ left: 10, top: 275, w: 100, h: 50 }, view), 'middle-left');
});

test('nearestDock: the keys match the dockPosition axes', () => {
  const view = { w: 900, h: 600 };
  const dock = nearestDock({ left: 750, top: 10, w: 100, h: 50 }, view);
  assert.equal(dock, 'top-right');
  // Round trip: the dock point from the drop gives a valid placement.
  const pos = dockPosition(dock, 24, { w: 100, h: 50 }, view);
  assert.deepEqual(pos, { left: 776, top: 24 });
});
