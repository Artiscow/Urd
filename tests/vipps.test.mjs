/**
 * Contract tests for the payment layer's pure logic (functions/_lib/vipps.js,
 * ADR-0020): configuration reading, payload validation (never the client's
 * prices), ore conversion against the catalog and the session body. The
 * endpoint and the actual payment are tested manually against the MT
 * environment (the test rounds).
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

// Deliberate Norwegian fixture ids and names: this is user catalog data.
const CATALOGS = [
  { kind: 'products', entries: [{ id: 'kake', price: 350 }, { id: 'boller', price: 49.5 }, { id: 'gratis' }] },
  { kind: 'news', entries: [{ id: 'kake', price: 1 }] },
];

test('vippsConfig: null without all the secrets, default api base otherwise', () => {
  assert.equal(vippsConfig({}), null);
  assert.equal(vippsConfig({ ...ENV, VIPPS_MSN: '' }), null);
  const config = vippsConfig(ENV);
  assert.equal(config.apiBase, 'https://api.vipps.no');
  assert.equal(vippsConfig({ ...ENV, VIPPS_API_BASE: 'https://apitest.vipps.no' }).apiBase, 'https://apitest.vipps.no');
});

test('validOrderPayload: cleans lines and contact, clamps quantity, rejects nonsense', () => {
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

test('validOrderPayload: return path must be internal; anything else gives the root', () => {
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1 }], returnPath: 'https://ond.no/' }).returnPath, '/');
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1 }], returnPath: '//ond.no' }).returnPath, '/');
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1 }] }).returnPath, '/');
});

test('orderAmountOre: computes from the catalog, never the client; unknown/priceless id rejects', () => {
  assert.equal(orderAmountOre([{ id: 'kake', qty: 2 }], CATALOGS), 70000);
  assert.equal(orderAmountOre([{ id: 'boller', qty: 1 }], CATALOGS), 4950);
  assert.equal(orderAmountOre([{ id: 'ukjent', qty: 1 }], CATALOGS), null);
  assert.equal(orderAmountOre([{ id: 'gratis', qty: 1 }], CATALOGS), null);
});

test('orderAmountOre: only products collections count', () => {
  assert.equal(orderAmountOre([{ id: 'kake', qty: 1 }], [{ kind: 'news', entries: [{ id: 'kake', price: 1 }] }]), null);
});

test('makeReference: the Vipps shape [a-zA-Z0-9-]{8,50}', () => {
  const ref = makeReference();
  assert.match(ref, /^[a-zA-Z0-9-]{8,50}$/);
  assert.notEqual(makeReference(), ref);
});

test('buildSession: return URL on own origin, amount in ore, description with lines', () => {
  const body = buildSession({
    amountOre: 70000,
    reference: 'urd-abc123def456',
    order: [{ id: 'kake', qty: 2, variant: 'Stor' }],
    contact: { name: 'Kari', email: 'kari@forening.no', phone: '', comment: '' },
    origin: 'https://forening.pages.dev',
    returnPath: '/kasse',
    callbackToken: 'urd-token',
  });
  assert.equal(body.merchantInfo.returnUrl, 'https://forening.pages.dev/kasse?ordered=1');
  assert.equal(body.merchantInfo.callbackUrl, 'https://forening.pages.dev/api/vipps/callback');
  assert.equal(body.transaction.amount.value, 70000);
  assert.equal(body.transaction.amount.currency, 'NOK');
  assert.ok(body.transaction.paymentDescription.includes('2 x kake (Stor)'));
  assert.ok(body.transaction.paymentDescription.length <= 100);
});
