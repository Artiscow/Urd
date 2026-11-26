/**
 * The model behind the nav size settings (editor/src/lib/nav-size.js,
 * ADR-0023): the presets equal the rem table in base.css, the effective
 * values seed the sliders where the CSS actually is, and the bounds equal
 * the engine's NAV_SIZE_BOUNDS so the two never drift.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { engineImport } from './_engine.mjs';
import {
  PAD_Y, TEXT_SIZE, PAD_X, GAP, PILL_WIDTH, SHRINK_TO, LOGO_SIZE, LOGO_TEXT_SIZE, RADIUS, COL_WIDTH,
  SIZE_PRESETS, SIZE_IDS, PILL_FACTOR,
  clampRange, effectivePadY, effectiveTextSize, sizePresetOf, isFloatingVariant,
  phoneSizes, phoneStep,
} from '../editor/src/lib/nav-size.js';
const { NAV_SIZE_BOUNDS } = await engineImport('nav-model.js');

test('the bounds equal the engine bounds', () => {
  const pairs = { padY: PAD_Y, textSize: TEXT_SIZE, padX: PAD_X, gap: GAP, pillWidth: PILL_WIDTH, shrinkTo: SHRINK_TO, logoSize: LOGO_SIZE, logoTextSize: LOGO_TEXT_SIZE, radius: RADIUS };
  for (const [key, range] of Object.entries(pairs)) {
    assert.deepEqual([range.min, range.max], NAV_SIZE_BOUNDS[key], key);
  }
});

test('the presets are the rem values of base.css at a 16 px root', () => {
  assert.deepEqual(SIZE_IDS, ['sm', 'md', 'lg', 'xl']);
  assert.deepEqual(SIZE_PRESETS.sm, { padY: 0.55 * 16, textSize: 0.85 * 16 });
  assert.deepEqual(SIZE_PRESETS.md, { padY: 0.9 * 16, textSize: 16 });
  assert.deepEqual(SIZE_PRESETS.lg, { padY: 1.25 * 16, textSize: 1.05 * 16 });
  assert.deepEqual(SIZE_PRESETS.xl, { padY: 1.7 * 16, textSize: 1.15 * 16 });
});

test('the presets are read from the size classes in base.css, md from the values the bar falls back to, and the floating menu scales by the same factor', () => {
  const css = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8');
  const px = (rem) => Number(rem) * 16;
  for (const id of SIZE_IDS.filter((size) => size !== 'md')) {
    const rule = css.match(new RegExp(`^\\.urd-nav-size-${id} \\{\\s*--urd-nav-size-pad: ([\\d.]+)rem;\\s*--urd-nav-size-font: ([\\d.]+)rem;\\s*\\}`, 'm'));
    assert.ok(rule, `base.css sizes ${id}`);
    assert.deepEqual(SIZE_PRESETS[id], { padY: px(rule[1]), textSize: px(rule[2]) }, id);
  }
  assert.doesNotMatch(css, /\.urd-nav-size-md\b/, 'md has no class of its own');
  const pad = css.match(/--urd-nav-base-pad: var\(--urd-nav-pad-y, var\(--urd-nav-size-pad, ([\d.]+)rem\)\);/);
  const font = css.match(/--urd-nav-font: var\(--urd-nav-text-size, var\(--urd-nav-size-font, ([\d.]+)rem\)\);/);
  assert.deepEqual(SIZE_PRESETS.md, { padY: px(pad[1]), textSize: px(font[1]) });
  const floating = css.match(/--urd-nav-base-pad: var\(--urd-nav-pad-y, calc\(var\(--urd-nav-size-pad, ([\d.]+)rem\) \* ([\d.]+)\)\);/);
  assert.equal(px(floating[1]), SIZE_PRESETS.md.padY);
  assert.equal(Number(floating[2]), PILL_FACTOR);
});

test('effectivePadY: the preset for the bar, scaled for the floating menu, raw when set', () => {
  assert.equal(effectivePadY({}, 'bar'), 14);
  assert.equal(effectivePadY({ size: 'xl' }, undefined), 27);
  assert.equal(effectivePadY({ size: 'md' }, 'floating'), Math.round(14.4 * PILL_FACTOR));
  assert.equal(effectivePadY({ size: 'lg' }, 'floating-tab'), Math.round(20 * PILL_FACTOR));
  // An explicit thickness is drawn as set in every variant.
  assert.equal(effectivePadY({ size: 'lg', padY: 30 }, 'floating'), 30);
  assert.equal(effectivePadY({ padY: 999 }, 'bar'), PAD_Y.max);
  assert.equal(effectivePadY({ padY: -4 }, 'bar'), PAD_Y.min);
  assert.equal(effectivePadY({ padY: '' }, 'bar'), 14, 'an emptied field is the preset');
  assert.ok(isFloatingVariant('floating-square'));
  assert.ok(!isFloatingVariant('side-left'));
});

test('effectiveTextSize: the preset, or the stored value clamped', () => {
  assert.equal(effectiveTextSize({}), 16);
  assert.equal(effectiveTextSize({ size: 'sm' }), 14);
  assert.equal(effectiveTextSize({ size: 'sm', textSize: 20 }), 20);
  assert.equal(effectiveTextSize({ textSize: 5 }), TEXT_SIZE.min);
});

test('sizePresetOf: the stored size while nothing overrides it', () => {
  assert.equal(sizePresetOf(undefined), 'md');
  assert.equal(sizePresetOf({}), 'md');
  assert.equal(sizePresetOf({ size: 'lg' }), 'lg');
  assert.equal(sizePresetOf({ size: 'weird' }), 'md');
  assert.equal(sizePresetOf({ size: 'lg', padY: 20 }), null);
  assert.equal(sizePresetOf({ textSize: 16 }), null);
});

test('clampRange snaps to the step and stays within the bounds', () => {
  assert.equal(clampRange(1005, PILL_WIDTH, 1100), 1000);
  assert.equal(clampRange(10, PILL_WIDTH, 1100), PILL_WIDTH.min);
  assert.equal(clampRange(99999, PILL_WIDTH, 1100), PILL_WIDTH.max);
  assert.equal(clampRange('', PILL_WIDTH, 1100), 1100);
  // Deliberate Norwegian garbage input (any non-number gives the fallback).
  assert.equal(clampRange('ikke et tall', PILL_WIDTH, 1100), 1100);
  assert.equal(clampRange(0.33, SHRINK_TO, 0.5), 0.35);
  assert.equal(clampRange(0.1, SHRINK_TO, 0.5), SHRINK_TO.min);
  assert.equal(clampRange(250, COL_WIDTH, 250), 250);
  assert.equal(clampRange(50, COL_WIDTH, 250), COL_WIDTH.min);
});

test('phoneSizes: what the phone draws now, its own value before the desktop\'s before the size step\'s', () => {
  assert.deepEqual(phoneSizes({}), { padY: 14, textSize: 16, logo: 'text', logoSize: 16 });
  assert.deepEqual(phoneSizes({ style: { size: 'lg', padY: 30, mobile: { padY: 10, size: 'sm' } } }), { padY: 10, textSize: 14, logo: 'text', logoSize: 14 });
  assert.equal(phoneSizes({ style: { padY: 30 } }).padY, 30, 'the desktop\'s own value where the phone has none');
  assert.equal(phoneSizes({ variant: 'side-left' }).padY, null, 'the column has no thickness');
  // The logo: the picture's height, or the words' size; none where the phone's bar shows no logo.
  assert.deepEqual([phoneSizes({ logo: { type: 'image', value: '/a.png' } }).logo, phoneSizes({ logo: { type: 'image', value: '/a.png' } }).logoSize], ['image', 32]);
  assert.equal(phoneSizes({ logo: { type: 'image', value: '/a.png', size: 40, mobileSize: 24 } }).logoSize, 24);
  assert.equal(phoneSizes({ logo: { type: 'both', value: 'Urd', image: '/a.png', mobileParts: 'text', textSize: 20, mobileTextSize: 18 } }).logo, 'text');
  assert.equal(phoneSizes({ logo: { type: 'both', value: 'Urd', image: '/a.png', mobileParts: 'text', textSize: 20, mobileTextSize: 18 } }).logoSize, 18);
  assert.equal(phoneSizes({ logo: { type: 'text', value: 'Urd', show: false } }).logo, null);
  assert.equal(phoneSizes({ logo: { type: 'text', value: 'Urd' }, style: { mobile: { logo: 'hidden' } } }).logo, null);
});

test('phoneStep: a step writes the phone\'s own value from what is drawn now, and stops at the bounds', () => {
  assert.deepEqual(phoneStep({}, 'padY', 1), { on: 'mobile', key: 'padY', value: 16 });
  assert.deepEqual(phoneStep({ style: { mobile: { padY: 10 } } }, 'padY', -1), { on: 'mobile', key: 'padY', value: 8 });
  assert.equal(phoneStep({ style: { mobile: { padY: PAD_Y.min } } }, 'padY', -1), null);
  assert.equal(phoneStep({ variant: 'side-right' }, 'padY', 1), null);
  assert.deepEqual(phoneStep({}, 'textSize', -1), { on: 'mobile', key: 'textSize', value: 15 });
  assert.equal(phoneStep({ style: { mobile: { textSize: TEXT_SIZE.max } } }, 'textSize', 1), null);
  assert.deepEqual(phoneStep({ logo: { type: 'image', value: '/a.png' } }, 'logo', 1), { on: 'logo', key: 'mobileSize', value: 34 });
  assert.deepEqual(phoneStep({ logo: { type: 'text', value: 'Urd' } }, 'logo', -1), { on: 'logo', key: 'mobileTextSize', value: 15 });
  assert.equal(phoneStep({ logo: { type: 'text', value: 'Urd', show: false } }, 'logo', 1), null);
});
