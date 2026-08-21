/**
 * Kontraktstester for nedtellerens rene logikk (countdownParts/parseTarget).
 * Tikkingen og DOM-en testes manuelt (testrundene).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { countdownParts, parseTarget, nedtellerBlock } = await engineImport('blocks/nedteller.js');

test('countdownParts: deler tiden i dager/timer/minutter/sekunder', () => {
  const now = Date.UTC(2026, 7, 14, 12, 0, 0);
  const target = now + ((2 * 24 + 3) * 3600 + 4 * 60 + 5) * 1000;
  assert.deepEqual(countdownParts(target, now), { done: false, days: 2, hours: 3, minutes: 4, seconds: 5 });
});

test('countdownParts: passert eller ugyldig mål er ferdig', () => {
  const now = Date.UTC(2026, 7, 14, 12, 0, 0);
  assert.equal(countdownParts(now - 1000, now).done, true);
  assert.equal(countdownParts(now, now).done, true);
  assert.equal(countdownParts(Number.NaN, now).done, true);
});

test('parseTarget: datetime-local-formen tolkes, søppel gir null', () => {
  assert.ok(Number.isFinite(parseTarget('2026-12-24T18:00')));
  assert.equal(parseTarget('i morgen'), null);
  assert.equal(parseTarget(''), null);
  assert.equal(parseTarget('2026-12-24'), null);
});

test('defaults: målet seedes fram i tid på datetime-local-form', () => {
  const d = nedtellerBlock.defaults();
  assert.equal(nedtellerBlock.version, 1);
  assert.match(d.target, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  assert.ok(parseTarget(d.target) > Date.now());
});
