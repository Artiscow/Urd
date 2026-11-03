/**
 * A page's own settings (editor/src/lib/page-settings.js): the layouts, a page's meta read and written clean, and another page made the front page.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
const { PAGE_SETTINGS_LAYOUTS, pageSettingsLayoutOf, metaOf, withMeta, frontPageSwap } = await import('../editor/src/lib/page-settings.js');

test('pageSettingsLayoutOf: the three layouts, the dialog for anything else', () => {
  assert.deepEqual(PAGE_SETTINGS_LAYOUTS, ['dialog', 'step', 'table']);
  assert.equal(pageSettingsLayoutOf('table'), 'table');
  assert.equal(pageSettingsLayoutOf('drill'), 'dialog');
  assert.equal(pageSettingsLayoutOf(null), 'dialog');
});

test('metaOf and withMeta: the fields as strings, an empty value deleting its key and the og object when it empties', () => {
  const page = { meta: { id: 'kaker', title: 'Kaker', description: 'Kakesiden', og: { title: 'Kaker hos oss' } } };
  assert.deepEqual(metaOf(page), { searchTitle: '', description: 'Kakesiden', ogTitle: 'Kaker hos oss', ogDescription: '', ogImage: '' });
  withMeta(page, 'searchTitle', '  Kaker til fest ');
  assert.equal(page.meta.searchTitle, 'Kaker til fest');
  withMeta(page, 'searchTitle', '');
  assert.equal('searchTitle' in page.meta, false);
  withMeta(page, 'ogImage', '/media/images/kake.webp');
  assert.deepEqual(page.meta.og, { title: 'Kaker hos oss', image: '/media/images/kake.webp' });
  withMeta(page, 'ogTitle', '');
  withMeta(page, 'ogImage', '');
  assert.equal('og' in page.meta, false, 'the og object goes when it empties');
  withMeta(page, 'nonsense', 'x');
  assert.deepEqual(Object.keys(page.meta).sort(), ['description', 'id', 'title']);
  assert.deepEqual(metaOf(null), { searchTitle: '', description: '', ogTitle: '', ogDescription: '', ogImage: '' });
});

test('frontPageSwap: the chosen page at / and first, the old front page at its id, the rest in order; nothing for the front page itself or an unknown id', () => {
  const pages = [
    { id: 'hjem', title: 'Hjem', path: '/', file: 'content/pages/hjem.json' },
    { id: 'om-oss', title: 'Om oss', path: '/om-oss', file: 'content/pages/om-oss.json' },
    { id: 'kaker', title: 'Kaker', path: '/kaker', file: 'content/pages/kaker.json' },
  ];
  const before = JSON.stringify(pages);
  const swap = frontPageSwap(pages, 'kaker');
  assert.deepEqual(swap.pages.map((p) => [p.id, p.path]), [['kaker', '/'], ['hjem', '/hjem'], ['om-oss', '/om-oss']]);
  assert.deepEqual(swap.from, { id: 'hjem', path: '/hjem' });
  assert.equal(swap.pages[0].file, 'content/pages/kaker.json', 'the file stays');
  assert.equal(JSON.stringify(pages), before, 'the registry given is not changed');
  assert.equal(frontPageSwap(pages, 'hjem'), null);
  assert.equal(frontPageSwap(pages, 'gone'), null);
});

test('frontPageSwap: the old front page takes the next free number when its id is an address already', () => {
  const pages = [
    { id: 'hjem', path: '/' },
    { id: 'kaker', path: '/hjem' },
    { id: 'om-oss', path: '/om-oss' },
  ];
  const swap = frontPageSwap(pages, 'om-oss');
  assert.deepEqual(swap.pages.map((p) => [p.id, p.path]), [['om-oss', '/'], ['hjem', '/hjem-2'], ['kaker', '/hjem']]);
});
