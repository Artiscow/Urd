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
    'plugins/eksempel-kalender/index.js',
  ]) {
    assert.equal(isAllowedPath(path), false, path);
  }
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
