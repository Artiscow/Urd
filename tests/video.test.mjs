/**
 * Test av video-blokkens URL-parsing. Sikkerhetsrelevant: CSP-ens frame-src stoler på at KUN youtube-nocookie og player.vimeo slipper gjennom, så en fremmed vert må aldri kunne smugles inn i iframe-src.
 * Dekker også privatlenke-hashene fra sveipen 19. juli 2026 (vimeo.com/<id>/<hash> og ?h=).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { embedUrl } from '../template/assets/engine/blocks/video.js';

test('kjente videolenker gir personvennlig embed-URL', () => {
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

test('vimeo-privatlenker beholder hashen (kreves for private videoer)', () => {
  assert.equal(embedUrl('https://vimeo.com/76979871/abcdef1234'),
    'https://player.vimeo.com/video/76979871?h=abcdef1234&dnt=1');
  assert.equal(embedUrl('https://player.vimeo.com/video/76979871?h=abcdef1234'),
    'https://player.vimeo.com/video/76979871?h=abcdef1234&dnt=1');
});

test('ukjente verter og ugyldige lenker avvises', () => {
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
