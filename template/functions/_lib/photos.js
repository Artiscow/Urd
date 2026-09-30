/**
 * Shared guards for the picture routes (/api/photos and /api/photo): the
 * shapes an id, a host and a share token may take, the host allowlists, and
 * the size caps.
 *
 * OPEN PROXY GUARD, the same rules as the calendar's feed proxy: https only,
 * no sign-in in the address, and a host on the owner's allowlist (the
 * PHOTO_HOSTS environment variable, comma-separated). Google's own hosts are
 * never on a list: the Drive and album routes fetch fixed addresses of their
 * own, so no caller can steer them. Every id is matched with an anchored
 * regex, and hosts are compared exactly against a parsed URL, never with a
 * substring test. On top of that both routes answer only the site's own pages
 * (isCrossOrigin in auth.js), so another site cannot serve its pictures
 * through this one.
 */

import { isCrossOrigin } from './auth.js';

/**
 * The most pictures one folder call may answer with: the pool the layers cut
 * their own count from, and draw from at random.
 */
export const MAX_PHOTOS = 200;

/** What a listing may be sorted by; the random draw happens in the browser. */
export const SORTS = ['name', 'newest'];

/** The sort asked for, with the name order for anything unknown. */
export function photoSort(value) {
  return SORTS.includes(value) ? value : 'name';
}

/** Natural name order, so 'bilde 2' comes before 'bilde 10'. */
export const byName = (a, b) => String(a.name ?? '').localeCompare(String(b.name ?? ''), undefined, { numeric: true, sensitivity: 'base' });

/** The largest picture the byte route will pass through. */
export const MAX_IMAGE_BYTES = 12_000_000;

/** The largest folder listing or album page the list route will read. */
export const MAX_LIST_BYTES = 4_000_000;

/** The width the pictures are asked for, so an original is never proxied raw. */
export const IMAGE_WIDTHS = [480, 800, 1200, 1600, 2000];

/** Google file, folder and album ids. */
export const GOOGLE_ID = /^[A-Za-z0-9_-]{10,256}$/;

/** A short album link's code, marked with the s: prefix by the parser. */
export const SHORT_CODE = /^s:[A-Za-z0-9_-]{6,128}$/;

/** A Nextcloud or ownCloud public share token. */
export const SHARE_TOKEN = /^[A-Za-z0-9]{8,64}$/;

/** A public hostname: dotted, never an address literal. */
export const PUBLIC_HOST = /^(?!\d+(?:\.\d+)*$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;

/** A file name inside a public share: one segment, no traversal. */
export const SHARE_FILE = /^[^/\\?#]{1,200}$/;

/** Google's own picture host, which needs no allowlist entry. */
export const GOOGLE_PHOTO_HOST = 'lh3.googleusercontent.com';

export const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

/** The hosts the owner has allowed, lower-cased. */
export function allowedHosts(env) {
  return new Set(String(env?.PHOTO_HOSTS ?? '')
    .split(',').map((host) => host.trim().toLowerCase()).filter(Boolean));
}

/**
 * Whether a host may be reached: on the owner's allowlist, or one of the hosts
 * the route itself chose (`extra`, for the fixed Google addresses and for the
 * end of a redirect chain that stays where it started).
 */
export function hostAllowed(env, host, extra = []) {
  const name = String(host ?? '').toLowerCase();
  return extra.includes(name) || allowedHosts(env).has(name);
}

/**
 * The picture width to ask upstream for, snapped to the ladder. An absent
 * width means the full one: the list route builds its paths without a width,
 * and a hero background fetched at the smallest step would be a blur.
 */
export function imageWidth(value) {
  if (value === undefined || value === null || value === '') return 1600;
  const n = Number(value);
  if (!Number.isFinite(n)) return 1600;
  return IMAGE_WIDTHS.reduce((best, w) => (Math.abs(w - n) < Math.abs(best - n) ? w : best), IMAGE_WIDTHS[0]);
}

/** How many pictures to answer with, inside the cap. */
export function photoLimit(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return 24;
  return Math.min(MAX_PHOTOS, Math.max(1, Math.round(n)));
}

/**
 * An https URL on an allowed host, or null. Shared by every provider, so no
 * route ever fetches an address it has not checked. With `only` the address
 * must be on one of THOSE hosts and the allowlist is not consulted; without
 * it, the allowlist decides.
 * @param {unknown} raw
 * @param {object} env
 * @param {string[]} [only]
 * @returns {URL|null}
 */
export function safeTarget(raw, env, only) {
  let url;
  try {
    url = new URL(String(raw));
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
  const host = url.hostname.toLowerCase();
  if (!PUBLIC_HOST.test(host)) return null;
  if (only ? !only.includes(host) : !hostAllowed(env, host)) return null;
  return url;
}

/**
 * The refusal for a call from another site, or null when the call is the
 * site's own. Pictures are embedded, so the check is the Sec-Fetch-Site one
 * the auth prologue uses, never a cookie.
 * @param {Request} request
 * @returns {Response|null}
 */
export function refuseCrossSite(request) {
  const cross = isCrossOrigin({
    secFetchSite: request.headers.get('sec-fetch-site'),
    origin: request.headers.get('origin'),
    url: request.url,
  });
  return cross ? json({ error: 'The picture routes answer this site only', code: 'photoCrossSite' }, 403) : null;
}

/**
 * Reads a response body with a byte cap, without buffering it first.
 * @param {Response} res
 * @param {number} max
 * @returns {Promise<string|null>} null when the cap is passed
 */
export async function readCapped(res, max) {
  const declared = Number(res.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > max) return null;
  const reader = res.body?.getReader();
  const decoder = new TextDecoder('utf-8');
  let text = '';
  let bytes = 0;
  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > max) {
      await reader.cancel();
      return null;
    }
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

/** One fetch with a timeout, so a slow folder host never holds the route. */
export async function fetchWithTimeout(target, init = {}, ms = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(target, { ...init, signal: controller.signal, redirect: 'follow' });
  } finally {
    clearTimeout(timer);
  }
}
