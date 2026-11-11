/**
 * The saved drafts' branch (ADR-0032): the rules in functions/_lib/drafts.js, the commit that makes the branch (commitTree with `orphan` in functions/_lib/github.js), and the drafts function (functions/api/github/drafts.js) against a simulated GitHub.
 */
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  DRAFTS_BRANCH, SKIP, isPartName, keyOfPart, partProblem, partText, mergeIndex, saveMessage, MAX_PART, BLOB_FROM,
} from '../template/functions/_lib/drafts.js';
import { commitTree } from '../template/functions/_lib/github.js';
import { chunkEntries } from '../template/functions/_lib/update-plan.js';

const drafts = await import('../template/functions/api/github/drafts.js');

const reply = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const realFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = realFetch; });

test('part names: the site, the lists and one page or collection each, and no page whose draft key is another part\'s', () => {
  for (const name of ['site', 'collections', 'templates', 'plugins', 'redirects', 'page-hjem', 'page-om-oss', 'collection-nyheter', 'page-sitemap', 'page-site-map', 'page-templates-guide', 'page-plugins-x', 'page-collectionsx']) assert.ok(isPartName(name), name);
  for (const name of ['', 'page-', 'page-Hjem', 'page-../x', 'media-moves', 'page-site', 'page-collection-x', 'page-template-a', 'collection-', 'theme', 'page-a/b', 42, null]) assert.ok(!isPartName(name), String(name));
});

test('each part holds its own stored draft keys and no other part\'s', () => {
  assert.ok(keyOfPart('site', 'urd-draft-site'));
  assert.ok(!keyOfPart('site', 'urd-draft-hjem'));
  assert.ok(keyOfPart('page-hjem', 'urd-draft-hjem'));
  assert.ok(!keyOfPart('page-hjem', 'urd-draft-site'));
  assert.ok(keyOfPart('collection-nyheter', 'urd-draft-collection-nyheter'));
  assert.ok(keyOfPart('collections', 'urd-draft-collections:index'));
  assert.ok(keyOfPart('templates', 'urd-draft-templates') && keyOfPart('templates', 'urd-draft-template-a1B2'));
  assert.ok(!keyOfPart('templates', 'urd-draft-template-../x'));
  assert.ok(!keyOfPart('plugins', 'urd-draft-redirects'));
});

test('a part to write: its keys are its own texts, within the size, with a sha for a base', () => {
  assert.equal(partProblem({ name: 'site', keys: { 'urd-draft-site': '{}' }, hash: 'abc', base: 'a'.repeat(40), title: 'Site', later: false }), null);
  assert.equal(partProblem({ name: 'nope', keys: {} }), 'name');
  assert.equal(partProblem({ name: 'site', keys: {} }), 'keys');
  assert.equal(partProblem({ name: 'site', keys: { 'urd-draft-hjem': '{}' } }), 'keys');
  assert.equal(partProblem({ name: 'site', keys: { 'urd-draft-site': 3 } }), 'keys');
  assert.equal(partProblem({ name: 'site', keys: { 'urd-draft-site': 'x'.repeat(MAX_PART) } }), 'size');
  assert.equal(partProblem({ name: 'site', keys: { 'urd-draft-site': '{}' }, base: 'main' }), 'base');
  assert.equal(partProblem({ name: 'site', keys: { 'urd-draft-site': '{}' }, later: 'yes' }), 'later');
});

test('the index after a save: who and when from the server, the parts written and the parts removed', () => {
  const before = { version: 1, parts: { site: { savedAt: 't0', saver: 'a', hash: 'h0', base: null }, 'page-kaker': { savedAt: 't0', saver: 'a', hash: 'k0', base: null } } };
  const next = mergeIndex(before, [{ name: 'site', hash: 'h1', base: 'b'.repeat(40), title: 'Site settings', later: true, savedAt: 'forged', saver: 'forged' }], ['page-kaker'], { login: 'owner', now: 't1' });
  assert.deepEqual(next, { version: 1, parts: { site: { savedAt: 't1', saver: 'owner', hash: 'h1', base: 'b'.repeat(40), title: 'Site settings', later: true } } });
  assert.equal(before.parts['page-kaker'].hash, 'k0', 'the index read is left as it was');
});

test('every commit message on the branch begins with the host\'s skip marker', () => {
  for (const message of [saveMessage(3, 0), saveMessage(0, 2), saveMessage(1, 1), saveMessage(0, 0)]) assert.ok(message.startsWith(SKIP), message);
  assert.equal(SKIP, '[CF-Pages-Skip]');
  assert.equal(JSON.parse(partText({ 'urd-draft-site': '{"a":1}' })).keys['urd-draft-site'], '{"a":1}');
});

/** A simulated GitHub holding the drafts' branch at `head` (null for none), with its files; records what is posted. `patch` answers the ref's move where given; a file over BLOB_FROM is cut short in GraphQL and read whole as a blob. */
function github({ head = null, files = {}, login = 'owner', patch = null } = {}) {
  const seen = { trees: [], commits: [], refs: [], blobs: 0, blobReads: 0, indexRefs: [] };
  const big = (path) => files[path].length > BLOB_FROM;
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(url);
    const path = u.pathname;
    const method = init.method ?? 'GET';
    if (path === '/user') return reply({ login });
    if (path === '/graphql') {
      const query = JSON.parse(init.body).query;
      const repository = {};
      for (const m of query.matchAll(/(p\d+): object\(expression: "([0-9a-f]+):([^"]+)"\)/g)) {
        repository[m[1]] = m[3] in files ? { text: big(m[3]) ? files[m[3]].slice(0, 100) : files[m[3]], isTruncated: big(m[3]), oid: `oid:${m[3]}` } : null;
      }
      return reply({ data: { repository } });
    }
    if (path.endsWith(`/git/ref/heads/${DRAFTS_BRANCH}`)) return head ? reply({ object: { sha: head } }) : reply({ message: 'Not Found' }, 404);
    if (path.endsWith('/contents/index.json')) {
      seen.indexRefs.push(u.searchParams.get('ref'));
      return 'index.json' in files ? reply({ content: btoa(files['index.json']) }) : reply({ message: 'Not Found' }, 404);
    }
    if (path.includes('/git/blobs/oid:') && method === 'GET') {
      seen.blobReads++;
      return reply({ content: Buffer.from(files[decodeURIComponent(path.split('/git/blobs/oid:')[1])]).toString('base64') });
    }
    if (path.endsWith(`/git/commits/${head}`)) return reply({ tree: { sha: 'tree0' } });
    if (path.endsWith('/git/blobs') && method === 'POST') { seen.blobs++; return reply({ sha: 'blob1' }, 201); }
    if (path.endsWith('/git/trees') && method === 'POST') { seen.trees.push(JSON.parse(init.body)); return reply({ sha: 'tree1' }, 201); }
    if (path.endsWith('/git/commits') && method === 'POST') { seen.commits.push(JSON.parse(init.body)); return reply({ sha: 'c'.repeat(40) }, 201); }
    if (path.endsWith('/git/refs') && method === 'POST') { seen.refs.push({ create: JSON.parse(init.body) }); return reply({ ref: 'x' }, 201); }
    if (path.endsWith(`/git/refs/heads/${DRAFTS_BRANCH}`) && method === 'PATCH') {
      seen.refs.push({ move: JSON.parse(init.body) });
      return patch ? reply({ message: patch.message }, patch.status) : reply({ object: { sha: 'c'.repeat(40) } });
    }
    return reply({ message: `unexpected ${method} ${path}` }, 500);
  };
  return seen;
}

const ENV = { GITHUB_REPO: 'site/repo', GITHUB_CLIENT_ID: 'id', GITHUB_CLIENT_SECRET: 'secret', ALLOWED_LOGINS: 'owner' };
const call = (method, body, query = '') => new Request(`https://site.pages.dev/api/github/drafts${query}`, {
  method,
  headers: { cookie: 'urd_gh=token', 'sec-fetch-site': 'same-origin', ...(body ? { 'content-type': 'application/json' } : {}) },
  ...(body ? { body: JSON.stringify(body) } : {}),
});

test('commitTree with orphan makes the branch: a tree with no base, a commit with no parent, and the ref created', async () => {
  const seen = github();
  const { sha } = await commitTree('token', { repo: 'site/repo', branch: DRAFTS_BRANCH }, { message: saveMessage(1, 0), entries: [{ path: 'index.json', content: '{}' }], orphan: true }, chunkEntries);
  assert.equal(sha, 'c'.repeat(40));
  assert.equal(seen.trees[0].base_tree, undefined);
  assert.deepEqual(seen.commits[0].parents, []);
  assert.deepEqual(seen.refs, [{ create: { ref: `refs/heads/${DRAFTS_BRANCH}`, sha: 'c'.repeat(40) } }]);
});

test('commitTree with orphan where another save made the branch first answers 409', async () => {
  github();
  globalThis.fetch = ((inner) => async (url, init = {}) => (new URL(url).pathname.endsWith('/git/refs') && init.method === 'POST'
    ? reply({ message: 'Reference already exists' }, 422)
    : inner(url, init)))(globalThis.fetch);
  await assert.rejects(commitTree('token', { repo: 'site/repo', branch: DRAFTS_BRANCH }, { message: 'm', entries: [{ path: 'index.json', content: '{}' }], orphan: true }, chunkEntries), (err) => err.status === 409);
});

test('GET with nothing saved: no head and an empty index; GET of parts reads their texts at the head', async () => {
  github();
  const empty = await (await drafts.onRequestGet({ request: call('GET'), env: ENV })).json();
  assert.deepEqual(empty, { head: null, index: { version: 1, parts: {} } });
  github({ head: 'a'.repeat(40), files: { 'index.json': JSON.stringify({ version: 1, parts: { site: { hash: 'h' } } }), 'parts/site.json': partText({ 'urd-draft-site': '{}' }) } });
  const read = await (await drafts.onRequestGet({ request: call('GET'), env: ENV })).json();
  assert.equal(read.head, 'a'.repeat(40));
  assert.equal(read.index.parts.site.hash, 'h');
  const parts = await (await drafts.onRequestGet({ request: call('GET', null, '?parts=site,page-hjem'), env: ENV })).json();
  assert.equal(JSON.parse(parts.parts.site).keys['urd-draft-site'], '{}');
  assert.equal(parts.parts['page-hjem'], null);
  const bad = await drafts.onRequestGet({ request: call('GET', null, '?parts=../x'), env: ENV });
  assert.equal(bad.status, 400);
});

test('the first save makes the branch with the skip marker, and never touches the site\'s branch', async () => {
  const seen = github();
  const res = await drafts.onRequestPost({ request: call('POST', { expect: null, writes: [{ name: 'page-hjem', keys: { 'urd-draft-hjem': '{"sections":[]}' }, hash: 'h1', title: 'Hjem' }] }), env: ENV });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.index.parts['page-hjem'].saver, 'owner');
  assert.ok(seen.commits[0].message.startsWith(SKIP));
  assert.deepEqual(seen.commits[0].parents, []);
  assert.equal(seen.refs[0].create.ref, `refs/heads/${DRAFTS_BRANCH}`);
  assert.deepEqual(seen.trees[0].tree.map((e) => e.path).sort(), ['index.json', 'parts/page-hjem.json']);
});

test('a save against a head that moved answers 409 with the head as it stands; a removal names only parts the index lists', async () => {
  github({ head: 'b'.repeat(40), files: { 'index.json': JSON.stringify({ version: 1, parts: { site: { hash: 'h' } } }) } });
  const race = await drafts.onRequestPost({ request: call('POST', { expect: 'a'.repeat(40), writes: [] }), env: ENV });
  assert.equal(race.status, 409);
  assert.deepEqual(await race.json(), { error: 'The saved drafts changed on another device', code: 'draftsRace', head: 'b'.repeat(40) });
  const seen = github({ head: 'b'.repeat(40), files: { 'index.json': JSON.stringify({ version: 1, parts: { site: { hash: 'h' } } }) } });
  const res = await drafts.onRequestPost({ request: call('POST', { expect: 'b'.repeat(40), removes: ['site', 'page-gone'] }), env: ENV });
  assert.equal(res.status, 200);
  const tree = seen.trees[0].tree;
  assert.ok(tree.some((e) => e.path === 'parts/site.json' && e.sha === null));
  assert.ok(!tree.some((e) => e.path === 'parts/page-gone.json'));
  assert.equal(seen.refs[0].move.force, false);
});

test('a part that is not its own, a key of another part, or a stranger is refused', async () => {
  github();
  const wrong = await drafts.onRequestPost({ request: call('POST', { expect: null, writes: [{ name: 'page-hjem', keys: { 'urd-draft-site': '{}' } }] }), env: ENV });
  assert.equal(wrong.status, 400);
  assert.equal((await wrong.json()).code, 'draftsBadPart');
  github({ login: 'stranger' });
  const stranger = await drafts.onRequestPost({ request: call('POST', { expect: null, writes: [] }), env: ENV });
  assert.equal(stranger.status, 403);
  github();
  const clash = await drafts.onRequestGet({ request: call('GET'), env: { ...ENV, GITHUB_BRANCH: DRAFTS_BRANCH } });
  assert.equal((await clash.json()).code, 'draftsBranchRefused');
});

const INDEX = (parts) => JSON.stringify({ version: 1, parts });

test('the index is read at the branch\'s head, never at the site\'s branch', async () => {
  const seen = github({ head: 'a'.repeat(40), files: { 'index.json': INDEX({}) } });
  await drafts.onRequestGet({ request: call('GET'), env: ENV });
  assert.deepEqual(seen.indexRefs, ['a'.repeat(40)]);
});

test('all removes every part the index lists and keeps the index, so the tree is never empty', async () => {
  const seen = github({ head: 'a'.repeat(40), files: { 'index.json': INDEX({ site: { hash: 'h' }, 'page-hjem': { hash: 'k' } }) } });
  const res = await drafts.onRequestPost({ request: call('POST', { expect: 'a'.repeat(40), all: true }), env: ENV });
  assert.equal(res.status, 200);
  assert.deepEqual((await res.json()).index.parts, {});
  const tree = seen.trees[0].tree;
  assert.deepEqual(tree.filter((e) => e.sha === null).map((e) => e.path).sort(), ['parts/page-hjem.json', 'parts/site.json']);
  assert.ok(tree.some((e) => e.path === 'index.json' && typeof e.content === 'string'));
});

test('a race found as the ref moves answers 409 with the head as it stands', async () => {
  github({ head: 'a'.repeat(40), files: { 'index.json': INDEX({}) }, patch: { status: 422, message: 'Update is not a fast forward' } });
  const res = await drafts.onRequestPost({ request: call('POST', { expect: 'a'.repeat(40), writes: [{ name: 'site', keys: { 'urd-draft-site': '{}' } }] }), env: ENV });
  assert.equal(res.status, 409);
  assert.deepEqual(await res.json(), { error: 'The saved drafts changed on another device', code: 'draftsRace', head: 'a'.repeat(40) });
});

test('a repository whose name holds «rules» does not make every refusal a ruleset\'s; GitHub\'s own words decide', async () => {
  github({ head: 'a'.repeat(40), files: { 'index.json': INDEX({}) }, patch: { status: 422, message: 'Invalid request' } });
  const plain = await drafts.onRequestPost({ request: call('POST', { expect: 'a'.repeat(40), writes: [{ name: 'site', keys: { 'urd-draft-site': '{}' } }] }), env: { ...ENV, GITHUB_REPO: 'acme/rules-club' } });
  assert.equal((await plain.json()).code, 'draftsFailed');
  github({ head: 'a'.repeat(40), files: { 'index.json': INDEX({}) }, patch: { status: 422, message: 'Repository rule violations found' } });
  const ruled = await drafts.onRequestPost({ request: call('POST', { expect: 'a'.repeat(40), writes: [{ name: 'site', keys: { 'urd-draft-site': '{}' } }] }), env: ENV });
  assert.equal((await ruled.json()).code, 'draftsBranchRefused');
});

test('a large part goes up as a blob of its own, and one GitHub cuts short is read whole as a blob', async () => {
  const large = 'x'.repeat(BLOB_FROM + 10);
  const seen = github();
  const res = await drafts.onRequestPost({ request: call('POST', { expect: null, writes: [{ name: 'page-hjem', keys: { 'urd-draft-hjem': large } }, { name: 'site', keys: { 'urd-draft-site': '{}' } }] }), env: ENV });
  assert.equal(res.status, 200);
  assert.equal(seen.blobs, 1);
  const tree = seen.trees[0].tree;
  assert.ok(tree.some((e) => e.path === 'parts/page-hjem.json' && e.sha === 'blob1' && e.content === undefined));
  assert.ok(tree.some((e) => e.path === 'parts/site.json' && typeof e.content === 'string'));
  const file = partText({ 'urd-draft-hjem': large });
  const read = github({ head: 'a'.repeat(40), files: { 'index.json': INDEX({ 'page-hjem': { hash: 'h' } }), 'parts/page-hjem.json': file } });
  const parts = await (await drafts.onRequestGet({ request: call('GET', null, '?parts=page-hjem'), env: ENV })).json();
  assert.equal(read.blobReads, 1);
  assert.equal(parts.parts['page-hjem'], file);
});

test('a part named twice in one save is refused', async () => {
  github();
  const res = await drafts.onRequestPost({ request: call('POST', { expect: null, writes: [{ name: 'site', keys: { 'urd-draft-site': '{}' } }, { name: 'site', keys: { 'urd-draft-site': '{"a":1}' } }] }), env: ENV });
  assert.equal(res.status, 400);
  assert.equal((await res.json()).code, 'draftsBadPart');
});
