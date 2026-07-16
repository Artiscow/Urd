/**
 * POST /api/github/commit
 * Kjernen i publiseringen. Body: { message, files: [{path, content, encoding?}] }.
 * Committer alle filene som ÉN commit via Git Data API.
 *
 * Vern (forsvar i dybden, se ADR-0003):
 *  - krever innlogget token OG at brukeren står i ALLOWED_LOGINS
 *  - hver filsti valideres mot sti-allowlisten (kun innhold, aldri kode)
 *  - maks 200 filer per commit
 */
import { cfg, currentUser, commitFiles } from '../../_lib/github.js';
import { readCookie } from '../../_lib/cookies.js';
import { isAllowedLogin, isAllowedPath } from '../../_lib/guard.js';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export async function onRequestPost({ request, env }) {
  let config;
  try {
    config = cfg(env);
  } catch (err) {
    return json({ error: err.message }, 503);
  }

  const token = readCookie(request, 'urd_gh');
  if (!token) return json({ error: 'Ikke innlogget' }, 401);

  let user;
  try {
    user = await currentUser(token);
  } catch {
    return json({ error: 'Ugyldig eller utløpt innlogging' }, 401);
  }
  if (!isAllowedLogin(user.login, env)) {
    return json({ error: `GitHub-brukeren '${user.login}' har ikke publiseringstilgang` }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Ugyldig JSON i forespørselen' }, 400);
  }
  const { message, files } = body ?? {};
  if (typeof message !== 'string' || !message.trim()) {
    return json({ error: 'Commit-melding mangler' }, 400);
  }
  if (!Array.isArray(files) || files.length === 0 || files.length > 200) {
    return json({ error: 'files må være en liste med 1 til 200 filer' }, 400);
  }
  for (const file of files) {
    if (typeof file?.path !== 'string' || typeof file?.content !== 'string') {
      return json({ error: 'Hver fil trenger path og content' }, 400);
    }
    if (!isAllowedPath(file.path)) {
      return json({ error: `Stien '${file.path}' kan ikke publiseres herfra` }, 400);
    }
  }

  // Stiene fra editoren er relative til NETTSIDEN. Ligger nettsiden i en
  // undermappe av repoet (GITHUB_ROOT_DIR, f.eks. "template"), prefikses
  // stiene her - ETTER valideringen over, som gjelder nettside-stiene.
  const repoFiles = config.rootDir
    ? files.map((f) => ({ ...f, path: `${config.rootDir}/${f.path}` }))
    : files;

  try {
    const { sha } = await commitFiles(token, config, { message, files: repoFiles });

    // Er DEPLOY_HOOK_URL satt, trigges hostens deploy eksplisitt i tillegg
    // til git-webhooken (som kan glippe hos hosten). Feil her skal aldri
    // velte publiseringen - commiten er allerede trygt i repoet.
    if (env.DEPLOY_HOOK_URL) {
      try {
        await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' });
      } catch (err) {
        console.warn('Urd publish: deploy-hook feilet', err.message);
      }
    }

    return json({ sha });
  } catch (err) {
    console.error('Urd publish:', err.message);
    // GitHubs faktiske svar vises til den innloggede redaktøren - uten
    // det er feilsøking umulig. Tokenet inngår aldri i meldingen.
    return json({ error: `Kunne ikke committe til GitHub: ${err.message}` }, 502);
  }
}
