/**
 * The block search (palette-search.js): normalization, ranking and stable
 * filtering for the insertion menus.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { normalize, rankLabel, matchLabel, searchItems } = await engineImport('palette-search.js');

// The Norwegian labels below are deliberate fixtures: they exercise the text
// normalization (diacritics, word starts) on realistic UI labels.

test('normalize: lowercase and diacritics stripped', () => {
  assert.equal(normalize('Galleri'), 'galleri');
  assert.equal(normalize('Gallerí'), 'galleri');
  assert.equal(normalize('BÖLÜM'), 'bolum');
  assert.equal(normalize(undefined), '');
});

test('matchLabel: substring in any form; an empty query matches everything', () => {
  assert.equal(matchLabel('Bilde', 'bil'), true);
  assert.equal(matchLabel('Bildegalleri', 'GALLERI'), true);
  assert.equal(matchLabel('Galleri', 'gallerí'), true);
  assert.equal(matchLabel('Tekst', 'bil'), false);
  assert.equal(matchLabel('Tekst', ''), true);
  assert.equal(matchLabel('Tekst', '   '), true);
});

test('rankLabel: start before word start before substring before miss', () => {
  assert.equal(rankLabel('Kalender', 'ka'), 0);
  assert.equal(rankLabel('Min kalender', 'ka'), 1);
  assert.equal(rankLabel('Lokalkart', 'ka'), 2);
  assert.equal(rankLabel('Tekst', 'ka'), -1);
});

test('searchItems: best rank first, stable order within equal rank', () => {
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
  // Empty query: everything, in the original order.
  assert.equal(searchItems(items, '', (x) => x.label).length, 5);
});
