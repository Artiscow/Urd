/**
 * Test av de rene layoutfunksjonene i render.js: frameToCss (desktop),
 * stackOrder (mobil-leserekkefølgen) og mobilePlacementToCss
 * (mobil-radnettet, ADR-0019). Frames er i fysiske enheter: x/w i
 * prosent av innholdsflaten, y/h i px.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { frameToCss, stackOrder, mobilePlacementToCss, reorderMobileKey } = await engineImport('render.js');
const { MOBILE_ROW, MOBILE_GAP } = await engineImport('migrate.js');

test('x/w blir prosent, y/h blir px', () => {
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

test('rotasjon gir transform, uten rotasjon ingen transform', () => {
  assert.equal(frameToCss({ x: 0, y: 0, w: 10, h: 10, rot: -8 }).transform, 'rotate(-8deg)');
  assert.equal(frameToCss({ x: 0, y: 0, w: 10, h: 10 }).transform, '');
});

test('z mangler gir zIndex 1', () => {
  assert.equal(frameToCss({ x: 0, y: 0, w: 10, h: 10 }).zIndex, '1');
});

const blk = (id, y, x, extra = {}) => ({ id, ...extra, frames: { desktop: { x, y, w: 10, h: 10 }, mobile: extra.mobile ?? null } });

test('stackOrder: leserekkefølge etter desktop-y, deretter x', () => {
  const order = stackOrder([blk('c', 100, 0), blk('a', 10, 50), blk('b', 10, 5)]);
  assert.deepEqual(order.map((b) => b.id), ['b', 'a', 'c']);
});

test('stackOrder: hideMobile-blokker utelates', () => {
  const order = stackOrder([blk('pynt', 0, 0, { hideMobile: true }), blk('tekst', 10, 0)]);
  assert.deepEqual(order.map((b) => b.id), ['tekst']);
});

test('stackOrder: decor filtrerer IKKE lenger (kun animasjonsbetydning igjen)', () => {
  const order = stackOrder([blk('pynt', 0, 0, { decor: true }), blk('tekst', 10, 0)]);
  assert.deepEqual(order.map((b) => b.id), ['pynt', 'tekst']);
});

test('stackOrder: mobileOrder overstyrer sorteringsnøkkelen', () => {
  const order = stackOrder([blk('sist', 0, 0, { mobileOrder: 500 }), blk('først', 100, 0)]);
  assert.deepEqual(order.map((b) => b.id), ['først', 'sist']);
});

test('stackOrder: pinnede blokker følger med i leserekkefølgen', () => {
  const order = stackOrder([blk('pinnet', 10, 0, { mobile: { x: 5, w: 50, row: 3, rows: 4 } }), blk('flyt', 50, 0)]);
  assert.deepEqual(order.map((b) => b.id), ['pinnet', 'flyt']);
});

test('stackOrder: muterer ikke originalrekkefølgen', () => {
  const blocks = [blk('b', 20, 0), blk('a', 10, 0)];
  stackOrder(blocks);
  assert.deepEqual(blocks.map((b) => b.id), ['b', 'a']);
});

const desktop = { x: 20, y: 100, w: 40, h: 120, z: 2, rot: 0 };

test('mobilePlacementToCss: null gir flyt med fast høyde og radspenn som rommer luften', () => {
  const css = mobilePlacementToCss(null, desktop, {});
  assert.equal(css.height, '120px');
  // Spennet rommer høyden PLUSS margin-bottom, så radsporene aldri blåses opp.
  assert.equal(css.gridRow, `auto / span ${Math.ceil((120 + MOBILE_GAP) / MOBILE_ROW)}`);
  assert.equal(css.width, undefined);
});

test('mobilePlacementToCss: autovoksende flytblokk får naturlig høyde', () => {
  const css = mobilePlacementToCss(null, desktop, { autoGrow: true });
  assert.equal(css.height, undefined);
  assert.equal(css.gridRow, undefined);
});

test('mobilePlacementToCss: partiell overstyring rører kun feltene som står der', () => {
  const css = mobilePlacementToCss({ w: 60 }, desktop, { autoGrow: true });
  assert.equal(css.width, '60%');
  assert.equal(css.marginLeft, undefined);
});

test('mobilePlacementToCss: pinnet gir eksplisitte radspor og strekk (ingen height)', () => {
  const css = mobilePlacementToCss({ x: 5, w: 50, row: 3, rows: 10 }, desktop, {});
  assert.equal(css.gridRow, '3 / span 10');
  assert.equal(css.width, '50%');
  assert.equal(css.marginLeft, '5%');
  assert.equal(css.justifySelf, 'start');
  assert.equal(css.height, undefined);
});

test('mobilePlacementToCss: pinnet uten rows avleder spennet fra desktophøyden', () => {
  const css = mobilePlacementToCss({ row: 2 }, desktop, {});
  assert.equal(css.gridRow, `2 / span ${Math.ceil(120 / MOBILE_ROW)}`);
  // x/w faller tilbake til desktop-framen.
  assert.equal(css.width, '40%');
  assert.equal(css.marginLeft, '20%');
});

test('mobilePlacementToCss: z og rot følger plasseringen', () => {
  const css = mobilePlacementToCss({ row: 1, rows: 2, z: 5, rot: -8 }, desktop, {});
  assert.equal(css.zIndex, '5');
  assert.equal(css.transform, 'rotate(-8deg)');
});

test('mobilePlacementToCss: rot arves fra desktop når plasseringen mangler den', () => {
  const css = mobilePlacementToCss(null, { ...desktop, rot: 12 }, { autoGrow: true });
  assert.equal(css.transform, 'rotate(12deg)');
});

test('reorderMobileKey: ned gir midtpunktet mellom de to neste', () => {
  const blocks = [blk('a', 10, 0), blk('b', 50, 0), blk('c', 90, 0)];
  assert.equal(reorderMobileKey(blocks, 'a', 1), 70);
});

test('reorderMobileKey: opp forbi første legger nøkkelen foran', () => {
  const blocks = [blk('a', 10, 0), blk('b', 50, 0)];
  assert.equal(reorderMobileKey(blocks, 'b', -1), 10 - 16);
});

test('reorderMobileKey: endene gir null', () => {
  const blocks = [blk('a', 10, 0), blk('b', 50, 0)];
  assert.equal(reorderMobileKey(blocks, 'a', -1), null);
  assert.equal(reorderMobileKey(blocks, 'b', 1), null);
});

test('reorderMobileKey: pinnede blokker deltar ikke i flyten', () => {
  const blocks = [blk('a', 10, 0), blk('pin', 50, 0, { mobile: { row: 3, rows: 4 } }), blk('b', 90, 0)];
  // a hopper over den pinnede: midtpunktet regnes mot b og enden.
  assert.equal(reorderMobileKey(blocks, 'a', 1), 90 + 16);
  assert.equal(reorderMobileKey(blocks, 'pin', 1), null);
});

test('reorderMobileKey: like nabonøkler gir et knepp forbi, aldri stillstand', () => {
  const blocks = [blk('a', 50, 0), blk('b', 50, 10), blk('c', 50, 20)];
  const key = reorderMobileKey(blocks, 'a', 1);
  assert.ok(key > 50, `nøkkelen (${key}) må passere naboens 50`);
});

test('reorderMobileKey: eksisterende mobileOrder brukes som nøkkel', () => {
  const blocks = [blk('a', 100, 0, { mobileOrder: 8 }), blk('b', 10, 0, { mobileOrder: 20 }), blk('c', 90, 0, { mobileOrder: 30 })];
  assert.equal(reorderMobileKey(blocks, 'a', 1), 25);
});
