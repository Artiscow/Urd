/**
 * Content push on the desktop canvas (ADR-0024): the Wix Editor gap rules
 * applied to every block below a block that grew.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { pushLayout, clampFitMin, fitFloorPx, fitMoves, fitMovesAll, ownHeightPx, followsContent, FIT_BY_WIDTH, FOLLOWS_CONTENT, PUSH_GAP_MAX, PUSH_GAP_MIN, PUSH_SECTION_PAD } = await engineImport('push-model.js');

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

test('the fourteen block types ADR-0025 names follow their content, and no other', () => {
  assert.deepEqual([...FOLLOWS_CONTENT].sort(), ['audio', 'calendar', 'cart', 'checkout', 'collection', 'countdown', 'faq', 'form', 'product', 'quote', 'share', 'stats', 'table', 'timeline']);
  assert.equal(followsContent({ type: 'faq' }), true);
  for (const type of ['text', 'image', 'video', 'icon', 'shape', 'button', 'gallery', 'ribbon', 'map']) {
    assert.equal(followsContent({ type }), false, type);
  }
  assert.equal(followsContent(null), false);
});

test('every type that follows its content is a core block', async () => {
  const { readdirSync } = await import('node:fs');
  const { ENGINE_DIR } = await import('./_engine.mjs');
  const files = new Set(readdirSync(new URL('blocks/', ENGINE_DIR)).map((name) => name.replace(/\.js$/, '')));
  for (const type of FOLLOWS_CONTENT) assert.ok(files.has(type), type);
});

test('fitMoves: a taller frame moves the blocks below as far as the push pass shifted them', () => {
  const blocks = [blk('faq', 0, 100), blk('near', 120, 40), blk('far', 400, 40), blk('badge', 20, 30)];
  const { moves, minHeight } = fitMoves(blocks, 'faq', 130);
  const drawn = pushLayout([at('faq', 0, 100, { grow: 30 }), at('near', 120, 40), at('far', 400, 40), at('badge', 20, 30)]).shifts;
  assert.equal(moves.get('near'), 120 + drawn.get('near'));
  assert.equal(moves.get('near'), 150);
  assert.equal(moves.has('far'), false);
  assert.equal(moves.has('badge'), false);
  assert.equal(moves.has('faq'), false);
  assert.equal(minHeight, 0);
});

test('fitMoves: a shorter frame, or one that stays, moves nothing', () => {
  const blocks = [blk('faq', 0, 300), blk('below', 310, 40)];
  assert.equal(fitMoves(blocks, 'faq', 200).moves.size, 0);
  assert.equal(fitMoves(blocks, 'faq', 300).moves.size, 0);
  assert.equal(fitMoves(blocks, 'missing', 500).moves.size, 0);
});

test('fitMoves: a section with a height of its own grows the way the push pass raised it', () => {
  const blocks = [blk('faq', 100, 300), blk('below', 420, 60)];
  const { moves, minHeight } = fitMoves(blocks, 'faq', 400, 500);
  assert.equal(moves.get('below'), 520);
  assert.equal(minHeight, 520 + 60 + PUSH_SECTION_PAD);
  // Growth that still fits inside the section leaves its height alone.
  assert.equal(fitMoves(blocks, 'faq', 320, 600).minHeight, 0);
  // A section that follows its blocks gets no height written.
  assert.equal(fitMoves(blocks, 'faq', 400, 0).minHeight, 0);
});

test('fitMoves: a block past the section\'s height has no say in it', () => {
  const blocks = [blk('faq', 100, 300), blk('hung', 560, 200)];
  const { moves, minHeight } = fitMoves(blocks, 'faq', 340, 500);
  assert.equal(moves.has('hung'), false);
  assert.equal(minHeight, 0);
  // A fitted block that itself hangs past the edge raises nothing.
  assert.equal(fitMoves([blk('cal', 450, 100)], 'cal', 300, 500).minHeight, 0);
});

test('fitMoves: broken frames are skipped', () => {
  const blocks = [blk('faq', 0, 100), { id: 'broken' }, { id: 'half', frames: { desktop: { y: 'x', h: 10 } } }, blk('below', 110, 20)];
  assert.equal(fitMoves(blocks, 'faq', 150).moves.get('below'), 160);
  assert.equal(fitMoves(null, 'faq', 150).moves.size, 0);
});

test('fitMovesAll: two stale blocks settled at once move and raise as the push pass draws them with both grown', () => {
  const blocks = [blk('a', 0, 100), blk('b', 120, 100), blk('c', 240, 40), blk('d', 600, 40)];
  const { moves, minHeight } = fitMovesAll(blocks, new Map([['a', 140], ['b', 150]]), 400);
  const drawn = pushLayout([at('a', 0, 100, { grow: 40 }), at('b', 120, 100, { grow: 50 }), at('c', 240, 40), at('d', 600, 40)]);
  for (const id of ['b', 'c', 'd']) assert.equal(moves.get(id) ?? null, drawn.shifts.has(id) ? blocks.find((x) => x.id === id).frames.desktop.y + drawn.shifts.get(id) : null, id);
  assert.equal(moves.get('c'), 240 + 90);
  assert.equal(minHeight, 0);
});

test('fitMoves is fitMovesAll with one fit', () => {
  const cases = [
    [[blk('faq', 0, 100), blk('near', 120, 40), blk('far', 400, 40), blk('badge', 20, 30)], 'faq', 130, 0],
    [[blk('faq', 100, 300), blk('below', 420, 60)], 'faq', 400, 500],
    [[blk('faq', 100, 300), blk('hung', 560, 200)], 'faq', 340, 500],
  ];
  for (const [blocks, id, h, px] of cases) {
    assert.deepEqual(fitMoves(blocks, id, h, px), fitMovesAll(blocks, new Map([[id, h]]), px));
  }
});

test('ownHeightPx: a section\'s own height written in px, else 0', () => {
  assert.equal(ownHeightPx({ size: { minHeight: '1328px' } }), 1328);
  assert.equal(ownHeightPx({ size: { minHeight: '12.5px' } }), 12.5);
  assert.equal(ownHeightPx({ size: { minHeight: '100vh' } }), 0);
  assert.equal(ownHeightPx({ size: { minHeight: 'xpx' } }), 0);
  assert.equal(ownHeightPx({ size: {} }), 0);
  assert.equal(ownHeightPx({}), 0);
  assert.equal(ownHeightPx(null), 0);
});

test('a stale block settled where it stands keeps the section line the push pass drew', () => {
  // The front page's hero: its own height 1328 px, a collection at y 960 with
  // a frame of 240 px and 590 px of content. The push pass draws the section
  // at 960 + 590 + 24; settling the frame writes that height, and moves nothing.
  const blocks = [blk('text', 256, 80), blk('calendar', 176, 435, 55), blk('collection', 960, 240, 20)];
  const { moves, minHeight } = fitMoves(blocks, 'collection', 590, 1328);
  assert.equal(moves.size, 0);
  assert.equal(minHeight, 960 + 590 + PUSH_SECTION_PAD);
});
