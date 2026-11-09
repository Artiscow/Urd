/**
 * The admin designs as data (editor/src/lib/admin-designs.js, ADR-0030): the default design is every part's default, so nothing stored reads as the default design and stored choices read as it with those parts changed; a design writes every part and the values before it take it back; every part that has a row in the Urd settings is that row's part, and every row marked as a part is one.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { register } from 'node:module';

// The page settings' layouts reach the engine through the editor's alias, which the loader resolves.
register('./_svelte-loader.mjs', import.meta.url);
const { PARTS, ADMIN_DESIGNS, DEFAULT_DESIGN, DESIGN_ROW_KEY, DESIGN_CHANGED_KEY, partDefault, readParts, designState, designWrites, restoreWrites } = await import('../editor/src/lib/admin-designs.js');
const { SETTINGS_GROUPS } = await import('../editor/src/lib/settings-model.js');

/** A browser's storage as a map, read and written as the state does. */
const storage = (entries = {}) => {
  const map = new Map(Object.entries(entries));
  return {
    get: (key) => (map.has(key) ? map.get(key) : null),
    write: (writes) => { for (const { key, value } of writes) { if (value === null) map.delete(key); else map.set(key, value); } },
    map,
  };
};

const dict = (lang) => readFileSync(new URL(`../template/assets/engine/${JSON.parse(readFileSync(new URL('../template/urd.json', import.meta.url), 'utf8')).engine}/locales/admin/${lang}.js`, import.meta.url), 'utf8');

test('the default design is every part\'s default, and each design sets every part to one of its options or leaves it without effect', () => {
  const dflt = ADMIN_DESIGNS.find((d) => d.id === DEFAULT_DESIGN);
  assert.equal(ADMIN_DESIGNS[0].id, DEFAULT_DESIGN);
  for (const part of PARTS) assert.equal(dflt.parts[part.id] ?? partDefault(part), partDefault(part), `${part.id}: the default design is not its default`);
  for (const design of ADMIN_DESIGNS) {
    assert.deepEqual(Object.keys(design.parts).sort(), PARTS.map((p) => p.id).sort(), `${design.id} names every part once`);
    for (const part of PARTS) {
      const value = design.parts[part.id];
      assert.ok(value === null || part.options.includes(value), `${design.id}.${part.id}: «${value}» is no option`);
    }
  }
  assert.equal(new Set(PARTS.map((p) => p.key)).size, PARTS.length, 'every part has a key of its own');
});

test('an owner with nothing stored stands in the default design with nothing changed', () => {
  assert.deepEqual(designState(readParts(storage().get)), { design: DEFAULT_DESIGN, changed: [] });
});

test('stored choices read as the default design with those parts changed, with no migration of what is stored', () => {
  const s = storage({ 'urd-admin-menu-width': 'narrow', 'urd-link-editor': 'popover', 'urd-unrelated': 'x' });
  const values = readParts(s.get);
  assert.equal(values.menu, 'narrow', 'today\'s stored width reads as the form one column beside the block');
  assert.deepEqual(designState(values), { design: DEFAULT_DESIGN, changed: ['menu', 'linkEditor'] });
  assert.equal(readParts(storage({ 'urd-admin-layout': 'nonsense' }).get).layout, 'rail', 'an unknown value is the default');
});

test('choosing a design writes every part, reads back as that design, and the values before it take it back in one step', () => {
  const s = storage({ 'urd-link-editor': 'popover', 'urd-tab-menus': 'lines' });
  const before = readParts(s.get);
  for (const design of ADMIN_DESIGNS) {
    s.write(designWrites(design.id));
    assert.deepEqual(designState(readParts(s.get)), { design: design.id, changed: [] }, `${design.id} reads back as itself`);
  }
  s.write(designWrites(DEFAULT_DESIGN));
  assert.equal(s.map.size, 0, 'the default design stores nothing');
  s.write(designWrites('column'));
  s.write(restoreWrites(before));
  assert.deepEqual(readParts(s.get), before);
  assert.deepEqual([...s.map.keys()].sort(), ['urd-link-editor', 'urd-tab-menus']);
});

test('a design with one part changed by hand stands as that design, changed', () => {
  const s = storage();
  s.write(designWrites('side'));
  s.write([{ key: 'urd-link-editor', value: 'popover' }]);
  assert.deepEqual(designState(readParts(s.get)), { design: 'side', changed: ['linkEditor'] });
});

test('every part with a row in the Urd settings is that row\'s part, every row marked as a part is one, and a part without a row names the step that builds it', () => {
  const rows = SETTINGS_GROUPS.flatMap((g) => g.settings);
  const marked = rows.filter((r) => r.part).map((r) => r.id).sort();
  const named = PARTS.filter((p) => p.setting).map((p) => p.setting).sort();
  assert.deepEqual(marked, named);
  for (const part of PARTS.filter((p) => !p.setting)) assert.match(part.builds ?? '', /^0\.7\.33\.\d+$/, `${part.id} names the step that builds it`);
  // The element menu's width row offers wide and narrow until its other forms are built.
  assert.match(PARTS.find((p) => p.id === 'menu').builds ?? '', /^0\.7\.33\.\d+$/);
  for (const id of ['theme', 'language', 'press', 'pictures', 'spellcheck', 'dragMark', 'panels', 'panelsStart', 'updateNotice', 'analytics']) {
    assert.ok(!rows.find((r) => r.id === id)?.part, `${id} is the owner's or the site's own, never a part`);
  }
});

test('a part whose row the Urd settings hide under a design is left without effect in that design, so it is never weighed', () => {
  const rows = SETTINGS_GROUPS.flatMap((g) => g.settings);
  for (const design of ADMIN_DESIGNS) {
    const v = (id) => design.parts[id] ?? partDefault(PARTS.find((p) => p.id === id));
    const c = { ed: { adminLayout: v('layout'), sidebarFolds: v('sidebarFolds'), panelTabMenus: v('panelTabMenus') === 'on', siteDraft: {} }, ta: (k) => k };
    for (const part of PARTS.filter((p) => p.setting)) {
      const row = rows.find((r) => r.id === part.setting);
      if (row.when && !row.when(c)) assert.equal(design.parts[part.id], null, `${design.id}.${part.id} has no effect there and must be null`);
    }
  }
});

test('the existing parts keep the keys the state has always stored them under', () => {
  const state = readFileSync(new URL('../editor/src/state/shell.svelte.js', import.meta.url), 'utf8') + readFileSync(new URL('../editor/src/menu/state.svelte.js', import.meta.url), 'utf8');
  for (const part of PARTS.filter((p) => p.setting)) assert.ok(state.includes(`'${part.key}'`), `${part.id}: «${part.key}» is not the key the state uses`);
});

test('every name the designs and the new parts are drawn with is in the three core dictionaries', () => {
  const keys = [DESIGN_ROW_KEY, DESIGN_CHANGED_KEY, ...ADMIN_DESIGNS.map((d) => d.labelKey)];
  for (const part of PARTS) {
    if (part.labelKey) keys.push(part.labelKey);
    if (part.optionKey) keys.push(...part.options.map((o) => `${part.optionKey}.${o}`));
  }
  for (const lang of ['en-GB', 'nb', 'tr']) {
    const text = dict(lang);
    for (const key of keys) assert.ok(text.includes(`'${key}':`), `${lang} lacks ${key}`);
  }
});
