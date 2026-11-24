/**
 * The admin's folding lists that scroll: the Urd settings window's sections (settings/SettingsDialog.svelte), opened and folded by a press alone, and the sidebar of words with its folds on hover (shell/Rail.svelte).
 * The sidebar keeps its scrollbar's room while its folds open on rest, so a fold opening never brings a scrollbar over its word, which would take the mouse off it and close it again.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const editorFile = (path) => readFileSync(new URL(`../editor/src/${path}`, import.meta.url), 'utf8');

test('the settings window\'s sections open at a press and fold at the next press on them alone: no rest, scroll or other press folds them', () => {
  const dialog = editorFile('settings/SettingsDialog.svelte');
  assert.doesNotMatch(dialog, /onpointerenter|onpointerleave|restOn|rested/, 'nothing opens on a rest');
  assert.match(dialog, /function jump\(id, folds = true\) \{\s*if \(folds && opened\.includes\(id\)\) \{\s*opened = opened\.filter\(\(open\) => open !== id\);\s*return;\s*\}\s*if \(folds\) opened = \[\.\.\.opened, id\];/, 'a press opens its entry beside the others, and the next press on it folds it');
  assert.match(dialog, /\{@const open = lists && opened\.includes\(group\.id\)\}/);
  assert.equal((dialog.match(/opened = /g) ?? []).length, 3, 'only the press and the kept list set them');
  assert.match(dialog, /\.st-nav-list \{[^}]*overflow-y: auto;[^}]*scrollbar-gutter: stable;/, 'the entries keep their width as sections open and fold');
});

test('the sidebar of words keeps its scrollbar\'s room while its folds open on rest, and its full width otherwise', () => {
  const rail = editorFile('shell/Rail.svelte');
  assert.match(rail, /<nav class="rail" class:hidden=\{!ed\.chromeVisible\} class:rest-folds=\{ed\.sidebarFolds === 'hover'\}/);
  const css = editorFile('app.css');
  assert.match(css, /\.rail\.rest-folds \{ scrollbar-width: thin; scrollbar-gutter: stable; \}/);
  assert.doesNotMatch(css.match(/  \.rail \{[^}]*\}/)?.[0] ?? '', /scrollbar-gutter/, 'the rail of icons and the sidebar without folds on rest keep their width');
});
