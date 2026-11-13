/**
 * Tests of the pure layout functions in render.js: frameToCss (desktop) and mobilePlacementToCss (the mobile row grid, ADR-0019); the phone's reading order is tested in phone-order.test.mjs.
 * Frames are in physical units: x/w in percent of the content band, y/h in px.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { frameToCss, mobilePlacementToCss, phoneCells, phoneCellCss, PHONE_COLUMNS, autoGrows, anchorTargets, EDITOR_ONLY } = await engineImport('render.js');
const { galleryBlock } = await engineImport('blocks/gallery.js');
const { MOBILE_ROW, MOBILE_GAP } = await engineImport('migrate.js');

test('x/w become percent, y/h become px', () => {
  const css = frameToCss({ x: 8.33, y: 48, w: 50, h: 32, z: 3, rot: 0 });
  assert.deepEqual(css, {
    left: '8.33%',
    top: '48px',
    width: '50%',
    height: '32px',
    zIndex: '3',
    transform: '',
  });
});

test('a width floor keeps the frame from getting narrower than the floor, capped at the canvas edge', () => {
  assert.equal(frameToCss({ x: 10, y: 0, w: 40, h: 10 }, 240).width, 'min(max(40%, 240px), calc(100% - 10%))');
  assert.equal(frameToCss({ x: 10, y: 0, w: 40, h: 10 }, 0).width, '40%');
  assert.equal(frameToCss({ x: 10, y: 0, w: 40, h: 10 }).width, '40%');
});

test('rotation gives a transform, no rotation gives none', () => {
  assert.equal(frameToCss({ x: 0, y: 0, w: 10, h: 10, rot: -8 }).transform, 'rotate(-8deg)');
  assert.equal(frameToCss({ x: 0, y: 0, w: 10, h: 10 }).transform, '');
});

test('missing z gives zIndex 1', () => {
  assert.equal(frameToCss({ x: 0, y: 0, w: 10, h: 10 }).zIndex, '1');
});

const desktop = { x: 20, y: 100, w: 40, h: 120, z: 2, rot: 0 };

test('mobilePlacementToCss: null gives flow with a fixed height and a row span that fits the gap', () => {
  const css = mobilePlacementToCss(null, desktop, {});
  assert.equal(css.height, '120px');
  // The span fits the height PLUS margin-bottom, so the row tracks are never inflated.
  assert.equal(css.gridRow, `auto / span ${Math.ceil((120 + MOBILE_GAP) / MOBILE_ROW)}`);
  assert.equal(css.width, undefined);
});

test('mobilePlacementToCss: an auto-growing flow block gets its natural height', () => {
  const css = mobilePlacementToCss(null, desktop, { autoGrow: true });
  assert.equal(css.height, undefined);
  assert.equal(css.gridRow, undefined);
});

test('mobilePlacementToCss: a partial override touches only the fields present', () => {
  const css = mobilePlacementToCss({ w: 60 }, desktop, { autoGrow: true });
  assert.equal(css.width, '60%');
  assert.equal(css.marginLeft, undefined);
});

test('mobilePlacementToCss: pinned gives explicit row tracks and stretch (no height)', () => {
  const css = mobilePlacementToCss({ x: 5, w: 50, row: 3, rows: 10 }, desktop, {});
  assert.equal(css.gridRow, '3 / span 10');
  assert.equal(css.width, '50%');
  assert.equal(css.marginLeft, '5%');
  assert.equal(css.justifySelf, 'start');
  assert.equal(css.height, undefined);
});

test('mobilePlacementToCss: pinned without rows derives the span from the desktop height', () => {
  const css = mobilePlacementToCss({ row: 2 }, desktop, {});
  assert.equal(css.gridRow, `2 / span ${Math.ceil(120 / MOBILE_ROW)}`);
  // x/w fall back to the desktop frame.
  assert.equal(css.width, '40%');
  assert.equal(css.marginLeft, '20%');
});

test('mobilePlacementToCss: z and rot follow the placement', () => {
  const css = mobilePlacementToCss({ row: 1, rows: 2, z: 5, rot: -8 }, desktop, {});
  assert.equal(css.zIndex, '5');
  assert.equal(css.transform, 'rotate(-8deg)');
});

test('mobilePlacementToCss: z and rot are inherited from desktop when the placement lacks them', () => {
  const css = mobilePlacementToCss(null, { ...desktop, z: 7, rot: 12 }, { autoGrow: true });
  assert.equal(css.transform, 'rotate(12deg)');
  assert.equal(css.zIndex, '7');
});

test('phoneCells: a placement\'s cells inside the eight, and none for the full row or cells that do not fit', () => {
  assert.equal(PHONE_COLUMNS, 8);
  assert.deepEqual(phoneCells({ col: 5, cols: 4 }), { col: 5, cols: 4 });
  assert.equal(phoneCells({ col: 1, cols: 8 }), null, 'the full row');
  assert.equal(phoneCells({ col: 6, cols: 4 }), null, 'past the eighth column');
  assert.equal(phoneCells({ col: 0, cols: 2 }), null);
  assert.equal(phoneCells({ col: 2.5, cols: 2 }), null);
  assert.equal(phoneCells({ x: 5, w: 50 }), null);
  assert.equal(phoneCells(null), null);
});

test('phoneCellCss: the cell columns from the row\'s outer line, the inner edges half the space between blocks in', () => {
  const left = phoneCellCss({ col: 1, cols: 4 });
  assert.equal(left.gridColumn, '2 / span 4');
  assert.equal(left.marginLeft, '0px', 'the outer edge lines up with a block across the row');
  assert.equal(left.marginRight, 'calc(var(--urd-mobile-gap, 16px) / 2)');
  const right = phoneCellCss({ col: 5, cols: 4 });
  assert.equal(right.gridColumn, '6 / span 4');
  assert.equal(right.marginLeft, 'calc(var(--urd-mobile-gap, 16px) / 2)');
  assert.equal(right.marginRight, '0px');
  assert.equal(right.justifySelf, 'stretch');
});

test('mobilePlacementToCss: a flowing block in cells fills its cell, a picture keeping its desktop shape', () => {
  const text = mobilePlacementToCss({ col: 1, cols: 4 }, desktop, { autoGrow: true });
  assert.equal(text.width, '100%');
  assert.equal(text.gridColumn, undefined, 'the cell is the grid item');
  assert.equal(text.height, undefined);
  const box = mobilePlacementToCss({ col: 1, cols: 4 }, desktop, {});
  assert.equal(box.height, '120px');
  assert.equal(box.gridRow, undefined);
  // 40 % of 1200 px over 120 px.
  const picture = mobilePlacementToCss({ col: 5, cols: 4 }, desktop, { byWidth: true, designWidth: 1200 });
  assert.equal(picture.aspectRatio, '4');
  assert.equal(picture.height, undefined);
  assert.equal(mobilePlacementToCss({ col: 5, cols: 4 }, desktop, { byWidth: true }).height, '120px', 'without a design width it keeps its height');
});

test('mobilePlacementToCss: a block pinned in cells is a grid item of its own on its rows, and a block without cells is as before', () => {
  const pinned = mobilePlacementToCss({ row: 3, rows: 6, col: 3, cols: 2 }, desktop, {});
  assert.equal(pinned.gridRow, '3 / span 6');
  assert.equal(pinned.gridColumn, '4 / span 2');
  assert.equal(pinned.width, 'auto');
  assert.deepEqual(mobilePlacementToCss({ col: 1, cols: 8 }, desktop, {}), mobilePlacementToCss(null, desktop, {}), 'the full row is no cells');
});

test('the editor-only parts the push and the fit leave out are the ones base.css hides under .urd-fit-measure', async () => {
  const { readFileSync } = await import('node:fs');
  const css = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf-8');
  const rule = css.match(/((?:\.urd-preview \.urd-fit-measure [^,{]+,\s*)*\.urd-preview \.urd-fit-measure [^,{]+)\{/);
  assert.ok(rule, 'the .urd-fit-measure rule is in base.css');
  const hidden = rule[1].split(',').map((sel) => sel.trim().replace('.urd-preview .urd-fit-measure ', '')).sort();
  const listed = EDITOR_ONLY.split(',').map((sel) => sel.trim()).sort();
  assert.deepEqual(hidden, listed);
});

test('autoGrows: text always, else the definition\'s flag or its answer for the props', () => {
  assert.equal(autoGrows({ type: 'text', props: {} }, undefined), true);
  assert.equal(autoGrows({ type: 'faq', props: {} }, { autoGrow: true }), true);
  assert.equal(autoGrows({ type: 'image', props: {} }, {}), false);
  assert.equal(autoGrows({ type: 'nobody', props: {} }, undefined), false);
  // The gallery grows in its grid views and keeps its frame's height as a band.
  assert.equal(autoGrows({ type: 'gallery', props: { view: 'grid' } }, galleryBlock), true);
  assert.equal(autoGrows({ type: 'gallery', props: { view: 'mosaic' } }, galleryBlock), true);
  assert.equal(autoGrows({ type: 'gallery', props: { view: 'ribbon' } }, galleryBlock), false);
  assert.equal(autoGrows({ type: 'gallery' }, galleryBlock), true);
  const css = mobilePlacementToCss(null, { x: 0, y: 0, w: 50, h: 240 }, { autoGrow: autoGrows({ type: 'gallery', props: { view: 'ribbon' } }, galleryBlock) });
  assert.equal(css.height, '240px');
});

test('anchorTargets: a section name at its top, each block with its name, and on a phone the hidden blocks at the section top, each naming its owner', () => {
  const section = { id: 'sec-1', anchor: 'priser', blocks: [
    { id: 'blk-a', anchor: 'kaker' },
    { id: 'blk-b' },
    { id: 'blk-c', anchor: 'skjult', hideMobile: true },
    { id: 'blk-d', anchor: 'Not A Name' },
  ] };
  const desktop = anchorTargets(section, 'desktop');
  assert.deepEqual(desktop.section, [{ id: 'priser', of: 'sec-1' }]);
  assert.deepEqual([...desktop.blocks], [
    ['blk-a', [{ id: 'kaker', of: 'blk-a' }]], ['blk-b', []], ['blk-c', [{ id: 'skjult', of: 'blk-c' }]], ['blk-d', []],
  ]);
  const phone = anchorTargets(section, 'mobile');
  assert.deepEqual(phone.section, [{ id: 'priser', of: 'sec-1' }, { id: 'blk-c', of: 'blk-c' }, { id: 'skjult', of: 'blk-c' }], 'a block hidden on phones lands on its section');
  assert.equal(phone.blocks.has('blk-c'), false);
  assert.deepEqual(anchorTargets({ id: 'sec-2', anchor: 'sec-2x', blocks: [] }, 'desktop').section, [], 'a reserved prefix is not a name');
  assert.deepEqual(anchorTargets({ id: 'sec-3' }, 'desktop'), { section: [], blocks: new Map() });
  // A block shown on phones only lands on its section's top on the desktop, and stands on its own on a phone.
  const phoneOnly = { id: 'sec-4', blocks: [{ id: 'blk-p', anchor: 'ring', hideDesktop: true }] };
  assert.deepEqual(anchorTargets(phoneOnly, 'desktop').section, [{ id: 'blk-p', of: 'blk-p' }, { id: 'ring', of: 'blk-p' }]);
  assert.deepEqual([...anchorTargets(phoneOnly, 'mobile').blocks], [['blk-p', [{ id: 'ring', of: 'blk-p' }]]]);
});

test('the row span of a flowing block holds the gap under it, at most the standard: a larger gap grows the rows instead', () => {
  assert.equal(mobilePlacementToCss(null, { x: 0, y: 0, w: 100, h: 120 }, { gap: 8 }).gridRow, `auto / span ${Math.ceil((120 + 8) / MOBILE_ROW)}`);
  assert.equal(mobilePlacementToCss(null, { x: 0, y: 0, w: 100, h: 120 }, { gap: 40 }).gridRow, `auto / span ${Math.ceil((120 + MOBILE_GAP) / MOBILE_ROW)}`);
});
