/**
 * What a calendar loads beyond its own drawing (blocks/calendar.js): its feeds, the parts every calendar draws with, the renderer of each design family, and the readying of all of them before a page is drawn.
 * Kept apart from calendar.js, with only the boot's own modules imported, so the boot can ready a calendar beside its module (CORE_BLOCK_READY in core-types.js), a wave sooner than calendar.js and its own imports come in.
 * Fetching ALWAYS goes through the site's own feed proxy (/api/ics): feed hosts send no CORS, and the site's CSP allows connect-src 'self' only.
 */
import { ta, taApiError } from '../i18n.js';
import { loadStylesheet, placeInOrder } from '../render.js';
import { CALENDAR_FEED_MINUTES } from '../keep-minutes.js';

/* ---------- Fetching (proxy + short-lived cache) ---------- */

const CACHE_TTL = CALENDAR_FEED_MINUTES * 60 * 1000;

/** The feeds on their way, by address: a calendar readied before the page is drawn (prepareCalendar) and its drawing, or two calendars of one feed, share one request. */
const ASKING = new Map();

/**
 * A feed's text: the session's copy while it is fresh, else the request on its way for it, else a new one.
 * @param {string} url
 * @returns {Promise<string>}
 */
export async function fetchSource(url) {
  const key = `urd-cal-cache:${url}`;
  try {
    const cached = JSON.parse(sessionStorage.getItem(key) ?? 'null');
    if (cached && Date.now() - cached.t < CACHE_TTL) return cached.text;
    if (cached) sessionStorage.removeItem(key);
  } catch { /* a corrupt cache entry is ignored */ }
  if (!ASKING.has(url)) {
    const asking = askSource(url, key);
    ASKING.set(url, asking);
    asking.then(() => ASKING.delete(url), () => ASKING.delete(url));
  }
  return ASKING.get(url);
}

/** A feed fetched through the site's own route, kept for the minutes the privacy page names. */
async function askSource(url, key) {
  const res = await fetch(`/api/ics?url=${encodeURIComponent(url)}`);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    // The route answers every failure in JSON: a 404 without it is the route itself missing, as on a local server, where the site's functions do not run.
    if (!body && res.status === 404) throw new Error(ta('calendar.noRoute'));
    throw new Error(taApiError(body) ?? ta('calendar.feedStatus', { status: res.status }));
  }
  const text = await res.text();
  try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), text })); } catch { /* a full store is fine */ }
  return text;
}

/** The feeds a calendar's readying asked for, by address, each taken once by the first drawing that reads that feed, so the drawing never asks again for one the readying could not keep (a failed request, or a browser that keeps nothing). */
const READIED = new Map();

/**
 * The request a calendar's readying made for a feed, taken once; undefined where there is none.
 * @param {string} url
 * @returns {Promise<string>|undefined}
 */
export function takeReadied(url) {
  const asked = READIED.get(url);
  READIED.delete(url);
  return asked;
}

/* ---------- The parts and the renderers ---------- */

/** The calendar's sheets in the order their rules stand in: the shared one, then each design family's own, loaded with its renderer. */
const SHEETS = { calendar: './calendar.css', list: './calendar-list.css', cards: './calendar-cards.css', time: './calendar-time.css', retro: './calendar-retro.css', next: './calendar-next.css', more: './calendar-more.css' };

/** Loads one of the calendar's sheets in its place among the others, in the order SHEETS keeps, whatever order they come in. */
const loadSheet = (name) => loadStylesheet(new URL(SHEETS[name], import.meta.url).href, placeInOrder('calendar', Object.keys(SHEETS).indexOf(name)));

/** The renderer module of each design family, loaded when a calendar draws one (literal paths, so the modules stay out of the visitor closure and the preload list). */
export const DESIGN_MODULES = { plain: () => import('./calendar-plain.js'), list: () => import('./calendar-list.js'), cards: () => import('./calendar-cards.js'), time: () => import('./calendar-time.js'), next: () => import('./calendar-next.js'), more: () => import('./calendar-more.js'), retro: () => import('./calendar-retro.js') };

/** The parts once they are in (calendarParts), and the renderer modules loaded, by name: a calendar whose code is all in draws in the task that draws the page (renderCalendar in calendar.js). */
export let partsIn = null;
export const designsIn = new Map();

/** The parser, the design model, the formats and the links every calendar draws with, and the rules every calendar draws with (calendar.css), loaded together, kept once they are in. */
export const calendarParts = () => Promise.all([import('../ics.js'), import('../calendar-designs.js'), import('../calendar-format.js'), import('../map-links.js'), import('../meeting-links.js'), loadSheet('calendar')]).then((parts) => (partsIn = parts));

/** A renderer module by its name in DESIGN_MODULES, with its family's sheet, kept once both are in. */
export const loadDesign = (name) => (DESIGN_MODULES[name] ? Promise.all([DESIGN_MODULES[name](), SHEETS[name] ? loadSheet(name) : null]).then(([mod]) => {
  designsIn.set(name, mod);
  return mod;
}) : undefined);

/** The renderer modules a calendar draws with, by name in DESIGN_MODULES: its design's own, the week strip for the view switcher, and its phone's and its card's design where they are a module's own (calPhoneView, calCardDesign); null where there is none. */
export const designModules = (cd, props) => [cd.calDesign(props.design).module, cd.calSwitcher(props) ? 'time' : null, cd.calPhoneDesignDef(cd.calPhoneView(props), props).module, cd.calCardDesignDef(cd.calCardDesign(props)).module, drawsPlain(cd, props) ? 'plain' : null];

/**
 * Whether a calendar draws with the plain views (calendar-plain.js): a design without a renderer of its own, the switcher's plain month, or on a phone the stacked agenda or a look without a renderer.
 * @returns {boolean}
 */
function drawsPlain(cd, props) {
  const design = cd.calDesign(props.design);
  if (!design.module) return true;
  if (cd.calSwitcher(props) && cd.calSwitcherViews(props).month === 'month') return true;
  const phoneView = cd.calPhoneView(props);
  if (phoneView === design.id) return false;
  const phoneDef = cd.calPhoneDesignDef(phoneView, props);
  return !phoneDef.look || !phoneDef.module;
}

/**
 * Readies what a calendar draws with before the page is drawn (prepareBlocks in core-types.js): its parts and its rules, the renderers its settings draw with, and its feeds asked for, which its drawing then takes (fetchSource).
 * The calendar then stands in its own design from the page's first drawing, its events filling it as they come; the page never waits for a feed.
 * @param {object} props
 * @param {{site?: object}} ctx
 * @returns {Promise<void>}
 */
export async function prepareCalendar(props, ctx) {
  const [ics, cd] = await Promise.all([import('../ics.js'), import('../calendar-designs.js')]);
  for (const entry of ics.resolveSources(props.sources, ctx?.site?.site?.calendars)) {
    const url = ics.normalizeSourceUrl(entry.url);
    if (!url || READIED.has(url)) continue;
    const asked = fetchSource(url);
    asked.catch(() => {});
    READIED.set(url, asked);
  }
  // The rules and the renderers come in one wave, the parser and the design model having come with this module (CORE_BLOCK_READY in core-types.js).
  await Promise.all([calendarParts(), ...designModules(cd, props).map((name) => (name ? loadDesign(name) : null))]);
}
