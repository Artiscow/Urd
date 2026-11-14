/**
 * Where the floating element menu stands (0.7.20.6, proposals J and K on
 * the Design canvas): beside its block, to the right, else to the left,
 * else below it, never over it where the window allows; and where the owner
 * dragged it, kept for the session and clamped into the window.
 * Whether the wide menu gives way to one column beside its block (wideFits, givesWay, 0.7.33.9).
 * Pure and node-tested; the coordinates are the editor window's.
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
 * Whether the wide menu has its place beside the block: one where it covers none of it, or covers no more than a tenth of the block beyond what the one-column menu would; else the one-column menu stands there instead, covering less.
 * @param {{left: number, top: number, right: number, bottom: number}} block The block in window px
 * @param {{w: number, h: number}} wide The wide menu's box
 * @param {{w: number, h: number}} narrow The one-column menu's box
 * @param {{w: number, h: number}} view The window
 * @param {{min?: number, gap?: number, margin?: number}} [opts]
 */
export function wideFits(block, wide, narrow, view, opts = {}) {
  const covered = (size) => overlap(placeBesideBlock(block, size, view, opts), size, block);
  const wideCovers = covered(wide);
  const area = (block.right - block.left) * (block.bottom - block.top);
  return wideCovers === 0 || wideCovers - covered(narrow) <= area / 10;
}

/**
 * Whether the wide floating menu, opened beside what it was opened at, gives way to one column there: only for a block (a section spans the canvas, so its menu keeps the owner's form), only while the menu stands beside it rather than where the owner dragged it, and only where the wide form lacks its place beside the block (wideFits).
 * @param {{left: number, top: number, right: number, bottom: number}|null} block The block in window px
 * @param {{w: number, h: number}} view The window
 * @param {{ wide: boolean, wideW: number, narrowW: number, h: number, min?: number, dragged?: boolean, section?: boolean }} opts whether the menu would stand wide, the two widths, the menu's height, and the left edge the panels leave free
 */
export function givesWay(block, view, { wide, wideW, narrowW, h, min = 8, dragged = false, section = false }) {
  if (!wide || !block || dragged || section) return false;
  return !wideFits(block, { w: Math.min(wideW, view.w - 16), h }, { w: Math.min(narrowW, view.w - 16), h }, view, { min });
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

/**
 * Where the text bar stands while a text on the canvas is written (lib/TextToolbar.svelte, 0.7.3.19): beside the canvas, in the stage's room on the side with more of it (the left on a tie), level with the block, where that room holds the bar; else above the block, or below it where there is no room above; always inside the stage.
 * @param {{left: number, top: number, right: number, bottom: number}} block The text's block in window px, its own bar above it included
 * @param {{w: number, h: number}} size The bar's box
 * @param {{left: number, right: number}} canvas The canvas as drawn in the stage
 * @param {{left: number, top: number, right: number, bottom: number}} stage The stage around the canvas
 * @param {{gap?: number, margin?: number}} [opts]
 * @returns {{left: number, top: number, side: 'left'|'right'|'above'|'below'}}
 */
export function placeTextBar(block, size, canvas, stage, { gap = 12, margin = 8 } = {}) {
  const clampY = (y) => Math.max(stage.top + margin, Math.min(y, stage.bottom - size.h - margin));
  const clampX = (x) => Math.max(stage.left + margin, Math.min(x, stage.right - size.w - margin));
  const roomLeft = canvas.left - stage.left - margin;
  const roomRight = stage.right - canvas.right - margin;
  if (Math.max(roomLeft, roomRight) >= size.w + gap) {
    const right = roomRight > roomLeft;
    return { left: right ? canvas.right + gap : canvas.left - gap - size.w, top: clampY(block.top), side: right ? 'right' : 'left' };
  }
  const above = block.top - gap - size.h;
  if (above >= stage.top + margin) return { left: clampX(block.left), top: above, side: 'above' };
  return { left: clampX(block.left), top: clampY(block.bottom + gap), side: 'below' };
}

/**
 * Where a window opened from a tab stands (the Drafts window): under a tab (`beside` false), beside a rail's icon, a sidebar's word or a menu's row, and at the window's top right where it opened from no tab; kept inside the window.
 * @param {{left: number, top: number, right: number, bottom: number}|null} anchor The tab's box
 * @param {{w: number, h: number}} size
 * @param {{w: number, h: number}} view
 * @param {{beside?: boolean, gap?: number}} [opts]
 */
export function placeByTab(anchor, size, view, { beside = false, gap = 6 } = {}) {
  if (!anchor) return clampPlace({ left: view.w - size.w - 16, top: 64 }, size, view);
  const place = beside ? { left: anchor.right + gap, top: anchor.top } : { left: anchor.left, top: anchor.bottom + gap };
  return clampPlace(place, size, view);
}
