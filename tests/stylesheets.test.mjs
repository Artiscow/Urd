/**
 * The stylesheets: base.css holds what a visitor's page draws, the engine's preview.css the rules that need the preview's body class (`.urd-preview`, which the boot sets in the preview alone) or name a class only the editing layer writes, and the calendar's sheets its views and designs (blocks/calendar.css, and each design family's own).
 * These tests keep each rule in its sheet as rules are added, and keep a preview rule from silently outranking a base rule it used to lose to by order alone.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ENGINE_DIR, calendarSheets, engineImport, engineClosure } from './_engine.mjs';
import { visitorModules } from '../scripts/engine-notes.mjs';

const engine = fileURLToPath(ENGINE_DIR);
const read = (path) => readFileSync(path, 'utf8');
const BASE = read(new URL('../template/assets/styles/base.css', import.meta.url));
const PREVIEW = read(join(engine, 'preview.css'));
const SHEETS = calendarSheets();
const CALENDAR = SHEETS.map((sheet) => sheet.text).join('\n');

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
/**
 * The classes only the editing layer's modules write: by a module the preview's editing layer (preview-edit.js) loads, and by no module a visitor's page can come to load or the admin bundles (it loads base.css, never preview.css).
 * A class built from a name at run time counts by its prefix (`urd-cal-f-${key}`, `'urd-x-' + name`); one a selector queries (`.urd-x`) or `classList.contains` asks about counts as read.
 */
function editorClasses() {
  const read = (module) => { try { return readFileSync(join(engine, module), 'utf8'); } catch { return ''; } };
  // Every module the roots load, statically or when asked (a dynamic import), the preview's editing layer left out where `skip` says.
  const reachFrom = (roots, skip) => {
    const seen = new Set();
    const queue = [...roots];
    while (queue.length) {
      const module = queue.pop();
      let closure = [];
      try { closure = [...engineClosure(module)]; } catch { /* a path outside the engine is no module of it */ }
      for (const name of [module, ...closure]) {
        if (seen.has(name)) continue;
        seen.add(name);
        for (const [, spec] of read(name).matchAll(/import\(\s*(?:\/\* @vite-ignore \*\/\s*)?'(\.{1,2}\/[^']+)'\)/g)) {
          const target = new URL(spec, new URL(name, 'file:///e/')).pathname.slice(3);
          if (!skip(target)) queue.push(target);
        }
      }
    }
    return seen;
  };
  const reach = reachFrom(visitorModules(), (module) => module === 'preview-edit.js');
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]));
  const bundled = new Set();
  for (const file of walk(fileURLToPath(new URL('../editor/src', import.meta.url))).filter((f) => /\.(js|svelte)$/.test(f))) {
    for (const [, module] of readFileSync(file, 'utf8').matchAll(/\$engine\/([\w/.-]+\.js)/g)) bundled.add(module);
  }
  const admin = reachFrom([...bundled], () => false);
  const editing = [...reachFrom(['preview-edit.js'], () => false)].filter((module) => !reach.has(module) && !admin.has(module));
  const written = (modules) => {
    const exact = new Set();
    const prefixes = [];
    for (const module of modules) {
      for (const [, name, open] of read(module).matchAll(/(?<![.\w-])(?<!contains\(\s*['"])(urd-[A-Za-z0-9-]*)(\$\{|['"]\s*\+)?/g)) {
        if (open) prefixes.push(name);
        else exact.add(name.replace(/-$/, ''));
      }
    }
    return (name) => exact.has(name) || prefixes.some((prefix) => prefix.length > 4 && name.startsWith(prefix));
  };
  const byEditor = written(editing);
  const byVisitor = written([...reach, ...admin]);
  return (name) => byEditor(name) && !byVisitor(name);
}
const editorOnly = editorClasses();
/** A rule the preview alone draws: it needs the preview's body class (on the body, or in a `:has` that asks for it), or names a class only the editing layer writes. */
const needsPreview = (sel) => classes(sel).includes('urd-preview') || /:has\((?:[^()]|\([^()]*\))*\.urd-preview(?![\w-])/.test(sel) || classes(sel).some(editorOnly);
const isCalendar = (sel) => classes(sel).some((c) => c === 'urd-cal' || c.startsWith('urd-cal-')) && !/urd-cal-loading|aria-busy/.test(sel);

test('every rule in preview.css needs the preview\'s body class or names a class only the editing layer writes', () => {
  const rules = selectorsOf(PREVIEW);
  assert.ok(rules.length > 300, `${rules.length} rules`);
  for (const sels of rules) for (const sel of sels) assert.ok(needsPreview(sel), `«${sel}» is drawn on a visitor's page too, so it belongs in base.css`);
});

test('every rule in the calendar\'s sheets is the calendar\'s, and the loading state stands in base.css', () => {
  const rules = selectorsOf(CALENDAR);
  assert.ok(rules.length > 500, `${rules.length} rules`);
  for (const sels of rules) for (const sel of sels) assert.ok(isCalendar(sel), `«${sel}» is not the calendar's`);
  assert.doesNotMatch(CALENDAR.replace(/\/\*[\s\S]*?\*\//g, ''), /urd-cal-loading/, 'the loading state shows before calendar.css is in');
  assert.match(BASE, /\.urd-cal-loading \{/);
});

test('each design family\'s sheet styles its own designs alone, loads with its renderer, and every calendar sheet in blocks/ is in the order calendar-load.js keeps', async () => {
  const { CAL_DESIGNS, CAL_PHONE_DESIGNS, CAL_CARD_DESIGNS } = await engineImport('calendar-designs.js');
  const familyOf = new Map([...CAL_DESIGNS, ...CAL_PHONE_DESIGNS, ...CAL_CARD_DESIGNS].map((d) => [d.id, d.module ?? 'calendar']));
  assert.equal(SHEETS[0].name, 'calendar', 'the shared sheet comes first');
  const { DESIGN_MODULES } = await engineImport('blocks/calendar-load.js');
  for (const sheet of SHEETS.slice(1)) {
    assert.ok(sheet.name in DESIGN_MODULES, `${sheet.file} is a design family's`);
    for (const [, id] of sheet.text.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/\.urd-cal-(?:d|dlg|pd)-([A-Za-z0-9]+)/g)) {
      assert.equal(familyOf.get(id), sheet.name, `${sheet.file} styles ${id}, a design of ${familyOf.get(id)}: its rules stand in its own family's sheet or in calendar.css`);
    }
  }
  const files = readdirSync(join(engine, 'blocks')).filter((name) => /^calendar(-\w+)?\.css$/.test(name)).map((name) => `blocks/${name}`).sort();
  assert.deepEqual(SHEETS.map((sheet) => sheet.file).sort(), files, 'every calendar sheet is placed in its order');
  const load = read(join(engine, 'blocks/calendar-load.js'));
  assert.match(load, /export const loadDesign = \(name\) => \(DESIGN_MODULES\[name\] \? Promise\.all\(\[DESIGN_MODULES\[name\]\(\), SHEETS\[name\] \? loadSheet\(name\) : null\]\)/, 'a renderer comes with its sheet');
  assert.match(load, /const later = placed\.find\(\(other\) => Number\(other\.dataset\.urdCalSheet\) > rank\);\s+if \(later\) later\.before\(link\);\s+else if \(placed\.length\) placed\.at\(-1\)\.after\(link\);/, 'in its place among the others, whatever order they come in');
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
  assert.match(urd, /const editing = preview \? Promise\.all\(\[import\('\.\/preview-edit\.js'\), loadStylesheet\(new URL\('\.\/preview\.css', import\.meta\.url\)\.href\), initAdminLocale\(\)\]\) : null;/, 'the editing layer, its sheet and the admin dictionary are asked for together');
  const boot = urd.slice(urd.indexOf('export async function boot('));
  assert.ok(boot.indexOf('const editing = preview') < boot.indexOf("await fetch('/content/site.json')"), 'as the boot starts, before the site is read');
  assert.match(boot, /if \(preview\) \{\s*\[window\.UrdPreviewEdit\] = await editing;/, 'and in place before the first render');
  assert.ok(boot.indexOf('= await editing;') < boot.indexOf('renderPage(state.page'));
  const calendar = read(join(engine, 'blocks/calendar-load.js'));
  assert.match(calendar, /const calendarParts = \(\) => Promise\.all\(\[[^\n]*loadSheet\('calendar'\)\]\)\.then\(\(parts\) => \(partsIn = parts\)\);/);
  const html = read(new URL('../template/index.html', import.meta.url));
  assert.doesNotMatch(html, /preview\.css|calendar\.css/, 'a visitor\'s page never asks for them');
});

test('base.css, which every page loads, carries one-line labels, its reasoning in docs/STYLES.md', () => {
  const comments = [...BASE.matchAll(/\/\*([\s\S]*?)\*\//g)].map((m) => m[1].trim());
  assert.ok(comments.length > 100, 'the labels are found');
  const [header, ...labels] = comments;
  assert.match(header, /docs\/STYLES\.md/, 'the file names where its reasoning stands');
  for (const label of labels) {
    assert.ok(!label.includes('\n'), `a label is one line: ${label.slice(0, 60)}`);
    assert.ok(label.length <= 72, `a label stays short; the reasoning goes in docs/STYLES.md: ${label.slice(0, 60)}`);
  }
  // Inside a rule a declaration carries no comment of its own; its note stands in docs/STYLES.md under the selector and the property.
  const bodies = BASE.replace(/^\/\*[\s\S]*?\*\//, '').match(/\{[^{}]*\}/g) ?? [];
  for (const body of bodies) assert.doesNotMatch(body, /\/\*/, `a comment inside a rule: ${body.slice(0, 80)}`);
  assert.match(readFileSync(new URL('../docs/STYLES.md', import.meta.url), 'utf8'), /^# base\.css, rule by rule$/m);
});
