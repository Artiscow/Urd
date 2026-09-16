/**
 * The Screen device's viewport (editor/src/lib/own-screen.js): the owner's
 * own window width, and the per-browser editing size with its clamping.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ownWindowWidth, ownWindowWidthOf, screenSetting, screenViewport,
  SCREEN_WIDTH_MIN, SCREEN_WIDTH_MAX, SCREEN_HEIGHT_MIN, SCREEN_HEIGHT_MAX,
} from '../editor/src/lib/own-screen.js';

test('ownWindowWidth: the viewport width, the screen as the fallback, whole pixels, never below 1', () => {
  assert.equal(ownWindowWidth({ innerWidth: 1918, screenWidth: 2560 }), 1918, 'the window, not the monitor');
  assert.equal(ownWindowWidth({ innerWidth: 1536, screenWidth: 1920 }), 1536, 'a zoomed window reports zoomed CSS px');
  assert.equal(ownWindowWidth({ screenWidth: 1920 }), 1920, 'no viewport: the screen');
  assert.equal(ownWindowWidth({ innerWidth: 1512.5 }), 1513, 'whole pixels');
  assert.equal(ownWindowWidth(), 1);
  assert.equal(ownWindowWidthOf({ innerWidth: 1918, screen: { width: 2560 } }), 1918);
  assert.equal(ownWindowWidthOf({ innerWidth: 0, screen: { width: 1920 } }), 1920);
  assert.equal(ownWindowWidthOf(null), null);
  assert.equal(ownWindowWidthOf({}), null);
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

test('screenViewport: own mode follows the measured window, custom mode the stored size', () => {
  const own = screenSetting({ width: 1280 }, 1536);
  assert.deepEqual(screenViewport(own, 1536), { width: 1536, height: 0 });
  assert.deepEqual(screenViewport(own, 1920), { width: 1920, height: 0 }, 'a resized window is followed');
  const custom = screenSetting({ mode: 'custom', width: 1280 }, 1536);
  assert.deepEqual(screenViewport(custom, 1920), { width: 1280, height: 0 }, 'height 0 fills the panel');
  const pinned = screenSetting({ mode: 'custom', width: 1280, height: 900 }, 1536);
  assert.deepEqual(screenViewport(pinned, 1920), { width: 1280, height: 900 });
});
