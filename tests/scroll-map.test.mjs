/**
 * Two pages scrolling together (editor/src/lib/scroll-map.js): the curve through the places where each section starts in both pages.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

const { scrollMap, mapScroll, monotoneSlopes } = await import('../editor/src/lib/scroll-map.js');

const canvas = [['a', 0], ['b', 600], ['c', 900], ['d', 1800]];
const phone = [['a', 0], ['b', 1400], ['c', 1700], ['d', 3600]];

test('scrollMap: the pages\' tops, the sections both start further down, and the pages\' ends', () => {
  const map = scrollMap(canvas, 2000, phone, 4000);
  assert.deepEqual(map.xs, [0, 600, 900, 1800, 2000]);
  assert.deepEqual(map.ys, [0, 1400, 1700, 3600, 4000]);
});

test('scrollMap: a section one page lacks, one past a page\'s end and one out of step are left out', () => {
  const map = scrollMap([['a', 0], ['x', 300], ['b', 600], ['c', 500], ['d', 2500]], 2000, [['a', 0], ['b', 1400], ['c', 1700], ['d', 3600]], 4000);
  assert.deepEqual(map.xs, [0, 600, 2000]);
  assert.deepEqual(map.ys, [0, 1400, 4000]);
});

test('mapScroll: every section starts where it starts in the other page, both ends meet, and the way back comes near the scroll it left', () => {
  const { xs, ys, toPhone, toCanvas } = scrollMap(canvas, 2000, phone, 4000);
  for (let i = 0; i < xs.length; i++) assert.ok(Math.abs(mapScroll(xs, ys, toPhone, xs[i]) - ys[i]) < 1e-9);
  assert.equal(mapScroll(xs, ys, toPhone, -50), 0);
  assert.equal(mapScroll(xs, ys, toPhone, 5000), 4000);
  for (const x of [120, 750, 1300, 1950]) {
    const y = mapScroll(xs, ys, toPhone, x);
    assert.ok(Math.abs(mapScroll(ys, xs, toCanvas, y) - x) < 40, `about ${x} back from the phone`);
  }
});

test('mapScroll: the page that follows never runs backwards, and its speed changes without a jump at a section\'s start', () => {
  const { xs, ys, toPhone } = scrollMap(canvas, 2000, phone, 4000);
  let last = -1;
  for (let x = 0; x <= 2000; x += 5) {
    const y = mapScroll(xs, ys, toPhone, x);
    assert.ok(y >= last - 1e-9, `no step back at ${x}`);
    last = y;
  }
  // The speed just before and just after the second section's start.
  const speed = (x) => mapScroll(xs, ys, toPhone, x + 0.5) - mapScroll(xs, ys, toPhone, x - 0.5);
  assert.ok(Math.abs(speed(600 - 1) - speed(600 + 1)) < 0.05);
});

test('scrollMap and mapScroll: a page that cannot scroll keeps the other at its top', () => {
  const map = scrollMap(canvas, 0, phone, 4000);
  assert.deepEqual(map.xs, [0]);
  assert.equal(mapScroll(map.xs, map.ys, map.toPhone, 300), 0);
  assert.deepEqual(monotoneSlopes([0], [0]), [0]);
});

test('mapScroll: where one page\'s sections are much taller than the other\'s, the curve still never runs backwards', () => {
  // Steep and flat stretches side by side, where a plain cubic through the points overshoots and runs backwards; the slopes' limit keeps it from doing so.
  const { xs, ys, toPhone } = scrollMap([['a', 0], ['b', 100], ['c', 200], ['d', 300]], 400, [['a', 0], ['b', 1000], ['c', 1010], ['d', 2000]], 2400);
  let last = -1;
  for (let x = 0; x <= 400; x += 0.5) {
    const y = mapScroll(xs, ys, toPhone, x);
    assert.ok(y >= last - 1e-9, `no step back at ${x}`);
    last = y;
  }
});

test('the live phone scrolls to a block only when the selection changes, never when its look or scale does', async () => {
  const { readFileSync } = await import('node:fs');
  const live = readFileSync(new URL('../editor/src/shell/LivePhone.svelte', import.meta.url), 'utf8');
  assert.match(live, /const id = selectedId;[\s\S]{0,300}untrack\(\(\) => \{\s*\/\/ While the two scroll together the phone follows the canvas instead\.\s*if \(el && win && !look\.follow\)/);
});

