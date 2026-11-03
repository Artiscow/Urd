/**
 * The rules of the undo history (editor/src/lib/history-model.js): which change joins the step before it, and the steps that changed nothing.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
const { joinsLast, emptyTail, stepKind, walkSteps, stepTyped, stepPage, keptHolds, MERGE_MS, HISTORY_LIMIT } = await import('../editor/src/lib/history-model.js');
import { engineImport } from './_engine.mjs';
const dict = (await engineImport('locales/admin/en-GB.js')).default.strings;
const { ICONS } = await import('../editor/src/lib/icons.js');

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
  assert.equal(stepKind('nav').labelKey, 'history.step.nav');
  assert.equal(stepKind('edit:nav-style-padY').labelKey, 'history.step.nav');
  assert.equal(stepKind('theme').onPage, false);
  assert.equal(stepKind('edit:site-title').labelKey, 'history.step.site');
  assert.equal(stepKind('page-meta:kaker:searchTitle').labelKey, 'history.step.pageSettings');
  assert.equal(stepKind('move-block').labelKey, 'history.step.moveBlock');
  assert.equal(stepKind('edit:multi-arrow').labelKey, 'history.step.moveBlock');
  assert.equal(stepKind('duplicate-section').labelKey, 'history.step.duplicateSection');
  assert.equal(stepKind('faq-item').labelKey, 'history.step.addBlock');
});

test('stepKind: every words key is in the admin base and every icon is drawn', () => {
  const keys = ['edit:x', 'nav', 'footer', 'theme', 'site', 'pages', 'collections', 'templates', 'plugins', 'discard', 'page-meta:a:b', 'add-section', 'delete-section', 'move-section', 'duplicate-section', 'layout', 'add-block', 'delete-block', 'move-block', 'mobile-reset'];
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

