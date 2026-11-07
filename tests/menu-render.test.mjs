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
import { readFileSync } from 'node:fs';
import { engineImport } from './_engine.mjs';

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
const { setQuickChoice } = await import('../editor/src/menu/state.svelte.js');
const { NO_CHOICE } = await import('../editor/src/lib/quick-row.js');
const { DESIGN_BLOCK_TYPES } = await engineImport('block-designs.js');

const noop = () => {};

/** Props per block type: a plain block, and one with the settings that open the most controls. */
const BLOCKS = {
  text: [{}, { align: 'center', box: true, boxStyle: { shadow: 'soft', border: { color: 'accent', width: 2 } } }],
  button: [{ label: 'Go', style: 'primary', page: null, href: '#' }, { label: 'Go', style: 'secondary', page: 'hjem' }],
  image: [{ src: 'x', alt: '' }, { src: 'x', href: 'https://a', fit: 'contain', x: 0.2, radius: 'sm' }],
  video: [{ source: 'embed', url: '' }, { source: 'file', src: 'x', muted: true, autoplay: true }],
  icon: [{ glyph: '★' }, { icon: 'heart', image: 'data:x', size: 64, color: 'text' }],
  shape: [{ kind: 'line', color: 'accent', thickness: 2 }, { kind: 'circle', color: 'text', thickness: 4, fill: 'text' }],
  gallery: [{ images: [], view: 'grid' }, { images: [{ src: 'a' }, { src: 'b' }], view: 'ribbon', rows: 2, width: 'page' }, { images: [{ src: 'a' }], view: 'mosaic' }, { images: [{ src: 'a' }], view: 'polaroid', tilt: 0 }, { images: [], view: 'slides' }, { images: [{ src: 'a' }], view: 'carousel' }],
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
  contact: [{ design: 'lines' }, { design: 'card', vcard: true, dock: true, phoneDesign: 'icons' }],
  privacy: [{ design: 'long' }, { design: 'ledger', heading: true, phoneDesign: 'long', accent: '#f00' }],
  terms: [{ html: '<h2>A</h2><p>B</p>' }, { html: '', design: 'clauses', phoneDesign: 'long' }],
  audio: [{ src: 'x', loop: true, title: 'T' }, {}],
  collection: [{ collection: 'news', limit: 3, view: 'list' }, { collection: null }],
  product: [{ collection: 'shop', columns: 3 }, { collection: null }],
  cart: [{ href: '/checkout', variant: 'icon' }],
  checkout: [{ recipient: 'a@b', vippsCheckout: true }],
  map: [{ location: 'Oslo', zoom: 12 }],
  'plugin-thing': [{ where: 'Here', n: 3, on: true, sel: 'a', t: 'x', more: { page: 'hjem', target: 'kontakt' } }, { where: '', more: null }],
  'plugin-bare': [{}],
};

/** The block-level settings that open the most of Placement. */
const PLACEMENTS = [
  {},
  { fit: 'shrink', fitMin: 0.5, size: 1.2, sizeMin: 10, sticky: { offset: 16, until: null, mode: 'scroll' }, height: { mode: 'own', align: 'stretch' }, animation: { type: 'fade-in', props: { duration: 300, delay: 0 } }, hover: { type: 'lift' }, decor: true, hideMobile: true, anchor: 'priser' },
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
    pluginBlocks: [{ type: 'plugin-thing', fields: [{ key: 'where', type: 'place', label: 'Where' }, { key: 'n', type: 'number', label: 'N', min: 1, max: 5 }, { key: 'on', type: 'toggle', label: 'On' }, { key: 'sel', type: 'select', label: 'S', options: [{ value: 'a', label: 'A' }] }, { key: 't', type: 'text', label: 'T' }, { key: 'more', type: 'link', label: 'More' }] }, { type: 'plugin-bare' }],
    bridge: null,
    blockLabel: (t) => t,
    blockEntranceOptions: () => [['', 'None'], ['fade-in', 'Fade']],
    hoverOptions: () => [['', 'None'], ['lift', 'Lift']],
    isEntrance: (a) => a?.type === 'fade-in',
    themeSwatches: () => [['accent', '#7c5cff']],
    siteCalendars: () => calendars,
    siteLinks: () => [],
    siteCalendarById: (id) => calendars.find((c) => c.id === id) ?? null,
    addSiteCalendar: noop,
    newSeed: () => 1,
    setStatus: noop,
    mutateBlock: noop, setBlockProp: noop, setBlockProps: noop, setBlockFrame: noop, setBlockFit: noop, setBlockFitMin: noop,
    setBlockSize: noop, endSizeGesture: noop, setBlockSizeBound: noop, setBlockHeightMode: noop, setBlockHeightAlign: noop,
    setBlockAnchor: noop, setSectionAnchor: noop, anchorsTaken: () => new Set(), pageEntry: () => ({ id: 'hjem', path: '/' }),
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
            else assert.match(body, /emenu-pinned/, `${type}: Pinned is drawn`);
            assert.match(body, /menu-pin/, `${type}: a pin is drawn`);
          }
          const floating = render(FloatingMenu, { props: { pos: { left: 10, top: 10 }, onclose: noop }, context });
          assert.match(floating.body, /block-menu-head/);
        }
      }
    }
  });
}

test('a plugin block\'s link field draws the link field the core blocks have, with where it goes', () => {
  const context = new Map([['urd-editor', handleFor(block('plugin-thing', { more: { page: 'hjem', target: 'kontakt' } }, {}))]]);
  const { body } = render(ElementMenu, { props: { wide: true, query: '' }, context });
  assert.match(body, /class="link-field[^"]*"/);
  assert.match(body, /More/);
  assert.match(body, /Hjem › #kontakt/);
});

test('Pinned shows a block type\'s own settings first, then the shared ones', () => {
  const context = new Map([['urd-editor', handleFor(block('ribbon', { items: ['a'], motion: 'roll', speed: 80 }, {}))]]);
  const tree = parseHtml(render(ElementMenu, { props: { wide: true, query: '' }, context }).body);
  // The ribbon's own motion, with the speed that belongs to it drawn under it, then the shared fit and phone; the size can be pinned but is no default.
  assert.deepEqual(pinsIn(find(tree, (n) => hasClass(n, 'emenu-pinned'))[0]), ['ribbonMotion', 'speed', 'fit', 'phone']);
  assert.deepEqual(pinsIn(find(tree, (n) => hasClass(n, 'emenu-pinned-item'))[0]), ['ribbonMotion', 'speed'], 'the motion\'s own settings stand under it in Pinned');
});

/* A small walk of the rendered menu: the tags as a tree, so a test can ask what stands inside what. */
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

/** The rendered HTML as a tree of { tag, attrs, children, text }. */
function parseHtml(html) {
  const root = { tag: '#root', attrs: {}, children: [], text: '' };
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|([^<]+)/g;
  for (const m of html.matchAll(re)) {
    const top = stack[stack.length - 1];
    if (m[1]) {
      const at = stack.findLastIndex((n) => n.tag === m[1].toLowerCase());
      if (at > 0) stack.length = at;
    } else if (m[2]) {
      const attrs = {};
      for (const a of m[3].matchAll(/([^\s=>\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) attrs[a[1]] = a[2] ?? a[3] ?? a[4] ?? '';
      const node = { tag: m[2].toLowerCase(), attrs, children: [], text: '' };
      top.children.push(node);
      if (!m[4] && !VOID.has(node.tag)) stack.push(node);
    } else if (m[5]) {
      top.text += m[5];
    }
  }
  return root;
}
const hasClass = (node, name) => (node.attrs.class ?? '').split(/\s+/).includes(name);
/** Every node under `node` that `pick` takes, in document order. */
function find(node, pick, out = []) {
  for (const child of node.children) {
    if (pick(child)) out.push(child);
    find(child, pick, out);
  }
  return out;
}
/** The pin ids of the setting rows under `node`, in order. */
const pinsIn = (node) => (node ? find(node, (n) => n.attrs['data-pin'] !== undefined).map((n) => n.attrs['data-pin']) : []);
/** Whether a node holds anything a reader would see: words, a control, a picture. */
const holdsSomething = (node) => node.text.trim() !== '' || ['input', 'img', 'svg', 'button', 'textarea', 'select'].includes(node.tag) || node.children.some(holdsSomething);

/** The menu of a block, wide or narrow, as a tree, and its parts. */
function menuOf(type, props, wide) {
  const context = new Map([['urd-editor', handleFor(block(type, props, {}))]]);
  const tree = parseHtml(render(ElementMenu, { props: { wide, query: '' }, context }).body);
  const areas = find(tree, (n) => hasClass(n, 'emenu-area'));
  const pinned = find(tree, (n) => hasClass(n, 'emenu-pinned'))[0] ?? null;
  return { tree, areas, pinned };
}

const CORE_TYPES = Object.keys(BLOCKS).filter((type) => !type.startsWith('plugin-'));
/** The core blocks with designs drawn as the first rows of Style; the calendar draws its own three in its family. */
const DESIGN_TYPES = new Set(DESIGN_BLOCK_TYPES);

test('the menu frame: no fold left empty, no area holding an empty part, and no setting drawn twice, with Pinned as it starts, emptied, and holding every setting that can be pinned', () => {
  const css = readFileSync(new URL('../editor/src/app.css', import.meta.url), 'utf8');
  assert.match(css, /\.emenu-cols > \.emenu-col:not\(:has\(> :not\(\.panel-strong, \.emenu-none, \.emenu-head\)\)\)\s*\{\s*display: none;/, 'an area with only its heading is not drawn');
  for (const type of CORE_TYPES) {
    for (const props of BLOCKS[type]) {
      // Every setting that can stand in Pinned, read from the menu with nothing pinned.
      setQuickChoice(type, { pinned: [], removed: ['fit', 'phone', 'design', 'limit', 'align', 'textBox', 'goesTo', 'imgFit', 'radius', 'videoSource', 'iconSize', 'iconColor', 'shapeColor', 'thickness', 'columns', 'ribbonMotion', 'speed', 'tableLines', 'sendMode', 'vippsButton', 'seconds', 'loop', 'zoom'] });
      const all = [...new Set(pinsIn(menuOf(type, props, true).tree))];
      for (const choice of [NO_CHOICE, { pinned: [], removed: all }, { pinned: all, removed: [] }]) {
        setQuickChoice(type, choice);
        for (const wide of [true, false]) {
          const { tree, areas, pinned } = menuOf(type, props, wide);
          const where = `${type} ${JSON.stringify(props).slice(0, 40)} ${wide ? 'wide' : 'narrow'} ${JSON.stringify(choice)}`;
          const pins = pinsIn(tree);
          assert.deepEqual(pins.filter((id, i) => pins.indexOf(id) !== i), [], `${where}: a setting drawn twice`);
          if (choice.pinned === all) assert.deepEqual(all.filter((id) => !pinsIn(pinned).includes(id)), [], `${where}: every pinned setting stands in Pinned`);
          for (const fold of find(tree, (n) => n.tag === 'details')) {
            const items = find(fold, (n) => hasClass(n, 'group-items'))[0];
            const inside = items.children.filter((n) => !hasClass(n, 'menu-group-reset'));
            assert.ok(inside.some(holdsSomething), `${where}: the fold «${find(fold, (n) => hasClass(n, 'menu-group-title'))[0]?.text.trim()}» stands empty`);
          }
          for (const area of areas) {
            for (const part of area.children.filter((n) => !hasClass(n, 'emenu-head'))) assert.ok(holdsSomething(part), `${where}: an empty ${part.tag}.${part.attrs.class} in an area`);
          }
        }
      }
    }
    setQuickChoice(type, NO_CHOICE);
  }
});

test('the way into a block\'s own editor stands first in Content', () => {
  for (const [type, props, words] of [['text', {}, 'ui.editText'], ['image', { src: 'x', alt: '' }, 'ui.openImageEditor']]) {
    for (const wide of [true, false]) {
      const content = menuOf(type, props, wide).areas[0].children.filter((n) => !hasClass(n, 'emenu-head'));
      assert.equal(content[0]?.tag, 'button', `${type}: a button first in Content`);
      assert.match(content[0].text, new RegExp(words.replace('.', '\\.')), type);
    }
  }
});

test('a block with designs has its design row first in Style, or in Pinned while it is pinned there', () => {
  for (const type of CORE_TYPES) {
    for (const wide of [true, false]) {
      for (const choice of [NO_CHOICE, { pinned: [], removed: ['design'] }]) {
        setQuickChoice(type, choice);
        const { areas, pinned } = menuOf(type, BLOCKS[type][0], wide);
        const style = areas[1].children.filter((n) => !hasClass(n, 'emenu-head'));
        const inPinned = pinsIn(pinned).includes('design');
        if (!DESIGN_TYPES.has(type)) {
          assert.ok(!pinsIn({ children: style }).includes('design') && !inPinned || type === 'calendar', `${type}: no block design row`);
          continue;
        }
        if (inPinned) assert.ok(!pinsIn({ children: style }).includes('design'), `${type}: the design stands in Pinned, not again in Style`);
        else assert.equal(style[0]?.attrs['data-pin'], 'design', `${type} ${wide ? 'wide' : 'narrow'}: the design row first in Style`);
        assert.ok(inPinned || find({ children: [style[0]] }, (n) => hasClass(n, 'row-picture')).length === 1, `${type}: the design row is a picture row`);
      }
    }
    setQuickChoice(type, NO_CHOICE);
  }
});
