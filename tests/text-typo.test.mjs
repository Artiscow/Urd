/**
 * Contract tests for the typography logic in the text toolbar
 * (text-typo.js): size clamping, indent steps and font stack matching;
 * and the toolbar's editing mode, which leaves styleWithCSS alone.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const {
  SIZE_MIN, SIZE_MAX, clampSize, stepSize, ladderStep, SIZE_LADDER,
  LINE_HEIGHTS, stepIndent, firstFamily, matchFontStack,
} = await engineImport('text-typo.js');

test('clampSize: rounds, clamps and rejects invalid', () => {
  assert.equal(clampSize(16.6), 17);
  assert.equal(clampSize(4), SIZE_MIN);
  assert.equal(clampSize(500), SIZE_MAX);
  assert.equal(clampSize(NaN), null);
  assert.equal(clampSize('abc'), null);
});

test('stepSize: steps and stops at the limits', () => {
  assert.equal(stepSize(16, 1), 17);
  assert.equal(stepSize(16, -1), 15);
  assert.equal(stepSize(SIZE_MIN, -1), SIZE_MIN);
  assert.equal(stepSize(SIZE_MAX, 1), SIZE_MAX);
});

test('ladderStep: jumps to the nearest rung in the direction, clamps at the ends', () => {
  assert.equal(ladderStep(12, 1), 14);
  assert.equal(ladderStep(12, -1), 11);
  // A value between rungs rounds to the next rung in the direction.
  assert.equal(ladderStep(13, 1), 14);
  assert.equal(ladderStep(13, -1), 12);
  assert.equal(ladderStep(SIZE_LADDER[0], -1), SIZE_MIN);
  assert.equal(ladderStep(SIZE_MAX, 1), SIZE_MAX);
});

test('stepIndent: 2em steps, empty string at zero, cap at 16em', () => {
  assert.equal(stepIndent('', 1), '2em');
  assert.equal(stepIndent('2em', 1), '4em');
  assert.equal(stepIndent('4em', -1), '2em');
  assert.equal(stepIndent('2em', -1), '');
  assert.equal(stepIndent('', -1), '');
  assert.equal(stepIndent('16em', 1), '16em');
});

test('stepIndent: values in other units reset and step from 0', () => {
  assert.equal(stepIndent('40px', 1), '2em');
  assert.equal(stepIndent('40px', -1), '');
});

test('firstFamily: first font name without quotes, lowercase', () => {
  assert.equal(firstFamily("'Courier New', monospace"), 'courier new');
  assert.equal(firstFamily('Arial, Helvetica, sans-serif'), 'arial');
  assert.equal(firstFamily('"Trebuchet MS"'), 'trebuchet ms');
  assert.equal(firstFamily(''), '');
});

test('matchFontStack: a known stack matches on the first font name, unknown gives inherit', () => {
  assert.equal(matchFontStack('Verdana, Geneva, sans-serif'), 'Verdana, Geneva, sans-serif');
  // Computed style may lack the rest of the stack; the first name is enough.
  assert.equal(matchFontStack('"Courier New"'), "'Courier New', monospace");
  assert.equal(matchFontStack('"Comic Sans MS", cursive'), '');
  assert.equal(matchFontStack(''), '');
});

test('LINE_HEIGHTS: five choices where the first is inherit (the UI contract)', () => {
  assert.equal(LINE_HEIGHTS.length, 5);
  assert.deepEqual(LINE_HEIGHTS[0], ['', 'Inherit']);
  for (const [value, label] of LINE_HEIGHTS.slice(1)) {
    assert.ok(Number(value) > 0);
    assert.ok(label.includes('.'), 'the code label is an English decimal; the toolbar formats it per admin locale');
  }
});

test('the text toolbar never toggles styleWithCSS, so a theme colour the browser writes as font[color] is found and kept as the theme\'s', async () => {
  const { readFileSync, readdirSync } = await import('node:fs');
  const { ENGINE_DIR, stripComments } = await import('./_engine.mjs');
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? walk(new URL(`${entry.name}/`, dir)) : [new URL(entry.name, dir)]));
  const modules = walk(ENGINE_DIR).filter((url) => url.pathname.endsWith('.js'));
  assert.ok(modules.some((url) => url.pathname.endsWith('/preview-edit.js')));
  for (const url of modules) {
    assert.doesNotMatch(stripComments(readFileSync(url, 'utf8')), /\bstyleWithCSS\b|['"]useCSS['"]/, url.pathname.slice(ENGINE_DIR.pathname.length));
  }
  const edit = stripComments(readFileSync(new URL('preview-edit.js', ENGINE_DIR), 'utf8'));
  assert.match(edit, /for \(const el of activeText\.querySelectorAll\('\[style\], font\[color\]'\)\) \{\s*if \(styleProp === 'color' && el\.tagName === 'FONT'/, 'the theme colour is read back from font[color]');
});
