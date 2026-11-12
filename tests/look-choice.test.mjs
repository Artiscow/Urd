/**
 * How a look is chosen in place (Urd settings «Choosing a design», lib/rows/LookChoice.svelte): a choice of a few designs stands whole, a larger one as a run around the design in use beside a tile that opens the picker (lib/look-choice.js);
 * and every design a menu or a panel shows in place has its picture among the admin's design pictures (pictureList in design-sources.js).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { register } from 'node:module';
import { engineImport } from './_engine.mjs';
// The design sources reach the engine through the editor's alias, which the loader resolves.
register('./_svelte-loader.mjs', import.meta.url);

const { looksInPlace, LOOKS_WHOLE, LOOKS_SHOWN } = await import('../editor/src/lib/look-choice.js');
const { pictureList, blockDesigns, calendarDesignSource, footerPresetSource } = await import('../editor/src/lib/design-sources.js');
const { FOOTER_PRESETS } = await engineImport('footer-presets.js');
const { BLOCK_DESIGNS } = await engineImport('block-designs.js');

const list = (n) => Array.from({ length: n }, (_, i) => ({ id: `d${i}` }));
const ids = (r) => r.items.map((d) => d.id);

test('a choice of a few designs stands whole, with no tile for the picker', () => {
  for (const n of [1, 2, 6, LOOKS_WHOLE]) {
    const r = looksInPlace(list(n), 'd0');
    assert.equal(r.items.length, n);
    assert.equal(r.more, false);
  }
});

test('a larger choice shows a run around the design in use, in order, beside the tile for the picker', () => {
  const all = list(41);
  for (const at of [0, 3, 4, 20, 37, 40]) {
    const r = looksInPlace(all, `d${at}`);
    assert.equal(r.more, true);
    assert.equal(r.items.length, LOOKS_SHOWN);
    assert.ok(ids(r).includes(`d${at}`), `d${at} stands among them`);
    const first = Number(r.items[0].id.slice(1));
    assert.deepEqual(ids(r), list(41).slice(first, first + LOOKS_SHOWN).map((d) => d.id), 'a run in the picker\'s order');
  }
  assert.deepEqual(ids(looksInPlace(all, 'd0')), ids({ items: all.slice(0, LOOKS_SHOWN) }));
  assert.deepEqual(ids(looksInPlace(all, 'd40')), ids({ items: all.slice(-LOOKS_SHOWN) }));
  assert.deepEqual(ids(looksInPlace(all, 'gone')), ids({ items: all.slice(0, LOOKS_SHOWN) }), 'a design no longer listed shows the first');
});

test('a run already drawn stays where it stands while the design in use is in it', () => {
  const all = list(41);
  const first = looksInPlace(all, 'd20');
  const picked = looksInPlace(all, first.items[0].id, first.start);
  assert.deepEqual(ids(picked), ids(first), 'a press on the run\'s first picture moves none of them');
  const away = looksInPlace(all, 'd2', first.start);
  assert.ok(ids(away).includes('d2') && away.start !== first.start, 'a design outside the run draws the run around it');
  assert.deepEqual(ids(looksInPlace(all, 'd20', 99)), ids(first), 'a start that no longer fits is drawn anew');
});

const pictureFile = (url) => new URL(`../template${url}`, import.meta.url);

test('every design shown in place has its picture, in the picker\'s order', () => {
  const footer = pictureList(footerPresetSource({}));
  assert.deepEqual(footer.map((d) => d.id), FOOTER_PRESETS);
  const calendar = pictureList(calendarDesignSource({}));
  assert.ok(calendar.length > LOOKS_WHOLE, 'the calendar is the larger choice');
  const blocks = Object.keys(BLOCK_DESIGNS).flatMap((type) => pictureList(blockDesigns(type)));
  for (const d of [...footer, ...calendar, ...blocks]) {
    assert.ok(d.id && typeof d.name === 'string' && typeof d.about === 'string', d.id);
    assert.ok(existsSync(pictureFile(d.picture)), `${d.id}: no picture at ${d.picture}`);
  }
});

test('the footer\'s preview is measured again as the page above it empties and at every design chosen, so it shows the footer alone', () => {
  // The footer stands through the draws, so the picker watches it afresh at each; a block source waits for the block its draw makes anew, past the one still standing.
  const picker = readFileSync(new URL('../editor/src/lib/DesignPicker.svelte', import.meta.url), 'utf8');
  assert.match(picker, /function watchPreview\(\) \{\s*watcher\?\.disconnect\(\);\s*watcher = null;\s*if \(source\.stays\) watched = null;/);
  assert.match(picker, /if \(block && block !== watched\) \{/, 'a new block is waited for');
  assert.equal(footerPresetSource({}).stays, true);
  assert.equal(calendarDesignSource({}).stays, undefined, 'the calendar draws a new block at each choice');
  // The page above the footer is watched too: it empties after the choice is drawn, moving the footer up without changing its size.
  const watchedEls = [];
  const root = { id: 'urd-root' };
  const win = { document: { getElementById: (id) => (id === 'urd-root' ? root : null) } };
  footerPresetSource({}).afterDraw(win, {}, (el) => watchedEls.push(el));
  assert.deepEqual(watchedEls, [root]);
  // The preview ends with the footer, which ends the page, and keeps no room for a scrollbar it never shows.
  assert.equal(footerPresetSource({}).room, 0);
  assert.match(picker, /Math\.ceil\(bottom \+ \(source\.room \?\? 24\)\)/);
  assert.match(picker, /html \{ overflow: hidden !important; scrollbar-gutter: auto !important; \}/);
});
