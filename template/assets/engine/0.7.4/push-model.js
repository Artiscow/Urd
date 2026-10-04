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
/** The air left under the lowest block when the push raises a section's height. */
export const PUSH_SECTION_PAD = 24;

/**
 * The block types whose height follows their content (ADR-0025): the box is
 * drawn at the content's height, also when that is less than the frame, and
 * the editor fits the frame to the content after an edit of the block. Every
 * other type keeps the height of its frame, and text is at least as tall as
 * its words.
 */
export const FOLLOWS_CONTENT = new Set(['audio', 'calendar', 'cart', 'checkout', 'collection', 'countdown', 'faq', 'form', 'product', 'quote', 'share', 'stats', 'table', 'timeline']);

/**
 * Whether a block's height follows its content (ADR-0025).
 * @param {{type?: string}} block
 * @returns {boolean}
 */
export function followsContent(block) {
  return FOLLOWS_CONTENT.has(block?.type);
}

/** The floor of a block's shrink (block.fitMin), a share of the design size: 0.01 to 1, default 0.6. */
export function clampFitMin(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(1, Math.max(0.01, n)) : 0.6;
}

/**
 * The block types whose content cannot wrap: their frame already follows
 * the canvas in percent, so their shrink is a floor on the frame's width
 * (fitFloorPx) instead of a zoom of the content. The editor keeps the same
 * list for its option labels.
 */
export const FIT_BY_WIDTH = new Set(['image', 'video', 'shape', 'icon']);

/**
 * The smallest width in px a block set to shrink may take, for the types in
 * FIT_BY_WIDTH: its share of the design width times the floor. 0 (no floor)
 * for every other block, for a block without the field, and for a site
 * without a design width ("full"), where nothing has a design size.
 * @param {{type?: string, fit?: string, fitMin?: number, frames?: {desktop?: {w?: number}}}} block
 * @param {{contentWidth?: number|string}} [layout] site.layout
 * @returns {number}
 */
export function fitFloorPx(block, layout) {
  if (!block || block.fit !== 'shrink' || !FIT_BY_WIDTH.has(block.type)) return 0;
  const width = layout?.contentWidth ?? 1440;
  const w = Number(block.frames?.desktop?.w);
  if (typeof width !== 'number' || !(width > 0) || !Number.isFinite(w) || w <= 0) return 0;
  return Math.round((w / 100) * width * clampFitMin(block.fitMin));
}

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

/**
 * A frame fitted to its content is an edit of the design (ADR-0025 decision
 * 5), so the data takes over what the push pass drew before the fit: a
 * taller frame moves the blocks below by the push rules, exactly as far as
 * the pass had shifted them, and a section with a height of its own grows
 * the way the pass raised it. A shorter frame moves nothing, since the push
 * moves blocks down only.
 * @param {Array<{id: string, frames?: {desktop?: {x?: number, y: number, h: number}}}>} blocks The section's blocks
 * @param {string} id The block whose frame is fitted
 * @param {number} h The fitted height in px
 * @param {number} [designPx] The section's own height in px, 0 when it follows its blocks
 * @returns {{moves: Map<string, number>, minHeight: number}} The new y of each block that
 *   moves, and the section's new height in px (0 when it keeps the one it has)
 */
export function fitMoves(blocks, id, h, designPx = 0) {
  const items = [];
  for (const block of blocks ?? []) {
    const frame = block?.frames?.desktop;
    if (!frame || !Number.isFinite(frame.y) || !Number.isFinite(frame.h)) continue;
    const grow = block.id === id ? Math.max(0, h - frame.h) : 0;
    items.push({ id: block.id, x: frame.x ?? 0, y: frame.y, h: frame.h, grow });
  }
  const moves = new Map();
  if (!items.some((it) => it.grow > 0)) return { moves, minHeight: 0 };
  const { shifts } = pushLayout(items);
  // The section line as the push pass draws it: a block counts towards the
  // section's height only while its design bottom is inside it.
  const inside = (it) => designPx <= 0 || it.y + it.h <= designPx;
  let grew = false;
  let bottom = 0;
  for (const it of items) {
    const shift = shifts.get(it.id) ?? 0;
    if (shift) moves.set(it.id, it.y + shift);
    if (inside(it)) {
      grew = grew || it.grow > 0;
      bottom = Math.max(bottom, it.y + shift + it.h + it.grow);
    }
  }
  const minHeight = grew && designPx > 0 && bottom + PUSH_SECTION_PAD > designPx ? Math.round(bottom + PUSH_SECTION_PAD) : 0;
  return { moves, minHeight };
}
