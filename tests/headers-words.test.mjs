/**
 * The security headers in plain words for the Updates panel (editor/src/lib/headers-words.js): the rules, an update's changes, and the edits to make by hand.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readRules, ruleWords, sourceWords, policyTable, otherRules, headerChanges, keptWords, handEdits } from '../editor/src/lib/headers-words.js';
import { releaseHeaders } from '../scripts/release-headers.mjs';
import { engineImport } from './_engine.mjs';

const TEMPLATE = readFileSync(new URL('../template/_headers', import.meta.url), 'utf8');
const RELEASED = releaseHeaders(TEMPLATE);
const HSTS = '  Strict-Transport-Security: max-age=31536000\n';
const OLDER = TEMPLATE.replace(HSTS, '');
const SOURCE = readFileSync(new URL('../editor/src/lib/headers-words.js', import.meta.url), 'utf8');
const DICTS = Object.fromEntries(await Promise.all(['en-GB', 'nb', 'tr'].map(async (lang) => [lang, (await engineImport(`locales/admin/${lang}.js`)).default.strings])));

/** Every key a descriptor names, its values' included. */
function keysOf(words, out = []) {
  if (words?.key) out.push(words.key);
  for (const value of Object.values(words?.vars ?? {})) if (value && typeof value === 'object') keysOf(value, out);
  return out;
}

test('every rule, kind of content and source in the template\'s _headers, released or not, has words of its own', () => {
  for (const text of [TEMPLATE, RELEASED]) {
    for (const words of otherRules(text)) {
      assert.ok(words.key && words.key !== 'hdr.rule.raw', `a rule without words: ${JSON.stringify(words)}`);
    }
    const table = policyTable(text);
    assert.ok(table.length >= 6, 'the policy lists its kinds of content');
    for (const row of table) {
      assert.ok(row.kind.key, `a kind without words: ${JSON.stringify(row.kind)}`);
      for (const source of row.sources) assert.ok(source.words.key, `a source without words: ${JSON.stringify(source.words)}`);
    }
  }
});

test('every key the words name stands in the nb, en-GB and tr dictionaries', () => {
  const named = new Set([...SOURCE.matchAll(/'(hdr\.[a-zA-Z.]+)'/g)].map((m) => m[1]));
  for (const text of [TEMPLATE, RELEASED]) {
    for (const words of otherRules(text)) for (const key of keysOf(words)) named.add(key);
  }
  for (const key of ['hdr.step.add', 'hdr.step.replace', 'hdr.step.addSources', 'hdr.step.addDirective', 'hdr.step.removeSources', 'hdr.step.removeDirective', 'hdr.step.remove', 'hdr.step.newRule']) named.add(key);
  assert.ok(named.size > 40);
  for (const [lang, strings] of Object.entries(DICTS)) {
    for (const key of named) assert.equal(typeof strings[key], 'string', `${lang} lacks ${key}`);
  }
});

test('the rules are read by path, comments and blank lines left out, and a header a rule does not know stands as written', () => {
  const rules = readRules(TEMPLATE);
  assert.equal(rules[0].path, '/*');
  assert.ok(rules[0].headers.some((h) => h.name === 'Strict-Transport-Security' && h.line === 'Strict-Transport-Security: max-age=31536000'));
  assert.ok(rules.every((rule) => !rule.path.startsWith('#')));
  assert.deepEqual(ruleWords({ path: '/shop/*', name: 'Permissions-Policy', value: 'camera=()' }), [{ key: 'hdr.rule.raw', vars: { rule: { text: 'Permissions-Policy: camera=()' }, path: { text: '/shop/*' } } }]);
  assert.deepEqual(sourceWords('https://script.google.com'), { text: 'script.google.com' });
  assert.deepEqual(sourceWords("'self'"), { key: 'hdr.src.self' });
  assert.deepEqual(sourceWords("'sha256-abc='"), { text: "'sha256-abc='" });
});

test('an update\'s changes read as a new rule, a rule gone, and sources a kind of content gains or loses', () => {
  assert.deepEqual(headerChanges(OLDER, TEMPLATE), [{ kind: 'added', words: { key: 'hdr.rule.hstsYear' } }]);
  assert.deepEqual(headerChanges(TEMPLATE, OLDER), [{ kind: 'removed', words: { key: 'hdr.rule.hstsYear' } }]);
  assert.deepEqual(headerChanges(TEMPLATE, TEMPLATE.replace("img-src 'self' data: blob:", "img-src blob: 'self' data:")), [], 'the same words in another order change nothing');
  const wider = TEMPLATE.replace("connect-src 'self' https://cloudflareinsights.com", "connect-src 'self' https://script.google.com");
  assert.deepEqual(headerChanges(TEMPLATE, wider), [
    { kind: 'sourcesAdded', words: { key: 'hdr.dir.connect' }, sources: [{ text: 'script.google.com' }] },
    { kind: 'sourcesRemoved', words: { key: 'hdr.dir.connect' }, sources: [{ key: 'hdr.src.analytics' }] },
  ]);
  assert.deepEqual(headerChanges(TEMPLATE, TEMPLATE.replace('X-Frame-Options: SAMEORIGIN', 'X-Frame-Options: DENY')), [{ kind: 'changed', words: { key: 'hdr.rule.frameNone' } }]);
});

test('the owner\'s kept additions read by kind of content, the HTTPS rule\'s words by name, and anything else as written', () => {
  assert.deepEqual(keptWords(['connect-src https://script.google.com', 'includeSubDomains', 'preload', 'max-age=63072000', 'worker-src']), [
    { words: { key: 'hdr.dir.connect' }, sources: [{ text: 'script.google.com' }] },
    { words: { key: 'hdr.word.subdomains' } },
    { words: { key: 'hdr.word.preload' } },
    { words: { text: 'max-age=63072000' } },
    { words: { key: 'hdr.dir.worker' }, sources: [] },
  ]);
  const table = policyTable(TEMPLATE.replace("connect-src 'self' https://cloudflareinsights.com", "connect-src 'self' https://cloudflareinsights.com https://script.google.com"), ['connect-src https://script.google.com']);
  const connect = table.find((row) => row.kind.key === 'hdr.dir.connect');
  assert.deepEqual(connect.sources.map((s) => s.yours), [false, false, true], 'the owner\'s host is marked as theirs');
  const scripts = table.find((row) => row.kind.key === 'hdr.dir.script');
  assert.equal(scripts.sources.filter((s) => s.words.key === 'hdr.src.analytics').length, 1, 'one name for the two hosts of the same service');
});

test('the edits by hand bring the release\'s changes into the owner\'s own file, a policy\'s in its line so the owner\'s sources stay', () => {
  const own = OLDER.replace('  X-Content-Type-Options: nosniff\n', '  X-Content-Type-Options: nosniff\n  Permissions-Policy: camera=()\n');
  assert.deepEqual(handEdits(OLDER, TEMPLATE, own), [{ step: 'add', path: '/*', copy: HSTS.replace('\n', '') }]);

  const mine = own.replace("connect-src 'self' https://cloudflareinsights.com", "connect-src 'self' https://cloudflareinsights.com https://forms.example.org");
  const next = TEMPLATE.replace("frame-src 'self'", "frame-src 'self' https://maps.example.org").replace("; object-src 'none'", "; object-src 'none'; worker-src 'self'");
  assert.deepEqual(handEdits(OLDER, next, mine), [
    { step: 'add', path: '/*', copy: HSTS.replace('\n', '') },
    { step: 'addSources', path: '/*', name: 'Content-Security-Policy', directive: 'frame-src', copy: ' https://maps.example.org' },
    { step: 'addDirective', path: '/*', name: 'Content-Security-Policy', copy: "; worker-src 'self'" },
  ]);

  const replaced = handEdits(TEMPLATE, TEMPLATE.replace('Referrer-Policy: strict-origin-when-cross-origin', 'Referrer-Policy: no-referrer'), own);
  assert.deepEqual(replaced, [{ step: 'replace', path: '/*', name: 'Referrer-Policy', copy: '  Referrer-Policy: no-referrer' }]);
  const ruled = handEdits(TEMPLATE, `${TEMPLATE}\n/feeds/*\n  Cache-Control: no-cache\n`, own);
  assert.deepEqual(ruled, [{ step: 'newRule', path: '/feeds/*', copy: '/feeds/*\n  Cache-Control: no-cache' }], 'a rule the owner\'s file lacks is added whole');
  assert.deepEqual(handEdits(TEMPLATE, OLDER, TEMPLATE), [{ step: 'remove', path: '/*', name: 'Strict-Transport-Security' }]);
});

test('a rule the words would misstate stands as written: HTTPS switched off, a policy only reported, a short keep, one crawler, a source that is no whole https host', () => {
  const raw = (name, value, path = '/*') => ruleWords({ path, name, value })[0].key === 'hdr.rule.raw';
  assert.ok(raw('Strict-Transport-Security', 'max-age=0'), 'max-age=0 turns the rule off');
  assert.ok(raw('Strict-Transport-Security', 'includeSubDomains'));
  assert.deepEqual(ruleWords({ path: '/*', name: 'Strict-Transport-Security', value: 'max-age=600' }), [{ key: 'hdr.rule.hsts' }]);
  assert.ok(raw('Content-Security-Policy-Report-Only', "frame-ancestors 'none'"), 'a policy that only reports forbids nothing');
  assert.ok(raw('Cache-Control', 'max-age=60, immutable', '/media/*'), 'kept for a minute, not a year');
  assert.ok(raw('X-Robots-Tag', 'googlebot: noindex', '/admin/*'), 'one crawler is not every search engine');
  for (const source of ['http://example.org', 'https://example.org/only/this/', 'https://*.example.org']) assert.deepEqual(sourceWords(source), { text: source });
  const reported = `/*\n  Content-Security-Policy-Report-Only: default-src 'none'\n  Content-Security-Policy: default-src 'self'\n`;
  assert.deepEqual(policyTable(reported), [{ kind: { key: 'hdr.dir.default' }, sources: [{ words: { key: 'hdr.src.self' }, yours: false }] }], 'the table reads the policy in force');
});

test('a kind of content that loses or gets a rule of its own, and a whole policy, are told as that; one sentence is told once', () => {
  const policy = (value, extra = '') => `/*\n${extra}  Content-Security-Policy: ${value}\n`;
  const base = policy("default-src 'self'; img-src 'self' data:; frame-ancestors 'self'", '  X-Frame-Options: SAMEORIGIN\n');
  assert.deepEqual(headerChanges(base, policy("default-src 'self'; frame-ancestors 'self'", '  X-Frame-Options: SAMEORIGIN\n')), [{ kind: 'kindGone', words: { key: 'hdr.dir.img' } }],
    'pictures fall back on the rule for anything else, they do not lose this site');
  assert.deepEqual(headerChanges(base, policy("default-src 'self'; img-src 'self' data:; font-src 'self'; frame-ancestors 'self'", '  X-Frame-Options: SAMEORIGIN\n')),
    [{ kind: 'kindNew', words: { key: 'hdr.dir.font' }, sources: [{ key: 'hdr.src.self' }] }]);
  assert.deepEqual(headerChanges('/*\n  X-Content-Type-Options: nosniff\n', `/*\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: SAMEORIGIN\n  Content-Security-Policy: default-src 'self'; frame-ancestors 'self'\n`),
    [{ kind: 'added', words: { key: 'hdr.rule.frameSelf' } }, { kind: 'added', words: { key: 'hdr.rule.policy' } }], 'the frame rule once, though two headers say it, and the policy by name');
});

test('the edits by hand read the owner\'s own line: their words stay in a replaced line, what they already hold is not asked again, and a line they took from is shown to weigh', () => {
  const own = TEMPLATE.replace(HSTS, '  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload\n');
  const longer = TEMPLATE.replace(HSTS, '  Strict-Transport-Security: max-age=63072000\n');
  assert.deepEqual(handEdits(TEMPLATE, longer, own), [{ step: 'replace', path: '/*', name: 'Strict-Transport-Security', copy: '  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload' }]);

  const hosted = TEMPLATE.replace("frame-src 'self'", "frame-src 'self' https://maps.example.org");
  const next = hosted.replace("; object-src 'none'", "; object-src 'none'; worker-src 'self'");
  const mine = hosted.replace("; object-src 'none'", "; object-src 'none'; worker-src 'self' https://w.example.org");
  assert.deepEqual(handEdits(TEMPLATE, next, mine), [], 'the host and the directive are in the owner\'s line already');
  assert.deepEqual(handEdits(TEMPLATE, next, TEMPLATE.replace("; object-src 'none'", "; object-src 'none'; worker-src https://w.example.org")),
    [{ step: 'addSources', path: '/*', name: 'Content-Security-Policy', directive: 'frame-src', copy: ' https://maps.example.org' }, { step: 'addSources', path: '/*', name: 'Content-Security-Policy', directive: 'worker-src', copy: " 'self'" }],
    'a directive the owner has takes the release\'s sources, never a second directive of the name');

  const tighter = TEMPLATE.replace(' https://player.vimeo.com', '');
  assert.deepEqual(handEdits(TEMPLATE, hosted, tighter).map((edit) => edit.step), ['compare'], 'the owner took a host away: the new line is shown, not put in its place');
  assert.deepEqual(handEdits(TEMPLATE, TEMPLATE, own), [], 'a release that changes nothing asks nothing');
});
