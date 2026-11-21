/**
 * Shared registry factory. Every extensible type in Urd (blocks, section
 * presets, background layers, animations) uses the same registry pattern,
 * and plugins use the identical define APIs as the core.
 */

/**
 * @param {string} kind Registry name, used only in error messages ('blocks', 'backgrounds', …)
 * @returns {{define: (id: string, def: object) => void, alias: (oldId: string, id: string) => void, reserve: (ids: Iterable<string>) => (id: string, def: object) => void, isReserved: (id: string) => boolean, get: (id: string) => object|undefined, ids: () => string[]}}
 */
export function createRegistry(kind) {
  const defs = new Map();
  const aliases = new Map();
  const reserved = new Set();
  return {
    define(id, def) {
      if (reserved.has(id)) throw new Error(`Urd.${kind}: '${id}' is the engine's own`);
      if (defs.has(id)) throw new Error(`Urd.${kind}: '${id}' is already defined`);
      defs.set(id, def);
    },
    // Resolves an old contract id to its current one (ADR-0021). Aliases are
    // consulted only on a direct miss, so a plugin that still defines the
    // old id keeps winning for its own data.
    alias(oldId, id) {
      aliases.set(oldId, id);
    },
    // Marks ids as the engine's own before their modules have defined them (core-types.js, ADR-0036): define() refuses them, and the definer returned here, which the engine keeps, defines them.
    reserve(ids) {
      for (const id of ids) reserved.add(id);
      return (id, def) => {
        if (!reserved.has(id)) throw new Error(`Urd.${kind}: '${id}' is not the engine's own`);
        if (defs.has(id)) throw new Error(`Urd.${kind}: '${id}' is already defined`);
        defs.set(id, def);
      };
    },
    isReserved(id) {
      return reserved.has(id);
    },
    get(id) {
      return defs.get(id) ?? (aliases.has(id) ? defs.get(aliases.get(id)) : undefined);
    },
    ids() {
      return [...defs.keys()];
    },
  };
}
