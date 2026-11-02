/**
 * Several entries at once (editor/src/lib/collection-bulk.js): the kinds entries fit, the ticks with a run, the copies under their originals, the moves between collections and a field set on many.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { entriesFit, kindsFor, tickRun, withTicks, hiddenTicks, liveTicks, withCopies, carryEntries, settableFields, withField } from '../editor/src/lib/collection-bulk.js';

let n = 0;
const makeId = () => `entry-${++n}`;

test('a product\'s fields fit only a product collection, a date or a link only the others', () => {
  assert.deepEqual(entriesFit([{ id: 'a', title: 'x', price: 10 }], 'news'), { fits: false, reason: 'productFields' });
  assert.deepEqual(entriesFit([{ id: 'a', title: 'x', price: 10 }], 'products'), { fits: true, reason: null });
  assert.deepEqual(entriesFit([{ id: 'a', title: 'x', date: '2026-01-01' }], 'products'), { fits: false, reason: 'datedFields' });
  assert.deepEqual(entriesFit([{ id: 'a', title: 'x', href: '/kaker' }], 'products'), { fits: false, reason: 'datedFields' });
  assert.deepEqual(entriesFit([{ id: 'a', title: 'x', text: 'y' }], 'products'), { fits: true, reason: null }, 'a bare entry fits anywhere');
  const kinds = kindsFor({ entries: [{ id: 'a', date: '2026-01-01' }] });
  assert.deepEqual(kinds.filter((k) => k.fits).map((k) => k.kind), ['news', 'notices', 'publications', 'custom']);
});

test('a run is every entry shown between the anchor and the one pressed, and the ticks keep each once', () => {
  const shown = ['a', 'b', 'c', 'd'];
  assert.deepEqual(tickRun(shown, 'b', 'd'), ['b', 'c', 'd']);
  assert.deepEqual(tickRun(shown, 'd', 'b'), ['b', 'c', 'd']);
  assert.deepEqual(tickRun(shown, 'x', 'c'), ['c']);
  assert.deepEqual(withTicks(['a'], ['a', 'b'], true).sort(), ['a', 'b']);
  assert.deepEqual(withTicks(['a', 'b'], ['a'], false), ['b']);
  assert.equal(hiddenTicks(['a', 'c'], ['a', 'b']), 1);
  assert.deepEqual(liveTicks(['a', 'gone'], [{ id: 'a' }]), ['a']);
});

test('a copy stands under its original with an id of its own', () => {
  const { entries, copyIds } = withCopies([{ id: 'a', title: 'A' }, { id: 'b', title: 'B', sizes: ['S'] }], ['b'], makeId);
  assert.equal(entries.length, 3);
  assert.equal(entries[2].title, 'B');
  assert.equal(entries[2].id, copyIds[0]);
  assert.notEqual(entries[2].id, 'b');
  entries[2].sizes.push('M');
  assert.deepEqual(entries[1].sizes, ['S'], 'the copy shares nothing with its original');
});

test('a move takes the entries from one list to the end of the other, a copy leaves them, and a taken id is renewed', () => {
  const from = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  const to = [{ id: 'x' }, { id: 'b' }];
  const moved = carryEntries(from, to, ['a', 'b'], false, makeId);
  assert.deepEqual(moved.from.map((e) => e.id), ['c']);
  assert.equal(moved.to.length, 4);
  assert.equal(moved.to[2].id, 'a', 'a free id is kept');
  assert.notEqual(moved.to[3].id, 'b', 'a taken id is renewed');
  const copied = carryEntries(from, to, ['c'], true, makeId);
  assert.equal(copied.from.length, 3);
  assert.notEqual(copied.to[2].id, 'c');
});

test('«Set a field» offers the kind\'s own fields, sets them, clears them, and refuses a value that does not fit', () => {
  assert.deepEqual(settableFields('products').map((f) => f.field), ['badge', 'price', 'memberPrice']);
  assert.deepEqual(settableFields('news').map((f) => f.field), ['date']);
  const entries = [{ id: 'a', badge: 'Ny' }, { id: 'b' }, { id: 'c', badge: 'Salg' }];
  assert.deepEqual(withField(entries, ['a', 'b'], 'badge', 'Jul').map((e) => e.badge), ['Jul', 'Jul', 'Salg']);
  assert.deepEqual(withField(entries, ['a', 'c'], 'badge', '').map((e) => e.badge), [undefined, undefined, undefined]);
  assert.equal(withField(entries, ['a'], 'price', '120')[0].price, 120);
  assert.equal(withField(entries, ['a'], 'price', '-1'), null);
  assert.equal(withField(entries, ['a'], 'date', '1. juli'), null);
  assert.equal(withField(entries, ['a'], 'title', 'x'), null, 'a field the menu does not offer is refused');
});
