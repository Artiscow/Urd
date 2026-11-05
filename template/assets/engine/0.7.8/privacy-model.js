/**
 * The facts the privacy page is written from (0.7.24.2): who is responsible
 * for the site, what each form sends and to whom, what the checkout does and
 * through which payment providers, whether visitors are measured, which
 * third parties' frames the pages hold, and who hosts the site. Read from
 * site.json and the page files, so the page follows the settings; pure, so
 * blocks/privacy.js only writes it out (tests/privacy-model.test.mjs).
 */
import { siteContact, contactDesign } from './contact-model.js';
import { providerOf } from './embed-cover.js';
import { embedUrl } from './blocks/video.js';
import { parseLocation } from './osm.js';

/** The payment providers a checkout can hold, in the order the page names them. */
export const PAYMENT_PROVIDERS = ['vipps', 'stripe', 'paypal', 'manual'];

/** The providers a checkout's `payments` names: Vipps MobilePay also where the card button goes through Vipps, Stripe where it goes through Stripe, PayPal, and the manual ways (an invoice, a transfer). */
export function paymentProviders(payments) {
  const pay = payments ?? {};
  const on = {
    vipps: pay.vipps === true || pay.card === 'vipps',
    stripe: pay.card === 'stripe',
    paypal: pay.paypal === true,
    manual: Array.isArray(pay.manual) && pay.manual.length > 0,
  };
  return PAYMENT_PROVIDERS.filter((id) => on[id]);
}

/**
 * The host of an address a form or the checkout sends to, or '' for an address that is not one.
 * @param {string} url
 */
export function endpointHost(url) {
  try {
    const u = new URL(String(url ?? ''));
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.hostname : '';
  } catch {
    return '';
  }
}

/** The texts of a form's fields, as the page names what the form sends. */
function fieldNames(fields) {
  return (Array.isArray(fields) ? fields : [])
    .map((f) => String(f?.label ?? f?.name ?? '').trim())
    .filter(Boolean);
}

/** A point written into a map block's props by the address search. */
const validPoint = (p) => Number.isFinite(p.lat) && Number.isFinite(p.lon);

/**
 * The footer's newsletter sign-up, where the footer has one: an email address sent to a service or by email, on every page.
 * @param {object} site
 * @returns {object|null} A form like a page's, placed in the footer
 */
export function footerForm(site) {
  const cta = site?.footer?.cta;
  if (cta?.kind !== 'newsletter') return null;
  const host = endpointHost(cta.endpoint);
  return { page: '', path: '', footer: true, fields: [], mode: host ? 'endpoint' : 'mailto', recipient: host ? '' : String(cta.recipient ?? '').trim(), host };
}

/** A page's name, as the forms on it are placed by it. */
function pageTitle(entry, page) {
  return String(page?.meta?.title ?? entry?.title ?? entry?.id ?? '').trim();
}

/**
 * The facts of one page: its forms, its checkout and the third parties' frames it holds.
 * @param {{id?: string, title?: string, path?: string}} entry The page registry's entry
 * @param {{meta?: object, sections?: object[]}} page The page file
 * @param {{siteGeo?: boolean}} [options] siteGeo: the site's contact details hold a point on the map, which the contact block's map design needs to draw one
 */
export function pageFacts(entry, page, { siteGeo = false } = {}) {
  const title = pageTitle(entry, page);
  const path = String(entry?.path ?? '');
  const forms = [];
  let checkout = null;
  let shop = false;
  const embeds = new Set();
  const atOnce = new Set();
  const frame = (id, props) => {
    embeds.add(id);
    if (props.askFirst === false) atOnce.add(id);
  };
  for (const section of page?.sections ?? []) {
    for (const block of section.blocks ?? []) {
      const p = block.props ?? {};
      if (block.type === 'form') {
        const byEndpoint = p.mode === 'endpoint' && endpointHost(p.endpoint);
        forms.push({ page: title, path, fields: fieldNames(p.fields), mode: byEndpoint ? 'endpoint' : 'mailto', recipient: byEndpoint ? '' : String(p.recipient ?? '').trim(), host: byEndpoint || '' });
      } else if (block.type === 'product' || block.type === 'cart') {
        shop = true;
      } else if (block.type === 'checkout' && !checkout) {
        shop = true;
        checkout = { page: title, path, providers: paymentProviders(p.payments), recipient: String(p.recipient ?? '').trim(), host: endpointHost(p.endpoint) };
      } else if (block.type === 'video' && p.source !== 'file') {
        const provider = providerOf(embedUrl(p.url) || '');
        if (provider) frame(provider.id, p);
      } else if (block.type === 'map' && (validPoint(p) || parseLocation(p.location))) {
        // A map draws its frame only where its place is a point (blocks/map.js); the contact block's map design only with the site's point.
        frame('openstreetmap', p);
      } else if (block.type === 'contact' && contactDesign(p.design).geo && siteGeo) {
        frame('openstreetmap', p);
      }
    }
  }
  return { forms, checkout, shop, embeds: [...embeds], atOnce: [...atOnce] };
}

/**
 * The facts of the whole site.
 * @param {object} site site.json
 * @param {Array<{entry: object, page: object}>} pages Every page in the registry with its file; one that could not be read is left out
 * @returns {{controller: object, forms: object[], checkout: object|null, analytics: boolean, embeds: string[], atOnce: string[], host: 'cloudflare', browser: {theme: boolean, shop: boolean}}}
 *   embeds are the third parties whose frames the pages hold, atOnce those of them some page loads with the page (`askFirst: false`) rather than behind the cover;
 *   browser says what the site keeps in the visitor's own browser beside the embed choice: the light or dark choice where the theme has both, the cart with the last order where a page sells, and the closing of the announcement strip where there is one;
 *   forms hold the footer's newsletter sign-up first (`footer: true`), then every page's forms
 */
export function privacyModel(site, pages) {
  const contact = siteContact(site);
  const controller = {
    name: contact.legalName || String(site?.site?.title ?? '').trim(),
    org: contact.ids?.org ?? '',
    address: [contact.street, [contact.postalCode, contact.city].filter(Boolean).join(' ')].filter(Boolean).join(', '),
    email: contact.email,
    phone: contact.phone,
    representative: contact.representative,
    country: contact.country,
  };
  const forms = [];
  const newsletter = footerForm(site);
  if (newsletter) forms.push(newsletter);
  let checkout = null;
  const embeds = new Set();
  const atOnce = new Set();
  let shop = false;
  const siteGeo = Boolean(contact.geo);
  for (const { entry, page } of pages ?? []) {
    const facts = pageFacts(entry, page, { siteGeo });
    forms.push(...facts.forms);
    if (facts.checkout && !checkout) checkout = facts.checkout;
    if (facts.shop) shop = true;
    for (const id of facts.embeds) embeds.add(id);
    for (const id of facts.atOnce) atOnce.add(id);
  }
  return {
    controller,
    forms,
    checkout,
    analytics: Boolean(String(site?.analytics?.token ?? '').trim()),
    embeds: [...embeds],
    atOnce: [...atOnce],
    host: 'cloudflare',
    browser: { theme: Boolean(site?.theme?.alt?.tokens), shop, announcement: site?.nav?.announcement?.show === true && Boolean(String(site.nav.announcement.text ?? '').trim()) },
  };
}
