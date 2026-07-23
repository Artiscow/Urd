/**
 * Kontraktstester for multimarkeringslogikken (selection.js):
 * marquee-treff, juster/fordel og gruppe-forskyvning ved innliming.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { blocksInRect, alignMoves, distributeMoves, groupDelta } from '../template/assets/engine/selection.js';

test('blocksInRect: delvis overlapp holder, naboer utenfor treffes ikke', () => {
  const blocks = [
    { id: 'a', left: 0, top: 0, right: 100, bottom: 50 },
    { id: 'b', left: 200, top: 0, right: 300, bottom: 50 },
    { id: 'c', left: 50, top: 100, right: 150, bottom: 200 },
  ];
  assert.deepEqual(blocksInRect({ left: 90, top: 40, right: 210, bottom: 120 }, blocks), ['a', 'b', 'c']);
  assert.deepEqual(blocksInRect({ left: 110, top: 0, right: 190, bottom: 90 }, blocks), []);
  // Kant-i-kant (uten overlapp) er ikke treff.
  assert.deepEqual(blocksInRect({ left: 100, top: 0, right: 200, bottom: 50 }, blocks), []);
});

test('alignMoves: venstre/senter/høyre innenfor utvalgets egen boks', () => {
  const items = [
    { id: 'a', x: 10, y: 0, w: 20, h: 40 },
    { id: 'b', x: 40, y: 100, w: 40, h: 40 },
  ];
  assert.deepEqual(alignMoves(items, 'left'), [{ id: 'b', x: 10 }]);
  assert.deepEqual(alignMoves(items, 'right'), [{ id: 'a', x: 60 }]);
  // Boksen er 10..80: senter 45; a (w 20) -> 35, b (w 40) -> 25.
  assert.deepEqual(alignMoves(items, 'center'), [{ id: 'a', x: 35 }, { id: 'b', x: 25 }]);
});

test('alignMoves: topp/midte/bunn bruker y/h i px', () => {
  const items = [
    { id: 'a', x: 0, y: 20, w: 10, h: 60 },
    { id: 'b', x: 50, y: 100, w: 10, h: 20 },
  ];
  assert.deepEqual(alignMoves(items, 'top'), [{ id: 'b', y: 20 }]);
  // Bunnen er 120 (b): a (h 60) flyttes til 60, b står allerede der.
  assert.deepEqual(alignMoves(items, 'bottom'), [{ id: 'a', y: 60 }]);
  // Boksen er 20..120: midte 70; a -> 40, b -> 60.
  assert.deepEqual(alignMoves(items, 'middle'), [{ id: 'a', y: 40 }, { id: 'b', y: 60 }]);
});

test('alignMoves: færre enn to blokker gir ingen flytting', () => {
  assert.deepEqual(alignMoves([{ id: 'a', x: 0, y: 0, w: 10, h: 10 }], 'left'), []);
});

test('distributeMoves: første og siste står, luften mellom blir lik', () => {
  const items = [
    { id: 'a', x: 0, y: 0, w: 10, h: 10 },
    { id: 'b', x: 12, y: 0, w: 10, h: 10 },
    { id: 'c', x: 70, y: 0, w: 10, h: 10 },
  ];
  // Spennet 0..80, blokker 30, luft 50 -> 25 per gap; b -> 35.
  assert.deepEqual(distributeMoves(items, 'x'), [{ id: 'b', x: 35 }]);
  // Færre enn tre: ingen flytting.
  assert.deepEqual(distributeMoves(items.slice(0, 2), 'x'), []);
});

test('distributeMoves: loddrett med usortert inndata', () => {
  const items = [
    { id: 'midt', x: 0, y: 90, w: 10, h: 20 },
    { id: 'topp', x: 0, y: 0, w: 10, h: 40 },
    { id: 'bunn', x: 0, y: 200, w: 10, h: 40 },
  ];
  // Spennet 0..240, blokker 100, luft 140 -> 70 per gap; midt -> 110.
  assert.deepEqual(distributeMoves(items, 'y'), [{ id: 'midt', y: 110 }]);
});

test('groupDelta: gruppen klemmes samlet uten å forvrenge oppsettet', () => {
  const frames = [
    { x: 80, y: 40, w: 15, h: 20 },
    { x: 60, y: 100, w: 20, h: 20 },
  ];
  // Ønsket +10 % ville sendt 80+15 til 105: klemmes til +5.
  assert.deepEqual(groupDelta(frames, 10, 16), { dx: 5, dy: 16 });
  // Nedover/venstre: aldri forbi venstrekant eller over toppen.
  assert.deepEqual(groupDelta(frames, -70, -50), { dx: -60, dy: -40 });
  // Tomt utvalg er et nullpunkt.
  assert.deepEqual(groupDelta([], 5, 5), { dx: 0, dy: 0 });
});
