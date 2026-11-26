/**
 * Guard against the HTML shells drifting from the engine source and from the
 * ADR-0013 invariants.
 *
 * The visitor page preloads the full static import graph from boot.js with
 * <link rel="modulepreload"> (otherwise the browser discovers the imports
 * layer by layer, a serial waterfall). This test recomputes the closure from
 * the source and requires the HTML list to be exactly equal: neither a
 * missing module (which then falls back to the waterfall) nor an extra one
 * (such as an editor layer visitors must never fetch). Same culture as the
 * build conformity check.
 *
 * With the engine versioning (ADR-0013) it also guards: that the directory
 * name equals urd.json.engine, that the slug copies of index.html are
 * byte-identical to the root (they are written as raw copies at publish, and
 * drift gives orphaned copies at a bump), that the shell modules in
 * assets/urd/ re-export from the current version, that _headers has the
 * version-neutral immutable rules, and that the base.css stamp in the shells
 * matches the file content.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { ENGINE_VERSION, ENGINE_DIR, stripComments, staticSpecs, engineClosure } from './_engine.mjs';
import { releaseHeaders } from '../scripts/release-headers.mjs';

const ENTRY = 'boot.js';
const TEMPLATE = new URL('../template/', import.meta.url);
const INDEX = new URL('index.html', TEMPLATE);
const URD_DIR = new URL('assets/urd/', TEMPLATE);

/** The slug copies of index.html: one per page in the register except the
 *  root, plus any other directory that carries a copy (a page removed from
 *  the register keeps its copy until the next publish). Derived, never
 *  listed, so a page added by a publish is covered at once. */
function slugCopies() {
  const site = JSON.parse(readFileSync(new URL('content/site.json', TEMPLATE), 'utf8'));
  const fromRegister = (site.pages ?? [])
    .map((p) => String(p.path ?? '').replace(/^\//, ''))
    .filter((slug) => slug && !slug.includes('/'));
  const fromTree = readdirSync(TEMPLATE, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== 'admin')
    .map((d) => d.name)
    .filter((name) => {
      try { return statSync(new URL(`${name}/index.html`, TEMPLATE)).isFile(); } catch { return false; }
    });
  return [...new Set([...fromRegister, ...fromTree])].sort();
}
const SLUG_COPIES = slugCopies();

/** The static import closure of boot.js, as engine-relative names (engineClosure in _engine.mjs, which tests/visitor-speed.test.mjs walks the block types' modules with too). */
const closure = () => engineClosure(ENTRY);

/** The modulepreload hrefs in index.html, as engine-relative names.
 *  The prefix is the VERSIONED directory: a reference without a version (or
 *  with the wrong version) does not match and fails as a missing preload. */
function preloadNames() {
  const html = readFileSync(INDEX, 'utf8');
  const names = new Set();
  const re = new RegExp(
    `<link\\s+rel="modulepreload"\\s+href="/assets/engine/${ENGINE_VERSION.replaceAll('.', '\\.')}/([^"]+)"\\s*>`,
    'g',
  );
  let m;
  while ((m = re.exec(html))) names.add(m[1]);
  return names;
}

/** Same content hash as imageTools.contentHash (djb2, 8 hex chars). */
function contentHash(text) {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) hash = ((hash << 5) + hash + text.charCodeAt(i)) >>> 0;
  return hash.toString(16).padStart(8, '0');
}

// Modules loaded dynamically (await import) or only in the editor: they must
// NEVER be preloaded for visitors.
const EDITOR_ONLY = [
  'preview-edit.js', 'preset-thumb.js', 'imageTools.js',
  'color-picker.js', 'dropdown.js', 'glyphs.js', 'fonts.js', 'text-typo.js',
  'place.js', 'section-size.js', 'selection.js', 'lightbox.js', 'hint.js',
  'page-presets.js', 'anchored.js', 'text-whole.js', 'phone-moves.js', 'phone-layouts.js',
  'sections/presets.js',
];

test('the engine directory exists and is named what urd.json.engine says', () => {
  assert.ok(statSync(ENGINE_DIR).isDirectory(), `missing directory for engine version ${ENGINE_VERSION}`);
  // Exactly ONE versioned directory: a forgotten deletion of the previous
  // version would bloat the repo and hide that the HTML references point wrong.
  const versions = readdirSync(new URL('assets/engine/', TEMPLATE));
  assert.deepEqual(versions, [ENGINE_VERSION], `assets/engine/ must only contain ${ENGINE_VERSION}: ${versions.join(', ')}`);
});

test('modulepreload in index.html matches the static import closure of boot.js', () => {
  const want = closure();
  const have = preloadNames();
  const missing = [...want].filter((n) => !have.has(n)).sort();
  const extra = [...have].filter((n) => !want.has(n)).sort();
  assert.deepEqual(missing, [], `missing modulepreload for: ${missing.join(', ')}`);
  assert.deepEqual(extra, [], `superfluous modulepreload for: ${extra.join(', ')}`);
});

test('all engine references in index.html use the versioned path', () => {
  const html = readFileSync(INDEX, 'utf8');
  const re = /\/assets\/engine\/([^"']+)/g;
  for (const [, rest] of html.matchAll(re)) {
    assert.ok(
      rest.startsWith(`${ENGINE_VERSION}/`),
      `unversioned engine reference in index.html: /assets/engine/${rest}`,
    );
  }
});

test('the slug copies of index.html are byte-identical to the root', () => {
  // The copies are written as raw copies of the served root at publish; if
  // they drift in the template, fresh clones inherit the deviation until the
  // first publish.
  assert.ok(SLUG_COPIES.length >= 3, `expected slug copies for the register's pages, found ${SLUG_COPIES.join(', ')}`);
  const root = readFileSync(INDEX, 'utf8');
  for (const slug of SLUG_COPIES) {
    const copy = readFileSync(new URL(`${slug}/index.html`, TEMPLATE), 'utf8');
    assert.equal(copy, root, `${slug}/index.html has drifted from the root index.html`);
  }
});

test('the shells in assets/urd/ re-export from the current engine version', () => {
  const shellFiles = (dir) => readdirSync(dir, { recursive: true })
    .filter((name) => String(name).endsWith('.js'))
    .map((name) => new URL(String(name).replaceAll('\\', '/'), dir));
  const shells = shellFiles(URD_DIR);
  assert.ok(shells.length >= 9, `found only ${shells.length} shells in assets/urd/`);
  // The shells are re-exports (`export * from` / `export { default } from`),
  // not imports, so they need their own specifier regex.
  const EXPORT_FROM_RE = /\bexport\b[^;]*?\bfrom\b\s*['"](\.[^'"]+)['"]/g;
  for (const url of shells) {
    const src = readFileSync(url, 'utf8');
    const specs = [...stripComments(src).matchAll(EXPORT_FROM_RE)].map((m) => m[1]);
    assert.equal(specs.length, 1, `${url.pathname}: a shell must have exactly one re-export`);
    const target = new URL(specs[0], url);
    assert.ok(
      target.href.startsWith(ENGINE_DIR.href),
      `${url.pathname} points outside engine version ${ENGINE_VERSION}: ${specs[0]}`,
    );
    assert.ok(statSync(target).isFile(), `${url.pathname} points to a file that does not exist: ${specs[0]}`);
  }
});

test('_headers has the version-neutral immutable rules', () => {
  // The template's _headers is the monorepo's with the engine rule swapped at the release (scripts/release-headers.mjs).
  // The monorepo revalidates the engine, whose files change between releases under the same folder.
  const monorepo = readFileSync(new URL('_headers', TEMPLATE), 'utf8');
  const block = (headers, rule) => {
    const idx = headers.indexOf(`\n${rule}\n`);
    assert.ok(idx !== -1, `_headers is missing the rule ${rule}`);
    const end = headers.indexOf('\n\n', idx + 1);
    return headers.slice(idx, end === -1 ? undefined : end);
  };
  for (const [headers, rule] of [[releaseHeaders(monorepo), '/assets/engine/*'], [monorepo, '/assets/styles/base.css'], [monorepo, '/media/*']]) {
    assert.match(block(headers, rule), /immutable/, `the ${rule} block in _headers is missing immutable`);
  }
  assert.match(block(monorepo, '/assets/engine/*'), /Cache-Control: no-cache$/, 'the monorepo revalidates the engine');
  // The rule must be version-neutral: _headers is hand-editable (ADR-0006)
  // and must never need changes at an engine bump.
  assert.ok(!monorepo.includes(`/assets/engine/${ENGINE_VERSION}`), '_headers must not contain a versioned engine path');
});

test('the base.css stamp in the HTML shells matches the file content', () => {
  const stamp = contentHash(readFileSync(new URL('assets/styles/base.css', TEMPLATE), 'utf8'));
  for (const file of ['index.html', 'admin/index.html', ...SLUG_COPIES.map((slug) => `${slug}/index.html`)]) {
    const html = readFileSync(new URL(file, TEMPLATE), 'utf8');
    const m = html.match(/href="\/assets\/styles\/base\.css\?v=([0-9a-f]{8})"/);
    assert.ok(m, `${file} is missing the stamped base.css reference`);
    assert.equal(m[1], stamp, `${file} has an outdated base.css stamp (expected ${stamp})`);
  }
});

test('the editor layer is NOT in the visitor-critical closure', () => {
  const want = closure();
  for (const mod of EDITOR_ONLY) {
    assert.equal(want.has(mod), false, `${mod} must be loaded dynamically, not preloaded`);
  }
});

test('the block and background modules stay out of the visitor\'s static closure: a page loads those it holds (core-types.js, ADR-0036)', () => {
  const typed = [...closure()].filter((name) => /^(?:blocks|backgrounds)\//.test(name));
  assert.deepEqual(typed, []);
});

test('the closure walker excludes commented and dynamic imports, and finds a side-effect import, a re-export and an import over several lines', () => {
  const src = `
    import { a } from './a.js';
    // import { b } from './b.js';
    /* import { c } from './c.js'; */
    const mod = await import('./d.js');
    import('./e.js').then(() => {});
    import './f.js';
    import {
      g,
      h,
    } from './g.js';
    export { i } from './i.js';
    export * from './j.js';
    export { k };
    export const from = 'x';
  `;
  assert.deepEqual(staticSpecs(src), ['./a.js', './f.js', './g.js', './i.js', './j.js']);
});

test('the shell runs theme-init.js before the stylesheets and preloads site.json as the boot fetches it', () => {
  const html = readFileSync(INDEX, 'utf8');
  const themeInit = html.indexOf(`<script src="/assets/engine/${ENGINE_VERSION}/theme-init.js"></script>`);
  const firstStylesheet = html.indexOf('<link rel="stylesheet"');
  assert.ok(themeInit > 0 && themeInit < firstStylesheet, 'a classic script after a stylesheet waits for it');
  const preload = html.indexOf('<link rel="preload" href="/content/site.json" as="fetch" crossorigin>');
  assert.ok(preload > 0 && preload < html.indexOf('<link rel="modulepreload"'), 'site.json is asked for before the engine\'s modules');
  const urd = readFileSync(new URL('urd.js', ENGINE_DIR), 'utf8');
  assert.match(urd, /const siteRes = await fetch\('\/content\/site\.json'\);/, 'the boot\'s fetch is the one the preload answers: same address, same mode');
});

test('the boot reads the engine version from its own folder, and draws a page without waiting for plugins it does not use', () => {
  const urd = readFileSync(new URL('urd.js', ENGINE_DIR), 'utf8');
  assert.match(urd, /engineVersionOf\(import\.meta\.url\)/);
  assert.doesNotMatch(urd, /await loadPlugins\(/, 'the plugins are never awaited whole');
  const navWait = urd.indexOf('needsPlugins(pageTypes(site.nav), Urd)');
  assert.ok(navWait > 0 && navWait < urd.indexOf('renderNav(site, opts.nav'), 'the nav waits for a plugin type before it is drawn');
  assert.match(urd, /needsPlugins\(pageTypes\(page, site\.footer\), Urd\)\) await pluginsLoaded;/);
  assert.match(urd, /needsPlugins\(pageTypes\(freshPage, site\.footer\), Urd\)\) await pluginsLoaded;/, 'a newer page file waits as the first drawing does');
  assert.match(urd, /footerLoaded\.then\(\(\) => \{\s+const footer = feature\('footer'\);\s+return footer\?\.whenSettled\(opts\.root, footer\.FOOTER_WAIT_MS\);\s+\}\)\.then\(\(\) => \{\s+opts\.root\.insertAdjacentElement\('afterend', opts\.footer\);\s+drawFooter\(\);/, 'a visitor\'s footer is drawn as it joins the page, once its module is in');
  const privacy = readFileSync(new URL('blocks/privacy.js', ENGINE_DIR), 'utf8');
  assert.match(privacy, /host\.setAttribute\('aria-busy', 'true'\);[\s\S]{0,80}host\.removeAttribute\('aria-busy'\);/);
});

/** The HTML pages Urd owns: the site's shell, the admin's and the 404 page; the slug copies are the shell byte for byte. */
const PAGES = ['index.html', 'admin/index.html', '404.html'];
const page = (name) => readFileSync(new URL(name, TEMPLATE), 'utf8');
/** A page's tags of one name, each with its attributes and what stands between it and its end tag. */
const tagsOf = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>([\\s\\S]*?)</${name}>`, 'gi'))].map(([, attrs, body]) => ({ attrs, body }));

test('the HTML pages carry no inline script, which the CSP\'s script-src does not allow: every script has a src and nothing inside, and no tag has an on… handler', () => {
  const headers = readFileSync(new URL('_headers', TEMPLATE), 'utf8');
  const scriptSrc = [...headers.matchAll(/Content-Security-Policy:[^\n]*?\bscript-src ([^;\n]*)/g)].map((m) => m[1]);
  assert.ok(scriptSrc.length > 0, 'the CSP names its script sources');
  for (const sources of scriptSrc) assert.doesNotMatch(sources, /'unsafe-inline'|'unsafe-hashes'|'nonce-|'sha(?:256|384|512)-/, 'the CSP lets no inline script run');
  for (const name of PAGES) {
    const html = page(name);
    for (const { attrs, body } of tagsOf(html, 'script')) {
      assert.match(attrs, /\ssrc="[^"]+"/, `${name}: a script without a src`);
      assert.equal(body.trim(), '', `${name}: a script with code inside`);
    }
    assert.equal((html.match(/<script\b/gi) ?? []).length, tagsOf(html, 'script').length, `${name}: every script tag is closed`);
    assert.doesNotMatch(html, /<[a-z][^>]*\son[a-z]+\s*=/i, `${name}: an inline handler`);
    assert.doesNotMatch(html, /\bjavascript:/i, `${name}: a script address`);
  }
  // The two small scripts that run before the engine and the editor stand as files of their own.
  const themeInit = tagsOf(page('index.html'), 'script').find(({ attrs }) => attrs.includes('/theme-init.js'));
  assert.ok(themeInit, 'the shell loads theme-init.js');
  assert.doesNotMatch(themeInit.attrs, /\btype=|\basync\b|\bdefer\b/, 'theme-init.js is a classic script that blocks the parser, so it runs before the first paint');
  assert.ok(tagsOf(page('admin/index.html'), 'script').some(({ attrs }) => /\ssrc="\.\/favicon-boot\.js"/.test(attrs)), 'the admin loads favicon-boot.js as a file');
});

test('the 404 page names no engine file, so an engine swap never leaves it pointing at a folder that has gone', () => {
  const html = page('404.html');
  assert.doesNotMatch(html, /assets\/engine\//);
  assert.doesNotMatch(html, /<script\b|rel="modulepreload"/i);
});

test('the shell loads the site\'s theme.css after base.css, and the engine\'s boot.js as a render-blocking module', () => {
  const html = readFileSync(INDEX, 'utf8');
  const sheets = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)].map((m) => m[1].replace(/\?.*$/, ''));
  const base = sheets.indexOf('/assets/styles/base.css');
  const theme = sheets.indexOf('/content/theme.css');
  assert.ok(base >= 0 && theme >= 0, 'both stylesheets are linked');
  assert.ok(theme > base, 'theme.css after base.css, so the site\'s theme wins');
  const boot = tagsOf(html, 'script').find(({ attrs }) => attrs.includes(`/assets/engine/${ENGINE_VERSION}/boot.js"`));
  assert.ok(boot, 'the shell loads boot.js');
  assert.match(boot.attrs, /\stype="module"/);
  assert.match(boot.attrs, /\sblocking="render"/);
});
