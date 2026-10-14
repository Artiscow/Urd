/**
 * The element menu's quick row (editor/src/lib/quick-row.js, 0.7.20.3):
 * defaults per block type, pins, defaults taken out, and the choice kept in
 * the browser.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  QUICK_KEY, quickDefaults, cleanChoice, quickIds, isInRow, togglePin, choiceChanged, readChoices, writeChoices, NO_CHOICE,
} from '../editor/src/lib/quick-row.js';

const all = (...ids) => new Set(ids);

test('quickDefaults: a type\'s own tiles first, then the shared ones', () => {
  assert.deepEqual(quickDefaults('calendar'), ['design', 'limit', 'subscribe', 'fit', 'phone']);
  assert.deepEqual(quickDefaults('text'), ['fit', 'phone']);
});

test('quickIds: the defaults, then the pins in pin order, only those the block has now', () => {
  const choice = { pinned: ['size', 'design'], removed: ['fit'] };
  assert.deepEqual(quickIds('text', choice, all('fit', 'phone', 'size')), ['phone', 'size']);
  assert.deepEqual(quickIds('calendar', NO_CHOICE, all('design', 'subscribe', 'fit', 'phone')), ['design', 'subscribe', 'fit', 'phone']);
});

test('togglePin: a pin joins at the end and leaves again; a default leaves and returns to its own place', () => {
  let c = NO_CHOICE;
  c = togglePin('text', c, 'size');
  assert.deepEqual(c, { pinned: ['size'], removed: [] });
  assert.equal(isInRow('text', c, 'size'), true);
  c = togglePin('text', c, 'fit');
  assert.deepEqual(c, { pinned: ['size'], removed: ['fit'] });
  assert.deepEqual(quickIds('text', c, all('fit', 'phone', 'size')), ['phone', 'size']);
  c = togglePin('text', c, 'fit');
  assert.deepEqual(quickIds('text', c, all('fit', 'phone', 'size')), ['fit', 'phone', 'size']);
  c = togglePin('text', c, 'size');
  assert.equal(choiceChanged(c), false);
});

test('cleanChoice: two lists of distinct string ids, whatever was stored', () => {
  assert.deepEqual(cleanChoice({ pinned: ['a', 'a', 3, ''], removed: 'x' }), { pinned: ['a'], removed: [] });
  assert.deepEqual(cleanChoice(null), { pinned: [], removed: [] });
});

test('readChoices and writeChoices: kept per type, a type at its defaults left out, a broken store read as none', () => {
  const store = new Map();
  const storage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) };
  writeChoices(storage, { text: { pinned: ['size'], removed: [] }, image: { pinned: [], removed: [] } });
  assert.deepEqual(JSON.parse(store.get(QUICK_KEY)), { text: { pinned: ['size'], removed: [] } });
  assert.deepEqual(readChoices(storage), { text: { pinned: ['size'], removed: [] } });
  store.set(QUICK_KEY, '{not json');
  assert.deepEqual(readChoices(storage), {});
  const blocked = { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); } };
  assert.deepEqual(readChoices(blocked), {});
  assert.doesNotThrow(() => writeChoices(blocked, { text: { pinned: ['size'], removed: [] } }));
});
