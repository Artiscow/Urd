/**
 * The site's «Back to top» button (totop.js, 0.7.13.14): its settings read with today's button as the standard, the shaped designs' outline with its waves, and a picture for each design in the design picker.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { engineImport, ENGINE_DIR } from './_engine.mjs';

const { toTopOf, toTopShape, toTopClip, toTopFillsWhole, toTopOutline, toTopShapeOf, TOTOP_FILLS, TOTOP_ICON_SIZE, TOTOP_DESIGNS, TOTOP_SHAPED, TOTOP_WORDED, TOTOP_SIZES, TOTOP_COUNT, TOTOP_COLOURS, TOTOP_HOVERS, TOTOP_PRESSES, TOTOP_LINES } = await engineImport('totop.js');

test('a site that sets nothing shows today\'s button: a circle in the window\'s right corner after a little scrolling, on phones too', () => {
  const none = { bg: null, ring: null, arrow: null, words: null, line: null, effect: null };
  assert.deepEqual(toTopOf(null), { show: true, design: 'circle', place: 'corner', side: 'right', size: 'm', phoneSize: null, colors: none, after: 'little', phone: true, text: '', waves: 0, count: TOTOP_COUNT.standard, hover: 'standard', press: null, line: 'solid', lineWidth: 1, glyph: '', icon: null, image: null, iconSize: 100, fill: 'edge', over: null, shape: null });
  assert.deepEqual(toTopOf({ layout: { contentWidth: 1440 } }), toTopOf({}));
  assert.equal(TOTOP_DESIGNS[0], 'circle');
  assert.deepEqual(TOTOP_SIZES, { m: 44, l: 56, xl: 68, xxl: 84 }, 'the standard is the smallest, and the sizes grow from it');
  assert.deepEqual(TOTOP_COLOURS, ['bg', 'ring', 'arrow', 'words', 'line', 'effect']);
  assert.deepEqual(TOTOP_HOVERS, ['standard', 'underline', 'pill', 'liftPlain', 'lift'], 'the menu links\' hover styles');
  assert.deepEqual(TOTOP_PRESSES, ['tint', 'underline', 'shrink'], 'the menu links\' answers to a touch');
  assert.deepEqual(TOTOP_LINES, ['none', 'solid', 'dashed', 'dotted', 'double']);
});

test('each setting is read within what it takes, and anything else falls back to the standard', () => {
  const set = toTopOf({ layout: { toTop: { show: false, design: 'words', place: 'content', side: 'left', size: 'xl', phoneSize: 'l', colors: { bg: 'accent', arrow: ' #fff ', words: 'text', line: 'accent', effect: '#c00' }, after: 'screen', phone: false, text: '  Opp  ', waves: 63.6, count: 8, hover: 'lift', press: 'tint', line: 'double', lineWidth: 3 } } });
  assert.deepEqual(set, { show: false, design: 'words', place: 'content', side: 'left', size: 'xl', phoneSize: 'l', colors: { bg: 'accent', ring: null, arrow: '#fff', words: 'text', line: 'accent', effect: '#c00' }, after: 'screen', phone: false, text: 'Opp', waves: 64, count: 8, hover: 'lift', press: 'tint', line: 'double', lineWidth: 3, glyph: '', icon: null, image: null, iconSize: 100, fill: 'edge', over: null, shape: null });
  const odd = toTopOf({ layout: { toTop: { design: 'star', place: 'middle', side: 'up', size: 's', phoneSize: 'huge', colors: { bg: '' }, after: 'later', text: 'x'.repeat(60), waves: 400, count: 99, hover: 'spin', press: 'flash', line: 'wavy', lineWidth: 9 } } });
  assert.equal(odd.design, 'circle');
  assert.equal(odd.place, 'corner');
  assert.equal(odd.side, 'right');
  assert.equal(odd.size, 'm', 'a size the button does not have reads as the standard');
  assert.equal(odd.phoneSize, null);
  assert.equal(odd.colors.bg, null);
  assert.equal(odd.hover, 'standard');
  assert.equal(odd.press, null);
  assert.equal(odd.line, 'solid');
  assert.equal(odd.lineWidth, 4);
  assert.equal(odd.after, 'little');
  assert.equal(odd.text.length, 40, 'the words are cut at the longest the button takes');
  assert.equal(odd.waves, 100);
  assert.equal(odd.count, 16);
  assert.equal(toTopOf({ layout: { toTop: { count: 1 } } }).count, 4);
  assert.equal(toTopOf({ layout: { toTop: { count: null } } }).count, TOTOP_COUNT.standard, 'an emptied amount reads as the standard');
  assert.equal(toTopOf({ layout: { toTop: { count: '' } } }).count, TOTOP_COUNT.standard);
  assert.deepEqual(TOTOP_SHAPED, ['circle', 'square', 'ring']);
  assert.deepEqual(TOTOP_WORDED, ['pill', 'words']);
});

/** The radii of an outline's points from the box's middle. */
const radii = (d) => [...d.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map(([, x, y]) => Math.hypot(Number(x) - 50, Number(y) - 50));

test('a smooth edge is drawn exactly, and the waves grow deeper and their crests narrower as the slider goes on', () => {
  assert.match(toTopShape('circle', 0), /^M 50 0 A 50 50 0 1 1 50 100 A 50 50 0 1 1 50 0 Z$/, 'a circle of arcs filling the box, as the round button always has');
  assert.match(toTopShape('square', 0), /^M 24 0 H 76 A 24 24/, 'a rounded square filling the box');
  assert.match(toTopShape('ring', 0), /^M 50 4 A 46 46 0 1 1 50 96/, 'the ring a little inside the box, so its line is drawn whole');
  const gentle = radii(toTopShape('circle', 20, 8));
  const pointy = radii(toTopShape('circle', 100, 8));
  assert.equal(gentle.length, 48 * 8, 'a point for every step round the edge');
  const depth = (r) => Math.max(...r) - Math.min(...r);
  assert.ok(depth(pointy) > depth(gentle) * 2, 'deeper waves at the far end');
  assert.ok(Math.abs(Math.max(...pointy) - 50) < 0.01, 'the crests reach the edge of the shape');
  for (const design of ['circle', 'square', 'ring']) {
    for (const [w, c] of [[100, 4], [100, 16], [1, 10]]) {
      const xy = [...toTopShape(design, w, c).matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map(([, x, y]) => [Number(x), Number(y)]);
      assert.ok(xy.every(([x, y]) => x >= 0 && x <= 100 && y >= 0 && y <= 100 && Number.isFinite(x)), `${design} ${w} ${c} stays in the box`);
    }
  }
  // How much of the edge stands near the crests: a pointier wave keeps less of the edge out by its crest.
  const nearCrest = (r) => r.filter((v) => v > Math.max(...r) - depth(r) * 0.2).length / r.length;
  assert.ok(nearCrest(pointy) < nearCrest(gentle), 'narrower crests at the far end');
  // One crest points straight up: the first point stands at the top.
  assert.match(toTopShape('circle', 50, 10), /^M 50\.00 0\.00 /);
  assert.equal(radii(toTopShape('circle', 50, 12)).length, 48 * 12, 'as many waves as asked');
});

test('every design stands in the design picker with its picture and its words in the three core languages', async () => {
  for (const id of TOTOP_DESIGNS) {
    assert.ok(existsSync(new URL(`../template/admin/designs/totop-${id}.webp`, import.meta.url)), `totop-${id}.webp`);
  }
  for (const lang of ['nb', 'en-GB', 'tr']) {
    const dict = (await engineImport(`locales/admin/${lang}.js`)).default.strings;
    for (const id of TOTOP_DESIGNS) {
      assert.ok(dict[`toTopDesign.${id}`], `${lang} toTopDesign.${id}`);
      assert.ok(dict[`design.toTop.${id}`], `${lang} design.toTop.${id}`);
    }
  }
  const sources = readFileSync(new URL('../editor/src/lib/design-sources.js', import.meta.url), 'utf8');
  assert.match(sources, /picture: \(id\) => `\/admin\/designs\/totop-\$\{id\}\.webp`/);
});

test('a mark of the owner\'s own stands in place of the arrow: a character, a drawn icon from Urd\'s set, or a safe picture', () => {
  const mark = (raw) => { const set = toTopOf({ layout: { toTop: raw } }); return [set.glyph, set.icon, set.image]; };
  assert.deepEqual(mark({ glyph: '  ★  ' }), ['★', null, null]);
  assert.equal(mark({ glyph: 'abcdefghijklmn' })[0], 'abcdefgh', 'a few characters at most');
  assert.deepEqual(mark({ icon: 'heart' }), ['', 'heart', null]);
  assert.deepEqual(mark({ icon: 'no-such-icon' }), ['', null, null], 'an icon Urd does not draw is none');
  assert.deepEqual(mark({ image: '/media/images/totop-icon-1a2b3c4d.webp' }), ['', null, '/media/images/totop-icon-1a2b3c4d.webp']);
  assert.equal(mark({ image: 'data:image/webp;base64,AAAA' })[2], 'data:image/webp;base64,AAAA', 'a picture not yet published');
  assert.equal(mark({ image: 'javascript:alert(1)' })[2], null, 'an unsafe source is none');
  assert.equal(mark({ image: 'https://elsewhere.example/x.png' })[2], null, 'a picture on another host is none');
});

test('the arrow\'s or the own mark\'s size is a percent of its size in the design, in steps of five, kept in its range', () => {
  const size = (iconSize) => toTopOf({ layout: { toTop: { iconSize } } }).iconSize;
  assert.deepEqual(TOTOP_ICON_SIZE, { min: 50, max: 200, step: 5, standard: 100 });
  assert.equal(size(140), 140);
  assert.equal(size(142), 140, 'snapped to the slider\'s steps');
  assert.equal(size(10), 50);
  assert.equal(size(900), 200);
  for (const none of [undefined, null, '', 'big']) assert.equal(size(none), 100, `${none} reads as the standard`);
  const css = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8');
  assert.match(css, /\.urd-totop-mark \{[^}]*font-size: calc\(1em \* var\(--urd-totop-mark-scale, 1\)\);/, 'the arrow, a character and a picture all follow the scale');
  assert.match(css, /\.urd-totop-glyph \{[^}]*font-size: calc\(1\.1em \* var\(--urd-totop-mark-scale, 1\)\);/, 'a character, whose own size stands on the mark itself');
});

test('on a shaped design the mark is cut to the button\'s outline, and a picture may fill the whole button', () => {
  const set = (raw) => toTopOf({ layout: { toTop: raw } });
  assert.deepEqual(TOTOP_FILLS, ['edge', 'whole']);
  assert.equal(set({ fill: 'all' }).fill, 'edge', 'an unknown fill reads as the standard');
  // The outline as an image of the shape, the waves included.
  const clip = toTopClip(set({ design: 'circle', waves: 40, count: 8 }));
  assert.match(clip, /^url\("data:image\/svg\+xml,%3Csvg/);
  assert.ok(decodeURIComponent(clip).includes(`d="${toTopShape('circle', 40, 8)}"`));
  for (const design of ['pill', 'words']) assert.equal(toTopClip(set({ design })), null, `${design} has no outline to cut to`);
  // A picture fills the whole button only on a shaped design, and only when it is a picture.
  const PIC = '/media/images/totop-icon-1a2b3c4d.webp';
  assert.equal(toTopFillsWhole(set({ design: 'circle', image: PIC, fill: 'whole' })), true);
  assert.equal(toTopFillsWhole(set({ design: 'circle', image: PIC })), false, 'inside the edge is the standard');
  assert.equal(toTopFillsWhole(set({ design: 'circle', icon: 'heart', fill: 'whole' })), false, 'a drawn icon keeps its size');
  assert.equal(toTopFillsWhole(set({ design: 'pill', image: PIC, fill: 'whole' })), false);
  // The ring's whole picture covers its line: it is cut to the whole box, as the circle is.
  assert.ok(decodeURIComponent(toTopClip(set({ design: 'ring', image: PIC, fill: 'whole' }))).includes(`d="${toTopShape('circle', 0, 10)}"`));
  assert.ok(decodeURIComponent(toTopClip(set({ design: 'ring' }))).includes(`d="${toTopShape('ring', 0, 10)}"`));
  const css = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8');
  assert.match(css, /\.urd-totop-ring \.urd-totop-label \{[^}]*mask-image: var\(--urd-totop-clip, none\);\s*mask-size: 84% 84%;/, 'inside the edge, the outline drawn a little smaller');
  assert.match(css, /\.urd-totop-whole \.urd-totop-label \{\s*mask-size: 100% 100%;/);
  assert.match(css, /\.urd-totop-whole \.urd-totop-shape \{\s*display: none;/, 'a whole picture is the button, no background seen at its edge');
});

test('a mark can stand over a picture that fills the whole button: the arrow, or a drawn icon or a character in its place', () => {
  const set = (raw) => toTopOf({ layout: { toTop: raw } });
  assert.equal(set({}).over, null, 'nothing over the picture by default');
  assert.deepEqual(set({ over: {} }).over, { icon: null, glyph: '' }, 'an empty mark is the arrow');
  assert.deepEqual(set({ over: { icon: 'star' } }).over, { icon: 'star', glyph: '' });
  assert.deepEqual(set({ over: { icon: 'no-such-icon', glyph: '  ↑  ' } }).over, { icon: null, glyph: '↑' }, 'an unknown icon is dropped, a character trimmed');
  for (const odd of [true, 'arrow', ['star']]) assert.equal(set({ over: odd }).over, null, `${JSON.stringify(odd)} is no mark`);
  // Drawn in a mark of its own over the picture, and taken away with the picture when it fails to load.
  const js = readFileSync(new URL('totop.js', ENGINE_DIR), 'utf8');
  assert.match(js, /if \(toTopFillsWhole\(set\) && set\.over\) \{\s*const over = markOf\(\{ \.\.\.set, image: null, icon: set\.over\.icon, glyph: set\.over\.glyph \}\);\s*over\.classList\.add\('urd-totop-over'\);/);
  assert.match(js, /mark\.parentElement\?\.querySelector\(':scope > \.urd-totop-over'\)\?\.remove\(\);/);
});

test('a shaped design draws the owner\'s shape where there is one, and its own outline exactly as before without it', async () => {
  const { shapeOf, shapeOutline, outlinePath, outlineMiddle, shapeId } = await engineImport('shape-model.js');
  const set = (raw) => toTopOf({ layout: { toTop: raw } });
  // Without a shape: the design's own outline, the waves of waves and count, the mark in the box's middle.
  assert.deepEqual(toTopOutline(set({ design: 'square' })), { d: toTopShape('square', 0), mark: [50, 50] });
  assert.equal(toTopOutline(set({ waves: 40, count: 8 })).d, toTopShape('circle', 40, 8));
  assert.equal(toTopOutline(set({ design: 'ring' })).d, toTopShape('ring', 0));
  assert.equal(toTopOutline(set({ design: 'ring' }), true).d, toTopShape('circle', 0), 'a whole picture on the ring is cut to the whole box');
  // With one: the shape's outline, the ring's a little inside the box, the mark at the shape's middle or where the owner put it.
  const drop = set({ shape: { point: 70 } });
  assert.equal(toTopOutline(drop).d, outlinePath(shapeOutline(shapeOf({ point: 70 }))));
  assert.ok(toTopOutline(drop).mark[1] > 52, 'the mark below the box\'s middle on a shape with a point at the top');
  assert.deepEqual(toTopOutline(set({ shape: { point: 70, icon: [40, 60] } })).mark, [40, 60]);
  const ring = shapeOutline(shapeOf({ sides: 6 }), 4);
  assert.equal(toTopOutline(set({ design: 'ring', shape: { sides: 6 } })).d, outlinePath(ring));
  assert.ok(ring.every(([x, y]) => x >= 3.99 && x <= 96.01 && y >= 3.99 && y <= 96.01), 'the ring\'s line stays in the box');
  assert.deepEqual(outlineMiddle(shapeOutline(shapeOf({}))).map((n) => Math.round(n)), [50, 50]);
  for (const odd of ['star', [], 7]) assert.equal(set({ shape: odd }).shape, null, 'a shape that is not an object is none');
  assert.ok(decodeURIComponent(toTopClip(set({ shape: { sides: 6 } }))).includes(outlinePath(shapeOutline(shapeOf({ sides: 6 })))), 'the mark is cut to the same outline');
  // What the shape window starts from on a button without a shape.
  assert.equal(shapeId(toTopShapeOf(set({}))), 'circle');
  assert.equal(shapeId(toTopShapeOf(set({ design: 'square' }))), 'roundedSquare');
  const waved = toTopShapeOf(set({ waves: 50, count: 9 }));
  assert.ok(waved.waves > 0 && waved.count === 9 && waved.sharp > 0, 'the waves carried over');
  assert.equal(toTopShapeOf(drop), drop.shape);
});
