/**
 * Contract tests for the share buttons' pure logic (shareUrl): the links are
 * static share URLs without tracking, everything is URL-encoded, and copying
 * is not a link. DOM rendering is tested manually (the test rounds).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { shareUrl, SHARE_SERVICES, shareBlock } = await engineImport('blocks/share.js');

const URL_EX = 'https://forening.no/side?a=1&b=2';
// Deliberate Norwegian title: plain fixture data (user site content).
const TITLE = 'Vår side & mer';

test('shareUrl: known services give https links with an encoded address', () => {
  for (const service of ['facebook', 'x', 'linkedin', 'whatsapp']) {
    const url = shareUrl(service, URL_EX, TITLE);
    assert.ok(url.startsWith('https://'), `${service} must be https`);
    assert.ok(url.includes(encodeURIComponent(URL_EX)), `${service} must carry the encoded address`);
    assert.ok(!url.includes('a=1&b=2'), `${service} must not leak the raw query`);
  }
});

test('shareUrl: email is mailto with subject and body', () => {
  const url = shareUrl('email', URL_EX, TITLE);
  assert.ok(url.startsWith('mailto:?subject='));
  assert.ok(url.includes(encodeURIComponent(TITLE)));
});

test('shareUrl: copying and an unknown service give null', () => {
  assert.equal(shareUrl('copy', URL_EX, TITLE), null);
  assert.equal(shareUrl('tuklet', URL_EX, TITLE), null);
});

test('SHARE_SERVICES and defaults share the service list', () => {
  const ids = SHARE_SERVICES.map(([id]) => id);
  assert.deepEqual(shareBlock.defaults().services, ids);
  assert.equal(shareBlock.version, 1);
});
