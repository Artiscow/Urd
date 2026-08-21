/**
 * Kontraktstester for delingsknappenes rene logikk (shareUrl): lenkene er
 * statiske delings-URL-er uten sporing, alt URL-encodes, og kopiering er
 * ingen lenke. DOM-rendering testes manuelt (testrundene).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { shareUrl, SHARE_SERVICES, delingBlock } = await engineImport('blocks/deling.js');

const URL_EX = 'https://forening.no/side?a=1&b=2';
const TITLE = 'Vår side & mer';

test('shareUrl: kjente tjenester gir https-lenker med encodet adresse', () => {
  for (const service of ['facebook', 'x', 'linkedin', 'whatsapp']) {
    const url = shareUrl(service, URL_EX, TITLE);
    assert.ok(url.startsWith('https://'), `${service} skal være https`);
    assert.ok(url.includes(encodeURIComponent(URL_EX)), `${service} skal bære encodet adresse`);
    assert.ok(!url.includes('a=1&b=2'), `${service} skal ikke lekke rå query`);
  }
});

test('shareUrl: e-post er mailto med emne og kropp', () => {
  const url = shareUrl('email', URL_EX, TITLE);
  assert.ok(url.startsWith('mailto:?subject='));
  assert.ok(url.includes(encodeURIComponent(TITLE)));
});

test('shareUrl: kopiering og ukjent tjeneste gir null', () => {
  assert.equal(shareUrl('copy', URL_EX, TITLE), null);
  assert.equal(shareUrl('tuklet', URL_EX, TITLE), null);
});

test('SHARE_SERVICES og defaults deler tjenestelisten', () => {
  const ids = SHARE_SERVICES.map(([id]) => id);
  assert.deepEqual(delingBlock.defaults().services, ids);
  assert.equal(delingBlock.version, 1);
});
