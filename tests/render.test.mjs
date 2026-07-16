/**
 * Test av frame-til-CSS-oversettelsen i render.js (frameToCss er en ren
 * funksjon). Frames er i fysiske enheter fra schemaVersion 2: x/w i
 * prosent av seksjonsbredden, y/h i px.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { frameToCss } from '../template/assets/engine/render.js';

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
