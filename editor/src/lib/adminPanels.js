/**
 * Panelregister for editoren. Paneler (sider, nav, tema, plugin-paneler)
 * registreres med samme define-mønster som motorens registre, slik at
 * plugins kan levere egne admin-paneler senere.
 *
 * Kontrakt (fra det validerte ApeironLF-mønsteret):
 *   definePanel(id, {
 *     title: string,
 *     exportFiles: () => Array<{path: string, content: string|Blob}>,
 *     mount: (host: HTMLElement, ctx) => { destroy(): void },
 *   })
 * Publisering samler exportFiles() fra alle paneler med utkast og
 * committer alt som ÉN commit via /api/github/commit.
 */

const panels = new Map();

/** @param {string} id @param {object} def Se kontrakten over */
export function definePanel(id, def) {
  if (panels.has(id)) throw new Error(`Panel '${id}' er allerede definert`);
  panels.set(id, def);
}

/** @param {string} id */
export function getPanel(id) {
  return panels.get(id);
}

export function panelIds() {
  return [...panels.keys()];
}
