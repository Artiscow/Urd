/**
 * Contract test for the section presets: every create() gives a well-formed section, and every item() places new elements without overlapping existing blocks.
 * Schema validation of the same happens in editor/scripts/validate.mjs (ajv lives there); this test covers the structure and the placement geometry.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { registerSectionPresets } = await engineImport('sections/presets.js');

const defs = new Map();
registerSectionPresets({ sections: { define: (id, def) => defs.set(id, def) } });

const overlaps = (a, b) => {
  const eps = 0.01;
  return a.x < b.x + b.w - eps && b.x < a.x + a.w - eps
    && a.y < b.y + b.h - eps && b.y < a.y + a.h - eps;
};

const assertBlock = (block, presetId) => {
  assert.ok(block.id, `${presetId}: block missing id`);
  assert.ok(block.type, `${presetId}: block missing type`);
  assert.equal(block.version, 1, `${presetId}: block missing version`);
  assert.ok(block.props, `${presetId}: block missing props`);
  const d = block.frames?.desktop;
  assert.ok(d, `${presetId}: block missing desktop frame`);
  for (const key of ['x', 'y', 'w', 'h', 'z']) {
    assert.equal(typeof d[key], 'number', `${presetId}: frame.${key} is not a number`);
  }
  // With bound content width (ADR-0018) the percentages are of the content band, not the window, so a block outside 0-100 lands in the gutter where there is no room at all.
  // The height must be positive for the same reason: a frame with h <= 0 is invisible, not just small.
  assert.ok(d.x >= 0, `${presetId}: block starts outside the content band (x=${d.x})`);
  assert.ok(d.x + d.w <= 100.01, `${presetId}: block sticks out of the section (${d.x + d.w}%)`);
  assert.ok(d.w > 0, `${presetId}: block without width (w=${d.w})`);
  assert.ok(d.h > 0, `${presetId}: block without height (h=${d.h})`);
};

test('presets: create() gives well-formed sections', () => {
  assert.ok(defs.size >= 18, `expected at least 18 presets, got ${defs.size}`);
  for (const [id, def] of defs) {
    const section = def.create();
    assert.ok(section.id && section.preset === id, `${id}: section missing id/preset`);
    assert.ok(section.background?.layers?.length, `${id}: section missing background`);
    assert.ok(section.size?.minHeight, `${id}: section missing min height`);
    for (const block of section.blocks) assertBlock(block, id);
    const ids = section.blocks.map((b) => b.id);
    assert.equal(new Set(ids).size, ids.length, `${id}: duplicate block ids`);
  }
});

test('presets: create() gives fresh objects every time', () => {
  for (const [id, def] of defs) {
    const a = def.create();
    const b = def.create();
    assert.notEqual(a.id, b.id, `${id}: two calls share a section id`);
    if (a.blocks.length) {
      assert.notEqual(a.blocks[0], b.blocks[0], `${id}: two calls share block objects`);
    }
  }
});

/** Mirrors the editor's insertBlocks: moves are applied first, then the blocks are added. */
const applyItem = (section, next) => {
  for (const move of next.moves ?? []) {
    const block = section.blocks.find((b) => b.id === move.blockId);
    if (block) block.frames.desktop = { ...block.frames.desktop, y: block.frames.desktop.y + move.dy };
  }
  section.blocks.push(...next.blocks);
};

const assertNoOverlap = (section, next, id, hint) => {
  const moved = new Set((next.moves ?? []).map((m) => m.blockId));
  for (const block of next.blocks) {
    assertBlock(block, id);
    for (const existing of section.blocks) {
      if (moved.has(existing.id) || next.blocks.includes(existing)) continue;
      assert.ok(!overlaps(block.frames.desktop, existing.frames.desktop),
        `${id}${hint}: new element (${block.type} @ ${block.frames.desktop.x},${block.frames.desktop.y}) overlaps ${existing.type} @ ${existing.frames.desktop.x},${existing.frames.desktop.y}`);
    }
    assert.ok(next.bottom >= block.frames.desktop.y + block.frames.desktop.h,
      `${id}${hint}: bottom (${next.bottom}) does not cover the new element`);
  }
};

test('presets: item() places new elements without overlap, two rounds', () => {
  for (const [id, def] of defs) {
    if (!def.item) continue;
    assert.ok(def.itemLabel, `${id}: item without itemLabel`);
    const section = def.create();
    for (let round = 0; round < 2; round++) {
      const next = def.item(section);
      assert.ok(Number.isFinite(next.bottom), `${id}: item() missing bottom`);
      assert.ok(next.blocks.length, `${id}: item() gave no blocks`);
      assertNoOverlap(section, next, id, '');
      applyItem(section, next);
      // After applying, nothing in the section may overlap (catches moves that move too little).
      for (let i = 0; i < section.blocks.length; i++) {
        for (let j = i + 1; j < section.blocks.length; j++) {
          assert.ok(!overlaps(section.blocks[i].frames.desktop, section.blocks[j].frames.desktop),
            `${id}: overlap after applying item (${section.blocks[i].type} and ${section.blocks[j].type})`);
        }
      }
    }
  }
});

test('presets: item() fills the gap when a middle element is deleted', () => {
  for (const [id, def] of defs) {
    if (!def.item) continue;
    const section = def.create();
    const first = def.item(section);
    applyItem(section, first);
    // Delete the FIRST added element (mid-layout for the grid presets) and ask for a new one.
    const removed = new Set(first.blocks.map((b) => b.id));
    section.blocks = section.blocks.filter((b) => !removed.has(b.id));
    const second = def.item(section);
    assertNoOverlap(section, second, id, ' (after deletion)');
  }
});
