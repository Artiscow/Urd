/**
 * Where the floating element menu stands: beside its block, right, left or below, never over it where the window allows, or where the owner dragged it.
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
 * Whether the wide menu has its place beside the block: covering none of `cover`, or at most a tenth of the block more than one column (none with `strict`).
 * @param {{left: number, top: number, right: number, bottom: number}} block The block in window px
 * @param {{w: number, h: number}} wide The wide menu's box
 * @param {{w: number, h: number}} narrow The one-column menu's box
 * @param {{w: number, h: number}} view The window
 * @param {{min?: number, gap?: number, margin?: number, cover?: {left: number, top: number, right: number, bottom: number}, strict?: boolean}} [opts]
 */
export function wideFits(block, wide, narrow, view, opts = {}) {
  const target = opts.cover ?? block;
  const covered = (size) => overlap(placeBesideBlock(block, size, view, opts), size, target);
  const wideCovers = covered(wide);
  const area = (block.right - block.left) * (block.bottom - block.top);
  return wideCovers === 0 || wideCovers - covered(narrow) <= (opts.strict ? 0 : area / 10);
}

/**
 * Whether the wide menu gives way to one column beside the block it was opened at: never for a section or a dragged menu, and only where wideFits says no.
 * @param {{left: number, top: number, right: number, bottom: number}|null} block The block in window px
 * @param {{w: number, h: number}} view The window
 * @param {{ wide: boolean, wideW: number, narrowW: number, h: number, min?: number, dragged?: boolean, section?: boolean, cover?: {left: number, top: number, right: number, bottom: number}, strict?: boolean }} opts whether it would stand wide, the two widths, its height, the left edge the panels leave free, and what it keeps clear of and how strictly (wideFits)
 */
export function givesWay(block, view, { wide, wideW, narrowW, h, min = 8, dragged = false, section = false, cover = undefined, strict = false }) {
  if (!wide || !block || dragged || section) return false;
  return !wideFits(block, { w: Math.min(wideW, view.w - 16), h }, { w: Math.min(narrowW, view.w - 16), h }, view, { min, cover, strict });
}

/**
 * The first of right, left and below beside the block that covers none of `cover` when clamped, else the one covering least; `first` 'left' starts at the left.
 * @param {{left: number, top: number, right: number, bottom: number}} block The block in window px
 * @param {{w: number, h: number}} size The menu's box
 * @param {{w: number, h: number}} view The window
 * @param {{min?: number, gap?: number, margin?: number, first?: 'right'|'left', cover?: {left: number, top: number, right: number, bottom: number}}} opts
 * @returns {{left: number, top: number, side: 'right'|'left'|'below'}}
 */
export function placeBesideBlock(block, size, view, { min = 8, gap = 12, margin = 8, first = 'right', cover = block } = {}) {
  const right = ['right', { left: block.right + gap, top: block.top }];
  const left = ['left', { left: block.left - gap - size.w, top: block.top }];
  const candidates = [
    ...(first === 'left' ? [left, right] : [right, left]),
    ['below', { left: block.left, top: block.bottom + gap }],
  ].map(([side, raw]) => {
    const place = clampPlace(raw, size, view, min, margin);
    return { side, ...place, covers: overlap(place, size, cover) };
  });
  const best = candidates.find((c) => c.covers === 0) ?? candidates.reduce((a, b) => (b.covers < a.covers ? b : a));
  return { left: best.left, top: best.top, side: best.side };
}

/**
 * Where the text bar stands while a text is written: beside the canvas on the roomier side, level with the block, else above or below it; always in the stage.
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
 * A box placed as placeTextBar does, clear of the boxes standing there (CanvasBar.svelte): moved down past one beside the canvas, else above or below it.
 * @param {{left: number, top: number, right: number, bottom: number}} block
 * @param {{w: number, h: number}} size
 * @param {{left: number, right: number}} canvas
 * @param {{left: number, top: number, right: number, bottom: number}} stage
 * @param {Array<{left: number, top: number, w: number, h: number}|null>} held The boxes standing, by their corner and size
 * @param {{gap?: number}} [opts] The room kept from a box moved past
 * @returns {{left: number, top: number, side: 'left'|'right'|'above'|'below'}}
 */
export function placeClearOf(block, size, canvas, stage, held, { gap = 6 } = {}) {
  const boxes = held.filter((b) => b && b.w > 0 && b.h > 0);
  const meeting = (place) => boxes.find((b) => place.left < b.left + b.w && b.left < place.left + size.w && place.top < b.top + b.h && b.top < place.top + size.h);
  let box = block;
  let place = placeTextBar(box, size, canvas, stage);
  // Each box can be passed once, the place moving down or out each time.
  for (let i = 0; i < boxes.length; i += 1) {
    const b = meeting(place);
    if (!b) break;
    box = place.side === 'left' || place.side === 'right'
      ? { ...box, top: Math.max(box.top, b.top + b.h + gap) }
      : { ...box, top: Math.min(box.top, b.top), bottom: Math.max(box.bottom, b.top + b.h) };
    place = placeTextBar(box, size, canvas, stage);
  }
  return place;
}

/**
 * Where a window opened from a tab stands (the Drafts window): under a tab, beside a rail icon or a menu row (`beside`), or at the top right; inside the window.
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
