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

test('an image gallery layer is sketched in its style, so the card is not blank', () => {
  const card = (style, extra = {}) => presetThumb({
    size: { minHeight: '400px' },
    background: { layers: [{ type: 'slideshow', version: 2, props: { images: [], count: 5, seed: 1, style, ...extra } }] },
    blocks: [],
  });
  // The background fill plus one frame per picture, each leaning on its own.
  const floating = card('floating');
  assert.equal([...floating.matchAll(/<rect /g)].length, 6);
  assert.equal([...floating.matchAll(/transform="rotate\(/g)].length, 5);
  // The same seed must give the same sketch as the layer's own scatter.
  assert.equal(floating, card('floating'));
  assert.notEqual(floating, card('floating', { seed: 2 }));
  // A wall of tiles, and two rows of a band, both with more than the fill alone.
  assert.ok([...card('mosaic', { count: 8 }).matchAll(/<rect /g)].length >= 6);
  assert.ok([...card('band').matchAll(/<rect /g)].length >= 6);
  // The fill style is the background itself.
  assert.equal([...card('fill').matchAll(/<rect /g)].length, 1);
});

test('no user string reaches the sketch: a colour passes only as hex or a theme token, and anything else falls back', () => {
  const HOSTILE = ['red"><script>alert(1)</script>', 'url(javascript:alert(1))', '#fff" onload="alert(1)', 'var(--x);}</style><script>', 'Red', 'accent ', 'expression(alert(1))'];
  const frame = { desktop: { x: 10, y: 20, w: 40, h: 120 } };
  for (const bad of HOSTILE) {
    const sketch = (section) => presetThumb({ size: { minHeight: '400px' }, ...section });
    const svgs = [
      sketch({ background: { layers: [{ type: 'color', props: { value: bad } }] }, blocks: [] }),
      sketch({ background: { layers: [{ type: 'gradient', props: { stops: [{ color: bad }, bad] } }] }, blocks: [] }),
      sketch({ background: { layers: [{ type: 'gradient', props: { stops: [bad] } }] }, blocks: [] }),
      sketch({ background: { layers: [{ type: 'glow', props: { color: bad, x: bad, y: bad, radius: bad, opacity: bad } }] }, blocks: [] }),
      ...['rect', 'circle', 'triangle', 'line'].map((kind) => sketch({ background: { layers: [] }, blocks: [{ type: 'shape', frames: frame, props: { kind, color: bad } }] })),
      sketch({ theme: bad, background: { layers: [] }, blocks: [{ type: bad, frames: { desktop: { x: bad, y: bad, w: bad, h: bad } }, props: { html: bad, align: bad } }] }),
      pageThumb({ sections: [{ size: { minHeight: bad }, background: { layers: [{ type: 'color', props: { value: bad } }] }, blocks: [{ type: 'text', frames: frame, props: { html: `<h2>${bad}</h2>` } }] }] }),
    ];
    for (const svg of svgs) {
      assert.ok(!svg.includes(bad), `${bad} reached the sketch`);
      assert.doesNotMatch(svg, /<script|javascript:|onload=|expression\(|url\(/i);
      for (const [, value] of svg.matchAll(/\b(?:fill|stroke)="([^"]*)"/g)) {
        assert.match(value, /^(?:#[0-9a-fA-F]{3,8}|var\(--urd-color-[a-z][a-z0-9-]*, #[0-9a-fA-F]{3,8}\)|none)$/, `${bad}: fill ${value}`);
      }
    }
  }
  // Hex and theme tokens pass, the token as the theme's variable with a fallback.
  const shape = (color) => presetThumb({ background: { layers: [] }, blocks: [{ type: 'shape', frames: frame, props: { kind: 'rect', color } }] });
  assert.match(shape('#12ab9F'), /fill="#12ab9F"/);
  assert.match(shape('accent-2'), /fill="var\(--urd-color-accent-2, #[0-9a-f]+\)"/);
});
