/**
 * Scale for the editing canvas: the iframe renders the page in a TARGET
 * VIEWPORT and is scaled down to fit `.frame-wrap`, instead of reflowing into
 * the leftover space. The render is then identical to the published page; only
 * the display size (zoom) changes. Pure functions, node-tested.
 *
 * Two display modes (ADR-0018):
 *
 * - **Device** (default): the target viewport has BOTH a width and a height,
 *   and the scale fits both axes. The fold then holds: an `85vh` section ends
 *   where a visitor sees it end. The price is a bar on whichever axis has
 *   surplus (the Squarespace and DevTools model).
 * - **Fill**: only the width is pinned, and the iframe is made correspondingly
 *   taller, so the canvas fills the panel without bars. It gives the most
 *   working surface, but `vh` then resolves against the panel's aspect ratio,
 *   so the fold cannot be trusted.
 *
 * Fill is `targetH = 0`, that is "no height limit".
 */

/**
 * Raw width ratio: how much the target width must be scaled to fit the frame
 * width. Invalid/unmeasured targets give 1 (no scaling until something is
 * measured).
 * @param {number} frameW The frame box width (px)
 * @param {number} targetW The target viewport width (px)
 * @returns {number}
 */
export function fitScale(frameW, targetW) {
  if (!(frameW > 0) || !(targetW > 0)) return 1;
  return frameW / targetW;
}

/**
 * The applied scale given the zoom mode. `full` = true 1:1 (the canvas may
 * overflow and be panned). `fit` fits the target, but NEVER scales up beyond
 * 1:1. The floor of 0.1 prevents scale(0) on an unmeasured/infinitely narrow
 * window.
 *
 * The height arguments are optional: without them (or with `targetH: 0`) the
 * scale is purely width-driven, which is fill mode. With them both axes are
 * fitted, which is device mode.
 *
 * @param {number} frameW The frame box width (px)
 * @param {number} targetW The target viewport width (px)
 * @param {'fit'|'full'} mode
 * @param {number} [frameH] The frame box height (px)
 * @param {number} [targetH] The target viewport height (px); 0 = no height limit
 * @returns {number}
 */
export function previewScale(frameW, targetW, mode, frameH = 0, targetH = 0) {
  if (mode === 'full') return 1;
  const byHeight = targetH > 0 ? fitScale(frameH, targetH) : Infinity;
  return Math.max(0.1, Math.min(1, fitScale(frameW, targetW), byHeight));
}
