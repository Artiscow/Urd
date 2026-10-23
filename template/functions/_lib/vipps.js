/**
 * Pure logic for the optional payment layer on the Vipps MobilePay ePayment
 * API (ADR-0020): reading the configuration, validating the payload,
 * converting to øre against the git-owned catalogue, the payment body for
 * epayment/v1, the reading of a payment's state, the access-token cache and
 * the webhook signature check. No fetch here; the endpoints under
 * api/vipps/ handle the network. Tested in tests/vipps.test.mjs.
 *
 * The amount is ALWAYS recomputed from the catalogue: the basket lives with
 * the visitor, so anything the client sends may have been tampered with.
 */

/** Reads the configuration from env; null when the payment layer is not set up. */
export function vippsConfig(env) {
  const clientId = env?.VIPPS_CLIENT_ID;
  const clientSecret = env?.VIPPS_CLIENT_SECRET;
  const subscriptionKey = env?.VIPPS_SUBSCRIPTION_KEY;
  const msn = env?.VIPPS_MSN;
  if (!clientId || !clientSecret || !subscriptionKey || !msn) return null;
  return {
    clientId,
    clientSecret,
    subscriptionKey,
    msn,
    apiBase: env.VIPPS_API_BASE || 'https://api.vipps.no',
    // The secret the webhook registration answered with; without it the webhook endpoint takes nothing.
    webhookSecret: env.VIPPS_WEBHOOK_SECRET || '',
  };
}

/** Entry ids follow the same regime as the collections (anchored, the CodeQL lesson). */
const ID_RE = /^[a-z0-9][a-z0-9-]*$/;

/**
 * Validates and cleans the order payload from the client. Only the shape is
 * accepted: order lines with a known id form and clamped quantities, contact
 * fields as short strings. Prices from the client are deliberately ignored.
 * @returns {{order: Array<{id: string, qty: number, variant?: string}>, contact: {name: string, email: string, phone: string, comment: string}}|null}
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
    order.push(clean);
  }
  const field = (value) => String(value ?? '').slice(0, 200).trim();
  // Return path: an internal path on our own site (anchored; never a full URL from the client).
  const rawPath = String(payload.returnPath ?? '/');
  const returnPath = /^\/[a-z0-9\-/]*$/.test(rawPath) && rawPath.length <= 200 ? rawPath : '/';
  return {
    order,
    returnPath,
    contact: {
      name: field(payload.contact?.name),
      email: field(payload.contact?.email),
      phone: field(payload.contact?.phone),
      comment: field(payload.contact?.comment),
    },
  };
}

/** The products by id across the catalogues of kind products; the first catalogue that names an id wins. */
function productMap(catalogs) {
  const products = new Map();
  for (const catalog of catalogs) {
    if (catalog?.kind !== 'products') continue;
    for (const entry of catalog.entries ?? []) {
      if (entry?.id && !products.has(entry.id)) products.set(entry.id, entry);
    }
  }
  return products;
}

/** A product's price in øre, or null when it has none. */
function priceOre(entry) {
  const price = Number(entry?.price);
  return Number.isFinite(price) && price >= 0 ? Math.round(price * 100) : null;
}

/**
 * Computes the order total in øre against the catalogues (kind products). An
 * unknown id or a product without a price gives null (the order is rejected);
 * the member price is a trust-based display and is never charged (ADR-0020).
 * @param {Array<{id: string, qty: number}>} order Cleaned order (validOrderPayload)
 * @param {Array<{kind?: string, entries?: Array}>} catalogs The collection files
 * @returns {number|null}
 */
export function orderAmountOre(order, catalogs) {
  const products = productMap(catalogs);
  let sum = 0;
  for (const line of order) {
    const price = priceOre(products.get(line.id));
    if (price == null) return null;
    sum += price * line.qty;
  }
  return sum;
}

/** Payment reference in the ePayment form [a-zA-Z0-9-]{8,64}, unique per sales unit. */
export function makeReference() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `urd-${hex}`;
}

/** Whether a value is a reference makeReference made (anchored, the CodeQL lesson). */
export function isReference(value) {
  return typeof value === 'string' && /^urd-[0-9a-f]{24}$/.test(value);
}

/**
 * Whether every order line's variant text is a label the basket makes for the product («M · Red», a size or a colour alone, as blocks/product.js joins them), compared whole, so a name that holds the separator itself still fits.
 * A line without a variant is fine; a product without sizes or colours takes no variant.
 * @param {Array<{id: string, qty: number, variant?: string}>} order Cleaned order (validOrderPayload)
 * @param {Array<{kind?: string, entries?: Array}>} catalogs The collection files
 * @returns {boolean}
 */
export function validVariants(order, catalogs) {
  const products = productMap(catalogs);
  for (const line of order) {
    if (!line.variant) continue;
    const entry = products.get(line.id);
    if (!entry) return false;
    const sizes = (Array.isArray(entry.sizes) ? entry.sizes : []).map(String);
    const colors = (Array.isArray(entry.colors) ? entry.colors : []).map((c) => String(c?.name ?? '')).filter(Boolean);
    const labels = new Set([...sizes, ...colors]);
    for (const size of sizes) for (const color of colors) labels.add(`${size} · ${color}`);
    if (!labels.has(line.variant)) return false;
  }
  return true;
}

/** The profile the payment asks the buyer to share in the app: what the order form asks for, so the fields can be left empty. */
export const PROFILE_SCOPE = 'name email phoneNumber';

/**
 * The order lines for the receipt in the buyer's app, in øre, with the tax
 * fields at zero: the receipt is sent only for a seller who is not registered
 * for VAT (buildPayment leaves it out otherwise), and the VAT lines come with
 * the shop of v1.1 (ADR-0027). The name is the product's title with the
 * variant, the id the catalogue id.
 * @param {Array<{id: string, qty: number, variant?: string}>} order Cleaned order
 * @param {Array<{kind?: string, entries?: Array}>} catalogs The collection files
 * @returns {Array<object>|null} null when a line has no priced product
 */
export function receiptLines(order, catalogs) {
  const products = productMap(catalogs);
  const lines = [];
  for (const line of order) {
    const entry = products.get(line.id);
    const unit = priceOre(entry);
    if (unit == null) return null;
    const total = unit * line.qty;
    const title = String(entry.title ?? line.id).trim() || line.id;
    lines.push({
      name: (line.variant ? `${title} (${line.variant})` : title).slice(0, 2048),
      id: line.id,
      totalAmount: total,
      totalAmountExcludingTax: total,
      totalTaxAmount: 0,
      taxRate: 0,
      unitInfo: { unitPrice: unit, quantity: String(line.qty), quantityUnit: 'PCS' },
    });
  }
  return lines;
}

/**
 * The body for POST {apiBase}/epayment/v1/payments: a wallet payment through
 * the web redirect, reserved now and captured by the seller when the goods
 * ship. The order lines and the typed contact fields ride along as the
 * description, so the order can be read in the Vipps portal; the receipt
 * carries the lines into the buyer's app when the seller sends one; the
 * profile scope asks the app for the contact details. The site stores
 * nothing itself (ADR-0020).
 * @param {object} args
 * @param {Array<object>|null} [args.receipt] The lines from receiptLines, or null for no receipt
 */
export function buildPayment({ amountOre, reference, order, contact, origin, returnPath, receipt = null }) {
  const lines = order
    .map((line) => `${line.qty} x ${line.id}${line.variant ? ` (${line.variant})` : ''}`)
    .join(', ');
  const who = [contact.name, contact.email, contact.phone].filter(Boolean).join(' / ');
  // The description holds at most 100 characters; an order line alone is past its minimum of 3.
  const paymentDescription = `${lines}${who ? ` - ${who}` : ''}`.slice(0, 100);
  const body = {
    amount: { currency: 'NOK', value: amountOre },
    paymentMethod: { type: 'WALLET' },
    reference,
    userFlow: 'WEB_REDIRECT',
    // The reference travels with the return, so the page can ask the session endpoint whether this payment went through.
    returnUrl: `${origin}${returnPath ?? '/'}?ordered=${reference}`,
    paymentDescription,
    profile: { scope: PROFILE_SCOPE },
  };
  if (receipt?.length) body.receipt = { orderLines: receipt, bottomLine: { currency: 'NOK' } };
  return body;
}

/** The payment states of epayment/v1 in which the buyer may still be paying. */
export const OPEN_STATES = ['CREATED'];

/**
 * Reads what the checkout page needs from GET {apiBase}/epayment/v1/payments/{reference}:
 * whether the money is reserved, the state word, and the buyer's shared
 * contact details for the receipt on the page. The state arrives as a word,
 * or as a list whose first entry is the current one.
 * @returns {{paid: boolean, state: string, buyer: {name: string, email: string, phone: string}}|null} null for an answer without a state
 */
export function paymentSummary(payment) {
  const raw = Array.isArray(payment?.state) ? payment.state[0] : payment?.state;
  const state = typeof raw === 'string' ? raw : '';
  if (!state) return null;
  const details = payment.userDetails && typeof payment.userDetails === 'object' ? payment.userDetails : {};
  const field = (value) => String(value ?? '').slice(0, 200).trim();
  const name = [field(details.firstName), field(details.lastName)].filter(Boolean).join(' ');
  return {
    paid: state === 'AUTHORIZED',
    state,
    buyer: { name, email: field(details.email), phone: field(details.mobileNumber) },
  };
}

/** How long before its expiry a cached access token is dropped, in seconds. */
const TOKEN_MARGIN = 60;

/**
 * The access token to keep from an answer of POST {apiBase}/accesstoken/get, with the
 * time it may be used until. The token is valid 24 hours in production and
 * 1 hour in the test environment; the answer says which.
 * @param {{access_token?: string, expires_on?: string|number, expires_in?: string|number}} answer
 * @param {number} now Unix seconds
 * @returns {{token: string, until: number}|null}
 */
export function tokenFromAnswer(answer, now) {
  const token = typeof answer?.access_token === 'string' ? answer.access_token : '';
  if (!token) return null;
  const on = Number(answer.expires_on);
  const within = Number(answer.expires_in);
  const until = Number.isFinite(on) && on > now ? on : Number.isFinite(within) && within > 0 ? now + within : now + 300;
  return { token, until: until - TOKEN_MARGIN };
}

/** Whether a cached token may still be sent. */
export function tokenFresh(cached, now) {
  return Boolean(cached?.token) && cached.until > now;
}

const encoder = new TextEncoder();

/** Base64 of a byte buffer. */
function base64(bytes) {
  let binary = '';
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

/**
 * The signature a webhook delivery must carry (the Webhooks API's request
 * authentication): base64 of HMAC-SHA256 over «POST\n<path and query>\n<date>;<host>;<body hash>»,
 * keyed with the registration's secret, where the body hash is base64 of SHA-256 over the body.
 * @param {{method?: string, pathAndQuery: string, date: string, host: string, body: string}} delivery
 * @param {string} secret
 * @returns {Promise<{contentHash: string, signature: string}>}
 */
export async function webhookSignature({ method = 'POST', pathAndQuery, date, host, body }, secret) {
  const contentHash = base64(await crypto.subtle.digest('SHA-256', encoder.encode(body)));
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const toSign = `${method}\n${pathAndQuery}\n${date};${host};${contentHash}`;
  const signature = base64(await crypto.subtle.sign('HMAC', key, encoder.encode(toSign)));
  return { contentHash, signature };
}

/** The signature in an Authorization header of the webhook form, or '' for any other header. */
export function signatureOf(authorization) {
  const match = /^HMAC-SHA256 SignedHeaders=x-ms-date;host;x-ms-content-sha256&Signature=([A-Za-z0-9+/=]+)$/.exec(String(authorization ?? ''));
  return match ? match[1] : '';
}

/** Constant-time comparison of two short strings. */
function sameText(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * Whether a webhook delivery is signed by the registration's secret: the body
 * hash in x-ms-content-sha256 must be the body's, and the signature in the
 * Authorization header must be the one webhookSignature computes.
 * @param {{method: string, pathAndQuery: string, host: string, headers: {get(name: string): string|null}, body: string}} delivery
 * @param {string} secret
 * @returns {Promise<boolean>}
 */
export async function verifyWebhook({ method, pathAndQuery, host, headers, body }, secret) {
  if (!secret) return false;
  const date = headers.get('x-ms-date') ?? '';
  const claimedHash = headers.get('x-ms-content-sha256') ?? '';
  const claimed = signatureOf(headers.get('authorization'));
  if (!date || !claimedHash || !claimed) return false;
  const { contentHash, signature } = await webhookSignature({ method, pathAndQuery, date, host, body }, secret);
  return sameText(contentHash, claimedHash) && sameText(signature, claimed);
}
