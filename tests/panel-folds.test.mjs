/**
 * The folds the panels' tabs list in their menus (editor/src/lib/panel-folds.js): every id stands on a fold in its panel, every fold marked in a panel is listed, each named by the key its own heading uses, and the cases a fold is drawn in.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PANEL_FOLDS, panelFolds, foldGroups, tabMenuStyleOf } from '../editor/src/lib/panel-folds.js';

const PANEL_FILES = { site: 'SitePanel', legal: 'LegalPanel', theme: 'ThemePanel', nav: 'NavPanel', footer: 'FooterPanel' };
const source = (panel) => readFileSync(new URL(`../editor/src/panels/${PANEL_FILES[panel]}.svelte`, import.meta.url), 'utf8');
const nb = readFileSync(new URL('../template/assets/engine/0.7.8/locales/admin/nb.js', import.meta.url), 'utf8');

test('every panel with a menu has its file here', () => {
  assert.deepEqual(Object.keys(PANEL_FOLDS).sort(), Object.keys(PANEL_FILES).sort());
});

test('the ids are the folds marked in each panel, in the panel\'s order, each named by its heading\'s key', () => {
  for (const [panel, folds] of Object.entries(PANEL_FOLDS)) {
    const text = source(panel);
    const marked = [...text.matchAll(/<details class="group[^"]*" data-fold="([a-z]+)"/g)].map((m) => m[1]);
    assert.deepEqual(marked, folds.map((f) => f.id), panel);
    for (const fold of folds) {
      const at = text.indexOf(`data-fold="${fold.id}"`);
      const summary = text.slice(at, text.indexOf('</summary>', at));
      assert.ok(summary.includes(`ta('${fold.key}')`), `${panel}/${fold.id} is named by ${fold.key}`);
      assert.ok(nb.includes(`'${fold.key}':`), `${fold.key} stands in the bokmål dictionary`);
    }
  }
});

/** A fold's content, between its heading and its end. */
function foldBody(text, id) {
  const at = text.indexOf(`data-fold="${id}"`);
  const from = text.indexOf('</summary>', at) + '</summary>'.length;
  return text.slice(from, text.indexOf('</details>', from)).replace(/<!--[^]*?-->/g, '').trim();
}

/** A fold that holds one button and nothing else. */
const ONE_BUTTON = /^<div class="group-items">\s*<button\b[^>]*>[^<]*<\/button>\s*<\/div>$/;

test('a fold that holds one button is pressed from the menu, and only such a fold', () => {
  for (const [panel, folds] of Object.entries(PANEL_FOLDS)) {
    const text = source(panel);
    for (const fold of folds) {
      assert.equal(ONE_BUTTON.test(foldBody(text, fold.id)), fold.press === true, `${panel}/${fold.id}: ${fold.press ? 'marked press but holds more than one button' : 'holds one button, so its row should press it (press: true)'}`);
    }
  }
});

test('panelFolds: the folds drawn in the case at hand, none for a panel without a menu', () => {
  assert.deepEqual(panelFolds('footer', { site: { footer: { show: false } } }).map((f) => f.id)[0], 'design', 'the pages a footer shows on, only while it is on');
  assert.equal(panelFolds('footer', { site: { footer: { show: true } } })[0].id, 'pages');
  assert.deepEqual(panelFolds('legal', { legal: { terms: { shown: false } } }).map((f) => f.id), ['who', 'privacy']);
  assert.deepEqual(panelFolds('legal', { legal: { terms: { shown: true } } }).map((f) => f.id), ['who', 'privacy', 'terms']);
  assert.deepEqual(panelFolds('pages'), []);
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
    ['menuGroup.content', ['brand', 'columns', 'social', 'contact', 'cta']],
    ['menuGroup.bottom', ['linkrow', 'baseline']],
  ]);
  assert.deepEqual(foldGroups(panelFolds('site')).map((g) => g.label), [null], 'a short menu is one group without a label');
});

test('tabMenuStyleOf: the groups for anything not stored', () => {
  assert.equal(tabMenuStyleOf(null), 'groups');
  assert.equal(tabMenuStyleOf('lines'), 'lines');
  assert.equal(tabMenuStyleOf('plain'), 'plain');
  assert.equal(tabMenuStyleOf('zebra'), 'groups');
});
