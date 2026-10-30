/**
 * The gradient's stops as the Background editor moves them (the bar with a handle per colour, and the rows under it): the list kept in position order, a stop added where the pointer is or where the widest gap is, and a pointer's place on the bar as a position.
 * The engine reads any order (backgrounds/gradient.js sorts at render), so the sorting here is for the rows alone, which stand in the order the bar shows.
 * Pure, so it is node-tested (tests/gradient-stops.test.mjs).
 */

const clampAt = (v) => Math.min(100, Math.max(0, Math.round((Number(v) || 0) * 100) / 100));
const wholeAt = (v) => Math.round(clampAt(v));

/**
 * The stops in position order, stable among stops at one position; a copy, with each position inside 0 to 100 and otherwise as stored.
 * @template {{at?: number}} T
 * @param {T[]} stops
 * @returns {T[]}
 */
export function sortStops(stops) {
  const list = Array.isArray(stops) ? stops : [];
  return list
    .map((s, i) => ({ s: { ...s, at: clampAt(s?.at) }, i }))
    .sort((a, b) => a.s.at - b.s.at || a.i - b.i)
    .map(({ s }) => s);
}

/**
 * A pointer's place on the bar as a position, 0 to 100.
 * @param {number} clientX
 * @param {{left: number, width: number}} rect The bar's box
 * @returns {number}
 */
export function pointerAt(clientX, rect) {
  if (!rect?.width) return 0;
  return wholeAt(((clientX - rect.left) / rect.width) * 100);
}

/**
 * The position in the middle of the widest gap between the stops, the edges counted as gaps too, so a new colour lands where there is most room.
 * @param {Array<{at?: number}>} stops
 * @returns {number}
 */
export function widestGapAt(stops) {
  const ats = sortStops(stops).map((s) => s.at);
  if (!ats.length) return 50;
  const points = [0, ...ats, 100];
  let best = { width: -1, at: 50 };
  for (let i = 1; i < points.length; i++) {
    const width = points[i] - points[i - 1];
    if (width > best.width) best = { width, at: Math.round((points[i] + points[i - 1]) / 2) };
  }
  return best.at;
}

/**
 * The stops with a colour added at a position, in position order: the new stop takes the nearest stop's colour and opacity, so it blends in until it is changed.
 * @template {{color: string, at?: number}} T
 * @param {T[]} stops
 * @param {number} at
 * @returns {T[]}
 */
export function addStopAt(stops, at) {
  const sorted = sortStops(stops);
  const pos = wholeAt(at);
  const nearest = sorted.reduce((best, s) => (best === null || Math.abs(s.at - pos) < Math.abs(best.at - pos) ? s : best), null);
  const stop = { color: nearest?.color ?? '#ffffff', at: pos };
  if (nearest && nearest.alpha != null) stop.alpha = nearest.alpha;
  return sortStops([...sorted, stop]);
}
