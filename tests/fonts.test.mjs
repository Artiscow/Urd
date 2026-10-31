/**
 * The font list the themed dropdowns take (fonts.js fontChoices): every face's name drawn in the typeface it names, a decorative face's in the UI font with a sample beside it.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { FONT_STACKS, fontChoices } = await engineImport('fonts.js');
const t = (key) => `«${key}»`;

test('every face comes after the caller\'s first entries, named, with its stack as the value and the face', () => {
  const list = fontChoices(t, [['', 'Inherit']]);
  assert.deepEqual(list[0], ['', 'Inherit']);
  assert.equal(list.length, FONT_STACKS.length + 1);
  for (const [i, [key, stack]] of FONT_STACKS.entries()) {
    assert.deepEqual(list[i + 1], [stack, t(key), null, { font: stack }]);
  }
});

test('a decorative face keeps the UI font for its name and carries a sample in its own', () => {
  const list = fontChoices(t, [], [['font.script', "'Brush Script MT', cursive", 'decorative'], ['font.georgia', 'Georgia, serif']]);
  assert.deepEqual(list[0], ["'Brush Script MT', cursive", t('font.script'), null, { font: "'Brush Script MT', cursive", sample: t('font.sample') }]);
  assert.deepEqual(list[1][3], { font: 'Georgia, serif' });
});

test('the sample has a word in the core languages', async () => {
  for (const lang of ['nb', 'en-GB', 'tr']) {
    const { default: dict } = await engineImport(`locales/admin/${lang}.js`);
    assert.equal(typeof dict.strings['font.sample'], 'string', lang);
  }
});
