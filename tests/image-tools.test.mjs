/**
 * imageTools: de rene SVG-hjelperne for auto-trim ved opplasting. Pikselmålingen
 * (canvas) er DOM-avhengig og dekkes av headless-sjekkene; her testes ren tekst.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { svgViewBox, tightSvgViewBox, mediaExtension, slugify } from '../template/assets/engine/imageTools.js';

test('svgViewBox: leser viewBox, faller til width/height, ellers null', () => {
  assert.deepEqual(svgViewBox('<svg viewBox="0 0 100 40"></svg>'), [0, 0, 100, 40]);
  assert.deepEqual(svgViewBox('<svg viewBox=" -10 5 200 60 "></svg>'), [-10, 5, 200, 60]);
  assert.deepEqual(svgViewBox('<svg width="300" height="150"></svg>'), [0, 0, 300, 150]);
  assert.equal(svgViewBox('<svg></svg>'), null);
  assert.equal(svgViewBox('ikke svg'), null);
});

test('tightSvgViewBox: strammer viewBox + width/height til motivet (+ luft)', () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000"><rect x="400" y="450" width="200" height="100"/></svg>';
  // Motivet er 200x100 ved (400,450). Uten luft (padFrac 0) blir viewBox akkurat det.
  const out = tightSvgViewBox(svg, { x: 400, y: 450, width: 200, height: 100 }, 0);
  assert.match(out, /viewBox="400 450 200 100"/);
  assert.match(out, /width="200"/);
  assert.match(out, /height="100"/);
  // Den opprinnelige 1000-boksen er borte.
  assert.ok(!/viewBox="0 0 1000 1000"/.test(out));
  // Rektangelet (innholdet) er urørt.
  assert.match(out, /<rect x="400" y="450" width="200" height="100"\/>/);
  // Luft legges til som andel av største side.
  const padded = tightSvgViewBox(svg, { x: 400, y: 450, width: 200, height: 100 }, 0.05);
  assert.match(padded, /viewBox="390 440 220 120"/); // pad = 200*0.05 = 10
  // Ugyldig/tom boks -> uendret.
  assert.equal(tightSvgViewBox(svg, { x: 0, y: 0, width: 0, height: 0 }), svg);
  assert.equal(tightSvgViewBox(svg, null), svg);
});

test('mediaExtension/slugify: uendret av auto-trim-arbeidet', () => {
  assert.equal(mediaExtension('data:image/svg+xml;base64,abc'), 'svg');
  assert.equal(mediaExtension('data:image/webp;base64,abc'), 'webp');
  assert.equal(slugify('Min Logo.svg'), 'min-logo');
});
