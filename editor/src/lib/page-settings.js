/**
 * A page's own settings (panels/pages/*): the layouts the owner chooses between, the page's meta fields read and written with the page file kept clean, and the swap that makes another page the front page.
 * Pure, node-tested (tests/page-settings.test.mjs).
 */

import { copySlug } from './duplicate.js';

/** Where a page's settings open, the first the default: a dialog over the admin, a step in the Pages panel, or a table of every page over the canvas. */
export const PAGE_SETTINGS_LAYOUTS = ['dialog', 'step', 'table'];

/** The stored layout, the default for anything else. */
export function pageSettingsLayoutOf(raw) {
  return PAGE_SETTINGS_LAYOUTS.includes(raw) ? raw : 'dialog';
}

/** The fields of a page's meta as the settings show them, every one a string. */
export function metaOf(page) {
  const meta = page?.meta ?? {};
  return {
    searchTitle: meta.searchTitle ?? '',
    description: meta.description ?? '',
    ogTitle: meta.og?.title ?? '',
    ogDescription: meta.og?.description ?? '',
    ogImage: meta.og?.image ?? '',
  };
}

/** The meta key behind each field, `og` for the sharing fields. */
const OG_KEYS = { ogTitle: 'title', ogDescription: 'description', ogImage: 'image' };

/**
 * One field written into a page's meta: an empty value deletes its key, so the page file stays clean, and the og object goes when it empties.
 * The page is changed in place and returned.
 * @param {{meta?: object}} page
 * @param {'searchTitle'|'description'|'ogTitle'|'ogDescription'|'ogImage'} field
 * @param {string} rawValue
 */
export function withMeta(page, field, rawValue) {
  const value = String(rawValue ?? '').trim();
  page.meta ??= {};
  if (field === 'searchTitle' || field === 'description') {
    if (value) page.meta[field] = value;
    else delete page.meta[field];
    return page;
  }
  const key = OG_KEYS[field];
  if (!key) return page;
  const og = { ...(page.meta.og ?? {}) };
  if (value) og[key] = value;
  else delete og[key];
  if (Object.keys(og).length) page.meta.og = og;
  else delete page.meta.og;
  return page;
}

/**
 * The page registry with another page as the front page: the chosen page takes `/` and the first place, and the old front page takes its own id as its address, or the next free number on it.
 * The ids and the files stay, so the menu's links and the drafts follow.
 * @param {Array<{id: string, path: string}>} pages The registry as it is (not mutated)
 * @param {string} id The page to put at /
 * @returns {{pages: Array<object>, from: {id: string, path: string}|null}|null} The new registry and the old front page's new address; null when the page is not there or is the front page already
 */
export function frontPageSwap(pages, id) {
  const list = (pages ?? []).map((p) => ({ ...p }));
  const chosen = list.find((p) => p.id === id);
  if (!chosen || chosen.path === '/') return null;
  const old = list.find((p) => p.path === '/') ?? null;
  let from = null;
  if (old) {
    const others = list.filter((p) => p !== old && p !== chosen);
    const taken = others.some((p) => p.path === `/${old.id}`);
    const slug = taken ? copySlug(old.id, others) : old.id;
    old.path = `/${slug}`;
    from = { id: old.id, path: old.path };
  }
  chosen.path = '/';
  return { pages: [chosen, ...list.filter((p) => p !== chosen)], from };
}
