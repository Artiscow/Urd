/**
 * The phone's reading order (template/assets/engine/<version>/phone-order.js): the section's rule, Top, Left or Right first, each block's exception before or after another block, its stacks and its custom order.
 * And the owner's moves in it (phone-moves.js): the tree of blocks and stacks, the list's drag and the arrows.
 * Frames are in physical units: x/w in percent of the content band, y/h in px.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { stackOrder, phoneOrderOf, phoneSetupOf, PHONE_ORDERS } = await engineImport('phone-order.js');
const { phoneStep, phoneLand, phoneTree, phonePlaceKeeping, hasPhonePlace, phoneStackOf, phoneDropAt, phoneDropChange } = await engineImport('phone-moves.js');

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

/** A section's blocks and setup with a move's change written in, as the editor writes it. */
function applied(blocks, setup, change) {
  const next = blocks.map((b) => {
    if (!(b.id in change.places)) return b;
    const copy = { ...b };
    if (change.places[b.id]) copy.phonePlace = change.places[b.id]; else delete copy.phonePlace;
    return copy;
  });
  const rule = typeof setup === 'string' ? setup : setup.rule;
  const base = typeof setup === 'string' ? { rule, list: null, stacks: [] } : setup;
  return { blocks: next, setup: { ...base, ...(change.stacks ? { stacks: change.stacks } : {}), ...(change.list ? { list: change.list } : {}) } };
}

/** The order after a move's change. */
const after = (blocks, setup, change) => {
  if (!change) return null;
  const next = applied(blocks, setup, change);
  return ids(stackOrder(next.blocks, next.setup));
};

/** The order after a block steps one place. */
const stepped = (blocks, setup, id, dir) => after(blocks, setup, phoneStep(blocks, setup, id, dir));

test('phoneStep: each press moves the block exactly one place, before the block it passes up or after the one it passes down', () => {
  const blocks = [blk('a', 0, 0), blk('b', 20, 0), blk('c', 40, 0), blk('d', 60, 0)];
  assert.deepEqual(phoneStep(blocks, 'top', 'c', -1).places, { c: { before: 'b' } });
  assert.deepEqual(phoneStep(blocks, 'top', 'a', 1).places, { a: { after: 'b' } });
  assert.deepEqual(stepped(blocks, 'top', 'a', 1), ['b', 'a', 'c', 'd']);
  assert.deepEqual(stepped(blocks, 'top', 'c', -1), ['a', 'c', 'b', 'd']);
  assert.equal(phoneStep(blocks, 'top', 'a', -1), null, 'the first cannot go earlier');
  assert.equal(phoneStep(blocks, 'top', 'd', 1), null, 'the last cannot go later');
});

test('phoneStep: a block placed against the one that moves goes with it, and the others keep their order', () => {
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

test('settle: a block placed against the moved one lets go of it where the move puts it on the other side, by a drop, a row of the list or the arrows', () => {
  // y stands after x by its exception: x moved past y, the last, stands after y, and y loses its exception.
  const blocks = [blk('a', 0, 0), blk('y', 20, 0, { phonePlace: { after: 'x' } }), blk('x', 40, 0)];
  assert.deepEqual(ids(stackOrder(blocks)), ['a', 'x', 'y']);
  const drop = phoneDropChange(blocks, 'top', 'x', { pos: 'after', of: 'y' });
  assert.deepEqual(drop.places, { y: null });
  assert.deepEqual(after(blocks, 'top', drop), ['a', 'y', 'x']);
  assert.deepEqual(after(blocks, 'top', phoneLand(blocks, 'top', '1', { key: '2', pos: 'after' })), ['a', 'y', 'x']);
  assert.deepEqual(stepped(blocks, 'top', 'x', 1), ['a', 'y', 'x'], 'the arrow steps past the block that follows it where nothing else stands beyond');
  // With a block beyond, the arrow takes the follower along.
  assert.deepEqual(stepped([...blocks, blk('b', 60, 0)], 'top', 'x', 1), ['a', 'b', 'x', 'y']);
  // y stands before x: x moved up past it.
  const ahead = [blk('y', 0, 0, { phonePlace: { before: 'x' } }), blk('x', 20, 0), blk('b', 40, 0)];
  assert.deepEqual(stepped(ahead, 'top', 'x', -1), ['x', 'y', 'b']);
});

test('phoneStep: follows the section\'s rule, and blocks placed by hand take no part', () => {
  assert.deepEqual(stepped(section(), 'left', 'button', 1), ['heading', 'text', 'calendar', 'button', 'ribbon']);
  const blocks = [blk('a', 0, 0), blk('pin', 20, 0, { mobile: { row: 3, rows: 4 } }), blk('b', 40, 0)];
  assert.deepEqual(phoneStep(blocks, 'top', 'a', 1).places, { a: { after: 'b' } }, 'the pinned block is passed over');
  assert.equal(phoneStep(blocks, 'top', 'pin', 1), null);
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

/** Three blocks and a card of three under them. */
const cardSection = () => [
  blk('title', 0, 0, { w: 100, h: 40 }),
  blk('pic', 60, 0, { w: 45, h: 200 }),
  blk('icon', 60, 55, { w: 45, h: 30 }),
  blk('head', 100, 55, { w: 45, h: 30 }),
  blk('line', 140, 55, { w: 45, h: 60 }),
  blk('foot', 300, 0, { w: 100, h: 40 }),
];

test('phoneSetupOf: a section\'s rule, custom order and stacks, the stacks of two blocks or more', () => {
  assert.deepEqual(phoneSetupOf({ phoneOrder: 'right', phoneList: ['a', 3, 'b'], phoneStacks: [['a', 'b'], ['c'], 'x'] }), { rule: 'right', list: ['a', 'b'], stacks: [['a', 'b']] });
  assert.deepEqual(phoneSetupOf({}), { rule: 'top', list: null, stacks: [] });
});

test('stackOrder: a stack reads as one where the first of it stands, its first block\'s exception moving it whole', () => {
  const blocks = [blk('a', 0, 0), blk('b', 20, 0), blk('c', 40, 0), blk('d', 60, 0)];
  assert.deepEqual(ids(stackOrder(blocks, { rule: 'top', stacks: [['d', 'b']] })), ['a', 'd', 'b', 'c'], 'at b, the first in the rule\'s order, in the stack\'s order');
  const placed = blocks.map((b) => (b.id === 'd' ? { ...b, phonePlace: { after: 'c' } } : b));
  assert.deepEqual(ids(stackOrder(placed, { rule: 'top', stacks: [['d', 'b']] })), ['a', 'c', 'd', 'b']);
  const member = blocks.map((b) => (b.id === 'b' ? { ...b, phonePlace: { before: 'a' } } : b));
  assert.deepEqual(ids(stackOrder(member, { rule: 'top', stacks: [['d', 'b']] })), ['a', 'd', 'b', 'c'], 'a member\'s own exception counts for nothing');
  const against = blocks.map((b) => (b.id === 'a' ? { ...b, phonePlace: { after: 'b' } } : b));
  assert.deepEqual(ids(stackOrder(against, { rule: 'top', stacks: [['d', 'b']] })), ['d', 'b', 'a', 'c'], 'an exception against a member is against the stack');
  assert.deepEqual(ids(stackOrder(blocks, { rule: 'top', stacks: [['a', 'b'], ['b', 'c'], ['x', 'd']] })), ['a', 'b', 'c', 'd'], 'a block in two stacks belongs to the first; a stack of one holds nothing');
});

test('stackOrder: a custom order holds as listed, and a block missing from it joins after the block before it', () => {
  const blocks = [blk('a', 0, 0), blk('b', 20, 0), blk('c', 40, 0), blk('d', 60, 0)];
  assert.deepEqual(ids(stackOrder(blocks, { rule: 'top', list: ['c', 'a', 'd', 'b'] })), ['c', 'a', 'd', 'b']);
  const moved = blocks.map((b) => (b.id === 'c' ? { ...b, frames: { ...b.frames, desktop: { ...b.frames.desktop, y: 200 } } } : b));
  assert.deepEqual(ids(stackOrder(moved, { rule: 'top', list: ['c', 'a', 'd', 'b'] })), ['c', 'a', 'd', 'b'], 'a block moved on the desktop keeps its place');
  const added = [...blocks, blk('new', 30, 0)];
  assert.deepEqual(ids(stackOrder(added, { rule: 'top', list: ['c', 'a', 'd', 'b', 'gone'] })), ['c', 'a', 'd', 'b', 'new'], 'after b, the block before it in the rule\'s order');
  const placed = blocks.map((b) => (b.id === 'a' ? { ...b, phonePlace: { after: 'd' } } : b));
  assert.equal(hasPhonePlace(placed[0], placed, { rule: 'top', list: ['a', 'b', 'c', 'd'] }), false, 'no exception counts in a custom order');
});

test('phoneTree: the flowing blocks as rows, the owner\'s stacks and the rule\'s columns as stacks', () => {
  assert.deepEqual(phoneTree(cardSection(), 'left'), [
    { id: 'title' }, { id: 'pic' },
    { id: 'stack:icon', kind: 'column', children: [{ id: 'icon' }, { id: 'head' }, { id: 'line' }] },
    { id: 'foot' },
  ]);
  assert.deepEqual(phoneTree(cardSection(), 'top').map((n) => n.id), ['title', 'pic', 'icon', 'head', 'line', 'foot'], 'Top first finds no columns');
  assert.deepEqual(phoneTree(cardSection(), { rule: 'top', stacks: [['foot', 'title']] })[0], { id: 'stack:foot', kind: 'stack', children: [{ id: 'foot' }, { id: 'title' }] });
});

test('phoneLand: a row dragged between others takes the exception that puts it there', () => {
  const blocks = [blk('a', 0, 0), blk('b', 20, 0), blk('c', 40, 0), blk('d', 60, 0)];
  const change = phoneLand(blocks, 'top', '3', { key: '1', pos: 'before' });
  assert.deepEqual(after(blocks, 'top', change), ['a', 'd', 'b', 'c']);
  assert.equal(change.stacks, undefined, 'no stack changes');
  assert.equal(phoneLand(blocks, 'top', '9', { key: '1', pos: 'before' }), null);
});

test('phoneLand: a column of the rule dragged whole becomes the owner\'s stack and moves as one', () => {
  const change = phoneLand(cardSection(), 'left', '2', { key: '0', pos: 'after' });
  assert.deepEqual(change.stacks, [['icon', 'head', 'line']]);
  assert.deepEqual(after(cardSection(), 'left', change), ['title', 'icon', 'head', 'line', 'pic', 'foot']);
  // A block dragged onto another makes a stack of the two; one dragged out of a stack leaves it.
  const into = phoneLand(cardSection(), 'top', '5', { key: '0', pos: 'into' });
  assert.deepEqual(into.stacks, [['title', 'foot']]);
  assert.deepEqual(after(cardSection(), 'top', into), ['title', 'foot', 'pic', 'icon', 'head', 'line']);
  const stacked = applied(cardSection(), 'top', into);
  const out = phoneLand(stacked.blocks, stacked.setup, '0.1', { key: '4', pos: 'after' });
  assert.deepEqual(out.stacks, []);
  assert.deepEqual(after(stacked.blocks, stacked.setup, out), ['title', 'pic', 'icon', 'head', 'line', 'foot']);
  // A stack's first block dropped right after its own stack leaves it.
  const own = phoneLand(cardSection(), { rule: 'top', stacks: [['pic', 'icon', 'head']] }, '1.0', { key: '1', pos: 'after' });
  assert.deepEqual(own.stacks, [['icon', 'head']]);
  assert.deepEqual(after(cardSection(), { rule: 'top', list: null, stacks: [['pic', 'icon', 'head']] }, own), ['title', 'icon', 'head', 'pic', 'line', 'foot']);
  const between = phoneLand(stacked.blocks, stacked.setup, '0.1', { key: '3', pos: 'before' });
  assert.deepEqual(after(stacked.blocks, stacked.setup, between), ['title', 'pic', 'icon', 'foot', 'head', 'line']);
});

test('phoneLand: a block taken into a stack leaves its exception, and a new first block carries the stack\'s', () => {
  const blocks = [blk('a', 0, 0), blk('b', 20, 0, { phonePlace: { after: 'd' } }), blk('c', 40, 0), blk('d', 60, 0)];
  // The order is a, c, d, b; b dragged onto c makes the stack c, b, standing where b, the first of it in the rule's order, stands.
  const into = phoneLand(blocks, 'top', '3', { key: '1', pos: 'into' });
  assert.deepEqual(into.stacks, [['c', 'b']]);
  assert.deepEqual(into.places, { b: null });
  assert.deepEqual(after(blocks, 'top', into), ['a', 'c', 'b', 'd']);
  // The stack a, c placed after d reads b, d, a, c; c dragged before a takes the stack's place with it.
  const placed = [blk('a', 0, 0, { phonePlace: { after: 'd' } }), blk('b', 20, 0), blk('c', 40, 0), blk('d', 60, 0)];
  const setup = { rule: 'top', list: null, stacks: [['a', 'c']] };
  assert.deepEqual(ids(stackOrder(placed, setup)), ['b', 'd', 'a', 'c']);
  const first = phoneLand(placed, setup, '2.1', { key: '2.0', pos: 'before' });
  assert.deepEqual(first.stacks, [['c', 'a']]);
  assert.deepEqual(first.places, { a: null, c: { after: 'd' } });
  assert.deepEqual(after(placed, setup, first), ['b', 'd', 'c', 'a']);
});

test('phoneLand and phoneStep in a custom order write the list, and the arrows move a stacked block within its stack', () => {
  const blocks = [blk('a', 0, 0), blk('b', 20, 0), blk('c', 40, 0), blk('d', 60, 0)];
  const setup = { rule: 'top', list: ['a', 'b', 'c', 'd'], stacks: [] };
  const land = phoneLand(blocks, setup, '0', { key: '3', pos: 'after' });
  assert.deepEqual(land.list, ['b', 'c', 'd', 'a']);
  assert.deepEqual(land.places, {});
  assert.deepEqual(phoneStep(blocks, setup, 'c', -1).list, ['a', 'c', 'b', 'd']);
  const stacked = { rule: 'top', list: null, stacks: [['b', 'c']] };
  assert.deepEqual(phoneStep(blocks, stacked, 'c', -1).stacks, [['c', 'b']]);
  assert.equal(phoneStep(blocks, stacked, 'c', 1), null, 'the last in its stack');
  assert.deepEqual(stepped(blocks, stacked, 'b', 1), ['a', 'c', 'b', 'd'], 'the first in its stack steps within it');
  assert.deepEqual(stepped(blocks, stacked, 'a', 1), ['b', 'c', 'a', 'd'], 'a block steps past a whole stack');
  assert.deepEqual(phoneStackOf(blocks, stacked, 'c'), ['b', 'c']);
  assert.equal(phoneStackOf(blocks, stacked, 'a'), null);
});

test('settle: what is left of a stack the moved block left keeps its place', () => {
  const blocks = [blk('a', 0, 0), blk('b', 20, 0), blk('c', 40, 0), blk('d', 60, 0)];
  const setup = { rule: 'top', list: null, stacks: [['a', 'c']] };
  assert.deepEqual(ids(stackOrder(blocks, setup)), ['a', 'c', 'b', 'd']);
  // The first block taken out before its own stack: the order stays, and the stack is gone.
  const out = phoneLand(blocks, setup, '0.0', { key: '0', pos: 'before' });
  assert.deepEqual(out.stacks, []);
  assert.deepEqual(after(blocks, setup, out), ['a', 'c', 'b', 'd']);
  // The first block taken out to the end: c keeps the stack's place.
  assert.deepEqual(after(blocks, setup, phoneLand(blocks, setup, '0.0', { key: '2', pos: 'after' })), ['c', 'b', 'd', 'a']);
  // A stack standing where its later block stands: the block that stays holds the place when the other leaves.
  const moved = { rule: 'top', list: null, stacks: [['d', 'b']] };
  assert.deepEqual(ids(stackOrder(blocks, moved)), ['a', 'd', 'b', 'c']);
  assert.deepEqual(after(blocks, moved, phoneLand(blocks, moved, '1.1', { key: '2', pos: 'after' })), ['a', 'd', 'c', 'b']);
});

test('settle: a stack keeps its blocks hidden on phones through a move, and a move that changes nothing writes nothing', () => {
  const blocks = [blk('a', 0, 0), blk('b', 20, 0), blk('c', 30, 0, { hideMobile: true }), blk('d', 40, 0), blk('e', 60, 0)];
  const setup = { rule: 'top', list: null, stacks: [['b', 'c', 'd']] };
  const step = phoneStep(blocks, setup, 'e', -1);
  assert.equal(step.stacks, undefined, 'the stack stands as it was');
  assert.deepEqual(after(blocks, setup, step), ['a', 'e', 'b', 'd']);
  const outOf = phoneLand(blocks, setup, '1.0', { key: '2', pos: 'after' });
  assert.deepEqual(outOf.stacks, [['c', 'd']], 'the hidden block stays with the block that stayed');
  // f and g are placed before a and go where a goes: a dragged before f cannot get there, and nothing is written.
  const following = [blk('a', 0, 0), blk('b', 10, 0), blk('f', 20, 0, { phonePlace: { before: 'a' } }), blk('g', 30, 0, { phonePlace: { before: 'a' } })];
  assert.deepEqual(ids(stackOrder(following)), ['f', 'g', 'a', 'b']);
  assert.equal(phoneLand(following, 'top', '2', { key: '0', pos: 'before' }), null);
});

test('phoneStep: a stack\'s later block has no exception that counts, so nothing follows through it', () => {
  const blocks = [blk('a', 0, 0), blk('x', 10, 0), blk('b', 20, 0), blk('c', 30, 0, { phonePlace: { after: 'x' } }), blk('d', 40, 0)];
  const setup = { rule: 'top', list: null, stacks: [['b', 'c']] };
  assert.deepEqual(ids(stackOrder(blocks, setup)), ['a', 'x', 'b', 'c', 'd']);
  assert.deepEqual(stepped(blocks, setup, 'x', 1), ['a', 'b', 'c', 'x', 'd']);
});

test('phoneDropAt: over a unit its top and bottom quarters land before and after it, its thirds beside it or into it; off every unit the nearest', () => {
  const boxes = [{ id: 'a', left: 0, top: 0, right: 300, bottom: 100 }, { id: 'b', left: 0, top: 120, right: 300, bottom: 220 }];
  assert.deepEqual(phoneDropAt(boxes, 150, 10), { pos: 'before', of: 'a', at: 0 });
  assert.deepEqual(phoneDropAt(boxes, 150, 95), { pos: 'after', of: 'a', at: 100 });
  assert.deepEqual(phoneDropAt(boxes, 40, 50), { pos: 'left', of: 'a' });
  assert.deepEqual(phoneDropAt(boxes, 260, 50), { pos: 'right', of: 'a' });
  assert.deepEqual(phoneDropAt(boxes, 150, 50), { pos: 'into', of: 'a' });
  assert.deepEqual(phoneDropAt(boxes, 150, 110), { pos: 'after', of: 'a', at: 100 }, 'the gap: the nearest unit, below it');
  assert.deepEqual(phoneDropAt(boxes, 150, 400), { pos: 'after', of: 'b', at: 220 });
  assert.deepEqual(phoneDropAt(boxes, 150, -20), { pos: 'before', of: 'a', at: 0 });
  assert.equal(phoneDropAt([], 0, 0), null);
});

test('phoneDropAt: before or after a line of units side by side is before its first or after its last, and the block\'s own place lands nowhere', () => {
  // l and r share a line, l the taller; c stands under them.
  const boxes = [{ id: 'l', left: 0, top: 0, right: 140, bottom: 200 }, { id: 'r', left: 160, top: 0, right: 300, bottom: 80 }, { id: 'c', left: 0, top: 220, right: 300, bottom: 300 }];
  assert.deepEqual(phoneDropAt(boxes, 70, 190), { pos: 'after', of: 'r', at: 200 }, 'below l: after the whole line');
  assert.deepEqual(phoneDropAt(boxes, 230, 5), { pos: 'before', of: 'l', at: 0 }, 'above r: before the whole line');
  assert.deepEqual(phoneDropAt(boxes, 70, 208), { pos: 'after', of: 'r', at: 200 }, 'the gap under the line, nearer l');
  assert.deepEqual(phoneDropAt(boxes, 150, 230), { pos: 'before', of: 'c', at: 220 });
  // The dragged block stood under r: over its place, or nearer to it than to every unit, nothing moves.
  const own = { left: 160, top: 100, right: 300, bottom: 180 };
  assert.equal(phoneDropAt(boxes, 230, 140, own), null);
  assert.equal(phoneDropAt(boxes, 230, 94, own), null, 'the gap between r and its own place, nearer its own place');
  assert.deepEqual(phoneDropAt(boxes, 230, 70, own), { pos: 'after', of: 'r', at: 200 });
});

test('phoneDropChange: a drop moves the block in the order and gives it its cells: across the row, beside a unit in halves, or into it as a stack', () => {
  const blocks = [blk('a', 0, 0), blk('b', 20, 0), blk('c', 40, 0), blk('d', 60, 0)];
  const cellsAfter = (change) => {
    const next = applied(blocks, 'top', change);
    return stackOrder(next.blocks, next.setup).map((b) => `${b.id}${change.cells[b.id] ? `@${change.cells[b.id].col}/${change.cells[b.id].cols}` : ''}`);
  };
  // d beside a on the right: after a in the order, a in the left half and d in the right.
  const right = phoneDropChange(blocks, 'top', 'd', { pos: 'right', of: 'a' });
  assert.deepEqual(cellsAfter(right), ['a@1/4', 'd@5/4', 'b', 'c']);
  // d beside b on the left: before b, d on the left.
  assert.deepEqual(cellsAfter(phoneDropChange(blocks, 'top', 'd', { pos: 'left', of: 'b' })), ['a', 'd@1/4', 'b@5/4', 'c']);
  // d before b across the row.
  const before = phoneDropChange(blocks, 'top', 'd', { pos: 'before', of: 'b' });
  assert.deepEqual(cellsAfter(before), ['a', 'd', 'b', 'c']);
  assert.equal(before.cells.d, null);
  // d into a: a stack of the two.
  const into = phoneDropChange(blocks, 'top', 'd', { pos: 'into', of: 'a' });
  assert.deepEqual(into.stacks, [['a', 'd']]);
  // Where it already stands, nothing changes.
  assert.equal(phoneDropChange(blocks, 'top', 'b', { pos: 'after', of: 'a' }), null);
  // Beside a block already in a half: the half is shared, a quarter each.
  const halved = blocks.map((b) => (b.id === 'a' ? { ...b, frames: { ...b.frames, mobile: { col: 5, cols: 4 } } } : b));
  const quarter = phoneDropChange(halved, 'top', 'd', { pos: 'right', of: 'a' });
  assert.deepEqual(quarter.cells, { d: { col: 7, cols: 2 }, a: { col: 5, cols: 2 } });
});
