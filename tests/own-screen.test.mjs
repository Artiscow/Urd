/**
 * The Screen device's viewport (editor/src/lib/own-screen.js): the owner's
 * own screen width, and the per-browser editing size with its clamping.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ownScreenWidth, ownScreenWidthOf, screenSetting, screenViewport,
  SCREEN_WIDTH_MIN, SCREEN_WIDTH_MAX, SCREEN_HEIGHT_MIN, SCREEN_HEIGHT_MAX,
} from '../editor/src/lib/own-screen.js';

test('ownScreenWidth: screen.width wins, the window is the fallback, whole pixels, never below 1', () => {
  assert.equal(ownScreenWidth({ screenWidth: 1536, innerWidth: 1200 }), 1536);
  assert.equal(ownScreenWidth({ innerWidth: 1280 }), 1280);
  assert.equal(ownScreenWidth({ screenWidth: 1512.5 }), 1513);
  assert.equal(ownScreenWidth(), 1);
  assert.equal(ownScreenWidthOf({ screen: { width: 1920 }, innerWidth: 1500 }), 1920);
  assert.equal(ownScreenWidthOf(null), null);
  assert.equal(ownScreenWidthOf({}), null);
});

test('screenSetting: defaults for anything that is not a stored preference', () => {
  for (const raw of [null, undefined, 'x', [], {}, 42]) {
    assert.deepEqual(screenSetting(raw, 1536), { mode: 'own', width: 1536, height: 0 }, `raw ${JSON.stringify(raw)}`);
  }
  assert.equal(screenSetting({}, 500).width, SCREEN_WIDTH_MIN, 'the own width is clamped for the field');
  assert.equal(screenSetting({}, 5000).width, SCREEN_WIDTH_MAX);
  assert.equal(screenSetting({ mode: 'weird' }, 1536).mode, 'own');
});

test('screenSetting: width and height are clamped, an empty height means fill', () => {
  assert.equal(screenSetting({ mode: 'custom', width: 100 }, 1536).width, SCREEN_WIDTH_MIN);
  assert.equal(screenSetting({ mode: 'custom', width: 9999 }, 1536).width, SCREEN_WIDTH_MAX);
  assert.equal(screenSetting({ mode: 'custom', width: '1500' }, 1536).width, 1500);
  for (const h of ['', 0, -5, NaN, undefined, 'abc']) {
    assert.equal(screenSetting({ mode: 'custom', width: 1280, height: h }, 1536).height, 0, `height ${String(h)}`);
  }
  assert.equal(screenSetting({ mode: 'custom', width: 1280, height: 300 }, 1536).height, SCREEN_HEIGHT_MIN);
  assert.equal(screenSetting({ mode: 'custom', width: 1280, height: 5000 }, 1536).height, SCREEN_HEIGHT_MAX);
  assert.deepEqual(screenSetting({ mode: 'custom', width: 1280, height: 900.4 }, 1536), { mode: 'custom', width: 1280, height: 900 });
});

test('screenViewport: own mode follows the measured screen, custom mode the stored size', () => {
  const own = screenSetting({ width: 1280 }, 1536);
  assert.deepEqual(screenViewport(own, 1536), { width: 1536, height: 0 });
  assert.deepEqual(screenViewport(own, 1920), { width: 1920, height: 0 }, 'a changed screen is followed');
  const custom = screenSetting({ mode: 'custom', width: 1280 }, 1536);
  assert.deepEqual(screenViewport(custom, 1920), { width: 1280, height: 0 }, 'height 0 fills the panel');
  const pinned = screenSetting({ mode: 'custom', width: 1280, height: 900 }, 1536);
  assert.deepEqual(screenViewport(pinned, 1920), { width: 1280, height: 900 });
});
