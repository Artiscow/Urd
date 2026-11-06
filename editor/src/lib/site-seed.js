/**
 * The words a page made from a template starts with, in the site's language: a page visitors read in the site's language takes its seed texts from the admin dictionary of that language, so an English admin makes a bokmål site's terms of sale in bokmål. The dictionaries are the admin's own (`/assets/urd/locales/admin/<code>.js`, never bundled), and the standard withdrawal form comes from the visitor texts the engine loads for the site's language.
 * A site in a language pack's language takes the pack's admin words where it has them, over the bokmål base, as its visitor texts do.
 */
import { requestedLang, isBuiltinLang, ta, t } from '$engine/i18n.js';
import { siteContact, sellerDetailsText } from '$engine/contact-model.js';
import { footerPrivacyLink } from '$engine/footer-model.js';

const dictionaries = new Map();

/** An admin dictionary by its code, loaded once; null where it cannot be. */
function adminStrings(code) {
  if (!dictionaries.has(code)) {
    dictionaries.set(code, import(/* @vite-ignore */ `/assets/urd/locales/admin/${code}.js`).then((m) => m.default.strings).catch(() => null));
  }
  return dictionaries.get(code);
}

/** A language pack's admin strings (a plugin's), loaded once; null where no pack has them. */
function packStrings(code) {
  const key = `pack:${code}`;
  if (!dictionaries.has(key)) {
    dictionaries.set(key, import(/* @vite-ignore */ '/assets/urd/language-packs.js').then((m) => m.loadPackStrings(code, 'admin')).catch(() => null));
  }
  return dictionaries.get(key);
}

/** A text with its {vars} filled in. */
const fill = (text, vars = {}) => String(text).replace(/\{(\w+)\}/g, (all, name) => (name in vars ? String(vars[name]) : all));

/**
 * The seed texts in a site language: that language's admin dictionary, or its pack's, over the bokmål base (where Urd falls back), else the admin's own words.
 * @param {string} siteLang site.site.lang
 * @returns {Promise<(key: string, vars?: object) => string>}
 */
export async function seedTextFor(siteLang) {
  const code = requestedLang(siteLang);
  const [own, base] = await Promise.all([isBuiltinLang(code) ? adminStrings(code) : packStrings(code), code === 'nb' ? null : adminStrings('nb')]);
  if (!own && !base) return ta;
  return (key, vars) => {
    const text = own?.[key] ?? base?.[key];
    return text === undefined ? ta(key, vars) : fill(text, vars);
  };
}

/**
 * The visitor texts in the site's language, read through the engine's own i18n (the standard withdrawal form's words); null where they cannot be loaded.
 * @param {string} siteLang
 * @returns {Promise<((key: string) => string)|null>}
 */
export async function visitorTextFor(siteLang) {
  try {
    const engine = await import(/* @vite-ignore */ '/assets/urd/i18n.js');
    await engine.initSiteLocale(siteLang);
    return (key) => engine.t(key);
  } catch {
    return null;
  }
}

/**
 * Whether the site's contact details hold anything the terms of sale name beside the seller's name.
 * @param {object} site
 */
export const hasSellerDetails = (site) => Boolean(sellerDetailsText(site, t));

/**
 * What a terms of sale page is seeded with: the words in the site's language, the withdrawal form, and the site's facts (the seller from the contact details, with its numbers, address, email and phone, and the privacy page).
 * @param {object} site site.json as the draft holds it
 * @returns {Promise<{text: Function, formText: Function|null, facts: {seller: string, details: string, privacy: {href: string, page: string, title: string}|null}}>}
 */
export async function termsSeed(site) {
  const lang = site?.site?.lang;
  const [text, formText] = await Promise.all([seedTextFor(lang), visitorTextFor(lang)]);
  const contact = siteContact(site);
  // The numbers' labels in the site's language, from its visitor texts (the bokmål base where they cannot be loaded).
  const details = sellerDetailsText(site, formText ?? t);
  const privacy = footerPrivacyLink(site);
  return {
    text,
    formText,
    facts: {
      seller: contact.legalName || String(site?.site?.title ?? '').trim(),
      details,
      privacy: privacy ? { href: privacy.href, page: site.footer.privacyPage, title: privacy.label } : null,
    },
  };
}
