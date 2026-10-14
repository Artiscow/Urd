/**
 * Every component tag and every directive function in the editor's Svelte
 * files is imported or declared in that file (0.7.26.5). The compiler does
 * not check this: an unknown `<Dropdown>` or `out:fly` compiles to a bare
 * reference and throws only when it is reached, which for an out transition
 * is in the middle of an update, where it freezes the screen. The files are
 * read through Svelte's own parser, so the markup and the script are walked
 * as trees, never scanned as text.
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

/** Calls `visit` on every node (an object with a string `type`) in the tree. */
function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) { for (const n of node) walk(n, visit); return; }
  if (typeof node.type === 'string') visit(node);
  for (const [key, value] of Object.entries(node)) {
    if (key === 'metadata' || key === 'loc') continue;
    if (value && typeof value === 'object') walk(value, visit);
  }
}

/** The identifiers bound by a declaration pattern (a name, or the names inside a destructuring). */
function patternNames(pattern, out) {
  walk(pattern, (n) => { if (n.type === 'Identifier') out.add(n.name); });
}

/** The names a file brings in or declares: its imports, its top-level declarations and its snippets. */
function declared(root) {
  const names = new Set();
  for (const script of [root.instance, root.module]) {
    if (!script) continue;
    walk(script.content, (n) => {
      if (n.type === 'ImportSpecifier' || n.type === 'ImportDefaultSpecifier' || n.type === 'ImportNamespaceSpecifier') names.add(n.local.name);
      else if (n.type === 'VariableDeclarator') patternNames(n.id, names);
      else if ((n.type === 'FunctionDeclaration' || n.type === 'ClassDeclaration') && n.id) names.add(n.id.name);
    });
  }
  walk(root.fragment, (n) => { if (n.type === 'SnippetBlock') names.add(n.expression.name); });
  return names;
}

test('every component tag and directive function in editor/src is imported or declared', () => {
  const problems = [];
  for (const file of svelteFiles(ROOT)) {
    const rel = file.slice(ROOT.length);
    const root = parse(readFileSync(file, 'utf8'), { modern: true, filename: rel });
    const have = declared(root);
    walk(root.fragment, (n) => {
      if (n.type === 'Component') {
        if (!have.has(n.name.split('.')[0])) problems.push(`${rel}: <${n.name}> is not imported`);
      } else if (n.type === 'TransitionDirective' || n.type === 'UseDirective' || n.type === 'AnimateDirective') {
        if (!have.has(n.name.split('.')[0])) problems.push(`${rel}: ${n.type} ${n.name} is not imported`);
      }
    });
  }
  assert.deepEqual([...new Set(problems)], []);
});

test('the check sees a component tag and an out transition without an import', () => {
  const root = parse('<script>\n  let open = true;\n</script>\n{#if open}<Dropdown out:fly />{/if}', { modern: true });
  const have = declared(root);
  const missing = [];
  walk(root.fragment, (n) => {
    if (n.type === 'Component' && !have.has(n.name)) missing.push(n.name);
    if (n.type === 'TransitionDirective' && !have.has(n.name)) missing.push(n.name);
  });
  assert.deepEqual(missing, ['Dropdown', 'fly']);
});
