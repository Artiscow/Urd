/**
 * Test av samlingsmønsterets rene hjelpere (ADR-0007): sortering, år-gruppering
 * og dato-badge. Selve samling-blokken er DOM-kode og dekkes av eiers testrunde;
 * skjemavalideringen av samlingsfiler kjøres i editor/scripts/validate.mjs.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sortEntries, groupByYear, dateBadge } from '../template/assets/engine/samlinger.js';

const entries = [
  { id: 'a', title: 'Eldst', date: '2024-03-01' },
  { id: 'b', title: 'Uten dato' },
  { id: 'c', title: 'Nyest', date: '2026-07-19' },
  { id: 'd', title: 'Midt', date: '2025-12-24' },
  { id: 'e', title: 'Også uten dato' },
];

test('sortEntries: nyeste først, udaterte sist i original rekkefølge, input urørt', () => {
  const sorted = sortEntries(entries);
  assert.deepEqual(sorted.map((e) => e.id), ['c', 'd', 'a', 'b', 'e']);
  assert.deepEqual(entries.map((e) => e.id), ['a', 'b', 'c', 'd', 'e'], 'input må ikke muteres');
});

test('sortEntries: eldste først når newestFirst er false', () => {
  assert.deepEqual(sortEntries(entries, false).map((e) => e.id), ['a', 'd', 'c', 'b', 'e']);
});

test('groupByYear: nyeste år først, udaterte i egen gruppe sist', () => {
  const groups = groupByYear(entries);
  assert.deepEqual(groups.map((g) => g.year), ['2026', '2025', '2024', null]);
  assert.deepEqual(groups.at(-1).entries.map((e) => e.id), ['b', 'e']);
});

test('dateBadge: gyldige datoer gir dag/måned/år, ugyldige gir null', () => {
  assert.deepEqual(dateBadge('2026-07-19'), { day: '19', month: 'jul', year: '2026' });
  assert.deepEqual(dateBadge('2026-01-05'), { day: '5', month: 'jan', year: '2026' });
  for (const bad of [undefined, null, '', '2026-13-01', '19.07.2026', 'i går']) {
    assert.equal(dateBadge(bad), null, String(bad));
  }
});
