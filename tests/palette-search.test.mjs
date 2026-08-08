/**
 * Blokk-søket (palette-search.js): normalisering, rangering og stabil
 * filtrering for innsettingsmenyene.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { normalize, rankLabel, matchLabel, searchItems } = await engineImport('palette-search.js');

test('normalize: små bokstaver og diakritikk-stripp', () => {
  assert.equal(normalize('Galleri'), 'galleri');
  assert.equal(normalize('Gallerí'), 'galleri');
  assert.equal(normalize('BÖLÜM'), 'bolum');
  assert.equal(normalize(undefined), '');
});

test('matchLabel: delstreng uansett form; tomt søk matcher alt', () => {
  assert.equal(matchLabel('Bilde', 'bil'), true);
  assert.equal(matchLabel('Bildegalleri', 'GALLERI'), true);
  assert.equal(matchLabel('Galleri', 'gallerí'), true);
  assert.equal(matchLabel('Tekst', 'bil'), false);
  assert.equal(matchLabel('Tekst', ''), true);
  assert.equal(matchLabel('Tekst', '   '), true);
});

test('rankLabel: start foran ordstart foran delstreng foran bom', () => {
  assert.equal(rankLabel('Kalender', 'ka'), 0);
  assert.equal(rankLabel('Min kalender', 'ka'), 1);
  assert.equal(rankLabel('Lokalkart', 'ka'), 2);
  assert.equal(rankLabel('Tekst', 'ka'), -1);
});

test('searchItems: beste rang først, stabil rekkefølge innen lik rang', () => {
  const items = [
    { label: 'Lokalkart' },
    { label: 'Kalender: Liste' },
    { label: 'Tekst' },
    { label: 'Kalender: Måned' },
    { label: 'Min kalender' },
  ];
  assert.deepEqual(
    searchItems(items, 'ka', (x) => x.label).map((x) => x.label),
    ['Kalender: Liste', 'Kalender: Måned', 'Min kalender', 'Lokalkart'],
  );
  // Tomt søk: alt, i original rekkefølge.
  assert.equal(searchItems(items, '', (x) => x.label).length, 5);
});
