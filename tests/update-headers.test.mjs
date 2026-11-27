/**
 * The updater's plan for a site's `_headers` (functions/_lib/update-headers.js, ADR-0014 decision 5): written where unedited, the owner's additions carried over, by hand otherwise.
 * The update function's use of it is tested against a stand-in GitHub in update-plan.test.mjs.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { planHeaders, writesHeaders } from '../template/functions/_lib/update-headers.js';

const TEMPLATE = readFileSync(new URL('../template/_headers', import.meta.url), 'utf8');
const HSTS = '  Strict-Transport-Security: max-age=31536000\n';
/** The template's file as it stood before the HSTS line, an earlier release. */
const OLDER = TEMPLATE.replace(HSTS, '');
const PANEL = readFileSync(new URL('../editor/src/panels/UpdatePanel.svelte', import.meta.url), 'utf8');

/** A text with `find` replaced once, failing where it is not there exactly once. */
function edit(text, find, put) {
  assert.equal(text.split(find).length, 2, `the text holds ${find} once`);
  return text.replace(find, put);
}

test('the template holds the lines the cases below edit', () => {
  assert.ok(TEMPLATE.includes(HSTS));
  assert.match(TEMPLATE, /connect-src 'self' https:\/\/cloudflareinsights\.com;/);
});

test('a site file that is any release\'s own is written with the target\'s; one at the target is left', () => {
  assert.deepEqual(planHeaders({ site: OLDER, target: TEMPLATE, released: [TEMPLATE, OLDER] }), { state: 'unedited', text: TEMPLATE, added: [] });
  assert.deepEqual(planHeaders({ site: TEMPLATE, target: TEMPLATE, released: [TEMPLATE, OLDER] }), { state: 'current', text: null, added: [] });
  assert.equal(planHeaders({ site: OLDER, target: null, released: [OLDER] }).state, 'current', 'a target without the file offers nothing');
  for (const looks of [OLDER.replace(/\n/g, '\r\n'), `${OLDER}\n\n`, OLDER.replace(/\n$/, ''), OLDER.replace('X-Frame-Options: SAMEORIGIN', 'X-Frame-Options: SAMEORIGIN  ')]) {
    assert.deepEqual(planHeaders({ site: looks, target: TEMPLATE, released: [TEMPLATE, OLDER] }), { state: 'unedited', text: TEMPLATE, added: [] }, 'line ends and trailing spaces are no edit');
  }
});

test('hosts the owner added to a directive are carried into the target\'s file, with its own changes', () => {
  const site = edit(OLDER, "connect-src 'self' https://cloudflareinsights.com;", "connect-src 'self' https://cloudflareinsights.com https://script.google.com;");
  const plan = planHeaders({ site, target: TEMPLATE, released: [TEMPLATE, OLDER] });
  assert.equal(plan.state, 'added');
  assert.deepEqual(plan.added, ['connect-src https://script.google.com']);
  assert.equal(plan.text, edit(TEMPLATE, "connect-src 'self' https://cloudflareinsights.com;", "connect-src 'self' https://cloudflareinsights.com https://script.google.com;"),
    'the target\'s file, its HSTS line included, with the host in its place and every other byte kept');
  assert.equal(planHeaders({ site: plan.text, target: TEMPLATE, released: [TEMPLATE, OLDER] }).state, 'current', 'a site that already holds the target and its additions is left');
});

test('a directive or a header\'s words of the owner\'s own are carried over', () => {
  const site = edit(edit(TEMPLATE, "object-src 'none'", "object-src 'none'; worker-src https://cdn.example.org"), HSTS, '  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload\n');
  const target = edit(TEMPLATE, "base-uri 'self'", "base-uri 'none'");
  const plan = planHeaders({ site, target, released: [target, TEMPLATE] });
  assert.equal(plan.state, 'added');
  assert.deepEqual(plan.added, ['includeSubDomains', 'preload', 'worker-src https://cdn.example.org']);
  assert.ok(plan.text.includes("base-uri 'none'"), 'the target\'s change');
  assert.ok(plan.text.includes("object-src 'none'; worker-src https://cdn.example.org"));
  assert.ok(plan.text.includes('  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload\n'));
  const host = planHeaders({ site: edit(TEMPLATE, "frame-ancestors 'self';", "frame-ancestors 'self' https://partner.example.org;"), target, released: [target, TEMPLATE] });
  assert.ok(host.text.includes("frame-ancestors 'self' https://partner.example.org"), 'a host added where the target has the directive too');
});

test('anything but additions to header lines leaves the file to the owner, with the target\'s text to copy', () => {
  const cases = {
    'a host taken away': edit(OLDER, ' https://player.vimeo.com', ''),
    'a value changed': edit(OLDER, 'X-Frame-Options: SAMEORIGIN', 'X-Frame-Options: DENY'),
    'a directive taken away': edit(OLDER, "; object-src 'none'", ''),
    'a header of the owner\'s own': edit(OLDER, '  X-Content-Type-Options: nosniff\n', '  X-Content-Type-Options: nosniff\n  Permissions-Policy: camera=()\n'),
    'a rule of the owner\'s own': `${OLDER}\n/shop/*\n  X-Robots-Tag: noindex\n`,
    'a comment changed': edit(OLDER, '# Security headers for Cloudflare Pages.', '# Our headers.'),
    'a path rule changed': edit(OLDER, '/admin/*', '/editor/*'),
  };
  for (const [name, site] of Object.entries(cases)) {
    assert.deepEqual(planHeaders({ site, target: TEMPLATE, released: [TEMPLATE, OLDER] }), { state: 'edited', text: TEMPLATE, added: [] }, name);
  }
  assert.deepEqual(planHeaders({ site: null, target: TEMPLATE, released: [TEMPLATE] }), { state: 'edited', text: TEMPLATE, added: [] }, 'a site without the file');
});

test('the additions are measured against the release closest to the site\'s file, so what a later release took away is never kept as the owner\'s', () => {
  const FRAMES = " frame-src 'self' https://www.youtube-nocookie.com https://player.vimeo.com https://www.openstreetmap.org;";
  // A later release without the map's host, and the target after it, the same with a changed value.
  const tighter = edit(TEMPLATE, ' https://www.openstreetmap.org;', ';');
  const target = edit(tighter, "base-uri 'self'", "base-uri 'none'");
  const site = edit(TEMPLATE, 'https://www.openstreetmap.org;', 'https://www.openstreetmap.org https://maps.example.org;');
  const plan = planHeaders({ site, target, released: [target, tighter, TEMPLATE] });
  assert.equal(plan.state, 'added');
  assert.deepEqual(plan.added, ['frame-src https://maps.example.org'], 'the owner\'s host alone, though the file holds the host the release took away too');
  assert.equal(plan.text, edit(target, 'https://player.vimeo.com;', 'https://player.vimeo.com https://maps.example.org;'));

  // A target without the directive the owner added to: nothing fits, though the site's file reads as that target with a directive of its own.
  const dropped = edit(TEMPLATE, FRAMES, '');
  assert.deepEqual(planHeaders({ site, target: dropped, released: [dropped, TEMPLATE] }), { state: 'edited', text: dropped, added: [] }, 'left to the owner, never judged current');
  assert.equal(planHeaders({ site: TEMPLATE, target: dropped, released: [dropped, TEMPLATE] }).state, 'unedited', 'and an unedited file takes the tighter release');
});

test('what the browser left without effect in the site\'s file, an unread release and a tie between two closest releases are left to the owner', () => {
  const edited = (site, target = TEMPLATE, released = [TEMPLATE], complete = true) => planHeaders({ site, target, released, complete }).state;
  assert.equal(edited(edit(TEMPLATE, "object-src 'none'", "object-src 'none'; script-src https://cdn.example.org")), 'edited',
    'a directive named twice, whose second the browser ignores');
  const hashed = edit(TEMPLATE, "script-src 'self'", "script-src 'self' 'sha256-abc='");
  assert.equal(edited(edit(hashed, "'sha256-abc='", "'sha256-abc=' 'unsafe-inline'"), TEMPLATE, [hashed]), 'edited',
    "an 'unsafe-inline' a hash beside it leaves without effect");
  const tighter = edit(TEMPLATE, "base-uri 'self'", "base-uri 'none'");
  assert.equal(edited(edit(TEMPLATE, "script-src 'self'", "script-src 'self' 'unsafe-inline'"), tighter, [tighter, TEMPLATE]), 'added', "an 'unsafe-inline' of its own is carried over");
  const site = edit(TEMPLATE, "connect-src 'self'", "connect-src 'self' https://script.google.com");
  assert.equal(edited(site, TEMPLATE, [TEMPLATE], false), 'edited', 'a release not read may be the closest one');
  assert.equal(edited(TEMPLATE, edit(TEMPLATE, HSTS, ''), [TEMPLATE], false), 'unedited', 'an exact match is written all the same');
  // Two releases equally close, one with host A and one with host B where the site holds both.
  const withA = edit(TEMPLATE, "connect-src 'self'", "connect-src 'self' https://a.example.org");
  const withB = edit(TEMPLATE, "connect-src 'self'", "connect-src 'self' https://b.example.org");
  const both = edit(TEMPLATE, "connect-src 'self'", "connect-src 'self' https://a.example.org https://b.example.org");
  assert.equal(edited(both, TEMPLATE, [withB, withA]), 'edited', 'neither host is known for the owner\'s');
});

test('an addition is carried over only where it does in the new file what it did in the site\'s: the same policy directives, no gate source, one line', () => {
  const policy = (value) => `/*\n  Content-Security-Policy: ${value}\n`;
  const release = policy("default-src 'self'; script-src 'self'; style-src 'self'");
  const site = policy("default-src 'self' https://fonts.example.org; script-src 'self'; style-src 'self'");
  const plan = (target, mine = site, released = [release]) => planHeaders({ site: mine, target, released });
  assert.equal(plan(policy("default-src 'self'; style-src 'self'")).state, 'edited', 'a target without script-src would let the font host run scripts');
  assert.equal(plan(policy("default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'")).state, 'edited', 'a target with font-src would leave the font host without effect');
  assert.equal(plan(policy("default-src 'self'; script-src 'self' https://cdn.example.org; style-src 'self'")).state, 'added', 'the same directives with a host of the target\'s own');
  const dynamic = policy("default-src 'self'; script-src 'self' 'strict-dynamic'; style-src 'self'");
  assert.equal(plan(release, dynamic.replace("'strict-dynamic'", "'strict-dynamic' https://cdn.example.org"), [dynamic]).state, 'edited', "a host beside 'strict-dynamic', which counts for nothing there");
  assert.equal(plan(policy("default-src 'self'; script-src 'self' 'sha256-abc='; style-src 'self'"), policy("default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'")).state, 'edited',
    "an 'unsafe-inline' a hash in the target would leave without effect");
  const twice = `/*\n  Content-Security-Policy: default-src 'self'\n/*\n  Content-Security-Policy: default-src 'self'\n`;
  const target = `${twice}/admin/*\n  X-Robots-Tag: noindex\n`;
  assert.equal(plan(target, twice.replace(/'self'\n$/, "'self' https://cdn.example.org\n"), [twice]).state, 'edited', 'a line that stands twice, whose second the addition belongs to');
});

test('a site file that holds the target\'s words in another order, or with other line ends and trailing spaces, is current', () => {
  const reordered = edit(TEMPLATE, "img-src 'self' data: blob:", "img-src blob: 'self' data:");
  const added = edit(TEMPLATE, "connect-src 'self'", "connect-src https://script.google.com 'self'");
  const target = edit(TEMPLATE, "connect-src 'self' https://cloudflareinsights.com", "connect-src 'self' https://cloudflareinsights.com https://script.google.com");
  assert.equal(planHeaders({ site: added, target, released: [target, TEMPLATE] }).state, 'current', 'the target plus the site\'s own host, in its own order');
  for (const looks of [reordered, TEMPLATE.replace(/\n/g, '\r\n'), `${TEMPLATE}\n\n`, TEMPLATE.replace('X-Frame-Options: SAMEORIGIN', 'X-Frame-Options: SAMEORIGIN  ')]) {
    assert.equal(planHeaders({ site: looks, target: TEMPLATE, released: [TEMPLATE, OLDER] }).state, 'current');
  }
});

test('only the unedited and the added-to states write the file', () => {
  assert.deepEqual(['current', 'unedited', 'added', 'edited', undefined, null].map(writesHeaders), [false, true, true, false, false, false]);
});

test('the Updates panel lists _headers first among the optional files and offers it alone at the installed version', () => {
  assert.match(PANEL, /onchange=\{\(\) => toggleUpdateSkip\('_headers'\)\}/, 'the owner may keep their own file, as any optional file');
  assert.match(PANEL, /const withHeaders = headersWritten && !ed\.updateSkip\.has\('_headers'\);/, 'the update\'s question names the file');
  assert.match(PANEL, /skip: skipped, \.\.\.\(withHeaders \? \{ headers: headers\.text \} : \{\}\) \}/, 'the update sends the text the owner was shown, and the run writes only that');
  assert.match(PANEL, /body: JSON\.stringify\(\{ to: updateInfo\.target, expect: updateInfo\.head, headers: headers\.text \}\),/, 'the headers alone go through the same endpoint, at the installed version');
  const optional = PANEL.indexOf("<SubHeading text={ta('update.optionalTitle')} />");
  const card = PANEL.indexOf("onchange={() => toggleUpdateSkip('_headers')}");
  const rest = PANEL.indexOf('{#each updateInfo.changes.filter((c) => !c.atom) as c (c.path)}');
  assert.ok(optional > 0 && optional < card && card < rest, 'first among the optional files');
  assert.match(PANEL, /headers\?\.state \? \(headers\.state === 'edited' \? headers\.text : null\) : headers\?\.upstream \?\? null/,
    'an updater without the plan sends the template\'s text alone, which stays a step by hand');
});
