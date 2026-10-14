/**
 * The site panels rendered in node (0.7.26.3): the six panels under
 * editor/src/panels/ are compiled for the server through
 * tests/_svelte-loader.mjs and drawn with the template's own site.json and a
 * stand-in for the editor handle, so a name a split left behind fails here
 * instead of in the browser. No DOM: effects and event handlers do not run.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';
import { readFileSync } from 'node:fs';

const store = new Map();
globalThis.localStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };
globalThis.window = globalThis;
globalThis.innerWidth = 1600;
globalThis.innerHeight = 900;
globalThis.matchMedia ??= () => ({ matches: false, addEventListener() {}, removeEventListener() {} });

register('./_svelte-loader.mjs', import.meta.url);
const { render } = await import('svelte/server');
const { createRawSnippet } = await import('svelte');
const { liftSiteFile } = await import('$engine/migrate.js');
const panels = Object.fromEntries(await Promise.all(['Pages', 'Nav', 'Site', 'Theme', 'Grid', 'Footer'].map(async (name) => [name, (await import(`../editor/src/panels/${name}Panel.svelte`)).default])));

const site = liftSiteFile(JSON.parse(readFileSync(new URL('../template/content/site.json', import.meta.url), 'utf8')));
const noop = () => {};
const backgroundLayers = createRawSnippet(() => ({ render: () => '<div class="bg-layers-stub"></div>' }));

/** The handle as the panels see it: the template's site as the draft, one page open, nothing in flight. */
function handleFor(panel, siteDraft) {
  const calendars = siteDraft.site?.calendars ?? [];
  return {
    activePanel: panel,
    site: siteDraft,
    siteDraft,
    grid: { size: 16, snap: true },
    pageId: siteDraft.pages[0]?.id ?? 'hjem',
    bridge: null,
    missingSeo: {},
    seoDraft: { description: '', ogTitle: '', ogDescription: '', ogImage: '' },
    templateIds: [],
    templateStores: {},
    newPageTitle: '',
    newPageTemplate: null,
    pageMenuFor: null,
    iconEditorImage: null,
    openSiteCalendar: calendars[0]?.id ?? null,
    siteCalendarsOpen: true,
    siteZoneBad: false,
    bindsFrom: 1637,
    layoutWidth: siteDraft.layout?.contentWidth ?? 1440,
    layoutGutter: siteDraft.layout?.gutter ?? 6,
    activeThemePreset: null,
    THEME_PRESETS: [{ id: 'well', name: 'Well', note: 'A note', light: { bg: '#f6faf8', surface: '#ffffff', text: '#16211d', accent: '#15b39a', 'accent-text': '#04241d' }, dark: { bg: '#0e1512', surface: '#17211d', text: '#eaf1ed', accent: '#22c3a8', 'accent-text': '#04241d' } }],
    navBgCtx: { mutate: noop, keyPrefix: 'navbg', keyId: 'nav' },
    footerBgCtx: { mutate: noop, keyPrefix: 'footerbg', keyId: 'footer' },
    themeSwatches: () => Object.entries(siteDraft.theme?.tokens?.color ?? {}),
    themeHex: (v, pal) => (v && pal && pal[v] ? pal[v] : v),
    readableOn: () => '#ffffff',
    suggestAltColors: () => ({}),
    siteCalendars: () => calendars,
    siteCalendarById: (id) => calendars.find((c) => c.id === id) ?? null,
    siteLangOptions: () => [['nb', 'Norsk bokmål'], ['en-GB', 'English']],
    siteLangValue: () => siteDraft.site?.lang ?? 'nb',
    addPage: noop, deletePage: noop, renamePage: noop, savePageAsTemplate: noop, selectPage: noop, handleDeleteTemplate: noop,
    setPageSeo: noop, setPageNoindex: noop, setPageSlug: noop, uploadOgImage: noop,
    siteMutate: noop, footerMutate: noop, addSiteCalendar: noop, setGrid: noop, setStatus: noop,
    applyThemePreset: noop, compressOrTrim: noop, svgAutoTrim: noop,
  };
}

for (const [name, Panel] of Object.entries(panels)) {
  test(`the ${name} panel renders with the template's site`, () => {
    const context = new Map([['urd-editor', handleFor(name.toLowerCase(), structuredClone(site))]]);
    const { body } = render(Panel, { props: { backgroundLayers }, context });
    assert.match(body, /panel-body/, `${name}: the panel body is drawn`);
  });
}

test('the Nav and Footer panels draw the background editor where the handle gives it', () => {
  for (const name of ['Nav', 'Footer']) {
    const context = new Map([['urd-editor', handleFor(name.toLowerCase(), structuredClone(site))]]);
    const { body } = render(panels[name], { props: { backgroundLayers }, context });
    assert.match(body, /bg-layers-stub/, `${name}: the snippet prop is rendered`);
  }
});

test('the Nav panel renders every variant, with a launcher and an announcement', () => {
  for (const variant of ['bar', 'floating', 'floating-square', 'floating-tab', 'side-left', 'side-right']) {
    const draft = structuredClone(site);
    draft.nav.variant = variant;
    draft.nav.style = { ...(draft.nav.style ?? {}), launcher: { show: true, links: [{ label: 'A', href: 'https://a' }] }, hover: 'lift', mobile: { size: 'lg' } };
    draft.nav.announcement = { text: 'Hello', href: '/x' };
    draft.nav.items = [{ label: 'Home', page: draft.pages[0]?.id }, { label: 'More', href: 'https://b', children: [{ label: 'Child', page: draft.pages[0]?.id }] }];
    const context = new Map([['urd-editor', handleFor('nav', draft)]]);
    const { body } = render(panels.Nav, { props: { backgroundLayers }, context });
    assert.match(body, /panel-body/, `${variant}: drawn`);
  }
});

test('the Footer panel renders a footer with columns, social links and a call to action', () => {
  const draft = structuredClone(site);
  draft.footer = {
    version: 1, show: true, text: 'Foot', align: 'center', brand: { mode: 'logo', logoHeight: 40 }, columns: [{ title: 'Col', links: [{ label: 'L', page: draft.pages[0]?.id }, { label: 'X', href: 'https://x' }] }],
    social: [{ icon: 'facebook', url: 'https://f' }], cta: { title: 'Join', page: draft.pages[0]?.id }, linkRow: [{ label: 'R', href: '/r' }], baseline: [{ label: 'B', href: '/b' }], background: { version: 1, layers: [] },
  };
  const context = new Map([['urd-editor', handleFor('footer', draft)]]);
  const { body } = render(panels.Footer, { props: { backgroundLayers }, context });
  assert.match(body, /panel-body/);
});

test('the Theme panel renders a site with and without a dark theme', () => {
  for (const alt of [null, { auto: true, tokens: { color: { bg: '#000' } } }]) {
    const draft = structuredClone(site);
    if (alt) draft.theme.alt = alt; else delete draft.theme.alt;
    const context = new Map([['urd-editor', handleFor('theme', draft)]]);
    const { body } = render(panels.Theme, { props: {}, context });
    assert.match(body, /panel-body/);
  }
});
