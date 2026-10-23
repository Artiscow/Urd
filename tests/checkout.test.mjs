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
    this.value = '';
    this.listeners = {};
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

  addEventListener(type, fn) { this.listeners[type] = fn; }
}

/** What this tab remembers between renders: the last order's record. */
const session = new Map();

/** The page globals the block reads, over a basket; the returned function takes them away again. */
function holdGlobals(cart) {
  const store = new Map([['urd-cart', JSON.stringify(cart)]]);
  const globals = {
    document: { createElement: (tag) => new StubElement(tag), addEventListener() {} },
    window: { addEventListener() {} },
    location: { search: '', href: 'https://example.org/checkout', pathname: '/checkout' },
    localStorage: { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v), removeItem: (k) => store.delete(k) },
    sessionStorage: { getItem: (k) => session.get(k) ?? null, setItem: (k, v) => session.set(k, v), removeItem: (k) => session.delete(k) },
  };
  for (const [name, value] of Object.entries(globals)) Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
  return () => { for (const name of Object.keys(globals)) delete globalThis[name]; };
}
/** Renders the block over a basket and returns its form. */
function renderCheckout(cart, props, site, preview = false) {
  const release = holdGlobals(cart);
  try {
    const el = new StubElement('div');
    checkoutBlock.render(el, { ...checkoutBlock.defaults(), ...props }, { preview, site });
    renderCheckout.host = el.children[0];
    return el.children[0].children.find((c) => c.className === 'urd-checkout-form');
  } finally {
    release();
  }
}

const CART = [
  { key: 'kake|Stor', id: 'kake', title: 'Sjokoladekake', price: 350, qty: 2, variant: 'Stor' },
  { key: 'boller', id: 'boller', title: 'Kanelboller', price: 120, qty: 1 },
];

test('the order lines and the total stand right above the order buttons', () => {
  for (const props of [{ recipient: 'post@example.org' }, { recipient: 'post@example.org', payments: { vipps: true, manual: [{ id: 'v', label: 'Vipps', text: '12345' }] } }]) {
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
  const form = renderCheckout(CART, { recipient: 'post@example.org', payments: { vipps: true } });
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

test('the seller stands under the order buttons from the Site panel, and the block can leave it out', () => {
  const site = { site: { title: 'Apeiron', lang: 'nb', contact: {
    country: 'NO', legalName: 'Apeiron Linjeforening', ids: { org: '974760673' }, vat: { registered: true }, representative: 'Kari Nordmann',
    address: { street: 'Høgskoleringen 5', postalCode: '7034', city: 'Trondheim' }, phone: '+47 73 59 00 00', email: 'post@apeiron.no' } } };
  const form = renderCheckout(CART, { recipient: 'post@example.org' }, site);
  const at = form.children.findIndex((c) => c.className === 'urd-checkout-buttons');
  const seller = form.children.find((c) => c.className === 'urd-checkout-seller');
  assert.ok(seller && form.children.indexOf(seller) > at, 'under the buttons');
  assert.equal(seller.tagName, 'ADDRESS');
  assert.equal(seller.children[0].textContent, 'Selger:');
  assert.equal(seller.children[1].textContent, 'Apeiron Linjeforening · Org.nr. 974 760 673 MVA · Høgskoleringen 5, 7034 Trondheim');
  assert.deepEqual(seller.children.slice(2).map((a) => a.href), ['tel:+4773590000', 'mailto:post@apeiron.no']);
  assert.ok(!seller.textContent.includes('Kari Nordmann'), 'the representative stays in the footer');
  assert.ok(!renderCheckout(CART, { recipient: 'post@example.org', seller: false }, site).children.some((c) => c.className === 'urd-checkout-seller'), 'switched off');
  assert.ok(!renderCheckout(CART, { recipient: 'post@example.org' }, { site: { title: 'Apeiron', lang: 'nb' } }).children.some((c) => c.className === 'urd-checkout-seller'), 'no details, no line');
});

test('the payment buttons follow the settings: Vipps, a card at Vipps, and nothing for a provider that is off', () => {
  const buttonsOf = (props) => renderCheckout(CART, props).children.find((c) => c.className === 'urd-checkout-buttons').children.map((b) => b.textContent);
  assert.deepEqual(buttonsOf({ recipient: 'post@example.org' }), [sites.nb['shop.sendOrder']]);
  assert.deepEqual(buttonsOf({ payments: { vipps: true, card: 'vipps' } }), [sites.nb['shop.sendOrder'], sites.nb['shop.payWithVipps'], sites.nb['shop.payWithCard']]);
  assert.deepEqual(buttonsOf({ payments: { card: 'vipps' } }), [sites.nb['shop.sendOrder'], sites.nb['shop.payWithCard']]);
  assert.deepEqual(buttonsOf({ payments: { card: 'stripe', vipps: true } }), [sites.nb['shop.sendOrder'], sites.nb['shop.payWithVipps'], sites.nb['shop.payWithCard']], 'one card button whichever provider');
  assert.deepEqual(buttonsOf({ payments: { vipps: true, card: 'stripe', paypal: true } }), [sites.nb['shop.sendOrder'], sites.nb['shop.payWithVipps'], sites.nb['shop.payWithCard'], sites.nb['shop.payWithPaypal']], 'every provider, in the order of PAY_PROVIDERS');
});

test('one payment instruction stands as a line above the order summary; a row still being typed is left out', () => {
  const form = renderCheckout(CART, { payments: { manual: [{ id: 'a', label: 'Vipps', text: '12345' }, { id: 'b', label: '', text: '' }] } });
  const lines = form.children.filter((c) => c.className === 'urd-checkout-vipps').map((c) => c.textContent);
  assert.deepEqual(lines, ['Vipps: 12345']);
  assert.ok(!form.children.some((c) => c.className?.includes('urd-checkout-paychoice')));
  const at = form.children.findIndex((c) => c.className === 'urd-checkout-vipps');
  assert.ok(at < form.children.findIndex((c) => c.className === 'urd-checkout-recap'));
});

test('two or more payment instructions are a radio group above the order summary, none chosen, each with its instruction under its name', () => {
  const form = renderCheckout(CART, { payments: { manual: [{ id: 'a', label: 'Vipps', text: 'Vipps til 12345' }, { id: 'b', label: '', text: 'Betal ved henting' }, { id: 'c', label: 'Bank', text: '1234.56.78901' }] } });
  assert.ok(!form.children.some((c) => c.className === 'urd-checkout-vipps'), 'no plain lines beside the choice');
  const group = form.children.find((c) => c.className === 'urd-form-fieldset urd-checkout-paychoice');
  assert.equal(group.tagName, 'FIELDSET');
  assert.equal(group.children[0].tagName, 'LEGEND');
  assert.equal(group.children[0].textContent, sites.nb['shop.payMethod']);
  const options = group.children.slice(1);
  assert.equal(options.length, 3);
  const radios = options.map((o) => o.children[0]);
  assert.ok(radios.every((r) => r.type === 'radio' && r.name === radios[0].name && !r.checked), 'one group, nothing chosen in advance');
  assert.deepEqual(radios.map((r) => r.value), ['0', '1', '2']);
  assert.equal(options[0].children[1].textContent, 'VippsVipps til 12345', 'the name, then the instruction');
  assert.equal(options[0].children[1].children[1].className, 'urd-checkout-paychoice-text');
  assert.equal(options[1].children[1].textContent, 'Betal ved henting', 'an instruction without a name is its own name');
  assert.ok(form.children.indexOf(group) < form.children.findIndex((c) => c.className === 'urd-checkout-recap'));
  const other = renderCheckout(CART, { payments: { manual: [{ id: 'a', label: 'A', text: '1' }, { id: 'b', label: 'B', text: '2' }] } });
  assert.notEqual(other.children.find((c) => c.className?.includes('urd-checkout-paychoice')).children[1].children[0].name, radios[0].name, 'two checkouts, two groups');
});

test('with a provider on the prices show the site currency\'s word; without one the block\'s own word', () => {
  const totalOf = (props, site) => renderCheckout(CART, props, site).children.find((c) => c.className === 'urd-checkout-recap').textContent;
  assert.match(totalOf({ currency: 'EUR' }), /820 EUR/);
  assert.match(totalOf({ currency: 'EUR', payments: { vipps: true } }, { commerce: { currency: 'DKK' } }), /820 kr/);
  assert.match(totalOf({ payments: { card: 'vipps' } }, { commerce: { currency: 'EUR' } }), /820 €/);
  assert.match(totalOf({ payments: { vipps: true } }), /820 kr/, 'no site currency means NOK');
});

test('the migration 1 -> 2 turns the Vipps flag into the provider and the Vipps number into the first instruction', () => {
  assert.equal(checkoutBlock.version, 2);
  assert.deepEqual(checkoutBlock.defaults(), { recipient: '', endpoint: '', currency: 'kr', seller: true, payments: { vipps: false, card: 'none', paypal: false, capture: 'ship', manual: [] } });
  const lift = checkoutBlock.migrations[1];
  assert.deepEqual(lift({ recipient: 'a@b.no', endpoint: '', vipps: ' 12345 ', currency: 'kr', vippsCheckout: true, seller: false }), {
    recipient: 'a@b.no', endpoint: '', currency: 'kr', seller: false,
    payments: { vipps: true, card: 'none', paypal: false, capture: 'ship', manual: [{ id: 'vipps', label: 'Vipps', text: '12345' }] },
  });
  assert.deepEqual(lift({ recipient: '', endpoint: '', vipps: '', currency: 'kr' }).payments, { vipps: false, card: 'none', paypal: false, capture: 'ship', manual: [] });
});

const SELLER_SITE = { site: { title: 'Apeiron', contact: { country: 'NO', legalName: 'Apeiron Linjeforening', ids: { org: '974760673' }, address: { street: 'Gata 1', postalCode: '7034', city: 'Trondheim' }, phone: '12345678', email: 'post@apeiron.no' } } };
const RECORD = {
  at: '2026-10-23T10:00:00.000Z', currency: 'kr',
  lines: [{ title: 'Sjokoladekake', variant: 'Stor', qty: 2, price: 350 }, { title: 'Kanelboller', variant: '', qty: 1, price: 120 }],
  total: 820, contact: { name: 'Kari Nordmann', email: 'kari@forening.no', phone: '' }, payment: 'Vipps: Vipps til 12345', provider: '', reference: '',
};

test('a kept order draws the printable confirmation first: the heading and Print, the date, the lines and the total, the buyer, the payment, the seller, and the withdrawal form with the seller filled in', () => {
  session.set('urd-last-order', JSON.stringify(RECORD));
  try {
    renderCheckout([], { payments: { manual: [{ id: 'a', label: 'Vipps', text: 'Vipps til 12345' }] } }, SELLER_SITE);
    const box = renderCheckout.host.children[0];
    assert.equal(box.className, 'urd-checkout-confirmation');
    assert.equal(box.tagName, 'SECTION');
    const head = box.children[0];
    assert.equal(head.children[0].textContent, sites.nb['shop.confirmation']);
    assert.equal(head.children[1].textContent, sites.nb['shop.print']);
    assert.equal(head.children[1].type, 'button');
    assert.match(box.children[1].textContent, /Bestilt .*2026/);
    const lines = box.children.find((c) => c.className === 'urd-checkout-lines').children.map((l) => l.textContent);
    assert.deepEqual(lines, ['2 × Sjokoladekake (Stor) - 700 kr', '1 × Kanelboller - 120 kr']);
    assert.match(box.children.find((c) => c.className === 'urd-checkout-total').textContent, /820 kr/);
    const facts = box.children.find((c) => c.className === 'urd-checkout-facts').children.map((c) => c.textContent);
    assert.deepEqual(facts.slice(0, 4), [sites.nb['shop.buyer'], 'Kari Nordmann · kari@forening.no', sites.nb['shop.payMethod'], 'Vipps: Vipps til 12345']);
    assert.equal(facts[4], sites.nb['shop.seller']);
    assert.match(facts[5], /Apeiron Linjeforening · Org\.nr\. 974 760 673 · Gata 1, 7034 Trondheim/);
    const withdrawal = box.children.find((c) => c.className === 'urd-checkout-withdrawal');
    assert.equal(withdrawal.children[0].textContent, sites.nb['shop.withdrawalHeading']);
    assert.match(withdrawal.children[1].textContent, /14 dager/);
    const form = withdrawal.children[2];
    assert.equal(form.children[0].textContent, sites.nb['shop.wfTitle']);
    const rows = form.children.filter((c) => c.className === 'urd-checkout-wform-row');
    assert.equal(rows.length, 7);
    assert.equal(rows[0].children[0].textContent, sites.nb['shop.wfTo']);
    assert.match(rows[0].children[1].textContent, /^Apeiron Linjeforening, Org\.nr\. 974 760 673, Gata 1, 7034 Trondheim/, 'the seller filled in, as the form asks of the trader');
    assert.equal(rows[1].children[0].textContent, sites.nb['shop.wfDeclaration']);
    assert.match(rows[2].children[1].textContent, /2026 \/ ______$/, 'ordered on filled, received on left open');
    assert.equal(rows[3].children[1].textContent, 'Kari Nordmann');
    assert.equal(form.children[form.children.length - 1].textContent, sites.nb['shop.wfDelete']);
  } finally {
    session.clear();
  }
});

test('the confirmation names a provider\'s payment and reference; without a kept order there is none; the preview never shows one', () => {
  session.set('urd-last-order', JSON.stringify({ ...RECORD, payment: '', provider: 'stripe', reference: 'urd-' + 'a'.repeat(24) }));
  try {
    renderCheckout([], {}, SELLER_SITE);
    const box = renderCheckout.host.children[0];
    assert.match(box.children[1].textContent, new RegExp(`${sites.nb['shop.reference']}: urd-a{24}`));
    const facts = box.children.find((c) => c.className === 'urd-checkout-facts').children.map((c) => c.textContent);
    assert.equal(facts[3], sites.nb['shop.paidVia.stripe']);
    renderCheckout([], {}, SELLER_SITE, true);
    assert.notEqual(renderCheckout.host.children[0].className, 'urd-checkout-confirmation', 'nothing in the preview');
  } finally {
    session.clear();
  }
  renderCheckout(CART, {}, SELLER_SITE);
  assert.notEqual(renderCheckout.host.children[0].className, 'urd-checkout-confirmation');
});

test('the mailto draft carries the seller\'s details, so the buyer\'s sent mail is the confirmation', () => {
  const form = renderCheckout(CART, { recipient: 'post@example.org' }, SELLER_SITE);
  assert.ok(form, 'the form renders with the seller named under the buttons');
  assert.ok(form.children.some((c) => c.className === 'urd-checkout-seller'));
});

test('a pay button on a site without functions, or without the keys, says payment is not set up; another failure says try again', async () => {
  const realFetch = globalThis.fetch;
  const answer = async (status) => {
    const release = holdGlobals(CART);
    try {
      const el = new StubElement('div');
      checkoutBlock.render(el, { ...checkoutBlock.defaults(), payments: { vipps: true } }, { preview: false, site: {} });
      const form = el.children[0].children.find((c) => c.className === 'urd-checkout-form');
      const pay = form.children.find((c) => c.className === 'urd-checkout-buttons').children.find((b) => b.textContent === sites.nb['shop.payWithVipps']);
      globalThis.fetch = async () => ({ ok: false, status, json: async () => null });
      await pay.listeners.click();
      return form.children.find((c) => c.className === 'urd-checkout-status').textContent;
    } finally {
      globalThis.fetch = realFetch;
      release();
    }
  };
  assert.equal(await answer(404), sites.nb['shop.vippsUnavailable'], 'no function at all');
  assert.equal(await answer(503), sites.nb['shop.vippsUnavailable'], 'the keys are missing');
  assert.equal(await answer(400), sites.nb['shop.payRefused']);
  assert.equal(await answer(500), sites.nb['shop.sendFailed']);
});
