/**
 * Draft storage: a localStorage draft compared against a baseline.
 *
 * Principle: "has unpublished changes" is true if and only if the draft key
 * exists in localStorage. save() therefore deletes the key when the draft is
 * identical to the published state, so the marker is always honest (for
 * example after the user undoes everything).
 */

/**
 * @param {string} key localStorage key, e.g. 'urd-draft-hjem'
 * @param {() => object} loadPublished Returns the published state (parsed JSON)
 * @param {(err: Error) => void} [onSaveError] Called when persisting fails (typically a full quota)
 * @param {string} [legacyKey] The key name from before ADR-0021; a draft under it is moved to `key` on read
 * @returns {{data: object, save(): boolean, reset(): object, hasDraft(): boolean}}
 */
export function createDraftStore(key, loadPublished, onSaveError, legacyKey) {
  // Migrate-on-read (ADR-0021): a draft saved under the pre-rename key is
  // moved to the new key once; an existing draft under the new key wins.
  if (legacyKey) {
    const old = localStorage.getItem(legacyKey);
    if (old !== null) {
      if (localStorage.getItem(key) === null) {
        try { localStorage.setItem(key, old); } catch { /* full quota: the draft stays under the legacy key */ }
      }
      if (localStorage.getItem(key) !== null) localStorage.removeItem(legacyKey);
    }
  }
  // Cloning via JSON, not structuredClone: the content is plain JSON per the
  // contract, and JSON tolerates Svelte 5 reactive proxies (structuredClone
  // throws DataCloneError on them).
  const published = loadPublished();
  let baseline = JSON.stringify(published);

  let data = JSON.parse(baseline);
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      localStorage.removeItem(key); // corrupt draft: fall back to published
    }
  }

  return {
    get data() {
      return data;
    },
    /** Persist the draft; deletes the key if it equals the published state.
     *  A full quota (base64 images in the draft) must never pass silently:
     *  any throw from setItem reports onSaveError and returns false, and the
     *  in-memory data is left untouched. Returns true when the draft is
     *  persisted. */
    save() {
      const now = JSON.stringify(data);
      if (now === baseline) {
        localStorage.removeItem(key);
        return true;
      }
      try {
        localStorage.setItem(key, now);
        return true;
      } catch (err) {
        onSaveError?.(err);
        return false;
      }
    },
    /** Discard the draft and go back to the published state. */
    reset() {
      localStorage.removeItem(key);
      data = JSON.parse(baseline);
      return data;
    },
    /** Replace the whole draft (used by undo/redo). Remember to save() afterwards. */
    replace(next) {
      data = next;
      return data;
    },
    /**
     * Adjust the comparison baseline: for MEASUREMENTS (the data blocks'
     * auto-growth) that are mirrored in both the draft and the baseline, so
     * they never on their own constitute "unpublished changes". The mutator
     * receives a copy of the baseline object; the change is written back.
     */
    amendBaseline(fn) {
      const base = JSON.parse(baseline);
      fn(base);
      baseline = JSON.stringify(base);
    },
    hasDraft() {
      return localStorage.getItem(key) !== null;
    },
  };
}
