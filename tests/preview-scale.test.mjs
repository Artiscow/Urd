/**
 * The scale math for the editing canvas (editor/src/lib/preview-scale.js):
 * width-driven fitScale, previewScale clamps "fit" to <=1 and gives "full"
 * exactly 1, with a floor and safe answers for unmeasured dimensions. Pure
 * functions.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fitScale, previewScale } from '../editor/src/lib/preview-scale.js';

test('fitScale: frame width / target width', () => {
  assert.ok(Math.abs(fitScale(1494, 1600) - 1494 / 1600) < 1e-9);
  assert.ok(Math.abs(fitScale(1194, 1600) - 1194 / 1600) < 1e-9);
});

test('fitScale: unmeasured/invalid dimensions give 1', () => {
  assert.equal(fitScale(0, 1600), 1);
  assert.equal(fitScale(1494, 0), 1);
  assert.equal(fitScale(NaN, 1600), 1);
});

test('previewScale fit: never above 1 (no upscaling)', () => {
  // Frame wider than the target -> would give >1, clamped to 1.
  assert.equal(previewScale(2000, 1280, 'fit'), 1);
  // Frame narrower than the target -> downscaling.
  assert.ok(Math.abs(previewScale(1494, 1600, 'fit') - 1494 / 1600) < 1e-9);
});

test('previewScale full: always exactly 1:1', () => {
  assert.equal(previewScale(400, 1600, 'full'), 1);
  assert.equal(previewScale(3000, 1600, 'full'), 1);
});

test('previewScale: the 0.1 floor prevents scale(0) / infinitely small', () => {
  assert.equal(previewScale(0, 1600, 'fit'), 1);           // unmeasured -> fitScale 1
  assert.equal(previewScale(10, 100000, 'fit'), 0.1);      // absurdly narrow frame -> floor
});

// Device mode (ADR-0018): the target viewport has both width and height, and
// the scale adapts to both axes, so the fold matches what the visitor sees.

test('device mode: the TIGHTEST axis decides the scale', () => {
  // The width would give 0.8, the height 0.5 -> the height wins (bars on the sides).
  assert.equal(previewScale(800, 1000, 'fit', 400, 800), 0.5);
  // The other way: the width is tightest -> bars above and below.
  assert.equal(previewScale(500, 1000, 'fit', 800, 800), 0.5);
});

test('device mode never scales up, even when both axes have slack', () => {
  assert.equal(previewScale(2000, 1000, 'fit', 2000, 800), 1);
});

test('targetH 0 is fill mode: the scale stays purely width-driven', () => {
  // The same answer with and without height arguments, so old calls are unchanged.
  assert.equal(previewScale(800, 1000, 'fit', 100, 0), previewScale(800, 1000, 'fit'));
  assert.equal(previewScale(800, 1000, 'fit', 100, 0), 0.8);
});

test('full is 1:1 regardless of the height target', () => {
  assert.equal(previewScale(400, 1600, 'full', 200, 800), 1);
});
