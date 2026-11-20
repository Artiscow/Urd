/**
 * The undo of one publish (functions/_lib/revert-plan.js): only what that publish changed is set back, so an Urd update or any other commit made since stays as it is.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { revertEntries, treeMap } from '../template/functions/_lib/revert-plan.js';

const tree = (entries) => treeMap(Object.entries(entries).map(([path, sha]) => ({ path, sha, mode: '100644', type: 'blob' })));

test('a changed file goes back, an added one goes away, a removed one comes back, and a renamed one at both its names', () => {
  const before = tree({ 'content/pages/a.json': 'a1', 'content/pages/gone.json': 'g1', 'media/images/old.webp': 'o1' });
  const now = tree({ 'content/pages/a.json': 'a2', 'content/pages/new.json': 'n1', 'media/images/moved.webp': 'o1' });
  const { entries } = revertEntries([
    { filename: 'content/pages/a.json', status: 'modified' },
    { filename: 'content/pages/new.json', status: 'added' },
    { filename: 'content/pages/gone.json', status: 'removed' },
    { filename: 'media/images/moved.webp', status: 'renamed', previous_filename: 'media/images/old.webp' },
  ], before, now);
  const by = Object.fromEntries(entries.map((e) => [e.path, e.sha]));
  assert.deepEqual(by, {
    'content/pages/a.json': 'a1',
    'content/pages/new.json': null,
    'content/pages/gone.json': 'g1',
    'media/images/old.webp': 'o1',
    'media/images/moved.webp': null,
  });
  assert.ok(entries.every((e) => e.mode === '100644' && e.type === 'blob'));
});

test('an Urd update made since the publish is left as it is: only the publish\'s own paths are written', () => {
  const before = tree({ 'content/pages/a.json': 'a1', 'assets/engine/0.7.10/urd.js': 'e1', 'functions/api/github/commit.js': 'f1' });
  const now = tree({ 'content/pages/a.json': 'a2', 'assets/engine/0.7.11/urd.js': 'e2', 'functions/api/github/commit.js': 'f2' });
  const { entries } = revertEntries([{ filename: 'content/pages/a.json', status: 'modified' }], before, now);
  assert.deepEqual(entries.map((e) => e.path), ['content/pages/a.json']);
});

test('paths publishing may not touch, paths outside the site\'s folder, a file already as it was, and a link are left out', () => {
  const before = tree({ 'template/content/a.json': 'a1', 'template/content/same.json': 's1' });
  const now = tree({ 'template/content/a.json': 'a2', 'template/content/same.json': 's1', 'template/_headers': 'h2', 'template/functions/x.js': 'x2', 'docs/x.md': 'd2' });
  now.set('template/content/link.json', { path: 'template/content/link.json', sha: 'l1', mode: '120000', type: 'blob' });
  const files = ['template/content/a.json', 'template/content/same.json', 'template/_headers', 'template/functions/x.js', 'template/admin/index.html', 'docs/x.md', 'template/content/link.json']
    .map((filename) => ({ filename, status: 'modified' }));
  const { entries, skipped } = revertEntries(files, before, now, 'template');
  assert.deepEqual(entries.map((e) => e.path), ['template/content/a.json']);
  for (const path of ['template/_headers', 'template/functions/x.js', 'template/admin/index.html', 'docs/x.md', 'template/content/link.json']) assert.ok(skipped.includes(path), path);
});

test('a plugin\'s folder deleted by the publish comes back file by file, and a file deleted since is not deleted again', () => {
  const before = tree({ 'plugins/a/plugin.json': 'p1', 'plugins/a/index.js': 'i1', 'plugins/plugins.json': 'l1' });
  const now = tree({ 'plugins/plugins.json': 'l2' });
  const { entries } = revertEntries([
    { filename: 'plugins/a/plugin.json', status: 'removed' },
    { filename: 'plugins/a/index.js', status: 'removed' },
    { filename: 'plugins/plugins.json', status: 'modified' },
    { filename: 'content/pages/added-then-gone.json', status: 'added' },
  ], before, now);
  assert.deepEqual(Object.fromEntries(entries.map((e) => [e.path, e.sha])), { 'plugins/a/plugin.json': 'p1', 'plugins/a/index.js': 'i1', 'plugins/plugins.json': 'l1' });
});

test('a page\'s copy that comes back is HEAD\'s root index.html, so it never points at an engine an update has replaced since', () => {
  const before = tree({ 'index.html': 'idx-old', 'om-oss/index.html': 'idx-old', 'kaker/index.html': 'idx-old', 'gammel/index.html': 'idx-old' });
  const now = tree({ 'index.html': 'idx-new', 'ny/index.html': 'idx-new', 'nyheter/index.html': 'idx-new' });
  const { entries } = revertEntries([
    { filename: 'om-oss/index.html', status: 'removed' },
    { filename: 'kaker/index.html', status: 'removed' },
    { filename: 'ny/index.html', status: 'renamed', previous_filename: 'gammel/index.html' },
    { filename: 'nyheter/index.html', status: 'added' },
  ], before, now);
  assert.deepEqual(Object.fromEntries(entries.map((e) => [e.path, e.sha])), {
    'om-oss/index.html': 'idx-new',
    'kaker/index.html': 'idx-new',
    'gammel/index.html': 'idx-new',
    'ny/index.html': null,
    'nyheter/index.html': null,
  });
  const inFolder = revertEntries([{ filename: 'template/om-oss/index.html', status: 'removed' }],
    tree({ 'template/index.html': 'a', 'template/om-oss/index.html': 'a' }), tree({ 'template/index.html': 'b' }), 'template');
  assert.deepEqual(inFolder.entries.map((e) => [e.path, e.sha]), [['template/om-oss/index.html', 'b']]);
});

test('a former name is undone for a rename only, never for a copy', () => {
  const before = tree({ 'content/pages/a.json': 'a1' });
  const now = tree({ 'content/pages/a.json': 'a2', 'content/pages/b.json': 'a1' });
  const { entries } = revertEntries([{ filename: 'content/pages/b.json', status: 'copied', previous_filename: 'content/pages/a.json' }], before, now);
  assert.deepEqual(entries.map((e) => [e.path, e.sha]), [['content/pages/b.json', null]]);
});

test('the revert function builds its tree from the publish\'s own changes, never from the whole tree before it', () => {
  const src = readFileSync(new URL('../template/functions/api/github/revert.js', import.meta.url), 'utf8');
  assert.match(src, /const \{ entries \} = revertEntries\(files, treeMap\(beforeTree\.tree\), treeMap\(nowTree\.tree\), rootDir\);/);
  assert.match(src, /body: JSON\.stringify\(\{ base_tree: headCommit\.tree\.sha, tree: entries \}\)/);
  assert.doesNotMatch(src, /treeSha = targetParent\.tree\.sha/);
  assert.doesNotMatch(src, /mode: '040000'/, 'no subtree is swapped whole');
});
