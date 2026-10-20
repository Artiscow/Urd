/**
 * The collection index (ADR-0007): `content/samlinger.json` lists the collection ids, since static hosts cannot list folders.
 * The Vipps function reads the same file, and ADR-0021 keeps its name.
 * A site may also have `content/collections.json`, an index an earlier editor wrote under a translated name.
 * The editor opens with the ids only that file lists added to the published index, and the next publish of the collections writes them into the index and deletes the file.
 * Pure functions, node-tested; the caller supplies fetch and localStorage.
 */

export const INDEX_PATH = 'content/samlinger.json';
export const LEGACY_INDEX_PATH = 'content/collections.json';

/**
 * The index draft's key.
 * The colon is a character `slugify` never gives, so no page draft (`urd-draft-<slug>`) can share the key, and the `urd-draft-` start lets a revert clear it with the other drafts.
 */
export const INDEX_DRAFT_KEY = 'urd-draft-collections:index';

/** Set when a publish deletes the legacy index, and cleared once the site no longer serves it, so a reload before the deploy does not merge it again. */
export const LEGACY_DELETED_KEY = 'urd-draft-collections:legacy-deleted';

/**
 * Index drafts saved by earlier editors, which may lack ids that only `samlinger.json` lists.
 * The same keys can hold the draft of a page with that slug, so only a draft shaped as an index is read and removed.
 */
export const EARLIER_INDEX_DRAFT_KEYS = ['urd-draft-collections', 'urd-draft-samlinger'];

/**
 * Reads an index file.
 * @param {string} path INDEX_PATH or LEGACY_INDEX_PATH
 * @param {typeof fetch} [fetchFn]
 * @returns {Promise<{version: number, samlinger: string[]} | null | undefined>} the index; null when the site serves no index there; undefined when the request failed
 */
export async function fetchIndex(path, fetchFn = fetch) {
  let res;
  try {
    res = await fetchFn(`/${path}`);
  } catch {
    return undefined;
  }
  if (!res.ok) return null;
  try {
    const data = await res.json();
    return Array.isArray(data?.samlinger) ? data : null;
  } catch {
    return null;
  }
}

/** The ids of the lists, each once: the first list's order is kept and the others' new ids are appended. Missing lists are skipped. */
export function mergeIds(...lists) {
  const out = [];
  for (const list of lists) {
    for (const id of list ?? []) {
      if (typeof id === 'string' && id && !out.includes(id)) out.push(id);
    }
  }
  return out;
}

/**
 * Reads the index and the legacy index the editor opens with.
 * @param {typeof fetch} [fetchFn]
 * @param {Pick<Storage, 'getItem' | 'removeItem'>} [storage]
 * @returns {Promise<{index: {version: number, samlinger: string[]}, legacy: string[] | null}>} legacy: the ids only the legacy index lists (possibly none), or null when the site has no legacy index or this browser has published its deletion
 */
export async function readIndexes(fetchFn = fetch, storage = localStorage) {
  const index = (await fetchIndex(INDEX_PATH, fetchFn)) ?? { version: 1, samlinger: [] };
  const legacyFile = await fetchIndex(LEGACY_INDEX_PATH, fetchFn);
  if (legacyFile === null) storage.removeItem(LEGACY_DELETED_KEY);
  if (!legacyFile || storage.getItem(LEGACY_DELETED_KEY) !== null) return { index, legacy: null };
  return { index, legacy: mergeIds(legacyFile.samlinger).filter((id) => !index.samlinger.includes(id)) };
}

/**
 * The published index the index draft is compared with: `samlinger.json` with the ids only the legacy index lists.
 * A collection removed from those ids is then a draft that a reload keeps, and a discarded draft returns to every published collection.
 * @param {{version: number, samlinger: string[]}} index
 * @param {string[] | null} legacy as readIndexes gives it
 */
export function indexBaseline(index, legacy) {
  return { ...index, samlinger: mergeIds(index.samlinger, legacy) };
}

/**
 * The index drafts under the earlier keys.
 * @param {Pick<Storage, 'getItem'>} storage
 * @returns {{ids: string[] | null, keys: string[]}} ids: null when there are none; keys: the keys that held an index draft
 */
export function earlierDrafts(storage) {
  let ids = null;
  const keys = [];
  for (const key of EARLIER_INDEX_DRAFT_KEYS) {
    try {
      const list = JSON.parse(storage.getItem(key))?.samlinger;
      if (Array.isArray(list)) {
        ids = mergeIds(ids, list);
        keys.push(key);
      }
    } catch { /* not an index draft */ }
  }
  return { ids, keys };
}

/**
 * The ids the editor opens with.
 * A draft under INDEX_DRAFT_KEY is kept as it is, so a collection removed in it stays removed.
 * Without one, the published ids are joined by an earlier draft's and the legacy index's.
 * The merge keeps an id rather than drop it: a collection missing from the index has its file deleted at the next publish.
 * @param {{published: string[], legacy?: string[] | null, draft?: string[] | null, earlier?: string[] | null}} sources
 * @returns {string[]}
 */
export function openingIds({ published, legacy = null, draft = null, earlier = null }) {
  return draft ? mergeIds(draft, earlier) : mergeIds(published, earlier, legacy);
}

/**
 * Whether the index has something to publish: a draft, or ids only the legacy index lists.
 * Those ids are in the baseline the draft is compared with, so without a draft they still need the publish that writes them into `samlinger.json`.
 * @param {boolean} hasDraft
 * @param {string[] | null} legacy the ids only the legacy index lists, as readIndexes gives them
 */
export function indexPending(hasDraft, legacy) {
  return hasDraft || (legacy?.length ?? 0) > 0;
}

/**
 * What a publish of the collections does to the index files.
 * A collection counts as published when either index lists it, and one the editor no longer holds has its file deleted.
 * @param {{ids: string[], hasDraft: boolean, published: string[] | null, legacy: string[] | null}} state ids: the index the editor holds; published: the ids `samlinger.json` lists now; legacy: as readIndexes gives it
 * @returns {{writeIndex: boolean, deleteLegacy: boolean, deleteIds: string[]}}
 */
export function planIndexPublish({ ids, hasDraft, published, legacy }) {
  const writeIndex = indexPending(hasDraft, legacy);
  return {
    writeIndex,
    deleteLegacy: legacy !== null,
    deleteIds: writeIndex ? mergeIds(published, legacy).filter((id) => !ids.includes(id)) : [],
  };
}
