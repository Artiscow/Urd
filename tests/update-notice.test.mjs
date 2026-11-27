/**
 * The update notice's form (editor/src/lib/update-notice.js): a dot by default, the pill where chosen and the bar is wide, the dot again where it is narrow and for the security headers alone.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { UPDATE_NOTICES, updateNoticeForm } from '../editor/src/lib/update-notice.js';

test('the notice is the dot unless the pill is chosen and the bar is wide, and nothing without an update', () => {
  assert.deepEqual(UPDATE_NOTICES, ['dot', 'pill']);
  assert.equal(updateNoticeForm(false, 'pill', false), null);
  assert.equal(updateNoticeForm(true, undefined, false), 'dot');
  assert.equal(updateNoticeForm(true, 'dot', false), 'dot');
  assert.equal(updateNoticeForm(true, 'pill', false), 'pill');
  assert.equal(updateNoticeForm(true, 'pill', true), 'dot');
  assert.equal(updateNoticeForm(true, 'nonsense', false), 'dot');
});

test('security headers that can be brought up to date, with no new Urd out, show the dot, as the pill names a version', () => {
  assert.equal(updateNoticeForm(false, 'pill', false, true), 'dot');
  assert.equal(updateNoticeForm(false, undefined, false, true), 'dot');
  assert.equal(updateNoticeForm(true, 'pill', false, true), 'pill', 'a new Urd keeps its own form');
  assert.equal(updateNoticeForm(false, 'pill', false, false), null);
});
