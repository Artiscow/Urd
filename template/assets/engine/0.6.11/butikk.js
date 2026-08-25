/**
 * Butikken (ADR-0007-mønsteret på handel): ren handlekurv-logikk og
 * localStorage-lagring. Kurven er en flat liste av linjer {key, id, title,
 * price, qty, variant?, image?}; key identifiserer produkt + variantvalg,
 * så samme produkt i to størrelser er to linjer. De rene hjelperne muterer
 * aldri input og testes i tests/butikk.test.mjs; blokkene (blocks/produkt.js
 * og blocks/handlekurv.js) står for rendering.
 *
 * Kjernen er gateway-fri: kurven bor hos den besøkende (localStorage),
 * og bestillingen sendes som skjema i kassen. Ingen nettverkskall her.
 */

/** localStorage-nøkkelen for kurven (deles av alle sidene på nettstedet). */
export const CART_KEY = 'urd-cart';

/** Linjenøkkel for et produkt + variantvalg: samme nøkkel = samme linje. */
export function itemKey(id, variant) {
  return variant ? `${id}|${variant}` : String(id);
}

/** Variant-etikett fra valgene (størrelse/farge): «M · Rød», tom uten valg. */
export function variantLabel(size, color) {
  return [size, color].filter(Boolean).join(' · ');
}

/** Klemmer et antall til et helt tall i [0, 99]; ugyldig gir 0. */
function clampQty(value) {
  const n = Math.trunc(Number(value));
  return Number.isFinite(n) ? Math.min(99, Math.max(0, n)) : 0;
}

/** Én gyldig kurvlinje fra rå data (localStorage kan inneholde hva som helst). */
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
 * Legger en linje i kurven: finnes nøkkelen fra før, økes antallet,
 * ellers legges linjen til sist. Returnerer alltid en ny liste.
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

/** Setter antallet på en linje; 0 (eller mindre) fjerner linjen. */
export function cartSetQty(items, key, qty) {
  const n = clampQty(qty);
  if (!n) return items.filter((line) => line.key !== key);
  return items.map((line) => (line.key === key ? { ...line, qty: n } : line));
}

/** Fjerner en linje fra kurven. */
export function cartRemove(items, key) {
  return items.filter((line) => line.key !== key);
}

/** Samlet antall varer (summen av linjenes qty). */
export function cartCount(items) {
  return items.reduce((sum, line) => sum + clampQty(line.qty), 0);
}

/** Samlet pris for kurven. */
export function cartTotal(items) {
  return items.reduce((sum, line) => sum + Number(line.price) * clampQty(line.qty), 0);
}

/**
 * Prisvisning: heltall uten desimaler, ellers to desimaler med komma,
 * pluss valuta-ordet («350 kr», «49,50 kr»). Bevisst uten Intl: formatet
 * er deterministisk i node-testene og likt for alle besøkende.
 */
export function formatPrice(value, currency = 'kr') {
  const n = Number(value);
  if (!Number.isFinite(n)) return '';
  const text = Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',');
  return currency ? `${text} ${currency}` : text;
}

/** Kortets sekundærbilde (hover-bytte): første fargebilde ulikt hovedbildet. */
export function altCardImage(entry) {
  const main = entry?.image || '';
  for (const color of entry?.colors ?? []) {
    if (color?.image && color.image !== main) return color.image;
  }
  return null;
}

/** Praktisk e-postsjekk (ikke RFC-fullstendig, men fanger vanlige feil). */
export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? '').trim());
}

/** Ordrelinjer som ren tekst: «2 × Sjokoladekake (Stor) - 700 kr». */
export function orderLines(items, currency = 'kr') {
  return items.map((line) => {
    const name = line.variant ? `${line.title} (${line.variant})` : line.title;
    return `${line.qty} × ${name} - ${formatPrice(Number(line.price) * clampQty(line.qty), currency)}`;
  });
}

/**
 * E-postkroppen for en bestilling: ordrelinjene, sumlinjen og kontaktfeltene.
 * fields er {etikett: verdi} med besøkende-språkets etiketter (i18n hos
 * kalleren); tomme felt utelates.
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

/** mailto-URL med emne og kropp (alt URL-encodet); null uten mottaker. */
export function buildOrderMailto(recipient, subject, body) {
  const to = String(recipient ?? '').trim();
  if (!to) return null;
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return query ? `mailto:${to}?${query}` : `mailto:${to}`;
}

/** Payload til et valgfritt endepunkt: kontaktfeltene + ordrelinjene som data. */
export function buildOrderPayload(items, fields) {
  return {
    ...fields,
    order: items.map(({ id, title, price, qty, variant }) => ({ id, title, price, qty, ...(variant ? { variant } : {}) })),
    total: cartTotal(items),
  };
}

/**
 * Kurvlytter for blokkene: kaller handler ved urd-cart-change og ved
 * storage-endringer fra andre faner. Re-render gir nytt blokk-element, og
 * frakoblede elementers lyttere feies ved neste registrering, så lyttere
 * aldri stables per utkast-melding (samme leksa som renderNav).
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

/** Leser kurven fra localStorage; ødelagt/manglende data gir tom kurv. */
export function readCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
    return Array.isArray(raw) ? raw.map(cleanItem).filter(Boolean) : [];
  } catch {
    return [];
  }
}

/** Skriver kurven og varsler lytterne (urd-cart-change på document). */
export function writeCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // Full/utilgjengelig lagring: kurven lever videre i minnet denne visningen.
  }
  document.dispatchEvent(new CustomEvent('urd-cart-change', { detail: { count: cartCount(items) } }));
}
