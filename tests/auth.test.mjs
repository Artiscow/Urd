/**
 * The CSRF protection in the auth prologue (functions/_lib/auth.js):
 * Sec-Fetch-Site is the primary signal, Origin is the fallback, and safe
 * methods always pass. This is security-critical code (ADR-0003): a
 * publishing session must never be abusable from a foreign site.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isCrossOrigin } from '../template/functions/_lib/auth.js';

const URL_OWN = 'https://minside.pages.dev/api/github/commit';
/** @param {object} over */
const req = (over) => ({ secFetchSite: null, origin: null, url: URL_OWN, ...over });

test('GET is judged too: the update check uses the owner token', () => {
  assert.equal(isCrossOrigin({ secFetchSite: 'cross-site', origin: null, url: URL_OWN }), true);
  assert.equal(isCrossOrigin({ secFetchSite: 'same-origin', origin: null, url: URL_OWN }), false);
});

test('Sec-Fetch-Site: own site and the user\'s own navigation pass', () => {
  assert.equal(isCrossOrigin(req({ secFetchSite: 'same-origin' })), false);
  assert.equal(isCrossOrigin(req({ secFetchSite: 'none' })), false);
});

test('Sec-Fetch-Site: a foreign site is rejected, even a neighbour on the same registrable domain', () => {
  assert.equal(isCrossOrigin(req({ secFetchSite: 'cross-site' })), true);
  // *.pages.dev is shared with other sites; same-site is therefore not trust.
  assert.equal(isCrossOrigin(req({ secFetchSite: 'same-site' })), true);
});

test('Sec-Fetch-Site wins over Origin when both are present', () => {
  assert.equal(isCrossOrigin(req({ secFetchSite: 'same-origin', origin: 'https://ond.no' })), false);
  assert.equal(isCrossOrigin(req({ secFetchSite: 'cross-site', origin: 'https://minside.pages.dev' })), true);
});

test('Origin is the fallback when Sec-Fetch-Site is missing', () => {
  assert.equal(isCrossOrigin(req({ origin: 'https://minside.pages.dev' })), false);
  assert.equal(isCrossOrigin(req({ origin: 'https://ond.no' })), true);
  // Same host, different scheme or port is a different origin.
  assert.equal(isCrossOrigin(req({ origin: 'http://minside.pages.dev' })), true);
  assert.equal(isCrossOrigin(req({ origin: 'https://minside.pages.dev:8443' })), true);
  // Substring trick: the host must match exactly.
  assert.equal(isCrossOrigin(req({ origin: 'https://minside.pages.dev.ond.no' })), true);
});

test('without both headers the call passes (not a browser after 2020)', () => {
  assert.equal(isCrossOrigin(req({})), false);
});
