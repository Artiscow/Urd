/**
 * The Screen device's viewport (editor/src/lib/own-screen.js): the owner's
 * own window width, and the per-browser editing size with its clamping.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ownWindowWidth, ownWindowWidthOf, screenSetting, screenViewport, screenIcon, SCREEN_SIZES,
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
  for (const raw of [null, undefined, 'x', 42, [], {}]) {
    assert.deepEqual(screenSetting(raw, 1536), { size: 'window', width: 1536, height: 0 }, `raw ${JSON.stringify(raw)}`);
  }
  assert.equal(screenSetting({}, 500).width, SCREEN_WIDTH_MIN, 'the own width is clamped for the field');
  assert.equal(screenSetting({}, 5000).width, SCREEN_WIDTH_MAX);
  assert.equal(screenSetting({ size: 'weird' }, 1536).size, 'window');
  assert.equal(screenSetting({ size: 'fhd' }, 1536).size, 'fhd');
});

test('screenSetting: a preference stored before the sizes reads as it did', () => {
  assert.equal(screenSetting({ mode: 'custom', width: 1280 }, 1536).size, 'own');
  assert.equal(screenSetting({ mode: 'own', width: 1280 }, 1536).size, 'window');
});

test('screenSetting: width and height are clamped, an empty height means fill', () => {
  assert.equal(screenSetting({ size: 'own', width: 100 }, 1536).width, SCREEN_WIDTH_MIN);
  assert.equal(screenSetting({ size: 'own', width: 9999 }, 1536).width, SCREEN_WIDTH_MAX);
  assert.equal(screenSetting({ size: 'own', width: '1500' }, 1536).width, 1500);
  for (const h of [0, '', null, -5, 'x']) {
    assert.equal(screenSetting({ size: 'own', width: 1280, height: h }, 1536).height, 0, `height ${String(h)}`);
  }
  assert.equal(screenSetting({ size: 'own', width: 1280, height: 300 }, 1536).height, SCREEN_HEIGHT_MIN);
  assert.equal(screenSetting({ size: 'own', width: 1280, height: 5000 }, 1536).height, SCREEN_HEIGHT_MAX);
  assert.deepEqual(screenSetting({ size: 'own', width: 1280, height: 900.4 }, 1536), { size: 'own', width: 1280, height: 900 });
});

test('screenViewport: the own window follows the measured window, a common size has its height, the own size its own', () => {
  const own = screenSetting({ width: 1280 }, 1536);
  assert.deepEqual(screenViewport(own, 1536), { width: 1536, height: 0 });
  assert.deepEqual(screenViewport(own, 1920), { width: 1920, height: 0 }, 'a resized window is followed');
  assert.deepEqual(screenViewport(screenSetting({ size: 'laptop-s' }, 1536), 1920), { width: 1280, height: 800 });
  const custom = screenSetting({ size: 'own', width: 1280 }, 1536);
  assert.deepEqual(screenViewport(custom, 1920), { width: 1280, height: 0 }, 'height 0 fills the panel');
  const pinned = screenSetting({ size: 'own', width: 1280, height: 900 }, 1536);
  assert.deepEqual(screenViewport(pinned, 1920), { width: 1280, height: 900 });
});

test('the common screen sizes rise from the narrowest, each with a height and an icon', () => {
  for (let i = 1; i < SCREEN_SIZES.length; i++) assert.ok(SCREEN_SIZES[i].width > SCREEN_SIZES[i - 1].width);
  assert.ok(SCREEN_SIZES.every((s) => s.height > 0 && s.height < s.width && s.icon));
  assert.equal(screenIcon({ size: 'laptop' }), 'device_laptop');
  assert.equal(screenIcon({ size: 'window' }), 'device_desktop');
});

test('screenSetting: a common ratio keeps its own width and takes its height from the ratio', () => {
  const pref = screenSetting({ size: 'ratio', ratio: '16:9', ratioWidth: 1600, width: 1280, height: 800 }, 1536);
  assert.deepEqual(pref, { size: 'ratio', width: 1280, height: 800, ratio: '16:9', ratioWidth: 1600 }, 'the own size stays as it was');
  assert.deepEqual(screenViewport(pref, 1920), { width: 1600, height: 900 });
  assert.deepEqual(screenViewport(screenSetting({ size: 'ratio', ratio: '21:9' }, 1536), 1920), { width: 1536, height: 658 }, 'no width: the own window at the pick');
  assert.equal(screenSetting({ size: 'ratio', ratio: '16:9', ratioWidth: 9999 }, 1536).ratioWidth, SCREEN_WIDTH_MAX);
  assert.equal(screenSetting({ size: 'ratio', ratio: '19.5:9' }, 1536).size, 'window', 'a phone ratio is not the screen\'s');
  assert.equal(screenSetting({ size: 'ratio' }, 1536).size, 'window');
  assert.equal('ratio' in screenSetting({ size: 'own', ratio: '16:9' }, 1536), false, 'only a ratio size keeps a ratio');
  assert.equal(screenIcon(pref), 'device_desktop');
});
