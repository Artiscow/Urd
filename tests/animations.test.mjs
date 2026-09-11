/**
 * The animations are registry types under the same version+migrate contract
 * as blocks and background layers (promise 2): an Urd update must be able to
 * change an animation's props without breaking published sites.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { coreAnimations, staggerColumnDelays, staggerCenterDelays } = await engineImport('animations/core.js');
const { lift } = await engineImport('migrate.js');

test('the core animations follow the version+migrate contract', () => {
  const ids = Object.keys(coreAnimations);
  assert.deepEqual(ids.sort(), ['fade-in', 'hover-lift', 'slide-up', 'stagger', 'zoom-in']);
  for (const [id, def] of Object.entries(coreAnimations)) {
    assert.equal(typeof def.version, 'number', `${id}: version`);
    assert.equal(typeof def.label, 'string', `${id}: label`);
    assert.equal(typeof def.defaults, 'function', `${id}: defaults`);
    assert.equal(typeof def.migrations, 'object', `${id}: migrations`);
    const lifted = lift({ type: id, version: 1, props: def.defaults() }, def);
    assert.equal(lifted.ok, true, `${id}: lift`);
  }
});

test('the entrance animations have a duration by default (stagger uses step instead of delay)', () => {
  for (const [id, def] of Object.entries(coreAnimations)) {
    if (!def.entrance) continue;
    const props = def.defaults();
    assert.equal(typeof props.duration, 'number', id);
    if (def.group) {
      // Stagger is a group animation: step/effect/pattern instead of delay.
      assert.equal(typeof props.step, 'number', id);
      assert.equal(typeof props.pattern, 'string', id);
    } else {
      assert.equal(typeof props.delay, 'number', id);
    }
  }
});

test('staggerColumnDelays: cards in the same column share a step, the wave follows rising x', () => {
  // 4 columns x 2 rows (reading order, px positions): cluster index * step.
  const positions = [0, 200, 400, 600, 0, 200, 400, 600];
  assert.deepEqual(staggerColumnDelays(positions, 100), [0, 100, 200, 300, 0, 100, 200, 300]);
  // Unordered/uneven x values are ranked ascending, not by order.
  assert.deepEqual(staggerColumnDelays([300, 10, 10, 300], 50), [50, 0, 0, 50]);
  assert.deepEqual(staggerColumnDelays([], 100), []);
});

test('staggerColumnDelays: nearly aligned cards are clustered by the tolerance', () => {
  // Cards 9px apart must land in the same column: within the tolerance
  // (24px) they count as one column.
  assert.deepEqual(staggerColumnDelays([0, 9, 300, 318], 100), [0, 0, 100, 100]);
  // Above the tolerance they are still separated.
  assert.deepEqual(staggerColumnDelays([0, 40, 300], 100, 24), [0, 100, 200]);
});

test('staggerCenterDelays: the middle first, symmetric outwards, even count gives a middle pair', () => {
  assert.deepEqual(staggerCenterDelays(5, 100), [200, 100, 0, 100, 200]);
  assert.deepEqual(staggerCenterDelays(4, 100), [100, 0, 0, 100]);
  assert.deepEqual(staggerCenterDelays(1, 100), [0]);
  assert.deepEqual(staggerCenterDelays(0, 100), []);
});

test('an unknown animation type gives a placeholder, never a crash', () => {
  const lifted = lift({ type: 'wobble', version: 1, props: {} }, undefined);
  assert.equal(lifted.ok, false);
  assert.equal(lifted.placeholder, 'unknown-type');
});
