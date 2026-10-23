/**
 * The payment layer's endpoints (functions/api/pay/<provider>/, ADR-0020 and
 * ADR-0028) run against a stubbed network: the site's own files (the
 * catalogue, the site file) and the provider's API answer from fixtures, and
 * every call the endpoint makes is recorded. This holds the request each
 * provider receives (path, headers, body), the answer the checkout page gets,
 * the check of the return, the webhook's signature gate, and the 503 without
 * secrets, for Vipps MobilePay, Stripe and PayPal. The real payments are tested in the providers' test environments.
 */
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac, createHash } from 'node:crypto';

const FN = new URL('../template/functions/api/pay/', import.meta.url);
const vipps = {
  checkout: await import(new URL('vipps/checkout.js', FN).href),
  session: await import(new URL('vipps/session.js', FN).href),
  webhook: await import(new URL('vipps/webhook.js', FN).href),
};
const stripe = {
  checkout: await import(new URL('stripe/checkout.js', FN).href),
  session: await import(new URL('stripe/session.js', FN).href),
  webhook: await import(new URL('stripe/webhook.js', FN).href),
};
const paypal = {
  checkout: await import(new URL('paypal/checkout.js', FN).href),
  session: await import(new URL('paypal/session.js', FN).href),
  webhook: await import(new URL('paypal/webhook.js', FN).href),
};

const ORIGIN = 'https://forening.pages.dev';
/** The host a call goes to, compared exactly; a URL that cannot be parsed has none. */
const hostOf = (url) => { try { return new URL(url).host; } catch { return ''; } };
/** Whether a call went to PayPal: its host is paypal.com or a subdomain of it. */
const toPayPal = (call) => { const h = hostOf(call.url); return h === 'paypal.com' || h.endsWith('.paypal.com'); };
const REF_RE = /^urd-[0-9a-f]{24}$/;
// Deliberate Norwegian fixture ids and names: this is user catalog data.
const SHOP = {
  '/content/samlinger.json': { samlinger: ['produkter'] },
  '/content/samlinger/produkter.json': { kind: 'products', entries: [{ id: 'kake', title: 'Kake', price: 350, sizes: ['Stor'] }] },
};
/** The checkout block on the page the orders return to; the tests set its capture mode. */
let PAGE_CAPTURE = 'ship';
const PAGES = [{ id: 'kasse', path: '/kasse' }];
const pageFile = () => ({ sections: [{ blocks: [{ type: 'checkout', props: { payments: { vipps: true, card: 'stripe', paypal: false, capture: PAGE_CAPTURE, manual: [] } } }] }] });

const realFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = realFetch; });

/**
 * Stubs fetch: the site's own files from SHOP plus the site file, and the
 * provider's API from a handler; returns the recorded calls.
 */
function stubNetwork(site, provider) {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    const call = { url: String(url), method: init.method ?? 'GET', headers: init.headers ?? {}, body: init.body };
    calls.push(call);
    const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
    if (hostOf(call.url) === hostOf(ORIGIN)) {
      const path = new URL(call.url).pathname;
      if (path === '/content/site.json') return json({ site: { pages: PAGES, ...site } });
      if (path === '/content/pages/kasse.json') return json(pageFile());
      return SHOP[path] ? json(SHOP[path]) : new Response('not found', { status: 404 });
    }
    return provider(call, json);
  };
  return calls;
}

const order = (extra = {}) => new Request(`${ORIGIN}/api/pay/x/checkout`, {
  method: 'POST',
  body: JSON.stringify({ order: [{ id: 'kake', qty: 2, variant: 'Stor' }], contact: { name: 'Kari', email: 'kari@forening.no' }, returnPath: '/kasse', ...extra }),
});

const VIPPS_ENV = { VIPPS_CLIENT_ID: 'id', VIPPS_CLIENT_SECRET: 'sec', VIPPS_SUBSCRIPTION_KEY: 'sub', VIPPS_MSN: '123456', VIPPS_API_BASE: 'https://apitest.vipps.no', VIPPS_WEBHOOK_SECRET: 'whs' };

function vippsApi(call, json) {
  if (call.url.endsWith('/accesstoken/get')) return json({ token_type: 'Bearer', expires_in: '3599', access_token: 'TOK' });
  if (call.url.endsWith('/epayment/v1/payments') && call.method === 'POST') return json({ reference: JSON.parse(call.body).reference, redirectUrl: 'https://landing.vipps.no?token=abc' }, 201);
  if (/\/epayment\/v1\/payments\/urd-/.test(call.url)) return json({ state: 'AUTHORIZED', userDetails: { firstName: 'Kari', lastName: 'Nordmann', email: 'k@n.no', mobileNumber: '4712345678' } });
  return new Response('nope', { status: 404 });
}

test('vipps checkout: the payment in the site currency with the profile, the receipt and the reference as idempotency key', async () => {
  const calls = stubNetwork({ commerce: { currency: 'DKK' } }, vippsApi);
  const res = await vipps.checkout.onRequestPost({ request: order(), env: VIPPS_ENV });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.match(data.reference, REF_RE);
  assert.equal(data.url, 'https://landing.vipps.no?token=abc');
  const create = calls.find((c) => c.url.endsWith('/epayment/v1/payments'));
  assert.equal(create.headers.Authorization, 'Bearer TOK');
  assert.equal(create.headers['Idempotency-Key'], data.reference);
  const body = JSON.parse(create.body);
  assert.deepEqual(body.amount, { currency: 'DKK', value: 70000 });
  assert.equal(body.returnUrl, `${ORIGIN}/kasse?ordered=${data.reference}&via=vipps`);
  assert.equal(body.profile.scope, 'name email phoneNumber');
  assert.equal(body.receipt.orderLines.length, 1);
});

test('vipps checkout: a seller in the VAT register sends no receipt; the card method sends CARD', async () => {
  const calls = stubNetwork({ contact: { vat: { registered: true } } }, vippsApi);
  await vipps.checkout.onRequestPost({ request: order({ method: 'card' }), env: VIPPS_ENV });
  const body = JSON.parse(calls.find((c) => c.url.endsWith('/epayment/v1/payments')).body);
  assert.equal(body.receipt, undefined);
  assert.deepEqual(body.paymentMethod, { type: 'CARD' });
  assert.equal(body.profile, undefined);
});

test('vipps session: a reserved payment is paid with the buyer\'s name; a malformed reference is refused before Vipps is asked', async () => {
  const calls = stubNetwork({}, vippsApi);
  const ref = 'urd-' + 'a'.repeat(24);
  const res = await vipps.session.onRequestGet({ request: new Request(`${ORIGIN}/api/pay/vipps/session?reference=${ref}`), env: VIPPS_ENV });
  assert.deepEqual(await res.json(), { paid: true, open: false, state: 'AUTHORIZED', buyer: { name: 'Kari Nordmann', email: 'k@n.no', phone: '4712345678' } });
  const before = calls.length;
  const bad = await vipps.session.onRequestGet({ request: new Request(`${ORIGIN}/api/pay/vipps/session?reference=../x`), env: VIPPS_ENV });
  assert.equal(bad.status, 400);
  assert.equal(calls.length, before);
});

test('vipps webhook: a signed delivery 200, a tampered one 401, no secret 503', async () => {
  stubNetwork({}, vippsApi);
  const body = JSON.stringify({ reference: 'urd-' + 'a'.repeat(24), name: 'AUTHORIZED' });
  const date = new Date().toUTCString();
  const hash = createHash('sha256').update(body).digest('base64');
  const sig = createHmac('sha256', 'whs').update(`POST\n/api/pay/vipps/webhook\n${date};forening.pages.dev;${hash}`).digest('base64');
  const deliver = (signature, env = VIPPS_ENV) => vipps.webhook.onRequestPost({ env, request: new Request(`${ORIGIN}/api/pay/vipps/webhook`, { method: 'POST', body, headers: { 'x-ms-date': date, 'x-ms-content-sha256': hash, authorization: `HMAC-SHA256 SignedHeaders=x-ms-date;host;x-ms-content-sha256&Signature=${signature}` } }) });
  assert.equal((await deliver(sig)).status, 200);
  assert.equal((await deliver(sig.slice(1) + 'A')).status, 401);
  assert.equal((await deliver(sig, { ...VIPPS_ENV, VIPPS_WEBHOOK_SECRET: '' })).status, 503);
});

const STRIPE_ENV = { STRIPE_SECRET_KEY: 'sk_test_abc123', STRIPE_WEBHOOK_SECRET: 'whsec_test' };
const SESSION_ID = 'cs_test_a1b2c3d4e5f6g7h8i9';

function stripeApi(sessions) {
  return (call, json) => {
    if (call.url.endsWith('/v1/checkout/sessions') && call.method === 'POST') {
      const form = new URLSearchParams(call.body);
      sessions.set(SESSION_ID, form.get('client_reference_id'));
      return json({ id: SESSION_ID, url: `https://checkout.stripe.com/c/pay/${SESSION_ID}` });
    }
    const m = /\/v1\/checkout\/sessions\/(cs_[A-Za-z0-9_]+)\?expand\[\]=payment_intent$/.exec(call.url);
    if (m) return json({ id: m[1], status: 'complete', payment_status: 'unpaid', client_reference_id: sessions.get(m[1]) ?? 'urd-other', payment_intent: { status: 'requires_capture' }, customer_details: { name: 'Kari Nordmann', email: 'k@n.no', phone: null } });
    return new Response('nope', { status: 404 });
  };
}

test('stripe checkout: a form-encoded session with the bearer key, the lines in the site currency, a hold by default, and the session id to the page', async () => {
  const sessions = new Map();
  const calls = stubNetwork({ lang: 'nb', commerce: { currency: 'EUR' } }, stripeApi(sessions));
  const res = await stripe.checkout.onRequestPost({ request: order(), env: STRIPE_ENV });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.match(data.reference, REF_RE);
  assert.equal(data.pid, SESSION_ID);
  assert.equal(data.url, `https://checkout.stripe.com/c/pay/${SESSION_ID}`);
  const create = calls.find((c) => c.url === 'https://api.stripe.com/v1/checkout/sessions');
  assert.equal(create.headers.Authorization, 'Bearer sk_test_abc123');
  assert.equal(create.headers['content-type'], 'application/x-www-form-urlencoded');
  assert.equal(create.headers['Idempotency-Key'], data.reference);
  const form = new URLSearchParams(create.body);
  assert.equal(form.get('line_items[0][price_data][currency]'), 'eur');
  assert.equal(form.get('line_items[0][price_data][unit_amount]'), '35000');
  assert.equal(form.get('line_items[0][quantity]'), '2');
  assert.equal(form.get('payment_intent_data[capture_method]'), 'manual');
  assert.equal(form.get('locale'), 'nb');
  assert.equal(form.get('success_url'), `${ORIGIN}/kasse?ordered=${data.reference}&via=stripe`);
});

test('stripe checkout: the capture mode is the block\'s on the page, never the client\'s word; an unreadable page holds; without the key 503 before anything is read', async () => {
  const sessions = new Map();
  const captureSent = (calls) => new URLSearchParams(calls.find((c) => c.url.endsWith('/v1/checkout/sessions')).body).get('payment_intent_data[capture_method]');
  PAGE_CAPTURE = 'now';
  let calls = stubNetwork({}, stripeApi(sessions));
  await stripe.checkout.onRequestPost({ request: order({ capture: 'ship' }), env: STRIPE_ENV });
  assert.equal(captureSent(calls), null, 'the block says now: taken at the order whatever the client posts');
  PAGE_CAPTURE = 'ship';
  calls = stubNetwork({}, stripeApi(sessions));
  await stripe.checkout.onRequestPost({ request: order({ capture: 'now' }), env: STRIPE_ENV });
  assert.equal(captureSent(calls), 'manual', 'the block says ship: held whatever the client posts');
  calls = stubNetwork({ pages: [] }, stripeApi(sessions));
  await stripe.checkout.onRequestPost({ request: order({ capture: 'now' }), env: STRIPE_ENV });
  assert.equal(captureSent(calls), 'manual', 'no page found: held, the safe side');
  calls = stubNetwork({}, stripeApi(sessions));
  const res = await stripe.checkout.onRequestPost({ request: order(), env: {} });
  assert.equal(res.status, 503);
  assert.equal((await res.json()).code, 'payNotConfigured');
  assert.equal(calls.length, 0);
});

test('stripe session: a held payment for this reference is paid with the name Stripe collected; another reference\'s session confirms nothing', async () => {
  const sessions = new Map();
  stubNetwork({}, stripeApi(sessions));
  const ref = 'urd-' + 'c'.repeat(24);
  sessions.set(SESSION_ID, ref);
  const ask = (reference, pid) => stripe.session.onRequestGet({ request: new Request(`${ORIGIN}/api/pay/stripe/session?reference=${reference}&pid=${pid}`), env: STRIPE_ENV });
  assert.deepEqual(await (await ask(ref, SESSION_ID)).json(), { paid: true, open: false, state: 'complete:requires_capture', buyer: { name: 'Kari Nordmann', email: 'k@n.no', phone: '' } });
  assert.equal((await ask('urd-' + 'd'.repeat(24), SESSION_ID)).status, 400, 'the session belongs to another reference');
  assert.equal((await ask(ref, 'pi_123')).status, 400, 'not a session id');
});

test('stripe webhook: a recent delivery signed with the secret 200, a tampered or old one 401, no secret 503', async () => {
  stubNetwork({}, stripeApi(new Map()));
  const body = JSON.stringify({ id: 'evt_1', type: 'checkout.session.completed' });
  const t = Math.floor(Date.now() / 1000);
  const sig = (time) => createHmac('sha256', 'whsec_test').update(`${time}.${body}`).digest('hex');
  const deliver = (header, env = STRIPE_ENV) => stripe.webhook.onRequestPost({ env, request: new Request(`${ORIGIN}/api/pay/stripe/webhook`, { method: 'POST', body, headers: { 'stripe-signature': header } }) });
  assert.equal((await deliver(`t=${t},v1=${sig(t)}`)).status, 200);
  assert.equal((await deliver(`t=${t},v1=${'0'.repeat(64)}`)).status, 401);
  assert.equal((await deliver(`t=${t - 3600},v1=${sig(t - 3600)}`)).status, 401, 'a replay an hour later');
  assert.equal((await deliver(`t=${t},v1=${sig(t)}`, { STRIPE_SECRET_KEY: 'sk_test_abc123' })).status, 503);
});

const PAYPAL_ENV = { PAYPAL_CLIENT_ID: 'cid', PAYPAL_CLIENT_SECRET: 'csec', PAYPAL_API_BASE: 'https://api-m.sandbox.paypal.com', PAYPAL_WEBHOOK_ID: 'WH-1' };
const ORDER_ID = '5O190127TN364715T';

/** A stubbed PayPal: the token, the order's creation, its read in a given state, its capture, and the signature check. */
function paypalApi(state) {
  return (call, json) => {
    const path = new URL(call.url).pathname;
    if (path === '/v1/oauth2/token') return json({ access_token: 'PTOK', token_type: 'Bearer', expires_in: 32400 });
    if (path === '/v2/checkout/orders' && call.method === 'POST') {
      state.created = JSON.parse(call.body);
      return json({ id: ORDER_ID, status: 'PAYER_ACTION_REQUIRED', links: [{ rel: 'payer-action', href: `https://www.sandbox.paypal.com/checkoutnow?token=${ORDER_ID}` }] }, 200);
    }
    const unit = { reference_id: state.reference ?? state.created?.purchase_units[0].reference_id };
    if (path === `/v2/checkout/orders/${ORDER_ID}` && call.method === 'GET') return json({ id: ORDER_ID, status: state.status, purchase_units: [unit] });
    if (path === `/v2/checkout/orders/${ORDER_ID}/capture` && call.method === 'POST') {
      state.captures = (state.captures ?? 0) + 1;
      state.captureRequestId = call.headers['PayPal-Request-Id'];
      return json({ id: ORDER_ID, status: 'COMPLETED', payer: { name: { given_name: 'Kari', surname: 'Nordmann' }, email_address: 'k@n.no' }, purchase_units: [{ ...unit, payments: { captures: [{ status: 'COMPLETED' }] } }] }, 201);
    }
    if (path === '/v1/notifications/verify-webhook-signature') {
      state.verifyBody = call.body;
      return json({ verification_status: state.signed ? 'SUCCESS' : 'FAILURE' });
    }
    return new Response('nope', { status: 404 });
  };
}

test('paypal checkout: the order with the token from the OAuth call, the items in the site currency, and the approval address with the order id to the page', async () => {
  const state = {};
  const calls = stubNetwork({ title: 'Forening', commerce: { currency: 'EUR' } }, paypalApi(state));
  const res = await paypal.checkout.onRequestPost({ request: order(), env: PAYPAL_ENV });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.match(data.reference, REF_RE);
  assert.equal(data.pid, ORDER_ID);
  assert.equal(data.url, `https://www.sandbox.paypal.com/checkoutnow?token=${ORDER_ID}`);
  const token = calls.find((c) => c.url.endsWith('/v1/oauth2/token'));
  assert.equal(token.headers.Authorization, `Basic ${btoa('cid:csec')}`);
  assert.equal(token.body, 'grant_type=client_credentials');
  const create = calls.find((c) => c.url.endsWith('/v2/checkout/orders'));
  assert.equal(create.headers.Authorization, 'Bearer PTOK');
  assert.equal(create.headers['PayPal-Request-Id'], data.reference);
  assert.equal(state.created.intent, 'CAPTURE');
  assert.deepEqual(state.created.purchase_units[0].amount, { currency_code: 'EUR', value: '700.00', breakdown: { item_total: { currency_code: 'EUR', value: '700.00' } } });
  assert.equal(state.created.payment_source.paypal.experience_context.brand_name, 'Forening');
});

test('paypal checkout: a currency PayPal lacks is refused before PayPal is asked; without the keys 503', async () => {
  let calls = stubNetwork({ commerce: { currency: 'ISK' } }, paypalApi({}));
  const res = await paypal.checkout.onRequestPost({ request: order(), env: PAYPAL_ENV });
  assert.equal(res.status, 400);
  assert.equal((await res.json()).code, 'payCurrency');
  assert.ok(!calls.some(toPayPal));
  calls = stubNetwork({}, paypalApi({}));
  assert.equal((await paypal.checkout.onRequestPost({ request: order(), env: {} })).status, 503);
  assert.equal(calls.length, 0);
});

test('paypal session: an approved order for this reference is captured once, with the reference as request id, and paid by name', async () => {
  const ref = 'urd-' + 'e'.repeat(24);
  const state = { status: 'APPROVED', reference: ref };
  stubNetwork({}, paypalApi(state));
  const ask = (reference, pid) => paypal.session.onRequestPost({ request: new Request(`${ORIGIN}/api/pay/paypal/session?reference=${reference}&pid=${pid}`, { method: 'POST' }), env: PAYPAL_ENV });
  assert.deepEqual(await (await ask(ref, ORDER_ID)).json(), { paid: true, open: false, state: 'COMPLETED:COMPLETED', buyer: { name: 'Kari Nordmann', email: 'k@n.no', phone: '' } });
  assert.equal(state.captures, 1);
  assert.equal(state.captureRequestId, `${ref}-capture`);
  assert.equal((await ask('urd-' + 'f'.repeat(24), ORDER_ID)).status, 400, 'the order belongs to another reference');
  assert.equal(state.captures, 1, 'and nothing was captured for it');
  assert.equal((await ask(ref, 'bad id')).status, 400);
  state.status = 'PAYER_ACTION_REQUIRED';
  const open = await (await ask(ref, ORDER_ID)).json();
  assert.equal(open.open, true);
  assert.equal(open.paid, false);
  assert.equal(state.captures, 1, 'an order not yet approved is not captured');
});

test('paypal webhook: PayPal\'s check decides, with the event sent back as it came; a missing header 401 before PayPal is asked; no webhook id 503', async () => {
  const state = { signed: true };
  const calls = stubNetwork({}, paypalApi(state));
  const raw = '{"id":"WH-1A","event_type":"PAYMENT.CAPTURE.COMPLETED"}';
  const headers = {
    'paypal-auth-algo': 'SHA256withRSA',
    'paypal-cert-url': 'https://api.sandbox.paypal.com/v1/notifications/certs/CERT-1',
    'paypal-transmission-id': 'tid',
    'paypal-transmission-sig': 'sig',
    'paypal-transmission-time': '2026-10-23T12:00:00Z',
  };
  const deliver = (h, env = PAYPAL_ENV) => paypal.webhook.onRequestPost({ env, request: new Request(`${ORIGIN}/api/pay/paypal/webhook`, { method: 'POST', body: raw, headers: h }) });
  assert.equal((await deliver(headers)).status, 200);
  assert.ok(state.verifyBody.endsWith(`"webhook_event":${raw}}`));
  assert.equal(JSON.parse(state.verifyBody).webhook_id, 'WH-1');
  state.signed = false;
  assert.equal((await deliver(headers)).status, 401);
  const before = calls.length;
  const { 'paypal-transmission-sig': _sig, ...unsigned } = headers;
  assert.equal((await deliver(unsigned)).status, 401);
  assert.equal(calls.length, before);
  assert.equal((await deliver(headers, { ...PAYPAL_ENV, PAYPAL_WEBHOOK_ID: '' })).status, 503);
});

test('every session endpoint answers the POST the checkout page sends', () => {
  for (const provider of [vipps, stripe, paypal]) assert.equal(typeof provider.session.onRequestPost, 'function');
  assert.equal(paypal.session.onRequestGet, undefined, 'PayPal\'s may capture, so it takes no GET');
});
