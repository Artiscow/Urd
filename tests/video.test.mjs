/**
 * Tests for the video block's URL parsing. Security-relevant: the CSP's
 * frame-src trusts that ONLY youtube-nocookie and player.vimeo pass, so a
 * foreign host must never be smuggled into the iframe src.
 * Also covers the private-link hashes from the July 19, 2026 sweep
 * (vimeo.com/<id>/<hash> and ?h=).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { embedUrl, videoSource, videoPlayback, VIDEO_SOURCES, videoBlock } = await engineImport('blocks/video.js');

test('known video links give a privacy-friendly embed URL', () => {
  assert.equal(embedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  assert.equal(embedUrl('https://youtu.be/dQw4w9WgXcQ'),
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  assert.equal(embedUrl('https://www.youtube.com/shorts/dQw4w9WgXcQ'),
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  assert.equal(embedUrl('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'),
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  assert.equal(embedUrl('https://vimeo.com/76979871'),
    'https://player.vimeo.com/video/76979871?dnt=1');
});

test('vimeo private links keep the hash (required for private videos)', () => {
  assert.equal(embedUrl('https://vimeo.com/76979871/abcdef1234'),
    'https://player.vimeo.com/video/76979871?h=abcdef1234&dnt=1');
  assert.equal(embedUrl('https://player.vimeo.com/video/76979871?h=abcdef1234'),
    'https://player.vimeo.com/video/76979871?h=abcdef1234&dnt=1');
});

test('unknown hosts and invalid links are rejected', () => {
  for (const raw of [
    'https://evil.com/embed/x',
    'https://player.vimeo.com/',
    'https://player.vimeo.com/video/ikketall',
    'https://vimeo.com/ikketall',
    'https://www.youtube.com/embed/id/ekstra',
    'https://youtube.com.evil.com/watch?v=x',
    'ikke en url',
    '',
  ]) {
    assert.equal(embedUrl(raw), null, raw);
  }
});

test('videoSource: an embed unless a file is asked for', () => {
  assert.deepEqual(VIDEO_SOURCES, ['embed', 'file']);
  assert.equal(videoSource('file'), 'file');
  assert.equal(videoSource('embed'), 'embed');
  assert.equal(videoSource(undefined), 'embed');
  assert.equal(videoSource('stream'), 'embed');
  // The file source is additive: a stored block is still an embed at the same version.
  assert.equal(videoBlock.version, 1);
  assert.equal(videoBlock.defaults().source, undefined);
});

test('videoPlayback: a film starts by itself only when it is muted, and never under reduced motion', () => {
  assert.deepEqual(videoPlayback({}), { loop: false, muted: false, autoplay: false });
  assert.deepEqual(videoPlayback({ autoplay: true }), { loop: false, muted: false, autoplay: false });
  assert.deepEqual(videoPlayback({ autoplay: true, muted: true, loop: true }), { loop: true, muted: true, autoplay: true });
  assert.deepEqual(videoPlayback({ autoplay: true, muted: true }, true), { loop: false, muted: true, autoplay: false });
  // Only a real true counts.
  assert.deepEqual(videoPlayback({ autoplay: 'yes', muted: 'yes', loop: 1 }), { loop: false, muted: false, autoplay: false });
  assert.deepEqual(videoPlayback(undefined), { loop: false, muted: false, autoplay: false });
});
