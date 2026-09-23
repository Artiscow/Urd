/**
 * The model behind the nav size settings (ADR-0023). Pure functions,
 * node-tested, so the sliders in the Nav panel start where the CSS actually
 * is: the presets are rem values in base.css (urd-nav-size-*), and a free
 * value (padY, textSize) replaces the preset's part through an inline
 * custom property set by nav.js.
 *
 * The bounds are the engine's NAV_SIZE_BOUNDS (nav-model.js); a parity test
 * keeps the two equal.
 */

export const PAD_Y = { min: 0, max: 64, step: 1 };
export const TEXT_SIZE = { min: 12, max: 28, step: 1 };
export const PAD_X = { min: 0, max: 80, step: 1 };
export const GAP = { min: 0, max: 64, step: 1 };
export const PILL_WIDTH = { min: 480, max: 1920, step: 20 };
export const SHRINK_TO = { min: 0.3, max: 0.8, step: 0.05 };
export const RADIUS = { min: 0, max: 64, step: 1 };
export const COL_WIDTH = { min: 180, max: 400, step: 1 };
export const LOGO_SIZE = { min: 12, max: 128, step: 1 };

/** The four presets in px at a 16 px root: the rem values of base.css. */
export const SIZE_PRESETS = {
  sm: { padY: 8.8, textSize: 13.6 },
  md: { padY: 14.4, textSize: 16 },
  lg: { padY: 20, textSize: 16.8 },
  xl: { padY: 27.2, textSize: 18.4 },
};
export const SIZE_IDS = ['sm', 'md', 'lg', 'xl'];

/** The floating menu draws the PRESET padding scaled by this factor. */
export const PILL_FACTOR = 0.67;

export function isFloatingVariant(variant) {
  return variant === 'floating' || variant === 'floating-square' || variant === 'floating-tab';
}

/** Clamps and snaps a value into a range; a non-number gives the fallback. */
export function clampRange(value, { min, max, step = 1 }, fallback) {
  const n = Number(value);
  if (value == null || value === '' || !Number.isFinite(n)) return fallback;
  const snapped = Math.round(n / step) * step;
  const bounded = Math.min(max, Math.max(min, snapped));
  // Steps below 1 leave float noise (0.35000000000000003); round it away.
  return step < 1 ? Math.round(bounded * 100) / 100 : bounded;
}

/**
 * The thickness the bar actually renders, in whole px: the stored padY, or
 * the preset's padding (scaled for the floating menu, whose factor applies
 * to presets only).
 */
export function effectivePadY(style, variant) {
  if (style?.padY != null && style.padY !== '') return clampRange(style.padY, PAD_Y, SIZE_PRESETS.md.padY);
  const preset = SIZE_PRESETS[style?.size] ?? SIZE_PRESETS.md;
  return Math.round(preset.padY * (isFloatingVariant(variant) ? PILL_FACTOR : 1));
}

/** The menu text size the bar actually renders, in whole px. */
export function effectiveTextSize(style) {
  if (style?.textSize != null && style.textSize !== '') return clampRange(style.textSize, TEXT_SIZE, SIZE_PRESETS.md.textSize);
  const preset = SIZE_PRESETS[style?.size] ?? SIZE_PRESETS.md;
  return Math.round(preset.textSize);
}

/**
 * The highlighted preset: the stored size while no free value overrides
 * it, otherwise null (a custom size).
 */
export function sizePresetOf(style) {
  const free = (style?.padY != null && style.padY !== '') || (style?.textSize != null && style.textSize !== '');
  if (free) return null;
  return SIZE_IDS.includes(style?.size) ? style.size : 'md';
}
