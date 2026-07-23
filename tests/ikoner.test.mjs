/**
 * Kontraktstester for ikonbiblioteket (icons.js) og den delte
 * tegnmodulen (glyphs.js): kategoriene og biblioteket skal samsvare,
 * SVG-byggingen skal være trygg og forutsigbar, og nylig-listen skal
 * være ren listelogikk uten overraskelser.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { ICON_LIBRARY, ICON_CATEGORIES, iconSvg } from '../template/assets/engine/icons.js';
import { GLYPH_CATEGORIES, GLYPH_RECENT_MAX, pushRecentGlyph } from '../template/assets/engine/glyphs.js';

test('ikonbiblioteket og kategoriene samsvarer: hver id finnes, ingen duplikater, ingen foreldreløse', () => {
  const seen = new Set();
  for (const [name, ids] of ICON_CATEGORIES) {
    assert.ok(name.length > 0, 'kategorinavn kan ikke være tomt');
    assert.ok(ids.length > 0, `kategorien ${name} kan ikke være tom`);
    for (const id of ids) {
      assert.ok(ICON_LIBRARY[id], `${id} (i ${name}) mangler i biblioteket`);
      assert.ok(!seen.has(id), `${id} står i flere kategorier`);
      seen.add(id);
    }
  }
  for (const id of Object.keys(ICON_LIBRARY)) {
    assert.ok(seen.has(id), `${id} i biblioteket står ikke i noen kategori`);
  }
});

test('ikon-ider er datakontrakt: små bokstaver og bindestrek, ankret regex', () => {
  for (const id of Object.keys(ICON_LIBRARY)) {
    assert.match(id, /^[a-z][a-z0-9-]*$/, `${id} bryter id-formatet`);
  }
});

test('hvert ikon har norsk etikett og en ikke-tom SVG-kropp', () => {
  for (const [id, icon] of Object.entries(ICON_LIBRARY)) {
    assert.ok(icon.label.length > 0, `${id} mangler etikett`);
    assert.ok(icon.body.length > 0, `${id} mangler SVG-kropp`);
  }
});

test('iconSvg bygger komplett SVG med currentColor; ukjent id gir null', () => {
  const svg = iconSvg('heart');
  assert.ok(svg.startsWith('<svg '));
  assert.ok(svg.includes('viewBox="0 0 24 24"'));
  assert.ok(svg.includes('currentColor'));
  assert.ok(svg.includes(ICON_LIBRARY.heart.body));
  assert.equal(iconSvg('finnes-ikke'), null);
  assert.equal(iconSvg(null), null);
  assert.equal(iconSvg(42), null);
});

test('SVG-ene er trygge: kun tegne-elementer, ingen hendelsesattributter eller lenker', () => {
  const allowed = new Set(['svg', 'path', 'circle', 'rect', 'line']);
  for (const id of Object.keys(ICON_LIBRARY)) {
    const svg = iconSvg(id);
    for (const [, tag] of svg.matchAll(/<([a-z]+)/gi)) {
      assert.ok(allowed.has(tag.toLowerCase()), `${id} bruker uventet element <${tag}>`);
    }
    assert.ok(!/\son\w+=/i.test(svg), `${id} har hendelsesattributt`);
    assert.ok(!/href|script|url\(/i.test(svg), `${id} har lenke eller kjørbart innhold`);
  }
});

test('tegnkategoriene er ikke-tomme og uten duplikatnavn', () => {
  const names = new Set();
  for (const [name, glyphs] of GLYPH_CATEGORIES) {
    assert.ok(name.length > 0);
    assert.ok(!names.has(name), `${name} står to ganger`);
    names.add(name);
    const list = glyphs.split(' ');
    assert.ok(list.length > 0);
    assert.ok(list.every((g) => g.length > 0), `${name} har tomt tegn (dobbelt mellomrom?)`);
  }
});

test('pushRecentGlyph: nyeste først, uten duplikater, med tak', () => {
  assert.deepEqual(pushRecentGlyph([], '★'), ['★']);
  assert.deepEqual(pushRecentGlyph(['☆', '★'], '★'), ['★', '☆']);
  const full = Array.from({ length: GLYPH_RECENT_MAX }, (_, i) => `g${i}`);
  const pushed = pushRecentGlyph(full, 'ny');
  assert.equal(pushed.length, GLYPH_RECENT_MAX);
  assert.equal(pushed[0], 'ny');
  assert.ok(!pushed.includes(`g${GLYPH_RECENT_MAX - 1}`), 'eldste faller ut ved taket');
  // Ødelagt inndata (ikke-liste) skal aldri velte: behandles som tom liste.
  assert.deepEqual(pushRecentGlyph('rot', '★'), ['★']);
});
