/**
 * Content push on the desktop canvas (ADR-0024). Blocks are placed
 * absolutely with pixel frames, so a block whose content grows taller than
 * its frame (wrapped text, a longer feed) would draw over the blocks
 * beneath. This model moves the blocks below instead, with the rules the
 * Wix Editor publishes for its free canvas: only vertical position and size
 * count, a gap of PUSH_GAP_MAX px or less is preserved, a larger gap stays
 * until it would fall under PUSH_GAP_MIN px, a block whose top sits above the
 * grown block's vertical middle is a deliberate overlap and stays, and a move
 * cascades to the blocks below the moved block. Every block below moves, not
 * only the nearest one (the Fluid Engine reading of the same rule).
 *
 * Pure: render.js measures the growth and writes the shifts; nothing here
 * touches the DOM or the stored frames.
 */

/** A gap this small or smaller is preserved: the lower block moves the whole growth. */
export const PUSH_GAP_MAX = 70;
/** A larger gap absorbs the growth until this much is left. */
export const PUSH_GAP_MIN = 10;

/**
 * The shift for each block below the blocks that grew.
 * @param {Array<{id: string, y: number, h: number, x?: number, grow?: number}>} items
 *   Frames in design px with the measured extra height in `grow` (0 or more).
 * @param {{gapMax?: number, gapMin?: number}} [opts]
 * @returns {{shifts: Map<string, number>, bottom: number}} The shift per id
 *   (only ids that move) and the lowest edge after the growth and the shifts.
 */
export function pushLayout(items, opts = {}) {
  const gapMax = opts.gapMax ?? PUSH_GAP_MAX;
  const gapMin = opts.gapMin ?? PUSH_GAP_MIN;
  const list = items
    .filter((it) => it && Number.isFinite(it.y) && Number.isFinite(it.h))
    .map((it) => ({ ...it, grow: Math.max(0, Number(it.grow) || 0) }))
    .sort((a, b) => (a.y - b.y) || ((a.x ?? 0) - (b.x ?? 0)));
  const shift = new Map(list.map((it) => [it.id, 0]));
  let bottom = -Infinity;

  for (const a of list) {
    // A block's own shift is growth for the blocks below it: the cascade.
    const delta = shift.get(a.id) + a.grow;
    bottom = Math.max(bottom, a.y + shift.get(a.id) + a.h + a.grow);
    if (delta <= 0) continue;
    const middle = a.y + a.h / 2;
    const b0 = a.y + a.h;
    for (const b of list) {
      if (b === a || b.y < middle) continue;
      const gap = Math.max(0, b.y - b0);
      const move = gap <= gapMax ? delta : Math.max(0, delta - (gap - gapMin));
      if (move > shift.get(b.id)) shift.set(b.id, move);
    }
  }

  const shifts = new Map();
  for (const [id, value] of shift) if (value > 0) shifts.set(id, value);
  return { shifts, bottom: Number.isFinite(bottom) ? bottom : 0 };
}
