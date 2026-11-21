/**
 * Copies and comparisons that share strings (editor/src/lib/json-copy.js): what a JSON round trip gives, without writing out a picture's data address.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

const { copyJSON, sameJSON } = await import('../editor/src/lib/json-copy.js');

const sample = () => ({ a: 1, b: 'x', c: [1, 'y', null, undefined, () => 0, Number.NaN], d: { e: undefined, f: () => 1, g: Infinity, h: { i: true } }, j: null });

test('a copy is what a JSON round trip gives, with new objects and arrays', () => {
  const value = sample();
  const copy = copyJSON(value);
  assert.deepEqual(copy, JSON.parse(JSON.stringify(value)));
  assert.notEqual(copy.d, value.d);
  assert.notEqual(copy.c, value.c);
  copy.d.h.i = false;
  assert.equal(value.d.h.i, true, 'the copy is its own');
  assert.equal(copyJSON('s'), 's');
  assert.equal(copyJSON(null), null);
});

test('a copy keeps a large string as it is, so a picture costs nothing to copy', () => {
  const src = `data:image/webp;base64,${'A'.repeat(8_000_000)}`;
  const t0 = performance.now();
  for (let i = 0; i < 20; i++) copyJSON({ layers: [{ props: { images: [{ src }, { src }] } }] });
  assert.ok(performance.now() - t0 < 50, 'twenty copies of 16 MB of pictures in well under a frame each');
  assert.equal(copyJSON({ src }).src, src);
});

test('sameJSON answers as a comparison of JSON texts would', () => {
  assert.equal(sameJSON(sample(), sample()), true);
  assert.equal(sameJSON({ a: 1, b: 2 }, { b: 2, a: 1 }), false, 'the order of the keys counts, as in the texts');
  assert.equal(sameJSON({ a: undefined, b: 1 }, { b: 1 }), true, 'a property JSON leaves out is left out');
  assert.equal(sameJSON([undefined], [null]), true);
  assert.equal(sameJSON({ a: 'x' }, { a: 'y' }), false);
  assert.equal(sameJSON({ a: 1 }, { a: '1' }), false);
  assert.equal(sameJSON(Number.NaN, null), true);
  assert.equal(sameJSON({ a: [1, 2] }, { a: [1, 2, 3] }), false);
  assert.equal(sameJSON(null, {}), false);
});
