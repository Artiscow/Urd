/**
 * GET /api/github/latest[?base=<sha>]
 * Returnerer HEAD-commit på publiseringsgrenen; med ?base listes i tillegg
 * filene endret i base..HEAD. Editoren bruker dette til konfliktdeteksjon:
 * har noen andre publisert siden innlasting, varsles redaktøren.
 */
import { cfg, gh } from '../../_lib/github.js';
import { readCookie } from '../../_lib/cookies.js';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export async function onRequestGet({ request, env }) {
  let config;
  try {
    config = cfg(env);
  } catch (err) {
    return json({ error: err.message }, 503);
  }

  const token = readCookie(request, 'urd_gh');
  if (!token) return json({ error: 'Ikke innlogget' }, 401);

  try {
    const ref = await gh(token, `/repos/${config.repo}/git/ref/heads/${config.branch}`);
    const head = ref.object.sha;

    const base = new URL(request.url).searchParams.get('base');
    if (!base || base === head) return json({ head, changedFiles: [] });

    const diff = await gh(token, `/repos/${config.repo}/compare/${base}...${head}`);
    return json({ head, changedFiles: (diff.files ?? []).map((f) => f.filename) });
  } catch (err) {
    console.error('Urd latest:', err.message);
    return json({ error: 'Kunne ikke lese repo-status fra GitHub' }, 502);
  }
}
