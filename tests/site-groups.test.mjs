/**
 * A group of the site's settings for the row kit's fold (editor/src/lib/site-groups.js): a field at its default or absent is no value of its own,
 * the group's reset and a setting's reset take the fields away as one undo step each, and a group with nothing of its own has no reset.
 * A fold whose settings stand in several objects merges their groups into one (mergeGroups).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { siteGroup, mergeGroups } from '../editor/src/lib/site-groups.js';

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

test('mergeGroups: a fold whose settings stand in two objects marks, counts and resets them as one group', () => {
  const steps = [];
  const write = (name, change) => { steps.push(name); change(); };
  const nav = { variant: 'floating', style: { padY: 20, gap: 8, size: 'md' } };
  const merged = () => mergeGroups(
    siteGroup(() => nav, write, 'nav-layout', { variant: 'bar', overlay: undefined }),
    siteGroup(() => nav.style, write, 'nav-layout', { size: 'md', padY: undefined, gap: undefined }),
  );
  const g = merged();
  assert.equal(g.own('variant'), true);
  assert.equal(g.own('padY'), true);
  assert.equal(g.own('size'), false, 'a field at its default is no value of its own');
  assert.equal(g.own('overlay'), false);
  assert.equal(g.changed, 3);
  assert.deepEqual(Object.keys(g.defaults).sort(), ['gap', 'overlay', 'padY', 'size', 'variant']);
  g.resetKey('padY');
  assert.deepEqual(nav.style, { gap: 8, size: 'md' }, 'a setting\'s reset goes to the part that holds its key');
  assert.deepEqual(steps, ['nav-layout:padY']);
  merged().reset();
  assert.deepEqual(nav, { style: {} }, 'the reset runs the reset of every part');
  assert.deepEqual(steps, ['nav-layout:padY', 'nav-layout', 'nav-layout']);
  assert.equal(merged().reset, null, 'with nothing of its own in any part, the fold has no reset');
});
