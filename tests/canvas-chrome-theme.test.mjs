/**
 * The canvas's editing chrome takes the admin's theme (0.7.30.7).
 * The multi-selection bar, the colour picker, the canvas dropdown, the hidden-blocks list and the right-click menu draw their surface, their text, their lines and their marks from the --urd-admin-* variables the editor sends the preview.
 * A colour written out may stand only as a variable's fallback, in a shadow, in a gradient, or in a part that draws colour or danger itself (KEEPS).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { ENGINE_DIR, engineClosure, readStyles } from './_engine.mjs';

const BASE = readStyles();
const CHROME = /urd-multi-toolbar|urd-multi-count|urd-multi-drag|\.urd-cp\b|urd-cp-|urd-dd-|urd-hidden-list|urd-hidden-chip|\.urd-ctx/;
/** The parts that draw colour or danger themselves: the spectrum's handles and cursor, a deletion's red and an armed item. */
const KEEPS = /urd-cp-(?:hue|alpha|cursor|del)\b|urd-multi-delete|urd-ctx-(?:danger|armed)\b/;
/** A colour written out: a hex value, an rgb() or hsl() in either syntax, or a named white or black. */
const LITERAL = /#[0-9a-f]{3,8}\b|\b(?:rgb|hsl)a?\(|(?<![\w-])(?:white|black)(?![\w-])/gi;

/** The colours written out in the chrome's rules once every variable, fallback and all, is taken out. */
function fixedColours(css) {
  const found = [];
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = m[1].trim().split('\n').pop();
    if (!CHROME.test(selector) || selector.includes('urd-multi-selected') || KEEPS.test(selector)) continue;
    for (const declaration of m[2].split(';')) {
      const [prop, ...rest] = declaration.split(':');
      let value = rest.join(':');
      if (/shadow/.test(prop) || /gradient\(/.test(value)) continue;
      while (/var\([^()]*\)/.test(value)) value = value.replace(/var\([^()]*\)/g, '');
      for (const hit of value.match(LITERAL) ?? []) found.push(`${selector} ${prop.trim()}: ${hit}`);
    }
  }
  return found;
}

test('fixedColours finds a colour of its own in any notation, and passes a fallback, a shadow, a gradient and a part that draws colour', () => {
  assert.deepEqual(fixedColours('.urd-cp { background: #151A23; color: white; border-color: rgba(255,255,255,.2); }'), ['.urd-cp background: #151A23', '.urd-cp color: white', '.urd-cp border-color: rgba(']);
  assert.deepEqual(fixedColours('.urd-cp { background: var(--urd-admin-surface, #151a23); border: 1px solid color-mix(in srgb, var(--urd-admin-text, #e8eaf0) 20%, transparent); box-shadow: 0 8px 24px rgb(0 0 0 / 45%); white-space: nowrap; }'), []);
  assert.deepEqual(fixedColours('.urd-cp-hue { background: linear-gradient(to right, #f00, #0f0); } .urd-cp-del { background: #e05252; } .urd-block { color: #e8eaf0; }'), []);
});

test('the canvas chrome in base.css takes the admin theme', () => {
  assert.deepEqual(fixedColours(BASE), []);
});

test('the canvas dropdown takes the admin theme in its own styles', () => {
  const src = readFileSync(new URL('dropdown.js', ENGINE_DIR), 'utf8');
  const start = src.indexOf('const DD_CSS = `') + 'const DD_CSS = `'.length;
  const css = src.slice(start, src.indexOf('`;', start));
  assert.ok(css.includes('.urd-dd-menu'), 'the dropdown\'s styles are read');
  assert.deepEqual(fixedColours(css), []);
});

test('every --urd-admin-* variable the engine reads is one the admin sets, by the same name, in the preview from the theme the editor sends and in the admin from app.css', () => {
  /** The --urd-admin-* names a text reads through var(). */
  const readsIn = (text) => new Set([...text.matchAll(/var\(\s*--urd-admin-([\w-]+)/g)].map((m) => m[1]));
  const engineReads = new Map();
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const url = new URL(entry.isDirectory() ? `${entry.name}/` : entry.name, dir);
      if (entry.isDirectory()) walk(url);
      else if (/\.(?:js|css)$/.test(entry.name)) engineReads.set(url.href.slice(ENGINE_DIR.href.length), readsIn(readFileSync(url, 'utf8')));
    }
  };
  walk(ENGINE_DIR);
  const read = new Set([...engineReads.values()].flatMap((names) => [...names]));
  assert.ok(['accent', 'surface', 'text'].every((name) => read.has(name)), `the engine's reads are found: ${[...read].join(', ')}`);

  // The preview sets each key of the editor's message as a variable (urd.js), and the editor sends the same keys (state/shell.svelte.js sendAdminTheme).
  const urd = readFileSync(new URL('urd.js', ENGINE_DIR), 'utf8');
  const setter = urd.match(/msg\?\.type === 'urd-admin-theme' && msg\.colors\) \{[^{}]*for \(const key of \[([^\]]*)\]\) \{\s*if \(typeof msg\.colors\[key\] === 'string'\) \{\s*document\.documentElement\.style\.setProperty\(`--urd-admin-\$\{key\}`, msg\.colors\[key\]\);/);
  assert.ok(setter, 'urd.js sets the variables from the message');
  const setInPreview = [...setter[1].matchAll(/'([\w-]+)'/g)].map((m) => m[1]);
  const shell = readFileSync(new URL('../editor/src/state/shell.svelte.js', import.meta.url), 'utf8');
  const message = shell.match(/previewState\.bridge\?\.sendAdminTheme\(\{\n([\s\S]*?)\n {2}\}\);/);
  assert.ok(message, 'the editor sends the theme as one object');
  const sent = [...message[1].matchAll(/^\s*(?:'([\w-]+)'|([A-Za-z]\w*))\s*(?::|,\s*$)/gm)].map((m) => m[1] ?? m[2]);
  assert.deepEqual([...sent].sort(), [...setInPreview].sort(), 'the editor sends the keys the preview sets');
  assert.deepEqual([...read].filter((name) => !setInPreview.includes(name)), [], 'every name the engine reads is set in the preview');

  // In the admin document app.css sets them, for the engine modules the editor bundles and the ones they import.
  const css = readFileSync(new URL('../editor/src/app.css', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const setInAdmin = new Set([...css.matchAll(/(?<![\w(-])--urd-admin-([\w-]+)\s*:/g)].map((m) => m[1]));
  const editorDir = new URL('../editor/src/', import.meta.url);
  const bundled = new Set();
  for (const name of readdirSync(editorDir, { recursive: true }).filter((n) => /\.(?:js|svelte)$/.test(n))) {
    for (const [, spec] of readFileSync(new URL(name, editorDir), 'utf8').matchAll(/['"]\$engine\/([\w/.-]+\.js)['"]/g)) {
      for (const module of engineClosure(spec)) bundled.add(module);
    }
  }
  assert.ok(bundled.has('hint.js'), 'the help card the admin draws is among them');
  const unset = [...bundled].flatMap((module) => [...(engineReads.get(module) ?? [])].filter((name) => !setInAdmin.has(name)).map((name) => `${module}: --urd-admin-${name}`));
  assert.deepEqual(unset, [], 'every name a module the admin runs reads is set in app.css');
});
