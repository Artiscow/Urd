/**
 * Contract tests for the SEO metadata (engine/seo.js): tag building with the
 * fallback ladders and the JSON-LD shape. The DOM writing (applyHeadMeta) is
 * tested manually (the test rounds).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { pageMetaTags, siteJsonLd } = await engineImport('seo.js');

// Norwegian titles, descriptions and slugs below are deliberate fixture data
// (user site content).
const SITE = { site: { title: 'Urd', description: 'Testside', icon: '/media/ikon.webp' } };

const find = (tags, key, value) => tags.find((t) => t.attrs[key] === value);

test('pageMetaTags: description, canonical and the og fields', () => {
  const page = { meta: { title: 'Kaker', description: 'Kakesiden', og: { title: 'Kaker hos oss', image: '/media/kake.webp' } } };
  const tags = pageMetaTags(SITE, page, 'https://eksempel.no', '/kaker');
  assert.equal(find(tags, 'name', 'description').attrs.content, 'Kakesiden');
  assert.equal(find(tags, 'rel', 'canonical').attrs.href, 'https://eksempel.no/kaker');
  assert.equal(find(tags, 'property', 'og:title').attrs.content, 'Kaker hos oss');
  assert.equal(find(tags, 'property', 'og:description').attrs.content, 'Kakesiden');
  assert.equal(find(tags, 'property', 'og:image').attrs.content, 'https://eksempel.no/media/kake.webp');
  assert.equal(find(tags, 'property', 'og:url').attrs.content, 'https://eksempel.no/kaker');
  assert.equal(find(tags, 'property', 'og:site_name').attrs.content, 'Urd');
});

test('pageMetaTags: the fallback ladder without own fields', () => {
  const tags = pageMetaTags(SITE, { meta: { id: 'hjem', title: 'Hjem' } }, 'https://eksempel.no', '/');
  // Without a page description no meta description is set, but og:description
  // falls back to the site description and og:image to the site icon.
  assert.equal(find(tags, 'name', 'description'), undefined);
  assert.equal(find(tags, 'property', 'og:title').attrs.content, 'Hjem');
  assert.equal(find(tags, 'property', 'og:description').attrs.content, 'Testside');
  assert.equal(find(tags, 'property', 'og:image').attrs.content, 'https://eksempel.no/media/ikon.webp');
  assert.equal(find(tags, 'rel', 'canonical').attrs.href, 'https://eksempel.no/');
});

test('pageMetaTags: an empty site never gives a crash or empty tags', () => {
  const tags = pageMetaTags({}, {}, 'https://eksempel.no', '/');
  assert.equal(find(tags, 'name', 'description'), undefined);
  assert.equal(find(tags, 'property', 'og:image'), undefined);
  assert.equal(find(tags, 'property', 'og:description'), undefined);
});

test('pageMetaTags: the X card follows the image', () => {
  const withImage = pageMetaTags(SITE, { meta: {} }, 'https://x.no', '/');
  assert.equal(find(withImage, 'name', 'twitter:card').attrs.content, 'summary_large_image');
  const without = pageMetaTags({}, {}, 'https://x.no', '/');
  assert.equal(find(without, 'name', 'twitter:card').attrs.content, 'summary');
});

test('pageMetaTags: a hidden page gets noindex without canonical, but keeps sharing', () => {
  const tags = pageMetaTags(SITE, { meta: { title: 'Intern' } }, 'https://x.no', '/intern', { noindex: true });
  assert.equal(find(tags, 'name', 'robots').attrs.content, 'noindex');
  assert.equal(find(tags, 'rel', 'canonical'), undefined);
  assert.equal(find(tags, 'property', 'og:title').attrs.content, 'Intern');
  const open = pageMetaTags(SITE, { meta: { title: 'Åpen' } }, 'https://x.no', '/aapen', { noindex: false });
  assert.equal(find(open, 'name', 'robots'), undefined);
  assert.ok(find(open, 'rel', 'canonical'));
});

test('siteJsonLd: Organization with name, address, description and logo', () => {
  const data = siteJsonLd(SITE, 'https://eksempel.no');
  assert.equal(data['@context'], 'https://schema.org');
  assert.equal(data['@type'], 'Organization');
  assert.equal(data.name, 'Urd');
  assert.equal(data.url, 'https://eksempel.no/');
  assert.equal(data.description, 'Testside');
  assert.equal(data.logo, 'https://eksempel.no/media/ikon.webp');
});

test('siteJsonLd: optional fields are left out when they are missing', () => {
  const data = siteJsonLd({ site: { title: 'X' } }, 'https://x.no');
  assert.equal(data.name, 'X');
  assert.ok(!('description' in data));
  assert.ok(!('logo' in data));
});
