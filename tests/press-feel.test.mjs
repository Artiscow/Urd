/**
 * How the admin's buttons answer a press (editor/src/lib/press-feel.js): the feels and the stored one read back.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
const { PRESS_FEELS, pressFeelOf, ripple } = await import('../editor/src/lib/press-feel.js');

test('pressFeelOf: the six feels, Ripple for anything else', () => {
  assert.deepEqual(PRESS_FEELS, ['ripple', 'press', 'nudge', 'sink', 'ring', 'spring']);
  for (const feel of PRESS_FEELS) assert.equal(pressFeelOf(feel), feel);
  assert.equal(pressFeelOf(null), 'ripple');
  assert.equal(pressFeelOf('bounce'), 'ripple');
});

test('the stylesheet holds a rule for every feel, moves by translate and scale and never by transform', () => {
  const css = readFileSync(new URL('../editor/src/app.css', import.meta.url), 'utf8');
  for (const feel of PRESS_FEELS) assert.ok(css.includes(`[data-press='${feel}']`), feel);
  const rules = css.slice(css.indexOf('/* The press feel'), css.indexOf('/* End of the press feel */'));
  assert.ok(rules.length > 0, 'the press rules stand together');
  assert.ok(!/transform\s*:/.test(rules), 'a press never replaces a control\'s own transform');
  assert.ok(/prefers-reduced-motion/.test(rules), 'reduced motion is kept');
});

test('the editor places its controls by transform: translate and scale belong to the press alone', () => {
  const css = readFileSync(new URL('../editor/src/app.css', import.meta.url), 'utf8');
  const outside = css.slice(0, css.indexOf('/* The press feel')) + css.slice(css.indexOf('/* End of the press feel */'));
  const declares = (text) => text.split('\n').filter((line) => /^\s*(translate|scale)\s*:/.test(line));
  assert.deepEqual(declares(outside), [], 'app.css outside the press rules');
  const dir = new URL('../editor/src/', import.meta.url).pathname;
  const walk = (folder) => readdirSync(folder).flatMap((name) => {
    const path = join(folder, name);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.svelte') ? [path] : [];
  });
  for (const file of walk(dir)) assert.deepEqual(declares(readFileSync(file, 'utf8')), [], file);
});


test('ripple: a quick second press keeps its ring in the control, which gets its own position back when the last ring ends', () => {
  // A minimal page: elements that keep their listeners, a control that is not positioned.
  const make = () => {
    const el = { style: {}, children: [], listeners: {}, className: '', parent: null,
      setAttribute() {}, append(...nodes) { for (const n of nodes) { n.parent = el; el.children.push(n); } },
      addEventListener(type, fn) { el.listeners[type] = fn; },
      remove() { if (el.parent) el.parent.children = el.parent.children.filter((c) => c !== el); } };
    return el;
  };
  const saved = { document: globalThis.document, getComputedStyle: globalThis.getComputedStyle };
  globalThis.document = { createElement: make };
  globalThis.getComputedStyle = (el) => ({ position: el.style.position || 'static' });
  try {
    const control = make();
    control.getBoundingClientRect = () => ({ left: 10, top: 20 });
    ripple(control, { clientX: 15, clientY: 25 });
    ripple(control, { clientX: 16, clientY: 26 });
    assert.equal(control.style.position, 'relative');
    const [first, second] = control.children.map((layer) => layer.children[0]);
    first.listeners.animationend();
    assert.equal(control.style.position, 'relative', 'the second ring still runs in the control');
    second.listeners.animationend();
    assert.equal(control.style.position, undefined, 'given back as it was');
    assert.equal(control.children.length, 0);
  } finally {
    globalThis.document = saved.document;
    globalThis.getComputedStyle = saved.getComputedStyle;
  }
});
