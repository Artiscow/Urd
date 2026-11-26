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

test('every hover handler of the editing layer that opens, switches, closes or disarms something acts for a mouse alone, as a tap fires the pointer events too', async () => {
  const { stripComments } = await import('./_engine.mjs');
  const src = stripComments(edit);
  /** A handler's parameter and body: an inline function's, or those of the named function it is given. */
  const handlerAt = (at) => {
    const named = /^(\w+)\)/.exec(src.slice(at));
    const head = named
      ? new RegExp(`(?:const ${named[1]} = \\(([^)]*)\\) => |function ${named[1]}\\(([^)]*)\\) )\\{`).exec(src)
      : /^(?:async )?\(([^)]*)\) => \{/.exec(src.slice(at));
    if (!head) return null;
    const open = (named ? head.index : at) + head[0].length - 1;
    let depth = 0;
    for (let i = open; i < src.length; i++) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}' && --depth === 0) return { param: (head[1] ?? head[2] ?? '').trim(), body: src.slice(open + 1, i).trim() };
    }
    return null;
  };
  /** The handlers that only place a bar or only stop a wait: they open, switch, close and disarm nothing, so a tap may run them. */
  const NEUTRAL = new Map([
    ['pointerenter updateToolbarSide', 'places the block\'s bar on the side with room'],
    ['pointerleave () => clearTimeout(hoverTimer)', 'stops the wait a mouse\'s rest began; a tap began none'],
  ]);
  const found = [...src.matchAll(/\.addEventListener\('(pointerenter|pointerover|pointerleave|mouseenter|mouseover|mouseleave)', /g)];
  assert.ok(found.length >= 10, `the hover handlers are found (${found.length})`);
  const neutral = new Set();
  for (const m of found) {
    const at = m.index + m[0].length;
    const inline = src.slice(at, src.indexOf(')', src.indexOf('=>', at) + 2) + 1);
    const label = `${m[1]} ${/^\w+\)/.test(src.slice(at)) ? src.slice(at).match(/^(\w+)/)[1] : inline.trim()}`;
    if (NEUTRAL.has(label)) { neutral.add(label); continue; }
    const handler = handlerAt(at);
    assert.ok(handler?.param, `${label}: a handler that reads its event`);
    const p = handler.param.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const leaves = new RegExp(`^if \\(${p}\\.pointerType !== 'mouse'(?: \\|\\| [^;{}]+)?\\) return;`);
    const only = new RegExp(`^if \\(${p}\\.pointerType === 'mouse'\\) [^;{}]+;$`);
    assert.ok(leaves.test(handler.body) || only.test(handler.body), `${m[1]} at ${src.slice(0, m.index).split('\n').length}: ${handler.body.split('\n')[0]}`);
  }
  assert.deepEqual([...neutral].sort(), [...NEUTRAL.keys()].sort(), 'each handler let through still stands');
  // The ones named in AGENTS.md's rule: the + New block menu's group rows and the button that acts at its second press.
  assert.match(src, /tab\.addEventListener\('pointerenter', \(event\) => \{\s*if \(event\.pointerType !== 'mouse' \|\| !menu\.classList\.contains\('urd-abm-slim'\)\) return;/);
  assert.match(src.slice(src.indexOf('function armedButton(')), /^function armedButton\([\s\S]*?btn\.addEventListener\('pointerleave', \(e\) => \{ if \(e\.pointerType === 'mouse'\) disarm\(\); \}\);/);
});
