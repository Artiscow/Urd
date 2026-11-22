/**
 * The provider-neutral part of the optional payment layer (ADR-0020,
 * ADR-0028): reading and cleaning the order the client sends, the total in
 * the currency's minor unit against the git-owned catalogue, the variant
 * check, the payment reference, and the site's currency. Every provider
 * module (vipps.js, stripe.js, paypal.js) builds on this; none of it
 * touches the network. Tested in tests/order.test.mjs.
 *
 * The amount is ALWAYS recomputed from the catalogue: the basket lives with
 * the visitor, so anything the client sends may have been tampered with.
 */
import { isJsonRequest } from './auth.js';

/** Entry ids follow the same regime as the collections (anchored, the CodeQL lesson). */
const ID_RE = /^[a-z0-9][a-z0-9-]*$/;

/**
 * Validates and cleans the order payload from the client. Only the shape is
 * accepted: order lines with a known id form and clamped quantities, contact
 * fields as short strings. A line's price is the one the basket shows, kept to be compared with the catalogue's (priceChanges); the charge is never computed from it.
 * @returns {{order: Array<{id: string, qty: number, variant?: string, price?: number}>, returnPath: string, draft: boolean, method: 'wallet'|'card', contact: {name: string, email: string, phone: string, comment: string}}|null}
 */
export function validOrderPayload(payload) {
  if (!payload || typeof payload !== 'object') return null;
  const rawOrder = Array.isArray(payload.order) ? payload.order : [];
  if (!rawOrder.length || rawOrder.length > 50) return null;
  const order = [];
  for (const line of rawOrder) {
    if (!line || typeof line !== 'object') return null;
    const id = String(line.id ?? '');
    if (!ID_RE.test(id) || id.length > 80) return null;
    const qty = Math.trunc(Number(line.qty));
    if (!Number.isFinite(qty) || qty < 1 || qty > 99) return null;
    const clean = { id, qty };
    if (line.variant != null) {
      // The variant is a size and a colour of the product; a text past any such label is no basket line.
      const variant = String(line.variant);
      if (variant.length > 200) return null;
      if (variant) clean.variant = variant;
    }
    if (line.price != null) {
      const price = Number(line.price);
      if (!Number.isFinite(price) || price < 0 || price > 1e9) return null;
      clean.price = price;
    }
    order.push(clean);
  }
  const field = (value) => String(value ?? '').slice(0, 200).trim();
  // Return path: an internal path on our own site (anchored; never a full URL from the client).
  const rawPath = String(payload.returnPath ?? '/');
  const returnPath = /^\/[a-z0-9\-/]*$/.test(rawPath) && rawPath.length <= 200 ? rawPath : '/';
  return {
    order,
    returnPath,
    // An order from the draft view (?draft=1) returns to it, so the return is read with the settings the payment started from.
    draft: payload.draft === true,
    // Vipps takes a payment in the app (wallet) or on its card page (card); the other providers have one way.
    method: payload.method === 'card' ? 'card' : 'wallet',
    contact: {
      name: field(payload.contact?.name),
      email: field(payload.contact?.email),
      phone: field(payload.contact?.phone),
      comment: field(payload.contact?.comment),
    },
  };
}

/** The products by id across the catalogues of kind products; the first catalogue that names an id wins. */
export function productMap(catalogs) {
  const products = new Map();
  for (const catalog of catalogs) {
    if (catalog?.kind !== 'products') continue;
    for (const entry of catalog.entries ?? []) {
      if (entry?.id && !products.has(entry.id)) products.set(entry.id, entry);
    }
  }
  return products;
}

/** The currencies the providers count in whole units (ISO 4217 exponent 0 at Stripe). */
const ZERO_DECIMAL = new Set(['BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA', 'PYG', 'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF']);

/** The currencies Stripe counts in thousandths (ISO 4217 exponent 3); Vipps and PayPal take none of them. */
export const THREE_DECIMAL = new Set(['BHD', 'JOD', 'KWD', 'OMR', 'TND']);

/** How many decimals a currency's minor unit has: 0 for the zero-decimal currencies, 3 for the three-decimal ones, else 2. */
export function currencyExponent(code) {
  const upper = String(code ?? '').toUpperCase();
  return ZERO_DECIMAL.has(upper) ? 0 : THREE_DECIMAL.has(upper) ? 3 : 2;
}

/** A product's price in the currency's minor unit (øre, cents; yen for JPY), or null when it has none. */
export function priceMinor(entry, currency = 'NOK') {
  const price = Number(entry?.price);
  return Number.isFinite(price) && price >= 0 ? Math.round(price * 10 ** currencyExponent(currency)) : null;
}

/**
 * Computes the order total in the minor unit against the catalogues (kind
 * products). An unknown id or a product without a price gives null (the
 * order is rejected); the member price is a trust-based display and is
 * never charged (ADR-0020).
 * @param {Array<{id: string, qty: number}>} order Cleaned order (validOrderPayload)
 * @param {Array<{kind?: string, entries?: Array}>} catalogs The collection files
 * @param {string} [currency] The ISO code, for its minor unit
 * @returns {number|null}
 */
export function orderAmountMinor(order, catalogs, currency = 'NOK') {
  const products = productMap(catalogs);
  let sum = 0;
  for (const line of order) {
    const price = priceMinor(products.get(line.id), currency);
    if (price == null) return null;
    sum += price * line.qty;
  }
  return sum;
}

/**
 * Whether every order line's variant text is a label the basket makes for the product («M · Red», a size or a colour alone, as blocks/product.js joins them), compared whole, so a name that holds the separator itself still fits, and whether it names the size and the colour the product asks for (`requireSize`, `requireColor`, where it has sizes or colours), as the product block asks before the line is put in the basket.
 * A product without sizes or colours takes no variant.
 * @param {Array<{id: string, qty: number, variant?: string}>} order Cleaned order (validOrderPayload)
 * @param {Array<{kind?: string, entries?: Array}>} catalogs The collection files
 * @returns {boolean}
 */
export function validVariants(order, catalogs) {
  return variantProblems(order, catalogs).length === 0;
}

/**
 * The order lines whose variant does not fit their product now (validVariants), each by its product and variant, so the basket can take them out and the buyer choose again.
 * @param {Array<{id: string, qty: number, variant?: string}>} order Cleaned order (validOrderPayload)
 * @param {Array<{kind?: string, entries?: Array}>} catalogs The collection files
 * @returns {Array<{id: string, variant?: string}>}
 */
export function variantProblems(order, catalogs) {
  const products = productMap(catalogs);
  const problems = [];
  const refuse = (line) => problems.push({ id: line.id, ...(line.variant ? { variant: line.variant } : {}) });
  for (const line of order) {
    const entry = products.get(line.id);
    if (!entry) {
      refuse(line);
      continue;
    }
    const sizes = (Array.isArray(entry.sizes) ? entry.sizes : []).filter(Boolean).map(String);
    const colors = (Array.isArray(entry.colors) ? entry.colors : []).map((c) => String(c?.name ?? '')).filter(Boolean);
    let size = false;
    let color = false;
    if (line.variant) {
      if (sizes.some((s) => colors.some((c) => `${s} · ${c}` === line.variant))) size = color = true;
      else if (sizes.includes(line.variant)) size = true;
      else if (colors.includes(line.variant)) color = true;
      else {
        refuse(line);
        continue;
      }
    }
    if ((entry.requireSize === true && sizes.length && !size) || (entry.requireColor === true && colors.length && !color)) refuse(line);
  }
  return problems;
}

/**
 * The lines whose price in the basket is not the catalogue's now, each with the price that holds (as the catalogue writes it), so the basket can take it before the buyer pays; empty when every line agrees or carries no price.
 * Compared in the currency's minor unit.
 * @param {Array<{id: string, variant?: string, price?: number}>} order Cleaned order (validOrderPayload)
 * @param {Array<{kind?: string, entries?: Array}>} catalogs The collection files
 * @param {string} [currency]
 * @returns {Array<{id: string, variant?: string, price: number}>}
 */
export function priceChanges(order, catalogs, currency = 'NOK') {
  const products = productMap(catalogs);
  const factor = 10 ** currencyExponent(currency);
  const changed = [];
  for (const line of order) {
    if (line.price == null) continue;
    const entry = products.get(line.id);
    const now = priceMinor(entry, currency);
    if (now == null || now === Math.round(line.price * factor)) continue;
    changed.push({ id: line.id, ...(line.variant ? { variant: line.variant } : {}), price: Number(entry.price) });
  }
  return changed;
}

/** A product's quantity limits where the buyer types the quantity, as the basket reads them (shop.js quantityLimits): each from 1 to 99, the most never under the least; null without them. */
export function quantityLimits(entry) {
  const q = entry?.quantity;
  if (!q || typeof q !== 'object' || Array.isArray(q)) return null;
  const limit = (value, fallback) => {
    if (value == null || value === '') return fallback;
    const n = Number(value);
    return Number.isInteger(n) && n >= 1 && n <= 99 ? n : fallback;
  };
  const min = limit(q.min, 1);
  return { min, max: Math.max(min, limit(q.max, 99)) };
}

/**
 * The basket lines whose quantity lies outside their product's limits, each with the limits the catalogue holds now, so the basket can take them.
 * A line is a product and its variant, as the basket keys it, and lines the payload repeats are added together first.
 * A product without limits takes any quantity the payload check let through (1 to 99).
 * @param {Array<{id: string, qty: number, variant?: string}>} order Cleaned order (validOrderPayload)
 * @param {Array<{kind?: string, entries?: Array}>} catalogs The collection files
 * @returns {Array<{id: string, variant?: string, min: number, max: number}>}
 */
export function quantityProblems(order, catalogs) {
  const products = productMap(catalogs);
  const lines = new Map();
  for (const line of order) {
    const key = `${line.id}\u0000${line.variant ?? ''}`;
    const held = lines.get(key);
    if (held) held.qty += line.qty;
    else lines.set(key, { id: line.id, variant: line.variant, qty: line.qty });
  }
  const problems = [];
  for (const line of lines.values()) {
    const limits = quantityLimits(products.get(line.id));
    if (limits && (line.qty < limits.min || line.qty > limits.max)) {
      problems.push({ id: line.id, ...(line.variant ? { variant: line.variant } : {}), ...limits });
    }
  }
  return problems;
}

/** Whether every basket line's quantity is within its product's limits (quantityProblems). */
export function validQuantities(order, catalogs) {
  return quantityProblems(order, catalogs).length === 0;
}

/**
 * The order lines with the product's title, the variant and the prices in
 * the minor unit, for a provider's receipt or line items.
 * @returns {Array<{id: string, name: string, qty: number, unit: number, total: number}>|null} null when a line has no priced product
 */
export function orderLineItems(order, catalogs, currency = 'NOK') {
  const products = productMap(catalogs);
  const lines = [];
  for (const line of order) {
    const entry = products.get(line.id);
    const unit = priceMinor(entry, currency);
    if (unit == null) return null;
    const title = String(entry.title ?? line.id).trim() || line.id;
    lines.push({ id: line.id, name: line.variant ? `${title} (${line.variant})` : title, qty: line.qty, unit, total: unit * line.qty });
  }
  return lines;
}

/** The order in one line for a payment's description, read in the provider's portal: the lines and the typed contact fields. */
export function orderDescription(order, contact, max = 100) {
  const lines = order
    .map((line) => `${line.qty} x ${line.id}${line.variant ? ` (${line.variant})` : ''}`)
    .join(', ');
  const who = [contact?.name, contact?.email, contact?.phone].filter(Boolean).join(' / ');
  return `${lines}${who ? ` - ${who}` : ''}`.slice(0, max);
}

/** Payment reference in the form every provider takes ([a-zA-Z0-9-], 8 to 64 characters), unique per site. */
export function makeReference() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `urd-${hex}`;
}

/** Whether a value is a reference makeReference made (anchored, the CodeQL lesson). */
export function isReference(value) {
  return typeof value === 'string' && /^urd-[0-9a-f]{24}$/.test(value);
}

/** The currency the layer charges in, from `site.commerce.currency` (ISO 4217), else NOK. */
export function orderCurrency(site) {
  const code = String(site?.commerce?.currency ?? '').toUpperCase();
  return /^[A-Z]{3}$/.test(code) ? code : 'NOK';
}

/** Whether the seller is registered for VAT (site.contact.vat.registered); a receipt without tax lines is sent only when not. */
export function vatRegistered(site) {
  return site?.contact?.vat?.registered === true;
}

/** The providers the layer knows, as the `via` of a return address and the folder of the endpoints. */
export const PROVIDERS = ['vipps', 'stripe', 'paypal'];

/** The return address of the checkout page with the payment's reference and the provider that answers for it, in the draft view when the order came from it. */
export function returnUrl(origin, returnPath, reference, provider, draft = false) {
  return `${origin}${returnPath ?? '/'}?${draft ? 'draft=1&' : ''}ordered=${reference}&via=${provider}`;
}

/** The checkout page a cancelled payment goes back to, the draft view when the order came from it. */
export function cancelUrl(origin, returnPath, draft = false) {
  return `${origin}${returnPath ?? '/'}${draft ? '?draft=1' : ''}`;
}

/** A JSON file from our own deploy, or null. */
export async function ownJson(origin, path) {
  try {
    const res = await fetch(`${origin}${path}`);
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

/**
 * Reads the site file and the product catalogues from our own deploy (same origin): git is the source of truth for prices.
 * The site file holds the site's settings under `site` and the page register beside them, under `pages`.
 * @returns {Promise<{site: object|null, pages: Array<{id: string, path: string}>, catalogs: Array<object>}|null>} null when the catalogue index cannot be read
 */
export async function readShop(origin) {
  const index = await ownJson(origin, '/content/samlinger.json');
  if (!index) return null;
  const [file, ...catalogs] = await Promise.all([
    ownJson(origin, '/content/site.json'),
    ...(index.samlinger ?? []).slice(0, 50).map((id) => ownJson(origin, `/content/samlinger/${encodeURIComponent(id)}.json`)),
  ]);
  return { site: file?.site ?? null, pages: Array.isArray(file?.pages) ? file.pages : [], catalogs: catalogs.filter(Boolean) };
}

/**
 * Whether a checkout block's payments offer a provider in a way: Vipps in the app (`vipps`) or on its card page (`card: 'vipps'`), Stripe for cards, PayPal by its own button.
 * @param {object} pays The block's `payments`
 * @param {'vipps'|'stripe'|'paypal'} provider
 * @param {'wallet'|'card'} [method] Vipps's way
 */
function offersPayment(pays, provider, method = 'wallet') {
  if (provider === 'stripe') return pays?.card === 'stripe';
  if (provider === 'paypal') return pays?.paypal === true;
  if (provider === 'vipps') return method === 'card' ? pays?.card === 'vipps' : pays?.vipps === true;
  return false;
}

/**
 * The payment settings of the checkout block the buyer orders from, read from the site's own page file as published: the page whose registered path is the return path, and on it the first checkout block that offers the provider in the way asked (offersPayment).
 * Null when the page or such a block cannot be found, and the order is then refused: the client's words never decide a setting the block owns (ADR-0028 decision 1), nor a way to pay the page does not offer.
 * @param {string} origin
 * @param {Array<{id: string, path: string}>} pages The page register (the site file's `pages`)
 * @param {string} returnPath The validated return path
 * @param {'vipps'|'stripe'|'paypal'} provider
 * @param {'wallet'|'card'} [method]
 * @returns {Promise<object|null>} The block's `payments`, as stored
 */
export async function pageCheckout(origin, pages, returnPath, provider, method = 'wallet') {
  const wanted = returnPath.length > 1 ? returnPath.replace(/\/+$/, '') : '/';
  const page = (Array.isArray(pages) ? pages : []).find((p) => typeof p?.path === 'string' && (p.path.length > 1 ? p.path.replace(/\/+$/, '') : '/') === wanted);
  if (!page?.id || !/^[a-z0-9][a-z0-9-]*$/.test(page.id)) return null;
  const file = await ownJson(origin, `/content/pages/${page.id}.json`);
  const blocks = [];
  for (const section of file?.sections ?? []) for (const block of section?.blocks ?? []) if (block?.type === 'checkout' && block.props?.payments && typeof block.props.payments === 'object') blocks.push(block.props.payments);
  return blocks.find((pays) => offersPayment(pays, provider, method)) ?? null;
}

const encoder = new TextEncoder();

/**
 * The key that lets the page that started a payment read the buyer's details on its return: an HMAC of the reference with the provider's own secret, so it is made again from the reference alone and never stored.
 * The checkout gives it to the page, which keeps it in sessionStorage and never in an address; a return address shared or copied carries the reference without it.
 * @param {string} secret The provider's secret key
 * @param {string} reference
 * @returns {Promise<string>} 32 hex characters
 */
export async function buyerKey(secret, reference) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(String(secret)), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(`urd-buyer:${reference}`)));
  return [...mac.slice(0, 16)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Whether a session ask carries the buyer key of its reference (the `x-urd-key` header), compared in constant time.
 * @param {Request} request
 * @param {string} secret
 * @param {string} reference
 */
export async function hasBuyerKey(request, secret, reference) {
  const given = String(request.headers.get('x-urd-key') ?? '');
  const want = await buyerKey(secret, reference);
  if (given.length !== want.length) return false;
  let diff = 0;
  for (let i = 0; i < want.length; i += 1) diff |= given.charCodeAt(i) ^ want.charCodeAt(i);
  return diff === 0;
}

/**
 * An amount in the currency's minor unit as the currency writes it (350 øre as 3.5), or null where it is not a number.
 * @param {unknown} minor
 * @param {string} currency
 */
export function majorAmount(minor, currency) {
  const n = Number(minor);
  return minor != null && Number.isFinite(n) ? n / 10 ** currencyExponent(currency) : null;
}

/**
 * A session endpoint's answer: whether the payment is paid or open and its state for anyone who asks with the reference, and the buyer's details and the amount the provider confirms only for the page that started it (hasBuyerKey).
 * @param {{paid: boolean, open: boolean, state: string, buyer?: object, amount?: number|null}} summary
 * @param {boolean} keyed
 */
export function sessionAnswer(summary, keyed) {
  return {
    paid: summary.paid,
    open: summary.open,
    state: summary.state,
    ...(keyed ? { buyer: summary.buyer ?? {}, ...(Number.isFinite(summary.amount) ? { amount: summary.amount } : {}) } : {}),
  };
}

/** The JSON answer the endpoints give, never cached. */
export const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

/**
 * The checks every checkout endpoint runs before it talks to a provider:
 * the payload, the shop files, the total, the variants and the choices they need, the prices the basket shows, and the page's checkout block offering this way to pay (`settings`, its payments).
 * @param {Request} request
 * @param {'vipps'|'stripe'|'paypal'} provider
 * @returns {Promise<{clean: object, payload: object, origin: string, site: object|null, catalogs: Array<object>, amountMinor: number, currency: string, settings: object}|{error: Response}>}
 */
export async function prepareOrder(request, provider) {
  // An order is sent as JSON by the checkout block; a form posted from another site cannot send that type, so it creates no payment.
  if (!isJsonRequest(request)) return { error: json({ error: 'The order must be sent as JSON', code: 'orderInvalid' }, 415) };
  let payload = null;
  try {
    payload = await request.json();
  } catch {
    return { error: json({ error: 'Invalid request body', code: 'orderInvalid' }, 400) };
  }
  const clean = validOrderPayload(payload);
  if (!clean) return { error: json({ error: 'Invalid order', code: 'orderInvalid' }, 400) };
  const origin = new URL(request.url).origin;
  const shop = await readShop(origin);
  if (!shop) return { error: json({ error: 'Could not read the catalogue', code: 'catalogUnreachable' }, 502) };
  const currency = orderCurrency(shop.site);
  const amountMinor = orderAmountMinor(clean.order, shop.catalogs, currency);
  if (amountMinor == null || amountMinor <= 0) {
    return { error: json({ error: 'Unknown product in the order', code: 'orderInvalid' }, 400) };
  }
  // The variant text goes on the receipt, so it must be a choice the product has now, and name the size and colour the product asks for; the lines that do not go back, so the basket can take them out and the buyer choose again.
  const choices = variantProblems(clean.order, shop.catalogs);
  if (choices.length) {
    return { error: json({ error: 'A product in the order needs its size or colour chosen again', code: 'orderChoice', lines: choices }, 400) };
  }
  // A quantity outside the product's least or most: limits changed since the line was added, or a basket changed by hand. The lines go back with the limits that hold, so the basket can take them.
  const problems = quantityProblems(clean.order, shop.catalogs);
  if (problems.length) {
    return { error: json({ error: 'A quantity outside the product\'s limits', code: 'orderQuantity', lines: problems }, 400) };
  }
  // A price changed since the line went into the basket: the lines go back with the prices that hold, so the buyer sees the total that will be charged before paying.
  const changed = priceChanges(clean.order, shop.catalogs, currency);
  if (changed.length) {
    return { error: json({ error: 'A price changed since the basket was filled', code: 'orderPrices', lines: changed }, 409) };
  }
  // The way to pay must be one the page's own checkout block offers, as published.
  const settings = await pageCheckout(origin, shop.pages, clean.returnPath, provider, clean.method);
  if (!settings) {
    return { error: json({ error: 'The published checkout page does not offer this way to pay', code: 'payNotOffered' }, 400) };
  }
  return { clean, payload, origin, site: shop.site, catalogs: shop.catalogs, amountMinor, currency, settings };
}
