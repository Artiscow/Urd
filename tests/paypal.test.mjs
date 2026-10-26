/**
 * Contract tests for the PayPal part of the payment layer
 * (functions/_lib/paypal.js, ADR-0028): configuration reading, PayPal's
 * decimal amounts and its currencies, the order body, the approval address,
 * the reading of an order, and the body of the webhook check with the event
 * sent back unchanged. The endpoints run against a stubbed PayPal in
 * tests/pay-endpoints.test.mjs; the real payment is tested in PayPal's
 * sandbox (the test rounds).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  paypalConfig, paypalValue, PAYPAL_CURRENCIES, buildOrder, approvalUrl, isOrderId, orderSummary, verificationBody,
} from '../template/functions/_lib/paypal.js';

// Deliberate Norwegian fixture ids and names: this is user catalog data.
const CATALOGS = [{ kind: 'products', entries: [{ id: 'kake', title: 'Sjokoladekake', price: 350 }, { id: 'boller', title: 'Kanelboller', price: 49.5 }, { id: 'gratis' }] }];
const REF = 'urd-' + 'a'.repeat(24);

test('paypalConfig: null without the client id and secret; the live API by default, the sandbox and the webhook id optional', () => {
  assert.equal(paypalConfig({}), null);
  assert.equal(paypalConfig({ PAYPAL_CLIENT_ID: 'id' }), null);
  const config = paypalConfig({ PAYPAL_CLIENT_ID: 'id', PAYPAL_CLIENT_SECRET: 'sec' });
  assert.equal(config.apiBase, 'https://api-m.paypal.com');
  assert.equal(config.webhookId, '');
  assert.equal(paypalConfig({ PAYPAL_CLIENT_ID: 'id', PAYPAL_CLIENT_SECRET: 'sec', PAYPAL_API_BASE: 'https://api-m.sandbox.paypal.com', PAYPAL_WEBHOOK_ID: 'WH-1' }).webhookId, 'WH-1');
});

test('paypalValue: two decimals in most currencies, whole units where PayPal refuses decimals, nothing in a currency PayPal lacks', () => {
  assert.equal(paypalValue(70000, 'NOK'), '700.00');
  assert.equal(paypalValue(4950, 'eur'), '49.50');
  assert.equal(paypalValue(350, 'JPY'), '350');
  assert.equal(paypalValue(35000, 'HUF'), '350', 'forint in whole units');
  assert.equal(paypalValue(4950, 'HUF'), null, 'a fraction of a forint cannot be charged');
  assert.equal(paypalValue(100, 'ISK'), null, 'PayPal does not take ISK');
  assert.equal(paypalValue(1.5, 'NOK'), null);
  for (const code of ['NOK', 'DKK', 'SEK', 'EUR', 'GBP', 'USD']) assert.ok(PAYPAL_CURRENCIES.includes(code), code);
});

test('buildOrder: a captured order with the lines as items in the site currency, the reference on the unit, and PayPal\'s page returning to the checkout', () => {
  const body = buildOrder({
    order: [{ id: 'kake', qty: 2, variant: 'Stor' }, { id: 'boller', qty: 1 }],
    catalogs: CATALOGS,
    currency: 'NOK',
    reference: REF,
    contact: { name: 'Kari', email: 'kari@forening.no' },
    origin: 'https://forening.pages.dev',
    returnPath: '/kasse',
    brand: 'Apeiron Linjeforening',
  });
  assert.equal(body.intent, 'CAPTURE', 'PayPal takes the money at the order (ADR-0028)');
  const unit = body.purchase_units[0];
  assert.equal(unit.reference_id, REF);
  assert.equal(unit.custom_id, REF);
  assert.equal(unit.invoice_id, REF);
  assert.deepEqual(unit.amount, { currency_code: 'NOK', value: '749.50', breakdown: { item_total: { currency_code: 'NOK', value: '749.50' } } });
  assert.deepEqual(unit.items[0], { name: 'Sjokoladekake (Stor)', sku: 'kake', quantity: '2', unit_amount: { currency_code: 'NOK', value: '350.00' } });
  assert.ok(unit.description.startsWith('2 x kake (Stor), 1 x boller'));
  const page = body.payment_source.paypal.experience_context;
  assert.equal(page.return_url, `https://forening.pages.dev/kasse?ordered=${REF}&via=paypal`);
  assert.equal(page.cancel_url, 'https://forening.pages.dev/kasse');
  const fromDraft = buildOrder({ order: [{ id: 'boller', qty: 1 }], catalogs: CATALOGS, reference: REF, contact: {}, origin: 'https://forening.pages.dev', returnPath: '/kasse', draft: true }).payment_source.paypal.experience_context;
  assert.equal(fromDraft.return_url, `https://forening.pages.dev/kasse?draft=1&ordered=${REF}&via=paypal`);
  assert.equal(fromDraft.cancel_url, 'https://forening.pages.dev/kasse?draft=1');
  assert.equal(page.user_action, 'PAY_NOW');
  assert.equal(page.shipping_preference, 'NO_SHIPPING');
  assert.equal(page.brand_name, 'Apeiron Linjeforening');
});

test('buildOrder: nothing for a priceless product, a currency PayPal lacks, or a fraction where PayPal takes whole units', () => {
  const base = { order: [{ id: 'kake', qty: 1 }], catalogs: CATALOGS, reference: REF, contact: {}, origin: 'https://s.no', returnPath: '/' };
  assert.equal(buildOrder({ ...base, order: [{ id: 'gratis', qty: 1 }] }), null);
  assert.equal(buildOrder({ ...base, currency: 'ISK' }), null);
  assert.equal(buildOrder({ ...base, order: [{ id: 'boller', qty: 1 }], currency: 'HUF' }), null);
  assert.equal(buildOrder({ ...base, currency: 'JPY' }).purchase_units[0].amount.value, '350');
  assert.equal(buildOrder(base).payment_source.paypal.experience_context.brand_name, undefined, 'no brand without a title');
});

test('approvalUrl: the payer-action link, the approve link as the earlier name, nothing that is not https', () => {
  assert.equal(approvalUrl({ links: [{ rel: 'self', href: 'https://api-m.paypal.com/v2/checkout/orders/5O1' }, { rel: 'payer-action', href: 'https://www.paypal.com/checkoutnow?token=5O1' }] }), 'https://www.paypal.com/checkoutnow?token=5O1');
  assert.equal(approvalUrl({ links: [{ rel: 'approve', href: 'https://www.sandbox.paypal.com/checkoutnow?token=5O1' }] }), 'https://www.sandbox.paypal.com/checkoutnow?token=5O1');
  assert.equal(approvalUrl({ links: [{ rel: 'payer-action', href: 'javascript:alert(1)' }] }), null);
  assert.equal(approvalUrl({}), null);
});

test('isOrderId: the ids PayPal makes, nothing else', () => {
  assert.equal(isOrderId('5O190127TN364715T'), true);
  for (const bad of ['5o190127tn364715t', 'SHORT', '5O190127TN364715T/..', '', null]) assert.equal(isOrderId(bad), false, String(bad));
});

test('orderSummary: paid only for a completed capture; approved waits for the capture; open while the buyer may still approve; the payer\'s name', () => {
  const done = orderSummary({
    status: 'COMPLETED',
    payer: { name: { given_name: 'Kari', surname: 'Nordmann' }, email_address: 'kari@forening.no' },
    purchase_units: [{ reference_id: REF, payments: { captures: [{ id: '3C6', status: 'COMPLETED' }] } }],
  });
  assert.deepEqual(done, { paid: true, open: false, approved: false, state: 'COMPLETED:COMPLETED', buyer: { name: 'Kari Nordmann', email: 'kari@forening.no', phone: '' }, reference: REF });
  const approved = orderSummary({ status: 'APPROVED', purchase_units: [{ reference_id: REF }] });
  assert.equal(approved.approved, true);
  assert.equal(approved.paid, false);
  const pending = orderSummary({ status: 'COMPLETED', purchase_units: [{ payments: { captures: [{ status: 'PENDING' }] } }] });
  assert.equal(pending.paid, false, 'a capture held for review is not confirmed');
  assert.equal(orderSummary({ status: 'PAYER_ACTION_REQUIRED' }).open, true);
  assert.equal(orderSummary({ status: 'VOIDED' }).open, false);
  assert.equal(orderSummary({}), null);
});

test('verificationBody: the five delivery headers, the webhook id and the event exactly as it arrived; nothing when a header or the event is missing', () => {
  const headers = (over = {}) => new Map(Object.entries({
    'paypal-auth-algo': 'SHA256withRSA',
    'paypal-cert-url': 'https://api.paypal.com/v1/notifications/certs/CERT-360caa42',
    'paypal-transmission-id': '69cd13f0-d67a-11e5-baa3-778b53f4ae55',
    'paypal-transmission-sig': 'lmI95Jx3Y9nhR5SJWlHVIWpg4AgFk7n9bCHSRxbrd8A9zrhdu2rMyFrmz+Zjh3s3boXB07VXCXUZy/UFzUlnGJn0wDugt7FlSvdKeIJenLRemUxYCPVoEZzg9VFNqOa48gMkvF+XTpxBeUx/kWy6B5cp7GkT2+pOowfRK7OaynuxUoKW3JcMWw272VKjLTtTAShncla7tGF+55rxyt2KNZIIqxNMJ48RDZheGU5w1npu9dZHnPgTXB9iomeVRoD8O/jhRpnKsGrDschyNdkeh81BJJMH4Ctc6lnCCquoP/GzCzz33MMsNdid7vL/NIWaCsekQpW26FpWPi/tfj8nLA==',
    'paypal-transmission-time': '2016-02-18T20:01:35Z',
    ...over,
  }));
  const raw = '{"id":"WH-COC11055RA711503B-4YM959094A144403T","event_type":"PAYMENT.CAPTURE.COMPLETED","resource":{"amount":{"value":"749.50"}}}';
  const body = verificationBody(headers(), raw, 'WH-1');
  const parsed = JSON.parse(body);
  assert.equal(parsed.auth_algo, 'SHA256withRSA');
  assert.equal(parsed.transmission_id, '69cd13f0-d67a-11e5-baa3-778b53f4ae55');
  assert.equal(parsed.webhook_id, 'WH-1');
  assert.deepEqual(parsed.webhook_event, JSON.parse(raw));
  assert.ok(body.endsWith(`"webhook_event":${raw}}`), 'the event goes back byte for byte');
  assert.equal(verificationBody(headers({ 'paypal-transmission-sig': null }), raw, 'WH-1'), null);
  assert.equal(verificationBody(headers(), 'not json', 'WH-1'), null);
  assert.equal(verificationBody(headers(), '[1,2]', 'WH-1'), null);
  assert.equal(verificationBody(headers(), raw, ''), null, 'no webhook id configured');
});
