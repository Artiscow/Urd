/**
 * The editor's preview as it opens (urd.js enablePreview): the view, site and page the editor sends as the preview reports ready, marked `startup`, repeat what the preview booted with from the same drafts, and a plugin list that defines nothing draws nothing, so the page is drawn once and its pictures do not flicker.
 * And the editor's own opening (state/shell.svelte.js init): the sign-in asked for first, the saved drafts waited for only where they may let a part here go, the page and the loaders read together, and the Legal panel's other pages read once the canvas has opened.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE_DIR, engineImport } from './_engine.mjs';
import { meet } from '../editor/src/lib/saved-model.js';

const editorFile = (path) => readFileSync(new URL(`../editor/src/${path}`, import.meta.url), 'utf8');

const urd = readFileSync(new URL('urd.js', ENGINE_DIR), 'utf8');

test('the view, site and page the editor marks as its ready handshake draw nothing where they change nothing', () => {
  assert.match(urd, /if \(msg\?\.startup === true && \(\(msg\.type === 'urd-viewport' && msg\.mode === state\.viewport\) \|\| \(msg\.type === 'urd-site' && !msg\.page && sameData\(msg\.site, state\.site\)\) \|\| \(msg\.type === 'urd-preview-full' && sameData\(msg\.page, state\.page\)\)\)\) return;/);
  const skip = urd.indexOf('if (msg?.startup === true');
  assert.ok(skip > 0 && skip < urd.indexOf("if (msg?.type === 'urd-preview' && msg.section)"), 'before any message is handled');
  const ready = readFileSync(new URL('../editor/src/state/preview.svelte.js', import.meta.url), 'utf8');
  assert.match(ready, /bridge\?\.sendViewport\(viewMode, \{ startup: true \}\);/);
  assert.match(ready, /siteState\.pushSiteToPreview\(\{ startup: true \}\);/);
  assert.match(ready, /bridge\?\.sendPage\(pageState\.pageId, pageState\.store\.data, \{ startup: true \}\);/);
  const bridge = readFileSync(new URL('../editor/src/lib/previewBridge.js', import.meta.url), 'utf8');
  assert.equal((bridge.match(/\.\.\.\(startup \? \{ startup \} : \{\}\)/g) ?? []).length, 3, 'only the marked sends carry it');
});

test('a plugin list draws the page again only where it defined something or brought its language', () => {
  assert.match(urd, /const before = definedCount\(\);\s+pluginsIn = loadPluginList\(Urd, state\.engine, msg\.enabled\)\.then\(async \(\) => \{/);
  assert.match(urd, /if \(language \|\| definedCount\(\) !== before\) renderPage\(state\.page, state\.site, root, vp\(\)\);/);
});

test('sameData walks plain data and stops at the first difference', async () => {
  const { sameData } = await engineImport('theme.js');
  assert.equal(sameData({ a: [1, { b: 'x' }] }, { a: [1, { b: 'x' }] }), true);
  assert.equal(sameData({ a: [1, { b: 'x' }] }, { a: [1, { b: 'y' }] }), false);
  assert.equal(sameData({ a: 1 }, { a: 1, b: 2 }), false);
  assert.equal(sameData({ a: 1, c: undefined }, { a: 1, b: undefined }), false);
  assert.equal(sameData([1, 2], { 0: 1, 1: 2 }), false);
  assert.equal(sameData(null, {}), false);
});

test('the editor asks for the sign-in first, and reads the page, the plugins, the collections, the templates and the redirects together', () => {
  const init = editorFile('state/shell.svelte.js').split('async function init()')[1].split('\n}\n')[0];
  const asked = init.indexOf('const signedIn = checkAuth();');
  assert.ok(asked > 0 && asked < init.indexOf('savedState.meetOnLoad()'), 'the sign-in is asked for before anything is read');
  assert.match(init, /await Promise\.all\(\[\s*pageState\.selectPage\([^\n]*\),\s*pluginsState\.initPlugins\(\),\s*collectionsState\.initCollections\(\),\s*templatesState\.initTemplates\(\),\s*redirectsState\.initRedirects\(\),\s*\]\);\s*\/\/[^\n]*\n\s*await historyState\.loadKept\(\);\s*await signedIn;/, 'the kept history is taken up once every store is built');
  assert.doesNotMatch(init, /await checkAuth\(\)/);
  for (const [file, folder] of [['state/collections.svelte.js', 'samlinger'], ['state/templates.svelte.js', 'maler']]) {
    assert.match(editorFile(file), new RegExp(`const files = await Promise\\.all\\(\\w+\\.map\\(\\(id\\) => fetch\\(\`/content/${folder}/\\$\\{id\\}\\.json\`\\)`), `${file}: the files are read together`);
  }
});

test('the saved drafts hold the stores back only where the meeting may let a part here go', () => {
  // A part leaves only where this browser holds it exactly as it last saw it saved, which meetOnLoad checks before the index is read.
  const hashes = ['a', 'b', null];
  for (const here of hashes) for (const was of hashes) for (const kept of [true, false]) {
    const met = meet({ local: { p: here }, saved: kept ? { p: { hash: 'c' } } : {}, seen: was ? { p: was } : {} });
    if (met.dropLocal.includes('p')) assert.equal(here, was, `dropped with here=${here} seen=${was}`);
  }
  assert.deepEqual(meet({ local: { p: 'a' }, saved: {}, seen: { p: 'a' } }).dropLocal, ['p']);
  const saved = editorFile('state/saved.svelte.js');
  assert.match(saved, /const mayLeave = Object\.keys\(seen\)\.some\(\(name\) => hashOf\(name, byPart\) === seen\[name\]\);\s*const meeting = meetSaved\(mayLeave\);\s*loadMeeting = meeting;\s*return mayLeave \? meeting : null;/);
  assert.match(saved, /function watchSaves\(\) \{\s*loadMeeting\.then\(noticeNew\);/, 'the first notice of new saves waits for the index');
  assert.match(saved, /async function discardSaved\(\) \{\s*await loadMeeting;/, 'a discard reads the index the meeting read');
  const publish = editorFile('state/publish.svelte.js');
  assert.match(publish, /async function publishOnce\(\{ parts = null \} = \{\}\) \{\s*\/\/[^\n]*\n\s*shellState\.setStatus\(ta\('status\.publishing'\)\);\s*\/\/[^\n]*\n\s*await shellState\.renewIfDue\(\);\s*await savedState\.loadMeeting;/, 'and so does a publish, for the saved copies it makes stale, saying it has begun, once a sign-in due for renewal is renewed');
  assert.match(publish, /async function publish\(opts\) \{\s*if \(publishing\) return;\s*publishing = true;/, 'one publish at a time');
  assert.match(publish, /if \(previewState\.looking \|\| discardAsked\) return false;\s*discardAsked = true;/, 'and one question of «Discard drafts»');
  assert.match(saved, /if \(mayLeave\) \{\s*for \(const name of met\.dropLocal\) \{\s*for \(const key of byPart\.get\(name\) \?\? \[\]\) dropDraft\(key\);/, 'a meeting not waited for lets go of nothing');
});

test('the Legal panel reads the other pages and the beacon once the canvas has opened', () => {
  const preview = editorFile('state/preview.svelte.js');
  assert.match(preview, /async function onReady\(\) \{[\s\S]*?try \{\s*await answerReady\(\);\s*\} finally \{\s*canvasOpened = true;/, 'set as the first handshake is answered, however the answer ends');
  assert.match(preview, /if \(!canvasOpened\) setTimeout\(\(\) => \{ canvasOpened = true; \}, CANVAS_WAIT\);/, 'and a while after the frame has loaded where it never reports ready');
  const legal = editorFile('state/legal.svelte.js');
  assert.match(legal, /if \(siteState\.siteDraft && previewState\.canvasOpened\) readBeacon\(\);/);
  assert.match(legal, /if \(!draft \|\| !previewState\.canvasOpened\) return;/);
});

test('one change that moves the site and the page draws the page once: the site carries the page, and the canvas takes it before it draws', async () => {
  globalThis.location ??= { origin: 'http://localhost' };
  globalThis.window ??= globalThis;
  globalThis.addEventListener ??= () => {};
  globalThis.removeEventListener ??= () => {};
  const { createPreviewBridge } = await import('../editor/src/lib/previewBridge.js');
  const sent = [];
  const bridge = createPreviewBridge({ contentWindow: { postMessage: (msg) => sent.push(msg) } });
  bridge.sendSite({ v: 1 }, { page: { meta: { id: 'hjem' }, sections: [] } });
  bridge.sendSite({ v: 2 });
  bridge.sendLook('hjem', { meta: { id: 'hjem' }, sections: [1] }, { v: 3 });
  bridge.sendLook('hjem', { meta: { id: 'hjem' }, sections: [2] });
  bridge.destroy();
  assert.deepEqual(sent, [
    { type: 'urd-site', site: { v: 1 }, page: { meta: { id: 'hjem' }, sections: [] } },
    { type: 'urd-site', site: { v: 2 } },
    { type: 'urd-site', site: { v: 3 }, page: { meta: { id: 'hjem' }, sections: [1] } },
    { type: 'urd-preview-full', pageId: 'hjem', page: { meta: { id: 'hjem' }, sections: [2] } },
  ], 'a look with its own site settings is one message too');
  // The canvas takes the page sent with the site before the one drawing, and never takes such a message as colours alone or as the handshake's repeat.
  const handler = urd.slice(urd.indexOf("} else if (msg?.type === 'urd-site' && msg.site) {"));
  assert.match(handler, /if \(msg\.page\) \{\s*state\.page = msg\.page;\s*if \(!Array\.isArray\(state\.page\.sections\)\) state\.page\.sections = \[\];\s*\}/);
  assert.ok(handler.indexOf('state.page = msg.page;') < handler.indexOf('renderPage(state.page, state.site, root, vp());'));
  assert.match(urd, /msg\?\.type === 'urd-site' && msg\.site && !msg\.page && onlyColoursChanged/);
  // The editor sends what changed, both together where one change moved both.
  const history = editorFile('state/history.svelte.js');
  const restore = history.slice(history.indexOf('function restore(snap)'), history.indexOf('function restoreCollections'));
  assert.match(restore, /const siteChanged = !sameJSON\(siteSnap, \$state\.snapshot\(siteState\.siteDraft\)\);\s*siteState\.siteStore\.replace\(siteSnap\);/, 'the site as it stood before the step is put back');
  assert.match(restore, /const pageChanged = !sameJSON\(page, pageState\.store\.data\);\s*pageState\.store\.replace\(page\);/);
  assert.match(restore, /\} else if \(siteChanged\) \{\s*siteState\.pushSiteToPreview\(\{ page: pageChanged \}\);\s*\} else if \(pageChanged\) \{\s*previewState\.bridge\?\.sendPage\(pageState\.pageId, pageState\.store\.data\);\s*\}/);
  assert.equal((restore.match(/pushSiteToPreview\(\)/g) ?? []).length, 2, 'a step that leaves the page sends the site alone, the canvas reloading for the other page');
  const site = editorFile('state/site.svelte.js');
  assert.match(site, /const open = siteWithPage \? pageState\.store\?\.data \?\? null : null;\s*siteWithPage = false;\s*previewState\.bridge\?\.sendSite\(\$state\.snapshot\(siteDraft\), \{ \.\.\.options, page: open \}\);/);
  const rename = site.slice(site.indexOf('function renamePage('), site.indexOf('/** Hide from search engines'));
  assert.match(rename, /pushSiteToPreview\(\{ soon: true, page: true \}\);/, 'a page renamed goes with the site\'s own send');
  assert.doesNotMatch(rename, /sendPage/);
  assert.match(editorFile('state/preview.svelte.js'), /bridge\?\.setLooking\(false\);\s*siteState\.pushSiteToPreview\(\{ page: true \}\);/, 'the end of a look');
  assert.match(editorFile('state/publish.svelte.js'), /\} else \{\s*siteState\.pushSiteToPreview\(\{ page: true \}\);\s*\}/, 'a discard');
});
