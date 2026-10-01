/**
 * Contract tests for the gallery batch: the pure logic (gallery-model), the thumbnail generator (preset-thumb) and the def contracts of the gallery block and the slideshow background layer.
 * DOM rendering is tested manually.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const {
  stepIndex, canAutoplay, normalizeInterval, gridColumns, GALLERY_VIEWS, GRID_VIEWS, MOSAIC_ROW, POLAROID_TILT,
  galleryView, gallerySeed, mosaicRowHeight, tileSpans, mosaicWall, polaroidTilts,
} = await engineImport('gallery-model.js');
const { mosaicSpan, mosaicSpans, frameTilt, photoLayout } = await engineImport('gallery-layout.js');
const { presetThumb, parseMinHeightPx } = await engineImport('preset-thumb.js');
const { registerSectionPresets } = await engineImport('sections/presets.js');
const { galleryBlock } = await engineImport('blocks/gallery.js');
const { slideshowLayer } = await engineImport('backgrounds/slideshow.js');

test('stepIndex: wraps around both ways', () => {
  assert.equal(stepIndex(0, 1, 3), 1);
  assert.equal(stepIndex(2, 1, 3), 0);
  assert.equal(stepIndex(0, -1, 3), 2);
  assert.equal(stepIndex(1, -1, 3), 0);
  assert.equal(stepIndex(0, 5, 3), 2);
});

test('stepIndex: an empty or invalid list always gives 0', () => {
  assert.equal(stepIndex(0, 1, 0), 0);
  assert.equal(stepIndex(4, 1, 1), 0);
  assert.equal(stepIndex(0, 1, Number.NaN), 0);
  assert.equal(stepIndex(Number.NaN, 1, 3), 1);
});

test('canAutoplay: never with fewer than two images or reduced motion', () => {
  assert.equal(canAutoplay({ count: 3 }), true);
  assert.equal(canAutoplay({ count: 1 }), false);
  assert.equal(canAutoplay({ count: 0 }), false);
  assert.equal(canAutoplay({ count: 3, reducedMotion: true }), false);
  assert.equal(canAutoplay(), false);
});

test('normalizeInterval: floor and safe default', () => {
  assert.equal(normalizeInterval(5), 5);
  assert.equal(normalizeInterval(0.5), 2);
  assert.equal(normalizeInterval(0), 5);
  assert.equal(normalizeInterval(-3), 5);
  // 'tull' is deliberate Norwegian garbage input (any non-number).
  assert.equal(normalizeInterval('tull'), 5);
  assert.equal(normalizeInterval(undefined), 5);
  assert.equal(normalizeInterval(2.5), 2.5);
});

test('gridColumns: clamp 1..6, never more than the images, max 2 on mobile', () => {
  assert.equal(gridColumns(3, 9, 'desktop'), 3);
  assert.equal(gridColumns(8, 9, 'desktop'), 6);
  assert.equal(gridColumns(0, 9, 'desktop'), 3);
  assert.equal(gridColumns('tull', 9, 'desktop'), 3);
  assert.equal(gridColumns(4, 2, 'desktop'), 2);
  assert.equal(gridColumns(4, 0, 'desktop'), 4);
  assert.equal(gridColumns(4, 9, 'mobile'), 2);
  assert.equal(gridColumns(1, 9, 'mobile'), 1);
});

test('parseMinHeightPx: px, vh and garbage', () => {
  assert.equal(parseMinHeightPx('360px'), 360);
  assert.equal(parseMinHeightPx('70vh'), 560);
  assert.equal(parseMinHeightPx('40vh'), 320);
  assert.equal(parseMinHeightPx(undefined), 400);
  assert.equal(parseMinHeightPx('tull'), 400);
  assert.equal(parseMinHeightPx('-20px'), 400);
});

test('presetThumb: a valid sketch for every registered preset', () => {
  const defs = new Map();
  registerSectionPresets({ sections: { define: (id, def) => defs.set(id, def) } });
  assert.ok(defs.size >= 18, `expected at least 18 presets, got ${defs.size}`);
  for (const [id, def] of defs) {
    const svg = presetThumb(def.create());
    assert.ok(svg.startsWith('<svg '), `${id}: the thumbnail is not an SVG`);
    assert.ok(svg.endsWith('</svg>'), `${id}: the thumbnail is not closed`);
    assert.ok(!svg.includes('NaN') && !svg.includes('undefined'), `${id}: invalid numbers in the thumbnail`);
    assert.ok(svg.includes('viewBox="0 0 120 68"'), `${id}: wrong viewBox`);
  }
});

test('presetThumb: tolerates an empty or incomplete section', () => {
  for (const section of [undefined, {}, { blocks: [{ type: 'ukjent' }] }]) {
    const svg = presetThumb(section);
    assert.ok(svg.startsWith('<svg ') && !svg.includes('NaN'));
  }
});

test('presetThumb: never lets unvalidated strings into the SVG', () => {
  const svg = presetThumb({
    size: { minHeight: '300px' },
    background: { layers: [{ type: 'color', props: { value: '"><script>alert(1)</script>' } }] },
    blocks: [{ type: 'shape', props: { kind: 'rect', color: 'url(javascript:1)' }, frames: { desktop: { x: 0, y: 0, w: 50, h: 100 } } }],
  });
  assert.ok(!svg.includes('script') && !svg.includes('javascript'));
});

test('the gallery block: the def contract', () => {
  assert.equal(galleryBlock.version, 1);
  assert.equal(typeof galleryBlock.render, 'function');
  assert.ok(galleryBlock.migrations);
  const a = galleryBlock.defaults();
  const b = galleryBlock.defaults();
  assert.notEqual(a.images, b.images, 'defaults() must give fresh objects');
  assert.equal(a.view, 'grid');
  assert.equal(a.lightbox, true);
  assert.deepEqual(a.images, []);
});

test('the slideshow layer: the def contract', () => {
  assert.equal(slideshowLayer.version, 2);
  assert.equal(typeof slideshowLayer.render, 'function');
  assert.ok(slideshowLayer.migrations);
  const a = slideshowLayer.defaults();
  assert.notEqual(a.images, slideshowLayer.defaults().images, 'defaults() must give fresh objects');
  assert.deepEqual(a.images, []);
  assert.equal(a.fit, 'cover');
});

test('galleryView: the six views, and the grid for anything unknown', () => {
  assert.deepEqual(GALLERY_VIEWS, ['grid', 'carousel', 'slides', 'ribbon', 'mosaic', 'polaroid']);
  assert.deepEqual(GRID_VIEWS, ['grid', 'mosaic', 'polaroid']);
  for (const view of GALLERY_VIEWS) assert.equal(galleryView(view), view);
  assert.equal(galleryView('wall'), 'grid');
  assert.equal(galleryView(undefined), 'grid');
});

test('gallerySeed and mosaicRowHeight: junk never reaches the layout', () => {
  assert.equal(gallerySeed(7), 7);
  assert.equal(gallerySeed(7.9), 7);
  assert.equal(gallerySeed(0), 1);
  assert.equal(gallerySeed(-3), 1);
  assert.equal(gallerySeed('sju'), 1);
  assert.equal(gallerySeed(undefined), 1);
  assert.equal(mosaicRowHeight(200), 200);
  assert.equal(mosaicRowHeight(undefined), MOSAIC_ROW.dflt);
  assert.equal(mosaicRowHeight(10), MOSAIC_ROW.min);
  assert.equal(mosaicRowHeight(9000), MOSAIC_ROW.max);
  assert.equal(mosaicRowHeight('hoy'), MOSAIC_ROW.dflt);
});

test('tileSpans: one span per picture, the same wall for the same seed, never wider than the wall', () => {
  const wall = tileSpans(30, 5, 4);
  assert.equal(wall.length, 30);
  assert.deepEqual(tileSpans(30, 5, 4), wall);
  assert.notDeepEqual(tileSpans(30, 6, 4), wall);
  for (const span of wall) {
    assert.ok(span.cols === 1 || span.cols === 2);
    assert.ok(span.rows === 1 || span.rows === 2);
  }
  // A wall of thirty holds every kind of tile.
  assert.ok(wall.some((s) => s.cols === 2));
  assert.ok(wall.some((s) => s.rows === 2));
  assert.ok(wall.some((s) => s.cols === 1 && s.rows === 1));
  // One column: a plain stack, whatever the die says.
  assert.ok(tileSpans(30, 5, 1).every((s) => s.cols === 1));
  assert.deepEqual(tileSpans(0, 5, 4), []);
  assert.deepEqual(tileSpans(undefined, 5, 4), []);
  // The die is the background layer's: the first tiles of both walls agree.
  const layer = mosaicSpans(12, 5, 12);
  for (let i = 0; i < layer.length; i += 1) {
    assert.equal(mosaicSpan(5, i).cols, layer[i].cols);
    assert.equal(wall[i].rows, layer[i].rows);
  }
});

test('mosaicWall: every tile placed, none overlapping, and the wall a full rectangle', () => {
  for (const cols of [1, 2, 3, 4, 6]) {
    for (let count = 1; count <= 40; count += 1) {
      for (const seed of [1, 5, 77, 12345]) {
        const wall = mosaicWall(count, seed, cols);
        assert.equal(wall.tiles.length, count);
        const seen = new Map();
        for (const [i, tile] of wall.tiles.entries()) {
          assert.ok(tile.col >= 0 && tile.col + tile.cols <= cols, `tile ${i} inside the columns`);
          assert.ok(tile.row >= 0 && tile.row + tile.rows <= wall.rows, `tile ${i} inside the rows`);
          for (let r = tile.row; r < tile.row + tile.rows; r += 1) {
            for (let c = tile.col; c < tile.col + tile.cols; c += 1) {
              const key = `${r}:${c}`;
              assert.equal(seen.has(key), false, `cell ${key} taken twice (cols ${cols}, count ${count}, seed ${seed})`);
              seen.set(key, i);
            }
          }
        }
        assert.equal(seen.size, wall.rows * cols, `holes left (cols ${cols}, count ${count}, seed ${seed})`);
      }
    }
  }
  // The same seed builds the same wall, another seed another.
  assert.deepEqual(mosaicWall(12, 5, 4), mosaicWall(12, 5, 4));
  assert.notDeepEqual(mosaicWall(12, 5, 4), mosaicWall(12, 6, 4));
  assert.deepEqual(mosaicWall(0, 5, 4), { tiles: [], rows: 0 });
});

test('polaroidTilts: a lean per picture inside the bounds, still for one seed', () => {
  const leans = polaroidTilts(12, 3, 6);
  assert.equal(leans.length, 12);
  assert.deepEqual(polaroidTilts(12, 3, 6), leans);
  assert.notDeepEqual(polaroidTilts(12, 4, 6), leans);
  assert.ok(leans.every((deg) => Math.abs(deg) <= 6));
  assert.ok(new Set(leans).size > 6);
  // 0 stands the cards straight; a missing tilt is the default lean.
  assert.ok(polaroidTilts(5, 3, 0).every((deg) => deg === 0));
  assert.ok(polaroidTilts(40, 3, undefined).every((deg) => Math.abs(deg) <= POLAROID_TILT.dflt));
  assert.ok(polaroidTilts(40, 3, undefined).some((deg) => deg !== 0));
  assert.ok(polaroidTilts(40, 3, 99).every((deg) => Math.abs(deg) <= POLAROID_TILT.max));
  assert.deepEqual(polaroidTilts(0, 3, 6), []);
});

test('frameTilt: the scatter leans its frames by the same throw', () => {
  const frames = photoLayout([{ src: '/media/a.webp' }, { src: '/media/b.webp' }], { count: 6, seed: 9, tilt: 8, repeat: true });
  frames.forEach((frame, i) => assert.equal(frame.rot, frameTilt(9, i, 8)));
});

test('the gallery block: the framed views are views of the same block, at the same version', () => {
  assert.equal(galleryBlock.version, 1);
  assert.equal(galleryBlock.defaults().view, 'grid');
});
