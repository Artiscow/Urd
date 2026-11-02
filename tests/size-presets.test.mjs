/**
 * The sizes «Presets» fill (editor/src/lib/size-presets.js): the sets the shop uses, the worded and numbered sets, and the sizes added each once.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shopSizeSets, wordedSet, numberedSet, withSizes } from '../editor/src/lib/size-presets.js';

const plain = (s) => String(s);

test('the shop\'s sets come from every product collection, each once, without the entry being edited or a set it has', () => {
  const views = {
    kaker: { kind: 'products', entries: [
      { id: 'a', title: 'Sjokoladekake', sizes: ['Liten', 'Stor'] },
      { id: 'b', title: 'Marsipankake', sizes: ['8 biter', '12 biter'] },
      { id: 'c', title: 'Gulrotkake', sizes: ['Liten', 'Stor'] },
    ] },
    nyheter: { kind: 'news', entries: [{ id: 'n', title: 'x', sizes: ['ignored'] }] },
    brod: { kind: 'products', entries: [{ id: 'd', title: 'Brød', sizes: ['S', 'M'] }, { id: 'e', title: 'Rundstykker' }] },
  };
  assert.deepEqual(shopSizeSets(views, null, plain), [
    { sizes: ['Liten', 'Stor'], from: 'Sjokoladekake' },
    { sizes: ['8 biter', '12 biter'], from: 'Marsipankake' },
    { sizes: ['S', 'M'], from: 'Brød' },
  ]);
  assert.deepEqual(shopSizeSets(views, 'a', plain).map((s) => s.from), ['Marsipankake', 'Brød'], 'the set the edited entry has is left out');
});

test('a worded set reads its seed text, and a numbered set writes each number into the owner\'s wording', () => {
  assert.deepEqual(wordedSet('Liten, Middels , Stor,'), ['Liten', 'Middels', 'Stor']);
  assert.deepEqual(numberedSet('2, 4, 6', '#-pakning'), ['2-pakning', '4-pakning', '6-pakning']);
  assert.deepEqual(numberedSet('6 12', '# stk'), ['6 stk', '12 stk']);
  assert.deepEqual(numberedSet('1,5', 'Pakke med #'), ['Pakke med 1', 'Pakke med 5']);
  assert.deepEqual(numberedSet('2, 4', 'liter'), ['2 liter', '4 liter'], 'without «#» the number goes first');
  assert.deepEqual(numberedSet('2, x, 2, 0.5', '# kg'), ['2 kg', '0.5 kg'], 'not a number and a repeat are left out; a decimal takes a dot, since the comma divides the numbers');
  assert.deepEqual(numberedSet('3', ''), ['3']);
});

test('a set adds its sizes after the ones there, each once', () => {
  assert.deepEqual(withSizes(['Liten'], ['Liten', 'Stor']), ['Liten', 'Stor']);
  assert.deepEqual(withSizes(undefined, ['S', 'M']), ['S', 'M']);
});
