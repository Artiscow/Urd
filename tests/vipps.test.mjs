/**
 * Contract tests for the Vipps MobilePay part of the payment layer
 * (functions/_lib/vipps.js, ADR-0020): configuration reading, the payment
 * body for the ePayment API in the app and on the card page, the receipt
 * lines, the reading of a payment's state, the token cache and the webhook
 * signature. The order logic every provider shares is tested in
 * tests/order.test.mjs; the endpoints and the actual payment are tested
 * manually against the test environment (the test rounds).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac, createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import {
  vippsConfig, receiptLines, buildPayment, PROFILE_SCOPE, VIPPS_METHODS, paymentSummary, OPEN_STATES,
  webhookSignature, signatureOf, verifyWebhook,
} from '../template/functions/_lib/vipps.js';
import { tokenFromAnswer, tokenFresh } from '../template/functions/_lib/net.js';

const ENV = {
  VIPPS_CLIENT_ID: 'id',
  VIPPS_CLIENT_SECRET: 'secret',
  VIPPS_SUBSCRIPTION_KEY: 'sub',
  VIPPS_MSN: '123456',
};

// Deliberate Norwegian fixture ids and names: this is user catalog data.
const CATALOGS = [
  { kind: 'products', entries: [{ id: 'kake', title: 'Sjokoladekake', price: 350 }, { id: 'boller', title: 'Kanelboller', price: 49.5 }, { id: 'gratis' }] },
];

test('vippsConfig: null without all the secrets, default api base otherwise, the webhook secret optional', () => {
  assert.equal(vippsConfig({}), null);
  assert.equal(vippsConfig({ ...ENV, VIPPS_MSN: '' }), null);
  const config = vippsConfig(ENV);
  assert.equal(config.apiBase, 'https://api.vipps.no');
  assert.equal(config.webhookSecret, '');
  assert.equal(vippsConfig({ ...ENV, VIPPS_API_BASE: 'https://apitest.vipps.no' }).apiBase, 'https://apitest.vipps.no');
  assert.equal(vippsConfig({ ...ENV, VIPPS_WEBHOOK_SECRET: 'whs' }).webhookSecret, 'whs');
});

test('receiptLines: the lines in the minor unit with the title and the variant, the tax at zero; a priceless product gives none', () => {
  const lines = receiptLines([{ id: 'kake', qty: 2, variant: 'Stor' }, { id: 'boller', qty: 1 }], CATALOGS);
  assert.equal(lines.length, 2);
  assert.deepEqual(lines[0], {
    name: 'Sjokoladekake (Stor)', id: 'kake', totalAmount: 70000, totalAmountExcludingTax: 70000, totalTaxAmount: 0, taxRate: 0,
    unitInfo: { unitPrice: 35000, quantity: '2', quantityUnit: 'PCS' },
  });
  assert.equal(lines[1].name, 'Kanelboller');
  assert.equal(lines[1].totalAmount, 4950);
  assert.equal(receiptLines([{ id: 'gratis', qty: 1 }], CATALOGS), null);
  assert.equal(receiptLines([{ id: 'ukjent', qty: 1 }], CATALOGS), null);
});

test('buildPayment: a wallet payment by web redirect, the return on own origin with the reference and the provider, the amount in the currency, the profile asked for', () => {
  const body = buildPayment({
    amountMinor: 70000,
    reference: 'urd-abc123def456',
    order: [{ id: 'kake', qty: 2, variant: 'Stor' }],
    contact: { name: 'Kari', email: 'kari@forening.no', phone: '', comment: '' },
    origin: 'https://forening.pages.dev',
    returnPath: '/kasse',
  });
  assert.equal(body.returnUrl, 'https://forening.pages.dev/kasse?ordered=urd-abc123def456&via=vipps');
  assert.deepEqual(body.amount, { currency: 'NOK', value: 70000 });
  assert.deepEqual(body.paymentMethod, { type: 'WALLET' });
  assert.equal(body.userFlow, 'WEB_REDIRECT');
  assert.equal(body.reference, 'urd-abc123def456');
  assert.equal(body.profile.scope, PROFILE_SCOPE);
  assert.equal(PROFILE_SCOPE, 'name email phoneNumber');
  assert.ok(body.paymentDescription.includes('2 x kake (Stor)'));
  assert.ok(body.paymentDescription.includes('Kari / kari@forening.no'));
  assert.ok(body.paymentDescription.length >= 3 && body.paymentDescription.length <= 100);
  assert.equal(body.receipt, undefined, 'no receipt unless lines are given');
  assert.equal('merchantInfo' in body, false, 'nothing of the Checkout session shape');
});

test('buildPayment: the card page takes CARD without a profile scope, the currency follows the site, the receipt carries the lines with the currency on the bottom line', () => {
  const card = buildPayment({ amountMinor: 100, currency: 'DKK', reference: 'urd-' + 'a'.repeat(24), order: [{ id: 'kake', qty: 1 }], contact: {}, origin: 'https://site.no', returnPath: '/', method: 'card', receipt: receiptLines([{ id: 'kake', qty: 1 }], CATALOGS) });
  assert.deepEqual(card.paymentMethod, { type: 'CARD' });
  assert.equal(card.profile, undefined);
  assert.equal(card.amount.currency, 'DKK');
  assert.equal(card.receipt.orderLines.length, 1);
  assert.deepEqual(card.receipt.bottomLine, { currency: 'DKK' });
  assert.deepEqual(VIPPS_METHODS, ['wallet', 'card']);
  const order = Array.from({ length: 12 }, (_, i) => ({ id: `produkt-${i}`, qty: 1 }));
  const long = buildPayment({ amountMinor: 100, reference: 'urd-x', order, contact: {}, origin: 'https://site.no', returnPath: '/', receipt: [] });
  assert.equal(long.paymentDescription.length, 100);
  assert.equal(long.receipt, undefined);
});

test('paymentSummary: reserved only in AUTHORIZED, open only in CREATED, the state as a word or the first of a list, the buyer from the shared profile', () => {
  const paid = paymentSummary({ state: 'AUTHORIZED', userDetails: { firstName: ' Kari ', lastName: 'Nordmann', email: 'kari@forening.no', mobileNumber: '4712345678' } });
  assert.equal(paid.paid, true);
  assert.equal(paid.open, false);
  assert.equal(paid.state, 'AUTHORIZED');
  assert.deepEqual(paid.buyer, { name: 'Kari Nordmann', email: 'kari@forening.no', phone: '4712345678' });
  const open = paymentSummary({ state: ['CREATED'] });
  assert.equal(open.paid, false);
  assert.equal(open.open, true);
  assert.equal(open.state, 'CREATED');
  assert.deepEqual(open.buyer, { name: '', email: '', phone: '' });
  for (const state of ['ABORTED', 'EXPIRED', 'TERMINATED']) {
    assert.equal(paymentSummary({ state }).paid, false, state);
    assert.equal(paymentSummary({ state }).open, false, state);
  }
  assert.equal(paymentSummary({}), null);
  assert.equal(paymentSummary(null), null);
  assert.deepEqual(OPEN_STATES, ['CREATED']);
});

test('tokenFromAnswer and tokenFresh: the token kept until a minute before expires_on, or expires_in from now; nothing without a token', () => {
  const now = 1_700_000_000;
  const kept = tokenFromAnswer({ access_token: 'tok', expires_in: '86398', expires_on: String(now + 86398) }, now);
  assert.deepEqual(kept, { token: 'tok', until: now + 86398 - 60 });
  assert.equal(tokenFromAnswer({ access_token: 'tok', expires_in: 3600 }, now).until, now + 3540);
  assert.equal(tokenFromAnswer({ expires_in: 3600 }, now), null);
  assert.equal(tokenFresh(kept, now + 86000), true);
  assert.equal(tokenFresh(kept, now + 86398), false);
  assert.equal(tokenFresh(null, now), false);
});

/** The signature the way the Webhooks API documents it, computed with node's own crypto. */
function expectedSignature({ pathAndQuery, date, host, body }, secret) {
  const contentHash = createHash('sha256').update(body).digest('base64');
  const signature = createHmac('sha256', secret).update(`POST\n${pathAndQuery}\n${date};${host};${contentHash}`).digest('base64');
  return { contentHash, signature };
}

const DELIVERY = {
  pathAndQuery: '/api/pay/vipps/webhook',
  date: 'Thu, 30 Mar 2023 08:38:32 GMT',
  host: 'forening.pages.dev',
  body: JSON.stringify({ msn: '123456', reference: 'urd-' + 'a'.repeat(24), name: 'AUTHORIZED', success: true }),
};

test('webhookSignature: HMAC-SHA256 over method, path, date, host and the body hash, keyed with the secret', async () => {
  const ours = await webhookSignature(DELIVERY, 'whs');
  assert.deepEqual(ours, expectedSignature(DELIVERY, 'whs'));
  assert.notEqual((await webhookSignature(DELIVERY, 'other')).signature, ours.signature);
  assert.notEqual((await webhookSignature({ ...DELIVERY, body: DELIVERY.body + ' ' }, 'whs')).contentHash, ours.contentHash);
});

test('signatureOf: the Signature of the documented Authorization form, nothing from any other header', () => {
  assert.equal(signatureOf('HMAC-SHA256 SignedHeaders=x-ms-date;host;x-ms-content-sha256&Signature=abc+/='), 'abc+/=');
  assert.equal(signatureOf('Bearer abc'), '');
  assert.equal(signatureOf('HMAC-SHA256 SignedHeaders=host&Signature=abc'), '');
  assert.equal(signatureOf(null), '');
});

test('verifyWebhook: a delivery signed with the secret passes; a changed body, a wrong secret, a missing header or no secret fails', async () => {
  const { contentHash, signature } = expectedSignature(DELIVERY, 'whs');
  const headers = (over = {}) => new Map(Object.entries({
    'x-ms-date': DELIVERY.date,
    'x-ms-content-sha256': contentHash,
    authorization: `HMAC-SHA256 SignedHeaders=x-ms-date;host;x-ms-content-sha256&Signature=${signature}`,
    ...over,
  }));
  const delivery = (over = {}) => ({ method: 'POST', pathAndQuery: DELIVERY.pathAndQuery, host: DELIVERY.host, headers: headers(), body: DELIVERY.body, ...over });
  assert.equal(await verifyWebhook(delivery(), 'whs'), true);
  assert.equal(await verifyWebhook(delivery({ body: DELIVERY.body.replace('true', 'false') }), 'whs'), false, 'a changed body');
  assert.equal(await verifyWebhook(delivery(), 'other'), false, 'a wrong secret');
  assert.equal(await verifyWebhook(delivery({ host: 'evil.example' }), 'whs'), false, 'another host');
  assert.equal(await verifyWebhook(delivery({ headers: headers({ authorization: 'Bearer x' }) }), 'whs'), false, 'another header form');
  assert.equal(await verifyWebhook(delivery({ headers: headers({ 'x-ms-date': null }) }), 'whs'), false, 'a missing date');
  assert.equal(await verifyWebhook(delivery(), ''), false, 'no secret configured');
});

test('the Checkout API is gone from the functions, and the Vipps endpoints stand under the shared payment path', () => {
  const dir = new URL('../template/functions/', import.meta.url);
  const files = [];
  const walk = (base) => {
    for (const entry of readdirSync(base, { withFileTypes: true })) {
      const path = new URL(entry.name + (entry.isDirectory() ? '/' : ''), base);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith('.js')) files.push(path);
    }
  };
  walk(dir);
  for (const file of files) assert.ok(!readFileSync(file, 'utf8').includes('checkout/v3'), `${file.pathname} still calls the Checkout API`);
  for (const name of ['checkout', 'session', 'webhook']) assert.ok(files.some((f) => f.pathname.endsWith(`/api/pay/vipps/${name}.js`)), `the ${name} endpoint exists`);
  assert.ok(!files.some((f) => /\/api\/vipps\//.test(f.pathname)), 'the earlier path is gone');
});
