/**
 * Kontraktstester for nav-ens rene logikk (nav-model.js): oppslag mot
 * sideregisteret, kind-klassifisering av menypunkter med undermeny og
 * utseende-beregningen. DOM-rendering (nav.js) testes manuelt.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveItem, navItems, navClasses, navSurface, navSubSurface, hostClasses, clampSideWidth } from '../template/assets/engine/nav-model.js';

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

test('navClasses: løft uten glød er egen hover-stil', () => {
  assert.equal(navClasses({ nav: { style: { hover: 'lift-plain' } } }), 'urd-nav urd-nav-right urd-nav-hover-lift-plain');
});

test('navClasses: glød kun som tilvalg på flytende pille', () => {
  assert.equal(
    navClasses({ nav: { variant: 'floating', style: { glow: true } } }),
    'urd-nav urd-nav-right urd-nav-var-floating urd-nav-glow',
  );
  // Uten glow-flagget: ingen glød; glow uten floating: ingen effekt
  assert.equal(
    navClasses({ nav: { variant: 'floating' } }),
    'urd-nav urd-nav-right urd-nav-var-floating',
  );
  assert.equal(navClasses({ nav: { style: { glow: true } } }), 'urd-nav urd-nav-right');
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
      + 'url("/media/meny-abc.webp") 50% 50% / cover',
  );
});

test('navSurface: bildestyrke under 1 gir eget tonelag under sløret', () => {
  const bg = navSurface({ image: '/media/meny-abc.webp', imageOpacity: 0.4 }).bg;
  // Tonelaget bruker bakgrunnsfargen med 60 % (1 - 0.4) dekkevne
  assert.ok(bg.includes('color-mix(in srgb, var(--urd-color-surface) 60%, transparent)'));
  // Full styrke gir INTET ekstra lag (to gradienter ville doblet sløret)
  const full = navSurface({ image: '/media/meny-abc.webp', imageOpacity: 1 }).bg;
  assert.equal(full.split('linear-gradient').length - 1, 1);
});

test('navSurface: bildeutsnitt i høyden klemmes til 0-100', () => {
  assert.ok(navSurface({ image: '/media/m.webp', imageY: 20 }).bg.endsWith('url("/media/m.webp") 50% 20% / cover'));
  assert.ok(navSurface({ image: '/media/m.webp', imageY: 150 }).bg.endsWith('50% 100% / cover'));
  assert.ok(navSurface({ image: '/media/m.webp', imageY: -5 }).bg.endsWith('50% 0% / cover'));
});

test('navSurface: ugyldig bilde ignoreres (vern mot url()-brudd og eksterne verter)', () => {
  // Ukodet SVG-data-URL med tegn som ville knekt url("…")
  const svg = 'data:image/svg+xml,<svg xmlns="http://x"></svg>';
  assert.equal(navSurface({ image: svg }).bg, undefined);
  // Ekstern URL slippes ikke inn i CSS-en
  assert.equal(navSurface({ image: 'https://evil.example/x.png' }).bg, undefined);
  // Sløret består selv om bildet forkastes
  assert.equal(
    navSurface({ image: svg, bg: 'accent', bgOpacity: 0.4 }).bg,
    'color-mix(in srgb, var(--urd-color-accent) 40%, transparent)',
  );
});

test('navSurface: bilde med egen farge og dekkevne i sløret', () => {
  assert.equal(
    navSurface({ image: 'data:image/webp;base64,AA==', bg: 'accent', bgOpacity: 0.3 }).bg,
    'linear-gradient(color-mix(in srgb, var(--urd-color-accent) 30%, transparent), '
      + 'color-mix(in srgb, var(--urd-color-accent) 30%, transparent)), '
      + 'url("data:image/webp;base64,AA==") 50% 50% / cover',
  );
});

test('navClasses: pille uten luft over får flush-klassen', () => {
  assert.equal(
    navClasses({ nav: { variant: 'floating', style: { topGap: false } } }),
    'urd-nav urd-nav-right urd-nav-var-floating urd-nav-flush',
  );
  // topGap utenfor floating har ingen effekt
  assert.equal(navClasses({ nav: { style: { topGap: false } } }), 'urd-nav urd-nav-right');
});

test('hostClasses: variantene styrer vert- og body-klassene', () => {
  assert.deepEqual(hostClasses({ nav: {} }), { host: [], body: [] });
  assert.deepEqual(hostClasses({ nav: { variant: 'floating' } }), { host: ['urd-nav-float'], body: [] });
  assert.deepEqual(hostClasses({ nav: { variant: 'side-left' } }),
    { host: ['urd-nav-side-host', 'urd-nav-side-host-left'], body: ['urd-side-left'] });
  assert.deepEqual(hostClasses({ nav: { variant: 'side-right' } }),
    { host: ['urd-nav-side-host', 'urd-nav-side-host-right'], body: ['urd-side-right'] });
});

test('navClasses/hostClasses: firkant-varianten er flytende uten avrunding', () => {
  assert.equal(
    navClasses({ nav: { variant: 'floating-square', style: { glow: true } } }),
    'urd-nav urd-nav-right urd-nav-var-floating urd-nav-square urd-nav-glow',
  );
  assert.deepEqual(hostClasses({ nav: { variant: 'floating-square' } }), { host: ['urd-nav-float'], body: [] });
});

test('navClasses: størrelse gir klasse kun utenfor standarden (md)', () => {
  assert.equal(navClasses({ nav: { style: { size: 'sm' } } }), 'urd-nav urd-nav-right urd-nav-size-sm');
  assert.equal(navClasses({ nav: { style: { size: 'xl' } } }), 'urd-nav urd-nav-right urd-nav-size-xl');
  assert.equal(navClasses({ nav: { style: { size: 'md' } } }), 'urd-nav urd-nav-right');
  // Frie strenger hvitelistes bort - klassenavn bygges aldri av rå data
  assert.equal(navClasses({ nav: { style: { size: 'evil injection' } } }), 'urd-nav urd-nav-right');
});

test('navClasses: tekstjustering og undermeny-design gir hvitelistede klasser', () => {
  assert.equal(navClasses({ nav: { style: { sideAlign: 'center' } } }), 'urd-nav urd-nav-right urd-nav-salign-center');
  assert.equal(navClasses({ nav: { style: { sideAlign: 'left' } } }), 'urd-nav urd-nav-right');
  assert.equal(navClasses({ nav: { style: { subStyle: 'flyout' } } }), 'urd-nav urd-nav-right urd-nav-sub-flyout');
  assert.equal(navClasses({ nav: { style: { subStyle: 'card' } } }), 'urd-nav urd-nav-right');
  assert.equal(navClasses({ nav: { style: { subStyle: 'x"y' } } }), 'urd-nav urd-nav-right');
});

test('navSurface: bildeutsnitt i bredden klemmes til 0-100', () => {
  assert.ok(navSurface({ image: '/media/m.webp', imageX: 20 }).bg.endsWith('url("/media/m.webp") 20% 50% / cover'));
  assert.ok(navSurface({ image: '/media/m.webp', imageX: 150 }).bg.endsWith('100% 50% / cover'));
  assert.ok(navSurface({ image: '/media/m.webp', imageX: -5, imageY: 80 }).bg.endsWith('0% 80% / cover'));
});

test('navSubSurface: undermenyen får kun sløret, aldri bildet, som standard', () => {
  // Uten style: CSS-standarden gjelder (undefined)
  assert.equal(navSubSurface(), undefined);
  assert.equal(navSubSurface({ image: '/media/m.webp' }), undefined);
  // Med egne farger: sløret alene
  assert.equal(
    navSubSurface({ image: '/media/m.webp', bg: 'accent', bgOpacity: 0.4 }),
    'color-mix(in srgb, var(--urd-color-accent) 40%, transparent)',
  );
  // subImage: true gir hele bakgrunnen med bildelagene
  const withImage = navSubSurface({ image: '/media/m.webp', subImage: true });
  assert.ok(withImage.includes('url("/media/m.webp")'));
  // Ugyldig bilde slipper ikke gjennom selv med subImage
  assert.equal(navSubSurface({ image: 'https://evil.example/x.png', subImage: true }), undefined);
});

test('clampSideWidth: klemmes til 180-400, søppel gir standarden 250', () => {
  assert.equal(clampSideWidth(300), 300);
  assert.equal(clampSideWidth(100), 180);
  assert.equal(clampSideWidth(900), 400);
  assert.equal(clampSideWidth(249.6), 250);
  assert.equal(clampSideWidth(undefined), 250);
  assert.equal(clampSideWidth('tull'), 250);
});
