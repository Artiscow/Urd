/**
 * The update plan (ADR-0014): pure logic, tree listings in and a change set out.
 * The scenarios mirror the rule table in ADR-0014 decision 3, including the engine swap (the old versioned folder is deleted, the new one added) which falls out of the generic rules without dedicated code.
 * The update function (functions/api/github/update.js) is run against a stand-in GitHub at the end; nothing leaves the machine.
 */
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  planUpdate, highestVersionTag, isOlderTag, VERSION_TAG_RE, isAtomPath, chunkEntries, blobBatch, BLOB_BATCH, BLOB_ROOM, travelsAsBlob,
} from '../template/functions/_lib/update-plan.js';
import { engineImport } from './_engine.mjs';

const { parseEngineVersion } = await engineImport('plugins.js');

const change = (plan, path) => plan.changes.find((c) => c.path === path);

test('highestVersionTag: the highest version wins, other names are ignored', () => {
  assert.equal(highestVersionTag(['v0.6.8', 'v0.6.9', 'v0.6.10']), 'v0.6.10');
  assert.equal(highestVersionTag(['v0.9.1', 'v1.0.0', 'v0.10.2']), 'v1.0.0');
  assert.equal(highestVersionTag(['v0.6.9-rc.1', 'utkast', 'v0.6']), null);
  assert.equal(highestVersionTag(['v0.6.9-rc.1', 'v0.6.8']), 'v0.6.8');
  assert.equal(highestVersionTag([]), null);
  assert.equal(highestVersionTag(undefined), null);
});

test('highestVersionTag: numbers after the third rank after their three and before the next patch', () => {
  assert.equal(highestVersionTag(['v0.7.6', 'v0.7.6.2', 'v0.7.6.1']), 'v0.7.6.2');
  assert.equal(highestVersionTag(['v0.7.6.2', 'v0.7.7', 'v0.7.6.10']), 'v0.7.7');
  assert.equal(highestVersionTag(['v0.7.6.9', 'v0.7.6.10']), 'v0.7.6.10');
  assert.equal(highestVersionTag(['v0.7.6.2', 'v0.7.6.2.1', 'v0.7.6.1.5.3']), 'v0.7.6.2.1');
  assert.equal(highestVersionTag(['v0.7.6.1', 'v0.7.6.0.4']), 'v0.7.6.1');
  assert.equal(highestVersionTag(['v0.7.6', 'v0.7.6.0.4']), 'v0.7.6.0.4');
  assert.equal(highestVersionTag(['v0.7.6.2-rc.1', 'v0.7.6.2.1-rc.1']), null);
  for (const good of ['v0.7.6', 'v0.7.6.2', 'v0.7.6.2.1', 'v0.7.6.0.2', 'v1.0.0.1.2.3']) {
    assert.ok(VERSION_TAG_RE.test(good), good);
  }
  for (const bad of ['v0.7.6b', '0.7.6.2', 'v0.7', 'v0.7.7.0', 'v0.7.7.1.0', 'v0.7.7.01', 'v0.07.7', 'v0.7.6.2.']) {
    assert.ok(!VERSION_TAG_RE.test(bad), bad);
  }
  assert.equal(highestVersionTag(['v0.7.7.0', 'v0.7.7']), 'v0.7.7');
});

test('isOlderTag: an update never goes back to an older version; equal, newer or non-version names are not older', () => {
  assert.equal(isOlderTag('v0.7.10', 'v0.7.11'), true);
  assert.equal(isOlderTag('v0.7.11', 'v0.7.11.1'), true);
  assert.equal(isOlderTag('v0.6.9', 'v0.7.0'), true);
  assert.equal(isOlderTag('v0.7.11', 'v0.7.11'), false);
  assert.equal(isOlderTag('v0.7.12', 'v0.7.11'), false);
  assert.equal(isOlderTag('v0.7.11.1', 'v0.7.11'), false);
  assert.equal(isOlderTag('main', 'v0.7.11'), false);
  assert.equal(isOlderTag('v0.7.10', 'nope'), false);
  const src = readFileSync(new URL('../template/functions/api/github/update.js', import.meta.url), 'utf8');
  assert.match(src, /if \(isOlderTag\(target, `v\$\{engine\}`\)\)/, 'the update refuses a target older than the installed engine');
});

test('VERSION_TAG_RE and the engine\'s parseEngineVersion accept the same versions', () => {
  const probes = ['0.7.7', '0.7.7.1', '0.7.7.0.1', '1.0.0.1.2.3', '10.20.30.40', '0.7', '0.7.7.0', '0.7.7.1.0', '0.7.7.01', '0.07.7', '00.7.7', '0.7.6b', '0.7.6-rc.1', '0.7.6.', '.0.7.6', '0..7.6', ''];
  for (const v of probes) {
    assert.equal(VERSION_TAG_RE.test(`v${v}`), parseEngineVersion(v) !== null, v);
  }
});

test('isAtomPath: the engine group is locked, functions and loose root files are optional', () => {
  // 'kaker/index.html' is a page slug copy: user-named and deliberately Norwegian.
  for (const path of ['index.html', 'urd.json', 'admin/assets/editor.js',
    'assets/engine/0.7.0/boot.js', 'assets/urd/i18n.js', 'assets/styles/base.css',
    'kaker/index.html']) {
    assert.equal(isAtomPath(path), true, path);
  }
  for (const path of ['functions/api/github/update.js', 'speculation-rules.json', '.gitignore']) {
    assert.equal(isAtomPath(path), false, path);
  }
});

test('clean update: changed upstream + untouched locally is written without conflict', () => {
  const plan = planUpdate(
    { 'index.html': 'a', 'functions/f.js': 'x' },
    { 'index.html': 'b', 'functions/f.js': 'x' },
    { 'index.html': 'a', 'functions/f.js': 'x' },
  );
  assert.deepEqual(plan.changes, [{ path: 'index.html', action: 'write', atom: true, conflict: null }]);
  assert.equal(plan.upToDate, false);
});

test('engine swap: the old versioned folder is deleted, the new one added', () => {
  const plan = planUpdate(
    { 'assets/engine/0.6.8/boot.js': 'a', 'assets/urd/i18n.js': 's1' },
    { 'assets/engine/0.7.0/boot.js': 'b', 'assets/urd/i18n.js': 's2' },
    { 'assets/engine/0.6.8/boot.js': 'a', 'assets/urd/i18n.js': 's1' },
  );
  assert.deepEqual(change(plan, 'assets/engine/0.7.0/boot.js'), { path: 'assets/engine/0.7.0/boot.js', action: 'write', atom: true, conflict: null });
  assert.deepEqual(change(plan, 'assets/engine/0.6.8/boot.js'), { path: 'assets/engine/0.6.8/boot.js', action: 'delete', atom: true, conflict: null });
  assert.deepEqual(change(plan, 'assets/urd/i18n.js'), { path: 'assets/urd/i18n.js', action: 'write', atom: true, conflict: null });
});

test('a hand-edited file is flagged: edited, created and editedDelete', () => {
  // File names and contents are deliberate Norwegian fixture values.
  const plan = planUpdate(
    { 'functions/f.js': 'base', 'functions/g.js': 'base', 'functions/borte.js': 'base' },
    { 'functions/f.js': 'ny', 'functions/ny.js': 'ny' },
    { 'functions/f.js': 'redigert', 'functions/g.js': 'base', 'functions/borte.js': 'redigert', 'functions/ny.js': 'egen' },
  );
  assert.equal(change(plan, 'functions/f.js').conflict, 'edited');
  assert.equal(change(plan, 'functions/ny.js').conflict, 'created');
  assert.deepEqual(change(plan, 'functions/borte.js'), { path: 'functions/borte.js', action: 'delete', atom: false, conflict: 'editedDelete' });
  // g.js: removed upstream + untouched locally = silent deletion.
  assert.deepEqual(change(plan, 'functions/g.js'), { path: 'functions/g.js', action: 'delete', atom: false, conflict: null });
});

test('unchanged upstream is never touched, but restored if missing', () => {
  const plan = planUpdate(
    { 'functions/f.js': 'x', 'functions/slettet.js': 'x', 'index.html': 'a' },
    { 'functions/f.js': 'x', 'functions/slettet.js': 'x', 'index.html': 'b' },
    { 'functions/f.js': 'LOKALT-ENDRET', 'index.html': 'a' },
  );
  // Local edits to a file upstream did not touch persist silently.
  assert.equal(change(plan, 'functions/f.js'), undefined);
  // An owned file the user deleted by accident is restored.
  assert.deepEqual(change(plan, 'functions/slettet.js'), { path: 'functions/slettet.js', action: 'write', atom: false, conflict: null });
});

test('user-owned paths and _headers are always outside the plan', () => {
  const plan = planUpdate(
    { 'content/site.json': 'a', '_headers': 'h1', 'media/x.webp': 'a' },
    { 'content/site.json': 'b', '_headers': 'h2', 'media/x.webp': 'b' },
    { 'content/site.json': 'mitt', '_headers': 'mitt', 'media/x.webp': 'mitt' },
  );
  assert.deepEqual(plan.changes, []);
  assert.equal(plan.upToDate, true);
});

test('already at the target content gives no change', () => {
  const plan = planUpdate(
    { 'index.html': 'a' },
    { 'index.html': 'b' },
    { 'index.html': 'b' },
  );
  assert.equal(plan.upToDate, true);
});

test('chunkEntries: splits into groups and preserves the order', () => {
  const entries = Array.from({ length: 7 }, (_, i) => i);
  assert.deepEqual(chunkEntries(entries, 3), [[0, 1, 2], [3, 4, 5], [6]]);
  assert.deepEqual(chunkEntries([], 3), []);
  assert.equal(chunkEntries(entries).length, 1);
});

test('blobBatch: a batch of the files the site does not hold, and all of them with the commit once few enough are left', () => {
  const paths = Array.from({ length: 40 }, (_, i) => `admin/designs/d${i}.webp`);
  const none = blobBatch(paths, new Set());
  assert.deepEqual(none.batch, paths.slice(0, BLOB_BATCH));
  assert.equal(none.commit, false);
  assert.equal(none.copied, BLOB_BATCH);
  assert.equal(none.total, 40);
  // What the site already holds is skipped, wherever it stands in the plan.
  const some = blobBatch(paths, new Set([paths[0], paths[5], paths[39]]));
  assert.equal(some.batch.includes(paths[0]), false);
  assert.equal(some.batch[0], paths[1]);
  assert.equal(some.copied, 3 + BLOB_BATCH);
  // With few enough left, the call copies them and commits.
  const last = blobBatch(paths, new Set(paths.slice(BLOB_ROOM)));
  assert.deepEqual(last.batch, paths.slice(0, BLOB_ROOM));
  assert.equal(last.commit, true);
  assert.equal(last.copied, 40);
  assert.equal(blobBatch(paths, new Set(paths.slice(BLOB_ROOM - 1))).commit, true);
  assert.equal(blobBatch(paths, new Set(paths.slice(BLOB_ROOM + 1))).commit, false);
  assert.deepEqual(blobBatch(paths, new Set(paths)), { batch: [], copied: 40, total: 40, commit: true });
  assert.deepEqual(blobBatch([], new Set()), { batch: [], copied: 0, total: 0, commit: true });
  // Two subrequests a file beside the call's own (about 7 copying, 16 committing) stay under the free plan's 50; the function's own count is tested below.
  assert.ok(2 * BLOB_BATCH + 7 <= 50);
  assert.ok(2 * BLOB_ROOM + 16 <= 50);
});

test('travelsAsBlob: only a blob GraphQL calls text and gives whole travels inline', () => {
  assert.equal(travelsAsBlob({ isBinary: false, isTruncated: false }), false);
  assert.equal(travelsAsBlob({ isBinary: true, isTruncated: false }), true);
  assert.equal(travelsAsBlob({ isBinary: false, isTruncated: true }), true);
  // An encoding GraphQL cannot tell, and a file the reply leaves out, are copied as they are.
  assert.equal(travelsAsBlob({ isBinary: null, isTruncated: false }), true);
  assert.equal(travelsAsBlob(null), true);
  assert.equal(travelsAsBlob(undefined), true);
});

/* ---------- The update function itself, against a stand-in GitHub ---------- */

const { onRequestGet: updateCheck, onRequestPost: updateRun } = await import('../template/functions/api/github/update.js');

const UPDATE_ENV = { GITHUB_REPO: 'site/repo', GITHUB_CLIENT_ID: 'id', GITHUB_CLIENT_SECRET: 'secret', ALLOWED_LOGINS: 'owner', URD_TEMPLATE_REPO: 'up/template' };
const reply = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const b64 = (text) => Buffer.from(text).toString('base64');
const realFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = realFetch; });

/**
 * A stand-in GitHub for the updater: the site's repository at HEAD `head` holding `site` (path -> blob sha, urd.json naming `engine`), and the template's trees by tag.
 * `binary` lists the target paths GraphQL calls binary, `held` the blob shas the site's repository holds, `release` answers the template's release of a tag.
 * `headers` holds the `_headers` texts: the site's at `site`, and each tag's under `tags`; `fail` makes their GraphQL read fail.
 */
function updateRepo({ engine = '0.7.11', site, tags, texts = {}, binary = [], held = [], headers = {}, release = () => reply({ message: 'Not Found' }, 404) }) {
  const seen = { calls: [], trees: [], commits: [], refs: [], blobPosts: 0 };
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(String(url));
    const path = u.pathname;
    const method = init.method ?? 'GET';
    seen.calls.push(`${method} ${path}`);
    if (path === '/user') return reply({ login: 'owner' });
    if (path === '/repos/site/repo/git/ref/heads/main') return reply({ object: { sha: 'head' } });
    if (path === '/repos/site/repo/git/trees/head') return reply({ truncated: false, tree: Object.entries(site).map(([p, sha]) => ({ path: p, sha, type: 'blob', mode: '100644' })) });
    if (path === '/repos/site/repo/git/blobs/urd-site') return reply({ content: b64(JSON.stringify({ engine })) });
    if (path === '/repos/up/template/tags') return reply(Object.keys(tags).map((name) => ({ name })));
    const tag = path.match(/^\/repos\/up\/template\/git\/trees\/(.+)$/)?.[1];
    if (tag) return tags[tag] ? reply({ tree: Object.entries(tags[tag]).map(([p, sha]) => ({ path: p, sha, type: 'blob', mode: '100644' })) }) : reply({ message: 'Not Found' }, 404);
    const released = path.match(/^\/repos\/up\/template\/releases\/tags\/(.+)$/)?.[1];
    if (released) return release(released);
    if (path.startsWith('/repos/up/template/git/blobs/')) return reply({ content: b64(`bytes of ${path.split('/').pop()}`) });
    if (path === '/repos/site/repo/git/blobs' && method === 'POST') { seen.blobPosts++; return reply({ sha: 'posted' }, 201); }
    if (path === '/graphql') {
      const query = JSON.parse(init.body).query;
      if (/\bt0: object/.test(query)) {
        if (headers.fail) return reply({ message: 'refused' }, 400);
        const template = {};
        for (const m of query.matchAll(/(t\d+): object\(expression: "([^":]+):_headers"\)/g)) template[m[1]] = typeof headers.tags?.[m[2]] === 'string' ? { text: headers.tags[m[2]] } : null;
        return reply({ data: { template, site: { s: typeof headers.site === 'string' ? { text: headers.site } : null } } });
      }
      if (query.includes('isBinary')) {
        const template = {};
        for (const m of query.matchAll(/(f\d+): object\(expression: "[^":]+:([^"]+)"\)/g)) template[m[1]] = { isBinary: binary.includes(m[2]), isTruncated: false };
        const repo = {};
        for (const m of query.matchAll(/(h\d+): object\(oid: "([^"]+)"\)/g)) repo[m[1]] = held.includes(m[2]) ? { oid: m[2] } : null;
        return reply({ data: { template, site: repo } });
      }
      const repository = {};
      for (const m of query.matchAll(/(f\d+): object\(expression: "[^":]+:([^"]+)"\)/g)) repository[m[1]] = { text: texts[m[2]] ?? `text of ${m[2]}` };
      return reply({ data: { repository } });
    }
    if (path === '/repos/site/repo/git/commits/head') return reply({ tree: { sha: 'thead' } });
    if (path === '/repos/site/repo/git/trees' && method === 'POST') { seen.trees.push(JSON.parse(init.body)); return reply({ sha: `t${seen.trees.length}` }, 201); }
    if (path === '/repos/site/repo/git/commits' && method === 'POST') { seen.commits.push(JSON.parse(init.body)); return reply({ sha: 'cnew' }, 201); }
    if (path === '/repos/site/repo/git/refs/heads/main' && method === 'PATCH') { seen.refs.push(JSON.parse(init.body)); return reply({ object: { sha: 'cnew' } }); }
    return reply({ message: `unexpected ${method} ${path}` }, 404);
  };
  return seen;
}

const updateCall = (method, { body, query = '' } = {}) => new Request(`https://site.pages.dev/api/github/update${query}`, {
  method,
  headers: { cookie: 'urd_gh=tok', 'sec-fetch-site': 'same-origin', ...(body ? { 'content-type': 'application/json' } : {}) },
  ...(body ? { body: JSON.stringify(body) } : {}),
});

/** The template at the installed v0.7.11 and the offered v0.7.12: an engine swap, a new root index.html, and a page copy the template ships itself. */
const TAGS = {
  'v0.7.11': { 'urd.json': 'urd-1', 'index.html': 'idx-1', 'assets/engine/0.7.11/boot.js': 'boot-1', 'personvern/index.html': 'idx-1' },
  'v0.7.12': { 'urd.json': 'urd-2', 'index.html': 'idx-2', 'assets/engine/0.7.12/boot.js': 'boot-2', 'personvern/index.html': 'idx-2' },
};
const SITE = { 'urd.json': 'urd-site', 'index.html': 'idx-1', 'assets/engine/0.7.11/boot.js': 'boot-1', 'personvern/index.html': 'idx-1', 'om-oss/index.html': 'idx-1', 'nyheter/index.html': 'idx-1', 'kaker/index.html': 'idx-2', 'content/site.json': 'c1' };

test('the update writes every page copy in the same commit as the engine swap, each path once, from the target\'s root index.html', async () => {
  const texts = { 'index.html': '<!doctype html><title>v0.7.12</title>' };
  for (const [rootDir, site] of [['', SITE], ['template', Object.fromEntries(Object.entries(SITE).map(([p, sha]) => [`template/${p}`, sha]).concat([['README.md', 'r1']]))]]) {
    const seen = updateRepo({ site, tags: TAGS, texts });
    const res = await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head' } }), env: { ...UPDATE_ENV, ...(rootDir ? { GITHUB_ROOT_DIR: rootDir } : {}) } });
    assert.equal(res.status, 200, rootDir || 'at the root');
    const prefix = rootDir ? `${rootDir}/` : '';
    assert.equal(seen.commits.length, 1, 'one commit');
    assert.equal(seen.refs.length, 1);
    assert.equal(seen.commits[0].tree, `t${seen.trees.length}`, 'the commit holds the last of the chained trees');
    const entries = seen.trees.flatMap((t) => t.tree);
    const paths = entries.map((e) => e.path);
    assert.equal(new Set(paths).size, paths.length, 'each path once');
    const at = (p) => entries.find((e) => e.path === `${prefix}${p}`);
    assert.ok(at('assets/engine/0.7.12/boot.js'), 'the new engine is written');
    assert.equal(at('assets/engine/0.7.11/boot.js').sha, null, 'the old engine is deleted');
    for (const copy of ['om-oss/index.html', 'nyheter/index.html', 'index.html']) assert.equal(at(copy).content, texts['index.html'], copy);
    assert.equal(at('personvern/index.html').content, 'text of personvern/index.html', 'the template\'s own copy is written once, by the plan');
    assert.equal(at('kaker/index.html'), undefined, 'a copy that is already the target\'s is left');
    assert.ok(!paths.some((p) => p.includes('content/')), 'the site\'s content is never touched');
    assert.deepEqual(await res.json(), { sha: 'cnew', current: '0.7.11', target: 'v0.7.12', written: 6, deleted: 1 });
  }

  // A root index.html the site already holds at the target still gives its text to the copies left behind.
  const seen = updateRepo({ site: { ...SITE, 'index.html': 'idx-2' }, tags: TAGS, texts });
  const res = await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head' } }), env: UPDATE_ENV });
  assert.equal(res.status, 200);
  const entries = seen.trees.flatMap((t) => t.tree);
  assert.equal(entries.find((e) => e.path === 'index.html'), undefined);
  assert.equal(entries.find((e) => e.path === 'om-oss/index.html').content, texts['index.html']);
  assert.equal(entries.find((e) => e.path === 'nyheter/index.html').content, texts['index.html']);
});

test('the update reads the running engine from urd.json in the repository, never from the request', async () => {
  let seen = updateRepo({ site: SITE, tags: TAGS });
  let res = await updateCheck({ request: updateCall('GET', { query: '?to=v0.7.12&engine=0.7.10&current=0.7.10' }), env: UPDATE_ENV });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).current, '0.7.11');
  assert.ok(seen.calls.includes('GET /repos/up/template/git/trees/v0.7.11'), 'the baseline is the repository\'s version');
  assert.ok(!seen.calls.includes('GET /repos/up/template/git/trees/v0.7.10'));

  seen = updateRepo({ site: SITE, tags: TAGS });
  res = await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head', engine: '0.7.10', current: '0.7.10', from: 'v0.7.10' } }), env: UPDATE_ENV });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).current, '0.7.11');
  assert.ok(!seen.calls.includes('GET /repos/up/template/git/trees/v0.7.10'));

  // The repository already at the target: nothing is written, whatever the request says it runs.
  seen = updateRepo({ engine: '0.7.12', site: SITE, tags: TAGS });
  res = await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head', engine: '0.7.11' } }), env: UPDATE_ENV });
  assert.deepEqual(await res.json(), { current: '0.7.12', target: 'v0.7.12', upToDate: true });
  assert.equal(seen.commits.length, 0);
});

test('an error reading the template\'s release never stops the update check, which still answers with the offer', async () => {
  const broken = [
    ['not found', () => reply({ message: 'Not Found' }, 404)],
    ['unreachable', () => { throw new TypeError('fetch failed'); }],
    ['not JSON', () => new Response('<html>busy</html>', { status: 200, headers: { 'content-type': 'text/html' } })],
    ['refused', () => reply({ message: 'API rate limit exceeded' }, 403)],
  ];
  for (const [kind, release] of broken) {
    updateRepo({ site: SITE, tags: TAGS, release });
    const res = await updateCheck({ request: updateCall('GET'), env: UPDATE_ENV });
    assert.equal(res.status, 200, kind);
    const data = await res.json();
    assert.equal(data.target, 'v0.7.12', kind);
    assert.equal(data.upToDate, false, kind);
    assert.ok(data.changes.some((c) => c.path === 'assets/engine/0.7.12/boot.js'), kind);
    assert.equal(data.notes, null, kind);
    assert.equal(data.release, null, kind);

    updateRepo({ engine: '0.7.12', site: SITE, tags: TAGS, release });
    const current = await updateCheck({ request: updateCall('GET'), env: UPDATE_ENV });
    assert.equal(current.status, 200, `${kind}, up to date`);
    assert.deepEqual(await current.json(), { current: '0.7.12', target: 'v0.7.12', head: 'head', upToDate: true, changes: [], release: null });
  }
});

test('an update that must continue answers 429 updateContinue with the files copied and the total, never a 2xx, and commits nothing until the last call', async () => {
  const designs = Array.from({ length: 25 }, (_, i) => `admin/designs/d${i}.webp`);
  const tags = {
    'v0.7.11': TAGS['v0.7.11'],
    'v0.7.12': { ...TAGS['v0.7.12'], ...Object.fromEntries(designs.map((p, i) => [p, `design-${i}`])) },
  };
  let seen = updateRepo({ site: SITE, tags, binary: designs });
  let res = await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head' } }), env: UPDATE_ENV });
  assert.equal(res.status, 429);
  assert.equal(res.ok, false);
  const body = await res.json();
  assert.equal(body.code, 'updateContinue');
  assert.equal(body.copied, BLOB_BATCH);
  assert.equal(body.total, designs.length);
  assert.equal(seen.blobPosts, BLOB_BATCH, 'a batch is copied');
  assert.deepEqual([seen.trees.length, seen.commits.length, seen.refs.length], [0, 0, 0], 'nothing is committed');

  // The next call finds the batch held and few enough left: it copies those and commits.
  seen = updateRepo({ site: SITE, tags, binary: designs, held: designs.slice(0, BLOB_BATCH).map((p) => tags['v0.7.12'][p]) });
  res = await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head' } }), env: UPDATE_ENV });
  assert.equal(res.status, 200);
  assert.equal(seen.blobPosts, designs.length - BLOB_BATCH);
  assert.equal(seen.commits.length, 1);
  assert.ok(seen.trees.flatMap((t) => t.tree).some((e) => e.path === 'admin/designs/d0.webp' && e.sha === 'design-0'));
});

/* ---------- The site's _headers through the update function ---------- */

const OLD_HEADERS = '/*\n  X-Frame-Options: SAMEORIGIN\n  Content-Security-Policy: default-src \'self\'; connect-src \'self\'\n';
const NEW_HEADERS = '/*\n  X-Frame-Options: SAMEORIGIN\n  Strict-Transport-Security: max-age=31536000\n  Content-Security-Policy: default-src \'self\'; connect-src \'self\'\n';
const HEADER_TAGS = { 'v0.7.10': OLD_HEADERS, 'v0.7.11': OLD_HEADERS, 'v0.7.12': NEW_HEADERS };
const headersEntry = (seen) => seen.trees.flatMap((t) => t.tree).find((e) => e.path.endsWith('_headers'));

test('the check offers an unedited _headers for the update and the run writes it in the same commit, unless the owner keeps their own', async () => {
  const site = { ...SITE, _headers: 'h-old' };
  updateRepo({ site, tags: TAGS, headers: { site: OLD_HEADERS, tags: HEADER_TAGS } });
  const check = await (await updateCheck({ request: updateCall('GET'), env: UPDATE_ENV })).json();
  const { state, text, added, site: own, from, edit } = check.headers;
  assert.deepEqual({ state, text, added }, { state: 'unedited', text: NEW_HEADERS, added: [] });
  assert.deepEqual([own, from], [OLD_HEADERS, OLD_HEADERS], 'the site\'s file and the release it is closest to, for the words');
  assert.equal(edit, 'https://github.com/site/repo/edit/main/_headers', 'the file\'s page to edit on GitHub');
  assert.ok(!check.changes.some((c) => c.path === '_headers'), 'the file stands outside the plan of the other files');

  let seen = updateRepo({ site, tags: TAGS, headers: { site: OLD_HEADERS, tags: HEADER_TAGS } });
  let res = await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head', headers: NEW_HEADERS } }), env: UPDATE_ENV });
  assert.equal(res.status, 200);
  assert.equal(seen.commits.length, 1, 'one commit');
  assert.equal(headersEntry(seen).content, NEW_HEADERS);
  assert.equal((await res.json()).written, 7, 'counted among the files written');

  for (const [why, body] of [
    ['held back like any optional file', { headers: NEW_HEADERS, skip: ['_headers'] }],
    ['a run that was shown no file', {}],
    ['a run shown another text than the plan gives now', { headers: OLD_HEADERS }],
  ]) {
    seen = updateRepo({ site, tags: TAGS, headers: { site: OLD_HEADERS, tags: HEADER_TAGS } });
    res = await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head', ...body } }), env: UPDATE_ENV });
    assert.equal(res.status, 200, why);
    assert.equal(seen.commits.length, 1, why);
    assert.equal(headersEntry(seen), undefined, why);
  }
});

test('the run carries the owner\'s added hosts into the new _headers, and leaves a file edited otherwise to the owner', async () => {
  const added = OLD_HEADERS.replace("connect-src 'self'", "connect-src 'self' https://script.google.com");
  const merged = NEW_HEADERS.replace("connect-src 'self'", "connect-src 'self' https://script.google.com");
  updateRepo({ site: SITE, tags: TAGS, headers: { site: added, tags: HEADER_TAGS } });
  const check = await (await updateCheck({ request: updateCall('GET'), env: UPDATE_ENV })).json();
  assert.deepEqual({ ...check.headers, site: undefined, from: undefined, edit: undefined }, { state: 'added', text: merged, added: ['connect-src https://script.google.com'], site: undefined, from: undefined, edit: undefined });
  let seen = updateRepo({ site: SITE, tags: TAGS, headers: { site: added, tags: HEADER_TAGS } });
  await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head', headers: merged } }), env: UPDATE_ENV });
  assert.equal(headersEntry(seen).content, merged);

  const edited = OLD_HEADERS.replace('SAMEORIGIN', 'DENY');
  updateRepo({ site: SITE, tags: TAGS, headers: { site: edited, tags: HEADER_TAGS } });
  const by = await (await updateCheck({ request: updateCall('GET'), env: UPDATE_ENV })).json();
  assert.deepEqual({ state: by.headers.state, text: by.headers.text, added: by.headers.added }, { state: 'edited', text: NEW_HEADERS, added: [] }, 'the template\'s text, to copy by hand');
  assert.equal(by.headers.site, edited, 'with the site\'s own file');
  assert.equal(by.headers.from, OLD_HEADERS, 'and the release it is closest to, which the edits by hand start from');
  seen = updateRepo({ site: SITE, tags: TAGS, headers: { site: edited, tags: HEADER_TAGS } });
  await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head', headers: NEW_HEADERS } }), env: UPDATE_ENV });
  assert.equal(headersEntry(seen), undefined, 'never written, whatever the run is sent');
});

test('at the installed version the check offers the site\'s _headers alone, and the run commits it alone', async () => {
  updateRepo({ engine: '0.7.12', site: SITE, tags: TAGS, headers: { site: OLD_HEADERS, tags: HEADER_TAGS } });
  const check = await (await updateCheck({ request: updateCall('GET'), env: UPDATE_ENV })).json();
  assert.equal(check.upToDate, true);
  assert.deepEqual({ state: check.headers.state, text: check.headers.text }, { state: 'unedited', text: NEW_HEADERS }, 'a file from a release before the installed one');

  for (const site of [NEW_HEADERS, NEW_HEADERS.replace('SAMEORIGIN', 'DENY')]) {
    updateRepo({ engine: '0.7.12', site: SITE, tags: TAGS, headers: { site, tags: HEADER_TAGS } });
    assert.equal((await (await updateCheck({ request: updateCall('GET'), env: UPDATE_ENV })).json()).headers, undefined, 'nothing offered where it is current or edited');
  }

  let seen = updateRepo({ engine: '0.7.12', site: SITE, tags: TAGS, headers: { site: OLD_HEADERS, tags: HEADER_TAGS } });
  const res = await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head', headers: NEW_HEADERS } }), env: UPDATE_ENV });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { sha: 'cnew', current: '0.7.12', target: 'v0.7.12', upToDate: true, written: 1, deleted: 0 });
  assert.deepEqual(seen.trees.flatMap((t) => t.tree), [{ path: '_headers', mode: '100644', type: 'blob', content: NEW_HEADERS }], 'the file alone');
  assert.match(seen.commits[0].message, /security headers/);

  seen = updateRepo({ engine: '0.7.12', site: SITE, tags: TAGS, headers: { site: OLD_HEADERS, tags: HEADER_TAGS } });
  await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head', headers: NEW_HEADERS, skip: ['_headers'] } }), env: UPDATE_ENV });
  assert.equal(seen.commits.length, 0, 'kept by the owner');
  seen = updateRepo({ engine: '0.7.12', site: SITE, tags: TAGS, headers: { site: OLD_HEADERS, tags: HEADER_TAGS } });
  await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head' } }), env: UPDATE_ENV });
  assert.equal(seen.commits.length, 0, 'a run that was shown no file');
  for (const [why, headers, shown] of [
    ['a text other than the plan gives now', { site: OLD_HEADERS, tags: HEADER_TAGS }, OLD_HEADERS],
    ['texts that cannot be read', { site: OLD_HEADERS, tags: HEADER_TAGS, fail: true }, NEW_HEADERS],
  ]) {
    seen = updateRepo({ engine: '0.7.12', site: SITE, tags: TAGS, headers });
    const refused = await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head', headers: shown } }), env: UPDATE_ENV });
    assert.equal(refused.status, 409, why);
    assert.equal((await refused.json()).code, 'updateRace', `${why}: the panel says so and checks again`);
    assert.equal(seen.commits.length, 0, why);
  }
  seen = updateRepo({ engine: '0.7.12', site: SITE, tags: TAGS, headers: { site: OLD_HEADERS, tags: HEADER_TAGS } });
  const race = await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'older', headers: NEW_HEADERS } }), env: UPDATE_ENV });
  assert.equal(race.status, 409, 'a repository that moved since the check');
  assert.equal(seen.commits.length, 0);
});

test('a failed or partial read of the texts writes no _headers: the check offers none, the run commits the rest, and additions wait for every release', async () => {
  const site = OLD_HEADERS.replace("connect-src 'self'", "connect-src 'self' https://script.google.com");
  updateRepo({ site: SITE, tags: TAGS, headers: { site: OLD_HEADERS, tags: HEADER_TAGS, fail: true } });
  let check = await (await updateCheck({ request: updateCall('GET'), env: UPDATE_ENV })).json();
  assert.equal(check.upToDate, false, 'the check still answers with the update');
  assert.equal(check.headers, null);
  let seen = updateRepo({ site: SITE, tags: TAGS, headers: { site: OLD_HEADERS, tags: HEADER_TAGS, fail: true } });
  const res = await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head', headers: NEW_HEADERS } }), env: UPDATE_ENV });
  assert.equal(res.status, 200, 'the update itself goes through');
  assert.equal(seen.commits.length, 1);
  assert.equal(headersEntry(seen), undefined);

  // The installed version's text unread: an exact match of another release is still written, additions are not.
  const partial = { 'v0.7.10': OLD_HEADERS, 'v0.7.12': NEW_HEADERS };
  const listed = { ...TAGS, 'v0.7.10': {} };
  updateRepo({ site: SITE, tags: listed, headers: { site: OLD_HEADERS, tags: partial } });
  check = await (await updateCheck({ request: updateCall('GET'), env: UPDATE_ENV })).json();
  assert.equal(check.headers.state, 'unedited');
  updateRepo({ site: SITE, tags: listed, headers: { site, tags: partial } });
  check = await (await updateCheck({ request: updateCall('GET'), env: UPDATE_ENV })).json();
  assert.equal(check.headers.state, 'edited');

  // A full page of tags may leave releases out: additions wait the same way.
  const many = { ...TAGS, ...Object.fromEntries(Array.from({ length: 98 }, (_, i) => [`v0.6.${i + 1}`, {}])) };
  updateRepo({ site: SITE, tags: many, headers: { site, tags: HEADER_TAGS } });
  check = await (await updateCheck({ request: updateCall('GET'), env: UPDATE_ENV })).json();
  assert.equal(check.headers.state, 'edited');
});

test('a committing call with the most files it copies, and the headers, stays under the free plan\'s 50 subrequests', async () => {
  const designs = Array.from({ length: BLOB_ROOM }, (_, i) => `admin/designs/d${i}.webp`);
  const tags = { 'v0.7.11': TAGS['v0.7.11'], 'v0.7.12': { ...TAGS['v0.7.12'], ...Object.fromEntries(designs.map((p, i) => [p, `design-${i}`])) } };
  const seen = updateRepo({ site: SITE, tags, binary: designs, headers: { site: OLD_HEADERS, tags: HEADER_TAGS } });
  const res = await updateRun({ request: updateCall('POST', { body: { to: 'v0.7.12', expect: 'head', headers: NEW_HEADERS } }), env: UPDATE_ENV });
  assert.equal(res.status, 200);
  assert.equal(seen.blobPosts, BLOB_ROOM);
  assert.ok(headersEntry(seen), 'the headers are written in it');
  assert.ok(seen.calls.length + 1 <= 50, `${seen.calls.length} calls and the deploy hook`);
});
