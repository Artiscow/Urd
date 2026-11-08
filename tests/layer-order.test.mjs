/**
 * The layer order of a section's blocks (engine/layer-order.js): to the front above every other block, to the back below them, z never below 1.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { layerChanges } = await engineImport('layer-order.js');
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
