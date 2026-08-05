/**
 * Animasjonene er registertyper under samme version+migrate-kontrakt som
 * blokker og bakgrunnslag (løfte 2): en Urd-oppdatering skal kunne endre
 * en animasjons props uten å knekke publiserte sider.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { coreAnimations, staggerColumnDelays } = await engineImport('animations/core.js');
const { lift } = await engineImport('migrate.js');

test('kjerneanimasjonene følger version+migrate-kontrakten', () => {
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

test('inngangsanimasjonene har varighet som standard (stagger bruker trinn i stedet for forsinkelse)', () => {
  for (const [id, def] of Object.entries(coreAnimations)) {
    if (!def.entrance) continue;
    const props = def.defaults();
    assert.equal(typeof props.duration, 'number', id);
    if (def.group) {
      // Stagger er en gruppeanimasjon: trinn/effekt/mønster i stedet for delay.
      assert.equal(typeof props.step, 'number', id);
      assert.equal(typeof props.pattern, 'string', id);
    } else {
      assert.equal(typeof props.delay, 'number', id);
    }
  }
});

test('staggerColumnDelays: kort i samme kolonne deler trinn, bølgen følger stigende x', () => {
  // 4 kolonner x 2 rader (leserekkefølge): kol-indeks = posisjon-rang * step.
  const positions = [0, 1, 2, 3, 0, 1, 2, 3];
  assert.deepEqual(staggerColumnDelays(positions, 100), [0, 100, 200, 300, 0, 100, 200, 300]);
  // Uordnede/ujevne x-verdier rangeres stigende, ikke etter rekkefølge.
  assert.deepEqual(staggerColumnDelays([30, 10, 10, 30], 50), [50, 0, 0, 50]);
  assert.deepEqual(staggerColumnDelays([], 100), []);
});

test('ukjent animasjonstype gir plassholder, aldri krasj', () => {
  const lifted = lift({ type: 'wobble', version: 1, props: {} }, undefined);
  assert.equal(lifted.ok, false);
  assert.equal(lifted.placeholder, 'unknown-type');
});
