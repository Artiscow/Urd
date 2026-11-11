/**
 * The saved drafts as the editor sees them (ADR-0032): each part of the work stands in this browser alone, saved, or live, read from the drafts this browser holds, the saved drafts' index, and what this browser last saw of each saved part.
 * A part is named as the drafts function names it (functions/_lib/drafts.js), and holds the stored draft keys that function lets it hold.
 * Pure, node-tested (tests/saved-model.test.mjs); the hashes come in from the caller.
 */

const PAGE_KEY = /^urd-draft-([a-z0-9][a-z0-9-]{0,79})$/;
/** Keys a page's draft key can never be: other parts' keys, the tidy's moves, and the names from before the English rename. */
const NOT_A_PAGE = /^(?:site|templates|plugins|redirects|media-moves|collections|maler|samlinger)$|^(?:collection-|template-|samling-|mal-)/;

/**
 * The part a stored draft key belongs to; null for a key no part holds (the tidy's moves, the mark of a deleted legacy collections' index, a key from before a rename).
 * @param {string} key
 * @returns {string|null}
 */
export function partOfKey(key) {
  if (key === 'urd-draft-site') return 'site';
  if (key === 'urd-draft-plugins') return 'plugins';
  if (key === 'urd-draft-redirects') return 'redirects';
  if (key === 'urd-draft-collections:index') return 'collections';
  if (key === 'urd-draft-templates' || /^urd-draft-template-[A-Za-z0-9_-]{1,80}$/.test(key)) return 'templates';
  const collection = /^urd-draft-collection-([a-z0-9][a-z0-9-]{0,79})$/.exec(key);
  if (collection) return `collection-${collection[1]}`;
  const page = PAGE_KEY.exec(key);
  if (page && !NOT_A_PAGE.test(page[1])) return `page-${page[1]}`;
  return null;
}

/**
 * The stored keys each part holds, from the keys this browser holds.
 * @param {Iterable<string>} keys
 * @returns {Map<string, string[]>}
 */
export function keysByPart(keys) {
  const byPart = new Map();
  for (const key of keys) {
    const name = partOfKey(key);
    if (!name) continue;
    if (!byPart.has(name)) byPart.set(name, []);
    byPart.get(name).push(key);
  }
  for (const list of byPart.values()) list.sort();
  return byPart;
}

/**
 * A waiting part's name (lib/unpublished.js), as the saved drafts name it.
 * @param {{kind: string, id?: string}} part
 */
export function partName(part) {
  if (part.kind === 'page') return `page-${part.id}`;
  if (part.kind === 'collection') return `collection-${part.id}`;
  return part.kind;
}

/**
 * The part a name stands for, as lib/unpublished.js lists parts.
 * @param {string} name
 * @returns {{kind: string, id?: string}}
 */
export function partOfName(name) {
  if (name.startsWith('page-')) return { kind: 'page', id: name.slice(5) };
  if (name.startsWith('collection-')) return { kind: 'collection', id: name.slice(11) };
  return { kind: name };
}

/**
 * One short text for a part, from each of its stored keys and the hash of that key's text, the same wherever it is read, so its hash tells two copies apart without hashing the long texts again.
 * @param {Record<string, string>} keyHashes The part's stored keys and the hash of each key's text
 */
export function partCanon(keyHashes) {
  return JSON.stringify(Object.keys(keyHashes).sort().map((key) => [key, keyHashes[key]]));
}

/**
 * What a load takes in, part by part.
 * A saved part this browser has not seen, or holds as it last saw it saved, is taken in; one this browser holds otherwise stays this browser's, and so does one this browser saw as it is saved and has since taken back to live (an undo, a page deleted, a revert).
 * A part this browser saw saved that has left the index was published or discarded elsewhere: where this browser still holds it as it saw it, its copy here goes too.
 * @param {{local: Record<string, string|null>, saved: Record<string, {hash: string}>, seen: Record<string, string>}} state
 *   `local`: the hash here of each part saved or seen, null where this browser holds none of it; `seen`: the hash of each saved part as this browser last saw it
 * @returns {{takeIn: string[], dropLocal: string[], seen: Record<string, string>}} The parts to take in, the parts whose copy here goes, and what this browser has seen once they are
 */
export function meet({ local, saved, seen }) {
  const takeIn = [];
  const next = {};
  for (const [name, entry] of Object.entries(saved ?? {})) {
    const here = local?.[name] ?? null;
    const last = seen?.[name];
    if (here === entry.hash) {
      next[name] = entry.hash;
    } else if (here === null && last === entry.hash) {
      next[name] = last;
    } else if (here === null || here === last) {
      takeIn.push(name);
      next[name] = entry.hash;
    } else if (last) {
      next[name] = last;
    }
  }
  const dropLocal = Object.keys(seen ?? {}).filter((name) => !saved?.[name] && local?.[name] != null && local[name] === seen[name]);
  return { takeIn, dropLocal, seen: next };
}

/**
 * Where each part stands, one row each: the parts this browser holds, in the order the waiting list gives, then the saved parts it holds nothing of.
 * A part stands «Saved» where this browser's copy is the saved one, and «In this browser» otherwise, where the saved part is set apart as saved elsewhere when it changed since this browser last saw it.
 * @param {{parts: Array<{kind: string, id?: string, name?: string}>, localHash: (name: string) => string|null, saved: Record<string, {hash: string, savedAt?: string, saver?: string, title?: string}>, seen: Record<string, string>}} state
 * @returns {Array<{kind: string, id?: string, name?: string, part: string, band: 'browser'|'saved', draft: boolean, held: boolean, elsewhere: {savedAt?: string, saver?: string}|null}>}
 *   `draft`: the part waits to be published here; `held`: this browser holds the part's stored texts (a saved part the waiting list does not name, such as a page this browser's site settings do not list, may still be held)
 */
export function standing({ parts, localHash, saved, seen }) {
  const rows = [];
  const named = new Set();
  for (const part of parts ?? []) {
    const name = partName(part);
    named.add(name);
    const entry = saved?.[name];
    const here = entry ? localHash(name) : null;
    const isSaved = Boolean(entry) && here === entry.hash;
    const elsewhere = entry && !isSaved && seen?.[name] !== entry.hash ? { savedAt: entry.savedAt, saver: entry.saver } : null;
    rows.push({ ...part, part: name, band: isSaved ? 'saved' : 'browser', draft: true, held: true, elsewhere });
  }
  for (const [name, entry] of Object.entries(saved ?? {})) {
    if (named.has(name)) continue;
    const of = partOfName(name);
    // A saved part the waiting list does not name: held here as saved, held otherwise (a save writes this browser's), or not held, its copy here the live one, which a save writes over the saved one.
    const here = localHash(name);
    const held = here !== null;
    rows.push({ ...of, ...(of.id ? { name: entry.title || of.id } : {}), part: name, band: held && here === entry.hash ? 'saved' : 'browser', draft: false, held, elsewhere: null });
  }
  return rows;
}

/**
 * The two counts: Save's, what stands in this browser alone, and Publish's, every part with a draft here.
 * @param {ReturnType<typeof standing>} rows
 */
export function counts(rows) {
  return { save: rows.filter((r) => r.band === 'browser').length, publish: rows.filter((r) => r.draft).length };
}

/**
 * The saved parts a save would write over that changed since this browser last saw them.
 * @param {string[]} names The parts the save writes
 * @param {Record<string, {hash: string}>} saved
 * @param {Record<string, string>} seen
 */
export function overwrites(names, saved, seen) {
  return names.filter((name) => saved?.[name] && seen?.[name] !== saved[name].hash);
}

/**
 * The saved parts a publish of every draft here makes stale: those whose saved copy this browser holds or has gone on from, never one saved elsewhere since.
 * @param {ReturnType<typeof standing>} rows
 * @param {Record<string, {hash: string}>} saved
 */
export function publishedSaves(rows, saved) {
  return rows.filter((r) => r.draft && saved?.[r.part] && !r.elsewhere).map((r) => r.part);
}
