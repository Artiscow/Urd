/**
 * Kontraktstester for butikkens rene kurvlogikk (engine/butikk.js): linjer
 * slås sammen per nøkkel, antall klemmes, sum og antall regnes riktig, og
 * prisvisningen er deterministisk. DOM/localStorage (readCart/writeCart)
 * testes manuelt (testrundene).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const {
  cartAdd, cartSetQty, cartRemove, cartCount, cartTotal, itemKey, variantLabel, formatPrice,
  isEmail, orderLines, buildOrderBody, buildOrderMailto, buildOrderPayload,
} = await engineImport('butikk.js');

const KAKE = { key: 'kake|Stor', id: 'kake', title: 'Sjokoladekake', price: 350 };

test('itemKey og variantLabel: nøkkel og etikett fra valgene', () => {
  assert.equal(variantLabel('M', 'Rød'), 'M · Rød');
  assert.equal(variantLabel(null, 'Rød'), 'Rød');
  assert.equal(variantLabel(null, null), '');
  assert.equal(itemKey('kake', 'M · Rød'), 'kake|M · Rød');
  assert.equal(itemKey('kake', ''), 'kake');
});

test('cartAdd: ny linje legges til, samme nøkkel øker antallet', () => {
  const one = cartAdd([], KAKE);
  assert.equal(one.length, 1);
  assert.equal(one[0].qty, 1);
  const two = cartAdd(one, KAKE);
  assert.equal(two.length, 1);
  assert.equal(two[0].qty, 2);
  const other = cartAdd(two, { ...KAKE, key: 'kake|Liten' });
  assert.equal(other.length, 2);
});

test('cartAdd: muterer aldri input og forkaster ugyldige linjer', () => {
  const start = [KAKE];
  cartAdd(start, KAKE);
  assert.equal(start[0].qty, undefined);
  assert.equal(cartAdd([], { key: 'x', title: 'Uten pris' }).length, 0);
  assert.equal(cartAdd([], { ...KAKE, price: -5 }).length, 0);
});

test('cartSetQty: setter antall, klemmer til 99, og 0 fjerner linjen', () => {
  const items = cartAdd([], KAKE);
  assert.equal(cartSetQty(items, KAKE.key, 5)[0].qty, 5);
  assert.equal(cartSetQty(items, KAKE.key, 500)[0].qty, 99);
  assert.equal(cartSetQty(items, KAKE.key, 0).length, 0);
  assert.equal(cartSetQty(items, KAKE.key, -1).length, 0);
});

test('cartRemove/cartCount/cartTotal: fjerning, antall og sum', () => {
  let items = cartAdd([], KAKE);
  items = cartAdd(items, { key: 'boller', id: 'boller', title: 'Kanelboller', price: 120, qty: 2 });
  assert.equal(cartCount(items), 3);
  assert.equal(cartTotal(items), 350 + 240);
  assert.equal(cartRemove(items, 'boller').length, 1);
});

test('formatPrice: heltall uten desimaler, ellers komma, valuta-ordet etter', () => {
  assert.equal(formatPrice(350), '350 kr');
  assert.equal(formatPrice(49.5), '49,50 kr');
  assert.equal(formatPrice(120, ''), '120');
  assert.equal(formatPrice('tull'), '');
});

test('isEmail: vanlige adresser godtas, åpenbare feil avvises', () => {
  assert.ok(isEmail('kari@forening.no'));
  assert.ok(!isEmail('kari@forening'));
  assert.ok(!isEmail('kari forening.no'));
  assert.ok(!isEmail(''));
});

const ORDER = [
  { key: 'kake|Stor', id: 'kake', title: 'Sjokoladekake', price: 350, qty: 2, variant: 'Stor' },
  { key: 'boller', id: 'boller', title: 'Kanelboller', price: 120, qty: 1 },
];

test('orderLines: antall, variant i parentes og linjesum', () => {
  const lines = orderLines(ORDER);
  assert.equal(lines[0], '2 × Sjokoladekake (Stor) - 700 kr');
  assert.equal(lines[1], '1 × Kanelboller - 120 kr');
});

test('buildOrderBody: linjer, sum og kun utfylte kontaktfelt', () => {
  const body = buildOrderBody(ORDER, { Navn: 'Kari', Telefon: '', 'E-post': 'kari@forening.no' }, 'kr', 'Sum');
  assert.ok(body.includes('Sum: 820 kr'));
  assert.ok(body.includes('Navn: Kari'));
  assert.ok(!body.includes('Telefon'));
});

test('buildOrderMailto: encodet mailto, null uten mottaker', () => {
  const url = buildOrderMailto('post@forening.no', 'Bestilling', 'Navn: Kari & venner');
  assert.ok(url.startsWith('mailto:post@forening.no?'));
  assert.ok(url.includes(encodeURIComponent('Kari & venner')));
  assert.ok(!url.includes(' '));
  assert.equal(buildOrderMailto('', 'x', 'y'), null);
});

test('buildOrderPayload: kontaktfelt + ordrelinjer som data med total', () => {
  const payload = buildOrderPayload(ORDER, { name: 'Kari', email: 'kari@forening.no' });
  assert.equal(payload.total, 820);
  assert.equal(payload.order.length, 2);
  assert.equal(payload.order[0].variant, 'Stor');
  assert.equal(payload.order[1].variant, undefined);
  assert.ok(!('key' in payload.order[0]));
});
