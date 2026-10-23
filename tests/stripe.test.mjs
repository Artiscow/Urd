/**
 * Contract tests for the Stripe part of the payment layer
 * (functions/_lib/stripe.js, ADR-0028): configuration reading, the page
 * language, the Checkout Session's form fields, the reading of a finished
 * session, and the webhook signature with its replay window. The endpoints
 * are run against a stubbed Stripe in tests/pay-endpoints.test.mjs; the real
 * payment is tested in Stripe's test mode (the test rounds).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import {
  stripeConfig, stripeLocale, sessionForm, isSessionId, sessionSummary,
  parseStripeSignature, stripeSignature, verifyStripeWebhook, SIGNATURE_TOLERANCE,
} from '../template/functions/_lib/stripe.js';

// Deliberate Norwegian fixture ids and names: this is user catalog data.
const CATALOGS = [{ kind: 'products', entries: [{ id: 'kake', title: 'Sjokoladekake', price: 350 }, { id: 'boller', title: 'Kanelboller', price: 49.5 }, { id: 'gratis' }] }];

test('stripeConfig: null without a secret key of Stripe\'s form, the API base and the webhook secret optional', () => {
  assert.equal(stripeConfig({}), null);
  assert.equal(stripeConfig({ STRIPE_SECRET_KEY: 'pk_test_abc' }), null, 'a publishable key is no secret key');
  assert.equal(stripeConfig({ STRIPE_SECRET_KEY: 'sk_test_abc def' }), null);
  const config = stripeConfig({ STRIPE_SECRET_KEY: 'sk_test_abc123' });
  assert.equal(config.apiBase, 'https://api.stripe.com');
  assert.equal(config.webhookSecret, '');
  assert.equal(stripeConfig({ STRIPE_SECRET_KEY: 'rk_live_abc', STRIPE_WEBHOOK_SECRET: 'whsec_x' }).webhookSecret, 'whsec_x', 'a restricted key works too');
});

test('stripeLocale: bokmål for the Norwegian and Sami codes, the site\'s code or its base when Stripe has it, the browser otherwise', () => {
  for (const lang of ['no', 'nb', 'nn', 'se', 'nb-NO']) assert.equal(stripeLocale(lang), 'nb', lang);
  assert.equal(stripeLocale('en-GB'), 'en-GB');
  assert.equal(stripeLocale('tr'), 'tr');
  assert.equal(stripeLocale('sv-FI'), 'sv');
  assert.equal(stripeLocale('xx'), 'auto');
  assert.equal(stripeLocale(undefined), 'auto');
});

test('sessionForm: payment mode, the lines as price data in the currency\'s minor unit, the return with reference and provider, and the reference on session and payment', () => {
  const fields = sessionForm({
    order: [{ id: 'kake', qty: 2, variant: 'Stor' }, { id: 'boller', qty: 1 }],
    catalogs: CATALOGS,
    currency: 'EUR',
    reference: 'urd-' + 'a'.repeat(24),
    contact: { name: 'Kari', email: 'kari@forening.no', phone: '' },
    origin: 'https://forening.pages.dev',
    returnPath: '/kasse',
    lang: 'nb',
  });
  const form = Object.fromEntries(fields);
  assert.equal(form.mode, 'payment');
  assert.equal(form.client_reference_id, 'urd-' + 'a'.repeat(24));
  assert.equal(form.success_url, `https://forening.pages.dev/kasse?ordered=urd-${'a'.repeat(24)}&via=stripe`);
  assert.equal(form.cancel_url, 'https://forening.pages.dev/kasse');
  assert.equal(form.locale, 'nb');
  assert.equal(form.customer_email, 'kari@forening.no');
  assert.equal(form['payment_intent_data[capture_method]'], 'manual', 'held by default: the seller captures at shipping');
  assert.equal(form['payment_intent_data[metadata][reference]'], 'urd-' + 'a'.repeat(24));
  assert.ok(form['payment_intent_data[description]'].startsWith('2 x kake (Stor), 1 x boller'));
  assert.equal(form['line_items[0][quantity]'], '2');
  assert.equal(form['line_items[0][price_data][currency]'], 'eur');
  assert.equal(form['line_items[0][price_data][unit_amount]'], '35000');
  assert.equal(form['line_items[0][price_data][product_data][name]'], 'Sjokoladekake (Stor)');
  assert.equal(form['line_items[1][price_data][unit_amount]'], '4950');
  assert.equal(new URLSearchParams(fields).get('success_url'), form.success_url, 'the form encodes and decodes back');
});

test('sessionForm: capture now takes the money at once; a zero-decimal currency counts whole units; no email without one; a priceless product makes no session', () => {
  const base = { order: [{ id: 'kake', qty: 1 }], catalogs: CATALOGS, reference: 'urd-' + 'b'.repeat(24), contact: { email: 'not an email' }, origin: 'https://s.no', returnPath: '/' };
  const now = Object.fromEntries(sessionForm({ ...base, capture: 'now', currency: 'JPY' }));
  assert.equal(now['payment_intent_data[capture_method]'], undefined);
  assert.equal(now['line_items[0][price_data][unit_amount]'], '350', 'JPY has no minor unit');
  assert.equal(now['line_items[0][price_data][currency]'], 'jpy');
  assert.equal(now.customer_email, undefined);
  assert.equal(sessionForm({ ...base, order: [{ id: 'gratis', qty: 1 }] }), null);
});

test('isSessionId: the ids Stripe makes, nothing else', () => {
  assert.equal(isSessionId('cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u'), true);
  assert.equal(isSessionId('cs_live_abcdefghij'), true);
  for (const bad of ['cs_test_short', 'pi_test_abcdefghijkl', 'cs_test_abcdefghij/..', '', null]) assert.equal(isSessionId(bad), false, String(bad));
});

test('sessionSummary: paid when complete and paid, or held for capture, or captured; open while open; the details Stripe collected', () => {
  const held = sessionSummary({ status: 'complete', payment_status: 'unpaid', payment_intent: { status: 'requires_capture' }, client_reference_id: 'urd-x', customer_details: { name: ' Kari Nordmann ', email: 'kari@forening.no', phone: '+4712345678' } });
  assert.deepEqual(held, { paid: true, open: false, state: 'complete:requires_capture', buyer: { name: 'Kari Nordmann', email: 'kari@forening.no', phone: '+4712345678' }, reference: 'urd-x' });
  assert.equal(sessionSummary({ status: 'complete', payment_status: 'paid', payment_intent: 'pi_123' }).paid, true, 'paid without the intent expanded');
  assert.equal(sessionSummary({ status: 'complete', payment_status: 'unpaid', payment_intent: { status: 'succeeded' } }).paid, true);
  const processing = sessionSummary({ status: 'complete', payment_status: 'unpaid', payment_intent: { status: 'processing' } });
  assert.equal(processing.paid, false, 'a method that settles over days is not confirmed on the return');
  assert.equal(processing.open, false);
  assert.equal(sessionSummary({ status: 'open', payment_status: 'unpaid' }).open, true);
  assert.equal(sessionSummary({ status: 'expired' }).paid, false);
  assert.equal(sessionSummary({ status: 'expired' }).open, false);
  assert.equal(sessionSummary({}), null);
  assert.equal(sessionSummary(null), null);
});

test('parseStripeSignature: the timestamp and every v1 signature; other schemes and malformed parts ignored', () => {
  const v1a = 'a'.repeat(64);
  const v1b = 'b'.repeat(64);
  assert.deepEqual(parseStripeSignature(`t=1492774577,v1=${v1a},v0=${'c'.repeat(64)},v1=${v1b}`), { t: 1492774577, v1: [v1a, v1b] });
  assert.equal(parseStripeSignature(`t=1492774577,v0=${v1a}`), null, 'a v0 test signature alone signs nothing');
  assert.equal(parseStripeSignature(`v1=${v1a}`), null, 'no timestamp');
  assert.equal(parseStripeSignature('t=abc,v1=xyz'), null);
  assert.equal(parseStripeSignature(null), null);
});

test('stripeSignature: hex HMAC-SHA256 of «timestamp.body» keyed with the secret, as Stripe documents it', async () => {
  const body = '{"id":"evt_1","type":"checkout.session.completed"}';
  const expected = createHmac('sha256', 'whsec_test').update(`1700000000.${body}`).digest('hex');
  assert.equal(await stripeSignature(1700000000, body, 'whsec_test'), expected);
});

test('verifyStripeWebhook: a recent delivery signed with the secret passes; a changed body, a wrong secret, an old timestamp or no secret fails', async () => {
  const now = 1_700_000_000;
  const body = '{"id":"evt_1","type":"checkout.session.completed","data":{"object":{"client_reference_id":"urd-x"}}}';
  const sign = (t, secret = 'whsec_test', payload = body) => createHmac('sha256', secret).update(`${t}.${payload}`).digest('hex');
  const header = (t, sig = sign(t)) => `t=${t},v1=${sig}`;
  assert.equal(await verifyStripeWebhook({ header: header(now), body, now }, 'whsec_test'), true);
  assert.equal(await verifyStripeWebhook({ header: `t=${now},v1=${'0'.repeat(64)},v1=${sign(now)}`, body, now }, 'whsec_test'), true, 'one of several v1 signatures while a secret rolls');
  assert.equal(await verifyStripeWebhook({ header: header(now), body: body.replace('urd-x', 'urd-y'), now }, 'whsec_test'), false, 'a changed body');
  assert.equal(await verifyStripeWebhook({ header: header(now), body, now }, 'whsec_other'), false, 'a wrong secret');
  assert.equal(await verifyStripeWebhook({ header: header(now - SIGNATURE_TOLERANCE - 1), body, now }, 'whsec_test'), false, 'a replayed old delivery');
  assert.equal(await verifyStripeWebhook({ header: header(now + SIGNATURE_TOLERANCE), body, now }, 'whsec_test'), true, 'inside the tolerance');
  assert.equal(await verifyStripeWebhook({ header: null, body, now }, 'whsec_test'), false);
  assert.equal(await verifyStripeWebhook({ header: header(now), body, now }, ''), false, 'no secret configured');
});
