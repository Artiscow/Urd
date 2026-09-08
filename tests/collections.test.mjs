/**
 * Tests for the collection pattern's pure helpers (ADR-0007): sorting, year
 * grouping and the date badge. The collection block itself is DOM code and
 * is covered by the test rounds; schema validation of collection files runs
 * in editor/scripts/validate.mjs.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { sortEntries, groupByYear, dateBadge } = await engineImport('collections.js');

// Deliberate Norwegian titles: plain fixture data (user collection content).
const entries = [
  { id: 'a', title: 'Eldst', date: '2024-03-01' },
  { id: 'b', title: 'Uten dato' },
  { id: 'c', title: 'Nyest', date: '2026-07-19' },
  { id: 'd', title: 'Midt', date: '2025-12-24' },
  { id: 'e', title: 'Også uten dato' },
];

test('sortEntries: newest first, undated last in original order, input untouched', () => {
  const sorted = sortEntries(entries);
  assert.deepEqual(sorted.map((e) => e.id), ['c', 'd', 'a', 'b', 'e']);
  assert.deepEqual(entries.map((e) => e.id), ['a', 'b', 'c', 'd', 'e'], 'the input must not be mutated');
});

test('sortEntries: oldest first when newestFirst is false', () => {
  assert.deepEqual(sortEntries(entries, false).map((e) => e.id), ['a', 'd', 'c', 'b', 'e']);
});

test('groupByYear: newest year first, undated in their own group last', () => {
  const groups = groupByYear(entries);
  assert.deepEqual(groups.map((g) => g.year), ['2026', '2025', '2024', null]);
  assert.deepEqual(groups.at(-1).entries.map((e) => e.id), ['b', 'e']);
});

test('dateBadge: valid dates give day/month/year, invalid give null', () => {
  assert.deepEqual(dateBadge('2026-07-19'), { day: '19', month: 'jul', year: '2026' });
  assert.deepEqual(dateBadge('2026-01-05'), { day: '5', month: 'jan', year: '2026' });
  // 'i går' is deliberate non-date input ("yesterday").
  for (const bad of [undefined, null, '', '2026-13-01', '19.07.2026', 'i går']) {
    assert.equal(dateBadge(bad), null, String(bad));
  }
});
