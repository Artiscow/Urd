/**
 * Oppsetts-modellen (section-layouts.js): klassifisering, leseordre og
 * layout-variantene som rene frames+minHeight-funksjoner. Invariantene:
 * alle bevegelige blokker får ramme innenfor 0-100 % i x/w, høyder og
 * rotasjon røres aldri, dekor/former røres aldri, resultatet er
 * deterministisk, og for få/feil blokker gir ingen varianter.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { movableBlocks, readingOrder, applicableLayouts, layoutFrames, LAYOUT_IDS } = await engineImport('section-layouts.js');

const block = (id, type, frame = {}, extra = {}) => ({
  id, type, version: 1, props: {},
  frames: { desktop: { x: 10, y: 20, w: 30, h: 40, z: 1, rot: 0, ...frame }, mobile: null },
  ...extra,
});

const GRID = { size: 24 };

const heroish = () => [
  block('tekst', 'text', { x: 8, y: 30, w: 40, h: 60 }),
  block('knapp', 'button', { x: 8, y: 110, w: 20, h: 44 }),
  block('bilde', 'image', { x: 55, y: 20, w: 38, h: 220 }),
  block('pynt', 'shape', { x: 70, y: 10, w: 20, h: 20 }),
  block('dekor', 'image', { x: 0, y: 0, w: 10, h: 10 }, { decor: true }),
];

test('movableBlocks: dekor og former holdes utenfor', () => {
  assert.deepEqual(movableBlocks(heroish()).map((b) => b.id), ['tekst', 'knapp', 'bilde']);
});

test('readingOrder: (y, x), stabil på id', () => {
  const order = readingOrder(movableBlocks(heroish())).map((b) => b.id);
  assert.deepEqual(order, ['bilde', 'tekst', 'knapp']);
});

test('applicableLayouts: alle seks med tekst+media, kun stable/kolonner uten media', () => {
  assert.deepEqual(applicableLayouts(heroish()), LAYOUT_IDS);
  const bareTekst = [block('a', 'text'), block('b', 'button', { y: 80 })];
  assert.deepEqual(applicableLayouts(bareTekst), ['stack-center', 'stack-left', 'two-columns']);
});

test('faerre enn to bevegelige blokker gir ingen varianter', () => {
  assert.deepEqual(applicableLayouts([block('a', 'text')]), []);
  assert.deepEqual(applicableLayouts([block('a', 'text'), block('p', 'shape')]), []);
  assert.equal(layoutFrames('stack-center', [block('a', 'text')], GRID), null);
});

test('alle varianter: hver bevegelig blokk faar ramme innenfor 0-100, h/rot uroert', () => {
  const blocks = heroish();
  for (const id of LAYOUT_IDS) {
    const result = layoutFrames(id, blocks, GRID);
    assert.ok(result, id);
    assert.equal(result.frames.length, 3, id);
    for (const { blockId, frame } of result.frames) {
      const original = blocks.find((b) => b.id === blockId).frames.desktop;
      assert.ok(frame.x >= 0 && frame.x + frame.w <= 100, `${id}:${blockId} innenfor bredden`);
      assert.ok(frame.y >= 0, `${id}:${blockId} y >= 0`);
      assert.equal(frame.h, original.h, `${id}:${blockId} hoeyde uroert`);
      assert.equal(frame.rot, original.rot, `${id}:${blockId} rotasjon uroert`);
    }
    // Dekor og former har ingen rammer i resultatet.
    assert.ok(!result.frames.some((f) => f.blockId === 'pynt' || f.blockId === 'dekor'), id);
  }
});

test('minHeight >= nederste blokk + marg, samme regel som tilpass hoeyde', () => {
  for (const id of LAYOUT_IDS) {
    const result = layoutFrames(id, heroish(), GRID);
    const maxBottom = Math.max(...result.frames.map(({ frame }) => frame.y + frame.h));
    assert.equal(result.minHeight, `${Math.max(GRID.size * 3, maxBottom + GRID.size)}px`, id);
  }
});

test('deterministisk: samme inndata gir identisk resultat', () => {
  const a = JSON.stringify(layoutFrames('two-columns', heroish(), GRID));
  const b = JSON.stringify(layoutFrames('two-columns', heroish(), GRID));
  assert.equal(a, b);
});

test('split-media-right: tekst venstre, media hoeyre; speilet for -left', () => {
  const right = layoutFrames('split-media-right', heroish(), GRID);
  const get = (res, id) => res.frames.find((f) => f.blockId === id).frame;
  assert.equal(get(right, 'tekst').x, 8);
  assert.equal(get(right, 'bilde').x, 54);
  const left = layoutFrames('split-media-left', heroish(), GRID);
  assert.equal(get(left, 'tekst').x, 54);
  assert.equal(get(left, 'bilde').x, 8);
});

test('hero-top: stoerste media i full bredde oeverst, resten midtstilt under', () => {
  const result = layoutFrames('hero-top', heroish(), GRID);
  const hero = result.frames.find((f) => f.blockId === 'bilde').frame;
  assert.equal(hero.w, 84);
  assert.equal(hero.y, GRID.size);
  for (const { blockId, frame } of result.frames) {
    if (blockId === 'bilde') continue;
    assert.ok(frame.y > hero.y + hero.h - 1, `${blockId} under heroen`);
    assert.equal(frame.x, (100 - frame.w) / 2, `${blockId} midtstilt`);
  }
});

test('two-columns: neste blokk i korteste kolonne (balansering)', () => {
  const blocks = [
    block('hoy', 'image', { x: 8, y: 10, w: 40, h: 300 }),
    block('a', 'text', { x: 52, y: 20, w: 40, h: 50 }),
    block('b', 'text', { x: 52, y: 90, w: 40, h: 50 }),
  ];
  const result = layoutFrames('two-columns', blocks, GRID);
  const get = (id) => result.frames.find((f) => f.blockId === id).frame;
  // «hoy» tar venstre kolonne; a og b stables begge i hoeyre.
  assert.equal(get('hoy').x, 8);
  assert.equal(get('a').x, 52);
  assert.equal(get('b').x, 52);
  assert.ok(get('b').y > get('a').y);
});
