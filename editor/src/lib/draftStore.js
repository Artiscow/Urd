/**
 * Draft storage: a localStorage draft compared against a baseline.
 *
 * Principle: "has unpublished changes" is true if and only if the draft key exists in localStorage.
 * A write therefore deletes the key when the draft is identical to the published state, so the marker is always honest (for example after the user undoes everything).
 *
 * save() writes once the changes pause: every store with a change waiting is written together 250 ms after the last one, and at most 2 s after the first, so typing or a drag writes a large draft a few times rather than at every step.
 * flushDrafts() writes them at once, before anything reads the stored drafts (an undo, a publish, a page switch, the saved drafts, the draft view, the page going).
 */

/** The stores with a change waiting to be written. */
const waiting = new Set();
/** The time the waiting writes go out, and when the first of them was asked for. */
let timer = 0;
let firstAt = 0;
const QUIET_MS = 250;
const LONGEST_MS = 2000;
/** Told once waiting writes have gone out, so the marks of what waits to be published follow what was written. */
const writtenListeners = new Set();

function schedule() {
  const now = Date.now();
  if (!timer) firstAt = now;
  clearTimeout(timer);
  timer = setTimeout(flushDrafts, Math.max(0, Math.min(QUIET_MS, firstAt + LONGEST_MS - now)));
}

/** Writes every store with a change waiting, at once. */
export function flushDrafts() {
  clearTimeout(timer);
  timer = 0;
  if (!waiting.size) return;
  for (const store of [...waiting]) store.saveNow();
  for (const listener of writtenListeners) listener();
}

/** Removes a stored draft, and the write a store still has waiting for it, so a draft deleted (a collection, a template, a revert) is never written back. */
export function dropDraft(key) {
  for (const store of [...waiting]) if (store.key === key) store.cancel();
  localStorage.removeItem(key);
}

/** Lets go of every waiting write: the drafts are being discarded as a whole (a revert of the site). */
export function cancelWaitingDrafts() {
  clearTimeout(timer);
  timer = 0;
  for (const store of [...waiting]) store.cancel();
}

/** Calls `fn` each time waiting writes have gone out; returns the way to stop. */
export function onDraftsWritten(fn) {
  writtenListeners.add(fn);
  return () => writtenListeners.delete(fn);
}

/**
 * @param {string} key localStorage key, e.g. 'urd-draft-hjem'
 * @param {() => object} loadPublished Returns the published state (parsed JSON)
 * @param {(err: Error) => void} [onSaveError] Called when persisting fails (typically a full quota)
 * @param {string} [legacyKey] The key name from before ADR-0021; a draft under it is moved to `key` on read
 * @returns {{data: object, save(): void, saveNow(): boolean, reset(): object, hasDraft(): boolean}}
 */
export function createDraftStore(key, loadPublished, onSaveError, legacyKey) {
  // A store made for a key reads what is stored: a change another store still has waiting is written first.
  flushDrafts();
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

  /** True while the draft holds changes that could not be stored (a full quota): they live in memory until they are published or stored. */
  let held = false;
  /** True while a change waits to be written (save). */
  let due = false;

  const store = {
    key,
    get data() {
      return data;
    },
    /** Lets go of a waiting write (dropDraft). */
    cancel() {
      due = false;
      waiting.delete(store);
    },
    /** Marks the draft changed: it is written with the other waiting stores once the changes pause (flushDrafts). */
    save() {
      due = true;
      waiting.add(store);
      schedule();
    },
    /** Persists the draft now; deletes the key if it equals the published state.
     *  A full quota (base64 images in the draft) must never pass silently:
     *  any throw from setItem reports onSaveError and returns false, and the
     *  in-memory data is left untouched. Returns true when the draft is
     *  persisted. */
    saveNow() {
      due = false;
      waiting.delete(store);
      const now = JSON.stringify(data);
      if (now === baseline) {
        localStorage.removeItem(key);
        held = false;
        return true;
      }
      try {
        localStorage.setItem(key, now);
        held = false;
        return true;
      } catch (err) {
        held = true;
        onSaveError?.(err);
        return false;
      }
    },
    /** Discard the draft and go back to the published state. */
    reset() {
      due = false;
      waiting.delete(store);
      localStorage.removeItem(key);
      held = false;
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
    /** The published state the draft is compared against, as a fresh object. */
    published() {
      return JSON.parse(baseline);
    },
    /** Whether there is a draft to publish: stored, waiting to be written, or held in memory when it could not be stored. */
    hasDraft() {
      return held || due || localStorage.getItem(key) !== null;
    },
  };
  return store;
}

// The page going (a reload, a closed tab) or hidden (another app) writes what waits, so no change is lost.
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function' && typeof document !== 'undefined') {
  window.addEventListener('pagehide', flushDrafts);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushDrafts();
  });
}
