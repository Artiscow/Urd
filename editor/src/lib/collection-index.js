/**
 * The collection index (ADR-0007): `content/samlinger.json` lists the collection ids, and the ids of a legacy `content/collections.json` join it.
 */

export const INDEX_PATH = 'content/samlinger.json';
export const LEGACY_INDEX_PATH = 'content/collections.json';

/**
 * The index draft's key: a colon, which no page slug holds, after the `urd-draft-` start a revert clears.
 */
export const INDEX_DRAFT_KEY = 'urd-draft-collections:index';

/** Set when a publish deletes the legacy index and cleared once the site stops serving it, so a reload before the deploy does not merge it again. */
export const LEGACY_DELETED_KEY = 'urd-draft-collections:legacy-deleted';

/**
 * The older index draft keys, which may lack ids only `samlinger.json` lists; a page draft can share them, so only an index-shaped draft is read.
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
 * @returns {Promise<{index: {version: number, samlinger: string[]}, legacy: string[] | null, unreadable?: true}>} legacy: the ids only the legacy index lists, or null without one or once its deletion is published; unreadable: the index request failed
 */
export async function readIndexes(fetchFn = fetch, storage = localStorage) {
  const read = await fetchIndex(INDEX_PATH, fetchFn);
  // A request that failed (undefined) is not a missing index (null): the editor then keeps the collections out of editing and publishing.
  if (read === undefined) return { index: { version: 1, samlinger: [] }, legacy: null, unreadable: true };
  const index = read ?? { version: 1, samlinger: [] };
  const legacyFile = await fetchIndex(LEGACY_INDEX_PATH, fetchFn);
  if (legacyFile === null) storage.removeItem(LEGACY_DELETED_KEY);
  if (!legacyFile || storage.getItem(LEGACY_DELETED_KEY) !== null) return { index, legacy: null };
  return { index, legacy: mergeIds(legacyFile.samlinger).filter((id) => !index.samlinger.includes(id)) };
}

/**
 * The published index the index draft is compared with: `samlinger.json` with the ids only the legacy index lists, so removing one of them is a draft.
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
 * The ids the editor opens with: a draft under INDEX_DRAFT_KEY as it is, else the published ids joined by an older draft's and the legacy index's.
 * @param {{published: string[], legacy?: string[] | null, draft?: string[] | null, earlier?: string[] | null}} sources
 * @returns {string[]}
 */
export function openingIds({ published, legacy = null, draft = null, earlier = null }) {
  return draft ? mergeIds(draft, earlier) : mergeIds(published, earlier, legacy);
}

/**
 * Whether the index has something to publish: a draft, or ids only the legacy index lists, which still need writing into `samlinger.json`.
 * @param {boolean} hasDraft
 * @param {string[] | null} legacy the ids only the legacy index lists, as readIndexes gives them
 */
export function indexPending(hasDraft, legacy) {
  return hasDraft || (legacy?.length ?? 0) > 0;
}

/**
 * What a publish of the collections does to the index files: one either index lists counts as published, and one the editor lacks has its file deleted.
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
