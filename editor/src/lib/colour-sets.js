/**
 * The site's colour sets (BACKLOG 0.7.9.2, `theme.colorSets` in site.json): named sets of colour codes that every colour picker offers under its palette, the same for everyone who edits the site.
 * Also the live set «On this site»: the colours the site's pages and settings use, the most used first, gathered anew at each opening of a picker and never stored.
 * Pure: it reads and returns data, and changes nothing it is given.
 */

/** The bounds of the sets: how many sets, how many colours in one, and how long a name. */
export const SET_LIMITS = { sets: 40, colours: 48, name: 40 };

/** How many colours the live set shows. */
export const SITE_COLOURS = 24;

const CODE = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const ID = /^[a-z0-9-]{1,40}$/;

/**
 * A colour as #rrggbb, or #rrggbbaa where it is not opaque: from a code of three, six or eight digits, or from `rgb()` and `rgba()`; anything else gives null.
 * @param {string} raw
 * @returns {string|null}
 */
export function colourCode(raw) {
  const text = String(raw ?? '').trim();
  if (CODE.test(text)) {
    const digits = text.slice(1).toLowerCase();
    const full = digits.length === 3 ? [...digits].map((d) => d + d).join('') : digits;
    return `#${full.endsWith('ff') && full.length === 8 ? full.slice(0, 6) : full}`;
  }
  const m = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\d.]+%?)\s*)?\)$/i.exec(text);
  if (!m) return null;
  const channels = [m[1], m[2], m[3]].map((n) => Math.min(255, Number(n)));
  const alpha = m[4] === undefined ? 1 : m[4].endsWith('%') ? Number(m[4].slice(0, -1)) / 100 : Number(m[4]);
  const hex = channels.map((n) => n.toString(16).padStart(2, '0')).join('');
  return Number.isFinite(alpha) && alpha < 0.995 ? `#${hex}${Math.round(Math.max(0, alpha) * 255).toString(16).padStart(2, '0')}` : `#${hex}`;
}

/**
 * The sets a theme holds, each read within its bounds: an id, a name, and its colours as codes with a name where one was given; a set without a valid id, or with an id met before, is left out, and so is a colour without a code.
 * @param {object|null|undefined} theme site.theme
 * @returns {Array<{id: string, name: string, colors: Array<{code: string, name?: string}>}>}
 */
export function setsOf(theme) {
  const raw = Array.isArray(theme?.colorSets) ? theme.colorSets : [];
  const seen = new Set();
  const out = [];
  for (const set of raw) {
    if (!set || typeof set !== 'object' || !ID.test(set.id ?? '') || seen.has(set.id)) continue;
    const colors = (Array.isArray(set.colors) ? set.colors : [])
      .map((c) => ({ code: colourCode(c?.code), name: typeof c?.name === 'string' ? c.name.trim().slice(0, SET_LIMITS.name) : '' }))
      .filter((c) => c.code)
      .slice(0, SET_LIMITS.colours)
      .map((c) => (c.name ? c : { code: c.code }));
    seen.add(set.id);
    out.push({ id: set.id, name: typeof set.name === 'string' && set.name.trim() ? set.name.trim().slice(0, SET_LIMITS.name) : set.id, colors });
    if (out.length === SET_LIMITS.sets) break;
  }
  return out;
}

/**
 * The sets after one change, or the same list where the change changes nothing:
 * `add` a set at the end, `rename` one, `addColour` a code to one (not twice), `removeColour` the colour at an index, `delete` a set.
 * @param {ReturnType<typeof setsOf>} sets
 * @param {{kind: string, id?: string, set?: object, name?: string, code?: string, index?: number}} change
 * @returns {ReturnType<typeof setsOf>}
 */
export function setsAfter(sets, change) {
  const at = sets.findIndex((s) => s.id === change.id);
  const swap = (set) => sets.map((s, i) => (i === at ? set : s));
  if (change.kind === 'add') {
    const read = setsOf({ colorSets: [...sets, change.set] });
    return read.length > sets.length ? read : sets;
  }
  if (at < 0) return sets;
  const set = sets[at];
  if (change.kind === 'rename') {
    const name = String(change.name ?? '').trim().slice(0, SET_LIMITS.name);
    return name && name !== set.name ? swap({ ...set, name }) : sets;
  }
  if (change.kind === 'addColour') {
    const code = colourCode(change.code);
    if (!code || set.colors.length >= SET_LIMITS.colours || set.colors.some((c) => c.code === code)) return sets;
    return swap({ ...set, colors: [...set.colors, { code }] });
  }
  if (change.kind === 'removeColour') {
    if (!(change.index >= 0 && change.index < set.colors.length)) return sets;
    return swap({ ...set, colors: set.colors.filter((_, i) => i !== change.index) });
  }
  if (change.kind === 'delete') return sets.filter((s) => s.id !== change.id);
  return sets;
}

/**
 * A new set's id: `set-` and eight hex digits, from crypto.getRandomValues (which every origin has), not taken by another set.
 * @param {ReturnType<typeof setsOf>} sets
 * @returns {string}
 */
export function newSetId(sets) {
  const taken = new Set(sets.map((s) => s.id));
  for (;;) {
    const bytes = crypto.getRandomValues(new Uint8Array(4));
    const id = `set-${[...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')}`;
    if (!taken.has(id)) return id;
  }
}

const IN_STYLE = /(?:background-color|color)\s*:\s*(#[0-9a-f]{3,8}\b|rgba?\([^)]*\))/gi;

/** The fields that hold a link, a place or a name, never a colour, so a spot named «decade» (`#decade`) is no colour. */
const NOT_COLOUR = new Set(['href', 'url', 'link', 'target', 'anchor', 'id', 'src', 'page', 'path', 'file', 'slug']);

/**
 * The colours the documents use, the most used first, a tie in the order met: a code standing alone as a value, and a colour written in a style inside a text (`color:` or `background-color:`); a field that holds a link, a place or a name is passed by (NOT_COLOUR).
 * The caller leaves the theme out, since the Theme tab holds its colours.
 * @param {Array<unknown>} docs The pages' data and the site's settings
 * @param {number} [limit]
 * @returns {Array<{code: string, count: number}>}
 */
export function siteColours(docs, limit = SITE_COLOURS) {
  const counts = new Map();
  const add = (raw) => {
    const code = colourCode(raw);
    if (code) counts.set(code, (counts.get(code) ?? 0) + 1);
  };
  const walk = (value) => {
    if (typeof value === 'string') {
      if (value.startsWith('#') || value.startsWith('rgb')) add(value);
      else if (value.includes('color')) for (const m of value.matchAll(IN_STYLE)) add(m[1]);
    } else if (Array.isArray(value)) {
      for (const item of value) walk(item);
    } else if (value && typeof value === 'object') {
      for (const [key, item] of Object.entries(value)) if (!NOT_COLOUR.has(key)) walk(item);
    }
  };
  for (const doc of docs) walk(doc);
  return [...counts].map(([code, count]) => ({ code, count })).sort((a, b) => b.count - a.count).slice(0, limit);
}
