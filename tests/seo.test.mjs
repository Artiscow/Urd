/**
 * Kontraktstester for SEO-metadataen (engine/seo.js): tagg-bygging med
 * fallback-trappene og JSON-LD-formen. DOM-skrivingen (applyHeadMeta)
 * testes manuelt (testrundene).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { pageMetaTags, siteJsonLd } = await engineImport('seo.js');

const SITE = { site: { title: 'Urd', description: 'Testside', icon: '/media/ikon.webp' } };

const find = (tags, key, value) => tags.find((t) => t.attrs[key] === value);

test('pageMetaTags: beskrivelse, canonical og og-feltene', () => {
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

test('pageMetaTags: fallback-trappa uten egne felt', () => {
  const tags = pageMetaTags(SITE, { meta: { id: 'hjem', title: 'Hjem' } }, 'https://eksempel.no', '/');
  // Uten sidebeskrivelse settes ingen meta description, men og:description
  // faller til nettstedsbeskrivelsen og og:image til nettstedsikonet.
  assert.equal(find(tags, 'name', 'description'), undefined);
  assert.equal(find(tags, 'property', 'og:title').attrs.content, 'Hjem');
  assert.equal(find(tags, 'property', 'og:description').attrs.content, 'Testside');
  assert.equal(find(tags, 'property', 'og:image').attrs.content, 'https://eksempel.no/media/ikon.webp');
  assert.equal(find(tags, 'rel', 'canonical').attrs.href, 'https://eksempel.no/');
});

test('pageMetaTags: tomt nettsted gir aldri krasj eller tomme tagger', () => {
  const tags = pageMetaTags({}, {}, 'https://eksempel.no', '/');
  assert.equal(find(tags, 'name', 'description'), undefined);
  assert.equal(find(tags, 'property', 'og:image'), undefined);
  assert.equal(find(tags, 'property', 'og:description'), undefined);
});

test('pageMetaTags: X-kortet følger bildet', () => {
  const withImage = pageMetaTags(SITE, { meta: {} }, 'https://x.no', '/');
  assert.equal(find(withImage, 'name', 'twitter:card').attrs.content, 'summary_large_image');
  const without = pageMetaTags({}, {}, 'https://x.no', '/');
  assert.equal(find(without, 'name', 'twitter:card').attrs.content, 'summary');
});

test('pageMetaTags: skjult side får noindex uten canonical, men beholder deling', () => {
  const tags = pageMetaTags(SITE, { meta: { title: 'Intern' } }, 'https://x.no', '/intern', { noindex: true });
  assert.equal(find(tags, 'name', 'robots').attrs.content, 'noindex');
  assert.equal(find(tags, 'rel', 'canonical'), undefined);
  assert.equal(find(tags, 'property', 'og:title').attrs.content, 'Intern');
  const open = pageMetaTags(SITE, { meta: { title: 'Åpen' } }, 'https://x.no', '/aapen', { noindex: false });
  assert.equal(find(open, 'name', 'robots'), undefined);
  assert.ok(find(open, 'rel', 'canonical'));
});

test('siteJsonLd: Organization med navn, adresse, beskrivelse og logo', () => {
  const data = siteJsonLd(SITE, 'https://eksempel.no');
  assert.equal(data['@context'], 'https://schema.org');
  assert.equal(data['@type'], 'Organization');
  assert.equal(data.name, 'Urd');
  assert.equal(data.url, 'https://eksempel.no/');
  assert.equal(data.description, 'Testside');
  assert.equal(data.logo, 'https://eksempel.no/media/ikon.webp');
});

test('siteJsonLd: valgfrie felt utelates når de mangler', () => {
  const data = siteJsonLd({ site: { title: 'X' } }, 'https://x.no');
  assert.equal(data.name, 'X');
  assert.ok(!('description' in data));
  assert.ok(!('logo' in data));
});
