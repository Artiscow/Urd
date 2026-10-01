/**
 * Contract tests for the section shape dividers (divider-model.js) and the
 * pattern background layer (backgrounds/pattern.js): the pure parts. The DOM
 * rendering is tested manually.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { engineImport } from './_engine.mjs';

const { DIVIDER_SHAPES, DIVIDER_HEIGHT, dividerPath, dividerSvg, sectionDivider } = await engineImport('divider-model.js');
const {
  patternLayer, BG_PATTERNS, PATTERN_SIZE, PATTERN_OPACITY, bgPattern, patternSize, patternRotation, patternOpacity, patternSvg,
} = await engineImport('backgrounds/pattern.js');

test('sectionDivider: nothing without a known shape', () => {
  assert.equal(sectionDivider(undefined), null);
  assert.equal(sectionDivider(null), null);
  assert.equal(sectionDivider({}), null);
  assert.equal(sectionDivider({ shape: 'spiral' }), null);
  assert.equal(sectionDivider('wave'), null);
});

test('sectionDivider: the defaults, and the bounds on the height', () => {
  assert.deepEqual(sectionDivider({ shape: 'wave' }), { shape: 'wave', height: DIVIDER_HEIGHT.dflt, color: 'bg', flip: false, invert: false });
  assert.equal(sectionDivider({ shape: 'tilt', height: 4 }).height, DIVIDER_HEIGHT.min);
  assert.equal(sectionDivider({ shape: 'tilt', height: 9000 }).height, DIVIDER_HEIGHT.max);
  assert.equal(sectionDivider({ shape: 'tilt', height: 'hoy' }).height, DIVIDER_HEIGHT.dflt);
  assert.equal(sectionDivider({ shape: 'tilt', height: 100.4 }).height, 100);
  const own = sectionDivider({ shape: 'zigzag', height: 80, color: 'surface', flip: true });
  assert.deepEqual(own, { shape: 'zigzag', height: 80, color: 'surface', flip: true, invert: false });
  assert.equal(sectionDivider({ shape: 'triangle', invert: true }).invert, true);
  // Only a real true mirrors.
  assert.equal(sectionDivider({ shape: 'curve', flip: 'yes' }).flip, false);
});

test('dividerPath: every shape is one closed outline standing on the foot of its box', () => {
  for (const shape of DIVIDER_SHAPES) {
    const d = dividerPath(shape);
    assert.match(d, /^M[\d. ]+/, shape);
    assert.match(d, /Z$/, shape);
    // Path data only: nothing that could close the attribute it is written into.
    assert.match(d, /^[MLHVCSQTZ\d. -]+$/, shape);
    // Every coordinate stays inside the 1200 x 120 box.
    for (const n of d.match(/-?\d+(?:\.\d+)?/g).map(Number)) assert.ok(n >= 0 && n <= 1200, `${shape}: ${n}`);
  }
  assert.equal(new Set(DIVIDER_SHAPES.map(dividerPath)).size, DIVIDER_SHAPES.length);
  // An unknown shape draws the wave rather than nothing recognisable.
  assert.equal(dividerPath('spiral'), dividerPath('wave'));
});

test('dividerSvg: the outline, or its complement standing on the same foot', () => {
  const plain = dividerSvg({ shape: 'triangle' });
  assert.match(plain, /^<svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">/);
  assert.ok(plain.includes(`d="${dividerPath('triangle')}"`));
  assert.ok(!plain.includes('evenodd'));
  const cut = dividerSvg({ shape: 'triangle', invert: true });
  assert.ok(cut.includes('fill-rule="evenodd"'));
  assert.ok(cut.includes(`d="M0 0H1200V120H0Z${dividerPath('triangle')}"`));
  assert.ok(cut.includes('scale(1 -1)'));
  assert.notEqual(cut, plain);
});

test('the schema knows the same shapes and bounds', () => {
  const schema = JSON.parse(readFileSync(new URL('../schema/page.schema.json', import.meta.url), 'utf8'));
  const edge = schema.$defs.dividerEdge.properties;
  assert.deepEqual(edge.shape.enum, DIVIDER_SHAPES);
  assert.equal(edge.height.minimum, DIVIDER_HEIGHT.min);
  assert.equal(edge.height.maximum, DIVIDER_HEIGHT.max);
  assert.equal(edge.height.default, DIVIDER_HEIGHT.dflt);
  assert.ok(schema.$defs.section.properties.divider);
});

test('the pattern layer: the def contract and the safe defaults', () => {
  assert.equal(patternLayer.version, 1);
  assert.equal(patternLayer.labelKey, 'bgLayer.pattern');
  assert.deepEqual(patternLayer.defaults(), { pattern: 'dots', color: 'text', size: PATTERN_SIZE.dflt, opacity: PATTERN_OPACITY, rotation: 0, invert: false });
  assert.equal(BG_PATTERNS.length, 8);
});

test('the pattern layer: allowlist and clamps', () => {
  for (const id of BG_PATTERNS) assert.equal(bgPattern(id), id);
  assert.equal(bgPattern('paisley'), 'dots');
  assert.equal(bgPattern(undefined), 'dots');
  assert.equal(patternSize(40), 40);
  assert.equal(patternSize(1), PATTERN_SIZE.min);
  assert.equal(patternSize(9000), PATTERN_SIZE.max);
  assert.equal(patternSize('stor'), PATTERN_SIZE.dflt);
  assert.equal(patternRotation(45), 45);
  assert.equal(patternRotation(405), 45);
  assert.equal(patternRotation(-90), 270);
  assert.equal(patternRotation('skra'), 0);
  assert.equal(patternOpacity(0.5), 0.5);
  assert.equal(patternOpacity(0), 0);
  assert.equal(patternOpacity(7), 1);
  assert.equal(patternOpacity(undefined), PATTERN_OPACITY);
  assert.equal(patternOpacity('sterk'), PATTERN_OPACITY);
});

test('patternSvg: the tile as a pattern, sized and turned, and nothing from the props as written', () => {
  const plain = patternSvg({ pattern: 'grid', size: 40 });
  assert.match(plain, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="100%" height="100%">/);
  assert.match(plain, /<pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">/);
  assert.ok(!plain.includes('patternTransform'));
  assert.ok(!plain.includes('<mask'));
  assert.match(patternSvg({ rotation: 45 }), /patternTransform="rotate\(45\)"/);
  // Inverted: the figures are cut out of a full surface.
  const cut = patternSvg({ invert: true });
  assert.match(cut, /<mask id="m"><rect width="100%" height="100%" fill="#fff"\/>/);
  assert.match(cut, /mask="url\(#m\)"/);
  // Each tile draws something of its own.
  assert.equal(new Set(BG_PATTERNS.map((id) => patternSvg({ pattern: id }))).size, BG_PATTERNS.length);
  // Junk never reaches the markup.
  const junk = patternSvg({ pattern: '"><script>', size: '"><script>', rotation: '"><script>' });
  assert.ok(!junk.includes('script'));
  assert.equal(junk, patternSvg({}));
});

test('the pattern layer: masks its colour with the pattern, and draws nothing without mask support', () => {
  const stub = () => ({ style: {} });
  const none = stub();
  patternLayer.render(none, patternLayer.defaults());
  assert.deepEqual(none.style, {});
  globalThis.CSS = { supports: (prop) => prop === 'mask-image' };
  try {
    const el = stub();
    patternLayer.render(el, { pattern: 'dots', color: 'accent', opacity: 0.3, size: 20 });
    assert.equal(el.style.backgroundColor, 'var(--urd-color-accent)');
    assert.equal(el.style.opacity, '0.3');
    assert.match(el.style.maskImage, /^url\("data:image\/svg\+xml,%3Csvg/);
    assert.equal(el.style.webkitMaskImage, el.style.maskImage);
    assert.equal(el.style.maskSize, '100% 100%');
    assert.equal(el.style.maskRepeat, 'no-repeat');
    // The data URL carries no raw quote, bracket or hash that could end the url().
    assert.ok(!/["<>#]/.test(el.style.maskImage.slice(5, -2)));
  } finally {
    delete globalThis.CSS;
  }
});
