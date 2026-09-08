/**
 * Contract tests for the FAQ accordion: the group name (native exclusive
 * unfolding via <details name>) and the block's default shape. The unfolding
 * itself, the editing and the autogrowth are DOM behavior and are covered by
 * the headless checks.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { faqBlock, groupName } = await engineImport('blocks/faq.js');

test('groupName: without multi the questions share one name (exclusive unfolding)', () => {
  assert.equal(groupName('abc', false), 'urd-faq-abc');
});

test('groupName: with multi the name is empty (several can stay open)', () => {
  assert.equal(groupName('abc', true), '');
});

test('groupName: a missing block id gives a stable fallback name', () => {
  assert.equal(groupName('', false), 'urd-faq-x');
  assert.equal(groupName(undefined, false), 'urd-faq-x');
});

test('faqBlock: the default shape is three questions, not multi', () => {
  const d = faqBlock.defaults();
  assert.equal(faqBlock.version, 1);
  assert.equal(d.items.length, 3);
  assert.equal(d.multi, false);
  assert.ok(d.items.every((i) => typeof i.q === 'string' && typeof i.a === 'string'));
});
