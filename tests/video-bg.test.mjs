/**
 * Contract tests for the video background layer (engine/backgrounds/video.js):
 * the source guard is anchored and strict, and the media limit constants and
 * the file extension derivation for video hang together. The playback itself
 * (autoloop, observer pause, the reduced-motion poster) is tested manually.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { isSafeVideo } = await engineImport('backgrounds/video.js');
const { mediaExtension, VIDEO_WARN_BYTES, VIDEO_MAX_BYTES, WARN_BYTES } = await engineImport('imageTools.js');

test('isSafeVideo: media paths and video data URLs are let in', () => {
  for (const src of [
    '/media/video-1a2b3c4d.mp4',
    '/media/loop.webm',
    '/media/undermappe/film.MP4',
    'data:video/mp4;base64,AAAA',
    'data:video/webm;base64,QUJD',
  ]) {
    assert.equal(isSafeVideo(src), true, src);
  }
});

test('isSafeVideo: everything else is rejected', () => {
  for (const src of [
    '',
    null,
    'https://example.com/video.mp4',
    '//example.com/video.mp4',
    '/media/video.mov',
    '/assets/engine/0.6.11/urd.js',
    'data:image/png;base64,AAAA',
    'data:video/mp4;base64,AAAA" onload="x',
    'javascript:alert(1)',
  ]) {
    assert.equal(isSafeVideo(src), false, JSON.stringify(src));
  }
});

test('mediaExtension: video data URLs give mp4/webm', () => {
  assert.equal(mediaExtension('data:video/mp4;base64,AAAA'), 'mp4');
  assert.equal(mediaExtension('data:video/webm;base64,AAAA'), 'webm');
  // An unknown video type falls back to mp4 (the upload only lets mp4/webm in anyway).
  assert.equal(mediaExtension('data:video/quicktime;base64,AAAA'), 'mp4');
});

test('the media limits: warning below the hard limit, and the video limits above the image warning', () => {
  assert.ok(VIDEO_WARN_BYTES < VIDEO_MAX_BYTES);
  assert.ok(WARN_BYTES < VIDEO_WARN_BYTES);
});
