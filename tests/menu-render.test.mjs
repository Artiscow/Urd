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
const { capabilityOfPin, capability } = await import('../editor/src/menu/capabilities.js');
const { keepCapability, dropCapability } = await import('../editor/src/menu/capabilities.svelte.js');
const { default: CapabilityAdd } = await import('../editor/src/menu/CapabilityAdd.svelte');
const { default: ElementMenu } = await import('../editor/src/menu/ElementMenu.svelte');
const { default: FloatingMenu } = await import('../editor/src/menu/FloatingMenu.svelte');
const { setQuickChoice, setCapAddPref } = await import('../editor/src/menu/state.svelte.js');
const { NO_CHOICE } = await import('../editor/src/lib/quick-row.js');
const { DESIGN_BLOCK_TYPES } = await engineImport('block-designs.js');

const noop = () => {};

/** Props per block type: a plain block, and one with the settings that open the most controls. */
const BLOCKS = {
  text: [{}, { align: 'center', box: true, boxStyle: { shadow: 'soft', border: { color: 'accent', width: 2 } } }],
  button: [{ label: 'Go', style: 'primary', page: null, href: '#' }, { label: 'Go', style: 'secondary', page: 'hjem' }],
  image: [{ src: 'x', alt: '' }, { src: 'x', href: 'https://a', fit: 'contain', x: 0.2, radius: 'sm' }, { src: 'x', lightbox: true }],
  video: [{ source: 'embed', url: '' }, { source: 'file', src: 'x', muted: true, autoplay: true }, { source: 'embed', url: 'https://v', poster: 'p' }, { source: 'embed', url: 'https://v', askFirst: false }],
  icon: [{ glyph: '★' }, { icon: 'heart', image: 'data:x', size: 64, color: 'text' }],
  shape: [{ kind: 'line', color: 'accent', thickness: 2 }, { kind: 'circle', color: 'text', thickness: 4, fill: 'text' }],
  gallery: [{ images: [], view: 'grid' }, { images: [{ src: 'a' }, { src: 'b' }], view: 'ribbon', rows: 2, width: 'page' }, { images: [{ src: 'a' }], view: 'mosaic' }, { images: [{ src: 'a' }], view: 'polaroid', tilt: 0 }, { images: [], view: 'slides' }, { images: [{ src: 'a' }], view: 'carousel' }],
  ribbon: [{ items: ['a', 'b'] }, { items: ['a'], motion: 'step', sep: 'custom', above: 'marks', below: 'plain', variant: 'plain', width: 'content' }],
  calendar: [
    { sources: [] },
    { sources: ['https://x', { calendar: 'c1' }, { calendar: 'gone' }, { url: 'https://y', name: 'Y', color: '#fff' }], view: 'next', switcher: true, nextCount: 2, laterCount: 2 },
    { sources: [], design: 'bento', notice: { show: true, as: 'band', href: 'https://z' }, colors: { bg: '#000' }, stripe: { show: true, color: '#111' }, fieldStyle: { title: { bold: true, italic: true } }, options: {}, texts: { noticeTitle: 'A<br>B' } },
    { sources: [], view: 'agenda', showSearch: true, showEarlier: true, emptyIcon: 'none', emptyText: 'None', limit: 12, showMore: false, clock: '12', weekStart: 'mon', showSignup: true },
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
    pluginBlocks: [{ type: 'plugin-thing', defaults: { n: 2, on: false, sel: 'a' }, fields: [{ key: 'where', type: 'place', label: 'Where' }, { key: 'n', type: 'number', label: 'N', min: 1, max: 5 }, { key: 'on', type: 'toggle', label: 'On' }, { key: 'sel', type: 'select', label: 'S', options: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }] }, { key: 't', type: 'text', label: 'T' }, { key: 'more', type: 'link', label: 'More' }] }, { type: 'plugin-bare' }, { type: 'plugin-variant', defaults: { n: 2 }, variants: [{ label: 'Wide', props: { n: 4 } }], fields: [{ key: 'n', type: 'number', label: 'N', min: 1, max: 5 }] }],
    bridge: null,
    blockLabel: (t) => t,
    blockEntranceOptions: () => [['', 'None'], ['fade-in', 'Fade']],
    hoverOptions: () => [['', 'None'], ['lift', 'Lift']],
    isEntrance: (a) => a?.type === 'fade-in',
    themeSwatches: () => [['accent', '#7c5cff']],
    blockStarts: (type, flag) => ['shape', 'icon'].includes(type) && ['decor', 'hideMobile'].includes(flag),
    propStarts: (type, key) => (type === 'map' && key === 'zoom' ? 15 : undefined),
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

test('a small window names its tool with the bar\'s drawing and holds the way to the full menu, with no grip, and its design row leaves its way back to the head', () => {
  const context = new Map([['urd-editor', handleFor(block('calendar', { sources: [], design: 'bento' }, {}))]]);
  const small = render(FloatingMenu, { props: { pos: { left: 10, top: 10, only: 'look:design', title: 'Design', icon: 'design' } }, context }).body;
  const full = render(FloatingMenu, { props: { pos: { left: 10, top: 10 } }, context }).body;
  for (const body of [small, full]) assert.doesNotMatch(body, /block-menu-grip/, 'no grip: the head itself is held and dragged');
  assert.match(small, /class="block-menu-icon"[^>]*>(<!---->)?<svg/, 'the tool\'s drawing names the window');
  assert.match(small, /class="[^"]*menu-full/, 'the way to the full menu');
  assert.doesNotMatch(full, /menu-full|block-menu-icon/, 'the full menu has neither');
  const row = find(parseHtml(small), (n) => n.attrs['data-pin'] === 'design')[0];
  assert.ok(row && row.attrs['data-own'] !== undefined, 'the design row holds a design of its own');
  assert.ok(!row.children.some((c) => hasClass(c, 'setting-reset')), 'its way back stands in the head, not over the pictures');
});

test('«Extra settings» stands in a fold\'s foot in the full menu, under the rows, and a small window shows the whole group', () => {
  const fold = readFileSync(new URL('../editor/src/lib/rows/Fold.svelte', import.meta.url), 'utf8');
  assert.match(fold, /const menued = \$derived\([^\n]*&& !small\);/, 'a small window hides none of its group');
  const markup = fold.slice(fold.indexOf('<div class="group-items"'));
  assert.ok(markup.indexOf('{@render children()}') < markup.indexOf('class="menu-group-foot"'), 'the foot stands under the rows');
  const css = readFileSync(new URL('../editor/src/app.css', import.meta.url), 'utf8');
  const list = css.slice(css.indexOf('.menu-extra-list {'), css.indexOf('}', css.indexOf('.menu-extra-list {')));
  assert.ok(list && !/position:\s*absolute/.test(list), 'the list opens in place, pushing what follows down');
  // The list takes an added row away again: the row's own way back first, asked for by an event the row answers, then hidden.
  assert.match(fold, /onclick=\{\(\) => takeAway\(name\)\}/, 'an added row is listed to take away');
  assert.match(fold, /dispatchEvent\(new CustomEvent\('setting-back'\)\)[\s\S]*folds\.hide\(surface, id, name\)/, 'taken away: back to the standard, then hidden');
  assert.match(readFileSync(new URL('../editor/src/lib/rows/Setting.svelte', import.meta.url), 'utf8'), /addEventListener\('setting-back', back\)/, 'a setting row answers with its own way back');
  // A mouse resting on the chip opens the list; a touch does not (AGENTS.md, hybrid devices).
  assert.match(fold, /function hoverIn\(event\) \{\s*if \(event\.pointerType !== 'mouse'\) return;/);
});

test('a group that only switches something on stands as its switch alone until it is on', async () => {
  const noticeDesign = (await engineImport('calendar-designs.js')).CAL_DESIGNS.find((d) => d.notice).id;
  for (const [show, bare] of [[false, true], [true, false]]) {
    setQuickChoice('calendar', { pinned: [], removed: PIN_IDS });
    const context = new Map([['urd-editor', handleFor(block('calendar', { sources: [], design: noticeDesign, notice: { show } }, {}))]]);
    const tree = parseHtml(render(ElementMenu, { props: { wide: true, query: '' }, context }).body);
    setQuickChoice('calendar', NO_CHOICE);
    const fold = find(tree, (n) => n.attrs['data-fold'] === 'cal-notice')[0];
    assert.ok(fold, 'the announcement is drawn');
    assert.equal(hasClass(fold, 'bare'), bare, show ? 'on: a group of what it holds' : 'off: its switch alone');
  }
});

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
  // An open tag's attributes are one flat run of quoted strings and other characters up to the closing bracket, so no two parts of the pattern can take the same characters.
  const re = /<!--[\s\S]*?-->|<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^"'>])*)>|([^<]+)/g;
  for (const m of html.matchAll(re)) {
    const top = stack[stack.length - 1];
    if (m[1]) {
      const at = stack.findLastIndex((n) => n.tag === m[1].toLowerCase());
      if (at > 0) stack.length = at;
    } else if (m[2]) {
      const attrs = {};
      const selfClosing = /\/\s*$/.test(m[3]);
      const run = m[3].replace(/\/\s*$/, '');
      for (const a of run.matchAll(/([^\s=\/"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"']+)))?/g)) attrs[a[1]] = a[2] ?? a[3] ?? a[4] ?? '';
      const node = { tag: m[2].toLowerCase(), attrs, children: [], text: '' };
      top.children.push(node);
      if (!selfClosing && !VOID.has(node.tag)) stack.push(node);
    } else if (m[4]) {
      top.text += m[4];
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
  assert.match(css, /\.emenu-cols \.emenu-col:not\(:has\(> :not\(\.emenu-title, \.emenu-none, \.emenu-head\)\)\)\s*\{\s*display: none;/, 'an area with only its heading is not drawn');
  for (const type of CORE_TYPES) {
    for (const props of BLOCKS[type]) {
      // Every setting that can stand in Pinned, read from the menu with nothing pinned; each one Pinned can hold stands in an area then, or in a capability the block can add (ADR-0031), so no setting is lost from both.
      setQuickChoice(type, { pinned: [], removed: PIN_IDS });
      const all = [...new Set(pinsIn(menuOf(type, props, true).tree))];
      setQuickChoice(type, { pinned: PIN_IDS, removed: [] });
      const pinnable = pinsIn(menuOf(type, props, true).pinned);
      assert.deepEqual(pinnable.filter((id) => !all.includes(id) && !capabilityOfPin(id)), [], `${type} ${JSON.stringify(props).slice(0, 40)}: a setting Pinned can hold stands in no area`);
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
            const inside = items.children.filter((n) => !hasClass(n, 'menu-group-foot'));
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

/** The kind of control a setting row draws, as the owner sees and works it. */
function controlOf(node) {
  const all = find({ children: [node] }, () => true);
  const has = (pick) => all.some(pick);
  const cls = (n, c) => (n.attrs.class ?? '').split(/\s+/).includes(c);
  if (has((n) => cls(n, 'row-picture'))) return 'picture';
  if (has((n) => cls(n, 'link-field'))) return 'link';
  if (has((n) => n.tag === 'input' && n.attrs.type === 'checkbox')) return 'switch';
  if (has((n) => cls(n, 'choice'))) return 'segment';
  if (has((n) => cls(n, 'dd'))) return 'dropdown';
  if (has((n) => n.tag === 'input' && n.attrs.type === 'range')) return 'slider';
  if (has((n) => cls(n, 'step-field'))) return 'stepper';
  if (has((n) => n.tag === 'input' && n.attrs.type === 'number')) return 'number';
  if (has((n) => cls(n, 'cp'))) return 'colour';
  return 'other';
}

/** Every block type, core and plugin, its menu built from the row kit (0.7.30.4 and 0.7.30.5). */
const KIT_TYPES = Object.keys(BLOCKS);
const PIN_IDS = ['fit', 'phone', 'size', 'design', 'phoneDesign', 'phoneView', 'card', 'limit', 'subscribe', 'align', 'textBox', 'goesTo', 'imgFit', 'radius', 'videoSource', 'iconSize', 'iconColor', 'shapeColor', 'thickness', 'columns', 'ribbonMotion', 'speed', 'tableLines', 'sendMode', 'vippsButton', 'paypalButton', 'seconds', 'loop', 'zoom'];

test('a setting draws the same control with the same words, and the same way back, in Pinned as in its area', () => {
  const differ = [];
  for (const type of KIT_TYPES) {
    for (const props of BLOCKS[type]) {
      const kinds = (choice, inPinned) => {
        setQuickChoice(type, choice);
        const { areas, pinned } = menuOf(type, props, true);
        const where = inPinned ? [pinned].filter(Boolean) : areas;
        // A row's control and its words (its label, its options and its value), all but the dimmed default under a row in its area, and whether it shows its way back
        const wordsOf = (n) => (hasClass(n, 'setting-source') ? '' : `${n.text} ${n.children.map(wordsOf).join(' ')}`);
        const own = (n) => (n.children.some((c) => hasClass(c, 'setting-reset')) ? ' (own)' : '');
        return Object.fromEntries(where.flatMap((n) => find(n, (x) => x.attrs['data-pin'] !== undefined))
          .map((n) => [n.attrs['data-pin'], `${controlOf(n)}${own(n)}: ${wordsOf(n).replace(/\s+/g, ' ').trim()}`]));
      };
      const inAreas = kinds({ pinned: [], removed: PIN_IDS }, false);
      const inPinned = kinds({ pinned: Object.keys(inAreas), removed: [] }, true);
      for (const [id, kind] of Object.entries(inAreas)) {
        if (inPinned[id] && inPinned[id] !== kind) differ.push(`${type} «${id}»: ${kind} in its area, ${inPinned[id]} in Pinned`);
      }
    }
    setQuickChoice(type, NO_CHOICE);
  }
  assert.deepEqual([...new Set(differ)], []);
});

test('no fold holds one setting alone, with nothing pinned or with the defaults pinned; a list counts as many', () => {
  const alone = [];
  for (const type of KIT_TYPES) {
    for (const props of BLOCKS[type]) {
      for (const choice of [{ pinned: [], removed: PIN_IDS }, NO_CHOICE]) {
        setQuickChoice(type, choice);
        for (const viewMode of ['desktop', 'mobile']) {
          const context = new Map([['urd-editor', handleFor(block(type, props, {}), viewMode)]]);
          const tree = parseHtml(render(ElementMenu, { props: { wide: true, query: '' }, context }).body);
          for (const fold of find(tree, (n) => n.tag === 'details' && !hasClass(n, 'bare'))) {
            const items = find(fold, (n) => hasClass(n, 'group-items'))[0];
            const rows = items.children.filter((n) => !hasClass(n, 'menu-group-foot'));
            const list = find(items, (n) => hasClass(n, 'row-list')).length > 0;
            const title = find(fold, (n) => hasClass(n, 'menu-group-title'))[0]?.text.trim();
            // A setting with what belongs to it standing in its row (Setting.svelte) counts as each of the rows it holds, and the frame's grid as each of its numbers
            const seen = (n) => (hasClass(n, 'setting') ? find(n, (x) => hasClass(x, 'setting-body'))[0]?.children.length ?? 1 : hasClass(n, 'frame-grid') ? n.children.length : 1);
            if (!list && rows.reduce((sum, n) => sum + seen(n), 0) === 1) alone.push(`${type} ${JSON.stringify(props).slice(0, 40)} ${viewMode} ${choice === NO_CHOICE ? 'defaults' : 'none'} pinned: «${title}»`);
          }
        }
      }
    }
    setQuickChoice(type, NO_CHOICE);
  }
  assert.deepEqual([...new Set(alone)], [], 'folds of one setting');
});

/** The area every block keeps a shared setting in, by the key of its words: what happens on a press (the lightbox), what a visitor agrees to first (ask before loading) and the picture's editor in Content, the fonts in Style. */
const SETTING_AREA = {
  'lbl.lightbox': 0,
  'lbl.embedAskFirst': 0,
  'ui.openImageEditor': 0,
  'ui.quotePortraitEdit': 0,
  'ui.editCover': 0,
  'lbl.wholeFont': 1,
  'lbl.wholeSize': 1,
};

test('the lightbox, «Ask before loading» and the image editor stand in Content, and the fonts in Style, on every block that has them', () => {
  const seen = new Set();
  for (const type of KIT_TYPES) {
    for (const props of BLOCKS[type]) {
      setQuickChoice(type, { pinned: [], removed: PIN_IDS });
      const { areas } = menuOf(type, props, true);
      const textOf = (n) => n.text + n.children.map(textOf).join(' ');
      for (const [words, area] of Object.entries(SETTING_AREA)) {
        for (const [i, node] of areas.entries()) {
          if (!textOf(node).includes(words)) continue;
          seen.add(words);
          assert.equal(i, area, `${type}: «${words}» stands in ${['Content', 'Style', 'Placement'][i]}`);
        }
      }
    }
    setQuickChoice(type, NO_CHOICE);
  }
  assert.deepEqual([...seen].sort(), Object.keys(SETTING_AREA).sort(), 'every shared setting is reached by a fixture');
});

test('the way into a block\'s own editor stands first in Content, and a text, written on the page, has no Content in its menu', () => {
  for (const type of ['text', 'terms']) {
    setQuickChoice(type, { pinned: [], removed: PIN_IDS });
    const content = menuOf(type, BLOCKS[type][0], true).areas[0].children.filter((n) => !hasClass(n, 'emenu-head'));
    assert.deepEqual(content, [], `${type}: nothing in Content`);
    setQuickChoice(type, NO_CHOICE);
  }
  for (const [type, props, words] of [['image', { src: 'x', alt: '' }, 'ui.openImageEditor']]) {
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

test('the rows under a ribbon\'s motion hold their own value in Pinned as in the Motion fold', () => {
  const ownIn = (choice, inPinned) => {
    setQuickChoice('ribbon', choice);
    const { areas, pinned } = menuOf('ribbon', { items: ['a'], direction: 'right', pauseOnHover: false }, true);
    setQuickChoice('ribbon', NO_CHOICE);
    const where = inPinned ? [pinned].filter(Boolean) : areas;
    const rows = where.flatMap((n) => find(n, (x) => ['direction', 'pauseOnHover', 'fade'].includes(x.attrs['data-setting'])));
    return Object.fromEntries(rows.map((n) => [n.attrs['data-setting'], n.attrs['data-own'] !== undefined]));
  };
  const inFold = ownIn({ pinned: [], removed: PIN_IDS }, false);
  const inPinned = ownIn({ pinned: ['ribbonMotion'], removed: [] }, true);
  assert.deepEqual(inFold, { direction: true, pauseOnHover: true, fade: false }, 'in the Motion fold');
  assert.deepEqual(inPinned, inFold, 'in Pinned');
});

test('hiding on phones goes back to what the block type starts with: a shape starts hidden, a text shown', () => {
  // In Pinned the switch is a setting row that says whether it holds its own value; in Placement it is its capability's card of one line, in use where it differs from the type's start (ADR-0031).
  const phone = capability('phone');
  const ownOf = (type, hideMobile) => {
    setQuickChoice(type, { pinned: ['phone'], removed: [] });
    const handle = handleFor(block(type, type === 'shape' ? { kind: 'line' } : {}, { hideMobile, decor: type === 'shape' }));
    const context = new Map([['urd-editor', handle]]);
    const tree = parseHtml(render(ElementMenu, { props: { wide: true, query: '' }, context }).body);
    const row = find(tree, (n) => n.attrs['data-pin'] === 'phone')[0];
    setQuickChoice(type, NO_CHOICE);
    const inPinned = row ? row.attrs['data-own'] !== undefined : 'no row';
    assert.equal(phone.inUse(handle.selectedBlock, handle), inPinned, `${type} hidden ${hideMobile}: the capability in use as Pinned's row holds its own value`);
    return inPinned;
  };
  assert.equal(ownOf('shape', true), false, 'a shape hidden on phones holds its standard');
  assert.equal(ownOf('shape', false), true, 'a shape shown on phones holds its own value');
  assert.equal(ownOf('text', true), true, 'a text hidden on phones holds its own value');
  assert.equal(ownOf('text', false), false, 'a text shown on phones holds its standard');
});

test('the image\'s and the calendar\'s own capabilities stand as cards while the block uses them, and take no room before', () => {
  const cards = (type, props) => {
    setQuickChoice(type, { pinned: [], removed: PIN_IDS });
    const context = new Map([['urd-editor', handleFor(block(type, props, {}))]]);
    const tree = parseHtml(render(ElementMenu, { props: { wide: true, query: '' }, context }).body);
    setQuickChoice(type, NO_CHOICE);
    return find(tree, (n) => n.attrs['data-cap'] !== undefined).map((n) => n.attrs['data-cap']).filter((id) => /^(img|cal)-/.test(id)).sort();
  };
  assert.deepEqual(cards('image', { src: 'x' }), [], 'a picture with no link and no lightbox');
  assert.deepEqual(cards('image', { src: 'x', lightbox: true }), ['img-link']);
  assert.deepEqual(cards('calendar', { sources: [] }), [], 'a new calendar');
  assert.deepEqual(cards('calendar', { sources: [], view: 'list', switcher: true, clock: '12', showSearch: true, showSignup: true, stripe: { color: '#111111' } }),
    ['cal-colors', 'cal-filter', 'cal-signup', 'cal-switcher', 'cal-time']);
  // The groups they left neither count nor reset them.
  const calendar = readFileSync(new URL('../editor/src/menu/families/Calendar.svelte', import.meta.url), 'utf8');
  const groups = calendar.slice(calendar.indexOf('function calMenu()'), calendar.indexOf('</script>', calendar.indexOf('function calMenu()')));
  for (const key of ['switcher', 'switcherViews', 'clock', 'weekStart', 'showCategories', 'showSearch', 'showEarlier', 'showSignup', 'colors', 'stripe']) {
    assert.doesNotMatch(groups, new RegExp(`p\\.${key}\\b|[{,]\\s*${key}:`), `the groups leave ${key} to its card`);
  }
});

test('a one-switch capability is a card of one line whose chip is its switch', () => {
  keepCapability('b1', 'decor');
  setQuickChoice('text', { pinned: [], removed: PIN_IDS });
  const draw = (decor) => parseHtml(render(ElementMenu, { props: { wide: true, query: '' }, context: new Map([['urd-editor', handleFor(block('text', {}, { decor }))]]) }).body);
  for (const decor of [true, false]) {
    const card = find(draw(decor), (n) => n.attrs['data-cap'] === 'decor')[0];
    assert.ok(card && hasClass(card, 'cap-single'), 'the card stands, one line');
    const chip = find(card, (n) => hasClass(n, 'cap-chip'))[0];
    assert.equal(chip?.attrs['aria-checked'], String(decor), `the chip tells the switch, ${decor ? 'on' : 'off'}`);
    assert.equal(find(card, (n) => hasClass(n, 'cap-body')).length, 0, 'no rows under its line');
  }
  setQuickChoice('text', NO_CHOICE);
  dropCapability('b1', 'decor');
});

test('what belongs to the size and the fit stands under their line, in Placement and in Pinned', () => {
  const extra = { fit: 'shrink', fitMin: 0.5, size: 1.2 };
  const draw = (choice) => {
    setQuickChoice('text', choice);
    const context = new Map([['urd-editor', handleFor(block('text', {}, extra))]]);
    return parseHtml(render(ElementMenu, { props: { wide: true, query: '' }, context }).body);
  };
  const count = (node, name) => find(node, (n) => hasClass(n, name)).length;
  // In Placement, with the pins drawn: the size's text bounds and the fit's smallest scale stand in the row, under its line.
  const areas = draw({ pinned: [], removed: PIN_IDS });
  for (const [pin, control, part] of [['size', 'row-slider', 'frame-grid'], ['fit', 'choice', 'row-slider']]) {
    const row = find(areas, (n) => n.attrs['data-pin'] === pin)[0];
    assert.ok(row, `the ${pin} row is drawn`);
    const line = find(row, (n) => hasClass(n, 'pin-line'))[0];
    assert.ok(line, `the ${pin} row draws its pin`);
    assert.equal(count(line, control), 1, `the ${pin} row's line holds its control`);
    assert.equal(count(line, part), 0, `what belongs to ${pin} stands under the line, not in it`);
    assert.equal(count(row, part), 1, `what belongs to ${pin} stands in its row`);
  }
  // In Pinned: the pinned size brings its bounds and the pinned fit its smallest scale, each in its own row as in Placement.
  const pinned = find(draw({ pinned: ['size', 'fit'], removed: [] }), (n) => hasClass(n, 'emenu-pinned'))[0];
  assert.ok(pinned, 'Pinned is drawn');
  assert.equal(count(pinned, 'frame-grid'), 1, 'the size\'s bounds stand in Pinned');
  assert.equal(count(pinned, 'row-slider'), 2, 'the size\'s slider and the fit\'s smallest scale stand in Pinned');
  for (const [pin, part] of [['size', 'frame-grid'], ['fit', 'row-slider']]) {
    const row = find(pinned, (x) => x.attrs['data-pin'] === pin)[0];
    assert.equal(count(row, part), 1, `what belongs to ${pin} stands in its row in Pinned`);
  }
  setQuickChoice('text', NO_CHOICE);
});


/**
 * The rows that stand as plain rows by rule, with no way back, by the block type (or any, `*`) and the key of their words or of their tooltip: the frame's numbers and sizes, a block's kind, the content a block shows, a picker of what the rows below it edit, and a swatch grid whose swatches clear themselves.
 */
const PLAIN_ROWS = {
  '* frame.x': 'the frame', '* frame.y': 'the frame', '* frame.w': 'the frame', '* frame.h': 'the frame', '* frame.z': 'the frame', '* frame.rot': 'the frame',
  'gallery lbl.ribbonHeight': 'the band\'s height is its frame\'s',
  'shape lbl.length': 'a line\'s length is its frame\'s width',
  'shape lbl.sizePx': 'a shape\'s size is its frame',
  'calendar lbl.view': 'the calendar\'s kind',
  'calendar tip.calendar.fieldStyle': 'chooses the field the rows under it style',
  'calendar tip.calendar.useSource': 'the site\'s calendars this block shows, the content it shows',
  'calendar tip.calendar.slot': 'the colour slots, each swatch clearing back to the design\'s colour',
  'collection blocks.collection': 'the content the block shows',
  'product blocks.collection': 'the content the block shows',
};

test('every control in a block\'s menu stands in a setting row, but for a list and the rows plain by rule', () => {
  const wordsOf = (n) => `${n.text} ${n.children.map(wordsOf).join(' ')}`.replace(/\s+/g, ' ').trim();
  const kindOf = (n) => {
    if (n.tag === 'input' && n.attrs.type === 'checkbox') return 'switch';
    if (hasClass(n, 'choice')) return 'segment';
    if (hasClass(n, 'dd')) return 'dropdown';
    if (n.tag === 'input' && n.attrs.type === 'range') return 'slider';
    if (hasClass(n, 'step-field')) return 'stepper';
    if (n.tag === 'input' && n.attrs.type === 'number') return 'number';
    if (hasClass(n, 'cp')) return 'colour';
    if (hasClass(n, 'row-picture') || hasClass(n, 'look-choice')) return 'picker';
    if (n.tag === 'button' && n.attrs['aria-pressed'] !== undefined) return 'toggle';
    if (n.attrs.role === 'switch') return 'switch';
    return null;
  };
  const ROWS = ['row-switch', 'choice', 'row-select', 'row-slider', 'ctl-row', 'field-stack', 'cal-slot'];
  const loose = new Set();
  // A list's rows are what the owner writes and orders, so the walk leaves a list alone.
  const walk = (n, inside, row, type) => {
    if (hasClass(n, 'row-list')) return;
    // A one-switch capability's card is its setting row, with its way back (lib/rows/Capability.svelte).
    const here = inside || hasClass(n, 'setting') || hasClass(n, 'cap-single');
    const rowHere = n.tag === 'label' || ROWS.some((c) => hasClass(n, c)) ? n : row;
    const kind = kindOf(n);
    if (!kind) {
      for (const c of n.children) walk(c, here, rowHere, type);
      return;
    }
    if (here) return;
    const named = rowHere ?? n;
    const keys = [wordsOf(named).split(' ')[0], (named.attrs.title ?? find(named, (x) => x.attrs.title !== undefined)[0]?.attrs.title ?? '').split(/\s/)[0]];
    if (!keys.some((key) => PLAIN_ROWS[`* ${key}`] || PLAIN_ROWS[`${type} ${key}`])) loose.add(`${type}: ${kind} «${wordsOf(named).slice(0, 60)}»`);
  };
  for (const type of KIT_TYPES) {
    for (const props of BLOCKS[type]) {
      for (const extra of PLACEMENTS) {
        setQuickChoice(type, { pinned: [], removed: PIN_IDS });
        const context = new Map([['urd-editor', handleFor(block(type, props, extra))]]);
        walk(parseHtml(render(ElementMenu, { props: { wide: true, query: '' }, context }).body), false, null, type);
      }
    }
    setQuickChoice(type, NO_CHOICE);
  }
  assert.deepEqual([...loose].sort(), [], 'controls outside a setting row');
});

test('a plugin block\'s and the map\'s fields go back to what the block starts with', () => {
  const resets = (type, props) => {
    setQuickChoice(type, { pinned: [], removed: PIN_IDS });
    const { areas } = menuOf(type, props, true);
    setQuickChoice(type, NO_CHOICE);
    return areas.flatMap((a) => find(a, (n) => hasClass(n, 'setting') && n.attrs['data-own'] !== undefined))
      .map((n) => n.attrs['data-setting'] ?? (find(n, (x) => hasClass(x, 'row-label') || hasClass(x, 'row-switch'))[0] ? wordsOf(n).split(' ')[0] : ''))
      .filter((w) => ['N', 'On', 'S', 'zoom', 'lbl.mapZoom'].includes(w)).sort();
  };
  const wordsOf = (n) => `${n.text} ${n.children.map(wordsOf).join(' ')}`.replace(/\s+/g, ' ').trim();
  assert.deepEqual(resets('plugin-thing', { n: 2, on: false, sel: 'a' }), [], 'a plugin block at its defaults');
  assert.deepEqual(resets('plugin-thing', { n: 3, on: true, sel: 'a' }), ['N', 'On'], 'a plugin block with a number and a switch of its own');
  assert.deepEqual(resets('plugin-thing', { n: 2, on: false, sel: 'b' }), ['S'], 'a plugin block with a choice of its own');
  assert.deepEqual(resets('plugin-variant', { n: 4 }), [], 'a field its variants start differently has no standard');
  assert.deepEqual(resets('map', { location: 'Oslo', zoom: 15 }), [], 'a map at its zoom');
  assert.deepEqual(resets('map', { location: 'Oslo', zoom: 12 }).length, 1, 'a map with a zoom of its own');
});

test('a switch is its own way back: its row draws no reset, and still says it holds its own value', () => {
  setQuickChoice('plugin-thing', { pinned: [], removed: PIN_IDS });
  const { areas } = menuOf('plugin-thing', { n: 3, on: true, sel: 'a' }, true);
  setQuickChoice('plugin-thing', NO_CHOICE);
  const rows = areas.flatMap((a) => find(a, (n) => hasClass(n, 'setting') && n.attrs['data-own'] !== undefined));
  const switched = rows.filter((n) => find(n, (x) => hasClass(x, 'row-switch')).length);
  const others = rows.filter((n) => !find(n, (x) => hasClass(x, 'row-switch')).length);
  assert.ok(switched.length && others.length, 'the block holds a switch and a number of its own');
  for (const row of switched) assert.ok(!row.children.some((c) => hasClass(c, 'setting-reset')), 'a switch\'s row draws no reset');
  for (const row of others) assert.ok(row.children.some((c) => hasClass(c, 'setting-reset')), 'another row draws its reset');
});

test('a capability\'s card stands while the block uses it or took it, in the search\'s copy and in its tool\'s panel, and nowhere else', () => {
  const draw = (props, extra = {}, menuProps = {}) => {
    setQuickChoice('text', { pinned: [], removed: PIN_IDS });
    const context = new Map([['urd-editor', handleFor(block('text', props, extra))]]);
    const tree = parseHtml(render(ElementMenu, { props: { wide: true, query: '', ...menuProps }, context }).body);
    setQuickChoice('text', NO_CHOICE);
    const card = (id) => find(tree, (n) => n.attrs['data-cap'] === id)[0] ?? null;
    return { card, takes: (id) => Boolean(card(id) && find(card(id), (n) => hasClass(n, 'cap-remove')).length) };
  };
  // Not used and not taken: no card, no room.
  const bare = draw({});
  for (const id of ['motion', 'text-box', 'sticky', 'link-target', 'decor', 'phone']) assert.equal(bare.card(id), null, `${id}: no card on a block that does not use it`);
  // In use: its card, with the way back.
  const used = draw({ box: true }, { animation: { type: 'fade-in', props: { duration: 600 } }, sticky: { offset: 16, until: null }, anchor: 'priser', decor: true });
  for (const id of ['motion', 'text-box', 'sticky', 'link-target', 'decor']) assert.ok(used.takes(id), `${id}: a card with its way back while in use`);
  // Taken this session but holding nothing yet: its card stays.
  keepCapability('b1', 'motion');
  assert.ok(draw({}).takes('motion'), 'a capability taken this session stands before it holds a value');
  dropCapability('b1', 'motion');
  // The search's copy draws every capability, so its settings are found where they stand, with no way back on one the block has not taken.
  const found = draw({}, {}, { query: 'motion' });
  assert.ok(found.card('motion') && !found.takes('motion'), 'the search finds the motion\'s settings in a block without motion');
  // A tool's small panel opens its capability whether the block uses it or not, and no other.
  const panel = draw({}, {}, { only: 'fold:motion' });
  assert.ok(panel.card('motion'), 'the bar\'s Motion opens the motion\'s card');
  assert.equal(panel.card('decor'), null, 'a small panel draws no other capability');
});

test('«Extra settings style» draws one way to add at a time: the head\'s «+», chips at an area\'s foot, or an area\'s add button, each with the area\'s own', () => {
  const draw = (props = {}) => {
    const context = new Map([['urd-editor', handleFor(block('text', {}))]]);
    return parseHtml(render(CapabilityAdd, { context, props }).body);
  };
  const named = (tree, cls) => find(tree, (n) => hasClass(n, cls));
  const offeredIn = (tree) => find(tree, (n) => n.attrs?.['data-cap-add']).map((n) => n.attrs['data-cap-add']);
  try {
    // The head by default: its «+» and no area's.
    assert.equal(named(draw(), 'cap-add-head').length, 1);
    assert.equal(named(draw({ form: 'chips', area: 'style' }), 'cap-add-chip').length, 0, 'no chips while the head is chosen');
    // Chips: the area's own capabilities named at its foot, each added at a press, its line in its tooltip; the head draws none.
    setCapAddPref('chips');
    assert.equal(named(draw(), 'cap-add-head').length, 0, 'no «+» in the head while the chips are chosen');
    const style = draw({ form: 'chips', area: 'style' });
    assert.deepEqual(offeredIn(style), ['motion'], 'the text\'s Style takes motion; its box stands in Pinned, which holds it');
    assert.ok(named(style, 'cap-add-chip').every((chip) => chip.attrs.title), 'each chip says what it does');
    assert.ok(!offeredIn(draw({ form: 'chips', area: 'placement' })).includes('motion'), 'an area offers only its own');
    // The add button: one dashed line per area that names the area, and opens its list; no title, since it opens on hover.
    setCapAddPref('button');
    const button = named(draw({ form: 'button', area: 'placement' }), 'cap-add-btn');
    assert.equal(button.length, 1);
    assert.equal(button[0].attrs.title, undefined, 'a button that opens on hover has no tooltip');
    assert.equal(named(draw({ form: 'chips', area: 'placement' }), 'cap-add-chip').length, 0);
  } finally {
    setCapAddPref('head');
  }
  // A list near the window's foot opens upward where there is more room above, so it never runs past the window.
  const add = readFileSync(new URL('../editor/src/menu/CapabilityAdd.svelte', import.meta.url), 'utf8');
  assert.match(add, /const up = wanted > below && above > below;/);
  assert.match(add, /if \(form === 'button'\) node\.style\.width = `\$\{r\.width\}px`;/, 'an area\'s list as wide as its area');
  assert.match(add, /node\.style\.maxHeight = `min\(64vh, 30rem, \$\{room\}px\)`;\s*node\.style\.top = `\$\{up \? r\.top - 4 - node\.offsetHeight : r\.bottom \+ 4\}px`;/, 'never taller than its style allows, and above its opener by its real height');
  assert.match(add, /window\.addEventListener\('scroll', away, true\);/, 'placed again as the menu under it scrolls');
  // The element menu's own areas end with the way to add; the small panels, the search's copy and a section's menu never draw it.
  const element = readFileSync(new URL('../editor/src/menu/ElementMenu.svelte', import.meta.url), 'utf8');
  assert.equal((element.match(/counts=\{layout === 'narrow'\} adds>/g) ?? []).length, 3);
  assert.doesNotMatch(readFileSync(new URL('../editor/src/section/SectionMenu.svelte', import.meta.url), 'utf8'), /<MenuArea[^>]*\badds\b/);
});

test('the menu\'s head offers what the block can take, and nothing when the block can take nothing more', () => {
  const offers = (type, props, extra = {}) => {
    const context = new Map([['urd-editor', handleFor(block(type, props, extra))]]);
    return parseHtml(render(CapabilityAdd, { context }).body);
  };
  const plus = find(offers('text', {}), (n) => hasClass(n, 'cap-add-head'));
  assert.equal(plus.length, 1, 'a new text block can take capabilities');
  // The «+» opens its list under a resting mouse, so it has its name and no tooltip, its empty title keeping the floating menu head's from reaching it; a touch is no hover.
  assert.equal(plus[0].attrs.title, '', 'a menu that opens on hover shows no tooltip, nor its head\'s');
  assert.ok(plus[0].attrs['aria-label'], 'the «+» is named for a screen reader');
  const add = readFileSync(new URL('../editor/src/menu/CapabilityAdd.svelte', import.meta.url), 'utf8');
  for (const fn of ['hoverIn', 'hoverOut']) assert.match(add, new RegExp(`function ${fn}\\(event\\) \\{\\s*if \\(event\\.pointerType !== 'mouse'\\) return;`), fn);
  const full = offers('text', { box: true }, { animation: { type: 'fade-in', props: {} }, sticky: { offset: 16, until: null }, anchor: 'priser', decor: true, hideMobile: true });
  assert.equal(find(full, (n) => hasClass(n, 'cap-add-head')).length, 0, 'a block that uses every capability is offered none');
  // Delete in the head draws a bin, never the cross that closes things.
  assert.match(readFileSync(new URL('../editor/src/menu/BlockActions.svelte', import.meta.url), 'utf8'), /<IconButton icon=\{ICONS\.bin\} danger label=\{ta\('canvas\.ctx\.delete'\)\}/);
});
