/**
 * Where a dragged menu row lands (editor/src/lib/nav-drop.js): the keys as paths, the thirds of a row, the way out by the grip column,
 * a drop lifted to where the menu's depth holds it, nothing landing inside its own submenu or where it already is, and one name for one place.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { navLevel, parentKey, navRowAt, navDepthOf, navKeyOf, landLevel, navDropAt, navDropOrNull, canonicalDrop } from '../editor/src/lib/nav-drop.js';

const DEPTH = 3;

/** A menu four levels deep: Hjem; Om oss; Butikk with Shop FP, under it Checkout, under it Personvern, and a second child; Kontakt. */
function menu() {
  return [
    { label: 'Hjem', page: 'hjem' },
    { label: 'Om oss', page: 'om-oss' },
    { label: 'Butikk', page: 'shop', children: [
      { label: 'Shop FP', page: 'shop-fp', children: [{ label: 'Checkout', page: 'checkout', children: [{ label: 'Personvern', page: 'personvern' }] }] },
      { label: 'Butikk', page: 'shop' },
    ] },
    { label: 'Kontakt', page: 'kontakt' },
  ];
}

test('keys are paths: the level, the parent, the row at a key, and the key of an item', () => {
  const items = menu();
  assert.equal(navLevel('2'), 0);
  assert.equal(navLevel('2.0.0.0'), 3);
  assert.equal(parentKey('2.0.0'), '2.0');
  assert.equal(parentKey('1'), null);
  const row = navRowAt(items, '2.0.0');
  assert.equal(row.node.label, 'Checkout');
  assert.equal(row.parent.label, 'Shop FP');
  assert.equal(row.index, 0);
  assert.equal(navKeyOf(items, row.node), '2.0.0');
  assert.equal(navKeyOf(items, items[2].children[1]), '2.1');
  assert.equal(navKeyOf(items, { label: 'Elsewhere' }), null);
  assert.equal(navDepthOf(items[2]), 3);
  assert.equal(navDepthOf(items[0]), 0);
});

test('the thirds of a row: before at the top, into in the middle, after at the bottom, and the grip column the way out of a submenu', () => {
  const items = menu();
  assert.deepEqual(navDropAt(items, '3', '0', 100, 0.1, DEPTH), { key: '0', pos: 'before' });
  assert.deepEqual(navDropAt(items, '3', '0', 100, 0.5, DEPTH), { key: '0', pos: 'into' });
  assert.deepEqual(navDropAt(items, '3', '0', 100, 0.9, DEPTH), { key: '0', pos: 'after' });
  // A row can nest down to the menu's last level, and no further.
  assert.deepEqual(navDropAt(items, '3', '2.0.0', 100, 0.5, DEPTH), { key: '2.0.0', pos: 'into' });
  assert.deepEqual(navDropAt(items, '3', '2.0.0.0', 100, 0.5, DEPTH), { key: '2.0.0.0', pos: 'after' });
  // The grip column of a row under the bar lands one level up, after the parent.
  assert.deepEqual(navDropAt(items, '3', '2.0.0', 10, 0.5, DEPTH), { key: '2.0', pos: 'after' });
  // Over itself nothing lands.
  assert.equal(navDropAt(items, '3', '3', 100, 0.5, DEPTH), null);
});

test('a row with a submenu is lifted to where the depth holds it, and never lands inside itself or where it already is', () => {
  const items = menu();
  // Butikk carries three levels: into Hjem would be four, so it lands after Hjem instead; after Om oss is where it already stands.
  assert.deepEqual(navDropAt(items, '2', '0', 100, 0.5, DEPTH), { key: '0', pos: 'after' });
  assert.equal(navDropAt(items, '2', '1', 100, 0.5, DEPTH), null);
  // Shop FP carries two: into a top-level row holds it, into a child does not.
  assert.deepEqual(navDropAt(items, '2.0', '0', 100, 0.5, DEPTH), { key: '0', pos: 'into' });
  assert.deepEqual(navDropOrNull(items, '2.0', { key: '2.1', pos: 'into' }, DEPTH), { key: '2.1', pos: 'after' });
  // Nothing lands inside its own submenu.
  assert.equal(navDropOrNull(items, '2', { key: '2.0', pos: 'before' }, DEPTH), null);
  assert.equal(navDropOrNull(items, '2', { key: '2.0.0', pos: 'into' }, DEPTH), null);
  // Where the row already stands gives nothing: after the row above, before the row below, or as the last child it already is.
  assert.equal(navDropOrNull(items, '1', { key: '0', pos: 'after' }, DEPTH), null);
  assert.equal(navDropOrNull(items, '1', { key: '2', pos: 'before' }, DEPTH), null);
  assert.equal(navDropOrNull(items, '2.1', { key: '2', pos: 'into' }, DEPTH), null);
  // A menu deeper than its depth allows still lifts to the top level and stops there.
  assert.deepEqual(navDropOrNull(items, '2', { key: '0', pos: 'into' }, 1), { key: '0', pos: 'after' });
  assert.equal(landLevel({ key: '2.0', pos: 'into' }), 2);
});

test('one name for one place: before a row is after the row above it, and after the last child is into the parent', () => {
  const items = menu();
  assert.deepEqual(canonicalDrop(items, { key: '1', pos: 'before' }), { key: '0', pos: 'after' });
  assert.deepEqual(canonicalDrop(items, { key: '0', pos: 'before' }), { key: '0', pos: 'before' });
  assert.deepEqual(canonicalDrop(items, { key: '2.1', pos: 'before' }), { key: '2.0', pos: 'after' });
  assert.deepEqual(canonicalDrop(items, { key: '2.1', pos: 'after' }), { key: '2', pos: 'into' });
  assert.deepEqual(canonicalDrop(items, { key: '2.0', pos: 'after' }), { key: '2.0', pos: 'after' });
  assert.equal(canonicalDrop(items, null), null);
});
