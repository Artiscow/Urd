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
import { ENGINE_VERSION, ENGINE_DIR } from './_engine.mjs';

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

/** Strip block and line comments BEFORE matching, so a commented-out or
 *  dynamic import never counts. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

/** Static imports only: `import ... from './x.js'` and the side-effect form
 *  `import './x.js'`. Anchored on `import` followed by NOT `(`, so
 *  `import(` (dynamic) never matches. */
const STATIC_RE = /\bimport\b(?!\s*\()(?:[\s\S]*?\bfrom\b)?\s*['"](\.[^'"]+)['"]/g;

function staticSpecs(src) {
  return [...stripComments(src).matchAll(STATIC_RE)].map((m) => m[1]);
}

/** The static import closure of boot.js, as engine-relative names. */
function closure() {
  const seen = new Set();
  const names = new Set();
  function walk(url) {
    if (seen.has(url.href)) return;
    seen.add(url.href);
    names.add(url.href.slice(ENGINE_DIR.href.length));
    // Collect the specifiers BEFORE recursing: a shared global regex's
    // lastIndex is corrupted by reentrancy, so matchAll (its own iteration)
    // is required.
    const specs = staticSpecs(readFileSync(url, 'utf8'));
    for (const spec of specs) walk(new URL(spec, url));
  }
  walk(new URL(ENTRY, ENGINE_DIR));
  return names;
}

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
  'preview-edit.js', 'preset-thumb.js', 'image-editor.js', 'imageTools.js',
  'color-picker.js', 'dropdown.js', 'glyphs.js', 'fonts.js', 'text-typo.js',
  'place.js', 'section-size.js', 'selection.js', 'lightbox.js', 'hint.js',
  'page-presets.js',
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
  const headers = readFileSync(new URL('_headers', TEMPLATE), 'utf8');
  for (const rule of ['/assets/engine/*', '/assets/styles/base.css', '/media/*']) {
    const idx = headers.indexOf(`\n${rule}\n`);
    assert.ok(idx !== -1, `_headers is missing the rule ${rule}`);
    const block = headers.slice(idx, headers.indexOf('\n\n', idx + 1) === -1 ? undefined : headers.indexOf('\n\n', idx + 1));
    assert.match(block, /immutable/, `the ${rule} block in _headers is missing immutable`);
  }
  // The rule must be version-neutral: _headers is hand-editable (ADR-0006)
  // and must never need changes at an engine bump.
  assert.ok(!headers.includes(`/assets/engine/${ENGINE_VERSION}`), '_headers must not contain a versioned engine path');
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

test('the closure walker excludes commented and dynamic imports', () => {
  const src = `
    import { a } from './a.js';
    // import { b } from './b.js';
    /* import { c } from './c.js'; */
    const mod = await import('./d.js');
    import('./e.js').then(() => {});
  `;
  assert.deepEqual(staticSpecs(src), ['./a.js']);
});
