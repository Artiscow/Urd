/**
 * The undo history kept in this browser over a reload (state/history.svelte.js): one record in IndexedDB, which holds far more than the drafts' localStorage.
 * A browser without IndexedDB, or one that refuses it (a private window), keeps the history for the session only.
 */

const DB_NAME = 'urd-editor';
const STORE = 'history';
const KEY = 'session';

/** The database, opened once; null where IndexedDB is not to be had. */
let opening = null;

function open() {
  if (opening) return opening;
  opening = new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(STORE);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
      request.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return opening;
}

/** One request on the store, its result or null. */
async function run(mode, act) {
  const db = await open();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const request = act(db.transaction(STORE, mode).objectStore(STORE));
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

/** The history kept from the last session in this browser, or null. */
export function readKept() {
  return run('readonly', (store) => store.get(KEY));
}

/** Keeps the history for the next session: the steps, the redo steps, and the state they lead to. */
export function writeKept(record) {
  return run('readwrite', (store) => store.put(record, KEY));
}
