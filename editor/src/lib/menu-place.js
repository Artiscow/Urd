/**
 * Where the floating element menu stands (0.7.20.6, proposals J and K on
 * the Design canvas): beside its block, to the right, else to the left,
 * else below it, never over it where the window allows; and where the owner
 * dragged it, kept for the session and clamped into the window. Pure and
 * node-tested; the coordinates are the editor window's.
 */

/** The menu's box at a place, kept inside the window: `min` is the left edge the admin's panels leave free. */
export function clampPlace(place, size, view, min = 8, margin = 8) {
  const maxLeft = Math.max(min, view.w - size.w - margin);
  const maxTop = Math.max(margin, view.h - size.h - margin);
  return {
    left: Math.min(Math.max(min, place.left), maxLeft),
    top: Math.min(Math.max(margin, place.top), maxTop),
  };
}

/** How much of the block the menu would cover at a place, in px squared. */
function overlap(place, size, block) {
  const w = Math.min(place.left + size.w, block.right) - Math.max(place.left, block.left);
  const h = Math.min(place.top + size.h, block.bottom) - Math.max(place.top, block.top);
  return w > 0 && h > 0 ? w * h : 0;
}

/**
 * The place beside the block: the first of right, left and below that
 * covers none of it once clamped into the window, else the one that covers
 * the least, so the block stays visible where the window allows.
 * @param {{left: number, top: number, right: number, bottom: number}} block The block in window px
 * @param {{w: number, h: number}} size The menu's box
 * @param {{w: number, h: number}} view The window
 * @param {{min?: number, gap?: number, margin?: number}} opts
 * @returns {{left: number, top: number, side: 'right'|'left'|'below'}}
 */
export function placeBesideBlock(block, size, view, { min = 8, gap = 12, margin = 8 } = {}) {
  const candidates = [
    ['right', { left: block.right + gap, top: block.top }],
    ['left', { left: block.left - gap - size.w, top: block.top }],
    ['below', { left: block.left, top: block.bottom + gap }],
  ].map(([side, raw]) => {
    const place = clampPlace(raw, size, view, min, margin);
    return { side, ...place, covers: overlap(place, size, block) };
  });
  const best = candidates.find((c) => c.covers === 0) ?? candidates.reduce((a, b) => (b.covers < a.covers ? b : a));
  return { left: best.left, top: best.top, side: best.side };
}
