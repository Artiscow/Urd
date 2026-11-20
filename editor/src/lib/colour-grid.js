/**
 * The colour picker's palette (BACKLOG 0.7.9.1): twelve hues and a grey in eight rows of even lightness, worked out in OKLCH, in six strengths.
 * Each colour keeps its row's lightness and its hue, its chroma lowered until the screen's sRGB range holds it, so a row reads as one lightness across the hues.
 * Pure: no DOM and no storage, the same codes on every run.
 */

/** The columns: the grey first, then twelve hues round the wheel, by their OKLCH hue in degrees. */
export const GRID_HUES = [
  ['grey', 0], ['red', 25], ['orange', 50], ['amber', 75], ['yellow', 100], ['lime', 125], ['green', 145],
  ['teal', 180], ['cyan', 215], ['blue', 255], ['indigo', 280], ['violet', 305], ['pink', 350],
];

/** The strengths, the standard first. */
export const GRID_STRENGTHS = ['vivid', 'soft', 'muted', 'deep', 'pastel', 'neon'];

/** The rows' lightness from light to dark, and the chroma the colour reaches in each, strongest in the middle rows. */
const ROWS = [0.95, 0.87, 0.78, 0.68, 0.58, 0.48, 0.38, 0.28];
const PEAK = [0.04, 0.09, 0.14, 0.18, 0.2, 0.19, 0.16, 0.11];

/** Each strength: its rows' lightness and the chroma asked of row `i`; the grey column holds no chroma in any. */
const STRENGTH = {
  vivid: { rows: ROWS, chroma: (i) => PEAK[i] },
  soft: { rows: ROWS, chroma: (i) => PEAK[i] * 0.55 },
  muted: { rows: ROWS, chroma: (i) => PEAK[i] * 0.28 },
  deep: { rows: [0.62, 0.55, 0.5, 0.45, 0.4, 0.34, 0.28, 0.22], chroma: () => 0.16 },
  pastel: { rows: [0.97, 0.95, 0.93, 0.91, 0.89, 0.87, 0.85, 0.83], chroma: (i) => 0.03 + i * 0.008 },
  neon: { rows: [0.93, 0.88, 0.83, 0.78, 0.73, 0.68, 0.63, 0.58], chroma: () => 0.4 },
};

/** OKLab to linear sRGB, by the matrices OKLab is defined with. */
function oklabToLinear(L, a, b) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const encode = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const decode = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const inRange = (rgb) => rgb.every((c) => c >= -0.0005 && c <= 1.0005);
const toCode = (rgb) => '#' + rgb.map((c) => Math.round(Math.min(1, Math.max(0, encode(c))) * 255).toString(16).padStart(2, '0')).join('');

/**
 * An OKLCH colour as a #rrggbb code, its chroma lowered until sRGB holds it, the lightness and the hue kept.
 * @param {number} L Lightness, 0 to 1
 * @param {number} C Chroma
 * @param {number} h Hue in degrees
 * @returns {string}
 */
export function oklchToCode(L, C, h) {
  const rad = (h * Math.PI) / 180;
  const at = (c) => oklabToLinear(L, c * Math.cos(rad), c * Math.sin(rad));
  if (inRange(at(C))) return toCode(at(C));
  let lo = 0;
  let hi = C;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (inRange(at(mid))) lo = mid;
    else hi = mid;
  }
  return toCode(at(lo));
}

/**
 * A #rrggbb code as OKLCH: lightness 0 to 1, chroma, and hue in degrees.
 * @param {string} code
 * @returns {[number, number, number]}
 */
export function codeToOklch(code) {
  const [r, g, b] = [1, 3, 5].map((i) => decode(parseInt(code.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, B), ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360];
}

const grids = new Map();

/**
 * A strength's grid, row by row from light to dark, each row a colour per column: `{ hue, step, code }`, the step counted from 1.
 * @param {string} strength One of GRID_STRENGTHS; anything else gives the standard's
 * @returns {Array<Array<{hue: string, step: number, code: string}>>}
 */
export function colourGrid(strength) {
  const id = GRID_STRENGTHS.includes(strength) ? strength : GRID_STRENGTHS[0];
  if (!grids.has(id)) {
    const st = STRENGTH[id];
    grids.set(id, st.rows.map((L, i) => GRID_HUES.map(([hue, h]) => ({ hue, step: i + 1, code: oklchToCode(L, hue === 'grey' ? 0 : st.chroma(i), h) }))));
  }
  return grids.get(id);
}

/**
 * The strength whose grid holds a colour, or null.
 * Where the screen's range brings two strengths to the same code (a strong colour cut back), `prefer` is asked first, then the strengths in order.
 * @param {string} code A #rrggbb code, any case
 * @param {string|null} [prefer] The strength to look in first
 * @returns {string|null}
 */
export function strengthOf(code, prefer = null) {
  const wanted = String(code ?? '').toLowerCase();
  const order = GRID_STRENGTHS.includes(prefer) ? [prefer, ...GRID_STRENGTHS.filter((id) => id !== prefer)] : GRID_STRENGTHS;
  return order.find((id) => colourGrid(id).some((row) => row.some((cell) => cell.code === wanted))) ?? null;
}

/**
 * Where the colour picker opens for a colour: the tab and the palette's strength.
 * The tab last chosen opens where the picker has it (Theme only with the theme's colours).
 * With none kept, the tab the colour comes from: a theme colour opens Theme, and so does an empty colour where the picker has the theme's colours; a colour the grid holds opens Palette; any other opens Custom.
 * The strength is the one that holds the colour, the one kept asked first, else the one kept.
 * @param {{value: string, kept: string|null, linked: boolean, themed: boolean, keptTab?: string|null}} at The colour, the strength kept, whether the colour is a theme colour, whether the picker has the theme's colours, and the tab kept
 * @returns {{tab: 'theme'|'custom'|'palette', strength: string}}
 */
export function pickerStart({ value, kept, linked, themed, keptTab = null }) {
  const held = linked ? null : strengthOf(value, kept);
  const usable = keptTab === 'custom' || keptTab === 'palette' || (keptTab === 'theme' && themed);
  const tab = usable ? keptTab : linked || (!value && themed) ? 'theme' : held ? 'palette' : 'custom';
  return { tab, strength: held ?? (GRID_STRENGTHS.includes(kept) ? kept : GRID_STRENGTHS[0]) };
}
