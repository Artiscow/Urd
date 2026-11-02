/**
 * Publishing's commit (commitFiles in functions/_lib/github.js) against a simulated GitHub: a deletion of a plugin's folder removes every file under it and nothing beside it, and a move takes the file's blob as it stands.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { commitFiles } from '../template/functions/_lib/github.js';

const reply = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

/** Runs commitFiles with a base tree of `paths` and returns the tree it posts. */
async function postedTree(paths, files) {
  const real = globalThis.fetch;
  let posted = null;
  globalThis.fetch = async (url, init = {}) => {
    const path = new URL(url).pathname;
    const method = init.method ?? 'GET';
    if (path.endsWith('/git/ref/heads/main')) return reply({ object: { sha: 'c0' } });
    if (path.endsWith('/git/commits/c0')) return reply({ tree: { sha: 't0' } });
    if (path.endsWith('/git/trees/t0')) return reply({ tree: [...paths.map((p) => ({ path: p, type: 'blob', mode: '100644', sha: `sha-of-${p}` })), { path: 'plugins', type: 'tree' }] });
    if (path.endsWith('/git/blobs') && method === 'POST') return reply({ sha: 'b1' }, 201);
    if (path.endsWith('/git/trees') && method === 'POST') { posted = JSON.parse(init.body).tree; return reply({ sha: 't1' }, 201); }
    if (path.endsWith('/git/commits') && method === 'POST') return reply({ sha: 'c1' }, 201);
    if (path.endsWith('/git/refs/heads/main')) return reply({ object: { sha: 'c1' } });
    return reply({ message: 'unexpected' }, 404);
  };
  try {
    await commitFiles('token', { repo: 'site/repo', branch: 'main' }, { message: 'Publish', files });
  } finally {
    globalThis.fetch = real;
  }
  return posted;
}

test('a deleted plugin folder takes every file under it, and nothing in a folder whose name begins the same', async () => {
  const tree = await postedTree(
    ['plugins/plugins.json', 'plugins/a/plugin.json', 'plugins/a/locales/admin/x.js', 'plugins/ab/plugin.json', 'plugins/a.json', 'content/pages/hjem.json'],
    [{ path: 'plugins/plugins.json', content: '{}' }, { path: 'plugins/a', delete: true }],
  );
  const deleted = tree.filter((e) => e.sha === null).map((e) => e.path).sort();
  assert.deepEqual(deleted, ['plugins/a/locales/admin/x.js', 'plugins/a/plugin.json']);
  assert.ok(tree.some((e) => e.path === 'plugins/plugins.json' && e.sha === 'b1'));
});

test('a deletion of a file deletes that file once, and a path that is not there is skipped', async () => {
  const tree = await postedTree(
    ['content/pages/a.json', 'content/pages/ab.json'],
    [{ path: 'content/pages/a.json', delete: true }, { path: 'content/pages/a.json', delete: true }, { path: 'content/pages/gone.json', delete: true }, { path: 'content/x.json', content: '{}' }],
  );
  assert.deepEqual(tree.filter((e) => e.sha === null).map((e) => e.path), ['content/pages/a.json']);
});

test('a move writes the source\'s own blob at the new path and deletes the source, with no blob posted; a source that is not there fails', async () => {
  const tree = await postedTree(
    ['media/logo-91963a12.svg', 'content/site.json'],
    [{ path: 'media/images/logo-91963a12.svg', from: 'media/logo-91963a12.svg', sha: 'from-the-client' }, { path: 'content/site.json', content: '{}' }],
  );
  assert.ok(tree.some((e) => e.path === 'media/images/logo-91963a12.svg' && e.sha === 'sha-of-media/logo-91963a12.svg'), 'the blob the tree holds, never the client\'s');
  assert.ok(tree.some((e) => e.path === 'media/logo-91963a12.svg' && e.sha === null), 'the source deleted');
  assert.ok(tree.some((e) => e.path === 'content/site.json' && e.sha === 'b1'));
  await assert.rejects(postedTree(['content/site.json'], [{ path: 'media/images/gone.svg', from: 'media/gone.svg' }]), (err) => err.code === 'moveMissing' && err.status === 404);
});
