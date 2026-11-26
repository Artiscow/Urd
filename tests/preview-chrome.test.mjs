/**
 * The editing layer's chrome in the preview (preview.css and preview-edit.js): the stacking order of the marks, the lifted block, the handles, the seams, the menu and the toolbars, and the text cursor on the same text the drag lets the owner type in.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE_DIR, stripComments } from './_engine.mjs';

const PREVIEW = readFileSync(new URL('preview.css', ENGINE_DIR), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const EDIT = stripComments(readFileSync(new URL('preview-edit.js', ENGINE_DIR), 'utf8'));

/** A selector list split at its top-level commas, so an :is() list stays whole. */
const selectorList = (prelude) => {
  const parts = [''];
  let level = 0;
  for (const c of prelude) {
    if (c === '(') level++;
    if (c === ')') level--;
    if (c === ',' && level === 0) parts.push('');
    else parts[parts.length - 1] += c;
  }
  return parts.map((s) => s.trim().replace(/\s+/g, ' ')).filter(Boolean);
};

/** The innermost style rules of a sheet, each as its selectors and its declarations. */
const rules = (css) => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, prelude, body]) => ({ selectors: selectorList(prelude), body }));

/** The z-index the sheet gives one selector, from the one rule that names it with a z-index. */
function zOf(selector) {
  const found = rules(PREVIEW).filter((rule) => rule.selectors.includes(selector) && /(?:^|[;\s])z-index\s*:/.test(rule.body));
  assert.equal(found.length, 1, `one rule gives ${selector} its z-index`);
  return Number.parseInt(/z-index\s*:\s*(-?\d+)/.exec(found[0].body)[1], 10);
}

test('the editing layer stacks in order: the phone space, the landing, the lifted block, the section\'s handles, then the seams, the menu and the section toolbar, with the block menu at the pointer above the seams', () => {
  const space = zOf('.urd-preview .urd-phone-space');
  const landing = zOf('.urd-preview .urd-phone-landing');
  const lifted = zOf('.urd-preview:not(.urd-chrome-off) .urd-block.urd-selected');
  const hovered = zOf('.urd-preview:not(.urd-chrome-off) .urd-editable.urd-hover-top');
  const handles = zOf('.urd-preview .urd-add-block');
  const seams = zOf('.urd-preview .urd-add-section');
  const atPointer = zOf('.urd-preview .urd-add-block.urd-at-pointer');
  assert.ok(space < landing, 'the phone space under the landing');
  assert.ok(landing < lifted, 'the landing under the lifted block');
  assert.ok(Math.max(lifted, hovered) < handles, 'a lifted or hovered block under the section\'s handles');
  for (const [name, above] of [
    ['the seams', seams],
    ['the menu', zOf('.urd-preview .urd-nav')],
    ['the sticky menu', zOf('.urd-preview .urd-nav-sticky')],
    ['the section toolbar', zOf('.urd-preview .urd-section-toolbar')],
  ]) assert.ok(handles < above, `the handles under ${name}`);
  assert.ok(atPointer > seams, 'the block menu at the pointer above the seams');
  const adder = rules(PREVIEW).find((rule) => rule.selectors.includes('.urd-preview .urd-add-block') && /z-index/.test(rule.body));
  assert.match(adder.body, /(?:^|[;\s])position\s*:\s*absolute\s*;/, 'the block menu\'s place stands out of the flow');
});

test('the text cursor stands on the same editable text the drag lets the owner type in', () => {
  /** An attribute selector written one way: no spaces, double quotes. */
  const norm = (sel) => sel.replace(/\s+/g, '').replace(/'/g, '"');
  const declared = /^const EDITABLE_TEXT = '([^']+)';$/m.exec(EDIT);
  assert.ok(declared, 'preview-edit.js names the editable text');
  const passed = new Set(declared[1].split(',').map(norm));
  assert.match(EDIT, /if \(target\?\.closest\(EDITABLE_TEXT\) && selectedBlockId === block\.id && multiIds\.size <= 1\) \{/, 'the drag lets a press on that text through in the selected block');
  const cursor = rules(PREVIEW).filter((rule) => /(?:^|[;\s])cursor\s*:\s*text\b/.test(rule.body) && rule.selectors.some((s) => s.includes('.urd-editable') && s.includes('contenteditable')));
  assert.ok(cursor.length > 0, 'preview.css gives editable text the text cursor');
  const shown = new Set(cursor.flatMap((rule) => rule.selectors.flatMap((s) => (s.match(/\[contenteditable(?:\s*=\s*['"][^'"]*['"])?\]/g) ?? []).map(norm))));
  assert.deepEqual([...shown].sort(), [...passed].sort());
  assert.ok(rules(PREVIEW).some((rule) => rule.selectors.includes('.urd-preview .urd-editable') && /cursor\s*:\s*move/.test(rule.body)), 'the rest of the block shows the move cursor');
});
