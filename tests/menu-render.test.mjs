/**
 * The element menu rendered in node for every block type (0.7.26.2): the
 * menu components (editor/src/menu/) are compiled for the server through
 * tests/_svelte-loader.mjs and drawn with a stand-in for the editor handle,
 * so a name the split left behind, or a family that throws on a block's
 * props, fails here instead of in the browser. No DOM: effects, attachments
 * and event handlers do not run.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

// The browser globals the menu's modules touch when they load.
const store = new Map();
globalThis.localStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };
globalThis.window = globalThis;
globalThis.innerWidth = 1600;
globalThis.innerHeight = 900;
globalThis.matchMedia ??= () => ({ matches: false, addEventListener() {}, removeEventListener() {} });

register('./_svelte-loader.mjs', import.meta.url);
const { render } = await import('svelte/server');
const { default: ElementMenu } = await import('../editor/src/menu/ElementMenu.svelte');
const { default: FloatingMenu } = await import('../editor/src/menu/FloatingMenu.svelte');

const noop = () => {};

/** Props per block type: a plain block, and one with the settings that open the most controls. */
const BLOCKS = {
  text: [{}, { align: 'center', box: true, boxStyle: { shadow: 'soft', border: { color: 'accent', width: 2 } } }],
  button: [{ label: 'Go', style: 'primary', page: null, href: '#' }, { label: 'Go', style: 'secondary', page: 'hjem' }],
  image: [{ src: 'x', alt: '' }, { src: 'x', href: 'https://a', fit: 'contain', x: 0.2, radius: 'sm' }],
  video: [{ source: 'embed', url: '' }, { source: 'file', src: 'x', muted: true, autoplay: true }],
  icon: [{ glyph: '★' }, { icon: 'heart', image: 'data:x', size: 64, color: 'text' }],
  shape: [{ kind: 'line', color: 'accent', thickness: 2 }, { kind: 'circle', color: 'text', thickness: 4, fill: 'text' }],
  gallery: [{ images: [], view: 'grid' }, { images: [{ src: 'a' }, { src: 'b' }], view: 'ribbon', rows: 2, width: 'page' }, { images: [{ src: 'a' }], view: 'mosaic' }, { images: [{ src: 'a' }], view: 'polaroid', tilt: 0 }, { images: [], view: 'slides' }],
  ribbon: [{ items: ['a', 'b'] }, { items: ['a'], motion: 'step', sep: 'custom', above: 'marks', below: 'plain', variant: 'plain', width: 'content' }],
  calendar: [
    { sources: [] },
    { sources: ['https://x', { calendar: 'c1' }, { calendar: 'gone' }, { url: 'https://y', name: 'Y', color: '#fff' }], view: 'next', switcher: true, nextCount: 2, laterCount: 2 },
    { sources: [], design: 'bento', notice: { show: true, as: 'band', href: 'https://z' }, colors: { bg: '#000' }, stripe: { show: true, color: '#111' }, fieldStyle: { title: { bold: true, italic: true } }, options: {}, texts: { noticeTitle: 'A<br>B' } },
    { sources: [], view: 'agenda', showSearch: true, showEarlier: true, emptyIcon: 'none', emptyText: 'None', limit: 12, showMore: false },
  ],
  form: [{ fields: [{ id: 'f1', label: 'A', type: 'select', options: ['x'], required: true }], mode: 'endpoint', endpoint: 'https://e' }, { fields: [], mode: 'mailto' }],
  faq: [{ items: [{ q: 'Q', a: 'A' }], variant: 'list' }, { items: [], multi: true, boxStyle: { glass: true } }],
  timeline: [{ items: [{ year: '2020', title: 'T', text: '' }], variant: 'alternating', marker: 'ring' }],
  quote: [{ text: 'q', variant: 'short', image: 'x' }, { text: 'q', card: true, accent: '#f00' }],
  stats: [{ value: '4', variant: 'cards', countUp: false }],
  table: [{ rows: [['a']], header: true, lines: 'grid', striped: true }],
  share: [{ services: ['x', 'copy'], variant: 'labels', size: 40 }],
  countdown: [{ target: '', variant: 'plain', showSeconds: false, doneText: 'Done' }],
  audio: [{ src: 'x', loop: true, title: 'T' }, {}],
  collection: [{ collection: 'news', limit: 3, view: 'list' }, { collection: null }],
  product: [{ collection: 'shop', columns: 3 }, { collection: null }],
  cart: [{ href: '/checkout', variant: 'icon' }],
  checkout: [{ recipient: 'a@b', vippsCheckout: true }],
  map: [{ location: 'Oslo', zoom: 12 }],
  'plugin-thing': [{ where: 'Here', n: 3, on: true, sel: 'a', t: 'x' }],
  'plugin-bare': [{}],
};

/** The block-level settings that open the most of Placement. */
const PLACEMENTS = [
  {},
  { fit: 'shrink', fitMin: 0.5, size: 1.2, sizeMin: 10, sticky: { offset: 16, until: null, mode: 'scroll' }, height: { mode: 'own', align: 'stretch' }, animation: { type: 'fade-in', props: { duration: 300, delay: 0 } }, hover: { type: 'lift' }, decor: true, hideMobile: true },
  { fit: 'both', sticky: { offset: 0, mode: 'screen', dock: 'middle-center' } },
];

function handleFor(selectedBlock, viewMode = 'desktop') {
  const calendars = [{ id: 'c1', name: 'C', url: 'https://c', color: '#f00' }];
  return {
    get selectedBlock() { return selectedBlock; },
    siteDraft: { pages: [{ id: 'hjem', title: 'Hjem', path: '/' }], site: { calendars }, theme: { tokens: { color: {} } } },
    viewMode,
    sections: [{ id: 's1', blocks: [] }, { id: 's2', blocks: [] }],
    collectionIds: ['news', 'shop'],
    collectionsView: { news: { name: 'News', kind: 'posts' }, shop: { name: 'Shop', kind: 'products' } },
    pluginBlocks: [{ type: 'plugin-thing', fields: [{ key: 'where', type: 'place', label: 'Where' }, { key: 'n', type: 'number', label: 'N', min: 1, max: 5 }, { key: 'on', type: 'toggle', label: 'On' }, { key: 'sel', type: 'select', label: 'S', options: [{ value: 'a', label: 'A' }] }, { key: 't', type: 'text', label: 'T' }] }, { type: 'plugin-bare' }],
    bridge: null,
    blockLabel: (t) => t,
    blockEntranceOptions: () => [['', 'None'], ['fade-in', 'Fade']],
    hoverOptions: () => [['', 'None'], ['lift', 'Lift']],
    isEntrance: (a) => a?.type === 'fade-in',
    themeSwatches: () => [['accent', '#7c5cff']],
    siteCalendars: () => calendars,
    siteCalendarById: (id) => calendars.find((c) => c.id === id) ?? null,
    addSiteCalendar: noop,
    newSeed: () => 1,
    setStatus: noop,
    mutateBlock: noop, setBlockProp: noop, setBlockProps: noop, setBlockFrame: noop, setBlockFit: noop, setBlockFitMin: noop,
    setBlockSize: noop, endSizeGesture: noop, setBlockSizeBound: noop, setBlockHeightMode: noop, setBlockHeightAlign: noop,
    canStretch: () => true, setBlockHideMobile: noop, setBlockDecor: noop, setBlockAnimation: noop, setBlockHover: noop, setBlockAnimProp: noop,
    designWidth: () => 1440, shapePx: (p) => Math.round(p * 14.4), setShapeSizePx: noop, setBoxStyle: noop,
    buttonTargets: () => [['hjem', 'Hjem'], ['__href', 'Link']], setButtonTarget: noop, openImageEditor: noop,
    compressOrTrim: noop, imageErrorText: () => '', setBlockVideoFile: noop, setBlockVideoPoster: noop,
    addGalleryImages: noop, moveGalleryImage: noop, removeGalleryImage: noop, setGalleryImageField: noop,
    addCollectionEntry: noop, createCatalogForBlock: noop, openPanel: noop, openCollection: noop, openDesignPicker: noop,
  };
}

const block = (type, props, extra) => ({
  sectionId: 's1', blockId: 'b1', type, decor: false, hideMobile: false, props,
  frame: { x: 10, y: 20, w: 40, h: 120, z: 1, rot: 0 }, animation: null, hover: null, sticky: null, height: null, ...extra,
});

for (const [type, propsList] of Object.entries(BLOCKS)) {
  test(`the element menu renders a ${type} block in every width, with and without a search, in both views`, () => {
    for (const props of propsList) {
      for (const extra of PLACEMENTS) {
        for (const viewMode of ['desktop', 'mobile']) {
          const context = new Map([['urd-editor', handleFor(block(type, props, extra), viewMode)]]);
          for (const [wide, query] of [[true, ''], [false, ''], [true, 'colour'], [false, 'x']]) {
            const { body } = render(ElementMenu, { props: { wide, query }, context });
            if (query) assert.match(body, /emenu-search/, `${type}: the search draws its copy of the areas`);
            else assert.match(body, /menu-quick/, `${type}: the quick row is drawn`);
            assert.match(body, /menu-pin/, `${type}: a pin is drawn`);
          }
          const floating = render(FloatingMenu, { props: { pos: { left: 10, top: 10 }, onclose: noop }, context });
          assert.match(floating.body, /block-menu-head/);
        }
      }
    }
  });
}

test('the quick row shows a block type\'s own tiles first, then the shared ones', () => {
  const context = new Map([['urd-editor', handleFor(block('ribbon', { items: ['a'], motion: 'roll', speed: 80 }, {}))]]);
  const { body } = render(ElementMenu, { props: { wide: true, query: '' }, context });
  // The ribbon's own two (the motion and the speed), then the shared fit and phone; the size can be pinned but is no default.
  assert.equal([...body.matchAll(/class="menu-quick-item"/g)].length, 4);
  // A pin on each tile, and one beside each setting in the areas that can stand in the row.
  assert.ok([...body.matchAll(/class="menu-pin/g)].length > 4);
});
