/**
 * The update notice's form (editor/src/lib/update-notice.js): a dot by default, the pill where chosen and the bar is wide, the dot again where it is narrow, nothing while no update is out.
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
