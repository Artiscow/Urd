/**
 * The colour picker's palette (editor/src/lib/colour-grid.js, BACKLOG 0.7.9.1): twelve hues and a grey in eight rows of even lightness, in six strengths, worked out in OKLCH.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { GRID_HUES, GRID_STRENGTHS, colourGrid, strengthOf, pickerStart, oklchToCode, codeToOklch } from '../editor/src/lib/colour-grid.js';

test('each strength is a grid of eight rows of the grey and twelve hues, every colour a code', () => {
  assert.deepEqual(GRID_STRENGTHS, ['vivid', 'soft', 'muted', 'deep', 'pastel', 'neon']);
  assert.equal(GRID_HUES.length, 13);
  assert.equal(GRID_HUES[0][0], 'grey');
  for (const id of GRID_STRENGTHS) {
    const grid = colourGrid(id);
    assert.equal(grid.length, 8, `${id}: eight rows`);
    grid.forEach((row, i) => {
      assert.deepEqual(row.map((cell) => cell.hue), GRID_HUES.map(([hue]) => hue), `${id}: the columns in order`);
      for (const cell of row) {
        assert.match(cell.code, /^#[0-9a-f]{6}$/, `${id} ${cell.hue}: a code`);
        assert.equal(cell.step, i + 1);
      }
    });
  }
  assert.equal(colourGrid('nonsense'), colourGrid('vivid'), 'an unknown strength reads as the standard');
});

test('a row holds one lightness across the hues, and the rows go from light to dark', () => {
  for (const id of GRID_STRENGTHS) {
    const rows = colourGrid(id).map((row) => row.map((cell) => codeToOklch(cell.code)[0]));
    for (const row of rows) {
      const mean = row.reduce((a, b) => a + b, 0) / row.length;
      for (const L of row) assert.ok(Math.abs(L - mean) < 0.012, `${id}: lightness ${L.toFixed(3)} within its row's ${mean.toFixed(3)}`);
    }
    for (let i = 1; i < rows.length; i++) assert.ok(rows[i][0] < rows[i - 1][0], `${id}: row ${i + 1} darker than row ${i}`);
  }
});

test('the grey column holds no colour, and the strengths order themselves by how strong the colour is', () => {
  for (const id of GRID_STRENGTHS) {
    for (const row of colourGrid(id)) {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(row[0].code.slice(i, i + 2), 16));
      assert.ok(Math.max(r, g, b) - Math.min(r, g, b) <= 1, `${id}: ${row[0].code} is a grey`);
    }
  }
  const chroma = (id) => {
    const cells = colourGrid(id).flat().filter((cell) => cell.hue !== 'grey');
    return cells.reduce((sum, cell) => sum + codeToOklch(cell.code)[1], 0) / cells.length;
  };
  assert.ok(chroma('neon') > chroma('vivid'), 'neon over vivid');
  assert.ok(chroma('vivid') > chroma('soft'), 'vivid over soft');
  assert.ok(chroma('soft') > chroma('muted'), 'soft over muted');
  assert.ok(chroma('pastel') < chroma('soft'), 'pastel softer than soft');
});

test('a colour too strong for the screen keeps its lightness and hue, its chroma lowered', () => {
  const code = oklchToCode(0.7, 0.4, 255);
  const [L, C, h] = codeToOklch(code);
  assert.ok(Math.abs(L - 0.7) < 0.01, 'the lightness kept');
  assert.ok(Math.abs(h - 255) < 2, 'the hue kept');
  assert.ok(C < 0.4, 'the chroma lowered');
  assert.equal(oklchToCode(1, 0, 0), '#ffffff');
  assert.equal(oklchToCode(0, 0, 0), '#000000');
});

test('the picker finds the strength that holds a colour, the one kept asked first', () => {
  assert.equal(strengthOf(colourGrid('neon')[4][1].code.toUpperCase()), 'neon', 'any case');
  assert.equal(strengthOf('#123457'), null);
  assert.equal(strengthOf('accent'), null, 'a theme colour is no palette colour');
  // A colour stronger than the screen can show, or a grey, comes out as the same code in two strengths.
  const vivid = new Set(colourGrid('vivid').flat().map((c) => c.code));
  const shared = colourGrid('pastel').flat().find((c) => vivid.has(c.code));
  assert.ok(shared, 'pastel and vivid share a code');
  assert.equal(strengthOf(shared.code), 'vivid', 'the first in order');
  assert.equal(strengthOf(shared.code, 'pastel'), 'pastel', 'the one kept, where it holds the colour');
  assert.equal(strengthOf(colourGrid('neon')[4][1].code, 'pastel'), 'neon', 'else the one that holds it');
});

test('the picker opens on the tab its colour comes from, and a pick reopens in the strength it came from', () => {
  const start = (value, kept = null, linked = false, themed = true) => pickerStart({ value, kept, linked, themed });
  assert.deepEqual(start('accent', 'deep', true), { tab: 'theme', strength: 'deep' }, 'a theme colour');
  assert.deepEqual(start('', null), { tab: 'theme', strength: 'vivid' }, 'an empty colour with the theme\'s colours at hand');
  assert.deepEqual(start('', null, false, false), { tab: 'custom', strength: 'vivid' }, 'an empty colour without them');
  assert.deepEqual(start('#123457', 'muted'), { tab: 'custom', strength: 'muted' }, 'an own colour, the strength left as kept');
  assert.deepEqual(start('#85baff80', 'neon'), { tab: 'custom', strength: 'neon' }, 'a colour with opacity is no palette colour');
  assert.deepEqual(start('#123457', 'nonsense'), { tab: 'custom', strength: 'vivid' });
  // A pick from Pastel of a code Vivid shares: the pick keeps Pastel (setStrength in ColorPicker.svelte), so the next opening stands in Pastel.
  const vivid = new Set(colourGrid('vivid').flat().map((c) => c.code));
  const shared = colourGrid('pastel').flat().find((c) => vivid.has(c.code));
  assert.deepEqual(start(shared.code, 'pastel'), { tab: 'palette', strength: 'pastel' });
  assert.deepEqual(start(shared.code, null), { tab: 'palette', strength: 'vivid' }, 'with nothing kept, the first that holds it');
  const picker = readFileSync(new URL('../editor/src/lib/ColorPicker.svelte', import.meta.url), 'utf8');
  assert.match(picker, /onclick=\{\(\) => \{ setStrength\(strength\); pick\(cell\.code\); \}\}/, 'a pick keeps the strength it came from');
});
