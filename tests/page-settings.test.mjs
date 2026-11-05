/**
 * A page's own settings (editor/src/lib/page-settings.js): the layouts, a page's meta read and written clean, and another page made the front page.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
import { engineImport } from './_engine.mjs';
const { PAGE_SETTINGS_LAYOUTS, pageSettingsLayoutOf, metaOf, withMeta, withShareSource, frontPageSwap, refusedPageFields, refusedPageFieldLine } = await import('../editor/src/lib/page-settings.js');

test('pageSettingsLayoutOf: the three layouts, the dialog for anything else', () => {
  assert.deepEqual(PAGE_SETTINGS_LAYOUTS, ['dialog', 'step', 'table']);
  assert.equal(pageSettingsLayoutOf('table'), 'table');
  assert.equal(pageSettingsLayoutOf('drill'), 'dialog');
  assert.equal(pageSettingsLayoutOf(null), 'dialog');
});

test('metaOf and withMeta: the fields as strings, an empty value deleting its key and the og object when it empties', () => {
  const page = { meta: { id: 'kaker', title: 'Kaker', description: 'Kakesiden', og: { title: 'Kaker hos oss' } } };
  assert.deepEqual(metaOf(page), { searchTitle: '', description: 'Kakesiden', ogTitle: 'Kaker hos oss', ogDescription: '', ogImage: '', ogImageSource: null });
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
  assert.deepEqual(metaOf(null), { searchTitle: '', description: '', ogTitle: '', ogDescription: '', ogImage: '', ogImageSource: null });
});

test('withShareSource: the share image\'s kept original beside the image, taken away with null, and the og object gone when it empties', () => {
  const page = { meta: { title: 'Kaker' } };
  withMeta(page, 'ogImage', '/media/images/share.webp');
  withShareSource(page, { src: '/media/images/original.webp', zoom: 2 });
  assert.deepEqual(page.meta.og, { image: '/media/images/share.webp', imageSource: { src: '/media/images/original.webp', zoom: 2 } });
  assert.deepEqual(metaOf(page).ogImageSource, { src: '/media/images/original.webp', zoom: 2 });
  withShareSource(page, { zoom: 2 });
  assert.equal('imageSource' in page.meta.og, false, 'an original without a file is not kept');
  withMeta(page, 'ogImage', '');
  withShareSource(page, null);
  assert.equal('og' in page.meta, false);
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

test('refusedPageFields: the names and addresses turned down, in the pages\' order, with what each page keeps', () => {
  const pages = [
    { id: 'hjem', title: 'Hjem', path: '/' },
    { id: 'om-oss', title: 'Om oss', path: '/om-oss' },
    { id: 'kontakt', title: 'Kontakt', path: '/kontakt' },
  ];
  const typed = {
    'kontakt:slug': { text: 'kaker', reason: 'taken' },
    'om-oss:slug': { text: '', reason: 'needs an address' },
    'om-oss:title': { text: 'Om', reason: null },
    'kontakt:title': { text: ' ', reason: 'needs a name' },
    'gone:slug': { text: '', reason: 'needs an address' },
  };
  assert.deepEqual(refusedPageFields(typed, pages), [
    { id: 'om-oss', title: 'Om oss', field: 'slug', text: '', reason: 'needs an address', kept: '/om-oss' },
    { id: 'kontakt', title: 'Kontakt', field: 'title', text: ' ', reason: 'needs a name', kept: 'Kontakt' },
    { id: 'kontakt', title: 'Kontakt', field: 'slug', text: 'kaker', reason: 'taken', kept: '/kontakt' },
  ], 'a field still being typed is left out, and so is a page no longer on the site');
  assert.deepEqual(refusedPageFields({}, pages), []);
});

test('refusedPageFieldLine: an empty address, an address that could not be used and an empty name each say what the page is published with', async () => {
  const dict = (await engineImport('locales/admin/en-GB.js')).default.strings;
  const empty = refusedPageFieldLine({ id: 'om-oss', title: 'Om oss', field: 'slug', text: '  ', reason: 'The page needs an address', kept: '/om-oss' });
  assert.deepEqual(empty, { key: 'confirm.pageFields.emptyAddress', vars: { page: 'Om oss', text: '', reason: 'The page needs an address', kept: '/om-oss' } });
  assert.equal(refusedPageFieldLine({ id: 'kontakt', title: 'Kontakt', field: 'slug', text: 'kaker', reason: 'taken', kept: '/kontakt' }).key, 'confirm.pageFields.address');
  assert.equal(refusedPageFieldLine({ id: 'kontakt', title: 'Kontakt', field: 'title', text: '', reason: 'needs a name', kept: 'Kontakt' }).key, 'confirm.pageFields.emptyName');
  assert.equal(refusedPageFieldLine({ id: 'x', title: '', field: 'slug', text: '', reason: 'r', kept: '/x' }).vars.page, 'x', 'a page without a name by its id');
  for (const key of ['confirm.pageFields.emptyAddress', 'confirm.pageFields.address', 'confirm.pageFields.emptyName', 'confirm.pageFields.title', 'confirm.beforePublish']) assert.ok(dict[key], key);
});

