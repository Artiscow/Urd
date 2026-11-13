/**
 * The phone's reading order (template/assets/engine/<version>/phone-order.js): the section's rule, Top, Left or Right first, and each block's exception before or after another block.
 * Frames are in physical units: x/w in percent of the content band, y/h in px.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { stackOrder, phoneOrderOf, phonePlaceStep, phonePlaceKeeping, hasPhonePlace, PHONE_ORDERS } = await engineImport('phone-order.js');

const blk = (id, y, x, extra = {}) => ({ id, ...extra, frames: { desktop: { x, y, w: extra.w ?? 10, h: extra.h ?? 10 }, mobile: extra.mobile ?? null } });
const ids = (order) => order.map((b) => b.id);

test('stackOrder: reading order by desktop y, then x', () => {
  assert.deepEqual(ids(stackOrder([blk('c', 100, 0), blk('a', 10, 50), blk('b', 10, 5)])), ['b', 'a', 'c']);
});

test('stackOrder: hideMobile blocks are left out', () => {
  assert.deepEqual(ids(stackOrder([blk('pynt', 0, 0, { hideMobile: true }), blk('tekst', 10, 0)])), ['tekst']);
});

test('stackOrder: decor does not filter (only animation meaning remains)', () => {
  assert.deepEqual(ids(stackOrder([blk('pynt', 0, 0, { decor: true }), blk('tekst', 10, 0)])), ['pynt', 'tekst']);
});

test('stackOrder: mobileOrder overrides the sort key', () => {
  assert.deepEqual(ids(stackOrder([blk('sist', 0, 0, { mobileOrder: 500 }), blk('først', 100, 0)])), ['først', 'sist']);
});

test('stackOrder: pinned blocks stay in the reading order', () => {
  assert.deepEqual(ids(stackOrder([blk('pinnet', 10, 0, { mobile: { x: 5, w: 50, row: 3, rows: 4 } }), blk('flyt', 50, 0)])), ['pinnet', 'flyt']);
});

test('stackOrder: does not mutate the original order', () => {
  const blocks = [blk('b', 20, 0), blk('a', 10, 0)];
  stackOrder(blocks, 'left');
  assert.deepEqual(ids(blocks), ['b', 'a']);
});

/** A heading, a text and a button on the left, a calendar beside them that starts at the heading's top, and a line under both. */
const section = () => [
  blk('heading', 256, 19, { w: 27, h: 80 }),
  blk('text', 336, 19, { w: 28, h: 80 }),
  blk('calendar', 256, 53, { w: 41, h: 336 }),
  blk('button', 445, 21, { w: 20, h: 32 }),
  blk('ribbon', 1200, 0, { w: 89, h: 70 }),
];

test('stackOrder: Top first reads the calendar between the heading and the text, as before', () => {
  assert.deepEqual(ids(stackOrder(section(), 'top')), ['heading', 'calendar', 'text', 'button', 'ribbon']);
});

test('stackOrder: Left first reads the left column whole, then the right, band by band', () => {
  assert.deepEqual(ids(stackOrder(section(), 'left')), ['heading', 'text', 'button', 'calendar', 'ribbon']);
});

test('stackOrder: Right first starts with the right column', () => {
  assert.deepEqual(ids(stackOrder(section(), 'right')), ['calendar', 'heading', 'text', 'button', 'ribbon']);
});

test('stackOrder: cards of separate blocks stay whole with Left first, each card a column', () => {
  const cards = [];
  for (const [n, x] of [[1, 6], [2, 37], [3, 69]]) {
    cards.push(blk(`icon${n}`, 140, x, { w: 25, h: 72 }), blk(`text${n}`, 220, x, { w: 25, h: 160 }));
  }
  assert.deepEqual(ids(stackOrder(cards, 'top')), ['icon1', 'icon2', 'icon3', 'text1', 'text2', 'text3']);
  assert.deepEqual(ids(stackOrder(cards, 'left')), ['icon1', 'text1', 'icon2', 'text2', 'icon3', 'text3']);
  assert.deepEqual(ids(stackOrder(cards, 'right')), ['icon3', 'text3', 'icon2', 'text2', 'icon1', 'text1']);
});

test('stackOrder: a heading across the columns stands as a band of its own, before the columns under it', () => {
  const blocks = [blk('title', 0, 0, { w: 100, h: 40 }), blk('l1', 60, 0, { w: 45, h: 50 }), blk('r1', 60, 55, { w: 45, h: 50 }), blk('l2', 120, 0, { w: 45, h: 50 }), blk('r2', 120, 55, { w: 45, h: 50 })];
  assert.deepEqual(ids(stackOrder(blocks, 'left')), ['title', 'l1', 'l2', 'r1', 'r2']);
  assert.deepEqual(ids(stackOrder(blocks, 'right')), ['title', 'r1', 'r2', 'l1', 'l2']);
});

test('stackOrder: a block across two columns joins them into one', () => {
  const blocks = [blk('left', 0, 0, { w: 40, h: 100 }), blk('right', 0, 60, { w: 40, h: 100 }), blk('wide', 50, 20, { w: 60, h: 30 })];
  assert.deepEqual(ids(stackOrder(blocks, 'left')), ['left', 'right', 'wide']);
});

test('stackOrder: an exception puts a block before or after another, wherever the rule puts that one', () => {
  const after = section().map((b) => (b.id === 'button' ? { ...b, phonePlace: { after: 'calendar' } } : b));
  assert.deepEqual(ids(stackOrder(after, 'left')), ['heading', 'text', 'calendar', 'button', 'ribbon']);
  assert.deepEqual(ids(stackOrder(after, 'top')), ['heading', 'calendar', 'button', 'text', 'ribbon']);
  const before = section().map((b) => (b.id === 'ribbon' ? { ...b, phonePlace: { before: 'heading' } } : b));
  assert.deepEqual(ids(stackOrder(before, 'left')), ['ribbon', 'heading', 'text', 'button', 'calendar']);
});

test('stackOrder: blocks placed against one block keep the rule\'s order, and a block follows one placed itself', () => {
  const blocks = [blk('a', 0, 0), blk('b', 20, 0, { phonePlace: { after: 'd' } }), blk('c', 40, 0, { phonePlace: { after: 'd' } }), blk('d', 60, 0), blk('e', 80, 0, { phonePlace: { after: 'b' } })];
  assert.deepEqual(ids(stackOrder(blocks)), ['a', 'd', 'b', 'e', 'c']);
  const twoBefore = [blk('a', 0, 0), blk('b', 20, 0), blk('c', 40, 0, { phonePlace: { before: 'a' } }), blk('d', 60, 0, { phonePlace: { before: 'a' } })];
  assert.deepEqual(ids(stackOrder(twoBefore)), ['c', 'd', 'a', 'b']);
});

test('stackOrder: an exception naming a block that is gone, hidden on phones or itself, or a ring of exceptions, keeps the rule\'s place', () => {
  const gone = [blk('a', 0, 0, { phonePlace: { after: 'nobody' } }), blk('b', 20, 0)];
  assert.deepEqual(ids(stackOrder(gone)), ['a', 'b']);
  const hidden = [blk('a', 0, 0, { phonePlace: { after: 'h' } }), blk('b', 20, 0), blk('h', 40, 0, { hideMobile: true })];
  assert.deepEqual(ids(stackOrder(hidden)), ['a', 'b']);
  const self = [blk('a', 0, 0, { phonePlace: { before: 'a' } }), blk('b', 20, 0)];
  assert.deepEqual(ids(stackOrder(self)), ['a', 'b']);
  const ring = [blk('a', 0, 0), blk('b', 20, 0, { phonePlace: { after: 'c' } }), blk('c', 40, 0, { phonePlace: { after: 'b' } }), blk('d', 60, 0)];
  assert.deepEqual(ids(stackOrder(ring)), ['a', 'b', 'c', 'd']);
});

/** The order after a block takes the step's exception. */
const stepped = (blocks, rule, id, dir) => {
  const place = phonePlaceStep(blocks, rule, id, dir);
  return place && ids(stackOrder(blocks.map((b) => (b.id === id ? { ...b, phonePlace: place } : b)), rule));
};

test('phonePlaceStep: each press moves the block exactly one place, before the block before it or after the block after it', () => {
  const blocks = [blk('a', 0, 0), blk('b', 20, 0), blk('c', 40, 0), blk('d', 60, 0)];
  assert.deepEqual(phonePlaceStep(blocks, 'top', 'c', -1), { before: 'b' });
  assert.deepEqual(phonePlaceStep(blocks, 'top', 'a', 1), { after: 'b' });
  assert.deepEqual(stepped(blocks, 'top', 'a', 1), ['b', 'a', 'c', 'd']);
  assert.deepEqual(stepped(blocks, 'top', 'c', -1), ['a', 'c', 'b', 'd']);
  assert.equal(phonePlaceStep(blocks, 'top', 'a', -1), null, 'the first cannot go earlier');
  assert.equal(phonePlaceStep(blocks, 'top', 'd', 1), null, 'the last cannot go later');
});

test('phonePlaceStep: a block placed against the one that moves goes with it, and the others keep their order', () => {
  // y follows x: x and y move down past b together.
  const follower = [blk('a', 0, 0), blk('x', 20, 0), blk('y', 40, 0, { phonePlace: { after: 'x' } }), blk('b', 60, 0), blk('c', 80, 0)];
  assert.deepEqual(stepped(follower, 'top', 'x', 1), ['a', 'b', 'x', 'y', 'c']);
  // x and y both stand before b, x first: x can pass y.
  const shared = [blk('a', 0, 0), blk('x', 20, 0, { phonePlace: { before: 'b' } }), blk('y', 40, 0, { phonePlace: { before: 'b' } }), blk('b', 60, 0)];
  assert.deepEqual(ids(stackOrder(shared)), ['a', 'x', 'y', 'b']);
  assert.deepEqual(stepped(shared, 'top', 'x', 1), ['a', 'y', 'x', 'b']);
  // y stands before x: x and y move up past a together, and y is never x's anchor, so no ring sends either back.
  const before = [blk('a', 0, 0), blk('x', 20, 0), blk('y', 40, 0, { phonePlace: { before: 'x' } }), blk('b', 60, 0)];
  assert.deepEqual(ids(stackOrder(before)), ['a', 'y', 'x', 'b']);
  assert.deepEqual(stepped(before, 'top', 'x', -1), ['y', 'x', 'a', 'b']);
});

test('phonePlaceStep: follows the section\'s rule, and blocks placed by hand take no part', () => {
  assert.deepEqual(stepped(section(), 'left', 'button', 1), ['heading', 'text', 'calendar', 'button', 'ribbon']);
  const blocks = [blk('a', 0, 0), blk('pin', 20, 0, { mobile: { row: 3, rows: 4 } }), blk('b', 40, 0)];
  assert.deepEqual(phonePlaceStep(blocks, 'top', 'a', 1), { after: 'b' }, 'the pinned block is passed over');
  assert.equal(phonePlaceStep(blocks, 'top', 'pin', 1), null);
});

test('phonePlaceKeeping: before or after the block beside it, so nothing moves, and the nearest that keeps the others\' order where none can', () => {
  const blocks = [blk('a', 0, 0), blk('b', 20, 0), blk('c', 40, 0)];
  assert.deepEqual(phonePlaceKeeping(blocks, 'top', 'b', 'before'), { before: 'c' });
  assert.deepEqual(phonePlaceKeeping(blocks, 'top', 'b', 'after'), { after: 'a' });
  // The last has no block after it: before the block before it, which moves it one place and keeps the others.
  assert.deepEqual(phonePlaceKeeping(blocks, 'top', 'c', 'before'), { before: 'b' });
  // A block placed against this one is never its anchor, which would make a ring.
  const follower = [blk('a', 0, 0), blk('x', 20, 0), blk('y', 40, 0, { phonePlace: { after: 'x' } }), blk('b', 60, 0)];
  assert.deepEqual(phonePlaceKeeping(follower, 'top', 'x', 'before'), { before: 'b' });
});

test('stackOrder: Left first keeps two rows of cards and a zig-zag as rows, and a block shown on phones only shapes no column', () => {
  const cards = [];
  for (const [row, y] of [[1, 0], [2, 300]]) {
    for (const [col, x] of [[1, 0], [2, 50]]) cards.push(blk(`icon${row}${col}`, y, x, { w: 40, h: 60 }), blk(`text${row}${col}`, y + 70, x, { w: 40, h: 120 }));
  }
  assert.deepEqual(ids(stackOrder(cards, 'left')), ['icon11', 'text11', 'icon12', 'text12', 'icon21', 'text21', 'icon22', 'text22']);
  const zigzag = [blk('text1', 0, 0, { w: 45, h: 200 }), blk('pic1', 0, 55, { w: 45, h: 200 }), blk('pic2', 260, 0, { w: 45, h: 200 }), blk('text2', 260, 55, { w: 45, h: 200 })];
  assert.deepEqual(ids(stackOrder(zigzag, 'left')), ['text1', 'pic1', 'pic2', 'text2']);
  assert.deepEqual(ids(stackOrder(zigzag, 'right')), ['pic1', 'text1', 'text2', 'pic2']);
  const phoneOnly = [blk('only', 0, 0, { w: 100, h: 40, hideDesktop: true }), blk('a', 0, 0, { w: 40, h: 100 }), blk('b', 0, 60, { w: 40, h: 100 })];
  assert.deepEqual(ids(stackOrder(phoneOnly, 'right')), ['only', 'b', 'a'], 'at the top, before the columns it shares its top with');
});

test('phoneOrderOf and hasPhonePlace: the rule a section has, and whether an exception holds', () => {
  assert.deepEqual(PHONE_ORDERS, ['top', 'left', 'right']);
  assert.equal(phoneOrderOf({ phoneOrder: 'left' }), 'left');
  assert.equal(phoneOrderOf({ phoneOrder: 'diagonal' }), 'top');
  assert.equal(phoneOrderOf(null), 'top');
  const blocks = [blk('a', 0, 0, { phonePlace: { after: 'b' } }), blk('b', 20, 0), blk('c', 40, 0, { phonePlace: { after: 'x' } })];
  assert.equal(hasPhonePlace(blocks[0], blocks), true);
  assert.equal(hasPhonePlace(blocks[1], blocks), false);
  assert.equal(hasPhonePlace(blocks[2], blocks), false, 'a block that is gone');
  const ring = [blk('a', 0, 0, { phonePlace: { after: 'b' } }), blk('b', 20, 0, { phonePlace: { after: 'a' } })];
  assert.equal(hasPhonePlace(ring[0], ring), false, 'a ring holds no exception');
});
