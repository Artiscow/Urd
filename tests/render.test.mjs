/**
 * Tests of the pure layout functions in render.js: frameToCss (desktop), stackOrder (the mobile reading order) and mobilePlacementToCss (the mobile row grid, ADR-0019).
 * Frames are in physical units: x/w in percent of the content band, y/h in px.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { frameToCss, stackOrder, mobilePlacementToCss, reorderMobileKey } = await engineImport('render.js');
const { MOBILE_ROW, MOBILE_GAP } = await engineImport('migrate.js');

test('x/w become percent, y/h become px', () => {
  const css = frameToCss({ x: 8.33, y: 48, w: 50, h: 32, z: 3, rot: 0 });
  assert.deepEqual(css, {
    left: '8.33%',
    top: '48px',
    width: '50%',
    height: '32px',
    zIndex: '3',
    transform: '',
  });
});

test('rotation gives a transform, no rotation gives none', () => {
  assert.equal(frameToCss({ x: 0, y: 0, w: 10, h: 10, rot: -8 }).transform, 'rotate(-8deg)');
  assert.equal(frameToCss({ x: 0, y: 0, w: 10, h: 10 }).transform, '');
});

test('missing z gives zIndex 1', () => {
  assert.equal(frameToCss({ x: 0, y: 0, w: 10, h: 10 }).zIndex, '1');
});

const blk = (id, y, x, extra = {}) => ({ id, ...extra, frames: { desktop: { x, y, w: 10, h: 10 }, mobile: extra.mobile ?? null } });

test('stackOrder: reading order by desktop y, then x', () => {
  const order = stackOrder([blk('c', 100, 0), blk('a', 10, 50), blk('b', 10, 5)]);
  assert.deepEqual(order.map((b) => b.id), ['b', 'a', 'c']);
});

test('stackOrder: hideMobile blocks are left out', () => {
  const order = stackOrder([blk('pynt', 0, 0, { hideMobile: true }), blk('tekst', 10, 0)]);
  assert.deepEqual(order.map((b) => b.id), ['tekst']);
});

test('stackOrder: decor does not filter (only animation meaning remains)', () => {
  const order = stackOrder([blk('pynt', 0, 0, { decor: true }), blk('tekst', 10, 0)]);
  assert.deepEqual(order.map((b) => b.id), ['pynt', 'tekst']);
});

test('stackOrder: mobileOrder overrides the sort key', () => {
  const order = stackOrder([blk('sist', 0, 0, { mobileOrder: 500 }), blk('først', 100, 0)]);
  assert.deepEqual(order.map((b) => b.id), ['først', 'sist']);
});

test('stackOrder: pinned blocks stay in the reading order', () => {
  const order = stackOrder([blk('pinnet', 10, 0, { mobile: { x: 5, w: 50, row: 3, rows: 4 } }), blk('flyt', 50, 0)]);
  assert.deepEqual(order.map((b) => b.id), ['pinnet', 'flyt']);
});

test('stackOrder: does not mutate the original order', () => {
  const blocks = [blk('b', 20, 0), blk('a', 10, 0)];
  stackOrder(blocks);
  assert.deepEqual(blocks.map((b) => b.id), ['b', 'a']);
});

const desktop = { x: 20, y: 100, w: 40, h: 120, z: 2, rot: 0 };

test('mobilePlacementToCss: null gives flow with a fixed height and a row span that fits the gap', () => {
  const css = mobilePlacementToCss(null, desktop, {});
  assert.equal(css.height, '120px');
  // The span fits the height PLUS margin-bottom, so the row tracks are never inflated.
  assert.equal(css.gridRow, `auto / span ${Math.ceil((120 + MOBILE_GAP) / MOBILE_ROW)}`);
  assert.equal(css.width, undefined);
});

test('mobilePlacementToCss: an auto-growing flow block gets its natural height', () => {
  const css = mobilePlacementToCss(null, desktop, { autoGrow: true });
  assert.equal(css.height, undefined);
  assert.equal(css.gridRow, undefined);
});

test('mobilePlacementToCss: a partial override touches only the fields present', () => {
  const css = mobilePlacementToCss({ w: 60 }, desktop, { autoGrow: true });
  assert.equal(css.width, '60%');
  assert.equal(css.marginLeft, undefined);
});

test('mobilePlacementToCss: pinned gives explicit row tracks and stretch (no height)', () => {
  const css = mobilePlacementToCss({ x: 5, w: 50, row: 3, rows: 10 }, desktop, {});
  assert.equal(css.gridRow, '3 / span 10');
  assert.equal(css.width, '50%');
  assert.equal(css.marginLeft, '5%');
  assert.equal(css.justifySelf, 'start');
  assert.equal(css.height, undefined);
});

test('mobilePlacementToCss: pinned without rows derives the span from the desktop height', () => {
  const css = mobilePlacementToCss({ row: 2 }, desktop, {});
  assert.equal(css.gridRow, `2 / span ${Math.ceil(120 / MOBILE_ROW)}`);
  // x/w fall back to the desktop frame.
  assert.equal(css.width, '40%');
  assert.equal(css.marginLeft, '20%');
});

test('mobilePlacementToCss: z and rot follow the placement', () => {
  const css = mobilePlacementToCss({ row: 1, rows: 2, z: 5, rot: -8 }, desktop, {});
  assert.equal(css.zIndex, '5');
  assert.equal(css.transform, 'rotate(-8deg)');
});

test('mobilePlacementToCss: z and rot are inherited from desktop when the placement lacks them', () => {
  const css = mobilePlacementToCss(null, { ...desktop, z: 7, rot: 12 }, { autoGrow: true });
  assert.equal(css.transform, 'rotate(12deg)');
  assert.equal(css.zIndex, '7');
});

test('reorderMobileKey: down gives the midpoint between the next two', () => {
  const blocks = [blk('a', 10, 0), blk('b', 50, 0), blk('c', 90, 0)];
  assert.equal(reorderMobileKey(blocks, 'a', 1), 70);
});

test('reorderMobileKey: up past the first puts the key in front', () => {
  const blocks = [blk('a', 10, 0), blk('b', 50, 0)];
  assert.equal(reorderMobileKey(blocks, 'b', -1), 10 - 16);
});

test('reorderMobileKey: the ends give null', () => {
  const blocks = [blk('a', 10, 0), blk('b', 50, 0)];
  assert.equal(reorderMobileKey(blocks, 'a', -1), null);
  assert.equal(reorderMobileKey(blocks, 'b', 1), null);
});

test('reorderMobileKey: pinned blocks take no part in the flow', () => {
  const blocks = [blk('a', 10, 0), blk('pin', 50, 0, { mobile: { row: 3, rows: 4 } }), blk('b', 90, 0)];
  // a skips the pinned block: the midpoint is computed against b and the end.
  assert.equal(reorderMobileKey(blocks, 'a', 1), 90 + 16);
  assert.equal(reorderMobileKey(blocks, 'pin', 1), null);
});

test('reorderMobileKey: equal neighbour keys give a notch past, never standstill', () => {
  const blocks = [blk('a', 50, 0), blk('b', 50, 10), blk('c', 50, 20)];
  const key = reorderMobileKey(blocks, 'a', 1);
  assert.ok(key > 50, `the key (${key}) must pass the neighbour's 50`);
});

test('reorderMobileKey: an existing mobileOrder is used as the key', () => {
  const blocks = [blk('a', 100, 0, { mobileOrder: 8 }), blk('b', 10, 0, { mobileOrder: 20 }), blk('c', 90, 0, { mobileOrder: 30 })];
  assert.equal(reorderMobileKey(blocks, 'a', 1), 25);
});
