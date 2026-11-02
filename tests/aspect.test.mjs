/**
 * The preview's aspect ratios (editor/src/lib/aspect.js): the heights the common ratios give, and the ratio every listed size goes by.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { RATIOS, SCREEN_RATIOS, PHONE_RATIOS, ratioHeight, aspectOf, aspectText } from '../editor/src/lib/aspect.js';
import { SCREEN_SIZES } from '../editor/src/lib/own-screen.js';
import { PHONE_SIZES } from '../editor/src/lib/preview-width.js';

test('a ratio gives a screen its shorter side and an upright phone its longer', () => {
  assert.equal(ratioHeight(1600, '16:9', false), 900);
  assert.equal(ratioHeight(1440, '16:10', false), 900);
  assert.equal(ratioHeight(390, '19.5:9', true), 845);
  assert.equal(ratioHeight(412, '20:9', true), 916);
  assert.equal(ratioHeight(1600, 'nope', false), 0);
  for (const id of [...SCREEN_RATIOS, ...PHONE_RATIOS]) assert.ok(RATIOS[id], id);
});

test('every listed size goes by a common ratio', () => {
  const name = (w, h) => aspectText(aspectOf(w, h));
  assert.deepEqual(SCREEN_SIZES.map((s) => name(s.width, s.height)), ['16:10', '16:10', '16:9', '16:9']);
  assert.deepEqual(PHONE_SIZES.map((p) => name(p.width, p.height)), ['19.5:9', '19.5:9', '20:9', '19.5:9', '4:3']);
});

test('a size off the common ratios is named by its proportions, and a size without a height by none', () => {
  assert.equal(aspectText(aspectOf(1850, 1000)), '1.85:1');
  assert.equal(aspectText(aspectOf(800, 800)), '1:1');
  assert.equal(aspectOf(1280, 0), null);
  assert.equal(aspectText(null), '');
  assert.equal(aspectText([19.5, 9], (n) => String(n).replace('.', ',')), '19,5:9', 'the numbers in the format given');
});

test('every size row in the fold-outs has a ratio cell, and both fold-outs offer their common ratios', () => {
  const src = readFileSync(new URL('../editor/src/shell/TopBar.svelte', import.meta.url), 'utf8');
  const rows = src.match(/<button type="button" class="ghost device-size"[\s\S]*?<\/button>/g) ?? [];
  assert.ok(rows.length >= 4, 'the screen and phone rows are found');
  for (const row of rows) assert.match(row, /class="device-ratio"/, row.slice(0, 120));
  assert.equal((src.match(/class="device-own"[\s\S]*?<\/div>/g) ?? []).filter((own) => own.includes('class="device-ratio"')).length, 2, 'both own sizes name their ratio');
  assert.match(src, /@render ratios\('desktop', SCREEN_RATIOS/);
  assert.match(src, /@render ratios\('mobile', PHONE_RATIOS/);
});
