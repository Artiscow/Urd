/**
 * Tests of the draft store (editor/src/lib/draftStore.js): the baseline invariant ("has draft" is true if and only if the key exists) and the quota guard (a full localStorage must never pass silently).
 * Runs in node with a Map-based localStorage mock.
 */
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

const mock = {
  map: new Map(),
  failNextSet: false,
  getItem(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  },
  setItem(key, value) {
    if (this.failNextSet) {
      const err = new Error('quota full');
      err.name = 'QuotaExceededError';
      throw err;
    }
    this.map.set(key, value);
  },
  removeItem(key) {
    this.map.delete(key);
  },
};
Object.defineProperty(globalThis, 'localStorage', { value: mock, configurable: true });

const { createDraftStore } = await import('../editor/src/lib/draftStore.js');

beforeEach(() => {
  mock.map.clear();
  mock.failNextSet = false;
});

test('save persists on diff and deletes the key when equal to published', () => {
  const store = createDraftStore('urd-draft-test', () => ({ title: 'A' }));
  assert.equal(store.hasDraft(), false);

  store.data.title = 'B';
  assert.equal(store.save(), true);
  assert.equal(store.hasDraft(), true);

  store.data.title = 'A';
  assert.equal(store.save(), true);
  assert.equal(store.hasDraft(), false);
});

test('a quota error reports onSaveError, returns false and keeps the data in memory', () => {
  let reported = null;
  const store = createDraftStore('urd-draft-test', () => ({ title: 'A' }), (err) => { reported = err; });
  store.data.title = 'B';
  mock.failNextSet = true;

  assert.equal(store.save(), false);
  assert.equal(reported?.name, 'QuotaExceededError');
  assert.equal(store.data.title, 'B');
  assert.equal(store.hasDraft(), false);

  // The next attempt with room to spare succeeds without further ado.
  mock.failNextSet = false;
  assert.equal(store.save(), true);
  assert.equal(store.hasDraft(), true);
});

test('a corrupt draft falls back to the published state', () => {
  // Deliberately broken JSON as stored draft content.
  mock.map.set('urd-draft-test', '{ikke json');
  const store = createDraftStore('urd-draft-test', () => ({ title: 'A' }));
  assert.equal(store.data.title, 'A');
  assert.equal(store.hasDraft(), false);
});

test('missing baseline (null): fresh content is a draft until the first publish', () => {
  const store = createDraftStore('urd-draft-test', () => null);
  assert.equal(store.data, null);
  assert.equal(store.hasDraft(), false);

  store.replace({ schemaVersion: 1, id: 'ny', entries: [] });
  assert.equal(store.save(), true);
  // Even empty, fresh content differs from "does not exist", so the draft persists
  // (without this the index can be published without its accompanying file).
  assert.equal(store.hasDraft(), true);
});

// Migrate-on-read for renamed draft keys (ADR-0021).
// The 'urd-draft-samling-*' keys are deliberate legacy Norwegian keys.

test('legacy draft key moves to the new key on read', () => {
  mock.map.set('urd-draft-samling-x', JSON.stringify({ a: 1 }));
  const store = createDraftStore('urd-draft-collection-x', () => ({ a: 0 }), undefined, 'urd-draft-samling-x');
  assert.deepEqual(store.data, { a: 1 });
  assert.equal(mock.getItem('urd-draft-samling-x'), null, 'legacy key is removed after the move');
  assert.equal(mock.getItem('urd-draft-collection-x'), JSON.stringify({ a: 1 }));
});

test('an existing draft under the new key wins over a stale legacy draft', () => {
  mock.map.set('urd-draft-collection-y', JSON.stringify({ a: 2 }));
  mock.map.set('urd-draft-samling-y', JSON.stringify({ a: 1 }));
  const store = createDraftStore('urd-draft-collection-y', () => ({ a: 0 }), undefined, 'urd-draft-samling-y');
  assert.deepEqual(store.data, { a: 2 });
  assert.equal(mock.getItem('urd-draft-samling-y'), null);
});

test('no legacy key present leaves the store untouched', () => {
  const store = createDraftStore('urd-draft-collection-z', () => ({ a: 0 }), undefined, 'urd-draft-samling-z');
  assert.deepEqual(store.data, { a: 0 });
  assert.equal(store.hasDraft(), false);
});
