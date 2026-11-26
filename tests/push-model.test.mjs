/**
 * Content push on the desktop canvas (ADR-0024): the Wix Editor gap rules
 * applied to the blocks below a block that grew and under its width.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { engineImport, ENGINE_DIR } from './_engine.mjs';

const { phoneSized, phoneFrame, forcesReadable, phoneHandoff, READABLE_PX, PHONE_WORDS, phoneWordsOf, phoneWordsChange, propsForViewport, PHONE_DESIGNS, NARROW_PX, PUSH_ACROSS_MIN, hasPhoneDesign, propsForWidth, drawnBlock, pushLayout, clampFitMin, fitFloorPx, phoneFitZoom, shrinksOnPhone, fitMoves, fitMovesAll, typedFrames, followsContent, keepsShape, shapeHeight, heightAlign, FIT_BY_WIDTH, FOLLOWS_CONTENT, STRETCHES, PUSH_GAP_MAX, PUSH_GAP_MIN, PUSH_SECTION_PAD, SIZE, SIZE_BY_FRAME, SIZE_TEXT, TYPE_SCALE, blockSize, drawnScale, sizeBounds, sizeRange, baseTextPx, FETCHES_CONTENT, mobileLoadingHeight } = await engineImport('push-model.js');

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

test('a block beside the grown one, in another column, keeps its place, and a pushed block pushes the blocks under its own width', () => {
  // A heading and a text on the left, a calendar on the right that grows: the text keeps its place.
  const out = pushLayout([at('heading', 0, 60, { x: 0, w: 45 }), at('cal', 0, 300, { x: 50, w: 45, grow: 120 }), at('text', 200, 80, { x: 0, w: 45 }), at('under', 320, 40, { x: 50, w: 45 })]);
  assert.equal(out.shifts.has('text'), false, 'beside the calendar');
  assert.equal(out.shifts.get('under'), 120, 'under the calendar');
  // A block under both columns moves with the calendar; the cascade reaches a block under it on the left.
  const wide = pushLayout([at('cal', 0, 300, { x: 50, w: 45, grow: 60 }), at('band', 320, 40, { x: 0, w: 100 }), at('left', 380, 40, { x: 0, w: 30 })]);
  assert.equal(wide.shifts.get('band'), 60);
  assert.equal(wide.shifts.get('left'), 60, 'pushed by the band, not by the calendar');
  // Frames that only touch, or share less than PUSH_ACROSS_MIN, stand side by side.
  assert.equal(pushLayout([at('a', 0, 100, { x: 0, w: 50, grow: 30 }), at('b', 120, 40, { x: 50, w: 50 })]).shifts.has('b'), false);
  assert.equal(pushLayout([at('a', 0, 100, { x: 0, w: 50, grow: 30 }), at('b', 120, 40, { x: 50 - PUSH_ACROSS_MIN / 2, w: 50 })]).shifts.has('b'), false);
  assert.equal(pushLayout([at('a', 0, 100, { x: 0, w: 50, grow: 30 }), at('b', 120, 40, { x: 49, w: 50 })]).shifts.get('b'), 30);
  // The page's pass reads the width as drawn, which a picture's width floor can make wider than its frame on a narrow canvas.
  const render = readFileSync(new URL('render.js', ENGINE_DIR), 'utf8');
  assert.match(render, /return across && el\.offsetWidth \? Math\.max\(frame\.w, \(el\.offsetWidth \/ across\) \* 100\) : frame\.w;/);
  assert.match(render, /it\.w = drawnWidth\(el, canvas, frame, across\);/, 'the pass, with the canvas read once');
  assert.match(render, /w: drawnWidth\(el, canvas, frame\)/, 'the drag\'s live pass');
  // The fit and the typing read the frames' widths the same way.
  const blocks = [{ id: 'cal', frames: { desktop: { x: 50, y: 0, w: 45, h: 300 } } }, { id: 'text', frames: { desktop: { x: 0, y: 200, w: 45, h: 80 } } }];
  assert.equal(fitMoves(blocks, 'cal', 420).size, 0);
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
  assert.deepEqual([...SIZE_BY_FRAME].sort(), ['icon', 'image', 'map', 'shape', 'spacer', 'video']);
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

test('phoneSized: the phone\'s own size in the size\'s place where it is one inside SIZE, else the block itself, and never on a frame-sized type', () => {
  const text = { type: 'text', size: 1.4, phoneSize: 0.8 };
  assert.deepEqual(phoneSized(text), { type: 'text', size: 0.8, phoneSize: 0.8 });
  assert.equal(drawnScale(phoneSized(text)), 0.8, 'the phone draws its own size');
  assert.equal(drawnScale(text), 1.4, 'the desktop keeps its own');
  const follows = { type: 'text', size: 1.4 };
  assert.equal(phoneSized(follows), follows, 'without a size of its own the phone follows the desktop');
  for (const phoneSize of [0.2, 3, 'big', null]) {
    const odd = { type: 'text', size: 1.2, phoneSize };
    assert.equal(phoneSized(odd), odd, `${phoneSize} is no size of the phone's own`);
  }
  const image = { type: 'image', phoneSize: 0.8 };
  assert.equal(phoneSized(image), image, 'a frame-sized type keeps its frame');
  // The text bounds stop the phone's size as they stop the desktop's.
  assert.equal(blockSize(phoneSized({ type: 'text', phoneSize: 0.5, sizeMin: 12 })), 0.75);
  assert.equal(phoneSized(undefined), undefined);
});

test('phoneFrame: a box of fixed height stands at the phone\'s own size, scaled against the desktop\'s; without one the frame itself', () => {
  const frame = { x: 10, y: 0, w: 30, h: 48 };
  assert.deepEqual(phoneFrame({ type: 'button', size: 1, phoneSize: 2, frames: { desktop: frame } }), { ...frame, h: 96 });
  assert.deepEqual(phoneFrame({ type: 'button', size: 1.6, phoneSize: 1, frames: { desktop: { ...frame, h: 80 } } }), { ...frame, h: 50 });
  assert.equal(phoneFrame({ type: 'button', size: 1.2, frames: { desktop: frame } }), frame);
  assert.equal(phoneFrame({ type: 'image', phoneSize: 0.5, frames: { desktop: frame } }), frame);
  assert.equal(phoneFrame({ type: 'button', phoneSize: 1, frames: { desktop: frame } }), frame, 'the same size keeps the frame');
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
  assert.equal(fitFloorPx(image, 1440), 346);
  // A section with a width of its own: the floor is the block's share of that width.
  assert.equal(fitFloorPx(image, 1000), 240);
  assert.equal(fitFloorPx({ ...image, fitMin: undefined }, 1440), 346);
  assert.equal(fitFloorPx({ ...image, fit: undefined }, 1440), 0);
  assert.equal(fitFloorPx({ ...image, type: 'text' }, 1440), 0);
  // A full-width site or section has no design width, and no floor.
  assert.equal(fitFloorPx(image, 0), 0);
  assert.equal(fitFloorPx(image, undefined), 0);
  assert.equal(fitFloorPx({ ...image, frames: {} }, 1440), 0);
});

test('the block types ADR-0025 names follow their content, and no other', () => {
  assert.deepEqual([...FOLLOWS_CONTENT].sort(), ['audio', 'calendar', 'cart', 'checkout', 'collection', 'contact', 'countdown', 'faq', 'form', 'privacy', 'product', 'quote', 'share', 'stats', 'table', 'timeline']);
  assert.equal(followsContent({ type: 'faq' }), true);
  for (const type of ['text', 'image', 'video', 'icon', 'shape', 'button', 'gallery', 'ribbon', 'map']) {
    assert.equal(followsContent({ type }), false, type);
  }
  assert.equal(followsContent(null), false);
  assert.equal(followsContent({ type: 'text', props: { design: 'questions' } }), true, 'a text drawn as questions follows its closed rows');
  assert.equal(followsContent({ type: 'text', props: { design: 'long' } }), false);
});

test('a video given a shape follows it: its height is its width over the shape', () => {
  assert.equal(keepsShape({ type: 'video', props: { aspect: '1:1' } }), true);
  assert.equal(followsContent({ type: 'video', props: { aspect: '9:16' } }), true);
  assert.equal(followsContent({ type: 'video', props: {} }), false, 'without a shape the video fills its frame');
  assert.equal(followsContent({ type: 'video', props: { aspect: '5:3' } }), false, 'a shape off the list is none');
  assert.equal(keepsShape({ type: 'image', props: { aspect: '1:1' } }), false, 'an image block with no picture keeps none');
  assert.equal(keepsShape({ type: 'image', props: { src: '/media/a.webp', aspect: '3:2' } }), true, 'an image block with a picture keeps its shape');
  assert.equal(keepsShape({ type: 'image', props: { src: '/media/a.webp', aspect: 'original' } }), true, 'or the picture\'s own');
  assert.equal(keepsShape({ type: 'video', props: { aspect: '3:2' } }), false, 'a video keeps only its own shapes');
  assert.equal(shapeHeight({ type: 'image', props: { src: '/media/a.webp', aspect: 'original' }, frames: { desktop: { w: 25 } } }, 1440), 0, 'the picture\'s own shape is measured by the preview');
  assert.equal(keepsShape(null), false);
  const square = { type: 'video', props: { aspect: '1:1' }, frames: { desktop: { w: 25 } } };
  assert.equal(shapeHeight(square, 1440), 360, 'a quarter of 1440 px, square');
  assert.equal(shapeHeight({ ...square, props: { aspect: '9:16' } }, 1440), 640);
  assert.equal(shapeHeight({ ...square, props: {} }, 1440), 0, 'no shape, no height from it');
  assert.equal(shapeHeight(square, 0), 0, 'a full-width section has no design width to measure by');
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

test('typedFrames: typing grows the text and moves the blocks below from where they stood before it', () => {
  const before = [blk('text', 0, 100), blk('near', 120, 40), blk('beside', 30, 40, 60)];
  const frames = typedFrames(before, 'text', 160);
  assert.equal(frames.get('text').h, 160);
  assert.equal(frames.get('near').y, 180);
  assert.equal(frames.get('beside').y, 30);
  assert.equal(before[0].frames.desktop.h, 100);
});

test('typedFrames: words deleted give the room back, never below the height before the typing', () => {
  const before = [blk('text', 0, 100), blk('near', 120, 40)];
  const grown = typedFrames(before, 'text', 200);
  assert.equal(grown.get('near').y, 220);
  const shrunk = typedFrames(before, 'text', 140);
  assert.equal(shrunk.get('text').h, 140);
  assert.equal(shrunk.get('near').y, 160);
  const back = typedFrames(before, 'text', 40);
  assert.deepEqual(back.get('text'), before[0].frames.desktop);
  assert.deepEqual(back.get('near'), before[1].frames.desktop);
  assert.notEqual(back.get('near'), before[1].frames.desktop);
});

test('typedFrames: a grown height is rounded up to the grid step, and words that fit keep the height before the typing', () => {
  const before = [blk('text', 0, 108), blk('near', 120, 40)];
  assert.equal(typedFrames(before, 'text', 106, 8).get('text').h, 108);
  assert.equal(typedFrames(before, 'text', 109, 8).get('text').h, 112);
  assert.equal(typedFrames(before, 'text', 109, 8).get('near').y, 124);
});

test('typedFrames: a block not in the section gives no frames', () => {
  assert.equal(typedFrames([blk('a', 0, 100)], 'missing', 300).size, 0);
  assert.equal(typedFrames([blk('a', 0, 100)], 'a', NaN).get('a').h, 100);
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

test('fitMovesAll: a block shown on phones only takes no room on the desktop, moves with the blocks above it and pushes none', () => {
  const blocks = [blk('a', 0, 100), { ...blk('p', 120, 300), hideDesktop: true }, blk('c', 140, 40)];
  const moves = fitMovesAll(blocks, new Map([['a', 160]]));
  assert.equal(moves.get('p'), 120 + 60, 'it keeps its place in the phone order');
  assert.equal(moves.get('c'), 140 + 60, 'the block under it moves by the growth alone, not past its 300 px');
  // Its own move passes on to nothing: a block beside the growth, under the phone-only block alone, stays.
  const wide = [{ id: 'a', frames: { desktop: { x: 0, w: 40, y: 0, h: 100 } } }, { id: 'p', hideDesktop: true, frames: { desktop: { x: 0, w: 100, y: 120, h: 40 } } }, { id: 'c', frames: { desktop: { x: 60, w: 40, y: 140, h: 40 } } }];
  const beside = fitMovesAll(wide, new Map([['a', 160]]));
  assert.equal(beside.get('p'), 180, 'the phone-only block under the growth moves with it');
  assert.equal(beside.has('c'), false, 'the block beside the growth stays');
});

test('fitMovesAll: a block drawn wider than its frame moves as the pass draws it, by the width given', () => {
  // A text at 50 to 90 % grows; under it a picture whose frame runs 0 to 40 %, drawn 0 to 70 % by its width floor on a narrow canvas.
  const blocks = [{ id: 'text', frames: { desktop: { x: 50, y: 0, w: 40, h: 100 } } }, { id: 'pic', frames: { desktop: { x: 0, y: 110, w: 40, h: 40 } } }];
  assert.equal(fitMovesAll(blocks, new Map([['text', 160]])).size, 0, 'by its frame it stands beside the text');
  assert.equal(fitMovesAll(blocks, new Map([['text', 160]]), new Map([['pic', 70]])).get('pic'), 170, 'as drawn it stands under it');
});

test('typedFrames: typing moves a block drawn wider than its frame as the pass draws it, by the width given', () => {
  const blocks = [{ id: 'text', frames: { desktop: { x: 50, y: 0, w: 40, h: 100 } } }, { id: 'pic', frames: { desktop: { x: 0, y: 110, w: 40, h: 40 } } }];
  assert.equal(typedFrames(blocks, 'text', 160).get('pic').y, 110, 'by its frame it stands beside the text');
  assert.equal(typedFrames(blocks, 'text', 160, 1, new Map([['pic', 70]])).get('pic').y, 170, 'as drawn it stands under it');
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
  assert.deepEqual([...FETCHES_CONTENT].sort(), ['calendar', 'collection', 'privacy', 'product']);
  for (const type of FETCHES_CONTENT) assert.ok(FOLLOWS_CONTENT.has(type), `${type} follows its content`);
  assert.equal(mobileLoadingHeight({ type: 'calendar', mobileHeight: 353 }), 353);
  assert.equal(mobileLoadingHeight({ type: 'collection', mobileHeight: 412.6 }), 413);
  assert.equal(mobileLoadingHeight({ type: 'calendar' }), 0);
  assert.equal(mobileLoadingHeight({ type: 'calendar', mobileHeight: -5 }), 0);
  assert.equal(mobileLoadingHeight({ type: 'calendar', mobileHeight: 'tall' }), 0);
  assert.equal(mobileLoadingHeight({ type: 'text', mobileHeight: 200 }), 0);
  assert.equal(mobileLoadingHeight(undefined), 0);
});

test('a phone design: drawn in its design\'s place while the block is narrow, and only where one is chosen', () => {
  assert.equal(NARROW_PX, 540);
  assert.deepEqual(Object.keys(PHONE_DESIGNS).sort(), ['collection', 'contact', 'gallery', 'privacy', 'stats', 'terms']);
  const props = { design: 'long', phoneDesign: 'questions', html: '<h2>A</h2>' };
  assert.equal(hasPhoneDesign('terms', props), true);
  assert.equal(hasPhoneDesign('text', props), false, 'a text block has no designs, so no phone design');
  assert.equal(hasPhoneDesign('terms', { design: 'long' }), false, 'none chosen');
  assert.equal(hasPhoneDesign('button', { style: 'primary', phoneDesign: 'secondary' }), false, 'a block without phone designs');
  assert.deepEqual(propsForWidth('terms', props, true), { ...props, design: 'questions' });
  assert.equal(propsForWidth('terms', props, false), props, 'a wide block keeps its own props');
  assert.deepEqual(propsForWidth('gallery', { view: 'mosaic', phoneDesign: 'slides' }, true), { view: 'slides', phoneDesign: 'slides' });
  assert.equal(propsForWidth('stats', { variant: 'band' }, true).variant, 'band', 'no phone design: the design itself');
  assert.equal(hasPhoneDesign('terms', { design: 'long', phoneDesign: 'nonsense' }), false, 'an id that is not one of the block\'s designs is no phone design');
  const terms = { type: 'terms', props: props };
  assert.equal(drawnBlock(terms, false), terms);
  assert.equal(drawnBlock(terms, true).props.design, 'questions', 'the layout rules read the design drawn');
  assert.equal(followsContent(drawnBlock(terms, true)), true, 'terms drawn as questions follow their closed rows');
});

test('phoneFitZoom: a block set to shrink keeps on the phone the lines it has at the design width, down to its floor', () => {
  // A text half the width of a 1200 px design is 600 px wide there; on a phone 351 px wide it is drawn at 351 / 600.
  const text = (extra = {}) => ({ type: 'text', fit: 'shrink', fitMin: 0.3, frames: { desktop: { w: 50 } }, ...extra });
  assert.equal(phoneFitZoom(text(), 351, 1200), 0.585);
  assert.equal(phoneFitZoom(text({ fitMin: 0.8 }), 351, 1200), 0.8, 'never under the floor');
  assert.equal(phoneFitZoom(text(), 700, 1200), 1, 'never above full size');
  assert.equal(phoneFitZoom(text({ fitMin: undefined }), 300, 1200), 0.6, 'the standard floor');
  assert.equal(phoneFitZoom(text({ fit: 'both' }), 351, 1200), 1, '«both» fits a design height the phone has not, so it wraps there');
  assert.equal(phoneFitZoom(text({ fit: undefined }), 351, 1200), 1, 'a block that wraps');
  assert.equal(phoneFitZoom({ ...text(), type: 'image' }, 351, 1200), 1, 'the types that shrink by their frame');
  assert.equal(phoneFitZoom(text(), 351, 0), 1, 'no design width to follow');
  assert.equal(phoneFitZoom(text({ frames: {} }), 351, 1200), 1, 'no desktop frame');
  assert.equal(phoneFitZoom(text(), 0, 1200), 1, 'not laid out yet');
  assert.equal(phoneFitZoom({ ...text(), type: 'calendar' }, 351, 1200), 1, 'the calendar draws its phone view');
});

test('shrinksOnPhone: «shrink» on a block whose content can wrap, but not on the frame-sized types or the calendar, and never «both»', () => {
  assert.equal(shrinksOnPhone({ type: 'text', fit: 'shrink' }), true);
  assert.equal(shrinksOnPhone({ type: 'collection', fit: 'shrink' }), true);
  for (const type of FIT_BY_WIDTH) assert.equal(shrinksOnPhone({ type, fit: 'shrink' }), false, type);
  assert.equal(shrinksOnPhone({ type: 'calendar', fit: 'shrink' }), false, 'its phone view stands in its place on a phone');
  assert.equal(shrinksOnPhone({ type: 'text', fit: 'both' }), false);
  assert.equal(shrinksOnPhone({ type: 'text' }), false);
  assert.equal(shrinksOnPhone(null), false);
});

test('PHONE_WORDS: a text\'s words, a quote\'s with its name and role, a statistic\'s label, an audio player\'s title and a countdown\'s words for the end; no list of words, and no statistic\'s number', () => {
  assert.deepEqual(PHONE_WORDS, { text: ['html'], quote: ['text', 'attribution', 'role'], stats: ['label'], audio: ['title'], countdown: ['doneText'] });
  for (const type of ['faq', 'timeline', 'table', 'ribbon', 'calendar']) assert.equal(PHONE_WORDS[type], undefined, type);
  assert.equal(PHONE_WORDS.stats.includes('value'), false, 'the number is the same fact on every screen');
});

test('the single words of the other blocks are the phone\'s own the same way a text\'s are', () => {
  const quote = { type: 'quote', props: { text: 'A long quote for the desktop', attribution: 'Kari', role: 'Leader', variant: 'large' } };
  const short = phoneWordsChange('quote', quote.props, null, { ...quote.props, text: 'Short' });
  assert.deepEqual(short, { text: 'Short' });
  assert.deepEqual(propsForViewport({ ...quote, phoneProps: short }, quote.props, 'mobile'), { ...quote.props, text: 'Short' });
  assert.equal(propsForViewport({ ...quote, phoneProps: short }, quote.props, 'desktop'), quote.props);
  const stats = { label: 'Members in the whole of Norway', value: '4800' };
  assert.deepEqual(phoneWordsChange('stats', stats, null, { ...stats, label: 'Members', value: '9' }), { label: 'Members' }, 'the number typed with it is never the phone\'s');
  assert.deepEqual(phoneWordsChange('audio', { title: 'Episode 1' }, null, { title: 'Ep. 1' }), { title: 'Ep. 1' });
  assert.equal(phoneWordsChange('countdown', { doneText: 'Started' }, { doneText: 'Go' }, { doneText: 'Started' }), null, 'written back to the desktop\'s words');
});

test('phoneWordsOf and propsForViewport: the phone draws its own words in the desktop\'s place, the desktop its props, and a key that holds no words is not drawn', () => {
  const block = { type: 'text', props: { html: '<p>Desktop</p>', align: 'left' }, phoneProps: { html: '<p>Phone</p>', align: 'right' } };
  assert.deepEqual(phoneWordsOf('text', block.phoneProps), { html: '<p>Phone</p>' });
  assert.deepEqual(phoneWordsOf('image', { html: 'x' }), {});
  assert.deepEqual(phoneWordsOf('text', null), {});
  assert.deepEqual(propsForViewport(block, block.props, 'mobile'), { html: '<p>Phone</p>', align: 'left' });
  assert.equal(propsForViewport(block, block.props, 'desktop'), block.props);
  const plain = { type: 'text', props: { html: '<p>Same</p>' } };
  assert.equal(propsForViewport(plain, plain.props, 'mobile'), plain.props, 'a block without phone words draws its props as they are');
});

test('phoneWordsChange: the typed words that differ from the desktop\'s, none where they are the same again', () => {
  const props = { html: '<p>Desktop</p>', align: 'left' };
  assert.deepEqual(phoneWordsChange('text', props, null, { ...props, html: '<p>Phone</p>' }), { html: '<p>Phone</p>' });
  assert.deepEqual(phoneWordsChange('text', props, { html: '<p>Phone</p>' }, { ...props, html: '<p>Phone, more</p>' }), { html: '<p>Phone, more</p>' });
  assert.equal(phoneWordsChange('text', props, { html: '<p>Phone</p>' }, { ...props, html: '<p>Desktop</p>' }), null, 'typed back to the desktop\'s words');
  assert.equal(phoneWordsChange('text', props, null, { ...props, align: 'right' }), null, 'a prop that holds no words is never the phone\'s');
  assert.equal(phoneWordsChange('image', { src: 'a' }, null, { src: 'b' }), null);
});

test('forcesReadable: «Force readable text» is on for each screen unless the section turns it off for that screen', () => {
  assert.equal(forcesReadable(null, 'mobile'), true);
  assert.equal(forcesReadable({ size: {} }, 'desktop'), true);
  assert.equal(forcesReadable({ size: { readablePhone: false } }, 'mobile'), false);
  assert.equal(forcesReadable({ size: { readablePhone: false } }, 'desktop'), true);
  assert.equal(forcesReadable({ size: { readableDesktop: false } }, 'desktop'), false);
  assert.equal(forcesReadable({ size: { readableDesktop: true } }, 'desktop'), true);
});

test('phoneHandoff: a section shows its phone layout under the window width where a block with words would stand narrower than the readable floor', () => {
  const words = (block) => block.type === 'text';
  const text = (w, extra = {}) => ({ id: `t${w}`, type: 'text', frames: { desktop: { x: 0, y: 0, w, h: 40 } }, ...extra });
  const site = { layout: { contentWidth: 1440, gutter: 6 }, breakpoints: { mobile: 640 } };
  assert.equal(READABLE_PX, 140);
  // A text at 21 % of the canvas: 140 px at a canvas of 666.7 px, a window of 757.6 px less 6 vw on each side.
  assert.equal(phoneHandoff({ blocks: [text(21)] }, site, words), 757);
  // The section takes its narrowest text's width; a picture never counts, nor a text hidden on the desktop.
  assert.equal(phoneHandoff({ blocks: [text(40), text(21), { id: 'p', type: 'image', frames: { desktop: { x: 0, y: 0, w: 5, h: 40 } } }, text(12, { hideDesktop: true })] }, site, words), 757);
  // Under the phone breakpoint the whole page is the phone's already.
  assert.equal(phoneHandoff({ blocks: [text(40)] }, site, words), 0);
  // «Force readable text» off on the desktop keeps the desktop layout.
  assert.equal(phoneHandoff({ size: { readableDesktop: false }, blocks: [text(21)] }, site, words), 0);
  // A text already under the floor at the design width is the owner's choice and does not count.
  assert.equal(phoneHandoff({ blocks: [text(9)] }, site, words), 0);
  // A section of its own px width is reckoned against it: 21 % of 800 px is 168 px, under the floor below a window of 757 px still; 15 % of it is 120 px and does not count.
  assert.equal(phoneHandoff({ size: { maxWidth: '800px' }, blocks: [text(21)] }, site, words), 757);
  assert.equal(phoneHandoff({ size: { maxWidth: '800px' }, blocks: [text(15)] }, site, words), 0);
  // A full-width section has no bound and is reckoned at the standard design width; a wider side margin moves the line out.
  assert.equal(phoneHandoff({ size: { maxWidth: 'full' }, blocks: [text(21)] }, site, words), 757);
  assert.equal(phoneHandoff({ blocks: [text(21)] }, { ...site, layout: { contentWidth: 1440, gutter: 12 } }, words), 877);
  // The site's own phone breakpoint, and the standard one without it.
  assert.equal(phoneHandoff({ blocks: [text(21)] }, { ...site, breakpoints: { mobile: 800 } }, words), 0);
  assert.equal(phoneHandoff({ blocks: [text(21)] }, {}, words), 757);
  // The design width is the canvas on a 1440 px screen (1267 px), as the editor and the design picker reckon a block: 10.5 % is 133 px there and does not count.
  assert.equal(phoneHandoff({ blocks: [text(10.5)] }, site, words), 0);
  // A text that shrinks keeps its lines down to its smallest scale: its floor is the readable floor at that scale; without a design size it wraps as any other.
  assert.equal(phoneHandoff({ blocks: [text(21, { fit: 'shrink', fitMin: 0.5 })] }, site, words), 0);
  assert.equal(phoneHandoff({ blocks: [text(21, { fit: 'shrink', fitMin: 0.9 })] }, site, words), 681);
  assert.equal(phoneHandoff({ blocks: [text(21, { fit: 'both' })] }, site, words), 0);
  assert.equal(phoneHandoff({ size: { maxWidth: 'full' }, blocks: [text(21, { fit: 'shrink', fitMin: 0.5 })] }, site, words), 757);
  // A scrollbar that takes room narrows the canvas by its width while the media query reads the window with it.
  assert.equal(phoneHandoff({ blocks: [text(21)] }, site, words, 15), 774);
  // A section width in another unit than px has no width to reckon with.
  assert.equal(phoneHandoff({ size: { maxWidth: '60rem' }, blocks: [text(21)] }, site, words), 0);
});

test('phoneHandoff: a side menu\'s column narrows the canvas, so the section turns at a wider window', async () => {
  const words = (block) => block.type === 'text';
  const text = (w) => ({ id: `t${w}`, type: 'text', frames: { desktop: { x: 0, y: 0, w, h: 40 } } });
  const site = { layout: { contentWidth: 1440, gutter: 6 }, breakpoints: { mobile: 640 } };
  assert.equal(phoneHandoff({ blocks: [text(21)] }, site, words), 757);
  // 140 px at 21 % is a canvas of 666.7 px, and with the column of 250 px a window of (666.7 + 250) / 0.88.
  assert.equal(phoneHandoff({ blocks: [text(21)] }, site, words, 0, 250), 1041);
  const { readFileSync } = await import('node:fs');
  const { ENGINE_DIR } = await import('./_engine.mjs');
  const render = readFileSync(new URL('render.js', ENGINE_DIR), 'utf8');
  assert.match(render, /phoneHandoff\(section, site, measuredText, opts\.gutter \?\? window\.innerWidth - document\.documentElement\.clientWidth, opts\.side \?\? sideColumn\(\)\)/);
  // A section that shows its phone layout on the desktop is edited in the phone view: «My templates» and a selection by id pass it by, as placing and pasting do.
  const edit = readFileSync(new URL('preview-edit.js', ENGINE_DIR), 'utf8');
  assert.match(edit, /const host = document\.querySelector\('\.urd-section-active:not\(\.urd-handoff\)'\) \?\? document\.querySelector\('\.urd-section:not\(\.urd-handoff\)'\);/);
  assert.match(edit, /document\.querySelector\(`\.urd-section:not\(\.urd-handoff\) \.urd-block\[data-block-id=/);
});

/** A top-level function of preview-edit.js as its own text, from `function name(` to its closing brace. */
function editFunction(name) {
  const edit = readFileSync(new URL('preview-edit.js', ENGINE_DIR), 'utf8');
  const start = edit.indexOf(`\nfunction ${name}(`) + 1;
  assert.ok(start > 0, `preview-edit.js has ${name}`);
  return edit.slice(start, edit.indexOf('\n}\n', start) + 2);
}

test('setMinHeight in the editing layer writes the section\'s height to its style and to the dataset copy the push pass restores', () => {
  const setMinHeight = new Function(`${editFunction('setMinHeight')}\nreturn setMinHeight;`)();
  const host = { style: {}, dataset: {} };
  setMinHeight(host, 612);
  assert.equal(host.style.minHeight, '612px');
  assert.equal(host.dataset.urdMinHeight, '612px', 'the copy the push pass reads back at each measurement (render.js)');
  const render = readFileSync(new URL('render.js', ENGINE_DIR), 'utf8');
  assert.match(render, /host\.style\.minHeight = host\.dataset\.urdMinHeight \?\? '';/, 'the pass restores the height from the copy');
});

test('settleFrames settles only growth, and never writes the section\'s own height', () => {
  // The DOM helpers stood in for: each block's drawn growth (a block sized by its frame) or its height at rest (one that follows its content).
  const growth = { grew: 40, still: 0 };
  const resting = { faq: 90, shorter: 30 };
  const synced = [];
  const helpers = {
    canvasOf: () => ({ querySelector: (sel) => ({ id: /data-block-id="([^"]+)"/.exec(sel)[1] }) }),
    CSS: { escape: (s) => s },
    followsContent,
    drawsAtContent: () => true,
    visitorHeights: (el) => ({ natural: resting[el.id] + 10, resting: resting[el.id] }),
    pushGrowthOf: (host, id) => growth[id] ?? 0,
    drawnWidth: (el, canvas, frame) => frame.w,
    fitMovesAll,
    syncSectionHeight: (host) => synced.push(host),
  };
  const settleFrames = new Function(...Object.keys(helpers), `${editFunction('settleFrames')}\nreturn settleFrames;`)(...Object.values(helpers));
  const frame = (y, h) => ({ desktop: { x: 0, y, w: 50, h } });
  const section = () => ({
    id: 'sec', size: { minHeight: '480px' },
    blocks: [
      { id: 'grew', type: 'text', frames: frame(0, 100) },
      { id: 'still', type: 'image', frames: frame(0, 100) },
      { id: 'faq', type: 'faq', frames: frame(120, 60) },
      { id: 'shorter', type: 'faq', frames: frame(300, 60) },
      { id: 'below', type: 'text', frames: frame(400, 40) },
    ],
  });
  const host = {};
  const s = section();
  const settle = settleFrames(host, s, ['grew', 'still', 'faq', 'shorter']);
  const h = (id) => s.blocks.find((b) => b.id === id).frames.desktop.h;
  assert.equal(h('grew'), 140, 'a block that grew past its frame takes the growth');
  assert.equal(h('faq'), 90, 'a block that follows its content takes its height at rest where it is taller');
  assert.equal(h('still'), 100, 'a block that did not grow keeps its frame');
  assert.equal(h('shorter'), 60, 'a block drawn shorter than its frame keeps it');
  assert.deepEqual(s.size, section().size, 'the section\'s own height is the owner\'s');
  assert.deepEqual(Object.keys(s).sort(), ['blocks', 'id', 'size']);
  assert.deepEqual(host, {}, 'nor the section element\'s');
  assert.ok(settle.ids.includes('grew') && settle.ids.includes('faq') && !settle.ids.includes('still') && !settle.ids.includes('shorter'));
  settle.undo();
  assert.deepEqual(s, section(), 'undo puts every frame back');
  assert.deepEqual(synced, [host, host], 'the drawn floor is read again from the frames, at the settle and at its undo');
  assert.equal(settleFrames(host, s, ['still', 'shorter']), null, 'nothing grew, nothing settled');
});
