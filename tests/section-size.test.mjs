/**
 * Kontraktstester for toppkant-draget (section-size.js): seksjonen
 * vokser/krymper i toppen og blokkene følger med, med klemmer som gjør
 * at innhold aldri havner over seksjonstoppen og seksjonen aldri blir
 * mindre enn minstehøyden.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { topDrag } from '../template/assets/engine/section-size.js';

const grid = { size: 8 };

test('dra opp: minHeight øker og blokkene flyttes ned, i grid-steg', () => {
  const r = topDrag({ dyPointer: -50, minHeightPx: 400, blockYs: [40, 120], grid });
  // 50 px opp snappes til 48 (nærmeste 8er-steg).
  assert.equal(r.dy, 48);
  assert.equal(r.minHeightPx, 448);
});

test('dra ned: klemmes mot laveste blokk-y (ingen blokk under toppen)', () => {
  const r = topDrag({ dyPointer: 200, minHeightPx: 400, blockYs: [40, 120], grid });
  assert.equal(r.dy, -40);
  assert.equal(r.minHeightPx, 360);
});

test('dra ned: klemmes mot minstehøyden (grid.size * 3)', () => {
  const r = topDrag({ dyPointer: 500, minHeightPx: 60, blockYs: [400], grid });
  // Høyderommet er 60 - 24 = 36; blokkrommet 400. Minste vinner.
  assert.equal(r.dy, -36);
  assert.equal(r.minHeightPx, 24);
});

test('blokk som henger over toppen (negativ y) stopper krymping helt', () => {
  const r = topDrag({ dyPointer: 100, minHeightPx: 400, blockYs: [-30, 200], grid });
  assert.equal(r.dy, 0);
  assert.equal(r.minHeightPx, 400);
});

test('Shift/fri: piksel-presist uten snapping', () => {
  const r = topDrag({ dyPointer: -50, minHeightPx: 400, blockYs: [40], grid, free: true });
  assert.equal(r.dy, 50);
  assert.equal(r.minHeightPx, 450);
});

test('tom seksjon: kun minstehøyden klemmer', () => {
  const r = topDrag({ dyPointer: 900, minHeightPx: 200, blockYs: [], grid });
  assert.equal(r.dy, -(200 - 24));
  assert.equal(r.minHeightPx, 24);
});

test('snap avslått i gridet gir også piksel-presisjon', () => {
  const r = topDrag({ dyPointer: -13, minHeightPx: 400, blockYs: [], grid: { size: 8, snap: false } });
  assert.equal(r.dy, 13);
  assert.equal(r.minHeightPx, 413);
});
