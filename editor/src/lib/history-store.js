/**
 * The undo history kept over a reload in IndexedDB: an index of the steps, a record per step and per picture; without IndexedDB it lasts the session only.
 */

const DB_NAME = 'urd-editor';
const STORE = 'history';
const INDEX = 'index';
/** The one record the history was kept in before it was kept by step. */
const LEGACY = 'session';
const stepKey = (id) => `step:${id}`;
const mediaKey = (token) => `media:${token}`;

/** What the store holds, as this session read or wrote it: the steps by id and the pictures by token; null until it has been read. */
let written = null;

/** The keeps, one after another. */
let keeping = Promise.resolve();

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

/** The steps and pictures the store holds, from its keys. */
async function heldIn(store) {
  const keys = (await result(store.getAllKeys())) ?? [];
  const held = { steps: new Set(), media: new Set() };
  for (const key of keys) {
    if (typeof key !== 'string') continue;
    if (key.startsWith('step:')) held.steps.add(key.slice(5));
    else if (key.startsWith('media:')) held.media.add(key.slice(6));
  }
  return held;
}

/** A request's result, or null when it fails. */
const result = (request) => new Promise((resolve) => {
  request.onsuccess = () => resolve(request.result ?? null);
  request.onerror = () => resolve(null);
});

/**
 * The history kept from the last session in this browser, its pictures taken into `media`; null where there is none.
 * @param {ReturnType<import('./history-media.js').createMediaTable>} media
 * @returns {Promise<{history: object[], redoStack: object[]}|null>}
 */
export async function readKept(media) {
  const db = await open();
  if (!db) return null;
  try {
    const store = db.transaction(STORE, 'readonly').objectStore(STORE);
    written = await heldIn(store);
    const index = await result(store.get(INDEX));
    if (!index) {
      const legacy = await result(store.get(LEGACY));
      return legacy && Array.isArray(legacy.history) ? { history: legacy.history, redoStack: Array.isArray(legacy.redoStack) ? legacy.redoStack : [] } : null;
    }
    const ids = [...(index.history ?? []), ...(index.redo ?? [])];
    const steps = new Map((await Promise.all(ids.map((id) => result(store.get(stepKey(id)))))).filter(Boolean).map((step) => [step.id, step]));
    // A history missing a step or a picture it holds (another tab let it go) is not taken up: an undo would write a token where a picture was.
    if (steps.size !== ids.length) return null;
    const tokens = [...new Set([...steps.values()].flatMap((step) => media.tokensIn(step.snap ?? '')))];
    const addresses = await Promise.all(tokens.map((token) => result(store.get(mediaKey(token)))));
    if (addresses.some((address) => !address)) return null;
    tokens.forEach((token, i) => media.set(token, addresses[i]));
    const pick = (list) => (list ?? []).map((id) => steps.get(id));
    return { history: pick(index.history), redoStack: pick(index.redo) };
  } catch {
    return null;
  }
}

/**
 * Keeps the history for the next session: the steps and the redo steps, each with an id, and the pictures they hold from `media`.
 * @param {{history: object[], redoStack: object[]}} kept
 * @param {ReturnType<import('./history-media.js').createMediaTable>} media
 * @returns {Promise<void>}
 */
export function writeKept(kept, media) {
  keeping = keeping.then(() => write(kept, media));
  return keeping;
}

async function write({ history, redoStack }, media) {
  const db = await open();
  if (!db) return;
  try {
    written ??= await heldIn(db.transaction(STORE, 'readonly').objectStore(STORE));
  } catch {
    return;
  }
  const steps = [...history, ...redoStack];
  const ids = new Set(steps.map((step) => step.id));
  const tokens = new Set(steps.flatMap((step) => media.tokensIn(step.snap)));
  try {
    const tx = db.transaction(STORE, 'readwrite');
    const store = tx.objectStore(STORE);
    const newest = history.at(-1);
    for (const step of steps) if (!written.steps.has(step.id) || step === newest) store.put(step, stepKey(step.id));
    for (const token of tokens) {
      const address = media.get(token);
      if (!written.media.has(token) && address) store.put(address, mediaKey(token));
    }
    for (const id of written.steps) if (!ids.has(id)) store.delete(stepKey(id));
    for (const token of written.media) if (!tokens.has(token)) store.delete(mediaKey(token));
    store.put({ history: history.map((step) => step.id), redo: redoStack.map((step) => step.id) }, INDEX);
    store.delete(LEGACY);
    await new Promise((resolve) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
      tx.onabort = () => resolve();
    });
    if (tx.error) return;
    written.steps = ids;
    written.media = tokens;
  } catch { /* the history is kept for this session only */ }
}
