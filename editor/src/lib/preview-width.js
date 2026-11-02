/**
 * The phone's sizes and the dragged width of the editing canvas (ADR-0018, the Squarespace model of real screen sizes): the Phone device shows one of the common phone viewports with its height, a tablet, or the width alone, remembered per browser like the Screen's editing size; and any width can be dragged at the canvas's edge, snapping to the devices' widths and the site's phone breakpoint on the way.
 * A common aspect ratio keeps the width the Phone stood at when it was chosen and takes its height from the ratio, the phone held upright (lib/aspect.js).
 * Pure, node-tested (tests/preview-width.test.mjs).
 */

import { PHONE_RATIOS, ratioHeight } from './aspect.js';

/** The viewports offered, in CSS px, from the narrowest: the sizes most phones lay a page out in today, and a tablet held upright, which the engine draws as a desktop since it stands above the phone breakpoint. */
export const PHONE_SIZES = [
  { id: 'phone-s', width: 360, height: 780 },
  { id: 'phone', width: 393, height: 852 },
  { id: 'phone-w', width: 412, height: 915 },
  { id: 'phone-l', width: 440, height: 956 },
  { id: 'tablet', width: 810, height: 1080 },
];

/** The phone with its width alone, filling the panel. */
export const PHONE_FILL_WIDTH = 390;

export const PHONE_WIDTH_MIN = 280;
export const PHONE_WIDTH_MAX = 1280;
export const PHONE_HEIGHT_MIN = 400;
export const PHONE_HEIGHT_MAX = 2000;

/** The bounds of a dragged width: a narrow phone to a wide screen. */
export const FREE_WIDTH_MIN = 320;
export const FREE_WIDTH_MAX = 3840;

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

/**
 * Normalises the stored phone preference: a preset's id, `fill` for the width alone, `own` with a width and a height, or `ratio` with a common ratio and the width it stands at; anything else is the preset `phone`.
 * The ratio's width is its own, so choosing a ratio leaves the own size's fields as they were.
 * @param {unknown} raw
 * @returns {{size: string, width: number, height: number, ratio?: string, ratioWidth?: number}}
 */
export function phoneSetting(raw) {
  const obj = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const ratio = obj.size === 'ratio' && PHONE_RATIOS.includes(obj.ratio);
  const size = ratio || PHONE_SIZES.some((p) => p.id === obj.size) || obj.size === 'fill' || obj.size === 'own' ? obj.size : 'phone';
  const w = Number(obj.width);
  const h = Number(obj.height);
  const pref = {
    size,
    width: Math.round(clamp(Number.isFinite(w) && w > 0 ? w : PHONE_SIZES[1].width, PHONE_WIDTH_MIN, PHONE_WIDTH_MAX)),
    height: Math.round(clamp(Number.isFinite(h) && h > 0 ? h : PHONE_SIZES[1].height, PHONE_HEIGHT_MIN, PHONE_HEIGHT_MAX)),
  };
  if (!ratio) return pref;
  const rw = Number(obj.ratioWidth);
  return { ...pref, ratio: obj.ratio, ratioWidth: Math.round(clamp(Number.isFinite(rw) && rw > 0 ? rw : PHONE_SIZES[1].width, PHONE_WIDTH_MIN, PHONE_WIDTH_MAX)) };
}

/**
 * The viewport the phone preference gives: a preset's size, the fill width with no height, the own size, or a ratio's width with the height the ratio gives it upright.
 * @param {{size: string, width: number, height: number}} pref
 * @returns {{width: number, height: number}} height 0 fills the panel
 */
export function phoneViewport(pref) {
  const preset = PHONE_SIZES.find((p) => p.id === pref?.size);
  if (preset) return { width: preset.width, height: preset.height };
  if (pref?.size === 'own') return { width: pref.width, height: pref.height };
  if (pref?.size === 'ratio') return { width: pref.ratioWidth, height: ratioHeight(pref.ratioWidth, pref.ratio, true) };
  return { width: PHONE_FILL_WIDTH, height: 0 };
}

/**
 * A dragged width held inside its bounds and snapped to the nearest stop within the tolerance, so the devices' widths and the site's phone breakpoint catch the pointer as it passes them.
 * @param {number} width The width under the pointer, in canvas px
 * @param {number[]} stops The widths to snap to
 * @param {number} tolerance In canvas px
 * @returns {number}
 */
export function snapWidth(width, stops, tolerance) {
  const w = clamp(Math.round(Number.isFinite(width) ? width : FREE_WIDTH_MIN), FREE_WIDTH_MIN, FREE_WIDTH_MAX);
  let best = null;
  for (const stop of stops ?? []) {
    if (!Number.isFinite(stop)) continue;
    const d = Math.abs(stop - w);
    if (d <= tolerance && (best === null || d < Math.abs(best - w))) best = stop;
  }
  return clamp(best ?? w, FREE_WIDTH_MIN, FREE_WIDTH_MAX);
}
