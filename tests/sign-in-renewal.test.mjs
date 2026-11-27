/**
 * The renewal of a GitHub sign-in that expires (functions/_lib/session.js): the login asks for it (api/github/login.js), the sign-in's answer keeps its refresh token beside it (api/github/callback.js), the sign-in status renews it once it falls due (api/github/me.js), signing out ends both (api/github/logout.js), no other function renews, every cookie of the sign-in is HttpOnly (functions/_lib/cookies.js), and the editor asks at the planned moment and before its other calls when it opens late (editor/src/state/shell.svelte.js).
 * GitHub is a stand-in fetch; nothing leaves the machine.
 */
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { sep } from 'node:path';
import { onRequestGet as login } from '../template/functions/api/github/login.js';
import { onRequestGet as callback } from '../template/functions/api/github/callback.js';
import { onRequestGet as me } from '../template/functions/api/github/me.js';
import { onRequestPost as logout } from '../template/functions/api/github/logout.js';
import { readRenewal, renewDue, renewIn, sessionCookies, loginScope, RENEW_BEFORE, RENEW_LEAST, RENEW_SOON } from '../template/functions/_lib/session.js';
import { serializeCookie, expireCookie } from '../template/functions/_lib/cookies.js';

const ORIGIN = 'https://site.pages.dev';
const ENV = { GITHUB_REPO: 'site/repo', GITHUB_CLIENT_ID: 'id', GITHUB_CLIENT_SECRET: 'secret', ALLOWED_LOGINS: 'owner' };
const REFRESH = 'ghr_aaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const RENEWED = 'ghr_bbbbbbbbbbbbbbbbbbbbbbbbbbbb';
const reply = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const now = () => Math.floor(Date.now() / 1000);

const realFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = realFetch; });

/**
 * A stand-in GitHub: the sign-in and the renewal at github.com, and the signed-in user for the tokens it treats as live.
 * `renewal` is GitHub's answer to a renewal; `live` the tokens /user accepts.
 */
function github({ renewal = { access_token: 'ghu_new', expires_in: 28800, refresh_token: RENEWED, refresh_token_expires_in: 15897600 }, signIn = null, live = ['ghu_old', 'ghu_new'] } = {}) {
  const seen = { calls: [] };
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(String(url));
    const method = init.method ?? 'GET';
    const body = init.body ? JSON.parse(init.body) : null;
    seen.calls.push({ url: u.href, method, headers: init.headers ?? {}, body });
    if (u.href === 'https://github.com/login/oauth/access_token') return reply(body.grant_type === 'refresh_token' ? renewal : signIn);
    if (u.href === 'https://api.github.com/user') {
      const token = (init.headers?.authorization ?? '').replace(/^Bearer /, '');
      return live.includes(token) ? reply({ login: 'owner' }) : reply({ message: 'Bad credentials' }, 401);
    }
    if (u.pathname === '/applications/id/token' && method === 'DELETE') return new Response(null, { status: 204 });
    return reply({ message: 'unexpected' }, 404);
  };
  return seen;
}

const cookies = (res) => res.headers.getSetCookie();
const renewals = (seen) => seen.calls.filter((c) => c.body?.grant_type === 'refresh_token');

test('the renewal cookie: written from GitHub\'s answer for the sign-in endpoints only, read back only in the shape it is written in', () => {
  const at = 1_800_000_000;
  const [session, renewal] = sessionCookies({ access_token: 'ghu_x', expires_in: 28800, refresh_token: REFRESH }, at);
  assert.match(session, /^urd_gh=ghu_x; Max-Age=\d+; Path=\/; HttpOnly; Secure; SameSite=Lax$/);
  assert.equal(renewal, `urd_ghr=${at + 28800}.${REFRESH}; Max-Age=2592000; Path=/api/github; HttpOnly; Secure; SameSite=Lax`);
  // A sign-in that does not expire removes a renewal left from an earlier one.
  assert.deepEqual(sessionCookies({ access_token: 'gho_x' }, at)[1], 'urd_ghr=; Max-Age=0; Path=/api/github; HttpOnly; Secure; SameSite=Lax');
  assert.match(sessionCookies({ access_token: 'gho_x', expires_in: 28800, refresh_token: 'bad token; Path=/' }, at)[1], /^urd_ghr=; Max-Age=0;/);

  const read = (value) => readRenewal(new Request(ORIGIN, { headers: { cookie: `urd_gh=x; urd_ghr=${value}` } }));
  assert.deepEqual(read(`${at}.${REFRESH}`), { expiresAt: at, refreshToken: REFRESH });
  for (const bad of [REFRESH, `${at}`, `${at}.short`, `x${at}.${REFRESH}`, `${at}.${REFRESH}.x`, `${at}.ghr_a-b-c-d-e-f-g-h-i-j-k`]) assert.equal(read(bad), null, bad);

  assert.equal(renewDue(at, at - RENEW_BEFORE - 1), false);
  assert.equal(renewDue(at, at - RENEW_BEFORE), true);
  assert.equal(renewIn(at, at - 28800), 28800 - RENEW_BEFORE + 5, 'asked again a few seconds after it falls due');
  assert.equal(renewIn(at, at), RENEW_LEAST, 'never sooner than a minute');
});

test('the login asks for offline_access beside the site\'s own scope, so an OAuth App gives a sign-in that renews itself too', async () => {
  assert.equal(loginScope('public_repo'), 'public_repo offline_access');
  assert.equal(loginScope('repo'), 'repo offline_access');
  assert.equal(loginScope(' repo  offline_access '), 'repo offline_access', 'asked for once');
  assert.equal(loginScope('repo,read:org, offline_access'), 'repo read:org offline_access', 'commas read as separators');
  assert.equal(loginScope(''), 'offline_access');
  const ask = async (env) => new URL((await login({ request: new Request(`${ORIGIN}/api/github/login`), env })).headers.get('location'));
  let to = await ask(ENV);
  assert.equal(to.origin + to.pathname, 'https://github.com/login/oauth/authorize');
  assert.equal(to.searchParams.get('scope'), 'public_repo offline_access', 'the default scope');
  assert.equal(to.searchParams.get('redirect_uri'), `${ORIGIN}/api/github/callback`, 'the address the editor was opened at');
  to = await ask({ ...ENV, GITHUB_SCOPE: 'repo' });
  assert.equal(to.searchParams.get('scope'), 'repo offline_access');
});

test('the sign-in keeps its refresh token beside it where GitHub gives one, and only where the state matches', async () => {
  const ask = (state = 's1', cookie = 'urd_state=s1') => callback({ request: new Request(`${ORIGIN}/api/github/callback?code=c1&state=${state}`, { headers: { cookie } }), env: ENV });
  let seen = github({ signIn: { access_token: 'ghu_first', expires_in: 28800, refresh_token: REFRESH, refresh_token_expires_in: 15897600 } });
  let res = await ask('other');
  assert.equal(res.status, 400);
  assert.equal(seen.calls.length, 0);

  res = await ask();
  assert.equal(res.status, 302);
  assert.equal(res.headers.get('location'), '/admin/');
  const [session, renewal, state] = cookies(res);
  assert.match(session, /^urd_gh=ghu_first;/);
  const expiresAt = Number(renewal.match(/^urd_ghr=(\d+)\./)[1]);
  assert.ok(Math.abs(expiresAt - (now() + 28800)) <= 2, 'the end is kept in seconds');
  assert.match(renewal, /; Path=\/api\/github;/);
  assert.match(state, /^urd_state=; Max-Age=0;/);
  assert.deepEqual(seen.calls[0].body, { client_id: 'id', client_secret: 'secret', code: 'c1' });

  seen = github({ signIn: { access_token: 'gho_lasting', scope: 'public_repo', token_type: 'bearer' } });
  res = await ask();
  assert.match(cookies(res)[0], /^urd_gh=gho_lasting;/);
  assert.match(cookies(res)[1], /^urd_ghr=; Max-Age=0;/, 'an OAuth App\'s lasting sign-in has no renewal');
  seen = github({ signIn: { error: 'bad_verification_code' } });
  res = await ask();
  assert.equal(res.status, 401);
  assert.equal(res.headers.get('set-cookie'), null);
});

/** A sign-in status request carrying the sign-in and, where given, its renewal ending at `endsAt`; `soon` asks as the editor does before a publish or a save, and `site` is the browser's Sec-Fetch-Site, where it sends one. */
const status = (endsAt, { token = 'ghu_old', refresh = REFRESH, soon = false, site = null } = {}) => me({
  request: new Request(`${ORIGIN}/api/github/me${soon ? '?soon=1' : ''}`, { headers: { cookie: [token ? `urd_gh=${token}` : '', endsAt ? `urd_ghr=${endsAt}.${refresh}` : ''].filter(Boolean).join('; '), ...(site ? { 'sec-fetch-site': site } : {}) } }),
  env: ENV,
});

test('the sign-in status renews nothing before the sign-in falls due, and says when to ask again', async () => {
  const seen = github();
  const endsAt = now() + 4 * 3600;
  const res = await status(endsAt);
  const data = await res.json();
  assert.equal(data.loggedIn, true);
  assert.equal(data.allowed, true);
  assert.ok(Math.abs(data.renewIn - (endsAt - RENEW_BEFORE - now() + 5)) <= 2);
  assert.equal(renewals(seen).length, 0);
  assert.deepEqual(cookies(res), []);

  // Before a publish or a save, a sign-in within RENEW_SOON of falling due is renewed early; one further off is not.
  const early = now() + RENEW_BEFORE + RENEW_SOON - 30;
  const plain = github();
  await status(early);
  assert.equal(renewals(plain).length, 0, 'not yet due');
  const soon = github();
  await status(early, { soon: true });
  assert.equal(renewals(soon).length, 1, 'renewed before the publish');
  const far = github();
  await status(now() + RENEW_BEFORE + RENEW_SOON + 60, { soon: true });
  assert.equal(renewals(far).length, 0);

  // A lasting sign-in (no renewal cookie) is read as it stands, with no time to ask again.
  const lasting = await (await status(null)).json();
  assert.deepEqual(lasting, { loggedIn: true, login: 'owner', allowed: true });
});

test('a sign-in that has fallen due is renewed once, its new cookies set and the new sign-in used', async () => {
  const seen = github({ live: ['ghu_new'] });
  const res = await status(now() + 60);
  const data = await res.json();
  assert.equal(data.loggedIn, true);
  assert.ok(Math.abs(data.renewIn - (28800 - RENEW_BEFORE + 5)) <= 2);
  const [renew] = renewals(seen);
  assert.deepEqual(renew.body, { client_id: 'id', client_secret: 'secret', grant_type: 'refresh_token', refresh_token: REFRESH });
  assert.equal(seen.calls.find((c) => c.url === 'https://api.github.com/user').headers.authorization, 'Bearer ghu_new');
  const [session, renewal] = cookies(res);
  assert.match(session, /^urd_gh=ghu_new;/);
  assert.match(renewal, new RegExp(`^urd_ghr=\\d+\\.${RENEWED};`));

  // A renewal with no sign-in cookie left (it went before the renewal) is renewed too.
  github({ live: ['ghu_new'] });
  assert.equal((await (await status(now() + 4 * 3600, { token: null })).json()).loggedIn, true);

  // The editor's own call renews; a link from another site, which the lax cookies come with, reads the sign-in as it stands and renews nothing.
  const own = github({ live: ['ghu_new'] });
  await status(now() + 60, { site: 'same-origin' });
  assert.equal(renewals(own).length, 1, 'the site itself renews');
  for (const site of ['cross-site', 'same-site']) {
    const linked = github({ live: ['ghu_old'] });
    const res = await status(now() + 60, { site });
    assert.equal(renewals(linked).length, 0, `${site}: nothing renewed`);
    assert.deepEqual(cookies(res), [], `${site}: no cookie written`);
  }
});

test('a refused renewal leaves the cookies alone and says so, so the editor asks again with what another tab was given', async () => {
  // Another tab renewed a moment before: the refresh token is spent and the old sign-in ended with it.
  github({ renewal: { error: 'bad_refresh_token' }, live: ['ghu_new'] });
  let res = await status(now() + 60);
  assert.deepEqual(await res.json(), { loggedIn: false, renewFailed: true });
  assert.deepEqual(cookies(res), [], 'the other tab\'s cookies are not expired');

  // GitHub could not renew but the sign-in still holds: it is used, and asked about again in a minute.
  github({ renewal: { error: 'unavailable' }, live: ['ghu_old'] });
  res = await status(now() + 60);
  const data = await res.json();
  assert.equal(data.loggedIn, true);
  assert.equal(data.renewIn, RENEW_LEAST);
  assert.deepEqual(cookies(res), []);
});

test('signing out renews a sign-in that can be renewed and revokes the new one, so neither cookie works when copied, and expires both', async () => {
  const request = (cookie) => new Request(`${ORIGIN}/api/github/logout`, { method: 'POST', headers: { cookie, 'sec-fetch-site': 'same-origin', 'content-type': 'application/json' }, body: '{}' });
  let seen = github();
  let res = await logout({ request: request(`urd_gh=ghu_old; urd_ghr=${now() + 3600}.${REFRESH}`), env: ENV });
  assert.equal(res.status, 200);
  assert.equal(renewals(seen).length, 1);
  assert.deepEqual(seen.calls.find((c) => c.method === 'DELETE').body, { access_token: 'ghu_new' });
  const [session, renewal] = cookies(res);
  assert.match(session, /^urd_gh=; Max-Age=0; Path=\/;/);
  assert.match(renewal, /^urd_ghr=; Max-Age=0; Path=\/api\/github;/);

  // A refused renewal: the sign-in the cookie holds is revoked as it stands.
  seen = github({ renewal: { error: 'bad_refresh_token' } });
  res = await logout({ request: request(`urd_gh=ghu_old; urd_ghr=${now() + 3600}.${REFRESH}`), env: ENV });
  assert.deepEqual(seen.calls.find((c) => c.method === 'DELETE').body, { access_token: 'ghu_old' });
  assert.equal(cookies(res).length, 2);
});

test('the editor asks for the sign-in at the planned moment, before its other calls when it opens with a renewal due, and before publishing or saving drafts, one call at a time', () => {
  const shell = readFileSync(new URL('../editor/src/state/shell.svelte.js', import.meta.url), 'utf8');
  const init = shell.slice(shell.indexOf('async function init()'));
  assert.match(init, /^async function init\(\) \{\n\s*(?:\/\/.*\n\s*)*const due = renewDue\(\);\n\s*const signedIn = checkAuth\(\);\n\s*if \(due\) await signedIn;/, 'a due renewal comes before the drafts, the plugins and the redirects are asked for');
  assert.ok(init.indexOf('if (due) await signedIn;') < init.indexOf('savedState.meetOnLoad()'));
  assert.match(shell, /planRenewal\(data\.renewIn\);/);
  assert.match(shell, /const wait = typeof seconds === 'number' && seconds > 0 \? Math\.min\(seconds, RENEW_LONGEST\) : 0;/, 'a far time never overflows the timer');
  assert.match(shell, /renewTimer = setTimeout\(\(\) => checkAuth\(\), wait \* 1000\);/);
  // Without an answer, or with the host down, the sign-in shown is kept: a computer waking before its network is back is not signed out.
  assert.match(shell, /if \(!data\) \{\s*if \(renewDue\(\)\) planRenewal\(60\);\s*return;\s*\}/);
  assert.match(shell, /else if \(res\.status < 500\) \{\s*auth = null;/);
  // One status call at a time: shared in the tab, and across tabs by a Web Lock where there is one.
  assert.match(shell, /asking \?\?= readStatus\(opts\)\.finally\(\(\) => \{ asking = null; \}\);/);
  assert.match(shell, /navigator\.locks\?\.request \? navigator\.locks\.request\('urd-sign-in', ask\) : ask\(\)/);
  assert.match(shell, /if \(event\.key === RENEW_KEY && event\.newValue && !auth\?\.loggedIn\) checkAuth\(\);/, 'a tab shown as signed out asks again when another tab renews');
  // The editor's lead before a publish or a save is the server's RENEW_SOON.
  assert.equal(Number(shell.match(/const RENEW_LEAD = (\d+) \* 60 \* 1000;/)[1]) * 60, RENEW_SOON);
  assert.match(shell, /if \(renewDue\(RENEW_LEAD\)\) await checkAuth\(\{ soon: true \}\);/);
  assert.match(shell, /const ask = \(\) => fetch\(soon \? '\/api\/github\/me\?soon=1' : '\/api\/github\/me'\);/);
  assert.match(shell, /if \(data\.renewFailed && !data\.loggedIn && !retried\) \{/);
  const publish = readFileSync(new URL('../editor/src/state/publish.svelte.js', import.meta.url), 'utf8');
  const once = publish.slice(publish.indexOf('async function publishOnce('));
  assert.ok(once.indexOf('await shellState.renewIfDue();') > 0 && once.indexOf('await shellState.renewIfDue();') < once.indexOf("fetch('/api/github/commit'"), 'publishing renews first');
  const saved = readFileSync(new URL('../editor/src/state/saved.svelte.js', import.meta.url), 'utf8');
  assert.match(saved, /async function save\([^)]*\) \{\s*if \(busy \|\| available === false\) return false;\s*busy = true;\s*try \{\s*\/\/[^\n]*\n\s*await shellState\.renewIfDue\(\);/, 'and so does a save of drafts, autosave and Ctrl+S included');
  // An update and a revert from History reach GitHub in several calls each, and renew first too.
  const update = readFileSync(new URL('../editor/src/panels/UpdatePanel.svelte', import.meta.url), 'utf8');
  assert.ok(update.indexOf('await ed.renewIfDue();') > 0 && update.indexOf('await ed.renewIfDue();') < update.indexOf("fetch('/api/github/update'"), 'an update renews first');
  const history = readFileSync(new URL('../editor/src/panels/HistoryPanel.svelte', import.meta.url), 'utf8');
  assert.ok(history.indexOf('await ed.renewIfDue();') > 0 && history.indexOf('await ed.renewIfDue();') < history.indexOf("fetch('/api/github/revert'"), 'a revert renews first');
});

test('every cookie the sign-in writes or ends is HttpOnly, Secure and SameSite=Lax, the token cookie urd_gh first of them', async () => {
  const attributes = (cookie) => cookie.split(/;\s*/).slice(1);
  const held = (cookie) => {
    const kept = attributes(cookie);
    assert.ok(kept.includes('HttpOnly'), cookie);
    assert.ok(kept.includes('Secure'), cookie);
    assert.ok(kept.includes('SameSite=Lax'), cookie);
  };
  held(serializeCookie('urd_gh', 'ghu_x'));
  held(expireCookie('urd_gh'));

  github({ signIn: { access_token: 'ghu_first', expires_in: 28800, refresh_token: REFRESH } });
  const signedIn = await callback({ request: new Request(`${ORIGIN}/api/github/callback?code=c1&state=s1`, { headers: { cookie: 'urd_state=s1' } }), env: ENV });
  const written = cookies(signedIn);
  assert.match(written.find((c) => c.startsWith('urd_gh=')), /^urd_gh=ghu_first;/);
  written.forEach(held);

  github({ signIn: { access_token: 'gho_lasting' } });
  const lasting = await callback({ request: new Request(`${ORIGIN}/api/github/callback?code=c1&state=s1`, { headers: { cookie: 'urd_state=s1' } }), env: ENV });
  cookies(lasting).forEach(held);

  const started = await login({ request: new Request(`${ORIGIN}/api/github/login`), env: ENV });
  cookies(started).forEach(held);

  github({ live: ['ghu_new'] });
  const renewed = await status(now() + 60);
  assert.ok(cookies(renewed).some((c) => c.startsWith('urd_gh=ghu_new;')));
  cookies(renewed).forEach(held);

  github();
  const ended = await logout({ request: new Request(`${ORIGIN}/api/github/logout`, { method: 'POST', headers: { cookie: `urd_gh=ghu_old; urd_ghr=${now() + 3600}.${REFRESH}`, 'sec-fetch-site': 'same-origin', 'content-type': 'application/json' }, body: '{}' }), env: ENV });
  cookies(ended).forEach(held);
});

test('only the sign-in status and signing out renew a sign-in: no other function imports or calls the renewal', () => {
  const root = new URL('../template/functions/', import.meta.url);
  const files = readdirSync(root, { recursive: true }).filter((name) => String(name).endsWith('.js')).map((name) => String(name).split(sep).join('/'));
  const source = (name) => readFileSync(new URL(name, root), 'utf8');
  const using = (pattern) => files.filter((name) => pattern.test(source(name))).sort();
  assert.deepEqual(using(/\brenewToken\b/), ['_lib/session.js', 'api/github/logout.js', 'api/github/me.js']);
  assert.deepEqual(using(/\breadRenewal\b/), ['_lib/session.js', 'api/github/logout.js', 'api/github/me.js'], 'the renewal cookie is read by those two alone');
  assert.deepEqual(using(/grant_type:\s*'refresh_token'/), ['_lib/session.js'], 'the refresh grant is asked for in one place');
  assert.deepEqual(using(/github\.com\/login\/oauth\/access_token/), ['_lib/session.js', 'api/github/callback.js'], 'beside it, only the sign-in trades a code for a token');
});
