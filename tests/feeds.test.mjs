/**
 * Kontraktstester for synlighetsfilene (engine/feeds.js): sitemap, robots
 * og RSS bygges deterministisk, med XML-escaping og trygge fallbacker.
 * Publiserings-siden (at filene faktisk committes) testes manuelt.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { escapeXml, buildSitemapXml, buildRobotsTxt, buildRssXml, FEED_KINDS } = await engineImport('feeds.js');

test('escapeXml: alle fem entitetene', () => {
  assert.equal(escapeXml(`<a href="x">&'`), '&lt;a href=&quot;x&quot;&gt;&amp;&apos;');
  assert.equal(escapeXml(null), '');
});

test('buildSitemapXml: alle sider, forsiden uten dobbel skråstrek', () => {
  const xml = buildSitemapXml(
    [{ path: '/' }, { path: '/om-oss' }, { path: '/kaker' }],
    'https://eksempel.no/',
  );
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes('<loc>https://eksempel.no/</loc>'));
  assert.ok(xml.includes('<loc>https://eksempel.no/om-oss</loc>'));
  assert.ok(xml.includes('<loc>https://eksempel.no/kaker</loc>'));
  assert.ok(!xml.includes('eksempel.no//'));
  assert.equal((xml.match(/<url>/g) ?? []).length, 3);
});

test('buildSitemapXml: skjulte sider (noindex) utelates', () => {
  const xml = buildSitemapXml(
    [{ path: '/' }, { path: '/intern', noindex: true }],
    'https://eksempel.no',
  );
  assert.ok(!xml.includes('/intern'));
  assert.equal((xml.match(/<url>/g) ?? []).length, 1);
});

test('buildRobotsTxt: admin stengt, sitemap-peker', () => {
  const txt = buildRobotsTxt('https://eksempel.no');
  assert.ok(txt.includes('User-agent: *'));
  assert.ok(txt.includes('Disallow: /admin/'));
  assert.ok(txt.includes('Sitemap: https://eksempel.no/sitemap.xml'));
});

test('FEED_KINDS: daterte samlingstyper, aldri produkter', () => {
  assert.ok(FEED_KINDS.includes('news'));
  assert.ok(!FEED_KINDS.includes('products'));
  assert.ok(!FEED_KINDS.includes('custom'));
});

test('buildRssXml: kanal, innslag, datoer og escaping', () => {
  const xml = buildRssXml({
    title: 'Nyheter & notiser',
    origin: 'https://eksempel.no',
    path: '/content/samlinger/nyheter.xml',
    items: [
      { id: 'a1', title: 'Første <sak>', text: 'Tekst', date: '2026-08-01', href: '/kaker' },
      { id: 'a2', title: 'Uten dato og lenke' },
    ],
  });
  assert.ok(xml.includes('<title>Nyheter &amp; notiser</title>'));
  assert.ok(xml.includes('<title>Første &lt;sak&gt;</title>'));
  assert.ok(xml.includes('<link>https://eksempel.no/kaker</link>'));
  assert.ok(xml.includes('<pubDate>Sat, 01 Aug 2026'));
  assert.ok(xml.includes('<guid isPermaLink="false">/content/samlinger/nyheter.xml#a1</guid>'));
  // Innslag uten lenke peker på forsiden, og uten dato utelates pubDate.
  assert.ok(xml.includes('<link>https://eksempel.no/</link>'));
  assert.equal((xml.match(/<pubDate>/g) ?? []).length, 1);
});

test('buildRssXml: ugyldig dato gir intet pubDate, tom liste gir gyldig kanal', () => {
  const bad = buildRssXml({
    title: 'X', origin: 'https://x.no', path: '/f.xml',
    items: [{ id: 'a', title: 'T', date: 'ikke-en-dato' }],
  });
  assert.ok(!bad.includes('<pubDate>'));
  const empty = buildRssXml({ title: 'X', origin: 'https://x.no', path: '/f.xml', items: [] });
  assert.ok(empty.includes('</channel>'));
  assert.ok(!empty.includes('<item>'));
});
