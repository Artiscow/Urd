/**
 * Kontraktstester for klikkplasseringen (place.js): «+ Ny blokk» der
 * man klikker skal sentrere framen på punktet, klemme innenfor
 * seksjonen og snappe til gridet.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { frameAtPoint } from '../template/assets/engine/place.js';

const grid = { size: 8 };

test('sentreres på klikkpunktet, snappet til grid', () => {
  const pos = frameAtPoint({ x: 50, y: 200, w: 30, h: 100, grid });
  assert.equal(pos.x, 35);
  // 200 - 50 = 150, snappet til nærmeste 8er-steg (152).
  assert.equal(pos.y, 152);
});

test('klemmes mot venstre og høyre kant', () => {
  assert.equal(frameAtPoint({ x: 2, y: 100, w: 30, h: 40, grid }).x, 0);
  assert.equal(frameAtPoint({ x: 99, y: 100, w: 30, h: 40, grid }).x, 70);
});

test('y aldri under 0 (klikk nær seksjonstoppen)', () => {
  assert.equal(frameAtPoint({ x: 50, y: 10, w: 20, h: 200, grid }).y, 0);
});

test('snapping av: piksel-presist', () => {
  const pos = frameAtPoint({ x: 50, y: 203, w: 30, h: 100, grid: { size: 8, snap: false } });
  assert.equal(pos.y, 153);
  const pos2 = frameAtPoint({ x: 50, y: 203, w: 30, h: 100, grid, snap: false });
  assert.equal(pos2.y, 153);
});

test('bredere enn seksjonen: x klemmes til 0', () => {
  assert.equal(frameAtPoint({ x: 50, y: 100, w: 120, h: 40, grid }).x, 0);
});

test('x avrundes til to desimaler', () => {
  const pos = frameAtPoint({ x: 33.333, y: 100, w: 10, h: 40, grid });
  assert.equal(pos.x, 28.33);
});
