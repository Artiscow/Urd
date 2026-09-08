/**
 * Tests of the pure footer logic: brand, columns, social links, baseline and safe-URL guards.
 * The DOM building (footer.js) is covered by the headless checkpoints.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const {
  isSafeUrl,
  footerBrand,
  footerColumns,
  footerSocial,
  footerBaseline,
  footerBaselineLinks,
  footerLinkRow,
  footerCta,
  hasRichFooter,
} = await engineImport('footer-model.js');

// Deliberate Norwegian page ids, labels and texts throughout: footer content is user data.
const PAGES = [
  { id: 'hjem', path: '/' },
  { id: 'om', path: '/om-oss' },
];

test('isSafeUrl accepts http(s)/mailto/tel and rejects the rest', () => {
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

test('footerBrand: title, tagline, no site title fallback, null when empty', () => {
  const b = footerBrand({ footer: { brand: { title: 'Urd', tagline: 'Hei' } } });
  assert.equal(b.title, 'Urd');
  assert.equal(b.tagline, 'Hei');
  assert.equal(b.mode, 'text');
  // No fallback to the site title: an empty brand must stay empty.
  assert.equal(footerBrand({ site: { title: 'Min side' }, footer: { brand: {} } }), null);
  assert.equal(footerBrand({ footer: {} }), null);
  assert.equal(footerBrand({}), null);
  // A logo alone (image/both mode) makes the brand non-empty; text mode without a title is empty.
  assert.ok(footerBrand({ footer: { brand: { mode: 'image', logo: '/media/x.webp' } } }));
  assert.equal(footerBrand({ footer: { brand: { mode: 'text', logo: '/media/x.webp' } } }), null);
});

test('footer-model: non-string fields (hand-edited data) never topple the renderer', () => {
  // Numbers/booleans/objects where the model expects text must give an empty string, not a TypeError.
  assert.doesNotThrow(() => footerBrand({ footer: { brand: { title: 2026, tagline: true, logo: 5 } } }));
  assert.equal(footerBrand({ footer: { brand: { title: 2026 } } }), null);
  assert.doesNotThrow(() => footerBaseline({ footer: { text: 42, copyright: {} } }));
  assert.deepEqual(footerBaseline({ footer: { text: 42 } }), []);
  assert.doesNotThrow(() => footerCta({ footer: { cta: { kind: 'button', label: 99 } } }));
  assert.equal(footerCta({ footer: { cta: { kind: 'button', label: 99 } } }), null);
  assert.doesNotThrow(() => hasRichFooter({ footer: { copyright: 5 } }));
  assert.doesNotThrow(() => footerColumns({ footer: { columns: [{ title: 7, links: [{ label: 3 }] }] } }));
});

test('footerColumns: resolves links, skips empty ones', () => {
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

test('footerColumns: an unknown page gives # with missing', () => {
  const cols = footerColumns({ pages: PAGES, footer: { columns: [{ title: 'X', links: [{ label: 'Vekk', page: 'finnes-ikke' }] }] } });
  assert.equal(cols[0].links[0].href, '#');
  assert.equal(cols[0].links[0].missing, true);
});

test('footerSocial: requires an icon and a safe URL', () => {
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

test('footerBaseline: copyright wins, otherwise text lines', () => {
  assert.deepEqual(footerBaseline({ footer: { copyright: '© Urd', text: 'ignorert' } }), ['© Urd']);
  assert.deepEqual(footerBaseline({ footer: { text: 'Linje 1\n\nLinje 2' } }), ['Linje 1', 'Linje 2']);
  assert.deepEqual(footerBaseline({ footer: {} }), []);
});

test('hasRichFooter: true with new fields, false for text only (backwards compat)', () => {
  assert.equal(hasRichFooter({ footer: { show: true, text: 'Bare tekst', align: 'center' } }), false);
  assert.equal(hasRichFooter({ footer: { columns: [{ title: 'A', links: [{ label: 'B', href: 'https://x.no' }] }] } }), true);
  assert.equal(hasRichFooter({ footer: { copyright: '© Urd' } }), true);
  assert.equal(hasRichFooter({ footer: { brand: { title: 'Urd' } } }), true);
  // Site title only, no footer fields of its own: not rich (the footer stays empty).
  assert.equal(hasRichFooter({ site: { title: 'S' }, footer: { show: true } }), false);
  // The new fields (v0.6.6.5.2) make the footer rich.
  assert.equal(hasRichFooter({ pages: PAGES, footer: { baseline: [{ label: 'Personvern', page: 'hjem' }] } }), true);
  assert.equal(hasRichFooter({ pages: PAGES, footer: { linkRow: [{ label: 'Hjem', page: 'hjem' }] } }), true);
  assert.equal(hasRichFooter({ footer: { cta: { kind: 'button', label: 'Bli medlem', href: 'https://x.no' } } }), true);
});

test('footerColumns: wide with many links (> 6) or col.wide', () => {
  const many = footerColumns({ footer: { columns: [{ title: 'Sider', links: Array.from({ length: 8 }, (_, i) => ({ label: `L${i}`, href: 'https://x.no' })) }] } });
  assert.equal(many[0].wide, true);
  const few = footerColumns({ footer: { columns: [{ title: 'Sider', links: [{ label: 'A', href: 'https://x.no' }] }] } });
  assert.equal(few[0].wide, false);
  const forced = footerColumns({ footer: { columns: [{ title: 'X', wide: true, links: [{ label: 'A', href: 'https://x.no' }] }] } });
  assert.equal(forced[0].wide, true);
});

test('footerBaselineLinks + footerLinkRow: resolve like columns, skip empty ones', () => {
  const bl = footerBaselineLinks({ pages: PAGES, footer: { baseline: [{ label: 'Personvern', page: 'om' }, { label: '' }, { label: 'Ekstern', href: 'https://x.no' }] } });
  assert.equal(bl.length, 2);
  assert.deepEqual(bl[0], { label: 'Personvern', href: '/om-oss', external: false, missing: false });
  assert.equal(bl[1].external, true);
  const row = footerLinkRow({ pages: PAGES, footer: { linkRow: [{ label: 'Hjem', page: 'hjem' }] } });
  assert.equal(row[0].href, '/');
  assert.deepEqual(footerBaselineLinks({ footer: {} }), []);
});

test('footerCta: button requires a label, newsletter requires a heading, the model is language free', () => {
  assert.equal(footerCta({ footer: {} }), null);
  assert.equal(footerCta({ footer: { cta: { kind: 'button' } } }), null); // button without a label
  const btn = footerCta({ pages: PAGES, footer: { cta: { kind: 'button', label: 'Bli medlem', page: 'om' } } });
  assert.equal(btn.kind, 'button');
  assert.equal(btn.target.href, '/om-oss');
  const nl = footerCta({ footer: { cta: { kind: 'newsletter', heading: 'Meld på', endpoint: 'https://formspree.io/f/x' } } });
  assert.equal(nl.kind, 'newsletter');
  // An empty label/success is filled by the render layer in the visitor language (ADR-0012);
  // the model never carries Norwegian default texts.
  assert.equal(nl.label, '');
  assert.equal(nl.success, '');
  assert.equal(nl.target, null);
  assert.equal(footerCta({ footer: { cta: { kind: 'newsletter' } } }), null); // without a heading/label
});
