/**
 * The capabilities of the element menu (editor/src/menu/capabilities.js, ADR-0031): each one's way back takes the block to the standard, so the capability is no longer in use;
 * adding a switch-like one turns it on; the name for links goes only while no link reaches the block by it; and every capability is named and described in the three core dictionaries.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';
import { readFileSync } from 'node:fs';
import { engineImport } from './_engine.mjs';
register('./_svelte-loader.mjs', import.meta.url);

const { CAPABILITIES, capability, carries, capabilityOfPin } = await import('../editor/src/menu/capabilities.js');
const ELEMENT_MENU = readFileSync(new URL('../editor/src/menu/ElementMenu.svelte', import.meta.url), 'utf8');
const DICTS = Object.fromEntries(await Promise.all(['nb', 'en-GB', 'tr'].map(async (lang) => [lang, (await engineImport(`locales/admin/${lang}.js`)).default.strings])));

/** A stand-in editor handle that writes straight into one block, as the page's setters do. */
function standIn(block, extra = {}) {
  return {
    viewMode: 'desktop',
    blockStarts: (type, flag) => ['shape', 'icon'].includes(type) && ['decor', 'hideMobile'].includes(flag),
    isEntrance: (a) => a?.type === 'fade-in',
    setBlockProp: (key, value) => { block.props[key] = value; },
    setBlockProps: (name, patch) => { Object.assign(block.props, patch); },
    setBlockAnimation: (type) => { block.animation = type ? { type, props: {} } : null; },
    setBlockHover: (type) => { block.hover = type ? { type } : null; },
    setBlockHideMobile: (on) => { block.hideMobile = on; },
    setBlockDecor: (on) => { block.decor = on; },
    setBlockAnchor: (name) => { if (name) block.anchor = name; else delete block.anchor; },
    setBlockLink: (link) => {
      for (const key of ['href', 'page', 'target', 'newTab', 'rel', 'download']) delete block.props[key];
      if (link) Object.assign(block.props, link);
    },
    mutateBlock: (key, fn) => fn(block),
    store: { data: { sections: [] } },
    pageId: 'hjem',
    pageEntry: () => ({ path: '/' }),
    siteDraft: null,
    ...extra,
  };
}
const fresh = (type = 'text') => ({ blockId: 'b1', sectionId: 's1', type, props: {}, decor: false, hideMobile: false, animation: null, hover: null, sticky: null });

/** A block using each capability, as the owner leaves it. */
const IN_USE = {
  'text-box': (b) => { b.props.box = true; b.props.boxStyle = { shadow: 'soft' }; },
  motion: (b) => { b.animation = { type: 'fade-in', props: {} }; b.hover = { type: 'lift' }; },
  phone: (b) => { b.hideMobile = true; },
  sticky: (b) => { b.sticky = { offset: 16, until: null }; },
  'link-target': (b) => { b.anchor = 'priser'; },
  decor: (b) => { b.decor = true; },
  'img-link': (b) => { b.props.href = 'https://example.com'; b.props.newTab = true; },
  'cal-switcher': (b) => { b.props.switcher = true; b.props.switcherViews = { week: 'weekRows' }; },
  'cal-time': (b) => { b.props.clock = '12'; b.props.weekStart = 'mon'; },
  'cal-filter': (b) => { b.props.showCategories = true; b.props.showSearch = true; b.props.showEarlier = true; },
  'cal-signup': (b) => { b.props.showSignup = true; },
  'cal-colors': (b) => { b.props.colors = { bg: '#000000' }; b.props.stripe = { color: '#111111' }; },
  'cal-fields': (b) => { b.props.fieldStyle = { title: { size: 18, bold: true } }; },
  'btn-colours': (b) => { Object.assign(b.props, { bg: 'text', color: '#ffffff', borderColor: 'accent', hoverBg: 'surface' }); },
  'ribbon-stripes': (b) => { Object.assign(b.props, { above: 'marks', below: 'plain', main: 'marks', aboveColor: 'accent', thickness: 12, stripePlace: 'edge' }); },
};

test('every capability has a block in use to test, an area, a drawing and pins that name Pinned rows', () => {
  assert.deepEqual(CAPABILITIES.map((cap) => cap.id).sort(), Object.keys(IN_USE).sort());
  assert.equal(new Set(CAPABILITIES.map((cap) => cap.id)).size, CAPABILITIES.length, 'every id once');
  for (const cap of CAPABILITIES) {
    assert.ok(['content', 'style', 'placement'].includes(cap.area), cap.id);
    assert.ok(cap.icon, cap.id);
    for (const pin of cap.pins) {
      assert.equal(capabilityOfPin(pin), cap, `${cap.id}: the pin ${pin} is its own`);
      assert.match(ELEMENT_MENU, new RegExp(`items\\.push\\(\\{ id: '${pin}'`), `${cap.id}: the pin ${pin} is one of Pinned's rows`);
    }
  }
});

test('the way back takes every capability out of use, and adding a switch-like one puts it in use', () => {
  for (const cap of CAPABILITIES) {
    const type = cap.types?.[0] ?? 'text';
    const block = fresh(type);
    const ed = standIn(block);
    assert.equal(cap.inUse(block, ed), false, `${cap.id}: a new block does not use it`);
    IN_USE[cap.id](block);
    assert.equal(cap.inUse(block, ed), true, `${cap.id}: in use`);
    cap.clear(ed, block);
    assert.equal(cap.inUse(block, ed), false, `${cap.id}: the way back takes it out of use`);
    if (cap.add) {
      cap.add(ed, block);
      assert.equal(cap.inUse(block, ed), true, `${cap.id}: adding it puts it in use`);
    }
  }
  // A shape starts hidden on phones and as decor: adding those switches them on, which they already are, so the shape stays as it was, and taking them back keeps it so.
  const shape = { ...fresh('shape'), decor: true, hideMobile: true };
  const ed = standIn(shape);
  for (const [id, flag] of [['phone', 'hideMobile'], ['decor', 'decor']]) {
    assert.equal(capability(id).inUse(shape, ed), false, `${id}: a new shape holds its standard`);
    capability(id).add(ed, shape);
    assert.equal(shape[flag], true, `${id}: adding it switches it on, as the list says`);
    shape[flag] = false;
    capability(id).clear(ed, shape);
    assert.equal(shape[flag], true, `${id}: the way back is the shape's standard`);
  }
});

test('a one-switch capability\'s switch sets what it holds', () => {
  for (const cap of CAPABILITIES.filter((c) => c.single)) {
    const block = fresh();
    const ed = standIn(block);
    cap.single.set(ed, true);
    assert.equal(cap.single.value(block, ed), true, `${cap.id}: on`);
    cap.single.set(ed, false);
    assert.equal(cap.single.value(block, ed), false, `${cap.id}: off`);
  }
});

test('a capability stands only on the blocks and in the views that carry it', () => {
  const ed = standIn(fresh());
  assert.equal(carries(capability('text-box'), fresh('text'), ed), true);
  assert.equal(carries(capability('text-box'), fresh('image'), ed), false, 'the box is the text block\'s');
  assert.equal(carries(capability('sticky'), fresh(), ed), true);
  assert.equal(carries(capability('sticky'), fresh(), { ...ed, viewMode: 'mobile' }), false, 'pinning while scrolling is the desktop\'s');
  // A block's own capabilities stand on its type alone, and the view switcher on the views that list what is coming.
  assert.equal(carries(capability('img-link'), fresh('image'), ed), true);
  assert.equal(carries(capability('img-link'), fresh('calendar'), ed), false);
  const calendar = (props) => ({ ...fresh('calendar'), props });
  assert.equal(carries(capability('cal-switcher'), calendar({ view: 'list' }), ed), true);
  assert.equal(carries(capability('cal-switcher'), calendar({ view: 'month' }), ed), false, 'a month has no switcher');
  assert.equal(carries(capability('cal-colors'), calendar({}), ed), true);
});

test('an image\'s link and click is in use with a link or with the lightbox alone, and its way back takes both away', () => {
  const cap = capability('img-link');
  const block = { ...fresh('image'), props: { lightbox: true } };
  const ed = standIn(block);
  assert.equal(cap.inUse(block, ed), true, 'the lightbox alone');
  block.props = { newTab: true, rel: 'nofollow' };
  assert.equal(cap.inUse(block, ed), false, 'a new tab or a rel with no address is no link');
  block.props = { page: 'om-oss', lightbox: true };
  cap.clear(ed, block);
  assert.equal(cap.inUse(block, ed), false);
  assert.equal(block.props.page, undefined);
  assert.equal(block.props.lightbox, false);
});

test('a calendar\'s capability counts only what its card shows in the calendar\'s view and design', async () => {
  const calendar = (props) => ({ ...fresh('calendar'), props });
  const inUse = (id, props) => { const b = calendar(props); return capability(id).inUse(b, standIn(b)); };
  assert.equal(inUse('cal-filter', { view: 'list', showEarlier: true }), true);
  assert.equal(inUse('cal-filter', { view: 'month', showEarlier: true }), false, 'a month offers no earlier events');
  assert.equal(inUse('cal-time', { view: 'month', weekStart: 'mon' }), true);
  assert.equal(inUse('cal-time', { view: 'list', weekStart: 'mon' }), false, 'a list draws no weeks');
  assert.equal(inUse('cal-time', { view: 'list', weekStart: 'mon', switcher: true }), true, 'unless its switcher turns it to the week');
  const { calDesign } = await engineImport('calendar-designs.js');
  const slot = calDesign(undefined).slots[0].key;
  assert.equal(inUse('cal-colors', { colors: { [slot]: '#000000' } }), true);
  assert.equal(inUse('cal-colors', { colors: { notASlot: '#000000' } }), false, 'a colour the design has no slot for');
});

test('the calendar\'s filter and search does not count a design\'s own calendar switches', async () => {
  const { CAL_DESIGNS } = await engineImport('calendar-designs.js');
  const own = CAL_DESIGNS.find((d) => d.ownFilter);
  assert.ok(own, 'a design draws its own calendar switches');
  const cap = capability('cal-filter');
  const block = { ...fresh('calendar'), props: { design: own.id, showCategories: true } };
  assert.equal(cap.inUse(block, standIn(block)), false, 'its chips are the design\'s, not the block\'s');
  block.props.showSearch = true;
  assert.equal(cap.inUse(block, standIn(block)), true);
});

test('the name for links goes only while no link reaches the block by it', () => {
  const cap = capability('link-target');
  const block = { ...fresh(), anchor: 'priser' };
  const page = (href) => ({ sections: [{ id: 's1', blocks: [block, { id: 'b2', type: 'button', props: { label: 'Til', href } }] }] });
  assert.equal(cap.removable(block, standIn(block, { store: { data: page('#priser') } })), false, 'a link by the name keeps it');
  assert.equal(cap.removable(block, standIn(block, { store: { data: page('#b1') } })), true, 'a link by the block\'s id lands without the name');
  assert.equal(cap.removable(block, standIn(block, { store: { data: page('https://example.com') } })), true);
});

test('every capability is named and described in nb, en-GB and tr, with the words to add and take away', () => {
  for (const [lang, dict] of Object.entries(DICTS)) {
    for (const cap of CAPABILITIES) {
      assert.ok(dict[`cap.${cap.id}`], `${lang}: cap.${cap.id}`);
      assert.ok(dict[`cap.about.${cap.id}`], `${lang}: cap.about.${cap.id}`);
    }
    for (const key of ['cap.add', 'cap.remove', 'cap.linked', 'cap.taken']) assert.ok(dict[key], `${lang}: ${key}`);
    assert.match(dict['cap.remove'], /\{name\}/, `${lang}: cap.remove names the capability`);
  }
});
