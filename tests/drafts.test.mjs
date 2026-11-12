/**
 * The draft view (drafts.js): which drafts a browser's storage gives the page drawn with ?draft=1.
 * The boot wiring in urd.js is browser code covered by the manual test rounds.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { readDrafts, overlayDrafts, receiveLook } = await engineImport('drafts.js');

/** A minimal Storage with its keys listed, as the editor leaves it. */
function storage(entries) {
  const map = new Map(Object.entries(entries));
  return {
    get length() { return map.size; },
    key: (i) => [...map.keys()][i] ?? null,
    getItem: (k) => (map.has(k) ? map.get(k) : null),
  };
}

test('the draft view reads the site, a page by its id and every collection the editor keeps', () => {
  const drafts = readDrafts(storage({
    'urd-draft-site': JSON.stringify({ site: { title: 'Bakeriet' } }),
    'urd-draft-checkout': JSON.stringify({ meta: { id: 'checkout' }, sections: [] }),
    'urd-draft-collection-produkter': JSON.stringify({ kind: 'products', entries: [{ id: 'kake' }] }),
    'urd-draft-collections:index': JSON.stringify({ samlinger: ['produkter'] }),
    'urd-admin-lang': 'en-GB',
  }));
  assert.equal(drafts.site.site.title, 'Bakeriet');
  assert.deepEqual(drafts.page('checkout').meta, { id: 'checkout' });
  assert.equal(drafts.page('kaker'), null, 'a page without a draft is read from the server');
  assert.deepEqual(Object.keys(drafts.collections), ['produkter'], 'the collection index is no collection');
});

test('a broken draft, a draft that is no object and a storage that cannot be read give no drafts', () => {
  const drafts = readDrafts(storage({
    'urd-draft-site': '{not json',
    'urd-draft-hjem': '[1, 2]',
    'urd-draft-collection-nyheter': JSON.stringify({ kind: 'news' }),
  }));
  assert.equal(drafts.site, null);
  assert.equal(drafts.page('hjem'), null);
  assert.deepEqual(drafts.collections, {}, 'a collection without entries is left to the server file');
  const closed = { get length() { throw new Error('denied'); }, key: () => null, getItem: () => { throw new Error('denied'); } };
  const none = readDrafts(closed);
  assert.equal(none.site, null);
  assert.equal(none.page('hjem'), null);
  assert.deepEqual(none.collections, {});
});

test('a saved draft handed to a tab of its own stands over this browser\'s drafts, which fill in the rest', () => {
  const own = readDrafts(storage({
    'urd-draft-site': JSON.stringify({ site: { title: 'Mine' } }),
    'urd-draft-hjem': JSON.stringify({ meta: { id: 'hjem' }, sections: [{ id: 'mine' }] }),
    'urd-draft-om-oss': JSON.stringify({ meta: { id: 'om-oss' }, sections: [] }),
    'urd-draft-collection-kaker': JSON.stringify({ entries: [{ id: 'mine' }] }),
  }));
  const handed = readDrafts(storage({ 'urd-draft-hjem': JSON.stringify({ meta: { id: 'hjem' }, sections: [{ id: 'saved' }] }) }));
  const drafts = overlayDrafts(handed, own);
  assert.equal(drafts.page('hjem').sections[0].id, 'saved', 'the saved page');
  assert.equal(drafts.page('om-oss').meta.id, 'om-oss', 'this browser\'s other pages');
  assert.equal(drafts.site.site.title, 'Mine', 'this browser\'s site settings where none were handed over');
  assert.equal(drafts.collections.kaker.entries[0].id, 'mine');
  assert.equal(overlayDrafts(readDrafts(storage({ 'urd-draft-site': JSON.stringify({ site: { title: 'Saved' } }) })), own).site.site.title, 'Saved');
});

test('a saved draft handed over to a tab moves into its own storage once, draft keys alone, and a bad id moves nothing', () => {
  const map = (entries = {}) => {
    const m = new Map(Object.entries(entries));
    return { m, get length() { return m.size; }, key: (i) => [...m.keys()][i] ?? null, getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) };
  };
  const handed = JSON.stringify({ at: 1, texts: { 'urd-draft-hjem': '{"sections":[]}', 'urd-admin-theme': 'dark' } });
  const shared = map({ 'urd-look-abc123def': handed, 'urd-look-../x': handed });
  const own = map();
  receiveLook('abc123def', shared, own);
  assert.equal(own.getItem('urd-draft-hjem'), '{"sections":[]}');
  assert.equal(own.getItem('urd-admin-theme'), null, 'only draft keys');
  assert.equal(shared.getItem('urd-look-abc123def'), null, 'the hand-over is taken away');
  receiveLook('abc123def', shared, own);
  assert.equal(own.getItem('urd-draft-hjem'), '{"sections":[]}', 'a reload keeps what was handed over');
  const other = map();
  receiveLook('../x', shared, other);
  receiveLook(null, shared, other);
  assert.equal(other.length, 0, 'an id of another shape reads nothing');
  assert.equal(shared.getItem('urd-look-../x'), handed, 'and takes nothing away');
  // A tab whose own storage is full keeps the hand-over where it was.
  const full = { ...map(), setItem() { throw new Error('quota'); } };
  const kept = map({ 'urd-look-zzz999yyy': handed });
  receiveLook('zzz999yyy', kept, full);
  assert.equal(kept.getItem('urd-look-zzz999yyy'), handed);
});
