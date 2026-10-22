/**
 * The collection index (editor/src/lib/collection-index.js).
 * The editor reads and writes `content/samlinger.json`, the file the Vipps function reads, and merges a legacy `content/collections.json` without dropping an id.
 * The template ships one index whose ids match its files.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import {
  INDEX_PATH, LEGACY_INDEX_PATH, INDEX_DRAFT_KEY, LEGACY_DELETED_KEY, EARLIER_INDEX_DRAFT_KEYS,
  fetchIndex, mergeIds, readIndexes, indexBaseline, earlierDrafts, openingIds, indexPending, planIndexPublish,
} from '../editor/src/lib/collection-index.js';

// The draft store reads the global localStorage; a Map stands in for it.
const local = new Map();
Object.defineProperty(globalThis, 'localStorage', {
  value: { getItem: (k) => (local.has(k) ? local.get(k) : null), setItem: (k, v) => { local.set(k, String(v)); }, removeItem: (k) => { local.delete(k); } },
  configurable: true,
});
const { createDraftStore } = await import('../editor/src/lib/draftStore.js');

const ROOT = new URL('../', import.meta.url);
const TEMPLATE = new URL('template/', ROOT);

/** A fetch that serves the given paths as JSON text and answers 404 for the rest. */
const serve = (files) => async (url) => (url in files
  ? { ok: true, json: async () => JSON.parse(files[url]) }
  : { ok: false, json: async () => { throw new Error('404 page'); } });

/** A Map-backed storage with the Storage methods the module uses. */
const storage = (entries = {}) => {
  const map = new Map(Object.entries(entries));
  return {
    map,
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    removeItem: (k) => { map.delete(k); },
  };
};

test('the index paths and the keys', () => {
  assert.equal(INDEX_PATH, 'content/samlinger.json', 'the file ADR-0021 keeps and the Vipps function reads');
  assert.equal(LEGACY_INDEX_PATH, 'content/collections.json');
  for (const key of [INDEX_DRAFT_KEY, LEGACY_DELETED_KEY]) {
    assert.ok(key.startsWith('urd-draft-'), `${key}: a revert clears every urd-draft- key`);
    assert.match(key.slice('urd-draft-'.length), /[^a-z0-9-]/, `${key}: no page slug or collection id can give this key`);
    assert.ok(!EARLIER_INDEX_DRAFT_KEYS.includes(key));
  }
});

test('the editor names the index files only through the module, and the Vipps function reads the same index', () => {
  const dirs = ['editor/src/state/', 'editor/src/lib/', 'editor/src/panels/'];
  for (const dir of dirs) {
    for (const name of readdirSync(new URL(dir, ROOT))) {
      if (name === 'collection-index.js' || !/\.(js|svelte)$/.test(name)) continue;
      const src = readFileSync(new URL(dir + name, ROOT), 'utf8');
      assert.ok(!src.includes('samlinger.json') && !src.includes('collections.json'), `${dir}${name} names an index file`);
    }
  }
  const checkout = readFileSync(new URL('template/functions/api/vipps/checkout.js', ROOT), 'utf8');
  assert.ok(checkout.includes(`/${INDEX_PATH}`));
});

test('fetchIndex: the index, or null when missing, not JSON or not an index', async () => {
  const fetchFn = serve({
    '/content/samlinger.json': '{"version":1,"samlinger":["nyheter"]}',
    '/content/collections.json': '{"version":1}',
  });
  assert.deepEqual(await fetchIndex(INDEX_PATH, fetchFn), { version: 1, samlinger: ['nyheter'] });
  assert.equal(await fetchIndex(LEGACY_INDEX_PATH, fetchFn), null, 'no samlinger list');
  assert.equal(await fetchIndex(LEGACY_INDEX_PATH, serve({})), null, '404');
  const html = async () => ({ ok: true, json: async () => { throw new SyntaxError('<!doctype html>'); } });
  assert.equal(await fetchIndex(INDEX_PATH, html), null, 'a fallback page served with 200');
  assert.equal(await fetchIndex(INDEX_PATH, async () => { throw new TypeError('offline'); }), undefined, 'a failed request is not a missing file');
});

test('mergeIds: first order kept, new ids appended once, gaps skipped', () => {
  assert.deepEqual(mergeIds(['a', 'b'], ['b', 'c'], null, ['a', 'd']), ['a', 'b', 'c', 'd']);
  assert.deepEqual(mergeIds(undefined, ['x', 'x', '', 3]), ['x']);
  assert.deepEqual(mergeIds(), []);
});

test('readIndexes: the ids only the legacy index lists, none without one, and none while its deletion awaits the deploy', async () => {
  const site = serve({
    '/content/samlinger.json': '{"version":1,"samlinger":["nyheter","produkter"]}',
    '/content/collections.json': '{"version":1,"samlinger":["f","nyheter"]}',
  });
  assert.deepEqual(await readIndexes(site, storage()), { index: { version: 1, samlinger: ['nyheter', 'produkter'] }, legacy: ['f'] });
  const marked = storage({ [LEGACY_DELETED_KEY]: '1' });
  assert.equal((await readIndexes(site, marked)).legacy, null, 'published deleted, not yet deployed');
  assert.ok(marked.map.has(LEGACY_DELETED_KEY), 'the marker stays while the file is served');
  const deployed = serve({ '/content/samlinger.json': '{"version":1,"samlinger":["nyheter","produkter","f"]}' });
  assert.equal((await readIndexes(deployed, marked)).legacy, null);
  assert.ok(!marked.map.has(LEGACY_DELETED_KEY), 'the marker goes once the file is gone');
  const offline = storage({ [LEGACY_DELETED_KEY]: '1' });
  const failed = await readIndexes(async () => { throw new TypeError('offline'); }, offline);
  assert.ok(offline.map.has(LEGACY_DELETED_KEY), 'a failed request keeps the marker');
  assert.deepEqual(failed, { index: { version: 1, samlinger: [] }, legacy: null, unreadable: true }, 'a failed request is told from a missing index');
  assert.equal((await readIndexes(serve({}), storage())).unreadable, undefined, 'a missing index is simply none');
  assert.deepEqual(await readIndexes(serve({}), storage()), { index: { version: 1, samlinger: [] }, legacy: null });
  const subset = serve({
    '/content/samlinger.json': '{"version":1,"samlinger":["nyheter"]}',
    '/content/collections.json': '{"version":1,"samlinger":["nyheter"]}',
  });
  assert.deepEqual((await readIndexes(subset, storage())).legacy, [], 'a legacy index with nothing of its own');
});

test('earlierDrafts: both earlier keys joined; a page draft under the same key is left alone', () => {
  assert.deepEqual(earlierDrafts(storage()), { ids: null, keys: [] });
  assert.deepEqual(earlierDrafts(storage({ 'urd-draft-collections': '{oops' })), { ids: null, keys: [] });
  assert.deepEqual(earlierDrafts(storage({
    'urd-draft-collections': '{"version":1,"samlinger":["f","nye"]}',
    'urd-draft-samlinger': '{"version":1,"samlinger":["nyheter","f"]}',
  })), { ids: ['f', 'nye', 'nyheter'], keys: ['urd-draft-collections', 'urd-draft-samlinger'] });
  const page = '{"id":"samlinger","title":"Samlinger","sections":[]}';
  assert.deepEqual(earlierDrafts(storage({ 'urd-draft-samlinger': page })), { ids: null, keys: [] }, 'the draft of a page called «Samlinger»');
  assert.deepEqual(earlierDrafts(storage({ [INDEX_DRAFT_KEY]: '{"samlinger":["a"]}' })), { ids: null, keys: [] }, 'the current key is not an earlier draft');
});

test('openingIds: a site with collections only in samlinger.json shows them', () => {
  assert.deepEqual(openingIds({ published: ['nyheter', 'produkter'] }), ['nyheter', 'produkter']);
});

test('openingIds: a site with a collections.json keeps every collection in it', () => {
  assert.deepEqual(openingIds({ published: ['nyheter', 'produkter'], legacy: ['f', 'butikk'] }), ['nyheter', 'produkter', 'f', 'butikk']);
  assert.deepEqual(openingIds({ published: [], legacy: ['butikk'] }), ['butikk'], 'no samlinger.json');
});

test('openingIds: an earlier draft gets the ids it never saw', () => {
  // Made against collections.json: it added «nye» and removed «f»; samlinger.json was unknown to it.
  assert.deepEqual(
    openingIds({ published: ['nyheter', 'produkter'], legacy: ['f'], earlier: ['nye'] }),
    ['nyheter', 'produkter', 'nye', 'f'],
    'an id is kept rather than dropped, since a dropped id has its file deleted at the next publish',
  );
});

test('openingIds: a draft under the current key is kept, so a removal in it stays', () => {
  assert.deepEqual(openingIds({ published: ['nyheter', 'produkter'], legacy: ['f'], draft: ['nyheter', 'produkter'] }), ['nyheter', 'produkter']);
});

test('indexBaseline: samlinger.json with the ids only the legacy index lists', () => {
  assert.deepEqual(indexBaseline({ version: 1, samlinger: ['nyheter'] }, ['f']), { version: 1, samlinger: ['nyheter', 'f'] });
  assert.deepEqual(indexBaseline({ version: 1, samlinger: ['nyheter'] }, null), { version: 1, samlinger: ['nyheter'] });
});

test('a collection only the legacy index lists, removed before the first publish, stays removed after a reload; Discard drafts brings it back', () => {
  local.clear();
  const index = { version: 1, samlinger: ['nyheter', 'produkter'] };
  const legacy = ['f'];
  const open = () => {
    const baseline = indexBaseline(index, legacy);
    const store = createDraftStore(INDEX_DRAFT_KEY, () => baseline);
    store.data.samlinger = openingIds({ published: index.samlinger, legacy, draft: store.hasDraft() ? store.data.samlinger : null });
    store.save();
    return store;
  };
  let store = open();
  assert.deepEqual(store.data.samlinger, ['nyheter', 'produkter', 'f']);
  assert.equal(indexPending(store.hasDraft(), legacy), true, '«Unpublished» before the first publish');
  store.data.samlinger = ['nyheter', 'produkter'];
  store.save();
  store = open();
  assert.deepEqual(store.data.samlinger, ['nyheter', 'produkter'], 'the removal survives the reload');
  assert.deepEqual(store.reset().samlinger, ['nyheter', 'produkter', 'f'], 'Discard drafts');
  local.clear();
});

test('indexPending: a draft, or ids only the legacy index lists', () => {
  assert.equal(indexPending(false, null), false);
  assert.equal(indexPending(false, []), false, 'a legacy index with nothing of its own needs no publish');
  assert.equal(indexPending(true, null), true);
  assert.equal(indexPending(false, ['f']), true, 'also when the draft equals samlinger.json');
});

test('planIndexPublish: the merge is written and the legacy index deleted', () => {
  assert.deepEqual(
    planIndexPublish({ ids: ['nyheter', 'produkter', 'f'], hasDraft: true, published: ['nyheter', 'produkter'], legacy: ['f'] }),
    { writeIndex: true, deleteLegacy: true, deleteIds: [] },
  );
});

test('planIndexPublish: a collection only the legacy index listed is removed for good', () => {
  // «f» removed in the panel leaves the index equal to samlinger.json, so no draft is left.
  assert.deepEqual(
    planIndexPublish({ ids: ['nyheter', 'produkter'], hasDraft: false, published: ['nyheter', 'produkter'], legacy: ['f'] }),
    { writeIndex: true, deleteLegacy: true, deleteIds: ['f'] },
  );
});

test('planIndexPublish: without a legacy index, as before', () => {
  assert.deepEqual(
    planIndexPublish({ ids: ['nyheter'], hasDraft: true, published: ['nyheter', 'gammel'], legacy: null }),
    { writeIndex: true, deleteLegacy: false, deleteIds: ['gammel'] },
  );
  assert.deepEqual(
    planIndexPublish({ ids: ['nyheter'], hasDraft: false, published: ['nyheter', 'gammel'], legacy: null }),
    { writeIndex: false, deleteLegacy: false, deleteIds: [] },
    'a changed collection file alone never touches the index',
  );
  assert.deepEqual(
    planIndexPublish({ ids: ['nyheter'], hasDraft: false, published: ['nyheter'], legacy: [] }),
    { writeIndex: false, deleteLegacy: true, deleteIds: [] },
    'a legacy index whose ids the index holds goes with any publish of the collections',
  );
});

test('the template ships one collection index, and its ids match the collection files', () => {
  assert.equal(existsSync(new URL(LEGACY_INDEX_PATH, TEMPLATE)), false, 'no legacy index in the template');
  const index = JSON.parse(readFileSync(new URL(INDEX_PATH, TEMPLATE), 'utf8'));
  const files = readdirSync(new URL('content/samlinger/', TEMPLATE));
  const ids = files.filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -'.json'.length));
  assert.deepEqual([...index.samlinger].sort(), ids.sort());
  for (const feed of files.filter((f) => f.endsWith('.xml'))) {
    assert.ok(ids.includes(feed.slice(0, -'.xml'.length)), `${feed} belongs to a listed collection`);
  }
});
