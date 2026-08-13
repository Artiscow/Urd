/**
 * Mal-modellen (0.6.7): kontraktstester for maler-model.js - id-regimet,
 * re-id-invariantene ved innsetting og anker/klem-geometrien for
 * blokkgrupper. Skjemakontrakten (mal.schema.json) valideres i
 * editor/scripts/validate.mjs; her testes de rene funksjonene.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { malId, cloneSectionForInsert, cloneBlocksForInsert, clonePageForInsert, MAL_KINDS, MAL_SCHEMA_VERSION } = await engineImport('maler-model.js');

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

test('malId: slug av navnet, tom streng for ugyldig navn', () => {
  assert.equal(malId('Vår hero'), 'var-hero');
  assert.equal(malId('  Kort-trio!  '), 'kort-trio');
  assert.equal(malId('!!!'), '');
  assert.equal(malId(''), '');
  assert.equal(malId(undefined), '');
});

test('kontraktskonstantene står', () => {
  assert.deepEqual(MAL_KINDS, ['section', 'blocks', 'page']);
  assert.equal(MAL_SCHEMA_VERSION, 1);
});

test('cloneSectionForInsert: alle id-er nye, originalen urørt, geometri bevart', () => {
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

test('to innsettinger av samme mal gir disjunkte id-sett', () => {
  const original = section();
  const a = cloneSectionForInsert(original, makeId);
  const b = cloneSectionForInsert(original, makeId);
  const ids = (s) => [s.id, ...s.blocks.map((x) => x.id)];
  assert.equal(new Set([...ids(a), ...ids(b)]).size, ids(a).length + ids(b).length);
});

test('cloneBlocksForInsert uten anker: posisjoner beholdes, minBottom riktig', () => {
  const blocks = [block('blk-a'), block('blk-b', { x: 50, y: 200 })];
  const { blocks: out, minBottom } = cloneBlocksForInsert(blocks, makeId);
  assert.deepEqual(out.map((b) => [b.frames.desktop.x, b.frames.desktop.y]), [[10, 20], [50, 200]]);
  assert.equal(minBottom, 240);
  assert.ok(out.every((b) => b.id.startsWith('blk-test-')));
});

test('cloneBlocksForInsert med anker: gruppen flyttes samlet, innbyrdes oppsett bevart', () => {
  const blocks = [block('blk-a'), block('blk-b', { x: 50, y: 200 })];
  const { blocks: out } = cloneBlocksForInsert(blocks, makeId, { anchor: { x: 20, y: 100 } });
  // Øvre venstre hjørne (min x=10, min y=20) skal treffe ankeret: delta (10, 80).
  assert.deepEqual(out.map((b) => [b.frames.desktop.x, b.frames.desktop.y]), [[20, 100], [60, 280]]);
});

test('cloneBlocksForInsert: ankeret klemmes så gruppen holder seg i seksjonen', () => {
  const blocks = [block('blk-a'), block('blk-b', { x: 50, y: 200 })];
  // Anker langt til høyre: maks høyrekant er x=50 + w=30 = 80, så dx klemmes til 20.
  const { blocks: out } = cloneBlocksForInsert(blocks, makeId, { anchor: { x: 95, y: 0 } });
  assert.deepEqual(out.map((b) => b.frames.desktop.x), [30, 70]);
  // Negativt anker i y klemmes til 0 for øverste blokk.
  const { blocks: up } = cloneBlocksForInsert(blocks, makeId, { anchor: { x: 10, y: -500 } });
  assert.equal(Math.min(...up.map((b) => b.frames.desktop.y)), 0);
});

test('cloneBlocksForInsert: frames.mobile i radnett-formen følger med urørt', () => {
  const b = block('blk-a');
  b.frames.mobile = { x: 0, w: 100, row: 4, rows: 5 };
  const { blocks: out } = cloneBlocksForInsert([b], makeId, { anchor: { x: 30, y: 60 } });
  assert.deepEqual(out[0].frames.mobile, { x: 0, w: 100, row: 4, rows: 5 });
});

test('cloneBlocksForInsert: gammel full mobil-frame løftes til radnett-formen', () => {
  const b = block('blk-a');
  // Mal lagret før ADR-0019: full frame med y/h, ikke lik desktop-framen.
  b.frames.mobile = { x: 5, y: 104, w: 90, h: 120, z: 1, rot: 0 };
  const { blocks: out } = cloneBlocksForInsert([b], makeId, {});
  assert.deepEqual(out[0].frames.mobile, { x: 5, w: 90, row: 11, rows: 15 });
});

test('cloneSectionForInsert: byte-lik desktop-kopi i gammel mal nulles', () => {
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

test('clonePageForInsert: meta erstattes, alle id-er nye, originalen urørt', () => {
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

test('clonePageForInsert: to innsettinger gir disjunkte id-sett', () => {
  const original = page();
  const ids = (p) => p.sections.flatMap((s) => [s.id, ...s.blocks.map((b) => b.id)]);
  const a = ids(clonePageForInsert(original, makeId, { id: 'a', title: 'A' }));
  const b = ids(clonePageForInsert(original, makeId, { id: 'b', title: 'B' }));
  assert.equal(new Set([...a, ...b]).size, a.length + b.length);
});
