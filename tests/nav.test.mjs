/**
 * Contract tests for the nav's pure logic (nav-model.js): lookups against
 * the page registry, kind classification of menu items with submenus and
 * the appearance computation. DOM rendering (nav.js) is tested manually.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { resolveItem, navItems, navClasses, navSurface, navSubSurface, navLayerVeil, hostClasses, clampSideWidth, clampBorderWidth, navScrollState, navSizeVars, NAV_SIZE_BOUNDS, isSafeImage } = await engineImport('nav-model.js');

// Deliberately Norwegian page titles and slugs: user data stays Norwegian (ADR-0021).
const PAGES = [
  { id: 'hjem', title: 'Hjem', path: '/' },
  { id: 'om-oss', title: 'Om oss', path: '/om-oss' },
];

test('resolveItem: page is resolved to its path in the page registry', () => {
  assert.deepEqual(resolveItem({ label: 'Om oss', page: 'om-oss' }, PAGES), {
    label: 'Om oss', href: '/om-oss', external: false, missing: false,
  });
});

test('resolveItem: unknown page gives # with the missing flag', () => {
  const item = resolveItem({ label: 'Borte', page: 'finnes-ikke' }, PAGES);
  assert.equal(item.href, '#');
  assert.equal(item.missing, true);
  assert.equal(item.external, false);
});

test('resolveItem: href is an external link', () => {
  assert.deepEqual(resolveItem({ label: 'Ut', href: 'https://eksempel.no' }, PAGES), {
    label: 'Ut', href: 'https://eksempel.no', external: true, missing: false,
  });
  // mailto/tel are safe schemes too.
  assert.equal(resolveItem({ label: 'Send', href: 'mailto:a@b.no' }, PAGES).external, true);
});

test('resolveItem: unsafe href is rejected to # with missing', () => {
  for (const bad of ['javascript:alert(1)', 'data:text/html,x', 'example.no', '  ', '', '//ond.no/x', '/\\ond.no']) {
    const item = resolveItem({ label: 'Farlig', href: bad }, PAGES);
    assert.equal(item.href, '#', bad);
    assert.equal(item.external, false, bad);
    assert.equal(item.missing, true, bad);
  }
});

test('resolveItem: site-internal paths and anchors are valid targets without external', () => {
  for (const ok of ['#kontakt', '#s-abc123', '/om-oss#kontakt', '/om-oss']) {
    const item = resolveItem({ label: 'Til seksjon', href: ok }, PAGES);
    assert.equal(item.href, ok, ok);
    assert.equal(item.external, false, ok);
    assert.equal(item.missing, false, ok);
  }
});

// Shared image guard for favicon, nav/footer logo, icon block and the image
// layers: the source ends up in img.src and in CSS url(), so anything outside
// the two known forms is rejected.
test('isSafeImage: media paths and base64 data URLs are accepted', () => {
  for (const ok of ['/media/logo.webp', '/media/styret/leder.webp', '/', 'data:image/png;base64,iVBORw0KGgo=']) {
    assert.equal(isSafeImage(ok), true, ok);
  }
});

test('isSafeImage: external hosts, protocol-relative paths and url() breakouts are rejected', () => {
  const bad = [
    'https://ond.no/x.png', '//ond.no/x.png', 'javascript:alert(1)',
    'data:text/html,<script>', 'media/logo.webp', '/media/logo.webp") ; background: url("x',
    '/media/a"b.webp', '', '  /media/logo.webp', null, undefined, 42, {},
  ];
  for (const value of bad) assert.equal(isSafeImage(value), false, String(value));
});

test('navItems: items without a submenu are kind link', () => {
  const site = { pages: PAGES, nav: { items: [{ label: 'Hjem', page: 'hjem' }] } };
  const [item] = navItems(site);
  assert.equal(item.kind, 'link');
  assert.deepEqual(item.children, []);
});

test('navItems: own target + submenu gives kind split', () => {
  const site = {
    pages: PAGES,
    nav: { items: [{ label: 'Om', page: 'om-oss', children: [{ label: 'Hjem', page: 'hjem' }] }] },
  };
  const [item] = navItems(site);
  assert.equal(item.kind, 'split');
  assert.equal(item.href, '/om-oss');
  assert.deepEqual(item.children, [{ label: 'Hjem', href: '/', external: false, missing: false }]);
});

test('navItems: submenu only gives kind toggle without an own target', () => {
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

test('navItems: empty submenu counts as a plain link', () => {
  const site = { pages: PAGES, nav: { items: [{ label: 'Hjem', page: 'hjem', children: [] }] } };
  assert.equal(navItems(site)[0].kind, 'link');
});

test('navItems: grandchildren are ignored defensively (one level)', () => {
  const site = {
    pages: PAGES,
    nav: { items: [{ label: 'Mer', children: [{ label: 'Hjem', page: 'hjem', children: [{ label: 'Dypt', page: 'om-oss' }] }] }] },
  };
  const [item] = navItems(site);
  assert.equal(item.children.length, 1);
  assert.equal(item.children[0].children, undefined);
});

test('navClasses: default layout is right', () => {
  assert.equal(navClasses({ nav: {} }), 'urd-nav urd-nav-right');
  assert.equal(navClasses({ nav: { layout: 'center' } }), 'urd-nav urd-nav-center');
});

test('navClasses: floating variant and hover style give their own classes', () => {
  assert.equal(
    navClasses({ nav: { variant: 'floating', style: { hover: 'underline' } } }),
    'urd-nav urd-nav-right urd-nav-var-floating urd-nav-hover-underline',
  );
});

test('navClasses: the defaults bar and standard give no extra classes', () => {
  assert.equal(navClasses({ nav: { variant: 'bar', style: { hover: 'standard' } } }), 'urd-nav urd-nav-right');
});

test('navClasses: lift without glow is its own hover style', () => {
  assert.equal(navClasses({ nav: { style: { hover: 'lift-plain' } } }), 'urd-nav urd-nav-right urd-nav-hover-lift-plain');
});

test('navClasses: glow only as an option on the floating pill', () => {
  assert.equal(
    navClasses({ nav: { variant: 'floating', style: { glow: true } } }),
    'urd-nav urd-nav-right urd-nav-var-floating urd-nav-glow',
  );
  // Without the glow flag: no glow; glow without floating: no effect
  assert.equal(
    navClasses({ nav: { variant: 'floating' } }),
    'urd-nav urd-nav-right urd-nav-var-floating',
  );
  assert.equal(navClasses({ nav: { style: { glow: true } } }), 'urd-nav urd-nav-right');
});

test('navSurface: without style the CSS defaults apply', () => {
  assert.deepEqual(navSurface(), {});
  assert.deepEqual(navSurface({}), {});
});

test('navSurface: theme token with opacity gives color-mix over the CSS variable', () => {
  assert.equal(
    navSurface({ bg: 'accent', bgOpacity: 0.5 }).bg,
    'color-mix(in srgb, var(--urd-color-accent) 50%, transparent)',
  );
});

test('navSurface: raw color is used unchanged in the mix', () => {
  assert.equal(
    navSurface({ bg: '#102030' }).bg,
    'color-mix(in srgb, #102030 85%, transparent)',
  );
});

test('navSurface: opacity alone gives the surface token as default color', () => {
  assert.equal(
    navSurface({ bgOpacity: 1 }).bg,
    'color-mix(in srgb, var(--urd-color-surface) 100%, transparent)',
  );
});

test('navSurface: blur off and custom text color', () => {
  const out = navSurface({ blur: false, textColor: 'text' });
  assert.equal(out.blur, false);
  assert.equal(out.color, 'var(--urd-color-text)');
  assert.equal(out.bg, undefined);
});

test('navSurface: background image gets the default veil over it', () => {
  assert.equal(
    navSurface({ image: '/media/meny-abc.webp' }).bg,
    'linear-gradient(color-mix(in srgb, var(--urd-color-surface) 85%, transparent), '
      + 'color-mix(in srgb, var(--urd-color-surface) 85%, transparent)), '
      + 'url("/media/meny-abc.webp") 50% 50% / cover',
  );
});

test('navSurface: image strength below 1 gives its own tint layer under the veil', () => {
  const bg = navSurface({ image: '/media/meny-abc.webp', imageOpacity: 0.4 }).bg;
  // The tint layer uses the background color at 60% (1 - 0.4) opacity
  assert.ok(bg.includes('color-mix(in srgb, var(--urd-color-surface) 60%, transparent)'));
  // Full strength gives NO extra layer (two gradients would double the veil)
  const full = navSurface({ image: '/media/meny-abc.webp', imageOpacity: 1 }).bg;
  assert.equal(full.split('linear-gradient').length - 1, 1);
});

test('navSurface: vertical image crop is clamped to 0-100', () => {
  assert.ok(navSurface({ image: '/media/m.webp', imageY: 20 }).bg.endsWith('url("/media/m.webp") 50% 20% / cover'));
  assert.ok(navSurface({ image: '/media/m.webp', imageY: 150 }).bg.endsWith('50% 100% / cover'));
  assert.ok(navSurface({ image: '/media/m.webp', imageY: -5 }).bg.endsWith('50% 0% / cover'));
});

test('navSurface: invalid image is ignored (guard against url() breakouts and external hosts)', () => {
  // Unencoded SVG data URL with characters that would break url("...")
  const svg = 'data:image/svg+xml,<svg xmlns="http://x"></svg>';
  assert.equal(navSurface({ image: svg }).bg, undefined);
  // External URL is not let into the CSS
  assert.equal(navSurface({ image: 'https://evil.example/x.png' }).bg, undefined);
  // The veil survives even when the image is discarded
  assert.equal(
    navSurface({ image: svg, bg: 'accent', bgOpacity: 0.4 }).bg,
    'color-mix(in srgb, var(--urd-color-accent) 40%, transparent)',
  );
});

test('navSurface: image with custom color and opacity in the veil', () => {
  assert.equal(
    navSurface({ image: 'data:image/webp;base64,AA==', bg: 'accent', bgOpacity: 0.3 }).bg,
    'linear-gradient(color-mix(in srgb, var(--urd-color-accent) 30%, transparent), '
      + 'color-mix(in srgb, var(--urd-color-accent) 30%, transparent)), '
      + 'url("data:image/webp;base64,AA==") 50% 50% / cover',
  );
});

test('navClasses: pill without top gap gets the flush class', () => {
  assert.equal(
    navClasses({ nav: { variant: 'floating', style: { topGap: false } } }),
    'urd-nav urd-nav-right urd-nav-var-floating urd-nav-flush',
  );
  // topGap outside floating has no effect
  assert.equal(navClasses({ nav: { style: { topGap: false } } }), 'urd-nav urd-nav-right');
});

test('hostClasses: the variants control the host and body classes', () => {
  assert.deepEqual(hostClasses({ nav: {} }), { host: [], body: [] });
  assert.deepEqual(hostClasses({ nav: { variant: 'floating' } }), { host: ['urd-nav-float'], body: [] });
  assert.deepEqual(hostClasses({ nav: { variant: 'side-left' } }),
    { host: ['urd-nav-side-host', 'urd-nav-side-host-left'], body: ['urd-side-left'] });
  assert.deepEqual(hostClasses({ nav: { variant: 'side-right' } }),
    { host: ['urd-nav-side-host', 'urd-nav-side-host-right'], body: ['urd-side-right'] });
});

test('hostClasses: overlay applies only to bar, not floating/side', () => {
  // Bar (default) with overlay: the host is taken out of the flow.
  assert.deepEqual(hostClasses({ nav: { overlay: true } }), { host: ['urd-nav-overlay'], body: [] });
  // Floating and side already sit outside the flow: the overlay flag adds no class.
  assert.deepEqual(hostClasses({ nav: { variant: 'floating', overlay: true } }), { host: ['urd-nav-float'], body: [] });
  assert.deepEqual(hostClasses({ nav: { variant: 'side-left', overlay: true } }),
    { host: ['urd-nav-side-host', 'urd-nav-side-host-left'], body: ['urd-side-left'] });
  // Without the flag: no overlay.
  assert.deepEqual(hostClasses({ nav: { overlay: false } }), { host: [], body: [] });
});

test('navClasses/hostClasses: the square variant is floating without rounding', () => {
  assert.equal(
    navClasses({ nav: { variant: 'floating-square', style: { glow: true } } }),
    'urd-nav urd-nav-right urd-nav-var-floating urd-nav-square urd-nav-glow',
  );
  assert.deepEqual(hostClasses({ nav: { variant: 'floating-square' } }), { host: ['urd-nav-float'], body: [] });
});

test('navClasses/hostClasses: the tab variant is floating with only the lower corners rounded', () => {
  assert.equal(
    navClasses({ nav: { variant: 'floating-tab' } }),
    'urd-nav urd-nav-right urd-nav-var-floating urd-nav-tab',
  );
  // Glow/gap are inherited from the floating base, as for pill and square.
  assert.equal(
    navClasses({ nav: { variant: 'floating-tab', style: { glow: true, topGap: false } } }),
    'urd-nav urd-nav-right urd-nav-var-floating urd-nav-tab urd-nav-glow urd-nav-flush',
  );
  assert.deepEqual(hostClasses({ nav: { variant: 'floating-tab' } }), { host: ['urd-nav-float'], body: [] });
});

test('navClasses: size gives a class only outside the default (md)', () => {
  assert.equal(navClasses({ nav: { style: { size: 'sm' } } }), 'urd-nav urd-nav-right urd-nav-size-sm');
  assert.equal(navClasses({ nav: { style: { size: 'xl' } } }), 'urd-nav urd-nav-right urd-nav-size-xl');
  assert.equal(navClasses({ nav: { style: { size: 'md' } } }), 'urd-nav urd-nav-right');
  // Free-form strings are allowlisted away - class names are never built from raw data
  assert.equal(navClasses({ nav: { style: { size: 'evil injection' } } }), 'urd-nav urd-nav-right');
});

test('navClasses: text alignment and submenu design give allowlisted classes', () => {
  assert.equal(navClasses({ nav: { style: { sideAlign: 'center' } } }), 'urd-nav urd-nav-right urd-nav-salign-center');
  assert.equal(navClasses({ nav: { style: { sideAlign: 'left' } } }), 'urd-nav urd-nav-right');
  assert.equal(navClasses({ nav: { style: { subStyle: 'flyout' } } }), 'urd-nav urd-nav-right urd-nav-sub-flyout');
  assert.equal(navClasses({ nav: { style: { subStyle: 'card' } } }), 'urd-nav urd-nav-right');
  assert.equal(navClasses({ nav: { style: { subStyle: 'x"y' } } }), 'urd-nav urd-nav-right');
});

test('navClasses: column placement is its own field with top as the default', () => {
  assert.equal(navClasses({ nav: { style: { sidePlacement: 'middle' } } }), 'urd-nav urd-nav-right urd-nav-splace-middle');
  assert.equal(navClasses({ nav: { style: { sidePlacement: 'bottom' } } }), 'urd-nav urd-nav-right urd-nav-splace-bottom');
  assert.equal(navClasses({ nav: { style: { sidePlacement: 'top' } } }), 'urd-nav urd-nav-right');
  // layout does not affect the column's vertical placement; older sites
  // with layout: left therefore get top as the default, not bottom
  assert.equal(navClasses({ nav: { layout: 'left', style: {} } }), 'urd-nav urd-nav-left');
  assert.equal(navClasses({ nav: { style: { sidePlacement: 'evil injection' } } }), 'urd-nav urd-nav-right');
});

test('navSurface: horizontal image crop is clamped to 0-100', () => {
  assert.ok(navSurface({ image: '/media/m.webp', imageX: 20 }).bg.endsWith('url("/media/m.webp") 20% 50% / cover'));
  assert.ok(navSurface({ image: '/media/m.webp', imageX: 150 }).bg.endsWith('100% 50% / cover'));
  assert.ok(navSurface({ image: '/media/m.webp', imageX: -5, imageY: 80 }).bg.endsWith('0% 80% / cover'));
});

test('navSubSurface: the submenu gets only the veil, never the image, by default', () => {
  // Without style: the CSS default applies (undefined)
  assert.equal(navSubSurface(), undefined);
  assert.equal(navSubSurface({ image: '/media/m.webp' }), undefined);
  // With custom colors: the veil alone
  assert.equal(
    navSubSurface({ image: '/media/m.webp', bg: 'accent', bgOpacity: 0.4 }),
    'color-mix(in srgb, var(--urd-color-accent) 40%, transparent)',
  );
  // subImage: true gives the full background with the image layers
  const withImage = navSubSurface({ image: '/media/m.webp', subImage: true });
  assert.ok(withImage.includes('url("/media/m.webp")'));
  // An invalid image does not slip through even with subImage
  assert.equal(navSubSurface({ image: 'https://evil.example/x.png', subImage: true }), undefined);
});

test('navLayerVeil: the color layers are flattened to one veil, image/gradient kept out', () => {
  // Without color layers: null, the CSS default applies
  assert.equal(navLayerVeil(), null);
  assert.equal(navLayerVeil([]), null);
  assert.equal(navLayerVeil([{ type: 'gradient', props: {} }, { type: 'image', props: {} }]), null);
  // One color layer with strength: the veil with the layer's opacity
  assert.equal(
    navLayerVeil([{ type: 'color', props: { value: 'surface', opacity: 0.45 } }]),
    'color-mix(in srgb, var(--urd-color-surface) 45%, transparent)',
  );
  // Multiple color layers are mixed in paint order (later layers over earlier)
  assert.equal(
    navLayerVeil([
      { type: 'color', props: { value: 'bg', opacity: 1 } },
      { type: 'gradient', props: {} },
      { type: 'color', props: { value: 'accent', opacity: 0.2 } },
    ]),
    'color-mix(in srgb, var(--urd-color-accent) 20%, color-mix(in srgb, var(--urd-color-bg) 100%, transparent))',
  );
  // Strength 0 and missing props are tolerated (opacity without value = 1, value without color = bg)
  assert.equal(navLayerVeil([{ type: 'color', props: { value: 'text', opacity: 0 } }]), null);
  assert.equal(navLayerVeil([{ type: 'color' }]), 'color-mix(in srgb, var(--urd-color-bg) 100%, transparent)');
});

test('clampSideWidth: clamped to 180-400, garbage gives the default 250', () => {
  assert.equal(clampSideWidth(300), 300);
  assert.equal(clampSideWidth(100), 180);
  assert.equal(clampSideWidth(900), 400);
  assert.equal(clampSideWidth(249.6), 250);
  assert.equal(clampSideWidth(undefined), 250);
  assert.equal(clampSideWidth('tull'), 250);
});

test('navScrollState: without a mode the menu is always normal and visible', () => {
  assert.deepEqual(navScrollState(undefined, 0, 500, true), { compact: false, hidden: false });
  assert.deepEqual(navScrollState('tull', 0, 500, true), { compact: false, hidden: false });
});

test('navScrollState: shrink is compact only after the top zone', () => {
  assert.deepEqual(navScrollState('shrink', 0, 40, false), { compact: false, hidden: false });
  assert.deepEqual(navScrollState('shrink', 40, 200, false), { compact: true, hidden: false });
  // Shrink never hides, regardless of direction.
  assert.equal(navScrollState('shrink', 500, 300, false).hidden, false);
});

test('navScrollState: hide hides on scroll down and shows on scroll up', () => {
  assert.deepEqual(navScrollState('hide', 100, 200, false), { compact: false, hidden: true });
  assert.deepEqual(navScrollState('hide', 200, 100, true), { compact: false, hidden: false });
});

test('navScrollState: hide is always visible in the top zone', () => {
  assert.deepEqual(navScrollState('hide', 200, 50, true), { compact: false, hidden: false });
  assert.deepEqual(navScrollState('hide', 0, 0, true), { compact: false, hidden: false });
});

test('navScrollState: small movements below the jitter guard keep the state', () => {
  assert.equal(navScrollState('hide', 200, 202, true).hidden, true);
  assert.equal(navScrollState('hide', 200, 198, false).hidden, false);
});

test('navClasses: inset only for the top bar and only on boolean true', () => {
  const site = (nav) => ({ nav: { items: [], ...nav } });
  assert.ok(navClasses(site({ style: { inset: true } })).includes('urd-nav-inset'));
  assert.ok(navClasses(site({ variant: 'bar', style: { inset: true } })).includes('urd-nav-inset'));
  assert.ok(!navClasses(site({ variant: 'floating', style: { inset: true } })).includes('urd-nav-inset'));
  assert.ok(!navClasses(site({ variant: 'side-left', style: { inset: true } })).includes('urd-nav-inset'));
  assert.ok(!navClasses(site({ style: { inset: 'yes' } })).includes('urd-nav-inset'));
  assert.ok(!navClasses(site({})).includes('urd-nav-inset'));
});

test('navClasses: the logo shrink class only on boolean true', () => {
  const site = (style) => ({ nav: { items: [], style } });
  assert.ok(navClasses(site({ shrinkLogo: true })).includes('urd-nav-shrink-logo'));
  assert.ok(!navClasses(site({ shrinkLogo: 'true' })).includes('urd-nav-shrink-logo'));
  assert.ok(!navClasses(site({})).includes('urd-nav-shrink-logo'));
});

test('navClasses: border side and shadow strength are allowlisted, the shadow is bar-only', () => {
  const site = (nav) => ({ nav: { items: [], ...nav } });
  assert.ok(navClasses(site({ style: { border: { side: 'bottom' } } })).includes('urd-nav-border-bottom'));
  assert.ok(navClasses(site({ variant: 'floating', style: { border: { side: 'all', width: 2 } } })).includes('urd-nav-border-all'));
  assert.ok(!navClasses(site({ style: { border: { side: 'left' } } })).includes('urd-nav-border-'));
  assert.ok(!navClasses(site({ style: { border: 'bottom' } })).includes('urd-nav-border-'));
  assert.ok(navClasses(site({ style: { shadow: 'soft' } })).includes('urd-nav-shadow-soft'));
  assert.ok(navClasses(site({ variant: 'bar', style: { shadow: 'strong' } })).includes('urd-nav-shadow-strong'));
  assert.ok(!navClasses(site({ variant: 'floating', style: { shadow: 'soft' } })).includes('urd-nav-shadow-'));
  assert.ok(!navClasses(site({ style: { shadow: 'huge' } })).includes('urd-nav-shadow-'));
  assert.equal(clampBorderWidth(3), 3);
  assert.equal(clampBorderWidth(0), 1);
  assert.equal(clampBorderWidth(99), 8);
  assert.equal(clampBorderWidth('tull'), 1);
});

test('navSizeVars: an empty style gives empty vars, no font and the default logo size', () => {
  assert.deepEqual(navSizeVars(), { vars: {}, font: undefined, logoSize: 32 });
  assert.deepEqual(navSizeVars({}, {}, { mobile: true }), { vars: {}, font: undefined, logoSize: 32 });
  assert.deepEqual(navSizeVars(null, null).vars, {});
});

test('navSizeVars: every field lands in its variable, clamped at both ends', () => {
  const full = navSizeVars({ padY: 12, textSize: 18, padX: 40, gap: 8, pillWidth: 900, shrinkTo: 0.6 }, { size: 48 });
  assert.deepEqual(full.vars, {
    '--urd-nav-pad-y': '12px',
    '--urd-nav-pad-x': '40px',
    '--urd-nav-gap': '8px',
    '--urd-nav-pill-w': '900px',
    '--urd-nav-shrink-to': '0.6',
  });
  assert.equal(full.font, '18px');
  assert.equal(full.logoSize, 48);
  const high = navSizeVars({ padY: 999, textSize: 99, padX: 999, gap: 999, pillWidth: 99999, shrinkTo: 5 }, { size: 999 });
  assert.equal(high.vars['--urd-nav-pad-y'], `${NAV_SIZE_BOUNDS.padY[1]}px`);
  assert.equal(high.vars['--urd-nav-pad-x'], `${NAV_SIZE_BOUNDS.padX[1]}px`);
  assert.equal(high.vars['--urd-nav-gap'], `${NAV_SIZE_BOUNDS.gap[1]}px`);
  assert.equal(high.vars['--urd-nav-pill-w'], `${NAV_SIZE_BOUNDS.pillWidth[1]}px`);
  assert.equal(high.vars['--urd-nav-shrink-to'], String(NAV_SIZE_BOUNDS.shrinkTo[1]));
  assert.equal(high.font, `${NAV_SIZE_BOUNDS.textSize[1]}px`);
  assert.equal(high.logoSize, NAV_SIZE_BOUNDS.logoSize[1]);
  const low = navSizeVars({ padY: -3, textSize: 1, padX: -1, gap: -1, pillWidth: 10, shrinkTo: 0 }, { size: 1 });
  assert.equal(low.vars['--urd-nav-pad-y'], '0px');
  assert.equal(low.vars['--urd-nav-pill-w'], `${NAV_SIZE_BOUNDS.pillWidth[0]}px`);
  assert.equal(low.vars['--urd-nav-shrink-to'], String(NAV_SIZE_BOUNDS.shrinkTo[0]));
  assert.equal(low.font, `${NAV_SIZE_BOUNDS.textSize[0]}px`);
  assert.equal(low.logoSize, NAV_SIZE_BOUNDS.logoSize[0]);
  // Garbage (deliberately Norwegian) is ignored, never written as a variable.
  assert.deepEqual(navSizeVars({ padY: 'tull', textSize: '', pillWidth: 'bred' }).vars, {});
});

test('navSizeVars: the pill width is a px value or the content width, never at the breakpoint', () => {
  assert.equal(navSizeVars({ pillWidth: 'content' }).vars['--urd-nav-pill-w'], 'min(var(--urd-canvas-w, 100%), calc(100% - 2 * var(--urd-canvas-gutter-desktop, 0px)))');
  assert.equal(navSizeVars({ pillWidth: 'content' }, {}, { mobile: true }).vars['--urd-nav-pill-w'], undefined);
  assert.equal(navSizeVars({ pillWidth: 1200 }, {}, { mobile: true }).vars['--urd-nav-pill-w'], undefined);
  assert.equal(navSizeVars({ pillWidth: 'wide' }).vars['--urd-nav-pill-w'], undefined);
});

test('navSizeVars: the mobile overrides are chosen at the breakpoint and fall back to desktop', () => {
  const style = { padY: 20, textSize: 18, padX: 30, mobile: { padY: 6, textSize: 15 } };
  const logo = { size: 48, mobileSize: 28 };
  const desktop = navSizeVars(style, logo, { mobile: false });
  assert.equal(desktop.vars['--urd-nav-pad-y'], '20px');
  assert.equal(desktop.font, '18px');
  assert.equal(desktop.logoSize, 48);
  const mobile = navSizeVars(style, logo, { mobile: true });
  assert.equal(mobile.vars['--urd-nav-pad-y'], '6px');
  assert.equal(mobile.vars['--urd-nav-pad-x'], '30px', 'the side padding has no mobile override');
  assert.equal(mobile.font, '15px');
  assert.equal(mobile.logoSize, 28);
  const partial = navSizeVars({ padY: 20, mobile: { textSize: 14 } }, { size: 40 }, { mobile: true });
  assert.equal(partial.vars['--urd-nav-pad-y'], '20px', 'a missing mobile field falls back to desktop');
  assert.equal(partial.font, '14px');
  assert.equal(partial.logoSize, 40);
  assert.equal(navSizeVars({ mobile: 'tull' }, {}, { mobile: true }).vars['--urd-nav-pad-y'], undefined);
});
