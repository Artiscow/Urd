/**
 * The Screen device of the editing canvas (ADR-0018 addendum): its width is
 * the owner's own screen in CSS px (browser zoom included), or an editing
 * size chosen per browser, the Wix Studio model. Only an editing size can
 * carry a height; the own screen fills the panel like every other device.
 * Pure functions, node-tested.
 */

export const SCREEN_WIDTH_MIN = 640;
export const SCREEN_WIDTH_MAX = 3840;
export const SCREEN_HEIGHT_MIN = 480;
export const SCREEN_HEIGHT_MAX = 2400;

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

/**
 * The own screen width in whole CSS px. A maximised window (its outer width
 * reaches the available screen width) reports the viewport width directly,
 * which every engine gives in zoomed CSS px; otherwise screen.width, which
 * some engines report unzoomed. The window width is the last fallback,
 * never below 1.
 * @param {{screenWidth?: number, availWidth?: number, outerWidth?: number, innerWidth?: number}} win
 * @returns {number}
 */
export function ownScreenWidth({ screenWidth = 0, availWidth = 0, outerWidth = 0, innerWidth = 0 } = {}) {
  const maximised = availWidth > 0 && outerWidth > 0 && outerWidth >= availWidth - 2 && innerWidth > 0;
  const width = maximised ? innerWidth : (screenWidth > 0 ? screenWidth : innerWidth);
  return Math.max(1, Math.round(width > 0 ? width : 1));
}

/** Reads the browser's own numbers; null outside a browser. */
export function ownScreenWidthOf(win) {
  if (!win || !win.screen) return null;
  return ownScreenWidth({
    screenWidth: win.screen.width,
    availWidth: win.screen.availWidth,
    outerWidth: win.outerWidth,
    innerWidth: win.innerWidth,
  });
}

/**
 * Normalises a stored Screen preference. Unknown or missing parts fall to
 * the defaults: the own screen mode, a width equal to the own screen (so the
 * editing-size field starts at what the owner has), no height (fill).
 * @param {unknown} raw The stored object, or anything else
 * @param {number} ownWidth The own screen width
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
