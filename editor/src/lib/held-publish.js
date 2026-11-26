/**
 * The files a publish committed, held until the deploy serves them, so the admin reads the committed state.
 * Each file goes with the publish that last held it.
 */

/**
 * @returns {{
 *   hold(entries: Iterable<[string, unknown]>): number,
 *   release(wave: number): void,
 *   get(path: string): unknown,
 *   has(path: string): boolean,
 * }}
 */
export function createHeld() {
  const files = new Map();
  let waves = 0;
  return {
    /** Holds the committed data per path; returns the publish's number, which `release` takes. */
    hold(entries) {
      const wave = ++waves;
      for (const [path, data] of entries) files.set(path, { wave, data: structuredClone(data) });
      return wave;
    },
    /** Lets go of the files this publish holds, once the site serves them. */
    release(wave) {
      for (const [path, held] of files) if (held.wave === wave) files.delete(path);
    },
    /** A copy of the held data, or null when the server is the source. */
    get(path) {
      const held = files.get(path);
      return held ? structuredClone(held.data) : null;
    },
    has(path) {
      return files.has(path);
    },
  };
}
