/**
 * Content push on the desktop canvas (ADR-0024): the Wix Editor gap rules
 * applied to every block below a block that grew.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { pushLayout, clampFitMin, fitFloorPx, fitMoves, fitMovesAll, followsContent, heightAlign, FIT_BY_WIDTH, FOLLOWS_CONTENT, STRETCHES, PUSH_GAP_MAX, PUSH_GAP_MIN, PUSH_SECTION_PAD, SIZE, SIZE_BY_FRAME, SIZE_TEXT, TYPE_SCALE, blockSize, drawnScale, sizeBounds, sizeRange, baseTextPx, FETCHES_CONTENT, mobileLoadingHeight } = await engineImport('push-model.js');

const at = (id, y, h, extra = {}) => ({ id, y, h, ...extra });
/** A block with a desktop frame, the way a section stores it. */
const blk = (id, y, h, x = 0) => ({ id, frames: { desktop: { x, y, w: 40, h } } });

test('no growth moves nothing, and the bottom is the lowest frame edge', () => {
  const out = pushLayout([at('a', 0, 100), at('b', 150, 40)]);
  assert.equal(out.shifts.size, 0);
  assert.equal(out.bottom, 190);
});

test('a gap of PUSH_GAP_MAX or less is preserved: the block below moves the whole growth', () => {
  const out = pushLayout([at('a', 0, 100, { grow: 30 }), at('b', 100 + PUSH_GAP_MAX, 40)]);
  assert.equal(out.shifts.get('b'), 30);
  assert.equal(out.bottom, 100 + PUSH_GAP_MAX + 40 + 30);
});

test('a larger gap absorbs the growth until PUSH_GAP_MIN is left', () => {
  const below = at('b', 180, 40);
  assert.equal(pushLayout([at('a', 0, 100, { grow: 30 }), below]).shifts.has('b'), false);
  const out = pushLayout([at('a', 0, 100, { grow: 74 }), below]);
  assert.equal(out.shifts.get('b'), 74 - (80 - PUSH_GAP_MIN));
});

test('a block whose top is above the grown block\'s middle is a deliberate overlap and stays', () => {
  const out = pushLayout([at('image', 0, 200, { grow: 50 }), at('badge', 20, 40), at('caption', 150, 40)]);
  assert.equal(out.shifts.has('badge'), false);
  assert.equal(out.shifts.get('caption'), 50);
});

test('the move cascades through the blocks below', () => {
  const out = pushLayout([at('a', 0, 100, { grow: 20 }), at('b', 120, 50), at('c', 190, 50), at('d', 500, 50)]);
  assert.equal(out.shifts.get('b'), 20);
  assert.equal(out.shifts.get('c'), 20);
  assert.equal(out.shifts.has('d'), false);
});

test('two blocks side by side below both move, and a block above never moves', () => {
  const out = pushLayout([at('top', -40, 30), at('a', 0, 100, { grow: 25, x: 0 }), at('l', 120, 40, { x: 0 }), at('r', 130, 40, { x: 50 })]);
  assert.equal(out.shifts.has('top'), false);
  assert.equal(out.shifts.get('l'), 25);
  assert.equal(out.shifts.get('r'), 25);
});

test('two growing blocks give the larger shift, never the sum', () => {
  const out = pushLayout([at('a', 0, 100, { grow: 30, x: 0 }), at('b', 0, 100, { grow: 10, x: 50 }), at('c', 120, 40)]);
  assert.equal(out.shifts.get('c'), 30);
});

test('negative frames and missing fields are tolerated', () => {
  const out = pushLayout([at('a', -20, 60, { grow: 10 }), { id: 'broken' }, at('b', 50, 20)]);
  assert.equal(out.shifts.get('b'), 10);
  assert.equal(out.bottom, 80);
});

test('clampFitMin: a share of the design size between 0.01 and 1, default 0.6', () => {
  assert.equal(clampFitMin(0.4), 0.4);
  assert.equal(clampFitMin(0), 0.01);
  assert.equal(clampFitMin(3), 1);
  assert.equal(clampFitMin(undefined), 0.6);
  assert.equal(clampFitMin('x'), 0.6);
});

test('blockSize: the stored size inside the sizes the block may take, 1 for anything else and for the frame-sized types', () => {
  assert.deepEqual([...SIZE_BY_FRAME].sort(), ['icon', 'image', 'map', 'shape', 'video']);
  assert.equal(blockSize({ type: 'text' }), 1);
  assert.equal(blockSize({ type: 'text', size: 0.75 }), 0.75);
  assert.equal(blockSize({ type: 'calendar', size: 0.1 }), SIZE.min);
  assert.equal(blockSize({ type: 'calendar', size: 9 }), SIZE.max);
  // A bound the owner sets holds the size where the base text meets it: 12 px of a calendar's 14 px base at 90 %.
  assert.equal(blockSize({ type: 'calendar', size: 0.1, sizeMin: 12 }), 0.9);
  assert.equal(blockSize({ type: 'text', props: { size: 64 }, size: 9, sizeMax: 96 }), 1.5);
  assert.equal(blockSize({ type: 'text', size: 'big' }), 1);
  assert.equal(blockSize({ type: 'text', size: -1 }), 1);
  assert.equal(blockSize({ type: 'image', size: 1.5 }), 1);
  assert.equal(blockSize(undefined), 1);
});

test('drawnScale: the size times the type scale, the calendar at its dense base', () => {
  assert.equal(TYPE_SCALE.get('calendar'), 0.875);
  assert.equal(drawnScale({ type: 'calendar' }), 0.875);
  assert.equal(drawnScale({ type: 'calendar', size: 0.5 }), 0.4375);
  assert.equal(drawnScale({ type: 'text', size: 0.5 }), 0.5);
  assert.equal(drawnScale({ type: 'image', size: 0.5 }), 1);
  assert.equal(drawnScale(undefined), 1);
});

test('sizeBounds: the owner\'s text bounds in px inside SIZE_TEXT, null where unset, the largest never under the smallest', () => {
  assert.deepEqual(sizeBounds({}), { min: null, max: null });
  assert.deepEqual(sizeBounds({ sizeMin: 14, sizeMax: 40 }), { min: 14, max: 40 });
  assert.deepEqual(sizeBounds({ sizeMin: 2, sizeMax: 900 }), { min: SIZE_TEXT.min, max: SIZE_TEXT.max });
  assert.deepEqual(sizeBounds({ sizeMin: 50, sizeMax: 20 }), { min: 50, max: 50 });
  assert.deepEqual(sizeBounds({ sizeMin: 'x', sizeMax: null }), { min: null, max: null });
  assert.deepEqual(sizeBounds({ sizeMin: 13.6 }), { min: 14, max: null });
  assert.deepEqual(sizeBounds({ sizeMax: 20 }), { min: null, max: 20 });
});

test("baseTextPx: a text block's own size, else the page's base text at the type scale", () => {
  assert.equal(baseTextPx({ type: 'text', props: { size: 24 } }), 24);
  assert.equal(baseTextPx({ type: 'text', props: {} }), SIZE_TEXT.base);
  assert.equal(baseTextPx({ type: 'calendar', props: { size: 24 } }), 14);
  assert.equal(baseTextPx({ type: 'faq' }), SIZE_TEXT.base);
  assert.equal(baseTextPx(undefined), SIZE_TEXT.base);
});

test('sizeRange: the whole of SIZE unless the owner bounds the base text, then in whole steps, always holding 1', () => {
  assert.deepEqual(sizeRange({ type: 'calendar' }), { min: SIZE.min, max: SIZE.max });
  assert.deepEqual(sizeRange({ type: 'text', props: { size: 10 } }), { min: SIZE.min, max: SIZE.max });
  // 12 / 14 is 0.857, rounded up to the next step so the text stays over the bound.
  assert.deepEqual(sizeRange({ type: 'calendar', sizeMin: 12 }), { min: 0.9, max: SIZE.max });
  assert.deepEqual(sizeRange({ type: 'text', sizeMin: 12 }), { min: 0.75, max: SIZE.max });
  assert.deepEqual(sizeRange({ type: 'text', props: { size: 64 }, sizeMax: 96 }), { min: SIZE.min, max: 1.5 });
  assert.deepEqual(sizeRange({ type: 'faq', sizeMin: 8, sizeMax: 20 }), { min: 0.5, max: 1.25 });
  // Text already past a bound keeps its size as drawn.
  assert.deepEqual(sizeRange({ type: 'text', props: { size: 10 }, sizeMin: 12 }), { min: 1, max: SIZE.max });
  assert.deepEqual(sizeRange({ type: 'text', props: { size: 120 }, sizeMax: 96 }), { min: SIZE.min, max: 1 });
  for (const size of [9, 11, 13, 15, 17, 19, 21, 23, 33, 47]) {
    const { min, max } = sizeRange({ type: 'text', props: { size }, sizeMin: 12, sizeMax: 96 });
    assert.ok(size * min >= 12 - 1e-9 || min === 1, `${size} px at ${min}`);
    assert.ok(size * max <= 96 + 1e-9 || max === 1, `${size} px at ${max}`);
    assert.equal(Math.round(min * 100) % 5, 0);
    assert.equal(Math.round(max * 100) % 5, 0);
  }
});

test('fitFloorPx: the width-floor types get their share of the design width times the floor, everything else 0', () => {
  const image = { type: 'image', fit: 'shrink', fitMin: 0.6, frames: { desktop: { x: 10, w: 40 } } };
  assert.deepEqual([...FIT_BY_WIDTH].sort(), ['icon', 'image', 'shape', 'video']);
  assert.equal(fitFloorPx(image, { contentWidth: 1440 }), 346);
  assert.equal(fitFloorPx(image, {}), 346);
  assert.equal(fitFloorPx(image, { contentWidth: 1000 }), 240);
  assert.equal(fitFloorPx({ ...image, fitMin: undefined }, {}), 346);
  assert.equal(fitFloorPx({ ...image, fit: undefined }, {}), 0);
  assert.equal(fitFloorPx({ ...image, type: 'text' }, {}), 0);
  assert.equal(fitFloorPx(image, { contentWidth: 'full' }), 0);
  assert.equal(fitFloorPx({ ...image, frames: {} }, {}), 0);
});

test('the block types ADR-0025 names follow their content, and no other', () => {
  assert.deepEqual([...FOLLOWS_CONTENT].sort(), ['audio', 'calendar', 'cart', 'checkout', 'collection', 'contact', 'countdown', 'faq', 'form', 'product', 'quote', 'share', 'stats', 'table', 'timeline']);
  assert.equal(followsContent({ type: 'faq' }), true);
  for (const type of ['text', 'image', 'video', 'icon', 'shape', 'button', 'gallery', 'ribbon', 'map']) {
    assert.equal(followsContent({ type }), false, type);
  }
  assert.equal(followsContent(null), false);
});

test('a block given its own height no longer follows its content, and places its content by align', () => {
  assert.equal(followsContent({ type: 'faq', height: { mode: 'own' } }), false);
  assert.equal(followsContent({ type: 'faq', height: { mode: 'content' } }), true);
  assert.equal(followsContent({ type: 'faq', height: { mode: 'own', align: 'middle' } }), false);
  assert.equal(followsContent({ type: 'image', height: { mode: 'own' } }), false);
  assert.equal(heightAlign({ type: 'faq' }), 'top');
  assert.equal(heightAlign({ type: 'faq', height: { mode: 'own' } }), 'top');
  assert.equal(heightAlign({ type: 'faq', height: { mode: 'own', align: 'middle' } }), 'middle');
  assert.equal(heightAlign({ type: 'faq', height: { mode: 'own', align: 'bottom' } }), 'bottom');
  assert.equal(heightAlign({ type: 'stats', height: { mode: 'own', align: 'stretch' } }), 'stretch');
  // An alignment without the block's own height is nothing: the content is the box.
  assert.equal(heightAlign({ type: 'faq', height: { mode: 'content', align: 'middle' } }), 'top');
  assert.equal(heightAlign({ type: 'faq', height: { mode: 'own', align: 'sideways' } }), 'top');
  assert.equal(heightAlign(null), 'top');
  assert.deepEqual([...STRETCHES].sort(), ['countdown', 'quote', 'stats']);
  for (const type of STRETCHES) assert.ok(FOLLOWS_CONTENT.has(type), type);
});

test('every type that follows its content is a core block', async () => {
  const { readdirSync } = await import('node:fs');
  const { ENGINE_DIR } = await import('./_engine.mjs');
  const files = new Set(readdirSync(new URL('blocks/', ENGINE_DIR)).map((name) => name.replace(/\.js$/, '')));
  for (const type of FOLLOWS_CONTENT) assert.ok(files.has(type), type);
});

test('fitMoves: a taller frame moves the blocks below as far as the push pass shifted them', () => {
  const blocks = [blk('faq', 0, 100), blk('near', 120, 40), blk('far', 400, 40), blk('badge', 20, 30)];
  const moves = fitMoves(blocks, 'faq', 130);
  const drawn = pushLayout([at('faq', 0, 100, { grow: 30 }), at('near', 120, 40), at('far', 400, 40), at('badge', 20, 30)]).shifts;
  assert.equal(moves.get('near'), 120 + drawn.get('near'));
  assert.equal(moves.get('near'), 150);
  assert.equal(moves.has('far'), false);
  assert.equal(moves.has('badge'), false);
  assert.equal(moves.has('faq'), false);
});

test('fitMoves: a shorter frame, or one that stays, moves nothing', () => {
  const blocks = [blk('faq', 0, 300), blk('below', 310, 40)];
  assert.equal(fitMoves(blocks, 'faq', 200).size, 0);
  assert.equal(fitMoves(blocks, 'faq', 300).size, 0);
  assert.equal(fitMoves(blocks, 'missing', 500).size, 0);
});

test('fitMoves: a block moved past the section line keeps its move, and no height is written', () => {
  const blocks = [blk('faq', 100, 300), blk('below', 420, 60)];
  const moves = fitMoves(blocks, 'faq', 400);
  assert.equal(moves.get('below'), 520);
  assert.deepEqual([...moves.keys()], ['below']);
  for (const block of blocks) assert.equal(block.size, undefined);
});

test('fitMoves: broken frames are skipped', () => {
  const blocks = [blk('faq', 0, 100), { id: 'broken' }, { id: 'half', frames: { desktop: { y: 'x', h: 10 } } }, blk('below', 110, 20)];
  assert.equal(fitMoves(blocks, 'faq', 150).get('below'), 160);
  assert.equal(fitMoves(null, 'faq', 150).size, 0);
});

test('fitMovesAll: two stale blocks settled at once move as the push pass draws them with both grown', () => {
  const blocks = [blk('a', 0, 100), blk('b', 120, 100), blk('c', 240, 40), blk('d', 600, 40)];
  const moves = fitMovesAll(blocks, new Map([['a', 140], ['b', 150]]));
  const drawn = pushLayout([at('a', 0, 100, { grow: 40 }), at('b', 120, 100, { grow: 50 }), at('c', 240, 40), at('d', 600, 40)]);
  for (const id of ['b', 'c', 'd']) assert.equal(moves.get(id) ?? null, drawn.shifts.has(id) ? blocks.find((x) => x.id === id).frames.desktop.y + drawn.shifts.get(id) : null, id);
  assert.equal(moves.get('c'), 240 + 90);
});

test('fitMoves is fitMovesAll with one fit', () => {
  const cases = [
    [[blk('faq', 0, 100), blk('near', 120, 40), blk('far', 400, 40), blk('badge', 20, 30)], 'faq', 130],
    [[blk('faq', 100, 300), blk('below', 420, 60)], 'faq', 400],
    [[blk('faq', 100, 300), blk('hung', 560, 200)], 'faq', 340],
  ];
  for (const [blocks, id, h] of cases) {
    assert.deepEqual(fitMoves(blocks, id, h), fitMovesAll(blocks, new Map([[id, h]])));
  }
});

test('a stale block settled where it stands moves nothing', () => {
  // The front page's hero: a collection at y 960 with a frame of 240 px and
  // 590 px of content, nothing below it. Settling the frame moves nothing,
  // and the section's own height is not the fit's to write.
  const blocks = [blk('text', 256, 80), blk('calendar', 176, 435, 55), blk('collection', 960, 240, 20)];
  assert.equal(fitMoves(blocks, 'collection', 590).size, 0);
});

test('mobileLoadingHeight: the stored phone height of a block that fetches its content, 0 otherwise', () => {
  assert.deepEqual([...FETCHES_CONTENT].sort(), ['calendar', 'collection', 'product']);
  for (const type of FETCHES_CONTENT) assert.ok(FOLLOWS_CONTENT.has(type), `${type} follows its content`);
  assert.equal(mobileLoadingHeight({ type: 'calendar', mobileHeight: 353 }), 353);
  assert.equal(mobileLoadingHeight({ type: 'collection', mobileHeight: 412.6 }), 413);
  assert.equal(mobileLoadingHeight({ type: 'calendar' }), 0);
  assert.equal(mobileLoadingHeight({ type: 'calendar', mobileHeight: -5 }), 0);
  assert.equal(mobileLoadingHeight({ type: 'calendar', mobileHeight: 'tall' }), 0);
  assert.equal(mobileLoadingHeight({ type: 'text', mobileHeight: 200 }), 0);
  assert.equal(mobileLoadingHeight(undefined), 0);
});
