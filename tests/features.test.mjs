/**
 * The boot's own features, loaded by what the site and page hold (features.js, ADR-0036).
 * These tests hold each predicate to what its feature's own functions draw, over the template, the presets and pages made to set each field, and check the loading.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { ENGINE_DIR, engineImport, engineClosure } from './_engine.mjs';

globalThis.document ??= {
  createElement: () => ({ dataset: {}, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; } }),
  head: { querySelector: () => null, querySelectorAll: () => [], appendChild: (link) => link.listeners.load?.() },
};
const { CORE_FEATURES, CORE_ANIMATION_IDS, feature, loadFeatures, reserveCoreAnimations, siteFeatures, pageFeatures } = await engineImport('features.js');
const { coreAnimations, entranceOf, pointerEffectOf } = await engineImport('animations/core.js');
const { sectionDivider } = await engineImport('divider-model.js');
const { siteContact, contactParts, legalParts, organizationContact } = await engineImport('contact-model.js');
const { createRegistry } = await engineImport('registry.js');
const { needsPlugins } = await engineImport('plugins.js');
const { registerSectionPresets } = await engineImport('sections/presets.js');
const { PAGE_PRESETS, buildPagePreset } = await engineImport('page-presets.js');

const CONTENT = new URL('../template/content/', import.meta.url);
const json = (path) => JSON.parse(readFileSync(new URL(path, CONTENT), 'utf8'));
const site = json('site.json');
const templatePages = Object.fromEntries(readdirSync(new URL('pages/', CONTENT)).filter((f) => f.endsWith('.json')).map((f) => [f.replace(/\.json$/, ''), json(`pages/${f}`)]));
const fresh = () => ({ blocks: createRegistry('blocks'), backgrounds: createRegistry('backgrounds'), animations: createRegistry('animations') });

/** Every page the tests read: the template's, each section preset alone, each page preset, and pages made to set each feature's fields. */
function corpus() {
  const pages = Object.entries(templatePages).map(([id, page]) => [`template:${id}`, page]);
  const defs = new Map();
  registerSectionPresets({ sections: { define: (id, def) => defs.set(id, def) } });
  for (const [id, def] of defs) pages.push([`section:${id}`, { sections: [def.create()] }]);
  for (const preset of PAGE_PRESETS) pages.push([`page:${preset.id}`, buildPagePreset(preset.id, { pageId: 'p', title: 'P' })]);
  const block = (extra) => ({ id: 'b', type: 'text', props: {}, frames: { desktop: { x: 0, y: 0, w: 10, h: 10 } }, ...extra });
  const made = {
    entrance: { sections: [{ id: 's', blocks: [block({ animation: { type: 'fade-in' } })] }] },
    entranceDesktopOnly: { sections: [{ id: 's', blocks: [block({ animation: { type: 'slide-up' }, entranceMobile: false })] }] },
    hover: { sections: [{ id: 's', blocks: [block({ hover: { type: 'hover-lift' } })] }] },
    blocksHover: { sections: [{ id: 's', blocksHover: { type: 'hover-lift' }, blocks: [block({})] }] },
    stagger: { sections: [{ id: 's', animation: { type: 'stagger' }, blocks: [block({})] }] },
    pinned: { sections: [{ id: 's', blocks: [block({ sticky: { offset: 16 } })] }] },
    pinnedEmpty: { sections: [{ id: 's', blocks: [block({ sticky: {} })] }] },
    dividerTop: { sections: [{ id: 's', divider: { top: { shape: 'wave' } }, blocks: [] }] },
    dividerBottom: { sections: [{ id: 's', divider: { bottom: { shape: 'zigzag', height: 9999 } }, blocks: [] }] },
    dividerUnknown: { sections: [{ id: 's', divider: { top: { shape: 'nope' } }, blocks: [] }] },
    none: { sections: [{ id: 's', blocks: [block({ hover: false, animation: null, sticky: null })] }] },
  };
  for (const [name, page] of Object.entries(made)) pages.push([`made:${name}`, page]);
  return pages;
}

const isPointer = (type) => coreAnimations[type]?.entrance === false;

test('the reserved animation ids are the core animations\' own', () => {
  assert.deepEqual([...CORE_ANIMATION_IDS].sort(), Object.keys(coreAnimations).sort());
});

test('a page holds animations wherever a block or section draws one, on either screen', () => {
  for (const [name, page] of corpus()) {
    const draws = (page.sections ?? []).some((section) => section?.animation?.type || (section?.blocks ?? []).some((block) =>
      entranceOf(block, 'desktop', isPointer) || entranceOf(block, 'mobile', isPointer) || pointerEffectOf(block, section, isPointer)));
    if (draws) assert.ok(pageFeatures(page, site).has('animations'), `${name} draws an animation`);
  }
});

test('a page holds dividers wherever a section draws one, and pinned blocks wherever a block is pinned', () => {
  for (const [name, page] of corpus()) {
    const held = pageFeatures(page, site);
    const divides = (page.sections ?? []).some((section) => sectionDivider(section?.divider?.top) || sectionDivider(section?.divider?.bottom));
    if (divides) assert.ok(held.has('divider'), `${name} draws a divider`);
    const pins = (page.sections ?? []).some((section) => (section?.blocks ?? []).some((block) => Boolean(block.sticky)));
    if (pins) assert.ok(held.has('sticky'), `${name} pins a block`);
  }
});

test('each template page holds exactly the features it draws, and the template site its menu basket, back-to-top button and footer', () => {
  const expected = { checkout: [], hjem: [], kaker: ['animations', 'divider'], kontakt: [], 'om-oss': ['sticky'], personvern: [], 'shop-fp': [], shop: ['animations', 'sticky'] };
  for (const [id, page] of Object.entries(templatePages)) assert.deepEqual([...pageFeatures(page, site)].sort(), expected[id], id);
  assert.deepEqual([...siteFeatures(site, 'hjem')].sort(), ['footer', 'shop', 'totop']);
});

test('a site without a contact value holds no contact, and its contact parts are empty then', () => {
  const values = [undefined, null, {}, { country: '' }, { email: '' }, { vat: { registered: false } }, { points: [] }, { address: { street: '', city: '' } }, { ids: {}, extras: {}, registers: {} }];
  for (const contact of values) {
    const s = { ...site, site: { ...site.site, contact } };
    assert.ok(!siteFeatures(s, null).has('contact'), JSON.stringify(contact));
    const sc = siteContact(s);
    assert.equal(contactParts(sc), null);
    assert.deepEqual(legalParts(sc), []);
    assert.deepEqual(organizationContact(sc), {});
  }
  for (const contact of [{ email: 'a@b.no' }, { legalName: 'X' }, { geo: { lat: 0, lon: 0 } }, { vat: { registered: true } }]) {
    assert.ok(siteFeatures({ ...site, site: { ...site.site, contact } }, null).has('contact'), JSON.stringify(contact));
  }
});

test('the footer is held where it shows on the page, the basket where the menu shows it, and the back-to-top button unless it is off', () => {
  const s = (footer, cart) => ({ ...site, footer: { ...site.footer, ...footer }, nav: { ...site.nav, cart } });
  assert.ok(siteFeatures(s({ show: true }), 'a').has('footer'));
  assert.ok(!siteFeatures(s({ show: false }), 'a').has('footer'));
  assert.ok(!siteFeatures(s({ show: undefined }), 'a').has('footer'));
  assert.ok(!siteFeatures(s({ show: true, hideOn: ['a'] }), 'a').has('footer'));
  assert.ok(siteFeatures(s({ show: true, hideOn: ['a'] }), 'b').has('footer'));
  assert.ok(siteFeatures(s({}, { show: true }), 'a').has('shop'));
  assert.ok(!siteFeatures(s({}, { show: false }), 'a').has('shop'));
  assert.ok(!siteFeatures(s({}, undefined), 'a').has('shop'));
  const launcher = (value) => siteFeatures({ ...site, nav: { ...site.nav, launcher: { show: value } } }, 'a').has('launcher');
  assert.ok(launcher(true), 'the launcher loads where the site shows it');
  for (const value of [false, undefined, 'true', 1]) assert.ok(!launcher(value), `launcher.show ${JSON.stringify(value)} draws no launcher (launcherModel)`);
  const top = (toTop) => siteFeatures({ ...site, layout: { ...site.layout, toTop } }, 'a').has('totop');
  assert.ok(top(undefined) && top({}) && top({ show: true }) && top(true), 'the back-to-top button stands unless it is off');
  assert.ok(!top({ show: false }));
  const shaped = (toTop) => siteFeatures({ ...site, layout: { ...site.layout, toTop } }, 'a').has('shape');
  assert.ok(shaped({ shape: { sides: 6 } }), 'the shape model loads for a button with a shape of its own');
  assert.ok(!shaped({}) && !shaped({ shape: [] }) && !shaped({ shape: 'star' }) && !shaped({ show: false, shape: { sides: 6 } }));
});

test('a core animation id is the engine\'s own before its module loads, and is defined once it has', async () => {
  const Urd = fresh();
  reserveCoreAnimations(Urd);
  const types = { blocks: new Set(), backgrounds: new Set(), animations: new Set(['fade-in']) };
  assert.equal(needsPlugins(types, Urd), false);
  assert.throws(() => Urd.animations.define('fade-in', {}), /engine's own/);
  await loadFeatures(Urd, ['animations']);
  assert.deepEqual(Urd.animations.ids().sort(), [...CORE_ANIMATION_IDS].sort());
  assert.equal(feature('animations').coreAnimations, coreAnimations);
});

test('a page loads the features named alone, an unknown name passed over, and the preview every one', async () => {
  const Urd = fresh();
  reserveCoreAnimations(Urd);
  await loadFeatures(Urd, ['divider', 'nope']);
  assert.ok(feature('divider')?.sectionDivider);
  await loadFeatures(Urd, null, { all: true });
  for (const name of Object.keys(CORE_FEATURES)) assert.ok(feature(name), name);
  assert.ok(feature('sticky').initSticky && feature('sticky').stickyLeads, 'pinning carries its model');
  assert.ok(feature('footer').renderFooter && feature('footer').whenSettled, 'the footer carries its settling');
});

test('no feature module is in the boot\'s static closure', () => {
  const boot = new Set(engineClosure('boot.js'));
  const src = readFileSync(new URL('features.js', ENGINE_DIR), 'utf8');
  const modules = [...src.matchAll(/import\('\.\/([^']+)'\)/g)].map((m) => m[1]);
  assert.ok(modules.length >= 10);
  for (const name of modules) assert.ok(!boot.has(name), `${name} is loaded by what a page holds, never by the boot`);
});
