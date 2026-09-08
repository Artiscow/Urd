/**
 * Tests for the footer CTA's pure newsletter logic: email validation,
 * honeypot, endpoint payload and mailto fallback. The DOM and the fetch
 * (footer.js) are covered by the headless checkpoints.
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

test('isEmail accepts reasonable addresses and rejects the rest', () => {
  for (const ok of ['a@b.no', 'ola.nordmann@urd.no', ' post@urd.no ']) {
    assert.equal(isEmail(ok), true, ok);
  }
  for (const bad of ['a@b', 'ab.no', '@b.no', 'a b@c.no', '', '   ', null, 42]) {
    assert.equal(isEmail(bad), false, String(bad));
  }
});

test('isSpam: true only when the honeypot is filled in', () => {
  assert.equal(isSpam('bot'), true);
  assert.equal(isSpam(''), false);
  assert.equal(isSpam('   '), false);
  assert.equal(isSpam(undefined), false);
});

test('buildNewsletterPayload: trims the email and merges in context', () => {
  assert.deepEqual(buildNewsletterPayload('  a@b.no  '), { email: 'a@b.no' });
  assert.deepEqual(
    buildNewsletterPayload('a@b.no', { side: '/kontakt' }),
    { side: '/kontakt', email: 'a@b.no' },
  );
});

test('buildNewsletterMailto: mailto with %20 encoding, null without a recipient', () => {
  const url = buildNewsletterMailto('post@urd.no', 'a@b.no');
  assert.ok(url.startsWith('mailto:post@urd.no?'));
  // The Norwegian subject is the module's own literal (user-facing text).
  assert.ok(url.includes('subject=Nyhetsbrev-p%C3%A5melding'));
  assert.ok(!url.includes('+')); // spaces are %20, not +
  assert.ok(url.includes('a%40b.no')); // the email is URL-encoded in the body
  assert.equal(buildNewsletterMailto('', 'a@b.no'), null);
  assert.equal(buildNewsletterMailto(undefined, 'a@b.no'), null);
});

test('endpointOrigin: origin out, null when invalid', () => {
  assert.equal(endpointOrigin('https://formspree.io/f/abc'), 'https://formspree.io');
  assert.equal(endpointOrigin('ikke en url'), null);
});
