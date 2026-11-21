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
 * The visitor's and the editor's stylesheets as one text: base.css, the preview's rules and the calendar's (which a page in the preview may load in either order), for the tests that look a rule up wherever it stands.
 * @returns {string}
 */
export function readStyles() {
  const read = (url) => readFileSync(url, 'utf8');
  return [read(new URL('../template/assets/styles/base.css', import.meta.url)), read(new URL('preview.css', ENGINE_DIR)), read(new URL('blocks/calendar.css', ENGINE_DIR))].join('\n');
}
