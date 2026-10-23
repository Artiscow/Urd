/**
 * Contract tests for the shop's pure cart logic (engine/shop.js): lines merge per key, quantity is clamped, total and count are computed correctly, and the price display is deterministic.
 * DOM/localStorage (readCart/writeCart) is tested manually (the test rounds).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const {
  cartAdd, cartSetQty, cartRemove, cartCount, cartTotal, itemKey, variantLabel, formatPrice,
  isEmail, orderLines, orderSummary, buildOrderBody, buildOrderMailto, buildOrderPayload, altCardImage,
  methodText, shownMethods, paymentsOf,
} = await engineImport('shop.js');

// Deliberate Norwegian product fixtures throughout: shop items are user data.
const CAKE = { key: 'kake|Stor', id: 'kake', title: 'Sjokoladekake', price: 350 };

test('itemKey and variantLabel: key and label from the choices', () => {
  assert.equal(variantLabel('M', 'Rød'), 'M · Rød');
  assert.equal(variantLabel(null, 'Rød'), 'Rød');
  assert.equal(variantLabel(null, null), '');
  assert.equal(itemKey('kake', 'M · Rød'), 'kake|M · Rød');
  assert.equal(itemKey('kake', ''), 'kake');
});

test('cartAdd: a new line is added, the same key increases the quantity', () => {
  const one = cartAdd([], CAKE);
  assert.equal(one.length, 1);
  assert.equal(one[0].qty, 1);
  const two = cartAdd(one, CAKE);
  assert.equal(two.length, 1);
  assert.equal(two[0].qty, 2);
  const other = cartAdd(two, { ...CAKE, key: 'kake|Liten' });
  assert.equal(other.length, 2);
});

test('cartAdd: never mutates the input and discards invalid lines', () => {
  const start = [CAKE];
  cartAdd(start, CAKE);
  assert.equal(start[0].qty, undefined);
  assert.equal(cartAdd([], { key: 'x', title: 'Uten pris' }).length, 0);
  assert.equal(cartAdd([], { ...CAKE, price: -5 }).length, 0);
});

test('cartSetQty: sets the quantity, clamps to 99, and 0 removes the line', () => {
  const items = cartAdd([], CAKE);
  assert.equal(cartSetQty(items, CAKE.key, 5)[0].qty, 5);
  assert.equal(cartSetQty(items, CAKE.key, 500)[0].qty, 99);
  assert.equal(cartSetQty(items, CAKE.key, 0).length, 0);
  assert.equal(cartSetQty(items, CAKE.key, -1).length, 0);
});

test('cartRemove/cartCount/cartTotal: removal, count and total', () => {
  let items = cartAdd([], CAKE);
  items = cartAdd(items, { key: 'boller', id: 'boller', title: 'Kanelboller', price: 120, qty: 2 });
  assert.equal(cartCount(items), 3);
  assert.equal(cartTotal(items), 350 + 240);
  assert.equal(cartRemove(items, 'boller').length, 1);
});

test('formatPrice: integers without decimals, otherwise a comma, the currency word after', () => {
  assert.equal(formatPrice(350), '350 kr');
  assert.equal(formatPrice(49.5), '49,50 kr');
  assert.equal(formatPrice(120, ''), '120');
  assert.equal(formatPrice('tull'), '');
});

test('altCardImage: the first color image differing from the main image, otherwise null', () => {
  assert.equal(altCardImage({ image: '/a.webp', colors: [{ name: 'Rød' }, { name: 'Blå', image: '/b.webp' }] }), '/b.webp');
  assert.equal(altCardImage({ image: '/a.webp', colors: [{ name: 'Rød', image: '/a.webp' }] }), null);
  assert.equal(altCardImage({ colors: [{ name: 'Blå', image: '/b.webp' }] }), '/b.webp');
  assert.equal(altCardImage({ image: '/a.webp' }), null);
  assert.equal(altCardImage(null), null);
});

test('isEmail: common addresses accepted, obvious errors rejected', () => {
  assert.ok(isEmail('kari@forening.no'));
  assert.ok(!isEmail('kari@forening'));
  assert.ok(!isEmail('kari forening.no'));
  assert.ok(!isEmail(''));
});

const ORDER = [
  { key: 'kake|Stor', id: 'kake', title: 'Sjokoladekake', price: 350, qty: 2, variant: 'Stor' },
  { key: 'boller', id: 'boller', title: 'Kanelboller', price: 120, qty: 1 },
];

test('orderLines: quantity, variant in parentheses and line total', () => {
  const lines = orderLines(ORDER);
  assert.equal(lines[0], '2 × Sjokoladekake (Stor) - 700 kr');
  assert.equal(lines[1], '1 × Kanelboller - 120 kr');
});

test('orderSummary: the order in one line, quantity and variant, for the summary above the order buttons', () => {
  assert.equal(orderSummary(ORDER), '2 × Sjokoladekake (Stor), 1 × Kanelboller');
  assert.equal(orderSummary([]), '');
});

test('buildOrderBody: lines, total and only filled-in contact fields', () => {
  const body = buildOrderBody(ORDER, { Navn: 'Kari', Telefon: '', 'E-post': 'kari@forening.no' }, 'kr', 'Sum');
  assert.ok(body.includes('Sum: 820 kr'));
  assert.ok(body.includes('Navn: Kari'));
  assert.ok(!body.includes('Telefon'));
});

test('buildOrderMailto: encoded mailto, null without a recipient', () => {
  const url = buildOrderMailto('post@forening.no', 'Bestilling', 'Navn: Kari & venner');
  assert.ok(url.startsWith('mailto:post@forening.no?'));
  assert.ok(url.includes(encodeURIComponent('Kari & venner')));
  assert.ok(!url.includes(' '));
  assert.equal(buildOrderMailto('', 'x', 'y'), null);
});

test('buildOrderPayload: contact fields + order lines as data with a total', () => {
  const payload = buildOrderPayload(ORDER, { name: 'Kari', email: 'kari@forening.no' });
  assert.equal(payload.total, 820);
  assert.equal(payload.order.length, 2);
  assert.equal(payload.order[0].variant, 'Stor');
  assert.equal(payload.order[1].variant, undefined);
  assert.ok(!('key' in payload.order[0]));
});

test('buildOrderPayload: the chosen way to pay as payment, only when there is one', () => {
  assert.deepEqual(buildOrderPayload(ORDER, { name: 'Kari' }, { id: 'x', label: 'Vipps', text: 'Vipps til 12345' }).payment, { label: 'Vipps', text: 'Vipps til 12345' });
  assert.equal('payment' in buildOrderPayload(ORDER, { name: 'Kari' }), false);
  assert.equal('payment' in buildOrderPayload(ORDER, { name: 'Kari' }, null), false);
});

test('methodText and shownMethods: an instruction in one line, and only the rows that hold something', () => {
  assert.equal(methodText({ label: 'Vipps', text: 'Vipps til 12345' }), 'Vipps: Vipps til 12345');
  assert.equal(methodText({ label: '', text: 'Betal ved henting' }), 'Betal ved henting');
  assert.equal(methodText({ label: ' Bank ', text: '' }), 'Bank');
  assert.equal(methodText(null), '');
  const pays = paymentsOf({ payments: { manual: [{ id: 'a', label: 'Vipps', text: '1' }, { id: 'b', label: '', text: ' ' }, { id: 'c', label: '', text: 'Kontant' }] } });
  assert.deepEqual(shownMethods(pays).map((m) => m.id), ['a', 'c']);
  assert.deepEqual(shownMethods(paymentsOf({})), []);
});

test('buildOrderBody: the chosen way to pay stands among the contact lines, and an empty one is left out', () => {
  const body = buildOrderBody(ORDER, { Navn: 'Kari', Betaling: methodText({ label: 'Vipps', text: 'Vipps til 12345' }) }, 'kr', 'Sum');
  assert.match(body, /\nBetaling: Vipps: Vipps til 12345$/);
  assert.ok(!buildOrderBody(ORDER, { Navn: 'Kari', Betaling: '' }).includes('Betaling'));
});
