/**
 * POST /api/github/logout
 * Signs out: the session cookie is expired, and the token in it is revoked at GitHub where the site's OAuth app can do so, so a copy of the cookie stops working too.
 * Only from the site's own pages, sent as JSON (auth.js), so another site or a planted form cannot sign the owner out.
 * The revocation is best-effort: the cookie is expired whether or not GitHub answers.
 */
import { cfg } from '../../_lib/github.js';
import { isCrossOrigin, isJsonRequest } from '../../_lib/auth.js';
import { readCookie, expireCookie } from '../../_lib/cookies.js';

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });

export async function onRequestPost({ request, env }) {
  const cross = isCrossOrigin({ secFetchSite: request.headers.get('sec-fetch-site'), origin: request.headers.get('origin'), url: request.url });
  if (cross) return json({ error: 'The request comes from the wrong site', code: 'wrongOrigin' }, 403);
  if (!isJsonRequest(request)) return json({ error: 'The request must be sent as JSON', code: 'notJson' }, 415);

  const token = readCookie(request, 'urd_gh');
  if (token) {
    try {
      const { clientId, clientSecret } = cfg(env);
      await fetch(`https://api.github.com/applications/${encodeURIComponent(clientId)}/token`, {
        method: 'DELETE',
        headers: {
          authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          accept: 'application/vnd.github+json',
          'content-type': 'application/json',
          'user-agent': 'urd-publisher',
        },
        body: JSON.stringify({ access_token: token }),
      });
    } catch { /* GitHub unreachable or the app not configured: the cookie is expired all the same */ }
  }
  return json({ signedOut: true }, 200, { 'set-cookie': expireCookie('urd_gh') });
}
