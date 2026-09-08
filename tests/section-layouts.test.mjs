/**
 * The layout model (section-layouts.js): classification, reading order and the layout variants as pure frames+minHeight functions.
 * The invariants: every movable block gets a frame within 0-100 % in x/w, heights and rotation are never touched, decor/shapes are never touched, the result is deterministic, and too few/wrong blocks give no variants.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { movableBlocks, readingOrder, applicableLayouts, layoutFrames, LAYOUT_IDS } = await engineImport('section-layouts.js');

const block = (id, type, frame = {}, extra = {}) => ({
  id, type, version: 1, props: {},
  frames: { desktop: { x: 10, y: 20, w: 30, h: 40, z: 1, rot: 0, ...frame }, mobile: null },
  ...extra,
});

const GRID = { size: 24 };

// Deliberate Norwegian block ids: the assertions quote them verbatim.
const heroish = () => [
  block('tekst', 'text', { x: 8, y: 30, w: 40, h: 60 }),
  block('knapp', 'button', { x: 8, y: 110, w: 20, h: 44 }),
  block('bilde', 'image', { x: 55, y: 20, w: 38, h: 220 }),
  block('pynt', 'shape', { x: 70, y: 10, w: 20, h: 20 }),
  block('dekor', 'image', { x: 0, y: 0, w: 10, h: 10 }, { decor: true }),
];

test('movableBlocks: decor and shapes are kept out', () => {
  assert.deepEqual(movableBlocks(heroish()).map((b) => b.id), ['tekst', 'knapp', 'bilde']);
});

test('readingOrder: (y, x), stable on id', () => {
  const order = readingOrder(movableBlocks(heroish())).map((b) => b.id);
  assert.deepEqual(order, ['bilde', 'tekst', 'knapp']);
});

test('applicableLayouts: all six with text+media, only stacks/columns without media', () => {
  assert.deepEqual(applicableLayouts(heroish()), LAYOUT_IDS);
  const textOnly = [block('a', 'text'), block('b', 'button', { y: 80 })];
  assert.deepEqual(applicableLayouts(textOnly), ['stack-center', 'stack-left', 'two-columns']);
});

test('fewer than two movable blocks give no variants', () => {
  assert.deepEqual(applicableLayouts([block('a', 'text')]), []);
  assert.deepEqual(applicableLayouts([block('a', 'text'), block('p', 'shape')]), []);
  assert.equal(layoutFrames('stack-center', [block('a', 'text')], GRID), null);
});

test('all variants: every movable block gets a frame within 0-100, h/rot untouched', () => {
  const blocks = heroish();
  for (const id of LAYOUT_IDS) {
    const result = layoutFrames(id, blocks, GRID);
    assert.ok(result, id);
    assert.equal(result.frames.length, 3, id);
    for (const { blockId, frame } of result.frames) {
      const original = blocks.find((b) => b.id === blockId).frames.desktop;
      assert.ok(frame.x >= 0 && frame.x + frame.w <= 100, `${id}:${blockId} within the width`);
      assert.ok(frame.y >= 0, `${id}:${blockId} y >= 0`);
      assert.equal(frame.h, original.h, `${id}:${blockId} height untouched`);
      assert.equal(frame.rot, original.rot, `${id}:${blockId} rotation untouched`);
    }
    // Decor and shapes have no frames in the result.
    assert.ok(!result.frames.some((f) => f.blockId === 'pynt' || f.blockId === 'dekor'), id);
  }
});

test('minHeight >= the lowest block + margin, same rule as fit height', () => {
  for (const id of LAYOUT_IDS) {
    const result = layoutFrames(id, heroish(), GRID);
    const maxBottom = Math.max(...result.frames.map(({ frame }) => frame.y + frame.h));
    assert.equal(result.minHeight, `${Math.max(GRID.size * 3, maxBottom + GRID.size)}px`, id);
  }
});

test('deterministic: the same input gives an identical result', () => {
  const a = JSON.stringify(layoutFrames('two-columns', heroish(), GRID));
  const b = JSON.stringify(layoutFrames('two-columns', heroish(), GRID));
  assert.equal(a, b);
});

test('split-media-right: text left, media right; mirrored for -left', () => {
  const right = layoutFrames('split-media-right', heroish(), GRID);
  const get = (res, id) => res.frames.find((f) => f.blockId === id).frame;
  assert.equal(get(right, 'tekst').x, 8);
  assert.equal(get(right, 'bilde').x, 54);
  const left = layoutFrames('split-media-left', heroish(), GRID);
  assert.equal(get(left, 'tekst').x, 54);
  assert.equal(get(left, 'bilde').x, 8);
});

test('hero-top: the largest media full width at the top, the rest centered below', () => {
  const result = layoutFrames('hero-top', heroish(), GRID);
  const hero = result.frames.find((f) => f.blockId === 'bilde').frame;
  assert.equal(hero.w, 84);
  assert.equal(hero.y, GRID.size);
  for (const { blockId, frame } of result.frames) {
    if (blockId === 'bilde') continue;
    assert.ok(frame.y > hero.y + hero.h - 1, `${blockId} below the hero`);
    assert.equal(frame.x, (100 - frame.w) / 2, `${blockId} centered`);
  }
});

test('two-columns: the next block in the shortest column (balancing)', () => {
  const blocks = [
    block('hoy', 'image', { x: 8, y: 10, w: 40, h: 300 }),
    block('a', 'text', { x: 52, y: 20, w: 40, h: 50 }),
    block('b', 'text', { x: 52, y: 90, w: 40, h: 50 }),
  ];
  const result = layoutFrames('two-columns', blocks, GRID);
  const get = (id) => result.frames.find((f) => f.blockId === id).frame;
  // The tall block ('hoy') takes the left column; a and b both stack in the right one.
  assert.equal(get('hoy').x, 8);
  assert.equal(get('a').x, 52);
  assert.equal(get('b').x, 52);
  assert.ok(get('b').y > get('a').y);
});
