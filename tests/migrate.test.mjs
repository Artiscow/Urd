/**
 * Test av kjerne-invarianten: stegvis versjonsløfting i migrate.js.
 * Kjøres med `node --test tests/` (krever Node 18+, kun for utvikling av
 * Urd selv - klonede sider trenger fortsatt aldri Node).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lift } from '../template/assets/engine/migrate.js';

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
