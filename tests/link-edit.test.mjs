/**
 * Link editing in the editor (editor/src/lib/link-edit.js): a stored link read into the link editor and written back in the host's shape, the typed addresses it takes, the words a link field shows, and a link written over a host.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
const { setLinkOn, linkOf, hasLink, readLink, writeLink, linkReady, linkSummary, linkText, webHref, emailHref, emailLike } = await import('../editor/src/lib/link-edit.js');

// Deliberately Norwegian page titles and slugs: user data stays Norwegian (ADR-0021).
const PAGES = [
  { id: 'hjem', title: 'Hjem', path: '/' },
  { id: 'kaker', title: 'Kaker', path: '/kaker' },
  { id: 'om-oss', title: 'Om oss', path: '/om-oss' },
];

test('setLinkOn and linkOf: the link fields of a host', () => {
  const button = { label: 'Les mer', page: null, href: null, style: 'primary' };
  setLinkOn(button, { page: 'kaker', target: 'sec-1', newTab: true });
  assert.deepEqual(button, { label: 'Les mer', style: 'primary', page: 'kaker', target: 'sec-1', newTab: true });
  setLinkOn(button, null);
  assert.deepEqual(button, { label: 'Les mer', style: 'primary' });
  const image = { src: '/media/a.webp', href: null };
  setLinkOn(image, null);
  assert.deepEqual(image, { src: '/media/a.webp', href: null }, 'a host that keeps null for no address gets it back');
  assert.deepEqual(linkOf({ label: 'x', page: 'kaker', target: '', href: null, newTab: true }), { page: 'kaker', newTab: true });
  assert.deepEqual(linkOf(null), {});
});

test('readLink: every stored shape opens as the kind it is, an old path with its page and spot', () => {
  const read = (value, here = 'kaker') => readLink(value, { pages: PAGES, here });
  assert.deepEqual(read({ page: 'kaker', target: 'sec-1', newTab: true }), { kind: 'page', page: 'kaker', target: 'sec-1', url: '', email: '', subject: '', phone: '', newTab: true, rel: [] });
  assert.equal(read({ target: 'blk-1' }).page, 'kaker', 'a spot without a page is on the page the link stands on');
  assert.deepEqual([read('/kaker#sec-4c908354').page, read('/kaker#sec-4c908354').target], ['kaker', 'sec-4c908354']);
  assert.deepEqual([read('/om-oss/#kontakt').page, read('/om-oss/#kontakt').target], ['om-oss', 'kontakt'], 'a trailing slash and a name');
  assert.deepEqual([read('#priser').page, read('#priser').target], ['kaker', 'priser']);
  assert.equal(read('/').page, 'hjem');
  assert.deepEqual([read('mailto:post@apeiron.no?subject=Hei%20der').kind, read('mailto:post@apeiron.no?subject=Hei%20der').email, read('mailto:post@apeiron.no?subject=Hei%20der').subject], ['email', 'post@apeiron.no', 'Hei der']);
  assert.deepEqual([read('tel:+4790000000').kind, read('tel:+4790000000').phone], ['phone', '+4790000000']);
  assert.deepEqual([read({ href: 'https://x.no', rel: ['sponsored', 'ugc'] }).kind, read({ href: 'https://x.no', rel: ['sponsored', 'ugc'] }).rel], ['web', ['sponsored']]);
  assert.equal(read('/media/plan.pdf').kind, 'web', 'a path that is no page stays an address');
  assert.deepEqual([read(null).kind, read(null).page], ['page', '']);
  assert.deepEqual([read({ href: '#' }).kind, read({ href: '#' }).page], ['page', ''], 'the seed «#» is no link');
});

test('writeLink: the link in the host\'s shape, the new tab and rel words only where they count', () => {
  const state = (patch) => ({ ...readLink(null), ...patch });
  assert.deepEqual(writeLink(state({ page: 'kaker', target: 'sec-1', newTab: true })), { page: 'kaker', target: 'sec-1', newTab: true });
  assert.deepEqual(writeLink(state({ page: 'kaker' })), { page: 'kaker' });
  assert.equal(writeLink(state({ page: 'kaker', target: 'sec-1' }), { shape: 'address', pages: PAGES }), '/kaker#sec-1');
  assert.deepEqual(writeLink(state({ kind: 'web', url: 'www.eksempel.no/side', newTab: true, rel: ['nofollow'] })), { href: 'https://www.eksempel.no/side', newTab: true, rel: ['nofollow'] });
  assert.deepEqual(writeLink(state({ kind: 'web', url: '/media/plan.pdf', rel: ['nofollow'] })), { href: '/media/plan.pdf' }, 'rel words count only for the web');
  assert.deepEqual(writeLink(state({ kind: 'email', email: 'post@apeiron.no', subject: 'Hei der', newTab: true })), { href: 'mailto:post@apeiron.no?subject=Hei%20der' });
  assert.deepEqual(writeLink(state({ kind: 'phone', phone: '+47 900 00 000' })), { href: 'tel:+4790000000' });
  assert.equal(writeLink(state({ kind: 'phone', phone: '+47 900 00 000' }), { shape: 'address' }), 'tel:+4790000000');
  assert.equal(writeLink(state({ kind: 'web', url: 'javascript:alert(1)' })), null);
  assert.equal(writeLink(state({ kind: 'email', email: 'ikke en adresse' })), null);
  assert.equal(writeLink(state({})), null, 'no page chosen');
  assert.equal(linkReady(state({ kind: 'phone', phone: '12' })), false);
});

test('webHref, emailHref and emailLike: what the link editor takes as typed', () => {
  assert.equal(webHref('https://x.no'), 'https://x.no');
  assert.equal(webHref(' x.no '), 'https://x.no');
  assert.equal(webHref('/om-oss#kontakt'), '/om-oss#kontakt');
  assert.equal(webHref('ikke en adresse'), '');
  assert.equal(webHref('javascript:alert(1)'), '');
  assert.equal(webHref('//evil.no'), '');
  assert.equal(emailHref('a@b.no'), 'mailto:a@b.no');
  assert.equal(emailHref('a@b.no', 'Om & mer'), 'mailto:a@b.no?subject=Om%20%26%20mer');
  assert.equal(emailHref('a@b'), '');
  assert.equal(emailLike('post@apeiron.no'), true);
  assert.equal(emailLike('post@apeiron.no?subject=x'), false);
});

test('linkSummary and linkText: the words a link field and a closed group show', () => {
  assert.equal(linkSummary(readLink({ page: 'kaker', target: 'sec-1' }, { pages: PAGES }), { pages: PAGES, spotLabel: 'Seksjon 2' }), 'Kaker › Seksjon 2');
  assert.equal(linkText({ page: 'kaker', target: 'kontakt' }, { pages: PAGES }), 'Kaker › #kontakt');
  assert.equal(linkText({ page: 'kaker' }, { pages: PAGES }), 'Kaker');
  assert.equal(linkText({ href: 'https://x.no/side' }), 'x.no/side');
  assert.equal(linkText('mailto:a@b.no'), 'a@b.no');
  assert.equal(linkText({}), '');
});

test('writeLink: a spot on the host\'s own page is stored without the page, so a copy follows the spot\'s copy; a host on every page keeps the page', () => {
  const spot = { ...readLink(null), page: 'kaker', target: 'sec-1' };
  assert.deepEqual(writeLink(spot, { here: 'kaker' }), { target: 'sec-1' });
  assert.deepEqual(writeLink(spot, { here: 'om-oss' }), { page: 'kaker', target: 'sec-1' });
  assert.deepEqual(writeLink(spot, { here: null }), { page: 'kaker', target: 'sec-1' }, 'the menu and the footer');
  assert.deepEqual(writeLink({ ...spot, target: '' }, { here: 'kaker' }), { page: 'kaker' }, 'the page itself keeps its page');
  assert.equal(writeLink(spot, { shape: 'address', pages: PAGES, here: 'kaker' }), '#sec-1');
  assert.deepEqual([readLink({ target: 'sec-1' }, { pages: PAGES, here: null }).kind, readLink({ target: 'sec-1' }, { pages: PAGES, here: null }).page], ['page', ''], 'on every page a spot without a page asks for its page');
  assert.equal(readLink('#priser', { pages: PAGES, here: null }).kind, 'web', 'on every page a bare fragment stays an address');
});

test('hasLink and the words for a spot without its words', () => {
  for (const none of [null, '', '#', {}, { href: '#' }, { href: '  ' }, { newTab: true }]) assert.equal(hasLink(none), false, JSON.stringify(none));
  for (const some of ['/kaker', { page: 'kaker' }, { target: 'sec-1' }, { href: 'mailto:a@b.no' }]) assert.equal(hasLink(some), true, JSON.stringify(some));
  assert.equal(linkText({ page: 'kaker', target: 'sec-4c908354' }, { pages: PAGES }), 'Kaker', 'an id is left out');
  assert.equal(linkText({ page: 'kaker', target: 'priser' }, { pages: PAGES }), 'Kaker › #priser', 'a name stands for itself');
});
