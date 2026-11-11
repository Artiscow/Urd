/**
 * The folds the panels' tabs list in their menus (editor/src/lib/panel-folds.js): every id stands on a fold in its panel, every fold marked in a panel is listed, each named by the key its own heading uses, and the cases a fold is drawn in.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PANEL_FOLDS, panelFolds, foldGroups, tabMenuStyleOf, collectionMenuRows } from '../editor/src/lib/panel-folds.js';
import { ENGINE_DIR } from './_engine.mjs';

const PANEL_FILES = { site: 'SitePanel', legal: 'LegalPanel', theme: 'ThemePanel', nav: 'NavPanel', footer: 'FooterPanel' };
const source = (panel) => readFileSync(new URL(`../editor/src/panels/${PANEL_FILES[panel]}.svelte`, import.meta.url), 'utf8');
const nb = readFileSync(new URL('locales/admin/nb.js', ENGINE_DIR), 'utf8');

test('every panel with a menu has its file here', () => {
  assert.deepEqual(Object.keys(PANEL_FOLDS).sort(), Object.keys(PANEL_FILES).sort());
});

/** Where a fold opens in a panel's markup: a plain `details.group` with its `data-fold`, or the row kit's Fold with its `id`. */
const FOLD_MARK = /<details class="group[^"]*" data-fold="([a-z]+)"|<Fold id="([a-z]+)"/g;
const foldAt = (text, id) => {
  const kit = text.indexOf(`<Fold id="${id}"`);
  return kit >= 0 ? { at: kit, kit: true } : { at: text.indexOf(`data-fold="${id}"`), kit: false };
};
/** A fold's heading: the summary of a plain fold, the opening tag of the kit's Fold, which names it by its title. */
function foldHeading(text, id) {
  const { at, kit } = foldAt(text, id);
  return text.slice(at, kit ? text.indexOf('>\n', at) : text.indexOf('</summary>', at));
}

test('the ids are the folds marked in each panel, in the panel\'s order, each named by its heading\'s key', () => {
  for (const [panel, folds] of Object.entries(PANEL_FOLDS)) {
    const text = source(panel);
    const marked = [...text.matchAll(FOLD_MARK)].map((m) => m[1] ?? m[2]);
    assert.deepEqual(marked, folds.map((f) => f.id), panel);
    for (const fold of folds) {
      assert.ok(foldHeading(text, fold.id).includes(`ta('${fold.key}')`), `${panel}/${fold.id} is named by ${fold.key}`);
      assert.ok(nb.includes(`'${fold.key}':`), `${fold.key} stands in the bokmål dictionary`);
    }
  }
});

/** A fold's content, between its heading and its end, the comments taken out until none is left. */
function foldBody(text, id) {
  const { at, kit } = foldAt(text, id);
  const from = kit ? text.indexOf('>\n', at) + 2 : text.indexOf('</summary>', at) + '</summary>'.length;
  let body = text.slice(from, text.indexOf(kit ? '</Fold>' : '</details>', from));
  let before;
  do {
    before = body;
    body = body.replace(/<!--[^]*?-->/g, '');
  } while (body !== before);
  return body.trim();
}

/** A fold that holds one button and nothing else: inside a plain fold's items, or alone in the kit's Fold. */
const ONE_BUTTON = /^(?:<div class="group-items">\s*<button\b[^>]*>[^<]*<\/button>\s*<\/div>|<button\b[^>]*>[^<]*<\/button>)$/;
/** A look alone in the kit's Fold: one button while «Designs» stands as the row (lib/rows/LookChoice.svelte). */
const ONE_LOOK = /^<LookChoice\b[\s\S]*?\/>$/;

test('a fold that holds one button is pressed from the menu, and only such a fold', () => {
  for (const [panel, folds] of Object.entries(PANEL_FOLDS)) {
    const text = source(panel);
    for (const fold of folds) {
      const body = foldBody(text, fold.id);
      assert.equal(fold.look === true, ONE_LOOK.test(body), `${panel}/${fold.id}: a look alone in its fold is marked look, and only such a fold`);
      assert.equal(ONE_BUTTON.test(body) || ONE_LOOK.test(body), fold.press === true, `${panel}/${fold.id}: ${fold.press ? 'marked press but holds more than one button' : 'holds one button, so its row should press it (press: true)'}`);
    }
  }
});

test('panelFolds: the folds drawn in the case at hand, none for a panel without a menu', () => {
  assert.equal(panelFolds('footer', { site: { footer: { show: false } } })[0].id, 'pages', 'the footer\'s pages, with the switch that turns it on, whether it is on or off');
  assert.deepEqual(panelFolds('legal', { legal: { terms: { shown: false } } }).map((f) => f.id), ['who', 'privacy']);
  assert.deepEqual(panelFolds('legal', { legal: { terms: { shown: true } } }).map((f) => f.id), ['who', 'privacy', 'terms']);
  assert.deepEqual(panelFolds('pages'), []);
  // A look's fold is pressed while «Designs» stands as the row, and unfolds to the pictures in place.
  const design = (designs) => panelFolds('footer', { site: { footer: { show: true } }, designs }).find((f) => f.id === 'design');
  assert.equal(design('row').press, true);
  assert.equal(design('inline').press, false);
  assert.equal(design('inline').icon, undefined);
});

test('the groups: each group\'s folds stand together, its label is in the dictionaries, and foldGroups splits the rows by them', () => {
  for (const [panel, folds] of Object.entries(PANEL_FOLDS)) {
    const seen = new Set();
    let last;
    for (const fold of folds) {
      if (fold.group !== last) {
        assert.ok(!seen.has(fold.group), `${panel}: the folds of «${fold.group}» stand together`);
        seen.add(fold.group);
        last = fold.group;
      }
      if (fold.group) assert.ok(nb.includes(`'menuGroup.${fold.group}':`), `menuGroup.${fold.group} stands in the bokmål dictionary`);
    }
  }
  const footer = foldGroups(panelFolds('footer', { site: { footer: { show: true } } }));
  assert.deepEqual(footer.map((g) => [g.label, g.folds.map((f) => f.id)]), [
    [null, ['pages']],
    ['menuGroup.look', ['design', 'startpoint', 'appearance']],
    ['menuGroup.content', ['brand', 'columns', 'shared', 'cta']],
    ['menuGroup.bottom', ['bottom']],
  ]);
  assert.deepEqual(foldGroups(panelFolds('site')).map((g) => [g.label, g.folds.map((f) => f.id)]), [
    ['menuGroup.about', ['identity', 'region']],
    ['menuGroup.look', ['width']],
    ['menuGroup.content', ['calendars', 'links']],
    ['menuGroup.shop', ['shop']],
  ]);
  assert.deepEqual(foldGroups(panelFolds('theme')).map((g) => g.label), [null], 'a short menu is one group without a label');
});

test('tabMenuStyleOf: the groups for anything not stored', () => {
  assert.equal(tabMenuStyleOf(null), 'groups');
  assert.equal(tabMenuStyleOf('lines'), 'lines');
  assert.equal(tabMenuStyleOf('plain'), 'plain');
  assert.equal(tabMenuStyleOf('zebra'), 'groups');
});

test('collectionMenuRows: each collection by its name with its entries in the panel\'s order, a catalogue as stored and the others newest first', () => {
  const newest = (entries) => [...entries].sort((a, b) => b.date.localeCompare(a.date));
  const views = {
    nyheter: { name: 'Nyheter', kind: 'news', entries: [{ id: 'a', date: '2026-01-01' }, { id: 'b', date: '2026-03-01' }] },
    produkter: { name: 'Produkter', kind: 'products', entries: [{ id: 'p2', date: '2026-02-01' }, { id: 'p1', date: '2026-05-01' }] },
  };
  const rows = collectionMenuRows(['nyheter', 'produkter', 'ny'], views, newest);
  assert.deepEqual(rows.map((r) => [r.id, r.name, r.entries.map((e) => e.id)]), [
    ['nyheter', 'Nyheter', ['b', 'a']],
    ['produkter', 'Produkter', ['p2', 'p1']],
    ['ny', 'ny', []],
  ]);
});
