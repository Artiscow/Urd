/**
 * The nav size settings' model (ADR-0023): the sliders' bounds, the presets in px as base.css draws them (urd-nav-size-*), and the sizes the bar draws.
 */

export const PAD_Y = { min: 0, max: 64, step: 1 };
export const TEXT_SIZE = { min: 12, max: 28, step: 1 };
export const PAD_X = { min: 0, max: 80, step: 1 };
export const GAP = { min: 0, max: 64, step: 1 };
export const PILL_WIDTH = { min: 480, max: 1920, step: 20 };
export const SHRINK_TO = { min: 0.3, max: 0.8, step: 0.05 };
export const SHRINK_AT = { min: 0, max: 400, step: 10 };
export const SHRINK_MS = { min: 0, max: 1200, step: 20 };
export const RADIUS = { min: 0, max: 64, step: 1 };
export const COL_WIDTH = { min: 180, max: 400, step: 1 };
export const LOGO_SIZE = { min: 12, max: 128, step: 1 };
export const LOGO_TEXT_SIZE = { min: 8, max: 96, step: 1 };

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
 * The thickness the bar draws, in whole px: the stored padY, or the preset's padding, scaled for the floating menu.
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
 * The highlighted preset: the stored size while no free value overrides it, else null.
 */
export function sizePresetOf(style) {
  const free = (style?.padY != null && style.padY !== '') || (style?.textSize != null && style.textSize !== '');
  if (free) return null;
  return SIZE_IDS.includes(style?.size) ? style.size : 'md';
}

/**
 * The sizes the phone draws the menu with now, for the size bar beside the phone: the phone's own value, else the desktop's, else the size step's.
 * @param {object} nav site.nav
 * @returns {{padY: number|null, textSize: number, logo: 'image'|'text'|null, logoSize: number|null}}
 */
export function phoneSizes(nav) {
  const style = nav?.style ?? {};
  const m = style.mobile && typeof style.mobile === 'object' ? style.mobile : {};
  const phone = { size: m.size ?? style.size, padY: m.padY ?? style.padY, textSize: m.textSize ?? style.textSize };
  const side = nav?.variant === 'side-left' || nav?.variant === 'side-right';
  const textSize = effectiveTextSize(phone);
  const logo = nav?.logo ?? {};
  const type = logo.type ?? 'text';
  const shown = logo.show !== false && m.logo !== 'hidden';
  const part = !shown ? null : type === 'image' || (type === 'both' && logo.mobileParts !== 'text') ? 'image' : 'text';
  const logoSize = part === 'image' ? clampRange(logo.mobileSize ?? logo.size, LOGO_SIZE, 32)
    : part === 'text' ? clampRange(logo.mobileTextSize ?? logo.textSize, LOGO_TEXT_SIZE, textSize) : null;
  return { padY: side ? null : effectivePadY(phone, nav?.variant), textSize, logo: part, logoSize };
}

/**
 * One step of a size on the menu's size bar: the phone's own value to write, a step from what it draws now within the bounds; null at a bound or with no size.
 * @param {object} nav site.nav
 * @param {'padY'|'textSize'|'logo'} what
 * @param {1|-1} dir
 * @returns {{on: 'mobile'|'logo', key: string, value: number}|null} `on` says where the value stands: nav.style.mobile, or nav.logo
 */
export function phoneStep(nav, what, dir) {
  const now = phoneSizes(nav);
  const to = (value, range, by) => {
    if (value == null) return null;
    const next = clampRange(value + dir * by, range, value);
    return next === value ? null : next;
  };
  if (what === 'padY') {
    const value = to(now.padY, PAD_Y, 2);
    return value == null ? null : { on: 'mobile', key: 'padY', value };
  }
  if (what === 'textSize') {
    const value = to(now.textSize, TEXT_SIZE, 1);
    return value == null ? null : { on: 'mobile', key: 'textSize', value };
  }
  if (what === 'logo' && now.logo === 'image') {
    const value = to(now.logoSize, LOGO_SIZE, 2);
    return value == null ? null : { on: 'logo', key: 'mobileSize', value };
  }
  if (what === 'logo' && now.logo === 'text') {
    const value = to(now.logoSize, LOGO_TEXT_SIZE, 1);
    return value == null ? null : { on: 'logo', key: 'mobileTextSize', value };
  }
  return null;
}
