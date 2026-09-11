/**
 * Tests of the plugin loading building blocks (v0.6 M1): the semver range check for requiresEngine, the manifest validation, the staging/rollback layer and the provides check.
 * The loading contract (one fetch wave, registration in list order, shared
 * in-flight loads) is tested through the loader's io seam; the real
 * fetch/import calls are browser code covered by the manual test rounds.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { parseSemver, satisfiesEngine, validateManifest, createStagedUrd, checkProvides } = await engineImport('plugins.js');
const { createRegistry } = await engineImport('registry.js');

test('parseSemver: valid and invalid forms', () => {
  assert.deepEqual(parseSemver('0.6.1'), [0, 6, 1]);
  assert.deepEqual(parseSemver('12.0.3'), [12, 0, 3]);
  for (const bad of ['0.6', 'v1.2.3', '1.2.3-beta', '', 'abc', '1.2.x']) {
    assert.equal(parseSemver(bad), null, bad);
  }
});

test('satisfiesEngine: ranges, caret, tilde and exact', () => {
  assert.ok(satisfiesEngine('0.6.0', '>=0.1.0 <1.0.0'));
  assert.ok(!satisfiesEngine('1.0.0', '>=0.1.0 <1.0.0'));
  assert.ok(satisfiesEngine('0.6.3', '^0.6.0'));
  assert.ok(!satisfiesEngine('0.7.0', '^0.6.0'), 'caret on 0.y locks minor');
  assert.ok(satisfiesEngine('1.4.9', '^1.2.0'));
  assert.ok(!satisfiesEngine('2.0.0', '^1.2.0'));
  assert.ok(satisfiesEngine('0.6.5', '~0.6.1'));
  assert.ok(!satisfiesEngine('0.7.0', '~0.6.1'));
  assert.ok(satisfiesEngine('0.6.0', '0.6.0'));
  assert.ok(!satisfiesEngine('0.6.1', '0.6.0'));
  assert.ok(satisfiesEngine('0.6.0', '>0.5.9'));
  assert.ok(satisfiesEngine('0.6.0', '<=0.6.0'));
});

test('satisfiesEngine: unintelligible requirements reject (never load blindly)', () => {
  // 'nyeste' is deliberate garbage input (a non-semver word).
  for (const range of ['', '  ', 'nyeste', '>=abc', '1.x', null, undefined]) {
    assert.equal(satisfiesEngine('0.6.0', range), false, String(range));
  }
  assert.equal(satisfiesEngine('ikke-semver', '>=0.1.0'), false);
});

test('validateManifest: mirrors the schema requirements', () => {
  const good = { id: 'kalender', name: 'Kalender', version: '0.1.0', requiresEngine: '>=0.6.0 <1.0.0', entry: 'index.js', provides: { blocks: ['kalender'] } };
  assert.deepEqual(validateManifest(good), []);
  assert.ok(validateManifest(null).length);
  assert.ok(validateManifest({ ...good, id: 'Stor-Bokstav' }).length);
  assert.ok(validateManifest({ ...good, version: '1.0' }).length);
  assert.ok(validateManifest({ ...good, entry: 'index.css' }).length);
  assert.ok(validateManifest({ ...good, provides: null }).length);
});

test('staging: definitions take effect only at commit, and id collisions are skipped with a warning', () => {
  const Urd = { blocks: createRegistry('blocks'), sections: createRegistry('sections'), backgrounds: createRegistry('backgrounds'), animations: createRegistry('animations') };
  Urd.blocks.define('tekst', { version: 1 });

  const staging = createStagedUrd(Urd);
  staging.staged.blocks.define('kalender', { version: 1 });
  staging.staged.blocks.define('tekst', { version: 9 });
  assert.equal(Urd.blocks.get('kalender'), undefined, 'nothing is registered before commit');

  const warnings = staging.commit();
  assert.ok(Urd.blocks.get('kalender'), 'the new definition is registered after commit');
  assert.equal(Urd.blocks.get('tekst').version, 1, 'a collision never overwrites the core');
  assert.equal(warnings.length, 1);
});

test('staging: a register() that throws leaves nothing behind', () => {
  const Urd = { blocks: createRegistry('blocks'), sections: createRegistry('sections'), backgrounds: createRegistry('backgrounds'), animations: createRegistry('animations') };
  const staging = createStagedUrd(Urd);
  assert.throws(() => {
    staging.staged.blocks.define('en', { version: 1 });
    throw new Error('plugin fails halfway through register()');
  });
  // commit() is never called on failure (loadPlugins catches the throw), so the registry is untouched.
  assert.equal(Urd.blocks.get('en'), undefined);
});

test('checkProvides: reports both broken promises and undeclared definitions', () => {
  // Deliberate Norwegian fixture ids: the diffs quote the ids verbatim.
  const provides = { blocks: ['kalender', 'lovet-men-mangler'] };
  const defined = { blocks: ['kalender', 'udeklarert'], sectionPresets: [], backgrounds: [], animations: [] };
  const diffs = checkProvides(provides, defined);
  assert.equal(diffs.length, 2);
  assert.ok(diffs.some((d) => d.includes('lovet-men-mangler')));
  assert.ok(diffs.some((d) => d.includes('udeklarert')));
});

test('staging: the templates registry accepts plugin templates with a fromPlugin mark', () => {
  const Urd = { blocks: createRegistry('blocks'), sections: createRegistry('sections'), backgrounds: createRegistry('backgrounds'), animations: createRegistry('animations'), templates: createRegistry('templates') };
  const staging = createStagedUrd(Urd, 'Testplugin');
  staging.staged.templates.define('var-hero', { name: 'Vår hero', kind: 'section', section: { id: 'sec-opphav', version: 1, blocks: [] } });
  assert.equal(Urd.templates.get('var-hero'), undefined, 'nothing is registered before commit');
  staging.commit();
  const tpl = Urd.templates.get('var-hero');
  assert.equal(tpl.kind, 'section');
  assert.equal(tpl.fromPlugin, 'Testplugin', 'plugin templates are marked like other plugin content');
  // The provides.templates promise is checked like the other kinds.
  const diffs = checkProvides({ templates: ['var-hero'] }, { templates: ['var-hero'] });
  assert.equal(diffs.length, 0);
});

// Registry aliases (ADR-0021): old contract ids resolve to the current
// definition, while a plugin that still defines the old id wins directly.
test('registry alias resolves an old id, direct define wins over alias', async () => {
  const { createRegistry } = await engineImport('registry.js');
  const reg = createRegistry('blocks');
  const newDef = { version: 1 };
  reg.define('calendar', newDef);
  reg.alias('kalender', 'calendar');
  assert.equal(reg.get('kalender'), newDef);
  assert.equal(reg.get('calendar'), newDef);
  const oldDef = { version: 1 };
  reg.define('kalender', oldDef);
  assert.equal(reg.get('kalender'), oldDef);
  assert.equal(reg.get('ukjent'), undefined);
});

test('checkProvides reads the legacy maler key as templates', () => {
  const provides = { blocks: [], sectionPresets: [], backgrounds: [], animations: [], maler: ['festival'] };
  const defined = { blocks: [], sectionPresets: [], backgrounds: [], animations: [], templates: ['festival'] };
  assert.deepEqual(checkProvides(provides, defined), []);
});

test('staged urd exposes maler as a legacy alias for templates', () => {
  const Urd = { blocks: createRegistry('blocks'), sections: createRegistry('sections'), backgrounds: createRegistry('backgrounds'), animations: createRegistry('animations'), templates: createRegistry('templates') };
  const staging = createStagedUrd(Urd, 'Gammel plugin');
  staging.staged.maler.define('festival', { name: 'Festival', kind: 'section', section: {} });
  staging.commit();
  assert.ok(Urd.templates.get('festival'), 'a legacy maler define lands in the templates registry');
  assert.deepEqual(staging.defined().templates, ['festival']);
});

/* ---------- The loader: parallel fetch, ordered registration ---------- */

const { io, loadPluginList } = await engineImport('plugins.js');

/** Installs a fake network for the loader: manifests and entry modules by
 *  url, with an optional delay per url so completion order can differ from
 *  list order. Returns the log of requested urls. */
function fakeNetwork(files, delays = {}) {
  const log = [];
  const wait = (url) => new Promise((resolve) => setTimeout(resolve, delays[url] ?? 0));
  io.fetchJson = async (url) => {
    log.push(url);
    await wait(url);
    if (!(url in files)) throw new Error(`404 ${url}`);
    return files[url];
  };
  io.importModule = async (url) => {
    log.push(url);
    await wait(url);
    if (!(url in files)) throw new Error(`404 ${url}`);
    return files[url];
  };
  return log;
}

const manifest = (id, blocks) => ({
  id, name: id, version: '1.0.0', requiresEngine: '>=0.6.0 <1.0.0', entry: 'index.js', provides: { blocks },
});
const entry = (blockId) => ({ register(urd) { urd.blocks.define(blockId, { version: 1 }); } });
const freshUrd = () => ({ blocks: createRegistry('blocks'), sections: createRegistry('sections'), backgrounds: createRegistry('backgrounds'), animations: createRegistry('animations'), templates: createRegistry('templates') });

test('loader: plugins are fetched in one wave and registered in list order', async () => {
  const log = fakeNetwork({
    '/plugins/ld-a/plugin.json': manifest('ld-a', ['ld-a-block']),
    '/plugins/ld-a/index.js': entry('ld-a-block'),
    '/plugins/ld-b/plugin.json': manifest('ld-b', ['ld-b-block']),
    '/plugins/ld-b/index.js': entry('ld-b-block'),
  }, { '/plugins/ld-a/plugin.json': 20, '/plugins/ld-a/index.js': 20 });
  const Urd = freshUrd();
  await loadPluginList(Urd, '0.6.11', ['ld-a', 'ld-b']);
  // Both manifests were requested before any module arrived: one wave, not a queue.
  assert.deepEqual(log.slice(0, 2), ['/plugins/ld-a/plugin.json', '/plugins/ld-b/plugin.json']);
  // ld-b finished first, but ld-a is registered first because it is first in the list.
  assert.deepEqual(Urd.blocks.ids(), ['ld-a-block', 'ld-b-block']);
});

test('loader: concurrent loads of the same id share one fetch, and a loaded id is never fetched again', async () => {
  const log = fakeNetwork({
    '/plugins/ld-c/plugin.json': manifest('ld-c', ['ld-c-block']),
    '/plugins/ld-c/index.js': entry('ld-c-block'),
  }, { '/plugins/ld-c/plugin.json': 10 });
  const Urd = freshUrd();
  await Promise.all([loadPluginList(Urd, '0.6.11', ['ld-c']), loadPluginList(Urd, '0.6.11', ['ld-c'])]);
  await loadPluginList(Urd, '0.6.11', ['ld-c']);
  assert.equal(log.filter((u) => u === '/plugins/ld-c/plugin.json').length, 1);
  assert.deepEqual(Urd.blocks.ids(), ['ld-c-block']);
});

test('loader: a failing plugin never blocks the others', async () => {
  fakeNetwork({
    '/plugins/ld-e/plugin.json': manifest('ld-e', ['ld-e-block']),
    '/plugins/ld-e/index.js': entry('ld-e-block'),
    '/plugins/ld-old/plugin.json': { ...manifest('ld-old', []), requiresEngine: '>=9.0.0' },
  });
  const Urd = freshUrd();
  const warn = console.warn;
  console.warn = () => {};
  try {
    await loadPluginList(Urd, '0.6.11', ['ld-missing', 'ld-old', 'ld-e']);
  } finally {
    console.warn = warn;
  }
  assert.deepEqual(Urd.blocks.ids(), ['ld-e-block']);
});
