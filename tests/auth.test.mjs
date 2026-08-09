/**
 * CSRF-vernet i auth-prologen (functions/_lib/auth.js): Sec-Fetch-Site er
 * primærsignalet, Origin er reserve, og trygge metoder slipper alltid gjennom.
 * Dette er sikkerhetskritisk kode (ADR-0003): en publiseringssesjon skal aldri
 * kunne misbrukes fra et fremmed nettsted.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isCrossOrigin } from '../template/functions/_lib/auth.js';

const URL_OWN = 'https://minside.pages.dev/api/github/commit';
/** @param {object} over */
const req = (over) => ({ secFetchSite: null, origin: null, url: URL_OWN, ...over });

test('også GET vurderes: oppdaterings-sjekken bruker eierens token', () => {
  assert.equal(isCrossOrigin({ secFetchSite: 'cross-site', origin: null, url: URL_OWN }), true);
  assert.equal(isCrossOrigin({ secFetchSite: 'same-origin', origin: null, url: URL_OWN }), false);
});

test('Sec-Fetch-Site: egen side og brukerens egen navigasjon slippes gjennom', () => {
  assert.equal(isCrossOrigin(req({ secFetchSite: 'same-origin' })), false);
  assert.equal(isCrossOrigin(req({ secFetchSite: 'none' })), false);
});

test('Sec-Fetch-Site: fremmed side avvises, også nabo på samme registrerbare domene', () => {
  assert.equal(isCrossOrigin(req({ secFetchSite: 'cross-site' })), true);
  // *.pages.dev deles med andre sider; same-site er derfor ikke tillit.
  assert.equal(isCrossOrigin(req({ secFetchSite: 'same-site' })), true);
});

test('Sec-Fetch-Site vinner over Origin når begge finnes', () => {
  assert.equal(isCrossOrigin(req({ secFetchSite: 'same-origin', origin: 'https://ond.no' })), false);
  assert.equal(isCrossOrigin(req({ secFetchSite: 'cross-site', origin: 'https://minside.pages.dev' })), true);
});

test('Origin er reserve når Sec-Fetch-Site mangler', () => {
  assert.equal(isCrossOrigin(req({ origin: 'https://minside.pages.dev' })), false);
  assert.equal(isCrossOrigin(req({ origin: 'https://ond.no' })), true);
  // Samme vert, annet skjema eller port er en annen opprinnelse.
  assert.equal(isCrossOrigin(req({ origin: 'http://minside.pages.dev' })), true);
  assert.equal(isCrossOrigin(req({ origin: 'https://minside.pages.dev:8443' })), true);
  // Delstreng-triks: verten må matche eksakt.
  assert.equal(isCrossOrigin(req({ origin: 'https://minside.pages.dev.ond.no' })), true);
});

test('uten begge headerne slippes kallet gjennom (ikke en nettleser etter 2020)', () => {
  assert.equal(isCrossOrigin(req({})), false);
});
