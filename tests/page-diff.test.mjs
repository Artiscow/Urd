/**
 * What changed between the saved version of a page and this browser's (editor/src/lib/page-diff.js), compared by the ids sections and blocks keep.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
const { pageDiff } = await import('../editor/src/lib/page-diff.js');

const text = (id, html, y = 0) => ({ id, type: 'text', props: { html }, frames: { desktop: { x: 10, y, w: 40, h: 60 } } });
const image = (id, src, y = 0) => ({ id, type: 'image', props: { src, alt: '' }, frames: { desktop: { x: 50, y, w: 40, h: 200 } } });
const section = (id, blocks, extra = {}) => ({ id, preset: 'blank', size: { minHeight: 400 }, background: { layers: [] }, blocks, ...extra });
const page = (...sections) => ({ sections });

const kinds = (list) => list.map((d) => `${d.kind}:${d.blockId ?? d.sectionId}`);

test('the same page has no differences', () => {
  const p = page(section('s1', [text('b1', '<h1>Om oss</h1>')]));
  assert.deepEqual(pageDiff(p, structuredClone(p)), []);
  assert.deepEqual(pageDiff(null, null), []);
});

test('a text, a picture and a block\'s place each say what changed, named by the block\'s own words', () => {
  const mine = page(section('s1', [text('b1', '<h1>Om oss</h1><p>Old</p>'), image('b2', '/media/a.jpg', 100)]));
  const saved = structuredClone(mine);
  saved.sections[0].blocks[0].props.html = '<h1>Om oss</h1><p>New opening text</p>';
  saved.sections[0].blocks[1].props.src = '/media/b.jpg';
  saved.sections[0].blocks[1].frames.desktop.x = 20;
  const diff = pageDiff(saved, mine);
  assert.deepEqual(kinds(diff), ['textChanged:b1', 'blockPlaced:b2', 'pictureChanged:b2']);
  assert.equal(diff[0].words, 'Om oss');
  assert.equal(diff[1].type, 'image');
});

test('sections added, taken away and moved, and a block that changed section', () => {
  const mine = page(section('s1', [text('b1', 'One')]), section('s2', [text('b2', 'Two')]), section('s3', [text('b3', 'Three')]));
  const saved = page(
    structuredClone(mine.sections[1]),
    { ...structuredClone(mine.sections[0]), blocks: [] },
    section('s4', [text('b4', 'Four'), text('b1', 'One', 120)]),
  );
  const diff = pageDiff(saved, mine);
  assert.deepEqual(kinds(diff).sort(), ['blockMoved:b1', 'sectionAdded:s4', 'sectionMoved:s1', 'sectionRemoved:s3'].sort());
  assert.ok(!kinds(diff).includes('blockAdded:b4'), 'a block in a new section is the section\'s news');
  assert.equal(diff.find((d) => d.kind === 'sectionRemoved').words, 'Three');
});

test('a block taken away, a section set differently, and a block\'s own settings', () => {
  const mine = page(section('s1', [text('b1', 'One'), text('b2', 'Two', 100)]));
  const saved = structuredClone(mine);
  saved.sections[0].blocks.pop();
  saved.sections[0].size.minHeight = 600;
  saved.sections[0].blocks[0].props.align = 'center';
  assert.deepEqual(kinds(pageDiff(saved, mine)), ['sectionSettings:s1', 'settingsChanged:b1', 'blockRemoved:b2']);
});

test('the measured height of a block that follows its content is no difference', () => {
  const faq = { id: 'b1', type: 'faq', props: { items: [{ q: 'Når?', a: 'Nå' }] }, frames: { desktop: { x: 10, y: 0, w: 60, h: 120 } } };
  const mine = page(section('s1', [faq]));
  const saved = structuredClone(mine);
  saved.sections[0].blocks[0].frames.desktop.h = 180;
  assert.deepEqual(pageDiff(saved, mine), [], 'an FAQ follows its content');
  const pictured = page(section('s1', [image('b2', '/media/a.jpg')]));
  const taller = structuredClone(pictured);
  taller.sections[0].blocks[0].frames.desktop.h = 300;
  assert.deepEqual(kinds(pageDiff(taller, pictured)), ['blockPlaced:b2'], 'a picture keeps its own height');
});

test('the page\'s own settings, and no difference from a measured phone height or the order of keys', () => {
  const mine = { meta: { id: 'hjem', description: 'Old' }, sections: [section('s1', [{ ...text('b1', 'One'), style: { a: 1, b: 2 } }])] };
  const saved = structuredClone(mine);
  saved.meta.description = 'New';
  assert.deepEqual(kinds(pageDiff(saved, mine)), ['pageSettings:s1']);
  const measured = structuredClone(mine);
  measured.sections[0].blocks[0].mobileHeight = 240;
  measured.sections[0].blocks[0].style = { b: 2, a: 1 };
  assert.deepEqual(pageDiff(measured, mine), []);
});
