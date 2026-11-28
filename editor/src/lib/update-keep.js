/**
 * The files an update keeps back, as «Keep mine» is pressed: a change is kept back only with the changes that need it (`needs` from the check).
 */

/**
 * The files kept after a press on one file's «Keep mine»: kept with every file that needs it, or let through with every file it needs.
 * @param {Set<string>} kept The files kept so far
 * @param {Array<{path: string, needs?: string[]}>} changes The check's changes
 * @param {string} path The file pressed
 * @returns {Set<string>}
 */
export function keptAfter(kept, changes, path) {
  const next = new Set(kept);
  const needs = (p) => changes.find((c) => c.path === p)?.needs ?? [];
  const users = (p) => changes.filter((c) => (c.needs ?? []).includes(p)).map((c) => c.path);
  const keeping = !next.has(path);
  const queue = [path];
  const seen = new Set();
  while (queue.length) {
    const p = queue.shift();
    if (seen.has(p)) continue;
    seen.add(p);
    if (keeping) next.add(p);
    else next.delete(p);
    queue.push(...(keeping ? users(p) : needs(p)));
  }
  return next;
}

/** The other files a press on a file's «Keep mine» changes with it, for its tooltip to name. */
export function pressedWith(kept, changes, path) {
  const next = keptAfter(kept, changes, path);
  return changes.map((c) => c.path).filter((p) => p !== path && next.has(p) !== kept.has(p));
}
