/**
 * The files publishing writes to media/ (editor/src/lib/materialize.js): each in the folder of its kind, the field switched to the path, the same content once, and every upload field covered, the tab's mark, the quote's portrait and the links block's icons among them.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
const { materializeImages, materializeSiteImages, materializeEntryImages, materializeBlockImages } = await import('../editor/src/lib/materialize.js');

const PNG = 'data:image/png;base64,iVBORw0KGgo=';
const MP3 = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA';
const MP4 = 'data:video/mp4;base64,AAAAIGZ0eXBpc29t';

test('a page: every upload lands in the folder of its kind, and the field takes the path', () => {
  const page = {
    meta: { og: { image: PNG } },
    sections: [{ background: { layers: [{ type: 'video', props: { src: MP4, poster: PNG } }] }, blocks: [
      { type: 'image', props: { src: PNG, alt: 'Kake' } },
      { type: 'audio', props: { src: MP3, title: 'Sang' } },
      { type: 'quote', props: { image: PNG, attribution: 'Kari' } },
      { type: 'share', props: { links: [{ url: 'https://x.no', image: PNG }] } },
    ] }],
  };
  const files = materializeImages(page);
  const paths = files.map((f) => f.path);
  assert.ok(paths.every((p) => /^media\/(images|audio|video)\/[a-z0-9-]+-[0-9a-f]{8}\.(png|mp3|mp4)$/.test(p)), paths.join(' '));
  assert.match(page.sections[0].background.layers[0].props.src, /^\/media\/video\/video-/);
  assert.match(page.sections[0].background.layers[0].props.poster, /^\/media\/images\/poster-/);
  assert.match(page.sections[0].blocks[0].props.src, /^\/media\/images\/kake-/);
  assert.match(page.sections[0].blocks[1].props.src, /^\/media\/audio\/sang-/);
  assert.match(page.sections[0].blocks[2].props.image, /^\/media\/images\/kari-/, 'the quote\'s portrait');
  assert.match(page.sections[0].blocks[3].props.links[0].image, /^\/media\/images\/share-icon-/, 'the links block\'s own icon');
  assert.match(page.meta.og.image, /^\/media\/images\/share-/);
});

test('the site: the logo, the favicon, the tab\'s mark and the shortcuts; a path already published is left as it is', () => {
  const site = {
    site: { icon: PNG, links: [{ url: 'https://x.no', image: PNG }] },
    nav: { logo: { type: 'image', value: PNG }, tab: { image: PNG }, launcher: { image: PNG, links: [{ image: '/media/images/old-1a2b3c4d.webp' }] } },
    footer: { brand: { logo: PNG } },
  };
  const files = materializeSiteImages(site);
  assert.match(site.nav.tab.image, /^\/media\/images\/tab-/, 'the tab\'s mark');
  assert.match(site.site.icon, /^\/media\/images\/icon-/);
  assert.equal(site.nav.launcher.links[0].image, '/media/images/old-1a2b3c4d.webp');
  assert.ok(files.every((f) => f.path.startsWith('media/images/')));
});

test('an entry and a block: the same content gives the same path, so a republish never duplicates a file', () => {
  const entry = { title: 'Kanelboller', image: PNG, colors: [{ name: 'Grønn', image: PNG }] };
  const files = [];
  materializeEntryImages(entry, files);
  assert.equal(files.length, 2, 'two fields, two entries in the list');
  assert.equal(files[0].path.split('-').pop(), files[1].path.split('-').pop(), 'the same hash');
  const block = { type: 'image', props: { src: '/media/images/kake-1a2b3c4d.webp', alt: 'Kake' } };
  materializeBlockImages(block, files);
  assert.equal(files.length, 2, 'a published path adds nothing');
});
