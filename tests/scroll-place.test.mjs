/**
 * Where the admin's large windows were left (editor/src/lib/scroll-place.js): each panel, each block's and section's element menu, each kind of design picker and each collection's table opens where it was left, kept for the tab's life so a reload comes back to it.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const { keepScroll } = await import(new URL('../editor/src/lib/scroll-place.js', import.meta.url).href);

/** A scrolling window as the browser keeps it: the scroll is held inside what the content allows, and a scroll is told to the listeners. */
function windowOf(height = 1000, view = 300) {
  const listeners = new Map();
  let top = 0;
  return {
    isConnected: true,
    clientHeight: view,
    scrollHeight: height,
    get scrollTop() { return top; },
    set scrollTop(value) { top = Math.max(0, Math.min(value, this.scrollHeight - this.clientHeight)); },
    addEventListener: (type, fn) => listeners.set(type, [...(listeners.get(type) ?? []), fn]),
    removeEventListener: (type, fn) => listeners.set(type, (listeners.get(type) ?? []).filter((f) => f !== fn)),
    fire: (type) => (listeners.get(type) ?? []).forEach((fn) => fn()),
  };
}

/** The browser's frames, run by hand. */
const frames = new Map();
let nextFrame = 1;
globalThis.requestAnimationFrame = (fn) => {
  frames.set(nextFrame, fn);
  return nextFrame++;
};
globalThis.cancelAnimationFrame = (id) => frames.delete(id);
const runFrames = () => {
  const now = [...frames.values()];
  frames.clear();
  now.forEach((fn) => fn());
};

test('a window opens where it was left, each key its own place, and one never left stands at its top', () => {
  const first = windowOf();
  const away = keepScroll('panel:theme')(first);
  first.scrollTop = 240;
  first.fire('scroll');
  away();
  const again = windowOf();
  keepScroll('panel:theme')(again);
  assert.equal(again.scrollTop, 240);
  const other = windowOf();
  other.scrollTop = 500;
  keepScroll('panel:site')(other);
  assert.equal(other.scrollTop, 0, 'another panel at its top');
  assert.equal(keepScroll(null)(windowOf()), undefined, 'no key keeps nothing');
});

test('the way back waits for content that comes later, and the owner\'s own scroll ends it', () => {
  const kept = windowOf();
  keepScroll('table:produkter')(kept);
  kept.scrollTop = 600;
  kept.fire('scroll');
  const growing = windowOf(400);
  keepScroll('table:produkter')(growing);
  assert.equal(growing.scrollTop, 100, 'as far as the content allows');
  growing.scrollHeight = 1000;
  runFrames();
  assert.equal(growing.scrollTop, 600, 'the place once the content is there');
  const owner = windowOf(400);
  keepScroll('table:produkter')(owner);
  owner.fire('wheel');
  owner.scrollHeight = 1000;
  runFrames();
  assert.equal(owner.scrollTop, 100, 'the owner\'s wheel stops the way back');
  // A scroll the editor makes itself (a fold brought into view) stands where the way back did not put the window, and ends it too.
  const editor = windowOf(400);
  keepScroll('table:produkter')(editor);
  editor.scrollTop = 40;
  editor.fire('scroll');
  editor.scrollHeight = 1000;
  runFrames();
  assert.equal(editor.scrollTop, 40, 'the editor\'s own scroll stands');
  // The way back's own scroll, held by the browser inside what the content allows, is no such scroll.
  const left = windowOf();
  keepScroll('table:nyheter')(left);
  left.scrollTop = 600;
  left.fire('scroll');
  const clamped = windowOf(400);
  keepScroll('table:nyheter')(clamped);
  clamped.fire('scroll');
  clamped.scrollHeight = 1000;
  runFrames();
  assert.equal(clamped.scrollTop, 600);
});

test('a window that is no longer drawn keeps the place it had, and a scroll to the top forgets it', () => {
  const win = windowOf();
  keepScroll('picker:footer')(win);
  win.scrollTop = 300;
  win.fire('scroll');
  win.clientHeight = 0;
  win.scrollTop = 0;
  win.fire('scroll');
  const back = windowOf();
  keepScroll('picker:footer')(back);
  assert.equal(back.scrollTop, 300, 'a closing dialog\'s lost scroll is not the owner\'s');
  back.scrollTop = 0;
  back.fire('scroll');
  const top = windowOf();
  keepScroll('picker:footer')(top);
  assert.equal(top.scrollTop, 0);
});

test('the four windows keep their place by what they show', () => {
  const src = (path) => readFileSync(new URL(`../editor/src/${path}`, import.meta.url), 'utf8');
  const app = src('App.svelte');
  assert.match(app, /<aside class="panel"[^>]*\{@attach keepScroll\(panelPlace\)\}/, 'the side panel');
  assert.match(app, /ed\.activePanel === 'properties' \? \(ed\.selectedBlock \? `menu:dock:\$\{ed\.selectedBlock\.blockId\}`/, 'the docked menu per block');
  assert.equal((app.match(/<DesignPicker /g) ?? []).length, (app.match(/\n\s+place=/g) ?? []).length, 'every design picker names its kind');
  // The floating menu and the picker take their place as a string, so an edit of the block or a move of the menu is no other place; the docked and the floating menu keep apart, since their windows differ.
  const floating = src('menu/FloatingMenu.svelte');
  assert.match(floating, /const menuPlace = \$derived\(only \? null : pos\.section \? \(ed\.activeSectionId \? `menu:float:section:\$\{ed\.activeSectionId\}` : null\) : selectedBlock \? `menu:float:\$\{selectedBlock\.blockId\}` : null\);/, 'the floating menu per block and section');
  assert.match(floating, /class="panel-body block-menu-body" \{@attach keepScroll\(menuPlace\)\}/);
  const picker = src('lib/DesignPicker.svelte');
  assert.match(picker, /const listPlace = \$derived\(place \? `picker:\$\{place\}` : null\);/);
  assert.match(picker, /class="dp-list"[^\n]*\{@attach keepScroll\(listPlace\)\}/);
  assert.match(src('panels/collections/CollectionsTable.svelte'), /class="ct-scroll" \{@attach keepScroll\(id \? `table:\$\{id\}` : null\)\}/);
  // A page's settings, per page, in each of their three forms.
  assert.match(src('panels/pages/PageSettingsDialog.svelte'), /class="ps-body panel-body" \{@attach keepScroll\(id \? `page-settings:dialog:\$\{id\}` : null\)\}/, 'the dialog');
  assert.match(src('panels/pages/PageSettingsTable.svelte'), /class="pt-drawer panel-body"[^\n]*\{@attach keepScroll\(id \? `page-settings:table:\$\{id\}` : null\)\}/, 'the table\'s drawer');
  assert.match(app, /ed\.activePanel === 'pages' && ed\.pageSettingsPref === 'step' && ed\.pageSettingsFor \? `page-settings:step:\$\{ed\.pageSettingsFor\}`/, 'the step in the Pages panel');
});

test('the places kept before a reload are read back, each a window\'s key with a place below its top', async () => {
  const kept = JSON.stringify([['panel:theme', 240], ['panel:site', 'far'], ['panel:nav', 0], 'odd']);
  globalThis.sessionStorage = { getItem: () => kept, setItem() {} };
  try {
    const { keepScroll: afterReload } = await import(new URL('../editor/src/lib/scroll-place.js?reloaded', import.meta.url).href);
    const theme = windowOf();
    afterReload('panel:theme')(theme);
    assert.equal(theme.scrollTop, 240, 'the kept place comes back');
    for (const key of ['panel:site', 'panel:nav']) {
      const other = windowOf();
      afterReload(key)(other);
      assert.equal(other.scrollTop, 0, `${key}: a place that does not hold leaves the window at its top`);
    }
  } finally {
    delete globalThis.sessionStorage;
  }
});
