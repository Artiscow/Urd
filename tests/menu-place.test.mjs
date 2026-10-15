/**
 * The floating element menu's place (editor/src/lib/menu-place.js,
 * 0.7.20.6): beside the block, to the right, else to the left, else below,
 * never over it where the window allows; and a dragged place clamped into
 * the window.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeBesideBlock, clampPlace } from '../editor/src/lib/menu-place.js';

const VIEW = { w: 1600, h: 1000 };
const SIZE = { w: 400, h: 600 };

test('placeBesideBlock: to the right when there is room, at the block\'s top', () => {
  const block = { left: 300, top: 200, right: 600, bottom: 400 };
  assert.deepEqual(placeBesideBlock(block, SIZE, VIEW), { left: 612, top: 200, side: 'right' });
});

test('placeBesideBlock: to the left when the right has no room', () => {
  const block = { left: 1000, top: 200, right: 1500, bottom: 400 };
  assert.deepEqual(placeBesideBlock(block, SIZE, VIEW), { left: 588, top: 200, side: 'left' });
});

test('placeBesideBlock: below when neither side is free of the block', () => {
  const block = { left: 100, top: 50, right: 1500, bottom: 200 };
  const place = placeBesideBlock(block, SIZE, VIEW);
  assert.equal(place.side, 'below');
  assert.equal(place.top, 212);
  assert.equal(place.left, 100);
});

test('placeBesideBlock: the admin\'s panels keep the left edge, and the top is clamped to the window', () => {
  const block = { left: 1000, top: 900, right: 1500, bottom: 980 };
  const place = placeBesideBlock(block, SIZE, VIEW, { min: 300 });
  assert.ok(place.left >= 300);
  assert.ok(place.top + SIZE.h <= VIEW.h - 8);
});

test('placeBesideBlock: a block filling the window gets the place that covers the least of it', () => {
  const block = { left: 0, top: 0, right: 1600, bottom: 1000 };
  const place = placeBesideBlock(block, SIZE, VIEW);
  assert.ok(['right', 'left', 'below'].includes(place.side));
  assert.ok(place.left >= 8 && place.top >= 8);
});

test('clampPlace: a dragged place stays inside the window and clear of the panels', () => {
  assert.deepEqual(clampPlace({ left: -50, top: -20 }, SIZE, VIEW, 240), { left: 240, top: 8 });
  assert.deepEqual(clampPlace({ left: 5000, top: 5000 }, SIZE, VIEW, 240), { left: 1192, top: 392 });
  assert.deepEqual(clampPlace({ left: 700, top: 100 }, SIZE, VIEW, 240), { left: 700, top: 100 });
});
