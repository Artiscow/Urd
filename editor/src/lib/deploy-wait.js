/**
 * The wait for the deploy after a publish: GitHub has the commit the moment
 * the API answers, but the host serves it only after its build. The editor
 * polls the committed content files until the site serves exactly what was
 * committed, so «published» can be told apart from «live». Pure functions,
 * node-tested; the caller supplies fetch and the timer.
 */

/** Files worth polling: the utf-8 content files of the publish, site.json
 *  first (it is what a page switch reads first), capped so a large publish
 *  never polls dozens of files. Media (base64) and the index copies are
 *  left out: the JSON files land in the same deploy. */
export function deployTargets(files, { max = 8 } = {}) {
  const picked = (files ?? []).filter((f) => f
    && typeof f.path === 'string'
    && typeof f.content === 'string'
    && f.encoding === 'utf-8'
    && !f.delete
    && (f.path.startsWith('content/') || f.path === 'plugins/plugins.json'));
  picked.sort((a, b) => (a.path === 'content/site.json' ? -1 : 0) - (b.path === 'content/site.json' ? -1 : 0));
  return picked.slice(0, max).map(({ path, content }) => ({ path, content }));
}

/**
 * Polls until every target is served byte for byte as committed. A target
 * that matches once is not fetched again; a fetch error counts as «not yet».
 * @param {Array<{path: string, content: string}>} targets
 * @param {{fetchFn?: typeof fetch, delayMs?: number, attempts?: number, sleep?: (ms: number) => Promise<void>}} [opts]
 * @returns {Promise<boolean>} true when all targets are served, false after the last attempt
 */
export async function awaitServed(targets, {
  fetchFn = fetch,
  delayMs = 10_000,
  attempts = 18,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
} = {}) {
  let pending = [...targets];
  if (pending.length === 0) return true;
  for (let attempt = 0; attempt < attempts; attempt++) {
    await sleep(delayMs);
    const served = await Promise.all(pending.map(async ({ path }) => {
      try {
        const res = await fetchFn(`/${path}`, { cache: 'no-store' });
        return res.ok ? await res.text() : null;
      } catch {
        return null;
      }
    }));
    pending = pending.filter((target, i) => served[i] !== target.content);
    if (pending.length === 0) return true;
  }
  return false;
}
