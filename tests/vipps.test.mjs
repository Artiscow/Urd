/**
 * Kontraktstester for betalingslagets rene logikk (functions/_lib/vipps.js,
 * ADR-0020): konfigurasjonslesing, payload-validering (aldri klientens
 * priser), øre-omregning mot katalogen og sesjonskroppen. Endepunktet og
 * selve betalingen testes manuelt mot MT-miljøet (testrundene).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { vippsConfig, validOrderPayload, orderAmountOre, makeReference, buildSession } from '../template/functions/_lib/vipps.js';

const ENV = {
  VIPPS_CLIENT_ID: 'id',
  VIPPS_CLIENT_SECRET: 'secret',
  VIPPS_SUBSCRIPTION_KEY: 'sub',
  VIPPS_MSN: '123456',
};

const CATALOGS = [
  { kind: 'products', entries: [{ id: 'kake', price: 350 }, { id: 'boller', price: 49.5 }, { id: 'gratis' }] },
  { kind: 'news', entries: [{ id: 'kake', price: 1 }] },
];

test('vippsConfig: null uten alle hemmelighetene, standard api-base ellers', () => {
  assert.equal(vippsConfig({}), null);
  assert.equal(vippsConfig({ ...ENV, VIPPS_MSN: '' }), null);
  const config = vippsConfig(ENV);
  assert.equal(config.apiBase, 'https://api.vipps.no');
  assert.equal(vippsConfig({ ...ENV, VIPPS_API_BASE: 'https://apitest.vipps.no' }).apiBase, 'https://apitest.vipps.no');
});

test('validOrderPayload: renser linjer og kontakt, klemmer antall, avviser tull', () => {
  const clean = validOrderPayload({
    order: [{ id: 'kake', qty: 2, variant: 'Stor', price: 1 }],
    contact: { name: ' Kari ', email: 'kari@forening.no' },
    returnPath: '/kasse',
  });
  assert.deepEqual(clean.order, [{ id: 'kake', qty: 2, variant: 'Stor' }]);
  assert.equal(clean.contact.name, 'Kari');
  assert.equal(clean.returnPath, '/kasse');
  assert.equal(validOrderPayload(null), null);
  assert.equal(validOrderPayload({ order: [] }), null);
  assert.equal(validOrderPayload({ order: [{ id: '../etc', qty: 1 }] }), null);
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 0 }] }), null);
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 100 }] }), null);
});

test('validOrderPayload: retursti må være intern; alt annet gir rot', () => {
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1 }], returnPath: 'https://ond.no/' }).returnPath, '/');
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1 }], returnPath: '//ond.no' }).returnPath, '/');
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1 }] }).returnPath, '/');
});

test('orderAmountOre: regner fra katalogen, aldri klienten; ukjent/prisløs id avviser', () => {
  assert.equal(orderAmountOre([{ id: 'kake', qty: 2 }], CATALOGS), 70000);
  assert.equal(orderAmountOre([{ id: 'boller', qty: 1 }], CATALOGS), 4950);
  assert.equal(orderAmountOre([{ id: 'ukjent', qty: 1 }], CATALOGS), null);
  assert.equal(orderAmountOre([{ id: 'gratis', qty: 1 }], CATALOGS), null);
});

test('orderAmountOre: kun products-samlinger teller', () => {
  assert.equal(orderAmountOre([{ id: 'kake', qty: 1 }], [{ kind: 'news', entries: [{ id: 'kake', price: 1 }] }]), null);
});

test('makeReference: Vipps-formen [a-zA-Z0-9-]{8,50}', () => {
  const ref = makeReference();
  assert.match(ref, /^[a-zA-Z0-9-]{8,50}$/);
  assert.notEqual(makeReference(), ref);
});

test('buildSession: retur-URL på egen origin, beløp i øre, beskrivelse med linjer', () => {
  const body = buildSession({
    amountOre: 70000,
    reference: 'urd-abc123def456',
    order: [{ id: 'kake', qty: 2, variant: 'Stor' }],
    contact: { name: 'Kari', email: 'kari@forening.no', phone: '', comment: '' },
    origin: 'https://forening.pages.dev',
    returnPath: '/kasse',
    callbackToken: 'urd-token',
  });
  assert.equal(body.merchantInfo.returnUrl, 'https://forening.pages.dev/kasse?bestilt=1');
  assert.equal(body.merchantInfo.callbackUrl, 'https://forening.pages.dev/api/vipps/callback');
  assert.equal(body.transaction.amount.value, 70000);
  assert.equal(body.transaction.amount.currency, 'NOK');
  assert.ok(body.transaction.paymentDescription.includes('2 x kake (Stor)'));
  assert.ok(body.transaction.paymentDescription.length <= 100);
});
