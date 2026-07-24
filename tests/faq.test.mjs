/**
 * Kontraktstester for FAQ-akkordeonens rene åpen/lukk-logikk (nextOpen).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { nextOpen } from '../template/assets/engine/blocks/faq.js';

test('klikk åpner et lukket svar', () => {
  assert.deepEqual(nextOpen([], 1, false), [1]);
});

test('klikk lukker et åpent svar', () => {
  assert.deepEqual(nextOpen([1], 1, false), []);
  assert.deepEqual(nextOpen([0, 2], 2, true), [0]);
});

test('uten multi lukkes forrige når et nytt åpnes', () => {
  assert.deepEqual(nextOpen([0], 2, false), [2]);
});

test('med multi kan flere stå åpne, sortert stigende', () => {
  assert.deepEqual(nextOpen([2], 0, true), [0, 2]);
});

test('inndata-listen muteres ikke', () => {
  const open = [0];
  nextOpen(open, 1, false);
  assert.deepEqual(open, [0]);
});
