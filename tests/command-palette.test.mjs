/**
 * The command palette's list (editor/src/lib/command-palette.js): the groups, the recent commands first, a query ranking the matches, and the recent list's upkeep.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { arrangeCommands, flatItems, readRecent, rememberCommand, GROUP_ORDER, RECENT_MAX } from '../editor/src/lib/command-palette.js';
import { engineImport } from './_engine.mjs';
const { searchItems } = await engineImport('palette-search.js');
const arrange = (commands, query, recent) => arrangeCommands(commands, query, recent, searchItems);

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
  assert.equal(GROUP_ORDER[0], 'recent');
  assert.deepEqual(arrange(commands, '  ', []).map((g) => g.group), ['actions', 'pages', 'panels', 'blocks', 'sections', 'plugins']);
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
