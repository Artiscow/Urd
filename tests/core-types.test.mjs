/**
 * The engine's own block and background types, loaded by what a page holds (core-types.js, ADR-0036).
 * These tests hold the tables to the modules that define the types, check that a page loads only the types it asks for, an old id's type among them, and that a core id stays the engine's before its module is in.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { ENGINE_DIR, engineImport } from './_engine.mjs';

const { CORE_BLOCKS, CORE_BACKGROUNDS, BLOCK_ALIASES, CORE_BLOCK_READY, READY_WAIT_MS, loadCoreTypes, reserveCoreTypes, pageBlocks, prepareBlocks } = await engineImport('core-types.js');
const { createRegistry } = await engineImport('registry.js');
const { createStagedUrd, needsPlugins } = await engineImport('plugins.js');

const read = (name) => readFileSync(new URL(name, ENGINE_DIR), 'utf8');
const fresh = () => ({ blocks: createRegistry('blocks'), sections: createRegistry('sections'), backgrounds: createRegistry('backgrounds'), animations: createRegistry('animations') });
const types = (blocks = [], backgrounds = []) => ({ blocks: new Set(blocks), backgrounds: new Set(backgrounds), animations: new Set() });

/** The definitions the modules in a folder export, by the suffix the engine names them with. */
function exported(folder, suffix) {
  const names = [];
  for (const file of readdirSync(new URL(`${folder}/`, ENGINE_DIR)).filter((f) => f.endsWith('.js'))) {
    for (const m of read(`${folder}/${file}`).matchAll(new RegExp(`export const (\\w+${suffix}) =`, 'g'))) names.push(`${folder}/${file}:${m[1]}`);
  }
  return names.sort();
}

/** The definitions the tables load, read from their loaders' text. */
function loaded(table) {
  return Object.values(table).map((load) => {
    const m = String(load).match(/import\('\.\/([^']+)'\)\.then\(\(m\) => m\.(\w+)\)/);
    assert.ok(m, `a loader names its module and export literally: ${load}`);
    return `${m[1]}:${m[2]}`;
  }).sort();
}

test('the tables load every block and background definition the engine has, each once', () => {
  assert.deepEqual(loaded(CORE_BLOCKS), exported('blocks', 'Block'));
  assert.deepEqual(loaded(CORE_BACKGROUNDS), exported('backgrounds', 'Layer'));
});

test('every loader gives a definition that draws', async () => {
  for (const [kind, table] of Object.entries({ blocks: CORE_BLOCKS, backgrounds: CORE_BACKGROUNDS })) {
    for (const [type, load] of Object.entries(table)) {
      const def = await load();
      assert.equal(typeof def?.render, 'function', `${kind}/${type}`);
      assert.ok(Number.isInteger(def.version) && def.version >= 1, `${kind}/${type} has a version (ADR-0005)`);
    }
  }
});

test('a page loads the types it holds, an old id\'s type for it, and nothing else', async () => {
  const Urd = fresh();
  await loadCoreTypes(Urd, types(['text', 'kalender', 'stjernekart'], ['color']));
  assert.deepEqual(Urd.blocks.ids().sort(), ['calendar', 'text']);
  assert.deepEqual(Urd.backgrounds.ids(), ['color']);
  await loadCoreTypes(Urd, types(['text', 'image']));
  assert.deepEqual(Urd.blocks.ids().sort(), ['calendar', 'image', 'text'], 'a type already defined is left as it is');
  await loadCoreTypes(Urd, null);
  assert.equal(Urd.blocks.ids().length, 3, 'no types, nothing loaded');
});

test('the preview\'s load defines every core type, through the definers the reserved registries hand back', async () => {
  const Urd = fresh();
  reserveCoreTypes(Urd);
  await loadCoreTypes(Urd, null, { all: true });
  assert.deepEqual(Urd.blocks.ids().sort(), Object.keys(CORE_BLOCKS).sort());
  assert.deepEqual(Urd.backgrounds.ids().sort(), Object.keys(CORE_BACKGROUNDS).sort());
});

test('the old ids name core types, as the boot\'s aliases do', () => {
  for (const [old, type] of Object.entries(BLOCK_ALIASES)) {
    assert.ok(Object.hasOwn(CORE_BLOCKS, type), `${old} stands for ${type}`);
    assert.match(read('urd.js'), new RegExp(`Urd\\.blocks\\.alias\\('${old}', '${type}'\\);`));
  }
});

test('a module that fails leaves its type undefined and the rest of the page loaded', async () => {
  const Urd = fresh();
  const warn = console.warn;
  const warned = [];
  console.warn = (...args) => warned.push(args[0]);
  CORE_BLOCKS.broken = () => Promise.reject(new Error('offline'));
  try {
    await loadCoreTypes(Urd, types(['broken', 'text']));
  } finally {
    delete CORE_BLOCKS.broken;
    console.warn = warn;
  }
  assert.deepEqual(Urd.blocks.ids(), ['text']);
  assert.match(warned[0], /'broken' could not be loaded/);
});

test('the blocks a page and its footer hold are found wherever they stand, and the engine readies only its own on the visitor\'s screen, a failure drawn as it is and a slow one waited for at most a while', async () => {
  const page = { sections: [{ blocks: [{ type: 'calendar', props: { design: 'next' } }, { type: 'text' }, { type: 'calendar', hideDesktop: true, props: { design: 'phone' } }] }, { blocks: [] }] };
  const footer = { columns: [{ blocks: [{ type: 'kalender', props: { design: 'retro' } }, { type: 'aurora', props: {} }] }] };
  assert.deepEqual(pageBlocks(page, footer).map((block) => block.type), ['calendar', 'text', 'calendar', 'kalender', 'aurora']);
  assert.deepEqual(pageBlocks(null, {}), []);
  const readied = [];
  const ctx = { site: {}, preview: false, viewport: 'desktop' };
  const calendar = CORE_BLOCK_READY.calendar;
  CORE_BLOCK_READY.calendar = async () => (props, given) => { readied.push([props, given]); };
  CORE_BLOCK_READY.quote = async () => () => Promise.reject(new Error('offline'));
  CORE_BLOCK_READY.stats = async () => () => { throw new Error('broken'); };
  CORE_BLOCK_READY.table = async () => () => new Promise(() => {});
  try {
    await prepareBlocks([...pageBlocks(page, footer), { type: 'quote' }, { type: 'stats' }, { type: 'unknown' }], ctx);
    assert.deepEqual(readied, [[{ design: 'next' }, ctx]], 'a calendar with its props and the page\'s context; one hidden on this screen, an old id a plugin may still draw, a plugin\'s type and a readying that fails left be');
    readied.length = 0;
    await prepareBlocks(pageBlocks(page), { ...ctx, viewport: 'mobile' });
    assert.equal(readied.length, 2, 'on the phone the calendar hidden on the desktop is readied');
    readied.length = 0;
    await prepareBlocks(pageBlocks(page), { ...ctx, preview: true });
    assert.equal(readied.length, 2, 'the editor\'s preview readies every calendar');
    const started = Date.now();
    await prepareBlocks([{ type: 'table' }], ctx, 30);
    assert.ok(Date.now() - started < 1000, 'a readying that never ends holds the page only for the wait');
  } finally {
    CORE_BLOCK_READY.calendar = calendar;
    for (const type of ['quote', 'stats', 'table']) delete CORE_BLOCK_READY[type];
  }
  assert.equal(READY_WAIT_MS, 500, 'as long as the loading bars wait');
  for (const type of Object.keys(CORE_BLOCK_READY)) assert.ok(Object.hasOwn(CORE_BLOCKS, type), `${type} is a core block type`);
  assert.equal(typeof (await CORE_BLOCK_READY.calendar()), 'function', 'the calendar\'s readying loads');
});

test('a core id is the engine\'s before its module is in: a plugin is refused it, and a page using it never waits for the plugins', () => {
  const Urd = fresh();
  reserveCoreTypes(Urd);
  assert.equal(Urd.blocks.ids().length, 0, 'reserving defines nothing');
  const staging = createStagedUrd(Urd, 'A plugin');
  staging.staged.blocks.define('text', { version: 9, render() {} });
  staging.staged.backgrounds.define('glow', { version: 9, render() {} });
  staging.staged.blocks.define('stjernekart', { version: 1, render() {} });
  staging.staged.blocks.define('kalender', { version: 1, render() {} });
  const warnings = staging.commit();
  assert.deepEqual(warnings, ["blocks/text: 'text' is the engine's own", "backgrounds/glow: 'glow' is the engine's own"]);
  assert.deepEqual(Urd.blocks.ids().sort(), ['kalender', 'stjernekart'], 'an old id is no core id: a plugin that still defines it wins for its own data (ADR-0021)');
  assert.throws(() => Urd.blocks.define('text', { version: 9, render() {} }), /the engine's own/, 'a direct definition is refused too');
  assert.equal(needsPlugins(types(['text', 'image'], ['glow']), Urd), false);
  assert.equal(needsPlugins(types(['text', 'nordlys']), Urd), true);
});

test('the boot loads a page\'s types before it asks whether the page waits for the plugins, and the preview loads them all', () => {
  const urd = read('urd.js');
  assert.match(urd, /^\s+reserveCoreTypes\(Urd\);/m, 'the ids are reserved in registerCore, before the plugins load');
  assert.ok(urd.indexOf('reserveCoreTypes(Urd);') < urd.indexOf('loadPlugins(Urd, engine)'));
  for (const [load, wait] of [
    ['await loadCoreTypes(Urd, pageTypes(site.nav));', 'needsPlugins(pageTypes(site.nav), Urd)'],
    ['await loadCoreTypes(Urd, pageTypes(page, site.footer));', 'needsPlugins(pageTypes(page, site.footer), Urd)'],
    ['await loadCoreTypes(Urd, pageTypes(freshPage, site.footer));', 'needsPlugins(pageTypes(freshPage, site.footer), Urd)'],
  ]) {
    assert.ok(urd.includes(load) && urd.includes(wait), load);
    assert.ok(urd.indexOf(load) < urd.indexOf(wait), `${load} comes before ${wait}`);
  }
  const early = urd.indexOf('    loadCoreTypes(Urd, pageTypes(site.footer));');
  assert.ok(early > 0 && early < urd.indexOf('const loaded = await pagePromise;'), 'the footer\'s modules come in beside the page file');
  assert.ok(urd.indexOf('state.page = freshPage;') > urd.indexOf('needsPlugins(pageTypes(freshPage, site.footer), Urd)'), 'a newer page file is shown only once its types are in');
  // What the page's own blocks draw with is readied beside their types, and waited for before the page is drawn, the preview's too.
  assert.match(urd, /const readied = prepareBlocks\(pageBlocks\(page, site\.footer\), \{ site, preview, viewport \}\);\s*if \(!preview\) await loadCoreTypes\(Urd, pageTypes\(page, site\.footer\)\);\s*if \(!preview && needsPlugins\(pageTypes\(page, site\.footer\), Urd\)\) await pluginsLoaded;\s*await readied;/);
  assert.ok(urd.indexOf('await readied;') > urd.indexOf('{ all: true }') && urd.indexOf('await readied;') < urd.indexOf('renderPage(state.page, state.site, opts.root'), 'the first drawing');
  assert.match(urd, /const freshReadied = prepareBlocks\(pageBlocks\(freshPage, site\.footer\), \{ site, preview, viewport: state\.viewport \}\);\s*await loadCoreTypes\(Urd, pageTypes\(freshPage, site\.footer\)\);\s*if \(needsPlugins\(pageTypes\(freshPage, site\.footer\), Urd\)\) await pluginsLoaded;\s*await freshReadied;\s*state\.page = freshPage;/, 'a newer page file');
  assert.match(urd, /loadCoreTypes\(Urd, null, \{ all: true \}\), import\('\.\/sections\/presets\.js'\)/);
  assert.ok(urd.indexOf('{ all: true }') < urd.indexOf('if (preview) enablePreview(state, opts);'), 'every type is in before the preview tells the editor it is ready');
});

test('a module that passes a name on from another and uses it itself imports it: `export { name } from` gives it no binding of its own', () => {
  const files = readdirSync(ENGINE_DIR, { recursive: true }).map(String).filter((f) => f.endsWith('.js'));
  assert.ok(files.length > 100, `${files.length} engine modules`);
  for (const file of files) {
    const src = read(file).replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1');
    for (const m of src.matchAll(/export\s*\{([^}]*)\}\s*from\s*['"][^'"]+['"]/g)) {
      const rest = src.replace(m[0], '');
      for (const part of m[1].split(',')) {
        const name = part.trim().split(/\s+as\s+/)[0];
        if (!name || name === 'default' || !new RegExp(`\\b${name}\\b`).test(rest)) continue;
        assert.match(rest, new RegExp(`import\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from`), `${file} uses ${name}, which it only passes on`);
      }
    }
  }
});
