/**
 * Kontraktstester for sticky-tilstanden (sticky-model.js): festing og
 * slipp regnes rent fra scrollposisjon og dokumentmål; DOM-delen i
 * sticky.js bygger kun på disse svarene.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { stickyState } from '../template/assets/engine/sticky-model.js';

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
