/**
 * Skalamatten for redigerings-lerretet (editor/src/lib/preview-scale.js):
 * bredde-drevet fitScale, previewScale klemmer «fit» til <=1 og gir «full»
 * eksakt 1, med gulv og trygge svar på umålte mål. Rene funksjoner.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fitScale, previewScale } from '../editor/src/lib/preview-scale.js';

test('fitScale: rammebredde / målbredde', () => {
  assert.ok(Math.abs(fitScale(1494, 1600) - 1494 / 1600) < 1e-9);
  assert.ok(Math.abs(fitScale(1194, 1600) - 1194 / 1600) < 1e-9);
});

test('fitScale: umålte/ugyldige mål gir 1', () => {
  assert.equal(fitScale(0, 1600), 1);
  assert.equal(fitScale(1494, 0), 1);
  assert.equal(fitScale(NaN, 1600), 1);
});

test('previewScale fit: aldri over 1 (ingen oppskalering)', () => {
  // Ramme bredere enn målet -> ville gitt >1, klemmes til 1.
  assert.equal(previewScale(2000, 1280, 'fit'), 1);
  // Ramme smalere enn målet -> nedskalering.
  assert.ok(Math.abs(previewScale(1494, 1600, 'fit') - 1494 / 1600) < 1e-9);
});

test('previewScale full: alltid eksakt 1:1', () => {
  assert.equal(previewScale(400, 1600, 'full'), 1);
  assert.equal(previewScale(3000, 1600, 'full'), 1);
});

test('previewScale: gulv 0.1 hindrer scale(0) / uendelig smått', () => {
  assert.equal(previewScale(0, 1600, 'fit'), 1);           // umålt -> fitScale 1
  assert.equal(previewScale(10, 100000, 'fit'), 0.1);      // absurd smal ramme -> gulv
});
