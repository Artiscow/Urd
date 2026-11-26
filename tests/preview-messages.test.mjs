/**
 * The preview's messages (ADR-0001): the list in docs/ARCHITECTURE.md names exactly the messages the editor and the preview receive from each other.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ENGINE_DIR } from './_engine.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const walk = (dir) => readdirSync(dir).flatMap((name) => (statSync(dir + name).isDirectory() ? (name === 'locales' ? [] : walk(`${dir}${name}/`)) : [dir + name]));

/** The messages each list in ARCHITECTURE.md names, by type: from the editor to the page, and from the page to the editor. */
function listed() {
  const doc = readFileSync(`${ROOT}docs/ARCHITECTURE.md`, 'utf8');
  const at = doc.indexOf("### The preview's messages");
  assert.ok(at > 0, 'ARCHITECTURE.md lists the preview messages');
  const ends = ['\n### ', '\n## '].map((mark) => doc.indexOf(mark, at + 1)).filter((i) => i > 0);
  const section = doc.slice(at, Math.min(...ends));
  const toPage = section.indexOf('**From the editor to the page:**');
  const toEditor = section.indexOf('**From the page to the editor:**');
  assert.ok(toPage > 0 && toEditor > toPage, 'both lists are found, the editor\'s first');
  const types = (text) => new Set([...text.matchAll(/type: '(urd-[\w-]+)'/g)].map((m) => m[1]));
  return { toPage: types(section.slice(toPage, toEditor)), toEditor: types(section.slice(toEditor)) };
}

/** The messages a part of the code acts on: a listener that compares a message's type with one, or a switch case for one. */
function received(files) {
  const types = new Set();
  for (const file of files) {
    const src = readFileSync(file, 'utf8');
    for (const m of src.matchAll(/type\s*[!=]==\s*['"](urd-[\w-]+)['"]|case\s+['"](urd-[\w-]+)['"]/g)) types.add(m[1] ?? m[2]);
  }
  return types;
}

const missing = (from, to) => [...from].filter((type) => !to.has(type)).sort();

test('each list of the preview messages names exactly the messages its receiver acts on: the page the editor\'s, the editor the page\'s', () => {
  const { toPage, toEditor } = listed();
  const page = received(walk(fileURLToPath(ENGINE_DIR)).filter((f) => f.endsWith('.js')));
  const editor = received(walk(`${ROOT}editor/src/`).filter((f) => /\.(js|svelte)$/.test(f)));
  assert.ok(page.size > 40 && editor.size > 50, `${page.size} messages the page acts on, ${editor.size} the editor`);
  assert.deepEqual(missing(page, toPage), [], 'a message the page acts on is listed from the editor to the page, with its fields');
  assert.deepEqual(missing(toPage, page), [], 'a message listed to the page is one the page still acts on');
  assert.deepEqual(missing(editor, toEditor), [], 'a message the editor acts on is listed from the page to the editor, with its fields');
  assert.deepEqual(missing(toEditor, editor), [], 'a message listed to the editor is one the editor still acts on');
});
