/**
 * Guard against a core block that exists in the engine but cannot be reached.
 * A block type is registered in ONE place (registerCore in urd.js) but has to be listed in three more before an owner can insert it: the block palette (block-palette.js, which the canvas menu and the Blocks panel both read), and the editor's BLOCK_DEFAULTS (the seed) and BLOCK_LABELS (the Properties header).
 * Nothing fails when one of them is forgotten: the block simply never appears.
 * This test reads the palette as a module and the editor's lists as text, the way modulepreload.test.mjs reads the HTML shells, and holds them against the registry.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE_DIR, engineImport } from './_engine.mjs';

const { PALETTE_GROUPS, PALETTE_KINDS, EXTRA_GROUP_PICTURES, palettePicture, recentKinds, rememberKind, shopOn, paletteGroupsFor } = await engineImport('block-palette.js');

// The seeds and the names stand in the blocks module (0.7.26.5).
const APP = new URL('../editor/src/state/blocks.svelte.js', import.meta.url);
// The palette's items stand in the Blocks panel (0.7.26.4).
const BLOCKS = new URL('../editor/src/panels/BlocksPanel.svelte', import.meta.url);
const read = (url) => readFileSync(url, 'utf8');
const slice = (text, from, to) => text.slice(text.indexOf(from), text.indexOf(to, text.indexOf(from)));

/** The core block types, in registration order. */
function coreBlocks() {
  const src = read(new URL('urd.js', ENGINE_DIR));
  return [...src.matchAll(/Urd\.blocks\.define\('([^']+)'/g)].map((m) => m[1]);
}

/** The block types the palette adds, in the canvas menu and the Blocks panel alike: the entries that open a picker or build another kind (a gallery from pictures) are left out. */
function menuKinds() {
  return new Set(PALETTE_GROUPS.flatMap((group) => group.kinds).filter((kind) => !PALETTE_KINDS[kind].action && !PALETTE_KINDS[kind].block));
}

const app = read(APP);

/** The editor's seeds: the props and the frame a new block is built from. */
function seeds() {
  return new Set([...slice(app, 'const BLOCK_DEFAULTS', 'function buildBlock').matchAll(/^ {2}'?([a-z-]+)'?: \{/gm)].map((m) => m[1]));
}

/** The panel search's entries: the palette's kinds, and the calendar's views the hit list reaches by name. */
function paletteKinds() {
  return new Set([...menuKinds(), ...[...read(BLOCKS).matchAll(/act: 'block', kind: '([a-z-]+)'/g)].map((m) => m[1])]);
}

/** The labels the Properties header reads. */
function labels() {
  return new Set([...slice(app, 'const BLOCK_LABELS', '});').matchAll(/([a-z-]+): ta\(/g)].map((m) => m[1]));
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
  assert.deepEqual(missing, [], `missing in PALETTE_GROUPS (block-palette.js): ${missing.join(', ')}`);
});

test('every core block has a seed in the editor', () => {
  const seeded = seeds();
  const missing = coreBlocks().filter((type) => !seeded.has(type) && !allowed(type, 'seed'));
  assert.deepEqual(missing, [], `missing in BLOCK_DEFAULTS (blocks.svelte.js): ${missing.join(', ')}`);
});

test('every core block is found by the palette search', () => {
  const kinds = paletteKinds();
  const missing = coreBlocks().filter((type) => !kinds.has(type) && !allowed(type, 'palette'));
  assert.deepEqual(missing, [], `missing in panelBlockItems (BlocksPanel.svelte): ${missing.join(', ')}`);
});

test('every core block has a name in the Properties header', () => {
  const named = labels();
  const missing = coreBlocks().filter((type) => !named.has(type) && !allowed(type, 'label'));
  assert.deepEqual(missing, [], `missing in BLOCK_LABELS (blocks.svelte.js): ${missing.join(', ')}`);
});

test('the lists name no block the engine does not define', () => {
  const core = new Set(coreBlocks());
  // The variants are their own entries and build a core block with other props.
  const VARIANTS = /^(shape-|calendar-|text-box$)/;
  for (const [list, ids] of [['PALETTE_GROUPS', menuKinds()], ['BLOCK_DEFAULTS', seeds()],
    ['panelBlockItems', paletteKinds()], ['BLOCK_LABELS', labels()]]) {
    const strays = [...ids].filter((id) => !core.has(id) && !VARIANTS.test(id));
    assert.deepEqual(strays, [], `${list} names blocks the engine does not define: ${strays.join(', ')}`);
  }
});

test('the canvas menu and the Blocks panel both draw the palette, so their groups and order are one', () => {
  const menu = read(new URL('preview-edit.js', ENGINE_DIR));
  const panel = read(BLOCKS);
  // The panel reads the groups through paletteGroupsFor, which leaves the shop's group out while the shop is off (shopOn); the canvas menu builds every group and hides the shop's as it opens, so the gate's value at the opening counts.
  assert.match(menu, /import \{ PALETTE_GROUPS, PALETTE_KINDS(, \w+)* \} from '\.\/block-palette\.js';/);
  assert.match(menu, /for \(const group of PALETTE_GROUPS\) \{/);
  assert.match(menu, /shopGroup\.tab\.hidden = shopGroup\.panel\.hidden = !shopBlocksOn/);
  assert.match(panel, /from '\$engine\/block-palette\.js';/);
  assert.match(panel, /\{#each paletteGroupsFor\(ed\.shopBlocksOn\(\)\) as group \(group\.id\)\}/);
  const kinds = PALETTE_GROUPS.flatMap((group) => group.kinds);
  assert.equal(new Set(kinds).size, kinds.length, 'a kind stands in one group only');
});

test('every kind in the palette has a drawn picture and a name in the core languages', async () => {
  const dicts = await Promise.all(['nb', 'en-GB', 'tr'].map(async (lang) => (await engineImport(`locales/admin/${lang}.js`)).default.strings));
  for (const group of PALETTE_GROUPS) {
    for (const dict of dicts) assert.ok(dict[group.labelKey], `${group.id}: ${group.labelKey}`);
    for (const kind of group.kinds) {
      assert.match(palettePicture(kind), /^<svg [^>]*aria-hidden="true">.+<\/svg>$/, `${kind}: a drawn picture`);
      for (const dict of dicts) {
        assert.ok(dict[PALETTE_KINDS[kind].labelKey], `${kind}: ${PALETTE_KINDS[kind].labelKey}`);
        if (PALETTE_KINDS[kind].tipKey) assert.ok(dict[PALETTE_KINDS[kind].tipKey], `${kind}: ${PALETTE_KINDS[kind].tipKey}`);
      }
    }
  }
  assert.equal(palettePicture('no-such-kind'), '');
});

test('every group in the canvas menu\'s list has a picture', () => {
  for (const group of PALETTE_GROUPS) assert.ok(group.kinds.includes(group.icon), `${group.id}: its icon is one of its own kinds`);
  for (const [id, picture] of Object.entries(EXTRA_GROUP_PICTURES)) assert.match(picture, /^<svg [^>]*aria-hidden="true">.+<\/svg>$/, id);
});

test('the canvas menu counts a kind as recent only when it adds a block in one press', () => {
  const menu = read(new URL('preview-edit.js', ENGINE_DIR));
  assert.match(menu, /if \(!def\.files && !def\.action\) noteRecentKind\(kind\);/);
});

test('the recent blocks: newest first, each once, at most three, and only kinds the palette holds', () => {
  assert.deepEqual(rememberKind([], 'image'), ['image']);
  assert.deepEqual(rememberKind(['text', 'image', 'map'], 'image'), ['image', 'text', 'map']);
  assert.deepEqual(rememberKind(['text', 'image', 'map'], 'form'), ['form', 'text', 'image']);
  assert.deepEqual(recentKinds(['text', 'no-such-kind', 3, 'text', 'map']), ['text', 'map']);
  assert.deepEqual(recentKinds('text'), []);
  assert.deepEqual(recentKinds(null), []);
});

test('the shop group is offered while the shop is on: the site\'s own choice first, else a product catalogue decides', () => {
  assert.equal(shopOn({ commerce: { shop: false } }, true), false);
  assert.equal(shopOn({ commerce: { shop: true } }, false), true);
  assert.equal(shopOn({ commerce: { currency: 'NOK' } }, true), true);
  assert.equal(shopOn(undefined, false), false);
  assert.deepEqual(paletteGroupsFor(true), PALETTE_GROUPS);
  assert.deepEqual(paletteGroupsFor(false).map((g) => g.id), PALETTE_GROUPS.map((g) => g.id).filter((id) => id !== 'shop'));
});

test('the preview\'s boot seeds the shop gate from the site it read, before the page state exists', () => {
  const boot = slice(read(new URL('urd.js', ENGINE_DIR)), 'export async function boot(', 'const state = ');
  assert.match(boot, /refreshShopGate\(site\)/);
  // The page state is declared after the editing module has loaded, so the boot reads nothing of it before then.
  assert.doesNotMatch(boot, /\bstate\b/);
});

test('every section template of the shop carries the mark the lists read while the shop\'s blocks are hidden', async () => {
  const { registerSectionPresets } = await engineImport('sections/presets.js');
  const defs = new Map();
  registerSectionPresets({ sections: { define: (id, def) => defs.set(id, def) } });
  const marked = [...defs].filter(([, def]) => def.shop).map(([id]) => id).sort();
  assert.deepEqual(marked, ['checkout', 'products', 'shop', 'shop-categories', 'shop-hero', 'shop-showcase', 'shop-trust']);
  // A template that builds a shop block is marked; the mark never sits on one that builds none.
  for (const [id, def] of defs) {
    const types = new Set((def.create().blocks ?? []).map((b) => b.type));
    const sells = ['product', 'cart', 'checkout'].some((type) => types.has(type));
    if (sells) assert.ok(def.shop, `${id} builds a shop block and carries the mark`);
  }
});
