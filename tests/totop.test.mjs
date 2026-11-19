/**
 * The site's «Back to top» button (totop.js, 0.7.13.14): its settings read with today's button as the standard, the shaped designs' outline with its waves, and a picture for each design in the design picker.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { engineImport } from './_engine.mjs';

const { toTopOf, toTopShape, TOTOP_DESIGNS, TOTOP_SHAPED, TOTOP_WORDED, TOTOP_SIZES, TOTOP_COUNT, TOTOP_COLOURS, TOTOP_HOVERS, TOTOP_PRESSES, TOTOP_LINES } = await engineImport('totop.js');

test('a site that sets nothing shows today\'s button: a circle in the window\'s right corner after a little scrolling, on phones too', () => {
  const none = { bg: null, ring: null, arrow: null, words: null, line: null, effect: null };
  assert.deepEqual(toTopOf(null), { show: true, design: 'circle', place: 'corner', side: 'right', size: 'm', phoneSize: null, colors: none, after: 'little', phone: true, text: '', waves: 0, count: TOTOP_COUNT.standard, hover: 'standard', press: null, line: 'solid', lineWidth: 1 });
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
  assert.deepEqual(set, { show: false, design: 'words', place: 'content', side: 'left', size: 'xl', phoneSize: 'l', colors: { bg: 'accent', ring: null, arrow: '#fff', words: 'text', line: 'accent', effect: '#c00' }, after: 'screen', phone: false, text: 'Opp', waves: 64, count: 8, hover: 'lift', press: 'tint', line: 'double', lineWidth: 3 });
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
