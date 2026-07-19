/**
 * Kontraktstest for seksjonspresetene: hver create() gir en velformet seksjon, og hver item() plasserer nye elementer uten å overlappe eksisterende blokker.
 * Skjemavalidering av det samme skjer i editor/scripts/validate.mjs (ajv bor der); denne testen dekker strukturen og plasseringsgeometrien.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { registerSectionPresets } from '../template/assets/engine/sections/presets.js';

const defs = new Map();
registerSectionPresets({ sections: { define: (id, def) => defs.set(id, def) } });

const overlaps = (a, b) => {
  const eps = 0.01;
  return a.x < b.x + b.w - eps && b.x < a.x + a.w - eps
    && a.y < b.y + b.h - eps && b.y < a.y + a.h - eps;
};

const assertBlock = (block, presetId) => {
  assert.ok(block.id, `${presetId}: blokk mangler id`);
  assert.ok(block.type, `${presetId}: blokk mangler type`);
  assert.equal(block.version, 1, `${presetId}: blokk mangler version`);
  assert.ok(block.props, `${presetId}: blokk mangler props`);
  const d = block.frames?.desktop;
  assert.ok(d, `${presetId}: blokk mangler desktop-frame`);
  for (const key of ['x', 'y', 'w', 'h', 'z']) {
    assert.equal(typeof d[key], 'number', `${presetId}: frame.${key} er ikke tall`);
  }
  assert.ok(d.x + d.w <= 100.01, `${presetId}: blokk stikker ut av seksjonen (${d.x + d.w}%)`);
};

test('presets: create() gir velformede seksjoner', () => {
  assert.ok(defs.size >= 18, `ventet minst 18 presets, fikk ${defs.size}`);
  for (const [id, def] of defs) {
    const section = def.create();
    assert.ok(section.id && section.preset === id, `${id}: seksjonen mangler id/preset`);
    assert.ok(section.background?.layers?.length, `${id}: seksjonen mangler bakgrunn`);
    assert.ok(section.size?.minHeight, `${id}: seksjonen mangler minstehøyde`);
    for (const block of section.blocks) assertBlock(block, id);
    const ids = section.blocks.map((b) => b.id);
    assert.equal(new Set(ids).size, ids.length, `${id}: dupliserte blokk-ider`);
  }
});

test('presets: create() gir ferske objekter hver gang', () => {
  for (const [id, def] of defs) {
    const a = def.create();
    const b = def.create();
    assert.notEqual(a.id, b.id, `${id}: to kall deler seksjons-id`);
    if (a.blocks.length) {
      assert.notEqual(a.blocks[0], b.blocks[0], `${id}: to kall deler blokkobjekter`);
    }
  }
});

/** Speiler editorens insertBlocks: moves flyttes først, så legges blokkene til. */
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
        `${id}${hint}: nytt element (${block.type} @ ${block.frames.desktop.x},${block.frames.desktop.y}) overlapper ${existing.type} @ ${existing.frames.desktop.x},${existing.frames.desktop.y}`);
    }
    assert.ok(next.bottom >= block.frames.desktop.y + block.frames.desktop.h,
      `${id}${hint}: bottom (${next.bottom}) dekker ikke det nye elementet`);
  }
};

test('presets: item() plasserer nye elementer uten overlapp, to runder', () => {
  for (const [id, def] of defs) {
    if (!def.item) continue;
    assert.ok(def.itemLabel, `${id}: item uten itemLabel`);
    const section = def.create();
    for (let round = 0; round < 2; round++) {
      const next = def.item(section);
      assert.ok(Number.isFinite(next.bottom), `${id}: item() mangler bottom`);
      assert.ok(next.blocks.length, `${id}: item() ga ingen blokker`);
      assertNoOverlap(section, next, id, '');
      applyItem(section, next);
      // Etter påføring skal ingenting i seksjonen overlappe (fanger moves som flytter for lite).
      for (let i = 0; i < section.blocks.length; i++) {
        for (let j = i + 1; j < section.blocks.length; j++) {
          assert.ok(!overlaps(section.blocks[i].frames.desktop, section.blocks[j].frames.desktop),
            `${id}: overlapp etter item-påføring (${section.blocks[i].type} og ${section.blocks[j].type})`);
        }
      }
    }
  }
});

test('presets: item() fyller igjen hullet når et element i midten er slettet', () => {
  for (const [id, def] of defs) {
    if (!def.item) continue;
    const section = def.create();
    const first = def.item(section);
    applyItem(section, first);
    // Slett det FØRSTE tillagte elementet (midt i utlegget for rutenett-presetene) og be om et nytt.
    const removed = new Set(first.blocks.map((b) => b.id));
    section.blocks = section.blocks.filter((b) => !removed.has(b.id));
    const second = def.item(section);
    assertNoOverlap(section, second, id, ' (etter sletting)');
  }
});
