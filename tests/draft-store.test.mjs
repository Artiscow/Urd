/**
 * Tests of the draft store (editor/src/lib/draftStore.js): the baseline invariant ("has draft" is true when the key exists, while a change waits to be written, or while changes that could not be stored are held in memory), the quota guard (a full localStorage must never pass silently, nor leave the changes out of the next publish), and the writes that wait for the changes to pause.
 * And the editor's state held to it: a measured height mirrored into the baseline (state/bridge.svelte.js), the page left written before the next is read (state/page.svelte.js), and the null baseline of a collection or template not yet published.
 * Runs in node with a Map-based localStorage mock.
 */
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

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
const editorFile = (path) => readFileSync(new URL(`../editor/src/${path}`, import.meta.url), 'utf8');

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

test('the store copies a published state held in a proxy, as Svelte\'s state hands it over, where structuredClone refuses one', () => {
  const proxied = (value) => new Proxy(value, {});
  assert.throws(() => structuredClone(proxied({ title: 'A' })), 'structuredClone refuses a proxy');
  const store = createDraftStore('urd-draft-test', () => proxied({ title: 'A', nested: proxied({ n: 1 }) }));
  assert.deepEqual({ ...store.data, nested: { ...store.data.nested } }, { title: 'A', nested: { n: 1 } });
  assert.equal(store.hasDraft(), false);
  store.data.title = 'B';
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

test('a measured height amended into the baseline and the draft alike is no change to publish, and an edit after it still is', () => {
  const page = { sections: [{ id: 's', blocks: [{ id: 'b', frames: { desktop: { x: 0, y: 0, w: 4, h: 100 } } }] }] };
  const store = createDraftStore('urd-draft-test', () => page);
  const frame = () => store.data.sections[0].blocks[0].frames.desktop;
  let given = null;
  store.amendBaseline((base) => {
    given = base;
    base.sections[0].blocks[0].frames.desktop.h = 240;
  });
  assert.notEqual(given, store.data, 'the baseline is changed on a copy of its own');
  frame().h = 240;
  store.save();
  flushDrafts();
  assert.equal(store.hasDraft(), false);
  assert.equal(mock.getItem('urd-draft-test'), null, 'nothing is stored');
  assert.equal(store.published().sections[0].blocks[0].frames.desktop.h, 240);
  assert.equal(page.sections[0].blocks[0].frames.desktop.h, 100, 'the published file the store was made from stays as it is');
  frame().x = 2;
  assert.equal(store.saveNow(), true);
  assert.equal(store.hasDraft(), true, 'an edit is a draft');
  frame().x = 0;
  store.saveNow();
  assert.equal(store.hasDraft(), false, 'undone, the measured height is no draft');
  frame().x = 3;
  assert.equal(store.reset().sections[0].blocks[0].frames.desktop.h, 240, 'a discard keeps the measured height');
});

test('a plugin copy\'s own height goes into the open page\'s draft and its baseline both, and is neither stored nor an undo step', () => {
  const bridge = editorFile('state/bridge.svelte.js');
  const grow = bridge.split('function handleGrow(msg) {')[1].split('\n}\n')[0];
  const own = grow.slice(grow.indexOf('if (block.frames.desktop.h === msg.h) return;'));
  assert.ok(grow.indexOf('if (msg.fit) {') < grow.indexOf('if (block.frames.desktop.h === msg.h) return;'), 'a fit takes its own way before');
  assert.match(own, /pageState\.store\.amendBaseline\(\(base\) => \{[\s\S]*?b\.frames\.desktop\.h = msg\.h;\s*\}\);\s*block\.frames\.desktop\.h = msg\.h;/);
  assert.doesNotMatch(own, /\.save\(|saveNow\(|pushHistory\(|updateDirty\(/);
});

test('a page switch writes the page left before the next page is read', () => {
  const page = editorFile('state/page.svelte.js');
  assert.match(page, /import \{[^}]*\bflushDrafts\b[^}]*\} from '\.\.\/lib\/draftStore\.js';/);
  const select = page.split('async function selectPage(id, { keepHistory = false } = {}) {')[1].split('\n}\n')[0];
  assert.match(select, /^(?:\s*\/\/[^\n]*)*\s*flushDrafts\(\);/, 'the first thing it does');
  const flushed = select.indexOf('flushDrafts();');
  for (const step of ['pageId = id;', 'held.get(', 'fetch(', 'createDraftStore(']) {
    assert.ok(select.indexOf(step) > flushed, `before ${step}`);
  }
});

test('a collection or template not yet published is held to the baseline null, never to a published state made up for it', () => {
  // Every store the editor makes for a collection or a template, by the baseline it is given.
  const made = [];
  for (const file of ['state/collections.svelte.js', 'state/templates.svelte.js', 'state/history.svelte.js', 'state/publish.svelte.js']) {
    for (const [, key, loader] of editorFile(file).matchAll(/createDraftStore\(`(urd-draft-(?:collection|template)-)\$\{id\}`, \(\) => ([^,]+), /g)) made.push(`${file} ${key} ${loader}`);
  }
  assert.deepEqual(made.sort(), [
    'state/collections.svelte.js urd-draft-collection- null',
    'state/collections.svelte.js urd-draft-collection- published',
    'state/history.svelte.js urd-draft-collection- baseline',
    'state/history.svelte.js urd-draft-template- templatesState.publishedTemplates[id] ?? null',
    'state/publish.svelte.js urd-draft-collection- publishedCollection',
    'state/publish.svelte.js urd-draft-template- publishedTemplate',
    'state/templates.svelte.js urd-draft-template- null',
    'state/templates.svelte.js urd-draft-template- published',
  ]);
  // As the editor opens: the published file, or null where none could be read.
  for (const [file, kind] of [['state/collections.svelte.js', 'collection'], ['state/templates.svelte.js', 'template']]) {
    const source = editorFile(file);
    assert.match(source, /const files = await Promise\.all\(\w+\.map\(\(id\) => fetch\([^)]*\)\.then\(\(res\) => res\.json\(\)\)\.catch\(\(\) => null\)\)\);\s*for \(const \[i, id\] of \w+\.entries\(\)\) \{\s*const published = files\[i\];/, `${kind}: read as published or null`);
  }
  // An undone deletion: the published state, or null.
  assert.match(editorFile('state/history.svelte.js'), /const baseline = collectionsState\.publishedCollections\[id\] \?\? null;/);
  // A new one is made as a draft over null.
  assert.match(editorFile('state/collections.svelte.js'), /createDraftStore\(`urd-draft-collection-\$\{id\}`, \(\) => null, [^\n]*\n\s*collectionStores\[id\]\.replace\(fresh\);/);
  assert.match(editorFile('state/templates.svelte.js'), /createDraftStore\(`urd-draft-template-\$\{id\}`, \(\) => null, [^\n]*\n\s*templateStores\[id\]\.replace\(fresh\);/);
});
