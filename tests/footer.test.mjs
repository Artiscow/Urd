/**
 * Test av den rene footer-logikken: merkevare, kolonner, sosiale lenker,
 * bunnlinje og trygg-URL-voktere. DOM-byggingen (footer.js) dekkes av
 * headless-sjekkpunktene.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isSafeUrl,
  footerBrand,
  footerColumns,
  footerSocial,
  footerBaseline,
  hasRichFooter,
} from '../template/assets/engine/footer-model.js';

const PAGES = [
  { id: 'hjem', path: '/' },
  { id: 'om', path: '/om-oss' },
];

test('isSafeUrl godtar http(s)/mailto/tel og avviser resten', () => {
  for (const ok of ['https://x.no', 'http://x.no/a', 'mailto:a@b.no', 'tel:+4712345678']) {
    assert.equal(isSafeUrl(ok), true, ok);
  }
  for (const bad of ['javascript:alert(1)', 'data:text/html,x', 'ftp://x', '', '  ', null, 42]) {
    assert.equal(isSafeUrl(bad), false, String(bad));
  }
});

test('footerBrand: tittel, tagline, ingen sidetittel-fallback, null når tomt', () => {
  assert.deepEqual(
    footerBrand({ footer: { brand: { title: 'Urd', tagline: 'Hei' } } }),
    { title: 'Urd', tagline: 'Hei' },
  );
  // Ingen fallback til sidetittelen: en tom merkevare skal forbli tom.
  assert.equal(footerBrand({ site: { title: 'Min side' }, footer: { brand: {} } }), null);
  assert.equal(footerBrand({ footer: {} }), null);
  assert.equal(footerBrand({}), null);
});

test('footerColumns: resolverer lenker, hopper over tomme', () => {
  const cols = footerColumns({
    pages: PAGES,
    footer: {
      columns: [
        { title: 'Sider', links: [{ label: 'Hjem', page: 'hjem' }, { label: 'Ekstern', href: 'https://x.no' }] },
        { title: 'Tom', links: [{ label: '' }] },
        { title: '', links: [] },
      ],
    },
  });
  assert.equal(cols.length, 1);
  assert.equal(cols[0].title, 'Sider');
  assert.deepEqual(cols[0].links[0], { label: 'Hjem', href: '/', external: false, missing: false });
  assert.equal(cols[0].links[1].external, true);
  assert.equal(cols[0].links[1].href, 'https://x.no');
});

test('footerColumns: ukjent side gir # med missing', () => {
  const cols = footerColumns({ pages: PAGES, footer: { columns: [{ title: 'X', links: [{ label: 'Vekk', page: 'finnes-ikke' }] }] } });
  assert.equal(cols[0].links[0].href, '#');
  assert.equal(cols[0].links[0].missing, true);
});

test('footerSocial: krever ikon og trygg URL', () => {
  const social = footerSocial({
    footer: {
      social: [
        { icon: 'facebook', url: 'https://facebook.com/x' },
        { icon: 'x', url: 'javascript:alert(1)' },
        { icon: '', url: 'https://y.no' },
        { icon: 'mail', url: 'mailto:a@b.no' },
      ],
    },
  });
  assert.deepEqual(social, [
    { icon: 'facebook', url: 'https://facebook.com/x' },
    { icon: 'mail', url: 'mailto:a@b.no' },
  ]);
});

test('footerBaseline: copyright vinner, ellers text-linjer', () => {
  assert.deepEqual(footerBaseline({ footer: { copyright: '© Urd', text: 'ignorert' } }), ['© Urd']);
  assert.deepEqual(footerBaseline({ footer: { text: 'Linje 1\n\nLinje 2' } }), ['Linje 1', 'Linje 2']);
  assert.deepEqual(footerBaseline({ footer: {} }), []);
});

test('hasRichFooter: sant ved nye felt, usant for kun text (bakoverkompat)', () => {
  assert.equal(hasRichFooter({ footer: { show: true, text: 'Bare tekst', align: 'center' } }), false);
  assert.equal(hasRichFooter({ footer: { columns: [{ title: 'A', links: [{ label: 'B', href: 'https://x.no' }] }] } }), true);
  assert.equal(hasRichFooter({ footer: { copyright: '© Urd' } }), true);
  assert.equal(hasRichFooter({ footer: { brand: { title: 'Urd' } } }), true);
  // Kun sidetittel, ingen egne footer-felt: ikke rik (footeren forblir tom).
  assert.equal(hasRichFooter({ site: { title: 'S' }, footer: { show: true } }), false);
});
