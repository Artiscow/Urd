/**
 * The button block's own colours (blocks/button.js, base.css): the fill, the words, the outline and the fill under the pointer, each a theme colour name or an own colour over the design's, and none set leaves the design as it was.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { engineImport } from './_engine.mjs';
const { buttonBlock } = await engineImport('blocks/button.js');

/** An element stub with the style and class list the colours write. */
function makeElement() {
  const props = new Map();
  const classes = new Set();
  return {
    className: '', textContent: '', children: [], vars: props,
    style: { setProperty: (name, value) => props.set(name, value) },
    classList: { add: (name) => classes.add(name), contains: (name) => classes.has(name) },
    appendChild(child) { this.children.push(child); },
  };
}

function renderButton(props) {
  globalThis.document = { createElement: () => makeElement() };
  try {
    const el = makeElement();
    buttonBlock.render(el, { label: 'Les mer', page: null, href: '#', style: 'primary', ...props }, { site: { pages: [] } });
    return el.children[0];
  } finally {
    delete globalThis.document;
  }
}

test('the owner\'s colours stand as the button\'s own, a theme name as the theme\'s colour and an own colour as it is', () => {
  const a = renderButton({ bg: 'text', color: '#ffffff', borderColor: 'accent', hoverBg: 'surface' });
  assert.equal(a.vars.get('--urd-btn-bg'), 'var(--urd-color-text)');
  assert.equal(a.vars.get('--urd-btn-text'), '#ffffff');
  assert.equal(a.vars.get('--urd-btn-border'), 'var(--urd-color-accent)');
  assert.equal(a.vars.get('--urd-btn-hover'), 'var(--urd-color-surface)');
  assert.ok(a.classList.contains('urd-button-own-hover'), 'its own fill under the pointer');
  assert.ok(a.classList.contains('urd-button-own-border'), 'its own line');
});

test('a button with none of the colours is drawn by its design alone', () => {
  const a = renderButton({ bg: '', color: undefined });
  assert.equal(a.vars.size, 0);
  assert.ok(!a.classList.contains('urd-button-own-hover'));
  assert.ok(!a.classList.contains('urd-button-own-border'), 'a filled button without a line of its own has none, so its words keep their room');
  assert.equal(a.className, 'urd-button urd-button-primary');
});

test('each design falls back to its own colour from the theme, and an own fill under the pointer replaces the lightening', () => {
  const css = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8');
  assert.match(css, /\.urd-button-primary \{\s*background: var\(--urd-btn-bg, var\(--urd-color-accent\)\);[\s\S]*?color: var\(--urd-btn-text, var\(--urd-color-accent-text, var\(--urd-color-bg\)\)\);\s*\}/, 'no border on a filled button of its own');
  assert.match(css, /\.urd-button-primary\.urd-button-own-border \{\s*border: 1px solid var\(--urd-btn-border\);/);
  assert.match(css, /\.urd-button-secondary \{\s*background: var\(--urd-btn-bg, transparent\);\s*border: 1px solid var\(--urd-btn-border, var\(--urd-color-accent\)\);\s*color: var\(--urd-btn-text, var\(--urd-color-accent\)\);/);
  assert.match(css, /\.urd-button\.urd-button-own-hover:hover \{\s*background: var\(--urd-btn-hover\);\s*filter: none;/);
  // The menu writes the four under Style in their card, each empty while it follows the design.
  const menu = readFileSync(new URL('../editor/src/menu/families/Button.svelte', import.meta.url), 'utf8');
  assert.match(menu, /const COLOURS = \{ bg: undefined, color: undefined, borderColor: undefined, hoverBg: undefined \};/);
  assert.match(menu, /<Capability id="btn-colours" group=\{groupOf\('btn-colours', COLOURS\)\}>/, 'a capability, a card while the button uses its colours or they were added');
});
