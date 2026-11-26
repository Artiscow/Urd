/**
 * Scales the canvas iframe, rendered at a target viewport, to fit `.frame-wrap`.
 * Device mode fits both axes; fill mode (`targetH = 0`) the width alone (ADR-0018).
 */

/**
 * The scale that fits the target width into the frame width; 1 while either is unmeasured.
 * @param {number} frameW The frame box width (px)
 * @param {number} targetW The target viewport width (px)
 * @returns {number}
 */
export function fitScale(frameW, targetW) {
  if (!(frameW > 0) || !(targetW > 0)) return 1;
  return frameW / targetW;
}

/**
 * The applied scale: 1 in `full` mode; in `fit`, the target fitted to the frame, never above 1 nor below 0.1.
 * Without `targetH` only the width is fitted.
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
