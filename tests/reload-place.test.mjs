/**
 * Where the admin stood, kept for a reload of the tab (editor/src/lib/reload-place.js): the page, the device, the selection and the canvas's scroll, each checked as it is read back.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE_DIR } from './_engine.mjs';

const { stoodOf, canvasTop } = await import(new URL('../editor/src/lib/reload-place.js', import.meta.url).href);

const DEVICES = ['desktop', 'mobile'];

test('what was kept is read back part by part, and a part that does not hold is dropped', () => {
  const kept = { page: 'kontakt', device: 'mobile', sectionId: 'sec-1', blockId: 'blk-2', top: { sectionId: 'sec-1', offset: 120.4 } };
  assert.deepEqual(stoodOf(kept, DEVICES), { page: 'kontakt', device: 'mobile', sectionId: 'sec-1', blockId: 'blk-2', top: { sectionId: 'sec-1', offset: 120 } });
  assert.deepEqual(stoodOf(null, DEVICES), { page: null, device: null, sectionId: null, blockId: null, top: null }, 'nothing kept');
  const odd = stoodOf({ page: '../x', device: 'free', sectionId: 7, blockId: 'a b', top: { sectionId: 'sec-1', offset: 'far' } }, DEVICES);
  assert.deepEqual(odd, { page: null, device: null, sectionId: null, blockId: null, top: null }, 'an unknown device, an id that is no id and an offset that is no number');
  assert.equal(stoodOf({ top: { sectionId: 'sec-1', offset: -40 } }, DEVICES).top.offset, 0, 'never above the section\'s top');
});

/** A canvas document: its sections at their layout tops, under a scroll padding, scrolled to `y`. */
function canvas(tops, y, clear = 0) {
  const sections = tops.map((top, i) => ({ dataset: { sectionId: `sec-${i}` }, offsetTop: top, offsetParent: null }));
  return {
    documentElement: {},
    querySelectorAll: () => sections,
    defaultView: { scrollY: y, getComputedStyle: () => ({ scrollPaddingTop: `${clear}px` }) },
  };
}

test('the canvas\'s place is the section at its top and how far past that section\'s top, as the preview\'s jump measures it', () => {
  assert.deepEqual(canvasTop(canvas([0, 600, 1400], 900)), { sectionId: 'sec-1', offset: 300 });
  assert.deepEqual(canvasTop(canvas([0, 600, 1400], 1400)), { sectionId: 'sec-2', offset: 0 }, 'a section standing at the top');
  assert.deepEqual(canvasTop(canvas([0, 600, 1400], 900, 80)), { sectionId: 'sec-1', offset: 380 }, 'under a menu that stays, the section\'s top is measured below it');
  assert.equal(canvasTop(canvas([0, 600], 0)), null, 'the page\'s top keeps no place');
  assert.equal(canvasTop(null), null);
});

test('the page stands in the address, and the first canvas after a reload comes back to the selection and the scroll on its page', () => {
  const page = readFileSync(new URL('../editor/src/state/page.svelte.js', import.meta.url), 'utf8');
  assert.match(page, /address\.searchParams\.set\('page', id\);\s*history\.replaceState\(history\.state, '', address\);/);
  const shell = readFileSync(new URL('../editor/src/state/shell.svelte.js', import.meta.url), 'utf8');
  assert.match(shell, /siteState\.siteDraft\.pages\.some\(\(p\) => p\.id === named\) \? named : siteState\.siteDraft\.pages\[0\]\.id/, 'an address naming no page of the site opens the first');
  const preview = readFileSync(new URL('../editor/src/state/preview.svelte.js', import.meta.url), 'utf8');
  assert.match(preview, /let deviceId = \$state\(stood\.device \?\? 'desktop'\);/, 'the device comes back at once');
  assert.match(preview, /if \(back\?\.page === pageState\.pageId\) \{/, 'the selection and the scroll only on the page they were kept on');
  assert.match(preview, /window\.addEventListener\('pagehide', keep\);/, 'kept as the admin is left');
  const urd = readFileSync(new URL('urd.js', ENGINE_DIR), 'utf8');
  assert.match(urd, /msg\?\.type === 'urd-scroll-to' && typeof msg\.sectionId === 'string'\) \{\s*\/\/[^\n]*\n\s*jumpTo\(msg\.sectionId, Math\.max\(0, Number\(msg\.offset\) \|\| 0\)\);/);
});
