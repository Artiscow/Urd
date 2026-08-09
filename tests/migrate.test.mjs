/**
 * Test av kjerne-invarianten: stegvis versjonsløfting i migrate.js.
 * Kjøres med `node --test tests/` (krever Node 18+, kun for utvikling av
 * Urd selv - klonede sider trenger fortsatt aldri Node).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { lift, liftSiteFile, SITE_SCHEMA_VERSION } = await engineImport('migrate.js');

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

// Site-migreringen 1 -> 2: breddegrepet (ADR-0018). Standarden skrives inn
// eksplisitt i stedet for å utledes ved lesing, så motoren og editoren
// aldri kan komme til hver sin verdi.

test('site v1 uten layout løftes med designbredden skrevet inn', () => {
  const lifted = liftSiteFile({ schemaVersion: 1, site: { title: 'Test', lang: 'no' } });
  assert.equal(lifted.schemaVersion, SITE_SCHEMA_VERSION);
  assert.deepEqual(lifted.layout, { contentWidth: 1200, gutter: 24 });
});

test('site v1 med eget layout-felt beholder verdiene sine', () => {
  const eget = { contentWidth: 'full', gutter: 0 };
  const lifted = liftSiteFile({ schemaVersion: 1, layout: eget });
  assert.equal(lifted.schemaVersion, SITE_SCHEMA_VERSION);
  assert.deepEqual(lifted.layout, eget);
});

test('site på gjeldende versjon røres ikke av løftingen', () => {
  const site = { schemaVersion: SITE_SCHEMA_VERSION, layout: { contentWidth: 980, gutter: 12 } };
  assert.deepEqual(liftSiteFile(site).layout, { contentWidth: 980, gutter: 12 });
});

test('site-løftingen muterer aldri originalen', () => {
  const original = { schemaVersion: 1, site: { title: 'Test', lang: 'no' } };
  liftSiteFile(original);
  assert.equal(original.schemaVersion, 1);
  assert.equal(original.layout, undefined);
});
