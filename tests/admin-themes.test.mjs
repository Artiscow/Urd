/**
 * The admin's colour themes (editor/src/app.css): each sets the text on its accent, the colour the editor sends the canvas (readableOn in state/shell.svelte.js).
 * That text is readable on the accent at 4.5:1 or more (WCAG AA), in the admin and on the canvas alike.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const CSS = readFileSync(new URL('../editor/src/app.css', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const SHELL = readFileSync(new URL('../editor/src/state/shell.svelte.js', import.meta.url), 'utf8');

/** A colour's relative luminance (WCAG 2). */
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** The admin themes in app.css, each with its accent and the text on it. */
function themes() {
  const found = [...CSS.matchAll(/:root\[data-admin-theme='([\w-]+)'\] \{([^}]*)\}/g)].map(([, name, body]) => ({
    name,
    accent: body.match(/--urd-color-accent:\s*(#[0-9a-f]{6});/i)?.[1],
    text: body.match(/--urd-color-accent-text:\s*(#[0-9a-f]{6});/i)?.[1],
  }));
  assert.ok(found.length >= 7, `${found.length} admin themes read from app.css`);
  return found;
}

test('the canvas is sent black or white text on the admin accent, whichever reads better', () => {
  const fn = SHELL.slice(SHELL.indexOf('function readableOn('), SHELL.indexOf('\n}\n', SHELL.indexOf('function readableOn(')));
  assert.match(fn, /contrastRatio\(bg, '#ffffff'\)[^?]*\?\? 0\) >= \(contrastRatio\(bg, '#000000'\)[^?]*\?\? 0\) \? '#ffffff' : '#000000'/, 'readableOn picks between white and black');
  assert.match(SHELL, /'accent-text': readableOn\(accent\)/, 'and sends its pick as the canvas\'s accent text');
});

test('every admin theme sets the text on its accent as the canvas is sent it, readable at 4.5:1 or more', () => {
  for (const { name, accent, text } of themes()) {
    assert.ok(accent && text, `${name} sets its accent and the text on it`);
    const pick = contrast(accent, '#ffffff') >= contrast(accent, '#000000') ? '#ffffff' : '#000000';
    assert.equal(text.toLowerCase(), pick, `${name}: the admin's text on ${accent} is the canvas's`);
    assert.ok(contrast(accent, text) >= 4.5, `${name}: ${text} on ${accent} reads at ${contrast(accent, text).toFixed(2)}:1`);
  }
});

test('the admin reads its accent text from the theme, and starts with the default accent\'s', () => {
  const root = [...CSS.matchAll(/\n\s*:root \{([^}]*)\}/g)].map((m) => m[1]).find((body) => body.includes('--urd-admin-bg'));
  assert.ok(root, 'the admin\'s own variables are found');
  assert.match(root, /--urd-admin-accent-text: var\(--urd-color-accent-text\);/, 'the --urd-admin-* name follows the theme');
  const base = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8');
  const accent = base.match(/--urd-color-accent:\s*(#[0-9a-f]{6});/i)[1];
  const text = root.match(/--urd-color-accent-text:\s*(#[0-9a-f]{6});/i)?.[1];
  assert.ok(text && contrast(accent, text) >= 4.5, `before a theme is set, the text on base.css's accent ${accent} reads at 4.5:1 or more`);
});

/** The admin's style rules, app.css's and every Svelte component's, each with where it stands. */
function adminRules() {
  const src = fileURLToPath(new URL('../editor/src/', import.meta.url));
  const walk = (dir) => readdirSync(dir).flatMap((name) => (statSync(dir + name).isDirectory() ? walk(`${dir}${name}/`) : [dir + name]));
  const sheets = [['app.css', CSS]];
  for (const file of walk(src).filter((f) => f.endsWith('.svelte'))) {
    const style = readFileSync(file, 'utf8').match(/<style[^>]*>([\s\S]*?)<\/style>/);
    if (style) sheets.push([file.slice(src.length), style[1].replace(/\/\*[\s\S]*?\*\//g, '')]);
  }
  return sheets.flatMap(([file, css]) => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => ({ file, selector: selector.trim().replace(/\s+/g, ' '), body })));
}
const FILLS_ACCENT = /background(?:-color)?:\s*var\(--urd-(?:color|admin)-accent(?:,[^)]*)?\)/;
const COLOUR = /(?<![-\w])color:\s*([^;]+);/;
const ACCENT_TEXT = /^var\(--urd-(?:color|admin)-accent-text(?:,[^)]*)?\)$/;

test('every admin rule that writes on the accent takes the accent\'s text colour, the pill drawn under a chosen button\'s words too', () => {
  const rules = adminRules();
  assert.ok(rules.length > 1000, `${rules.length} admin rules read`);
  const wrong = [];
  for (const { file, selector, body } of rules) {
    if (!FILLS_ACCENT.test(body)) continue;
    const colour = body.match(COLOUR)?.[1].trim();
    if (colour && !ACCENT_TEXT.test(colour)) wrong.push(`${file}: «${selector}» writes in ${colour} on the accent`);
    if (/::before$/.test(selector)) {
      const words = selector.replace(/::before$/, '');
      const own = rules.find((rule) => rule.file === file && rule.selector === words && COLOUR.test(rule.body));
      const ink = own?.body.match(COLOUR)[1].trim();
      if (own && !ACCENT_TEXT.test(ink)) wrong.push(`${file}: «${words}» writes in ${ink} on the accent its ::before draws`);
    }
  }
  assert.deepEqual(wrong, []);
});

