/**
 * Contract tests for the form block's pure logic (validation, honeypot, mailto building, payload).
 * DOM rendering and submission are tested manually.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const {
  isEmail, isSpam, isIsoDate, validate, buildMailto, buildPayload, endpointOrigin,
} = await engineImport('form-model.js');

// Deliberate Norwegian field ids, labels and values throughout: form fields are user data.
const FIELDS = [
  { id: 'navn', label: 'Navn', type: 'text', required: true },
  { id: 'epost', label: 'E-post', type: 'email', required: true },
  { id: 'melding', label: 'Melding', type: 'textarea', required: true },
];

test('isEmail: accepts common addresses, rejects invalid ones', () => {
  assert.ok(isEmail('ola@example.com'));
  assert.ok(isEmail('a.b-c@under.no'));
  assert.ok(!isEmail('ola@'));
  assert.ok(!isEmail('ola example.com'));
  assert.ok(!isEmail(''));
});

test('isSpam: honeypot filled in = spam', () => {
  assert.ok(isSpam('noe'));
  assert.ok(!isSpam(''));
  assert.ok(!isSpam('   '));
  assert.ok(!isSpam(undefined));
});

test('validate: required fields and email format', () => {
  const missing = validate(FIELDS, { navn: '', epost: 'ola@x.no', melding: 'hei' });
  assert.equal(missing.ok, false);
  assert.ok(missing.errors.navn);

  const badEmail = validate(FIELDS, { navn: 'Ola', epost: 'ugyldig', melding: 'hei' });
  assert.equal(badEmail.ok, false);
  assert.ok(badEmail.errors.epost);

  const ok = validate(FIELDS, { navn: 'Ola', epost: 'ola@x.no', melding: 'hei' });
  assert.deepEqual(ok, { ok: true, errors: {} });
});

test('validate: an optional field without a value is fine, but a bad email is always caught', () => {
  const fields = [{ id: 'tlf', label: 'Telefon', type: 'tel', required: false }, ...FIELDS];
  assert.equal(validate(fields, { navn: 'Ola', epost: 'ola@x.no', melding: 'hei' }).ok, true);
});

test('buildMailto: encoded subject and body, fields without a value are left out', () => {
  const url = buildMailto('post@forening.no', 'Ny henvendelse', FIELDS,
    { navn: 'Ola Nordmann', epost: 'ola@x.no', melding: 'Hei & vel møtt' });
  assert.ok(url.startsWith('mailto:post@forening.no?'));
  assert.match(url, /subject=Ny%20henvendelse/);
  assert.match(url, /Ola%20Nordmann/);
  // The & in the message must be encoded, not start a new query parameter.
  assert.match(url, /Hei%20%26%20vel/);
  assert.ok(!url.includes('melding'));
});

test('buildMailto: without a recipient gives null', () => {
  assert.equal(buildMailto('', 'x', FIELDS, {}), null);
});

test('buildPayload: field values + extra context, honeypot excluded', () => {
  const payload = buildPayload(FIELDS, { navn: 'Ola', epost: 'ola@x.no', melding: 'hei', _hp: 'bot' },
    { side: '/kontakt' });
  assert.deepEqual(payload, { side: '/kontakt', navn: 'Ola', epost: 'ola@x.no', melding: 'hei' });
});

test('endpointOrigin: extracts the origin, null when invalid', () => {
  assert.equal(endpointOrigin('https://script.google.com/macros/s/abc/exec'), 'https://script.google.com');
  assert.equal(endpointOrigin('ikke en url'), null);
});

// The field types from 0.7.4: select/radio with an option list, checkbox (boolean value) and date (ISO form from input type=date).

test('isIsoDate: a valid calendar date in ISO form', () => {
  assert.ok(isIsoDate('2026-08-14'));
  assert.ok(isIsoDate('2024-02-29'));
  assert.ok(!isIsoDate('2026-02-30'));
  assert.ok(!isIsoDate('14.08.2026'));
  assert.ok(!isIsoDate(''));
});

test('validate: checkbox is boolean, required = must be checked', () => {
  const fields = [{ id: 'samtykke', label: 'Samtykke', type: 'checkbox', required: true }];
  assert.equal(validate(fields, { samtykke: false }).ok, false);
  assert.equal(validate(fields, { samtykke: 'false' }).ok, false);
  assert.equal(validate(fields, { samtykke: true }).ok, true);
  const optional = [{ ...fields[0], required: false }];
  assert.equal(validate(optional, { samtykke: false }).ok, true);
});

test('validate: select and radio accept only values from the option list', () => {
  const fields = [{ id: 'gruppe', label: 'Gruppe', type: 'select', required: true, options: ['A', 'B'] }];
  assert.equal(validate(fields, { gruppe: 'A' }).ok, true);
  assert.equal(validate(fields, { gruppe: 'tuklet' }).ok, false);
  assert.equal(validate(fields, { gruppe: '' }).ok, false);
  const radio = [{ ...fields[0], type: 'radio', required: false }];
  assert.equal(validate(radio, { gruppe: '' }).ok, true);
  assert.equal(validate(radio, { gruppe: 'C' }).ok, false);
});

test('validate: date must be a valid ISO date when filled in', () => {
  const fields = [{ id: 'dato', label: 'Dato', type: 'date', required: false }];
  assert.equal(validate(fields, { dato: '2026-08-14' }).ok, true);
  assert.equal(validate(fields, { dato: 'i går' }).ok, false);
  assert.equal(validate(fields, { dato: '' }).ok, true);
});

test('buildMailto: a checked box becomes the yes word, an empty box is left out', () => {
  const fields = [
    { id: 'navn', label: 'Navn', type: 'text', required: true },
    { id: 'nyhetsbrev', label: 'Nyhetsbrev', type: 'checkbox', required: false },
  ];
  const url = buildMailto('post@x.no', 'Emne', fields, { navn: 'Ola', nyhetsbrev: true }, { yes: 'Ja' });
  assert.match(url, /Nyhetsbrev%3A%20Ja/);
  const without = buildMailto('post@x.no', 'Emne', fields, { navn: 'Ola', nyhetsbrev: false }, { yes: 'Ja' });
  assert.ok(!without.includes('Nyhetsbrev'));
});

test('buildPayload: checkbox is sent as a real boolean', () => {
  const fields = [
    { id: 'navn', label: 'Navn', type: 'text', required: true },
    { id: 'samtykke', label: 'Samtykke', type: 'checkbox', required: true },
  ];
  const payload = buildPayload(fields, { navn: ' Ola ', samtykke: true });
  assert.deepEqual(payload, { navn: 'Ola', samtykke: true });
  assert.equal(buildPayload(fields, { navn: 'Ola' }).samtykke, false);
});
