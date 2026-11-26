/**
 * Aspect ratios for the preview's sizes: each device's common ratios, a height from a width and a ratio, and a size's own ratio, the long side first («16:9»).
 */

/** The common ratios, the long side over the short. */
export const RATIOS = {
  '21:9': [21, 9],
  '20:9': [20, 9],
  '19.5:9': [19.5, 9],
  '18:9': [18, 9],
  '16:9': [16, 9],
  '16:10': [16, 10],
  '3:2': [3, 2],
  '4:3': [4, 3],
};

/** The ratios each device's fold-out offers: a screen lies on its long side, a phone stands on its short one. */
export const SCREEN_RATIOS = ['16:9', '16:10', '21:9', '3:2', '4:3'];
export const PHONE_RATIOS = ['19.5:9', '20:9', '18:9', '16:9', '4:3'];

const value = (id) => {
  const r = RATIOS[id];
  return r ? r[0] / r[1] : null;
};

/**
 * The height a width takes at a ratio: a screen's is the shorter side, a phone's (upright) the longer.
 * @param {number} width
 * @param {string} id A ratio's id
 * @param {boolean} upright The phone held upright
 * @returns {number} 0 for an unknown ratio
 */
export function ratioHeight(width, id, upright) {
  const r = value(id);
  if (!r || !(width > 0)) return 0;
  return Math.round(upright ? width * r : width / r);
}

/**
 * The ratio a size goes by: a common ratio within 1.5 per cent of its proportions, else the long side over the short to two decimals («1.85:1»).
 * @param {number} width
 * @param {number} height
 * @returns {[number, number]|null} null for a size without a height
 */
export function aspectOf(width, height) {
  if (!(width > 0) || !(height > 0)) return null;
  const long = Math.max(width, height);
  const short = Math.min(width, height);
  const r = long / short;
  for (const [a, b] of Object.values(RATIOS)) {
    if (Math.abs(r - a / b) / (a / b) <= 0.015) return [a, b];
  }
  if (Math.abs(r - 1) <= 0.015) return [1, 1];
  return [Math.round(r * 100) / 100, 1];
}

/** A ratio's parts written as «16:9», the numbers in the format given. */
export function aspectText(parts, format = (n) => String(n)) {
  return parts ? `${format(parts[0])}:${format(parts[1])}` : '';
}
