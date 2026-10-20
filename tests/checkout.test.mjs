/**
 * The checkout block's order buttons (angrerettloven § 16): the order lines and the total stand right above the buttons, and the button texts say that ordering is a purchase or a payment.
 * The block is rendered with a minimal document stub; sending is covered by the test rounds.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { checkoutBlock } = await engineImport('blocks/checkout.js');
const sites = Object.fromEntries(await Promise.all(['nb', 'en-GB', 'tr', 'nn', 'se'].map(async (lang) =>
  [lang, (await engineImport(`locales/site/${lang}.js`)).default.strings])));
sites.sv = (await import(new URL('../template/plugins/lang-sv/locales/site/sv.js', import.meta.url).href)).default.strings;

/** The smallest element stub the checkout render needs. */
class StubElement {
  constructor(tag) {
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.className = '';
    this.hidden = false;
    this.isConnected = true;
    this.ownText = '';
    this.attributes = {};
    this.classList = { toggle() {} };
  }

  get textContent() { return this.ownText + this.children.map((c) => c.textContent).join(''); }

  set textContent(value) {
    this.children = [];
    this.ownText = value == null ? '' : String(value);
  }

  appendChild(child) { this.children.push(child); return child; }

  append(...children) { for (const child of children) this.appendChild(child); }

  setAttribute(name, value) { this.attributes[name] = String(value); }

  addEventListener() {}
}

/** Renders the block over a basket and returns its form. */
function renderCheckout(cart, props) {
  const store = new Map([['urd-cart', JSON.stringify(cart)]]);
  const globals = {
    document: { createElement: (tag) => new StubElement(tag), addEventListener() {} },
    window: { addEventListener() {} },
    location: { search: '', href: 'https://example.org/checkout' },
    localStorage: { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v), removeItem: (k) => store.delete(k) },
  };
  for (const [name, value] of Object.entries(globals)) Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
  try {
    const el = new StubElement('div');
    checkoutBlock.render(el, { ...checkoutBlock.defaults(), ...props }, { preview: false });
    return el.children[0].children.find((c) => c.className === 'urd-checkout-form');
  } finally {
    for (const name of Object.keys(globals)) delete globalThis[name];
  }
}

const CART = [
  { key: 'kake|Stor', id: 'kake', title: 'Sjokoladekake', price: 350, qty: 2, variant: 'Stor' },
  { key: 'boller', id: 'boller', title: 'Kanelboller', price: 120, qty: 1 },
];

test('the order lines and the total stand right above the order buttons', () => {
  for (const props of [{ recipient: 'post@example.org' }, { recipient: 'post@example.org', vipps: '12345', vippsCheckout: true }]) {
    const form = renderCheckout(CART, props);
    const at = form.children.findIndex((c) => c.className === 'urd-checkout-buttons');
    const recap = form.children[at - 1];
    assert.equal(recap.className, 'urd-checkout-recap', JSON.stringify(props));
    assert.equal(recap.hidden, false);
    assert.match(recap.textContent, /2 × Sjokoladekake \(Stor\), 1 × Kanelboller/);
    assert.match(recap.textContent, /820 kr/);
  }
});

test('the summary above the buttons is hidden with an empty basket', () => {
  const form = renderCheckout([], { recipient: 'post@example.org' });
  assert.equal(form.children.find((c) => c.className === 'urd-checkout-recap').hidden, true);
});

test('each order button names the purchase or the payment, and is described by the summary above it', () => {
  const form = renderCheckout(CART, { recipient: 'post@example.org', vippsCheckout: true });
  const recap = form.children.find((c) => c.className === 'urd-checkout-recap');
  const buttons = form.children.find((c) => c.className === 'urd-checkout-buttons').children;
  assert.deepEqual(buttons.map((b) => b.textContent), [sites.nb['shop.sendOrder'], sites.nb['shop.payWithVipps']]);
  assert.ok(recap.id);
  for (const button of buttons) assert.equal(button.attributes['aria-describedby'], recap.id);
  const other = renderCheckout(CART, { recipient: 'post@example.org' });
  assert.notEqual(other.children.find((c) => c.className === 'urd-checkout-recap').id, recap.id, 'two checkouts, two ids');
});

test('the order button texts in nb, en-GB, tr and the Swedish pack state the obligation to pay; nn and se fall back to bokmål until translated', () => {
  // The Commission's reading of Directive 2011/83/EU article 8(2) accepts «confirm purchase», «buy now» and «pay now», never «send» or «order now».
  assert.equal(sites.nb['shop.sendOrder'], 'Bekreft kjøp');
  assert.equal(sites['en-GB']['shop.sendOrder'], 'Confirm purchase');
  assert.equal(sites.tr['shop.sendOrder'], 'Satın almayı onayla');
  assert.equal(sites.sv['shop.sendOrder'], 'Bekräfta köp', 'the Swedish pack (distansavtalslagen 2 kap. 3 a § implements the same article)');
  assert.match(sites.nb['shop.payWithVipps'], /^Betal /);
  assert.match(sites['en-GB']['shop.payWithVipps'], /^Pay /);
  assert.match(sites.tr['shop.payWithVipps'], / öde$/);
  assert.match(sites.sv['shop.payWithVipps'], /^Betala /);
  for (const lang of ['nn', 'se']) assert.ok(!('shop.sendOrder' in sites[lang]), `${lang} shows the bokmål text until its translation round`);
});
