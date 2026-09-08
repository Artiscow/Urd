/**
 * Contract tests for the thumbnail generator (preset-thumb.js): the sketches
 * are drawn from actual preset data, and the fidelity rules uncovered by the
 * test rounds are guarded here - headings never disappear from the side
 * bands, empty media blocks are drawn empty, and the content sits indented
 * as on the bound content canvas (ADR-0018).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { presetThumb, pageThumb, parseMinHeightPx } = await engineImport('preset-thumb.js');

const textBlock = (html, extra = {}) => ({
  type: 'text',
  frames: { desktop: { x: 0, y: 0, w: 60, h: 38 } },
  props: { html, ...extra },
});

const section = (blocks, minHeight = '400px') => ({
  size: { minHeight },
  background: { layers: [] },
  blocks,
});

test('parseMinHeightPx: px, vh and garbage', () => {
  assert.equal(parseMinHeightPx('360px'), 360);
  assert.equal(parseMinHeightPx('70vh'), 560);
  // 'tull' is deliberate garbage input.
  assert.equal(parseMinHeightPx('tull'), 400);
});

test('side band: the heading is drawn even when the band is short', () => {
  // Five sections of 400 px give bands of ~22 px and sy of about 0.06: the
  // old generator then dropped all text lines (absolute line height plus
  // early exit).
  const page = { sections: Array.from({ length: 5 }, () => section([textBlock('<h2>Tittel</h2>')])) };
  const svg = pageThumb(page);
  assert.match(svg, /opacity="0\.8"/, 'the first text line (the heading slot) is missing from the band');
});

test('an empty image is drawn as empty state, a set image as filled', () => {
  const empty = presetThumb(section([{ type: 'image', frames: { desktop: { x: 10, y: 20, w: 40, h: 200 } }, props: { src: '' } }]));
  assert.match(empty, /stroke-dasharray/, 'an empty image must have a dashed outline');
  const filled = presetThumb(section([{ type: 'image', frames: { desktop: { x: 10, y: 20, w: 40, h: 200 } }, props: { src: '/media/x.jpg' } }]));
  assert.ok(!filled.includes('stroke-dasharray'), 'a set image must be drawn filled');
});

test('an empty gallery is drawn empty, a filled gallery filled', () => {
  const empty = presetThumb(section([{ type: 'gallery', frames: { desktop: { x: 5, y: 20, w: 90, h: 200 } }, props: { images: [] } }]));
  assert.match(empty, /stroke-dasharray/);
  const filled = presetThumb(section([{ type: 'gallery', frames: { desktop: { x: 5, y: 20, w: 90, h: 200 } }, props: { images: ['/media/a.jpg'] } }]));
  assert.ok(!filled.includes('stroke-dasharray'));
});

test('faq is drawn as accordion rows, not an empty card', () => {
  const svg = presetThumb(section([{ type: 'faq', frames: { desktop: { x: 10, y: 20, w: 80, h: 240 } }, props: { items: [] } }]));
  // At least two rows (surface plus question line per row) plus the background.
  const rects = svg.match(/<rect/g) ?? [];
  assert.ok(rects.length >= 5, `faq must draw rows, got ${rects.length} rects`);
  assert.match(svg, /<circle/, 'the chevron dot is missing');
});

test('box text gets a card surface behind the lines', () => {
  const svg = presetThumb(section([textBlock('<p>tekst</p>', { box: true })]));
  assert.match(svg, /--urd-color-surface/, 'the card surface is missing for box text');
});

test('the content sits indented from the edge (the bound canvas)', () => {
  const svg = presetThumb(section([textBlock('<h2>x</h2>')]));
  // The block has x: 0, but must be drawn from the side margin, never from the edge.
  assert.ok(!/<rect x="0(\.0)?" y="[^"]*" width="[^"]*" height="[^"]*" fill="var\(--urd-color-text/.test(svg),
    'the text line starts right at the edge without an indent');
});

test('an empty page gives a clean background field', () => {
  const svg = pageThumb({ sections: [] });
  assert.match(svg, /--urd-color-bg/);
});

test('role sets tint the background in the sketch (deep = text token, soft = surface)', () => {
  const deep = presetThumb({ ...section([textBlock('<h2>x</h2>')]), theme: 'deep' });
  assert.match(deep, /^<svg[^>]*>\s*<rect[^>]*fill="var\(--urd-color-text/, 'a deep band must have a text-tinted background');
  const soft = presetThumb({ ...section([textBlock('<h2>x</h2>')]), theme: 'soft' });
  assert.match(soft, /^<svg[^>]*>\s*<rect[^>]*fill="var\(--urd-color-surface/, 'a soft band must have a surface-tinted background');
});
