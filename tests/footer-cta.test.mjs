/**
 * Test av footer-CTA-ens rene nyhetsbrev-logikk: e-postvalidering, honeypot,
 * endepunkt-payload og mailto-fallback. DOM-en og fetch-en (footer.js) dekkes
 * av headless-sjekkpunktene.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const {
  isEmail,
  isSpam,
  buildNewsletterPayload,
  buildNewsletterMailto,
  endpointOrigin,
} = await engineImport('footer-cta.js');

test('isEmail godtar rimelige adresser og avviser resten', () => {
  for (const ok of ['a@b.no', 'ola.nordmann@urd.no', ' post@urd.no ']) {
    assert.equal(isEmail(ok), true, ok);
  }
  for (const bad of ['a@b', 'ab.no', '@b.no', 'a b@c.no', '', '   ', null, 42]) {
    assert.equal(isEmail(bad), false, String(bad));
  }
});

test('isSpam: sant kun når honeypot er utfylt', () => {
  assert.equal(isSpam('bot'), true);
  assert.equal(isSpam(''), false);
  assert.equal(isSpam('   '), false);
  assert.equal(isSpam(undefined), false);
});

test('buildNewsletterPayload: trimmer e-post og fletter inn kontekst', () => {
  assert.deepEqual(buildNewsletterPayload('  a@b.no  '), { email: 'a@b.no' });
  assert.deepEqual(
    buildNewsletterPayload('a@b.no', { side: '/kontakt' }),
    { side: '/kontakt', email: 'a@b.no' },
  );
});

test('buildNewsletterMailto: mailto med %20-koding, null uten mottaker', () => {
  const url = buildNewsletterMailto('post@urd.no', 'a@b.no');
  assert.ok(url.startsWith('mailto:post@urd.no?'));
  assert.ok(url.includes('subject=Nyhetsbrev-p%C3%A5melding'));
  assert.ok(!url.includes('+')); // mellomrom er %20, ikke +
  assert.ok(url.includes('a%40b.no')); // e-posten er URL-kodet i body-en
  assert.equal(buildNewsletterMailto('', 'a@b.no'), null);
  assert.equal(buildNewsletterMailto(undefined, 'a@b.no'), null);
});

test('endpointOrigin: origin ut, null ved ugyldig', () => {
  assert.equal(endpointOrigin('https://formspree.io/f/abc'), 'https://formspree.io');
  assert.equal(endpointOrigin('ikke en url'), null);
});
