/**
 * GET /api/github/me
 * Sign-in status for the editor: { loggedIn, login?, allowed?, renewIn?, renewFailed? }.
 * `allowed` is the ALLOWED_LOGINS check; it is enforced again in commit.js
 * REGARDLESS (defence in depth), this response is only for the UI.
 * A sign-in that expires is renewed here once it falls due, or a little earlier with `?soon=1` (before a publish or a save), and `renewIn` tells the editor in how many seconds to ask again (_lib/session.js).
 * `renewFailed` says a renewal was refused, as when another tab renewed the sign-in a moment before with the same refresh token; the editor then asks once more with the cookies that tab was given.
 */
import { cfg, currentUser } from '../../_lib/github.js';
import { readCookie } from '../../_lib/cookies.js';
import { isAllowedLogin } from '../../_lib/guard.js';
import { SESSION_COOKIE, RENEW_SOON, readRenewal, renewDue, renewIn, renewToken, sessionCookies, nowSeconds } from '../../_lib/session.js';

const json = (body, status = 200, cookies = []) => {
  const headers = new Headers({ 'content-type': 'application/json' });
  for (const cookie of cookies) headers.append('set-cookie', cookie);
  return new Response(JSON.stringify(body), { status, headers });
};

export async function onRequestGet({ request, env }) {
  let token = readCookie(request, SESSION_COOKIE);
  const renewal = readRenewal(request);
  if (!token && !renewal) return json({ loggedIn: false });

  const now = nowSeconds();
  let expiresAt = renewal?.expiresAt;
  let cookies = [];
  let renewFailed = false;
  const lead = new URL(request.url).searchParams.get('soon') === '1' ? RENEW_SOON : 0;
  if (renewal && (!token || renewDue(renewal.expiresAt, now, lead))) {
    let answer = null;
    try {
      answer = await renewToken(cfg(env), renewal.refreshToken);
    } catch { /* the app not configured: the sign-in is read as it stands */ }
    if (answer) {
      token = answer.access_token;
      cookies = sessionCookies(answer, now);
      expiresAt = Number.isInteger(Number(answer.expires_in)) && Number(answer.expires_in) > 0 ? now + Number(answer.expires_in) : undefined;
    } else {
      renewFailed = true;
    }
  }
  if (!token) return json({ loggedIn: false, ...(renewFailed ? { renewFailed } : {}) }, 200, cookies);

  try {
    const user = await currentUser(token);
    return json({
      loggedIn: true,
      login: user.login,
      allowed: isAllowedLogin(user.login, env),
      ...(expiresAt ? { renewIn: renewIn(expiresAt, now) } : {}),
    }, 200, cookies);
  } catch (err) {
    // ONLY GitHub's 401 means signed out (invalid/expired token). Anything
    // else is GitHub trouble and must not be shown as a sign-out in the editor.
    if (err.status === 401) return json({ loggedIn: false, ...(renewFailed ? { renewFailed } : {}) }, 200, cookies);
    return json({ error: 'GitHub is unavailable right now', code: 'githubUnavailable' }, 503, cookies);
  }
}
