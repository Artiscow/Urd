/**
 * Felles registerfabrikk. Alle utvidbare typer i Urd (blokker, seksjons-
 * presets, bakgrunnslag, animasjoner) bruker samme register-mønster, og
 * plugins bruker de identiske define-API-ene som kjernen.
 */

/**
 * @param {string} kind Navn på registeret, kun til feilmeldinger ('blocks', 'backgrounds', …)
 * @returns {{define: (id: string, def: object) => void, alias: (oldId: string, id: string) => void, get: (id: string) => object|undefined, ids: () => string[]}}
 */
export function createRegistry(kind) {
  const defs = new Map();
  const aliases = new Map();
  return {
    define(id, def) {
      if (defs.has(id)) throw new Error(`Urd.${kind}: '${id}' er allerede definert`);
      defs.set(id, def);
    },
    // Resolves an old contract id to its current one (ADR-0021). Aliases are
    // consulted only on a direct miss, so a plugin that still defines the
    // old id keeps winning for its own data.
    alias(oldId, id) {
      aliases.set(oldId, id);
    },
    get(id) {
      return defs.get(id) ?? (aliases.has(id) ? defs.get(aliases.get(id)) : undefined);
    },
    ids() {
      return [...defs.keys()];
    },
  };
}
