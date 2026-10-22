/**
 * Test of the publishing guard: the path allowlist and ALLOWED_LOGINS.
 * This is security-critical code (see ADR-0003): publishing must never
 * be able to write code or configuration, only content.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import {
  isAllowedPath, isAllowedContent, MEDIA_PDF_MAX_BYTES, isDeletablePath, isAllowedLogin,
  OWNED_PATTERNS, USER_PATTERNS, matchesPattern, isOwnedPath, isUserPath, isPageIndexCopy,
} from '../template/functions/_lib/guard.js';

// Norwegian path segments below (maler, samlinger, om-oss, ...) are
// deliberate: user-repo paths are user data and keep their names (ADR-0021).

test('content paths are allowed', () => {
  for (const path of [
    'content/site.json',
    'content/pages/hjem.json',
    'content/maler/var-hero.json',
    'content/theme.css',
    'content/samlinger/nyheter.xml',
    'media/styret/leder.webp',
    'media/logo.svg',
    'media/foto.PNG',
    'media/undermappe/bilde.jpg',
    'media/lyd-1a2b3c4d.mp3',
    'media/musikk.m4a',
    'media/video-9f8e7d6c.mp4',
    'media/loop.webm',
    'media/meny-1a2b3c4d.pdf',
    'plugins/plugins.json',
    'sitemap.xml',
    'robots.txt',
  ]) {
    assert.equal(isAllowedPath(path), true, path);
  }
});

test('a PDF in media/ is written only when it starts as a PDF and stays within the limit', () => {
  const pdf = 'JVBERi0xLjcKJcfsj6IK';
  assert.equal(isAllowedContent('media/meny-1a2b3c4d.pdf', pdf, 'base64'), true);
  assert.equal(isAllowedContent('media/MENY.PDF', pdf, 'base64'), true);
  assert.equal(isAllowedContent('media/meny.pdf', btoa('<html><script>alert(1)</script>'), 'base64'), false, 'HTML named .pdf');
  assert.equal(isAllowedContent('media/meny.pdf', '%PDF-1.7', 'utf-8'), false, 'a PDF is sent as base64');
  assert.equal(isAllowedContent('media/meny.pdf', null, 'base64'), false);
  const limit = Math.floor((MEDIA_PDF_MAX_BYTES * 4) / 3);
  assert.equal(isAllowedContent('media/stor.pdf', pdf + 'A'.repeat(limit - pdf.length), 'base64'), true, 'at the limit');
  assert.equal(isAllowedContent('media/stor.pdf', pdf + 'A'.repeat(limit + 8 - pdf.length), 'base64'), false, 'over it');
  for (const other of ['media/bilde.webp', 'content/site.json', 'media/meny.pdf.json']) assert.equal(isAllowedContent(other, 'x', 'utf-8'), true, other);
});

test('executable extensions under the content prefixes are forbidden', () => {
  // The "never code" invariant also applies to file type: media/x.js would
  // otherwise run under script-src 'self' from a hijacked publisher session.
  for (const path of [
    'media/x.js',
    'media/X.JS',
    'media/x.mjs',
    'media/x.html',
    'media/x.htm',
    'media/x.svg.js',
    'media/x.webmanifest',
    'media/uten-endelse',
    'media/.dotfil',
    'content/evil.js',
    'content/x.html',
    'media/x.xml',
    'annet.xml',
    'feed.txt',
  ]) {
    assert.equal(isAllowedPath(path), false, path);
  }
});

test('code and config paths are forbidden', () => {
  for (const path of [
    'functions/api/github/commit.js',
    'functions/evil.js',
    '.github/workflows/pwn.yml',
    'admin/assets/editor.js',
    'assets/engine/0.6.10/urd.js',
    'assets/urd/i18n.js',
    'urd.json',
    'index.html',
    '404.html',
    '_headers',
    '_redirects',
    '.gitignore',
    'wrangler.toml',
    'plugins/kalender/index.js',
  ]) {
    assert.equal(isAllowedPath(path), false, path);
  }
});

test('a plugin\'s whole folder may be deleted, never written in, and nothing else is opened for deletion', () => {
  for (const path of ['plugins/lang-sv', 'plugins/kalender', 'plugins/my-plugin-2']) {
    assert.equal(isDeletablePath(path), true, path);
    assert.equal(isAllowedPath(path), false, path);
  }
  // A path publishing may write it may also delete.
  for (const path of ['content/pages/hjem.json', 'media/bilde.webp', 'plugins/plugins.json']) {
    assert.equal(isDeletablePath(path), true, path);
  }
  for (const path of [
    'plugins',
    'plugins/',
    'plugins/lang-sv/',
    'plugins/lang-sv/plugin.json',
    'plugins/lang-sv/locales/admin/sv.js',
    'plugins/Lang-SV',
    'plugins/-x',
    'plugins/../functions',
    '/plugins/lang-sv',
    'functions/api',
    'assets/engine/0.7.6',
    'admin',
  ]) {
    assert.equal(isDeletablePath(path), false, path);
  }
});

test('page index is allowed, but never the root or reserved directories', () => {
  for (const path of ['om-oss/index.html', 'kontakt/index.html', 'side-2/index.html']) {
    assert.equal(isAllowedPath(path), true, path);
  }
  for (const path of [
    'index.html',
    'admin/index.html',
    'api/index.html',
    'assets/index.html',
    'functions/index.html',
    'plugins/index.html',
    'om-oss/undermappe/index.html',
    'Om-Oss/index.html',
    '-slug/index.html',
    'om-oss/evil.html',
  ]) {
    assert.equal(isAllowedPath(path), false, path);
  }
  // html is not an allowed extension under the content prefixes, so an
  // index.html there is also rejected (only <slug>/index.html copies are legal).
  assert.equal(isAllowedPath('content/index.html'), false);
  assert.equal(isAllowedPath('media/index.html'), false);
});

test('path tricks are rejected', () => {
  for (const path of [
    'content/../functions/evil.js',
    '/content/site.json',
    'content\\..\\functions\\evil.js',
    '',
    '..',
  ]) {
    assert.equal(isAllowedPath(path), false, JSON.stringify(path));
  }
});

test('ALLOWED_LOGINS: comma-separated, case-insensitive, empty list denies everyone', () => {
  const env = { ALLOWED_LOGINS: 'Kari, ola-nordmann' };
  assert.equal(isAllowedLogin('kari', env), true);
  assert.equal(isAllowedLogin('OLA-NORDMANN', env), true);
  assert.equal(isAllowedLogin('fremmed', env), false);
  assert.equal(isAllowedLogin('kari', {}), false);
  assert.equal(isAllowedLogin('kari', { ALLOWED_LOGINS: '' }), false);
});

test('urd.json ownedPaths are rejected by the publishing guard (contracts in sync)', async () => {
  // guard.js is the ENFORCER; urd.json is the declarative contract the update
  // mechanism uses (v0.6). This test catches drift between the two.
  const { readFile } = await import('node:fs/promises');
  const manifest = JSON.parse(await readFile(new URL('../template/urd.json', import.meta.url), 'utf8'));
  for (const pattern of manifest.ownedPaths) {
    const sample = pattern.endsWith('/**') ? `${pattern.slice(0, -3)}/x.js` : pattern;
    assert.equal(isAllowedPath(sample), false, `ownedPath '${pattern}' (tried as '${sample}') slipped past the guard`);
  }
});

test('per-page index.html copies are allowed, reserved slugs are rejected', () => {
  assert.equal(isAllowedPath('kaker/index.html'), true);
  assert.equal(isAllowedPath('om-oss/index.html'), true);
  for (const path of ['admin/index.html', 'api/index.html', 'assets/index.html', 'functions/index.html', 'plugins/index.html', 'readme/index.html']) {
    assert.equal(isAllowedPath(path), false, path);
  }
});

/* ---------- The ownership map for the updater (0.6.9, ADR-0014) ---------- */

const manifest = JSON.parse(readFileSync(new URL('../template/urd.json', import.meta.url), 'utf8'));

test('the ownership map in guard.js is identical to urd.json', () => {
  // guard.js mirrors urd.json (functions cannot read repo files at
  // runtime); this test is what keeps the two from drifting.
  assert.deepEqual(OWNED_PATTERNS, manifest.ownedPaths);
  assert.deepEqual(USER_PATTERNS, manifest.userPaths);
});

test('matchesPattern: exact path and prefix/**', () => {
  assert.equal(matchesPattern('urd.json', 'urd.json'), true);
  assert.equal(matchesPattern('urd.json', 'urd.json.bak'), false);
  assert.equal(matchesPattern('admin/**', 'admin/index.html'), true);
  assert.equal(matchesPattern('admin/**', 'admin/assets/editor.js'), true);
  assert.equal(matchesPattern('admin/**', 'administrasjon/x.js'), false);
  assert.equal(matchesPattern('admin/**', 'admin'), false);
});

test('isOwnedPath/isUserPath: examples and path tricks', () => {
  for (const path of ['urd.json', '_headers', 'speculation-rules.json', 'dev-server.py', 'index.html',
    'admin/assets/editor.js', 'assets/engine/0.6.10/urd.js', 'assets/urd/i18n.js',
    'assets/styles/base.css', 'functions/api/github/update.js']) {
    assert.equal(isOwnedPath(path), true, path);
    assert.equal(isUserPath(path), false, path);
  }
  for (const path of ['content/site.json', 'media/logo.svg', 'plugins/kalender/index.js']) {
    assert.equal(isUserPath(path), true, path);
    assert.equal(isOwnedPath(path), false, path);
  }
  for (const path of ['/urd.json', 'admin/../content/x.json', '']) {
    assert.equal(isOwnedPath(path), false, JSON.stringify(path));
    assert.equal(isUserPath(path), false, JSON.stringify(path));
  }
  assert.equal(isPageIndexCopy('kaker/index.html'), true);
  assert.equal(isPageIndexCopy('admin/index.html'), false);
  assert.equal(isPageIndexCopy('readme/index.html'), false);
  assert.equal(isPageIndexCopy('index.html'), false);
});

test('every actual file in template/ is owned, user-owned or a page copy', () => {
  // The completeness invariant the update plan rests on: a path without a
  // classification would fall outside both publishing and the updater.
  // If a new top-level file appears, it MUST go into urd.json (owned/user).
  const root = new URL('../template/', import.meta.url);
  const files = readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => `${entry.parentPath.replaceAll('\\', '/')}/${entry.name}`
      .slice(root.pathname.length)
      .replace(/^\/+/, ''))
    .filter((name) => !name.includes('/.') && !name.startsWith('.'));
  assert.ok(files.length > 80, `found only ${files.length} files - the listing is probably wrong`);
  for (const path of files) {
    const classes = [isOwnedPath(path), isUserPath(path), isPageIndexCopy(path)].filter(Boolean);
    assert.equal(classes.length, 1, `${path} must have exactly one ownership class (got ${classes.length})`);
  }
});

test('owned and publishable are disjoint classes', () => {
  // Publishing and the updater must never be able to write the same path -
  // except the page copies, which publishing writes and the updater
  // refreshes (the copy refresh duty in ADR-0013).
  for (const pattern of manifest.ownedPaths) {
    const sample = pattern.endsWith('/**') ? `${pattern.slice(0, -3)}/x.js` : pattern;
    assert.equal(isOwnedPath(sample) && isAllowedPath(sample), false, sample);
  }
  for (const path of ['content/site.json', 'media/logo.webp', 'plugins/plugins.json', 'kaker/index.html']) {
    assert.equal(isOwnedPath(path), false, path);
  }
});
