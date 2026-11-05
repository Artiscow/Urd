/**
 * The cover a third-party frame stands behind until it is pressed (engine embed-cover.js): the provider read from the frame's address, and the visitor's choice kept per provider.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { providerOf, allowedProviders, setProviderAllowed, ALLOWED_KEY, coverFrame } = await engineImport('embed-cover.js');

/** A storage in memory, as the browser's localStorage answers. */
function memoryStorage() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
    raw: () => data,
  };
}

test('providerOf: the provider by the end of the frame\'s host, nothing for any other host', () => {
  assert.deepEqual(providerOf('https://www.youtube-nocookie.com/embed/abc'), { id: 'youtube', name: 'YouTube' });
  assert.deepEqual(providerOf('https://player.vimeo.com/video/1?dnt=1'), { id: 'vimeo', name: 'Vimeo' });
  assert.deepEqual(providerOf('https://www.openstreetmap.org/export/embed.html?bbox=1'), { id: 'openstreetmap', name: 'OpenStreetMap' });
  assert.equal(providerOf('https://youtube-nocookie.com.example.org/embed/abc'), null, 'a host that only starts with the name');
  assert.equal(providerOf('https://example.org/'), null);
  assert.equal(providerOf('not a url'), null);
});

test('the remembered choice: kept per provider, taken back, the key gone with the last', () => {
  const storage = memoryStorage();
  assert.deepEqual(allowedProviders(storage), []);
  setProviderAllowed('youtube', true, storage);
  setProviderAllowed('vimeo', true, storage);
  setProviderAllowed('youtube', true, storage);
  assert.deepEqual(allowedProviders(storage), ['youtube', 'vimeo']);
  setProviderAllowed('youtube', false, storage);
  assert.deepEqual(allowedProviders(storage), ['vimeo']);
  setProviderAllowed('vimeo', false, storage);
  assert.equal(storage.raw().has(ALLOWED_KEY), false, 'nothing left in the browser');
  storage.setItem(ALLOWED_KEY, '{broken');
  assert.deepEqual(allowedProviders(storage), [], 'a broken value reads as nothing');
  assert.deepEqual(allowedProviders(null), [], 'no storage at all');
});

test('the video block: a shape as its ratio, and a pressed player\'s address that starts it', async () => {
  const { VIDEO_ASPECTS, aspectRatio } = await engineImport('push-model.js');
  const { withAutoplay, videoBlock } = await engineImport('blocks/video.js');
  assert.deepEqual(VIDEO_ASPECTS, ['16:9', '4:3', '1:1', '9:16', '21:9', '4:5']);
  assert.equal(aspectRatio('16:9'), 16 / 9);
  assert.equal(aspectRatio('9:16'), 9 / 16);
  assert.equal(aspectRatio('free'), null, 'without a shape the video fills its frame');
  assert.equal(aspectRatio(undefined), null);
  assert.equal(videoBlock.defaults().aspect, '16:9', 'a new video is widescreen');
  assert.equal(videoBlock.autoGrow({ aspect: '1:1' }), true, 'a shaped video is its shape on the phone');
  assert.equal(videoBlock.autoGrow({}), false, 'one without keeps its frame\'s height');
  assert.equal(withAutoplay('https://www.youtube-nocookie.com/embed/abc'), 'https://www.youtube-nocookie.com/embed/abc?autoplay=1');
  assert.equal(withAutoplay('https://player.vimeo.com/video/1?h=ab&dnt=1'), 'https://player.vimeo.com/video/1?h=ab&dnt=1&autoplay=1');
  assert.equal(withAutoplay('not a url'), 'not a url');
});

test('an embed the owner loads with the page (askFirst off): the frame at once and no cover, in the editor too', () => {
  const appended = [];
  const host = { append: (node) => appended.push(node) };
  const frame = { frame: true };
  for (const preview of [true, false]) {
    appended.length = 0;
    const got = coverFrame(host, { src: 'https://www.youtube-nocookie.com/embed/abc', makeFrame: () => frame, ask: false, preview });
    assert.equal(got, frame);
    assert.deepEqual(appended, [frame]);
  }
});
