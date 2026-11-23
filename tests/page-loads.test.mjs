/**
 * Every template page loads only what its site and page hold (ADR-0036): the boot's closure, and beside it the modules and sheets of the types, features and design parts it holds.
 * The loads are modelled from the engine's own loaders, readying and conditions and the page's data, as a visitor's page asks for them, and each page is held to its list.
 * A module or sheet a change brings to a template page fails here until its list takes it in, so the review sees what the page now loads and why.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE_DIR, engineClosure, engineImport, calendarSheets, stripComments } from './_engine.mjs';

// A head the readied parts place their sheets in, each answering as loaded.
globalThis.document ??= {
  createElement: () => ({ dataset: {}, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; } }),
  head: { querySelector: () => null, querySelectorAll: () => [], appendChild: (link) => link.listeners.load?.() },
};
const { CORE_BLOCKS, CORE_BACKGROUNDS, BLOCK_ALIASES, CORE_BLOCK_READY, CORE_BLOCK_PARTS, pageBlocks } = await engineImport('core-types.js');
const { CORE_FEATURES, siteFeatures, pageFeatures } = await engineImport('features.js');
const { pageTypes } = await engineImport('plugins.js');
const { liftPageFile, liftSiteFile } = await engineImport('migrate.js');
const { loadDocs } = await engineImport('blocks/text.js');
const { loadContactMap } = await engineImport('blocks/contact.js');
const { loadRibbonView } = await engineImport('blocks/gallery.js');
const { calendarParts, DESIGN_MODULES, designModules } = await engineImport('blocks/calendar-load.js');
const { loadCard } = await engineImport('blocks/calendar.js');
const calendarDesigns = await engineImport('calendar-designs.js');

const TEMPLATE = new URL('../template/', import.meta.url);
const read = (path) => stripComments(readFileSync(new URL(path, ENGINE_DIR), 'utf8'));
const boot = engineClosure('boot.js');
const closure = (...modules) => modules.flatMap((module) => [...engineClosure(module)]);
const CALENDAR_SHEETS = Object.fromEntries(calendarSheets().map(({ name, file }) => [name, file]));

/** The modules a piece of code asks for, with what they import, and the sheets it names: by a loader's sheet names, loadBlockSheet, loadEngineSheet or the calendar's loadSheet. */
function asked(code, folder = '') {
  const text = String(code);
  const modules = [...text.matchAll(/import\(\s*'(\.\.?\/[^']+)'\s*\)/g)].map(([, path]) => new URL(path, `file:///e/${folder}`).pathname.slice(3));
  const named = [...text.matchAll(/(?:withSheets?\([\s\S]*?\)|loadBlockSheet\(|loadEngineSheet\(|loadSheet\()((?:\s*,?\s*'[\w.-]+')+)/g)].flatMap(([, list]) => [...list.matchAll(/'([\w.-]+)'/g)].map(([, name]) => name));
  const sheets = named.map((name) => (name.endsWith('.css') ? name : CALENDAR_SHEETS[name] && /loadSheet\(/.test(text) && !/loadBlockSheet\(/.test(text) ? CALENDAR_SHEETS[name] : `blocks/${name}.css`));
  return [...closure(...modules), ...sheets];
}

/** The basket's drawer, which nav.js loads with the cart block's sheet as a menu with a basket is drawn. */
const DRAWER = read('nav.js').match(/const drawerReady = Promise\.all\(\[[^\]]*\]\)/)[0];

/** What a block readies before its page is drawn beyond its type's module (CORE_BLOCK_READY), by the engine's own readying; one hidden on both screens readies nothing. */
async function readied(block, site) {
  if (block.hideDesktop && block.hideMobile) return [];
  const type = CORE_BLOCK_READY[block.type] ? block.type : BLOCK_ALIASES[block.type];
  if (type === 'calendar') {
    const designs = designModules(calendarDesigns, block.props ?? {}).filter(Boolean).flatMap((name) => [...asked(DESIGN_MODULES[name], 'blocks/'), ...(CALENDAR_SHEETS[name] ? [CALENDAR_SHEETS[name]] : [])]);
    // The event card comes once the page is idle (cardWhenIdle in blocks/calendar.js).
    return [...asked(calendarParts, 'blocks/'), ...designs, ...asked(loadCard, 'blocks/')];
  }
  if (!type) return [];
  const ready = await CORE_BLOCK_READY[type]();
  if (!ready(block.props ?? {}, { site, preview: false }) ) return [];
  const loader = { text: loadDocs, terms: loadDocs, contact: loadContactMap, gallery: loadRibbonView }[type];
  return asked(loader, 'blocks/');
}

const site = liftSiteFile(JSON.parse(readFileSync(new URL('content/site.json', TEMPLATE), 'utf8')));

/** What a visitor's page holds, and what it loads beyond the boot's closure, as the boot, the loaders and the readying ask for it. */
async function pageLoad(entry) {
  const page = liftPageFile(JSON.parse(readFileSync(new URL(entry.file, TEMPLATE), 'utf8')), site);
  const blocks = new Set();
  const backgrounds = new Set();
  for (const part of [site.nav, site.footer, page]) {
    const types = pageTypes(part);
    for (const type of types.blocks) if (CORE_BLOCKS[type] ?? CORE_BLOCKS[BLOCK_ALIASES[type]]) blocks.add(type);
    for (const type of types.backgrounds) if (CORE_BACKGROUNDS[type]) backgrounds.add(type);
  }
  const features = new Set([...siteFeatures(site, entry.id), ...pageFeatures(page, site)]);
  const files = [
    ...[...blocks].flatMap((type) => asked(CORE_BLOCKS[type] ?? CORE_BLOCKS[BLOCK_ALIASES[type]])),
    ...[...backgrounds].flatMap((type) => asked(CORE_BACKGROUNDS[type])),
    ...[...features].flatMap((name) => asked(CORE_FEATURES[name])),
    ...(features.has('shop') ? asked(DRAWER) : []),
  ];
  for (const block of pageBlocks(page, site.footer)) files.push(...await readied(block, site));
  const loads = [...new Set(files)].filter((file) => !boot.has(file)).sort();
  return { blocks: [...blocks].sort().join(' '), backgrounds: [...backgrounds].sort().join(' '), features: [...features].sort().join(' '), loads: loads.join(' ') };
}

const EXPECTED = {
  'hjem': {
    blocks: 'button calendar map ribbon text',
    backgrounds: 'color glow gradient grain image',
    features: 'footer shop totop',
    loads: 'backgrounds/color.js backgrounds/glow.js backgrounds/gradient.js backgrounds/grain.js backgrounds/image.js blocks/button.css blocks/button.js blocks/calendar-card.js blocks/calendar-load.js blocks/calendar-next.css blocks/calendar-next.js blocks/calendar-time.css blocks/calendar-time.js blocks/calendar.css blocks/calendar.js blocks/cart.css blocks/cart.js blocks/map.css blocks/map.js blocks/ribbon.css blocks/ribbon.js blocks/text.js box-style.js calendar-designs.js calendar-format.js embed-cover.js footer-model.js footer.css footer.js ics.js map-links.js meeting-links.js nav-cart.css osm.js picture.js ribbon-model.js sanitize.js shop.js totop.css totop.js',
  },
  'om-oss': {
    blocks: 'button image text',
    backgrounds: 'color glow grain',
    features: 'footer shop sticky totop',
    loads: 'backgrounds/color.js backgrounds/glow.js backgrounds/grain.js blocks/button.css blocks/button.js blocks/cart.css blocks/cart.js blocks/image.css blocks/image.js blocks/text.js box-style.js footer-model.js footer.css footer.js nav-cart.css picture.js sanitize.js shop.js sticky-model.js sticky.js totop.css totop.js',
  },
  'kontakt': {
    blocks: 'button text',
    backgrounds: 'color glow grain pattern',
    features: 'footer shop totop',
    loads: 'backgrounds/color.js backgrounds/glow.js backgrounds/grain.js backgrounds/pattern.js blocks/button.css blocks/button.js blocks/cart.css blocks/cart.js blocks/text.js box-style.js footer-model.js footer.css footer.js nav-cart.css sanitize.js shop.js totop.css totop.js',
  },
  'kaker': {
    blocks: 'text video',
    backgrounds: 'color glow gradient grain image',
    features: 'animations divider footer shop totop',
    loads: 'animations/core.js backgrounds/color.js backgrounds/glow.js backgrounds/gradient.js backgrounds/grain.js backgrounds/image.js backgrounds/video.js blocks/cart.css blocks/cart.js blocks/text.js blocks/video.css blocks/video.js box-style.js divider-model.js embed-cover.js footer-model.js footer.css footer.js nav-cart.css picture.js sanitize.js shop.js totop.css totop.js',
  },
  'checkout': {
    blocks: 'button checkout text',
    backgrounds: 'color glow grain',
    features: 'footer shop totop',
    loads: 'backgrounds/color.js backgrounds/glow.js backgrounds/grain.js blocks/button.css blocks/button.js blocks/cart.css blocks/cart.js blocks/checkout.css blocks/checkout.js blocks/text.js box-style.js contact-checks.js contact-model.js contact-profiles.js footer-model.js footer.css footer.js nav-cart.css sanitize.js shop.js totop.css totop.js',
  },
  'shop-fp': {
    blocks: 'button cart icon image product text',
    backgrounds: 'color glow grain',
    features: 'footer shop totop',
    loads: 'backgrounds/color.js backgrounds/glow.js backgrounds/grain.js blocks/button.css blocks/button.js blocks/cart.css blocks/cart.js blocks/collection.css blocks/collection.js blocks/icon.css blocks/icon.js blocks/image.css blocks/image.js blocks/product.css blocks/product.js blocks/text.js box-style.js collections.js footer-model.js footer.css footer.js nav-cart.css picture.js sanitize.js shop.js totop.css totop.js',
  },
  'shop': {
    blocks: 'button cart faq image product text',
    backgrounds: 'color glow grain',
    features: 'animations footer shop sticky totop',
    loads: 'animations/core.js backgrounds/color.js backgrounds/glow.js backgrounds/grain.js blocks/button.css blocks/button.js blocks/cart.css blocks/cart.js blocks/collection.css blocks/collection.js blocks/faq.css blocks/faq.js blocks/image.css blocks/image.js blocks/product.css blocks/product.js blocks/text.js box-style.js collections.js footer-model.js footer.css footer.js nav-cart.css picture.js sanitize.js shop.js sticky-model.js sticky.js totop.css totop.js',
  },
  'personvern': {
    blocks: 'privacy',
    backgrounds: 'color glow grain',
    features: 'footer shop totop',
    loads: 'backgrounds/color.js backgrounds/glow.js backgrounds/grain.js blocks/cart.css blocks/cart.js blocks/privacy.css blocks/privacy.js contact-checks.js contact-model.js contact-profiles.js doc-look.css doc-look.js embed-cover.js footer-model.js footer.css footer.js nav-cart.css osm.js picture.js privacy-model.js shop.js totop.css totop.js',
  },
};

test('each template page holds the types and features its list names, and the template\'s pages are all listed', async () => {
  assert.deepEqual(site.pages.map((entry) => entry.id).sort(), Object.keys(EXPECTED).sort());
  for (const entry of site.pages) {
    const { blocks, backgrounds, features } = await pageLoad(entry);
    assert.deepEqual({ blocks, backgrounds, features }, { blocks: EXPECTED[entry.id].blocks, backgrounds: EXPECTED[entry.id].backgrounds, features: EXPECTED[entry.id].features }, entry.id);
  }
});

test('each template page loads beyond the boot only what the types, features and design parts it holds need, as its list names', async () => {
  for (const entry of site.pages) {
    const loads = (await pageLoad(entry)).loads.split(' ');
    const listed = EXPECTED[entry.id].loads.split(' ');
    const more = loads.filter((file) => !listed.includes(file));
    assert.deepEqual(more, [], `${entry.id} now loads ${more.join(', ')}: something it holds asks for it, or it is loaded for something it does not hold`);
    const fewer = listed.filter((file) => !loads.includes(file));
    assert.deepEqual(fewer, [], `${entry.id} no longer loads ${fewer.join(', ')}: its list follows`);
  }
});

/** The modules a page can come to load as it is drawn or used, beyond what the model above reads, each with what brings it. */
const DRAWN_LATER = {
  'footer-cta.js': 'a footer with a newsletter form, as the form is drawn',
  'lightbox.js': 'a picture opened in the lightbox',
  'qr.js': 'a contact block in the QR design',
  'vcard.js': 'a contact block\'s QR or save button',
  'map-links.js': 'a contact block\'s directions link',
  'hint.js': 'the editor\'s help chips, in the preview',
  'preview-edit.js': 'the editor\'s preview',
  'preview-queue.js': 'the editor\'s preview',
  'sections/presets.js': 'the editor\'s preview',
  'drafts.js': 'the draft view and the preview',
};

test('every module a page can load as it is drawn is one the model reads or one named with what brings it, and none is in the boot\'s closure', () => {
  // Each loader with the folder its paths are read from: the engine's own, or blocks/ for the blocks' readying.
  const loaders = [
    ...[...Object.values(CORE_BLOCKS), ...Object.values(CORE_BACKGROUNDS), ...Object.values(CORE_FEATURES), ...Object.values(CORE_BLOCK_READY), ...CORE_BLOCK_PARTS, DRAWER].map((loader) => [loader, '']),
    ...[loadDocs, loadContactMap, loadRibbonView, calendarParts, ...Object.values(DESIGN_MODULES), loadCard].map((loader) => [loader, 'blocks/']),
  ];
  const modelled = new Set(loaders.flatMap(([loader, folder]) => asked(loader, folder)).filter((file) => file.endsWith('.js')));
  const reach = new Set([...boot, ...modelled]);
  for (let grew = true; grew;) {
    grew = false;
    for (const module of [...reach]) {
      for (const [, path] of read(module).matchAll(/import\(\s*'(\.\.?\/[^']+)'\s*\)/g)) {
        const target = new URL(path, `file:///e/${module}`).pathname.slice(3);
        assert.ok(modelled.has(target) || Object.hasOwn(DRAWN_LATER, target), `${module} loads ${target}, which neither the model reads nor DRAWN_LATER names`);
        assert.ok(!boot.has(target), `${target} is loaded by what a page holds, never by the boot`);
        if (!reach.has(target)) { reach.add(target); for (const name of engineClosure(target)) reach.add(name); grew = true; }
      }
    }
  }
  // The modules each loader names itself are never the boot's; what they import may be.
  for (const [loader, folder] of loaders) {
    for (const [, path] of String(loader).matchAll(/import\(\s*'(\.\.?\/[^']+)'\s*\)/g)) {
      const module = new URL(path, `file:///e/${folder}`).pathname.slice(3);
      assert.ok(!boot.has(module), `${module} is loaded by what a page holds, never by the boot`);
    }
  }
});
