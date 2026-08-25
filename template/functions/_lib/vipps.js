/**
 * Ren logikk for det valgfrie Vipps Checkout-betalingslaget (ADR-0020):
 * konfigurasjonslesing, payload-validering, omregning til øre mot den
 * git-eide katalogen, og sesjonskroppen mot checkout/v3. Ingen fetch her;
 * endepunktet (api/vipps/checkout.js) står for nettverket. Testes i
 * tests/vipps.test.mjs.
 *
 * Beløpet regnes ALLTID på nytt fra katalogen: kurven bor hos den
 * besøkende, så alt klienten sender kan være tuklet med.
 */

/** Leser konfigurasjonen fra env; null når betalingslaget ikke er satt opp. */
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
  };
}

/** Innslags-id-ene deler regime med samlingene (ankret, CodeQL-leksa). */
const ID_RE = /^[a-z0-9][a-z0-9-]*$/;

/**
 * Validerer og renser bestillings-payloaden fra klienten. Kun formen
 * godtas: ordrelinjer med kjent id-form og klemte antall, kontaktfelt som
 * korte strenger. Priser fra klienten ignoreres bevisst.
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
      const variant = String(line.variant).slice(0, 80);
      if (variant) clean.variant = variant;
    }
    order.push(clean);
  }
  const field = (value) => String(value ?? '').slice(0, 200).trim();
  // Retursti: intern sti på egen side (ankret; aldri en full URL fra klienten).
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

/**
 * Regner ordresummen i øre mot katalogene (kind products). Ukjent id eller
 * produkt uten pris gir null (bestillingen avvises); medlemspris er
 * tillitsbasert visning og belastes aldri (ADR-0020).
 * @param {Array<{id: string, qty: number}>} order Renset ordre (validOrderPayload)
 * @param {Array<{kind?: string, entries?: Array}>} catalogs Samlingsfilene
 * @returns {number|null}
 */
export function orderAmountOre(order, catalogs) {
  const prices = new Map();
  for (const catalog of catalogs) {
    if (catalog?.kind !== 'products') continue;
    for (const entry of catalog.entries ?? []) {
      const price = Number(entry?.price);
      if (entry?.id && Number.isFinite(price) && price >= 0 && !prices.has(entry.id)) {
        prices.set(entry.id, price);
      }
    }
  }
  let sum = 0;
  for (const line of order) {
    const price = prices.get(line.id);
    if (price == null) return null;
    sum += Math.round(price * 100) * line.qty;
  }
  return sum;
}

/** Sesjonsreferanse på Vipps-formen [a-zA-Z0-9-]{8,50}. */
export function makeReference() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `urd-${hex}`;
}

/**
 * Kroppen til POST {apiBase}/checkout/v3/session. Ordrelinjene og
 * kontaktfeltene følger med som beskrivelse, så bestillingen kan leses i
 * Vipps-portalen; siden lagrer ingenting selv (ADR-0020).
 */
export function buildSession({ amountOre, reference, order, contact, origin, returnPath, callbackToken }) {
  const lines = order
    .map((line) => `${line.qty} x ${line.id}${line.variant ? ` (${line.variant})` : ''}`)
    .join(', ');
  const who = [contact.name, contact.email, contact.phone].filter(Boolean).join(' / ');
  return {
    merchantInfo: {
      callbackUrl: `${origin}/api/vipps/callback`,
      returnUrl: `${origin}${returnPath ?? '/'}?bestilt=1`,
      callbackAuthorizationToken: callbackToken,
    },
    transaction: {
      amount: { value: amountOre, currency: 'NOK' },
      reference,
      paymentDescription: `${lines}${who ? ` - ${who}` : ''}`.slice(0, 100),
    },
  };
}
