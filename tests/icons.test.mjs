/**
 * Contract tests for the icon library (icons.js) and the shared glyph
 * module (glyphs.js): the categories and the library must agree, the SVG
 * building must be safe and predictable, and the recents list must be
 * plain list logic without surprises.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { ICON_LIBRARY, ICON_CATEGORIES, iconSvg } = await engineImport('icons.js');
const { GLYPH_CATEGORIES, GLYPH_RECENT_MAX, GLYPH_RECENT_KEY, ICON_RECENT_KEY, pushRecentGlyph, readRecentIcons } = await engineImport('glyphs.js');

test('the icon library and the categories agree: every id exists, no duplicates, no orphans', () => {
  const seen = new Set();
  for (const [name, ids] of ICON_CATEGORIES) {
    assert.ok(name.length > 0, 'category name cannot be empty');
    assert.ok(ids.length > 0, `category ${name} cannot be empty`);
    for (const id of ids) {
      assert.ok(ICON_LIBRARY[id], `${id} (in ${name}) is missing from the library`);
      assert.ok(!seen.has(id), `${id} appears in multiple categories`);
      seen.add(id);
    }
  }
  for (const id of Object.keys(ICON_LIBRARY)) {
    assert.ok(seen.has(id), `${id} in the library is not in any category`);
  }
});

test('icon ids are data contract: lowercase and hyphens, anchored regex', () => {
  for (const id of Object.keys(ICON_LIBRARY)) {
    assert.match(id, /^[a-z][a-z0-9-]*$/, `${id} breaks the id format`);
  }
});

test('every icon has a label and a non-empty SVG body', () => {
  for (const [id, icon] of Object.entries(ICON_LIBRARY)) {
    assert.ok(icon.label.length > 0, `${id} lacks a label`);
    assert.ok(icon.body.length > 0, `${id} lacks an SVG body`);
  }
});

test('iconSvg builds a complete SVG with currentColor; unknown id gives null', () => {
  const svg = iconSvg('heart');
  assert.ok(svg.startsWith('<svg '));
  assert.ok(svg.includes('viewBox="0 0 24 24"'));
  assert.ok(svg.includes('currentColor'));
  assert.ok(svg.includes(ICON_LIBRARY.heart.body));
  assert.equal(iconSvg('finnes-ikke'), null);
  assert.equal(iconSvg(null), null);
  assert.equal(iconSvg(42), null);
});

test('the SVGs are safe: only drawing elements, no event attributes or links', () => {
  const allowed = new Set(['svg', 'path', 'circle', 'rect', 'line']);
  for (const id of Object.keys(ICON_LIBRARY)) {
    const svg = iconSvg(id);
    for (const [, tag] of svg.matchAll(/<([a-z]+)/gi)) {
      assert.ok(allowed.has(tag.toLowerCase()), `${id} uses unexpected element <${tag}>`);
    }
    assert.ok(!/\son\w+=/i.test(svg), `${id} has an event attribute`);
    assert.ok(!/href|script|url\(/i.test(svg), `${id} has a link or executable content`);
  }
});

test('the glyph categories are non-empty and without duplicate names', () => {
  const names = new Set();
  for (const [name, glyphs] of GLYPH_CATEGORIES) {
    assert.ok(name.length > 0);
    assert.ok(!names.has(name), `${name} appears twice`);
    names.add(name);
    const list = glyphs.split(' ');
    assert.ok(list.length > 0);
    assert.ok(list.every((g) => g.length > 0), `${name} has an empty glyph (double space?)`);
  }
});

test('pushRecentGlyph: newest first, without duplicates, with a cap', () => {
  assert.deepEqual(pushRecentGlyph([], '★'), ['★']);
  assert.deepEqual(pushRecentGlyph(['☆', '★'], '★'), ['★', '☆']);
  const full = Array.from({ length: GLYPH_RECENT_MAX }, (_, i) => `g${i}`);
  const pushed = pushRecentGlyph(full, 'ny');
  assert.equal(pushed.length, GLYPH_RECENT_MAX);
  assert.equal(pushed[0], 'ny');
  assert.ok(!pushed.includes(`g${GLYPH_RECENT_MAX - 1}`), 'the oldest falls out at the cap');
  // Broken input (not a list) must never topple it: treated as an empty list.
  assert.deepEqual(pushRecentGlyph('rot', '★'), ['★']);
});

test('icon recents: own storage key, and an empty list without storage', () => {
  assert.notEqual(ICON_RECENT_KEY, GLYPH_RECENT_KEY);
  assert.deepEqual(readRecentIcons(), []);
});
