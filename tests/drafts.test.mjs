/**
 * The draft view (drafts.js): which drafts a browser's storage gives the page drawn with ?draft=1.
 * The boot wiring in urd.js is browser code covered by the manual test rounds.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { readDrafts } = await engineImport('drafts.js');

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
