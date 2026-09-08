/**
 * imageTools: the pure SVG helpers for auto-trim at upload. The pixel
 * measuring (canvas) is DOM-dependent and covered by the headless checks;
 * here pure text is tested.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { svgViewBox, tightSvgViewBox, mediaExtension, slugify } = await engineImport('imageTools.js');

test('svgViewBox: reads viewBox, falls back to width/height, otherwise null', () => {
  assert.deepEqual(svgViewBox('<svg viewBox="0 0 100 40"></svg>'), [0, 0, 100, 40]);
  assert.deepEqual(svgViewBox('<svg viewBox=" -10 5 200 60 "></svg>'), [-10, 5, 200, 60]);
  assert.deepEqual(svgViewBox('<svg width="300" height="150"></svg>'), [0, 0, 300, 150]);
  assert.equal(svgViewBox('<svg></svg>'), null);
  assert.equal(svgViewBox('ikke svg'), null);
});

test('tightSvgViewBox: tightens viewBox + width/height to the subject (+ padding)', () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000"><rect x="400" y="450" width="200" height="100"/></svg>';
  // The subject is 200x100 at (400,450). Without padding (padFrac 0) the viewBox becomes exactly that.
  const out = tightSvgViewBox(svg, { x: 400, y: 450, width: 200, height: 100 }, 0);
  assert.match(out, /viewBox="400 450 200 100"/);
  assert.match(out, /width="200"/);
  assert.match(out, /height="100"/);
  // The original 1000 box is gone.
  assert.ok(!/viewBox="0 0 1000 1000"/.test(out));
  // The rectangle (the content) is untouched.
  assert.match(out, /<rect x="400" y="450" width="200" height="100"\/>/);
  // Padding is added as a fraction of the largest side.
  const padded = tightSvgViewBox(svg, { x: 400, y: 450, width: 200, height: 100 }, 0.05);
  assert.match(padded, /viewBox="390 440 220 120"/); // pad = 200*0.05 = 10
  // Invalid/empty box -> unchanged.
  assert.equal(tightSvgViewBox(svg, { x: 0, y: 0, width: 0, height: 0 }), svg);
  assert.equal(tightSvgViewBox(svg, null), svg);
});

test('mediaExtension/slugify: unchanged by the auto-trim work', () => {
  assert.equal(mediaExtension('data:image/svg+xml;base64,abc'), 'svg');
  assert.equal(mediaExtension('data:image/webp;base64,abc'), 'webp');
  assert.equal(slugify('Min Logo.svg'), 'min-logo');
});
