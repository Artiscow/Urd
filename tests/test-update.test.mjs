/**
 * The test update the Updates panel shows on the local server (editor/src/lib/test-update.js): an update check's answer made from the site's own files.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TEST_CASES, testUpdate, nextVersion, runsLocally } from '../editor/src/lib/test-update.js';
import { planHeaders } from '../template/functions/_lib/update-headers.js';

const HEADERS = readFileSync(new URL('../template/_headers', import.meta.url), 'utf8');
const SITE = { engine: '0.7.12', headers: HEADERS, notes: 'Notes', name: 'Test update', now: new Date('2026-11-27T12:00:00Z') };
const UPDATER = readFileSync(new URL('../editor/src/state/updater.svelte.js', import.meta.url), 'utf8');
const PANEL = readFileSync(new URL('../editor/src/panels/UpdatePanel.svelte', import.meta.url), 'utf8');

test('the next version is the engine\'s with its last number one higher', () => {
  assert.equal(nextVersion('0.7.12'), '0.7.13');
  assert.equal(nextVersion('0.7.6.2'), '0.7.6.3');
  assert.equal(nextVersion(undefined), '0.0.1');
});

test('each case answers as the update check does, and the headers are what the real plan gives for the same files', () => {
  assert.deepEqual(TEST_CASES, ['update', 'byHand', 'headers']);
  const update = testUpdate('update', SITE);
  assert.equal(update.test, true);
  assert.deepEqual([update.current, update.target, update.upToDate], ['0.7.12', 'v0.7.13', false]);
  assert.deepEqual(update.release, { name: 'Test update', url: null, date: '2026-11-27T12:00:00.000Z' });
  assert.ok(update.changes.some((c) => c.atom) && update.changes.some((c) => !c.atom), 'engine files and an optional file');
  const { headers } = update;
  assert.equal(headers.state, 'added');
  const plan = planHeaders({ site: headers.site, target: HEADERS, released: [HEADERS, headers.from] });
  assert.deepEqual({ state: plan.state, text: plan.text, added: plan.added }, { state: headers.state, text: headers.text, added: headers.added });

  const byHand = testUpdate('byHand', SITE).headers;
  assert.equal(planHeaders({ site: byHand.site, target: byHand.text, released: [byHand.text, byHand.from] }).state, 'edited');
  assert.match(byHand.site, /Permissions-Policy: camera=\(\)/);

  const alone = testUpdate('headers', SITE);
  assert.deepEqual([alone.target, alone.upToDate, alone.headers.state], ['v0.7.12', true, 'unedited']);
  assert.equal(planHeaders({ site: alone.headers.site, target: alone.headers.text, released: [alone.headers.text, alone.headers.site] }).state, 'unedited');
});

test('a site whose _headers lacks the HTTPS rule, or a policy, still gets a test update with a change', () => {
  const bare = '/*\n  X-Frame-Options: SAMEORIGIN\n';
  const update = testUpdate('update', { ...SITE, headers: bare });
  assert.equal(update.headers.state, 'unedited', 'no policy to add a host to');
  assert.match(update.headers.text, /Strict-Transport-Security: max-age=31536000/);
  assert.doesNotMatch(update.headers.site, /Strict-Transport-Security/);
  assert.match(testUpdate('update', { ...SITE, headers: '' }).headers.text, /^\/\*\n {2}Strict-Transport-Security/m);
});

test('a check with no function runs locally where the local server marks its answer, or on this machine\'s own name', () => {
  assert.equal(runsLocally(404, '1', 'lan-box.local'), true, 'the mark, also when shared on the network');
  for (const name of ['localhost', '127.0.0.1', '[::1]', 'LOCALHOST']) assert.equal(runsLocally(404, null, name), true, `an older local server at ${name}`);
  assert.equal(runsLocally(404, null, 'example.pages.dev'), false, 'a published site with a function missing gets its error');
  assert.equal(runsLocally(502, '1', 'localhost'), false, 'a function that answers is the real check');
  assert.equal(runsLocally(200, null, 'localhost'), false, 'Wrangler on this machine runs the functions');
});

test('the admin shows the test update where the check runs locally, and its runs write nothing', () => {
  assert.match(UPDATER, /runsLocally\(res\.status, res\.headers\.get\('x-urd-local'\), location\.hostname\) \? await localTestUpdate\(\)/);
  assert.equal(PANEL.match(/if \(updateInfo\.test\) \{\s*setStatus\(ta\('update\.test\.wrote'\), 'ok'\);\s*return;\s*\}/g)?.length, 2, 'neither the update nor the headers alone posts');
  assert.match(PANEL, /const mayUpdate = \$derived\(Boolean\(auth\?\.allowed \|\| updateInfo\?\.test\)\);/, 'its buttons answer without a sign-in, which the local server cannot give');
  for (const run of ['async function runUpdate()', 'async function runHeaders()']) {
    const body = PANEL.slice(PANEL.indexOf(run));
    assert.ok(body.indexOf('if (updateInfo.test) {') < body.indexOf("fetch('/api/github/update'"), `${run} leaves before it posts`);
    assert.ok(body.indexOf('if (updateInfo.test) {') < body.indexOf('ed.renewIfDue()'), `${run} leaves before it renews a sign-in`);
  }
  assert.match(UPDATER, /const updateAvailable = \$derived\(Boolean\(updateInfo && !updateInfo\.upToDate && !updateInfo\.test\)\);/, 'the made-up version is never told as a new Urd outside the panel');
  assert.match(UPDATER, /updateInfo\?\.upToDate && !updateInfo\.test &&/, 'nor its headers');
});

test('the panel reads the headers in words only where the check sent the site\'s file and its release, and offers the steps by hand only where there are some', () => {
  assert.match(PANEL, /const headersWorded = \$derived\(typeof headers\?\.site === 'string' && typeof headers\?\.from === 'string'\);/);
  assert.match(PANEL, /const handNeeded = \$derived\(Boolean\(headersByHand\) && \(!headersWorded \|\| handEdits\(headers\.from, headers\.text, headers\.site\)\.length > 0\)\);/);
  const window = readFileSync(new URL('../editor/src/panels/update/HeadersWindow.svelte', import.meta.url), 'utf8');
  assert.match(window, /const worded = \$derived\(typeof headers\.site === 'string' && typeof headers\.from === 'string'\);/);
  assert.match(window, /const changes = \$derived\(!worded \? \[\] :/, 'an updater that sends the file alone gets no change lines, which would call every rule new');
  assert.match(window, /const edits = \$derived\(worded && byHand \? handEdits\(/);
});
