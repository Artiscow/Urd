/**
 * What the admin shows on a fresh load (editor/src/lib/panels-start.js): the stored choice normalised, the choices each layout offers, and the panel and the fold each choice starts with.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PANELS_PREFS, panelsPrefOf, panelsPrefsFor, panelsPrefIn, startPanels } from '../editor/src/lib/panels-start.js';

const PANELS = ['pages', 'blocks', 'properties', 'site', 'update'];
const start = (o) => startPanels({ layout: 'rail', panels: PANELS, stored: null, storedFolded: false, start: null, ...o });

test('the stored choice falls to remembering the last panel', () => {
  assert.equal(panelsPrefOf(null), 'remember');
  assert.equal(panelsPrefOf('nonsense'), 'remember');
  for (const p of PANELS_PREFS) assert.equal(panelsPrefOf(p), p);
});

test('the folded column is offered only in the layouts that keep the column, and is no panel elsewhere', () => {
  assert.ok(panelsPrefsFor('panel-tabs').includes('folded'));
  assert.ok(panelsPrefsFor('page-tabs').includes('folded'));
  for (const layout of ['rail', 'sidebar', 'top-tabs']) assert.ok(!panelsPrefsFor(layout).includes('folded'), layout);
  assert.equal(panelsPrefIn('folded', 'rail'), 'reset');
  assert.equal(panelsPrefIn('folded', 'panel-tabs'), 'folded');
});

test('remember opens the last panel, and its fold only in a layout with the column', () => {
  assert.deepEqual(start({ stored: 'site' }), { panel: 'site', folded: false });
  assert.deepEqual(start({ stored: 'site', storedFolded: true }), { panel: 'site', folded: false });
  assert.deepEqual(start({ stored: 'site', storedFolded: true, layout: 'page-tabs' }), { panel: 'site', folded: true });
  assert.deepEqual(start({ stored: 'settings' }), { panel: null, folded: false }, 'the settings panel is never reopened');
});

test('none, the same panel and the folded column', () => {
  assert.deepEqual(start({ pref: 'reset', stored: 'site' }), { panel: null, folded: false });
  assert.deepEqual(start({ pref: 'fixed', start: 'update', stored: 'site' }), { panel: 'update', folded: false });
  assert.deepEqual(start({ pref: 'fixed', start: 'gone' }), { panel: 'pages', folded: false }, 'an unknown panel falls to Pages');
  assert.deepEqual(start({ pref: 'folded', layout: 'panel-tabs', stored: 'site' }), { panel: null, folded: true });
  assert.deepEqual(start({ pref: 'folded', layout: 'rail', stored: 'site' }), { panel: null, folded: false });
});
