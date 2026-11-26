/**
 * The Screen device of the editing canvas (ADR-0018): the owner's window width, a common screen size with its height, an own size or a ratio, kept per browser.
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
 * The own window width in whole CSS px: the viewport's, which the published page lays out in, else the screen's; never below 1.
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
 * Normalises a stored Screen preference: `window`, a common size's id, `own` with a width and optional height, or `ratio` with its ratio and its own width.
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
 * The canvas viewport a preference gives: the own width, a common size, the own size, or a ratio's width and its height; a height of 0 fills the panel.
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
