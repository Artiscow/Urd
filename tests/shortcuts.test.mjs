/**
 * The shortcut sheet (editor/src/lib/shortcuts.js, ShortcutSheet.svelte; comparison/ELEMENTS.md E21): every row and key name is in the core languages, every token is one the sheet can draw, and «?» opens the sheet on the page, in the panels and from the Urd settings and the setup wizard.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE_DIR, engineImport } from './_engine.mjs';
import { SHORTCUT_GROUPS, KEY_LABELS, ARROW_TOKENS, POINTER_TOKENS, opensShortcuts } from '../editor/src/lib/shortcuts.js';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('every group, row and key name of the sheet is in nb, en-GB and tr', async () => {
  const dicts = await Promise.all(['nb', 'en-GB', 'tr'].map(async (lang) => [lang, (await engineImport(`locales/admin/${lang}.js`)).default.strings]));
  const keys = new Set(['shortcuts.title', 'shortcuts.or', 'tip.shortcuts.open', ...Object.values(KEY_LABELS)]);
  for (const group of SHORTCUT_GROUPS) {
    keys.add(group.labelKey);
    if (group.tipKey) keys.add(group.tipKey);
    for (const row of group.rows) {
      keys.add(row.labelKey);
      if (row.tipKey) keys.add(row.tipKey);
    }
  }
  for (const [lang, strings] of dicts) {
    const missing = [...keys].filter((key) => !strings[key]);
    assert.deepEqual(missing, [], `${lang} lacks ${missing.join(', ')}`);
  }
});

test('every token is a named key, a drawn arrow, a pointer action or a character on a key, and no group lists a row twice', () => {
  for (const token of [...ARROW_TOKENS, ...POINTER_TOKENS]) assert.ok(KEY_LABELS[token], `${token} has a name`);
  for (const group of SHORTCUT_GROUPS) {
    const labels = group.rows.map((row) => row.labelKey);
    assert.equal(new Set(labels).size, labels.length, `${group.id}: a row stands once`);
    for (const row of group.rows) {
      assert.ok(row.ways.length, `${row.labelKey} has a way to press it`);
      for (const way of row.ways) {
        for (const token of way) {
          assert.ok(KEY_LABELS[token] || /^([A-Z0-9/?]|F\d{1,2})$/.test(token), `${row.labelKey}: ${token}`);
        }
      }
    }
  }
});

test('«?» opens the sheet outside fields only, and never with Ctrl, Cmd or Alt', () => {
  const press = (over = {}) => ({ key: '?', ctrlKey: false, metaKey: false, altKey: false, ...over });
  assert.equal(opensShortcuts(press(), false), true);
  assert.equal(opensShortcuts(press(), true), false);
  assert.equal(opensShortcuts(press({ ctrlKey: true }), false), false);
  assert.equal(opensShortcuts(press({ metaKey: true }), false), false);
  assert.equal(opensShortcuts(press({ altKey: true }), false), false);
  assert.equal(opensShortcuts(press({ key: '/' }), false), false);
});

test('the sheet is reached from the page, the panels, the Urd settings and the setup wizard', () => {
  const page = readFileSync(new URL('preview-edit.js', ENGINE_DIR), 'utf8');
  assert.match(page, /event\.key === '\?' && !ctrl && !event\.altKey && !\(target instanceof Element && target\.closest\('dialog, \[role="dialog"\]'\)\)\) \{\s*event\.preventDefault\(\);\s*post\(\{ type: 'urd-shortcuts' \}\);/);
  assert.match(read('../editor/src/lib/previewBridge.js'), /msg\?\.type === 'urd-shortcuts'\) handlers\.onShortcuts/);
  assert.match(read('../editor/src/state/preview.svelte.js'), /onShortcuts: \(\) => shellState\.openShortcuts\(\)/);
  assert.match(read('../editor/src/state/shell.svelte.js'), /if \(opensShortcuts\(e, typed\)\) \{/);
  assert.match(read('../editor/src/shell/Rail.svelte'), /ed\.openShortcuts\(\);/);
  const wizard = read('../editor/src/shell/SetupWizard.svelte');
  assert.match(wizard, /onclick=\{ed\.openShortcuts\}/);
  assert.doesNotMatch(wizard, /setup\.keys/, 'the keys stand in the sheet, not in the wizard');
  assert.match(read('../editor/src/App.svelte'), /\{#if ed\.shortcutsOpen\}\s*<ShortcutSheet /);
});
