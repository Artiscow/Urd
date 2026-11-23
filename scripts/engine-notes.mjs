/**
 * The engine's notes: the modules a visitor's page loads keep short comments, and the full text of their longer ones stands in docs/engine-notes/<module>.md, under the name each explains.
 * A comment whose prose holds more than LIMIT characters is a long note; the code keeps one short version of it in its place, written by hand, its JSDoc tag lines whole.
 *
 *     node scripts/engine-notes.mjs todo <module>...         the long notes of each module, with their place and heading
 *     node scripts/engine-notes.mjs extract <module>...      writes each module's notes file from its committed version (--force to write over one)
 *     node scripts/engine-notes.mjs apply <module> <json>    writes the short versions a JSON object gives, by heading, in place of the long notes
 *     node scripts/engine-notes.mjs check <module>...        proves the code unchanged against the committed version and the notes complete
 *     node scripts/engine-notes.mjs pairs <module>...        each long note beside its short version, for a review
 *
 * `--base <rev>` names the committed version (HEAD), and `--all` stands for every module a visitor's page loads (visitorModules).
 * The parser is acorn, which the editor's dependencies hold (editor/node_modules).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, realpathSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import * as acorn from '../editor/node_modules/acorn/dist/acorn.mjs';
import { ENGINE_DIR, ENGINE_VERSION, engineClosure } from '../tests/_engine.mjs';

/** The most characters of prose a comment holds in the modules a visitor's page loads, its JSDoc tag lines apart, and a header's path to its notes. */
export const LIMIT = 160;

const ROOT = new URL('../', import.meta.url);
/** The folder of the notes, one file per module by its path in the engine folder. */
export const NOTES_DIR = new URL('docs/engine-notes/', ROOT);
const PARSE = { ecmaVersion: 'latest', sourceType: 'module', preserveParens: true, allowHashBang: true };

/** The words a short version or a note never uses, as a comment describes and never tells what was before. */
const HISTORY = /\b(no longer|previously|used to|would otherwise)\b/i;

/** The path of a module's notes in the repository, as its header names it. */
export const notesPath = (module) => `docs/engine-notes/${module.replace(/\.js$/, '.md')}`;

/** The modules a visitor's page loads to draw: the boot's closure, the closures of the modules core-types.js loads for the types, and the calendar's design renderers. */
export function visitorModules() {
  const set = new Set(engineClosure('boot.js'));
  const types = readFileSync(new URL('core-types.js', ENGINE_DIR), 'utf8');
  for (const m of types.matchAll(/import\('\.\/([^']+)'\)/g)) for (const name of engineClosure(m[1])) set.add(name);
  const load = readFileSync(new URL('blocks/calendar-load.js', ENGINE_DIR), 'utf8');
  const designs = load.match(/export const DESIGN_MODULES = \{([^\n]*)\};/)[1];
  for (const m of designs.matchAll(/import\('\.\/([^']+)'\)/g)) for (const name of engineClosure(`blocks/${m[1]}`)) set.add(name);
  return [...set].sort();
}

/** The prose of a comment's text, its markers taken off, and its JSDoc tag lines apart. */
function proseOf(kind, texts) {
  if (kind === 'line') return { prose: texts.map((t) => t.replace(/^ /, '')).join('\n').trim(), tags: '' };
  const lines = texts[0].split('\n').map((l) => l.replace(/^\s*\*?[ \t]?/, ''));
  if (kind === 'jsdoc') lines[0] = lines[0].replace(/^\*\s?/, '');
  const at = lines.findIndex((l) => /^@[a-z]+(\s|\{|$)/.test(l.trimStart()));
  const prose = (at < 0 ? lines : lines.slice(0, at)).join('\n').trim();
  const tags = at < 0 ? '' : lines.slice(at).map((l) => l.trim()).filter(Boolean).join('\n');
  return { prose, tags };
}

/** A header's line naming its module's notes, which a limit does not count. */
const NOTES_LINE = /Notes: docs\/engine-notes\/\S+ \(Urd repository\)\./;

/** The length a limit counts: the prose with its whitespace collapsed. */
export const proseLength = (prose) => prose.replace(/\s+/g, ' ').trim().length;

/**
 * The notes of a module's text, in order: consecutive `//` lines that stand alone on their lines are one note.
 * Each carries its kind, its place, the number of code tokens before it (its slot), its prose and its tag lines.
 * @param {string} src
 */
export function notesOf(src) {
  const comments = [];
  const ends = [];
  acorn.parse(src, { ...PARSE, onComment: (block, text, start, end) => comments.push({ block, text, start, end }), onToken: (t) => { if (t.type !== acorn.tokTypes.eof) ends.push(t.end); } });
  const slotOf = (pos) => {
    let lo = 0;
    let hi = ends.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (ends[mid] <= pos) lo = mid + 1; else hi = mid; }
    return lo;
  };
  const alone = (pos) => /^[ \t]*$/.test(src.slice(src.lastIndexOf('\n', pos - 1) + 1, pos));
  const notes = [];
  for (const c of comments) {
    const kind = !c.block ? 'line' : c.text.startsWith('*') && !c.text.startsWith('**') ? 'jsdoc' : 'block';
    const last = notes.at(-1);
    if (kind === 'line' && last?.kind === 'line' && last.alone && alone(c.start) && /^[ \t]*\n[ \t]*$/.test(src.slice(last.end, c.start))) {
      last.end = c.end;
      last.texts.push(c.text);
      continue;
    }
    notes.push({ kind, start: c.start, end: c.end, texts: [c.text], alone: alone(c.start) });
  }
  return notes.map((n, i) => {
    const { prose, tags } = proseOf(n.kind, n.texts);
    const slot = slotOf(n.start);
    const header = i === 0 && slot === 0;
    const counted = header ? prose.replace(NOTES_LINE, '') : prose;
    return { kind: n.kind, start: n.start, end: n.end, raw: src.slice(n.start, n.end), prose, tags, slot, alone: n.alone, header, long: proseLength(counted) > LIMIT };
  });
}

/* ---------- Headings ---------- */

const collapse = (text) => text.replace(/\s+/g, ' ').trim();

/** An anchor cut to at most 40 characters at a space, as a heading carries it. */
function cut(text) {
  const t = collapse(text).replaceAll('`', "'");
  if (t.length <= 40) return t;
  const at = t.lastIndexOf(' ', 40);
  return at > 10 ? t.slice(0, at) : t.slice(0, 40);
}

const keyName = (key) => (key?.type === 'Identifier' ? key.name : key?.type === 'PrivateIdentifier' ? `#${key.name}` : key?.type === 'Literal' ? String(key.value) : null);

/** The name a node gives what stands inside it, where it has one. */
function nameOf(node, src) {
  switch (node.type) {
    case 'FunctionDeclaration':
    case 'FunctionExpression':
    case 'ClassDeclaration':
    case 'ClassExpression':
      return node.id?.name ?? null;
    case 'VariableDeclarator':
      return node.id.type === 'Identifier' ? node.id.name : null;
    case 'Property':
    case 'MethodDefinition':
    case 'PropertyDefinition':
      return keyName(node.key);
    case 'CallExpression': {
      const callee = node.callee.type === 'MemberExpression' ? keyName(node.callee.property) : node.callee.type === 'Identifier' ? node.callee.name : null;
      const first = node.arguments[0];
      return callee ? `${callee}${first?.type === 'Literal' && typeof first.value === 'string' ? `('${first.value}')` : ''}` : null;
    }
    default:
      return null;
  }
}

/** The anchor of the code a note stands before. */
function anchorOf(node, src) {
  const text = (n) => src.slice(n.start, n.end);
  switch (node.type) {
    case 'VariableDeclaration':
      return cut(`${node.kind} ${node.declarations[0].id.type === 'Identifier' ? node.declarations[0].id.name : text(node.declarations[0].id)}`);
    case 'FunctionDeclaration':
    case 'ClassDeclaration':
      return node.id ? node.id.name : cut(text(node).split('\n')[0]);
    case 'ExportNamedDeclaration':
      return node.declaration ? anchorOf(node.declaration, src) : cut(text(node).split('\n')[0]);
    case 'ExportDefaultDeclaration':
      return 'export default';
    case 'ExpressionStatement': {
      const e = node.expression.type === 'ParenthesizedExpression' ? node.expression.expression : node.expression;
      if (e.type === 'CallExpression') {
        const first = e.arguments[0];
        return cut(`${text(e.callee)}${first?.type === 'Literal' && typeof first.value === 'string' ? `('${first.value}')` : ''}`);
      }
      if (e.type === 'AssignmentExpression') return cut(text(e.left));
      return cut(text(node).split('\n')[0]);
    }
    case 'IfStatement':
      return cut(`if (${text(node.test)}`);
    case 'ReturnStatement':
      return 'return';
    case 'Property':
    case 'MethodDefinition':
    case 'PropertyDefinition':
      return keyName(node.key) ?? cut(text(node).split('\n')[0]);
    case 'VariableDeclarator':
      return node.id.type === 'Identifier' ? node.id.name : cut(text(node.id));
    default:
      return cut(text(node).split('\n')[0]);
  }
}

/** The child nodes of a node, in order. */
function childrenOf(node) {
  const out = [];
  for (const [key, value] of Object.entries(node)) {
    if (key === 'type' || key === 'start' || key === 'end') continue;
    if (Array.isArray(value)) for (const v of value) { if (v && typeof v.type === 'string') out.push(v); }
    else if (value && typeof value.type === 'string') out.push(value);
  }
  return out.sort((a, b) => a.start - b.start);
}

/**
 * The heading of each note: «The module» for the header, else the names of what encloses the note and the anchor of the code it stands before, joined by ›; repeats numbered.
 * @param {string} src
 * @param {ReturnType<typeof notesOf>} notes
 * @returns {string[]}
 */
export function headingsOf(src, notes) {
  const ast = acorn.parse(src, PARSE);
  const seen = new Map();
  return notes.map((note) => {
    if (note.header) return 'The module';
    const names = [];
    let node = ast;
    for (;;) {
      const inside = childrenOf(node).find((c) => c.start < note.start && note.end <= c.end);
      if (!inside) break;
      const name = nameOf(inside, src);
      if (name) names.push(name);
      node = inside;
    }
    const next = childrenOf(node).find((c) => c.start >= note.end);
    let anchor = next ? anchorOf(next, src) : '(end)';
    if (names.length && names.at(-1) === anchor) anchor = null;
    const heading = [...names, anchor].filter(Boolean).join(' › ') || '(the module)';
    const count = (seen.get(heading) ?? 0) + 1;
    seen.set(heading, count);
    return count > 1 ? `${heading} (${count})` : heading;
  });
}

/* ---------- The notes files ---------- */

/** Markdown text that shows the prose as written: outside backtick spans, a backslash and each of < * _ are escaped, and a line's first # > + = too. */
export function escapeMd(text) {
  return text.split('\n').map((line) => {
    const parts = line.split(/(`[^`]*`)/);
    return parts.map((part, i) => {
      if (i % 2) return part;
      const escaped = part.replace(/[\\<*_]/g, '\\$&');
      return i === 0 ? escaped.replace(/^(\s*)([#>+=])/, '$1\\$2') : escaped;
    }).join('');
  }).join('\n');
}

/** The prose a notes file's text stands for (escapeMd's inverse). */
export function unescapeMd(text) {
  return text.split('\n').map((line) => line.split(/(`[^`]*`)/).map((part, i) => (i % 2 ? part : part.replace(/\\(.)/g, '$1'))).join('')).join('\n');
}

/** A module's notes file, written from its committed text: every long note under its heading, in the file's order. */
export function notesMarkdown(module, src) {
  const notes = notesOf(src);
  const headings = headingsOf(src, notes);
  const out = [`# ${module}`, '', `The full text of the longer comments in the engine's \`${module}\`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.`, ''];
  notes.forEach((note, i) => {
    if (!note.long) return;
    out.push(`## ${headings[i] === 'The module' ? 'The module' : `\`${headings[i]}\``}`, '', escapeMd(note.prose), '');
  });
  return `${out.join('\n').trimEnd()}\n`;
}

/** The sections of a notes file, by heading. */
export function notesSections(md) {
  const sections = new Map();
  let current = null;
  for (const line of md.split('\n')) {
    const m = line.match(/^## (?:`(.*)`|(.*))$/);
    if (m) {
      current = m[1] ?? m[2];
      if (sections.has(current)) throw new Error(`the heading ${current} stands twice`);
      sections.set(current, []);
    } else if (current !== null) sections.get(current).push(line);
  }
  return new Map([...sections].map(([k, v]) => [k, unescapeMd(v.join('\n')).trim()]));
}

/* ---------- Writing the short versions ---------- */

/** The comment text that puts a short version in a note's place, as its kind writes it. */
function shortComment(note, short, src) {
  const lineStart = src.lastIndexOf('\n', note.start - 1) + 1;
  const indent = note.alone ? src.slice(lineStart, note.start) : '';
  const lines = short.split('\n').map((l) => l.trim()).filter(Boolean);
  if (note.kind === 'line') return lines.map((l, i) => `${i ? indent : ''}// ${l}`).join('\n');
  if (note.header && !note.tags) return `${note.kind === 'jsdoc' ? '/**' : '/*'}\n${lines.map((l) => ` * ${l}`).join('\n')}\n */`;
  if (note.kind === 'block' && !note.tags) return `/* ${lines.join(' ')} */`;
  const raw = note.raw.split('\n');
  const tagAt = raw.findIndex((l, i) => i > 0 && /^\s*\*?\s*@/.test(l));
  if (tagAt < 0 && lines.length === 1 && !note.raw.includes('\n')) return `/** ${lines[0]} */`;
  const head = `/**\n${lines.map((l) => `${indent} * ${l}`).join('\n')}`;
  if (tagAt < 0) return `${head}\n${indent} */`;
  return `${head}\n${raw.slice(tagAt).join('\n')}`;
}

/**
 * A module's text with the short versions written in place of its long notes, by heading; the header takes the path to the notes beside its summary.
 * @param {string} module
 * @param {string} src
 * @param {Record<string, string>} shorts
 */
export function applyShorts(module, src, shorts) {
  const notes = notesOf(src);
  const headings = headingsOf(src, notes);
  const wanted = new Set(Object.keys(shorts));
  let out = src;
  for (let i = notes.length - 1; i >= 0; i--) {
    const note = notes[i];
    const heading = headings[i];
    if (!(heading in shorts)) continue;
    wanted.delete(heading);
    let short = shorts[heading];
    if (note.header) short = `${short.trim()}\nNotes: ${notesPath(module)} (Urd repository).`;
    out = out.slice(0, note.start) + shortComment(note, short, src) + out.slice(note.end);
  }
  if (wanted.has('The module') && !notes[0]?.header) {
    wanted.delete('The module');
    out = `/**\n * ${shorts['The module'].trim()}\n * Notes: ${notesPath(module)} (Urd repository).\n */\n${out}`;
  }
  if (wanted.size) throw new Error(`no note under ${[...wanted].join(', ')}`);
  return out;
}

/* ---------- The check ---------- */

/** An AST without places, for comparing two texts' code. */
function bare(src) {
  return JSON.stringify(acorn.parse(src, PARSE), (key, value) => (key === 'start' || key === 'end' || key === 'loc' || key === 'range' ? undefined : value));
}

function tokensOf(src) {
  return [...acorn.tokenizer(src, PARSE)].map((t) => `${t.type.label}:${t.value ?? ''}`);
}

/** A text's code lines without its comments: the non-blank lines, their ends trimmed. */
function codeLines(src, notes) {
  let out = '';
  let prev = 0;
  for (const n of notes) { out += src.slice(prev, n.start); prev = n.end; }
  out += src.slice(prev);
  return out.split('\n').map((l) => l.trimEnd()).filter((l) => l.trim());
}

const normal = (text) => text.replace(/\s+/g, ' ').trim();

/**
 * Checks a module's new text against its committed one: the same code, every short comment as it stood, one short version in each long note's place, and every long note whole in its notes.
 * @returns {{errors: string[], warnings: string[], shortened: number, before: {raw: number, gzip: number}, after: {raw: number, gzip: number}}}
 */
export function checkModule(module, base, now, md) {
  const errors = [];
  const warnings = [];
  if (bare(base) !== bare(now)) errors.push('the code differs');
  else if (tokensOf(base).join('\n') !== tokensOf(now).join('\n')) errors.push('the tokens differ');
  const was = notesOf(base);
  const is = notesOf(now);
  const a = codeLines(base, was);
  const b = codeLines(now, is);
  if (a.length !== b.length || a.some((l, i) => l !== b[i])) errors.push('a code line outside the comments differs');
  const bySlot = (list) => { const m = new Map(); for (const n of list) { if (!m.has(n.slot)) m.set(n.slot, []); m.get(n.slot).push(n); } return m; };
  const before = bySlot(was);
  const after = bySlot(is);
  const anyLong = was.some((n) => n.long);
  const headings = headingsOf(base, was);
  const mark = `Notes: ${notesPath(module)} (Urd repository).`;
  let shortened = 0;
  /** What every short version holds to: some words, its tag lines whole, no em dash, nothing cut short and no word of history. */
  const shortChecks = (where, old, neu, prose) => {
    if (!prose.trim()) errors.push(`${where}: the short version is empty`);
    if (normal(neu.tags) !== normal(old.tags)) errors.push(`${where}: the tag lines changed`);
    if (/\u2014/.test(prose)) errors.push(`${where}: an em dash`);
    if (/(\.\.\.|\u2026)\s*$/.test(prose)) warnings.push(`${where}: the short version ends cut short`);
    if (HISTORY.test(prose)) warnings.push(`${where}: a word of history`);
  };
  for (const slot of new Set([...before.keys(), ...after.keys()])) {
    const olds = before.get(slot) ?? [];
    const news = after.get(slot) ?? [];
    if (slot === 0 && !olds.length && news.length === 1 && news[0].header) {
      const summary = news[0].prose.replace(mark, '');
      if (!anyLong || !news[0].prose.includes(mark) || !summary.trim() || proseLength(summary) > LIMIT) errors.push('a header was added that is not a summary beside the path to the notes');
      continue;
    }
    if (olds.length !== news.length) { errors.push(`comments at code token ${slot}: ${olds.length} before, ${news.length} now`); continue; }
    olds.forEach((old, j) => {
      const neu = news[j];
      const where = `line ${base.slice(0, old.start).split('\n').length}`;
      if (old.header) {
        const summary = neu.prose.replace(mark, '');
        if (anyLong && !neu.prose.includes(mark)) errors.push(`${where}: the header does not name ${notesPath(module)}`);
        if (proseLength(summary) > LIMIT) errors.push(`${where}: the header holds ${proseLength(summary)} characters of prose beside the path to its notes`);
        if (!old.long && normal(summary) !== normal(old.prose.replace(mark, ''))) errors.push(`${where}: a short header changed beyond the path to its notes`);
        if (old.long) {
          shortened++;
          shortChecks(where, old, neu, summary);
        }
        return;
      }
      if (!old.long) {
        if (neu.raw !== old.raw) errors.push(`${where}: a short comment changed: ${old.raw.slice(0, 60)}`);
        return;
      }
      shortened++;
      if (neu.kind !== old.kind && !(old.kind === 'block' && neu.kind === 'line')) errors.push(`${where}: a ${old.kind} comment became a ${neu.kind} comment`);
      if (neu.long) errors.push(`${where}: still ${proseLength(neu.prose)} characters of prose`);
      shortChecks(where, old, neu, neu.prose);
    });
  }
  const directives = (src) => (src.match(/\/\* @vite-ignore \*\//g) ?? []).length;
  if (directives(base) !== directives(now)) errors.push('a @vite-ignore directive is gone');
  if (was.some((n) => n.long)) {
    if (md === null) errors.push(`no notes file at ${notesPath(module)}`);
    else {
      let sections;
      try { sections = notesSections(md); } catch (err) { errors.push(err.message); sections = new Map(); }
      was.forEach((old, i) => {
        if (!old.long) return;
        const body = sections.get(headings[i]);
        if (body === undefined) errors.push(`no note under ${headings[i]}`);
        else if (normal(body) !== normal(old.prose)) errors.push(`the note under ${headings[i]} is not the comment's text`);
      });
    }
  }
  const size = (src) => ({ raw: src.length, gzip: gzipSync(src, { level: 9 }).length });
  return { errors, warnings, shortened, before: size(base), after: size(now) };
}

/* ---------- The command ---------- */

const enginePath = (module) => `template/assets/engine/${ENGINE_VERSION}/${module}`;
const readNow = (module) => readFileSync(new URL(module, ENGINE_DIR), 'utf8');
const readBase = (module, rev) => execFileSync('git', ['show', `${rev}:${enginePath(module)}`], { cwd: fileURLToPath(ROOT), encoding: 'utf8', maxBuffer: 64 << 20 });
const notesFile = (module) => new URL(module.replace(/\.js$/, '.md'), NOTES_DIR);

function run(args) {
  const baseAt = args.indexOf('--base');
  const rev = baseAt >= 0 ? args.splice(baseAt, 2)[1] : 'HEAD';
  const force = args.includes('--force');
  const [mode, ...rest] = args.filter((a) => a !== '--force');
  const modules = rest.includes('--all') ? visitorModules() : rest;
  if (mode === 'todo') {
    for (const module of modules) {
      const src = readNow(module);
      const notes = notesOf(src);
      const headings = headingsOf(src, notes);
      notes.forEach((n, i) => {
        if (!n.long) return;
        console.log(`\n### ${module}:${src.slice(0, n.start).split('\n').length}  ${headings[i]}  (${proseLength(n.prose)})${n.tags ? '  [tags kept]' : ''}\n${n.prose}`);
      });
    }
    return 0;
  }
  if (mode === 'extract') {
    for (const module of modules) {
      const file = notesFile(module);
      const md = notesMarkdown(module, readBase(module, rev));
      if (!md.includes('\n## ')) { console.log(`--    ${module}: no long notes`); continue; }
      if (existsSync(file) && !force) { console.error(`FAIL  ${module}: ${notesPath(module)} stands already (--force writes over it)`); return 1; }
      mkdirSync(new URL('./', file), { recursive: true });
      writeFileSync(file, md);
      console.log(`OK    ${notesPath(module)}`);
    }
    return 0;
  }
  if (mode === 'apply') {
    const [module, json] = rest;
    writeFileSync(new URL(module, ENGINE_DIR), applyShorts(module, readNow(module), JSON.parse(readFileSync(json, 'utf8'))));
    console.log(`OK    ${module}: the short versions written`);
    return 0;
  }
  if (mode === 'check') {
    let failed = 0;
    for (const module of modules) {
      const file = notesFile(module);
      const r = checkModule(module, readBase(module, rev), readNow(module), existsSync(file) ? readFileSync(file, 'utf8') : null);
      const kb = (n) => (n / 1000).toFixed(1);
      console.log(`${r.errors.length ? 'FAIL' : 'OK  '}  ${module}: ${r.shortened} shortened, ${kb(r.before.gzip)} -> ${kb(r.after.gzip)} KB gzip (${kb(r.before.raw)} -> ${kb(r.after.raw)} KB raw)`);
      for (const e of r.errors) console.log(`        error: ${e}`);
      for (const w of r.warnings) console.log(`        warning: ${w}`);
      if (r.errors.length) failed++;
    }
    return failed ? 1 : 0;
  }
  if (mode === 'pairs') {
    for (const module of modules) {
      const base = readBase(module, rev);
      const was = notesOf(base);
      const headings = headingsOf(base, was);
      const after = new Map();
      for (const n of notesOf(readNow(module))) { if (!after.has(n.slot)) after.set(n.slot, []); after.get(n.slot).push(n); }
      const place = new Map();
      was.forEach((n, i) => {
        const at = place.get(n.slot) ?? 0;
        place.set(n.slot, at + 1);
        if (!n.long) return;
        const now = after.get(n.slot)?.[at];
        const code = base.slice(n.end).split('\n').slice(1, 4).join('\n');
        console.log(`\n### ${module}  ${headings[i]}\nORIGINAL: ${normal(n.prose)}\nSHORT:    ${now ? normal(now.prose) : '(none)'}\nCODE:\n${code}`);
      });
    }
    return 0;
  }
  console.error('usage: node scripts/engine-notes.mjs todo|extract|apply|check|pairs <module>... [--all] [--base <rev>] [--force]');
  return 1;
}

// Run as a command (the path resolved, as Node resolves the module's own), not when imported by the tests.
const invoked = () => { try { return realpathSync(process.argv[1]); } catch { return null; } };
if (process.argv[1] && invoked() === fileURLToPath(import.meta.url)) {
  process.exitCode = run(process.argv.slice(2));
}
