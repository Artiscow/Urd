/**
 * imageTools: the pure SVG helpers for auto-trim at upload. The pixel
 * measuring (canvas) is DOM-dependent and covered by the headless checks;
 * here pure text is tested.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const {
  svgViewBox, tightSvgViewBox, mediaExtension, slugify, isAnimatedImage, animatedImageKind,
  AnimatedTooLargeError, ANIMATED_WARN_BYTES, ANIMATED_MAX_BYTES, VIDEO_WARN_BYTES, compressToWebp,
} = await engineImport('imageTools.js');

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

/* ---------- Animated images: recognised from their own bytes ---------- */

const text = (value) => [...value].map((ch) => ch.charCodeAt(0));
const be32 = (n) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255];
const bytesOf = (...parts) => new Uint8Array(parts.flat());

/** One GIF frame: an image descriptor, the LZW code size and one tiny data block. */
const gifFrame = () => [0x2c, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 1, 0, 0];
/** A graphic control extension, as every frame of an animation carries. */
const gifControl = () => [0x21, 0xf9, 4, 0, 10, 0, 0, 0];
const gif = (...blocks) => bytesOf(text('GIF89a'), [1, 0, 1, 0, 0, 0, 0], ...blocks, [0x3b]);
const pngChunk = (type, length) => [...be32(length), ...text(type), ...new Array(length).fill(0), 0, 0, 0, 0];
const png = (...chunks) => bytesOf([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], ...chunks);
const webp = (chunk, flags) => bytesOf(text('RIFF'), [0, 0, 0, 0], text('WEBP'), text(chunk), [10, 0, 0, 0], [flags, 0, 0, 0]);

test('animatedImageKind: a GIF with one frame is a still, with two an animation', () => {
  assert.equal(animatedImageKind(gif(gifFrame())), null);
  assert.equal(animatedImageKind(gif(gifControl(), gifFrame(), gifControl(), gifFrame())), 'gif');
  // The colour tables are stepped over, global and local alike.
  const withTable = bytesOf(text('GIF89a'), [1, 0, 1, 0, 0x80, 0, 0], new Array(6).fill(7), gifFrame(), gifFrame(), [0x3b]);
  assert.equal(animatedImageKind(withTable), 'gif');
  // A comment that happens to hold the frame marker is not a frame.
  assert.equal(animatedImageKind(gif([0x21, 0xfe, 3, 0x2c, 0x2c, 0x2c, 0], gifFrame())), null);
});

test('animatedImageKind: the WebP animation flag and the APNG control chunk', () => {
  assert.equal(animatedImageKind(webp('VP8X', 0x02)), 'webp');
  assert.equal(animatedImageKind(webp('VP8X', 0x10)), null);
  assert.equal(animatedImageKind(webp('VP8 ', 0x02)), null);
  assert.equal(animatedImageKind(png(pngChunk('IHDR', 13), pngChunk('acTL', 8), pngChunk('IDAT', 4))), 'png');
  assert.equal(animatedImageKind(png(pngChunk('IHDR', 13), pngChunk('IDAT', 4), pngChunk('IEND', 0))), null);
  // An animation chunk after the image data does not make an APNG.
  assert.equal(animatedImageKind(png(pngChunk('IHDR', 13), pngChunk('IDAT', 4), pngChunk('acTL', 8))), null);
});

test('isAnimatedImage: junk, truncated files and other types are stills, never a throw', () => {
  assert.equal(isAnimatedImage(gif(gifControl(), gifFrame(), gifFrame())), true);
  assert.equal(isAnimatedImage(new Uint8Array(0)), false);
  assert.equal(isAnimatedImage(bytesOf(text('GIF89a'))), false);
  assert.equal(isAnimatedImage(bytesOf(text('GIF89a'), [1, 0, 1, 0, 0, 0, 0], [0x2c, 0, 0])), false);
  assert.equal(isAnimatedImage(bytesOf(text('RIFF'), [0, 0, 0, 0], text('WEBP'))), false);
  assert.equal(isAnimatedImage(png(pngChunk('IHDR', 13).slice(0, 10))), false);
  assert.equal(isAnimatedImage(bytesOf([0xff, 0xd8, 0xff, 0xe0], text('JFIF'))), false);
  assert.equal(isAnimatedImage('GIF89a'), false);
  assert.equal(isAnimatedImage(null), false);
  // A sub-block length that points past the end ends the walk.
  assert.equal(isAnimatedImage(gif([0x21, 0xf9, 200])), false);
});

test('the kept animations publish under their own extension, and the caps are in order', () => {
  assert.equal(mediaExtension('data:image/gif;base64,abc'), 'gif');
  assert.equal(mediaExtension('data:image/png;base64,abc'), 'png');
  assert.equal(mediaExtension('data:image/apng;base64,abc'), 'png');
  assert.equal(mediaExtension('data:image/webp;base64,abc'), 'webp');
  assert.equal(mediaExtension('data:image/jpeg;base64,abc'), 'webp');
  assert.ok(ANIMATED_WARN_BYTES < ANIMATED_MAX_BYTES);
  // Above the animation's cap a video is the answer, and that is where the video's own warning starts.
  assert.ok(ANIMATED_MAX_BYTES <= VIDEO_WARN_BYTES);
  const err = new AnimatedTooLargeError(5_000_000);
  assert.equal(err.code, 'animatedTooLarge');
  assert.equal(err.bytes, 5_000_000);
});

test('compressToWebp: a large animated GIF is refused from its beginning, without reading the whole file', async () => {
  // The loop block an animated GIF carries before its first frame, then a frame and more than the cap of padding.
  const loop = [0x21, 0xff, 11, ...text('NETSCAPE2.0'), 3, 1, 0, 0, 0];
  const head = gif(loop, gifControl(), gifFrame());
  const big = new Uint8Array(ANIMATED_MAX_BYTES + 100_000);
  big.set(head.subarray(0, head.length - 1));
  await assert.rejects(compressToWebp(new File([big], 'big.gif', { type: 'image/gif' })), AnimatedTooLargeError);
});
