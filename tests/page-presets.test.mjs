/**
 * Kontraktstester for startpakkene (innebygde side-maler, 0.6.7.12):
 * preset-referansene skal finnes i kjerne-registreringen, hver bygde side
 * skal ha riktig meta og gjennomgående unike id-er, og to bygg av samme
 * startpakke skal aldri dele id-er (create() gir ferske). Skjemagyldigheten
 * valideres i editor/scripts/validate.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { PAGE_PRESETS, buildPagePreset } = await engineImport('page-presets.js');
const { registerSectionPresets } = await engineImport('sections/presets.js');

const defs = new Map();
registerSectionPresets({ sections: { define: (id, def) => defs.set(id, def) } });

const allIds = (page) => page.sections.flatMap((s) => [s.id, ...s.blocks.map((b) => b.id)]);

test('alle startpakke-referanser peker på kjerne-presets som finnes', () => {
  assert.ok(PAGE_PRESETS.length >= 5);
  for (const preset of PAGE_PRESETS) {
    for (const sid of preset.sections) {
      assert.ok(defs.has(sid), `${preset.id} refererer ukjent preset «${sid}»`);
    }
    assert.ok(preset.labelKey?.startsWith('pageTemplate.'));
  }
});

test('buildPagePreset: riktig meta, seksjonstall og gjennomgående unike id-er', () => {
  for (const preset of PAGE_PRESETS) {
    const page = buildPagePreset(preset.id, { pageId: 'kampanje', title: 'Kampanjen' });
    assert.equal(page.meta.id, 'kampanje');
    assert.equal(page.meta.title, 'Kampanjen');
    assert.equal(page.sections.length, preset.sections.length);
    const ids = allIds(page);
    assert.equal(new Set(ids).size, ids.length, `${preset.id} har duplikat-id`);
  }
});

test('to bygg av samme startpakke deler ingen id-er', () => {
  const a = allIds(buildPagePreset('landing', { pageId: 'a', title: 'A' }));
  const b = allIds(buildPagePreset('landing', { pageId: 'b', title: 'B' }));
  assert.equal(new Set([...a, ...b]).size, a.length + b.length);
});

test('ukjent startpakke-id gir null', () => {
  assert.equal(buildPagePreset('finnes-ikke', { pageId: 'x', title: 'X' }), null);
});
