/**
 * The contact card (engine/vcard.js): the site's contact details as a vCard 3.0 for the contact block's save button and its QR design, with the format's escaping and line folding, and the file's name.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { contactVcard, vcardFileName } = await engineImport('vcard.js');

const site = (contact, title = 'Apeiron') => ({ site: { title, lang: 'nb', contact } });
const NO = {
  country: 'NO', legalName: 'Apeiron Linjeforening',
  address: { street: 'Høgskoleringen 5', postalCode: '7034', city: 'Trondheim' }, phone: '+47 400 00 000', email: 'post@apeiron.no',
};

test('a card for the organisation: the name as FN and ORG, the address with the country, the phone, the email and the site', () => {
  const card = contactVcard(site(NO), { url: 'https://apeiron.no/' });
  assert.equal(card, [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:;;;;',
    'FN:Apeiron Linjeforening',
    'ORG:Apeiron Linjeforening',
    'ADR;TYPE=WORK:;;Høgskoleringen 5;Trondheim;;7034;Norge',
    'TEL;TYPE=WORK,VOICE:+4740000000',
    'EMAIL;TYPE=INTERNET,WORK:post@apeiron.no',
    'URL:https://apeiron.no/',
    'END:VCARD',
    '',
  ].join('\r\n'));
});

test('the compact card for a QR code leaves the types out, and the site title stands in for a missing legal name', () => {
  const card = contactVcard(site({ phone: '+47 400 00 000' }), { compact: true });
  assert.equal(card, 'BEGIN:VCARD\r\nVERSION:3.0\r\nN:;;;;\r\nFN:Apeiron\r\nORG:Apeiron\r\nTEL:+4740000000\r\nEND:VCARD\r\n');
});

test('nothing to reach the association by gives no card, and a link that is not a web address is left out', () => {
  assert.equal(contactVcard(site({ legalName: 'Apeiron Linjeforening' })), null);
  assert.equal(contactVcard(site(undefined)), null);
  assert.doesNotMatch(contactVcard(site(NO), { url: 'javascript:alert(1)' }), /URL:/);
});

test('values are escaped and long lines folded at 75 octets without splitting a character', () => {
  const card = contactVcard(site({ legalName: 'Bar, Kafé; og \\ «Ø»', email: 'a@b.no' }));
  assert.match(card, /FN:Bar\\, Kafé\\; og \\\\ «Ø»/);
  const long = contactVcard(site({ legalName: 'Æ'.repeat(60), email: 'a@b.no' }));
  for (const line of long.split('\r\n')) assert.ok(Buffer.byteLength(line, 'utf8') <= 75, line);
  assert.match(long.replace(/\r\n /g, ''), new RegExp(`FN:${'Æ'.repeat(60)}`));
  const compact = contactVcard(site({ legalName: 'Æ'.repeat(60), email: 'a@b.no' }), { compact: true });
  assert.ok(compact.split('\r\n').some((line) => Buffer.byteLength(line, 'utf8') > 75), 'the compact card keeps its lines whole');
});

test('the file name is the name\'s letters and digits joined by hyphens', () => {
  assert.equal(vcardFileName('Apeiron Linjeforening'), 'Apeiron-Linjeforening.vcf');
  assert.equal(vcardFileName('  Kafé & Bar!! '), 'Kafé-Bar.vcf');
  assert.equal(vcardFileName('***'), 'contact.vcf');
});

test('parts: the card carries only the parts a contact block shows, and none of them gives no card', () => {
  const card = contactVcard(site(NO), { url: 'https://apeiron.no/', parts: ['name', 'address', 'email'] });
  assert.ok(card.includes('ADR;TYPE=WORK:;;Høgskoleringen 5;Trondheim;;7034;Norge'));
  assert.ok(card.includes('EMAIL;TYPE=INTERNET,WORK:post@apeiron.no'));
  assert.ok(!card.includes('TEL'), 'the phone is switched off in the block');
  assert.ok(!contactVcard(site(NO), { parts: ['email'] }).includes('ADR'));
  assert.equal(contactVcard(site(NO), { parts: ['name', 'legal'] }), null, 'no address, phone or email shown');
  assert.ok(contactVcard(site(NO), {}).includes('TEL'), 'without parts the card carries everything');
});
