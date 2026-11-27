/**
 * The admin's motion (editor/src/lib/motion.svelte.js): an admin dialog's close waits out the fade app.css gives `dialog.dx.dx-closing`, read from its computed style.
 * The module is compiled for the server through tests/_svelte-loader.mjs and run on a stand-in dialog whose computed style answers with app.css's own durations.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import './_svelte-loader.mjs';

let reduced = false;
globalThis.matchMedia = (query) => ({ matches: reduced && query.includes('prefers-reduced-motion'), addEventListener() {}, removeEventListener() {} });
globalThis.HTMLDialogElement = class {
  close(value) {
    this.open = false;
    this.returnValue = value;
  }
};

const { fadingDialog, dialogOut } = await import('../editor/src/lib/motion.svelte.js');
const CSS = readFileSync(new URL('../editor/src/app.css', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

/** A CSS time as milliseconds. */
const msOf = (time) => Number.parseFloat(time) * (time.endsWith('ms') ? 1 : 1000);

/** The closing fade's durations in app.css, a dialog's and a large one's, beside the opening fade's, which stands while the dialog is open. */
function closingFades() {
  const plain = CSS.match(/\n\s*dialog\.dx\.dx-closing,\s*dialog\.dx\.dx-closing::backdrop \{\s*opacity: 0;\s*transition: opacity ([\d.]+m?s) [\w-]+;\s*\}/);
  const large = CSS.match(/\n\s*dialog\.dx\.dx-large\.dx-closing,\s*dialog\.dx\.dx-large\.dx-closing::backdrop \{ transition-duration: ([\d.]+m?s); \}/);
  const opening = CSS.match(/\n\s*dialog\.dx\[open\],\s*dialog\.dx\[open\]::backdrop \{\s*opacity: 1;\s*transition: opacity ([\d.]+m?s) [\w-]+;\s*\}/);
  const openingLarge = CSS.match(/\n\s*dialog\.dx\.dx-large\[open\],\s*dialog\.dx\.dx-large\[open\]::backdrop \{ transition-duration: ([\d.]+m?s); \}/);
  assert.ok(plain, 'app.css fades a closing dialog and its backdrop out');
  assert.ok(large, 'and a large one faster');
  assert.ok(opening && openingLarge, 'and fades an open one in');
  assert.notEqual(msOf(opening[1]), msOf(plain[1]), 'the opening and closing fades differ, so a wait read without the class shows');
  return { plain: plain[1], large: large[1], opening: opening[1], openingLarge: openingLarge[1] };
}

/** A stand-in dialog whose computed style holds the closing fade while the dx-closing class stands on it and the opening fade otherwise, as a browser's would. */
function dialog(fades, ...classes) {
  const list = new Set(['dx', ...classes]);
  const node = {
    open: true,
    classList: {
      add: (name) => list.add(name),
      remove: (name) => list.delete(name),
      contains: (name) => list.has(name),
      toggle: (name, on) => (on ? list.add(name) : list.delete(name)),
    },
    addEventListener() {},
    removeEventListener() {},
  };
  globalThis.getComputedStyle = (el) => {
    if (el !== node) return { transitionProperty: 'none', transitionDuration: '0s' };
    const closing = list.has('dx-closing');
    const large = list.has('dx-large');
    return { transitionProperty: 'opacity', transitionDuration: closing ? (large ? fades.large : fades.plain) : (large ? fades.openingLarge : fades.opening) };
  };
  return { node, list };
}

/** Runs fn with setTimeout held: the delays asked for and the callbacks, run when the test says. */
function withTimers(fn) {
  const real = globalThis.setTimeout;
  const timers = [];
  globalThis.setTimeout = (callback, ms) => timers.push({ callback, ms });
  try {
    fn(timers);
  } finally {
    globalThis.setTimeout = real;
  }
}

test('an admin dialog\'s close waits the closing fade app.css gives dialog.dx.dx-closing, and closes once it has run', () => {
  const fades = closingFades();
  for (const [classes, time] of [[[], fades.plain], [['dx-large'], fades.large]]) {
    const { node, list } = dialog(fades, ...classes);
    const action = fadingDialog(node);
    withTimers((timers) => {
      node.close('done');
      assert.ok(list.has('dx-closing'), 'the fade starts');
      assert.equal(node.open, true, 'still open while it fades');
      assert.deepEqual(timers.map((t) => t.ms), [msOf(time)], `${classes.join(' ') || 'dx'}: the wait is the fade's own duration`);
      timers[0].callback();
    });
    assert.equal(node.open, false, 'closed once the fade has run');
    assert.equal(node.returnValue, 'done');
    assert.equal(list.has('dx-closing'), false, 'the class leaves with the close');
    action.destroy();
  }
});

test('a dialog taken away while open waits its closing fade too, read with the closing class on it, and two frames more', () => {
  const fades = closingFades();
  for (const [classes, time] of [[[], fades.plain], [['dx-large'], fades.large]]) {
    const { node, list } = dialog(fades, ...classes);
    const out = dialogOut(node);
    assert.equal(out.duration, msOf(time) + 40, `${classes.join(' ') || 'dx'}: the closing fade and two frames`);
    assert.ok(list.has('dx-closing'), 'the fade starts');
    out.tick(1);
    assert.equal(list.has('dx-closing'), false, 'the class leaves as the fade ends');
  }
  const { node } = dialog(fades);
  node.open = false;
  assert.equal(dialogOut(node).duration, 0, 'a closed dialog has nothing to fade');
});

test('under reduced motion a dialog closes at once, in app.css and in the module alike', () => {
  assert.match(CSS, /@media \(prefers-reduced-motion: reduce\) \{\s*dialog\.dx\[open\],\s*dialog\.dx\[open\]::backdrop,\s*dialog\.dx\.dx-closing,\s*dialog\.dx\.dx-closing::backdrop \{ transition: none; \}/);
  reduced = true;
  try {
    const { node } = dialog(closingFades());
    fadingDialog(node);
    withTimers((timers) => {
      node.close();
      assert.deepEqual(timers, [], 'no wait');
    });
    assert.equal(node.open, false);
    const taken = dialog(closingFades());
    assert.equal(dialogOut(taken.node).duration, 0, 'a dialog taken away waits for nothing');
    assert.equal(taken.list.has('dx-closing'), false, 'and keeps no closing class, so a dialog brought back stands as it was');
  } finally {
    reduced = false;
  }
});
