/**
 * The command palette's list (editor/src/lib/command-palette.js): the groups, the recent commands first, a query ranking the matches, and the recent list's upkeep.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canPin, togglePinned, PINNED_MAX, arrangeCommands, flatItems, readRecent, rememberCommand, GROUP_ORDER, RECENT_MAX } from '../editor/src/lib/command-palette.js';
import { engineImport } from './_engine.mjs';
const { searchItems } = await engineImport('palette-search.js');
const arrange = (commands, query, recent, pinned) => arrangeCommands(commands, query, recent, searchItems, pinned);

const commands = [
  { id: 'publish', group: 'actions', label: 'Publish' },
  { id: 'page:kaker', group: 'pages', label: 'Go to Kaker' },
  { id: 'panel:nav', group: 'panels', label: 'Open Nav' },
  { id: 'block:text', group: 'blocks', label: 'Insert Text' },
  { id: 'section:hero', group: 'sections', label: 'New section: Hero' },
  { id: 'plugin:x', group: 'weather', label: 'Fetch the weather' },
];

test('with nothing typed the groups stand in their order, the recent ones first and an unknown group with the plugins', () => {
  const groups = arrange(commands, '', ['block:text', 'gone', 'publish']);
  assert.deepEqual(groups.map((g) => g.group), ['recent', 'actions', 'pages', 'panels', 'blocks', 'sections', 'plugins']);
  assert.deepEqual(groups[0].items.map((c) => c.id), ['block:text', 'publish']);
  assert.deepEqual(groups.at(-1).items.map((c) => c.id), ['plugin:x']);
  assert.equal(GROUP_ORDER[0], 'pinned');
  assert.deepEqual(arrange(commands, '  ', []).map((g) => g.group), ['actions', 'pages', 'panels', 'blocks', 'sections', 'plugins']);
});

test('the shared shortcuts stand first in their order, those still offered, and are left out of the recent group', () => {
  const groups = arrange(commands, '', ['block:text', 'publish'], ['publish', 'gone', 'block:text']);
  assert.deepEqual(groups.map((g) => g.group).slice(0, 2), ['pinned', 'actions']);
  assert.deepEqual(groups[0].items.map((c) => c.id), ['publish', 'block:text']);
  const mixed = arrange(commands, '', ['block:text', 'publish'], ['publish']);
  assert.deepEqual(mixed[0].items.map((c) => c.id), ['publish']);
  assert.deepEqual(mixed[1].items.map((c) => c.id), ['block:text']);
  // A query ranks the matches alone, pinned or not.
  assert.equal(arrange(commands, 'publish', [], ['publish'])[0].group, 'results');
});

test('a query gives one group of matches, the best match first, and nothing when nothing matches', () => {
  const groups = arrange(commands, 'kak', []);
  assert.deepEqual(groups.map((g) => g.group), ['results']);
  assert.deepEqual(groups[0].items.map((c) => c.id), ['page:kaker']);
  assert.deepEqual(flatItems(arrange(commands, 'open', [])).map((c) => c.id), ['panel:nav']);
  assert.deepEqual(arrange(commands, 'zzz', []), []);
});

test('the recent list keeps the newest first, once each, inside its limit, and reads back what the store holds', () => {
  assert.deepEqual(rememberCommand([], 'a'), ['a']);
  assert.deepEqual(rememberCommand(['a', 'b'], 'b'), ['b', 'a']);
  assert.equal(rememberCommand(['1', '2', '3', '4', '5', '6'], '7').length, RECENT_MAX);
  const store = { getItem: () => JSON.stringify(['a', 3, 'b']) };
  assert.deepEqual(readRecent(store), ['a', 'b']);
  assert.deepEqual(readRecent({ getItem: () => '{broken' }), []);
  assert.deepEqual(readRecent({ getItem: () => null }), []);
});

test('a command can be pinned when its id fits the stored form and is not bound to the moment, and the list stops at the cap', () => {
  assert.equal(canPin('panel:nav'), true);
  assert.equal(canPin('page:kaker'), true);
  assert.equal(canPin('block:text'), true);
  assert.equal(canPin('plugin:my-plugin.export'), true);
  assert.equal(canPin('plugin:export csv'), false);
  assert.equal(canPin('section-go:sec-1'), false);
  assert.equal(canPin('device:phone'), false);
  assert.equal(canPin('publish'), false);
  assert.equal(canPin('undo'), true);
  assert.deepEqual(togglePinned([], 'panel:nav'), ['panel:nav']);
  assert.deepEqual(togglePinned(['panel:nav'], 'panel:nav'), []);
  const base = ['panel:nav'];
  assert.equal(togglePinned(base, 'publish'), base);
  const full = Array.from({ length: PINNED_MAX }, (_, i) => `page:p${i}`);
  assert.equal(togglePinned(full, 'panel:nav'), full);
  assert.deepEqual(togglePinned(full, 'page:p3').length, PINNED_MAX - 1);
});
