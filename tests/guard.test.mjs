/**
 * Test av publiserings-vernet: sti-allowlisten og ALLOWED_LOGINS.
 * Dette er sikkerhetskritisk kode (se ADR-0003): publisering skal aldri
 * kunne skrive kode eller konfigurasjon, kun innhold.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import {
  isAllowedPath, isAllowedLogin,
  OWNED_PATTERNS, USER_PATTERNS, matchesPattern, isOwnedPath, isUserPath, isPageIndexCopy,
} from '../template/functions/_lib/guard.js';

test('innholdsstier er tillatt', () => {
  for (const path of [
    'content/site.json',
    'content/pages/hjem.json',
    'content/maler/var-hero.json',
    'content/theme.css',
    'media/styret/leder.webp',
    'media/logo.svg',
    'media/foto.PNG',
    'media/undermappe/bilde.jpg',
    'plugins/plugins.json',
  ]) {
    assert.equal(isAllowedPath(path), true, path);
  }
});

test('kjørbare endelser under innholdsprefiksene er forbudt', () => {
  // Invarianten «aldri kode» gjelder også filtype: media/x.js ville
  // ellers kjørt under script-src 'self' fra en kapret publisher-økt.
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
  ]) {
    assert.equal(isAllowedPath(path), false, path);
  }
});

test('kode- og konfigstier er forbudt', () => {
  for (const path of [
    'functions/api/github/commit.js',
    'functions/evil.js',
    '.github/workflows/pwn.yml',
    'admin/assets/editor.js',
    'assets/engine/0.6.9/urd.js',
    'assets/urd/i18n.js',
    'urd.json',
    'index.html',
    '_headers',
    '_redirects',
    '.gitignore',
    'wrangler.toml',
    'plugins/kalender/index.js',
  ]) {
    assert.equal(isAllowedPath(path), false, path);
  }
});

test('side-index er tillatt, men aldri rot eller reserverte mapper', () => {
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
  // html er ikke en tillatt endelse under innholdsprefiksene, så en
  // index.html der avvises også (kun <slug>/index.html-kopier er lov).
  assert.equal(isAllowedPath('content/index.html'), false);
  assert.equal(isAllowedPath('media/index.html'), false);
});

test('stitriks avvises', () => {
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

test('ALLOWED_LOGINS: kommaseparert, case-ufølsom, tom liste nekter alle', () => {
  const env = { ALLOWED_LOGINS: 'Kari, ola-nordmann' };
  assert.equal(isAllowedLogin('kari', env), true);
  assert.equal(isAllowedLogin('OLA-NORDMANN', env), true);
  assert.equal(isAllowedLogin('fremmed', env), false);
  assert.equal(isAllowedLogin('kari', {}), false);
  assert.equal(isAllowedLogin('kari', { ALLOWED_LOGINS: '' }), false);
});

test('urd.json ownedPaths avvises av publiseringsvokteren (kontraktene i synk)', async () => {
  // guard.js er HÅNDHEVEREN; urd.json er den deklarative kontrakten oppdaterings-
  // mekanismen skal bruke (v0.6). Denne testen fanger drift mellom de to.
  const { readFile } = await import('node:fs/promises');
  const manifest = JSON.parse(await readFile(new URL('../template/urd.json', import.meta.url), 'utf8'));
  for (const pattern of manifest.ownedPaths) {
    const sample = pattern.endsWith('/**') ? `${pattern.slice(0, -3)}/x.js` : pattern;
    assert.equal(isAllowedPath(sample), false, `ownedPath '${pattern}' (prøvd som '${sample}') slapp gjennom vokteren`);
  }
});

test('per-side index.html-kopier tillates, reserverte slugs avvises', () => {
  assert.equal(isAllowedPath('kaker/index.html'), true);
  assert.equal(isAllowedPath('om-oss/index.html'), true);
  for (const path of ['admin/index.html', 'api/index.html', 'assets/index.html', 'functions/index.html', 'plugins/index.html']) {
    assert.equal(isAllowedPath(path), false, path);
  }
});

/* ---------- Eierskapskartet for oppdatereren (0.6.9, ADR-0014) ---------- */

const manifest = JSON.parse(readFileSync(new URL('../template/urd.json', import.meta.url), 'utf8'));

test('eierskapskartet i guard.js er identisk med urd.json', () => {
  // guard.js speiler urd.json (functions kan ikke lese repofiler ved
  // kjøring); denne testen er det som hindrer de to i å drive.
  assert.deepEqual(OWNED_PATTERNS, manifest.ownedPaths);
  assert.deepEqual(USER_PATTERNS, manifest.userPaths);
});

test('matchesPattern: eksakt sti og prefiks/**', () => {
  assert.equal(matchesPattern('urd.json', 'urd.json'), true);
  assert.equal(matchesPattern('urd.json', 'urd.json.bak'), false);
  assert.equal(matchesPattern('admin/**', 'admin/index.html'), true);
  assert.equal(matchesPattern('admin/**', 'admin/assets/editor.js'), true);
  assert.equal(matchesPattern('admin/**', 'administrasjon/x.js'), false);
  assert.equal(matchesPattern('admin/**', 'admin'), false);
});

test('isOwnedPath/isUserPath: eksempler og stitriks', () => {
  for (const path of ['urd.json', '_headers', 'speculation-rules.json', 'index.html',
    'admin/assets/editor.js', 'assets/engine/0.6.9/urd.js', 'assets/urd/i18n.js',
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
  assert.equal(isPageIndexCopy('index.html'), false);
});

test('hver faktiske fil i template/ er eid, brukereid eller side-kopi', () => {
  // Fullstendighets-invarianten oppdateringsplanen hviler på: en sti uten
  // klassifisering ville falt utenfor både publisering og oppdaterer.
  // Dukker en ny toppnivå-fil opp, MÅ den inn i urd.json (owned/user).
  const root = new URL('../template/', import.meta.url);
  const files = readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => `${entry.parentPath.replaceAll('\\', '/')}/${entry.name}`
      .slice(root.pathname.length)
      .replace(/^\/+/, ''))
    .filter((name) => !name.includes('/.') && !name.startsWith('.'));
  assert.ok(files.length > 80, `fant bare ${files.length} filer - listingen er trolig gal`);
  for (const path of files) {
    const classes = [isOwnedPath(path), isUserPath(path), isPageIndexCopy(path)].filter(Boolean);
    assert.equal(classes.length, 1, `${path} skal ha nøyaktig én eierskapsklasse (fikk ${classes.length})`);
  }
});

test('eid og publiserbar er disjunkte klasser', () => {
  // Publisering og oppdaterer skal aldri kunne skrive samme sti - unntatt
  // side-kopiene, som publisering skriver og oppdatereren frisker opp
  // (kopi-oppfriskningsplikten i ADR-0013).
  for (const pattern of manifest.ownedPaths) {
    const sample = pattern.endsWith('/**') ? `${pattern.slice(0, -3)}/x.js` : pattern;
    assert.equal(isOwnedPath(sample) && isAllowedPath(sample), false, sample);
  }
  for (const path of ['content/site.json', 'media/logo.webp', 'plugins/plugins.json', 'kaker/index.html']) {
    assert.equal(isOwnedPath(path), false, path);
  }
});
