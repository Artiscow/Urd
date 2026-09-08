/**
 * Contract tests for the card styles (boxStyleCss): shadow, border and
 * glass effect. An empty/omitted field must always give the base style
 * (empty object).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { boxStyleCss } = await engineImport('box-style.js');

test('without a style (undefined or empty object) the result is empty', () => {
  assert.deepEqual(boxStyleCss(undefined), {});
  assert.deepEqual(boxStyleCss({}), {});
});

test('the shadow presets give box-shadow; an unknown value is ignored', () => {
  assert.ok(boxStyleCss({ shadow: 'soft' }).boxShadow);
  assert.ok(boxStyleCss({ shadow: 'strong' }).boxShadow);
  assert.notEqual(boxStyleCss({ shadow: 'soft' }).boxShadow, boxStyleCss({ shadow: 'strong' }).boxShadow);
  assert.deepEqual(boxStyleCss({ shadow: 'enorm' }), {});
});

test('border none turns off the border', () => {
  assert.equal(boxStyleCss({ border: 'none' }).border, 'none');
});

test('custom border with token color and width', () => {
  assert.equal(boxStyleCss({ border: { color: 'accent', width: 2 } }).border, '2px solid var(--urd-color-accent)');
});

test('custom border with hex color and default width 1', () => {
  assert.equal(boxStyleCss({ border: { color: '#ff0000' } }).border, '1px solid #ff0000');
});

test('glass gives a translucent surface and backdrop-filter', () => {
  const css = boxStyleCss({ glass: true });
  assert.ok(css.background.includes('transparent'));
  assert.ok(css.backdropFilter.includes('blur'));
  assert.equal(css.webkitBackdropFilter, css.backdropFilter);
});

test('the styles combine independently', () => {
  const css = boxStyleCss({ shadow: 'soft', border: 'none', glass: true });
  assert.ok(css.boxShadow);
  assert.equal(css.border, 'none');
  assert.ok(css.background);
});

test('custom background color (block color): hex and token', () => {
  assert.equal(boxStyleCss({ bg: '#ff0000' }).background, '#ff0000');
  assert.equal(boxStyleCss({ bg: 'accent' }).background, 'var(--urd-color-accent)');
});

test('glass is tinted with the block color when it is set', () => {
  const withBg = boxStyleCss({ bg: '#ff0000', glass: true }).background;
  assert.ok(withBg.includes('color-mix'));
  assert.ok(withBg.includes('#ff0000')); // the glass uses the block color, not the theme surface
  // Without a block color the glass is tinted with the theme's surface.
  assert.ok(boxStyleCss({ glass: true }).background.includes('--urd-color-surface'));
});

test('shadow color: omitted = black, otherwise hex/token', () => {
  assert.equal(boxStyleCss({ shadow: 'soft' }).boxShadow, '0 6px 20px rgb(0 0 0 / 14%)');
  assert.equal(boxStyleCss({ shadow: 'soft', shadowColor: '#123456' }).boxShadow, '0 6px 20px #123456');
  assert.equal(boxStyleCss({ shadow: 'strong', shadowColor: 'accent' }).boxShadow, '0 14px 40px var(--urd-color-accent)');
  // shadowColor without shadow gives no shadow.
  assert.equal(boxStyleCss({ shadowColor: '#123456' }).boxShadow, undefined);
});
