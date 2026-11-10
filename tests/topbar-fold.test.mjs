/**
 * Guard that the topbar folds instead of wrapping.
 *
 * The bar must keep ONE height at every window width: whatever does not fit
 * is folded away in fixed steps. Three things can break this silently, and
 * none of them shows up in a unit test of logic:
 *
 * 1. `flex-wrap: wrap` sneaks back into the topbar, and it becomes two rows
 *    again.
 * 2. The last three steps each move a tool cluster into a menu and therefore
 *    exist BOTH as a CSS threshold and as a number in FOLD_MQ. If they drift
 *    apart, there is a band where a cluster still sits unfolded while the CSS
 *    has tightened around it, or the other way around.
 * 3. The short forms (the number in the mobile badge) are hidden by default
 *    and enabled in a media query with the SAME
 *    specificity. Source order then decides: if the default rule comes after
 *    the query, it wins, and the short form stays invisible at exactly the
 *    widths it exists for.
 *
 * Same genre as the canvas and modulepreload tests: read the source,
 * recompute, require equality.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/* The top bar's rules live in the admin's global stylesheet, and the thresholds that swap a cluster for a menu in the shell's state module (0.7.26.5). */
const SRC = readFileSync(new URL('../editor/src/state/shell.svelte.js', import.meta.url), 'utf-8');
const CSS = readFileSync(new URL('../editor/src/app.css', import.meta.url), 'utf-8');
const NO_COMMENTS = CSS.replace(/\/\*[\s\S]*?\*\//g, '');

/** The declarations in the rule for one selector, comments stripped.
 *  All regex metacharacters are escaped, not just dots (CodeQL
 *  js/incomplete-sanitization). */
function ruleBody(selector) {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = NO_COMMENTS.match(new RegExp(`(^|\\})\\s*${esc}\\s*\\{([^}]*)\\}`, 'm'));
  return match ? match[2] : null;
}

for (const selector of ['.topbar', '.topbar-group']) {
  test(`${selector} never wraps to multiple rows`, () => {
    const body = ruleBody(selector);
    assert.ok(body, `rule ${selector} is missing`);
    assert.match(body, /flex-wrap:\s*nowrap/, `${selector} must state nowrap explicitly`);
    assert.ok(
      !/flex-wrap:\s*wrap/.test(body),
      `${selector} sets flex-wrap: wrap, and the topbar becomes two rows again`,
    );
  });
}

/* The fold steps are delimited by their own heading, so an unrelated media
   query elsewhere in the file does not count as a step. */
const FOLD = CSS.slice(CSS.indexOf('---- Foldetrinnene'));

const cssSteps = () => [...FOLD.matchAll(/@media \(max-width:\s*(\d+)px\)/g)].map((m) => Number(m[1]));

test('the fold steps exist and are strictly decreasing', () => {
  assert.ok(FOLD.length > 0, 'could not find the fold-step section in app.css');
  const steps = cssSteps();
  // The button texts, the page-tabs layout's earlier steps and the three clusters: five at the least.
  assert.ok(steps.length >= 5, `expected at least five fold steps, found ${steps.length}`);
  for (let i = 1; i < steps.length; i += 1) {
    assert.ok(
      steps[i] < steps[i - 1],
      `step ${i + 1} (${steps[i]}px) is not narrower than step ${i} (${steps[i - 1]}px), so one of them is dead`,
    );
  }
});

/** The thresholds in FOLD_MQ, that is the steps that swap a cluster for a menu. */
function jsSteps() {
  const block = SRC.match(/const FOLD_MQ = \{([^}]*)\}/);
  assert.ok(block, 'could not find FOLD_MQ in shell.svelte.js');
  return Object.fromEntries(
    [...block[1].matchAll(/(\w+):\s*(\d+)/g)].map((m) => [m[1], Number(m[2])]),
  );
}

test('the clusters fold one at a time, not all at the same threshold', () => {
  const steps = Object.values(jsSteps());
  assert.equal(steps.length, 3, 'expected three clusters with one threshold each');
  assert.equal(new Set(steps).size, 3, 'two clusters share a threshold, and the jump becomes twice as large');
});

test('every cluster threshold in JS has its twin in CSS', () => {
  const css = new Set(cssSteps());
  for (const [key, px] of Object.entries(jsSteps())) {
    assert.ok(
      css.has(px),
      `FOLD_MQ.${key} is ${px}px, but no media query in the fold ladder uses the same number`,
    );
  }
});

test('a layout that folds earlier (FOLD_OFFSET) has every shifted step in CSS too, under its data-layout', () => {
  const block = SRC.match(/const FOLD_OFFSET = \{([^}]*)\}/);
  assert.ok(block, 'could not find FOLD_OFFSET in shell.svelte.js');
  const css = new Set(cssSteps());
  for (const m of block[1].matchAll(/'([a-z-]+)':\s*(\d+)/g)) {
    const [, layout, extra] = m;
    for (const [key, px] of Object.entries(jsSteps())) {
      assert.ok(css.has(px + Number(extra)), `FOLD_MQ.${key} + FOLD_OFFSET.${layout} is ${px + Number(extra)}px, but no media query in the fold ladder uses the same number`);
    }
    assert.ok(FOLD.includes(`.editor[data-layout="${layout}"]`), `the fold ladder has no rules for data-layout="${layout}"`);
  }
});

for (const short of ['.badge-mini']) {
  test(`${short} is hidden before it is enabled`, () => {
    const hidden = NO_COMMENTS.search(new RegExp(`\\${short}[^{]*\\{[^}]*display:\\s*none`));
    const shown = NO_COMMENTS.search(new RegExp(`\\${short}\\s*\\{\\s*display:\\s*inline`));
    assert.ok(hidden >= 0, `${short} lacks a default display: none`);
    assert.ok(shown >= 0, `${short} is never enabled in any fold step`);
    assert.ok(
      hidden < shown,
      `${short} is hidden AFTER it is enabled; with equal specificity the default then wins`,
    );
  });
}

test('the top bar\'s buttons and groups stand one height, and the tool groups\' icons on whole pixels', () => {
  // The tool groups' icon buttons at one even size: a drawing of 12 or 14 px stands on whole pixels in the middle of a 40 px button, and a group of 26 px buttons is 32 px tall.
  assert.match(NO_COMMENTS, /\.toolgrp > \.ghost:not\([^{]*\{\s*justify-content: center;\s*box-sizing: border-box;\s*width: 40px;\s*height: 26px;\s*padding: 0;/);
  // The bar's own buttons as tall as the groups, whatever they hold (Publish with its count).
  assert.match(NO_COMMENTS, /\.topbar \.topbar-tall:not\([^{]*\{\s*box-sizing: border-box;\s*height: 32px;/);
  const topbar = readFileSync(new URL('../editor/src/shell/TopBar.svelte', import.meta.url), 'utf-8');
  assert.match(topbar, /class="primary publish-btn topbar-tall"/, 'Publish');
  assert.match(topbar, /class="ghost topbar-tall"\s*onclick=\{ed\.toggleChrome\}/, 'Clean view');
  assert.match(readFileSync(new URL('../editor/src/shell/PageSwitcher.svelte', import.meta.url), 'utf-8'), /class="ghost page-btn topbar-tall"/, 'the page\'s name');
  // Undo and redo as tall as a tool group's buttons, in a frame like theirs.
  const undo = readFileSync(new URL('../editor/src/shell/UndoButtons.svelte', import.meta.url), 'utf-8');
  assert.match(undo, /\.undo-btn,\s*\.undo-caret \{\s*display: grid;\s*place-items: center;\s*height: 26px;/);
  assert.match(undo, /\.undo-group \{[^}]*padding: 2px;[^}]*border: 1px solid/);
});

test('the Publish count is centred on its digits, and the Publish menu ends inside the window with what waits scrolling in a box of its own', () => {
  assert.match(NO_COMMENTS, /@supports \(text-box: trim-both cap alphabetic\) \{\s*\.publish-count \{[^}]*padding: calc\(\(1\.25rem - 1cap\) \/ 2\) 0\.35rem;[^}]*text-box: trim-both cap alphabetic;/);
  assert.doesNotMatch(NO_COMMENTS.slice(NO_COMMENTS.indexOf('.publish-count {'), NO_COMMENTS.indexOf('}', NO_COMMENTS.indexOf('.publish-count {'))), /tabular-nums/, 'a 1 stands in the middle as a 6 does');
  assert.match(NO_COMMENTS, /\.tool-pop\.publish-pop \{[^}]*max-height: min\(40rem, calc\(100vh - 5rem\)\);/);
  assert.match(NO_COMMENTS, /\.publish-pop > \.publish-rows \{\s*flex: 1 1 auto;\s*min-height: 4rem;\s*overflow-y: auto;/);
  assert.match(readFileSync(new URL('../editor/src/shell/TopBar.svelte', import.meta.url), 'utf-8'), /<div class="publish-rows"><UnpublishedRows /);
});
