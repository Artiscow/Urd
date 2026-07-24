/**
 * Kontraktstester for typografilogikken i tekst-verktøylinjen
 * (text-typo.js): størrelsesklemming, innrykkssteg og fontstack-match.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SIZE_MIN, SIZE_MAX, clampSize, stepSize, ladderStep, SIZE_LADDER,
  LINE_HEIGHTS, stepIndent, firstFamily, matchFontStack,
} from '../template/assets/engine/text-typo.js';

test('clampSize: runder, klemmer og avviser ugyldig', () => {
  assert.equal(clampSize(16.6), 17);
  assert.equal(clampSize(4), SIZE_MIN);
  assert.equal(clampSize(500), SIZE_MAX);
  assert.equal(clampSize(NaN), null);
  assert.equal(clampSize('abc'), null);
});

test('stepSize: stepper og stopper i grensene', () => {
  assert.equal(stepSize(16, 1), 17);
  assert.equal(stepSize(16, -1), 15);
  assert.equal(stepSize(SIZE_MIN, -1), SIZE_MIN);
  assert.equal(stepSize(SIZE_MAX, 1), SIZE_MAX);
});

test('ladderStep: hopper til nærmeste trinn i retningen, klemmer i endene', () => {
  assert.equal(ladderStep(12, 1), 14);
  assert.equal(ladderStep(12, -1), 11);
  // Verdi mellom trinn runder til neste trinn i retningen.
  assert.equal(ladderStep(13, 1), 14);
  assert.equal(ladderStep(13, -1), 12);
  assert.equal(ladderStep(SIZE_LADDER[0], -1), SIZE_MIN);
  assert.equal(ladderStep(SIZE_MAX, 1), SIZE_MAX);
});

test('stepIndent: 2em-steg, tom streng ved null, tak ved 16em', () => {
  assert.equal(stepIndent('', 1), '2em');
  assert.equal(stepIndent('2em', 1), '4em');
  assert.equal(stepIndent('4em', -1), '2em');
  assert.equal(stepIndent('2em', -1), '');
  assert.equal(stepIndent('', -1), '');
  assert.equal(stepIndent('16em', 1), '16em');
});

test('stepIndent: verdier i andre enheter nullstilles og steppes fra 0', () => {
  assert.equal(stepIndent('40px', 1), '2em');
  assert.equal(stepIndent('40px', -1), '');
});

test('firstFamily: første fontnavn uten fnutter, små bokstaver', () => {
  assert.equal(firstFamily("'Courier New', monospace"), 'courier new');
  assert.equal(firstFamily('Arial, Helvetica, sans-serif'), 'arial');
  assert.equal(firstFamily('"Trebuchet MS"'), 'trebuchet ms');
  assert.equal(firstFamily(''), '');
});

test('matchFontStack: kjent stack matches på første fontnavn, ukjent gir Arv', () => {
  assert.equal(matchFontStack('Verdana, Geneva, sans-serif'), 'Verdana, Geneva, sans-serif');
  // Beregnet stil kan mangle resten av stacken; første navn holder.
  assert.equal(matchFontStack('"Courier New"'), "'Courier New', monospace");
  assert.equal(matchFontStack('"Comic Sans MS", cursive'), '');
  assert.equal(matchFontStack(''), '');
});

test('LINE_HEIGHTS: fem valg der første er Arv (UI-kontrakten)', () => {
  assert.equal(LINE_HEIGHTS.length, 5);
  assert.deepEqual(LINE_HEIGHTS[0], ['', 'Arv']);
  for (const [value, label] of LINE_HEIGHTS.slice(1)) {
    assert.ok(Number(value) > 0);
    assert.ok(label.includes(','));
  }
});
