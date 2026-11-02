/**
 * The Screen device of the editing canvas (ADR-0018, Consequences): its width is
 * the owner's own browser window in CSS px, the same window the published
 * page is compared in, one of the common screen sizes with its height, or an
 * own size, chosen in the Screen button's fold-out and kept per browser as the
 * Phone's size is. A size with a height pins both axes and shows the fold; the
 * own window fills the panel. A common aspect ratio keeps the width the Screen
 * stood at when it was chosen and takes its height from the ratio
 * (lib/aspect.js). Pure functions, node-tested.
 */

import { SCREEN_RATIOS, ratioHeight } from './aspect.js';

export const SCREEN_WIDTH_MIN = 640;
export const SCREEN_WIDTH_MAX = 3840;
export const SCREEN_HEIGHT_MIN = 480;
export const SCREEN_HEIGHT_MAX = 2400;

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

/** The common screen sizes in CSS px, from the narrowest, each with the icon its button shows: the laptops most pages are seen on today, and a full HD screen. */
export const SCREEN_SIZES = [
  { id: 'laptop-s', width: 1280, height: 800, icon: 'device_laptop' },
  { id: 'laptop', width: 1440, height: 900, icon: 'device_laptop' },
  { id: 'laptop-l', width: 1536, height: 864, icon: 'device_laptop' },
  { id: 'fhd', width: 1920, height: 1080, icon: 'device_desktop' },
];

/**
 * The own window width in whole CSS px: the viewport width, which every
 * engine reports in zoomed CSS px and which is exactly what the published
 * page lays out in when opened in the same window (a maximised window is
 * the screen). The screen width is the fallback where no viewport is
 * measured, never below 1.
 * @param {{innerWidth?: number, screenWidth?: number}} win
 * @returns {number}
 */
export function ownWindowWidth({ innerWidth = 0, screenWidth = 0 } = {}) {
  const width = innerWidth > 0 ? innerWidth : screenWidth;
  return Math.max(1, Math.round(width > 0 ? width : 1));
}

/** Reads the browser's own numbers; null outside a browser. */
export function ownWindowWidthOf(win) {
  if (!win || typeof win.innerWidth !== 'number') return null;
  return ownWindowWidth({ innerWidth: win.innerWidth, screenWidth: win.screen?.width ?? 0 });
}

/**
 * Normalises a stored Screen preference: `window` for the own window, a common size's id, `own` with a width and an optional height, or `ratio` with a common ratio and the width it stands at.
 * A preference stored before the sizes came reads as it did: its `custom` mode is the own size, anything else the own window.
 * The width falls to the own window's (so the own-size field starts at what the owner has), and a missing height fills the panel.
 * The ratio's width is its own, so choosing a ratio leaves the own size's fields as they were.
 * @param {unknown} raw The stored object, or anything else
 * @param {number} ownWidth The own window width
 * @returns {{size: string, width: number, height: number, ratio?: string, ratioWidth?: number}}
 */
export function screenSetting(raw, ownWidth) {
  const obj = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const ratio = obj.size === 'ratio' && SCREEN_RATIOS.includes(obj.ratio);
  const known = ratio || obj.size === 'window' || obj.size === 'own' || SCREEN_SIZES.some((s) => s.id === obj.size);
  const size = known ? obj.size : obj.mode === 'custom' ? 'own' : 'window';
  const w = Number(obj.width);
  const width = clamp(Number.isFinite(w) && w > 0 ? w : ownWidth, SCREEN_WIDTH_MIN, SCREEN_WIDTH_MAX);
  const h = Number(obj.height);
  const height = Number.isFinite(h) && h > 0 ? clamp(h, SCREEN_HEIGHT_MIN, SCREEN_HEIGHT_MAX) : 0;
  const pref = { size, width: Math.round(width), height: Math.round(height) };
  if (!ratio) return pref;
  const rw = Number(obj.ratioWidth);
  const ratioWidth = clamp(Number.isFinite(rw) && rw > 0 ? rw : ownWidth, SCREEN_WIDTH_MIN, SCREEN_WIDTH_MAX);
  return { ...pref, ratio: obj.ratio, ratioWidth: Math.round(ratioWidth) };
}

/**
 * The canvas viewport the preference gives: the measured own width with no
 * height for the own window, a common size with its height, the own size, or
 * a ratio's width with the height the ratio gives it.
 * A height of 0 means the canvas fills the panel.
 * @param {{size: string, width: number, height: number}} pref
 * @param {number} ownWidth
 * @returns {{width: number, height: number}}
 */
export function screenViewport(pref, ownWidth) {
  const preset = SCREEN_SIZES.find((s) => s.id === pref?.size);
  if (preset) return { width: preset.width, height: preset.height };
  if (pref?.size === 'own') return { width: pref.width, height: pref.height || 0 };
  if (pref?.size === 'ratio') return { width: pref.ratioWidth, height: ratioHeight(pref.ratioWidth, pref.ratio, false) };
  return { width: ownWidth, height: 0 };
}

/** The icon the Screen button shows: a laptop while a laptop size is chosen, else a screen. */
export function screenIcon(pref) {
  return SCREEN_SIZES.find((s) => s.id === pref?.size)?.icon ?? 'device_desktop';
}
