/**
 * Two pages scrolling together (the live phone beside the canvas): one monotone cubic curve (Fritsch and Carlson) through where each section starts in both pages.
 */

/**
 * The curve's points and slopes both ways: the pages' tops, the start of each section both draw where it lies further down in both, and the pages' ends.
 * @param {Array<[string, number]>} canvasTops Each section's id and where it starts in the canvas's page, in px, in the page's order
 * @param {number} canvasMax The canvas's furthest scroll
 * @param {Array<[string, number]>} phoneTops The same in the phone's page
 * @param {number} phoneMax The phone's furthest scroll
 * @returns {{xs: number[], ys: number[], toPhone: number[], toCanvas: number[]}}
 */
export function scrollMap(canvasTops, canvasMax, phoneTops, phoneMax) {
  const cMax = Math.max(0, canvasMax || 0);
  const pMax = Math.max(0, phoneMax || 0);
  const phone = new Map(phoneTops);
  const xs = [0];
  const ys = [0];
  for (const [id, x] of canvasTops) {
    const y = phone.get(id);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    if (x <= xs.at(-1) || y <= ys.at(-1) || x >= cMax || y >= pMax) continue;
    xs.push(x);
    ys.push(y);
  }
  // Both pages end together; a page that cannot scroll stands at its top.
  if (cMax > xs.at(-1) && pMax > ys.at(-1)) {
    xs.push(cMax);
    ys.push(pMax);
  }
  return { xs, ys, toPhone: monotoneSlopes(xs, ys), toCanvas: monotoneSlopes(ys, xs) };
}

/**
 * The slopes at each point that keep a cubic through the points monotone (Fritsch and Carlson).
 * @param {number[]} xs Increasing
 * @param {number[]} ys Increasing
 * @returns {number[]}
 */
export function monotoneSlopes(xs, ys) {
  const n = xs.length;
  if (n < 2) return n ? [0] : [];
  const d = [];
  for (let i = 0; i < n - 1; i++) d.push((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
  const m = new Array(n);
  m[0] = d[0];
  m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
      continue;
    }
    const a = m[i] / d[i];
    const b = m[i + 1] / d[i];
    const h = a * a + b * b;
    if (h > 9) {
      const t = 3 / Math.sqrt(h);
      m[i] = t * a * d[i];
      m[i + 1] = t * b * d[i];
    }
  }
  return m;
}

/**
 * Where the other page stands for a scroll of this one: the curve read at `x`.
 * @param {number[]} xs This page's points, increasing
 * @param {number[]} ys The other page's points
 * @param {number[]} ms The slopes from this page to the other (monotoneSlopes(xs, ys))
 * @param {number} x This page's scroll
 * @returns {number}
 */
export function mapScroll(xs, ys, ms, x) {
  const n = xs.length;
  if (n < 2) return 0;
  if (x <= xs[0]) return ys[0];
  if (x >= xs[n - 1]) return ys[n - 1];
  let lo = 0;
  let hi = n - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (xs[mid] <= x) lo = mid;
    else hi = mid;
  }
  const h = xs[hi] - xs[lo];
  const t = (x - xs[lo]) / h;
  const t2 = t * t;
  const t3 = t2 * t;
  return (2 * t3 - 3 * t2 + 1) * ys[lo] + (t3 - 2 * t2 + t) * h * ms[lo] + (-2 * t3 + 3 * t2) * ys[hi] + (t3 - t2) * h * ms[hi];
}
