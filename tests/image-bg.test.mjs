/**
 * The image background layer: the pure CSS builders (bgPosition/bgSize/bleedClip)
 * and the parallax computations (parallaxPad/parallaxOffset). The DOM part
 * (clipping, the scroll listener, the bleed clip-path, free placement) is
 * covered by the headless checks.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const {
  imageLayer, bgPosition, bgSize, bleedClip, parallaxPad, parallaxOffset,
} = await engineImport('backgrounds/image.js');

test('imageLayer: default values', () => {
  assert.equal(imageLayer.version, 2);
  assert.equal(imageLayer.defaults().fit, 'plain');
  assert.equal(imageLayer.defaults().size, 1);
  assert.equal(imageLayer.defaults().parallax, 0);
  assert.equal(imageLayer.defaults().bleed, 'none');
});

test('bgPosition: position to background-position percent (may go outside 0-100)', () => {
  assert.equal(bgPosition(0.5, 0.5), '50% 50%');
  assert.equal(bgPosition(0, 1), '0% 100%');
  // Outside the edge: negative / above 100 %.
  assert.equal(bgPosition(-0.5, 1.5), '-50% 150%');
  assert.equal(bgPosition(undefined, undefined), '50% 50%');
});

test('bgSize: scale model (width-relative %); cover/contain kept as keywords', () => {
  assert.equal(bgSize('cover'), 'cover');
  assert.equal(bgSize('contain'), 'contain');
  // Free placement: width-relative scale in %.
  // 'vanlig' and 'flislegg' are fit contract values, deliberate legacy data.
  assert.equal(bgSize('vanlig', 1), '100%');
  assert.equal(bgSize('vanlig', 0.4), '40%');
  assert.equal(bgSize('flislegg', 0.5), '50%');
  assert.equal(bgSize('vanlig', 2.5), '250%');
  // Missing size = 100 %.
  assert.equal(bgSize('vanlig'), '100%');
  assert.equal(bgSize(undefined), '100%');
});

test('bleedClip: directional clip-path, the sides always clipped', () => {
  assert.equal(bleedClip('none'), 'inset(0)');
  assert.equal(bleedClip(undefined), 'inset(0)');
  assert.equal(bleedClip('up'), 'inset(-9999px 0 0 0)');
  assert.equal(bleedClip('down'), 'inset(0 0 -9999px 0)');
  assert.equal(bleedClip('both'), 'inset(-9999px 0 -9999px 0)');
});

test('parallaxPad: proportional to the strength, different cap for fill vs free model', () => {
  // Full strength: the travel distance = 0.4 * vh, clamped to capFrac * section height.
  assert.equal(parallaxPad(2000, 1000, 1), 360);      // the 0.18 cap (fill)
  assert.equal(parallaxPad(2000, 1000, 0.5), 200);    // half strength below the cap
  assert.equal(parallaxPad(200, 1000, 1), 36);        // short section, the 0.18 cap
  // The free model (larger cap) gives much more movement on the same section.
  assert.equal(parallaxPad(200, 1000, 1, 0.6), 120);
});

test('parallaxOffset: zero at center, sign flips, scales with strength', () => {
  const vh = 1000;
  // A section in the middle of the viewport (sectionMid = 500) gives no offset.
  assert.equal(parallaxOffset(400, 200, vh, 0.5), 0);
  // Further down = negative, further up = positive.
  assert.ok(parallaxOffset(700, 200, vh, 0.5) < 0);
  assert.ok(parallaxOffset(100, 200, vh, 0.5) > 0);
  assert.equal(parallaxOffset(700, 200, vh, 0), 0);
  // Tall section (the cap does not bind): higher strength = larger swing.
  assert.ok(Math.abs(parallaxOffset(0, 2000, vh, 1)) > Math.abs(parallaxOffset(0, 2000, vh, 0.3)));
  // Strength is clamped to [0,1].
  assert.equal(parallaxOffset(700, 200, vh, 2), parallaxOffset(700, 200, vh, 1));
});

test('parallaxOffset: the offset is clamped to the limit (never a gap/gigantic)', () => {
  const vh = 1000;
  const pad = parallaxPad(200, vh, 1); // 36
  assert.equal(Math.abs(parallaxOffset(9000, 200, vh, 1, pad)), pad);
  assert.equal(Math.abs(parallaxOffset(-9000, 200, vh, 1, pad)), pad);
});

test('imageLayer 1 -> 2: the Norwegian fit values are lifted to English', () => {
  const lift = imageLayer.migrations[1];
  // The v1 values are deliberate legacy contract data (ADR-0021).
  assert.equal(lift({ fit: 'vanlig' }).fit, 'plain');
  assert.equal(lift({ fit: 'flislegg' }).fit, 'tile');
  assert.equal(lift({ fit: 'egen' }).fit, 'custom');
  assert.equal(lift({ fit: 'cover' }).fit, 'cover', 'values that were already English are untouched');
  assert.equal(lift({ fit: 'repeat' }).fit, 'repeat');
  assert.equal(lift({ fit: 'vanlig', size: 0.5 }).size, 0.5, 'the other props survive the lift');
});
