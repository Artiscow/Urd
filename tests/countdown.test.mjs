/**
 * Contract tests for the countdown's pure logic (countdownParts/parseTarget).
 * The ticking and the DOM are tested manually (the test rounds).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { countdownParts, parseTarget, countdownBlock } = await engineImport('blocks/countdown.js');

test('countdownParts: splits the time into days/hours/minutes/seconds', () => {
  const now = Date.UTC(2026, 7, 14, 12, 0, 0);
  const target = now + ((2 * 24 + 3) * 3600 + 4 * 60 + 5) * 1000;
  assert.deepEqual(countdownParts(target, now), { done: false, days: 2, hours: 3, minutes: 4, seconds: 5 });
});

test('countdownParts: a passed or invalid target is done', () => {
  const now = Date.UTC(2026, 7, 14, 12, 0, 0);
  assert.equal(countdownParts(now - 1000, now).done, true);
  assert.equal(countdownParts(now, now).done, true);
  assert.equal(countdownParts(Number.NaN, now).done, true);
});

test('parseTarget: the datetime-local form is parsed, garbage gives null', () => {
  assert.ok(Number.isFinite(parseTarget('2026-12-24T18:00')));
  // 'i morgen' is deliberate non-date input ("tomorrow").
  assert.equal(parseTarget('i morgen'), null);
  assert.equal(parseTarget(''), null);
  assert.equal(parseTarget('2026-12-24'), null);
});

test('defaults: the target is seeded ahead in time in datetime-local form', () => {
  const d = countdownBlock.defaults();
  assert.equal(countdownBlock.version, 1);
  assert.match(d.target, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  assert.ok(parseTarget(d.target) > Date.now());
});
