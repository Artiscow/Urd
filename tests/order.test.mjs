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
  validOrderPayload, orderAmountMinor, validVariants, orderLineItems, orderDescription, currencyExponent,
  makeReference, isReference, orderCurrency, vatRegistered, returnUrl, PROVIDERS,
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
  assert.deepEqual(clean.order, [{ id: 'kake', qty: 2, variant: 'Stor' }]);
  assert.equal(clean.contact.name, 'Kari');
  assert.equal(clean.returnPath, '/kasse');
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

test('currencyExponent and the minor unit: two decimals for most currencies, whole units for the zero-decimal ones', () => {
  for (const code of ['NOK', 'DKK', 'EUR', 'SEK', 'GBP', 'USD', 'ISK']) assert.equal(currencyExponent(code), 2, code);
  for (const code of ['JPY', 'KRW', 'jpy']) assert.equal(currencyExponent(code), 0, code);
  assert.equal(orderAmountMinor([{ id: 'kake', qty: 2 }], CATALOGS, 'JPY'), 700);
  assert.equal(orderAmountMinor([{ id: 'kake', qty: 2 }], CATALOGS, 'EUR'), 70000);
  assert.equal(orderLineItems([{ id: 'boller', qty: 1 }], CATALOGS, 'KRW')[0].unit, 50, 'rounded to the whole unit');
});
