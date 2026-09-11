/**
 * Contract tests for the stats block's number logic: the parsing
 * of the display value and the formatting during the count-up animation must
 * preserve the number format (decimal separator and grouping). The animation
 * itself is DOM behavior and covered by the headless checks. Also includes
 * the accent wash from the timeline block (shared by quote).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { parseStatValue, formatStatValue } = await engineImport('blocks/stats.js');
const { accentCss } = await engineImport('blocks/timeline.js');

test('parseStatValue: plain numbers with grouping and decimals are parsed', () => {
  assert.deepEqual(parseStatValue('4800'), { num: 4800, decimals: 0 });
  assert.deepEqual(parseStatValue('4 800'), { num: 4800, decimals: 0 });
  assert.deepEqual(parseStatValue('1 234,5'), { num: 1234.5, decimals: 1 });
  assert.deepEqual(parseStatValue('98.25'), { num: 98.25, decimals: 2 });
});

test('parseStatValue: everything that is not a plain number gives null (no animation)', () => {
  assert.equal(parseStatValue('12+'), null);
  // 'ca 40' is deliberate non-numeric input ("about 40").
  assert.equal(parseStatValue('ca 40'), null);
  assert.equal(parseStatValue(''), null);
  assert.equal(parseStatValue(undefined), null);
});

test('formatStatValue: the shape follows the target value (separator and grouping)', () => {
  assert.equal(formatStatValue(2400, '4 800', 0), '2 400');
  assert.equal(formatStatValue(2400, '4800', 0), '2400');
  assert.equal(formatStatValue(617.2, '1 234,5', 1), '617,2');
  assert.equal(formatStatValue(49.12, '98.25', 2), '49.12');
});

test('accentCss: hex and theme tokens pass, everything else is rejected', () => {
  assert.equal(accentCss('#a1b2c3'), '#a1b2c3');
  assert.equal(accentCss('accent'), 'var(--urd-color-accent)');
  assert.equal(accentCss('url(x)'), null);
  assert.equal(accentCss('#zzz'), null);
  assert.equal(accentCss(null), null);
});
