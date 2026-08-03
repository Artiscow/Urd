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
  footerBaselineLinks,
  footerLinkRow,
  footerCta,
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
  for (const bad of [
    'javascript:alert(1)',
    'JavaScript:alert(1)',
    ' javascript:x',
    'vbscript:x',
    'data:text/html,x',
    'ftp://x',
    '',
    '  ',
    null,
    42,
  ]) {
    assert.equal(isSafeUrl(bad), false, String(bad));
  }
});

test('footerBrand: tittel, tagline, ingen sidetittel-fallback, null når tomt', () => {
  const b = footerBrand({ footer: { brand: { title: 'Urd', tagline: 'Hei' } } });
  assert.equal(b.title, 'Urd');
  assert.equal(b.tagline, 'Hei');
  assert.equal(b.mode, 'text');
  // Ingen fallback til sidetittelen: en tom merkevare skal forbli tom.
  assert.equal(footerBrand({ site: { title: 'Min side' }, footer: { brand: {} } }), null);
  assert.equal(footerBrand({ footer: {} }), null);
  assert.equal(footerBrand({}), null);
  // Logo alene (image/both-modus) gjør merket ikke-tomt; tekst-modus uten tittel er tomt.
  assert.ok(footerBrand({ footer: { brand: { mode: 'image', logo: '/media/x.webp' } } }));
  assert.equal(footerBrand({ footer: { brand: { mode: 'text', logo: '/media/x.webp' } } }), null);
});

test('footer-model: ikke-streng-felt (håndredigert data) velter aldri renderen', () => {
  // Tall/bool/objekt der modellen venter tekst skal gi tom streng, ikke TypeError.
  assert.doesNotThrow(() => footerBrand({ footer: { brand: { title: 2026, tagline: true, logo: 5 } } }));
  assert.equal(footerBrand({ footer: { brand: { title: 2026 } } }), null);
  assert.doesNotThrow(() => footerBaseline({ footer: { text: 42, copyright: {} } }));
  assert.deepEqual(footerBaseline({ footer: { text: 42 } }), []);
  assert.doesNotThrow(() => footerCta({ footer: { cta: { kind: 'button', label: 99 } } }));
  assert.equal(footerCta({ footer: { cta: { kind: 'button', label: 99 } } }), null);
  assert.doesNotThrow(() => hasRichFooter({ footer: { copyright: 5 } }));
  assert.doesNotThrow(() => footerColumns({ footer: { columns: [{ title: 7, links: [{ label: 3 }] }] } }));
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
  // Nye felt (v0.6.6.5.2) gjør footeren rik.
  assert.equal(hasRichFooter({ pages: PAGES, footer: { baseline: [{ label: 'Personvern', page: 'hjem' }] } }), true);
  assert.equal(hasRichFooter({ pages: PAGES, footer: { linkRow: [{ label: 'Hjem', page: 'hjem' }] } }), true);
  assert.equal(hasRichFooter({ footer: { cta: { kind: 'button', label: 'Bli medlem', href: 'https://x.no' } } }), true);
});

test('footerColumns: wide når mange lenker (> 6) eller col.wide', () => {
  const many = footerColumns({ footer: { columns: [{ title: 'Sider', links: Array.from({ length: 8 }, (_, i) => ({ label: `L${i}`, href: 'https://x.no' })) }] } });
  assert.equal(many[0].wide, true);
  const few = footerColumns({ footer: { columns: [{ title: 'Sider', links: [{ label: 'A', href: 'https://x.no' }] }] } });
  assert.equal(few[0].wide, false);
  const forced = footerColumns({ footer: { columns: [{ title: 'X', wide: true, links: [{ label: 'A', href: 'https://x.no' }] }] } });
  assert.equal(forced[0].wide, true);
});

test('footerBaselineLinks + footerLinkRow: resolverer som kolonner, hopper over tomme', () => {
  const bl = footerBaselineLinks({ pages: PAGES, footer: { baseline: [{ label: 'Personvern', page: 'om' }, { label: '' }, { label: 'Ekstern', href: 'https://x.no' }] } });
  assert.equal(bl.length, 2);
  assert.deepEqual(bl[0], { label: 'Personvern', href: '/om-oss', external: false, missing: false });
  assert.equal(bl[1].external, true);
  const row = footerLinkRow({ pages: PAGES, footer: { linkRow: [{ label: 'Hjem', page: 'hjem' }] } });
  assert.equal(row[0].href, '/');
  assert.deepEqual(footerBaselineLinks({ footer: {} }), []);
});

test('footerCta: knapp krever label, nyhetsbrev krever overskrift, modellen er språkfri', () => {
  assert.equal(footerCta({ footer: {} }), null);
  assert.equal(footerCta({ footer: { cta: { kind: 'button' } } }), null); // knapp uten label
  const btn = footerCta({ pages: PAGES, footer: { cta: { kind: 'button', label: 'Bli medlem', page: 'om' } } });
  assert.equal(btn.kind, 'button');
  assert.equal(btn.target.href, '/om-oss');
  const nl = footerCta({ footer: { cta: { kind: 'newsletter', heading: 'Meld på', endpoint: 'https://formspree.io/f/x' } } });
  assert.equal(nl.kind, 'newsletter');
  // Tom label/success fylles av render-laget på besøkende-språket (ADR-0012);
  // modellen bærer aldri norske standardtekster.
  assert.equal(nl.label, '');
  assert.equal(nl.success, '');
  assert.equal(nl.target, null);
  assert.equal(footerCta({ footer: { cta: { kind: 'newsletter' } } }), null); // uten overskrift/label
});
