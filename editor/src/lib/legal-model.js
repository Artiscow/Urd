/**
 * The Legal panel's state: what each of its three groups holds and lacks, what each fold's heading shows, and whether the tab carries the amber dot.
 */

/** The panel's groups, in their order: who runs the site, its privacy page, and its terms of sale. */
export const LEGAL_GROUPS = ['who', 'privacy', 'terms'];

const filled = (value) => typeof value === 'string' && value.trim() !== '';

/**
 * The contact details a site must give that are still empty, one per field: the legal name, an email address, and the street address and its town.
 * @param {object|undefined} contact site.contact
 * @returns {Array<'legalName'|'email'|'street'|'city'>}
 */
export function whoMissing(contact) {
  const c = contact ?? {};
  const missing = [];
  if (!filled(c.legalName)) missing.push('legalName');
  if (!filled(c.email)) missing.push('email');
  if (!filled(c.address?.street)) missing.push('street');
  if (!filled(c.address?.city)) missing.push('city');
  return missing;
}

/**
 * A page a setting names, while it is still a shown page of the site; a hidden or deleted page is none, since nothing links it.
 * @param {Array<{id: string, hidden?: boolean}>} pages
 * @param {string|undefined} id
 */
export function shownPage(pages, id) {
  if (!id) return null;
  const entry = (pages ?? []).find((p) => p.id === id);
  return entry && !entry.hidden ? entry : null;
}

/**
 * The panel's state: what each group lacks, whether Terms of sale shows, and the reasons for the tab's dot while something the law asks for is missing.
 * @param {object} input
 * @param {object} input.site The site as drafted (site.json with its pages)
 * @param {{forms?: Array<{footer?: boolean}>, checkout?: object|null, browser?: {shop?: boolean}, retention?: {forms?: object|null, newsletter?: object|null}}} input.facts privacyModel's facts for the whole site
 * @param {number} [input.termsOpen] The parts of a template left to fill on the terms page (lib/fill-in.js)
 * @param {boolean} [input.shopOn] Whether the shop's blocks stand in the block lists
 * @param {boolean} [input.beacon] Whether the published front page carries Cloudflare Web Analytics' beacon (privacy-model.js cloudflareBeacon)
 */
export function legalState({ site, facts, termsOpen = 0, shopOn = false, beacon = false }) {
  const pages = site?.pages ?? [];
  const forms = (facts?.forms ?? []).length > 0;
  const sells = Boolean(facts?.checkout) || facts?.browser?.shop === true;
  const missing = whoMissing(site?.site?.contact);
  const privacyPage = shownPage(pages, site?.footer?.privacyPage);
  const termsId = site?.site?.commerce?.termsPage;
  const termsPage = shownPage(pages, termsId);
  const open = termsPage ? Math.max(0, Number(termsOpen) || 0) : 0;
  const kinds = [];
  if ((facts?.forms ?? []).some((f) => !f.footer)) kinds.push('forms');
  if ((facts?.forms ?? []).some((f) => f.footer)) kinds.push('newsletter');
  if (facts?.checkout) kinds.push('orders');
  const undecided = kinds.filter((kind) => !facts?.retention?.[kind]);
  const reasons = [];
  if ((forms || sells) && (missing.includes('legalName') || missing.includes('email'))) reasons.push('who');
  if (forms && !privacyPage) reasons.push('privacy');
  if (sells && open > 0) reasons.push('terms');
  return {
    who: { missing },
    privacy: { page: privacyPage?.id ?? null, kinds, undecided, country: facts?.controller?.country ?? 'XX', cloudflare: beacon && !String(site?.analytics?.token ?? '').trim() },
    terms: { shown: sells || shopOn || Boolean(termsId), page: termsPage?.id ?? null, open },
    reasons,
    dot: reasons.length > 0,
  };
}

/**
 * What a group's heading says of it: the dictionary key, the tone (`ok` or `warn`) and the count it names.
 * @param {'who'|'privacy'|'terms'} group
 * @param {ReturnType<typeof legalState>} state
 * @returns {{key: string, tone: 'ok'|'warn', n?: number}}
 */
export function groupChip(group, state) {
  if (group === 'who') {
    const n = state.who.missing.length;
    if (!n) return { key: 'legal.chip.filledIn', tone: 'ok' };
    return { key: n === 1 ? 'legal.chip.toFill.one' : 'legal.chip.toFill', tone: 'warn', n };
  }
  const page = group === 'privacy' ? state.privacy.page : state.terms.page;
  if (!page) return { key: 'legal.chip.noPage', tone: 'warn' };
  if (group === 'privacy') {
    const n = state.privacy.undecided.length;
    if (n) return { key: n === 1 ? 'legal.chip.undecided.one' : 'legal.chip.undecided', tone: 'warn', n };
    return { key: state.privacy.kinds.length ? 'legal.chip.filledIn' : 'legal.chip.pageChosen', tone: 'ok' };
  }
  const n = state.terms.open;
  if (!n) return { key: 'legal.chip.pageChosen', tone: 'ok' };
  return { key: n === 1 ? 'legal.chip.partsToFill.one' : 'legal.chip.partsToFill', tone: 'warn', n };
}
