/**
 * Link editing in the editor (editor/src/lib/link-edit.js): a stored link read into the link editor and written back in the host's shape, the typed addresses it takes, the words a link field shows, a link written over a host, a link whose page or spot is gone, and links to files (file-links.js).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
const { setLinkOn, linkOf, hasLink, readLink, writeLink, linkReady, linkSummary, linkText, linkProblem, webHref, emailHref, emailLike } = await import('../editor/src/lib/link-edit.js');
const { heldPdf, heldName, isFileHref, fileLabel, siteFiles, publishHeldFiles } = await import('../editor/src/lib/file-links.js');

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
  assert.deepEqual(read({ page: 'kaker', target: 'sec-1', newTab: true }), { kind: 'page', page: 'kaker', target: 'sec-1', url: '', email: '', subject: '', phone: '', file: '', newTab: true, rel: [], download: false });
  assert.equal(read({ target: 'blk-1' }).page, 'kaker', 'a spot without a page is on the page the link stands on');
  assert.deepEqual([read('/kaker#sec-4c908354').page, read('/kaker#sec-4c908354').target], ['kaker', 'sec-4c908354']);
  assert.deepEqual([read('/om-oss/#kontakt').page, read('/om-oss/#kontakt').target], ['om-oss', 'kontakt'], 'a trailing slash and a name');
  assert.deepEqual([read('#priser').page, read('#priser').target], ['kaker', 'priser']);
  assert.equal(read('/').page, 'hjem');
  assert.deepEqual([read('mailto:post@apeiron.no?subject=Hei%20der').kind, read('mailto:post@apeiron.no?subject=Hei%20der').email, read('mailto:post@apeiron.no?subject=Hei%20der').subject], ['email', 'post@apeiron.no', 'Hei der']);
  assert.deepEqual([read('tel:+4790000000').kind, read('tel:+4790000000').phone], ['phone', '+4790000000']);
  assert.deepEqual([read({ href: 'https://x.no', rel: ['sponsored', 'ugc'] }).kind, read({ href: 'https://x.no', rel: ['sponsored', 'ugc'] }).rel], ['web', ['sponsored']]);
  assert.equal(read('/om-oss/gammel').kind, 'web', 'a path that is no page stays an address');
  assert.deepEqual([read({ href: '/media/plan-1a2b3c4d.pdf', download: true }).kind, read({ href: '/media/plan-1a2b3c4d.pdf', download: true }).file, read({ href: '/media/plan-1a2b3c4d.pdf', download: true }).download], ['file', '/media/plan-1a2b3c4d.pdf', true], 'a file in media/');
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

test('linkProblem: a page gone from the register, a spot gone from its page, and an address within the site that names no page', () => {
  const problem = (value, taken = null) => linkProblem(readLink(value, { pages: PAGES, here: 'kaker' }), { pages: PAGES, taken, reserved: ['admin', 'media'] });
  const taken = new Set(['sec-1', 'priser', 'blk-1']);
  assert.equal(problem({ page: 'slettet' }), 'page');
  assert.equal(problem({ page: 'slettet', target: 'sec-1' }), 'page');
  assert.equal(problem({ page: 'kaker', target: 'sec-9' }, taken), 'spot');
  assert.equal(problem({ target: 'sec-9' }, taken), 'spot', 'a spot on the page the link stands on');
  assert.equal(problem({ page: 'kaker', target: 'sec-9' }), null, 'the page not yet read tells nothing');
  assert.equal(problem({ page: 'kaker', target: 'priser' }, taken), null, 'a name');
  assert.equal(problem({ page: 'kaker' }, taken), null);
  assert.equal(problem('/kaker#sec-9', taken), 'spot');
  assert.equal(problem('/gammel-side'), 'address');
  for (const tagged of ['/kaker?ref=x', '/om-oss/?utm_source=nyhetsbrev', '/?utm=1', '/kaker?x=1#sec-1']) assert.equal(problem(tagged), null, `${tagged}: a query on a page that is there`);
  assert.equal(problem('/gammel-side/?a=1#topp'), 'address');
  for (const fine of ['/media/plan.pdf', '/feed.xml', '/admin', 'https://x.no', 'mailto:a@b.no', 'tel:+4790000000', '//x.no/side', null]) assert.equal(problem(fine), null, String(fine));
});

// A PDF's first bytes (%PDF-1.7) in base64, as FileReader gives them.
const PDF_DATA = 'data:application/pdf;base64,JVBERi0xLjcKJcfsj6IK';

test('a file: a PDF held in the draft with its name, a path in media/, written with the wish to save it', () => {
  const held = heldPdf(PDF_DATA, 'Meny for høsten.pdf');
  assert.equal(held, 'data:application/pdf;name=meny-for-hosten;base64,JVBERi0xLjcKJcfsj6IK');
  assert.equal(heldName(held), 'meny-for-hosten');
  assert.equal(heldName(PDF_DATA), null, 'a PDF without its name is not one the editor holds');
  assert.equal(fileLabel(held), 'meny-for-hosten.pdf');
  assert.equal(fileLabel('/media/meny-1a2b3c4d.pdf'), 'meny-1a2b3c4d.pdf');
  for (const file of [held, '/media/meny-1a2b3c4d.pdf', '/media/lyd-0a0b0c0d.mp3']) assert.equal(isFileHref(file), true, file);
  for (const other of ['/media/', '/kaker', 'https://x.no/a.pdf', PDF_DATA, null]) assert.equal(isFileHref(other), false, String(other));
  const state = { ...readLink({ href: held }), download: true, newTab: true };
  assert.equal(state.kind, 'file');
  assert.equal(linkReady(state), true);
  assert.deepEqual(writeLink(state), { href: held, newTab: true, download: true });
  assert.equal(writeLink(state, { shape: 'address' }), held, 'a host that keeps one address keeps the file without the wish to save it');
  assert.equal(linkSummary(readLink('/media/meny-1a2b3c4d.pdf')), 'meny-1a2b3c4d.pdf');
  assert.deepEqual(writeLink({ ...readLink('https://x.no'), download: true }), { href: 'https://x.no' }, 'the wish to save goes with a file only');
  const button = { label: 'Meny', href: null };
  setLinkOn(button, { href: '/media/meny-1a2b3c4d.pdf', download: true });
  setLinkOn(button, { page: 'kaker' });
  assert.deepEqual(button, { label: 'Meny', page: 'kaker' }, 'the wish to save goes with the link it belonged to');
});

test('siteFiles: the files in media/ the content uses, pictures left out, once each by name', () => {
  const page = { sections: [{ blocks: [
    { props: { href: '/media/prisliste-0f0f0f0f.pdf' } },
    { props: { src: '/media/bilde-1a1a1a1a.webp', html: '<p><a href="/media/meny-1a2b3c4d.pdf">Meny</a> og <a href="/media/prisliste-0f0f0f0f.pdf">priser</a></p>' } },
  ] }] };
  const site = { footer: { columns: [{ links: [{ label: 'Lyd', href: '/media/sang-2b2b2b2b.mp3' }, { label: 'Logo', href: '/media/logo-3c3c3c3c.SVG' }] }] } };
  assert.deepEqual(siteFiles(site, page, [null, { sections: [] }]), ['/media/meny-1a2b3c4d.pdf', '/media/prisliste-0f0f0f0f.pdf', '/media/sang-2b2b2b2b.mp3']);
});

test('publishHeldFiles: a held PDF under href or url becomes one file in media/ and its path', () => {
  const held = heldPdf(PDF_DATA, 'meny.pdf');
  const block = { label: 'Meny', href: held, links: [{ url: held }, { url: '/kaker' }], note: held };
  const files = [];
  publishHeldFiles(block, files);
  assert.equal(files.length, 1, 'the same file once');
  assert.match(files[0].path, /^media\/meny-[0-9a-f]{8}\.pdf$/);
  assert.equal(files[0].content, 'JVBERi0xLjcKJcfsj6IK');
  assert.equal(files[0].encoding, 'base64');
  assert.equal(block.href, `/${files[0].path}`);
  assert.equal(block.links[0].url, `/${files[0].path}`);
  assert.equal(block.links[1].url, '/kaker');
  assert.equal(block.note, held, 'only an address is published as a file');
  const again = [];
  publishHeldFiles({ href: held }, again);
  assert.equal(again[0].path, files[0].path, 'the same content gives the same name');
});
