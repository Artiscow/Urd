/**
 * Snapping on the canvas: a dragged box snaps to its neighbours' edges, centres and gaps and to the content's shares within eight screen px.
 * Pure.
 */

/** How the grid is drawn, per browser: lines, the default; dots where lines would cross; or only in a drag. */
export const GRID_LOOKS = ['lines', 'dots', 'drag'];

/**
 * The grid's look a stored value reads as: a known one, else the default.
 * @param {string|null|undefined} raw
 * @returns {'lines'|'dots'|'drag'}
 */
export function gridLookOf(raw) {
  return GRID_LOOKS.includes(raw) ? raw : 'lines';
}

/**
 * The grid line nearest a position, the lines counted out from the middle of the content.
 * @param {number} at The position, in percent of the content's width
 * @param {number} step The cell's width, in the same percent
 * @param {number} [middle] The content's centre
 * @returns {number}
 */
export function gridLine(at, step, middle = 50) {
  return middle + Math.round((at - middle) / step) * step;
}

/** The snap distance on screen, in px, whatever the preview's zoom. */
export const SNAP_SCREEN_PX = 8;

/**
 * The snap distance in the page's own px: the screen distance times the chrome scale (1 / zoom).
 * @param {number|string} chromeScale The page's --urd-chrome-scale
 * @returns {number}
 */
export function snapTolerance(chromeScale) {
  const s = Number.parseFloat(chromeScale);
  return SNAP_SCREEN_PX * (Number.isFinite(s) && s > 0 ? s : 1);
}

/**
 * The nearest line a box's start, middle or end can snap to on one axis; among the content's own lines, one marked `prefer` wins while in reach.
 * @param {number} start The box's start on the axis, in px
 * @param {number} size The box's size on the axis, in px
 * @param {Array<{at: number, from: number, to: number, surface?: boolean, prefer?: boolean}>} targets The lines, each with the span it comes from on the other axis
 * @param {number} tol The snap distance
 * @returns {{d: number, target: {at: number, from: number, to: number}, edge: 'start'|'middle'|'end'}|null} The move that lands the box on the line
 */
export function edgeSnap(start, size, targets, tol) {
  let best = null;
  for (const target of targets) {
    for (const [edge, offset] of [['start', 0], ['middle', size / 2], ['end', size]]) {
      const d = target.at - (start + offset);
      if (Math.abs(d) > tol) continue;
      const ranked = target.surface && best?.target.surface && Boolean(target.prefer) !== Boolean(best.target.prefer);
      const wins = !best || (ranked ? Boolean(target.prefer) : Math.abs(d) < Math.abs(best.d));
      if (wins) best = { d, target, edge };
    }
  }
  return best;
}

/**
 * Equal-gap snapping on one axis: the box lands beyond a pair at the pair's own gap, or between two with the same air on both sides.
 * @param {number} start The box's start on the axis, in px
 * @param {number} size The box's size on the axis, in px
 * @param {Array<{start: number, end: number}>} neighbours The neighbours' spans on the axis
 * @param {number} tol The snap distance
 * @returns {{d: number, gaps: Array<{from: number, to: number}>}|null} The move, and the gaps that become equal, for the bands
 */
export function gapSnap(start, size, neighbours, tol) {
  const boxes = neighbours.filter((b) => b.end > b.start).sort((a, b) => a.start - b.start);
  let best = null;
  const consider = (at, gaps) => {
    const d = at - start;
    if (Math.abs(d) <= tol && (!best || Math.abs(d) < Math.abs(best.d))) best = { d, gaps };
  };
  for (let i = 0; i + 1 < boxes.length; i += 1) {
    const a = boxes[i];
    const b = boxes[i + 1];
    const gap = b.start - a.end;
    if (gap > 0) {
      // Beyond the pair, at the pair's own gap.
      consider(b.end + gap, [{ from: a.end, to: b.start }, { from: b.end, to: b.end + gap }]);
      consider(a.start - gap - size, [{ from: a.start - gap, to: a.start }, { from: a.end, to: b.start }]);
    }
    // Between the pair, with the same air on both sides.
    if (gap > size) {
      const air = (gap - size) / 2;
      consider(a.end + air, [{ from: a.end, to: a.end + air }, { from: b.start - air, to: b.start }]);
    }
  }
  return best;
}

/** The content's shares a block snaps to on the desktop: the quarters, the thirds and the half. */
export const SNAP_SHARES = [1 / 4, 1 / 3, 1 / 2, 2 / 3, 3 / 4];

/** The guide lines' shares: the twelfths on the desktop, the quarters on the phone. */
export const guideShares = (mobile) => (mobile ? [1 / 4, 1 / 2, 3 / 4] : Array.from({ length: 11 }, (_, i) => (i + 1) / 12));

/** Whether a share is one of the strong lines, a quarter, a third or the half, drawn dashed and labelled stronger. */
export const strongShare = (share) => SNAP_SHARES.some((s) => Math.abs(s - share) < 1e-6);

/**
 * The marks of the lines a dragged box stands on: a centre line on to the nearest block, a notch there; an edge line across the blocks.
 * @param {number} start
 * @param {number} size
 * @param {{from: number, to: number}} span The box across
 * @param {Array<{at: number, from: number, to: number, share?: number}>} targets
 * @param {number} [eps]
 * @returns {Array<{at: number, part: 'start'|'middle'|'end', from: number, to: number, share?: number, notch?: number}>}
 */
export function dragMarks(start, size, span, targets, eps = 1) {
  const groups = new Map();
  for (const target of targets) {
    const part = [['start', 0], ['middle', size / 2], ['end', size]].find(([, offset]) => Math.abs(target.at - (start + offset)) <= eps)?.[0];
    if (!part) continue;
    const key = Math.round(target.at);
    const group = groups.get(key) ?? { at: target.at, part, near: [] };
    if (target.share !== undefined) group.share = target.share;
    else group.near.push(target);
    groups.set(key, group);
  }
  return [...groups.values()].map(({ at, part, near, share }) => {
    const mark = { at, part, from: span.from, to: span.to };
    if (share !== undefined) mark.share = share;
    if (!near.length) return mark;
    if (part !== 'middle') {
      mark.from = Math.min(span.from, ...near.map((n) => n.from));
      mark.to = Math.max(span.to, ...near.map((n) => n.to));
      return mark;
    }
    const away = (n) => (n.to <= span.from ? span.from - n.to : n.from >= span.to ? n.from - span.to : 0);
    const nearest = near.reduce((a, b) => (away(b) < away(a) ? b : a));
    if (nearest.to <= span.from) Object.assign(mark, { from: nearest.to, notch: nearest.to });
    else if (nearest.from >= span.to) Object.assign(mark, { to: nearest.from, notch: nearest.from });
    return mark;
  });
}

/**
 * Where a gap's measure stands across the gap: on the guide line nearest the middle of the span, a strong one first, else at the middle.
 * @param {number} from
 * @param {number} to
 * @param {Array<{at: number, strong?: boolean}>} [lines] The guide lines across the same axis
 * @param {number} [pad] How far inside the span a line must stand
 * @returns {number}
 */
export function measureAt(from, to, lines = [], pad = 6) {
  const mid = (from + to) / 2;
  const inside = lines.filter((line) => line.at >= from + pad && line.at <= to - pad);
  const pool = inside.some((line) => line.strong) ? inside.filter((line) => line.strong) : inside;
  if (!pool.length) return mid;
  return pool.reduce((a, b) => (Math.abs(b.at - mid) < Math.abs(a.at - mid) ? b : a)).at;
}

/**
 * A move held to one axis (Shift): the smaller of the two deltas is dropped.
 * @param {number} dx
 * @param {number} dy
 * @returns {{dx: number, dy: number}}
 */
export function lockAxis(dx, dy) {
  return Math.abs(dx) >= Math.abs(dy) ? { dx, dy: 0 } : { dx: 0, dy };
}
