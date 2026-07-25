/**
 * Ren footer-logikk: merkevare, kolonner, sosiale lenker og bunnlinje bygges
 * fra site.footer og sideregisteret. Ingen DOM - modulen er node-importerbar
 * og dekkes av tests/footer.test.mjs; DOM-byggingen bor i footer.js.
 */

import { resolveItem } from './nav-model.js';

// Ankret trygg-URL-vokter for sosiale lenker: kun http(s), mailto og tel.
// javascript:/data: og alt annet avvises. Ankret regex med vilje - CodeQL
// gjenkjenner det som en barriere.
const SAFE_URL_RE = /^(?:https?:\/\/|mailto:|tel:)[^\s]+$/i;

/** @param {unknown} url @returns {boolean} */
export function isSafeUrl(url) {
  return typeof url === 'string' && SAFE_URL_RE.test(url.trim());
}

/**
 * Merkevare-kolonnen: tittel (fallback til sidetittelen) + valgfri tagline.
 * Null når det ikke finnes noe å vise.
 * @param {object} site
 * @returns {{title: string, tagline: string}|null}
 */
export function footerBrand(site) {
  const brand = site.footer?.brand ?? {};
  const title = (brand.title ?? '').trim() || (site.site?.title ?? '').trim();
  const tagline = (brand.tagline ?? '').trim();
  if (!title && !tagline) return null;
  return { title, tagline };
}

/**
 * Kolonnene med resolverte lenker (page → sti, href → ekstern). Lenker uten
 * etikett hoppes over, og en kolonne uten gyldige lenker rendres ikke (en
 * ensom tittel er ikke verdt en kolonne i den ferdige footeren).
 * @param {object} site
 * @returns {Array<{title: string, links: Array<{label: string, href: string, external: boolean, missing: boolean}>}>}
 */
export function footerColumns(site) {
  const pages = site.pages ?? [];
  const columns = Array.isArray(site.footer?.columns) ? site.footer.columns : [];
  return columns
    .map((col) => ({
      title: (col.title ?? '').trim(),
      links: (Array.isArray(col.links) ? col.links : [])
        .filter((l) => (l.label ?? '').trim())
        .map((l) => resolveItem(l, pages)),
    }))
    .filter((col) => col.links.length);
}

/**
 * Sosiale lenker: kun trygge URL-er slippes gjennom (footer.js verifiserer
 * i tillegg ikon-id-en via iconSvg og dropper ukjente).
 * @param {object} site
 * @returns {Array<{icon: string, url: string}>}
 */
export function footerSocial(site) {
  const social = Array.isArray(site.footer?.social) ? site.footer.social : [];
  return social
    .filter((s) => s && typeof s.icon === 'string' && s.icon.trim() && isSafeUrl(s.url))
    .map((s) => ({ icon: s.icon.trim(), url: s.url.trim() }));
}

/**
 * Bunnlinja: eksplisitt copyright om satt, ellers de gamle text-linjene
 * (bakoverkompatibelt - en footer med kun text rendres som før).
 * @param {object} site
 * @returns {Array<string>}
 */
export function footerBaseline(site) {
  const footer = site.footer ?? {};
  const copyright = (footer.copyright ?? '').trim();
  if (copyright) return [copyright];
  return (footer.text ?? '').split('\n').map((l) => l.trim()).filter(Boolean);
}

/**
 * Har footeren noe av det NYE innholdet (merkevare/kolonner/sosiale/copyright)?
 * Nei → footer.js beholder den gamle, byte-like tekst-rendringen.
 * @param {object} site
 * @returns {boolean}
 */
export function hasRichFooter(site) {
  return !!(
    footerBrand(site) ||
    footerColumns(site).length ||
    footerSocial(site).length ||
    (site.footer?.copyright ?? '').trim()
  );
}
