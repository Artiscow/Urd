/**
 * The rules of the undo history (editor/src/lib/history-model.js): which change joins the step before it, and the steps that changed nothing.
 * And two of state/history.svelte.js, read from its source: an undo puts back the parts shared by every page before it turns to the page of its step, and a step holds the collections and the templates only once their stores are filled.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import './_svelte-loader.mjs';

const { joinsLast, emptyTail, stepKind, walkSteps, stepTyped, stepPage, keptHolds, MERGE_MS, FOLLOW_MS, HISTORY_LIMIT, ownStepKey } = await import('../editor/src/lib/history-model.js');
import { engineImport } from './_engine.mjs';
const dict = (await engineImport('locales/admin/en-GB.js')).default.strings;
const { ICONS } = await import('../editor/src/lib/icons.js');
const editorFile = (path) => readFileSync(new URL(`../editor/src/${path}`, import.meta.url), 'utf8');

test('joinsLast: a text typed joins at any pause, a slider dragged joins while it moves, a new kind of change never joins', () => {
  assert.equal(joinsLast(null, 'nav', 0), false, 'nothing to join');
  assert.equal(joinsLast({ key: 'edit:blk-1', at: 0 }, 'edit:blk-1', 60_000), true, 'typing after a long pause is the same step');
  assert.equal(joinsLast({ key: 'grid:sec-1', at: 0 }, 'grid:sec-1', 60_000), true);
  assert.equal(joinsLast({ key: 'nav', at: 1000 }, 'nav', 1000 + 16), true, 'a slider tick');
  assert.equal(joinsLast({ key: 'nav', at: 1000 }, 'nav', 1000 + MERGE_MS), false, 'a change after the window is its own step');
  assert.equal(joinsLast({ key: 'nav', at: 1000 }, 'footer', 1001), false, 'another kind of change');
  assert.equal(joinsLast({ key: 'edit:blk-1', at: 0 }, 'edit:blk-2', 1), false, 'another block');
  assert.equal(joinsLast({ key: 'page-meta:kaker:description', at: 1000 }, 'page-meta:kaker:description', 1100), true, 'a page setting in a burst');
  assert.ok(HISTORY_LIMIT >= 50);
});

test('joinsLast: an action is one step each however fast they come', () => {
  for (const key of ['delete-block', 'add-block', 'add-section', 'delete-section', 'move-block', 'pages', 'collections', 'templates', 'faq-item', 'gallery-add', 'discard']) {
    assert.equal(joinsLast({ key, at: 1000 }, key, 1001), false, key);
  }
});

test('emptyTail: the steps at the end that hold the state now, and none when the last step changed something', () => {
  assert.equal(emptyTail([{ snap: 'a' }, { snap: 'b' }], 'c'), 0);
  assert.equal(emptyTail([{ snap: 'a' }, { snap: 'b' }], 'b'), 1);
  assert.equal(emptyTail([{ snap: 'a' }, { snap: 'b' }, { snap: 'b' }], 'b'), 2);
  assert.equal(emptyTail([], 'a'), 0);
});

test('stepKind: each kind of change named in words with an icon, a page change marked as one', () => {
  assert.deepEqual(stepKind('edit:blk-1', { typed: true }), { labelKey: 'history.step.typed', icon: 'text', onPage: true });
  assert.equal(stepKind('edit:blk-1').labelKey, 'history.step.block');
  // The phone's own choices are phone changes: hiding, showing only there, its entrance and its pinning.
  for (const key of ['hide-mobile', 'hide-desktop', 'edit:entrance-mobile-blk-1', 'edit:sticky-phone-blk-1', 'phone-place', 'edit:phone-place-blk-1', 'edit:phone-order:sec-1', 'phone-order', 'phone-follows', 'phone-custom', 'phone-unpin', 'edit:phone-step-blk-1', 'edit:phone-cells-blk-1', 'phone-layout', 'mobile-order']) assert.equal(stepKind(key).labelKey, 'history.step.phone', key);
  assert.equal(stepKind('nav').labelKey, 'history.step.nav');
  assert.equal(stepKind('edit:nav-style-padY').labelKey, 'history.step.nav');
  assert.equal(stepKind('theme').onPage, false);
  for (const key of ['theme-colour-set-add', 'theme-colour-set-colour', 'theme-colour-set-delete', 'edit:theme-colour-set-name:set-1a2b3c4d']) assert.deepEqual(stepKind(key), { labelKey: 'history.step.theme', icon: 'panel_theme', onPage: false }, `${key}: the site's colour sets are the theme's`);
  for (const key of ['theme-colour-set-add', 'theme-colour-set-colour', 'theme-colour-set-delete']) assert.equal(joinsLast({ key, at: 0 }, key, 1), false, `${key}: each change a step of its own`);
  assert.equal(stepKind('edit:site-title').labelKey, 'history.step.site');
  assert.deepEqual(stepKind('legal'), { labelKey: 'history.step.legal', icon: 'panel_legal', onPage: false });
  assert.equal(stepKind('edit:legal-contact-email').labelKey, 'history.step.legal');
  // The phone view's keys: a burst in the phone order is a phone step, as the buttons' are, and a placed block's moves a move, as its drag is.
  assert.equal(stepKind('edit:mobile-order-blk-1').labelKey, stepKind('mobile-order').labelKey);
  assert.equal(stepKind('edit:nudge-mobile-blk-1').labelKey, stepKind('move-block').labelKey);
  // A section's own settings are a section change, and the Site panel's group resets a site change.
  assert.equal(stepKind('edit:section-mobile-gap:sec-1').labelKey, 'history.step.section');
  assert.equal(stepKind('section-phone-room').labelKey, 'history.step.section', 'a seam drag on the phone is the section\'s step');
  assert.equal(stepKind('site-width').labelKey, 'history.step.site');
  assert.equal(stepKind('site-width:mobileGap:own-step-3').onPage, false);
  assert.equal(stepKind('page-meta:kaker:searchTitle').labelKey, 'history.step.pageSettings');
  assert.equal(stepKind('move-block').labelKey, 'history.step.moveBlock');
  assert.equal(stepKind('edit:multi-arrow').labelKey, 'history.step.moveBlock');
  assert.equal(stepKind('duplicate-section').labelKey, 'history.step.duplicateSection');
  assert.equal(stepKind('faq-item').labelKey, 'history.step.addBlock');
});

test('stepKind: every words key is in the admin base and every icon is drawn', () => {
  const keys = ['edit:x', 'nav', 'footer', 'theme', 'site', 'pages', 'collections', 'templates', 'plugins', 'redirects', 'discard', 'page-meta:a:b', 'add-section', 'delete-section', 'move-section', 'duplicate-section', 'layout', 'add-block', 'delete-block', 'move-block', 'mobile-reset'];
  for (const key of [...keys.map((k) => stepKind(k)), stepKind('edit:x', { typed: true })]) {
    assert.ok(dict[key.labelKey], `${key.labelKey} in en-GB`);
    assert.ok(ICONS[key.icon], `${key.icon} drawn`);
  }
});

/* A state as the history's snapshot shapes it: the open page, the site, and the drafts of other pages a step wrote. */
const state = (site, others) => JSON.stringify({ pageId: 'hjem', page: { n: 0 }, site, ...(others ? { others } : {}) });

test('walkSteps: a jump back past several steps puts back every page beside the open one that any of them wrote', () => {
  // Oldest first: a theme change, Kaker renamed (its draft held), the nav changed. The history is popped newest first.
  const steps = [
    { snap: state('s2'), view: { pageId: 'hjem', blockId: 'b3' }, pages: [], key: 'nav', at: 3 },
    { snap: state('s1', { kaker: null }), view: { pageId: 'hjem', blockId: 'b2' }, pages: ['kaker'], key: 'pages', at: 2 },
    { snap: state('s0'), view: { pageId: 'hjem', blockId: 'b1' }, pages: [], key: 'theme', at: 1 },
  ];
  const stored = { kaker: { meta: { title: 'Kaker og brød' } } };
  const walk = walkSteps(steps, { state: state('s3'), view: { pageId: 'hjem', blockId: 'now' } }, (id) => stored[id] ?? null);
  const end = JSON.parse(walk.state);
  assert.equal(end.site, 's0', 'the state before the oldest step');
  assert.deepEqual(end.others, { kaker: null }, 'Kaker back without its draft, though the oldest step did not write it');
  assert.deepEqual(walk.view, { pageId: 'hjem', blockId: 'b1' }, 'the oldest passed step\'s selection');
  // The entries for the redo stack: each the state on the near side of its step, with the view the walk stood at.
  assert.deepEqual(walk.passed.map((e) => JSON.parse(e.snap).site), ['s3', 's2', 's1']);
  assert.deepEqual(JSON.parse(walk.passed[1].snap).others, { kaker: { meta: { title: 'Kaker og brød' } } }, 'the redo of the rename holds Kaker\'s draft as it stood after it');
  assert.equal(walk.passed[0].view.blockId, 'now');
  assert.equal(walk.passed[1].view.blockId, 'b3');
  assert.equal(walk.passed[0].snap, state('s3'), 'a step that wrote no other page: the state as it is, in the snapshot\'s shape');
});

test('walkSteps: a page two passed steps wrote ends with its draft from the farthest of them', () => {
  const steps = [
    { snap: state('s1', { kaker: { v: 1 } }), view: null, pages: ['kaker'], key: 'pages', at: 2 },
    { snap: state('s0', { kaker: { v: 0 } }), view: null, pages: ['kaker'], key: 'pages', at: 1 },
  ];
  const walk = walkSteps(steps, { state: state('s2'), view: null }, () => ({ v: 2 }));
  assert.deepEqual(JSON.parse(walk.state).others, { kaker: { v: 0 } });
  assert.deepEqual(walk.passed.map((e) => JSON.parse(e.snap).others.kaker.v), [2, 1]);
});

test('stepTyped and stepPage: a step\'s own marks, else its view\'s', () => {
  assert.equal(stepTyped({ typed: false, view: { caret: { offset: 1 } } }), false, 'the mark wins');
  assert.equal(stepTyped({ view: { caret: { offset: 1 } } }), true, 'an older kept step');
  assert.equal(stepPage({ pageId: 'kaker', view: { pageId: 'hjem' } }), 'kaker');
  assert.equal(stepPage({ view: { pageId: 'hjem' } }), 'hjem');
  assert.equal(stepPage({}), null);
});

test('keptHolds: the kept steps are taken up while the drafts are the ones the mark was taken of, on whichever page the session opens', () => {
  const kept = { history: [{ made: 1 }, { made: 2 }], redoStack: [{ made: 3 }] };
  const mark = { steps: 2, top: 2, redo: 1, redoTop: 3, pageId: 'kontakt', page: 'p1', rest: 'r1', draft: 'd1' };
  const drafts = { kontakt: 'd1' };
  const now = (over = {}) => ({ pageId: 'kontakt', page: 'p1', rest: 'r1', draftOf: (id) => drafts[id] ?? 'none', ...over });
  assert.equal(keptHolds(mark, kept, now()), true, 'the same page and state');
  assert.equal(keptHolds(mark, kept, now({ pageId: 'hjem', page: 'other' })), true, 'another page opened: the one it ended on is compared by its stored draft');
  assert.equal(keptHolds(mark, kept, now({ pageId: 'hjem', page: 'other', draftOf: () => 'changed' })), false, 'that page\'s draft changed since');
  assert.equal(keptHolds(mark, kept, now({ page: 'p2' })), false, 'the open page changed');
  assert.equal(keptHolds(mark, kept, now({ rest: 'r2' })), false, 'the site, a collection or a template changed (discarded in another tab, say)');
  assert.equal(keptHolds({ ...mark, steps: 3, top: 4 }, kept, now()), false, 'a step made after the last write is missing from the kept steps');
  assert.equal(keptHolds({ ...mark, redoTop: 9 }, kept, now()), false);
  assert.equal(keptHolds(null, kept, now()), false, 'no mark');
});

test('a setting\'s way back is a step of its own: it joins neither the change before it nor the change after it, and is named as that change', () => {
  const key = 'edit:blk-1:fit';
  const own = ownStepKey(key, 1);
  assert.equal(joinsLast({ key, at: 0 }, key, 10), true, 'the same edit joins at any pause');
  assert.equal(joinsLast({ key, at: 0 }, own, 10), false, 'the way back right after the change is a step of its own');
  assert.equal(joinsLast({ key: own, at: 0 }, key, 10), false, 'the next change does not join the way back');
  assert.equal(joinsLast({ key: own, at: 0 }, ownStepKey(key, 2), 10), false, 'two ways back are two steps');
  assert.deepEqual(stepKind(own), stepKind(key));
  assert.deepEqual(stepKind(ownStepKey('edit:theme-accent', 3)), stepKind('edit:theme-accent'));
  assert.equal(joinsLast({ key: ownStepKey('sticky', 4), at: 0 }, ownStepKey('sticky', 4), MERGE_MS * 10), true, 'the changes of one step of its own join it, whatever their key began as and however long they take');
});

test('a change that follows another as part of it joins its step shortly after, and only that one', () => {
  const last = { key: 'phone-layout', at: 1000 };
  assert.equal(joinsLast(last, 'phone-layout:then', 1000 + FOLLOW_MS - 1), true, 'a preset\'s heights join the preset');
  assert.equal(joinsLast(last, 'phone-layout:then', 1000 + FOLLOW_MS + 1), false, 'too late, a step of its own');
  assert.equal(joinsLast({ key: 'phone-order', at: 1000 }, 'phone-layout:then', 1001), false, 'it follows its own change only');
  assert.equal(joinsLast(last, 'phone-layout', 1001), false, 'a second preset is a step of its own');
  assert.equal(stepKind('phone-layout:then').labelKey, stepKind('phone-layout').labelKey);
});

test('an undo puts back the collections, the templates, the plugins and the redirects before it turns to the page its step was made on', () => {
  const restore = editorFile('state/history.svelte.js').split('function restore(snap) {')[1].split('\n}\n')[0];
  assert.match(restore, /const \{ pageId: snapPageId, page, site: siteSnap, collectionsIndex, collections, templatesIndex, templates, plugins, redirects, others \} = media\.parse\(snap\);/);
  const branch = restore.indexOf('if (snapPageId && snapPageId !== pageState.pageId');
  assert.ok(branch > 0, 'the step of another page takes its own way');
  assert.match(restore.slice(branch), /^if \(snapPageId[^\n]*\{[\s\S]*?pageState\.selectPage\(snapPageId, \{ keepHistory: true \}\);[\s\S]*?return;/, 'and leaves there');
  const before = restore.slice(0, branch);
  assert.doesNotMatch(before, /\breturn\b/);
  // Each a statement of the function itself, so it runs whatever page the step was made on.
  for (const call of ['restoreCollections(collectionsIndex, collections ?? {});', 'restoreTemplates(templatesIndex, templates ?? {});', 'restorePlugins(plugins);', 'redirectsState.restoreRedirects(redirects);']) {
    assert.ok(before.includes(`\n  ${call}\n`), call);
  }
});

test('a step holds the collections and the templates only once all their stores are filled, and an undo leaves them alone where it holds none', () => {
  const history = editorFile('state/history.svelte.js');
  const state = history.split('function stateObject() {')[1].split('\n}\n')[0];
  assert.match(state, /collectionsIndex: collectionsState\.collectionsReady \? collectionsState\.collectionsIndexStore\.data : null,/);
  assert.match(state, /collections: collectionsState\.collectionsReady\s*\?[^:]*\s*: \{\},/);
  assert.match(state, /templatesIndex: templatesState\.templatesReady \? templatesState\.templatesIndexStore\.data : null,/);
  assert.match(state, /templates: templatesState\.templatesReady\s*\?[^:]*\s*: \{\},/);
  assert.match(history, /function restoreCollections\(indexSnap, collectionsSnap\) \{\s*if \(!collectionsState\.collectionsIndexStore \|\| !indexSnap\) return;/);
  assert.match(history, /function restoreTemplates\(indexSnap, templatesSnap\) \{\s*if \(!templatesState\.templatesIndexStore \|\| !indexSnap\) return;/);
  // Ready once the loop that fills every store has ended, and in no other place.
  for (const [file, flag, ids] of [['state/collections.svelte.js', 'collectionsReady', 'collectionIds'], ['state/templates.svelte.js', 'templatesReady', 'templateIds']]) {
    const source = editorFile(file);
    assert.match(source, new RegExp(`^let ${flag} = false;$`, 'm'), file);
    assert.match(source, new RegExp(`\\n  for \\(const \\[i, id\\] of ${ids}\\.entries\\(\\)\\) \\{\\n[\\s\\S]*?\\n  \\}\\n  ${flag} = true;\\n`), `${file}: after the stores are filled`);
    assert.equal(source.match(new RegExp(`\\b${flag} = true`, 'g')).length, 1, `${file}: set in one place`);
  }
  const sources = readdirSync(new URL('../editor/src/', import.meta.url), { recursive: true }).filter((name) => /\.(js|svelte)$/.test(name));
  for (const name of sources) {
    assert.doesNotMatch(editorFile(name), /State\.(collectionsReady|templatesReady) = /, `${name}: the flags are the stores' own`);
  }
});
