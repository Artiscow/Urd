/**
 * The gates in front of the site's functions: the policy every function's answer carries (functions/api/_middleware.js), publishing's JSON rule, publisher, file cap, head check, deploy hook and page copies (api/github/commit.js), the undo's latest-publish check (api/github/revert.js), the conflict check's cut-off list (api/github/latest.js), signing out (api/github/logout.js), the calendar route's own pages, host list and size limit (api/ics.js) and the address lookup for a signed-in publisher only (api/geocode.js).
 * GitHub is a stand-in fetch; nothing leaves the machine.
 */
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { onRequest as middleware } from '../template/functions/api/_middleware.js';
import { onRequestPost as commit } from '../template/functions/api/github/commit.js';
import { onRequestPost as logout } from '../template/functions/api/github/logout.js';
import { onRequestGet as ics } from '../template/functions/api/ics.js';
import { onRequestGet as geocode } from '../template/functions/api/geocode.js';
import { onRequestPost as revert } from '../template/functions/api/github/revert.js';
import { onRequestGet as latest } from '../template/functions/api/github/latest.js';

const ORIGIN = 'https://site.pages.dev';
const ENV = { GITHUB_REPO: 'site/repo', GITHUB_CLIENT_ID: 'id', GITHUB_CLIENT_SECRET: 'secret', ALLOWED_LOGINS: 'owner' };
const reply = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

const realFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = realFetch; });

/** A stand-in GitHub: the signed-in owner, and a repository whose base tree holds `paths`. Returns the calls and what was posted. */
function github(paths = []) {
  const seen = { calls: [], blobs: [], tree: null };
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(String(url));
    const method = init.method ?? 'GET';
    seen.calls.push({ url: u.href, method, headers: init.headers ?? {}, body: init.body });
    if (u.hostname !== 'api.github.com') return reply({ message: 'not GitHub' }, 404);
    const path = u.pathname;
    if (path === '/user') return reply({ login: 'owner' });
    if (path.endsWith('/git/ref/heads/main')) return reply({ object: { sha: 'c0' } });
    if (path.endsWith('/git/commits/c0')) return reply({ tree: { sha: 't0' } });
    if (path.endsWith('/git/trees/t0')) return reply({ tree: paths.map((p) => ({ path: p, type: 'blob', mode: '100644', sha: `sha-of-${p}` })) });
    if (path.endsWith('/git/blobs') && method === 'POST') { seen.blobs.push(JSON.parse(init.body)); return reply({ sha: `b${seen.blobs.length}` }, 201); }
    if (path.endsWith('/git/trees') && method === 'POST') { seen.tree = JSON.parse(init.body).tree; return reply({ sha: 't1' }, 201); }
    if (path.endsWith('/git/commits') && method === 'POST') return reply({ sha: 'c1' }, 201);
    if (path.endsWith('/git/refs/heads/main')) return reply({ object: { sha: 'c1' } });
    if (path === '/applications/id/token' && method === 'DELETE') return new Response(null, { status: 204 });
    return reply({ message: 'unexpected' }, 404);
  };
  return seen;
}

/** A request from the site's own page with the session cookie, sent as JSON when it has a body; `headers` adds to or replaces those. */
const request = (path, { method = 'POST', body, headers = {} } = {}) => new Request(`${ORIGIN}${path}`, {
  method,
  headers: { cookie: 'urd_gh=tok', 'sec-fetch-site': 'same-origin', ...(body !== undefined ? { 'content-type': 'application/json' } : {}), ...headers },
  ...(body !== undefined ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}),
});

test('the middleware: every answer carries nosniff, one that is not a page a policy that runs nothing, and a policy of its own is kept', async () => {
  const run = async (res) => middleware({ next: async () => res });
  const data = await run(reply({ ok: true }));
  assert.equal(data.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(data.headers.get('content-security-policy'), "default-src 'none'; frame-ancestors 'none'; sandbox");
  assert.deepEqual(await data.json(), { ok: true }, 'the body passes through');
  const page = await run(new Response('<p>x</p>', { headers: { 'content-type': 'text/html; charset=utf-8' } }));
  assert.equal(page.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(page.headers.get('content-security-policy'), null);
  const own = await run(new Response('x', { headers: { 'content-type': 'image/webp', 'content-security-policy': 'sandbox' } }));
  assert.equal(own.headers.get('content-security-policy'), 'sandbox');
  const moved = await run(Response.redirect(`${ORIGIN}/admin/`, 302));
  assert.equal(moved.status, 302, 'a redirect, whose own headers cannot be changed, passes as well');
  assert.equal(moved.headers.get('location'), `${ORIGIN}/admin/`);
  assert.equal(moved.headers.get('x-content-type-options'), 'nosniff');
});

test('publishing: a call that is not sent as JSON is refused before GitHub is asked, as a form from the site\'s own pages would send it', async () => {
  for (const type of ['text/plain;charset=UTF-8', 'application/x-www-form-urlencoded', 'multipart/form-data; boundary=x', 'application/jsonp']) {
    const seen = github();
    const res = await commit({ request: request('/api/github/commit', { body: '{"message":"x","files":[]}', headers: { 'content-type': type } }), env: ENV });
    assert.equal(res.status, 415, type);
    assert.equal((await res.json()).code, 'notJson');
    assert.equal(seen.calls.length, 0, type);
  }
  const seen = github(['index.html', 'content/site.json']);
  const ok = await commit({ request: request('/api/github/commit', { body: { message: 'Publish', files: [{ path: 'content/site.json', content: '{}' }] }, headers: { 'content-type': 'application/json; charset=utf-8' } }), env: ENV });
  assert.equal(ok.status, 200, 'JSON with a charset passes');
  assert.ok(seen.tree.some((e) => e.path === 'content/site.json'));
});

test('publishing: a page\'s copy is the index.html the repository holds, whatever is sent for it, in the site\'s folder as well', async () => {
  let seen = github(['index.html', 'content/site.json']);
  let res = await commit({ request: request('/api/github/commit', { body: { message: 'Publish', files: [{ path: 'om-oss/index.html', content: '<script>planted()</script>' }, { path: 'content/site.json', content: '{}' }] } }), env: ENV });
  assert.equal(res.status, 200);
  assert.ok(seen.tree.some((e) => e.path === 'om-oss/index.html' && e.sha === 'sha-of-index.html'));
  assert.ok(!seen.blobs.some((b) => String(b.content).includes('planted')), 'the sent HTML is never posted');
  seen = github(['template/index.html', 'template/content/site.json']);
  res = await commit({ request: request('/api/github/commit', { body: { message: 'Publish', files: [{ path: 'om-oss/index.html', content: 'x' }] } }), env: { ...ENV, GITHUB_ROOT_DIR: 'template' } });
  assert.equal(res.status, 200);
  assert.deepEqual(seen.tree, [{ path: 'template/om-oss/index.html', mode: '100644', type: 'blob', sha: 'sha-of-template/index.html' }]);
});

test('signing out: only from the site\'s own pages as JSON; the cookie is expired and the token revoked at GitHub, and the cookie goes even when GitHub cannot be reached', async () => {
  let seen = github();
  let res = await logout({ request: request('/api/github/logout', { body: {}, headers: { 'sec-fetch-site': 'cross-site' } }), env: ENV });
  assert.equal(res.status, 403);
  assert.equal(res.headers.get('set-cookie'), null);
  res = await logout({ request: request('/api/github/logout', { body: '{}', headers: { 'content-type': 'text/plain' } }), env: ENV });
  assert.equal(res.status, 415);
  assert.equal(seen.calls.length, 0);

  seen = github();
  res = await logout({ request: request('/api/github/logout', { body: {} }), env: ENV });
  assert.equal(res.status, 200);
  assert.match(res.headers.get('set-cookie'), /^urd_gh=; Max-Age=0;/);
  const revoke = seen.calls.find((c) => c.method === 'DELETE');
  assert.equal(revoke.url, 'https://api.github.com/applications/id/token');
  assert.equal(revoke.headers.authorization, `Basic ${btoa('id:secret')}`);
  assert.deepEqual(JSON.parse(revoke.body), { access_token: 'tok' });

  globalThis.fetch = async () => { throw new TypeError('offline'); };
  res = await logout({ request: request('/api/github/logout', { body: {} }), env: ENV });
  assert.equal(res.status, 200);
  assert.match(res.headers.get('set-cookie'), /^urd_gh=; Max-Age=0;/);
  res = await logout({ request: request('/api/github/logout', { body: {} }), env: {} });
  assert.equal(res.status, 200, 'without the app configured the cookie still goes');
});

test('the calendar route answers the site\'s own pages only, before any address is read', async () => {
  const seen = github();
  const ask = (headers) => ics({ request: new Request(`${ORIGIN}/api/ics?url=${encodeURIComponent('https://calendar.google.com/x.ics')}`, { headers }), env: {} });
  for (const headers of [{}, { 'sec-fetch-site': 'cross-site' }, { 'sec-fetch-site': 'same-site' }, { referer: 'https://other.example/' }, { origin: 'https://other.example' }]) {
    const res = await ask(headers);
    assert.equal(res.status, 403, JSON.stringify(headers));
    assert.equal((await res.json()).code, 'wrongOrigin');
  }
  assert.equal(seen.calls.length, 0);
  const own = await ics({ request: new Request(`${ORIGIN}/api/ics?url=http://calendar.google.com/x.ics`, { headers: { 'sec-fetch-site': 'same-origin' } }), env: {} });
  assert.equal((await own.json()).code, 'insecureCalendarUrl', 'the site\'s own page reaches the address check');
});

test('the calendar route checks every redirect before it follows it: a hop to a host off the list is refused, and nothing is fetched from it', async () => {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push(String(url));
    assert.equal(init.redirect, 'manual', 'redirects are followed by hand, hop by hop');
    const host = new URL(String(url)).hostname;
    if (host === 'calendar.google.com') return new Response(null, { status: 302, headers: { location: 'https://evil.example/x.ics' } });
    if (host === 'feeds.example.no') return new Response(null, { status: 301, headers: { location: 'https://calendar.google.com/y.ics' } });
    return new Response('BEGIN:VCALENDAR\nEND:VCALENDAR\n', { headers: { 'content-type': 'text/calendar' } });
  };
  const ask = (address, env = {}) => ics({ request: new Request(`${ORIGIN}/api/ics?url=${encodeURIComponent(address)}`, { headers: { 'sec-fetch-site': 'same-origin' } }), env });
  let res = await ask('https://calendar.google.com/x.ics');
  assert.equal(res.status, 502);
  assert.equal((await res.json()).code, 'calendarRedirectBlocked');
  assert.deepEqual(calls, ['https://calendar.google.com/x.ics'], 'the host off the list is never asked');
  calls.length = 0;
  res = await ask('https://feeds.example.no/z.ics', { ICS_HOSTS: 'feeds.example.no, evil.example' });
  assert.equal(res.status, 200, 'a hop to an allowed host, then on to another allowed one, is followed');
  assert.deepEqual(calls, ['https://feeds.example.no/z.ics', 'https://calendar.google.com/y.ics', 'https://evil.example/x.ics']);
});

/** A stand-in GitHub for the undo: the publish `abc1234` on `base`, HEAD at `head`, the trees by sha, and the publish's changed files in pages of a hundred. */
function revertRepo({ trees, files, truncated = false }) {
  const seen = { calls: [], tree: null, commit: null };
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(String(url));
    const method = init.method ?? 'GET';
    seen.calls.push(`${method} ${u.pathname}${u.search}`);
    const path = u.pathname;
    if (path === '/user') return reply({ login: 'owner' });
    if (path === '/repos/site/repo/commits' && u.searchParams.get('path') === 'content') return reply([{ sha: 'abc1234' }]);
    if (path === '/repos/site/repo/git/commits/abc1234') return reply({ parents: [{ sha: 'base' }], tree: { sha: 'tpub' }, message: 'Publish: a page\n\nmore' });
    if (path === '/repos/site/repo/git/commits/base') return reply({ tree: { sha: 'tbase' } });
    if (path === '/repos/site/repo/git/ref/heads/main') return reply({ object: { sha: 'head' } });
    if (path === '/repos/site/repo/git/commits/head') return reply({ tree: { sha: 'thead' } });
    if (path === '/repos/site/repo/commits/abc1234') {
      const page = Number(u.searchParams.get('page'));
      return reply({ files: files.slice((page - 1) * 100, page * 100) });
    }
    const treeSha = path.match(/^\/repos\/site\/repo\/git\/trees\/(\w+)$/)?.[1];
    if (treeSha && method === 'GET') return reply({ truncated, tree: Object.entries(trees[treeSha]).map(([p, sha]) => ({ path: p, sha, mode: '100644', type: 'blob' })) });
    if (path === '/repos/site/repo/git/trees' && method === 'POST') { seen.tree = JSON.parse(init.body); return reply({ sha: 'tnew' }, 201); }
    if (path === '/repos/site/repo/git/commits' && method === 'POST') { seen.commit = JSON.parse(init.body); return reply({ sha: 'cnew' }, 201); }
    if (path === '/repos/site/repo/git/refs/heads/main' && method === 'PATCH') return reply({ object: { sha: 'cnew' } });
    return reply({ message: 'unexpected' }, 404);
  };
  return seen;
}

const undo = () => revert({ request: request('/api/github/revert', { body: { expect: 'abc1234' } }), env: ENV });

test('the undo endpoint: a commit on HEAD setting back only the publish\'s files, a page\'s copy from HEAD\'s index.html, and the update made since kept', async () => {
  const seen = revertRepo({
    trees: {
      tbase: { 'index.html': 'idx-1', 'om-oss/index.html': 'idx-1', 'content/pages/om-oss.json': 'p1', 'assets/engine/0.7.11/urd.js': 'e1' },
      thead: { 'index.html': 'idx-2', 'assets/engine/0.7.12/urd.js': 'e2' },
    },
    files: [{ filename: 'om-oss/index.html', status: 'removed' }, { filename: 'content/pages/om-oss.json', status: 'removed' }],
  });
  const res = await undo();
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { sha: 'cnew' });
  assert.equal(seen.tree.base_tree, 'thead');
  assert.deepEqual(seen.tree.tree.map((e) => [e.path, e.sha]), [['om-oss/index.html', 'idx-2'], ['content/pages/om-oss.json', 'p1']]);
  assert.deepEqual(seen.commit.parents, ['head']);
  assert.equal(seen.commit.message, 'Revert "Publish: a page" via Urd admin');
});

test('the undo endpoint reads every page of the publish\'s files, and refuses a publish too large to read whole or a tree GitHub cuts short', async () => {
  const many = Array.from({ length: 150 }, (_, i) => `content/pages/p${i}.json`);
  let seen = revertRepo({ trees: { tbase: {}, thead: Object.fromEntries(many.map((p) => [p, 'x'])) }, files: many.map((filename) => ({ filename, status: 'added' })) });
  let res = await undo();
  assert.equal(res.status, 200);
  assert.equal(seen.tree.tree.length, 150, 'the second page is read too');
  assert.ok(seen.calls.includes('GET /repos/site/repo/commits/abc1234?per_page=100&page=2'));

  const huge = Array.from({ length: 1000 }, (_, i) => ({ filename: `media/x${i}.webp`, status: 'added' }));
  seen = revertRepo({ trees: { tbase: {}, thead: {} }, files: huge });
  res = await undo();
  assert.equal(res.status, 502);
  assert.equal((await res.json()).code, 'revertFailed');
  assert.equal(seen.tree, null, 'nothing is written');

  seen = revertRepo({ trees: { tbase: {}, thead: { 'content/a.json': 'a' } }, files: [{ filename: 'content/a.json', status: 'added' }], truncated: true });
  res = await undo();
  assert.equal(res.status, 502);
  assert.equal((await res.json()).code, 'revertFailed');
  assert.equal(seen.tree, null);
});

test('the undo endpoint: a publish whose files already stand as before it answers revertNothingChanged and writes nothing', async () => {
  const seen = revertRepo({ trees: { tbase: { 'content/a.json': 'a1' }, thead: { 'content/a.json': 'a1' } }, files: [{ filename: 'content/a.json', status: 'modified' }] });
  const res = await undo();
  assert.equal(res.status, 400);
  assert.equal((await res.json()).code, 'revertNothingChanged');
  assert.equal(seen.tree, null);
});

test('the address lookup is for a signed-in publisher from the site\'s own pages, and its answer is kept by that browser only', async () => {
  const seen = github();
  let res = await geocode({ request: new Request(`${ORIGIN}/api/geocode?q=Storgata 1`, { headers: { 'sec-fetch-site': 'same-origin' } }), env: ENV });
  assert.equal(res.status, 401);
  res = await geocode({ request: new Request(`${ORIGIN}/api/geocode?q=Storgata 1`, { headers: { cookie: 'urd_gh=tok', 'sec-fetch-site': 'cross-site' } }), env: ENV });
  assert.equal(res.status, 403);
  res = await geocode({ request: new Request(`${ORIGIN}/api/geocode?q=Storgata 1`, { headers: { cookie: 'urd_gh=tok', 'sec-fetch-site': 'same-origin' } }), env: { ...ENV, ALLOWED_LOGINS: 'someone-else' } });
  assert.equal(res.status, 403);
  assert.ok(!seen.calls.some((c) => new URL(c.url).hostname === 'nominatim.openstreetmap.org'));

  const toGitHub = globalThis.fetch;
  globalThis.fetch = async (url, init) => (new URL(String(url)).hostname === 'nominatim.openstreetmap.org'
    ? reply([{ lat: '59.91', lon: '10.75', display_name: 'Storgata 1, Oslo' }])
    : toGitHub(url, init));
  res = await geocode({ request: new Request(`${ORIGIN}/api/geocode?q=Storgata 1`, { headers: { cookie: 'urd_gh=tok', 'sec-fetch-site': 'same-origin' } }), env: ENV });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { lat: 59.91, lon: 10.75, label: 'Storgata 1, Oslo' });
  assert.equal(res.headers.get('cache-control'), 'private, max-age=3600', 'never kept by a shared cache');
});

test('publishing refuses an SVG that holds a script, before GitHub is asked for anything but the publisher', async () => {
  const seen = github(['index.html']);
  const evil = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><s:script xmlns:s="http://www.w3.org/2000/svg">alert(1)</s:script></svg>').toString('base64');
  const res = await commit({ request: request('/api/github/commit', { body: { message: 'Publish', files: [{ path: 'media/images/logo.svg', content: evil, encoding: 'base64' }] } }), env: ENV });
  assert.equal(res.status, 400);
  assert.deepEqual(await res.json(), { error: "The SVG 'media/images/logo.svg' holds a script, a link that runs code or a declaration", code: 'svgNotAllowed', path: 'media/images/logo.svg' });
  assert.deepEqual(seen.calls.map((c) => new URL(c.url).pathname), ['/user']);
});

test('publishing refuses a feed that declares the XHTML namespace, and a sitemap that is no sitemap', async () => {
  for (const [path, content] of [['content/samlinger/nyheter.xml', '<rss xmlns:h="http://www.w3.org/1999/xhtml"><h:script>alert(1)</h:script></rss>'], ['sitemap.xml', '<html><body>x</body></html>']]) {
    const seen = github(['index.html']);
    const res = await commit({ request: request('/api/github/commit', { body: { message: 'Publish', files: [{ path, content }] } }), env: ENV });
    assert.equal(res.status, 400, path);
    assert.equal((await res.json()).code, 'xmlNotAllowed');
    assert.deepEqual(seen.calls.map((c) => new URL(c.url).pathname), ['/user']);
  }
});

test('publishing: a signed-in login not in ALLOWED_LOGINS, and a publish of more than 200 files, are refused before anything is written', async () => {
  let seen = github(['index.html']);
  let res = await commit({ request: request('/api/github/commit', { body: { message: 'Publish', files: [{ path: 'content/site.json', content: '{}' }] } }), env: { ...ENV, ALLOWED_LOGINS: 'someone-else' } });
  assert.equal(res.status, 403);
  assert.equal((await res.json()).code, 'notAllowed');
  assert.deepEqual(seen.calls.map((c) => new URL(c.url).pathname), ['/user'], 'only the publisher is asked for');

  const files = (n) => Array.from({ length: n }, (_, i) => ({ path: `content/pages/p${i}.json`, content: '{}' }));
  seen = github(['index.html']);
  res = await commit({ request: request('/api/github/commit', { body: { message: 'Publish', files: files(201) } }), env: ENV });
  assert.equal(res.status, 400);
  assert.equal((await res.json()).code, 'badFiles');
  assert.deepEqual(seen.calls.map((c) => new URL(c.url).pathname), ['/user']);
  assert.equal(seen.blobs.length, 0);
  assert.equal(seen.tree, null);

  seen = github(['index.html']);
  res = await commit({ request: request('/api/github/commit', { body: { message: 'Publish', files: files(200) } }), env: ENV });
  assert.equal(res.status, 200, 'the cap itself is let through');
  assert.equal(seen.blobs.length, 200);
});

test('publishing: an expect that is no longer the branch head answers 409 and makes no commit; the head it names publishes', async () => {
  let seen = github(['index.html']);
  let res = await commit({ request: request('/api/github/commit', { body: { message: 'Publish', expect: 'c-old', files: [{ path: 'content/site.json', content: '{}' }] } }), env: ENV });
  assert.equal(res.status, 409);
  assert.equal((await res.json()).code, 'publishRace');
  assert.deepEqual(seen.calls.map((c) => `${c.method} ${new URL(c.url).pathname}`), ['GET /user', 'GET /repos/site/repo/git/ref/heads/main']);
  assert.equal(seen.blobs.length, 0);
  assert.equal(seen.tree, null);

  seen = github(['index.html']);
  res = await commit({ request: request('/api/github/commit', { body: { message: 'Publish', expect: 'c0', files: [{ path: 'content/site.json', content: '{}' }] } }), env: ENV });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { sha: 'c1' });
});

test('publishing: a deploy hook that fails or throws never fails the publish, which still answers with its commit', async (t) => {
  t.mock.method(console, 'warn', () => {});
  const env = { ...ENV, DEPLOY_HOOK_URL: 'https://hooks.example/deploy' };
  const send = () => commit({ request: request('/api/github/commit', { body: { message: 'Publish', files: [{ path: 'content/site.json', content: '{}' }] } }), env });
  let seen = github(['index.html']);
  let res = await send();
  assert.equal(res.status, 200, 'a hook answering an error');
  assert.deepEqual(await res.json(), { sha: 'c1' });
  assert.ok(seen.calls.some((c) => c.url === 'https://hooks.example/deploy' && c.method === 'POST'), 'the hook is called');

  seen = github(['index.html']);
  const toGitHub = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    if (new URL(String(url)).hostname === 'hooks.example') throw new TypeError('the hook cannot be reached');
    return toGitHub(url, init);
  };
  res = await send();
  assert.equal(res.status, 200, 'a hook that throws');
  assert.deepEqual(await res.json(), { sha: 'c1' });
  assert.ok(seen.calls.some((c) => c.method === 'PATCH'), 'the branch was moved');
});

test('the undo endpoint: a publish that is no longer the latest content commit answers 409 and writes nothing', async () => {
  const seen = revertRepo({ trees: { tbase: { 'content/a.json': 'a1' }, thead: { 'content/a.json': 'a2' } }, files: [{ filename: 'content/a.json', status: 'modified' }] });
  const res = await revert({ request: request('/api/github/revert', { body: { expect: 'def5678' } }), env: ENV });
  assert.equal(res.status, 409);
  assert.equal((await res.json()).code, 'revertRace');
  assert.ok(seen.calls.includes('GET /repos/site/repo/commits?sha=main&per_page=1&path=content'), 'the latest content commit is asked for');
  assert.equal(seen.tree, null);
  assert.equal(seen.commit, null);
  assert.ok(seen.calls.every((c) => c.startsWith('GET ')), 'no write of any kind');
});

test('the calendar route checks the first address against the host list before any fetch: a host off the list is refused and never asked', async () => {
  const calls = [];
  globalThis.fetch = async (url) => { calls.push(String(url)); return new Response('BEGIN:VCALENDAR\nEND:VCALENDAR\n'); };
  const ask = (address, env = {}) => ics({ request: new Request(`${ORIGIN}/api/ics?url=${encodeURIComponent(address)}`, { headers: { 'sec-fetch-site': 'same-origin' } }), env });
  for (const [address, env] of [['https://evil.example/x.ics', {}], ['https://evil.example/x.ics', { ICS_HOSTS: 'feeds.example.no' }], ['https://calendar.google.com.evil.example/x.ics', {}]]) {
    const res = await ask(address, env);
    assert.equal(res.status, 403, address);
    assert.equal((await res.json()).code, 'calendarHostNotAllowed', address);
  }
  assert.deepEqual(calls, [], 'fetch is never called');
  const listed = await ask('https://feeds.example.no/x.ics', { ICS_HOSTS: 'feeds.example.no' });
  assert.equal(listed.status, 200, 'a host on the list is fetched');
  assert.deepEqual(calls, ['https://feeds.example.no/x.ics']);
});

test('the calendar route holds its size limit while the body is read: a feed that keeps giving is cut off at the limit, one within it passes whole', async () => {
  const src = readFileSync(new URL('../template/functions/api/ics.js', import.meta.url), 'utf8');
  const MAX_BYTES = Number(src.match(/const MAX_BYTES = ([\d_]+);/)[1].replaceAll('_', ''));
  const CHUNK = 64 * 1024;
  /** A feed of `size` bytes, given a chunk at a time as it is read, with no declared length. */
  const feed = (size) => {
    const state = { given: 0, cancelled: false };
    const body = new ReadableStream({
      pull(controller) {
        if (state.given >= size) { controller.close(); return; }
        const chunk = new Uint8Array(Math.min(CHUNK, size - state.given)).fill(0x41);
        if (state.given === 0) chunk.set(new TextEncoder().encode('BEGIN:VCALENDAR\n'));
        state.given += chunk.byteLength;
        controller.enqueue(chunk);
      },
      cancel() { state.cancelled = true; },
    });
    return { state, res: new Response(body, { headers: { 'content-type': 'text/calendar' } }) };
  };
  const ask = () => ics({ request: new Request(`${ORIGIN}/api/ics?url=${encodeURIComponent('https://calendar.google.com/x.ics')}`, { headers: { 'sec-fetch-site': 'same-origin' } }), env: {} });

  const endless = feed(MAX_BYTES * 20);
  globalThis.fetch = async () => endless.res;
  let res = await ask();
  assert.equal(res.status, 502);
  assert.equal((await res.json()).code, 'calendarTooLarge');
  assert.ok(endless.state.given <= MAX_BYTES + 2 * CHUNK, `read ${endless.state.given} bytes, the limit is ${MAX_BYTES}`);
  assert.equal(endless.state.cancelled, true, 'the rest of the stream is cancelled');

  const within = feed(MAX_BYTES);
  globalThis.fetch = async () => within.res;
  res = await ask();
  assert.equal(res.status, 200);
  assert.equal((await res.text()).length, MAX_BYTES);
});

test('the conflict check reads truncated from the whole diff before the site\'s folder filters it, so a cut-off list counts as may overlap', async () => {
  const ask = (count) => {
    globalThis.fetch = async (url) => {
      const path = new URL(String(url)).pathname;
      if (path === '/repos/site/repo/git/ref/heads/main') return reply({ object: { sha: 'h1' } });
      if (path === '/repos/site/repo/compare/abc1234...h1') return reply({ files: Array.from({ length: count }, (_, i) => ({ filename: i === 0 ? 'template/content/site.json' : `docs/n${i}.md` })) });
      return reply({ message: 'unexpected' }, 404);
    };
    return latest({ request: new Request(`${ORIGIN}/api/github/latest?base=abc1234`, { headers: { cookie: 'urd_gh=tok' } }), env: { ...ENV, GITHUB_ROOT_DIR: 'template' } });
  };
  let data = await (await ask(300)).json();
  assert.deepEqual(data, { head: 'h1', changedFiles: ['content/site.json'], truncated: true }, 'three hundred files in the diff, one of them the site\'s');
  data = await (await ask(299)).json();
  assert.equal(data.truncated, false);
  assert.deepEqual(data.changedFiles, ['content/site.json']);
});
