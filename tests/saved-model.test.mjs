/**
 * The saved drafts as the editor sees them (editor/src/lib/saved-model.js, ADR-0032): the part each stored key belongs to, held equal to the drafts function's rule, the meeting on load that takes nothing in by itself, where each part this browser holds stands, the Saved menu's rows, and the two counts held to the bands.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { partOfKey, keysByPart, partName, partOfName, partCanon, meet, standing, counts, savedList, overwrites, publishedSaves } from '../editor/src/lib/saved-model.js';
import { keyOfPart, isPartName } from '../template/functions/_lib/drafts.js';

const KEYS = ['urd-draft-site', 'urd-draft-hjem', 'urd-draft-om-oss', 'urd-draft-sitemap', 'urd-draft-plugins', 'urd-draft-redirects',
  'urd-draft-collections:index', 'urd-draft-collections:legacy-deleted', 'urd-draft-collection-nyheter', 'urd-draft-templates', 'urd-draft-template-a1B2',
  'urd-draft-media-moves', 'urd-draft-maler', 'urd-draft-mal-x', 'urd-draft-samling-x', 'urd-draft-samlinger', 'urd-draft-collections', 'urd-published-at'];

test('each stored key belongs to the part the drafts function lets hold it, and the tidy\'s moves and the old names to none', () => {
  for (const key of KEYS) {
    const name = partOfKey(key);
    if (name === null) continue;
    assert.ok(isPartName(name), `${key} → ${name}`);
    assert.ok(keyOfPart(name, key), `the function lets ${name} hold ${key}`);
  }
  assert.equal(partOfKey('urd-draft-media-moves'), null);
  assert.equal(partOfKey('urd-draft-maler'), null);
  assert.equal(partOfKey('urd-draft-mal-x'), null);
  assert.equal(partOfKey('urd-draft-samling-x'), null);
  assert.equal(partOfKey('urd-draft-collections'), null);
  assert.equal(partOfKey('urd-published-at'), null);
  assert.equal(partOfKey('urd-draft-sitemap'), 'page-sitemap');
  const byPart = keysByPart(KEYS);
  assert.deepEqual(byPart.get('templates'), ['urd-draft-template-a1B2', 'urd-draft-templates']);
  assert.deepEqual(byPart.get('collections'), ['urd-draft-collections:index']);
  assert.equal(partOfKey('urd-draft-collections:legacy-deleted'), null, 'the mark of a deleted legacy index stays this browser\'s');
});

test('a waiting part and its name go both ways', () => {
  for (const part of [{ kind: 'page', id: 'hjem' }, { kind: 'collection', id: 'nyheter' }, { kind: 'site' }, { kind: 'collections' }, { kind: 'templates' }, { kind: 'plugins' }, { kind: 'redirects' }]) {
    assert.deepEqual(partOfName(partName(part)), part);
  }
  assert.equal(partCanon({ b: '2', a: '1' }), partCanon({ a: '1', b: '2' }));
});

test('meeting on load takes nothing in: a part held here as saved counts as seen, any other keeps what this browser last saw', () => {
  const met = meet({
    local: { site: null, 'page-hjem': 'H1', 'page-om-oss': 'O1', plugins: 'P9' },
    saved: { site: { hash: 'S2' }, 'page-hjem': { hash: 'H2' }, 'page-om-oss': { hash: 'O1' }, plugins: { hash: 'P1' } },
    seen: { 'page-hjem': 'H1', plugins: 'P1' },
  });
  assert.equal('takeIn' in met, false, 'nothing comes in by itself');
  assert.deepEqual(met.seen, { 'page-hjem': 'H1', 'page-om-oss': 'O1', plugins: 'P1' }, 'the site, never seen, stays unseen; Om oss is held as saved');
});

test('meeting on load: a part published or discarded elsewhere leaves this browser where it stands here as it was seen', () => {
  const met = meet({
    local: { 'page-kaker': 'K1', 'page-om-oss': 'O2' },
    saved: {},
    seen: { 'page-kaker': 'K1', 'page-om-oss': 'O1' },
  });
  assert.deepEqual(met.dropLocal, ['page-kaker'], 'Kaker left the index and stands here as it was seen');
  assert.deepEqual(met.seen, {});
});

test('where each part this browser holds stands, a part saved elsewhere set apart; a saved part not held here stands in no band', () => {
  const hashes = { site: 'S1', 'page-hjem': 'H9', 'page-kaker': 'K1' };
  const rows = standing({
    parts: [{ kind: 'page', id: 'hjem', name: 'Hjem' }, { kind: 'site' }, { kind: 'page', id: 'kaker', name: 'Kaker' }],
    localHash: (name) => hashes[name] ?? null,
    saved: { site: { hash: 'S1' }, 'page-hjem': { hash: 'H2', savedAt: 't', saver: 'a' }, 'page-gone': { hash: 'G1', title: 'Gone' } },
    seen: { site: 'S1', 'page-hjem': 'H1' },
  });
  const by = Object.fromEntries(rows.map((r) => [r.part, r]));
  assert.equal(by.site.band, 'saved');
  assert.equal(by['page-hjem'].band, 'browser');
  assert.deepEqual(by['page-hjem'].elsewhere, { savedAt: 't', saver: 'a' }, 'saved since this browser saw H1');
  assert.equal(by['page-kaker'].elsewhere, null);
  assert.equal(by['page-gone'], undefined, 'a saved part not held here is the Saved menu\'s alone, so Publish never sends it');
  assert.deepEqual(counts(rows), { save: 2, publish: 3 });
});

test('the Saved menu\'s rows: newest first, held as saved, held with changes, or not held, and new only where unseen and not yet shown', () => {
  const list = savedList({
    saved: {
      'page-hjem': { hash: 'H1', savedAt: '2026-11-11T10:00:00Z', saver: 'a', title: 'Hjem' },
      'page-om-oss': { hash: 'O2', savedAt: '2026-11-11T12:00:00Z', saver: 'b', title: 'Om oss' },
      site: { hash: 'S2', savedAt: '2026-11-11T11:00:00Z', saver: 'b' },
      'page-kaker': { hash: 'K2', savedAt: '2026-11-11T09:00:00Z', saver: 'b', title: 'Kaker' },
    },
    localHash: (name) => ({ 'page-hjem': 'H1', site: 'S1' })[name] ?? null,
    seen: { 'page-hjem': 'H1', 'page-kaker': 'K1' },
    noticed: { 'page-kaker': 'K2' },
  });
  assert.deepEqual(list.map((r) => r.part), ['page-om-oss', 'site', 'page-hjem', 'page-kaker']);
  const by = Object.fromEntries(list.map((r) => [r.part, r]));
  assert.deepEqual([by['page-hjem'].here, by['page-hjem'].fresh], ['same', false]);
  assert.deepEqual([by.site.here, by.site.fresh], ['mine', true], 'saved elsewhere, this browser holds its own');
  assert.deepEqual([by['page-om-oss'].here, by['page-om-oss'].fresh, by['page-om-oss'].name], ['none', true, 'Om oss']);
  assert.deepEqual([by['page-kaker'].here, by['page-kaker'].fresh], ['none', false], 'shown in the menu already');
});

test('the counts never disagree with the bands', () => {
  for (const rows of [
    [],
    [{ band: 'browser', draft: true }, { band: 'saved', draft: true }],
    [{ band: 'browser', draft: false }, { band: 'browser', draft: true }, { band: 'saved', draft: true }, { band: 'saved', draft: true }],
  ]) {
    const { save, publish } = counts(rows);
    assert.equal(save, rows.filter((r) => r.band === 'browser').length);
    assert.equal(publish, rows.filter((r) => r.band === 'saved').length + rows.filter((r) => r.band === 'browser' && r.draft).length);
  }
});

test('a save asks before writing over a part saved elsewhere since; a publish makes stale only the saves it went on from', () => {
  const saved = { site: { hash: 'S2' }, 'page-hjem': { hash: 'H1' } };
  assert.deepEqual(overwrites(['site', 'page-hjem', 'page-new'], saved, { site: 'S1', 'page-hjem': 'H1' }), ['site']);
  const rows = [
    { part: 'site', draft: true, elsewhere: { savedAt: 't' } },
    { part: 'page-hjem', draft: true, elsewhere: null },
    { part: 'page-gone', draft: false, elsewhere: null },
  ];
  assert.deepEqual(publishedSaves(rows, { ...saved, 'page-gone': { hash: 'G' } }), ['page-hjem']);
});
