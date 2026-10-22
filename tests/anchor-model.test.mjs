/**
 * Named spots on a page (anchor-model.js): the reasons a name is refused, the ids a page already uses, free names, suggestions from a spot's own words, the clean-up when content is copied in, and the uniqueness check validate.mjs runs.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { anchorError, takenAnchors, uniqueAnchor, suggestAnchor, blockWords, sectionWords, claimAnchors, duplicateAnchors, pageSpots, ANCHOR_MAX } = await engineImport('anchor-model.js');

// Deliberately Norwegian content: site content stays Norwegian (ADR-0021).
const PAGE = {
  sections: [
    {
      id: 'sec-aaaa1111', anchor: 'priser', blocks: [
        { id: 'blk-1', type: 'text', anchor: 'kaker', props: { html: '<h2>Våre kaker</h2><p>Bakt i dag</p>' }, frames: { desktop: { y: 40 } } },
        { id: 'blk-2', type: 'form', props: { fields: [{ id: 'navn' }, { id: 'epost' }] }, frames: { desktop: { y: 200 } } },
      ],
    },
    { id: 'sec-bbbb2222', blocks: [] },
  ],
};

test('anchorError: the naming rule, the engine\'s own prefixes and a name in use', () => {
  const taken = takenAnchors(PAGE);
  assert.equal(anchorError('apningstider', taken), null);
  assert.equal(anchorError('priser', taken), 'taken');
  assert.equal(anchorError('navn-in', taken), 'taken', 'a form input\'s id');
  assert.equal(anchorError('sec-aaaa1111', taken), 'reserved');
  assert.equal(anchorError('blk-x', taken), 'reserved');
  assert.equal(anchorError('urd-nav', taken), 'reserved');
  for (const bad of ['Priser', '-priser', 'priser-', 'pri ser', 'prisér', '', 'a'.repeat(41), null, 7]) {
    assert.equal(anchorError(bad, taken), 'form', String(bad));
  }
  assert.equal(anchorError('a'.repeat(40), taken), null);
});

test('takenAnchors: every id and name on the page, apart from the spot being named', () => {
  const all = takenAnchors(PAGE);
  for (const id of ['sec-aaaa1111', 'priser', 'blk-1', 'kaker', 'blk-2', 'navn-in', 'epost-in', 'sec-bbbb2222']) assert.ok(all.has(id), id);
  const own = takenAnchors(PAGE, 'sec-aaaa1111');
  assert.ok(!own.has('priser'), 'the section\'s own name stays free for it');
  assert.ok(own.has('kaker'));
  assert.equal(takenAnchors(null).size, 0);
});

test('uniqueAnchor: -2, -3 while taken, within the length limit', () => {
  assert.equal(uniqueAnchor('priser', new Set()), 'priser');
  assert.equal(uniqueAnchor('priser', new Set(['priser'])), 'priser-2');
  assert.equal(uniqueAnchor('priser', new Set(['priser', 'priser-2'])), 'priser-3');
  assert.equal(uniqueAnchor('urd', new Set(['urd'])), 'urd2', 'never a reserved prefix');
  assert.equal(uniqueAnchor('sec', new Set(['sec', 'sec2'])), 'sec3');
  assert.equal(suggestAnchor('Urd', new Set(['urd'])), 'urd2');
  const long = 'a'.repeat(ANCHOR_MAX);
  const next = uniqueAnchor(long, new Set([long]));
  assert.equal(next.length, ANCHOR_MAX);
  assert.ok(next.endsWith('-2'));
});

test('suggestAnchor: the slug of the words, cut at a whole word, free on the page', () => {
  assert.equal(suggestAnchor('Våre priser'), 'vare-priser');
  assert.equal(suggestAnchor('Café & bakeri'), 'cafe-bakeri');
  assert.equal(suggestAnchor('Priser', new Set(['priser'])), 'priser-2');
  assert.equal(suggestAnchor('Sec-tion of things'), 'tion-of-things', 'never a reserved prefix');
  const cut = suggestAnchor('Alt du trenger å vite om bestilling av kaker til store selskaper');
  assert.ok(cut.length <= ANCHOR_MAX);
  assert.ok(!cut.endsWith('-'));
  assert.equal(cut, 'alt-du-trenger-a-vite-om-bestilling-av');
  assert.equal(suggestAnchor('!!!'), '');
  assert.equal(suggestAnchor(''), '');
});

test('blockWords and sectionWords: the first heading, else the first words', () => {
  assert.equal(blockWords(PAGE.sections[0].blocks[0]), 'Våre kaker');
  assert.equal(blockWords({ props: { html: '<p>Bakt <b>i</b> dag &amp; i morgen, hver eneste dag</p>' } }), 'Bakt i dag i morgen, hver');
  assert.equal(blockWords({ props: { label: 'Bestill nå' } }), 'Bestill nå');
  assert.equal(blockWords({ props: {} }), '');
  assert.equal(sectionWords(PAGE.sections[0]), 'Våre kaker');
  const lower = { blocks: [
    { props: { html: '<p>Ingress</p>' }, frames: { desktop: { y: 10 } } },
    { props: { html: '<h3>Overskrift</h3>' }, frames: { desktop: { y: 300 } } },
  ] };
  assert.equal(sectionWords(lower), 'Overskrift', 'a heading anywhere in the section comes first');
  assert.equal(sectionWords({ blocks: [] }), '');
});

test('claimAnchors: copied names that are taken arrive as name-2, and two copies get different names', () => {
  const template = { id: 'sec-new', anchor: 'priser', blocks: [{ id: 'blk-new', anchor: 'kaker' }, { id: 'blk-new2', anchor: 'Bad Name' }] };
  claimAnchors([template], PAGE);
  assert.equal(template.anchor, 'priser-2');
  assert.equal(template.blocks[0].anchor, 'kaker-2');
  assert.equal(template.blocks[1].anchor, undefined, 'a name that breaks the rule is dropped');
  const twice = [{ id: 'blk-a', anchor: 'meny' }, { id: 'blk-b', anchor: 'meny' }];
  claimAnchors(twice, PAGE);
  assert.deepEqual(twice.map((b) => b.anchor), ['meny', 'meny-2']);
  const plain = [{ id: 'blk-c' }];
  claimAnchors(plain, PAGE);
  assert.equal('anchor' in plain[0], false, 'a copy without a name gets none');
});

test('duplicateAnchors: a name given twice, or equal to another spot\'s id', () => {
  assert.deepEqual(duplicateAnchors(PAGE), []);
  const twice = structuredClone(PAGE);
  twice.sections[1].anchor = 'priser';
  assert.deepEqual(duplicateAnchors(twice), ['priser']);
  const onInput = structuredClone(PAGE);
  onInput.sections[1].anchor = 'navn-in';
  assert.deepEqual(duplicateAnchors(onInput), ['navn-in']);
  assert.deepEqual(duplicateAnchors({}), []);
});

test('pageSpots: every section by number with its name and words, and the named blocks under it from the top', () => {
  const page = { sections: [
    { id: 'sec-a', anchor: 'priser', blocks: [
      { id: 'blk-2', anchor: 'nede', props: { html: '<p>Nede</p>' }, frames: { desktop: { y: 300 } } },
      { id: 'blk-1', anchor: 'oppe', props: { html: '<h2>Oppe</h2>' }, frames: { desktop: { y: 10 } } },
      { id: 'blk-3', props: { html: '<p>Uten navn</p>' }, frames: { desktop: { y: 20 } } },
    ] },
    { id: 'sec-b', blocks: [] },
  ] };
  assert.deepEqual(pageSpots(page), [
    { id: 'sec-a', kind: 'section', n: 1, name: 'priser', words: 'Oppe' },
    { id: 'blk-1', kind: 'block', n: 1, name: 'oppe', words: 'Oppe' },
    { id: 'blk-2', kind: 'block', n: 1, name: 'nede', words: 'Nede' },
    { id: 'sec-b', kind: 'section', n: 2, name: '', words: '' },
  ]);
  assert.deepEqual(pageSpots(null), []);
});
