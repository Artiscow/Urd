/**
 * The style clipboard's pure model (block-style.js, 0.7.20.8): what a copied
 * style holds, and what a paste writes on a block of the same or another type.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { styleOf, pasteStyle, CONTENT_KEYS } = await engineImport('block-style.js');

const BUTTON = { type: 'button', props: { label: 'Les mer', href: '/om', style: 'secondary' }, animation: { kind: 'fade' }, size: 1.2 };

test('styleOf: the props without the content, and the shared look fields', () => {
  assert.deepEqual(styleOf(BUTTON), { type: 'button', props: { style: 'secondary' }, shared: { animation: { kind: 'fade' }, size: 1.2 } });
  assert.ok(Object.keys(CONTENT_KEYS).includes('text'));
});

test('pasteStyle: the same type takes the whole look and keeps its content; another type the shared fields only', () => {
  const style = styleOf(BUTTON);
  const same = pasteStyle({ type: 'button', props: { label: 'Kjøp', href: '/shop', style: 'primary' } }, style);
  assert.deepEqual(same.props, { label: 'Kjøp', href: '/shop', style: 'secondary' });
  assert.deepEqual(same.shared, { animation: { kind: 'fade' }, hover: null, size: 1.2, sizeMin: null, sizeMax: null, height: null, fit: null, fitMin: null });
  const other = pasteStyle({ type: 'image', props: { src: '/media/a.webp', radius: 'md' } }, style);
  assert.equal(other.props, undefined);
  assert.equal(other.shared.size, 1.2);
});

test('styleOf and pasteStyle never share objects with the source', () => {
  const style = styleOf(BUTTON);
  style.shared.animation.kind = 'zoom';
  assert.equal(BUTTON.animation.kind, 'fade');
});
