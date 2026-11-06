/**
 * The privacy page follows the site (ADR-0029): every outside host the site's CSP lets a page reach is one the privacy page names, and every engine module that keeps something in a visitor's browser is on the page's list (BROWSER_KEEPS in privacy-model.js), with its words in the site dictionaries.
 * A new frame provider, a new beacon or a new key in the browser fails here until the privacy page tells it.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { engineImport, ENGINE_DIR } from './_engine.mjs';

const { BROWSER_KEEPS, privacyNameOfHost, privacyModel } = await engineImport('privacy-model.js');
const dict = async (lang) => (await engineImport(`locales/site/${lang}.js`)).default.strings;
const DICTS = { nb: await dict('nb'), 'en-GB': await dict('en-GB'), tr: await dict('tr') };

/* The modules whose storage is the editor's or the owner's own, never a visitor's: the editor's recent colours, glyphs and blocks, the admin's language, and the draft view, which reads the drafts of the owner's own editor. */
const OWNER_STORAGE = {
  'preview-edit.js': 'the editor in the preview',
  'color-picker.js': 'the editor\'s recent and saved colours',
  'glyphs.js': 'the editor\'s recent glyphs',
  'i18n.js': 'the admin\'s language',
  'urd.js': 'the draft view reads the owner\'s own drafts',
};

/** The engine's modules, as paths under the engine directory; the dictionaries are words, not code. */
function modules(dir = fileURLToPath(ENGINE_DIR)) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === 'locales' ? [] : modules(path);
    return name.endsWith('.js') ? [relative(fileURLToPath(ENGINE_DIR), path)] : [];
  });
}

/** A module's code without its comments, so a comment that names the storage is not a use of it. */
const code = (file) => readFileSync(new URL(file, ENGINE_DIR), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1');
const STORAGE = /\b(localStorage|sessionStorage|indexedDB)\b|document\.cookie/;

/* The sources that reach nothing outside the site: the site itself, the keywords, and the schemes for what the page holds within itself. */
const OWN_SOURCES = /^('[^']*'|data:|blob:|mediastream:)$/i;

test('every outside host the CSP lets a page reach is one the privacy page names', () => {
  const headers = readFileSync(new URL('../template/_headers', import.meta.url), 'utf8');
  const csp = headers.match(/Content-Security-Policy:\s*(.+)/)?.[1] ?? '';
  // Every source of every directive: a host with or without its scheme, a wildcard host, or a bare scheme or star, which is too broad for the page to name.
  const sources = csp.split(';').flatMap((directive) => directive.trim().split(/\s+/).slice(1)).filter((source) => source && !OWN_SOURCES.test(source));
  const hosts = new Set();
  for (const source of sources) {
    assert.ok(!/^(\*|[a-z][a-z0-9+.-]*:)$/i.test(source), `the CSP allows «${source}», which no privacy page can name`);
    hosts.add(source.replace(/^[a-z][a-z0-9+.-]*:\/\//i, '').replace(/\/.*$/, '').replace(/:\d+$/, '').toLowerCase());
  }
  assert.ok(hosts.size >= 4, 'the CSP\'s hosts are read');
  for (const host of hosts) assert.ok(privacyNameOfHost(host), `${host} is allowed by the CSP but the privacy page does not name it`);
  assert.equal(privacyNameOfHost('example.com'), null);
  assert.equal(privacyNameOfHost('*.vimeocdn.com'), null, 'a wildcard host the page does not name');
});

test('every module that keeps something in a visitor\'s browser is on the privacy page\'s list', () => {
  const listed = new Set(BROWSER_KEEPS.flatMap((keep) => keep.modules));
  const users = modules().filter((file) => STORAGE.test(code(file)));
  for (const file of users) {
    assert.ok(listed.has(file) || OWNER_STORAGE[file], `${file} uses the browser's storage but the privacy page does not tell it (BROWSER_KEEPS in privacy-model.js)`);
  }
  for (const file of listed) assert.ok(users.includes(file), `${file} is on the privacy page's list but keeps nothing in the browser`);
  for (const file of Object.keys(OWNER_STORAGE)) assert.ok(users.includes(file), `${file} is exempt but keeps nothing in the browser`);
});

test('every kind the browser keeps has its words in nb, en-GB and tr', () => {
  assert.equal(new Set(BROWSER_KEEPS.map((keep) => keep.id)).size, BROWSER_KEEPS.length);
  for (const [lang, strings] of Object.entries(DICTS)) {
    for (const keep of BROWSER_KEEPS) assert.ok(strings[`privacy.browser.${keep.id}`], `${lang} privacy.browser.${keep.id}`);
  }
});

test('a page with a calendar has the calendar\'s keeping named', () => {
  const page = (type) => [{ entry: { id: 'p', title: 'P' }, page: { sections: [{ blocks: [{ type, props: {} }] }] } }];
  assert.equal(privacyModel({ site: {} }, page('calendar')).browser.calendar, true);
  assert.equal(privacyModel({ site: {} }, page('text')).browser.calendar, false);
});
