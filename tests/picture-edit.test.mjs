// The image editor's rules (lib/picture-edit.js): what each kind of picture keeps and where, the crop window, a pointer on the turned picture, the zoom a corner gives, and the resets.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';
register('./_svelte-loader.mjs', import.meta.url);
const {
  readPicture, writePicture, storedStyle, cropWindow, pointOnPicture, zoomFromCorner, turned, resetStyle, sectionChanged, ratioValue, movedFrame, frameAt, NEUTRAL,
  sharpness, dataUrlBytes, isDrawing, withShared, SHARED_KEYS,
} = await import('../editor/src/lib/picture-edit.js');

test('readPicture: each kind read from where it keeps its picture, an old picture with every new setting at none', () => {
  const image = readPicture('image', { src: '/media/a.webp', alt: 'A cake', fit: 'cover', radius: 'md', x: 0.3, zoom: 2, brightness: 1.1 });
  assert.equal(image.src, '/media/a.webp');
  assert.equal(image.alt, 'A cake');
  assert.equal(image.ratio, 'free');
  assert.equal(image.radius, 'md');
  assert.equal(image.style.x, 0.3);
  assert.equal(image.style.rotate, 0);
  assert.equal(image.style.look, 'natural');
  const entry = readPicture('entry', { image: '/media/b.webp', imageAlt: 'B', imageStyle: { shape: 'circle', fit: 'contain', flipX: true } });
  assert.deepEqual([entry.src, entry.alt, entry.ratio, entry.fit, entry.style.flipX], ['/media/b.webp', 'B', 'circle', 'contain', true]);
  const tile = readPicture('gallery', { src: '/media/c.webp', alt: '', style: { look: 'mono' } });
  assert.equal(tile.style.look, 'mono');
  assert.equal(tile.ratio, '');
  const cover = readPicture('cover', { url: 'x', poster: '/media/d.webp', coverStyle: { rotate: 90 } });
  assert.deepEqual([cover.src, cover.style.rotate, cover.alt], ['/media/d.webp', 90, '']);
});

test('storedStyle: a setting at none is left out and never written as null', () => {
  assert.deepEqual(storedStyle(NEUTRAL), {});
  assert.deepEqual(storedStyle({ ...NEUTRAL, rotate: 90, look: 'sepia', overlay: { color: 'accent', strength: 0.4 } }), { rotate: 90, look: 'sepia', overlay: { color: 'accent', strength: 0.4 } });
  assert.deepEqual(storedStyle({ ...NEUTRAL, overlay: { color: 'accent', strength: 0 } }), {});
});

test('writePicture: each kind written back where it lives; a shape, the corners and the fit beside the settings', () => {
  const props = { src: '/media/a.webp', alt: '', fit: 'cover', radius: 'md', x: 0.5, y: 0.5, zoom: 1, brightness: 1, contrast: 1, saturate: 1, lightbox: true };
  const pic = readPicture('image', props);
  writePicture('image', props, { ...pic, ratio: '16:9', radius: '', style: { ...pic.style, rotate: 180, zoom: 1.5 } });
  assert.equal(props.aspect, '16:9');
  assert.equal(props.radius, null, 'the image block keeps no rounding as null, as it always has');
  assert.equal(props.rotate, 180);
  assert.equal(props.zoom, 1.5);
  assert.equal('brightness' in props, false, 'a setting at none leaves the block');
  assert.equal(props.lightbox, true, 'what the editor does not hold stays');
  writePicture('image', props, { ...readPicture('image', props), ratio: 'free' });
  assert.equal('aspect' in props, false);

  const entry = { id: 'e1', title: 'T', image: '/media/b.webp', imageStyle: { shape: 'square', radius: 'sm' } };
  writePicture('entry', entry, { ...readPicture('entry', entry), ratio: 'circle' });
  assert.deepEqual(entry.imageStyle, { shape: 'circle' }, 'a round picture keeps no rounding');
  writePicture('entry', entry, { ...readPicture('entry', entry), ratio: 'auto', alt: '' });
  assert.equal(entry.imageStyle, undefined, 'nothing left, no imageStyle');
  writePicture('entry', entry, { ...readPicture('entry', entry), src: '' });
  assert.equal(entry.image, undefined);

  const tile = { src: '/media/c.webp', alt: '', style: { x: 0.2 } };
  writePicture('gallery', tile, { ...readPicture('gallery', tile), fit: 'contain', style: { ...readPicture('gallery', tile).style, blur: 2 } });
  assert.deepEqual(tile.style, { x: 0.2, blur: 2, fit: 'contain' });

  const video = { url: 'x', poster: '/media/d.webp', coverStyle: { zoom: 2 } };
  writePicture('cover', video, { ...readPicture('cover', video), style: { ...NEUTRAL } });
  assert.equal(video.coverStyle, undefined);
});

test('cropWindow: the part of the picture the frame shows, placed by the focus point and zoomed towards it', () => {
  // A 2:1 picture in a 1:1 frame shows half its width, at the focus point.
  assert.deepEqual(cropWindow({ pictureRatio: 2, frameRatio: 1, x: 0.5, y: 0.5, zoom: 1 }), { left: 0.25, top: 0, width: 0.5, height: 1 });
  assert.deepEqual(cropWindow({ pictureRatio: 2, frameRatio: 1, x: 0, y: 0.5, zoom: 1 }), { left: 0, top: 0, width: 0.5, height: 1 });
  // Zoom 2 halves the window around the focus point.
  assert.deepEqual(cropWindow({ pictureRatio: 1, frameRatio: 1, x: 1, y: 0, zoom: 2 }), { left: 0.5, top: 0, width: 0.5, height: 0.5 });
  // A quarter turn lays a 2:1 frame across: on a square picture it shows the full height and half the width.
  assert.deepEqual(cropWindow({ pictureRatio: 1, frameRatio: 2, x: 0.5, y: 0.5, zoom: 1, quarter: true }), { left: 0.25, top: 0, width: 0.5, height: 1 });
  // The whole picture (contain) is the window at zoom 1.
  assert.deepEqual(cropWindow({ pictureRatio: 2, frameRatio: 1, x: 0.5, y: 0.5, zoom: 1, fit: 'contain' }), { left: 0, top: 0, width: 1, height: 1 });
});

test('pointOnPicture: a pointer taken back through the turn and the mirrors to a point on the picture', () => {
  const at = (clientX, clientY, turn = {}) => pointOnPicture({ clientX, clientY, centerX: 100, centerY: 50, width: 200, height: 100, angle: 0, ...turn });
  assert.deepEqual(at(0, 0), { x: 0, y: 0 });
  assert.deepEqual(at(150, 75), { x: 0.75, y: 0.75 });
  assert.deepEqual(at(150, 75, { flipX: true }), { x: 0.25, y: 0.75 });
  // Turned a quarter to the right, the picture's top edge is on the right: a point right of the centre is near the picture's top.
  const p = pointOnPicture({ clientX: 140, clientY: 50, centerX: 100, centerY: 50, width: 200, height: 100, angle: 90 });
  assert.equal(Math.round(p.x * 100) / 100, 0.5);
  assert.equal(Math.round(p.y * 100) / 100, 0.1);
  assert.deepEqual(at(-500, 999), { x: 0, y: 1 }, 'clamped to the picture');
});

test('zoomFromCorner: the window spans from the held corner to the pointer, within the zoom\'s bounds', () => {
  const full = { width: 0.5, height: 1 };
  assert.equal(zoomFromCorner({ anchorX: 0.25, anchorY: 0, pointX: 0.75, pointY: 1, full }), 1);
  assert.equal(zoomFromCorner({ anchorX: 0.25, anchorY: 0, pointX: 0.5, pointY: 0.5, full }), 2);
  assert.equal(zoomFromCorner({ anchorX: 0.25, anchorY: 0, pointX: 0.25, pointY: 0, full }), 4, 'no smaller than the largest zoom allows');
});

test('turned, the resets and what has changed', () => {
  assert.equal(turned(0, -1), 270);
  assert.equal(turned(270, 1), 0);
  const style = { ...NEUTRAL, rotate: 90, flipX: true, look: 'mono', brightness: 1.2, x: 0.2 };
  assert.deepEqual(resetStyle(style, 'turn'), { ...style, rotate: 0, flipX: false });
  assert.deepEqual(resetStyle(style, 'all'), { ...NEUTRAL });
  assert.equal(sectionChanged(style, 'adjust'), true);
  assert.equal(sectionChanged(style, 'overlay'), false);
  assert.equal(sectionChanged(NEUTRAL, 'all'), false);
  assert.equal(sectionChanged({ ...NEUTRAL, x: 0.2 }, 'all'), true, 'the framing counts for «Reset all»');
});

test('ratioValue: a shape as the frame\'s width over its height', () => {
  assert.equal(ratioValue('16:9'), 16 / 9);
  assert.equal(ratioValue('3:2'), 1.5);
  assert.equal(ratioValue('portrait'), 0.75);
  assert.equal(ratioValue('original', 1.25), 1.25);
  assert.equal(ratioValue('original'), null, 'not known before the picture loads');
  assert.equal(ratioValue('free'), null);
});

test('the duotone\'s colours are kept only with the duotone look, and the default pair is left out', () => {
  assert.deepEqual(storedStyle({ ...NEUTRAL, look: 'duotone' }), { look: 'duotone' });
  assert.deepEqual(storedStyle({ ...NEUTRAL, look: 'duotone', duotone: { dark: 'text', light: 'accent' } }), { look: 'duotone', duotone: { dark: 'text', light: 'accent' } });
  assert.deepEqual(storedStyle({ ...NEUTRAL, look: 'mono', duotone: { dark: 'text', light: 'accent' } }), { look: 'mono' });
  assert.equal(sectionChanged({ ...NEUTRAL, duotone: { dark: 'text', light: 'accent' } }, 'look'), true);
  assert.deepEqual(resetStyle({ ...NEUTRAL, look: 'duotone', duotone: { dark: 'text', light: 'bg' } }, 'look').duotone, { dark: '#000000', light: 'accent' });
});

test('movedFrame and frameAt: the frame moved over the picture, held inside it, as the focus point it stands at', () => {
  // A frame half the picture wide, from the left edge: moved a quarter right it stands in the middle.
  const win = { left: 0, top: 0, width: 0.5, height: 1 };
  assert.deepEqual(movedFrame(win, 0.25, 0, { x: 0, y: 0.3 }), { x: 0.5, y: 0.3 }, 'the axis it fills keeps its point');
  assert.deepEqual(movedFrame(win, 2, 0, { x: 0, y: 0.5 }), { x: 1, y: 0.5 }, 'held inside the picture');
  assert.deepEqual(frameAt(win, { x: 0.75, y: 0.5 }, { x: 0, y: 0.5 }), { x: 1, y: 0.5 }, 'a click on the right puts the frame there');
});

test('sharpness: a 600 px picture in a 1000 px frame is not sharp, a 1600 px one is, and the zoom, the turn and the fit count', () => {
  const frame = { width: 1000, height: 600 };
  const small = sharpness({ natural: { width: 600, height: 400 }, frame });
  assert.equal(small.sharp, false);
  assert.equal(small.drawnWidth, 1000);
  assert.equal(sharpness({ natural: { width: 1600, height: 1067 }, frame }).sharp, true);
  // Zoomed twice, the same picture needs twice the pixels.
  assert.equal(sharpness({ natural: { width: 1600, height: 1067 }, frame, zoom: 2 }).sharp, false);
  // A quarter turn lays the picture's height across the frame.
  assert.equal(sharpness({ natural: { width: 1600, height: 900 }, frame, quarter: true }).scale, 1000 / 900);
  // Whole in its frame, the picture is drawn by its tighter side.
  assert.equal(sharpness({ natural: { width: 2000, height: 600 }, frame, fit: 'contain' }).scale, 0.5);
  // A few per cent past its own size still counts as sharp.
  assert.equal(sharpness({ natural: { width: 980, height: 588 }, frame }).sharp, true);
  assert.equal(sharpness({ natural: { width: 1200, height: 800 }, frame, grow: 1.3 }).sharp, false);
  assert.equal(sharpness({ natural: null, frame }), null);
  assert.equal(sharpness({ natural: { width: 600, height: 400 }, frame: null }), null);
});

test('dataUrlBytes: a data URL weighed from its base64, a path left to the file', () => {
  assert.equal(dataUrlBytes('data:image/webp;base64,' + btoa('abcd')), 4);
  assert.equal(dataUrlBytes('data:image/webp;base64,' + btoa('abcde')), 5);
  assert.equal(dataUrlBytes('data:image/webp;base64,' + btoa('abcdef')), 6);
  assert.equal(dataUrlBytes('/media/images/a.webp'), null);
  assert.equal(dataUrlBytes(''), null);
  assert.equal(isDrawing('data:image/svg+xml;base64,PHN2Zz4='), true);
  assert.equal(isDrawing('/media/images/logo.svg'), true);
  assert.equal(isDrawing('/media/images/a.webp'), false);
});

test('withShared: «Apply to all» gives the look, the adjustments and the overlay, and keeps each picture\'s framing, turn and fit', () => {
  assert.deepEqual(SHARED_KEYS, ['look', 'duotone', 'brightness', 'contrast', 'saturate', 'blur', 'overlay']);
  const from = { ...NEUTRAL, look: 'duotone', duotone: { dark: '#000000', light: '#e8590c' }, brightness: 1.2, overlay: { color: 'accent', strength: 0.4 }, zoom: 3, rotate: 90 };
  const next = withShared({ x: 0.2, zoom: 2, flipX: true, fit: 'contain', blur: 4 }, from);
  assert.deepEqual(next, { fit: 'contain', x: 0.2, zoom: 2, flipX: true, look: 'duotone', duotone: { dark: '#000000', light: '#e8590c' }, brightness: 1.2, overlay: { color: 'accent', strength: 0.4 } });
  // A picture with nothing stored takes only what the open one has.
  assert.deepEqual(withShared(undefined, { ...NEUTRAL, look: 'noir' }), { look: 'noir' });
  // The open picture at none takes the others back to none, their framing kept.
  assert.deepEqual(withShared({ y: 0.8, look: 'sepia', contrast: 1.4 }, { ...NEUTRAL }), { y: 0.8 });
});
