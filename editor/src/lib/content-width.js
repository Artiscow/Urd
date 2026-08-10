/**
 * Modellen bak innholdsbredde-innstillingen (ADR-0018). Rene funksjoner,
 * node-testet, så den levende prøven i Nettsted-panelet regner på det samme
 * som motoren faktisk gjør.
 *
 * Motorens CSS er `width: min(100% - 2 * gutter, contentWidth)` på
 * innholdsflaten. Alt her er den regelen uttrykt i JS for å KUNNE VISE hva
 * en verdi betyr; den brukes aldri til å plassere noe (editoren måler
 * flaten, se canvasOf i preview-edit.js).
 */

/** Grensene for fri justering. Under 960 blir kolonnen smalere enn et
 *  nettbrett på tvers, over 1920 binder den ikke på vanlige skjermer. */
export const WIDTH_MIN = 960;
export const WIDTH_MAX = 1920;
export const WIDTH_STEP = 20;

/**
 * Sidemargen mot vinduskanten, i PROSENT AV VINDUSBREDDEN (vw). Relativ og
 * ikke px, fordi margen kun har effekt i båndet der designbredden ikke binder
 * ennå: der skal luften følge skjermen. En fast marg som er passe på telefon
 * er for trang på nettbrett.
 *
 * Taket på 12 er der fordi 2 x 12 % allerede spiser en fjerdedel av skjermen.
 */
export const GUTTER_MIN = 0;
export const GUTTER_MAX = 12;
export const GUTTER_STEP = 1;

/** Skalaen som vises til vanlig; det rå tallet ligger under Avansert. */
export const GUTTER_PRESETS = [
  { id: 'none', gutter: 0 },
  { id: 'small', gutter: 3 },
  { id: 'medium', gutter: 6 },
  { id: 'large', gutter: 9 },
];

/**
 * Hurtigvalgene. Verdiene er hentet fra feltet: 1200 er nedre halvdel av
 * Squarespaces spenn, 1440 er praktikerkonsensus hos både Squarespace og
 * Webflow, 1600 er Wix Studios egen standard.
 */
export const WIDTH_PRESETS = [
  { id: 'compact', width: 1200 },
  { id: 'standard', width: 1440 },
  { id: 'wide', width: 1600 },
  { id: 'full', width: 'full' },
];

/**
 * Skjermbreddene prøven måles mot: de tre vanligste skrivebordsoppløsningene.
 * 1536 er en 1920-skjerm med 125 % skalering i Windows, altså ikke en egen
 * skjermstørrelse men den nest vanligste CSS-bredden i praksis.
 */
export const REF_SCREENS = [1920, 1536, 1366];

/** Klemmer og snapper en fri breddeverdi til lovlig område. */
export function clampWidth(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 1440;
  const snapped = Math.round(n / WIDTH_STEP) * WIDTH_STEP;
  return Math.min(WIDTH_MAX, Math.max(WIDTH_MIN, snapped));
}

/** Klemmer og snapper sidemargen (vw). */
export function clampGutter(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 6;
  const snapped = Math.round(n / GUTTER_STEP) * GUTTER_STEP;
  return Math.min(GUTTER_MAX, Math.max(GUTTER_MIN, snapped));
}

/**
 * Den minste vindusbredden der innholdet faktisk NÅR designbredden.
 *
 * Med en relativ marg er dette ikke `contentWidth + 2 * gutter`: margen vokser
 * selv med vinduet, så den bredden må løses ut av `W - 2*W*g/100 >= bredde`.
 * Med 1440 og 6 % blir svaret 1637, ikke 1488. Brukes som lerretsbredde for
 * «Skjerm», siden alt bredere gir identisk render.
 *
 * @param {number|'full'} contentWidth
 * @param {number} gutter Prosent av vindusbredden
 * @returns {number}
 */
export function bindingWidth(contentWidth, gutter) {
  if (contentWidth === 'full') return 0;
  const g = Math.min(49, Math.max(0, Number(gutter) || 0));
  return Math.ceil(Number(contentWidth) / (1 - (2 * g) / 100));
}

/**
 * Hva innholdsflaten faktisk blir på en gitt skjermbredde.
 *
 * @param {number|'full'} contentWidth
 * @param {number} gutter Prosent av vindusbredden
 * @param {number} screen Skjermens CSS-bredde
 * @returns {{width: number, margin: number, pct: number, bound: boolean}}
 *   `bound` er true når designbredden er det som begrenser (altså at
 *   innstillingen har effekt her); false betyr at flaten er fluid og
 *   fyller skjermen minus margene.
 */
export function contentBand(contentWidth, gutter, screen) {
  // Margen er en ANDEL av skjermen, så den må regnes ut per skjermbredde.
  // Dette er hele grunnen til at prøven viser tre bredder: den samme
  // innstillingen gir ulik marg på hver av dem.
  const g = (Math.max(0, Number(gutter) || 0) / 100) * screen;
  const available = Math.max(0, screen - 2 * g);
  const bound = contentWidth !== 'full' && Number(contentWidth) < available;
  const width = bound ? Number(contentWidth) : available;
  return {
    width,
    margin: Math.round((screen - width) / 2),
    pct: screen > 0 ? (width / screen) * 100 : 0,
    bound,
  };
}

/** Hvilket hurtigvalg en verdi svarer til, eller null for en fri verdi. */
export function presetOf(contentWidth) {
  return WIDTH_PRESETS.find((p) => p.width === contentWidth)?.id ?? null;
}
