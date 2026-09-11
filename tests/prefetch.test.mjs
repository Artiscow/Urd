/**
 * The intent prefetch (prefetch.js): which links count as internal page
 * links, the parked store in sessionStorage (age, cap, consumed once), the
 * prefetch itself and the background revalidation. The DOM wiring is
 * browser code covered by the manual test rounds.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { internalPageFor, storePrefetched, readPrefetched, prefetchPage, revalidatePage } = await engineImport('prefetch.js');

const site = { pages: [
  { id: 'hjem', path: '/', file: 'content/pages/hjem.json' },
  { id: 'om-oss', path: '/om-oss', file: 'content/pages/om-oss.json' },
  { id: 'kaker', path: '/kaker', file: 'content/pages/kaker.json' },
] };
const here = { origin: 'https://example.test', pathname: '/' };

/** A minimal Storage. */
function fakeStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
  };
}

/** A minimal fetch: status, headers and body text per url. */
function fakeFetch(routes) {
  const calls = [];
  const fn = async (url, init = {}) => {
    calls.push({ url, headers: init.headers ?? {} });
    const r = routes[url];
    if (!r) return { ok: false, status: 404, headers: new Map(), text: async () => '' };
    const status = typeof r.status === 'function' ? r.status(init) : (r.status ?? 200);
    return {
      ok: status >= 200 && status < 300,
      status,
      headers: { get: (name) => (name.toLowerCase() === 'etag' ? r.etag ?? null : null) },
      text: async () => r.text ?? '',
    };
  };
  fn.calls = calls;
  return fn;
}

test('internalPageFor: only plain internal links to another page in the register', () => {
  assert.equal(internalPageFor('/om-oss', site, here)?.id, 'om-oss');
  assert.equal(internalPageFor('/kaker/', site, here)?.id, 'kaker', 'a trailing slash matches the register path');
  assert.equal(internalPageFor('https://example.test/om-oss', site, here)?.id, 'om-oss', 'absolute same-origin links count');
  assert.equal(internalPageFor('/om-oss#team', site, here)?.id, 'om-oss', 'a hash on another page is still that page');
  assert.equal(internalPageFor('/', site, here), null, 'the current page is never prefetched');
  assert.equal(internalPageFor('#top', site, here), null, 'an in-page anchor is not a page');
  assert.equal(internalPageFor('/om-oss?page=kaker', site, here), null, 'a query string is left to the server');
  assert.equal(internalPageFor('https://other.test/om-oss', site, here), null, 'another origin');
  assert.equal(internalPageFor('/admin/', site, here), null, 'a path outside the register');
  assert.equal(internalPageFor('mailto:post@example.test', site, here), null);
  assert.equal(internalPageFor('', site, here), null);
  assert.equal(internalPageFor('/om-oss', { pages: [] }, here), null, 'an empty register prefetches nothing');
});

test('parked store: read consumes the entry, respects age, and caps the number of entries', () => {
  const storage = fakeStorage();
  const t0 = 1_000_000;
  storePrefetched('content/pages/a.json', '{"a":1}', '"e1"', storage, t0);
  assert.deepEqual(readPrefetched('content/pages/a.json', storage, t0 + 1000), { page: { a: 1 }, text: '{"a":1}', etag: '"e1"' });
  assert.equal(readPrefetched('content/pages/a.json', storage, t0 + 1000), null, 'consumed once');

  storePrefetched('content/pages/b.json', '{"b":1}', null, storage, t0);
  assert.equal(readPrefetched('content/pages/b.json', storage, t0 + 6 * 60 * 1000), null, 'too old');

  storePrefetched('content/pages/c.json', 'not json', null, storage, t0);
  assert.equal(readPrefetched('content/pages/c.json', storage, t0), null, 'unparseable text is ignored');

  for (let i = 0; i < 10; i++) storePrefetched(`content/pages/p${i}.json`, '{}', null, storage, t0 + i);
  assert.equal(readPrefetched('content/pages/p0.json', storage, t0 + 20), null, 'the oldest entries are dropped past the cap');
  assert.deepEqual(readPrefetched('content/pages/p9.json', storage, t0 + 20), { page: {}, text: '{}', etag: null });
});

test('parked store: a blocked or broken storage never throws', () => {
  const broken = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }, removeItem() {} };
  assert.doesNotThrow(() => storePrefetched('content/pages/a.json', '{}', null, broken));
  assert.equal(readPrefetched('content/pages/a.json', broken), null);
  const garbage = fakeStorage();
  garbage.setItem('urd-prefetch', '[1,2');
  assert.equal(readPrefetched('content/pages/a.json', garbage), null);
});

test('prefetchPage parks the served text with its ETag; failures are silent', async () => {
  const storage = fakeStorage();
  const fetchFn = fakeFetch({ '/content/pages/om-oss.json': { text: '{"meta":{"id":"om-oss"}}', etag: '"abc"' } });
  assert.equal(await prefetchPage('content/pages/om-oss.json', { fetchFn, storage, now: 5 }), true);
  assert.deepEqual(readPrefetched('content/pages/om-oss.json', storage, 6), { page: { meta: { id: 'om-oss' } }, text: '{"meta":{"id":"om-oss"}}', etag: '"abc"' });
  assert.equal(await prefetchPage('content/pages/missing.json', { fetchFn, storage }), false);
  const failing = async () => { throw new Error('offline'); };
  assert.equal(await prefetchPage('content/pages/om-oss.json', { fetchFn: failing, storage }), false);
});

test('revalidatePage: null on 304 or the same ETag, the fresh page on a newer file', async () => {
  const notModified = fakeFetch({ '/content/pages/x.json': { status: (init) => (init.headers['If-None-Match'] === '"v1"' ? 304 : 200), etag: '"v1"', text: '{"v":1}' } });
  assert.equal(await revalidatePage('content/pages/x.json', '"v1"', { fetchFn: notModified }), null);
  assert.equal(notModified.calls[0].headers['If-None-Match'], '"v1"', 'the parked ETag is sent conditionally');

  const sameEtag = fakeFetch({ '/content/pages/x.json': { etag: '"v1"', text: '{"v":1}' } });
  assert.equal(await revalidatePage('content/pages/x.json', '"v1"', { fetchFn: sameEtag }), null);

  const newer = fakeFetch({ '/content/pages/x.json': { etag: '"v2"', text: '{"v":2}' } });
  assert.deepEqual(await revalidatePage('content/pages/x.json', '"v1"', { fetchFn: newer }), { v: 2 });

  const noEtag = fakeFetch({ '/content/pages/x.json': { text: '{"v":1}' } });
  assert.equal(await revalidatePage('content/pages/x.json', null, { fetchFn: noEtag, text: '{"v":1}' }), null, 'identical text without ETags is current');
  assert.equal(noEtag.calls[0].headers['If-None-Match'], undefined, 'no conditional header without an ETag');
});
