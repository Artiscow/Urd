/**
 * The update plan (ADR-0014): pure logic, tree listings in and a change set out.
 * The scenarios mirror the rule table in update-plan.js, including the engine swap (the old versioned folder is deleted, the new one added) which falls out of the generic rules without dedicated code.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  planUpdate, highestVersionTag, isAtomPath, chunkEntries,
} from '../template/functions/_lib/update-plan.js';

const change = (plan, path) => plan.changes.find((c) => c.path === path);

test('highestVersionTag: the highest three-part wins, other names are ignored', () => {
  assert.equal(highestVersionTag(['v0.6.8', 'v0.6.9', 'v0.6.10']), 'v0.6.10');
  assert.equal(highestVersionTag(['v0.9.1', 'v1.0.0', 'v0.10.2']), 'v1.0.0');
  assert.equal(highestVersionTag(['v0.6.9-rc.1', 'utkast', 'v0.6']), null);
  assert.equal(highestVersionTag(['v0.6.9-rc.1', 'v0.6.8']), 'v0.6.8');
  assert.equal(highestVersionTag([]), null);
  assert.equal(highestVersionTag(undefined), null);
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
