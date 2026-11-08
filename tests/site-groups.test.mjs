/**
 * A group of the site's settings for the row kit's fold (editor/src/lib/site-groups.js): a field at its default or absent is no value of its own,
 * the group's reset and a setting's reset take the fields away as one undo step each, and a group with nothing of its own has no reset.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { siteGroup } from '../editor/src/lib/site-groups.js';

/** A site object and a write that records each step's name and runs its change. */
function fixture(site) {
  const steps = [];
  const write = (name, change) => { steps.push(name); change(); };
  return { site, steps, group: () => siteGroup(() => site, write, 'region', { timeZone: undefined, mapService: 'osm' }) };
}

test('a field absent or at its default is no value of its own, and a group of such fields has no reset', () => {
  const { group } = fixture({ title: 'Urd', mapService: 'osm' });
  const g = group();
  assert.equal(g.own('mapService'), false);
  assert.equal(g.own('timeZone'), false);
  assert.equal(g.own('title'), false, 'a field outside the group is never its own');
  assert.equal(g.changed, 0);
  assert.equal(g.reset, null);
});

test('the group\'s reset takes every field away in one step, a setting\'s reset only its own', () => {
  const f = fixture({ title: 'Urd', timeZone: 'Europe/Oslo', mapService: 'google' });
  assert.equal(f.group().changed, 2);
  f.group().resetKey('mapService');
  assert.deepEqual(f.site, { title: 'Urd', timeZone: 'Europe/Oslo' });
  assert.deepEqual(f.steps, ['region:mapService']);
  f.group().reset();
  assert.deepEqual(f.site, { title: 'Urd' });
  assert.deepEqual(f.steps, ['region:mapService', 'region']);
});

test('a group whose object is not there yet reads as all defaults, and its reset touches nothing', () => {
  const steps = [];
  const g = siteGroup(() => undefined, (name, change) => { steps.push(name); change(); }, 'shop', { shop: undefined });
  assert.equal(g.own('shop'), false);
  assert.equal(g.reset, null);
  g.resetKey('shop');
  assert.deepEqual(steps, ['shop:shop']);
});
