/**
 * A new block's box fitted to what it draws (add-fit.js): which kinds are fitted, the floor, the narrowest width and the fitted frame.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { fitsWhenAdded, addedFloor, narrowestWidth, fittedFrame, pluginFits, TEXT_FLOOR, BLOCK_FLOOR, DRAWS_LATE } = await engineImport('add-fit.js');
const { NARROW_PX } = await engineImport('push-model.js');

test('a block whose box is what it draws keeps its size; the others are fitted', () => {
  for (const type of ['image', 'video', 'map', 'shape', 'gallery', 'collection', 'product', 'ribbon', 'form', 'checkout', 'audio']) assert.equal(fitsWhenAdded({ type }), false, type);
  assert.equal(fitsWhenAdded({ type: 'text', props: { box: true } }), false);
  for (const type of ['text', 'button', 'icon', 'quote', 'stats', 'share', 'countdown', 'timeline', 'table', 'contact', 'calendar', 'faq', 'cart', 'my-plugin-block']) assert.equal(fitsWhenAdded({ type }), true, type);
  assert.equal(fitsWhenAdded(null), false);
});

test('a text is fitted no narrower than its floor, any other block no narrower than a grip', () => {
  assert.equal(addedFloor({ type: 'text' }), TEXT_FLOOR);
  assert.equal(addedFloor({ type: 'stats' }), BLOCK_FLOOR);
});

test('a block with a phone design added wide is never fitted into that design; one added narrow is fitted as any other', () => {
  assert.equal(addedFloor({ type: 'privacy' }, 792), NARROW_PX);
  assert.equal(addedFloor({ type: 'contact' }, 396), BLOCK_FLOOR);
  assert.equal(addedFloor({ type: 'quote' }, 792), BLOCK_FLOOR);
});

test('a plugin\'s block is fitted only where its definition asks for it', () => {
  assert.equal(pluginFits({ fromPlugin: 'demo' }), false);
  assert.equal(pluginFits({ fromPlugin: 'demo', fitWhenAdded: true }), true);
  assert.equal(pluginFits({ type: 'text' }), true);
  assert.equal(pluginFits(undefined), true);
});

test('the narrowest width is where the content starts to wrap', () => {
  // Words 134 px wide: narrower, they wrap.
  assert.equal(narrowestWidth(24, 264, (w) => w < 134), 134);
});

test('content that fits at the floor stands at the floor', () => {
  assert.equal(narrowestWidth(140, 436, (w) => w < 58), 140);
});

test('content that changes at every narrower width keeps the width it was added at', () => {
  assert.equal(narrowestWidth(24, 600, (w) => w < 600), 600);
});

test('a floor wider than the width added at keeps that width', () => {
  assert.equal(narrowestWidth(140, 100, (w) => w < 50), 100);
});

test('the fitted frame keeps its centre and stays inside the canvas', () => {
  assert.deepEqual(fittedFrame({ x: 30, y: 40, w: 40, h: 200, z: 2 }, 20, 57.4), { x: 40, y: 40, w: 20, h: 57, z: 2 });
  assert.deepEqual(fittedFrame({ x: 0, y: 0, w: 10, h: 50 }, 30, 20), { x: 0, y: 0, w: 30, h: 20 });
  assert.equal(fittedFrame({ x: 90, y: 0, w: 10, h: 50 }, 20, 20).x, 80);
});

test('the kinds that draw their content later are fitted ones, which say when they have drawn', () => {
  for (const type of DRAWS_LATE) assert.equal(fitsWhenAdded({ type }), true, type);
  assert.deepEqual([...DRAWS_LATE].sort(), ['calendar', 'privacy']);
});

test('a new block\'s fit is written only into the step that added it, never into a later block\'s add', async () => {
  const { readFileSync } = await import('node:fs');
  const blocks = readFileSync(new URL('../editor/src/state/blocks.svelte.js', import.meta.url), 'utf8');
  assert.match(blocks, /pendingFits\.set\(block\.id, \{ w: block\.frames\.desktop\.w, h: block\.frames\.desktop\.h, step: historyState\.history\.at\(-1\) \}\);/);
  assert.match(blocks, /historyState\.history\.at\(-1\) === pending\.step/);
});
