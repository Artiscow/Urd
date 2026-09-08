/**
 * Test of the core invariant: stepwise version lifting in migrate.js.
 * Run with `node --test tests/` (requires Node 18+, only for developing
 * Urd itself - cloned sites still never need Node).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { lift, liftSiteFile, liftPageFile, SITE_SCHEMA_VERSION, PAGE_SCHEMA_VERSION, MOBILE_ROW } = await engineImport('migrate.js');

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
