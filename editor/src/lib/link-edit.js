/**
 * Link editing for the panels, block menus and LinkDialog.svelte: a host keeps a link object or its address alone; `here` is its page, or null on every page.
 */
import { isSafeHref, isSafeUrl, LINK_RELS } from '$engine/nav-model.js';
import { telHref } from '$engine/contact-model.js';
import { isFileHref, fileLabel } from './file-links.js';

/** The kinds of link the editor offers, in the order it shows them. */
export const LINK_KINDS = ['page', 'web', 'email', 'phone', 'file'];

/** The fields of the link shape, which a host's link is written over. */
const LINK_FIELDS = ['page', 'target', 'href', 'newTab', 'rel', 'download'];

/**
 * Writes a link over a host object in place: the link shape's fields go, and the ones the link has are set; a host's `href: null` is kept.
 * @param {object} host
 * @param {object|null} link
 */
export function setLinkOn(host, link) {
  const hadNull = host.href === null;
  for (const key of LINK_FIELDS) delete host[key];
  if (link) Object.assign(host, link);
  else if (hadNull) host.href = null;
}

/**
 * A host's link: the link shape's fields it holds, without the empty ones.
 * @param {object|null} host
 * @returns {object}
 */
export function linkOf(host) {
  const link = {};
  for (const key of LINK_FIELDS) if (host?.[key] !== undefined && host[key] !== null && host[key] !== '') link[key] = host[key];
  return link;
}

/**
 * Whether a host's link points anywhere: a page, a spot or an address.
 * @param {object|string|null} value
 * @returns {boolean}
 */
export function hasLink(value) {
  if (typeof value === 'string') return Boolean(value.trim()) && value.trim() !== '#';
  return Boolean(value?.page || value?.target || (typeof value?.href === 'string' && value.href.trim() && value.href.trim() !== '#'));
}

/** A typed web address as a link: a full address, a path of the site, or a host name the address gets https:// for ('' when it is none of these). */
export function webHref(text) {
  const typed = String(text ?? '').trim();
  if (!typed) return '';
  if (isSafeUrl(typed) || isSafeHref(typed)) return typed;
  // A host name with a dot and no scheme (www.example.org/side) is a web address.
  const guessed = /^[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:[/?#][^\s]*)?$/i.test(typed) ? `https://${typed}` : '';
  return isSafeUrl(guessed) ? guessed : '';
}

/** A plausible email address. */
export function emailLike(text) {
  return /^[^\s@?]+@[^\s@?]+\.[^\s@?]+$/.test(String(text ?? '').trim());
}

/** An email link, with the subject when there is one ('' without a plausible address). */
export function emailHref(email, subject = '') {
  const address = String(email ?? '').trim();
  if (!emailLike(address)) return '';
  const about = String(subject ?? '').trim();
  return `mailto:${address}${about ? `?subject=${encodeURIComponent(about)}` : ''}`;
}

/**
 * A stored link as the editor works on it: a site path or fragment naming a page in the register reads as that page and its spot, and a file path as a file.
 * @param {object|string|null} value
 * @param {{pages?: Array<{id: string, path: string}>, here?: string|null}} [context] The page register, and the page the link stands on
 * @returns {{kind: string, page: string, target: string, url: string, email: string, subject: string, phone: string, file: string, newTab: boolean, rel: string[], download: boolean}}
 */
export function readLink(value, { pages = [], here = null } = {}) {
  const link = typeof value === 'string' ? { href: value } : (value ?? {});
  const base = {
    kind: 'page', page: '', target: '', url: '', email: '', subject: '', phone: '', file: '',
    newTab: link.newTab === true,
    rel: Array.isArray(link.rel) ? LINK_RELS.filter((word) => link.rel.includes(word)) : [],
    download: link.download === true,
  };
  const target = typeof link.target === 'string' ? link.target : '';
  if (link.page) return { ...base, page: link.page, target };
  const href = typeof link.href === 'string' ? link.href.trim() : '';
  if (!href || href === '#') return target ? { ...base, page: here ?? '', target } : base;
  if (isFileHref(href)) return { ...base, kind: 'file', file: href };
  if (/^mailto:/i.test(href)) {
    const [address, query = ''] = href.slice(7).split('?');
    let email = address;
    try { email = decodeURIComponent(address); } catch { /* a malformed escape is read as written */ }
    return { ...base, kind: 'email', email, subject: new URLSearchParams(query).get('subject') ?? '' };
  }
  if (/^tel:/i.test(href)) return { ...base, kind: 'phone', phone: href.slice(4) };
  if (href.startsWith('#') || href.startsWith('/')) {
    const [path, hash = ''] = href.split('#');
    const bare = path.length > 1 ? path.replace(/\/$/, '') : path;
    const page = path ? pages.find((p) => p.path === bare) : pages.find((p) => p.id === here);
    if (page) return { ...base, page: page.id, target: hash };
  }
  return { ...base, kind: 'web', url: href };
}

/**
 * Whether the editor's link is complete enough to use: a page chosen, or an address that passes its check.
 * @param {ReturnType<typeof readLink>} state
 * @returns {boolean}
 */
export function linkReady(state) {
  if (state.kind === 'page') return Boolean(state.page);
  if (state.kind === 'web') return Boolean(webHref(state.url));
  if (state.kind === 'email') return emailLike(state.email);
  if (state.kind === 'phone') return Boolean(telHref(state.phone));
  if (state.kind === 'file') return isFileHref(state.file);
  return false;
}

/**
 * The editor's link written back in the host's shape, or null when it is not complete; a spot on the host's own page is stored without the page.
 * @param {ReturnType<typeof readLink>} state
 * @param {{shape?: 'link'|'address', pages?: Array<{id: string, path: string}>, here?: string|null}} [options]
 * @returns {object|string|null}
 */
export function writeLink(state, { shape = 'link', pages = [], here = null } = {}) {
  if (!linkReady(state)) return null;
  const newTab = state.newTab && ['page', 'web', 'file'].includes(state.kind) ? { newTab: true } : {};
  if (state.kind === 'page') {
    const ownSpot = Boolean(here) && state.page === here && Boolean(state.target);
    if (shape === 'address') {
      if (ownSpot) return `#${state.target}`;
      const page = pages.find((p) => p.id === state.page);
      return page ? `${page.path}${state.target ? `#${state.target}` : ''}` : null;
    }
    if (ownSpot) return { target: state.target, ...newTab };
    return { page: state.page, ...(state.target ? { target: state.target } : {}), ...newTab };
  }
  if (state.kind === 'file') {
    if (shape === 'address') return state.file;
    return { href: state.file, ...newTab, ...(state.download ? { download: true } : {}) };
  }
  const href = state.kind === 'web' ? webHref(state.url)
    : state.kind === 'email' ? emailHref(state.email, state.subject)
      : telHref(state.phone);
  if (shape === 'address') return href;
  const rel = state.kind === 'web' && /^https?:\/\//i.test(href) ? LINK_RELS.filter((word) => state.rel.includes(word)) : [];
  return { href, ...newTab, ...(rel.length ? { rel } : {}) };
}

/**
 * Why a link does not land, or null: 'page' (its page is gone), 'spot' (its spot is gone, told only with `taken`) or 'address' (a site path naming no page).
 * @param {ReturnType<typeof readLink>} state
 * @param {{pages?: Array<{id: string, path: string}>, taken?: Set<string>|null, reserved?: string[]}} [context] The register, the ids in use on the link's page, and the reserved first path parts
 * @returns {'page'|'spot'|'address'|null}
 */
export function linkProblem(state, { pages = [], taken = null, reserved = [] } = {}) {
  if (state.kind === 'page') {
    if (!state.page) return null;
    if (!pages.some((p) => p.id === state.page)) return 'page';
    return state.target && taken && !taken.has(state.target) ? 'spot' : null;
  }
  if (state.kind !== 'web' || !/^\/(?!\/)/.test(state.url)) return null;
  // An address with a query (/kaker?ref=x) still names its page.
  const path = state.url.replace(/[?#].*$/, '');
  const bare = path.length > 1 ? path.replace(/\/$/, '') : path;
  if (pages.some((p) => p.path === bare)) return null;
  const parts = path.split('/').filter(Boolean);
  if (parts.length && (reserved.includes(parts[0]) || parts.at(-1).includes('.'))) return null;
  return 'address';
}

/**
 * The words a link field shows: the page's title with the spot after ›, a web address without its scheme, the email, the phone or the file's name; '' for none.
 * @param {ReturnType<typeof readLink>} state
 * @param {{pages?: Array<{id: string, title: string}>, spotLabel?: string}} [context] The register, and the words for the spot when they are known
 * @returns {string}
 */
export function linkSummary(state, { pages = [], spotLabel = '' } = {}) {
  if (state.kind === 'page') {
    if (!state.page) return '';
    const title = pages.find((p) => p.id === state.page)?.title ?? state.page;
    // Without the spot's words a name stands for itself, and an id (sec-…, blk-…) is left out.
    const spot = spotLabel || (state.target && !/^(?:sec|blk)-/.test(state.target) ? `#${state.target}` : '');
    return spot ? `${title} › ${spot}` : title;
  }
  if (state.kind === 'web') return state.url.replace(/^https?:\/\//i, '');
  if (state.kind === 'email') return state.email;
  if (state.kind === 'phone') return state.phone;
  if (state.kind === 'file') return fileLabel(state.file);
  return '';
}

/**
 * The short words a closed group shows for a host's link (linkSummary without the spot's words); '' for no link.
 * @param {object|string|null} value
 * @param {{pages?: Array<{id: string, path: string, title: string}>, here?: string|null}} [context]
 * @returns {string}
 */
export function linkText(value, { pages = [], here = null } = {}) {
  return linkSummary(readLink(value, { pages, here }), { pages });
}
