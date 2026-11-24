/**
 * The canvas's loading cover (Urd settings «Canvas loading»): the four looks drawn over the desktop canvas and the live phone while the page loads, and the stored look read back.
 * Each look is an SVG string in the admin theme's colours, each stroke marked with the span of the load it is drawn in (`--a` to `--b`, of the load's progress from 0 to 1, lib/CanvasCover.svelte); without the cover a drawing stands finished, as the settings' pictures show it.
 * Pure, node-tested (tests/canvas-cover.test.mjs).
 */

/** The looks, the rune circle the default. */
export const COVER_LOOKS = ['circle', 'stave', 'tiles', 'stone'];

/** Where the drawing stands once each of the canvas's steps is reached (asked for its page, its engine in, its page drawn, the editor's start drawn), of the load's progress from 0 to 1. */
export const COVER_POINTS = [0.2, 0.45, 0.85, 1];

/** How far towards the next point the drawing creeps while a step takes long, and the time most of that takes, in ms. */
const CREEP = 0.9;
const CREEP_MS = 1500;

/**
 * Where the drawing is headed `elapsed` ms after step `at` was reached: the step's point, creeping on towards the next one but never reaching it, and the whole drawing at the last step.
 * @param {number} at
 * @param {number} elapsed
 * @returns {number}
 */
export function coverGoal(at, elapsed) {
  const last = COVER_POINTS.length - 1;
  const step = Math.min(Math.max(Math.trunc(at) || 0, 0), last);
  if (step === last) return 1;
  const point = COVER_POINTS[step];
  return point + (COVER_POINTS[step + 1] - point) * CREEP * (1 - Math.exp(-Math.max(0, elapsed) / CREEP_MS));
}

/** The stored look, the rune circle for anything else. */
export function coverLookOf(raw) {
  return COVER_LOOKS.includes(raw) ? raw : 'circle';
}

const ACCENT = 'var(--urd-color-accent, #7c5cff)';
/** The canvas's ground, which the cover lies in (app.css .frame-wrap). */
const GROUND = 'color-mix(in srgb, var(--urd-color-bg, #0f1419) 70%, black)';
const LIGHT = `color-mix(in srgb, ${ACCENT} 55%, white)`;

/** The three runes of Urd's name, ᚢ ᚱ ᛞ, in a 120 by 120 box. */
const RUNES = ['M28 76 V46 L44 53 V76', 'M54 76 V46 L65 54 L54 62 L66 76', 'M76 46 V76 L92 46 V76 M76 46 L92 76'];

/** Small runes for the turning ring, each round its own centre. */
const GLYPHS = ['M0 -3 V3', 'M-1.6 -3 L1.6 0 L-1.6 3', 'M-1 -3 V3 M-1 -2 L1.6 -3.2 M-1 0.2 L1.6 -1', 'M-1.8 -3 L1.8 3 M1.8 -3 L-1.8 3', 'M0 3 V-3 M-2 -1 L0 -3 L2 -1', 'M-1.6 3 V-3 L1.6 3 V-3'];

/** A stroke's attributes. */
const stroke = (colour, width, extra = '') => `fill="none" stroke="${colour}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${extra}`;

/** The span of the load a part is drawn in, from `a` to `b` of the load's progress. */
const span = ([a, b]) => `style="--a:${a};--b:${b}"`;

/** The runes, each drawn over its span of the load, shifted sideways by `dx` where given. */
function runes(attrs, spans, dx = [0, 0, 0]) {
  return RUNES.map((d, k) => `<path d="${d}" pathLength="1" class="cc-draw" ${span(spans[k])}${dx[k] ? ` transform="translate(${dx[k]} 0)"` : ''} ${attrs}/>`).join('');
}

/** The ring of small runes, each coming in over its own short span as the engine loads. */
function glyphRing() {
  return Array.from({ length: 18 }, (_, k) => {
    const a = Math.round((0.1 + k * 0.018) * 1000) / 1000;
    return `<g transform="rotate(${k * 20} 60 60) translate(60 11)"><path d="${GLYPHS[k % GLYPHS.length]}" class="cc-pop" ${span([a, Math.round((a + 0.06) * 1000) / 1000])} ${stroke(ACCENT, 1.3)}/></g>`;
  }).join('');
}

/** The spans the three runes are drawn over in each look: the first as the engine comes in, the second as the page is drawn, the last as the editor's start is. */
const SPANS = {
  circle: [[0.45, 0.65], [0.62, 0.85], [0.85, 1]],
  stave: [[0, 0.42], [0.42, 0.8], [0.8, 1]],
  tiles: [[0.06, 0.42], [0.46, 0.82], [0.84, 1]],
  stoneCut: [[0, 0.15], [0.15, 0.3], [0.3, 0.45]],
  stoneLit: [[0.45, 0.65], [0.65, 0.85], [0.85, 1]],
};

/** Each look's drawing, inside a 120 by 120 box. */
const ART = {
  // The three runes at the centre of two turning rings of small runes.
  circle: () => `<g class="cc-spin"><circle cx="60" cy="60" r="54" pathLength="1" class="cc-draw" ${span([0, 0.2])} transform="rotate(-90 60 60)" ${stroke(ACCENT, 1.3)}/><circle cx="60" cy="60" r="44" pathLength="1" class="cc-draw" ${span([0.05, 0.25])} transform="rotate(-90 60 60)" ${stroke(ACCENT, 1.3)}/>${glyphRing()}</g>`
    + `<g class="cc-spin-back"><circle cx="60" cy="60" r="38" fill="none" stroke="${ACCENT}" stroke-opacity="0.5" stroke-width="1" stroke-dasharray="2 4"/></g>`
    + `<g transform="translate(18 17.3) scale(0.7)" class="cc-glow">${runes(stroke(ACCENT, 3.4), SPANS.circle)}</g>`,
  // The runes carved on a wooden stave, one stroke at a time.
  stave: () => `<rect x="14" y="32" width="92" height="56" rx="9" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-opacity="0.18" stroke-width="1.2"/>`
    + `<path d="M20 44 C42 41 72 46 100 42 M20 78 C44 81 68 76 100 80" ${stroke('currentColor', 1.6, ' stroke-opacity="0.18"')}/>`
    + runes(stroke(ACCENT, 3.4), SPANS.stave),
  // Each rune on a tile of its own, cut in the ground's colour.
  tiles: () => [[9, [0, 0.1]], [45, [0.4, 0.5]], [81, [0.8, 0.88]]].map(([x, when]) => `<rect x="${x}" y="38" width="30" height="46" rx="9" class="cc-pop" ${span(when)} fill="${ACCENT}"/>`).join('')
    + runes(stroke(GROUND, 3.2), SPANS.tiles, [-12, 0, 12]),
  // The runes cut into a standing stone and filled with light, sparks rising from its foot.
  stone: () => `<path d="M12 112 H108" ${stroke('currentColor', 1, ' stroke-opacity="0.12"')}/>`
    + `<path d="M30 112 L22 68 L30 30 L52 12 L80 15 L97 46 L95 112 Z" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.18" stroke-width="1.2" stroke-linejoin="round"/>`
    + `<path d="M30 30 L44 36 L52 12 M44 36 L80 15 M22 68 L28 63 L30 30 M97 46 L91 49" ${stroke('currentColor', 1, ' stroke-opacity="0.1"')}/>`
    + `<g transform="translate(9 18) scale(0.85)">${runes(stroke('var(--urd-color-bg, #0b0e17)', 5), SPANS.stoneCut)}<g class="cc-glow">${runes(stroke(LIGHT, 2.6), SPANS.stoneLit)}</g></g>`
    + [[38, 104, 1.3, 0], [52, 108, 1, 0.5], [66, 102, 1.4, 1], [80, 106, 1.1, 1.5], [90, 100, 1.2, 2], [58, 110, 1, 2.4]]
      .map(([cx, cy, r, d]) => `<circle cx="${cx}" cy="${cy}" r="${r}" class="cc-mote" style="--d:${d}s" fill="${LIGHT}" opacity="0"/>`).join(''),
};

/**
 * A look's drawing as an SVG element of its own, sized by its box.
 * @param {string} look
 * @returns {string}
 */
export function coverArt(look) {
  return `<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">${ART[coverLookOf(look)]()}</svg>`;
}

/**
 * A look's picture for the settings, inside their 64 by 40 frame: the cover on the canvas's ground, with the drawing finished at its middle.
 * @param {string} look
 * @returns {string}
 */
export function coverPicture(look) {
  return `<rect x="1" y="1" width="62" height="38" rx="2" fill="${GROUND}"/><svg x="14" y="2" width="36" height="36" viewBox="0 0 120 120" overflow="visible">${ART[coverLookOf(look)]()}</svg>`;
}
