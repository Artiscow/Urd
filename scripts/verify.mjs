/**
 * The verification round in one command (see Verification in AGENTS.md).
 * Run from the repo root:
 *
 *     node scripts/verify.mjs            the full round: build, every test, schema validation
 *     node scripts/verify.mjs --quick    at a commit: only what the diff touches
 *     node scripts/verify.mjs --list     the quick selection without running it
 *     node scripts/verify.mjs --list --paths a.js,b.js   the selection for given paths, without git
 *
 * Quick mode reads the changed and untracked paths from git and picks the
 * test files that name them (by file name, or by the folder of a new file),
 * builds the editor only when its source or an engine module it bundles
 * changed, and validates only when the schemas or the content changed. A
 * change that touches the test harness or the package files falls back to
 * the full round, so a quick run never hides what a shared change breaks.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { basename, dirname } from 'node:path';
import process from 'node:process';

const ROOT = new URL('../', import.meta.url);
const mode = process.argv.includes('--list') ? 'list' : process.argv.includes('--quick') ? 'quick' : 'full';
/** Paths given on the command line stand in for git's answer. */
const givenPaths = (process.argv[process.argv.indexOf('--paths') + 1] ?? '').split(',').map((p) => p.trim()).filter(Boolean);

/** The output of a git command, as trimmed lines. */
function git(args) {
  const run = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8' });
  if (run.status !== 0) throw new Error(`git ${args.join(' ')} failed: ${run.stderr}`);
  return run.stdout.split('\n').map((l) => l.trim()).filter(Boolean);
}

/** The changed paths: staged, unstaged and untracked, relative to the root. */
function changedPaths() {
  return [...new Set([...git(['diff', '--name-only', 'HEAD']), ...git(['ls-files', '--others', '--exclude-standard'])])];
}

/** The engine modules the editor bundles: every `$engine/<path>` import in its source. */
function bundledEngineModules() {
  const found = new Set();
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir);
      if (entry.isDirectory()) walk(url);
      else if (/\.(js|svelte)$/.test(entry.name)) {
        for (const m of readFileSync(url, 'utf8').matchAll(/\$engine\/([\w./-]+)/g)) found.add(m[1]);
      }
    }
  };
  walk(new URL('editor/src/', ROOT));
  return found;
}

/** The engine's directory name, from urd.json (ADR-0013). */
const ENGINE = JSON.parse(readFileSync(new URL('template/urd.json', ROOT), 'utf8')).engine;
const ENGINE_DIR = `template/assets/engine/${ENGINE}/`;

/** Folder names too common to pick a test by: nearly every test names them. */
const GENERIC = new Set(['src/', 'editor/', 'template/', 'assets/', 'engine/', `${ENGINE}/`, 'content/']);

/** Paths whose change means a shared change: the quick round falls back to the full one. */
const SHARED = [/^tests\/_/, /^package(-lock)?\.json$/, /^editor\/package(-lock)?\.json$/, /^editor\/vite\.config\.js$/, /^scripts\/verify\.mjs$/, /^\.github\//];

/**
 * The files under template/functions/ that import a given one, one static
 * import edge at a time: a change to a helper selects the tests that name
 * the endpoints built on it.
 */
function functionImporters() {
  const dir = new URL('template/functions/', ROOT);
  const files = [];
  const walk = (base, rel) => {
    for (const entry of readdirSync(base, { withFileTypes: true })) {
      const path = rel + entry.name;
      if (entry.isDirectory()) walk(new URL(entry.name + '/', base), path + '/');
      else if (entry.name.endsWith('.js')) files.push(path);
    }
  };
  walk(dir, 'template/functions/');
  const importers = new Map();
  for (const file of files) {
    const text = readFileSync(new URL(file, ROOT), 'utf8');
    for (const m of text.matchAll(/from\s+'(\.\.?\/[^']+)'/g)) {
      const target = new URL(m[1], new URL(file, ROOT)).pathname.replace(ROOT.pathname, '');
      if (!importers.has(target)) importers.set(target, new Set());
      importers.get(target).add(file);
    }
  }
  return importers;
}

/** The test files, and each one's text. */
function testFiles() {
  const dir = new URL('tests/', ROOT);
  return readdirSync(dir).filter((n) => n.endsWith('.test.mjs')).map((name) => ({ name: `tests/${name}`, text: readFileSync(new URL(name, dir), 'utf8') }));
}

/**
 * The quick selection for a set of changed paths: which tests, whether to
 * build and whether to validate, with a reason per test.
 * @returns {{full: boolean, reason?: string, tests: Map<string, string>, build: boolean, validate: boolean}}
 */
function select(paths) {
  const shared = paths.find((p) => SHARED.some((re) => re.test(p)));
  if (shared) return { full: true, reason: `${shared} is shared by every test`, tests: new Map(), build: true, validate: true };
  const tests = new Map();
  const all = testFiles();
  const bundled = bundledEngineModules();
  const importers = functionImporters();
  // A changed function module stands for every function file that imports it, through every edge.
  const seen = new Set(paths);
  const queue = [...paths];
  while (queue.length) {
    const path = queue.shift();
    for (const importer of importers.get(path) ?? []) if (!seen.has(importer)) { seen.add(importer); queue.push(importer); }
  }
  const widened = [...seen];
  let build = false;
  let validate = false;
  for (const path of widened) {
    if (path.startsWith('tests/') && path.endsWith('.test.mjs')) { tests.set(path, 'changed'); continue; }
    if (path.startsWith('editor/src/')) build = true;
    if (path.startsWith(ENGINE_DIR) && bundled.has(path.slice(ENGINE_DIR.length))) build = true;
    if (/^schema\/|^template\/content\/|^editor\/scripts\/validate\.mjs$|page-presets|sections\/presets/.test(path)) validate = true;
    // A test names the file (checkout.js, nb.js, index.html) or, for a new file or an editor source file, one of its two nearest folders (_lib/, functions/, panels/): the editor's tests build file names from the folder.
    const name = basename(path);
    const parent = dirname(path);
    const folders = [parent, dirname(parent)].filter((d) => d && d !== '.').map((d) => `${basename(d)}/`).filter((f) => !GENERIC.has(f));
    const byFolder = !existsInHead(path) || path.startsWith('editor/src/');
    // A test that walks the whole editor source from its root stands for every Svelte file in it (the button names, the label tooltips, the imports).
    if (path.startsWith('editor/src/') && path.endsWith('.svelte')) {
      for (const t of all) if (t.text.includes("'../editor/src/'")) tests.set(t.name, `walks the editor source (${name})`);
    }
    for (const t of all) {
      if (t.text.includes(name)) tests.set(t.name, paths.includes(path) ? `names ${name}` : `names ${name}, which imports a changed module`);
      else if (byFolder) {
        const folder = folders.find((f) => t.text.includes(f));
        if (folder) tests.set(t.name, `walks ${folder} (${name})`);
      }
    }
  }
  if (!tests.size && widened.some((p) => !/\.md$/.test(p))) return { full: true, reason: 'no test names the changed files, so every test runs', tests: new Map(), build, validate };
  return { full: false, tests, build, validate };
}

/** Whether the path exists in HEAD (false for a new file). */
function existsInHead(path) {
  return spawnSync('git', ['cat-file', '-e', `HEAD:${path}`], { cwd: ROOT }).status === 0;
}

/** Runs a step and returns whether it passed; the output streams through. */
function step(label, command, args, cwd = ROOT) {
  console.log(`\n== ${label}`);
  const run = spawnSync(command, args, { cwd, stdio: 'inherit' });
  return run.status === 0;
}

const paths = process.argv.includes('--paths') ? givenPaths : changedPaths();
const plan = mode === 'full' ? { full: true, reason: 'full round', tests: new Map(), build: true, validate: true } : select(paths);

if (mode !== 'full') {
  console.log(`changed: ${paths.length ? paths.join(', ') : '(nothing)'}`);
  if (plan.full) console.log(`full round: ${plan.reason}`);
  else {
    for (const [file, why] of plan.tests) console.log(`test  ${file}  (${why})`);
    console.log(`build ${plan.build ? 'yes' : 'no'}; validate ${plan.validate ? 'yes' : 'no'}`);
  }
}
if (mode === 'list') process.exit(0);

const results = [];
if (plan.build) results.push(['build', step('build the editor', 'npm', ['run', 'build'], new URL('editor/', ROOT))]);
if (plan.full) results.push(['tests', step('every test', 'node', ['--test', ...readdirSync(new URL('tests/', ROOT)).filter((n) => n.endsWith('.mjs')).map((n) => `tests/${n}`)])]);
else if (plan.tests.size) results.push(['tests', step(`${plan.tests.size} test file(s)`, 'node', ['--test', ...plan.tests.keys()])]);
else console.log('\n== only documents changed: no test to run');
if (plan.validate) results.push(['validate', step('schema validation', 'npm', ['run', 'validate'], new URL('editor/', ROOT))]);

console.log('');
for (const [label, ok] of results) console.log(`${ok ? 'OK  ' : 'FAIL'}  ${label}`);
if (plan.build && existsSync(new URL('template/admin/assets/editor.js', ROOT))) {
  const touched = git(['diff', '--name-only', '--', 'template/admin/assets']);
  if (touched.length) console.log(`note  the bundle changed (${touched.join(', ')}): commit it with the source`);
}
process.exit(results.every(([, ok]) => ok) ? 0 : 1);
