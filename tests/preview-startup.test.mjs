/**
 * The editor's preview as it opens (urd.js enablePreview): the view, site and page the editor sends as the preview reports ready, marked `startup`, repeat what the preview booted with from the same drafts, and a plugin list that defines nothing draws nothing, so the page is drawn once and its pictures do not flicker.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE_DIR, engineImport } from './_engine.mjs';

const urd = readFileSync(new URL('urd.js', ENGINE_DIR), 'utf8');

test('the view, site and page the editor marks as its ready handshake draw nothing where they change nothing', () => {
  assert.match(urd, /if \(msg\?\.startup === true && \(\(msg\.type === 'urd-viewport' && msg\.mode === state\.viewport\) \|\| \(msg\.type === 'urd-site' && sameData\(msg\.site, state\.site\)\) \|\| \(msg\.type === 'urd-preview-full' && sameData\(msg\.page, state\.page\)\)\)\) return;/);
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
  assert.match(urd, /const before = definedCount\(\);\s+loadPluginList\(Urd, state\.engine, msg\.enabled\)\.then\(async \(\) => \{/);
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
