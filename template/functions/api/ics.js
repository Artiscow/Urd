/**
 * Anonymous read-only feed proxy for the calendar block: browsers cannot fetch
 * iCal feeds directly (feed hosts send no CORS, and the site's CSP allows only
 * connect-src 'self'), so the block fetches everything through this
 * same-origin route.
 *
 * OPEN PROXY GUARD: https only, no sign-in in the URL, and the host must be on the allowlist (calendar.google.com is always included; the owner puts other feed hosts in the ICS_HOSTS environment variable, comma-separated).
 * Every redirect hop is checked against the same list before it is fetched (fetchWithTimeout in _lib/photos.js, which also limits the body's time), so an approved host cannot point the proxy onwards.
 * The route answers the site's own pages only (fromOwnPages).
 */
import { fetchWithTimeout, RedirectRefused, refuseCrossSite } from '../_lib/photos.js';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'x-content-type-options': 'nosniff' } });

const MAX_BYTES = 1_500_000;

export async function onRequestGet({ request, env }) {
  if (refuseCrossSite(request)) return json({ error: 'The calendar route answers this site only', code: 'wrongOrigin' }, 403);
  const raw = new URL(request.url).searchParams.get('url') ?? '';
  let target;
  try {
    target = new URL(raw);
  } catch {
    return json({ error: 'Invalid calendar address', code: 'badCalendarUrl' }, 400);
  }
  if (target.protocol !== 'https:' || target.username || target.password || target.port) {
    return json({ error: 'Only plain https addresses without sign-in', code: 'insecureCalendarUrl' }, 400);
  }

  const allowed = new Set(['calendar.google.com',
    ...String(env.ICS_HOSTS ?? '').split(',').map((h) => h.trim().toLowerCase()).filter(Boolean)]);
  const hostOk = (host) => allowed.has(String(host).toLowerCase());
  if (!hostOk(target.hostname)) {
    return json({ error: `The calendar host «${target.hostname}» is not allowed. Add it to the ICS_HOSTS environment variable (comma-separated) in the hosting setup.`, code: 'calendarHostNotAllowed', host: target.hostname }, 403);
  }

  let upstream;
  try {
    upstream = await fetchWithTimeout(target, { headers: { accept: 'text/calendar, text/plain;q=0.9' } }, 8000, hostOk);
  } catch (err) {
    if (err instanceof RedirectRefused) return json({ error: 'The calendar source redirected to a host that is not allowed', code: 'calendarRedirectBlocked' }, 502);
    return json({ error: 'Could not reach the calendar source', code: 'calendarUnreachable' }, 502);
  }

  if (!upstream.ok) return json({ error: `The calendar source responded ${upstream.status}`, code: 'calendarUpstreamStatus', status: upstream.status }, 502);

  const tooLarge = () => json({ error: 'The calendar file is too large', code: 'calendarTooLarge' }, 502);

  // The size is enforced BEFORE the body is buffered: a declared length is
  // rejected at once, and without one we count bytes while the stream is read
  // and abort at the limit. (A plain .text() would buffer the whole response
  // first, and the length of the finished string counts UTF-16 units, not bytes.)
  const declared = Number(upstream.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > MAX_BYTES) return tooLarge();

  const reader = upstream.body?.getReader();
  const decoder = new TextDecoder('utf-8');
  let text = '';
  let bytes = 0;
  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > MAX_BYTES) {
      await reader.cancel();
      return tooLarge();
    }
    text += decoder.decode(value, { stream: true });
  }
  // With no body, text stays empty and the iCal check below answers calendarNotIcs.
  text += decoder.decode();
  if (!/BEGIN:VCALENDAR/i.test(text.slice(0, 4000))) {
    return json({ error: 'The response from the source is not an iCal file', code: 'calendarNotIcs' }, 502);
  }

  return new Response(text, {
    status: 200,
    headers: {
      'content-type': 'text/calendar; charset=utf-8',
      'x-content-type-options': 'nosniff',
      // Shared cache for 5 minutes: visitors never hammer the feed host.
      'cache-control': 'public, max-age=60, s-maxage=300',
    },
  });
}
