/**
 * The template's _headers at a release (scripts/release-headers.mjs, ADR-0013 addendum).
 * The monorepo's file revalidates the engine, and the release swaps in the template's own engine block.
 * A released site keeps the rule it has, and the updater never shows its owner a «change by hand» note for it.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { releaseHeaders, MONOREPO_BLOCK, RELEASE_BLOCK } from '../scripts/release-headers.mjs';

const MONOREPO = readFileSync(new URL('../template/_headers', import.meta.url), 'utf8');

/** The git blob SHA of a text: what the updater compares between two tags. */
const blobSha = (text) => {
  const bytes = Buffer.from(text, 'utf8');
  return createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
};

// The template repo's _headers at v0.7.4 (read from the GitHub API, 7 October 2026).
// A deliberate change of the template's _headers updates this SHA, and the updater then shows the owner of every site with the earlier file a «change by hand» note.
const RELEASED_BLOB = 'a20e6b5999a32b5c1b0614969b34e3c327124fa8';

test('the release gives the template\'s _headers byte for byte', () => {
  assert.equal(blobSha(releaseHeaders(MONOREPO)), RELEASED_BLOB);
});

test('the release changes the engine block and nothing else', () => {
  const released = releaseHeaders(MONOREPO);
  assert.equal(released.replace(RELEASE_BLOCK, ''), MONOREPO.replace(MONOREPO_BLOCK, ''));
});

test('the monorepo revalidates the engine, and the template caches it forever with a version-neutral rule', () => {
  const rule = (block) => block.slice(block.lastIndexOf('/assets/engine/*\n'));
  assert.match(rule(MONOREPO_BLOCK), /^\/assets\/engine\/\*\n {2}Cache-Control: no-cache\n$/);
  assert.match(rule(RELEASE_BLOCK), /^\/assets\/engine\/\*\n {2}Cache-Control: public, max-age=31536000, immutable\n$/);
  assert.ok(!/\/assets\/engine\/\d/.test(releaseHeaders(MONOREPO)), 'the released _headers names no engine version');
});

test('the release fails without the monorepo\'s engine block, or with it twice', () => {
  assert.throws(() => releaseHeaders(releaseHeaders(MONOREPO)), /exactly once \(found 0\)/);
  assert.throws(() => releaseHeaders(MONOREPO + MONOREPO_BLOCK), /exactly once \(found 2\)/);
});
