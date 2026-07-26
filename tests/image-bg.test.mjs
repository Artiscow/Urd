/**
 * Bilde-bakgrunnslaget: parallax-proppen (additivt fra v0.6) må løftes trygt
 * fra v1, og den rene offset-utregningen (parallaxOffset) må ha riktig fortegn
 * og skala. DOM-delen (scroll-lytteren) dekkes av headless-sjekkene.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { imageLayer, parallaxOffset } from '../template/assets/engine/backgrounds/image.js';
import { lift } from '../template/assets/engine/migrate.js';

test('imageLayer: v1 -> v2 legger til parallax uten å røre resten', () => {
  assert.equal(imageLayer.version, 2);
  assert.equal(imageLayer.defaults().parallax, 0);
  const lifted = lift({ type: 'image', version: 1, props: { src: '/media/a.webp', blur: 4 } }, imageLayer);
  assert.equal(lifted.ok, true);
  assert.equal(lifted.version, 2);
  assert.equal(lifted.props.parallax, 0);
  assert.equal(lifted.props.src, '/media/a.webp');
  assert.equal(lifted.props.blur, 4);
  // En allerede satt parallax beholdes.
  const kept = lift({ type: 'image', version: 1, props: { src: 'x', parallax: 0.6 } }, imageLayer);
  assert.equal(kept.props.parallax, 0.6);
});

test('parallaxOffset: null i senter, fortegn skifter, skalerer med styrke', () => {
  const vh = 1000;
  const h = 200;
  // Seksjonen midt i viewporten (sectionMid = 500) gir ingen forskyvning.
  assert.equal(parallaxOffset(400, h, vh, 0.5), 0);
  // Seksjonen lenger ned (sectionMid > 500) gir negativ offset; lenger opp positiv.
  assert.ok(parallaxOffset(700, h, vh, 0.5) < 0);
  assert.ok(parallaxOffset(100, h, vh, 0.5) > 0);
  // Styrke 0 = ingen bevegelse; høyere styrke = større utslag.
  assert.equal(parallaxOffset(700, h, vh, 0), 0);
  assert.ok(Math.abs(parallaxOffset(700, h, vh, 1)) > Math.abs(parallaxOffset(700, h, vh, 0.3)));
  // Styrke klemmes til [0,1].
  assert.equal(parallaxOffset(700, h, vh, 2), parallaxOffset(700, h, vh, 1));
});
