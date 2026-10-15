/**
 * Contract tests for the links block (type id share) and the links model:
 * the lists a block draws, the migration from the share buttons, and the
 * guards every link passes.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { shareBlock } = await engineImport('blocks/share.js');
const { linkEntry, siteLinks, blockLinks, linkIconHtml, leavesSite, liftFooterSocial } = await engineImport('links-model.js');

const FILE = { site: { links: [{ id: 's1', icon: 'facebook', url: 'https://f.com' }, { id: 's2', icon: 'instagram', url: 'https://i.com' }] } };

test('linkEntry: an icon or an image, a safe address, and a name that falls back to the brand, then the address', () => {
  assert.deepEqual(linkEntry({ id: 'a', icon: 'instagram', url: ' https://i.com/x ' }), { id: 'a', icon: 'instagram', image: '', label: 'Instagram', url: 'https://i.com/x' });
  assert.deepEqual(linkEntry({ image: '/media/m.svg', url: 'https://z.no' }).label, 'https://z.no');
  assert.equal(linkEntry({ icon: 'instagram', url: 'javascript:1' }), null);
  assert.equal(linkEntry({ icon: 'home', url: '/kontakt#top' })?.url, '/kontakt#top', 'a page of the site');
  assert.equal(linkEntry({ icon: 'no-such-icon', url: 'https://z.no' }), null);
  assert.equal(linkEntry({ icon: 'instagram', image: 'javascript:1', url: 'https://z.no' }).image, '', 'an unsafe image is dropped, the icon stays');
  assert.equal(linkEntry(null), null);
});

test('blockLinks: the site\'s links first, the block\'s own after them, and the site\'s left out only on request', () => {
  const own = [{ id: 'o1', icon: 'github', label: 'Koden', url: 'https://g.com' }, { id: 'o2', icon: 'x', url: 'ftp://x' }];
  assert.deepEqual(blockLinks({ links: own }, FILE).map((l) => l.id), ['s1', 's2', 'o1']);
  assert.deepEqual(blockLinks({ useSite: true, links: own }, FILE).map((l) => l.id), ['s1', 's2', 'o1']);
  assert.deepEqual(blockLinks({ useSite: false, links: own }, FILE).map((l) => l.id), ['o1']);
  assert.deepEqual(blockLinks({ hidden: ['s1'], links: own }, FILE).map((l) => l.id), ['s2', 'o1'], 'a site link left out by id');
  assert.deepEqual(blockLinks({ hidden: ['s1', 'nope'] }, FILE).map((l) => l.id), ['s2']);
  assert.deepEqual(blockLinks({}, FILE).map((l) => l.id), ['s1', 's2']);
  assert.deepEqual(blockLinks({}, {}), []);
  assert.equal(siteLinks({}).length, 0);
});

test('the block\'s migration 1 -> 2 drops the share services and keeps what the block showed', () => {
  assert.equal(shareBlock.version, 2);
  assert.deepEqual(shareBlock.defaults(), { useSite: true, hidden: [], links: [], variant: 'icons', size: 38, color: '' });
  const lift = shareBlock.migrations[1];
  assert.deepEqual(lift({ services: ['facebook', 'copy'], variant: 'labels', size: 40, color: 'accent' }), { useSite: true, links: [], variant: 'labels', size: 40, color: 'accent' });
  assert.deepEqual(lift({ mode: 'links', source: 'own', links: [{ id: 'a', icon: 'x', url: 'https://x.com' }], variant: 'icons', size: 38, color: '' }), { useSite: false, links: [{ id: 'a', icon: 'x', url: 'https://x.com' }], variant: 'icons', size: 38, color: '' });
  assert.deepEqual(lift({ mode: 'links', source: 'site', variant: 'icons', size: 38, color: '' }).useSite, true);
});

test('linkIconHtml and leavesSite: a drawn SVG or a quoted image, and only http(s) leaves the site', () => {
  assert.match(linkIconHtml({ icon: 'facebook', image: '' }), /^<svg/);
  assert.equal(linkIconHtml({ icon: '', image: '/media/a"b.svg' }), '<img src="/media/a&quot;b.svg" alt="" loading="lazy">');
  assert.equal(leavesSite('https://x.no'), true);
  assert.equal(leavesSite('mailto:a@b.no'), false);
  assert.equal(leavesSite('/kontakt'), false);
});

test('liftFooterSocial: pure, and a file without the footer list is returned as it is', () => {
  const file = { schemaVersion: 4, site: {}, footer: { social: [{ icon: 'youtube', url: 'https://y.com' }] } };
  const lifted = liftFooterSocial(file);
  assert.deepEqual(lifted.site.links, [{ id: 'link-1', icon: 'youtube', label: 'YouTube', url: 'https://y.com' }]);
  assert.deepEqual(file.footer.social.length, 1, 'the original is untouched');
  const plain = { schemaVersion: 4, site: {}, footer: {} };
  assert.equal(liftFooterSocial(plain), plain);
});
