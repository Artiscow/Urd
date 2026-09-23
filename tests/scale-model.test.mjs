/**
 * Proportional scaling below the design width (ADR-0018 addendum): the
 * factor, the floor, the hand-off width and the effective breakpoint.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { pageScale, scaleFloorWidth, scaleSettings, SCALE_MIN, SCALE_MAX, SCALE_DEFAULT_MIN } =
  await engineImport('scale-model.js');

const layout = { contentWidth: 1440, gutter: 6, scale: { mode: 'scale', min: 0.75 } };

test('scaleSettings: an omitted field is fixed, the floor is clamped and defaulted', () => {
  assert.deepEqual(scaleSettings(undefined), { mode: 'fixed', min: SCALE_DEFAULT_MIN });
  assert.deepEqual(scaleSettings({ scale: { mode: 'scale' } }), { mode: 'scale', min: SCALE_DEFAULT_MIN });
  assert.equal(scaleSettings({ scale: { mode: 'scale', min: 0.1 } }).min, SCALE_MIN);
  assert.equal(scaleSettings({ scale: { mode: 'scale', min: 3 } }).min, SCALE_MAX);
  assert.equal(scaleSettings({ scale: { mode: 'other' } }).mode, 'fixed');
});

test('pageScale: 1 at and above the binding width, the ratio in the band, never under the floor', () => {
  assert.equal(pageScale(1920, layout), 1);
  assert.equal(pageScale(1637, layout), 1);
  // 1280 * 0.88 = 1126.4 -> 0.7822
  assert.equal(pageScale(1280, layout), 0.7822);
  assert.equal(pageScale(1000, layout), 0.75);
  assert.equal(pageScale(320, layout), 0.75);
});

test('pageScale: fixed mode and an unbound width always give 1', () => {
  assert.equal(pageScale(1000, { contentWidth: 1440, gutter: 6 }), 1);
  assert.equal(pageScale(1000, { ...layout, scale: { mode: 'fixed', min: 0.6 } }), 1);
  assert.equal(pageScale(1000, { ...layout, contentWidth: 'full' }), 1);
});

test('scaleFloorWidth: the defaults reach the floor at 1228 px, fixed mode never', () => {
  assert.equal(scaleFloorWidth(layout), 1228);
  assert.equal(scaleFloorWidth({ ...layout, gutter: 0 }), 1080);
  assert.equal(scaleFloorWidth({ ...layout, scale: { mode: 'scale', min: 0.5 } }), 819);
  assert.equal(scaleFloorWidth({ contentWidth: 1440, gutter: 6 }), 0);
  assert.equal(pageScale(scaleFloorWidth(layout) - 200, layout), 0.75);
});
