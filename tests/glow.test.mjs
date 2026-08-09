/**
 * Glød-bakgrunnslaget: standardverdier og at render aldri produserer NaN.
 * Lift fyller ikke inn defaults, så et lag lagret før et felt fantes kommer
 * inn med feltet manglende - da må rendringen falle tilbake, ikke skrive en
 * gradient CSS forkaster (som ville gitt et usynlig lag).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { glowLayer } = await engineImport('backgrounds/glow.js');

/** Minimal stand-in for et DOM-element: render rører kun style. */
const stubEl = () => ({ style: {} });

test('glowLayer: standardverdier', () => {
  assert.equal(glowLayer.version, 1);
  assert.deepEqual(glowLayer.defaults(), { x: 0.5, y: 0.3, color: 'accent', radius: 0.5, opacity: 0.35 });
});

test('glowLayer: fulle props gir gradient med prosentene fra props', () => {
  const el = stubEl();
  glowLayer.render(el, { x: 0.25, y: 0.75, color: 'accent', radius: 0.4, opacity: 0.5 });
  assert.match(el.style.background, /circle at 25% 75%/);
  assert.match(el.style.background, /transparent 40%/);
  assert.equal(el.style.opacity, '0.5');
});

test('glowLayer: manglende felt faller tilbake til standardene, aldri NaN', () => {
  const el = stubEl();
  glowLayer.render(el, { color: 'accent' });
  assert.ok(!el.style.background.includes('NaN'), el.style.background);
  assert.match(el.style.background, /circle at 50% 30%/);
  assert.match(el.style.background, /transparent 50%/);
  assert.equal(el.style.opacity, '0.35');
});
