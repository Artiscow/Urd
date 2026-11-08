/**
 * A group of the site's settings as the row kit's fold takes it (lib/rows/Fold.svelte), in the shape menu/groups.js gives the element menu: its defaults, its reset, and what each setting in it needs for its mark and its own reset.
 * A site setting at its default stands in no field of the file, so a reset takes the fields away rather than writing the defaults.
 * Pure, node-tested (tests/site-groups.test.mjs).
 */

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/**
 * @param {() => object|undefined} read The object the group's fields stand in (siteDraft.site, siteDraft.layout ...), read when called
 * @param {(name: string, change: () => void) => void} write Runs a change as one undo step (siteMutate)
 * @param {string} id The group, which names its undo steps
 * @param {Record<string, unknown>} defaults What each field falls back to when it is absent; undefined for a field with no value of its own
 */
export function siteGroup(read, write, id, defaults) {
  const own = (key) => {
    const value = read()?.[key];
    return key in defaults && value !== undefined && !same(value, defaults[key]);
  };
  const clear = (name, keys) => write(name, () => {
    const target = read();
    if (target) for (const key of keys) delete target[key];
  });
  const changed = Object.keys(defaults).filter(own);
  return {
    id,
    defaults,
    /** How many of the group's settings hold a value of their own, for its closed value. */
    changed: changed.length,
    reset: changed.length ? () => clear(id, Object.keys(defaults)) : null,
    own,
    resetKey: (key) => clear(`${id}:${key}`, [key]),
  };
}
