/**
 * One Urd setting's control (editor/src/settings/SettingControl.svelte) rendered in node through tests/_svelte-loader.mjs: a setting of the `range` kind draws the row kit's slider with its bounds, its value in its unit and its name for a screen reader.
 * And where the phone order column stands (editor/src/App.svelte): through the phone view, on the desktop with the Phone panel, never under a table over the stage.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import './_svelte-loader.mjs';
import { readFileSync } from 'node:fs';

const { render } = await import('svelte/server');
const { default: SettingControl } = await import('../editor/src/settings/SettingControl.svelte');
const { SETTINGS_GROUPS } = await import('../editor/src/lib/settings-model.js');

test('the grid\'s cell size draws a slider from 4 to 96 px in steps of 2, its value in px beside it, its name for a screen reader', () => {
  const setting = SETTINGS_GROUPS.flatMap((g) => g.settings).find((s) => s.id === 'gridSize');
  const c = { ed: { grid: { size: 24, snap: true }, setGrid() {} }, ta: (k) => k };
  const { body } = render(SettingControl, { props: { setting, c, label: 'Grid cell size', nameId: 'n' } });
  assert.match(body, /<input type="range" min="4" max="96" step="2" value="24" aria-label="Grid cell size" aria-valuetext="24 px"/);
  assert.match(body, />24 px</);
});

test('the phone order column stands through the phone view, on the desktop while the Phone panel stands, and never under a table over the stage', () => {
  const app = readFileSync(new URL('../editor/src/App.svelte', import.meta.url), 'utf8');
  assert.match(app, /\{#if ed\.phonePanelPref === 'dock' && ed\.chromeVisible && !stageTable && \(ed\.viewMode === 'mobile' \|\| \(ed\.activePanel === 'phone' && !\(\(ed\.adminLayout === 'panel-tabs' \|\| ed\.adminLayout === 'page-tabs'\) && ed\.panelFolded\)\)\)\}\s*<PhoneDock \/>/);
});
