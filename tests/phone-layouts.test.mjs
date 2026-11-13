/**
 * The presets that suggest a section's layout on the phone (template/assets/engine/<version>/phone-layouts.js): which fit, the cells each writes, and «Alternate sides» reading every other pair the other way round.
 * Frames are in physical units: x/w in percent of the content band, y/h in px.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { phoneLayouts, phoneLayoutChange, phoneLayoutSketch, phoneMark, PHONE_LAYOUTS } = await engineImport('phone-layouts.js');
const { stackOrder } = await engineImport('phone-order.js');

const blk = (id, type, y, x = 0, extra = {}) => ({ id, type, props: {}, ...extra, frames: { desktop: { x, y, w: extra.w ?? 40, h: extra.h ?? 60 }, mobile: extra.mobile ?? null } });

/** Two stories: words then a picture, twice. */
const stories = () => [blk('t1', 'text', 0), blk('p1', 'image', 100), blk('t2', 'text', 200), blk('p2', 'image', 300)];

/** The order and cells after a change, as the editor writes it. */
function applied(blocks, setup, change) {
  const next = blocks.map((b) => {
    const copy = { ...b, frames: { ...b.frames } };
    if (change.places && b.id in change.places) { if (change.places[b.id]) copy.phonePlace = change.places[b.id]; else delete copy.phonePlace; }
    if (b.id in change.cells) copy.frames.mobile = change.cells[b.id] ? { ...change.cells[b.id] } : null;
    return copy;
  });
  const s = { rule: 'top', list: null, stacks: [], ...(typeof setup === 'object' ? setup : {}), ...(change.stacks ? { stacks: change.stacks } : {}), ...(change.list ? { list: change.list } : {}) };
  return stackOrder(next, s).map((b) => `${b.id}${b.frames.mobile ? `@${b.frames.mobile.col}/${b.frames.mobile.cols}` : ''}`);
}

test('phoneLayouts: every preset, those that fit first and the best first; one that does not fit stays, unfit', () => {
  const list = phoneLayouts(stories(), 'top');
  assert.deepEqual(list.map((l) => l.id).sort(), [...PHONE_LAYOUTS].sort());
  assert.deepEqual(list.filter((l) => l.fits).map((l) => l.id).slice(0, 2), ['alternate', 'pairs'], 'two pictures with their words pair up first');
  assert.equal(list.find((l) => l.id === 'one-column').fits, false, 'nothing in cells yet');
  assert.equal(list.find((l) => l.id === 'big-two').fits, false, 'the first unit is words');
  const one = phoneLayouts([blk('a', 'text', 0)], 'top');
  assert.ok(one.every((l) => !l.fits), 'one block: nothing fits');
});

test('phoneLayouts: cards of several blocks read two to a line first', () => {
  const cards = [];
  for (const [n, x] of [[1, 0], [2, 50]]) cards.push(blk(`h${n}`, 'text', 0, x, { w: 40, h: 40 }), blk(`b${n}`, 'text', 50, x, { w: 40, h: 80 }));
  assert.equal(phoneLayouts(cards, 'left')[0].id, 'two-per-line');
});

test('phoneLayoutChange: two to a line, pairs, one wide then two and big and two write the cells of each unit', () => {
  assert.deepEqual(applied(stories(), 'top', phoneLayoutChange(stories(), 'top', 'two-per-line')), ['t1@1/4', 'p1@5/4', 't2@1/4', 'p2@5/4']);
  assert.deepEqual(applied(stories(), 'top', phoneLayoutChange(stories(), 'top', 'pairs')), ['t1@1/4', 'p1@5/4', 't2@1/4', 'p2@5/4']);
  const five = [...stories(), blk('t3', 'text', 400)];
  assert.deepEqual(applied(five, 'top', phoneLayoutChange(five, 'top', 'wide-two')), ['t1', 'p1@1/4', 't2@5/4', 'p2', 't3@1/4']);
  const big = [blk('p0', 'image', 0), blk('a', 'text', 100), blk('b', 'text', 200), blk('c', 'text', 300)];
  assert.deepEqual(applied(big, 'top', phoneLayoutChange(big, 'top', 'big-two')), ['p0@1/4', 'a@5/4', 'b@5/4', 'c']);
  const celled = stories().map((b) => ({ ...b, frames: { ...b.frames, mobile: { col: 1, cols: 4 } } }));
  assert.deepEqual(applied(celled, 'top', phoneLayoutChange(celled, 'top', 'one-column')), ['t1', 'p1', 't2', 'p2']);
  assert.equal(phoneLayoutChange(stories(), 'top', 'diagonal'), null);
});

test('phoneLayoutChange: alternate sides reads every other pair picture first, so the picture stands left', () => {
  const change = phoneLayoutChange(stories(), 'top', 'alternate');
  assert.deepEqual(applied(stories(), 'top', change), ['t1@1/4', 'p1@5/4', 'p2@1/4', 't2@5/4']);
  // In a custom order the list itself is written.
  const listed = { rule: 'top', list: ['t1', 'p1', 't2', 'p2'], stacks: [] };
  const inList = phoneLayoutChange(stories(), listed, 'alternate');
  assert.deepEqual(inList.list, ['t1', 'p1', 'p2', 't2']);
});

test('phoneLayoutChange: a stack takes one cell, all its blocks in it', () => {
  const blocks = [blk('h', 'text', 0), blk('t', 'text', 50), blk('p', 'image', 200)];
  const change = phoneLayoutChange(blocks, { rule: 'top', stacks: [['h', 't']] }, 'pairs');
  assert.deepEqual(change.cells, { h: { col: 1, cols: 4 }, t: { col: 1, cols: 4 }, p: { col: 5, cols: 4 } });
});

test('phoneLayoutSketch: a preset drawn small, a run of units in the same cells as one cell with each block\'s mark', () => {
  const big = { blocks: [blk('p0', 'image', 0), blk('a', 'text', 100), blk('b', 'button', 200), blk('c', 'text', 300, 0, { props: { html: '<h2>Hi</h2>' } })] };
  assert.deepEqual(phoneLayoutSketch(big, 'big-two'), [
    { col: 1, cols: 4, marks: ['pic'] },
    { col: 5, cols: 4, marks: ['text', 'btn'] },
    { col: 1, cols: 8, marks: ['head'] },
  ]);
  assert.equal(phoneMark({ type: 'gallery' }), 'pic');
});

test('phoneLayoutChange: a pair that cannot be read the other way round stands side by side as it reads, and a press that changes nothing is none', () => {
  // p1 stands before t1 by an exception of its own: the first pair reads its words first all the same, p1 letting go of t1 as t1 lands before it (settle).
  const placed = stories().map((b) => (b.id === 'p1' ? { ...b, phonePlace: { before: 't1' } } : b));
  const change = phoneLayoutChange(placed, 'top', 'alternate');
  assert.equal(change.places.p1, null);
  assert.deepEqual(applied(placed, 'top', change), ['t1@1/4', 'p1@5/4', 'p2@1/4', 't2@5/4']);
  // A caption placed after the second picture keeps the pair apart: the pair stands as it reads, each across the row.
  const caption = [...stories(), blk('cap', 'text', 400, 0, { phonePlace: { after: 'p2' } })];
  const flipped = applied(caption, 'top', phoneLayoutChange(caption, 'top', 'alternate'));
  assert.ok(!flipped.some((id) => id.startsWith('t2@1')), 'no lone cell on the wrong side');
  // Pressed again, a preset changes nothing.
  const once = phoneLayoutChange(stories(), 'top', 'two-per-line');
  const celled = stories().map((b) => ({ ...b, frames: { ...b.frames, mobile: once.cells[b.id] } }));
  assert.equal(phoneLayoutChange(celled, 'top', 'two-per-line'), null);
  // «One column» fits only where a block the phone shows stands in cells.
  const hidden = [blk('a', 'text', 0, 0, { hideMobile: true, mobile: { col: 1, cols: 4 } }), blk('b', 'text', 100)];
  assert.equal(phoneLayouts(hidden, 'top').find((l) => l.id === 'one-column').fits, false);
});

test('phoneLayoutSketch: each block in its own cells, as the page draws it', () => {
  const sketch = phoneLayoutSketch({ blocks: stories() }, 'alternate');
  assert.deepEqual(sketch.map((c) => `${c.col}/${c.cols}:${c.marks.join(',')}`), ['1/4:text', '5/4:pic', '1/4:pic', '5/4:text']);
});
