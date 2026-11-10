/**
 * Tooltips on what they name (editor/src/lib/tip-scope.js): a row's tooltip shows over its words, its fields and its buttons, and not over its empty room, nor over the room a stretched name takes beyond its words; a control keeps its tooltip over all of itself.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const { tipShows, CONTROL } = await import(new URL('../editor/src/lib/tip-scope.js', import.meta.url).href);
const at = (where) => tipShows({ control: false, room: false, words: false, onWords: false, ...where });

test('a row\'s tooltip shows on its words and not on its empty room', () => {
  assert.equal(at({ room: true }), false, 'the room beside the name');
  assert.equal(at({ room: true, words: true, onWords: true }), true, 'the name\'s words, the row\'s own');
});

test('a name that stretches across its row counts where its words stand', () => {
  assert.equal(at({ words: true, onWords: false }), false, 'a fold\'s or a select row\'s name, past its words');
  assert.equal(at({ words: true, onWords: true }), true, 'on its words');
});

test('a control, and anything in the row without words of its own, keeps the tooltip', () => {
  assert.equal(at({ control: true, room: true }), true, 'a button\'s padding');
  assert.equal(at({}), true, 'a swatch or a drawing');
  for (const kind of ['button', 'input', 'select', '[role="switch"]', '.ghost', '.filepick', '[data-tip-whole]']) assert.ok(CONTROL.includes(kind), kind);
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
