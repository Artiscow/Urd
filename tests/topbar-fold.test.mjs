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
 * 3. The short forms (the "!" in the status pill, the number in the mobile
 *    badge) are hidden by default and enabled in a media query with the SAME
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

const SRC = readFileSync(new URL('../editor/src/App.svelte', import.meta.url), 'utf-8');
const NO_COMMENTS = SRC.replace(/\/\*[\s\S]*?\*\//g, '');

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
const FOLD = SRC.slice(SRC.indexOf('---- Foldetrinnene'));

const cssSteps = () => [...FOLD.matchAll(/@media \(max-width:\s*(\d+)px\)/g)].map((m) => Number(m[1]));

test('the fold steps exist and are strictly decreasing', () => {
  assert.ok(FOLD.length > 0, 'could not find the fold-step section in App.svelte');
  const steps = cssSteps();
  assert.ok(steps.length >= 6, `expected at least six fold steps, found ${steps.length}`);
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
  assert.ok(block, 'could not find FOLD_MQ in App.svelte');
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

for (const short of ['.badge-mini', '.chip-mini']) {
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
