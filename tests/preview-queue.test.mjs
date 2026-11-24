/**
 * The preview's draw queue (engine preview-queue.js, ADR-0036 decision 4): a message that draws waits until the code of what it draws is in, and the messages after it wait behind it, in order.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE_DIR, engineImport } from './_engine.mjs';

const { drawQueue, drawnBy, loadDrawn, REDRAW } = await engineImport('preview-queue.js');
const { reserveCoreTypes } = await engineImport('core-types.js');
const { feature } = await engineImport('features.js');
const { createRegistry } = await engineImport('registry.js');

const fresh = () => ({ blocks: createRegistry('blocks'), sections: createRegistry('sections'), backgrounds: createRegistry('backgrounds'), animations: createRegistry('animations') });
const read = (name) => readFileSync(new URL(name, ENGINE_DIR), 'utf8');

/** A load the test settles itself. */
function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}
const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

test('a message with nothing to load is handled at once, in the same task', () => {
  const handled = [];
  const take = drawQueue((msg) => handled.push(msg), () => null);
  take('a');
  take('b');
  assert.deepEqual(handled, ['a', 'b']);
});

test('a message that loads waits for it, and every message after it waits behind it in order, its load asked for as its turn comes', async () => {
  const handled = [];
  const loads = { slow: deferred(), later: deferred() };
  const asked = [];
  const take = drawQueue((msg) => handled.push(msg), (msg) => {
    asked.push(msg);
    return loads[msg]?.promise ?? null;
  });
  take('slow');
  take('fit');
  take('later');
  take('typing');
  assert.deepEqual(handled, [], 'nothing passes a message still loading');
  assert.deepEqual(asked, ['slow'], 'a waiting message\'s load is asked for at its turn, after the messages before it are handled');
  loads.slow.resolve();
  await settle();
  assert.deepEqual(handled, ['slow', 'fit'], 'the fit is handled after the drawing it measures');
  assert.deepEqual(asked, ['slow', 'fit', 'later']);
  loads.later.resolve();
  await settle();
  assert.deepEqual(handled, ['slow', 'fit', 'later', 'typing']);
  take('next');
  assert.deepEqual(handled.at(-1), 'next', 'an empty queue hands a message on at once again');
});

test('a load that fails still lets its message through, and a message that throws stops no other', async () => {
  const handled = [];
  const failing = deferred();
  const errors = [];
  const original = globalThis.reportError;
  globalThis.reportError = (err) => errors.push(err.message);
  try {
    const take = drawQueue((msg) => {
      if (msg === 'bad') throw new Error('bad message');
      handled.push(msg);
    }, (msg) => (msg === 'broken' ? failing.promise : null));
    take('broken');
    take('bad');
    take('after');
    failing.reject(new Error('offline'));
    await settle();
    assert.deepEqual(handled, ['broken', 'after']);
    assert.deepEqual(errors, ['bad message']);
  } finally {
    globalThis.reportError = original;
  }
});

test('what a message draws: a section in the page held, a page, the site with its page, the view and a redraw; nothing for colours alone or a message that draws nothing', () => {
  const site = { theme: { version: 1, tokens: { color: { accent: '#111111' } } }, nav: { items: [] } };
  const page = { meta: { id: 'hjem' }, sections: [{ id: 's1', blocks: [] }] };
  const state = { page, site };
  const section = { id: 's2', blocks: [{ id: 'b', type: 'image' }] };
  assert.deepEqual(drawnBy({ type: 'urd-preview', section }, state), { page: { meta: { id: 'hjem' }, sections: [section] }, site });
  const other = { meta: { id: 'om' }, sections: [] };
  assert.deepEqual(drawnBy({ type: 'urd-preview-full', page: other }, state), { page: other, site });
  const colours = { ...site, theme: { version: 1, tokens: { color: { accent: '#222222' } } } };
  assert.equal(drawnBy({ type: 'urd-site', site: colours }, state), null, 'a change of the colours alone applies without a redraw');
  assert.deepEqual(drawnBy({ type: 'urd-site', site: colours, page: other }, state), { page: other, site: colours });
  const footer = { ...site, footer: { show: true } };
  assert.deepEqual(drawnBy({ type: 'urd-site', site: footer }, state), { page, site: footer });
  assert.deepEqual(drawnBy({ type: 'urd-viewport', mode: 'mobile' }, state), { page, site });
  assert.deepEqual(drawnBy(REDRAW, state), { page, site });
  for (const msg of [{ type: 'urd-fit-block', blockId: 'b' }, { type: 'urd-zoom', scale: 1 }, { type: 'urd-preview' }, null, 'text']) assert.equal(drawnBy(msg, state), null, JSON.stringify(msg));
});

test('what a page draws is loaded: its types, its menu\'s and footer\'s, and its features, nothing more', async () => {
  const Urd = fresh();
  reserveCoreTypes(Urd);
  const site = { nav: { items: [], blocks: [] }, footer: { show: false, blocks: [{ id: 'f', type: 'spacer' }] }, layout: { toTop: { show: false } } };
  const page = { meta: { id: 'hjem' }, sections: [{ id: 's', background: { layers: [{ type: 'color', props: {} }] }, divider: { top: { shape: 'wave' } }, blocks: [{ id: 'b', type: 'text', props: {} }] }] };
  await loadDrawn(Urd, { page, site }, 'desktop');
  assert.deepEqual(Urd.blocks.ids().sort(), ['spacer', 'text']);
  assert.deepEqual(Urd.backgrounds.ids(), ['color']);
  assert.ok(feature('divider'), 'the section\'s divider');
  assert.ok(feature('collections'), 'the collections, which hold the editor\'s drafts');
});

test('the preview draws its page as a visitor\'s, reports ready, and loads the rest in the background; every message passes the queue', () => {
  const urd = read('urd.js');
  const ready = urd.indexOf("window.parent?.postMessage({ type: 'urd-ready' }, location.origin);");
  assert.ok(ready > 0);
  assert.ok(!urd.includes('{ all: true }'), 'the boot loads no type it does not draw');
  assert.ok(urd.indexOf('START_WAIT_MS);') > ready && /type: 'urd-shown', round: msg\.round \?\? null \}, location\.origin\);\s*rest\(\);/.test(urd), 'everything else comes after ready, as the editor\'s start is drawn and answered (tests/canvas-cover.test.mjs)');
  assert.match(urd, /window\.addEventListener\('message', \(event\) => \{\s*\/\/[^\n]*\n\s*if \(event\.origin !== location\.origin \|\| event\.source !== window\.parent\) return;\s*take\(event\.data\);\s*\}\);/, 'each message goes through the queue');
  assert.match(urd, /\]\.includes\(event\.key\)\) take\(queue\.REDRAW\);/, 'the bars\' redraw too');
  assert.ok(urd.includes('const siteHeld = siteFeatures(site, entry.id);'), 'the preview loads the site\'s features as a visitor does');
  assert.ok(urd.includes("import('./preview-queue.js')"), 'the queue comes with the editing layer, outside the boot\'s closure');
  assert.match(urd, /const handle = \(msg\) => \{\s*\/\/[^\n]*\n\s*feature\('sticky'\)\?\.initSticky\(\);/, 'pinning is wired as a message is handled, for a pinned block that comes after the page opened without one');
  assert.match(urd, /const definedCount = \(\) => \[[^\]]*\]\.reduce\(\(n, kind\) => n \+ Urd\[kind\]\.ids\(\)\.filter\(\(id\) => !Urd\[kind\]\.isReserved\(id\)\)\.length, 0\);/, 'a plugin list counts the plugins\' types alone, so the engine\'s own coming in meanwhile draws nothing again');
});
