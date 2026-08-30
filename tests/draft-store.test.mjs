/**
 * Test av utkastlagringen (editor/src/lib/draftStore.js): baseline-invarianten
 * («har utkast» er sant hvis og bare hvis nøkkelen finnes) og kvotevernet
 * (full localStorage skal aldri passere stille). Kjøres i node med en
 * Map-basert localStorage-mock.
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
      const err = new Error('kvote full');
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

test('save persisterer ved diff og sletter nøkkelen ved likhet med publisert', () => {
  const store = createDraftStore('urd-draft-test', () => ({ title: 'A' }));
  assert.equal(store.hasDraft(), false);

  store.data.title = 'B';
  assert.equal(store.save(), true);
  assert.equal(store.hasDraft(), true);

  store.data.title = 'A';
  assert.equal(store.save(), true);
  assert.equal(store.hasDraft(), false);
});

test('kvotefeil melder onSaveError, returnerer false og beholder data i minnet', () => {
  let reported = null;
  const store = createDraftStore('urd-draft-test', () => ({ title: 'A' }), (err) => { reported = err; });
  store.data.title = 'B';
  mock.failNextSet = true;

  assert.equal(store.save(), false);
  assert.equal(reported?.name, 'QuotaExceededError');
  assert.equal(store.data.title, 'B');
  assert.equal(store.hasDraft(), false);

  // Neste forsøk med plass igjen lykkes uten videre.
  mock.failNextSet = false;
  assert.equal(store.save(), true);
  assert.equal(store.hasDraft(), true);
});

test('korrupt utkast faller tilbake til publisert tilstand', () => {
  mock.map.set('urd-draft-test', '{ikke json');
  const store = createDraftStore('urd-draft-test', () => ({ title: 'A' }));
  assert.equal(store.data.title, 'A');
  assert.equal(store.hasDraft(), false);
});

test('finnes-ikke-baseline (null): ferskt innhold er utkast til første publisering', () => {
  const store = createDraftStore('urd-draft-test', () => null);
  assert.equal(store.data, null);
  assert.equal(store.hasDraft(), false);

  store.replace({ schemaVersion: 1, id: 'ny', entries: [] });
  assert.equal(store.save(), true);
  // Selv tomt, ferskt innhold er ulikt «finnes ikke», så utkastet består
  // (uten dette kan indeksen publiseres uten tilhørende fil).
  assert.equal(store.hasDraft(), true);
});

// Migrate-on-read for renamed draft keys (ADR-0021).

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
