/**
 * Kontraktstester for sticky-tilstanden (sticky-model.js): festing og
 * slipp regnes rent fra scrollposisjon og dokumentmål; DOM-delen i
 * sticky.js bygger kun på disse svarene.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { stickyState, groupBox, dockPosition } = await engineImport('sticky-model.js');

// Standardoppsett: seksjon fra 1000, blokk 200 inn i seksjonen, 100 høy,
// egen seksjons bunn på 2000, festes 16 px fra vindustoppen.
const m = { sectionTop: 1000, blockY: 200, blockH: 100, limitBottom: 2000, offset: 16 };

test('før festepunktet: blokken står i sin vanlige posisjon', () => {
  assert.deepEqual(stickyState(0, m), { mode: 'static' });
  // Nøyaktig på festepunktet (blokktopp == offset) er den fortsatt statisk.
  assert.deepEqual(stickyState(1000 + 200 - 16, m), { mode: 'static' });
});

test('forbi festepunktet: fixed på offset-avstanden', () => {
  assert.deepEqual(stickyState(1185, m), { mode: 'fixed', top: 16 });
  assert.deepEqual(stickyState(1600, m), { mode: 'fixed', top: 16 });
});

test('ved slippgrensen: blokken parkeres der grensen er', () => {
  // Grensen 2000: blokkbunnen (offset 16 + h 100 = 116 under vindustoppen)
  // ville krysset 2000 når scrollY > 1884.
  assert.deepEqual(stickyState(1885, m), { mode: 'parked', y: 2000 - 1000 - 100 });
});

test('until i senere seksjon: holder fixed forbi egen seksjonsbunn', () => {
  const langt = { ...m, limitBottom: 5000 };
  assert.deepEqual(stickyState(2500, langt), { mode: 'fixed', top: 16 });
  assert.deepEqual(stickyState(4900, langt), { mode: 'parked', y: 5000 - 1000 - 100 });
});

test('offset respekteres i både feste og slipp', () => {
  const høy = { ...m, offset: 80 };
  assert.deepEqual(stickyState(1000 + 200 - 80, høy), { mode: 'static' });
  assert.deepEqual(stickyState(1121, høy), { mode: 'fixed', top: 80 });
});

test('ugyldig/for tidlig grense: alltid statisk', () => {
  // Grensen ligger OVER blokkens naturlige plass (parkert-y < blockY).
  const tidlig = { ...m, limitBottom: 1250 };
  assert.deepEqual(stickyState(0, tidlig), { mode: 'static' });
  assert.deepEqual(stickyState(5000, tidlig), { mode: 'static' });
});

test('blokk høyere enn rommet mellom offset og grense: parkeres i stedet for å feste', () => {
  const trang = { ...m, blockY: 900, blockH: 900, limitBottom: 2800 };
  // Festepunktet nås, men offset 16 + høyde 900 får aldri plass over
  // grensen: blokken går rett til parkert uten å feste.
  const state = stickyState(1900, trang);
  assert.equal(state.mode, 'parked');
  assert.equal(state.y, 2800 - 1000 - 900);
});

// Gruppefesting: blokkene festes som ÉN enhet og beholder plasseringen seg
// imellom, i stedet for at alle legger seg oppå hverandre ved vindustoppen.
test('groupBox: omsluttende boks for medlemmene', () => {
  assert.deepEqual(groupBox([
    { x: 10, y: 100, w: 50, h: 20 },
    { x: 30, y: 140, w: 40, h: 60 },
  ]), { x: 10, y: 100, w: 60, h: 100 });
});

test('groupBox: ett medlem gir medlemmets egen boks', () => {
  assert.deepEqual(groupBox([{ x: 5, y: 7, w: 11, h: 13 }]), { x: 5, y: 7, w: 11, h: 13 });
});

test('groupBox: gruppen festes som boksen, og medlemmene beholder avstanden', () => {
  const items = [{ x: 0, y: 200, w: 100, h: 40 }, { x: 0, y: 300, w: 100, h: 40 }];
  const box = groupBox(items);
  const state = stickyState(1000 + box.y - 16 + 1, { ...m, blockY: box.y, blockH: box.h });
  assert.equal(state.mode, 'fixed');
  // Medlem to skal ligge 100 px under medlem én, som i seksjonen.
  assert.equal(state.top + (items[1].y - box.y) - (state.top + (items[0].y - box.y)), 100);
});

// Skjermdokking: boksen legges i et fast punkt i vinduet.
const VIEW = { w: 1000, h: 800 };
const BOX = { w: 200, h: 100 };

test('dockPosition: hjørnene måles fra sine egne kanter', () => {
  assert.deepEqual(dockPosition('top-left', 24, BOX, VIEW), { left: 24, top: 24 });
  assert.deepEqual(dockPosition('top-right', 24, BOX, VIEW), { left: 776, top: 24 });
  assert.deepEqual(dockPosition('bottom-left', 24, BOX, VIEW), { left: 24, top: 676 });
  assert.deepEqual(dockPosition('bottom-right', 24, BOX, VIEW), { left: 776, top: 676 });
});

test('dockPosition: senterakser sentreres og ignorerer marginen', () => {
  assert.deepEqual(dockPosition('middle-center', 24, BOX, VIEW), { left: 400, top: 350 });
  assert.deepEqual(dockPosition('top-center', 24, BOX, VIEW), { left: 400, top: 24 });
  assert.deepEqual(dockPosition('middle-left', 24, BOX, VIEW), { left: 24, top: 350 });
});

test('dockPosition: standard og ugyldig dokk er nederst til høyre', () => {
  assert.deepEqual(dockPosition(undefined, 0, BOX, VIEW), { left: 800, top: 700 });
  assert.deepEqual(dockPosition('', 0, BOX, VIEW), { left: 800, top: 700 });
});

test('dockPosition: en boks større enn vinduet skyves aldri utenfor', () => {
  const big = { w: 1200, h: 900 };
  const pos = dockPosition('bottom-right', 24, big, VIEW);
  assert.deepEqual(pos, { left: 0, top: 0 });
  assert.deepEqual(dockPosition('middle-center', 0, big, VIEW), { left: 0, top: 0 });
});
