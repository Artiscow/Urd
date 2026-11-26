/**
 * The ways to make a colour set: shades, matching colours, blends, readable colours, a picture's colours, codes in a text, ready-made sets and a shuffle.
 */
import { oklchToCode, codeToOklch, colourGrid } from './colour-grid.js';
import { colourCode } from './colour-sets.js';

const clampL = (L) => Math.min(0.985, Math.max(0.05, L));
const at = (L, C, h) => oklchToCode(clampL(L), Math.max(0, C), ((h % 360) + 360) % 360);
const plain = (code) => colourCode(code)?.slice(0, 7) ?? '#000000';

/** The kinds of shades, the counts they come in, the kinds of match and the levels of contrast, the standard first. */
export const SHADE_KINDS = ['all', 'lighter', 'darker', 'greyer'];
export const SHADE_COUNTS = [5, 7, 9, 12];
export const MATCH_KINDS = ['beside', 'opposite', 'thirds', 'split', 'square', 'one'];
export const READ_LEVELS = [['aa', 4.5], ['large', 3], ['aaa', 7]];
export const PICTURE_COUNTS = [5, 8, 12];

/**
 * Shades of a colour: light to dark round its hue, lighter or darker from it, or greyer at its lightness.
 * @param {string} base A colour code
 * @param {string} kind One of SHADE_KINDS
 * @param {number} n How many
 * @returns {Array<{code: string}>}
 */
export function shades(base, kind = 'all', n = 7) {
  const [L, C0, h] = codeToOklch(plain(base));
  // A grey has no hue to carry, so its shades are greys; a colour keeps a little of its hue even where it is faint.
  const C = C0 < 0.01 ? 0 : Math.max(C0, 0.02);
  const step = (i) => (n > 1 ? i / (n - 1) : 0);
  // Toward white or black the colour fades, as the eye expects of a tint and a shade.
  const fade = (l) => C * Math.min(1, 3.2 * Math.min(l, 1 - l));
  let list;
  if (kind === 'lighter') list = Array.from({ length: n }, (_, i) => { const l = L + (0.97 - L) * step(i); return at(l, fade(l), h); });
  else if (kind === 'darker') list = Array.from({ length: n }, (_, i) => { const l = L - (L - 0.18) * step(i); return at(l, fade(l), h); });
  else if (kind === 'greyer') list = Array.from({ length: n }, (_, i) => at(L, C * (1 - step(i)), h));
  else list = Array.from({ length: n }, (_, i) => { const l = 0.95 - 0.75 * step(i); return at(l, fade(l), h); });
  return [...new Set(list)].map((code) => ({ code }));
}

/**
 * Colours that match a colour, itself among them: beside it on the wheel, opposite, thirds, split, a square, or its own hue lighter and darker.
 * @param {string} base A colour code
 * @param {string} kind One of MATCH_KINDS
 * @returns {Array<{code: string}>}
 */
export function matches(base, kind = 'beside') {
  const code = plain(base);
  const [L, C0, h] = codeToOklch(code);
  const C = Math.max(C0, 0.06);
  const turn = (dh, dl = 0, k = 1) => at(L + dl, C * k, h + dh);
  const plans = {
    beside: [turn(-40), turn(-20), code, turn(20), turn(40)],
    opposite: [code, turn(0, 0.15, 0.6), turn(180), turn(180, 0.15, 0.6), turn(180, -0.15)],
    thirds: [code, turn(120), turn(240), turn(0, 0.18, 0.5), turn(0, -0.18)],
    split: [code, turn(150), turn(210), turn(0, 0.18, 0.5), turn(0, -0.18)],
    square: [code, turn(90), turn(180), turn(270), turn(0, 0.18, 0.5)],
    one: [turn(0, 0.3, 0.3), turn(0, 0.15, 0.6), code, turn(0, -0.15), turn(0, -0.3, 0.7)],
  };
  return [...new Set(plans[kind] ?? plans.beside)].map((c) => ({ code: c }));
}

/**
 * The steps from one colour to another, both ends included, mixed in OKLab so the middle steps keep their strength.
 * @param {string} from
 * @param {string} to
 * @param {number} n How many, the two ends counted
 * @returns {Array<{code: string}>}
 */
export function blend(from, to, n = 7) {
  const [L1, C1, h1] = codeToOklch(plain(from));
  const [L2, C2, h2] = codeToOklch(plain(to));
  const [a1, b1] = [C1 * Math.cos((h1 * Math.PI) / 180), C1 * Math.sin((h1 * Math.PI) / 180)];
  const [a2, b2] = [C2 * Math.cos((h2 * Math.PI) / 180), C2 * Math.sin((h2 * Math.PI) / 180)];
  const list = Array.from({ length: n }, (_, i) => {
    if (i === 0) return plain(from);
    if (i === n - 1) return plain(to);
    const t = i / (n - 1);
    const a = a1 + (a2 - a1) * t;
    const b = b1 + (b2 - b1) * t;
    return at(L1 + (L2 - L1) * t, Math.hypot(a, b), (Math.atan2(b, a) * 180) / Math.PI);
  });
  return [...new Set(list)].map((code) => ({ code }));
}

const decode = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (code) => {
  const [r, g, b] = [1, 3, 5].map((i) => decode(parseInt(code.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * The contrast of two colours as WCAG 2 reckons it, 1 to 21.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function contrast(a, b) {
  const [x, y] = [luminance(plain(a)), luminance(plain(b))].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

/**
 * Colours readable as text on a colour at the level asked: for the grey and each hue of the palette, the step nearest the middle that reaches the contrast.
 * @param {string} background
 * @param {number} level 4.5 (AA), 3 (large text) or 7 (AAA)
 * @returns {Array<{code: string}>}
 */
export function readable(background, level = 4.5) {
  const bg = plain(background);
  // Dark text on a light colour, light text on a dark one.
  const lightGround = luminance(bg) > 0.18;
  const found = [];
  for (const strength of ['vivid', 'deep']) {
    const grid = colourGrid(strength);
    for (let col = 0; col < grid[0].length; col += 1) {
      if (found.some((f) => f.col === col)) continue;
      const steps = grid.map((row) => row[col].code);
      const ok = (lightGround ? steps : [...steps].reverse()).find((code) => contrast(code, bg) >= level);
      if (ok) found.push({ col, code: ok });
    }
  }
  return found.sort((a, b) => a.col - b.col).map(({ code }) => ({ code }));
}

/**
 * A picture's main colours from its pixels, the largest groups first, a colour too near one already taken passed by; see-through pixels are left out.
 * @param {ArrayLike<number>} rgba The pixels as RGBA bytes (ImageData.data)
 * @param {number} count How many
 * @returns {Array<{code: string}>}
 */
export function mainColours(rgba, count = 8) {
  const buckets = new Map();
  for (let i = 0; i + 3 < rgba.length; i += 4) {
    if (rgba[i + 3] < 128) continue;
    const key = (rgba[i] >> 4) * 256 + (rgba[i + 1] >> 4) * 16 + (rgba[i + 2] >> 4);
    const bucket = buckets.get(key) ?? [0, 0, 0, 0];
    bucket[0] += rgba[i];
    bucket[1] += rgba[i + 1];
    bucket[2] += rgba[i + 2];
    bucket[3] += 1;
    buckets.set(key, bucket);
  }
  const taken = [];
  for (const [r, g, b, n] of [...buckets.values()].sort((x, y) => y[3] - x[3])) {
    const c = [r / n, g / n, b / n];
    if (taken.some((t) => Math.hypot(t[0] - c[0], t[1] - c[1], t[2] - c[2]) < 40)) continue;
    taken.push(c);
    if (taken.length === count) break;
  }
  return taken.map((c) => ({ code: `#${c.map((x) => Math.round(x).toString(16).padStart(2, '0')).join('')}` }));
}

/**
 * The colour codes in a text, each once: three, six or eight digits after «#», or six without it, alone with a digit among them or joined by dashes.
 * @param {string} text
 * @param {number} [limit]
 * @returns {Array<{code: string}>}
 */
export function codesIn(text, limit = 48) {
  const found = String(text ?? '').match(/#[0-9a-f]{8}\b|#[0-9a-f]{6}\b|#[0-9a-f]{3}\b|(?<![0-9a-z#-])[0-9a-f]{6}(?:-[0-9a-f]{6})+(?![0-9a-z-])|(?<![0-9a-z#])(?=[0-9a-f]*\d)[0-9a-f]{6}(?![0-9a-z])/gi) ?? [];
  const parts = found.flatMap((raw) => (raw.startsWith('#') ? [raw] : raw.split('-').map((hex) => `#${hex}`)));
  const codes = [...new Set(parts.map((raw) => colourCode(raw)).filter(Boolean))];
  return codes.slice(0, limit).map((code) => ({ code }));
}

/** The plans a shuffle draws from: five turns of the hue from a hue drawn at random. */
const SHUFFLE_PLANS = [[0, 30, 60, 180, 210], [0, 120, 240, 0, 120], [0, 15, 30, 45, 200], [0, 180, 0, 180, 90], [0, 0, 0, 150, 210]];
const SHUFFLE_LIGHTS = [0.93, 0.78, 0.62, 0.46, 0.3];

/**
 * Five colours that go together, the ones locked kept where they stand: a hue and a plan drawn at random, the lightness spread from pale to deep.
 * @param {Array<{code: string, locked: boolean}>} slots Five slots
 * @param {() => number} [random] Chances 0 to 1
 * @returns {Array<{code: string, locked: boolean}>}
 */
export function shuffle(slots, random = Math.random) {
  const h = random() * 360;
  const plan = SHUFFLE_PLANS[Math.floor(random() * SHUFFLE_PLANS.length) % SHUFFLE_PLANS.length];
  const lights = [...SHUFFLE_LIGHTS].sort(() => random() - 0.5);
  return slots.map((slot, i) => (slot.locked ? slot : { code: at(lights[i % lights.length], 0.05 + random() * 0.14, h + plan[i % plan.length]), locked: false }));
}

/**
 * Urd's ready-made sets, each set and colour named by a key of the admin's words (`cp.ready.<set>`, `cp.readyColour.<colour>`).
 */
export const READY_SETS = [
  ['metals', [['gold', '#d4af37'], ['oldGold', '#cfb53b'], ['brass', '#b5a642'], ['champagne', '#f7e7ce'], ['silver', '#c0c0c0'], ['platinum', '#e5e4e2'], ['pewter', '#8e9294'], ['gunmetal', '#2a3439'], ['bronze', '#cd7f32'], ['copper', '#b87333'], ['roseGold', '#b76e79'], ['steel', '#71797e']]],
  ['neon', [['neonRed', '#ff073a'], ['neonOrange', '#ff5f1f'], ['neonYellow', '#ffff33'], ['neonGreen', '#39ff14'], ['neonMint', '#2bffb3'], ['neonCyan', '#0ff0fc'], ['neonBlue', '#1f51ff'], ['neonPurple', '#bc13fe'], ['neonPink', '#fe019a'], ['hotMagenta', '#ff1dce'], ['electricLime', '#ccff00'], ['laserLemon', '#fefe22']]],
  ['jewels', [['ruby', '#9b111e'], ['garnet', '#733635'], ['topaz', '#ffc87c'], ['citrine', '#e4d00a'], ['peridot', '#b4c424'], ['emerald', '#046307'], ['jade', '#00a86b'], ['turquoise', '#40e0d0'], ['aquamarine', '#7fffd4'], ['sapphire', '#0f52ba'], ['amethyst', '#9966cc'], ['onyx', '#353839']]],
  ['earth', [['ivory', '#f5e6d3'], ['sand', '#e8d0b0'], ['beige', '#d9b48f'], ['tan', '#c69c6d'], ['caramel', '#b0743c'], ['brown', '#8b5a2b'], ['chocolate', '#5e3a1f'], ['terracotta', '#c0603d'], ['rust', '#9c4221'], ['khaki', '#b8b07a'], ['olive', '#808a3a'], ['moss', '#5b6b38']]],
  ['nature', [['snow', '#fffafa'], ['sky', '#87ceeb'], ['lagoon', '#3aa8c1'], ['sea', '#1f6f8b'], ['night', '#191970'], ['lavender', '#b57edc'], ['sunset', '#fd5e53'], ['wheat', '#f5deb3'], ['clay', '#b66a50'], ['stone', '#928e85'], ['forest', '#228b22'], ['pine', '#01796f']]],
  ['signals', [['safetyYellow', '#eed202'], ['signalOrange', '#ff7514'], ['trafficRed', '#cc0605'], ['warningAmber', '#ffbf00'], ['signalGreen', '#008754'], ['signalBlue', '#1e4f8c'], ['signalWhite', '#f4f4f4'], ['signalBlack', '#1e1e1e'], ['infoBlue', '#2f80ed'], ['success', '#27ae60'], ['caution', '#f2c94c'], ['danger', '#eb5757']]],
  ['festive', [['hollyRed', '#b3000c'], ['hollyGreen', '#0b6623'], ['goldLeaf', '#e6be8a'], ['candle', '#fff1c1'], ['pumpkin', '#eb6123'], ['witch', '#4b0082'], ['spring', '#fff44f'], ['blossom', '#ffb7c5'], ['mint', '#98ff98'], ['partyPink', '#ff69b4'], ['confetti', '#00b2ff'], ['midnight', '#13274f']]],
];

/** A picture a page or a setting holds: an address on the site itself by its ending, or a picture kept in the draft as data. */
const PICTURE = /^(?:data:image\/(?:png|jpe?g|webp|gif|avif);base64,|(?![a-z][a-z0-9+.-]*:|\/\/)[^\s"'<>]+\.(?:png|jpe?g|webp|gif|avif)(?:\?[^\s"'<>]*)?$)/i;

/**
 * The pictures the documents use, the most used first, each once: a value that is a picture's address, or a picture kept in a draft.
 * @param {Array<unknown>} docs The pages' data and the site's settings
 * @param {number} [limit]
 * @returns {Array<string>}
 */
export function sitePictures(docs, limit = 9) {
  const counts = new Map();
  const walk = (value) => {
    if (typeof value === 'string') {
      if (PICTURE.test(value)) counts.set(value, (counts.get(value) ?? 0) + 1);
    } else if (Array.isArray(value)) {
      for (const item of value) walk(item);
    } else if (value && typeof value === 'object') {
      for (const item of Object.values(value)) walk(item);
    }
  };
  for (const doc of docs) walk(doc);
  return [...counts].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([src]) => src);
}

/**
 * A set's name from a picture's address: the file name without its extension and upload hash, dashes and underscores as spaces, at most 40 characters.
 * @param {string} src
 * @returns {string}
 */
export function nameFromPicture(src) {
  const text = String(src ?? '');
  if (/^(data|blob):/i.test(text)) return '';
  let last = text.split(/[?#]/)[0].split('/').pop() ?? '';
  try {
    last = decodeURIComponent(last);
  } catch {
    // A name that is no valid escape is read as written.
  }
  return last.replace(/\.[a-z0-9]{1,5}$/i, '').replace(/-[0-9a-f]{8}$/i, '').replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 40).trim();
}
