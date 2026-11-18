/**
 * The phone check before publishing (editor/src/lib/phone-check.js): the sections whose desktop layout changed since they last stood in the phone view.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
const { layoutKey, layoutKeys, uncheckedSections, seeSections } = await import('../editor/src/lib/phone-check.js');

const text = (id, y = 0, h = 60) => ({ id, type: 'text', props: { html: '<p>Words</p>' }, frames: { desktop: { x: 10, y, w: 40, h } } });
const image = (id, y = 0, h = 200) => ({ id, type: 'image', props: { src: '', alt: '' }, frames: { desktop: { x: 50, y, w: 40, h } } });
const quote = (id, y = 0, h = 120) => ({ id, type: 'quote', props: { quote: 'Words' }, frames: { desktop: { x: 10, y, w: 40, h } } });
const section = (id, blocks) => ({ id, blocks });

test('a section as published is checked', () => {
  const sections = [section('s1', [text('a'), image('b')]), section('s2', [text('c')])];
  assert.deepEqual(uncheckedSections(sections, layoutKeys(sections)), []);
});

test('no baseline means nothing to remind of', () => {
  assert.deepEqual(uncheckedSections([section('s1', [text('a')])], null), []);
});

test('a block resized, added or removed on the desktop leaves its section unchecked', () => {
  const before = [section('s1', [text('a'), image('b')]), section('s2', [text('c')]), section('s3', [text('d')]), section('s4', [text('e'), text('f')])];
  const base = layoutKeys(before);
  const resized = { ...image('b'), frames: { desktop: { x: 50, y: 0, w: 40, h: 260 } } };
  const after = [section('s1', [text('a'), resized]), section('s2', [text('c'), image('g')]), section('s3', [text('d')]), section('s4', [text('e')])];
  assert.deepEqual(uncheckedSections(after, base), ['s1', 's2', 's4']);
});

test('a new section is unchecked until seen', () => {
  const base = layoutKeys([section('s1', [text('a')])]);
  assert.deepEqual(uncheckedSections([section('s1', [text('a')]), section('s2', [text('b')])], base), ['s2']);
});

test('the height of a block that follows its content is no change of layout; a picture\'s is', () => {
  const base = layoutKeys([section('s1', [quote('a', 0, 120), image('b', 0, 200)])]);
  assert.deepEqual(uncheckedSections([section('s1', [quote('a', 0, 180), image('b', 0, 200)])], base), []);
  assert.deepEqual(uncheckedSections([section('s1', [quote('a', 0, 120), image('b', 0, 260)])], base), ['s1']);
});

test('every block shifted at once, as the seam grip does, is no change of layout', () => {
  const base = layoutKeys([section('s1', [text('a', 20), image('b', 100)])]);
  assert.deepEqual(uncheckedSections([section('s1', [text('a', 60), image('b', 140)])], base), []);
});

test('a text that grows on the desktop and pushes the block below it down is no change of layout', () => {
  const base = layoutKeys([section('s1', [text('a', 0, 60), image('b', 80)])]);
  assert.deepEqual(uncheckedSections([section('s1', [text('a', 0, 120), image('b', 140)])], base), []);
});

test('a block moved past another on the desktop leaves its section unchecked, since the phone\'s order changed; one moved beside it, the order kept, does not', () => {
  const base = layoutKeys([section('s1', [text('a', 0), image('b', 100)])]);
  assert.deepEqual(uncheckedSections([section('s1', [text('a', 400), image('b', 100)])], base), ['s1']);
  assert.deepEqual(uncheckedSections([section('s1', [text('a', 0), { ...image('b', 0), frames: { desktop: { x: 60, y: 0, w: 40, h: 200 } } }])], base), []);
});

test('the phone\'s own settings changed from the desktop view leave the section unchecked', () => {
  const sections = [section('s1', [text('a'), image('b', 100)])];
  const base = layoutKeys(sections);
  const hidden = [section('s1', [text('a'), { ...image('b', 100), hideMobile: true }])];
  const cells = [section('s1', [text('a'), { ...image('b', 100), frames: { desktop: { x: 50, y: 100, w: 40, h: 200 }, mobile: { col: 1, cols: 4 } } }])];
  const rule = [{ ...section('s1', [text('a'), image('b', 100)]), phoneOrder: 'left' }];
  const gap = [{ ...section('s1', [text('a'), image('b', 100)]), size: { mobileGap: 32 } }];
  const room = [{ ...section('s1', [text('a'), image('b', 100)]), size: { mobilePadBottom: 80 } }];
  for (const changed of [hidden, cells, rule, gap, room]) assert.deepEqual(uncheckedSections(changed, base), ['s1']);
});

test('words and settings are no change of layout', () => {
  const base = layoutKeys([section('s1', [text('a')])]);
  const edited = { ...text('a'), props: { html: '<p>Other words</p>', color: 'red' } };
  assert.deepEqual(uncheckedSections([section('s1', [edited])], base), []);
});

test('a section seen in the phone view is checked again; the others stay unchecked', () => {
  const base = layoutKeys([section('s1', [text('a'), image('b', 100)]), section('s2', [text('c'), image('d', 100)])]);
  const after = [section('s1', [text('a', 300), image('b', 100)]), section('s2', [text('c', 300), image('d', 100)])];
  const seen = seeSections(base, after, ['s1']);
  assert.deepEqual(uncheckedSections(after, seen), ['s2']);
  assert.equal(seen.s1, layoutKey(after[0]));
});

test('seeing sections that did not change returns the same baseline', () => {
  const sections = [section('s1', [text('a')])];
  const base = layoutKeys(sections);
  assert.equal(seeSections(base, sections, ['s1']), base);
});

test('a change undone is checked again', () => {
  const sections = [section('s1', [text('a'), image('b', 100)])];
  const base = layoutKeys(sections);
  assert.deepEqual(uncheckedSections([section('s1', [text('a', 300), image('b', 100)])], base), ['s1']);
  assert.deepEqual(uncheckedSections(sections, base), []);
});
