/**
 * The canvas's editing chrome takes the admin's theme (0.7.30.7).
 * The multi-selection bar, the colour picker, the canvas dropdown, the hidden-blocks list and the right-click menu draw their surface, their text, their lines and their marks from the --urd-admin-* variables the editor sends the preview.
 * A colour written out may stand only as a variable's fallback, in a shadow, in a gradient, or in a part that draws colour or danger itself (KEEPS).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE_DIR } from './_engine.mjs';

const BASE = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8');
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
