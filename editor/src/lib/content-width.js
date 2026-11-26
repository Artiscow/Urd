/**
 * The content-width setting's model (ADR-0018): the engine's `min(100% - 2 * gutter, contentWidth)` in JS, to show what a value means, never to place anything.
 */

/** The bounds of a free width, in px. */
export const WIDTH_MIN = 960;
export const WIDTH_MAX = 1920;
export const WIDTH_STEP = 20;
/** The width and the margin a site has until it sets its own (site.layout). */
export const WIDTH_DEFAULT = 1440;
export const GUTTER_DEFAULT = 6;

/** The side margin against the window edge, in per cent of the window width (vw). */
export const GUTTER_MIN = 0;
export const GUTTER_MAX = 12;
export const GUTTER_STEP = 1;

/** The scale shown by default; the raw number lives under Advanced. */
export const GUTTER_PRESETS = [
  { id: 'none', gutter: 0 },
  { id: 'small', gutter: 3 },
  { id: 'medium', gutter: 6 },
  { id: 'large', gutter: 9 },
];

/** The quick presets. */
export const WIDTH_PRESETS = [
  { id: 'compact', width: 1200 },
  { id: 'standard', width: 1440 },
  { id: 'wide', width: 1600 },
  { id: 'full', width: 'full' },
];

/** The screen widths the sample is measured against: the most common desktop CSS widths. */
export const REF_SCREENS = [1920, 1536, 1366];

/** Clamps and snaps a free width value into the legal range. */
export function clampWidth(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 1440;
  const snapped = Math.round(n / WIDTH_STEP) * WIDTH_STEP;
  return Math.min(WIDTH_MAX, Math.max(WIDTH_MIN, snapped));
}

/**
 * A section's own content width (`size.maxWidth`, ADR-0018) reaches down to a text column, below the site's floor, and up to the site's ceiling.
 */
export const SECTION_WIDTH_MIN = 320;
export const SECTION_WIDTH_MAX = WIDTH_MAX;
export const SECTION_WIDTH_STEP = 10;

/** Clamps and snaps a section's own width into its range; a value that is no number gives the fallback. */
export function clampSectionWidth(value, fallback = 1440) {
  const n = Number(value);
  const raw = Number.isFinite(n) && n > 0 ? n : fallback;
  const snapped = Math.round(raw / SECTION_WIDTH_STEP) * SECTION_WIDTH_STEP;
  return Math.min(SECTION_WIDTH_MAX, Math.max(SECTION_WIDTH_MIN, snapped));
}

/**
 * A section's content width as the Properties panel shows it: the site's (no field), `full`, or its own, the slider starting at the site's width.
 * @param {string|undefined} maxWidth The section's `size.maxWidth`
 * @param {number|'full'} siteWidth The site's `layout.contentWidth`
 * @returns {{ mode: 'site'|'full'|'own', px: number, shown: string }} `shown` is the own width as stored, '' for the two other choices
 */
export function sectionWidthOf(maxWidth, siteWidth) {
  const start = clampSectionWidth(typeof siteWidth === 'number' ? siteWidth : 1440);
  if (!maxWidth) return { mode: 'site', px: start, shown: '' };
  if (maxWidth === 'full') return { mode: 'full', px: start, shown: '' };
  const px = /^(\d+(?:\.\d+)?)px$/.exec(maxWidth);
  const n = px ? Number(px[1]) : NaN;
  if (n >= SECTION_WIDTH_MIN && n <= SECTION_WIDTH_MAX) return { mode: 'own', px: clampSectionWidth(n), shown: `${clampSectionWidth(n)} px` };
  return { mode: 'own', px: start, shown: maxWidth };
}

/**
 * The stored `size.maxWidth` for a choice: none for the site's, `full`, or the own width in px.
 * @param {'site'|'full'|'own'} mode
 * @param {number} px
 * @returns {string|undefined}
 */
export function sectionWidthValue(mode, px) {
  if (mode === 'full') return 'full';
  if (mode === 'own') return `${clampSectionWidth(px)}px`;
  return undefined;
}

/** Clamps and snaps the side margin (vw). */
export function clampGutter(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 6;
  const snapped = Math.round(n / GUTTER_STEP) * GUTTER_STEP;
  return Math.min(GUTTER_MAX, Math.max(GUTTER_MIN, snapped));
}

/**
 * The smallest window width where the content reaches the design width, solved from `W - 2*W*g/100 >= width`.
 * @param {number|'full'} contentWidth
 * @param {number} gutter Percent of the window width
 * @returns {number}
 */
export function bindingWidth(contentWidth, gutter) {
  if (contentWidth === 'full') return 0;
  const g = Math.min(49, Math.max(0, Number(gutter) || 0));
  return Math.ceil(Number(contentWidth) / (1 - (2 * g) / 100));
}

/**
 * What the content surface becomes at a given screen width.
 * @param {number|'full'} contentWidth
 * @param {number} gutter Percent of the window width
 * @param {number} screen The screen's CSS width
 * @returns {{width: number, margin: number, pct: number, bound: boolean}} `bound` where the design width constrains, else the surface fills the screen less the margins
 */
export function contentBand(contentWidth, gutter, screen) {
  // The margin is a share of the screen, so it is computed per screen width.
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

/** Which quick preset a value corresponds to, or null for a free value. */
export function presetOf(contentWidth) {
  return WIDTH_PRESETS.find((p) => p.width === contentWidth)?.id ?? null;
}
