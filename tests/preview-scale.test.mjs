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

// Enhetsmodus (ADR-0018): mål-viewporten har både bredde og høyde, og
// skalaen tilpasses begge akser, så folden stemmer med det besøkende ser.

test('enhetsmodus: den STRAMMESTE aksen bestemmer skalaen', () => {
  // Bredden ville gitt 0.8, høyden 0.5 -> høyden vinner (bar på sidene).
  assert.equal(previewScale(800, 1000, 'fit', 400, 800), 0.5);
  // Motsatt: bredden er strammest -> bar over og under.
  assert.equal(previewScale(500, 1000, 'fit', 800, 800), 0.5);
});

test('enhetsmodus skalerer aldri opp, selv når begge akser har overskudd', () => {
  assert.equal(previewScale(2000, 1000, 'fit', 2000, 800), 1);
});

test('targetH 0 er fyll-modus: skalaen forblir rent bredde-drevet', () => {
  // Samme svar med og uten høydeargumenter, så gamle kall er uendret.
  assert.equal(previewScale(800, 1000, 'fit', 100, 0), previewScale(800, 1000, 'fit'));
  assert.equal(previewScale(800, 1000, 'fit', 100, 0), 0.8);
});

test('full er 1:1 uansett høydemål', () => {
  assert.equal(previewScale(400, 1600, 'full', 200, 800), 1);
});
