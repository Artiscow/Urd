/**
 * The image gallery background layer: the pure model (gallery-layout.js) and
 * the layer's def contract. The DOM building (backgrounds/slideshow.js) and
 * the motions are tested in the browser; what is tested here is the promise
 * the whole layer rests on, that the same seed always gives the same layout,
 * the clamps that keep an unusable value out of the CSS, and that a style
 * never runs a motion it has no animation for.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const {
  hash32, photoLayout, mosaicSpans, mosaicRows, frameCount, frameSize, galleryStyle, styleMotion,
  motionsFor, galleryMoves, layoutSeed, bandRows, normalizeMotionTime, normalizePictureTime,
  clampSpread, clampTilt, clampRadius, placeholderPhoto, placeholderPhotos,
  galleryShape, galleryLook, galleryTone, frameAspect, roundable, colouredLook, frameColor,
  GALLERY_STYLES, GALLERY_MOTIONS, GALLERY_SHAPES, GALLERY_LOOKS, GALLERY_TONES, FRAME_COUNT, MOSAIC_COUNT,
  FRAME_SIZE, STYLE_SIZE, LOOK_COLOR, FRAME_ASPECT, FRAME_SPREAD, FRAME_TILT, FRAME_RADIUS, MOTION_TIME,
  PICTURE_TIME, MOSAIC_COLS,
} = await engineImport('gallery-layout.js');
const { slideshowLayer } = await engineImport('backgrounds/slideshow.js');

const pics = (n) => Array.from({ length: n }, (_, i) => ({ src: `/media/photo-${i}.webp` }));

test('hash32: deterministic and unsigned', () => {
  assert.equal(hash32('urd'), hash32('urd'));
  assert.notEqual(hash32('urd'), hash32('urd '));
  assert.ok(hash32('') >= 0 && hash32('kake') >= 0);
  assert.ok(Number.isInteger(hash32('kake')));
});

test('photoLayout: the same seed gives the same scatter, a new seed a new one', () => {
  const a = photoLayout(pics(4), { count: 6, seed: 1 });
  const b = photoLayout(pics(4), { count: 6, seed: 1 });
  const c = photoLayout(pics(4), { count: 6, seed: 2 });
  assert.deepEqual(a, b);
  assert.notDeepEqual(a, c);
});

test('photoLayout: with too few pictures, once over unless the owner asks for repeats', () => {
  const places = photoLayout(pics(2), { count: 5, seed: 7 });
  assert.equal(places.length, 2, 'a folder of two gives two frames, not five with repeats');
  assert.deepEqual(places.map((p) => p.index), [0, 1]);
  const padded = photoLayout(pics(2), { count: 5, seed: 7, repeat: true });
  assert.equal(padded.length, 5);
  assert.deepEqual(padded.map((p) => p.index), [0, 1, 0, 1, 0]);
  assert.equal(photoLayout(pics(30), { count: 20, seed: 7 }).length, 20);
  assert.equal(photoLayout(pics(30), { count: 99, seed: 7 }).length, FRAME_COUNT.max);
});

test('photoLayout: an empty list still gives frames, for the empty state', () => {
  const places = photoLayout([], { count: 3, seed: 1 });
  assert.equal(places.length, 3);
  assert.deepEqual(places.map((p) => p.src), ['', '', '']);
  assert.deepEqual(places.map((p) => p.index), [-1, -1, -1]);
  assert.deepEqual(photoLayout([{ src: '' }, { src: null }], { count: 2 }).map((p) => p.src), ['', '']);
});

test('photoLayout: every placement stays inside its bounds, sized in px around the style size', () => {
  for (const place of photoLayout(pics(3), { count: 12, seed: 3, spread: 1, tilt: 12 })) {
    assert.ok(place.x >= 0 && place.x <= 100, `x outside: ${place.x}`);
    assert.ok(place.y >= 0 && place.y <= 100, `y outside: ${place.y}`);
    // A fifth either way around ApeironLF's 140 px: the 110 to 170 its hero uses.
    assert.ok(place.w >= 112 && place.w <= 168, `w outside: ${place.w}`);
    assert.ok(Math.abs(place.rot) <= 12, `rot outside: ${place.rot}`);
    assert.ok(place.phase >= 0 && place.phase < 1, `phase outside: ${place.phase}`);
    assert.ok(place.heading >= 0 && place.heading < 1, `heading outside: ${place.heading}`);
  }
  const big = photoLayout(pics(1), { count: 1, seed: 1, size: 300 })[0];
  assert.ok(big.w >= 240 && big.w <= 360);
  const card = photoLayout(pics(1), { count: 1, seed: 1, look: 'polaroid' })[0];
  assert.ok(card.w >= 112 && card.w <= 168, 'a polaroid card is a frame of the same size');
});

test('photoLayout: neighbouring frames get their own throw of the die, and the empty cells move', () => {
  const places = photoLayout(pics(6), { count: 6, seed: 1, tilt: 12 });
  assert.equal(new Set(places.map((p) => p.phase)).size, 6);
  assert.equal(new Set(places.map((p) => p.rot)).size, 6);
  const gaps = places.slice(1).map((p, i) => Math.abs(p.phase - places[i].phase));
  assert.ok(Math.max(...gaps) > 0.2, `the throws are too close: ${gaps.join(', ')}`);
  // Two frames on a grid with room for four: which cells they take follows the seed.
  const cells = (seed) => photoLayout(pics(2), { count: 2, seed }).map((p) => `${Math.round(p.x)}/${Math.round(p.y)}`);
  const seen = new Set([1, 2, 3, 4, 5, 6].map((seed) => cells(seed).join(',')));
  assert.ok(seen.size > 2, 'the same corner every time would be a pattern');
});

test('photoLayout: spread pulls the set towards the middle', () => {
  const wide = photoLayout(pics(3), { count: 6, seed: 5, spread: 1 });
  const tight = photoLayout(pics(3), { count: 6, seed: 5, spread: 0.2 });
  const far = (places) => Math.max(...places.map((p) => Math.abs(p.x - 50)));
  assert.ok(far(tight) < far(wide), 'a low spread must gather the frames');
});

test('photoLayout: junk settings fall back to the defaults', () => {
  const places = photoLayout(pics(10), { count: 'mange', seed: undefined, size: 'stor', spread: null, tilt: NaN });
  assert.equal(places.length, FRAME_COUNT.dflt);
  assert.deepEqual(places, photoLayout(pics(10), {}));
});

test('the clamps hold every setting inside its bounds', () => {
  assert.equal(frameCount(3), 3);
  assert.equal(frameCount(0), FRAME_COUNT.min);
  assert.equal(frameCount(99), FRAME_COUNT.max);
  assert.equal(FRAME_COUNT.max, 20);
  assert.equal(frameCount(4.4), 4);
  assert.equal(frameCount(99, 'mosaic'), MOSAIC_COUNT.max);
  assert.equal(frameCount(undefined, 'mosaic'), MOSAIC_COUNT.dflt);
  // The safeguard: never more frames than there are pictures.
  assert.equal(frameCount(20, 'floating', 7), 7);
  assert.equal(frameCount(20, 'floating', 7, true), 20, 'repeats fill the count');
  assert.equal(frameCount(5, 'floating', 7), 5);
  assert.equal(frameCount(20, 'floating', 0), 20, 'no pictures at all: example frames, the count stands');
  assert.equal(frameCount(20, 'mosaic', 3), 3);
  assert.equal(mosaicSpans(12, 1, 3, true).length, 12);
  assert.equal(mosaicSpans(12, 1, 3).length, 3);
  assert.deepEqual(STYLE_SIZE, { floating: 140, band: 156, mosaic: 140, fill: 0 });
  assert.equal(frameSize(null, 'floating'), 140, 'unset takes the style\'s own size');
  assert.equal(frameSize(undefined, 'band'), 156);
  assert.equal(frameSize('', 'band'), 156);
  assert.equal(frameSize(200, 'floating'), 200);
  assert.equal(frameSize(9, 'floating'), FRAME_SIZE.min);
  assert.equal(frameSize(9000, 'floating'), FRAME_SIZE.max);
  assert.equal(frameSize('stor', 'mosaic'), 140);
  assert.equal(clampSpread(0), FRAME_SPREAD.min);
  assert.equal(clampSpread(4), FRAME_SPREAD.max);
  assert.equal(clampSpread(null), FRAME_SPREAD.dflt);
  assert.equal(clampTilt(-4), FRAME_TILT.min);
  assert.equal(clampTilt(40), FRAME_TILT.max);
  assert.equal(clampRadius(12.6), 13);
  assert.equal(clampRadius(400), FRAME_RADIUS.max);
  assert.deepEqual([MOTION_TIME.min, MOTION_TIME.max], [0.5, 90]);
  assert.deepEqual([PICTURE_TIME.min, PICTURE_TIME.max], [0.5, 90]);
  assert.equal(normalizeMotionTime(30), 30);
  assert.equal(normalizeMotionTime(0.5), 0.5, 'half a second is the fastest');
  assert.equal(normalizeMotionTime(0.1), MOTION_TIME.min);
  assert.equal(normalizeMotionTime(900), MOTION_TIME.max);
  assert.equal(normalizeMotionTime('fort'), MOTION_TIME.dflt);
  assert.equal(normalizePictureTime(12), 12);
  assert.equal(normalizePictureTime(0.1), PICTURE_TIME.min);
  assert.equal(normalizePictureTime(undefined), PICTURE_TIME.dflt);
  assert.equal(bandRows(2), 2);
  assert.equal(bandRows(7), 1);
});

test('the styles and their motions: a style never runs a motion it cannot carry', () => {
  assert.deepEqual(GALLERY_STYLES, ['floating', 'fill', 'band', 'mosaic']);
  assert.deepEqual(GALLERY_MOTIONS, ['none', 'drift', 'rise', 'kenburns', 'crossfade', 'bounce']);
  assert.equal(galleryStyle('mosaic'), 'mosaic');
  assert.equal(galleryStyle('carousel'), 'floating');
  assert.equal(galleryStyle(undefined), 'floating');
  assert.equal(styleMotion('floating', 'bounce'), 'bounce');
  assert.equal(styleMotion('fill', 'bounce'), 'none', 'a filling picture cannot bounce');
  assert.equal(styleMotion('fill', 'kenburns'), 'kenburns');
  assert.equal(styleMotion('band', 'drift'), 'none', 'a band rolls by itself');
  assert.equal(styleMotion('mosaic', 'drift'), 'crossfade', 'the wall falls back to its own default');
  assert.equal(styleMotion('floating', 'spin'), 'drift');
  assert.deepEqual(motionsFor('band'), ['none']);
  assert.deepEqual(motionsFor('floating'), GALLERY_MOTIONS);
  assert.equal(galleryMoves({ style: 'floating', motion: 'drift' }), true);
  assert.equal(galleryMoves({ style: 'floating', motion: 'none' }), false);
  assert.equal(galleryMoves({ style: 'band', motion: 'none' }), true, 'a band rolls, whatever the motion field says');
  assert.equal(galleryMoves({ style: 'band', motion: 'none', reducedMotion: true }), false);
  assert.equal(galleryMoves({ style: 'floating', motion: 'drift', reducedMotion: true }), false);
});

test('the shapes, looks and tones: allowlisted, and the proportion follows the shape', () => {
  assert.equal(GALLERY_SHAPES.length, 15);
  assert.equal(GALLERY_LOOKS.length, 13);
  assert.equal(GALLERY_TONES.length, 12);
  assert.equal(galleryShape('heart'), 'heart');
  assert.equal(galleryShape('pentagon'), 'rect', 'an unknown shape can never become a class name');
  assert.equal(galleryLook('stamp'), 'stamp');
  assert.equal(galleryLook('gilded'), 'shadow');
  assert.equal(galleryTone('noir'), 'noir');
  assert.equal(galleryTone('x-ray'), 'natural');
  // Regular shapes are square, the arch stands tall, a polaroid card is taller
  // than its picture whatever the shape, and the rest keep ApeironLF's frame.
  for (const shape of ['square', 'circle', 'triangle', 'diamond', 'hexagon', 'octagon', 'star', 'heart']) {
    assert.equal(frameAspect(shape), 1, shape);
  }
  assert.equal(frameAspect('arch'), 0.8);
  for (const shape of ['rect', 'oval', 'pill', 'blob', 'leaf', 'slant']) assert.equal(frameAspect(shape), FRAME_ASPECT, shape);
  assert.equal(frameAspect('circle', 'polaroid'), 0.84);
  assert.equal(frameAspect(undefined), FRAME_ASPECT);
  // The looks with a colour, and what they draw with when none is picked.
  assert.deepEqual(Object.keys(LOOK_COLOR), ['polaroid', 'border', 'thick', 'double', 'dark', 'glow']);
  assert.equal(colouredLook('border'), true);
  assert.equal(colouredLook('glow'), true);
  assert.equal(colouredLook('tape'), false);
  assert.equal(colouredLook(undefined), false, 'the soft shadow has no colour to pick');
  assert.equal(frameColor('border', ''), '#ffffff');
  assert.equal(frameColor('dark', undefined), '#161616');
  assert.equal(frameColor('glow', ''), 'accent');
  assert.equal(frameColor('border', ' #ff0000 '), '#ff0000');
  assert.equal(frameColor('glow', 'surface'), 'surface', 'a theme token is passed on for the layer to resolve');
  assert.equal(frameColor('tape', '#ff0000'), '', 'a look without a colour ignores the pick');
  // Rounding rounds only what has corners to round.
  assert.equal(roundable('rect'), true);
  assert.equal(roundable('square'), true);
  assert.equal(roundable('circle'), false);
  assert.equal(roundable('blob'), false);
});

test('layoutSeed: the owner\'s seed when set, the visit\'s otherwise', () => {
  assert.equal(layoutSeed(42, 7), 42);
  assert.equal(layoutSeed(0, 7), 7);
  assert.equal(layoutSeed(undefined, 7), 7);
  assert.equal(layoutSeed('', 7), 7);
  assert.equal(layoutSeed(-3, 7), 7);
  assert.equal(layoutSeed(0, 0), 1, 'never a seed of nothing');
});

test('mosaicSpans and mosaicRows: a seeded wall that fits its rows', () => {
  const a = mosaicSpans(12, 1);
  assert.equal(a.length, 12);
  assert.deepEqual(a, mosaicSpans(12, 1));
  assert.notDeepEqual(a, mosaicSpans(12, 2));
  for (const span of a) {
    assert.ok([1, 2].includes(span.cols) && [1, 2].includes(span.rows));
    assert.ok(span.phase >= 0 && span.phase < 1);
  }
  assert.ok(a.some((s) => s.cols === 2) && a.some((s) => s.rows === 2), 'some wide, some tall');
  assert.equal(mosaicRows([{ cols: 1, rows: 1 }, { cols: 1, rows: 1 }, { cols: 1, rows: 1 }, { cols: 1, rows: 1 }]), 1);
  assert.equal(mosaicRows([{ cols: 2, rows: 2 }, { cols: 1, rows: 1 }]), 2);
  assert.equal(mosaicRows([]), 1);
  assert.equal(MOSAIC_COLS, 4);
});

test('the example pictures: three drawn variants as data URLs', () => {
  const a = placeholderPhoto(0);
  assert.ok(a.startsWith('data:image/svg+xml,'));
  assert.notEqual(placeholderPhoto(0), placeholderPhoto(1));
  assert.equal(placeholderPhoto(3), placeholderPhoto(0), 'three variants, then round again');
  assert.equal(placeholderPhotos(4).length, 4);
  assert.equal(placeholderPhotos(0).length, 1);
  assert.ok(placeholderPhotos(2).every((p) => p.src.startsWith('data:image/svg+xml,')));
});

test('the image gallery layer: the def contract', () => {
  assert.equal(slideshowLayer.version, 2);
  assert.equal(slideshowLayer.labelKey, 'bgLayer.slideshow');
  assert.equal(typeof slideshowLayer.render, 'function');
  const a = slideshowLayer.defaults();
  const b = slideshowLayer.defaults();
  assert.notEqual(a.images, b.images, 'defaults() must give fresh objects');
  assert.deepEqual(a.images, []);
  assert.equal(a.style, 'floating');
  assert.equal(a.order, 'random');
  assert.equal(a.seed, 0, 'the scatter is the visit\'s until the owner fixes it');
  assert.equal(a.size, null, 'the size is the style\'s until the owner sets it');
  assert.equal(a.shape, 'rect');
  assert.equal(a.look, 'shadow');
  assert.equal(a.tone, 'natural');
  assert.equal(a.underNav, true, 'the pictures may use the menu band until told otherwise');
  assert.equal(a.underAnnounce, false, 'but never the announcement strip until told otherwise');
  assert.equal(a.repeat, false, 'a small folder is shown once over');
  assert.equal(a.frameColor, '');
  assert.equal(styleMotion(a.style, a.motion), a.motion);
  assert.equal(frameCount(a.count), a.count);
  assert.equal(normalizeMotionTime(a.motionSpeed), a.motionSpeed);
  assert.equal(normalizePictureTime(a.interval), a.interval);
  // A version 1 layer was the filling cross-fade and keeps it through the lift.
  const lifted = slideshowLayer.migrations[1]({ images: [{ src: '/media/a.webp' }], interval: 6 });
  assert.equal(lifted.style, 'fill');
  assert.equal(lifted.motion, 'none');
  assert.equal(lifted.order, 'random');
  assert.equal(lifted.interval, 6);
});
