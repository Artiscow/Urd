/**
 * The floating element menu's place (editor/src/lib/menu-place.js,
 * 0.7.20.6): beside the block, to the right, else to the left, else below,
 * never over it where the window allows; and a dragged place clamped into
 * the window. Whether the wide menu gives way to one column beside its
 * block (wideFits, givesWay).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeBesideBlock, clampPlace, wideFits, givesWay, placeByTab, placeTextBar } from '../editor/src/lib/menu-place.js';

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

test('wideFits: the wide menu stands beside the block where it covers none of it or a sliver, and gives way to one column where that covers clearly less', () => {
  const view = { w: 1024, h: 768 };
  const wide = { w: 660, h: 600 };
  const narrow = { w: 400, h: 600 };
  // A small block at the left of a wide window: the wide menu stands to its right.
  assert.equal(wideFits({ left: 320, top: 200, right: 420, bottom: 300 }, wide, narrow, { w: 1500, h: 900 }, { min: 308 }), true);
  // A block in a narrow canvas: the wide menu covers it wherever it stands, and one column covers less.
  assert.equal(wideFits({ left: 680, top: 300, right: 1000, bottom: 420 }, wide, narrow, view, { min: 308 }), false);
  // A sliver of the block under the wide menu, less than a tenth of it, keeps the wide form.
  const sliver = { left: 320, top: 200, right: 850, bottom: 400 };
  assert.ok(placeBesideBlock(sliver, wide, { w: 1500, h: 900 }, { min: 308 }).left < sliver.right, 'the wide menu reaches over the block\'s edge');
  assert.equal(wideFits(sliver, wide, narrow, { w: 1500, h: 900 }, { min: 308 }), true);
  // Where one column would cover as much (a window too small for either beside a small block), the wide menu keeps its form.
  assert.equal(wideFits({ left: 100, top: 100, right: 150, bottom: 150 }, wide, narrow, { w: 420, h: 640 }), true);
});

test('wideFits: the tenth of the block decides, on both sides of it', () => {
  const view = { w: 1500, h: 900 };
  const wide = { w: 660, h: 600 };
  const narrow = { w: 400, h: 600 };
  // The wide menu clamped at the window's right reaches over the block's right edge, and one column stands clear of it: 44 of 556 px (8 %) keeps the wide form, 70 of 582 px (12 %) gives way.
  assert.equal(wideFits({ left: 320, top: 200, right: 876, bottom: 400 }, wide, narrow, view, { min: 308 }), true);
  assert.equal(wideFits({ left: 320, top: 200, right: 902, bottom: 400 }, wide, narrow, view, { min: 308 }), false);
});

test('givesWay: only a wide menu beside a block gives way, never a section\'s or a dragged one', () => {
  const view = { w: 1024, h: 768 };
  const block = { left: 680, top: 300, right: 1000, bottom: 420 };
  const opts = { wide: true, wideW: 660, narrowW: 400, h: 600, min: 308 };
  assert.equal(givesWay(block, view, opts), true);
  assert.equal(givesWay(block, view, { ...opts, section: true }), false, 'a section spans the canvas and keeps the form');
  assert.equal(givesWay(block, view, { ...opts, dragged: true }), false, 'a menu the owner dragged keeps its form');
  assert.equal(givesWay(block, view, { ...opts, wide: false }), false, 'a menu not wide has nothing to give');
  assert.equal(givesWay(null, view, opts), false, 'without the canvas there is no block to keep clear');
  assert.equal(givesWay({ left: 320, top: 200, right: 420, bottom: 300 }, { w: 1500, h: 900 }, opts), false, 'with room beside the block it stays wide');
});

test('a window opened from a tab stands under a tab, beside an icon or a word, at the top right from nowhere, and inside the window', () => {
  const view = { w: 1400, h: 900 };
  const size = { w: 380, h: 420 };
  const tab = { left: 600, top: 48, right: 680, bottom: 80 };
  assert.deepEqual(placeByTab(tab, size, view), { left: 600, top: 86 });
  const icon = { left: 6, top: 700, right: 46, bottom: 740 };
  assert.deepEqual(placeByTab(icon, size, view, { beside: true }), { left: 52, top: 472 }, 'beside, lifted to stay inside');
  assert.deepEqual(placeByTab(null, size, view), { left: 1004, top: 64 });
  assert.deepEqual(placeByTab({ left: 1300, top: 48, right: 1380, bottom: 80 }, size, view), { left: 1012, top: 86 }, 'kept inside the right edge');
});

test('placeTextBar: beside the canvas where the stage has room, on the side with more of it, level with the block; else above it, or below where there is none above', () => {
  const stage = { left: 400, top: 100, right: 1900, bottom: 1000 };
  const size = { w: 420, h: 110 };
  // A phone in the stage's middle: the left on a tie, level with the block.
  const phone = { left: 960, right: 1340 };
  const block = { left: 980, top: 400, right: 1320, bottom: 480 };
  assert.deepEqual(placeTextBar(block, size, phone, stage), { left: 960 - 12 - 420, top: 400, side: 'left' });
  // More room on the right: there.
  assert.deepEqual(placeTextBar(block, size, { left: 700, right: 1080 }, stage), { left: 1092, top: 400, side: 'right' });
  // A block scrolled up past the stage's top: the bar stays inside the stage.
  assert.equal(placeTextBar({ ...block, top: 20 }, size, phone, stage).top, 108);
  // A canvas filling the stage: above the block, kept inside the stage's width.
  const wide = { left: 400, right: 1900 };
  assert.deepEqual(placeTextBar({ left: 1700, top: 400, right: 1850, bottom: 480 }, size, wide, stage), { left: 1900 - 8 - 420, top: 400 - 12 - 110, side: 'above' });
  // No room above: below the block.
  assert.deepEqual(placeTextBar({ left: 600, top: 150, right: 900, bottom: 300 }, size, wide, stage), { left: 600, top: 312, side: 'below' });
});
