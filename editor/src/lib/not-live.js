/**
 * The pages not live yet whose entry has gone out without them (ADR-0032 decision 2): a page kept back while the site settings went out stands hidden in the published site, which alone would take it for live.
 * Their ids are kept per browser in `urd-not-live`, an admin key, from the publish that left them behind until the one that sends their own file.
 * A collection kept back needs no such mark: the collections' list goes out without it, and its file stays missing.
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
 * The marked pages still not live: those the live site lists hidden, or does not list yet (the live site read before the deploy that lists them). One listed shown there went out with its file from another browser, so its mark is dropped at the next publish.
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
