/**
 * The tidy of a site's media/ (editor/src/lib/media-tidy.js): the root files move into the folder of their kind, every reference follows, a full press leaves the rest for the next, and a tidy site gives nothing to do.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
const { tidyMedia, rootMediaFiles, strandedReferences, TIDY_ROOM } = await import('../editor/src/lib/media-tidy.js');

const LISTING = [
  { path: 'media/logo-91963a12.svg', size: 531 },
  { path: 'media/meny-1a2b3c4d.pdf', size: 9000 },
  { path: 'media/sang-2b2b2b2b.mp3', size: 90000 },
  { path: 'media/images/kake-5e5e5e5e.webp', size: 3000 },
  { path: 'media/notes.txt', size: 10 },
  { path: 'media/.gitkeep', size: 0 },
];

test('rootMediaFiles: the files at the root, each with its folder; the ones in a folder and the kinds media/ does not hold stay', () => {
  assert.deepEqual(rootMediaFiles(LISTING), [
    { from: 'media/logo-91963a12.svg', to: 'media/images/logo-91963a12.svg' },
    { from: 'media/meny-1a2b3c4d.pdf', to: 'media/files/meny-1a2b3c4d.pdf' },
    { from: 'media/sang-2b2b2b2b.mp3', to: 'media/audio/sang-2b2b2b2b.mp3' },
  ]);
  assert.deepEqual(rootMediaFiles(['media/a.webp']), [{ from: 'media/a.webp', to: 'media/images/a.webp' }], 'plain paths too');
});

test('tidyMedia: the moves, and every reference rewritten, in a field, in rich text and in a page, a collection and a template', () => {
  const docs = {
    site: { nav: { logo: { type: 'image', value: '/media/logo-91963a12.svg' } }, footer: { columns: [{ links: [{ href: '/media/MENY-1a2b3c4d.pdf' }] }] } },
    pages: [
      ['hjem', { sections: [{ blocks: [{ props: { html: '<p><a href="/media/meny-1a2b3c4d.pdf">Meny</a></p>', src: '/media/images/kake-5e5e5e5e.webp' } }] }] }],
      ['om-oss', { sections: [] }],
    ],
    collections: [['nyheter', { entries: [{ href: '/media/sang-2b2b2b2b.mp3' }] }]],
    templates: [['hero', { section: { background: { layers: [{ props: { src: '/media/logo-91963a12.svg' } }] } } }]],
  };
  const plan = tidyMedia(docs, LISTING);
  assert.equal(plan.moves.length, 3);
  assert.equal(plan.remaining, 0);
  assert.equal(plan.site.nav.logo.value, '/media/images/logo-91963a12.svg');
  assert.equal(plan.site.footer.columns[0].links[0].href, '/media/files/meny-1a2b3c4d.pdf', 'matched without case, written as the file is named');
  assert.deepEqual(plan.pages.map(([id]) => id), ['hjem'], 'a page with nothing to change is left out');
  assert.equal(plan.pages[0][1].sections[0].blocks[0].props.html, '<p><a href="/media/files/meny-1a2b3c4d.pdf">Meny</a></p>');
  assert.equal(plan.pages[0][1].sections[0].blocks[0].props.src, '/media/images/kake-5e5e5e5e.webp', 'a path in its folder stays');
  assert.equal(plan.collections[0][1].entries[0].href, '/media/audio/sang-2b2b2b2b.mp3');
  assert.equal(plan.templates[0][1].section.background.layers[0].props.src, '/media/images/logo-91963a12.svg');
  assert.equal(docs.site.nav.logo.value, '/media/logo-91963a12.svg', 'the documents given are not changed');
});

test('tidyMedia: a full press moves the first files and rewrites only for them, the rest waiting; a tidy site gives nothing', () => {
  const docs = { site: { a: '/media/logo-91963a12.svg', b: '/media/sang-2b2b2b2b.mp3' }, pages: [] };
  const plan = tidyMedia(docs, LISTING, { room: 2 });
  assert.equal(plan.moves.length, 2);
  assert.equal(plan.remaining, 1);
  assert.equal(plan.site.a, '/media/images/logo-91963a12.svg');
  assert.equal(plan.site.b, '/media/sang-2b2b2b2b.mp3', 'a file that waits keeps its reference');
  const tidy = tidyMedia({ site: { a: '/media/images/logo-91963a12.svg' } }, [{ path: 'media/images/logo-91963a12.svg' }]);
  assert.deepEqual([tidy.moves, tidy.site, tidy.remaining], [[], null, 0]);
  assert.ok(TIDY_ROOM < 200);
});

test('strandedReferences: a root path the content names that the listing does not hold', () => {
  const docs = { site: { a: '/media/gone-00000000.webp', b: '/media/logo-91963a12.svg' } };
  assert.deepEqual(strandedReferences(docs, LISTING), ['/media/gone-00000000.webp']);
});

test('the template site: its seven files move, its four documents change, and a second press has nothing to do', () => {
  const read = (p) => JSON.parse(readFileSync(new URL(`../template/${p}`, import.meta.url), 'utf-8'));
  const docs = {
    site: read('content/site.json'),
    pages: ['hjem', 'om-oss', 'kontakt', 'kaker', 'checkout', 'shop', 'shop-fp'].map((id) => [id, read(`content/pages/${id}.json`)]),
    collections: ['nyheter', 'produkter'].map((id) => [id, read(`content/samlinger/${id}.json`)]),
  };
  const listing = ['bakgrunn-a1730034.svg', 'bakgrunn-f5939d16.webp', 'bytt-dette-bildet-2d12d623.svg', 'bytt-dette-bildet-84615e61.svg', 'footer-logo-84804c80.svg', 'ikon-9740643c.webp', 'logo-91963a12.svg'];
  const before = JSON.parse(JSON.stringify(docs, (k, v) => (typeof v === 'string' ? v.replace(/\/media\/images\//g, '/media/') : v)));
  const plan = tidyMedia(before, listing.map((name) => `media/${name}`));
  assert.equal(plan.moves.length, 7);
  assert.equal(plan.pages.length, 3);
  assert.ok(plan.site);
  assert.equal(JSON.stringify(plan.site), JSON.stringify(docs.site), 'the rewritten site is the site as shipped');
  const again = tidyMedia(docs, listing.map((name) => `media/images/${name}`));
  assert.deepEqual([again.moves.length, again.pages.length, again.site], [0, 0, null]);
});
