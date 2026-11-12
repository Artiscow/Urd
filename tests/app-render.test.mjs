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
  const names = ['media', 'history', 'preview', 'shell', 'site', 'page', 'collections', 'templates', 'plugins', 'updater', 'blocks', 'bridge', 'publish', 'saved', 'drafts'];
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
    'panel-tabs': [/class="panel-nav/, /class="panel-nav-row"><div class="choice[^"]* fill"/, /class="panel-tab /],
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
  assert.equal(shellState.adminLayout, 'top-tabs', 'an unknown layout is the default, the strip');
});

test('a new Urd is told as a dot on Updates in every layout, or as a pill in the top bar where the site asks for it', async () => {
  const { default: App } = await import('../editor/src/App.svelte');
  const { siteState } = await import('../editor/src/state/site.svelte.js');
  const { shellState } = await import('../editor/src/state/shell.svelte.js');
  const { updaterState } = await import('../editor/src/state/updater.svelte.js');
  updaterState.updateInfo = { upToDate: false, target: 'v0.7.8', current: 'v0.7.7', changes: [] };
  shellState.activePanel = 'pages';
  for (const layout of shellState.ADMIN_LAYOUTS) {
    shellState.adminLayout = layout;
    shellState.toolMenu = layout === 'page-tabs' ? 'site' : null;
    const { body } = render(App);
    assert.match(body, /class="update-dot/, `${layout}: the dot is drawn`);
    assert.doesNotMatch(body, /update-pill/, `${layout}: no pill by default`);
  }
  siteState.siteDraft.admin = { updateNotice: 'pill' };
  shellState.adminLayout = 'rail';
  let body = render(App).body;
  assert.match(body, /update-pill[\s\S]*Urd v0\.7\.8|update-pill/, 'the pill stands in the top bar');
  assert.doesNotMatch(body, /class="update-dot/, 'no dot beside the pill');
  // A narrow bar has folded its first cluster: the dot again.
  shellState.folded = { view: true, device: false, zoom: false };
  body = render(App).body;
  assert.match(body, /class="update-dot/);
  assert.doesNotMatch(body, /update-pill/);
  shellState.folded = { view: false, device: false, zoom: false };
  delete siteState.siteDraft.admin;
  updaterState.updateInfo = { upToDate: true, target: 'v0.7.7', current: 'v0.7.7', changes: [] };
  assert.doesNotMatch(render(App).body, /class="update-dot|update-pill/, 'nothing while up to date');
  updaterState.updateInfo = null;
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
  for (const panel of ['pages', 'nav', 'site', 'theme', 'blocks', 'grid', 'properties', 'footer', 'collections', 'plugins', 'history', 'update', 'settings']) {
    shellState.activePanel = panel;
    const { body } = render(App);
    assert.match(body, /class="rail/, `${panel}: the rail is drawn`);
    assert.match(body, /class="panel-body/, `${panel}: the panel is drawn`);
    assert.match(body, /class="frame-wrap/, `${panel}: the preview stage is drawn`);
  }
  shellState.activePanel = null;
  shellState.settingsOpen = true;
  const dialog = render(App).body;
  assert.match(dialog, /class="st-overlay/, 'the Urd settings open as a dialog');
  assert.match(dialog, /\bst-dialog\b/, 'the dialog has its sections down the left');
  assert.match(dialog, /class="st-tile/, 'a look choice is drawn as pictures');
  shellState.setSettingsPictures('words');
  assert.doesNotMatch(render(App).body, /class="st-tile/, 'with the pictures off a look choice is a dropdown');
  shellState.setSettingsPictures('pictures');
  shellState.setSettingsPlace('sheet');
  assert.match(render(App).body, /\bst-sheet\b/, 'the sheet is drawn when chosen');
  shellState.setSettingsPlace('panel');
  assert.equal(shellState.settingsOpen, false, 'the open settings move into the panel');
  assert.equal(shellState.activePanel, 'settings');
  assert.match(render(App).body, /class="panel-body st-panel/, 'the settings panel is drawn');
  shellState.setSettingsPlace('dialog');
  assert.equal(shellState.activePanel, null);
  assert.equal(shellState.settingsOpen, true, 'and back into the dialog');
  shellState.settingsOpen = false;
});

test('the Collections panel steps in, widens to two columns, or opens a table over the page, by «Collections editor»', async () => {
  const { default: App } = await import('../editor/src/App.svelte');
  const { siteState } = await import('../editor/src/state/site.svelte.js');
  const { shellState } = await import('../editor/src/state/shell.svelte.js');
  const { collectionsState } = await import('../editor/src/state/collections.svelte.js');
  const { liftSiteFile } = await import('$engine/migrate.js');
  const { readFileSync } = await import('node:fs');
  // The titles are read as plain words; node has no DOMParser, so a stand-in returns the text as it is.
  globalThis.DOMParser ??= class { parseFromString(s) { return { body: { textContent: s } }; } };
  const site = liftSiteFile(JSON.parse(readFileSync(new URL('../template/content/site.json', import.meta.url), 'utf8')));
  siteState.site = site;
  siteState.siteDraft = structuredClone(site);
  collectionsState.collectionIds = ['kaker'];
  collectionsState.collectionsView = { kaker: { name: 'Kaker', kind: 'products', entries: [{ id: 'a', title: 'Sjokoladekake', price: 350, sizes: ['Liten'] }, { id: 'b', title: 'Kanelboller', price: 120 }] } };
  shellState.activePanel = 'collections';

  collectionsState.panelCollection = null;
  assert.match(render(App).body, /class="cl-collection/, 'the collections stand as rows');
  collectionsState.panelCollection = 'kaker';
  let body = render(App).body;
  assert.match(body, /class="nav-item cl-row/, 'stepping in: the entries');
  assert.doesNotMatch(body, /coll-entry/, 'no entry yet');
  assert.match(body, /class="cl-tick tick-box/, 'each row has its tick box');
  assert.doesNotMatch(body, /class="sb[ "]/, 'no bar while nothing is ticked');
  collectionsState.panelTicks = ['a'];
  assert.match(render(App).body, /class="sb[ "]/, 'a tick brings the bar under the search');
  collectionsState.panelTicks = [];
  collectionsState.panelEntry = 'b';
  body = render(App).body;
  assert.match(body, /coll-entry/, 'stepping in: one entry with its fields');
  assert.match(body, /coll-place/, 'its place among the entries');
  assert.match(body, /class="sp-btn/, 'a product\'s sizes have their presets');
  assert.match(body, /data-field="quantity"/, 'and the quantity switch');
  assert.match(body, /tip.collections.duplicateEntry/, 'the entry can be duplicated');

  shellState.setCollectionsLayout('columns');
  body = render(App).body;
  assert.match(body, /panel-wide/, 'two columns widen the panel');
  assert.match(body, /class="nav-item cl-row/, 'with the entries');
  assert.match(body, /coll-entry/, 'beside the chosen entry');

  shellState.setCollectionsLayout('table');
  body = render(App).body;
  assert.doesNotMatch(body, /panel-wide/);
  assert.match(body, /class="ct /, 'the table stands over the page');
  assert.match(body, /<th class="ct-tick/, 'with a tick column');
  assert.match(body, /<th[^>]*>lbl.price<\/th>/, 'with the product columns');
  assert.match(body, /class="frame-wrap/, 'and the preview stays underneath');

  shellState.setCollectionsLayout('drill');
  collectionsState.panelCollection = null;
  collectionsState.panelEntry = null;
  collectionsState.collectionIds = [];
  collectionsState.collectionsView = {};
});

test('Drafts stands first in the System section of every layout, Save has left the top bar, and the tab opens the Drafts window or its pill', async () => {
  const { default: App } = await import('../editor/src/App.svelte');
  const { siteState } = await import('../editor/src/state/site.svelte.js');
  const { shellState } = await import('../editor/src/state/shell.svelte.js');
  const { draftsState } = await import('../editor/src/state/drafts.svelte.js');
  const { liftSiteFile } = await import('$engine/migrate.js');
  const { readFileSync } = await import('node:fs');
  const site = liftSiteFile(JSON.parse(readFileSync(new URL('../template/content/site.json', import.meta.url), 'utf8')));
  siteState.site = site;
  siteState.siteDraft = structuredClone(site);
  assert.deepEqual(shellState.PANEL_GROUPS[2], ['drafts', 'history', 'update']);
  assert.ok(!shellState.PANEL_IDS.includes('drafts'), 'Drafts is no panel the column holds');
  shellState.activePanel = 'drafts';
  assert.notEqual(shellState.activePanel, 'drafts', 'asking for it as a panel opens its window instead');
  assert.equal(draftsState.draftsOpen, true);
  draftsState.closeDrafts();
  for (const layout of shellState.ADMIN_LAYOUTS) {
    shellState.adminLayout = layout;
    // The System group stands in sight: the panel's tabs show it with a System panel open, the page's tabs in the Site menu.
    shellState.activePanel = layout === 'panel-tabs' ? 'history' : null;
    shellState.toolMenu = layout === 'page-tabs' ? 'site' : null;
    const body = render(App).body;
    assert.equal([...body.matchAll(/data-drafts-tab/g)].length, 1, `${layout}: one Drafts tab`);
    assert.doesNotMatch(body.match(/<button[^>]*data-drafts-tab[^>]*>/)[0], /\stitle=/, `${layout}: no tooltip on a tab that opens on a rest`);
    assert.doesNotMatch(body, /save-btn|save-pop/, `${layout}: no Save in the top bar`);
  }
  shellState.toolMenu = null;
  shellState.activePanel = null;
  shellState.adminLayout = 'top-tabs';
  draftsState.openDrafts({ tab: 'browser' });
  let body = render(App).body;
  assert.match(body, /class="float-window drafts-window/, 'the window is drawn');
  assert.match(body, /class="wip-tag[^"]*" title="drafts\.wipTip"[^>]*>drafts\.wip</, 'with W.I.P. on its head, and why in its tooltip');
  assert.equal([...body.matchAll(/role="tab"/g)].length, 3, 'three tabs');
  assert.doesNotMatch(body.match(/<button[^>]*dw-more-btn[^>]*>/)[0], /\stitle=/, 'no tooltip on the «⋯», which opens on a rest');
  assert.match(body, /aria-label="drafts\.pill"/, 'the fold to a pill stands in the head as an icon');
  assert.doesNotMatch(body, /aria-label="drafts\.backToTab"/, 'by its tab, no way back to stand there');
  draftsState.moveDrafts({ left: 200, top: 300 });
  assert.match(render(App).body, /aria-label="drafts\.backToTab"/, 'dragged, the way back by its tab');
  draftsState.resetDraftsPlace();
  assert.equal(draftsState.draftsPlace, null, 'and it lets the dragged place go');
  assert.match(body, /aria-selected="true"[^>]*data-tab="browser"/, 'at the tab asked for');
  draftsState.foldDraftsToPill();
  body = render(App).body;
  assert.doesNotMatch(body, /drafts-window/);
  assert.match(body, /class="drafts-pill/, 'folded to its pill');
  draftsState.openDrafts();
  assert.equal(draftsState.draftsPill, false, 'the pill opens the window again');
  draftsState.closeDrafts();
});

test('the Drafts window: a rest opens it and leaving closes it, a press keeps it, a rest leaves the pill folded, and a close forgets where the mouse was', async () => {
  const { draftsState } = await import('../editor/src/state/drafts.svelte.js');
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const mouse = { pointerType: 'mouse' };
  draftsState.closeDrafts();
  draftsState.restOnDraftsTab(true, mouse);
  await wait(220);
  assert.equal(draftsState.draftsOpen, true, 'a rest on the tab opens it');
  draftsState.restOnDraftsTab(false, mouse);
  await wait(320);
  assert.equal(draftsState.draftsOpen, false, 'leaving the tab closes a window the rest opened');
  draftsState.restOnDraftsTab(true, { pointerType: 'touch' });
  await wait(220);
  assert.equal(draftsState.draftsOpen, false, 'a touch opens nothing by resting');
  // A press keeps a window the rest opened.
  draftsState.restOnDraftsTab(true, mouse);
  await wait(220);
  draftsState.toggleDrafts();
  draftsState.restOnDraftsTab(false, mouse);
  await wait(320);
  assert.equal(draftsState.draftsOpen, true, 'pressed, it stays as the mouse leaves');
  // Closed with the mouse on the window: the next rest's window still closes as the mouse leaves the tab.
  draftsState.restOnDraftsWindow(true, mouse);
  draftsState.closeDrafts();
  draftsState.restOnDraftsTab(true, mouse);
  await wait(220);
  draftsState.restOnDraftsTab(false, mouse);
  await wait(320);
  assert.equal(draftsState.draftsOpen, false, 'the mouse on a window taken away is forgotten');
  // Folded: a rest shows the window and leaves the pill; a press unfolds it.
  draftsState.openDrafts();
  draftsState.foldDraftsToPill();
  draftsState.restOnDraftsTab(true, mouse);
  await wait(220);
  assert.equal(draftsState.draftsPill, true, 'a passing rest leaves the pill');
  draftsState.restOnDraftsTab(false, mouse);
  await wait(320);
  assert.equal(draftsState.draftsOpen, false);
  draftsState.toggleDrafts();
  assert.equal(draftsState.draftsPill, false, 'a press unfolds it');
  draftsState.closeDrafts();
  // What is kept for later goes with a publish of everything.
  draftsState.toggleLater('page-kaker');
  assert.deepEqual(draftsState.draftsLater, ['page-kaker']);
  draftsState.clearLater();
  assert.deepEqual(draftsState.draftsLater, []);
});

test('the site is set together with its draft, after the saved drafts are met, so a panel drawn meanwhile never finds a site without its draft', async () => {
  const { readFileSync } = await import('node:fs');
  const init = readFileSync(new URL('../editor/src/state/shell.svelte.js', import.meta.url), 'utf8').split('async function init()')[1];
  const met = init.indexOf('await meeting');
  const set = init.indexOf('siteState.site = ');
  const store = init.indexOf('siteState.linkSiteDraft()');
  assert.ok(met > 0 && set > met && store > set, 'the meeting, then the site, then its draft linked');
  assert.doesNotMatch(init.slice(set, store), /await /, 'nothing waits between the site and its draft');
});
