/**
 * Test av publiserings-vernet: sti-allowlisten og ALLOWED_LOGINS.
 * Dette er sikkerhetskritisk kode (se ADR-0003): publisering skal aldri
 * kunne skrive kode eller konfigurasjon, kun innhold.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isAllowedPath, isAllowedLogin } from '../template/functions/_lib/guard.js';

test('innholdsstier er tillatt', () => {
  for (const path of [
    'content/site.json',
    'content/pages/hjem.json',
    'content/maler/var-hero.json',
    'media/styret/leder.webp',
    'plugins/plugins.json',
  ]) {
    assert.equal(isAllowedPath(path), true, path);
  }
});

test('kode- og konfigstier er forbudt', () => {
  for (const path of [
    'functions/api/github/commit.js',
    'functions/evil.js',
    '.github/workflows/pwn.yml',
    'admin/assets/editor.js',
    'assets/engine/urd.js',
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
  // content/ og media/ dekkes av allow-prefiksene og er greie også for index.html
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
  // Kun kode-/system-slugs skal avvises; media/ og content/ er bruker-stier der
  // alt innhold er skrivbart uansett (en index.html der er harmløs brukerdata).
  for (const path of ['admin/index.html', 'api/index.html', 'assets/index.html', 'functions/index.html', 'plugins/index.html']) {
    assert.equal(isAllowedPath(path), false, path);
  }
});
