/**
 * Test av grid-til-CSS-matten i render.js (frameToCss er en ren funksjon).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { frameToCss } from '../template/assets/engine/render.js';

const grid = { columns: 24, rowHeight: 8 };

test('x/w blir prosent av kolonnene, y/h blir px av radhøyden', () => {
  const css = frameToCss({ x: 2, y: 6, w: 12, h: 4, z: 3, rot: 0 }, grid);
  assert.deepEqual(css, {
    left: `${2 * (100 / 24)}%`,
    top: '48px',
    width: '50%',
    height: '32px',
    zIndex: '3',
    transform: '',
  });
});

test('rotasjon gir transform, uten rotasjon ingen transform', () => {
  assert.equal(frameToCss({ x: 0, y: 0, w: 1, h: 1, rot: -8 }, grid).transform, 'rotate(-8deg)');
  assert.equal(frameToCss({ x: 0, y: 0, w: 1, h: 1 }, grid).transform, '');
});

test('z mangler gir zIndex 1', () => {
  assert.equal(frameToCss({ x: 0, y: 0, w: 1, h: 1 }, grid).zIndex, '1');
});

test('annet grid gir annen skala (seksjons-overstyring)', () => {
  const css = frameToCss({ x: 1, y: 2, w: 6, h: 3 }, { columns: 12, rowHeight: 12 });
  assert.equal(css.left, `${1 * (100 / 12)}%`);
  assert.equal(css.width, '50%');
  assert.equal(css.top, '24px');
  assert.equal(css.height, '36px');
});
