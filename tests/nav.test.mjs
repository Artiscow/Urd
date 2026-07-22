/**
 * Kontraktstester for nav-ens rene logikk (nav-model.js): oppslag mot
 * sideregisteret, kind-klassifisering av menypunkter med undermeny og
 * utseende-beregningen. DOM-rendering (nav.js) testes manuelt.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveItem, navItems, navClasses, navSurface } from '../template/assets/engine/nav-model.js';

const PAGES = [
  { id: 'hjem', title: 'Hjem', path: '/' },
  { id: 'om-oss', title: 'Om oss', path: '/om-oss' },
];

test('resolveItem: side slås opp til path i sideregisteret', () => {
  assert.deepEqual(resolveItem({ label: 'Om oss', page: 'om-oss' }, PAGES), {
    label: 'Om oss', href: '/om-oss', external: false, missing: false,
  });
});

test('resolveItem: ukjent side gir # med missing-flagg', () => {
  const item = resolveItem({ label: 'Borte', page: 'finnes-ikke' }, PAGES);
  assert.equal(item.href, '#');
  assert.equal(item.missing, true);
  assert.equal(item.external, false);
});

test('resolveItem: href er ekstern lenke', () => {
  assert.deepEqual(resolveItem({ label: 'Ut', href: 'https://eksempel.no' }, PAGES), {
    label: 'Ut', href: 'https://eksempel.no', external: true, missing: false,
  });
});

test('navItems: punkter uten undermeny er kind link', () => {
  const site = { pages: PAGES, nav: { items: [{ label: 'Hjem', page: 'hjem' }] } };
  const [item] = navItems(site);
  assert.equal(item.kind, 'link');
  assert.deepEqual(item.children, []);
});

test('navItems: eget mål + undermeny gir kind split', () => {
  const site = {
    pages: PAGES,
    nav: { items: [{ label: 'Om', page: 'om-oss', children: [{ label: 'Hjem', page: 'hjem' }] }] },
  };
  const [item] = navItems(site);
  assert.equal(item.kind, 'split');
  assert.equal(item.href, '/om-oss');
  assert.deepEqual(item.children, [{ label: 'Hjem', href: '/', external: false, missing: false }]);
});

test('navItems: kun undermeny gir kind toggle uten eget mål', () => {
  const site = {
    pages: PAGES,
    nav: { items: [{ label: 'Mer', children: [{ label: 'Ut', href: 'https://eksempel.no' }] }] },
  };
  const [item] = navItems(site);
  assert.equal(item.kind, 'toggle');
  assert.equal(item.href, '');
  assert.equal(item.missing, false);
  assert.equal(item.children[0].external, true);
});

test('navItems: tom undermeny regnes som vanlig lenke', () => {
  const site = { pages: PAGES, nav: { items: [{ label: 'Hjem', page: 'hjem', children: [] }] } };
  assert.equal(navItems(site)[0].kind, 'link');
});

test('navItems: barnebarn ignoreres defensivt (ett nivå)', () => {
  const site = {
    pages: PAGES,
    nav: { items: [{ label: 'Mer', children: [{ label: 'Hjem', page: 'hjem', children: [{ label: 'Dypt', page: 'om-oss' }] }] }] },
  };
  const [item] = navItems(site);
  assert.equal(item.children.length, 1);
  assert.equal(item.children[0].children, undefined);
});

test('navClasses: standard layout er right', () => {
  assert.equal(navClasses({ nav: {} }), 'urd-nav urd-nav-right');
  assert.equal(navClasses({ nav: { layout: 'center' } }), 'urd-nav urd-nav-center');
});

test('navClasses: flytende variant og hover-stil gir egne klasser', () => {
  assert.equal(
    navClasses({ nav: { variant: 'floating', style: { hover: 'underline' } } }),
    'urd-nav urd-nav-right urd-nav-var-floating urd-nav-hover-underline',
  );
});

test('navClasses: standardene bar og standard gir ingen ekstra klasser', () => {
  assert.equal(navClasses({ nav: { variant: 'bar', style: { hover: 'standard' } } }), 'urd-nav urd-nav-right');
});

test('navSurface: uten style gjelder CSS-standardene', () => {
  assert.deepEqual(navSurface(), {});
  assert.deepEqual(navSurface({}), {});
});

test('navSurface: theme-token med dekkevne gir color-mix over CSS-varen', () => {
  assert.equal(
    navSurface({ bg: 'accent', bgOpacity: 0.5 }).bg,
    'color-mix(in srgb, var(--urd-color-accent) 50%, transparent)',
  );
});

test('navSurface: rå farge brukes uendret i blandingen', () => {
  assert.equal(
    navSurface({ bg: '#102030' }).bg,
    'color-mix(in srgb, #102030 85%, transparent)',
  );
});

test('navSurface: kun dekkevne gir surface-token som standardfarge', () => {
  assert.equal(
    navSurface({ bgOpacity: 1 }).bg,
    'color-mix(in srgb, var(--urd-color-surface) 100%, transparent)',
  );
});

test('navSurface: blur av og egen tekstfarge', () => {
  const out = navSurface({ blur: false, textColor: 'text' });
  assert.equal(out.blur, false);
  assert.equal(out.color, 'var(--urd-color-text)');
  assert.equal(out.bg, undefined);
});

test('navSurface: bakgrunnsbilde får standardsløret over seg', () => {
  assert.equal(
    navSurface({ image: '/media/meny-abc.webp' }).bg,
    'linear-gradient(color-mix(in srgb, var(--urd-color-surface) 85%, transparent), '
      + 'color-mix(in srgb, var(--urd-color-surface) 85%, transparent)), '
      + 'url("/media/meny-abc.webp") center / cover',
  );
});

test('navSurface: bilde med egen farge og dekkevne i sløret', () => {
  assert.equal(
    navSurface({ image: 'data:image/webp;base64,AA==', bg: 'accent', bgOpacity: 0.3 }).bg,
    'linear-gradient(color-mix(in srgb, var(--urd-color-accent) 30%, transparent), '
      + 'color-mix(in srgb, var(--urd-color-accent) 30%, transparent)), '
      + 'url("data:image/webp;base64,AA==") center / cover',
  );
});
