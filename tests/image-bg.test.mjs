/**
 * Bilde-bakgrunnslaget: de rene CSS-byggerne (bgPosition/bgSize/bleedClip) og
 * parallax-utregningene (parallaxPad/parallaxOffset). DOM-delen (klipping, scroll-
 * lytteren, bleed-clip-path, fri plassering) dekkes av headless-sjekkene.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  imageLayer, bgPosition, bgSize, bleedClip, parallaxPad, parallaxOffset,
} from '../template/assets/engine/backgrounds/image.js';
import { lift } from '../template/assets/engine/migrate.js';

test('imageLayer: standardverdier + v1 -> v2 legger til parallax', () => {
  assert.equal(imageLayer.version, 2);
  assert.equal(imageLayer.defaults().fit, 'vanlig');
  assert.equal(imageLayer.defaults().size, 1);
  assert.equal(imageLayer.defaults().parallax, 0);
  assert.equal(imageLayer.defaults().bleed, 'none');
  const lifted = lift({ type: 'image', version: 1, props: { src: '/media/a.webp', blur: 4 } }, imageLayer);
  assert.equal(lifted.ok, true);
  assert.equal(lifted.version, 2);
  assert.equal(lifted.props.parallax, 0);
  assert.equal(lifted.props.src, '/media/a.webp');
  assert.equal(lifted.props.blur, 4);
  const kept = lift({ type: 'image', version: 1, props: { src: 'x', parallax: 0.6 } }, imageLayer);
  assert.equal(kept.props.parallax, 0.6);
});

test('bgPosition: posisjon til background-position-prosent (kan gå utenfor 0-100)', () => {
  assert.equal(bgPosition(0.5, 0.5), '50% 50%');
  assert.equal(bgPosition(0, 1), '0% 100%');
  // Utenfor kant: negativ / over 100 %.
  assert.equal(bgPosition(-0.5, 1.5), '-50% 150%');
  assert.equal(bgPosition(undefined, undefined), '50% 50%');
});

test('bgSize: skala-modell (breddrelativ %); cover/contain beholdes som nøkkelord', () => {
  assert.equal(bgSize('cover'), 'cover');
  assert.equal(bgSize('contain'), 'contain');
  // Fri plassering: breddrelativ skala i %.
  assert.equal(bgSize('vanlig', 1), '100%');
  assert.equal(bgSize('vanlig', 0.4), '40%');
  assert.equal(bgSize('flislegg', 0.5), '50%');
  assert.equal(bgSize('vanlig', 2.5), '250%');
  // Manglende størrelse = 100 %.
  assert.equal(bgSize('vanlig'), '100%');
  assert.equal(bgSize(undefined), '100%');
});

test('bleedClip: retnings-clip-path, sidene alltid klippet', () => {
  assert.equal(bleedClip('none'), 'inset(0)');
  assert.equal(bleedClip(undefined), 'inset(0)');
  assert.equal(bleedClip('up'), 'inset(-9999px 0 0 0)');
  assert.equal(bleedClip('down'), 'inset(0 0 -9999px 0)');
  assert.equal(bleedClip('both'), 'inset(-9999px 0 -9999px 0)');
});

test('parallaxPad: proporsjonal med styrken, ulikt tak for fyll vs fri modell', () => {
  // Full styrke: reiseveien = 0.4 * vh, klemt til capFrac * seksjonshøyde.
  assert.equal(parallaxPad(2000, 1000, 1), 360);      // 0.18-taket (fyll)
  assert.equal(parallaxPad(2000, 1000, 0.5), 200);    // halv styrke under taket
  assert.equal(parallaxPad(200, 1000, 1), 36);        // kort seksjon, 0.18-taket
  // Fri modell (større tak) gir mye mer bevegelse på samme seksjon.
  assert.equal(parallaxPad(200, 1000, 1, 0.6), 120);
});

test('parallaxOffset: null i senter, fortegn skifter, skalerer med styrke', () => {
  const vh = 1000;
  // Seksjonen midt i viewporten (sectionMid = 500) gir ingen forskyvning.
  assert.equal(parallaxOffset(400, 200, vh, 0.5), 0);
  // Lenger ned = negativ, lenger opp = positiv.
  assert.ok(parallaxOffset(700, 200, vh, 0.5) < 0);
  assert.ok(parallaxOffset(100, 200, vh, 0.5) > 0);
  assert.equal(parallaxOffset(700, 200, vh, 0), 0);
  // Høy seksjon (taket binder ikke): høyere styrke = større utslag.
  assert.ok(Math.abs(parallaxOffset(0, 2000, vh, 1)) > Math.abs(parallaxOffset(0, 2000, vh, 0.3)));
  // Styrke klemmes til [0,1].
  assert.equal(parallaxOffset(700, 200, vh, 2), parallaxOffset(700, 200, vh, 1));
});

test('parallaxOffset: forskyvningen klemmes til grensen (aldri gap/gigantisk)', () => {
  const vh = 1000;
  const pad = parallaxPad(200, vh, 1); // 36
  assert.equal(Math.abs(parallaxOffset(9000, 200, vh, 1, pad)), pad);
  assert.equal(Math.abs(parallaxOffset(-9000, 200, vh, 1, pad)), pad);
});
