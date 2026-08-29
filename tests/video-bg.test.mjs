/**
 * Kontraktstester for video-bakgrunnslaget (engine/backgrounds/video.js):
 * kildevokteren er ankret og streng, og mediegrense-konstantene og
 * filendelse-avledningen for video henger sammen. Selve avspillingen
 * (autoloop, observer-pause, reduced-motion-plakaten) testes manuelt.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { isSafeVideo } = await engineImport('backgrounds/video.js');
const { mediaExtension, VIDEO_WARN_BYTES, VIDEO_MAX_BYTES, WARN_BYTES } = await engineImport('imageTools.js');

test('isSafeVideo: media-stier og video-data-URL-er slipper inn', () => {
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

test('isSafeVideo: alt annet avvises', () => {
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

test('mediaExtension: video-data-URL-er gir mp4/webm', () => {
  assert.equal(mediaExtension('data:video/mp4;base64,AAAA'), 'mp4');
  assert.equal(mediaExtension('data:video/webm;base64,AAAA'), 'webm');
  // Ukjent videotype faller til mp4 (opplastingen slipper uansett kun mp4/webm inn).
  assert.equal(mediaExtension('data:video/quicktime;base64,AAAA'), 'mp4');
});

test('mediegrensene: varsel under hard grense, og video-grensene over bildevarselet', () => {
  assert.ok(VIDEO_WARN_BYTES < VIDEO_MAX_BYTES);
  assert.ok(WARN_BYTES < VIDEO_WARN_BYTES);
});
