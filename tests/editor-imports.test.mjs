/**
 * Every component tag and every directive function in the editor's Svelte
 * files is imported or declared in that file (0.7.26.5). The compiler does
 * not check this: an unknown `<Dropdown>` or `out:fly` compiles to a bare
 * reference and throws only when it is reached, which for an out transition
 * is in the middle of an update, where it freezes the screen.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('../editor/src/', import.meta.url).pathname;
function svelteFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...svelteFiles(p));
    else if (name.endsWith('.svelte')) out.push(p);
  }
  return out;
}

/** The names a file brings in or declares in its script. */
function declared(text) {
  const names = new Set();
  const script = [...text.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
  for (const m of script.matchAll(/import\s+(\w+)(?:\s*,\s*\{[^}]*\})?\s+from/g)) names.add(m.group?.(1) ?? m[1]);
  for (const m of script.matchAll(/import\s*(?:\w+\s*,\s*)?\{([^}]*)\}\s*from/g)) {
    for (const part of m[1].split(',')) {
      const local = part.trim().split(/\s+as\s+/).pop();
      if (local) names.add(local);
    }
  }
  for (const m of script.matchAll(/\b(?:const|let|function|class)\s+([A-Za-z_$][\w$]*)/g)) names.add(m[1]);
  for (const m of text.matchAll(/\{#snippet\s+([A-Za-z_$][\w$]*)/g)) names.add(m[1]);
  return names;
}

test('every component tag and directive function in editor/src is imported or declared', () => {
  const problems = [];
  for (const file of svelteFiles(ROOT)) {
    const text = readFileSync(file, 'utf8');
    const markup = text.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style[^>]*>[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '');
    const have = declared(text);
    const rel = file.slice(ROOT.length);
    for (const m of markup.matchAll(/<([A-Z][\w.]*)\b/g)) {
      const name = m[1].split('.')[0];
      if (!have.has(name)) problems.push(`${rel}: <${m[1]}> is not imported`);
    }
    for (const m of markup.matchAll(/\s(?:transition|in|out|animate|use):([A-Za-z_$][\w$]*)/g)) {
      if (!have.has(m[1])) problems.push(`${rel}: ${m[0].trim()} is not imported`);
    }
  }
  assert.deepEqual([...new Set(problems)], []);
});
