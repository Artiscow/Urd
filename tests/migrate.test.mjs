/**
 * Test of the core invariant: stepwise version lifting in migrate.js.
 * Run with `node --test tests/` (requires Node 18+, only for developing
 * Urd itself - cloned sites still never need Node).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { lift, liftSiteFile, liftPageFile, liftMapHeights, liftGalleryBands, SITE_SCHEMA_VERSION, PAGE_SCHEMA_VERSION, MOBILE_ROW } = await engineImport('migrate.js');
const { mapBlock } = await engineImport('blocks/map.js');

const textV3 = {
  version: 3,
  migrations: {
    1: (props) => ({ ...props, align: 'left' }),
    2: (props) => ({ html: props.text ?? props.html, align: props.align }),
  },
};

// Fixture HTML '<p>Hei</p>' is deliberately Norwegian test content.

test('v1 data is lifted stepwise to v3', () => {
  const result = lift({ type: 'text', version: 1, props: { text: '<p>Hei</p>' } }, textV3);
  assert.equal(result.ok, true);
  assert.equal(result.version, 3);
  assert.deepEqual(result.props, { html: '<p>Hei</p>', align: 'left' });
});

test('data on the current version passes through unchanged', () => {
  const props = { html: '<p>Hei</p>', align: 'center' };
  const result = lift({ type: 'text', version: 3, props }, textV3);
  assert.equal(result.ok, true);
  assert.deepEqual(result.props, props);
});

test('unknown type gives a placeholder and the original props untouched', () => {
  const props = { foo: 'bar' };
  const result = lift({ type: 'borte-plugin', version: 2, props }, undefined);
  assert.equal(result.ok, false);
  assert.equal(result.placeholder, 'unknown-type');
  assert.deepEqual(result.props, props);
});

test('missing migration step gives a placeholder, never a throw', () => {
  const gappy = { version: 3, migrations: { 2: (p) => p } };
  const result = lift({ type: 'text', version: 1, props: { a: 1 } }, gappy);
  assert.equal(result.ok, false);
  assert.equal(result.placeholder, 'missing-migration');
  assert.deepEqual(result.props, { a: 1 });
});

test('data newer than the engine gives a placeholder (safe downgrade)', () => {
  const result = lift({ type: 'text', version: 5, props: { a: 1 } }, textV3);
  assert.equal(result.ok, false);
  assert.equal(result.placeholder, 'newer-than-engine');
  assert.deepEqual(result.props, { a: 1 });
});

test('missing version is treated as v1 and migrated, never as current', () => {
  const result = lift({ type: 'text', props: { text: '<p>Hei</p>' } }, textV3);
  assert.equal(result.ok, true);
  assert.equal(result.version, 3);
  assert.deepEqual(result.props, { html: '<p>Hei</p>', align: 'left' });
});

test('missing version with a def on v1 passes as v1', () => {
  const props = { html: '<p>Hei</p>' };
  const result = lift({ type: 'text', props }, { version: 1, migrations: {} });
  assert.equal(result.ok, true);
  assert.equal(result.version, 1);
  assert.deepEqual(result.props, props);
});

test('migrations never mutate the original props', () => {
  const original = { text: '<p>Hei</p>' };
  const mutating = {
    version: 2,
    migrations: { 1: (props) => { props.text = 'ENDRET'; return { html: props.text }; } },
  };
  const result = lift({ type: 'text', version: 1, props: original }, mutating);
  assert.equal(result.ok, true);
  assert.deepEqual(original, { text: '<p>Hei</p>' });
});

// The site migrations for the width model (ADR-0018). The default is written
// in explicitly instead of being derived at read time, so the engine and the
// editor can never arrive at different values.

test('site v1 without layout is lifted with the design width written in', () => {
  const lifted = liftSiteFile({ schemaVersion: 1, site: { title: 'Test', lang: 'no' } });
  assert.equal(lifted.schemaVersion, SITE_SCHEMA_VERSION);
  assert.deepEqual(lifted.layout, { contentWidth: 1440, gutter: 6 });
});

test('site v1 with its own layout field keeps the WIDTH through both steps', () => {
  const lifted = liftSiteFile({ schemaVersion: 1, layout: { contentWidth: 'full', gutter: 0 } });
  assert.equal(lifted.schemaVersion, SITE_SCHEMA_VERSION);
  assert.equal(lifted.layout.contentWidth, 'full');
});

// 2 -> 3: the gutter switched from pixels to percent of the viewport width.
// An old px value would be read as an absurdly large percentage (24 px would
// become 24% of the screen), so it is set to the default instead of converted.

test('site v2 with a px gutter gets the default gutter in vw', () => {
  const lifted = liftSiteFile({ schemaVersion: 2, layout: { contentWidth: 1200, gutter: 24 } });
  assert.equal(lifted.schemaVersion, SITE_SCHEMA_VERSION);
  assert.equal(lifted.layout.gutter, 6);
  assert.equal(lifted.layout.contentWidth, 1200, 'the width must survive the gutter switch');
});

// 3 -> 4: nav.style.inset became the default. The old default is written in
// explicitly, so a site built before the change keeps the menu it was built
// with instead of moving its contents inward at the next engine update.

test('site v3 without nav.style.inset gets the old default written in', () => {
  const lifted = liftSiteFile({ schemaVersion: 3, nav: { version: 1, items: [] } });
  assert.equal(lifted.schemaVersion, SITE_SCHEMA_VERSION);
  assert.equal(lifted.nav.style.inset, false);
});

test('site v3 that set nav.style.inset keeps its own value', () => {
  const lifted = liftSiteFile({ schemaVersion: 3, nav: { version: 1, items: [], style: { inset: true, size: 'lg' } } });
  assert.equal(lifted.nav.style.inset, true);
  assert.equal(lifted.nav.style.size, 'lg', 'the other style fields must survive the step');
});

test('site v1 reaches version 4 with both the layout and the inset default written in', () => {
  const lifted = liftSiteFile({ schemaVersion: 1, nav: { version: 1, items: [] } });
  assert.equal(lifted.schemaVersion, SITE_SCHEMA_VERSION);
  assert.deepEqual(lifted.layout, { contentWidth: 1440, gutter: 6 });
  assert.equal(lifted.nav.style.inset, false);
});

test('site on the current version is untouched by the lift', () => {
  const site = { schemaVersion: SITE_SCHEMA_VERSION, layout: { contentWidth: 980, gutter: 9 } };
  assert.deepEqual(liftSiteFile(site).layout, { contentWidth: 980, gutter: 9 });
});

test('the site lift never mutates the original', () => {
  const original = { schemaVersion: 1, site: { title: 'Test', lang: 'no' } };
  liftSiteFile(original);
  assert.equal(original.schemaVersion, 1);
  assert.equal(original.layout, undefined);
});

// Page migration 1 -> 2 (synced mobile model, ADR-0019): materialized mobile
// frames are converted to partial row-grid placements, the section mode
// 'manual' is retired, decor gives hideMobile, and reason tokens become English.

/** A v1 page with one manual section as the materialization wrote it.
 *  The reason token 'desktop-endret-etter-mobil' is deliberately the old
 *  Norwegian contract value the migration must rename. */
const v1Page = () => ({
  schemaVersion: 1,
  meta: { id: 'test', title: 'Test' },
  sections: [{
    id: 'sec-1',
    version: 1,
    blocks: [
      // Hand-placed mobile frame: y 104 with flow padding 24 gives row 11, h 120 gives 15 rows.
      { id: 'a', type: 'text', version: 1, props: {}, frames: { desktop: { x: 10, y: 40, w: 50, h: 200 }, mobile: { x: 5, y: 104, w: 90, h: 120, z: 2, rot: 0 } } },
      // Byte-identical desktop copy: the materialization fallback, never intentional.
      { id: 'b', type: 'shape', version: 1, decor: true, props: {}, frames: { desktop: { x: 0, y: 0, w: 20, h: 8 }, mobile: { x: 0, y: 0, w: 20, h: 8 } } },
      { id: 'c', type: 'text', version: 1, props: {}, frames: { desktop: { x: 0, y: 300, w: 100, h: 60 }, mobile: null } },
    ],
    responsive: { mobile: { mode: 'manual', attention: { needed: true, reason: 'desktop-endret-etter-mobil', since: '2026-07-16T14:02:00Z' } } },
  }],
});

test('page v1: hand-placed mobile frame becomes a partial row-grid placement', () => {
  const lifted = liftPageFile(v1Page(), {});
  assert.equal(lifted.schemaVersion, PAGE_SCHEMA_VERSION);
  const a = lifted.sections[0].blocks[0];
  assert.deepEqual(a.frames.mobile, {
    x: 5,
    w: 90,
    row: Math.round((104 - 24) / MOBILE_ROW) + 1,
    rows: Math.ceil(120 / MOBILE_ROW),
    z: 2,
  });
});

test('page v1: byte-identical desktop copy is nulled and the section goes to auto', () => {
  const lifted = liftPageFile(v1Page(), {});
  const section = lifted.sections[0];
  assert.equal(section.blocks[1].frames.mobile, null);
  assert.equal(section.responsive.mobile.mode, 'auto');
});

test('page v1: decor gives hideMobile, and attention is kept with the English token', () => {
  const lifted = liftPageFile(v1Page(), {});
  const section = lifted.sections[0];
  assert.equal(section.blocks[1].hideMobile, true);
  assert.equal(section.blocks[0].hideMobile, undefined);
  assert.deepEqual(section.responsive.mobile.attention, {
    needed: true,
    reason: 'desktop-changed-after-mobile',
    since: '2026-07-16T14:02:00Z',
  });
});

test('page v2 is untouched by the lift (idempotence)', () => {
  const once = liftPageFile(v1Page(), {});
  const twice = liftPageFile(once, {});
  assert.deepEqual(twice, once);
});

test('page v1: amputated mobile frame without y becomes a floating override, never a throw', () => {
  const page = v1Page();
  page.sections[0].blocks[0].frames.mobile = { x: 5, w: 90 };
  const lifted = liftPageFile(page, {});
  assert.deepEqual(lifted.sections[0].blocks[0].frames.mobile, { x: 5, w: 90 });
});

test('the page lift never mutates the original', () => {
  const original = v1Page();
  liftPageFile(original, {});
  assert.equal(original.schemaVersion, 1);
  assert.equal(original.sections[0].responsive.mobile.mode, 'manual');
  assert.equal(original.sections[0].blocks[0].frames.mobile.y, 104);
});

// Page migration 2 -> 3 (ADR-0021): Norwegian contract tokens (block types,
// background layer types, section theme roles) renamed to English.

/** A v2 page carrying every renamed core token, plus plugin/unknown tokens
 *  that the migration must leave alone. */
const v2Page = () => ({
  schemaVersion: 2,
  meta: { id: 'test', title: 'Test' },
  sections: [{
    id: 'sec-1',
    version: 1,
    theme: 'dyp',
    preset: 'butikk',
    background: { version: 1, layers: [
      { type: 'bildegalleri', version: 1, props: {} },
      { type: 'image', version: 1, props: {} },
    ] },
    blocks: [
      { id: 'b1', type: 'samling', version: 1, props: {}, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } },
      { id: 'b2', type: 'galleri', version: 1, props: {}, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } },
      { id: 'b3', type: 'tidslinje', version: 1, props: {}, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } },
      { id: 'b4', type: 'sitat', version: 1, props: {}, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } },
      { id: 'b5', type: 'statistikk', version: 1, props: {}, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } },
      { id: 'b6', type: 'tabell', version: 1, props: {}, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } },
      { id: 'b7', type: 'deling', version: 1, props: {}, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } },
      { id: 'b8', type: 'nedteller', version: 1, props: {}, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } },
      { id: 'b9', type: 'produkt', version: 1, props: {}, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } },
      { id: 'b10', type: 'handlekurv', version: 1, props: {}, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } },
      { id: 'b11', type: 'kasse', version: 1, props: {}, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } },
      { id: 'b12', type: 'kalender', version: 1, props: {}, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } },
      { id: 'b13', type: 'text', version: 1, props: {}, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } },
    ],
  }],
});

test('page v2 -> v3: every core token is renamed', () => {
  const lifted = liftPageFile(v2Page(), {});
  assert.equal(lifted.schemaVersion, PAGE_SCHEMA_VERSION);
  const section = lifted.sections[0];
  assert.equal(section.theme, 'deep');
  assert.equal(section.preset, 'shop');
  assert.deepEqual(section.blocks.map((b) => b.type), [
    'collection', 'gallery', 'timeline', 'quote', 'stats', 'table',
    'share', 'countdown', 'product', 'cart', 'checkout', 'kalender', 'text',
  ]);
  assert.deepEqual(section.background.layers.map((l) => l.type), ['slideshow', 'image']);
});

test('page v2 -> v3: plugin-owned and English tokens pass through untouched', () => {
  const lifted = liftPageFile(v2Page(), {});
  const section = lifted.sections[0];
  assert.equal(section.blocks[11].type, 'kalender');
  assert.equal(section.blocks[12].type, 'text');
});

test('page v1 lifts straight through to v3 in one pass', () => {
  const page = v2Page();
  page.schemaVersion = 1;
  const lifted = liftPageFile(page, {});
  assert.equal(lifted.schemaVersion, PAGE_SCHEMA_VERSION);
  assert.equal(lifted.sections[0].blocks[0].type, 'collection');
});

test('page v3 output is idempotent under a second lift', () => {
  const once = liftPageFile(v2Page(), {});
  const twice = liftPageFile(once, {});
  assert.deepEqual(twice, once);
});

test('page v2 -> v3 never mutates the original', () => {
  const original = v2Page();
  liftPageFile(original, {});
  assert.equal(original.schemaVersion, 2);
  assert.equal(original.sections[0].theme, 'dyp');
  assert.equal(original.sections[0].blocks[0].type, 'samling');
});

test('page v3 written between the rename steps still gets its presets lifted', () => {
  const page = v2Page();
  page.schemaVersion = 3;
  page.sections[0].preset = 'hero-sentrert';
  const lifted = liftPageFile(page, {});
  assert.equal(lifted.schemaVersion, PAGE_SCHEMA_VERSION);
  assert.equal(lifted.sections[0].preset, 'hero-centered');
});

test('plugin preset ids pass the preset lift untouched', () => {
  const page = v2Page();
  page.sections[0].preset = 'hva-skjer';
  const lifted = liftPageFile(page, {});
  assert.equal(lifted.sections[0].preset, 'hva-skjer');
});

/* 4 -> 5 (ADR-0025): the map's height setting into the frame. */
const v4Page = () => ({
  schemaVersion: 4,
  meta: { id: 'kontakt', title: 'Kontakt' },
  sections: [{
    id: 'sec-1',
    version: 1,
    size: { minHeight: '900px' },
    blocks: [
      { id: 'map', type: 'map', version: 1, props: { location: '', zoom: 18, height: 600 }, frames: { desktop: { x: 10, y: 144, w: 40, h: 608 } } },
      { id: 'below', type: 'text', version: 1, props: {}, frames: { desktop: { x: 10, y: 760, w: 40, h: 100 } } },
      { id: 'beside', type: 'text', version: 1, props: {}, frames: { desktop: { x: 60, y: 144, w: 30, h: 100 } } },
      { id: 'legacy', type: 'kart', version: 1, props: { location: '', height: 200 }, frames: { desktop: { x: 60, y: 300, w: 30, h: 300 } } },
    ],
  }],
});

test('page v4 -> v5: the map frame takes the height the map showed, and the blocks below follow as for a fit', () => {
  const lifted = liftPageFile(v4Page(), {});
  assert.equal(lifted.schemaVersion, PAGE_SCHEMA_VERSION);
  const [map, below, beside, legacy] = lifted.sections[0].blocks;
  // The iframe's 600 px with the 26 px gap and line under it stood out of a 608 px frame by 18 px.
  assert.equal(map.frames.desktop.h, 626);
  assert.equal('height' in map.props, false);
  assert.equal(map.props.zoom, 18);
  // The block under the map was drawn 18 px lower by the push pass; the section's own height is the owner's and stays.
  assert.equal(below.frames.desktop.y, 778);
  assert.equal(beside.frames.desktop.y, 144);
  assert.equal(lifted.sections[0].size.minHeight, '900px');
  // A frame taller than the map keeps its height; the legacy id is lifted the same way.
  assert.equal(legacy.frames.desktop.h, 300);
  assert.equal('height' in legacy.props, false);
});

test('page v4 -> v5 is idempotent, leaves a map without the setting alone and never mutates the original', () => {
  const original = v4Page();
  const once = liftPageFile(original, {});
  assert.deepEqual(liftPageFile(once, {}), once);
  assert.equal(original.schemaVersion, 4);
  assert.equal(original.sections[0].blocks[0].props.height, 600);
  assert.equal(original.sections[0].blocks[0].frames.desktop.h, 608);
  const section = { blocks: [{ id: 'm', type: 'map', version: 2, props: { location: '', zoom: 15 }, frames: { desktop: { x: 0, y: 0, w: 50, h: 360 } } }] };
  liftMapHeights(section);
  assert.equal(section.blocks[0].frames.desktop.h, 360);
});

test('the map block lifts 1 -> 2 by dropping the height setting', () => {
  assert.equal(mapBlock.version, 2);
  const lifted = lift({ type: 'map', version: 1, props: { location: 'Oslo', zoom: 12, height: 320 } }, mapBlock);
  assert.equal(lifted.ok, true);
  assert.equal(lifted.version, 2);
  assert.deepEqual(lifted.props, { location: 'Oslo', zoom: 12 });
  assert.equal('height' in mapBlock.defaults(), false);
});

/* 5 -> 6 (ADR-0025 decision 6): the calendar's own size becomes the block's. */
test('page v5 -> v6: a calendar scale moves to the block-level size inside its bounds, and a calendar without one gets no field', () => {
  const page = {
    schemaVersion: 5,
    meta: { id: 'hjem', title: 'Hjem' },
    sections: [{
      id: 'sec-1',
      version: 1,
      blocks: [
        { id: 'small', type: 'calendar', version: 1, props: { sources: [], scale: 0.7 }, frames: { desktop: { x: 10, y: 10, w: 40, h: 300 } } },
        { id: 'wild', type: 'calendar', version: 1, props: { sources: [], scale: 9 }, frames: { desktop: { x: 10, y: 10, w: 40, h: 300 } } },
        { id: 'one', type: 'calendar', version: 1, props: { sources: [], scale: 1 }, frames: { desktop: { x: 10, y: 10, w: 40, h: 300 } } },
        { id: 'plain', type: 'calendar', version: 1, props: { sources: [] }, frames: { desktop: { x: 10, y: 10, w: 40, h: 300 } } },
        { id: 'text', type: 'text', version: 1, props: { scale: 0.5 }, frames: { desktop: { x: 10, y: 10, w: 40, h: 100 } } },
      ],
    }],
  };
  const lifted = liftPageFile(page, {});
  assert.equal(lifted.schemaVersion, PAGE_SCHEMA_VERSION);
  const [small, wild, one, plain, text] = lifted.sections[0].blocks;
  assert.equal(small.size, 0.7);
  assert.equal('scale' in small.props, false);
  assert.equal(wild.size, 2);
  assert.equal('size' in one, false);
  assert.equal('scale' in one.props, false);
  assert.equal('size' in plain, false);
  // Another block's props are its own: the step reads the calendar only.
  assert.equal(text.props.scale, 0.5);
  assert.equal('size' in text, false);
  assert.equal(page.sections[0].blocks[0].props.scale, 0.7);
});

/* 6 -> 7 (ADR-0025 decision 2): the gallery band's height moves into the frame. */
const v6Galleries = () => ({
  schemaVersion: 6,
  meta: { id: 'hjem', title: 'Hjem' },
  sections: [{
    id: 'sec-1',
    version: 1,
    size: { minHeight: '900px' },
    blocks: [
      { id: 'tall', type: 'gallery', version: 1, props: { images: [], view: 'ribbon' }, frames: { desktop: { x: 0, y: 0, w: 40, h: 320 } } },
      { id: 'short', type: 'gallery', version: 1, size: 1.5, props: { images: [], view: 'ribbon', rows: 2, bandHeight: 200, gap: 12 }, frames: { desktop: { x: 50, y: 0, w: 40, h: 300 } } },
      { id: 'below', type: 'text', version: 1, props: {}, frames: { desktop: { x: 50, y: 330, w: 40, h: 60 } } },
      { id: 'grid', type: 'gallery', version: 1, props: { images: [], view: 'grid', bandHeight: 240 }, frames: { desktop: { x: 0, y: 2000, w: 40, h: 320 } } },
    ],
  }],
});

test('page v6 -> v7: a gallery band takes the height it showed as its frame, and the blocks below follow a frame that grew', () => {
  const original = v6Galleries();
  const lifted = liftPageFile(original, {});
  assert.equal(lifted.schemaVersion, PAGE_SCHEMA_VERSION);
  const [tall, short, below, grid] = lifted.sections[0].blocks;
  // A frame taller than the band shrinks to the default band of 160 px, and nothing moves.
  assert.equal(tall.frames.desktop.h, 160);
  // Two rows of 200 px with a 12 px gap, at size 1.5, in a frame that was shorter.
  assert.equal(short.frames.desktop.h, 618);
  assert.equal('bandHeight' in short.props, false);
  // The block under it was drawn 318 px lower by the push pass, and stays there.
  assert.equal(below.frames.desktop.y, 648);
  // Another view only drops the field, and a far block keeps its place.
  assert.equal(grid.frames.desktop.h, 320);
  assert.equal(grid.frames.desktop.y, 2000);
  assert.equal('bandHeight' in grid.props, false);
  // The section's own height is the owner's.
  assert.equal(lifted.sections[0].size.minHeight, '900px');
  assert.equal(original.sections[0].blocks[1].props.bandHeight, 200);
  assert.equal(original.sections[0].blocks[0].frames.desktop.h, 320);
});

test('page v6 -> v7 is idempotent, and a payload lifts only a gallery that still carries the field', () => {
  const once = liftPageFile(v6Galleries(), {});
  assert.deepEqual(liftPageFile(once, {}), once);
  const payload = { blocks: [
    { id: 'new', type: 'gallery', version: 1, props: { images: [], view: 'ribbon' }, frames: { desktop: { x: 0, y: 0, w: 40, h: 320 } } },
    { id: 'old', type: 'gallery', version: 1, props: { images: [], view: 'ribbon', bandHeight: 120 }, frames: { desktop: { x: 50, y: 0, w: 40, h: 320 } } },
  ] };
  liftGalleryBands(payload);
  assert.equal(payload.blocks[0].frames.desktop.h, 320);
  assert.equal(payload.blocks[1].frames.desktop.h, 120);
  assert.equal('bandHeight' in payload.blocks[1].props, false);
});
