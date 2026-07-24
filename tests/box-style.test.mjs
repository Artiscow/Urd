/**
 * Kontraktstester for kortstilene (boxStyleCss): skygge, kantlinje og
 * glass-effekt. Tomt/utelatt felt skal alltid gi basisstilen (tomt objekt).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { boxStyleCss } from '../template/assets/engine/box-style.js';

test('uten stil (undefined eller tomt objekt) er resultatet tomt', () => {
  assert.deepEqual(boxStyleCss(undefined), {});
  assert.deepEqual(boxStyleCss({}), {});
});

test('skygge-forvalgene gir box-shadow; ukjent verdi ignoreres', () => {
  assert.ok(boxStyleCss({ shadow: 'soft' }).boxShadow);
  assert.ok(boxStyleCss({ shadow: 'strong' }).boxShadow);
  assert.notEqual(boxStyleCss({ shadow: 'soft' }).boxShadow, boxStyleCss({ shadow: 'strong' }).boxShadow);
  assert.deepEqual(boxStyleCss({ shadow: 'enorm' }), {});
});

test('border none skrur av kantlinjen', () => {
  assert.equal(boxStyleCss({ border: 'none' }).border, 'none');
});

test('egen kantlinje med token-farge og tykkelse', () => {
  assert.equal(boxStyleCss({ border: { color: 'accent', width: 2 } }).border, '2px solid var(--urd-color-accent)');
});

test('egen kantlinje med hex-farge og standardtykkelse 1', () => {
  assert.equal(boxStyleCss({ border: { color: '#ff0000' } }).border, '1px solid #ff0000');
});

test('glass gir gjennomskinnelig flate og backdrop-filter', () => {
  const css = boxStyleCss({ glass: true });
  assert.ok(css.background.includes('transparent'));
  assert.ok(css.backdropFilter.includes('blur'));
  assert.equal(css.webkitBackdropFilter, css.backdropFilter);
});

test('stilene kombineres uavhengig', () => {
  const css = boxStyleCss({ shadow: 'soft', border: 'none', glass: true });
  assert.ok(css.boxShadow);
  assert.equal(css.border, 'none');
  assert.ok(css.background);
});
