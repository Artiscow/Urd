/**
 * The Screen device of the editing canvas (ADR-0018 addendum): its width is
 * the owner's own browser window in CSS px, the same window the published
 * page is compared in, or an editing size chosen per browser, the Wix
 * Studio model. Only an editing size can carry a height; the own window
 * fills the panel like every other device. Pure functions, node-tested.
 */

export const SCREEN_WIDTH_MIN = 640;
export const SCREEN_WIDTH_MAX = 3840;
export const SCREEN_HEIGHT_MIN = 480;
export const SCREEN_HEIGHT_MAX = 2400;

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

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
 * Normalises a stored Screen preference. Unknown or missing parts fall to
 * the defaults: the own window mode, a width equal to the own window (so
 * the editing-size field starts at what the owner has), no height (fill).
 * @param {unknown} raw The stored object, or anything else
 * @param {number} ownWidth The own window width
 * @returns {{mode: 'own'|'custom', width: number, height: number}}
 */
export function screenSetting(raw, ownWidth) {
  const obj = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const mode = obj.mode === 'custom' ? 'custom' : 'own';
  const w = Number(obj.width);
  const width = clamp(Number.isFinite(w) && w > 0 ? w : ownWidth, SCREEN_WIDTH_MIN, SCREEN_WIDTH_MAX);
  const h = Number(obj.height);
  const height = Number.isFinite(h) && h > 0 ? clamp(h, SCREEN_HEIGHT_MIN, SCREEN_HEIGHT_MAX) : 0;
  return { mode, width: Math.round(width), height: Math.round(height) };
}

/**
 * The canvas viewport the preference gives: the measured own width with no
 * height in own mode, the stored size in custom mode. A height of 0 means
 * the canvas fills the panel.
 * @param {{mode: string, width: number, height: number}} pref
 * @param {number} ownWidth
 * @returns {{width: number, height: number}}
 */
export function screenViewport(pref, ownWidth) {
  if (pref?.mode === 'custom') return { width: pref.width, height: pref.height || 0 };
  return { width: ownWidth, height: 0 };
}
