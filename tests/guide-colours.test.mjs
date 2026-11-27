/**
 * The colours of the canvas's guides and a drag's marks (guide-colours.js): the stored choices and their defaults, each colour's shades readable on its kind of site,
 * Auto keeping Magenta until it looks close to the site's colours or the guides, the marks of colours close to the site's, the preview's custom properties, and the boxes' L-shaped corners.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const {
  SHADES, SNAP_COLOURS, AUTO_ORDER, GUIDE_COLOURS, GAP_LOOKS,
  gapLookOf, guideColourOf, guideStrengthOf, snapColourOf, rgbOf, contrast, apart, schemeOf,
  siteColoursOf, nearColour, autoSnap, snapName, tagInk, guideVars, fitDash,
} = await engineImport('guide-colours.js');

const site = (bg, surface, text, accent, sets = []) => ({ theme: { tokens: { color: { bg, surface, text, accent } }, colorSets: [{ name: 'Mine', colors: sets.map((code) => ({ code })) }] } });
const BAKERY = site('#fbf7f0', '#efe4d2', '#2b2118', '#c2410c', ['#15803d', '#e9b949']);
const CLUB = site('#0f1d21', '#17303a', '#e8f0f0', '#2ec8b5', ['#3b82f6']);
const STUDIO = site('#fff7fb', '#fbe4ef', '#1f1020', '#db2777', ['#7c3aed']);

test('a stored choice reads as itself where known, else as its default', () => {
  assert.equal(gapLookOf(null), 'measures');
  assert.equal(gapLookOf('boxes'), 'boxes');
  assert.equal(guideColourOf('green'), 'quiet', 'no green guides');
  assert.equal(guideColourOf('violet'), 'violet');
  assert.equal(guideStrengthOf(undefined), 'medium');
  assert.equal(guideStrengthOf('strong'), 'strong');
  assert.equal(snapColourOf('red'), 'auto');
  assert.deepEqual(GAP_LOOKS, ['measures', 'boxes']);
  assert.deepEqual(GUIDE_COLOURS, ['quiet', 'cyan', 'blue', 'violet', 'magenta', 'orange']);
  assert.deepEqual(SNAP_COLOURS, ['auto', 'magenta', 'violet', 'blue', 'cyan', 'orange']);
});

test('every colour has a shade that reads at 4:1 or more on its kind of site, and no two of the set look alike', () => {
  for (const [name, { light, dark }] of Object.entries(SHADES)) {
    assert.ok(contrast(light, '#ffffff') >= 4, `${name} on white`);
    assert.ok(contrast(dark, '#0f1d21') >= 4, `${name} on a dark page`);
  }
  for (const a of AUTO_ORDER) for (const b of AUTO_ORDER) if (a < b) assert.ok(apart(SHADES[a].light, SHADES[b].light) > 0.08, `${a} and ${b}`);
  assert.deepEqual(rgbOf('#fff'), [1, 1, 1]);
  assert.deepEqual(rgbOf('rgb(15, 29, 33)'), [15 / 255, 29 / 255, 33 / 255], 'the Background as the page draws it');
  assert.deepEqual(rgbOf('rgba(0 0 0 / 50%)'), [0, 0, 0]);
  assert.equal(rgbOf('light-dark(#fff, #000)'), null);
  assert.equal(schemeOf('rgb(15, 29, 33)'), 'dark');
  assert.equal(schemeOf('#0f1d21'), 'dark');
  assert.equal(schemeOf('#fbf7f0'), 'light');
  assert.equal(schemeOf(undefined), 'light');
});

test('Auto keeps Magenta, moving on in its order where a colour looks close to the site\'s or to the guides', () => {
  assert.equal(autoSnap(siteColoursOf(BAKERY), 'light'), 'magenta');
  assert.equal(autoSnap(siteColoursOf(CLUB), 'dark'), 'magenta');
  assert.equal(autoSnap(siteColoursOf(STUDIO), 'light'), 'cyan', 'a pink accent sends it to Cyan');
  assert.equal(autoSnap(siteColoursOf(BAKERY), 'light', 'magenta'), 'cyan', 'apart from Magenta guides');
  assert.equal(snapName('violet', siteColoursOf(STUDIO), 'light', 'quiet'), 'violet', 'a colour chosen by hand stays');
  assert.equal(snapName('auto', siteColoursOf(STUDIO), 'light', 'quiet'), 'cyan');
});

test('the site\'s colours are its theme\'s four and its colour sets\', and a set colour close to one is found with its role', () => {
  const colours = siteColoursOf(BAKERY);
  assert.deepEqual(colours.map((c) => c.role), ['bg', 'surface', 'text', 'accent', 'set', 'set']);
  assert.deepEqual(siteColoursOf(null), []);
  const paired = { theme: { tokens: { color: { bg: '#ffffff', accent: '#15b39a' } }, alt: { tokens: { color: { bg: '#000000', accent: '#db2777' } } } } };
  assert.deepEqual(siteColoursOf(paired).map((c) => c.code), ['#ffffff', '#15b39a', '#000000', '#db2777'], 'both modes\' colours');
  assert.equal(nearColour(SHADES.orange.light, colours)?.role, 'accent');
  assert.equal(nearColour(SHADES.magenta.light, colours), null);
  const set = nearColour(SHADES.violet.light, siteColoursOf(STUDIO));
  assert.equal(set?.role, 'set');
  assert.equal(set?.set, 'Mine');
});

test('the preview\'s properties: the snap colour\'s shade and its tag\'s ink, Quiet guides left to each section\'s Text, a colour and the strength\'s shares', () => {
  const quiet = guideVars({}, BAKERY, '#fbf7f0');
  assert.equal(quiet['--urd-snap'], SHADES.magenta.light);
  assert.equal(quiet['--urd-snap-ink'], '#ffffff');
  assert.equal(quiet['--urd-guide-tone'], '', 'Quiet takes the Text of each section');
  assert.equal(quiet['--urd-guide-strong'], '30%');
  const dark = guideVars({ guide: 'cyan', strength: 'strong', snap: 'orange' }, CLUB, '#0f1d21');
  assert.equal(dark['--urd-snap'], SHADES.orange.dark);
  assert.equal(dark['--urd-snap-ink'], '#0f1d21', 'a light shade carries dark words');
  assert.equal(dark['--urd-guide-tone'], SHADES.cyan.dark);
  assert.equal(dark['--urd-guide-strong'], '95%');
  assert.equal(tagInk(SHADES.magenta.light, '#ffffff'), '#ffffff');
});

test('a dashed side starts and ends on a dash, so a box\'s corners meet as an L', () => {
  for (const length of [40, 61, 221, 333]) {
    const gap = fitDash(length, 6, 4);
    const count = Math.round((length + gap) / (6 + gap));
    assert.ok(Math.abs(count * 6 + (count - 1) * gap - length) < 1e-9, `${length}`);
    assert.ok(gap > 1 && gap < 8, `${length}: ${gap}`);
  }
  assert.equal(fitDash(10, 6, 4), 0, 'too short for two dashes: solid');
});
