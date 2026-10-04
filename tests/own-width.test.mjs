/**
 * A block lays itself out by its own width (ADR-0025 decision 7): the block
 * types in FOLLOWS_WIDTH are size containers, and every width rule that asks
 * them keeps the window's media query as its twin for a browser without
 * container queries, behind @supports not, with the same declarations.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { engineImport } from './_engine.mjs';

const { FOLLOWS_WIDTH, followsWidth } = await engineImport('push-model.js');
const CSS = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf-8').replace(/\/\*[\s\S]*?\*\//g, '');

/** The top-level rules of a style sheet as [prelude, body] pairs, bodies unparsed. */
function rules(css) {
  const out = [];
  let depth = 0;
  let start = 0;
  let prelude = '';
  for (let i = 0; i < css.length; i++) {
    if (css[i] === '{') {
      if (depth === 0) {
        prelude = css.slice(start, i).trim();
        start = i + 1;
      }
      depth += 1;
    } else if (css[i] === '}') {
      depth -= 1;
      if (depth === 0) {
        out.push([prelude, css.slice(start, i)]);
        start = i + 1;
      }
    }
  }
  return out;
}

const squash = (text) => text.replace(/\s+/g, ' ').trim();
const TOP = rules(CSS);
const FALLBACKS = TOP.filter(([prelude]) => squash(prelude) === '@supports not (container-type: inline-size)')
  .flatMap(([, body]) => rules(body))
  .map(([prelude, body]) => [squash(prelude), squash(body)]);
const TWINS = TOP.filter(([prelude]) => prelude.startsWith('@container urd-block'))
  .map(([prelude, body]) => [squash(prelude), squash(body)]);

test('the seven block types with columns or cards lay themselves out by their own width', () => {
  assert.deepEqual([...FOLLOWS_WIDTH].sort(), ['calendar', 'collection', 'gallery', 'product', 'stats', 'table', 'timeline']);
  assert.equal(followsWidth({ type: 'calendar' }), true);
  for (const type of ['text', 'image', 'video', 'button', 'faq', 'quote', 'ribbon', 'map']) assert.equal(followsWidth({ type }), false, type);
});

test('their boxes are the size container urd-block, and the canvas is none', () => {
  const box = TOP.find(([prelude]) => squash(prelude) === '.urd-block[data-urd-width="own"]');
  assert.ok(box, 'the container rule is in base.css');
  assert.match(box[1], /container:\s*urd-block\s*\/\s*inline-size/);
  const canvas = TOP.find(([prelude]) => squash(prelude) === '.urd-canvas');
  assert.ok(canvas && !/container/.test(canvas[1]));
});

test('every window fallback has a container twin with the same condition and the same declarations', () => {
  assert.ok(FALLBACKS.length >= 5, 'the calendar\'s fallbacks are found');
  for (const [prelude, body] of FALLBACKS) {
    const condition = prelude.replace(/^@media\s*/, '');
    assert.ok(TWINS.some(([p, b]) => p === `@container urd-block ${condition}` && b === body), `${prelude} { ${body.slice(0, 60)} } has a container twin that says the same`);
  }
});

test('no calendar rule follows the window\'s width outside a fallback', () => {
  for (const [prelude, body] of TOP) {
    if (!/^@media\b/.test(prelude) || !/width/.test(prelude)) continue;
    assert.ok(!/\.urd-cal/.test(body), `${squash(prelude)} holds a calendar rule outside @supports not`);
  }
});
