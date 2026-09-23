/**
 * Content push on the desktop canvas (ADR-0024): the Wix Editor gap rules
 * applied to every block below a block that grew.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { pushLayout, clampFitMin, fitFloorPx, FIT_BY_WIDTH, PUSH_GAP_MAX, PUSH_GAP_MIN } = await engineImport('push-model.js');

const at = (id, y, h, extra = {}) => ({ id, y, h, ...extra });

test('no growth moves nothing, and the bottom is the lowest frame edge', () => {
  const out = pushLayout([at('a', 0, 100), at('b', 150, 40)]);
  assert.equal(out.shifts.size, 0);
  assert.equal(out.bottom, 190);
});

test('a gap of PUSH_GAP_MAX or less is preserved: the block below moves the whole growth', () => {
  const out = pushLayout([at('a', 0, 100, { grow: 30 }), at('b', 100 + PUSH_GAP_MAX, 40)]);
  assert.equal(out.shifts.get('b'), 30);
  assert.equal(out.bottom, 100 + PUSH_GAP_MAX + 40 + 30);
});

test('a larger gap absorbs the growth until PUSH_GAP_MIN is left', () => {
  const below = at('b', 180, 40);
  assert.equal(pushLayout([at('a', 0, 100, { grow: 30 }), below]).shifts.has('b'), false);
  const out = pushLayout([at('a', 0, 100, { grow: 74 }), below]);
  assert.equal(out.shifts.get('b'), 74 - (80 - PUSH_GAP_MIN));
});

test('a block whose top is above the grown block\'s middle is a deliberate overlap and stays', () => {
  const out = pushLayout([at('image', 0, 200, { grow: 50 }), at('badge', 20, 40), at('caption', 150, 40)]);
  assert.equal(out.shifts.has('badge'), false);
  assert.equal(out.shifts.get('caption'), 50);
});

test('the move cascades through the blocks below', () => {
  const out = pushLayout([at('a', 0, 100, { grow: 20 }), at('b', 120, 50), at('c', 190, 50), at('d', 500, 50)]);
  assert.equal(out.shifts.get('b'), 20);
  assert.equal(out.shifts.get('c'), 20);
  assert.equal(out.shifts.has('d'), false);
});

test('two blocks side by side below both move, and a block above never moves', () => {
  const out = pushLayout([at('top', -40, 30), at('a', 0, 100, { grow: 25, x: 0 }), at('l', 120, 40, { x: 0 }), at('r', 130, 40, { x: 50 })]);
  assert.equal(out.shifts.has('top'), false);
  assert.equal(out.shifts.get('l'), 25);
  assert.equal(out.shifts.get('r'), 25);
});

test('two growing blocks give the larger shift, never the sum', () => {
  const out = pushLayout([at('a', 0, 100, { grow: 30, x: 0 }), at('b', 0, 100, { grow: 10, x: 50 }), at('c', 120, 40)]);
  assert.equal(out.shifts.get('c'), 30);
});

test('negative frames and missing fields are tolerated', () => {
  const out = pushLayout([at('a', -20, 60, { grow: 10 }), { id: 'broken' }, at('b', 50, 20)]);
  assert.equal(out.shifts.get('b'), 10);
  assert.equal(out.bottom, 80);
});

test('clampFitMin: a share of the design size between 0.01 and 1, default 0.6', () => {
  assert.equal(clampFitMin(0.4), 0.4);
  assert.equal(clampFitMin(0), 0.01);
  assert.equal(clampFitMin(3), 1);
  assert.equal(clampFitMin(undefined), 0.6);
  assert.equal(clampFitMin('x'), 0.6);
});

test('fitFloorPx: the width-floor types get their share of the design width times the floor, everything else 0', () => {
  const image = { type: 'image', fit: 'shrink', fitMin: 0.6, frames: { desktop: { x: 10, w: 40 } } };
  assert.deepEqual([...FIT_BY_WIDTH].sort(), ['icon', 'image', 'shape', 'video']);
  assert.equal(fitFloorPx(image, { contentWidth: 1440 }), 346);
  assert.equal(fitFloorPx(image, {}), 346);
  assert.equal(fitFloorPx(image, { contentWidth: 1000 }), 240);
  assert.equal(fitFloorPx({ ...image, fitMin: undefined }, {}), 346);
  assert.equal(fitFloorPx({ ...image, fit: undefined }, {}), 0);
  assert.equal(fitFloorPx({ ...image, type: 'text' }, {}), 0);
  assert.equal(fitFloorPx(image, { contentWidth: 'full' }), 0);
  assert.equal(fitFloorPx({ ...image, frames: {} }, {}), 0);
});
