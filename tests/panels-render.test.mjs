/**
 * The panels rendered in node (0.7.26.3 and 0.7.26.4): the twelve panels
 * under editor/src/panels/ and the background editor under editor/src/section/
 * are compiled for the server through tests/_svelte-loader.mjs and drawn with
 * the template's own site.json and a stand-in for the editor handle, so a
 * name a split left behind fails here instead of in the browser. No DOM:
 * effects and event handlers do not run.
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
const { liftSiteFile } = await import('$engine/migrate.js');
const NAMES = ['Pages', 'Nav', 'Site', 'Theme', 'Grid', 'Footer', 'Blocks', 'Properties', 'Collections', 'Plugins', 'History', 'Update'];
const panels = Object.fromEntries(await Promise.all(NAMES.map(async (name) => [name, (await import(`../editor/src/panels/${name}Panel.svelte`)).default])));
const { default: BackgroundEditor } = await import('../editor/src/section/BackgroundEditor.svelte');
const layerDefs = Object.fromEntries(await Promise.all([
  ['color', 'colorLayer'], ['gradient', 'gradientLayer'], ['glow', 'glowLayer'], ['image', 'imageLayer'],
  ['slideshow', 'slideshowLayer'], ['video', 'videoLayer'], ['pattern', 'patternLayer'], ['grain', 'grainLayer'],
].map(async ([type, name]) => [type, (await import(`$engine/backgrounds/${type}.js`))[name]])));

const site = liftSiteFile(JSON.parse(readFileSync(new URL('../template/content/site.json', import.meta.url), 'utf8')));
const noop = () => {};
const BG_TYPES = Object.entries(layerDefs);
const BG_DEFS = layerDefs;
/** One layer of each type, at the type's own defaults. */
const allLayers = () => BG_TYPES.map(([type, def]) => ({ type, version: def.version, props: def.defaults() }));

const textBlock = { sectionId: 'sec-1', blockId: 'b1', type: 'text', decor: false, hideMobile: false, props: { align: 'center' }, frame: { x: 10, y: 20, w: 40, h: 120, z: 1, rot: 0 }, animation: null, hover: null, sticky: null, height: null };

/** The handle as the panels see it: the template's site as the draft, one page open, nothing in flight. */
function handleFor(panel, siteDraft, extra = {}) {
  const calendars = siteDraft.site?.calendars ?? [];
  return {
    activePanel: panel,
    site: siteDraft,
    siteDraft,
    grid: { size: 16, snap: true },
    pageId: siteDraft.pages[0]?.id ?? 'hjem',
    bridge: null,
    auth: { allowed: true, login: 'owner' },
    viewMode: 'desktop',
    iframeEl: null,
    sections: [{ id: 'sec-1', blocks: [] }],
    // Pages
    missingSeo: {},
    seoDraft: { description: '', ogTitle: '', ogDescription: '', ogImage: '' },
    templateIds: [],
    templateStores: {},
    newPageTitle: '',
    newPageTemplate: null,
    pageMenuFor: null,
    // Site
    iconEditorImage: null,
    openSiteCalendar: calendars[0]?.id ?? null,
    siteCalendarsOpen: true,
    siteZoneBad: false,
    bindsFrom: 1637,
    layoutWidth: siteDraft.layout?.contentWidth ?? 1440,
    layoutGutter: siteDraft.layout?.gutter ?? 6,
    // Theme
    activeThemePreset: null,
    THEME_PRESETS: [{ id: 'well', name: 'Well', note: 'A note', light: { bg: '#f6faf8', surface: '#ffffff', text: '#16211d', accent: '#15b39a', 'accent-text': '#04241d' }, dark: { bg: '#0e1512', surface: '#17211d', text: '#eaf1ed', accent: '#22c3a8', 'accent-text': '#04241d' } }],
    previewPalette: siteDraft.theme?.tokens?.color ?? {},
    // The backgrounds
    navBgCtx: { mutate: noop, keyPrefix: 'navbg', keyId: 'nav' },
    footerBgCtx: { mutate: noop, keyPrefix: 'footerbg', keyId: 'footer' },
    sectionBgCtx: { mutate: noop, keyPrefix: 'bg', keyId: 'sec-1' },
    BG_TYPES,
    BG_DEFS,
    secBox: { w: 1200, h: 600 },
    sectionBg: [],
    // The section
    selectedBlock: null,
    activeSectionId: 'sec-1',
    sectionGrid: null,
    sectionMinHeight: '',
    sectionAnim: null,
    sectionHover: null,
    sectionTheme: '',
    sectionDivider: {},
    BLOCK_LABELS: { text: 'Text' },
    ENTRANCE_OPTIONS: [['', 'None'], ['fade-in', 'Fade']],
    HOVER_OPTIONS: [['', 'None'], ['lift', 'Lift']],
    isEntrance: (a) => a?.type === 'fade-in',
    animObj: (type) => ({ type, version: 1, props: { duration: 300, delay: 0 } }),
    normalizeAnim: noop,
    // Blocks
    pluginBlocks: [{ type: 'plugin-thing', label: 'Thing', fields: [] }],
    designPicker: null,
    // Collections
    collectionIds: ['news', 'shop'],
    collectionsView: { news: { name: 'News', kind: 'posts', entries: [] }, shop: { name: 'Shop', kind: 'products', entries: [] } },
    collectionStores: {},
    activeCollection: null,
    newCollectionName: '',
    newCollectionKind: 'news',
    // Plugins
    pluginsView: { enabled: ['lang-sv'], disabled: [] },
    pluginInfo: { 'lang-sv': { manifest: { name: 'Svenska', version: '1.0.0', languages: ['sv'] }, errors: [] } },
    pluginEngine: '0.7.4',
    pluginsFound: ['found-one'],
    pluginDiscovery: 'done',
    liveCsp: null,
    knownPlugins: () => ['lang-sv'],
    // History and the updater
    historyList: [{ sha: 'abc1234', message: 'Publish', date: '2026-10-14T10:00:00Z', author: 'owner' }],
    historyError: '',
    baseSha: 'abc1234',
    revertedSinceLoad: false,
    updateInfo: null,
    updateError: '',
    updateBusy: false,
    updateSkip: new Set(),
    // Functions
    themeSwatches: () => Object.entries(siteDraft.theme?.tokens?.color ?? {}),
    themeHex: (v, pal) => (v && pal && pal[v] ? pal[v] : v),
    readableOn: () => '#ffffff',
    suggestAltColors: () => ({}),
    siteCalendars: () => calendars,
    siteLinks: () => site.site.links ?? [],
    addSiteLink: noop, removeSiteLink: noop, moveSiteLink: noop, setSiteLink: noop, focusSiteLink: null,
    siteCalendarById: (id) => calendars.find((c) => c.id === id) ?? null,
    siteLangOptions: () => [['nb', 'Norsk bokmål'], ['en-GB', 'English']],
    siteLangValue: () => siteDraft.site?.lang ?? 'nb',
    blockLabel: (t) => t,
    blockEntranceOptions: () => [['', 'None'], ['fade-in', 'Fade']],
    hoverOptions: () => [['', 'None'], ['lift', 'Lift']],
    buttonTargets: () => [['hjem', 'Hjem'], ['__href', 'Link']],
    designWidth: () => 1440,
    shapePx: (p) => Math.round(p * 14.4),
    canStretch: () => true,
    newSeed: () => 1,
    plainTitle: (s) => String(s ?? ''),
    imageErrorText: () => '',
    addPage: noop, deletePage: noop, renamePage: noop, savePageAsTemplate: noop, selectPage: noop, handleDeleteTemplate: noop,
    setPageSeo: noop, setPageNoindex: noop, setPageSlug: noop, uploadOgImage: noop,
    siteMutate: noop, footerMutate: noop, mutateSection: noop, addSiteCalendar: noop, setGrid: noop, setStatus: noop,
    applyThemePreset: noop, compressOrTrim: noop, svgAutoTrim: noop, compressMany: noop, reportUpload: noop, readVideoFile: noop,
    setSectionGrid: noop, setSectionHeight: noop, toggleSectionGrid: noop,
    buildBlock: () => ({}), requestPlacement: noop, addCalendarDesign: noop,
    addCollection: noop, addCollectionEntry: noop, mutateCollection: noop, removeCollection: noop, createCatalogForBlock: noop,
    loadPluginInfo: noop, removePlugin: noop, setPluginEnabled: noop,
    askConfirm: async () => true, loadHistory: noop, refreshBaseSha: async () => null, loadUpdateCheck: noop,
    mutateBlock: noop, setBlockProp: noop, setBlockProps: noop, setBlockFrame: noop, setBlockFit: noop, setBlockFitMin: noop,
    setBlockSize: noop, endSizeGesture: noop, setBlockSizeBound: noop, setBlockHeightMode: noop, setBlockHeightAlign: noop,
    setBlockAnchor: noop, setSectionAnchor: noop, anchorsTaken: () => new Set(), pageEntry: () => ({ id: 'hjem', path: '/' }),
    setBlockHideMobile: noop, setBlockDecor: noop, setBlockAnimation: noop, setBlockHover: noop, setBlockAnimProp: noop,
    setShapeSizePx: noop, setBoxStyle: noop, setButtonTarget: noop, openImageEditor: noop,
    setBlockVideoFile: noop, setBlockVideoPoster: noop, addGalleryImages: noop, moveGalleryImage: noop, removeGalleryImage: noop, setGalleryImageField: noop,
    openPanel: noop, openCollection: noop, openDesignPicker: noop,
    ...extra,
  };
}

const draw = (Panel, panel, siteDraft, extra = {}, props = {}) => render(Panel, { props, context: new Map([['urd-editor', handleFor(panel, siteDraft, extra)]]) }).body;

for (const name of NAMES) {
  test(`the ${name} panel renders with the template's site`, () => {
    const body = draw(panels[name], name.toLowerCase(), structuredClone(site));
    assert.match(body, /panel-body/, `${name}: the panel body is drawn`);
  });
}

test('the Nav and Footer panels draw the background editor', () => {
  for (const name of ['Nav', 'Footer']) {
    const draft = structuredClone(site);
    draft.nav.style = { ...(draft.nav.style ?? {}), background: { version: 1, layers: allLayers() } };
    draft.footer = { ...(draft.footer ?? { version: 1, show: true, text: '', align: 'center' }), background: { version: 1, layers: allLayers() } };
    const body = draw(panels[name], name.toLowerCase(), draft);
    assert.match(body, /bg-layer/, `${name}: the layers are drawn`);
  }
});

test('the Nav panel renders every variant, with a launcher and an announcement', () => {
  for (const variant of ['bar', 'floating', 'floating-square', 'floating-tab', 'side-left', 'side-right']) {
    const draft = structuredClone(site);
    draft.nav.variant = variant;
    draft.nav.style = { ...(draft.nav.style ?? {}), launcher: { show: true, links: [{ label: 'A', href: 'https://a' }] }, hover: 'lift', mobile: { size: 'lg' } };
    draft.nav.announcement = { text: 'Hello', href: '/x' };
    draft.nav.items = [{ label: 'Home', page: draft.pages[0]?.id }, { label: 'More', href: 'https://b', children: [{ label: 'Child', page: draft.pages[0]?.id }] }];
    assert.match(draw(panels.Nav, 'nav', draft), /panel-body/, `${variant}: drawn`);
  }
});

test('the Footer panel renders a footer with columns, social links and a call to action', () => {
  const draft = structuredClone(site);
  draft.footer = {
    version: 1, show: true, text: 'Foot', align: 'center', brand: { mode: 'logo', logoHeight: 40 }, columns: [{ title: 'Col', links: [{ label: 'L', page: draft.pages[0]?.id }, { label: 'X', href: 'https://x' }] }],
    social: [{ icon: 'facebook', url: 'https://f' }], cta: { title: 'Join', page: draft.pages[0]?.id }, linkRow: [{ label: 'R', href: '/r' }], baseline: [{ label: 'B', href: '/b' }], background: { version: 1, layers: [] },
  };
  assert.match(draw(panels.Footer, 'footer', draft), /panel-body/);
});

test('the Theme panel renders a site with and without a dark theme', () => {
  for (const alt of [null, { auto: true, tokens: { color: { bg: '#000' } } }]) {
    const draft = structuredClone(site);
    if (alt) draft.theme.alt = alt; else delete draft.theme.alt;
    assert.match(draw(panels.Theme, 'theme', draft), /panel-body/);
  }
});

test('the Properties panel renders a section with every setting on, and a selected block with the element menu', () => {
  const section = {
    sectionGrid: { size: 24 }, sectionMinHeight: '600px', sectionTheme: 'accent',
    sectionAnim: { type: 'stagger', version: 1, props: { duration: 400, delay: 0, effect: 'slide-up', step: 90, pattern: 'rows' } },
    sectionHover: { type: 'lift', version: 1, props: {} },
    sectionDivider: { top: { shape: 'wave', height: 80, color: 'bg', flip: true }, bottom: { shape: 'tilt' } },
    sectionBg: allLayers(),
  };
  let body = draw(panels.Properties, 'properties', structuredClone(site), section);
  assert.match(body, /panel-body/);
  assert.match(body, /bg-layer/, 'the background layers are drawn');
  body = draw(panels.Properties, 'properties', structuredClone(site), { selectedBlock: textBlock });
  assert.match(body, /menu-quick/, 'the element menu is drawn for the selected block');
});

test('the section Properties draws its link name, with a suggestion from its first heading while it has none', () => {
  const sections = [{ id: 'sec-1', blocks: [{ id: 'blk-1', type: 'text', props: { html: '<h2>Våre priser</h2>' }, frames: { desktop: { y: 0 } } }] }];
  let body = draw(panels.Properties, 'properties', structuredClone(site), { sections, sectionAnchor: '' });
  assert.match(body, /placeholder="vare-priser"/, 'the suggestion stands in the empty field');
  assert.match(body, /title="tip.anchorSuggest"/, 'and a button gives it');
  body = draw(panels.Properties, 'properties', structuredClone(site), { sections, sectionAnchor: 'priser' });
  assert.match(body, /value="priser"/);
  assert.doesNotMatch(body, /tip.anchorSuggest/, 'a named section offers no suggestion');
});

test('the background editor renders a layer of every type, with the sizes, the stops and the folder', () => {
  const layers = allLayers();
  const image = layers.find((l) => l.type === 'image');
  image.props.src = '/media/a.webp';
  image.props.size = 120;
  const gradient = layers.find((l) => l.type === 'gradient');
  gradient.props.stops = [{ color: '#000', at: 0 }, { color: '#fff', at: 100 }];
  const slideshow = layers.find((l) => l.type === 'slideshow');
  slideshow.props.images = [{ src: '/media/a.webp' }, { src: '/media/b.webp' }];
  slideshow.props.source = 'folder';
  const video = layers.find((l) => l.type === 'video');
  video.props.src = '/media/v.mp4';
  const body = render(BackgroundEditor, {
    props: { bg: { mutate: noop, keyPrefix: 'bg', keyId: 'sec-1' }, layers },
    context: new Map([['urd-editor', handleFor('properties', structuredClone(site), { sectionBg: layers })]]),
  }).body;
  assert.equal([...body.matchAll(/class="bg-layer/g)].length >= layers.length, true, 'one row per layer');
});

test('the Collections, Plugins, History and Update panels render with content', () => {
  const draft = structuredClone(site);
  let body = draw(panels.Collections, 'collections', draft, {
    activeCollection: 'shop',
    collectionStores: { shop: { data: { name: 'Shop', kind: 'products', entries: [{ id: 'e1', title: 'Cake', price: 120, image: '/media/c.webp', sizes: ['S', 'M'], colors: [{ name: 'Red', hex: '#f00' }] }] } } },
  });
  assert.match(body, /panel-body/);
  body = draw(panels.Plugins, 'plugins', draft, { liveCsp: "default-src 'self'", pluginInfo: { 'lang-sv': { manifest: { name: 'Svenska', version: '1.0.0', languages: ['sv'], csp: { frameSrc: ['https://x'] } }, errors: [] } } });
  assert.match(body, /panel-body/);
  body = draw(panels.History, 'history', draft, { historyList: null });
  assert.match(body, /panel-body/);
  body = draw(panels.History, 'history', draft, { historyList: [], historyError: 'No' });
  assert.match(body, /panel-body/);
  body = draw(panels.Update, 'update', draft, { updateInfo: { upToDate: false, target: 'v0.7.5', head: 'abc', notes: 'Notes', headers: { upstream: 'x' }, changes: [{ path: 'assets/engine/0.7.5/x.js', action: 'add', atom: true }, { path: 'content/x.json', action: 'delete', conflict: 'local' }] }, updateSkip: new Set(['content/x.json']) });
  assert.match(body, /panel-body/);
  body = draw(panels.Update, 'update', draft, { updateInfo: { upToDate: true, target: 'v0.7.4', changes: [] } });
  assert.match(body, /panel-body/);
  body = draw(panels.Blocks, 'blocks', draft, { templateIds: ['t1'], templateStores: { t1: { data: { mal: { name: 'T', kind: 'section' } } } } });
  assert.match(body, /panel-body/);
});
