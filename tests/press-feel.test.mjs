/**
 * How the admin's buttons answer a press (editor/src/lib/press-feel.js): the feels and the stored one read back.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
const { PRESS_FEELS, pressFeelOf } = await import('../editor/src/lib/press-feel.js');

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

