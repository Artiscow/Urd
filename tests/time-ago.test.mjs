/**
 * How long ago (editor/src/lib/time-ago.js): nothing under a minute, then minutes, hours and days in the language asked for, and the browser's own for a code Intl rejects.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { timeAgo } from '../editor/src/lib/time-ago.js';

const now = Date.UTC(2026, 10, 8, 12, 0, 0);
const min = 60_000;

test('under a minute is nothing, then minutes, hours and days', () => {
  assert.equal(timeAgo(now - 30_000, 'en-GB', now), '');
  assert.match(timeAgo(now - 5 * min, 'en-GB', now), /5 ?min/);
  assert.match(timeAgo(now - 3 * 60 * min, 'en-GB', now), /3 ?hr/);
  assert.match(timeAgo(now - 30 * 60 * min, 'en-GB', now), /yesterday/);
  assert.match(timeAgo(now - 5 * 24 * 60 * min, 'en-GB', now), /5 ?days/);
});

test('the admin language shapes the words, and a code Intl rejects does not throw', () => {
  assert.match(timeAgo(now - 5 * min, 'nb', now), /min/);
  assert.ok(timeAgo(now - 5 * min, 'xx-not-a-code!', now).length > 0);
});
