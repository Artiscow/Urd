/**
 * Proportional scaling below the design width (ADR-0018 addendum,
 * 23 September 2026). Between the width where the content width binds and a
 * floor, the sections are zoomed by the ratio of the fluid canvas to the
 * design width, so the page is the design at a smaller size; below the width
 * where the ratio reaches the floor the factor stays there and the canvas is
 * fluid again, with the content push (ADR-0024) keeping the blocks apart.
 * Pure functions: the engine writes the factor as --urd-scale, the editor
 * reads the floor width for the Site panel.
 */

export const SCALE_MIN = 0.5;
export const SCALE_MAX = 1;
export const SCALE_DEFAULT_MIN = 0.75;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * The scale settings of a layout: an omitted field means fixed sizes (the
 * behaviour before v0.7.3), so a built site never changes under an update.
 * @param {{scale?: {mode?: string, min?: number}}} [layout] site.layout
 * @returns {{mode: 'scale'|'fixed', min: number}}
 */
export function scaleSettings(layout) {
  const mode = layout?.scale?.mode === 'scale' ? 'scale' : 'fixed';
  const raw = Number(layout?.scale?.min);
  const min = Number.isFinite(raw) ? clamp(raw, SCALE_MIN, SCALE_MAX) : SCALE_DEFAULT_MIN;
  return { mode, min };
}

/** The share of the viewport the canvas gets below the binding width. */
function canvasShare(layout) {
  const gutter = Number(layout?.gutter ?? 6) || 0;
  return Math.max(0.01, 1 - (2 * gutter) / 100);
}

/**
 * The zoom factor for the sections at a viewport width: 1 at and above the
 * binding width, the canvas-to-design ratio below it, never under the floor.
 * Fixed mode and an unbound width ("full") always give 1.
 * @param {number} viewportW The viewport width in CSS px
 * @param {object} [layout] site.layout
 * @returns {number}
 */
export function pageScale(viewportW, layout) {
  const { mode, min } = scaleSettings(layout);
  const width = layout?.contentWidth ?? 1440;
  if (mode !== 'scale' || typeof width !== 'number' || !(width > 0)) return 1;
  const canvas = (Number(viewportW) || 0) * canvasShare(layout);
  return Math.round(clamp(canvas / width, min, 1) * 10000) / 10000;
}

/**
 * The viewport width at which the factor reaches the floor: below it the
 * page keeps the smallest scale and follows the window width. 0 when
 * nothing scales.
 * @param {object} [layout] site.layout
 * @returns {number}
 */
export function scaleFloorWidth(layout) {
  const { mode, min } = scaleSettings(layout);
  const width = layout?.contentWidth ?? 1440;
  if (mode !== 'scale' || typeof width !== 'number' || !(width > 0)) return 0;
  return Math.ceil((min * width) / canvasShare(layout));
}
