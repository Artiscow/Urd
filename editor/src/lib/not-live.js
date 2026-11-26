/**
 * The pages not live yet whose entry went out without them (ADR-0032): their ids, kept per browser in `urd-not-live` until the publish that sends their file.
 */
const KEY = 'urd-not-live';

/** @returns {Set<string>} */
export function readNotLive() {
  try {
    const kept = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    return new Set(Array.isArray(kept) ? kept : []);
  } catch {
    return new Set();
  }
}

/**
 * The marked pages still not live: those the live site lists hidden or does not list yet.
 * @param {Set<string>} marked
 * @param {Array<{id: string, hidden?: boolean}>} livePages
 */
export function stillNotLive(marked, livePages) {
  return new Set([...marked].filter((id) => { const entry = livePages.find((p) => p.id === id); return !entry || entry.hidden === true; }));
}

/** @param {Set<string>} ids */
export function writeNotLive(ids) {
  try {
    if (ids.size) localStorage.setItem(KEY, JSON.stringify([...ids]));
    else localStorage.removeItem(KEY);
  } catch { /* the storage is full: the ids hold until the next publish */ }
}
