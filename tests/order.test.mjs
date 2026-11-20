/**
 * Contract tests for the payment layer's provider-neutral logic
 * (functions/_lib/order.js, ADR-0028): payload validation (never the
 * client's prices), the total in the minor unit against the catalogue, the
 * variant check, the line items and the description, the reference, the
 * site's currency and the return address.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  validOrderPayload, orderAmountMinor, validVariants, validQuantities, quantityProblems, quantityLimits, orderLineItems, orderDescription, currencyExponent,
  makeReference, isReference, orderCurrency, vatRegistered, returnUrl, cancelUrl, PROVIDERS, pageCheckout,
  priceChanges, buyerKey, hasBuyerKey, sessionAnswer, majorAmount, variantProblems,
} from '../template/functions/_lib/order.js';

// Deliberate Norwegian fixture ids and names: this is user catalog data.
const CATALOGS = [
  { kind: 'products', entries: [{ id: 'kake', title: 'Sjokoladekake', price: 350 }, { id: 'boller', title: 'Kanelboller', price: 49.5 }, { id: 'gratis' }] },
  { kind: 'news', entries: [{ id: 'kake', price: 1 }] },
];

test('validOrderPayload: cleans lines and contact, clamps quantity, rejects nonsense', () => {
  const clean = validOrderPayload({
    order: [{ id: 'kake', qty: 2, variant: 'Stor', price: 1 }],
    contact: { name: ' Kari ', email: 'kari@forening.no' },
    returnPath: '/kasse',
  });
  assert.deepEqual(clean.order, [{ id: 'kake', qty: 2, variant: 'Stor', price: 1 }], 'the basket\'s price is kept to be compared, never charged');
  assert.equal(clean.method, 'wallet');
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1 }], method: 'card' }).method, 'card');
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1 }], method: 'cash' }).method, 'wallet');
  for (const price of [-1, 'x', 2e9, Infinity]) assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1, price }] }), null, String(price));
  assert.equal(clean.contact.name, 'Kari');
  assert.equal(clean.returnPath, '/kasse');
  assert.equal(clean.draft, false);
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1 }], draft: true }).draft, true, 'an order from the draft view');
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1 }], draft: 'yes' }).draft, false, 'only true counts');
  assert.equal(validOrderPayload(null), null);
  assert.equal(validOrderPayload({ order: [] }), null);
  assert.equal(validOrderPayload({ order: [{ id: '../etc', qty: 1 }] }), null);
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 0 }] }), null);
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 100 }] }), null);
  assert.equal(validOrderPayload({ order: [{ id: 'genser', qty: 1, variant: 'x'.repeat(201) }] }), null, 'a variant past any label is no order');
  assert.equal(validOrderPayload({ order: [{ id: 'genser', qty: 1, variant: 'x'.repeat(120) }] }).order[0].variant.length, 120, 'a long label is kept whole for the check');
});

test('validOrderPayload: return path must be internal; anything else gives the root', () => {
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1 }], returnPath: 'https://ond.no/' }).returnPath, '/');
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1 }], returnPath: '//ond.no' }).returnPath, '/');
  assert.equal(validOrderPayload({ order: [{ id: 'kake', qty: 1 }] }).returnPath, '/');
});

test('orderAmountMinor: computes from the catalog, never the client; unknown/priceless id rejects; only products collections count', () => {
  assert.equal(orderAmountMinor([{ id: 'kake', qty: 2 }], CATALOGS), 70000);
  assert.equal(orderAmountMinor([{ id: 'boller', qty: 1 }], CATALOGS), 4950);
  assert.equal(orderAmountMinor([{ id: 'ukjent', qty: 1 }], CATALOGS), null);
  assert.equal(orderAmountMinor([{ id: 'gratis', qty: 1 }], CATALOGS), null);
  assert.equal(orderAmountMinor([{ id: 'kake', qty: 1 }], [{ kind: 'news', entries: [{ id: 'kake', price: 1 }] }]), null);
});

test('validVariants: a variant must be a size and a colour the product has, in the basket\'s form', () => {
  const catalogs = [{ kind: 'products', entries: [
    { id: 'genser', price: 300, sizes: ['S', 'M'], colors: [{ name: 'Rød' }, { name: 'Blå' }] },
    { id: 'kopp', price: 100 },
  ] }];
  assert.equal(validVariants([{ id: 'genser', qty: 1, variant: 'M · Rød' }], catalogs), true);
  assert.equal(validVariants([{ id: 'genser', qty: 1, variant: 'M' }, { id: 'genser', qty: 1, variant: 'Blå' }], catalogs), true);
  assert.equal(validVariants([{ id: 'kopp', qty: 2 }], catalogs), true, 'no variant');
  assert.equal(validVariants([{ id: 'genser', qty: 1, variant: 'XL · Rød' }], catalogs), false, 'a size the product lacks');
  assert.equal(validVariants([{ id: 'genser', qty: 1, variant: 'Rød · M' }], catalogs), false, 'the colour before the size');
  assert.equal(validVariants([{ id: 'genser', qty: 1, variant: 'Gratis for meg' }], catalogs), false, 'free text');
  assert.equal(validVariants([{ id: 'kopp', qty: 1, variant: 'M' }], catalogs), false, 'a product without choices takes no variant');
  assert.equal(validVariants([{ id: 'ukjent', qty: 1, variant: 'M' }], catalogs), false);
  const dotted = [{ kind: 'products', entries: [{ id: 'skjerf', price: 200, colors: [{ name: 'Rød · Blå' }] }] }];
  assert.equal(validVariants([{ id: 'skjerf', qty: 1, variant: 'Rød · Blå' }], dotted), true, 'a colour name that holds the separator');
});

test('orderLineItems and orderDescription: the lines with title, variant and minor-unit prices; the description cut at the limit', () => {
  const items = orderLineItems([{ id: 'kake', qty: 2, variant: 'Stor' }, { id: 'boller', qty: 1 }], CATALOGS);
  assert.deepEqual(items, [
    { id: 'kake', name: 'Sjokoladekake (Stor)', qty: 2, unit: 35000, total: 70000 },
    { id: 'boller', name: 'Kanelboller', qty: 1, unit: 4950, total: 4950 },
  ]);
  assert.equal(orderLineItems([{ id: 'gratis', qty: 1 }], CATALOGS), null);
  const text = orderDescription([{ id: 'kake', qty: 2, variant: 'Stor' }], { name: 'Kari', email: 'kari@forening.no', phone: '' });
  assert.equal(text, '2 x kake (Stor) - Kari / kari@forening.no');
  const long = orderDescription(Array.from({ length: 12 }, (_, i) => ({ id: `produkt-${i}`, qty: 1 })), {}, 100);
  assert.equal(long.length, 100);
});

test('makeReference and isReference: the shape every provider takes, nothing else', () => {
  const ref = makeReference();
  assert.match(ref, /^[a-zA-Z0-9-]{8,64}$/);
  assert.notEqual(makeReference(), ref);
  assert.equal(isReference(ref), true);
  for (const bad of ['urd-abc', 'urd-' + 'g'.repeat(24), 'x'.repeat(28), '', null, 'urd-' + 'a'.repeat(24) + '/..']) assert.equal(isReference(bad), false, String(bad));
});

test('orderCurrency and vatRegistered: the site file\'s code upper-cased, NOK without one; the VAT flag only when true', () => {
  assert.equal(orderCurrency({ commerce: { currency: 'dkk' } }), 'DKK');
  assert.equal(orderCurrency({ commerce: { currency: 'EUR' } }), 'EUR');
  assert.equal(orderCurrency({}), 'NOK');
  assert.equal(orderCurrency({ commerce: { currency: 'kroner' } }), 'NOK');
  assert.equal(orderCurrency(null), 'NOK');
  assert.equal(vatRegistered({ contact: { vat: { registered: true } } }), true);
  assert.equal(vatRegistered({ contact: { vat: { registered: 'yes' } } }), false);
  assert.equal(vatRegistered(null), false);
});

test('returnUrl: the checkout page with the reference and the provider that answers for it', () => {
  assert.equal(returnUrl('https://site.no', '/kasse', 'urd-abc', 'vipps'), 'https://site.no/kasse?ordered=urd-abc&via=vipps');
  assert.equal(returnUrl('https://site.no', undefined, 'urd-abc', 'stripe'), 'https://site.no/?ordered=urd-abc&via=stripe');
  assert.deepEqual(PROVIDERS, ['vipps', 'stripe', 'paypal']);
});

test('an order from the draft view returns to the draft view, paid or cancelled', () => {
  assert.equal(returnUrl('https://site.no', '/kasse', 'urd-abc', 'paypal', true), 'https://site.no/kasse?draft=1&ordered=urd-abc&via=paypal');
  assert.equal(cancelUrl('https://site.no', '/kasse', true), 'https://site.no/kasse?draft=1');
  assert.equal(cancelUrl('https://site.no', '/kasse'), 'https://site.no/kasse');
  assert.equal(cancelUrl('https://site.no', undefined), 'https://site.no/');
});

test('currencyExponent and the minor unit: two decimals for most currencies, whole units for the zero-decimal ones', () => {
  for (const code of ['NOK', 'DKK', 'EUR', 'SEK', 'GBP', 'USD', 'ISK']) assert.equal(currencyExponent(code), 2, code);
  for (const code of ['JPY', 'KRW', 'jpy']) assert.equal(currencyExponent(code), 0, code);
  for (const code of ['KWD', 'BHD', 'JOD', 'OMR', 'TND', 'kwd']) assert.equal(currencyExponent(code), 3, code);
  assert.equal(orderAmountMinor([{ id: 'kake', qty: 2 }], CATALOGS, 'KWD'), 700000, 'thousandths');
  assert.equal(orderAmountMinor([{ id: 'kake', qty: 2 }], CATALOGS, 'JPY'), 700);
  assert.equal(orderAmountMinor([{ id: 'kake', qty: 2 }], CATALOGS, 'EUR'), 70000);
  assert.equal(orderLineItems([{ id: 'boller', qty: 1 }], CATALOGS, 'KRW')[0].unit, 50, 'rounded to the whole unit');
});

test('validVariants: a product that asks for a size or a colour takes no line without it, in either order of the basket\'s label', () => {
  const catalogs = [{ kind: 'products', entries: [
    { id: 'skjorte', price: 1, sizes: ['S', 'M'], colors: [{ name: 'Rød' }, { name: 'Blå' }], requireSize: true, requireColor: true },
    { id: 'lue', price: 1, sizes: ['S'], requireSize: true, colors: [{ name: 'Grå' }] },
    { id: 'kopp', price: 1, sizes: [], requireSize: true },
  ] }];
  const ok = (line) => validVariants([{ qty: 1, ...line }], catalogs);
  assert.equal(ok({ id: 'skjorte', variant: 'M · Blå' }), true);
  assert.equal(ok({ id: 'skjorte', variant: 'M' }), false, 'the colour is asked for');
  assert.equal(ok({ id: 'skjorte', variant: 'Blå' }), false, 'the size is asked for');
  assert.equal(ok({ id: 'skjorte' }), false, 'a line without a variant');
  assert.equal(ok({ id: 'lue', variant: 'S' }), true, 'the colour is not asked for');
  assert.equal(ok({ id: 'lue', variant: 'Grå' }), false);
  assert.equal(ok({ id: 'kopp' }), true, 'a product without sizes asks for none');
  assert.deepEqual(variantProblems([{ id: 'skjorte', qty: 1, variant: 'M' }, { id: 'lue', qty: 1, variant: 'S' }, { id: 'lue', qty: 1, variant: 'XL' }], catalogs), [{ id: 'skjorte', variant: 'M' }, { id: 'lue', variant: 'XL' }]);
});

test('priceChanges: the lines whose basket price is not the catalogue\'s now, compared in the minor unit, with the price that holds', () => {
  const catalogs = [{ kind: 'products', entries: [{ id: 'kake', price: 49.5 }, { id: 'bolle', price: 10 }] }];
  assert.deepEqual(priceChanges([{ id: 'kake', qty: 1, price: 49.5 }, { id: 'bolle', qty: 2 }], catalogs), [], 'a line without a price is not compared');
  assert.deepEqual(priceChanges([{ id: 'kake', qty: 1, price: 0.1 + 49.4 }], catalogs), [], 'floating point noise is no change');
  assert.deepEqual(priceChanges([{ id: 'kake', qty: 1, variant: 'Stor', price: 45 }, { id: 'bolle', qty: 1, price: 12 }], catalogs), [{ id: 'kake', variant: 'Stor', price: 49.5 }, { id: 'bolle', price: 10 }]);
});

test('buyerKey, hasBuyerKey and sessionAnswer: the key is made again from the reference and the secret, and the buyer and the amount go to the page that holds it alone', async () => {
  const ref = 'urd-' + 'a'.repeat(24);
  const key = await buyerKey('secret', ref);
  assert.match(key, /^[0-9a-f]{32}$/);
  assert.equal(await buyerKey('secret', ref), key, 'the same every time');
  assert.notEqual(await buyerKey('other', ref), key);
  assert.notEqual(await buyerKey('secret', 'urd-' + 'b'.repeat(24)), key);
  const ask = (headers) => new Request('https://s.no/api/pay/vipps/session', { headers });
  assert.equal(await hasBuyerKey(ask({ 'x-urd-key': key }), 'secret', ref), true);
  assert.equal(await hasBuyerKey(ask({ 'x-urd-key': key.slice(0, 31) }), 'secret', ref), false);
  assert.equal(await hasBuyerKey(ask({}), 'secret', ref), false);
  const summary = { paid: true, open: false, state: 'AUTHORIZED', buyer: { name: 'Kari' }, amount: 700 };
  assert.deepEqual(sessionAnswer(summary, true), summary);
  assert.deepEqual(sessionAnswer(summary, false), { paid: true, open: false, state: 'AUTHORIZED' });
  assert.deepEqual(sessionAnswer({ ...summary, amount: null }, true), { paid: true, open: false, state: 'AUTHORIZED', buyer: { name: 'Kari' } });
  assert.equal(majorAmount(70000, 'NOK'), 700);
  assert.equal(majorAmount(350, 'JPY'), 350);
  assert.equal(majorAmount(5125, 'KWD'), 5.125);
  assert.equal(majorAmount(undefined, 'NOK'), null);
});

test('pageCheckout: the checkout block on the page the return path names that offers the provider in the way asked; nothing for a page or block that offers none, an unknown page, an odd id or a block without payments', async () => {
  const realFetch = globalThis.fetch;
  const pages = [{ id: 'hjem', path: '/' }, { id: 'kasse', path: '/kasse' }, { id: 'rar', path: '/rar' }];
  const files = {
    '/content/pages/kasse.json': { sections: [{ blocks: [{ type: 'checkout', props: { payments: { card: 'none', paypal: true, capture: 'now' } } }, { type: 'checkout', props: { payments: { card: 'stripe', capture: 'ship' } } }] }] },
    '/content/pages/rar.json': { sections: [{ blocks: [{ type: 'checkout', props: { payments: { vipps: true, card: 'vipps', capture: 'ship' } } }] }] },
    '/content/pages/hjem.json': { sections: [{ blocks: [{ type: 'checkout', props: { recipient: 'a@b.no' } }] }] },
  };
  globalThis.fetch = async (url) => { const path = new URL(url).pathname; return files[path] ? new Response(JSON.stringify(files[path])) : new Response('no', { status: 404 }); };
  try {
    assert.equal((await pageCheckout('https://s.no', pages, '/kasse', 'stripe')).capture, 'ship', 'the block that offers Stripe');
    assert.equal((await pageCheckout('https://s.no', pages, '/kasse/', 'paypal')).capture, 'now', 'a trailing slash is the same page');
    assert.equal(await pageCheckout('https://s.no', pages, '/kasse', 'vipps'), null, 'no block offers Vipps: no rules to borrow');
    assert.equal((await pageCheckout('https://s.no', pages, '/rar', 'vipps', 'card')).card, 'vipps', 'Vipps\'s card page');
    assert.equal(await pageCheckout('https://s.no', pages, '/rar', 'paypal'), null);
    assert.equal(await pageCheckout('https://s.no', pages, '/', 'stripe'), null, 'a block still at version 1 has no payments');
    assert.equal(await pageCheckout('https://s.no', pages, '/ukjent', 'stripe'), null);
    assert.equal(await pageCheckout('https://s.no', [{ id: '../x', path: '/x' }], '/x', 'stripe'), null, 'an id outside the pattern is never fetched');
  } finally {
    globalThis.fetch = realFetch;
  }
});

test('validQuantities: a line within its product\'s least and most passes, one outside them is refused, and a product without limits takes any', () => {
  const catalogs = [{ kind: 'products', entries: [
    { id: 'boller', price: 120, quantity: { min: 2, max: 10 } },
    { id: 'kake', price: 350, quantity: { max: 3 } },
    { id: 'brod', price: 60 },
  ] }];
  assert.deepEqual(quantityLimits(catalogs[0].entries[0]), { min: 2, max: 10 });
  assert.deepEqual(quantityLimits({ quantity: {} }), { min: 1, max: 99 });
  assert.deepEqual(quantityLimits({ quantity: { min: 8, max: 4 } }), { min: 8, max: 8 }, 'the most is never under the least');
  assert.equal(quantityLimits({ price: 1 }), null);
  assert.equal(validQuantities([{ id: 'boller', qty: 2 }, { id: 'kake', qty: 3 }, { id: 'brod', qty: 40 }], catalogs), true);
  assert.equal(validQuantities([{ id: 'boller', qty: 1 }], catalogs), false);
  assert.equal(validQuantities([{ id: 'boller', qty: 11 }], catalogs), false);
  assert.equal(validQuantities([{ id: 'kake', qty: 4 }], catalogs), false);
  assert.equal(validQuantities([{ id: 'boller', qty: 5, variant: 'Stor' }, { id: 'boller', qty: 5, variant: 'Liten' }], catalogs), true, 'the limits hold per line');
});

test('quantityProblems: a line the payload repeats is added together, and each refused line carries the limits that hold', () => {
  const catalogs = [{ kind: 'products', entries: [
    { id: 'boller', price: 120, quantity: { min: 2, max: 10 } },
    { id: 'kake', price: 350 },
  ] }];
  assert.deepEqual(quantityProblems([{ id: 'boller', qty: 10 }, { id: 'boller', qty: 10 }], catalogs), [{ id: 'boller', min: 2, max: 10 }], 'two lines of 10 are one line of 20');
  assert.equal(validQuantities([{ id: 'boller', qty: 6, variant: 'Stor' }, { id: 'boller', qty: 6, variant: 'Stor' }], catalogs), false);
  assert.deepEqual(quantityProblems([{ id: 'boller', qty: 1, variant: 'Stor' }, { id: 'kake', qty: 60 }], catalogs), [{ id: 'boller', variant: 'Stor', min: 2, max: 10 }]);
  assert.deepEqual(quantityProblems([{ id: 'boller', qty: 4 }, { id: 'kake', qty: 99 }], catalogs), []);
});
