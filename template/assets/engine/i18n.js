/**
 * Flerspråk-kjernen (ADR-0012): to registre - t() for besøkende-tekster
 * (følger site.lang) og ta() for admin-chromen (følger admin-språket i
 * localStorage 'urd-admin-lang'). Norsk bokmål er alltid statisk base;
 * andre språk legges oppå med Object.assign, så en manglende nøkkel gir
 * bokmålsteksten og en helt ukjent nøkkel gir nøkkelen selv (synlig feil,
 * aldri krasj). Datonavn, flertall og relativ tid går via native Intl
 * (ADR-0011: plattformens CLDR-data framfor egne tabeller), med
 * bokmålstabellene i locales/site/nb.js som fallback der ICU mangler
 * språket. Oversettelsesfilene er rene ES-moduler uten bygging.
 */
import nb from './locales/site/nb.js';

/** Språkene som følger med Urd; paritetstesten holder filene i synk. */
export const SUPPORTED_LANGS = ['nb', 'nn', 'en-GB', 'se', 'tr'];

/**
 * Normaliserer en språkverdi (site.lang, navigator.language) til et av de
 * støttede språkene. 'no' og alle nb/no-varianter er bokmål; sørsamisk og
 * lulesamisk faller til nordsamisk (nærmeste tilgjengelige); alt ukjent
 * faller til bokmål (Urds standardspråk, samme som i dag).
 * @param {unknown} raw
 * @returns {string}
 */
export function normalizeLang(raw) {
  return matchLang(raw) ?? 'nb';
}

/**
 * Streng variant for auto-deteksjon (admin): matcher en språktag mot de
 * støttede språkene, eller null når ingenting passer - deteksjonen skal
 * da prøve NESTE tag i navigator.languages, ikke lande på bokmål.
 * @param {unknown} raw
 * @returns {string|null}
 */
export function matchLang(raw) {
  const v = String(raw ?? '').trim().toLowerCase();
  if (v === 'no' || v.startsWith('nb') || v.startsWith('no-')) return 'nb';
  if (v.startsWith('nn')) return 'nn';
  if (v.startsWith('se') || v.startsWith('smj') || v.startsWith('sma')) return 'se';
  if (v.startsWith('tr')) return 'tr';
  if (v.startsWith('en')) return 'en-GB';
  return null;
}

const site = { lang: 'nb', dict: { ...nb.strings }, dates: null };
const admin = { lang: 'nb', dict: {} };

/** {var}-interpolasjon: enkel og forutsigbar, ingen ICU-syntaks. */
function format(str, params) {
  if (!params) return str;
  let out = str;
  for (const [k, v] of Object.entries(params)) out = out.replaceAll(`{${k}}`, String(v));
  return out;
}

/** Besøkende-tekst (følger site.lang). */
export function t(key, params) {
  return format(site.dict[key] ?? key, params);
}

/** Admin-tekst (følger admin-språket). */
export function ta(key, params) {
  return format(admin.dict[key] ?? key, params);
}

/**
 * Flertallsoppslag: nøkkelen suffikses med Intl.PluralRules-kategorien
 * ('one'/'two'/'few'/'many'/'other'; nordsamisk har totallsform), med
 * .other som fallback. Antallet er alltid tilgjengelig som {n}.
 */
export function tp(baseKey, n, params) {
  let cat = 'other';
  try { cat = new Intl.PluralRules(site.lang).select(n); } catch { /* ukjent språk: other */ }
  const chosen = site.dict[`${baseKey}.${cat}`] ?? site.dict[`${baseKey}.other`];
  return format(chosen ?? `${baseKey}.${cat}`, { ...params, n });
}

export function siteLang() { return site.lang; }
export function adminLang() { return admin.lang; }

/** Plugins legger sine besøkende-tekster inn her (nøkler prefikset med plugin-id). */
export function addSiteDict(strings) { Object.assign(site.dict, strings ?? {}); }
/** Plugins og admin-locale-filene legger admin-tekster inn her. */
export function addAdminDict(strings) { Object.assign(admin.dict, strings ?? {}); }

/**
 * Laster besøkende-språket (kalles av boot() når site.json er lest).
 * Dynamisk import med vilje: usynlig for modulepreload-lista, og norske
 * sider (basen) betaler ingenting. Feiler lastingen står nb-basen igjen.
 */
export async function initSiteLocale(rawLang) {
  const lang = normalizeLang(rawLang);
  site.lang = lang;
  site.dates = null;
  // Alltid fersk kopi av basen: overlayen skal aldri mutere nb-ordboka,
  // og et språkbytte (editorens preview) skal ikke arve forrige språk.
  site.dict = { ...nb.strings };
  if (lang === 'nb') return lang;
  try {
    const mod = await import(/* @vite-ignore */ `./locales/site/${lang}.js`);
    Object.assign(site.dict, mod.default.strings);
  } catch {
    site.lang = 'nb';
  }
  return site.lang;
}

/**
 * Admin-språkdeteksjonen (delt av editorens main.js og preview-chromen):
 * eksplisitt valg i localStorage 'urd-admin-lang' vinner; ellers matches
 * enhetens språk strengt mot de støttede (neste tag prøves ved ikke-treff);
 * ingen treff gir engelsk.
 */
export function detectAdminLang() {
  let stored = null;
  try { stored = localStorage.getItem('urd-admin-lang'); } catch { /* privat modus */ }
  if (stored) return normalizeLang(stored);
  for (const cand of navigator.languages ?? [navigator.language]) {
    const hit = matchLang(cand);
    if (hit) return hit;
  }
  return 'en-GB';
}

/**
 * Løses når admin-ordboka er lastet. Preview-chrome som kan rendres FØR
 * initAdminLocale er ferdig (hjelpechipene i kjerneblokkene: første
 * side-render skjer før preview-grenen i boot) venter på denne før ta()
 * kalles, så nøkkelnavn aldri fryses inn i chrome fra første render.
 * Besøkende-løypa løser den aldri - chipene finnes kun i preview.
 */
let adminLocaleReadyResolve;
export const adminLocaleReady = new Promise((resolve) => { adminLocaleReadyResolve = resolve; });

/**
 * Laster admin-ordboka: nb-basen i bunn, valgt språk oppå. Kjøretids-import
 * fra absolutt sti, så samme kode virker i admin-bundelen OG i preview-
 * iframen, og ordbøkene bundles aldri. Feiler lastingen helt (vite dev uten
 * template-serveren) vises nøklene i stedet for krasj.
 */
export async function initAdminLocale(lang = detectAdminLang()) {
  const load = async (code) => (await import(/* @vite-ignore */ `/assets/engine/locales/admin/${code}.js`)).default.strings;
  admin.lang = normalizeLang(lang);
  try {
    Object.assign(admin.dict, await load('nb'));
    if (admin.lang !== 'nb') Object.assign(admin.dict, await load(admin.lang));
  } catch { /* uten ordbok vises nøklene; appen skal aldri dø av dette */ }
  adminLocaleReadyResolve(admin.lang);
  return admin.lang;
}

/* Datonavn: bygges fra Intl for gjeldende site-språk og caches per språk.
   Ukedagene starter på mandag (norsk konvensjon, samme som tabellene).
   Korte månedsnavn normaliseres uten punktum ('jan.' -> 'jan'), som dagens
   badge-format. Mangler ICU språket, brukes bokmålstabellene fra basen. */
function buildDates(lang) {
  try {
    if (!Intl.DateTimeFormat.supportedLocalesOf([lang]).length) return nb.dates;
    const fmt = (opts) => new Intl.DateTimeFormat(lang, opts);
    const strip = (s) => s.replace(/\.$/, '');
    const months = [];
    const monthsShort = [];
    for (let m = 0; m < 12; m++) {
      const d = new Date(Date.UTC(2026, m, 15, 12));
      months.push(fmt({ month: 'long', timeZone: 'UTC' }).format(d));
      monthsShort.push(strip(fmt({ month: 'short', timeZone: 'UTC' }).format(d)));
    }
    const weekdays = [];
    const weekdaysShort = [];
    for (let i = 0; i < 7; i++) {
      // 5. januar 2026 er en mandag.
      const d = new Date(Date.UTC(2026, 0, 5 + i, 12));
      weekdays.push(fmt({ weekday: 'long', timeZone: 'UTC' }).format(d));
      weekdaysShort.push(strip(fmt({ weekday: 'short', timeZone: 'UTC' }).format(d)));
    }
    return { months, monthsShort, weekdays, weekdaysShort };
  } catch {
    return nb.dates;
  }
}

/** @returns {{months: string[], monthsShort: string[], weekdays: string[], weekdaysShort: string[]}} */
export function dates() {
  site.dates ??= buildDates(site.lang);
  return site.dates;
}

/** Relativ dagtelling («om 3 døgn»/«3 jándora maŋŋilit»); fallback = rå tall. */
export function relativeDays(days) {
  try {
    return new Intl.RelativeTimeFormat(site.lang, { numeric: 'auto' }).format(days, 'day');
  } catch {
    return String(days);
  }
}
