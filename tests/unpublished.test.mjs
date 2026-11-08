/**
 * What waits to be published (editor/src/lib/unpublished.js): one part for each thing a publish would write, in the order the History panel lists them, and none when nothing has a draft.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unpublishedParts, stepsForPart } from '../editor/src/lib/unpublished.js';

const pages = [{ id: 'home', title: 'Hjem' }, { id: 'about', title: 'Om oss' }, { id: 'new', title: '' }];

test('nothing with a draft gives no part', () => {
  assert.deepEqual(unpublishedParts({ pages, pageDraft: () => false }), []);
  assert.deepEqual(unpublishedParts({ pageDraft: () => false, collections: [{ id: 'news', name: 'News', draft: false }] }), []);
});

test('the pages with a draft come first by their names, then the site, the collections and the rest', () => {
  const parts = unpublishedParts({
    pages,
    pageDraft: (id) => id !== 'home',
    site: true,
    collectionsIndex: true,
    collections: [{ id: 'news', name: 'News', draft: true }, { id: 'shop', name: 'Shop', draft: false }, { id: 'f', draft: true }],
    templates: true,
    plugins: true,
    redirects: true,
  });
  assert.deepEqual(parts, [
    { kind: 'page', id: 'about', name: 'Om oss' },
    { kind: 'page', id: 'new', name: 'new' },
    { kind: 'site' },
    { kind: 'collections' },
    { kind: 'collection', id: 'news', name: 'News' },
    { kind: 'collection', id: 'f', name: 'f' },
    { kind: 'templates' },
    { kind: 'plugins' },
    { kind: 'redirects' },
  ]);
});

test('stepsForPart: a page\'s steps are those made on it, the site\'s are the site file\'s, and nothing older than the last publish', () => {
  const steps = [
    { key: 'edit:x', at: 500, pageId: 'about', typed: true },
    { key: 'nav', at: 450, pageId: 'home', typed: false },
    { key: 'move-block', at: 400, pageId: 'home', typed: false },
    { key: 'page-meta:title', at: 350, pageId: 'home', pages: ['about'], typed: false },
    { key: 'edit:page-noindex', at: 320, pageId: 'home', typed: false },
    { key: 'collections', at: 300, pageId: 'home', typed: false },
    { key: 'add-block', at: 100, pageId: 'home', typed: false },
  ];
  assert.deepEqual(stepsForPart({ kind: 'page', id: 'home' }, steps, 200).map((s) => s.labelKey), ['history.step.moveBlock']);
  // A page's search title is the page file's, credited to the page the step names even while another page is open; its search visibility is the site file's.
  assert.deepEqual(stepsForPart({ kind: 'page', id: 'about' }, steps, 200).map((s) => s.labelKey), ['history.step.typed', 'history.step.pageSettings']);
  assert.deepEqual(stepsForPart({ kind: 'site' }, steps, 200).map((s) => s.labelKey), ['history.step.nav', 'history.step.pageSettings']);
  assert.deepEqual(stepsForPart({ kind: 'collection', id: 'news' }, steps, 200).map((s) => s.at), [300]);
  assert.deepEqual(stepsForPart({ kind: 'page', id: 'home' }, steps, 0).map((s) => s.at), [400, 100], 'with no publish known every kept step counts');
  assert.deepEqual(stepsForPart({ kind: 'plugins' }, steps, 0), []);
});
