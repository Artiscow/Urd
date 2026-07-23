/**
 * Kontraktstester for galleri-batchen: den rene logikken (galleri-model),
 * miniatyr-generatoren (preset-thumb) og def-kontraktene til galleri-blokken
 * og bildegalleri-bakgrunnslaget. DOM-rendering testes manuelt.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { stepIndex, canAutoplay, normalizeInterval, gridColumns } from '../template/assets/engine/galleri-model.js';
import { presetThumb, parseMinHeightPx } from '../template/assets/engine/preset-thumb.js';
import { registerSectionPresets } from '../template/assets/engine/sections/presets.js';
import { galleriBlock } from '../template/assets/engine/blocks/galleri.js';
import { bildegalleriLayer } from '../template/assets/engine/backgrounds/bildegalleri.js';

test('stepIndex: rundgang begge veier', () => {
  assert.equal(stepIndex(0, 1, 3), 1);
  assert.equal(stepIndex(2, 1, 3), 0);
  assert.equal(stepIndex(0, -1, 3), 2);
  assert.equal(stepIndex(1, -1, 3), 0);
  assert.equal(stepIndex(0, 5, 3), 2);
});

test('stepIndex: tom og ugyldig liste gir alltid 0', () => {
  assert.equal(stepIndex(0, 1, 0), 0);
  assert.equal(stepIndex(4, 1, 1), 0);
  assert.equal(stepIndex(0, 1, Number.NaN), 0);
  assert.equal(stepIndex(Number.NaN, 1, 3), 1);
});

test('canAutoplay: aldri med under to bilder eller redusert bevegelse', () => {
  assert.equal(canAutoplay({ count: 3 }), true);
  assert.equal(canAutoplay({ count: 1 }), false);
  assert.equal(canAutoplay({ count: 0 }), false);
  assert.equal(canAutoplay({ count: 3, reducedMotion: true }), false);
  assert.equal(canAutoplay(), false);
});

test('normalizeInterval: gulv og trygg standard', () => {
  assert.equal(normalizeInterval(5), 5);
  assert.equal(normalizeInterval(0.5), 2);
  assert.equal(normalizeInterval(0), 5);
  assert.equal(normalizeInterval(-3), 5);
  assert.equal(normalizeInterval('tull'), 5);
  assert.equal(normalizeInterval(undefined), 5);
  assert.equal(normalizeInterval(2.5), 2.5);
});

test('gridColumns: klem 1..6, aldri flere enn bildene, maks 2 på mobil', () => {
  assert.equal(gridColumns(3, 9, 'desktop'), 3);
  assert.equal(gridColumns(8, 9, 'desktop'), 6);
  assert.equal(gridColumns(0, 9, 'desktop'), 3);
  assert.equal(gridColumns('tull', 9, 'desktop'), 3);
  assert.equal(gridColumns(4, 2, 'desktop'), 2);
  assert.equal(gridColumns(4, 0, 'desktop'), 4);
  assert.equal(gridColumns(4, 9, 'mobile'), 2);
  assert.equal(gridColumns(1, 9, 'mobile'), 1);
});

test('parseMinHeightPx: px, vh og søppel', () => {
  assert.equal(parseMinHeightPx('360px'), 360);
  assert.equal(parseMinHeightPx('70vh'), 560);
  assert.equal(parseMinHeightPx('40vh'), 320);
  assert.equal(parseMinHeightPx(undefined), 400);
  assert.equal(parseMinHeightPx('tull'), 400);
  assert.equal(parseMinHeightPx('-20px'), 400);
});

test('presetThumb: gyldig skisse for alle registrerte presets', () => {
  const defs = new Map();
  registerSectionPresets({ sections: { define: (id, def) => defs.set(id, def) } });
  assert.ok(defs.size >= 18, `ventet minst 18 presets, fikk ${defs.size}`);
  for (const [id, def] of defs) {
    const svg = presetThumb(def.create());
    assert.ok(svg.startsWith('<svg '), `${id}: miniatyren er ikke en SVG`);
    assert.ok(svg.endsWith('</svg>'), `${id}: miniatyren er ikke lukket`);
    assert.ok(!svg.includes('NaN') && !svg.includes('undefined'), `${id}: ugyldige tall i miniatyren`);
    assert.ok(svg.includes('viewBox="0 0 120 68"'), `${id}: feil viewBox`);
  }
});

test('presetThumb: tåler tom og mangelfull seksjon', () => {
  for (const section of [undefined, {}, { blocks: [{ type: 'ukjent' }] }]) {
    const svg = presetThumb(section);
    assert.ok(svg.startsWith('<svg ') && !svg.includes('NaN'));
  }
});

test('presetThumb: slipper aldri uvaliderte strenger inn i SVG-en', () => {
  const svg = presetThumb({
    size: { minHeight: '300px' },
    background: { layers: [{ type: 'color', props: { value: '"><script>alert(1)</script>' } }] },
    blocks: [{ type: 'shape', props: { kind: 'rect', color: 'url(javascript:1)' }, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } }],
  });
  assert.ok(!svg.includes('script') && !svg.includes('javascript'));
});

test('galleri-blokken: def-kontrakten', () => {
  assert.equal(galleriBlock.version, 1);
  assert.equal(typeof galleriBlock.render, 'function');
  assert.ok(galleriBlock.migrations);
  const a = galleriBlock.defaults();
  const b = galleriBlock.defaults();
  assert.notEqual(a.images, b.images, 'defaults() må gi ferske objekter');
  assert.equal(a.view, 'grid');
  assert.equal(a.lightbox, true);
  assert.deepEqual(a.images, []);
});

test('bildegalleri-laget: def-kontrakten', () => {
  assert.equal(bildegalleriLayer.version, 1);
  assert.equal(typeof bildegalleriLayer.render, 'function');
  assert.ok(bildegalleriLayer.migrations);
  const a = bildegalleriLayer.defaults();
  assert.notEqual(a.images, bildegalleriLayer.defaults().images, 'defaults() må gi ferske objekter');
  assert.deepEqual(a.images, []);
  assert.equal(a.fit, 'cover');
});
