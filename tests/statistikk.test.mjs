/**
 * Kontraktstester for statistikk-blokkens tallogikk (0.6.7.11): tolkingen av
 * visningsverdien og formateringen underveis i tell-opp-animasjonen skal
 * bevare tallformatet (desimalskille og gruppering). Selve animasjonen er
 * DOM-atferd og dekkes av headless-sjekkene. Tar også med aksentvasken fra
 * tidslinje-blokken (delt av sitat).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { parseStatValue, formatStatValue } = await engineImport('blocks/statistikk.js');
const { accentCss } = await engineImport('blocks/tidslinje.js');

test('parseStatValue: rene tall med gruppering og desimal tolkes', () => {
  assert.deepEqual(parseStatValue('4800'), { num: 4800, decimals: 0 });
  assert.deepEqual(parseStatValue('4 800'), { num: 4800, decimals: 0 });
  assert.deepEqual(parseStatValue('1 234,5'), { num: 1234.5, decimals: 1 });
  assert.deepEqual(parseStatValue('98.25'), { num: 98.25, decimals: 2 });
});

test('parseStatValue: alt som ikke er et rent tall gir null (ingen animasjon)', () => {
  assert.equal(parseStatValue('12+'), null);
  assert.equal(parseStatValue('ca 40'), null);
  assert.equal(parseStatValue(''), null);
  assert.equal(parseStatValue(undefined), null);
});

test('formatStatValue: formen følger målverdien (skille og gruppering)', () => {
  assert.equal(formatStatValue(2400, '4 800', 0), '2 400');
  assert.equal(formatStatValue(2400, '4800', 0), '2400');
  assert.equal(formatStatValue(617.2, '1 234,5', 1), '617,2');
  assert.equal(formatStatValue(49.12, '98.25', 2), '49.12');
});

test('accentCss: hex og tematoken slippes gjennom, alt annet avvises', () => {
  assert.equal(accentCss('#a1b2c3'), '#a1b2c3');
  assert.equal(accentCss('accent'), 'var(--urd-color-accent)');
  assert.equal(accentCss('url(x)'), null);
  assert.equal(accentCss('#zzz'), null);
  assert.equal(accentCss(null), null);
});
