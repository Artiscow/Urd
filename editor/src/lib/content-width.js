/**
 * The model behind the content-width setting (ADR-0018). Pure functions,
 * node-tested, so the live sample in the Site panel computes the same thing
 * the engine actually does.
 *
 * The engine's CSS is `width: min(100% - 2 * gutter, contentWidth)` on the
 * content surface. Everything here is that rule expressed in JS so it can
 * SHOW what a value means; it is never used to position anything (the editor
 * measures the surface, see canvasOf in preview-edit.js).
 */

/** The bounds for free adjustment. Below 960 the column gets narrower than a
 *  tablet in landscape, above 1920 it does not bind on ordinary screens. */
export const WIDTH_MIN = 960;
export const WIDTH_MAX = 1920;
export const WIDTH_STEP = 20;

/**
 * The side margin against the window edge, in PERCENT OF THE WINDOW WIDTH
 * (vw). Relative rather than px, because the margin only has an effect in the
 * band where the design width does not bind yet: there the breathing space
 * should follow the screen. A fixed margin that fits a phone is too tight on
 * a tablet.
 *
 * The ceiling of 12 is there because 2 x 12 % already eats a quarter of the
 * screen.
 */
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

/**
 * The quick presets. The values come from the field: 1200 is the lower half of
 * Squarespace's range, 1440 is the practitioner consensus at both Squarespace
 * and Webflow, 1600 is Wix Studio's own default.
 */
export const WIDTH_PRESETS = [
  { id: 'compact', width: 1200 },
  { id: 'standard', width: 1440 },
  { id: 'wide', width: 1600 },
  { id: 'full', width: 'full' },
];

/**
 * The screen widths the sample is measured against: the three most common
 * desktop resolutions. 1536 is a 1920 screen at 125 % scaling in Windows, so
 * not a screen size of its own but the second most common CSS width in
 * practice.
 */
export const REF_SCREENS = [1920, 1536, 1366];

/** Clamps and snaps a free width value into the legal range. */
export function clampWidth(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 1440;
  const snapped = Math.round(n / WIDTH_STEP) * WIDTH_STEP;
  return Math.min(WIDTH_MAX, Math.max(WIDTH_MIN, snapped));
}

/** Clamps and snaps the side margin (vw). */
export function clampGutter(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 6;
  const snapped = Math.round(n / GUTTER_STEP) * GUTTER_STEP;
  return Math.min(GUTTER_MAX, Math.max(GUTTER_MIN, snapped));
}

/**
 * The smallest window width where the content actually REACHES the design
 * width.
 *
 * With a relative margin this is not `contentWidth + 2 * gutter`: the margin
 * itself grows with the window, so that width has to be solved out of
 * `W - 2*W*g/100 >= width`. With 1440 and 6 % the answer is 1637, not 1488.
 * Used as the canvas width for "Screen", since anything wider renders
 * identically.
 *
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
 * What the content surface actually becomes at a given screen width.
 *
 * @param {number|'full'} contentWidth
 * @param {number} gutter Percent of the window width
 * @param {number} screen The screen's CSS width
 * @returns {{width: number, margin: number, pct: number, bound: boolean}}
 *   `bound` is true when the design width is what constrains (that is, the
 *   setting has an effect here); false means the surface is fluid and fills
 *   the screen minus the margins.
 */
export function contentBand(contentWidth, gutter, screen) {
  // The margin is a SHARE of the screen, so it has to be computed per screen
  // width. This is the whole reason the sample shows three widths: the same
  // setting gives a different margin on each of them.
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
