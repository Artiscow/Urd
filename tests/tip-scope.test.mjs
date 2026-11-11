/**
 * Tooltips on what they name (editor/src/lib/tip-scope.js): a row's tooltip shows over its words, its fields and its buttons, and not over its empty room, nor over the room a stretched name takes beyond its words; a control keeps its tooltip over all of itself.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const { tipShows, isPicture, echoes, CONTROL } = await import(new URL('../editor/src/lib/tip-scope.js', import.meta.url).href);
const at = (where) => tipShows({ control: false, picture: false, words: false, onWords: false, ...where });

test('a row\'s tooltip shows on its words and not on its empty room, nor on a part that only holds others', () => {
  assert.equal(at({}), false, 'the room beside the name, or a grid of pictures around them');
  assert.equal(at({ words: true, onWords: true }), true, 'the name\'s words');
});

test('a name that stretches across its row counts where its words stand', () => {
  assert.equal(at({ words: true, onWords: false }), false, 'a fold\'s or a select row\'s name, past its words');
  assert.equal(at({ words: true, onWords: true }), true, 'on its words');
});

test('a control keeps the tooltip over all of itself, and a picture, a drawing or a preview shows it', () => {
  assert.equal(at({ control: true }), true, 'a button\'s padding');
  assert.equal(at({ picture: true }), true, 'a picture, a drawing or a swatch');
  for (const kind of ['button', 'input', 'select', '[role="switch"]', '.ghost', '.filepick', '[data-tip-whole]']) assert.ok(CONTROL.includes(kind), kind);
});

test('a picture is an image or a drawing, a part of one, or a part named for one; a part that holds others is not', () => {
  const el = (localName, classes = [], inSvg = false) => ({ localName, classList: classes, closest: (sel) => (sel === 'svg' && (inSvg || localName === 'svg') ? {} : null) });
  for (const [name, node] of [['an image', el('img')], ['a drawing', el('svg')], ['a part of a drawing', el('path', [], true)], ['a setting\'s picture', el('span', ['st-pic'])], ['a thumbnail', el('span', ['logo-thumb'])], ['a swatch', el('span', ['cp-swatch'])], ['a preview', el('div', ['dp-preview'])]]) {
    assert.ok(isPicture(node), name);
  }
  for (const [name, node] of [['a row', el('div', ['st-row'])], ['a picker that holds a picture', el('div', ['logo-pick'])], ['a grid of designs', el('div', ['look-grid'])]]) {
    assert.ok(!isPicture(node), name);
  }
});

test('the editor sets the listener once; a title is blanked, not taken away, and every title comes back for the keys and the focus', () => {
  const main = readFileSync(new URL('../editor/src/main.js', import.meta.url), 'utf8');
  assert.match(main, /installTipScope\(\);/);
  const scope = readFileSync(new URL('../editor/src/lib/tip-scope.js', import.meta.url), 'utf8');
  assert.match(scope, /if \(event\.pointerType !== 'mouse'\) return;/, 'only the mouse\'s hover changes anything');
  assert.match(scope, /el\.setAttribute\('title', ''\);/, 'blanked, so no outer tooltip shows through');
  assert.match(scope, /if \(held\.getAttribute\('title'\) === ''\) held\.setAttribute\('title', held\.dataset\.urdTip \?\? ''\);/, 'a title the row drew meanwhile stays');
  assert.match(scope, /for \(const type of \['pointerdown', 'keydown', 'focusin'\]\) doc\.addEventListener\(type, give, true\);/);
  // The menu's search reads a title set aside where it is kept, and the menu's head is dragged by its room.
  assert.match(readFileSync(new URL('../editor/src/lib/menu-search.js', import.meta.url), 'utf8'), /const tipOf = \(node\) => node\.dataset\?\.urdTip \|\| node\.getAttribute\('title'\);/);
  assert.match(readFileSync(new URL('../editor/src/menu/FloatingMenu.svelte', import.meta.url), 'utf8'), /class="block-menu-head" title=\{ta\('tip\.menu\.dragHead'\)\} data-tip-whole/);
});

test('a tooltip that only says the words its item shows is held back, and one that says more shows', () => {
  assert.ok(echoes('Add button in each area', 'Add button in each\n area'), 'a tile named under its picture, its name wrapped');
  assert.ok(echoes('Minimal', '  minimal '));
  assert.ok(!echoes('How the panels are reached: an icon rail on the left', 'Panel navigation'), 'a tooltip that explains');
  assert.ok(!echoes('Bold', 'B'), 'a button whose drawing is shorter than its name');
  assert.ok(!echoes('', ''), 'no tooltip at all');
});
