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
const { embedUrl } = await engineImport('blocks/video.js');

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
