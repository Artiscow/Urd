/**
 * The glow background layer: default values and that render never produces
 * NaN. Lift does not fill in defaults, so a layer saved before a field
 * existed arrives with the field missing - the rendering must then fall
 * back, not write a gradient CSS discards (which would give an invisible
 * layer).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { glowLayer } = await engineImport('backgrounds/glow.js');

/** Minimal stand-in for a DOM element: render only touches style. */
const stubEl = () => ({ style: {} });

test('glowLayer: default values', () => {
  assert.equal(glowLayer.version, 1);
  assert.deepEqual(glowLayer.defaults(), { x: 0.5, y: 0.3, color: 'accent', radius: 0.5, opacity: 0.35 });
});

test('glowLayer: full props give a gradient with the percentages from props', () => {
  const el = stubEl();
  glowLayer.render(el, { x: 0.25, y: 0.75, color: 'accent', radius: 0.4, opacity: 0.5 });
  assert.match(el.style.background, /circle at 25% 75%/);
  assert.match(el.style.background, /transparent 40%/);
  assert.equal(el.style.opacity, '0.5');
});

test('glowLayer: missing fields fall back to the defaults, never NaN', () => {
  const el = stubEl();
  glowLayer.render(el, { color: 'accent' });
  assert.ok(!el.style.background.includes('NaN'), el.style.background);
  assert.match(el.style.background, /circle at 50% 30%/);
  assert.match(el.style.background, /transparent 50%/);
  assert.equal(el.style.opacity, '0.35');
});
