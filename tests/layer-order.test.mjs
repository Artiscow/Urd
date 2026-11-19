/**
 * The layer order of a section's blocks (engine/layer-order.js): to the front above every other block, to the back below them, z never below 1; on the phone among the blocks pinned there alone.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { layerChanges, phoneLayerChanges } = await engineImport('layer-order.js');
const block = (id, z) => ({ id, frames: { desktop: { z } } });

test('to the front: one above the highest of the others', () => {
  assert.deepEqual([...layerChanges([block('a', 1), block('b', 4), block('c', 2)], 'a', 1)], [['a', 5]]);
  assert.deepEqual([...layerChanges([block('a', 3)], 'a', 1)], [['a', 1]], 'alone in its section');
});

test('to the back: 1 where it is free, else the others one step up and this one at 1', () => {
  assert.deepEqual([...layerChanges([block('a', 5), block('b', 2), block('c', 3)], 'a', -1)], [['a', 1]]);
  assert.deepEqual(Object.fromEntries(layerChanges([block('a', 5), block('b', 1), block('c', 3)], 'a', -1)), { b: 2, c: 4, a: 1 });
  assert.deepEqual([...layerChanges([{ id: 'a', frames: { desktop: {} } }, { id: 'b', frames: { desktop: {} } }], 'a', -1)].sort(), [['a', 1], ['b', 2]], 'a missing z counts as 1');
});

/** A block pinned on the phone, with its desktop z and its own z on the phone where it has one. */
const pinned = (id, z, phoneZ) => ({ id, frames: { desktop: { z }, mobile: { row: 1, rows: 4, ...(phoneZ === undefined ? {} : { z: phoneZ }) } } });

test('phone, to the front: above every other pinned block, reading their own z on the phone or the desktop\'s; a flowing block takes no part', () => {
  const blocks = [pinned('a', 1), pinned('b', 7, 2), block('f', 9)];
  assert.deepEqual(Object.fromEntries(phoneLayerChanges(blocks, ['a'], 1)), { a: 3 });
  assert.deepEqual([...phoneLayerChanges(blocks, ['f'], 1)], [], 'a flowing block');
  assert.deepEqual(Object.fromEntries(phoneLayerChanges([pinned('a', 1), pinned('b', 2), pinned('c', 5)], ['c', 'a'], 1)), { a: 3, c: 4 }, 'a set keeps its own order');
  assert.deepEqual([...phoneLayerChanges([pinned('a', 1), pinned('b', 1, 4)], ['b'], 1)], [], 'already in front');
});

test('phone, to the back: at 1, the other pinned blocks lifted as many steps as it takes, their order kept', () => {
  assert.deepEqual(Object.fromEntries(phoneLayerChanges([pinned('a', 1), pinned('b', 3, 2)], ['b'], -1)), { a: 2, b: 1 });
  assert.deepEqual(Object.fromEntries(phoneLayerChanges([pinned('a', 3), pinned('b', 5), pinned('c', 1, 4)], ['c', 'b'], -1)), { c: 1, b: 2 }, 'room enough below');
  assert.deepEqual(Object.fromEntries(phoneLayerChanges([pinned('a', 1), pinned('b', 2), pinned('c', 3)], ['b', 'c'], -1)), { a: 3, b: 1, c: 2 });
});
