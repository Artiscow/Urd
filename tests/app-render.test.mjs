/**
 * The editor shell rendered in node (0.7.26.5): App.svelte with the state
 * modules under editor/src/state/ and the shell parts under editor/src/shell/
 * are compiled for the server through tests/_svelte-loader.mjs and drawn as
 * they stand before the site has loaded, so a module that reads another's
 * handle while the modules still load, or a name the split left behind in
 * the shell's markup, fails here instead of in the browser. No DOM: the
 * effects and the startup (onMount) do not run.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

const store = new Map();
globalThis.localStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };
globalThis.window = globalThis;
globalThis.innerWidth = 1600;
globalThis.innerHeight = 900;
globalThis.matchMedia ??= () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
globalThis.location ??= { search: '', origin: 'http://localhost', href: 'http://localhost/admin/' };
globalThis.navigator ??= { language: 'nb' };
globalThis.document ??= { documentElement: { dataset: {}, style: { setProperty() {} }, classList: { add() {}, remove() {}, toggle() {} } }, addEventListener() {}, removeEventListener() {}, querySelector: () => null, querySelectorAll: () => [] };

register('./_svelte-loader.mjs', import.meta.url);
const { render } = await import('svelte/server');

test('every state module loads, and no module reads another\'s handle while they load', async () => {
  const names = ['media', 'history', 'preview', 'shell', 'site', 'page', 'collections', 'templates', 'plugins', 'updater', 'blocks', 'bridge', 'publish'];
  for (const name of names) {
    const mod = await import(`../editor/src/state/${name}.svelte.js`);
    const handle = mod[`${name}State`];
    assert.ok(handle && typeof handle === 'object', `${name}: the handle is exported`);
    // The shell runs a module's effects through its handle; a module with effects must carry them there.
    if (mod.effects) assert.equal(handle.effects, mod.effects, `${name}: the effects stand on the handle`);
  }
});

test('the shell renders before the site has loaded', async () => {
  const { default: App } = await import('../editor/src/App.svelte');
  const { body } = render(App);
  assert.match(body, /class="editor/, 'the editor frame is drawn');
  assert.match(body, /class="loading/, 'the loading line stands in for the workspace');
  assert.match(body, /class="topbar/, 'the top bar is drawn');
});

test('every panel layout draws its own way to the panels, and the gear stands once', async () => {
  const { default: App } = await import('../editor/src/App.svelte');
  const { siteState } = await import('../editor/src/state/site.svelte.js');
  const { shellState } = await import('../editor/src/state/shell.svelte.js');
  const { liftSiteFile } = await import('$engine/migrate.js');
  const { readFileSync } = await import('node:fs');
  const site = liftSiteFile(JSON.parse(readFileSync(new URL('../template/content/site.json', import.meta.url), 'utf8')));
  siteState.site = site;
  siteState.siteDraft = structuredClone(site);
  const marks = {
    rail: [/class="rail rail-icons/, /class="rail-icon/, /fold-all panel-fold/],
    sidebar: [/class="rail"/, /class="rail-group/],
    'panel-tabs': [/class="panel-nav/, /class="seg panel-nav-groups/, /class="panel-tab /],
    'top-tabs': [/class="panel-strip/, /class="strip-group/],
    'page-tabs': [/class="panel-nav/, /class="topnav/, /class="tool-pop site-pop/],
  };
  assert.deepEqual(Object.keys(marks).sort(), [...shellState.ADMIN_LAYOUTS].sort());
  for (const layout of shellState.ADMIN_LAYOUTS) {
    shellState.adminLayout = layout;
    shellState.activePanel = 'properties';
    shellState.toolMenu = layout === 'page-tabs' ? 'site' : null;
    const { body } = render(App);
    for (const re of marks[layout]) assert.match(body, re, `${layout}: ${re}`);
    assert.equal([...body.matchAll(/class="rail-gear/g)].length, 1, `${layout}: one gear`);
    assert.match(body, /class="panel-body/, `${layout}: the panel is drawn`);
    if (layout !== 'rail' && layout !== 'sidebar') assert.doesNotMatch(body, /class="rail[" ]/, `${layout}: no rail`);
  }
  // The tab layouts keep the panel's column with its tabs while no panel is open, and fold it to a handle; the strip holds the gear; the rail closes the panel.
  shellState.activePanel = null;
  shellState.toolMenu = null;
  shellState.adminLayout = 'panel-tabs';
  assert.match(render(App).body, /class="panel-nav/);
  shellState.panelFolded = true;
  assert.match(render(App).body, /class="panel-handle/);
  assert.doesNotMatch(render(App).body, /class="panel-nav/);
  shellState.panelFolded = false;
  shellState.adminLayout = 'top-tabs';
  assert.match(render(App).body, /class="panel-strip[\s\S]*rail-gear/);
  shellState.adminLayout = 'rail';
  assert.doesNotMatch(render(App).body, /<aside class="panel/);
  shellState.setAdminLayout('nonsense');
  assert.equal(shellState.adminLayout, 'rail');
});

test('the shell renders the workspace with every panel open in turn, from the modules\' own state', async () => {
  const { default: App } = await import('../editor/src/App.svelte');
  const { siteState } = await import('../editor/src/state/site.svelte.js');
  const { shellState } = await import('../editor/src/state/shell.svelte.js');
  const { liftSiteFile } = await import('$engine/migrate.js');
  const { readFileSync } = await import('node:fs');
  const site = liftSiteFile(JSON.parse(readFileSync(new URL('../template/content/site.json', import.meta.url), 'utf8')));
  siteState.site = site;
  siteState.siteDraft = structuredClone(site);
  for (const panel of ['pages', 'nav', 'site', 'theme', 'blocks', 'grid', 'properties', 'footer', 'collections', 'plugins', 'history', 'update']) {
    shellState.activePanel = panel;
    const { body } = render(App);
    assert.match(body, /class="rail/, `${panel}: the rail is drawn`);
    assert.match(body, /class="panel-body/, `${panel}: the panel is drawn`);
    assert.match(body, /class="frame-wrap/, `${panel}: the preview stage is drawn`);
  }
  shellState.settingsOpen = true;
  const { body } = render(App);
  assert.match(body, /class="settings-pop/, 'the settings popover is drawn');
});
