/**
 * Every button in the editor's Svelte files has a name: its own text, a
 * `title` or an `aria-label` (0.7.10.4). An icon-only button without one
 * says nothing before a click, and a screen reader reads it as «button».
 * The files are read through Svelte's own parser, so the markup is walked
 * as a tree, never scanned as text.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('../editor/src/', import.meta.url).pathname;
const { parse } = await import(new URL('../editor/node_modules/svelte/src/compiler/index.js', import.meta.url).href);

function svelteFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...svelteFiles(p));
    else if (name.endsWith('.svelte')) out.push(p);
  }
  return out;
}

/** The attributes that name a button; a spread may carry one, so it counts as named. */
const NAMING = new Set(['title', 'aria-label', 'aria-labelledby']);

/** Whether the nodes render any text: a text node, or an expression (an `{@html}` icon and an svg render none). */
function rendersText(nodes) {
  return nodes.some((n) => {
    if (n.type === 'Text') return n.data.trim() !== '';
    if (n.type === 'ExpressionTag') return true;
    if (n.type === 'HtmlTag') return false;
    if (n.type === 'RegularElement' && n.name === 'svg') return false;
    const kids = [n.fragment?.nodes, n.consequent?.nodes, n.alternate?.nodes, n.body?.nodes].filter(Boolean).flat();
    return rendersText(kids);
  });
}

/** The lines of the buttons in `source` that have no text, title or aria-label. */
function unnamedButtons(source) {
  const root = parse(source, { modern: true });
  const lines = [];
  const visit = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { for (const n of node) visit(n); return; }
    if (node.type === 'RegularElement' && node.name === 'button') {
      const named = node.attributes.some((a) => a.type === 'SpreadAttribute' || (a.type === 'Attribute' && NAMING.has(a.name)));
      if (!named && !rendersText(node.fragment.nodes)) lines.push(source.slice(0, node.start).split('\n').length);
    }
    for (const [key, value] of Object.entries(node)) {
      if (key === 'metadata' || key === 'loc') continue;
      if (value && typeof value === 'object') visit(value);
    }
  };
  visit(root.fragment);
  return lines;
}

test('unnamedButtons: an icon-only button is found, a titled one and one with words are not', () => {
  const src = [
    '<button onclick={go}>{@html ICONS.up}</button>',
    '<button title={ta("tip.moveUp")}>{@html ICONS.up}</button>',
    '<button>{ta("ui.save")}</button>',
    '<button aria-label="Close"><svg></svg></button>',
    '{#if open}<button><svg></svg></button>{/if}',
  ].join('\n');
  assert.deepEqual(unnamedButtons(src), [1, 5]);
});

test('every button in the editor has text, a title or an aria-label', () => {
  const missing = [];
  for (const file of svelteFiles(ROOT)) {
    for (const line of unnamedButtons(readFileSync(file, 'utf8'))) missing.push(`${file.slice(ROOT.length)}:${line}`);
  }
  assert.deepEqual(missing, [], `buttons without a name:\n${missing.join('\n')}`);
});
