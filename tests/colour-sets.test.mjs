/**
 * The site's colour sets and the live set «On this site» (editor/src/lib/colour-sets.js, BACKLOG 0.7.9.2).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SET_LIMITS, colourCode, setsOf, setsAfter, newSetId, siteColours } from '../editor/src/lib/colour-sets.js';

test('a colour is read as #rrggbb, or #rrggbbaa where it is not opaque', () => {
  assert.equal(colourCode('#ABC'), '#aabbcc');
  assert.equal(colourCode(' #15B39A '), '#15b39a');
  assert.equal(colourCode('#15b39aff'), '#15b39a', 'an opaque alpha is dropped');
  assert.equal(colourCode('#15b39a80'), '#15b39a80');
  assert.equal(colourCode('rgb(21, 179, 154)'), '#15b39a');
  assert.equal(colourCode('rgba(21,179,154,0.5)'), '#15b39a80');
  assert.equal(colourCode('rgba(21,179,154,1)'), '#15b39a');
  for (const odd of ['accent', '#12345', '#ggg', '', null, 'rgb(1,2)']) assert.equal(colourCode(odd), null, `${odd} is no colour`);
});

test('the sets are read within their bounds, a broken one left out', () => {
  assert.deepEqual(setsOf(undefined), []);
  assert.deepEqual(setsOf({ colorSets: 'no' }), []);
  const read = setsOf({ colorSets: [
    { id: 'set-1', name: ' Brand ', colors: [{ code: '#ABC', name: ' Teal ' }, { code: 'accent' }, { code: '#000' }] },
    { id: 'set-1', name: 'Twin', colors: [] },
    { id: 'Bad Id', name: 'x', colors: [] },
    { id: 'set-2', name: '', colors: [] },
    null,
  ] });
  assert.deepEqual(read, [
    { id: 'set-1', name: 'Brand', colors: [{ code: '#aabbcc', name: 'Teal' }, { code: '#000000' }] },
    { id: 'set-2', name: 'set-2', colors: [] },
  ], 'trimmed, a non-colour dropped, a twin id and a bad id left out, an empty name read as the id');
  const many = setsOf({ colorSets: Array.from({ length: 50 }, (_, i) => ({ id: `s${i}`, name: 'x'.repeat(60), colors: Array.from({ length: 60 }, () => ({ code: '#fff' })) })) });
  assert.equal(many.length, SET_LIMITS.sets);
  assert.equal(many[0].colors.length, SET_LIMITS.colours);
  assert.equal(many[0].name.length, SET_LIMITS.name);
});

test('a set is added, renamed, given a colour, has one taken out, and is deleted, each a new list; a change of nothing gives the same list', () => {
  const start = setsOf({ colorSets: [{ id: 'set-a', name: 'Brand', colors: [{ code: '#15b39a' }] }] });
  const added = setsAfter(start, { kind: 'add', set: { id: 'set-b', name: 'Market', colors: [{ code: '#b3000c', name: 'Holly red' }] } });
  assert.deepEqual(added.map((s) => s.id), ['set-a', 'set-b']);
  assert.equal(setsAfter(added, { kind: 'add', set: { id: 'set-b', name: 'Twin', colors: [] } }), added, 'an id taken adds nothing');
  const renamed = setsAfter(added, { kind: 'rename', id: 'set-a', name: '  Our brand ' });
  assert.equal(renamed[0].name, 'Our brand');
  assert.equal(setsAfter(renamed, { kind: 'rename', id: 'set-a', name: '   ' }), renamed, 'an empty name keeps the one there');
  const given = setsAfter(renamed, { kind: 'addColour', id: 'set-a', code: '#FFC857' });
  assert.deepEqual(given[0].colors, [{ code: '#15b39a' }, { code: '#ffc857' }]);
  assert.equal(setsAfter(given, { kind: 'addColour', id: 'set-a', code: '#ffc857' }), given, 'a colour already there is not added twice');
  assert.equal(setsAfter(given, { kind: 'addColour', id: 'set-a', code: 'accent' }), given, 'a theme colour is no code');
  const taken = setsAfter(given, { kind: 'removeColour', id: 'set-a', index: 0 });
  assert.deepEqual(taken[0].colors, [{ code: '#ffc857' }]);
  assert.equal(setsAfter(taken, { kind: 'removeColour', id: 'set-a', index: 5 }), taken);
  assert.deepEqual(setsAfter(taken, { kind: 'delete', id: 'set-b' }).map((s) => s.id), ['set-a']);
  assert.equal(setsAfter(taken, { kind: 'delete', id: 'set-z' }), taken);
  assert.deepEqual(start[0].colors, [{ code: '#15b39a' }], 'the list given is left as it was');
});

test('a new set\'s id is set- and eight hex digits, never one taken', () => {
  const id = newSetId([]);
  assert.match(id, /^set-[0-9a-f]{8}$/);
  const taken = Array.from({ length: 20 }, () => ({ id: newSetId([]) }));
  assert.ok(!taken.some((s) => s.id === newSetId(taken)));
});

test('«On this site»: the codes the pages and settings use, and the colours in a text\'s style, the most used first', () => {
  const pages = [
    { sections: [{ background: [{ type: 'color', props: { color: '#15B39A' } }], blocks: [
      { type: 'button', props: { colors: { bg: '#15b39a', text: 'accent' } } },
      { type: 'text', props: { html: '<p>A <span style="color: #b3000c">red</span> and <mark style="background-color: rgb(255, 200, 87)">sun</mark></p>' } },
      { type: 'shape', props: { fill: '#000' } },
    ] }] },
    { sections: [{ blocks: [{ type: 'text', props: { html: '<p style="color:#b3000c">More red</p>' } }, { type: 'button', props: { href: '#decade', link: { href: '#facade' }, anchor: 'fab', target: '#add' } }] }] },
  ];
  const settings = { nav: { style: { colors: { text: '#15b39a' } } }, footer: { color: 'surface' } };
  assert.deepEqual(siteColours([settings, ...pages]), [
    { code: '#15b39a', count: 3 },
    { code: '#b3000c', count: 2 },
    { code: '#ffc857', count: 1 },
    { code: '#000000', count: 1 },
  ], 'a theme colour by name is no colour, and a link to a spot named like a code («#decade») is passed by');
  assert.equal(siteColours([{ list: Array.from({ length: 40 }, (_, i) => `#0000${i.toString(16).padStart(2, '0')}`) }]).length, 24, 'at most twenty-four');
});

test('the sets live in the site\'s theme, each change one undo step, and the live set reads every page with the theme left out', () => {
  const site = readFileSync(new URL('../editor/src/state/site.svelte.js', import.meta.url), 'utf8');
  assert.match(site, /if \(next\.length\) siteDraft\.theme\.colorSets = next;\s*else delete siteDraft\.theme\.colorSets;/);
  assert.match(site, /const renameColourSet = \(id, name\) => changeColourSets\(`edit:theme-colour-set-name:\$\{id\}`/, 'a name typed is one step for the typing, the theme\'s');
  assert.match(site, /pagesRead\.delete\(entry\.file\);\s*return \$state\.snapshot\(pageState\.store\?\.data \?\? null\);/, 'the open page\'s file read anew once it is left');
  assert.match(site, /const \{ theme: _theme, \.\.\.settings \} = \$state\.snapshot\(siteDraft\);\s*return siteColours\(\[settings, \.\.\.docs\.filter\(Boolean\)\]\);/);
  const schema = JSON.parse(readFileSync(new URL('../schema/site.schema.json', import.meta.url), 'utf8'));
  const field = schema.properties.theme.properties.colorSets;
  assert.equal(field.maxItems, SET_LIMITS.sets);
  assert.equal(field.items.properties.colors.maxItems, SET_LIMITS.colours);
  assert.equal(field.items.properties.name.maxLength, SET_LIMITS.name);
});
