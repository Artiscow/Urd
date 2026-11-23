/**
 * Engine path lookup for the tests (ADR-0013): the engine lives in a
 * versioned directory whose name always equals the engine field in
 * template/urd.json, so the tests follow the release rename automatically.
 * Static imports cannot interpolate paths; the test files therefore load
 * engine modules with `await engineImport('...')` instead.
 */
import { readFileSync } from 'node:fs';

export const ENGINE_VERSION = JSON.parse(
  readFileSync(new URL('../template/urd.json', import.meta.url), 'utf-8'),
).engine;

export const ENGINE_DIR = new URL(`../template/assets/engine/${ENGINE_VERSION}/`, import.meta.url);

/** @param {string} relativePath Engine-relative path, e.g. 'backgrounds/gradient.js' */
export function engineImport(relativePath) {
  return import(new URL(relativePath, ENGINE_DIR).href);
}

/**
 * The calendar's sheets in the order calendar-load.js keeps them (SHEETS): the shared one first, then each design family's own.
 * @returns {Array<{name: string, file: string, text: string}>}
 */
export function calendarSheets() {
  const load = readFileSync(new URL('blocks/calendar-load.js', ENGINE_DIR), 'utf8');
  const list = load.match(/^const SHEETS = \{([^\n]*)\};$/m)[1];
  return [...list.matchAll(/(\w+): '\.\/([\w-]+\.css)'/g)].map(([, name, file]) => ({ name, file: `blocks/${file}`, text: readFileSync(new URL(`blocks/${file}`, ENGINE_DIR), 'utf8') }));
}

/**
 * The visitor's and the editor's stylesheets as one text: base.css, the preview's rules and the calendar's sheets (which a page in the preview may load in either order), for the tests that look a rule up wherever it stands.
 * @returns {string}
 */
export function readStyles() {
  const read = (url) => readFileSync(url, 'utf8');
  return [read(new URL('../template/assets/styles/base.css', import.meta.url)), read(new URL('preview.css', ENGINE_DIR)), ...calendarSheets().map((sheet) => sheet.text)].join('\n');
}

/** A module's text without its block and line comments, so a commented-out import never counts. */
export function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

/**
 * The relative specifiers a module imports statically: `import ... from`, the side-effect `import '...'` and a re-export `export ... from`; a dynamic `import(` never counts.
 * The span before `from` stops at a quote or a semicolon, so a side-effect import is never read on into the import after it.
 */
const STATIC_RE = /\b(?:import\b(?!\s*\()|export\b(?=[^;'"]*?\bfrom\s*['"]))(?:[^'";]*?\bfrom\b)?\s*['"](\.[^'"]+)['"]/g;

/** @param {string} src */
export function staticSpecs(src) {
  return [...stripComments(src).matchAll(STATIC_RE)].map((m) => m[1]);
}

/**
 * The static import closure of an engine module, the module itself included, as engine-relative names.
 * @param {string} entry Engine-relative path, e.g. 'boot.js'
 * @returns {Set<string>}
 */
export function engineClosure(entry) {
  const names = new Set();
  const walk = (url) => {
    const name = url.href.slice(ENGINE_DIR.href.length);
    if (names.has(name)) return;
    names.add(name);
    for (const spec of staticSpecs(readFileSync(url, 'utf8'))) walk(new URL(spec, url));
  };
  walk(new URL(entry, ENGINE_DIR));
  return names;
}
