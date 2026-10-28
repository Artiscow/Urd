/**
 * The shop (the ADR-0007 pattern applied to commerce): pure basket logic and
 * localStorage persistence. The basket is a flat list of lines {key, id,
 * title, price, qty, variant?, image?}; key identifies product plus variant
 * choice, so the same product in two sizes is two lines. The pure helpers
 * never mutate their input and are tested in tests/butikk.test.mjs; the
 * blocks (blocks/product.js and blocks/cart.js) do the rendering.
 *
 * The core is gateway free: the basket lives with the visitor (localStorage),
 * and the order is sent as a form at checkout. No network calls here.
 */

/** The localStorage key for the basket (shared by every page on the site). */
export const CART_KEY = 'urd-cart';

/** Line key for a product plus variant choice: same key = same line. */
export function itemKey(id, variant) {
  return variant ? `${id}|${variant}` : String(id);
}

/** Variant label from the choices (size/colour): "M · Red", empty without choices. */
export function variantLabel(size, color) {
  return [size, color].filter(Boolean).join(' · ');
}

/** Clamps a quantity to a whole number in [0, 99]; invalid gives 0. */
function clampQty(value) {
  const n = Math.trunc(Number(value));
  return Number.isFinite(n) ? Math.min(99, Math.max(0, n)) : 0;
}

/** One valid basket line from raw data (localStorage can hold anything). */
function cleanItem(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const qty = clampQty(raw.qty);
  const price = Number(raw.price);
  if (!qty || !raw.key || !raw.title || !Number.isFinite(price) || price < 0) return null;
  const item = { key: String(raw.key), id: String(raw.id ?? ''), title: String(raw.title), price, qty };
  if (raw.variant) item.variant = String(raw.variant);
  if (raw.image) item.image = String(raw.image);
  return item;
}

/**
 * Adds a line to the basket: if the key is already there the quantity is
 * raised, otherwise the line is appended. Always returns a new list.
 * @param {Array} items
 * @param {{key: string, id: string, title: string, price: number, qty?: number, variant?: string, image?: string}} item
 */
export function cartAdd(items, item) {
  const clean = cleanItem({ qty: 1, ...item });
  if (!clean) return [...items];
  const existing = items.find((line) => line.key === clean.key);
  if (!existing) return [...items, clean];
  return items.map((line) => (line.key === clean.key
    ? { ...line, qty: clampQty(line.qty + clean.qty) }
    : line));
}

/** Sets the quantity on a line; 0 (or less) removes the line. */
export function cartSetQty(items, key, qty) {
  const n = clampQty(qty);
  if (!n) return items.filter((line) => line.key !== key);
  return items.map((line) => (line.key === key ? { ...line, qty: n } : line));
}

/** Removes a line from the basket. */
export function cartRemove(items, key) {
  return items.filter((line) => line.key !== key);
}

/** Total number of items (the sum of the lines' qty). */
export function cartCount(items) {
  return items.reduce((sum, line) => sum + clampQty(line.qty), 0);
}

/** Total price for the basket. */
export function cartTotal(items) {
  return items.reduce((sum, line) => sum + Number(line.price) * clampQty(line.qty), 0);
}

/**
 * Price display: whole numbers without decimals, otherwise two decimals with
 * a comma, plus the currency word ("350 kr", "49,50 kr"). Deliberately
 * without Intl: the format is deterministic in the node tests and identical
 * for every visitor.
 */
export function formatPrice(value, currency = 'kr') {
  const n = Number(value);
  if (!Number.isFinite(n)) return '';
  const text = Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',');
  return currency ? `${text} ${currency}` : text;
}

/** The payment providers the checkout block may offer, in the order their buttons stand; the `via` of a return address. */
export const PAY_PROVIDERS = ['vipps', 'stripe', 'paypal'];

/** The card providers the block chooses between: none, Vipps's own card page, or Stripe's hosted page. */
export const CARD_PROVIDERS = ['none', 'vipps', 'stripe'];

/**
 * The checkout block's payment settings in their full shape (block version 2, ADR-0028), with every field present and every unknown value folded to its default; an instruction row without a label and a text is kept, since the editor shows it while it is typed.
 * @param {object} props The block's props
 * @returns {{vipps: boolean, card: 'none'|'vipps'|'stripe', paypal: boolean, capture: 'ship'|'now', manual: Array<{id: string, label: string, text: string}>}}
 */
export function paymentsOf(props) {
  const raw = props?.payments && typeof props.payments === 'object' ? props.payments : {};
  const manual = (Array.isArray(raw.manual) ? raw.manual : [])
    .filter((m) => m && typeof m === 'object')
    .map((m) => ({ id: String(m.id ?? ''), label: String(m.label ?? '').trim(), text: String(m.text ?? '').trim() }));
  return {
    vipps: raw.vipps === true,
    card: CARD_PROVIDERS.includes(raw.card) ? raw.card : 'none',
    paypal: raw.paypal === true,
    capture: raw.capture === 'now' ? 'now' : 'ship',
    manual,
  };
}

/** Whether a payment provider is switched on, so the prices show the site currency's word. */
export function anyProvider(payments) {
  return payments.vipps || payments.card !== 'none' || payments.paypal;
}

/** The word shown after a price for the site's currency (site.commerce.currency); the code itself for a currency without a common sign. */
export function currencyWord(code) {
  const upper = String(code ?? '').toUpperCase();
  const words = { NOK: 'kr', DKK: 'kr', SEK: 'kr', ISK: 'kr', EUR: '€', GBP: '£', USD: '$', CAD: '$', AUD: '$', NZD: '$', CHF: 'CHF', PLN: 'zł', CZK: 'Kč', HUF: 'Ft', TRY: '₺', JPY: '¥' };
  return words[upper] ?? (upper || 'kr');
}

/** The key the last order's record is kept under in sessionStorage, so the confirmation survives a refresh of the checkout page in this tab. */
export const ORDER_KEY = 'urd-last-order';

/**
 * The record of an order the buyer placed, the data the printable
 * confirmation is drawn from (angrerettloven § 18: a confirmation on a
 * durable medium): the lines with their prices, the total, the currency, the
 * buyer's contact details, how it is paid, the provider's reference, and
 * when. Every field is plain data, so the record can be kept and read back.
 * @param {Array} items The basket lines (readCart)
 * @param {{name?: string, email?: string, phone?: string, comment?: string}} contact
 * @param {{currency?: string, payment?: string, provider?: string, reference?: string, at?: string}} [extra] payment is the instruction's text, provider the layer's provider that took the money
 */
export function orderRecord(items, contact, extra = {}) {
  const field = (value) => String(value ?? '').trim().slice(0, 200);
  return {
    at: extra.at ?? new Date().toISOString(),
    currency: extra.currency ?? 'kr',
    lines: items.map((line) => ({
      title: field(line.title),
      variant: field(line.variant),
      qty: clampQty(line.qty),
      price: Number(line.price) || 0,
    })),
    total: cartTotal(items),
    contact: { name: field(contact?.name), email: field(contact?.email), phone: field(contact?.phone) },
    payment: field(extra.payment),
    provider: PAY_PROVIDERS.includes(extra.provider) ? extra.provider : '',
    reference: /^urd-[0-9a-f]{24}$/.test(String(extra.reference ?? '')) ? extra.reference : '',
  };
}

/** Keeps the record for the confirmation; no storage means the confirmation lasts the page view. */
export function saveOrder(record) {
  try { sessionStorage.setItem(ORDER_KEY, JSON.stringify(record)); } catch { /* no storage */ }
}

/** The kept record, or null when there is none or it is not a record. */
export function readOrder() {
  try {
    const raw = sessionStorage.getItem(ORDER_KEY);
    const record = raw ? JSON.parse(raw) : null;
    return record && typeof record === 'object' && Array.isArray(record.lines) ? record : null;
  } catch {
    return null;
  }
}

/** Practical email check (not RFC complete, but it catches the common mistakes). */
export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? '').trim());
}

/** Order lines as plain text: "2 × Chocolate cake (Large) - 700 kr". */
export function orderLines(items, currency = 'kr') {
  return items.map((line) => {
    const name = line.variant ? `${line.title} (${line.variant})` : line.title;
    return `${line.qty} × ${name} - ${formatPrice(Number(line.price) * clampQty(line.qty), currency)}`;
  });
}

/** The order in one line, for the summary right above the order buttons: "2 × Chocolate cake (Large), 1 × Coffee". */
export function orderSummary(items) {
  return items.map((line) => `${line.qty} × ${line.variant ? `${line.title} (${line.variant})` : line.title}`).join(', ');
}

/**
 * The email body for an order: the order lines, the total line and the
 * contact fields. fields is {label: value} with the labels in the visitor's
 * language (i18n at the caller); empty fields are left out.
 */
export function buildOrderBody(items, fields, currency = 'kr', totalLabel = 'Sum') {
  const contact = Object.entries(fields ?? {})
    .map(([label, value]) => [label, String(value ?? '').trim()])
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);
  return [
    ...orderLines(items, currency),
    `${totalLabel}: ${formatPrice(cartTotal(items), currency)}`,
    '',
    ...contact,
  ].join('\n');
}

/** mailto URL with subject and body (all URL-encoded); null without a recipient. */
export function buildOrderMailto(recipient, subject, body) {
  const to = String(recipient ?? '').trim();
  if (!to) return null;
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return query ? `mailto:${to}?${query}` : `mailto:${to}`;
}

/**
 * Payload for an optional endpoint: the contact fields plus the order lines
 * as data, and the way to pay the buyer chose among the block's instructions
 * (`payment`, additive from 0.7.28.4) when there is one.
 * @param {{label: string, text: string}|null} [payment]
 */
export function buildOrderPayload(items, fields, payment = null) {
  return {
    ...fields,
    order: items.map(({ id, title, price, qty, variant }) => ({ id, title, price, qty, ...(variant ? { variant } : {}) })),
    total: cartTotal(items),
    ...(payment ? { payment: { label: payment.label, text: payment.text } } : {}),
  };
}

/** A payment instruction in one line, its name and its text: «Vipps: Vipps to 123456», or the one of them it has. */
export function methodText(method) {
  return [method?.label, method?.text].map((part) => String(part ?? '').trim()).filter(Boolean).join(': ');
}

/** The payment instructions the buyer sees: the block's own, without the rows the editor holds while they are typed. */
export function shownMethods(payments) {
  return (payments?.manual ?? []).filter((method) => methodText(method));
}

/**
 * Basket listener for the blocks: calls handler on urd-cart-change and on
 * storage changes from other tabs. A re-render gives a new block element, and
 * the listeners of detached elements are swept at the next registration, so
 * listeners never stack up per draft message (the same lesson as renderNav).
 */
const listeners = new Set();
export function onCartChange(el, handler) {
  for (const entry of listeners) {
    if (!entry.el.isConnected) {
      entry.controller.abort();
      listeners.delete(entry);
    }
  }
  const controller = new AbortController();
  listeners.add({ el, controller });
  document.addEventListener('urd-cart-change', handler, { signal: controller.signal });
  window.addEventListener('storage', (event) => {
    if (event.key === CART_KEY || event.key === null) handler();
  }, { signal: controller.signal });
}

/** Reads the basket from localStorage; broken or missing data gives an empty basket. */
export function readCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
    return Array.isArray(raw) ? raw.map(cleanItem).filter(Boolean) : [];
  } catch {
    return [];
  }
}

/** Writes the basket and notifies the listeners (urd-cart-change on document). */
export function writeCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // Full or unavailable storage: the basket lives on in memory for this view.
  }
  document.dispatchEvent(new CustomEvent('urd-cart-change', { detail: { count: cartCount(items) } }));
}
