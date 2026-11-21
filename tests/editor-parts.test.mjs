/**
 * The admin's parts loaded on demand (editor/src/lib/parts.svelte.js, drawn by lib/LazyPart.svelte): App.svelte draws each part through LazyPart and imports none of them.
 * The build keeps everything the admin starts with in editor.js, each part a file of its own beside it that editor.js asks for (editor/vite.config.js).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const src = (path) => readFileSync(new URL(`../editor/src/${path}`, import.meta.url), 'utf8');
const ASSETS = new URL('../template/admin/assets/', import.meta.url);

test('every part loaded on demand is drawn through LazyPart, and App.svelte imports none of them', () => {
  const parts = src('lib/parts.svelte.js');
  const names = [...parts.matchAll(/^ {2}(\w+): \(\) => import\('([^']+)'\),$/gm)].map((m) => ({ name: m[1], path: m[2] }));
  assert.ok(names.length >= 10, 'the parts are found');
  const app = src('App.svelte');
  const drawn = new Set([...app.matchAll(/<LazyPart name="(\w+)"/g)].map((m) => m[1]));
  for (const { name, path } of names) {
    assert.ok(drawn.has(name), `${name} is drawn`);
    const file = path.split('/').at(-1);
    assert.doesNotMatch(app, new RegExp(`import \\w+ from '[^']*/${file}';`), `${name} is not imported by App.svelte`);
    assert.ok(path.endsWith(`/${name}.svelte`), `${name} is named by its file`);
  }
  for (const name of drawn) assert.ok(names.some((n) => n.name === name), `${name} is a part`);
  // A part that opens and closes by its own state is asked for by that state and stands drawn once its code is in.
  for (const [name, state] of [['DraftsWindow', 'ed.draftsOpen || ed.draftsPill'], ['SetupWizard', 'ed.showSetup'], ['RedirectsDialog', 'ed.redirectsOpen'], ['PictureEditor', 'Boolean(ed.picture)']]) {
    assert.ok(app.includes(`<LazyPart name="${name}" when={${state}} />`), name);
  }
  assert.match(app, /\$effect\(\(\) => \{\s*if \(ed\.canvasOpened\) partsState\.preload\(\);\s*\}\);/, 'the parts are fetched once the canvas has opened');
  // A dynamic component draws nothing until its code is in, and leaves the part's own transitions to the admin's block; an {#if} around it would keep them from playing.
  const lazy = src('lib/LazyPart.svelte');
  assert.match(lazy, /<\/script>\s*<Part \{\.\.\.rest\} \/>\s*$/);
  assert.doesNotMatch(lazy.split('</script>')[1], /\{#if/);
});

test('what reaches into a panel loaded on demand waits until the panel is drawn', () => {
  const parts = src('lib/parts.svelte.js');
  const panels = [...parts.match(/export const PANEL_PARTS = Object\.freeze\(\{([\s\S]*?)\}\);/)[1].matchAll(/(\w+): '(\w+)'/g)];
  assert.ok(panels.length >= 5);
  const app = src('App.svelte');
  for (const [, id, name] of panels) assert.match(app, new RegExp(`\\{:else if ed\\.activePanel === '${id}'\\}\\s*<LazyPart name="${name}" />`), `${id}: drawn as ${name}`);
  const shell = src('state/shell.svelte.js');
  assert.match(shell, /const panelDrawn = \$derived\(!PANEL_PARTS\[activePanel\] \|\| Boolean\(partsState\.loaded\[PANEL_PARTS\[activePanel\]\]\)\);/);
  assert.match(shell, /if \(!want \|\| activePanel !== want\.panel \|\| !panelEl \|\| !panelDrawn\) return;/, 'a fold asked for');
  assert.match(app, /const panelPlace = \$derived\(!ed\.panelDrawn \? null :/, 'the place the panel was left');
  const site = src('state/site.svelte.js');
  for (const flag of ['!id || !shellState.panelDrawn', '!focusShopCurrency || !shellState.panelDrawn']) assert.ok(site.includes(`if (${flag}) return;`), flag);
  assert.equal((site.match(/!shellState\.panelDrawn\) return;/g) ?? []).length, 3, 'the Site panel\'s three fields to focus');
  assert.match(src('shell/PanelTab.svelte'), /ed\.activePanel = 'collections';\s*await partsState\.load\(PANEL_PARTS\.collections\)\.catch\(\(\) => \{\}\);/, 'the new collection\'s name');
});

test('the admin starts with no await at its top, which would keep the build from gathering its code into editor.js', () => {
  const main = src('main.js');
  assert.doesNotMatch(main.replace(/^\s*\/\/.*$/gm, ''), /^(?:[^\s/].*)?\bawait\b/m, 'no top-level await');
  assert.match(main, /initAdminLocale\(\)\.then\(\(lang\) => \{/);
});

test('the built editor.js holds everything the admin starts with, and asks for each file beside it', () => {
  const files = readdirSync(ASSETS).filter((name) => name.endsWith('.js'));
  const read = (name) => readFileSync(new URL(name, ASSETS), 'utf8');
  const editor = read('editor.js');
  assert.doesNotMatch(editor, /(?:^|[;}])import\s*(?:[\w${},\s*]+from\s*)?["'`]\.\//, 'editor.js imports no other file as it loads');
  for (const [, name] of src('lib/parts.svelte.js').matchAll(/^ {2}(\w+): \(\) => import\(/gm)) {
    assert.match(editor, new RegExp(`import\\(["'\`]\\./${name}-[\\w-]+\\.js["'\`]\\)`), `${name} is a file of its own that editor.js asks for`);
  }
  // A part imports what it shares with the start from ./editor.js, the same module only where the admin loads editor.js by that plain address.
  assert.match(readFileSync(new URL('../template/admin/index.html', import.meta.url), 'utf8'), /<script type="module" src="\.\/assets\/editor\.js"><\/script>/);
  // Every file beside it is reached from editor.js, by its own dynamic import or another part's import.
  const reached = new Set(['editor.js']);
  const queue = ['editor.js'];
  while (queue.length) {
    const text = read(queue.shift());
    for (const [, name] of text.matchAll(/["'`]\.\/([\w.-]+\.js)["'`]/g)) {
      if (!reached.has(name) && files.includes(name)) {
        reached.add(name);
        queue.push(name);
      }
    }
  }
  assert.deepEqual(files.filter((name) => !reached.has(name)), [], 'no file is left that nothing asks for');
  assert.deepEqual(readdirSync(ASSETS).filter((name) => !name.endsWith('.js')), ['editor.css'], 'one stylesheet');
});

test('the admin\'s own stylesheet stands last in editor.css, after every component\'s rules, those of the parts loaded on demand included', () => {
  const css = readFileSync(new URL('editor.css', ASSETS), 'utf8');
  // app.css's first rule, as the build writes it: its selector and its first property.
  const [, selector, property] = src('app.css').replace(/\/\*[\s\S]*?\*\//g, '').match(/([^{}\s][^{}]*?)\s*\{\s*(--[\w-]+)\s*:/);
  const start = css.indexOf(`${selector}{${property}:`);
  assert.ok(start > 0, 'app.css is found by its first rule');
  assert.ok(css.lastIndexOf('.svelte-') < start, 'no component\'s rule comes after it');
  assert.doesNotMatch(css, /urd-app-css/, 'the marks the build moves it by are gone');
});
