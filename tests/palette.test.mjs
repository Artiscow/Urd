/**
 * Guard against a core block that exists in the engine but cannot be reached.
 *
 * A block type is registered in ONE place (registerCore in urd.js) but has to
 * be listed by hand in four more before an owner can insert it: the canvas
 * menu's BLOCK_KINDS, and the editor's BLOCK_DEFAULTS (the seed), its palette
 * search (panelBlockItems) and BLOCK_LABELS (the Properties header). Nothing
 * fails when one of them is forgotten - the block simply never appears. This
 * test reads the four lists as text, the way modulepreload.test.mjs reads the
 * HTML shells, and holds them against the registry.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE_DIR } from './_engine.mjs';

const APP = new URL('../editor/src/App.svelte', import.meta.url);
const read = (url) => readFileSync(url, 'utf8');
const slice = (text, from, to) => text.slice(text.indexOf(from), text.indexOf(to, text.indexOf(from)));

/** The core block types, in registration order. */
function coreBlocks() {
  const src = read(new URL('urd.js', ENGINE_DIR));
  return [...src.matchAll(/Urd\.blocks\.define\('([^']+)'/g)].map((m) => m[1]);
}

/** The kinds the canvas menu offers (the same list feeds its search). */
function menuKinds() {
  const src = read(new URL('preview-edit.js', ENGINE_DIR));
  return new Set([...slice(src, 'const BLOCK_KINDS', '];').matchAll(/\['([a-z-]+)',/g)].map((m) => m[1]));
}

const app = read(APP);

/** The editor's seeds: the props and the frame a new block is built from. */
function seeds() {
  return new Set([...slice(app, 'const BLOCK_DEFAULTS', 'function buildBlock').matchAll(/^ {4}'?([a-z-]+)'?: \{/gm)].map((m) => m[1]));
}

/** The palette search's block entries. */
function paletteKinds() {
  return new Set([...app.matchAll(/act: 'block', kind: '([a-z-]+)'/g)].map((m) => m[1]));
}

/** The labels the Properties header reads. */
function labels() {
  return new Set([...slice(app, 'const BLOCK_LABELS', '};').matchAll(/([a-z-]+): ta\(/g)].map((m) => m[1]));
}

// The deliberate exceptions, each for a reason, not an oversight.
const EXCEPTIONS = {
  // The shape block is never inserted bare: the menu offers its five forms
  // (shape-line, shape-circle …), which all build a shape.
  shape: ['menu', 'seed', 'palette'],
  // The palette's image entry opens the file picker instead of inserting an
  // empty image block (act: 'image').
  image: ['palette'],
};

const allowed = (type, list) => (EXCEPTIONS[type] ?? []).includes(list);

test('every core block can be inserted from the canvas menu', () => {
  const kinds = menuKinds();
  const missing = coreBlocks().filter((type) => !kinds.has(type) && !allowed(type, 'menu'));
  assert.deepEqual(missing, [], `missing in BLOCK_KINDS (preview-edit.js): ${missing.join(', ')}`);
});

test('every core block has a seed in the editor', () => {
  const seeded = seeds();
  const missing = coreBlocks().filter((type) => !seeded.has(type) && !allowed(type, 'seed'));
  assert.deepEqual(missing, [], `missing in BLOCK_DEFAULTS (App.svelte): ${missing.join(', ')}`);
});

test('every core block is found by the palette search', () => {
  const kinds = paletteKinds();
  const missing = coreBlocks().filter((type) => !kinds.has(type) && !allowed(type, 'palette'));
  assert.deepEqual(missing, [], `missing in panelBlockItems (App.svelte): ${missing.join(', ')}`);
});

test('every core block has a name in the Properties header', () => {
  const named = labels();
  const missing = coreBlocks().filter((type) => !named.has(type) && !allowed(type, 'label'));
  assert.deepEqual(missing, [], `missing in BLOCK_LABELS (App.svelte): ${missing.join(', ')}`);
});

test('the lists name no block the engine does not define', () => {
  const core = new Set(coreBlocks());
  // The variants are their own entries and build a core block with other props.
  const VARIANTS = /^(shape-|calendar-|text-box$)/;
  for (const [list, ids] of [['BLOCK_KINDS', menuKinds()], ['BLOCK_DEFAULTS', seeds()],
    ['panelBlockItems', paletteKinds()], ['BLOCK_LABELS', labels()]]) {
    const strays = [...ids].filter((id) => !core.has(id) && !VARIANTS.test(id));
    assert.deepEqual(strays, [], `${list} names blocks the engine does not define: ${strays.join(', ')}`);
  }
});
