/**
 * POST /api/github/logout
 * Signs out: the session cookies are expired, and the sign-in is revoked at GitHub where the site's app can do so, so a copy of the cookies stops working too.
 * A sign-in that can be renewed (_lib/session.js) is renewed once and the new token revoked: the renewal ends the old token and the old refresh token, and the new refresh token is never handed out.
 * Only from the site's own pages, sent as JSON (auth.js), so another site or a planted form cannot sign the owner out.
 * The revocation is best-effort: the cookies are expired whether or not GitHub answers.
 */
import { cfg } from '../../_lib/github.js';
import { isCrossOrigin, isJsonRequest } from '../../_lib/auth.js';
import { readCookie } from '../../_lib/cookies.js';
import { SESSION_COOKIE, readRenewal, renewToken, endSessionCookies } from '../../_lib/session.js';

const json = (body, status = 200, cookies = []) => {
  const headers = new Headers({ 'content-type': 'application/json' });
  for (const cookie of cookies) headers.append('set-cookie', cookie);
  return new Response(JSON.stringify(body), { status, headers });
};

export async function onRequestPost({ request, env }) {
  const cross = isCrossOrigin({ secFetchSite: request.headers.get('sec-fetch-site'), origin: request.headers.get('origin'), url: request.url });
  if (cross) return json({ error: 'The request comes from the wrong site', code: 'wrongOrigin' }, 403);
  if (!isJsonRequest(request)) return json({ error: 'The request must be sent as JSON', code: 'notJson' }, 415);

  let config = null;
  try {
    config = cfg(env);
  } catch { /* the app not configured: the cookies are expired all the same */ }
  if (config) {
    let token = readCookie(request, SESSION_COOKIE);
    const renewal = readRenewal(request);
    if (renewal) {
      const answer = await renewToken(config, renewal.refreshToken);
      if (answer) token = answer.access_token;
    }
    if (token) {
      try {
        const { clientId, clientSecret } = config;
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
      } catch { /* GitHub unreachable: the cookies are expired all the same */ }
    }
  }
  return json({ signedOut: true }, 200, endSessionCookies());
}
