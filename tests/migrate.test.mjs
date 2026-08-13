/**
 * Test av kjerne-invarianten: stegvis versjonsløfting i migrate.js.
 * Kjøres med `node --test tests/` (krever Node 18+, kun for utvikling av
 * Urd selv - klonede sider trenger fortsatt aldri Node).
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

test('v1-data løftes stegvis til v3', () => {
  const result = lift({ type: 'text', version: 1, props: { text: '<p>Hei</p>' } }, textV3);
  assert.equal(result.ok, true);
  assert.equal(result.version, 3);
  assert.deepEqual(result.props, { html: '<p>Hei</p>', align: 'left' });
});

test('data på nåværende versjon passerer uendret', () => {
  const props = { html: '<p>Hei</p>', align: 'center' };
  const result = lift({ type: 'text', version: 3, props }, textV3);
  assert.equal(result.ok, true);
  assert.deepEqual(result.props, props);
});

test('ukjent type gir plassholder og original-props urørt', () => {
  const props = { foo: 'bar' };
  const result = lift({ type: 'borte-plugin', version: 2, props }, undefined);
  assert.equal(result.ok, false);
  assert.equal(result.placeholder, 'unknown-type');
  assert.deepEqual(result.props, props);
});

test('manglende migreringssteg gir plassholder, aldri kast', () => {
  const hullete = { version: 3, migrations: { 2: (p) => p } };
  const result = lift({ type: 'text', version: 1, props: { a: 1 } }, hullete);
  assert.equal(result.ok, false);
  assert.equal(result.placeholder, 'missing-migration');
  assert.deepEqual(result.props, { a: 1 });
});

test('nyere data enn motoren gir plassholder (trygg nedgradering)', () => {
  const result = lift({ type: 'text', version: 5, props: { a: 1 } }, textV3);
  assert.equal(result.ok, false);
  assert.equal(result.placeholder, 'newer-than-engine');
  assert.deepEqual(result.props, { a: 1 });
});

test('manglende version behandles som v1 og migreres, aldri som gjeldende', () => {
  const result = lift({ type: 'text', props: { text: '<p>Hei</p>' } }, textV3);
  assert.equal(result.ok, true);
  assert.equal(result.version, 3);
  assert.deepEqual(result.props, { html: '<p>Hei</p>', align: 'left' });
});

test('manglende version med def på v1 passerer som v1', () => {
  const props = { html: '<p>Hei</p>' };
  const result = lift({ type: 'text', props }, { version: 1, migrations: {} });
  assert.equal(result.ok, true);
  assert.equal(result.version, 1);
  assert.deepEqual(result.props, props);
});

test('migreringer muterer aldri original-props', () => {
  const original = { text: '<p>Hei</p>' };
  const grisete = {
    version: 2,
    migrations: { 1: (props) => { props.text = 'ENDRET'; return { html: props.text }; } },
  };
  const result = lift({ type: 'text', version: 1, props: original }, grisete);
  assert.equal(result.ok, true);
  assert.deepEqual(original, { text: '<p>Hei</p>' });
});

// Site-migreringene for breddegrepet (ADR-0018). Standarden skrives inn
// eksplisitt i stedet for å utledes ved lesing, så motoren og editoren
// aldri kan komme til hver sin verdi.

test('site v1 uten layout løftes med designbredden skrevet inn', () => {
  const lifted = liftSiteFile({ schemaVersion: 1, site: { title: 'Test', lang: 'no' } });
  assert.equal(lifted.schemaVersion, SITE_SCHEMA_VERSION);
  assert.deepEqual(lifted.layout, { contentWidth: 1440, gutter: 6 });
});

test('site v1 med eget layout-felt beholder BREDDEN gjennom begge stegene', () => {
  const lifted = liftSiteFile({ schemaVersion: 1, layout: { contentWidth: 'full', gutter: 0 } });
  assert.equal(lifted.schemaVersion, SITE_SCHEMA_VERSION);
  assert.equal(lifted.layout.contentWidth, 'full');
});

// 2 -> 3: margen byttet fra piksler til prosent av vindusbredden. En gammel
// px-verdi ville blitt lest som en absurd stor prosent (24 px ville blitt
// 24 % av skjermen), så den settes til standarden i stedet for å regnes om.

test('site v2 med px-marg får standardmargen i vw', () => {
  const lifted = liftSiteFile({ schemaVersion: 2, layout: { contentWidth: 1200, gutter: 24 } });
  assert.equal(lifted.schemaVersion, SITE_SCHEMA_VERSION);
  assert.equal(lifted.layout.gutter, 6);
  assert.equal(lifted.layout.contentWidth, 1200, 'bredden skal overleve margbyttet');
});

test('site på gjeldende versjon røres ikke av løftingen', () => {
  const site = { schemaVersion: SITE_SCHEMA_VERSION, layout: { contentWidth: 980, gutter: 9 } };
  assert.deepEqual(liftSiteFile(site).layout, { contentWidth: 980, gutter: 9 });
});

test('site-løftingen muterer aldri originalen', () => {
  const original = { schemaVersion: 1, site: { title: 'Test', lang: 'no' } };
  liftSiteFile(original);
  assert.equal(original.schemaVersion, 1);
  assert.equal(original.layout, undefined);
});

// Side-migreringen 1 -> 2 (synket mobilmodell, ADR-0019): materialiserte
// mobil-frames konverteres til partielle radnett-plasseringer, seksjonsmodusen
// 'manual' pensjoneres, decor gir hideMobile, og reason-tokens blir engelske.

/** En v1-side med én manuell seksjon slik materialiseringen skrev den. */
const v1Page = () => ({
  schemaVersion: 1,
  meta: { id: 'test', title: 'Test' },
  sections: [{
    id: 'sec-1',
    version: 1,
    blocks: [
      // Håndsatt mobil-frame: y 104 med flyt-padding 24 gir rad 11, h 120 gir 15 rader.
      { id: 'a', type: 'text', version: 1, props: {}, frames: { desktop: { x: 10, y: 40, w: 50, h: 200 }, mobile: { x: 5, y: 104, w: 90, h: 120, z: 2, rot: 0 } } },
      // Byte-lik desktop-kopi: materialiserings-fallbacken, aldri intensjonell.
      { id: 'b', type: 'shape', version: 1, decor: true, props: {}, frames: { desktop: { x: 0, y: 0, w: 20, h: 8 }, mobile: { x: 0, y: 0, w: 20, h: 8 } } },
      { id: 'c', type: 'text', version: 1, props: {}, frames: { desktop: { x: 0, y: 300, w: 100, h: 60 }, mobile: null } },
    ],
    responsive: { mobile: { mode: 'manual', attention: { needed: true, reason: 'desktop-endret-etter-mobil', since: '2026-07-16T14:02:00Z' } } },
  }],
});

test('side v1: håndsatt mobil-frame blir partiell radnett-plassering', () => {
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

test('side v1: byte-lik desktop-kopi nulles og seksjonen går til auto', () => {
  const lifted = liftPageFile(v1Page(), {});
  const section = lifted.sections[0];
  assert.equal(section.blocks[1].frames.mobile, null);
  assert.equal(section.responsive.mobile.mode, 'auto');
});

test('side v1: decor gir hideMobile, og attention bevares med engelsk token', () => {
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

test('side v2 røres ikke av løftingen (idempotens)', () => {
  const once = liftPageFile(v1Page(), {});
  const twice = liftPageFile(once, {});
  assert.deepEqual(twice, once);
});

test('side v1: amputert mobil-frame uten y blir flytende overstyring, aldri kast', () => {
  const page = v1Page();
  page.sections[0].blocks[0].frames.mobile = { x: 5, w: 90 };
  const lifted = liftPageFile(page, {});
  assert.deepEqual(lifted.sections[0].blocks[0].frames.mobile, { x: 5, w: 90 });
});

test('side-løftingen muterer aldri originalen', () => {
  const original = v1Page();
  liftPageFile(original, {});
  assert.equal(original.schemaVersion, 1);
  assert.equal(original.sections[0].responsive.mobile.mode, 'manual');
  assert.equal(original.sections[0].blocks[0].frames.mobile.y, 104);
});
