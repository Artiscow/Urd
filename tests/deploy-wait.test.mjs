/**
 * The deploy wait after a publish (editor/src/lib/deploy-wait.js): which
 * committed files are polled, and that the poll resolves only when the site
 * serves them byte for byte.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deployTargets, awaitServed } from '../editor/src/lib/deploy-wait.js';

const utf8 = (path, content) => ({ path, content, encoding: 'utf-8' });

test('deployTargets: utf-8 content files only, site.json first, capped', () => {
  const files = [
    utf8('content/pages/hjem.json', '{"a":1}'),
    { path: 'media/bilde-abc.webp', content: 'AAAA', encoding: 'base64' },
    utf8('content/site.json', '{"site":1}'),
    { path: 'content/pages/old.json', delete: true },
    utf8('om-oss/index.html', '<html>'),
    utf8('plugins/plugins.json', '{"enabled":[]}'),
    utf8('sitemap.xml', '<urlset/>'),
  ];
  assert.deepEqual(deployTargets(files), [
    { path: 'content/site.json', content: '{"site":1}' },
    { path: 'content/pages/hjem.json', content: '{"a":1}' },
    { path: 'plugins/plugins.json', content: '{"enabled":[]}' },
  ]);
  const many = Array.from({ length: 12 }, (_, i) => utf8(`content/pages/p${i}.json`, '{}'));
  assert.equal(deployTargets(many).length, 8, 'the poll is capped');
  assert.equal(deployTargets(many, { max: 3 }).length, 3);
  assert.deepEqual(deployTargets(undefined), []);
});

/** A fake site whose served text per path can be changed between rounds. */
function fakeSite(served) {
  const calls = [];
  const fetchFn = async (url) => {
    calls.push(url);
    const text = served[url.slice(1)];
    if (text === undefined) throw new Error('offline');
    if (text === null) return { ok: false, status: 404, text: async () => '' };
    return { ok: true, status: 200, text: async () => text };
  };
  fetchFn.calls = calls;
  return fetchFn;
}

test('awaitServed: resolves true once every target is served as committed, and stops polling matched files', async () => {
  const served = { 'content/site.json': 'old', 'content/pages/hjem.json': 'old' };
  const fetchFn = fakeSite(served);
  let rounds = 0;
  const sleep = async () => {
    rounds++;
    if (rounds === 1) served['content/site.json'] = 'new-site';
    if (rounds === 3) served['content/pages/hjem.json'] = 'new-page';
  };
  const targets = [
    { path: 'content/site.json', content: 'new-site' },
    { path: 'content/pages/hjem.json', content: 'new-page' },
  ];
  assert.equal(await awaitServed(targets, { fetchFn, sleep, attempts: 5 }), true);
  assert.equal(rounds, 3);
  assert.equal(fetchFn.calls.filter((u) => u === '/content/site.json').length, 1, 'a matched file is not fetched again');
  assert.equal(fetchFn.calls.filter((u) => u === '/content/pages/hjem.json').length, 3);
});

test('awaitServed: fetch errors and 404s count as not yet, and the wait gives up after the attempts', async () => {
  const fetchFn = fakeSite({ 'content/pages/a.json': null });
  const targets = [{ path: 'content/pages/a.json', content: 'x' }, { path: 'content/pages/missing.json', content: 'y' }];
  let rounds = 0;
  assert.equal(await awaitServed(targets, { fetchFn, sleep: async () => { rounds++; }, attempts: 4 }), false);
  assert.equal(rounds, 4);
  assert.equal(await awaitServed([], { fetchFn, sleep: async () => {} }), true, 'nothing to wait for');
});
