/**
 * The stylesheets: base.css holds what a visitor's page draws, the engine's preview.css the rules that need the preview's body class (`.urd-preview`, which the boot sets in the preview alone) or name a class only the editing layer writes, and the calendar's sheets its views and designs (blocks/calendar.css, and each design family's own).
 * These tests keep each rule in its sheet as rules are added, and keep a preview rule from silently outranking a base rule it used to lose to by order alone.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ENGINE_DIR, calendarSheets, blockSheets, engineSheets, engineImport, engineClosure } from './_engine.mjs';
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
  // A class only a family's renderer writes; a class built from a name at run time counts by its prefix.
  const writes = (module) => {
    const text = read(join(engine, module));
    const exact = new Set([...text.matchAll(/(?<![.\w-])(urd-cal-[A-Za-z0-9-]*)(?![$\w-]|\$\{)/g)].map(([, name]) => name.replace(/-$/, '')));
    const prefixes = [...text.matchAll(/(?<![.\w-])(urd-cal-[A-Za-z0-9-]*)\$\{/g)].map(([, name]) => name);
    return (name) => exact.has(name) || prefixes.some((prefix) => prefix.length > 8 && name.startsWith(prefix));
  };
  const families = Object.fromEntries(SHEETS.slice(1).map((sheet) => [sheet.name, writes(`blocks/calendar-${sheet.name}.js`)]));
  const shared = ['blocks/calendar.js', 'blocks/calendar-plain.js', 'blocks/calendar-card.js', 'blocks/calendar-edit.js', 'calendar-designs.js'].map(writes);
  // The switcher's view box stands only beside the month and year family's renderer, which a calendar with a switcher always loads (designModules).
  const familyClass = (name, family) => (name === 'urd-cal-swview' ? family === 'time' : families[family](name) && !shared.some((w) => w(name)) && Object.entries(families).every(([other, w]) => other === family || !w(name)));
  // An :is() whose every argument names the family names it too.
  const isNames = (sel, family) => [...sel.matchAll(/:is\(([^()]*)\)/g)].some(([, list]) => list.split(',').every((arg) => classes(arg).some((name) => familyClass(name, family))));
  for (const sheet of SHEETS.slice(1)) {
    assert.ok(sheet.name in DESIGN_MODULES, `${sheet.file} is a design family's`);
    // Every selector names its family on its own, by a design of it or a class only its renderer writes, so no rule a calendar of another family needs stands here.
    for (const sel of selectorsOf(sheet.text).flat()) {
      const ids = [...sel.matchAll(/\.urd-cal-(?:d|dlg|pd)-([A-Za-z0-9]+)/g)].map(([, id]) => familyOf.get(id));
      assert.ok(ids.includes(sheet.name) || classes(sel).some((name) => familyClass(name, sheet.name)) || isNames(sel, sheet.name), `${sheet.file}: «${sel}» names nothing of its family`);
    }
    for (const [, id] of sheet.text.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/\.urd-cal-(?:d|dlg|pd)-([A-Za-z0-9]+)/g)) {
      assert.equal(familyOf.get(id), sheet.name, `${sheet.file} styles ${id}, a design of ${familyOf.get(id)}: its rules stand in its own family's sheet or in calendar.css`);
    }
  }
  const files = readdirSync(join(engine, 'blocks')).filter((name) => /^calendar(-\w+)?\.css$/.test(name)).map((name) => `blocks/${name}`).sort();
  assert.deepEqual(SHEETS.map((sheet) => sheet.file).sort(), files, 'every calendar sheet is placed in its order');
  const load = read(join(engine, 'blocks/calendar-load.js'));
  assert.match(load, /export const loadDesign = \(name\) => \(DESIGN_MODULES\[name\] \? Promise\.all\(\[DESIGN_MODULES\[name\]\(\), SHEETS\[name\] \? loadSheet\(name\) : null\]\)/, 'a renderer comes with its sheet');
  assert.match(load, /const loadSheet = \(name\) => loadStylesheet\(new URL\(SHEETS\[name\], import\.meta\.url\)\.href, placeInOrder\('calendar', Object\.keys\(SHEETS\)\.indexOf\(name\)\)\);/, 'in its place among the others, whatever order they come in');
  assert.match(read(join(engine, 'sheets.js')), /const later = placed\.find\(\(other\) => Number\(other\.dataset\.urdSheetRank\) > rank\);\s+const anchor = after\(\);\s+if \(later\) later\.before\(link\);\s+else if \(placed\.length\) placed\.at\(-1\)\.after\(link\);/);
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

test('no base rule is the twin of an engine sheet\'s rule: an override under an at-rule (reduced motion, a fallback) stands after its rule in the same sheet', () => {
  const norm = (sel) => sel.replace(/\s+/g, ' ').trim();
  const base = rulesOf(BASE);
  for (const sheet of engineSheets()) {
    for (const rule of rulesOf(sheet.text)) {
      for (const sel of rule.sels.map(norm)) {
        for (const b of base) {
          const shared = [...b.props].filter((prop) => rule.props.has(prop));
          if (shared.length && b.sels.map(norm).includes(sel)) assert.fail(`«${sel}» sets ${shared.join(', ')} in ${sheet.file} and in base.css, which loads before it`);
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

/**
 * The classes each block sheet's modules own: written by blocks/<name>.js (and, for the gallery's, the slideshow layer, a gallery drawn as a background), or by a helper only the loaders of those modules reach, and by no module the boot loads.
 * @returns {Map<string, (name: string) => boolean>} by the sheet's name, whether a class is that sheet's
 */
function blockOwners() {
  const read = (module) => { try { return readFileSync(join(engine, module), 'utf8'); } catch { return ''; } };
  const table = (name) => read('core-types.js').split(`export const ${name} = {`)[1].split('\n};')[0];
  const sheetOf = (module) => (module === 'backgrounds/slideshow.js' ? 'gallery' : /^blocks\/[a-z]+\.js$/.test(module) ? module.slice(7, -3) : null);
  // A block module's design parts, which it loads from its own folder as it draws (the contact block's map, the calendar's renderers), are its own.
  const partsOf = (module) => (/^blocks\//.test(module) ? [...read(module).matchAll(/import\('\.\/([a-z-]+\.js)'\)/g)].flatMap(([, file]) => [`blocks/${file}`, ...engineClosure(`blocks/${file}`)]) : []);
  const loaders = [...table('CORE_BLOCKS').split('\n'), ...table('CORE_BACKGROUNDS').split('\n')].map((line) => [...line.matchAll(/import\('\.\/([^']+)'\)/g)].map(([, path]) => path)).filter((imports) => imports.length)
    .map((imports) => ({ sheet: sheetOf(imports[0]), reach: new Set(imports.flatMap((m) => [m, ...engineClosure(m), ...partsOf(m)])) }));
  const boot = new Set(engineClosure('boot.js'));
  const writes = (module) => {
    const exact = new Set();
    const prefixes = [];
    for (const [, name, open] of read(module).matchAll(/(?<![.\w-])(?<!contains\(\s*['"])(urd-[A-Za-z0-9-]*)(\$\{|['"]\s*\+)?/g)) {
      if (open) prefixes.push(name);
      else exact.add(name.replace(/-$/, ''));
    }
    return (name) => exact.has(name) || prefixes.some((prefix) => prefix.length > 6 && name.startsWith(prefix));
  };
  const owners = new Map();
  const reached = [...new Set(loaders.flatMap((l) => [...l.reach]))];
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]));
  const everyModule = walk(engine.replace(/\/$/, '')).filter((f) => f.endsWith('.js')).map((f) => f.slice(engine.replace(/\/$/, '').length + 1));
  for (const { name } of blockSheets()) {
    const own = reached.filter((m) => sheetOf(m) === name);
    const helpers = reached.filter((m) => !boot.has(m) && sheetOf(m) === null && !m.startsWith('backgrounds/') && loaders.every((l) => !l.reach.has(m) || l.sheet === name));
    const mine = new Set([...own, ...helpers]);
    const tests = [...mine].map(writes);
    const elsewhere = everyModule.filter((m) => !mine.has(m)).map(writes);
    // A class only the sheet's own modules write: a page without them never draws it, so its rule is theirs alone.
    owners.set(name, Object.assign((cls) => tests.some((test) => test(cls)), { alone: (cls) => tests.some((test) => test(cls)) && !elsewhere.some((test) => test(cls)) }));
  }
  return owners;
}

test('each block module\'s sheet holds its own rules: every rule names a class its module writes and none another module\'s alone, with one-line labels and its reasoning in docs/STYLES.md', () => {
  const owners = blockOwners();
  for (const sheet of blockSheets()) {
    const mine = owners.get(sheet.name);
    const others = [...owners].filter(([name]) => name !== sheet.name).map(([, owns]) => owns);
    // Every selector on its own: a list that mixes a selector of the module's with one of every page's would take the latter away from the pages without the module.
    for (const sel of selectorsOf(sheet.text).flat()) {
      const names = classes(sel);
      assert.ok(names.some(mine.alone), `${sheet.file}: «${sel}» names no class that blocks/${sheet.name}.js and its own helpers alone write`);
      for (const name of names) if (!mine(name)) assert.ok(!others.some((owns) => owns(name)), `${sheet.file}: «${sel}» names ${name}, another block module's alone`);
    }
    const comments = [...sheet.text.matchAll(/\/\*([\s\S]*?)\*\//g)].map((m) => m[1].trim());
    const [header, ...labels] = comments;
    assert.match(header, /docs\/STYLES\.md/, `${sheet.file} names where its reasoning stands`);
    for (const label of labels) assert.ok(!label.includes('\n') && label.length <= 72, `${sheet.file}: a label is one short line: ${label.slice(0, 60)}`);
    for (const body of sheet.text.replace(/^\/\*[\s\S]*?\*\//, '').match(/\{[^{}]*\}/g) ?? []) assert.doesNotMatch(body, /\/\*/, `${sheet.file}: a comment inside a rule`);
  }
  const styles = readFileSync(new URL('../docs/STYLES.md', import.meta.url), 'utf8');
  for (const [, name] of styles.matchAll(/^# blocks\/([a-z]+)\.css, rule by rule$/gm)) assert.ok(owners.has(name), `STYLES.md's ${name}.css is a block sheet`);
});

test('each engine sheet holds its own rules, loads with the code that draws them before the block sheets, with one-line labels and its reasoning in docs/STYLES.md', async () => {
  const OWN = { 'nav-launcher.css': /^urd-nav-launcher/, 'nav-cart.css': /^urd-nav-cart/, 'footer.css': /^urd-footer/, 'doc-look.css': /^urd-(text-)?doc(-|$)/, 'totop.css': /^urd-totop/ };
  const { CORE_FEATURES } = await engineImport('features.js');
  const { CORE_BLOCKS } = await engineImport('core-types.js');
  const text = readFileSync(new URL('blocks/text.js', ENGINE_DIR), 'utf8');
  // Each sheet's loaders: a feature's own, and for the documents the privacy block's and the text block's document designs (loadDocs).
  const loaders = { 'nav-launcher.css': [CORE_FEATURES.launcher], 'nav-cart.css': [CORE_FEATURES.shop], 'footer.css': [CORE_FEATURES.footer], 'doc-look.css': [CORE_BLOCKS.privacy, text.match(/export function loadDocs\(\) \{[^}]*\}/)?.[0]], 'totop.css': [CORE_FEATURES.totop] };
  const sheets = engineSheets();
  assert.deepEqual(sheets.map((sheet) => sheet.file), Object.keys(OWN), 'the sheets in the order their rules stood in base.css');
  for (const sheet of sheets) {
    for (const sel of selectorsOf(sheet.text).flat()) assert.ok(classes(sel).some((name) => OWN[sheet.file].test(name)), `${sheet.file}: «${sel}» names none of its own classes`);
    for (const load of loaders[sheet.file]) assert.ok(String(load).includes(`'${sheet.file}'`), `${sheet.file} loads with ${String(load).slice(0, 60)}`);
    const elsewhere = [...Object.values(CORE_FEATURES), ...Object.values(CORE_BLOCKS)].filter((load) => String(load).includes(`'${sheet.file}'`) && !loaders[sheet.file].includes(load));
    assert.deepEqual(elsewhere, [], `${sheet.file} loads with its own code alone`);
    const comments = [...sheet.text.matchAll(/\/\*([\s\S]*?)\*\//g)].map((m) => m[1].trim());
    const [header, ...labels] = comments;
    assert.match(header, /docs\/STYLES\.md/, `${sheet.file} names where its reasoning stands`);
    for (const label of labels) assert.ok(!label.includes('\n') && label.length <= 72, `${sheet.file}: a label is one short line: ${label.slice(0, 60)}`);
  }
  // The footer's and the back-to-top button's rules all left base.css; the basket's, the documents' and the animations' that a later rule meets stay there for their order.
  for (const list of selectorsOf(BASE)) {
    const theirs = list.every((sel) => classes(sel).length && classes(sel).every((name) => /^urd-(footer|totop)/.test(name)));
    assert.ok(!theirs, `base.css: «${list.join(', ')}» belongs to footer.css or totop.css`);
  }
  const styles = readFileSync(new URL('../docs/STYLES.md', import.meta.url), 'utf8');
  for (const { file } of sheets) assert.match(styles, new RegExp(`^# ${file.replace('.', '\\.')}, rule by rule$`, 'm'));
  const types = readFileSync(new URL('core-types.js', ENGINE_DIR), 'utf8');
  assert.match(types, /placeInOrder\('blocks', BLOCK_SHEETS\.indexOf\(name\), afterEngineSheets\)/, 'the block sheets follow the engine sheets');
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
