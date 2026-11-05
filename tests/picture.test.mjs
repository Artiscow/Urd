// The one drawing every picture shares (picture.js): its settings read within their bounds, the filter, the turn, and the looks held equal to the slideshow's tones.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { engineImport } from './_engine.mjs';

const { pictureStyle, pictureFilter, pictureTurn, straightenScale, LOOK_FILTERS, PICTURE_LOOKS, parseColor, duotoneTables } = await engineImport('picture.js');
const { COVER_DIM } = await engineImport('embed-cover.js');

test('pictureStyle: a picture stored before the new settings reads as it always drew, and every value stays within its bounds', () => {
  assert.deepEqual(pictureStyle(undefined), {
    x: 0.5, y: 0.5, zoom: 1, rotate: 0, flipX: false, flipY: false, straighten: 0,
    look: 'natural', brightness: 1, contrast: 1, saturate: 1, blur: 0, overlay: null, duotone: { dark: '#000000', light: 'accent' },
  });
  const old = pictureStyle({ src: '/media/x.webp', fit: 'cover', x: 0.2, y: 0.8, zoom: 2, brightness: 1.1 });
  assert.equal(old.x, 0.2);
  assert.equal(old.zoom, 2);
  assert.equal(old.brightness, 1.1);
  const wild = pictureStyle({ x: 'left', zoom: 9, rotate: 45, straighten: -40, look: 'neon', brightness: -1, blur: 99, flipX: 'yes' });
  assert.equal(wild.x, 0.5, 'not a number is the middle');
  assert.equal(wild.zoom, 4);
  assert.equal(wild.rotate, 0, 'only quarter turns');
  assert.equal(wild.straighten, -15);
  assert.equal(wild.look, 'natural', 'an unknown look is none');
  assert.equal(wild.brightness, 0);
  assert.equal(wild.blur, 20);
  assert.equal(wild.flipX, false, 'only true flips');
});

test('pictureStyle: an overlay in a site colour or a hex colour, with a strength; anything else is none', () => {
  assert.deepEqual(pictureStyle({ overlay: { color: 'accent', strength: 0.4 } }).overlay, { color: 'accent', strength: 0.4 });
  assert.deepEqual(pictureStyle({ overlay: { color: '#0b1716' } }).overlay, { color: '#0b1716', strength: 0.35 });
  assert.equal(pictureStyle({ overlay: { color: 'red; background: url(x)', strength: 1 } }).overlay, null);
  assert.equal(pictureStyle({ overlay: { color: 'text', strength: 0 } }).overlay, null, 'no strength, no overlay');
  assert.equal(pictureStyle({ overlay: { color: 'text', strength: 5 } }).overlay.strength, 1);
});

test('pictureFilter: the adjustments written as they always were, the look before them and the blur after', () => {
  assert.equal(pictureFilter(pictureStyle({})), '');
  assert.equal(pictureFilter(pictureStyle({ brightness: 1.1, contrast: 0.9, saturate: 0 })), 'brightness(1.1) contrast(0.9) saturate(0)');
  assert.equal(pictureFilter(pictureStyle({ look: 'mono', blur: 3 })), 'grayscale(1) blur(3px)');
  assert.equal(pictureFilter(pictureStyle({ look: 'warm', saturate: 1.2 })), 'sepia(0.3) saturate(1.25) saturate(1.2)');
  // The video's cover darkens its picture under the words, on top of the owner's brightness.
  assert.equal(pictureFilter(pictureStyle({}), { dim: COVER_DIM }), 'brightness(0.7)');
  assert.equal(pictureFilter(pictureStyle({ brightness: 1.5, contrast: 1.2 }), { dim: COVER_DIM }), 'brightness(1.05) contrast(1.2)');
});

test('pictureTurn: none for a picture that is not turned; quarter turns lie across, flips mirror, straightening grows the picture to fill its frame', () => {
  assert.equal(pictureTurn(pictureStyle({})), null);
  assert.deepEqual(pictureTurn(pictureStyle({ rotate: 90 })), { transform: 'rotate(90deg)', quarter: true });
  assert.deepEqual(pictureTurn(pictureStyle({ rotate: 180 })), { transform: 'rotate(180deg)', quarter: false });
  assert.deepEqual(pictureTurn(pictureStyle({ flipX: true })), { transform: 'scale(-1, 1)', quarter: false });
  assert.deepEqual(pictureTurn(pictureStyle({ rotate: 270, flipY: true })), { transform: 'rotate(270deg) scale(1, -1)', quarter: true });
  const tilted = pictureTurn(pictureStyle({ straighten: 5 }));
  assert.match(tilted.transform, /^rotate\(5deg\) scale\(1\.\d+, 1\.\d+\)$/);
  assert.equal(straightenScale(0), 1);
  assert.ok(straightenScale(5) > 1.2 && straightenScale(5) < 1.22, 'about a fifth larger at five degrees');
  assert.equal(straightenScale(-5), straightenScale(5));
});

test('the looks are the slideshow layer\'s tones, with the same filters base.css gives them', () => {
  assert.deepEqual(Object.keys(LOOK_FILTERS).sort(), [...PICTURE_LOOKS].sort());
  const css = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8');
  for (const look of PICTURE_LOOKS) {
    if (look === 'natural') continue;
    const rule = new RegExp(`\\.urd-gallery-tone-${look} \\.urd-gallery-face, \\.urd-gallery-tone-${look} \\.urd-bg-slide \\{ filter: ([^;]+);`).exec(css);
    assert.ok(rule, `base.css has the ${look} tone`);
    assert.equal(LOOK_FILTERS[look], rule[1], look);
  }
});

test('pictureStyle: the duotone\'s two colours, a site colour or a hex colour, the default pair where none is chosen', () => {
  assert.deepEqual(pictureStyle({ look: 'duotone' }).duotone, { dark: '#000000', light: 'accent' });
  assert.deepEqual(pictureStyle({ look: 'duotone', duotone: { dark: 'text', light: '#ffcc00' } }).duotone, { dark: 'text', light: '#ffcc00' });
  assert.deepEqual(pictureStyle({ duotone: { dark: 'url(x)', light: 7 } }).duotone, { dark: '#000000', light: 'accent' }, 'anything else is the default');
});

test('the duotone as a gradient map: any pair of colours, the lighter one in the shadows too', () => {
  assert.deepEqual(parseColor('#15b39a'), [21, 179, 154]);
  assert.deepEqual(parseColor('#fff'), [255, 255, 255]);
  assert.deepEqual(parseColor('rgb(21, 179, 154)'), [21, 179, 154]);
  assert.deepEqual(parseColor('rgb(21 179 154 / 50%)'), [21, 179, 154]);
  assert.equal(parseColor('var(--urd-color-accent)'), null);
  assert.deepEqual(duotoneTables([0, 0, 0], [255, 255, 255]), ['0 1', '0 1', '0 1'], 'black to white is the picture in grey');
  assert.deepEqual(duotoneTables([21, 179, 154], [0, 0, 0]), ['0.082 0', '0.702 0', '0.604 0'], 'teal shadows with black highlights turn the picture round, never into one colour');
  // The map takes the place of the look's grey, after the adjustments and before the blur.
  const style = pictureStyle({ look: 'duotone', brightness: 1.2, blur: 2 });
  assert.equal(pictureFilter(style, { duotone: 'url(#d)' }), 'brightness(1.2) url(#d) blur(2px)');
  assert.equal(pictureFilter(style), 'grayscale(1) contrast(1.1) brightness(1.2) blur(2px)', 'without a map it is grey');
});

test('the picture layers place a frame only where it has no place of its own, so the embed cover\'s frame stays laid over its box', () => {
  const css = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8');
  assert.match(css, /:where\(\.urd-pic-turned, \.urd-pic-look-vintage, \.urd-pic-overlaid\) \{[^}]*position: relative;/);
  assert.match(css, /\.urd-cover-frame \{\s*position: absolute;\s*inset: 0;/);
  // No rule outside :where gives a frame with these classes a position of its own.
  for (const [, selector, body] of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const bare = selector.replace(/:where\([^)]*\)/g, '');
    const framed = bare.split(',').some((part) => /\.urd-pic-(?:turned|look-vintage|overlaid)$/.test(part.trim()));
    assert.ok(!(framed && /(?:^|;)\s*position\s*:/.test(body)), `a bare picture layer rule sets a position: ${selector.trim()}`);
  }
});
