/**
 * The QR code encoder (engine/qr.js): the version chosen for a text, the function patterns, the format bits both copies carry, and fixed symbols on every level pinned by their hashes so a change to the encoding shows.
 * The symbols were read back by an independent decoder across all four levels and versions 1 to 40 when the encoder was written (20 and 21 October 2026).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { engineImport } from './_engine.mjs';

const { qrMatrix, qrSvgPath } = await engineImport('qr.js');

const versionOf = (m) => (m.length - 17) / 4;

test('the smallest version that holds the text, at each level', () => {
  // Byte capacities: version 1 holds 17, 14, 11 and 7 bytes at L, M, Q and H; version 2 holds 32, 26, 20 and 14.
  for (const [level, v1, v2] of [['L', 17, 32], ['M', 14, 26], ['Q', 11, 20], ['H', 7, 14]]) {
    assert.equal(versionOf(qrMatrix('a'.repeat(v1), level)), 1, `${level} ${v1}`);
    assert.equal(versionOf(qrMatrix('a'.repeat(v1 + 1), level)), 2, `${level} ${v1 + 1}`);
    assert.equal(versionOf(qrMatrix('a'.repeat(v2), level)), 2, `${level} ${v2}`);
    assert.equal(versionOf(qrMatrix('a'.repeat(v2 + 1), level)), 3, `${level} ${v2 + 1}`);
  }
  assert.equal(versionOf(qrMatrix('æ'.repeat(7))), 1, 'UTF-8: fourteen bytes');
  assert.equal(versionOf(qrMatrix('æ'.repeat(8))), 2);
  assert.equal(qrMatrix('x'.repeat(2400)), null, 'more than version 40 holds');
});

test('the finder, timing and dark-module patterns stand where the standard puts them', () => {
  const m = qrMatrix('https://urd.example/kontakt/');
  const n = m.length;
  const finder = (x0, y0) => {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const ring = Math.max(Math.abs(x - 3), Math.abs(y - 3));
        assert.equal(m[y0 + y][x0 + x], ring !== 2, `finder at ${x0},${y0}: ${x},${y}`);
      }
    }
  };
  finder(0, 0);
  finder(n - 7, 0);
  finder(0, n - 7);
  for (let i = 8; i < n - 8; i++) {
    assert.equal(m[6][i], i % 2 === 0, `timing row ${i}`);
    assert.equal(m[i][6], i % 2 === 0, `timing column ${i}`);
  }
  assert.equal(m[n - 8][8], true, 'the dark module');
});

test('both copies of the format bits carry level M and one mask, with a valid BCH code', () => {
  const m = qrMatrix('Apeiron Linjeforening, Høgskoleringen 5');
  const n = m.length;
  const first = [];
  for (let i = 0; i <= 5; i++) first.push(m[i][8]);
  first.push(m[7][8], m[8][8], m[8][7]);
  for (let i = 9; i < 15; i++) first.push(m[8][14 - i]);
  const second = [];
  for (let i = 0; i < 8; i++) second.push(m[8][n - 1 - i]);
  for (let i = 8; i < 15; i++) second.push(m[n - 15 + i][8]);
  const value = (bits) => bits.reduce((acc, bit, i) => acc | ((bit ? 1 : 0) << i), 0);
  assert.equal(value(first), value(second));
  const raw = value(first) ^ 0x5412;
  assert.equal(raw >> 13, 0, 'level M has the bits 00');
  let rem = raw >> 10;
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >> 9) * 0x537);
  assert.equal(rem & 0x3ff, raw & 0x3ff, 'the BCH remainder matches');
});

/** A symbol's modules as one hash, so a change to the encoding shows. */
const symbolHash = (m) => createHash('sha256').update(m.map((row) => row.map((dark) => (dark ? '1' : '0')).join('')).join('\n')).digest('hex').slice(0, 16);

test('fixed texts give the same symbols on every level, with version bits and several blocks', () => {
  // Each pinned symbol was read back by an independent decoder when it was pinned (21 October 2026).
  const card = qrMatrix('BEGIN:VCARD\r\nVERSION:3.0\r\nN:;;;;\r\nFN:Apeiron\r\nTEL:+4740000000\r\nEND:VCARD\r\n');
  assert.equal(versionOf(card), 5);
  assert.equal(symbolHash(card), 'd29c6d4990d04a35');
  const low = qrMatrix('Urd '.repeat(75), 'L');
  assert.equal(versionOf(low), 11, 'level L: version bits and four blocks');
  assert.equal(symbolHash(low), 'c7490d9d147eaa89');
  const high = qrMatrix('Urd '.repeat(75), 'H');
  assert.equal(versionOf(high), 18, 'level H: short and long blocks interleaved');
  assert.equal(symbolHash(high), '98802582f6bccba4');
  const largest = qrMatrix('a'.repeat(2331), 'M');
  assert.equal(versionOf(largest), 40, 'the most version 40 holds at level M');
  assert.equal(symbolHash(largest), '233dc26632b8135d');
  assert.equal(qrMatrix('a'.repeat(2332), 'M'), null);
});

test('the SVG path draws each horizontal run as one rectangle', () => {
  assert.equal(qrSvgPath([[true, true, false, true], [false, false, false, false], [true, false, false, false]]), 'M0 0h2v1h-2zM3 0h1v1h-1zM0 2h1v1h-1z');
  const m = qrMatrix('x');
  const dark = m.flat().filter(Boolean).length;
  const area = [...qrSvgPath(m).matchAll(/h(\d+)v1/g)].reduce((sum, [, w]) => sum + Number(w), 0);
  assert.equal(area, dark);
});
