/**
 * The colours of the canvas's guides and a drag's marks: five hues, each a light and a dark shade, Quiet, three strengths and Auto. Pure.
 */

/** Each colour's two shades: OKLCH lightness 0.57 for a light site and 0.72, a touch less saturated, for a dark one. */
export const SHADES = {
  magenta: { light: '#d8006c', dark: '#fe6a9a' },
  violet: { light: '#824fea', dark: '#aa8fff' },
  blue: { light: '#2f6eeb', dark: '#72a3fe' },
  cyan: { light: '#0784a3', dark: '#24b5dd' },
  orange: { light: '#c14f02', dark: '#f97c3d' },
};

/** The snap colours as the settings list them, Auto first. */
export const SNAP_COLOURS = ['auto', 'magenta', 'violet', 'blue', 'cyan', 'orange'];

/** Auto's order: Magenta, then the next wherever the one before looks close to a site colour or to the guides. */
export const AUTO_ORDER = ['magenta', 'cyan', 'violet', 'orange', 'blue'];

/** The guide colours: Quiet, the site's own Text drawn faintly, then the five hues. */
export const GUIDE_COLOURS = ['quiet', 'cyan', 'blue', 'violet', 'magenta', 'orange'];

export const GUIDE_STRENGTHS = ['faint', 'medium', 'strong'];

/** How a drag shows equal gaps: a measure with its size, or a box over the space. */
export const GAP_LOOKS = ['measures', 'boxes'];

/** The share of the guides' colour in their strong lines and their faint ones, per strength: Quiet's text colour, or a hue. */
const MIX = {
  quiet: { faint: [17, 11], medium: [30, 18], strong: [72, 43] },
  colour: { faint: [30, 21], medium: [55, 35], strong: [95, 84] },
};

/** How near two colours may look, as OKLab distance, before one counts as close to the other. */
export const CLOSE = 0.125;

const pick = (list, raw) => (list.includes(raw) ? raw : list[0]);
export const gapLookOf = (raw) => pick(GAP_LOOKS, raw);
export const guideColourOf = (raw) => pick(GUIDE_COLOURS, raw);
export const snapColourOf = (raw) => pick(SNAP_COLOURS, raw);
export const guideStrengthOf = (raw) => (GUIDE_STRENGTHS.includes(raw) ? raw : 'medium');

/**
 * A colour as sRGB channels from 0 to 1, from a hex code or a computed rgb() or rgba(); null for anything else.
 * @param {unknown} code
 * @returns {[number, number, number]|null}
 */
export function rgbOf(code) {
  const text = typeof code === 'string' ? code.trim() : '';
  const rgb = /^rgba?\(\s*(\d{1,3}(?:\.\d+)?)[\s,]+(\d{1,3}(?:\.\d+)?)[\s,]+(\d{1,3}(?:\.\d+)?)(?:\s*[,/]\s*[\d.]+%?)?\s*\)$/i.exec(text);
  if (rgb) return [rgb[1], rgb[2], rgb[3]].map((v) => Math.min(255, Number(v)) / 255);
  const m = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(text);
  if (!m) return null;
  const hex = m[1].length <= 4 ? [...m[1].slice(0, 3)].map((c) => c + c).join('') : m[1].slice(0, 6);
  return [0, 2, 4].map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255);
}

const linear = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);

/** The relative luminance of a colour (WCAG), or null. */
export function luminance(code) {
  const rgb = rgbOf(code);
  if (!rgb) return null;
  const [r, g, b] = rgb.map(linear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** The contrast ratio between two colours (WCAG), 1 where either is unread. */
export function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return 1;
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** A colour in OKLab, where distance follows how far apart colours look. */
function oklab(code) {
  const rgb = rgbOf(code);
  if (!rgb) return null;
  const [r, g, b] = rgb.map(linear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

/** How far apart two colours look (OKLab distance), Infinity where either is unread. */
export function apart(a, b) {
  const p = oklab(a);
  const q = oklab(b);
  if (!p || !q) return Infinity;
  return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
}

/** A site's scheme by its Background: dark below a luminance of 0.2, else light. */
export const schemeOf = (bg) => ((luminance(bg) ?? 1) < 0.2 ? 'dark' : 'light');

/**
 * The site's own colours a guide or snap colour must stand apart from: the theme's Background, Surface, Text and Accent in both modes, and its colour sets.
 * @param {object|null} site
 * @returns {Array<{role: string, code: string, set?: string}>}
 */
export function siteColoursOf(site) {
  const out = [];
  for (const tokens of [site?.theme?.tokens?.color ?? {}, site?.theme?.alt?.tokens?.color ?? {}]) {
    for (const role of ['bg', 'surface', 'text', 'accent']) {
      if (rgbOf(tokens[role])) out.push({ role, code: tokens[role] });
    }
  }
  for (const set of site?.theme?.colorSets ?? []) {
    for (const colour of set?.colors ?? []) {
      if (rgbOf(colour?.code)) out.push({ role: 'set', code: colour.code, set: set.name });
    }
  }
  return out;
}

/**
 * The site colour a colour looks close to, the nearest one, or null where none is within CLOSE.
 * @param {string} code
 * @param {Array<{role: string, code: string, set?: string}>} colours
 */
export function nearColour(code, colours) {
  let best = null;
  for (const colour of colours) {
    const d = apart(code, colour.code);
    if (d < CLOSE && (!best || d < best.d)) best = { ...colour, d };
  }
  return best;
}

/**
 * Auto's snap colour on a site: the first in AUTO_ORDER whose shade looks apart from the site's colours and the guides, and reads at 3:1 on its Background.
 * @param {Array<{role: string, code: string}>} colours siteColoursOf
 * @param {'light'|'dark'} scheme
 * @param {string} [guide] The guide colour, which Auto keeps apart from
 * @param {string} [shown] The Background as shown, where the site has two modes
 * @returns {string} The colour's name
 */
export function autoSnap(colours, scheme, guide = 'quiet', shown) {
  const bg = rgbOf(shown) ? shown : colours.find((c) => c.role === 'bg')?.code ?? (scheme === 'dark' ? '#000000' : '#ffffff');
  const guideShade = guide in SHADES ? SHADES[guide][scheme] : null;
  for (const name of AUTO_ORDER) {
    const shade = SHADES[name][scheme];
    if (name === guide || (guideShade && apart(shade, guideShade) < CLOSE)) continue;
    if (nearColour(shade, colours) || contrast(shade, bg) < 3) continue;
    return name;
  }
  return AUTO_ORDER.find((name) => name !== guide) ?? 'magenta';
}

/** The snap colour's name: the choice, or Auto's pick on the Background shown. */
export function snapName(choice, colours, scheme, guide, shown) {
  const chosen = snapColourOf(choice);
  return chosen === 'auto' ? autoSnap(colours, scheme, guideColourOf(guide), shown) : chosen;
}

/** The ink for words on a tag of `colour` over `bg`: white or the Background, whichever stands out more. */
export const tagInk = (colour, bg) => (contrast(colour, '#ffffff') >= contrast(colour, bg) ? '#ffffff' : bg);

/**
 * What the preview draws the guides and marks with, as CSS custom properties.
 * @param {{gap?: string, guide?: string, strength?: string, snap?: string}} prefs The stored choices
 * @param {object|null} site
 * @param {string} bg The page's Background as drawn
 * @returns {Record<string, string>} An empty value is a property to remove
 */
export function guideVars(prefs, site, bg) {
  const scheme = schemeOf(bg);
  const guide = guideColourOf(prefs.guide);
  const strength = guideStrengthOf(prefs.strength);
  const snap = SHADES[snapName(prefs.snap, siteColoursOf(site), scheme, guide, bg)][scheme];
  const quiet = guide === 'quiet';
  const [strong, faint] = MIX[quiet ? 'quiet' : 'colour'][strength];
  return {
    '--urd-snap': snap,
    '--urd-snap-ink': tagInk(snap, rgbOf(bg) ? bg : scheme === 'dark' ? '#000000' : '#ffffff'),
    // Empty for Quiet: each section's lines then take its own Text, in preview.css.
    '--urd-guide-tone': quiet ? '' : SHADES[guide][scheme],
    '--urd-guide-strong': `${strong}%`,
    '--urd-guide-faint': `${faint}%`,
    '--urd-guide-label': quiet ? `${Math.min(90, Math.round(strong * 1.8))}%` : '100%',
  };
}

/**
 * The gap between dashes that lets a side of `length` start and end on a dash, so the sides meet as an L at each corner.
 * @param {number} length
 * @param {number} dash
 * @param {number} gap The gap wanted
 * @returns {number} The gap used; 0 draws the side solid
 */
export function fitDash(length, dash, gap) {
  if (length < dash * 2 + gap / 2) return 0;
  const count = Math.max(2, Math.round((length + gap) / (dash + gap)));
  return (length - count * dash) / (count - 1);
}
