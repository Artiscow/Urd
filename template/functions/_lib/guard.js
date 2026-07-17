/**
 * Vern for publiseringslaget (se ADR-0003).
 *
 * Sti-allowlisten er implementert for ekte allerede i skjelettet: den er
 * liten, testbar og sikkerhetskritisk. En kapret redaktørsesjon skal aldri
 * kunne skrive kode eller konfigurasjon, kun innhold.
 */

/** Stier publisering ALDRI får skrive (prefiks- eller eksaktmatch). */
const DENY_PREFIXES = ['functions/', '.github/', 'admin/', 'assets/engine/'];
const DENY_EXACT = ['_headers', '_redirects', 'urd.json', 'index.html', '.gitignore', 'wrangler.toml'];

/** Stier publisering FÅR skrive. */
const ALLOW_PREFIXES = ['content/', 'media/'];
const ALLOW_EXACT = ['plugins/plugins.json'];

/**
 * Sideruting: publisering får skrive `<slug>/index.html` (kopi av
 * rot-index.html per side, så ruting virker på alle statiske hoster) -
 * men ALDRI rot-index.html, og aldri under reserverte mapper.
 */
const PAGE_INDEX_RE = /^[a-z0-9][a-z0-9-]*\/index\.html$/;
const RESERVED_SLUGS = ['admin', 'api', 'assets', 'content', 'media', 'plugins', 'functions'];

/**
 * @param {string} path Repo-relativ filsti fra en commit-forespørsel
 * @returns {boolean} true hvis stien er trygg å skrive via publisering
 */
export function isAllowedPath(path) {
  if (typeof path !== 'string' || path.length === 0) return false;
  const normalized = path.replaceAll('\\', '/');
  if (normalized.startsWith('/') || normalized.split('/').includes('..')) return false;
  if (DENY_EXACT.includes(normalized)) return false;
  if (DENY_PREFIXES.some((p) => normalized.startsWith(p))) return false;
  if (ALLOW_EXACT.includes(normalized)) return true;
  if (PAGE_INDEX_RE.test(normalized) && !RESERVED_SLUGS.includes(normalized.split('/')[0])) return true;
  return ALLOW_PREFIXES.some((p) => normalized.startsWith(p));
}

/**
 * Sjekker at et GitHub-brukernavn står i ALLOWED_LOGINS (kommaseparert
 * miljøvariabel). Håndheves i ALLE muterende endepunkter (forsvar i dybden).
 * @param {string} login
 * @param {{ALLOWED_LOGINS?: string}} env
 */
export function isAllowedLogin(login, env) {
  const allowed = (env.ALLOWED_LOGINS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(String(login).toLowerCase());
}
