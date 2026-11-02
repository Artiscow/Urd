/**
 * The Collections panel's layouts and shared rules (editor/src/lib/collection-layout.js): the stored layout, which entries move, the search, an entry's place among its neighbours, the choice after a deletion, and the table's columns and cells.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COLLECTION_LAYOUTS, collectionLayoutOf, movable, sameColorName, entryMatches, entryPosition, afterRemoval, tableColumns, cellText } from '../editor/src/lib/collection-layout.js';

/** A stand-in for the editor's plainTitle: the words of a simple rich text. */
const plain = (html) => String(html).split(/<[^>]*>/).join(' ').replace(/\s+/g, ' ').trim();

test('the stored layout falls to stepping in', () => {
  assert.equal(collectionLayoutOf(null), 'drill');
  assert.equal(collectionLayoutOf('grid'), 'drill');
  for (const l of COLLECTION_LAYOUTS) assert.equal(collectionLayoutOf(l), l);
});

test('a product always moves, another entry only while it has no date', () => {
  assert.ok(movable('products', { date: '2026-01-01' }));
  assert.ok(movable('news', {}));
  assert.ok(!movable('news', { date: '2026-01-01' }));
});

test('two colours with the same name are told, case and spaces aside', () => {
  const colors = [{ name: 'Rosa' }, { name: ' rosa ' }, { name: 'Grønn' }];
  assert.ok(sameColorName(colors, 0));
  assert.ok(!sameColorName(colors, 2));
});

test('the search finds every word in the title, the text, the sizes and the colours', () => {
  const entry = { title: '<b>Marsipan</b>kake', text: 'Med <i>grønt</i> marsipan', sizes: ['8 biter'], colors: [{ name: 'Rosa' }] };
  assert.ok(entryMatches(entry, '', plain));
  assert.ok(entryMatches(entry, 'marsipan', plain));
  assert.ok(entryMatches(entry, 'GRØNT rosa', plain));
  assert.ok(entryMatches(entry, '8 biter', plain));
  assert.ok(!entryMatches(entry, 'sjokolade', plain));
});

test('an entry knows its place and its neighbours, and a deletion chooses the next or the one before', () => {
  const ids = ['a', 'b', 'c'];
  assert.deepEqual(entryPosition(ids, 'b'), { index: 1, count: 3, prev: 'a', next: 'c' });
  assert.deepEqual(entryPosition(ids, 'a'), { index: 0, count: 3, prev: null, next: 'b' });
  assert.equal(entryPosition(ids, 'x'), null);
  assert.equal(afterRemoval(ids, 'b'), 'c');
  assert.equal(afterRemoval(ids, 'c'), 'b');
  assert.equal(afterRemoval(['a'], 'a'), null);
});

test('the table shows a product\'s shop fields and another kind\'s date and text', () => {
  assert.deepEqual(tableColumns('products').map((c) => c.key), ['price', 'memberPrice', 'sizes', 'colors', 'badge']);
  assert.deepEqual(tableColumns('news').map((c) => c.key), ['date', 'text']);
  const entry = { price: 350, sizes: ['Liten', 'Stor'], colors: [{ name: 'Grønn' }, { name: 'Rosa' }], text: '<p>Saftig</p>' };
  assert.equal(cellText('price', entry, plain), '350');
  assert.equal(cellText('sizes', entry, plain), 'Liten, Stor');
  assert.equal(cellText('colors', entry, plain), 'Grønn, Rosa');
  assert.equal(cellText('text', entry, plain), 'Saftig');
  assert.equal(cellText('memberPrice', entry, plain), '');
});
