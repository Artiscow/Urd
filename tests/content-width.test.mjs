/**
 * The model behind the content width setting (editor/src/lib/content-width.js, ADR-0018).
 * The live sample in the Site panel must compute exactly the same rule as the engine CSS: `min(100% - 2 * gutter, contentWidth)`.
 * Pure functions.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  WIDTH_MIN, WIDTH_MAX, WIDTH_STEP, GUTTER_MAX,
  WIDTH_PRESETS, GUTTER_PRESETS, REF_SCREENS,
  clampWidth, clampGutter, contentBand, presetOf, bindingWidth,
} from '../editor/src/lib/content-width.js';

test('the default 1440 is a preset and is named standard', () => {
  assert.equal(presetOf(1440), 'standard');
  assert.deepEqual(WIDTH_PRESETS.map((p) => p.width), [1200, 1440, 1600, 'full']);
});

test('a free value matches no preset', () => {
  assert.equal(presetOf(1380), null);
});

test('clampWidth snaps to the step and stays within the bounds', () => {
  assert.equal(clampWidth(1449), 1440);
  assert.equal(clampWidth(1451), 1460);
  assert.equal(clampWidth(10), WIDTH_MIN);
  assert.equal(clampWidth(99999), WIDTH_MAX);
  // Deliberate Norwegian garbage input (any non-number falls back to the default).
  assert.equal(clampWidth('ikke et tall'), 1440);
  assert.equal(clampWidth(1440) % WIDTH_STEP, 0);
});

test('clampGutter tolerates 0 and clamps upwards', () => {
  assert.equal(clampGutter(0), 0);
  assert.equal(clampGutter(-5), 0);
  assert.equal(clampGutter(1000), GUTTER_MAX);
  assert.equal(clampGutter(undefined), 6);
});

test('the gutter scale has Medium as the default value', () => {
  assert.deepEqual(GUTTER_PRESETS.map((p) => p.gutter), [0, 3, 6, 9]);
  assert.equal(GUTTER_PRESETS.find((p) => p.id === 'medium').gutter, 6);
});

// The gutter is a SHARE of the screen, not pixels.
// Computed as px, the live sample goes wrong on all three screen widths at once.

test('the gutter scales with the screen', () => {
  // 6 % of 1000 is 60, not 6.
  assert.equal(contentBand('full', 6, 1000).width, 1000 - 120);
  assert.equal(contentBand('full', 6, 2000).width, 2000 - 240);
});

test('the same gutter gives different pixel space on different screens', () => {
  const small = contentBand('full', 6, 1000);
  const big = contentBand('full', 6, 2000);
  assert.equal(small.margin, 60);
  assert.equal(big.margin, 120);
  // The share, however, is the same, which is the whole point of a relative gutter.
  assert.equal(Math.round(small.pct), Math.round(big.pct));
});

// bindingWidth: the width where the content ACTUALLY reaches the design width.
// With a relative gutter this is not width + 2*gutter, since the gutter grows with the window.

test('bindingWidth is not width plus two gutters', () => {
  assert.equal(bindingWidth(1440, 6), 1637);
  assert.notEqual(bindingWidth(1440, 6), 1440 + 2 * 6);
});

test('bindingWidth with gutter 0 is the width itself', () => {
  assert.equal(bindingWidth(1440, 0), 1440);
});

test('bindingWidth agrees with contentBand: it binds there and wider', () => {
  const w = bindingWidth(1440, 6);
  assert.equal(contentBand(1440, 6, w).bound, true);
  assert.equal(contentBand(1440, 6, w + 200).bound, true);
  assert.equal(contentBand(1440, 6, w - 50).bound, false);
});

test('bindingWidth is 0 at full width (no such width exists)', () => {
  assert.equal(bindingWidth('full', 6), 0);
});

// The core: the sample must tell the truth about where the width actually binds.

test('the default 1440 with 6 vw binds at 1920, but not at 1536 and 1366', () => {
  // A consequence of the relative gutter: the binding limit is 1637, not 1488 (a px gutter would bind at 1536 too).
  // The band is still BOUND on the two narrower screens (it does not grow freely), it just never quite reaches 1440.
  const [wide, scaled, small] = REF_SCREENS.map((s) => contentBand(1440, 6, s));
  assert.equal(wide.bound, true, '1920 is above 1637 and must bind');
  assert.equal(scaled.bound, false, '1536 is below 1637');
  assert.equal(small.bound, false, '1366 is below 1637');
});

test('1440 at 1920 gives a 240 px gutter on each side', () => {
  const band = contentBand(1440, 6, 1920);
  assert.equal(band.width, 1440);
  assert.equal(band.margin, 240);
});

test('1200 leaves over a third of a 1920 screen empty', () => {
  // The rationale for the 1440 default, documented as numbers rather than prose.
  const band = contentBand(1200, 6, 1920);
  assert.equal(band.margin, 360);
  assert.ok((1 - band.pct / 100) > 0.37);
});

test('full width never binds, but respects the gutter', () => {
  const band = contentBand('full', 6, 1920);
  assert.equal(band.bound, false);
  assert.equal(band.width, 1920 - 2 * 0.06 * 1920);
});

test('the width does not bind when the gutters eat it up', () => {
  // 12 vw of 1536 is 184 on each side, so 1168 remains and 1440 does not fit.
  const band = contentBand(1440, 12, 1536);
  assert.equal(band.bound, false);
  assert.equal(band.width, 1536 - 2 * 0.12 * 1536);
});

test('the percentage is the band share of the screen', () => {
  const band = contentBand(960, 0, 1920);
  assert.equal(band.pct, 50);
});

test('gutter 0 gives edge to edge at full width', () => {
  const band = contentBand('full', 0, 1366);
  assert.equal(band.width, 1366);
  assert.equal(band.margin, 0);
  assert.equal(band.pct, 100);
});
