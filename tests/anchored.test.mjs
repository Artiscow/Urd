/**
 * The gate for the editor's floating menus (anchored.js): the modern branch
 * needs the Popover API, anchor names AND position-try fallbacks; anything
 * less stays on the measuring JS branch.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { nativeAnchoring, anchorName, namePane } = await engineImport('anchored.js');

const win = (supported, withPopover = true) => ({
  HTMLElement: { prototype: withPopover ? { popover: null, showPopover() {} } : {} },
  CSS: { supports: (q) => supported.includes(q) },
});

test('nativeAnchoring: all three features are required', () => {
  assert.equal(nativeAnchoring(win(['anchor-name: --urd', 'position-try-fallbacks: flip-block'])), true);
  assert.equal(nativeAnchoring(win(['anchor-name: --urd'])), false, 'anchors without fallbacks stay on the JS branch');
  assert.equal(nativeAnchoring(win(['position-try-fallbacks: flip-block'])), false);
  assert.equal(nativeAnchoring(win(['anchor-name: --urd', 'position-try-fallbacks: flip-block'], false)), false, 'no Popover API');
  assert.equal(nativeAnchoring({}), false);
  assert.equal(nativeAnchoring(undefined), false);
});

test('anchorName: unique dashed idents', () => {
  const a = anchorName();
  const b = anchorName();
  assert.match(a, /^--urd-pop-\d+$/);
  assert.notEqual(a, b);
  assert.match(anchorName('urd-dd'), /^--urd-dd-\d+$/);
});

test('namePane: names the closest pane while open and clears it on close', () => {
  const props = {};
  const pane = { style: { setProperty: (k, v) => { props[k] = v; }, removeProperty: (k) => { delete props[k]; } } };
  const el = { closest: (sel) => (sel.includes('.panel-body') ? pane : null) };
  namePane(el, true);
  assert.equal(props['anchor-name'], '--urd-pane');
  namePane(el, false);
  assert.equal(props['anchor-name'], undefined);
  namePane(null, true);
  namePane({ closest: () => null }, true);
});
