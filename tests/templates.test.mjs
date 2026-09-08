/**
 * The template model (0.6.7): contract tests for templates-model.js - the id regime, the re-id invariants at insertion and the anchor/clamp geometry for block groups.
 * The schema contract (mal.schema.json) is validated in editor/scripts/validate.mjs; the pure functions are tested here.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { templateId, cloneSectionForInsert, cloneBlocksForInsert, clonePageForInsert, TEMPLATE_KINDS, TEMPLATE_SCHEMA_VERSION } = await engineImport('templates-model.js');

let counter = 0;
const makeId = (prefix) => `${prefix}-test-${++counter}`;

const block = (id, frame) => ({
  id, type: 'text', version: 1, props: { html: '<p>Hei</p>' },
  frames: { desktop: { x: 10, y: 20, w: 30, h: 40, z: 1, rot: 0, ...frame }, mobile: null },
});

const section = () => ({
  id: 'sec-opphav', version: 1, preset: 'hero',
  size: { minHeight: '60vh' },
  background: { version: 1, layers: [] },
  blocks: [block('blk-a'), block('blk-b', { x: 50, y: 200 })],
  responsive: { mobile: { mode: 'auto', attention: null } },
});

test('templateId: slug of the name, empty string for an invalid name', () => {
  // Deliberate Norwegian template names: the slugging must fold letters like the a-ring.
  assert.equal(templateId('Vår hero'), 'var-hero');
  assert.equal(templateId('  Kort-trio!  '), 'kort-trio');
  assert.equal(templateId('!!!'), '');
  assert.equal(templateId(''), '');
  assert.equal(templateId(undefined), '');
});

test('the contract constants hold', () => {
  assert.deepEqual(TEMPLATE_KINDS, ['section', 'blocks', 'page']);
  assert.equal(TEMPLATE_SCHEMA_VERSION, 1);
});

test('cloneSectionForInsert: all ids new, original untouched, geometry preserved', () => {
  const original = section();
  const before = JSON.stringify(original);
  const out = cloneSectionForInsert(original, makeId);

  assert.notEqual(out.id, original.id);
  assert.ok(out.id.startsWith('sec-test-'));
  for (const [i, b] of out.blocks.entries()) {
    assert.notEqual(b.id, original.blocks[i].id);
    assert.ok(b.id.startsWith('blk-test-'));
    assert.deepEqual(b.frames, original.blocks[i].frames);
    assert.deepEqual(b.props, original.blocks[i].props);
  }
  assert.equal(JSON.stringify(original), before);
});

test('two insertions of the same template give disjoint id sets', () => {
  const original = section();
  const a = cloneSectionForInsert(original, makeId);
  const b = cloneSectionForInsert(original, makeId);
  const ids = (s) => [s.id, ...s.blocks.map((x) => x.id)];
  assert.equal(new Set([...ids(a), ...ids(b)]).size, ids(a).length + ids(b).length);
});

test('cloneBlocksForInsert without an anchor: positions kept, minBottom correct', () => {
  const blocks = [block('blk-a'), block('blk-b', { x: 50, y: 200 })];
  const { blocks: out, minBottom } = cloneBlocksForInsert(blocks, makeId);
  assert.deepEqual(out.map((b) => [b.frames.desktop.x, b.frames.desktop.y]), [[10, 20], [50, 200]]);
  assert.equal(minBottom, 240);
  assert.ok(out.every((b) => b.id.startsWith('blk-test-')));
});

test('cloneBlocksForInsert with an anchor: the group moves as one, internal layout preserved', () => {
  const blocks = [block('blk-a'), block('blk-b', { x: 50, y: 200 })];
  const { blocks: out } = cloneBlocksForInsert(blocks, makeId, { anchor: { x: 20, y: 100 } });
  // The top left corner (min x=10, min y=20) must hit the anchor: delta (10, 80).
  assert.deepEqual(out.map((b) => [b.frames.desktop.x, b.frames.desktop.y]), [[20, 100], [60, 280]]);
});

test('cloneBlocksForInsert: the anchor is clamped so the group stays inside the section', () => {
  const blocks = [block('blk-a'), block('blk-b', { x: 50, y: 200 })];
  // Anchor far to the right: max right edge is x=50 + w=30 = 80, so dx is clamped to 20.
  const { blocks: out } = cloneBlocksForInsert(blocks, makeId, { anchor: { x: 95, y: 0 } });
  assert.deepEqual(out.map((b) => b.frames.desktop.x), [30, 70]);
  // A negative anchor in y is clamped to 0 for the topmost block.
  const { blocks: up } = cloneBlocksForInsert(blocks, makeId, { anchor: { x: 10, y: -500 } });
  assert.equal(Math.min(...up.map((b) => b.frames.desktop.y)), 0);
});

test('cloneBlocksForInsert: frames.mobile in the row grid form travels along untouched', () => {
  const b = block('blk-a');
  b.frames.mobile = { x: 0, w: 100, row: 4, rows: 5 };
  const { blocks: out } = cloneBlocksForInsert([b], makeId, { anchor: { x: 30, y: 60 } });
  assert.deepEqual(out[0].frames.mobile, { x: 0, w: 100, row: 4, rows: 5 });
});

test('cloneBlocksForInsert: an old full mobile frame is lifted to the row grid form', () => {
  const b = block('blk-a');
  // A template saved before ADR-0019: full frame with y/h, not equal to the desktop frame.
  b.frames.mobile = { x: 5, y: 104, w: 90, h: 120, z: 1, rot: 0 };
  const { blocks: out } = cloneBlocksForInsert([b], makeId, {});
  assert.deepEqual(out[0].frames.mobile, { x: 5, w: 90, row: 11, rows: 15 });
});

test('cloneSectionForInsert: a byte-equal desktop copy in an old template is nulled', () => {
  const sec = section();
  sec.blocks[0].frames.mobile = { ...sec.blocks[0].frames.desktop };
  const out = cloneSectionForInsert(sec, makeId);
  assert.equal(out.blocks[0].frames.mobile, null);
});

const page = () => ({
  schemaVersion: 3,
  meta: { id: 'kampanje-opphav', title: 'Kampanjen' },
  sections: [section(), { ...section(), id: 'sec-to', blocks: [block('blk-c')] }],
});

test('clonePageForInsert: meta replaced, all ids new, original untouched', () => {
  const original = page();
  const before = JSON.stringify(original);
  const out = clonePageForInsert(original, makeId, { id: 'sommer', title: 'Sommer' });

  assert.equal(out.meta.id, 'sommer');
  assert.equal(out.meta.title, 'Sommer');
  assert.equal(out.schemaVersion, original.schemaVersion);
  assert.equal(out.sections.length, original.sections.length);
  for (const [i, s] of out.sections.entries()) {
    assert.notEqual(s.id, original.sections[i].id);
    assert.ok(s.id.startsWith('sec-test-'));
    assert.equal(s.preset, original.sections[i].preset);
    for (const [j, b] of s.blocks.entries()) {
      assert.notEqual(b.id, original.sections[i].blocks[j].id);
      assert.ok(b.id.startsWith('blk-test-'));
      assert.deepEqual(b.frames, original.sections[i].blocks[j].frames);
      assert.deepEqual(b.props, original.sections[i].blocks[j].props);
    }
  }
  assert.equal(JSON.stringify(original), before);
});

test('clonePageForInsert: two insertions give disjoint id sets', () => {
  const original = page();
  const ids = (p) => p.sections.flatMap((s) => [s.id, ...s.blocks.map((b) => b.id)]);
  const a = ids(clonePageForInsert(original, makeId, { id: 'a', title: 'A' }));
  const b = ids(clonePageForInsert(original, makeId, { id: 'b', title: 'B' }));
  assert.equal(new Set([...a, ...b]).size, a.length + b.length);
});

// Contract token lifting at insertion (ADR-0021): payloads saved before v3
// carry Norwegian tokens and bypass the page lift.

test('cloneSectionForInsert renames old contract tokens in the payload', () => {
  const old = section();
  old.theme = 'dus';
  old.background.layers.push({ type: 'bildegalleri', version: 1, props: {} });
  old.blocks.push({ ...block('blk-c'), type: 'handlekurv' });
  const out = cloneSectionForInsert(old, makeId);
  assert.equal(out.theme, 'soft');
  assert.equal(out.background.layers[0].type, 'slideshow');
  assert.equal(out.blocks[2].type, 'cart');
  assert.equal(old.blocks[2].type, 'handlekurv');
});

test('cloneBlocksForInsert renames old block types in the group', () => {
  const out = cloneBlocksForInsert([{ ...block('blk-a'), type: 'produkt' }], makeId);
  assert.equal(out.blocks[0].type, 'product');
});
