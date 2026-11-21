/**
 * Tests of the draft store (editor/src/lib/draftStore.js): the baseline invariant ("has draft" is true when the key exists, while a change waits to be written, or while changes that could not be stored are held in memory), the quota guard (a full localStorage must never pass silently, nor leave the changes out of the next publish), and the writes that wait for the changes to pause.
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

const { createDraftStore, flushDrafts, dropDraft, cancelWaitingDrafts, onDraftsWritten } = await import('../editor/src/lib/draftStore.js');

beforeEach(() => {
  cancelWaitingDrafts();
  mock.map.clear();
  mock.failNextSet = false;
});

test('save persists on diff and deletes the key when equal to published', () => {
  const store = createDraftStore('urd-draft-test', () => ({ title: 'A' }));
  assert.equal(store.hasDraft(), false);

  store.data.title = 'B';
  assert.equal(store.saveNow(), true);
  assert.equal(store.hasDraft(), true);

  store.data.title = 'A';
  assert.equal(store.saveNow(), true);
  assert.equal(store.hasDraft(), false);
});

test('a quota error reports onSaveError, returns false and keeps the data in memory as a draft to publish', () => {
  let reported = null;
  const store = createDraftStore('urd-draft-test', () => ({ title: 'A' }), (err) => { reported = err; });
  store.data.title = 'B';
  mock.failNextSet = true;

  assert.equal(store.saveNow(), false);
  assert.equal(reported?.name, 'QuotaExceededError');
  assert.equal(store.data.title, 'B');
  assert.equal(mock.getItem('urd-draft-test'), null);
  assert.equal(store.hasDraft(), true, 'the changes held in memory are published like a stored draft');

  // The next attempt with room to spare succeeds without further ado.
  mock.failNextSet = false;
  assert.equal(store.saveNow(), true);
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
  assert.equal(store.saveNow(), true);
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

test('changes held in memory stop counting once they are stored, undone or discarded', () => {
  const store = createDraftStore('urd-draft-test', () => ({ title: 'A' }));
  store.data.title = 'B';
  mock.failNextSet = true;
  store.saveNow();
  assert.equal(store.hasDraft(), true);
  store.data.title = 'A';
  assert.equal(store.saveNow(), true);
  assert.equal(store.hasDraft(), false, 'back to the published state');
  store.data.title = 'C';
  mock.failNextSet = true;
  store.saveNow();
  store.reset();
  assert.equal(store.hasDraft(), false, 'discarded');
});

test('save waits for the changes to pause: every change in a burst is one write, a draft that waits counts as one, and a flush writes it at once', () => {
  let writes = 0;
  const set = mock.setItem;
  mock.setItem = function (key, value) { writes += 1; return set.call(this, key, value); };
  try {
    const store = createDraftStore('urd-draft-test', () => ({ title: 'A' }));
    for (const letter of 'abcdefghij') {
      store.data.title += letter;
      store.save();
    }
    assert.equal(writes, 0, 'nothing written while the changes go on');
    assert.equal(store.hasDraft(), true, 'a change waiting to be written counts as a draft');
    let told = 0;
    const stop = onDraftsWritten(() => { told += 1; });
    flushDrafts();
    stop();
    assert.equal(writes, 1, 'the burst is one write');
    assert.equal(JSON.parse(mock.getItem('urd-draft-test')).title, 'Aabcdefghij');
    assert.equal(told, 1, 'the marks are told');
    flushDrafts();
    assert.equal(writes, 1, 'nothing waits after a flush');
  } finally {
    mock.setItem = set;
  }
});

test('a deleted draft is never written back by a write that waited, and a store made for a key reads what another store had waiting', () => {
  const store = createDraftStore('urd-draft-collection-x', () => ({ entries: [] }));
  store.data.entries.push('one');
  store.save();
  dropDraft('urd-draft-collection-x');
  flushDrafts();
  assert.equal(mock.getItem('urd-draft-collection-x'), null, 'the deleted collection stays deleted');

  const first = createDraftStore('urd-draft-page', () => ({ title: 'A' }));
  first.data.title = 'B';
  first.save();
  const again = createDraftStore('urd-draft-page', () => ({ title: 'A' }));
  assert.equal(again.data.title, 'B', 'the waiting change is written before the new store reads it');
});

test('the waiting writes go out 250 ms after the last change, and at most 2 s after the first while the changes go on', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'], now: 0 });
  let writes = 0;
  const set = mock.setItem;
  mock.setItem = function (key, value) { writes += 1; return set.call(this, key, value); };
  try {
    const store = createDraftStore('urd-draft-test', () => ({ title: 'A' }));
    store.data.title = 'B';
    store.save();
    t.mock.timers.tick(249);
    assert.equal(writes, 0);
    t.mock.timers.tick(1);
    assert.equal(writes, 1, 'written once the changes have paused for 250 ms');
    // A long gesture: a change every 200 ms, never a pause of 250.
    for (let i = 0; i < 11; i++) {
      store.data.title += 'x';
      store.save();
      t.mock.timers.tick(200);
    }
    assert.equal(writes, 2, 'written once in the gesture, 2 s after its first change');
  } finally {
    mock.setItem = set;
  }
});

test('a draft saved unchanged counts as one while it waits, and not once it is written', () => {
  const store = createDraftStore('urd-draft-test', () => ({ title: 'A' }));
  store.save();
  assert.equal(store.hasDraft(), true, 'a change waiting to be written counts');
  let told = 0;
  const stop = onDraftsWritten(() => { told += 1; });
  flushDrafts();
  stop();
  assert.equal(store.hasDraft(), false, 'written, it equals the published state and leaves no draft');
  assert.equal(told, 1, 'the marks are told, so they drop it');
});
