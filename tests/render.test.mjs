/**
 * Test av frame-til-CSS-oversettelsen i render.js (frameToCss er en ren
 * funksjon). Frames er i fysiske enheter fra schemaVersion 2: x/w i
 * prosent av seksjonsbredden, y/h i px.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { frameToCss, stackOrder } from '../template/assets/engine/render.js';

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

const blk = (id, y, x, decor = false) => ({ id, decor, frames: { desktop: { x, y, w: 10, h: 10 } } });

test('stackOrder: leserekkefølge etter desktop-y, deretter x', () => {
  const order = stackOrder([blk('c', 100, 0), blk('a', 10, 50), blk('b', 10, 5)]);
  assert.deepEqual(order.map((b) => b.id), ['b', 'a', 'c']);
});

test('stackOrder: dekor-blokker utelates', () => {
  const order = stackOrder([blk('pynt', 0, 0, true), blk('tekst', 10, 0)]);
  assert.deepEqual(order.map((b) => b.id), ['tekst']);
});

test('stackOrder: muterer ikke originalrekkefølgen', () => {
  const blocks = [blk('b', 20, 0), blk('a', 10, 0)];
  stackOrder(blocks);
  assert.deepEqual(blocks.map((b) => b.id), ['b', 'a']);
});
