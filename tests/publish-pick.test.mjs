/**
 * Which parts a publish sends (editor/src/lib/publish-pick.js): the ticked ones and their ties, and the site settings with the pages left behind hidden.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
const { pickParts, outSite, keptNotLive } = await import('../editor/src/lib/publish-pick.js');
const { stillNotLive } = await import('../editor/src/lib/not-live.js');

test('the ticked parts go, the unticked stay', () => {
  const { going, forced, kept } = pickParts({ waiting: ['page-hjem', 'page-om-oss', 'plugins'], later: ['page-om-oss'] });
  assert.deepEqual([...going].sort(), ['page-hjem', 'plugins']);
  assert.deepEqual(kept, ['page-om-oss']);
  assert.equal(forced.size, 0);
});

test('a page not live yet takes the site settings with it, and they take the redirects', () => {
  const { going, forced, kept } = pickParts({ waiting: ['page-kaker', 'site', 'redirects', 'page-hjem'], later: ['site', 'redirects', 'page-hjem'], notLive: { pages: ['kaker'] } });
  assert.deepEqual([...going].sort(), ['page-kaker', 'redirects', 'site']);
  assert.equal(forced.get('site'), 'page-kaker');
  assert.equal(forced.get('redirects'), 'site');
  assert.deepEqual(kept, ['page-hjem']);
});

test('a live page goes alone; a tie only ticks a part that waits', () => {
  assert.deepEqual([...pickParts({ waiting: ['page-hjem', 'site'], later: ['site'] }).going], ['page-hjem']);
  const { going } = pickParts({ waiting: ['page-kaker'], later: [], notLive: { pages: ['kaker'] } });
  assert.deepEqual([...going], ['page-kaker'], 'no site settings waiting, none ticked');
});

test('the redirects take the site settings with them', () => {
  const { going, forced } = pickParts({ waiting: ['site', 'redirects'], later: ['site'] });
  assert.ok(going.has('site'));
  assert.equal(forced.get('site'), 'redirects');
});

test('a collection not live yet takes the collections\' list with it', () => {
  const { going, forced } = pickParts({ waiting: ['collection-kaker', 'collections'], later: ['collections'], notLive: { collections: ['kaker'] } });
  assert.ok(going.has('collections'));
  assert.equal(forced.get('collections'), 'collection-kaker');
});

test('the media tidy\'s moves waiting take everything', () => {
  const { going, forced, kept } = pickParts({ waiting: ['page-hjem', 'site'], later: ['page-hjem'], movesPending: true });
  assert.deepEqual([...going].sort(), ['page-hjem', 'site']);
  assert.equal(forced.get('page-hjem'), 'moves');
  assert.deepEqual(kept, []);
});

test('the site settings go out with the pages left behind hidden, the draft untouched', () => {
  const draft = { pages: [{ id: 'hjem', path: '/' }, { id: 'kaker', path: '/kaker' }] };
  const out = outSite(draft, ['kaker']);
  assert.equal(out.pages[1].hidden, true);
  assert.equal(out.pages[0].hidden, undefined);
  assert.equal(draft.pages[1].hidden, undefined, 'the draft keeps the page shown');
  assert.deepEqual(outSite(draft, []), draft);
});

test('the pages and collections left behind are those not live that no going part names', () => {
  assert.deepEqual(keptNotLive(new Set(['page-kaker']), { pages: ['kaker', 'nytt'], collections: ['oppskrifter'] }), { pages: ['nytt'], collections: ['oppskrifter'] });
});

test('a marked page is still not live while the live site lists it hidden or not yet; one shown there went out with its file elsewhere', () => {
  const live = [{ id: 'hjem', path: '/' }, { id: 'kaker', path: '/kaker', hidden: true }, { id: 'om', path: '/om' }];
  assert.deepEqual([...stillNotLive(new Set(['kaker', 'om', 'nytt']), live)].sort(), ['kaker', 'nytt']);
});
