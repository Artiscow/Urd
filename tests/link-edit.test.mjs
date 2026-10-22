/**
 * Link editing in the editor (editor/src/lib/link-edit.js): pointing a link at a page, a typed address or nothing drops the parts that belonged to what it pointed at before.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pointLink, clearLinkExtras } from '../editor/src/lib/link-edit.js';

test('pointLink: a page, a typed address or nothing, without the old spot, new tab and rel words', () => {
  const link = { label: 'Bli med', page: 'kaker', target: 'blk-1', newTab: true, rel: ['nofollow'] };
  pointLink(link, 'om-oss');
  assert.deepEqual(link, { label: 'Bli med', page: 'om-oss' });
  pointLink(link, '__href');
  assert.deepEqual(link, { label: 'Bli med', href: 'https://' });
  link.href = 'https://x.no';
  link.newTab = true;
  pointLink(link, '__href');
  assert.deepEqual(link, { label: 'Bli med', href: 'https://x.no' }, 'a typed address is kept');
  pointLink(link, '__none');
  assert.deepEqual(link, { label: 'Bli med' });
});

test('clearLinkExtras: only the spot, the new tab and the rel words go', () => {
  const props = { label: 'Les mer', page: 'kaker', target: 'priser', newTab: false, rel: [], style: 'primary' };
  clearLinkExtras(props);
  assert.deepEqual(props, { label: 'Les mer', page: 'kaker', style: 'primary' });
});
