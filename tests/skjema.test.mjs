/**
 * Kontraktstester for skjema-pluginens rene logikk (validering, honeypot,
 * mailto-bygging, payload). DOM-rendering og innsending testes manuelt.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isEmail, isSpam, validate, buildMailto, buildPayload, endpointOrigin,
} from '../template/plugins/skjema/form.js';

const FIELDS = [
  { id: 'navn', label: 'Navn', type: 'text', required: true },
  { id: 'epost', label: 'E-post', type: 'email', required: true },
  { id: 'melding', label: 'Melding', type: 'textarea', required: true },
];

test('isEmail: godtar vanlige adresser, avviser feil', () => {
  assert.ok(isEmail('ola@example.com'));
  assert.ok(isEmail('a.b-c@under.no'));
  assert.ok(!isEmail('ola@'));
  assert.ok(!isEmail('ola example.com'));
  assert.ok(!isEmail(''));
});

test('isSpam: honeypot utfylt = spam', () => {
  assert.ok(isSpam('noe'));
  assert.ok(!isSpam(''));
  assert.ok(!isSpam('   '));
  assert.ok(!isSpam(undefined));
});

test('validate: påkrevde felt og e-postformat', () => {
  const missing = validate(FIELDS, { navn: '', epost: 'ola@x.no', melding: 'hei' });
  assert.equal(missing.ok, false);
  assert.ok(missing.errors.navn);

  const badEmail = validate(FIELDS, { navn: 'Ola', epost: 'ugyldig', melding: 'hei' });
  assert.equal(badEmail.ok, false);
  assert.ok(badEmail.errors.epost);

  const ok = validate(FIELDS, { navn: 'Ola', epost: 'ola@x.no', melding: 'hei' });
  assert.deepEqual(ok, { ok: true, errors: {} });
});

test('validate: valgfritt felt uten verdi er greit, men feil e-post fanges alltid', () => {
  const fields = [{ id: 'tlf', label: 'Telefon', type: 'tel', required: false }, ...FIELDS];
  assert.equal(validate(fields, { navn: 'Ola', epost: 'ola@x.no', melding: 'hei' }).ok, true);
});

test('buildMailto: encodet emne og kropp, felt uten verdi utelates', () => {
  const url = buildMailto('post@forening.no', 'Ny henvendelse', FIELDS,
    { navn: 'Ola Nordmann', epost: 'ola@x.no', melding: 'Hei & vel møtt' });
  assert.ok(url.startsWith('mailto:post@forening.no?'));
  assert.match(url, /subject=Ny%20henvendelse/);
  assert.match(url, /Ola%20Nordmann/);
  // & i meldingen må være encodet, ikke starte en ny query-parameter.
  assert.match(url, /Hei%20%26%20vel/);
  assert.ok(!url.includes('melding'));
});

test('buildMailto: uten mottaker gir null', () => {
  assert.equal(buildMailto('', 'x', FIELDS, {}), null);
});

test('buildPayload: feltverdier + ekstra kontekst, honeypot ikke med', () => {
  const payload = buildPayload(FIELDS, { navn: 'Ola', epost: 'ola@x.no', melding: 'hei', _hp: 'bot' },
    { side: '/kontakt' });
  assert.deepEqual(payload, { side: '/kontakt', navn: 'Ola', epost: 'ola@x.no', melding: 'hei' });
});

test('endpointOrigin: henter opprinnelsen, null ved ugyldig', () => {
  assert.equal(endpointOrigin('https://script.google.com/macros/s/abc/exec'), 'https://script.google.com');
  assert.equal(endpointOrigin('ikke en url'), null);
});
