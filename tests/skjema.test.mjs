/**
 * Kontraktstester for skjema-pluginens rene logikk (validering, honeypot,
 * mailto-bygging, payload). DOM-rendering og innsending testes manuelt.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isEmail, isSpam, isIsoDate, validate, buildMailto, buildPayload, endpointOrigin,
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

// Felttypene fra 0.7.4: nedtrekk/radio med alternativliste, avkryssing
// (boolsk verdi) og dato (ISO-form fra input type=date).

test('isIsoDate: gyldig kalenderdato på ISO-form', () => {
  assert.ok(isIsoDate('2026-08-14'));
  assert.ok(isIsoDate('2024-02-29'));
  assert.ok(!isIsoDate('2026-02-30'));
  assert.ok(!isIsoDate('14.08.2026'));
  assert.ok(!isIsoDate(''));
});

test('validate: avkryssing er boolsk, påkrevd = må være krysset av', () => {
  const fields = [{ id: 'samtykke', label: 'Samtykke', type: 'checkbox', required: true }];
  assert.equal(validate(fields, { samtykke: false }).ok, false);
  assert.equal(validate(fields, { samtykke: 'false' }).ok, false);
  assert.equal(validate(fields, { samtykke: true }).ok, true);
  const optional = [{ ...fields[0], required: false }];
  assert.equal(validate(optional, { samtykke: false }).ok, true);
});

test('validate: nedtrekk og radio godtar kun verdier fra alternativlisten', () => {
  const fields = [{ id: 'gruppe', label: 'Gruppe', type: 'select', required: true, options: ['A', 'B'] }];
  assert.equal(validate(fields, { gruppe: 'A' }).ok, true);
  assert.equal(validate(fields, { gruppe: 'tuklet' }).ok, false);
  assert.equal(validate(fields, { gruppe: '' }).ok, false);
  const radio = [{ ...fields[0], type: 'radio', required: false }];
  assert.equal(validate(radio, { gruppe: '' }).ok, true);
  assert.equal(validate(radio, { gruppe: 'C' }).ok, false);
});

test('validate: dato må være gyldig ISO-dato når den er utfylt', () => {
  const fields = [{ id: 'dato', label: 'Dato', type: 'date', required: false }];
  assert.equal(validate(fields, { dato: '2026-08-14' }).ok, true);
  assert.equal(validate(fields, { dato: 'i går' }).ok, false);
  assert.equal(validate(fields, { dato: '' }).ok, true);
});

test('buildMailto: avkrysset boks blir ja-ordet, tom boks utelates', () => {
  const fields = [
    { id: 'navn', label: 'Navn', type: 'text', required: true },
    { id: 'nyhetsbrev', label: 'Nyhetsbrev', type: 'checkbox', required: false },
  ];
  const url = buildMailto('post@x.no', 'Emne', fields, { navn: 'Ola', nyhetsbrev: true }, { yes: 'Ja' });
  assert.match(url, /Nyhetsbrev%3A%20Ja/);
  const without = buildMailto('post@x.no', 'Emne', fields, { navn: 'Ola', nyhetsbrev: false }, { yes: 'Ja' });
  assert.ok(!without.includes('Nyhetsbrev'));
});

test('buildPayload: avkryssing sendes som ekte boolsk', () => {
  const fields = [
    { id: 'navn', label: 'Navn', type: 'text', required: true },
    { id: 'samtykke', label: 'Samtykke', type: 'checkbox', required: true },
  ];
  const payload = buildPayload(fields, { navn: ' Ola ', samtykke: true });
  assert.deepEqual(payload, { navn: 'Ola', samtykke: true });
  assert.equal(buildPayload(fields, { navn: 'Ola' }).samtykke, false);
});
