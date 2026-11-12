/**
 * Duplication of a page and of a section (editor/src/lib/duplicate.js): the copy's slug takes the first free number, and a section's copy lands below its original with fresh ids and free anchor names.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
const { copySlug, duplicatedSection } = await import('../editor/src/lib/duplicate.js');

const PAGES = [
  { id: 'hjem', path: '/' },
  { id: 'om-oss', path: '/om-oss' },
  { id: 'om-oss-2', path: '/om-oss-2' },
  { id: 'top-10', path: '/top-10' },
];

test('copySlug: the first free number from 2, a copy numbered on from its original, a name ending in a number kept whole', () => {
  assert.equal(copySlug('hjem', PAGES), 'hjem-2');
  assert.equal(copySlug('om-oss', PAGES), 'om-oss-3', 'om-oss-2 is taken');
  assert.equal(copySlug('om-oss-2', PAGES), 'om-oss-3', 'the copy of a copy numbers on');
  assert.equal(copySlug('top-10', PAGES), 'top-10-2', 'no top beside it, so 10 is part of the name');
  assert.equal(copySlug('kaker', []), 'kaker-2');
});

test('duplicatedSection: the copy below the original with fresh ids, its anchor names made free, the page untouched', () => {
  let n = 0;
  const makeId = (prefix) => `${prefix}-new${++n}`;
  const page = {
    sections: [
      { id: 'sec-a', anchor: 'intro', blocks: [{ id: 'blk-1', anchor: 'hero', type: 'text', props: { html: '<p>Hi</p>' }, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } }] },
      { id: 'sec-b', blocks: [] },
    ],
  };
  const before = JSON.stringify(page);
  const copy = duplicatedSection(page, 'sec-a', makeId);
  assert.equal(copy.index, 1, 'directly below the original');
  assert.equal(copy.section.id, 'sec-new1');
  assert.equal(copy.section.blocks[0].id, 'blk-new2');
  assert.equal(copy.section.anchor, 'intro-2');
  assert.equal(copy.section.blocks[0].anchor, 'hero-2');
  assert.equal(copy.section.blocks[0].props.html, '<p>Hi</p>', 'the content comes along');
  assert.equal(JSON.stringify(page), before, 'the page given is not changed');
  assert.equal(duplicatedSection(page, 'sec-x', makeId), null);
});

test('a copy passes over the slugs it may not take, and names a page whose every numbered copy is reserved apart', () => {
  const reserved = (slug) => /^(?:collection-|template-)/.test(slug) || slug === 'om-oss-2';
  assert.equal(copySlug('om-oss', [{ id: 'om-oss', path: '/om-oss' }], reserved), 'om-oss-3');
  assert.equal(copySlug('collection', [{ id: 'collection', path: '/collection' }], reserved), 'page-collection-2');
  assert.equal(copySlug('om-oss', [{ id: 'om-oss', path: '/om-oss' }]), 'om-oss-2', 'with nothing reserved, as before');
});
