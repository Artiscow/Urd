/**
 * The phone's sizes and the dragged width (editor/src/lib/preview-width.js): the stored preference normalised, the viewport it gives, and a dragged width snapped to the stops.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PHONE_SIZES, PHONE_FILL_WIDTH, FREE_WIDTH_MIN, FREE_WIDTH_MAX, phoneSetting, phoneViewport, snapWidth } from '../editor/src/lib/preview-width.js';

test('the phone presets rise from the narrowest, each with a height', () => {
  assert.deepEqual(PHONE_SIZES.map((p) => p.id), ['phone-s', 'phone', 'phone-w', 'phone-l', 'tablet']);
  for (let i = 1; i < PHONE_SIZES.length; i++) assert.ok(PHONE_SIZES[i].width > PHONE_SIZES[i - 1].width);
  assert.ok(PHONE_SIZES.every((p) => p.height > p.width));
});

test('the stored phone preference falls to the Phone preset, and an own size is clamped', () => {
  assert.deepEqual(phoneSetting(null), { size: 'phone', width: 393, height: 852 });
  assert.deepEqual(phoneSetting({ size: 'nonsense' }).size, 'phone');
  assert.deepEqual(phoneSetting({ size: 'phone-l' }).size, 'phone-l');
  assert.deepEqual(phoneSetting({ size: 'own', width: 100, height: 9000 }), { size: 'own', width: 280, height: 2000 });
  assert.deepEqual(phoneSetting({ size: 'fill' }).size, 'fill');
});

test('the viewport follows the preset, the own size, or the fill width with no height', () => {
  assert.deepEqual(phoneViewport({ size: 'phone-w' }), { width: 412, height: 915 });
  assert.deepEqual(phoneViewport({ size: 'own', width: 400, height: 700 }), { width: 400, height: 700 });
  assert.deepEqual(phoneViewport({ size: 'fill' }), { width: PHONE_FILL_WIDTH, height: 0 });
});

test('a dragged width snaps to the nearest stop inside the tolerance and stays inside its bounds', () => {
  const stops = [640, 810, 1280];
  assert.equal(snapWidth(645, stops, 8), 640);
  assert.equal(snapWidth(660, stops, 8), 660);
  assert.equal(snapWidth(1284, stops, 8), 1280);
  assert.equal(snapWidth(100, stops, 8), FREE_WIDTH_MIN);
  assert.equal(snapWidth(9000, stops, 8), FREE_WIDTH_MAX);
  assert.equal(snapWidth(NaN, stops, 8), FREE_WIDTH_MIN);
  // Two stops in reach: the nearer wins.
  assert.equal(snapWidth(644, [640, 650], 8), 640);
  assert.equal(snapWidth(647, [640, 650], 8), 650);
});

test('phoneSetting: a common ratio keeps its own width and takes its height upright from the ratio', () => {
  const pref = phoneSetting({ size: 'ratio', ratio: '19.5:9', ratioWidth: 390, width: 400, height: 700 });
  assert.deepEqual(pref, { size: 'ratio', width: 400, height: 700, ratio: '19.5:9', ratioWidth: 390 }, 'the own size stays as it was');
  assert.deepEqual(phoneViewport(pref), { width: 390, height: 845 });
  assert.deepEqual(phoneViewport(phoneSetting({ size: 'ratio', ratio: '4:3', ratioWidth: 810 })), { width: 810, height: 1080 }, 'a tablet upright');
  assert.equal(phoneSetting({ size: 'ratio', ratio: '20:9' }).ratioWidth, 393, 'no width: the common phone');
  assert.equal(phoneSetting({ size: 'ratio', ratio: '20:9', ratioWidth: 50 }).ratioWidth, 280);
  assert.equal(phoneSetting({ size: 'ratio', ratio: '21:9' }).size, 'phone', 'a screen ratio is not the phone\'s');
});
