/**
 * What opens or stays under a resting mouse:
 * the block whose own bar or handles stand topmost under the pointer stays raised, so the bar of a block just under another can be reached over the one above (template/assets/engine/<version>/preview-edit.js raiseSmallestUnder);
 * and the undo and redo caret opens the session's steps on a mouse's rest, as the top bar's other menus do, with no tooltip (editor/src/shell/UndoButtons.svelte).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const ENGINE = JSON.parse(readFileSync(new URL('../template/urd.json', import.meta.url), 'utf8')).engine;
const edit = readFileSync(new URL(`../template/assets/engine/${ENGINE}/preview-edit.js`, import.meta.url), 'utf8');

test('a block whose own bar or handles stand topmost under the pointer stays raised, before the smallest block there', () => {
  const start = edit.indexOf('function raiseSmallestUnder(x, y) {');
  const raise = edit.slice(start, edit.indexOf('\n}\n', start));
  assert.ok(raise.length > 100, 'the raise is found');
  assert.match(raise, /const hits = document\.elementsFromPoint\(x, y\);\s*const chrome = hits\[0\] instanceof Element \? hits\[0\]\.closest\('\.urd-edit-toolbar, \.urd-edit-resize, \.urd-edit-rotate'\) : null;\s*best = chrome\?\.closest\('\.urd-editable'\) \?\? null;/);
  assert.match(raise, /for \(const n of best \? \[\] : hits\)/, 'the smallest block is sought only where no block\'s own bar or handle is topmost');
  // The bar, the resize handles and the turn handle are the block's own children, which the rule finds the block from.
  for (const part of ["el.appendChild(toolbar);", "resizeHandle.className = 'urd-edit-resize';", "rotHandle.className = 'urd-edit-rotate';"]) assert.ok(edit.includes(part), part);
});

test('the undo and redo caret opens the steps on a mouse\'s rest, keeps a list a press opened, and has no tooltip', () => {
  const undo = readFileSync(new URL('../editor/src/shell/UndoButtons.svelte', import.meta.url), 'utf8');
  const caret = undo.slice(undo.indexOf('<button type="button" class="ghost undo-caret"'), undo.indexOf('</button>', undo.indexOf('class="ghost undo-caret"')));
  assert.doesNotMatch(caret, /\btitle=/, 'a menu that opens on hover has no tooltip');
  assert.match(caret, /aria-label=\{ta\('tip\.steps'\)\}/, 'the caret is named for a screen reader');
  assert.match(caret, /onpointerenter=\{\(e\) => rest\(true, e\)\} onpointerleave=\{\(e\) => rest\(false, e\)\}/);
  assert.match(undo, /function rest\(on, event\) \{\s*if \(event\.pointerType !== 'mouse' \|\| ed\.looking\) return;/, 'a touch is no hover, and no list opens while a saved draft is looked at');
  assert.match(undo, /\} else if \(!on && open && restOpened && !pop\?\.contains\(document\.activeElement\)\) \{/, 'only a list a rest opened closes as the mouse leaves, unless the focus is in the list itself');
  assert.match(undo, /const pop = event\.currentTarget\.closest\('\.undo-group'\)\?\.querySelector\('\.steps-pop'\);/, 'the focus left on undo or redo does not hold the list open');
  assert.match(undo, /class="tool-pop steps-pop"[^>]*onpointerenter=\{\(e\) => rest\(true, e\)\} onpointerleave=\{\(e\) => rest\(false, e\)\}/, 'the list keeps itself open under the mouse');
});
