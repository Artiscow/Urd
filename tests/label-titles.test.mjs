/**
 * Every label in the editor carries a «?» tooltip (`title`), the panel rule in AGENTS.md: a setting is explained in its tooltip, never in prose beside it (0.7.10.7).
 * The files are read through Svelte's own parser, so the markup is walked as a tree, never scanned as text.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = new URL('../editor/src/', import.meta.url).pathname;
const ROOTS = [SRC];
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

/** The lines of the labels in `source` without a title; a spread may carry one, so it counts as titled. */
function untitledLabels(source) {
  const root = parse(source, { modern: true });
  const lines = [];
  const visit = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { for (const n of node) visit(n); return; }
    if (node.type === 'RegularElement' && node.name === 'label') {
      const titled = node.attributes.some((a) => a.type === 'SpreadAttribute' || (a.type === 'Attribute' && a.name === 'title'));
      if (!titled) lines.push(source.slice(0, node.start).split('\n').length);
    }
    for (const [key, value] of Object.entries(node)) {
      if (key === 'metadata' || key === 'loc') continue;
      if (value && typeof value === 'object') visit(value);
    }
  };
  visit(root.fragment);
  return lines;
}

test('untitledLabels: a label without a title is found, a titled one and one inside a branch are told apart', () => {
  const src = [
    '<label>{ta("lbl.size")} <input /></label>',
    '<label title={ta("tip.size")}>{ta("lbl.size")} <input /></label>',
    '{#if open}<label>{ta("lbl.color")}</label>{/if}',
    '<label {...rest}>{ta("lbl.name")}</label>',
  ].join('\n');
  assert.deepEqual(untitledLabels(src), [1, 3]);
});

test('every label in the editor carries a tooltip', () => {
  const missing = [];
  for (const file of ROOTS.flatMap(svelteFiles)) {
    for (const line of untitledLabels(readFileSync(file, 'utf8'))) missing.push(`${file.slice(SRC.length)}:${line}`);
  }
  assert.deepEqual(missing, [], `labels without a title:\n${missing.join('\n')}`);
});
