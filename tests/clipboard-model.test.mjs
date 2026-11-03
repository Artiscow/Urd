/**
 * The editing clipboard (clipboard-model.js): blocks or a whole section copied as plain data, a clipboard from the editor checked before use, a pasted section with fresh ids, and where it lands.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { blocksClipboard, sectionClipboard, readClipboard, pastedSection, pasteIndex } = await engineImport('clipboard-model.js');

const block = (id, extra = {}) => ({ id, type: 'text', props: { html: `<p>${id}</p>` }, frames: { desktop: { x: 10, y: 20, w: 30, h: 40 } }, ...extra });
const SECTION = { id: 'sec-a', anchor: 'intro', blocks: [block('blk-1'), block('blk-2', { anchor: 'hero' }), block('blk-3')] };

test('blocksClipboard: the chosen blocks in page order as plain copies, with the section they came from', () => {
  const clip = blocksClipboard(SECTION, ['blk-3', 'blk-1']);
  assert.equal(clip.kind, 'blocks');
  assert.equal(clip.sectionId, 'sec-a');
  assert.deepEqual(clip.blocks.map((b) => b.id), ['blk-1', 'blk-3']);
  clip.blocks[0].props.html = 'changed';
  assert.equal(SECTION.blocks[0].props.html, '<p>blk-1</p>', 'the page is not shared with the clipboard');
  assert.equal(blocksClipboard(SECTION, ['blk-9']), null);
});

test('sectionClipboard: a whole section as a plain copy; something without an id or blocks is not one', () => {
  const clip = sectionClipboard(SECTION);
  assert.equal(clip.kind, 'section');
  assert.notEqual(clip.section, SECTION);
  assert.deepEqual(clip.section, SECTION);
  assert.equal(sectionClipboard({ blocks: [] }), null);
  assert.equal(sectionClipboard({ id: 'sec-x' }), null);
  assert.equal(sectionClipboard(null), null);
});

test('readClipboard: blocks with a desktop frame each, or a section; the rest is refused', () => {
  assert.equal(readClipboard(blocksClipboard(SECTION, ['blk-1'])).blocks[0].id, 'blk-1');
  assert.equal(readClipboard(sectionClipboard(SECTION)).section.id, 'sec-a');
  assert.equal(readClipboard({ sectionId: 'sec-a', blocks: [block('blk-1')] }), null, 'a clipboard without its kind');
  assert.equal(readClipboard({ kind: 'blocks', blocks: [{ id: 'blk-1', type: 'text', frames: {} }] }), null, 'a block without its frame');
  assert.equal(readClipboard({ kind: 'blocks', blocks: [] }), null);
  assert.equal(readClipboard({ kind: 'page', blocks: [block('blk-1')] }), null);
  assert.equal(readClipboard('blocks'), null);
  assert.equal(readClipboard(null), null);
});

test('pastedSection: the section with fresh ids for itself and its blocks, its content and anchors kept for the editor to free', () => {
  let n = 0;
  const makeId = (prefix) => `${prefix}-new${++n}`;
  const section = pastedSection(sectionClipboard(SECTION), makeId);
  assert.equal(section.id, 'sec-new1');
  assert.deepEqual(section.blocks.map((b) => b.id), ['blk-new2', 'blk-new3', 'blk-new4']);
  assert.equal(section.blocks[1].anchor, 'hero');
  assert.equal(section.blocks[0].props.html, '<p>blk-1</p>');
  assert.equal(SECTION.id, 'sec-a', 'the clipboard is not changed');
  assert.equal(pastedSection(blocksClipboard(SECTION, ['blk-1']), makeId), null);
});

test('pasteIndex: directly below the section named, else last', () => {
  const sections = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  assert.equal(pasteIndex(sections, 'a'), 1);
  assert.equal(pasteIndex(sections, 'c'), 3);
  assert.equal(pasteIndex(sections, 'gone'), 3);
  assert.equal(pasteIndex(sections, null), 3);
  assert.equal(pasteIndex([], null), 0);
});
