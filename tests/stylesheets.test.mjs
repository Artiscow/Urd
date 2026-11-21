/**
 * The three stylesheets: base.css holds what a visitor's page draws, the engine's preview.css the rules that need the preview's body class (`.urd-preview`, which the boot sets in the preview alone), and blocks/calendar.css the calendar's views and designs.
 * These tests keep each rule in its sheet as rules are added, and keep a preview rule from silently outranking a base rule it used to lose to by order alone.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ENGINE_DIR } from './_engine.mjs';

const engine = fileURLToPath(ENGINE_DIR);
const read = (path) => readFileSync(path, 'utf8');
const BASE = read(new URL('../template/assets/styles/base.css', import.meta.url));
const PREVIEW = read(join(engine, 'preview.css'));
const CALENDAR = read(join(engine, 'blocks/calendar.css'));

/** Every style rule's selectors, with comments and at-rule preludes left out. */
function selectorsOf(css) {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [];
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') {
      const prelude = text.slice(start, i).trim();
      if (prelude.startsWith('@')) { start = i + 1; continue; }
      let depth = 1;
      let j = i + 1;
      for (; j < text.length && depth; j++) { if (text[j] === '{') depth++; else if (text[j] === '}') depth--; }
      if (!/^(?:from|to|\d+%)/.test(prelude)) {
        const parts = [];
        let cur = '';
        let level = 0;
        for (const c of prelude) { if (c === '(') level++; if (c === ')') level--; if (c === ',' && level === 0) { parts.push(cur.trim()); cur = ''; } else cur += c; }
        parts.push(cur.trim());
        rules.push(parts.filter(Boolean));
      }
      i = j - 1;
      start = j;
    } else if (text[i] === '}') {
      start = i + 1;
    }
  }
  return rules;
}
const outside = (sel) => { let s = sel; for (;;) { const n = s.replace(/:(?:not|is|where|has)\((?:[^()]|\([^()]*\))*\)/g, ''); if (n === s) return s; s = n; } };
const classes = (sel) => [...outside(sel).matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1]);
const needsPreview = (sel) => classes(sel).includes('urd-preview');
const isCalendar = (sel) => classes(sel).some((c) => c === 'urd-cal' || c.startsWith('urd-cal-')) && !/urd-cal-loading|aria-busy/.test(sel);

test('every rule in preview.css needs the preview\'s body class', () => {
  const rules = selectorsOf(PREVIEW);
  assert.ok(rules.length > 300, `${rules.length} rules`);
  for (const sels of rules) for (const sel of sels) assert.ok(needsPreview(sel), `«${sel}» is drawn on a visitor's page too, so it belongs in base.css`);
});

test('every rule in blocks/calendar.css is the calendar\'s, and the loading state stands in base.css', () => {
  const rules = selectorsOf(CALENDAR);
  assert.ok(rules.length > 500, `${rules.length} rules`);
  for (const sels of rules) for (const sel of sels) assert.ok(isCalendar(sel), `«${sel}» is not the calendar's`);
  assert.doesNotMatch(CALENDAR.replace(/\/\*[\s\S]*?\*\//g, ''), /urd-cal-loading/, 'the loading state shows before calendar.css is in');
  assert.match(BASE, /\.urd-cal-loading \{/);
});

test('base.css holds no rule that belongs to the preview or to the calendar', () => {
  for (const sels of selectorsOf(BASE)) {
    if (sels.every(needsPreview)) assert.fail(`«${sels.join(', ')}» needs the preview: preview.css`);
    if (sels.every(isCalendar)) assert.fail(`«${sels.join(', ')}» is the calendar's: blocks/calendar.css`);
  }
});

/** A selector's specificity as ids, classes (with attributes and states) and types, the functional pseudo-classes but :where counted by their arguments. */
function specificity(sel) {
  const s = sel.replace(/:where\((?:[^()]|\([^()]*\))*\)/g, '').replace(/:(?:not|is|has)\(((?:[^()]|\([^()]*\))*)\)/g, ' $1 ');
  const ids = (s.match(/#[\w-]+/g) ?? []).length;
  const cls = (s.match(/\.[\w-]+|\[[^\]]+\]|:(?!:)[\w-]+/g) ?? []).length;
  const types = (s.replace(/\[[^\]]*\]|"[^"]*"/g, '').match(/(?:^|[\s>+~])[a-z][\w-]*/gi) ?? []).length + (s.match(/::[\w-]+/g) ?? []).length;
  return `${ids},${cls},${types}`;
}
/** Every style rule's selectors with the properties it sets. */
function rulesOf(css) {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const out = [];
  for (const m of text.matchAll(/([^{}@;]+)\{([^{}]*)\}/g)) {
    const props = new Set([...m[2].matchAll(/(?:^|;)\s*([-a-z]+)\s*:/g)].map((p) => p[1]));
    const sels = [];
    let cur = '';
    let level = 0;
    for (const c of m[1]) { if (c === '(') level++; if (c === ')') level--; if (c === ',' && level === 0) { sels.push(cur.trim()); cur = ''; } else cur += c; }
    sels.push(cur.trim());
    out.push({ sels: sels.filter(Boolean), props });
  }
  return out;
}
const subject = (sel) => new Set((outside(sel).split(/[\s>+~]+/).filter(Boolean).pop() ?? '').match(/\.[\w-]+/g) ?? []);

test('no base rule shares a preview rule\'s subject, its specificity and a property: the preview sheet loads later, so it would win by order where base.css had the last word', () => {
  const base = rulesOf(BASE);
  for (const p of rulesOf(PREVIEW)) {
    for (const ps of p.sels) {
      const own = subject(ps);
      for (const b of base) {
        if (![...b.props].some((prop) => p.props.has(prop))) continue;
        for (const bs of b.sels) {
          const theirs = subject(bs);
          if (!theirs.size || [...theirs].some((c) => !own.has(c)) || specificity(bs) !== specificity(ps)) continue;
          assert.fail(`«${ps}» in preview.css and «${bs}» in base.css set ${[...b.props].filter((prop) => p.props.has(prop)).join(', ')} at the same specificity`);
        }
      }
    }
  }
});

test('the preview loads its sheet with the editing layer, and a calendar loads its own with its modules', () => {
  const urd = read(join(engine, 'urd.js'));
  assert.match(urd, /Promise\.all\(\[import\('\.\/preview-edit\.js'\), loadStylesheet\(new URL\('\.\/preview\.css', import\.meta\.url\)\.href\)\]\)/);
  const calendar = read(join(engine, 'blocks/calendar.js'));
  assert.match(calendar, /const calendarParts = \(\) => Promise\.all\(\[[^\n]*loadStylesheet\(new URL\('\.\/calendar\.css', import\.meta\.url\)\.href\)\]\);/);
  const html = read(new URL('../template/index.html', import.meta.url));
  assert.doesNotMatch(html, /preview\.css|calendar\.css/, 'a visitor\'s page never asks for them');
});
