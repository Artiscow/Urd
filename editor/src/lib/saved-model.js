/**
 * The saved drafts as the editor sees them (ADR-0032): each part of the work stands in this browser alone, saved, or live, read from the drafts this browser holds, the saved drafts' index, and what this browser last saw of each saved part.
 * A part is named as the drafts function names it (functions/_lib/drafts.js), and holds the stored draft keys that function lets it hold.
 * Pure, node-tested (tests/saved-model.test.mjs); the hashes come in from the caller.
 */

const PAGE_KEY = /^urd-draft-([a-z0-9][a-z0-9-]{0,79})$/;
/** Keys a page's draft key can never be: other parts' keys, the tidy's moves, and the names from before the English rename. */
const NOT_A_PAGE = /^(?:site|templates|plugins|redirects|media-moves|collections|maler|samlinger)$|^(?:collection-|template-|samling-|mal-)/;

/**
 * Whether a page id would store its draft under another part's key (`urd-draft-<id>`), which the two would overwrite; a new page or a copy never takes such an id.
 * @param {string} id
 */
export const pageIdTaken = (id) => NOT_A_PAGE.test(String(id ?? ''));

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
 * What a load does with the saved drafts, part by part: nothing comes in by itself (ADR-0032 decision 3).
 * A saved part this browser holds exactly as it is saved counts as seen; any other keeps what this browser last saw of it.
 * A part this browser saw saved that has left the index was published or discarded elsewhere: where this browser still holds it as it saw it, its copy here goes too.
 * @param {{local: Record<string, string|null>, saved: Record<string, {hash: string}>, seen: Record<string, string>}} state
 *   `local`: the hash here of each part saved or seen, null where this browser holds none of it; `seen`: the hash of each saved part as this browser last saw it
 * @returns {{dropLocal: string[], seen: Record<string, string>}} The parts whose copy here goes, and what this browser has seen
 */
export function meet({ local, saved, seen }) {
  const next = {};
  for (const [name, entry] of Object.entries(saved ?? {})) {
    const here = local?.[name] ?? null;
    if (here === entry.hash) next[name] = entry.hash;
    else if (seen?.[name]) next[name] = seen[name];
  }
  const dropLocal = Object.keys(seen ?? {}).filter((name) => !saved?.[name] && local?.[name] != null && local[name] === seen[name]);
  return { dropLocal, seen: next };
}

/**
 * Where each part this browser holds waiting stands, one row each, in the order the waiting list gives: «Saved» where this browser's copy is the saved one, «In this browser» otherwise, where the saved part is set apart as saved elsewhere when it changed since this browser last saw it.
 * A saved part this browser does not hold stands only in the Saved menu (savedList), so Publish never sends it.
 * @param {{parts: Array<{kind: string, id?: string, name?: string}>, localHash: (name: string) => string|null, saved: Record<string, {hash: string, savedAt?: string, saver?: string}>, seen: Record<string, string>}} state
 * @returns {Array<{kind: string, id?: string, name?: string, part: string, band: 'browser'|'saved', draft: boolean, elsewhere: {savedAt?: string, saver?: string}|null}>}
 */
export function standing({ parts, localHash, saved, seen }) {
  return (parts ?? []).map((part) => {
    const name = partName(part);
    const entry = saved?.[name];
    const here = entry ? localHash(name) : null;
    const isSaved = Boolean(entry) && here === entry.hash;
    const elsewhere = entry && !isSaved && seen?.[name] !== entry.hash ? { savedAt: entry.savedAt, saver: entry.saver } : null;
    return { ...part, part: name, band: isSaved ? 'saved' : 'browser', draft: true, elsewhere };
  });
}

/**
 * The two counts: Save's, what stands in this browser alone, and Publish's, every part with a draft here.
 * @param {ReturnType<typeof standing>} rows
 */
export function counts(rows) {
  return { save: rows.filter((r) => r.band === 'browser').length, publish: rows.filter((r) => r.draft).length };
}

/**
 * The Saved tab's rows, the newest saved first: each saved part with who saved it, from which browser and when, the owner's note on the save, whether this browser holds it as saved (`same`), holds it as it last saw it saved, unchanged since while the saved one went on (`behind`), holds its own changes to it (`mine`) or holds none of it (`none`), and whether it is new here.
 * A part is new where it was saved since this browser last saw it, the owner has not been shown it, and this browser does not hold it as saved.
 * @param {{saved: Record<string, {hash: string, savedAt?: string, saver?: string, title?: string, note?: string, device?: string}>, localHash: (name: string) => string|null, seen: Record<string, string>, noticed: Record<string, string>}} state
 *   `noticed`: the hash of each saved part as the Saved tab last showed it
 */
export function savedList({ saved, localHash, seen, noticed }) {
  return Object.entries(saved ?? {})
    .map(([name, entry]) => {
      const of = partOfName(name);
      const here = localHash(name);
      const state = here === entry.hash ? 'same' : here === null ? 'none' : here === seen?.[name] ? 'behind' : 'mine';
      return {
        ...of, ...(of.id ? { name: entry.title || of.id } : {}),
        part: name, savedAt: entry.savedAt ?? '', saver: entry.saver ?? '', note: entry.note ?? '', device: entry.device ?? '', hash: entry.hash, here: state,
        fresh: state !== 'same' && seen?.[name] !== entry.hash && noticed?.[name] !== entry.hash,
      };
    })
    .sort((a, b) => (a.savedAt < b.savedAt ? 1 : a.savedAt > b.savedAt ? -1 : 0));
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

/**
 * The parts a save of the ticked writes: those that stand in this browser alone and are not kept for later.
 * With `quiet` (Ctrl+S and autosave), a part saved elsewhere since this browser last saw it is left for the owner to look at, rather than asked about.
 * @param {ReturnType<typeof standing>} rows
 * @param {Iterable<string>} later The parts kept for later (unticked)
 * @param {{quiet?: boolean}} [opts]
 * @returns {string[]}
 */
export function tickedNames(rows, later, { quiet = false } = {}) {
  const kept = new Set(later);
  return rows.filter((r) => r.band === 'browser' && !kept.has(r.part) && !(quiet && r.elsewhere)).map((r) => r.part);
}

/**
 * The tab the Drafts window opens at: the saved drafts where one is new here, this browser's where something stands in it alone, the saved where there are any, and the live state otherwise.
 * @param {{fresh: number, waiting: number, saved: number}} counts
 * @returns {'browser'|'saved'|'live'}
 */
export function firstTab({ fresh, waiting, saved }) {
  if (fresh) return 'saved';
  if (waiting) return 'browser';
  return saved ? 'saved' : 'live';
}
