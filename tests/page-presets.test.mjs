/**
 * Contract tests for the starter packs (built-in page templates, 0.6.7.12):
 * the preset references must exist in the core registration, every built
 * page must have the right meta and globally unique ids, and two builds of
 * the same starter pack must never share ids (create() gives fresh ones).
 * Schema validity is validated in editor/scripts/validate.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { PAGE_PRESETS, buildPagePreset } = await engineImport('page-presets.js');
const { registerSectionPresets } = await engineImport('sections/presets.js');

const defs = new Map();
registerSectionPresets({ sections: { define: (id, def) => defs.set(id, def) } });

const allIds = (page) => page.sections.flatMap((s) => [s.id, ...s.blocks.map((b) => b.id)]);

test('all starter pack references point to core presets that exist', () => {
  assert.ok(PAGE_PRESETS.length >= 5);
  for (const preset of PAGE_PRESETS) {
    for (const sid of preset.sections) {
      assert.ok(defs.has(sid), `${preset.id} references unknown preset "${sid}"`);
    }
    assert.ok(preset.labelKey?.startsWith('pageTemplate.'));
  }
});

test('buildPagePreset: right meta, section count and globally unique ids', () => {
  for (const preset of PAGE_PRESETS) {
    const page = buildPagePreset(preset.id, { pageId: 'kampanje', title: 'Kampanjen' });
    assert.equal(page.meta.id, 'kampanje');
    assert.equal(page.meta.title, 'Kampanjen');
    assert.equal(page.sections.length, preset.sections.length);
    const ids = allIds(page);
    assert.equal(new Set(ids).size, ids.length, `${preset.id} has a duplicate id`);
  }
});

test('two builds of the same starter pack share no ids', () => {
  const a = allIds(buildPagePreset('landing', { pageId: 'a', title: 'A' }));
  const b = allIds(buildPagePreset('landing', { pageId: 'b', title: 'B' }));
  assert.equal(new Set([...a, ...b]).size, a.length + b.length);
});

test('an unknown starter pack id gives null', () => {
  assert.equal(buildPagePreset('finnes-ikke', { pageId: 'x', title: 'X' }), null);
});
