/**
 * Copies and comparisons of the drafts' plain JSON data that keep each string as it is, a picture's data address included.
 */

/**
 * A deep copy of plain JSON data with the same strings, leaving out what JSON leaves out; an undefined array item or a number that is not finite is null.
 * @template T
 * @param {T} value
 * @returns {T}
 */
export function copyJSON(value) {
  if (value === null || typeof value !== 'object') {
    return typeof value === 'number' && !Number.isFinite(value) ? null : value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => (item === undefined || typeof item === 'function' || typeof item === 'symbol' ? null : copyJSON(item)));
  }
  const out = {};
  for (const key of Object.keys(value)) {
    const item = value[key];
    if (item === undefined || typeof item === 'function' || typeof item === 'symbol') continue;
    out[key] = copyJSON(item);
  }
  return out;
}

/**
 * Whether two pieces of plain JSON data (as copyJSON takes) are the same, as their JSON texts would be: the same keys in the same order, and the same values.
 * @param {any} a
 * @param {any} b
 */
export function sameJSON(a, b) {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    // Two strings that are not equal differ; any other pair of plain values is as their JSON texts are (a number that is not finite is null).
    if (typeof a === 'string' || typeof b === 'string') return false;
    return JSON.stringify(a) === JSON.stringify(b);
  }
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    return a.every((item, i) => sameJSON(item === undefined || typeof item === 'function' ? null : item, b[i] === undefined || typeof b[i] === 'function' ? null : b[i]));
  }
  const keys = (o) => Object.keys(o).filter((k) => o[k] !== undefined && typeof o[k] !== 'function' && typeof o[k] !== 'symbol');
  const ka = keys(a);
  const kb = keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k, i) => k === kb[i] && sameJSON(a[k], b[k]));
}
