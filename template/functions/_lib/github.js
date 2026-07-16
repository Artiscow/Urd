/**
 * GitHub-API-hjelpere for publiseringslaget.
 *
 * Grensen her holdes bevisst leverandørformet slik at GitLab/Gitea-adaptere
 * kan skrives etter v1 uten å røre endepunktene.
 *
 * Konfigurasjon (miljøvariabler hos hosten):
 *   GITHUB_REPO ("eier/navn"), GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET,
 *   GITHUB_BRANCH (standard "main"), GITHUB_SCOPE (standard "public_repo"),
 *   ALLOWED_LOGINS (kommaseparert).
 */

/** Leser og validerer konfigurasjonen fra env. */
export function cfg(env) {
  throw new Error('TODO v0.2: cfg er ikke implementert ennå');
}

/** Autentisert fetch mot api.github.com. */
export async function gh(token, path, init) {
  throw new Error('TODO v0.2: gh er ikke implementert ennå');
}

/**
 * Committer flere filer som ÉN commit via Git Data API:
 *   1. Hent branch-ref og basecommit
 *   2. Opprett en blob per fil
 *   3. Opprett tre med base_tree = basecommitens tre
 *   4. Opprett commit med basecommit som forelder
 *   5. Oppdater ref (force: false - feiler trygt hvis HEAD har flyttet seg)
 *
 * @param {string} token
 * @param {object} config Fra cfg(env)
 * @param {{message: string, files: Array<{path: string, content: string, encoding: 'utf-8'|'base64'}>}} payload
 * @returns {Promise<{sha: string}>} Den nye commit-SHA-en
 */
export async function commitFiles(token, config, payload) {
  throw new Error('TODO v0.2: commitFiles er ikke implementert ennå');
}
