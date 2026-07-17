/**
 * Animasjonene er registertyper under samme version+migrate-kontrakt som
 * blokker og bakgrunnslag (løfte 2): en Urd-oppdatering skal kunne endre
 * en animasjons props uten å knekke publiserte sider.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { coreAnimations } from '../template/assets/engine/animations/core.js';
import { lift } from '../template/assets/engine/migrate.js';

test('kjerneanimasjonene følger version+migrate-kontrakten', () => {
  const ids = Object.keys(coreAnimations);
  assert.deepEqual(ids.sort(), ['fade-in', 'hover-lift', 'slide-up', 'zoom-in']);
  for (const [id, def] of Object.entries(coreAnimations)) {
    assert.equal(typeof def.version, 'number', `${id}: version`);
    assert.equal(typeof def.label, 'string', `${id}: label`);
    assert.equal(typeof def.defaults, 'function', `${id}: defaults`);
    assert.equal(typeof def.migrations, 'object', `${id}: migrations`);
    const lifted = lift({ type: id, version: 1, props: def.defaults() }, def);
    assert.equal(lifted.ok, true, `${id}: lift`);
  }
});

test('inngangsanimasjonene har varighet/forsinkelse som standard', () => {
  for (const [id, def] of Object.entries(coreAnimations)) {
    if (!def.entrance) continue;
    const props = def.defaults();
    assert.equal(typeof props.duration, 'number', id);
    assert.equal(typeof props.delay, 'number', id);
  }
});

test('ukjent animasjonstype gir plassholder, aldri krasj', () => {
  const lifted = lift({ type: 'wobble', version: 1, props: {} }, undefined);
  assert.equal(lifted.ok, false);
  assert.equal(lifted.placeholder, 'unknown-type');
});
