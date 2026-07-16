/**
 * GitHub-API-hjelpere for publiseringslaget.
 *
 * Grensen her holdes bevisst leverandørformet slik at GitLab/Gitea-adaptere
 * kan skrives etter v1 uten å røre endepunktene.
 *
 * Konfigurasjon (miljøvariabler hos hosten):
 *   GITHUB_REPO ("eier/navn"), GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET,
 *   GITHUB_BRANCH (standard "main"), GITHUB_SCOPE (standard "public_repo"),
 *   ALLOWED_LOGINS (kommaseparert),
 *   GITHUB_ROOT_DIR (valgfri: undermappen i repoet som er nettsidens rot,
 *   f.eks. "template" i Urd-monorepoet; utelatt når nettsiden ligger i roten).
 */

/** Leser og validerer konfigurasjonen fra env. Kaster ved manglende variabler. */
export function cfg(env) {
  for (const key of ['GITHUB_REPO', 'GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET']) {
    if (!env[key]) throw new Error(`Publisering er ikke konfigurert: miljøvariabelen ${key} mangler`);
  }
  const rootDir = (env.GITHUB_ROOT_DIR || '').replace(/^\/+|\/+$/g, '');
  if (rootDir.split('/').includes('..')) {
    throw new Error('GITHUB_ROOT_DIR kan ikke inneholde ..');
  }
  return {
    repo: env.GITHUB_REPO,
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    branch: env.GITHUB_BRANCH || 'main',
    scope: env.GITHUB_SCOPE || 'public_repo',
    rootDir,
  };
}

/**
 * Autentisert kall mot api.github.com. Forbigående feil (5xx/429, som
 * GitHubs «Unicorn»-side) prøves automatisk på nytt et par ganger.
 * Kaster Error med .status, slik at endepunktene kan skille «GitHub er
 * nede» fra «ugyldig token». Feiltekst kortes ned (aldri hele HTML-sider).
 */
export async function gh(token, path, init = {}, attempt = 1) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
      'user-agent': 'urd-publisher',
      ...(init.body ? { 'content-type': 'application/json' } : {}),
      ...init.headers,
    },
  });
  if (!res.ok) {
    if ((res.status >= 500 || res.status === 429) && attempt < 3) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 500));
      return gh(token, path, init, attempt + 1);
    }
    const isJson = res.headers.get('content-type')?.includes('json');
    const detail = isJson ? (await res.text()).slice(0, 300) : '(HTML-feilside fra GitHub)';
    const error = new Error(`GitHub ${init.method ?? 'GET'} ${path} svarte ${res.status}: ${detail}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

/** Innlogget GitHub-bruker for tokenet. */
export function currentUser(token) {
  return gh(token, '/user');
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
 * @param {{repo: string, branch: string}} config Fra cfg(env)
 * @param {{message: string, files: Array<{path: string, content: string, encoding?: 'utf-8'|'base64'}>}} payload
 * @returns {Promise<{sha: string}>} Den nye commit-SHA-en
 */
export async function commitFiles(token, config, { message, files }) {
  const { repo, branch } = config;

  const ref = await gh(token, `/repos/${repo}/git/ref/heads/${branch}`);
  const baseSha = ref.object.sha;
  const baseCommit = await gh(token, `/repos/${repo}/git/commits/${baseSha}`);

  const tree = [];
  for (const file of files) {
    const blob = await gh(token, `/repos/${repo}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({
        content: file.content,
        encoding: file.encoding === 'base64' ? 'base64' : 'utf-8',
      }),
    });
    tree.push({ path: file.path, mode: '100644', type: 'blob', sha: blob.sha });
  }

  const newTree = await gh(token, `/repos/${repo}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({ base_tree: baseCommit.tree.sha, tree }),
  });

  const commit = await gh(token, `/repos/${repo}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({ message, tree: newTree.sha, parents: [baseSha] }),
  });

  await gh(token, `/repos/${repo}/git/refs/heads/${branch}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });

  return { sha: commit.sha };
}
