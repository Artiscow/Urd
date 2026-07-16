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

  try {
    const { sha } = await commitFiles(token, config, { message, files });
    return json({ sha });
  } catch (err) {
    console.error('Urd publish:', err.message);
    return json({ error: 'Kunne ikke committe til GitHub (har HEAD flyttet seg?)' }, 502);
  }
}
