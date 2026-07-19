/**
 * Test av plugin-lastingens byggeklosser (v0.6 M1): semver-intervallsjekken for requiresEngine,
 * manifest-valideringen, staging/rollback-laget og provides-kontrollen.
 * Selve fetch/import-flyten er nettleserkode og dekkes av fasegatens manuelle port.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseSemver, satisfiesEngine, validateManifest, createStagedUrd, checkProvides } from '../template/assets/engine/plugins.js';
import { createRegistry } from '../template/assets/engine/registry.js';

test('parseSemver: gyldige og ugyldige former', () => {
  assert.deepEqual(parseSemver('0.6.1'), [0, 6, 1]);
  assert.deepEqual(parseSemver('12.0.3'), [12, 0, 3]);
  for (const bad of ['0.6', 'v1.2.3', '1.2.3-beta', '', 'abc', '1.2.x']) {
    assert.equal(parseSemver(bad), null, bad);
  }
});

test('satisfiesEngine: intervaller, caret, tilde og eksakt', () => {
  assert.ok(satisfiesEngine('0.6.0', '>=0.1.0 <1.0.0'));
  assert.ok(!satisfiesEngine('1.0.0', '>=0.1.0 <1.0.0'));
  assert.ok(satisfiesEngine('0.6.3', '^0.6.0'));
  assert.ok(!satisfiesEngine('0.7.0', '^0.6.0'), 'caret på 0.y låser minor');
  assert.ok(satisfiesEngine('1.4.9', '^1.2.0'));
  assert.ok(!satisfiesEngine('2.0.0', '^1.2.0'));
  assert.ok(satisfiesEngine('0.6.5', '~0.6.1'));
  assert.ok(!satisfiesEngine('0.7.0', '~0.6.1'));
  assert.ok(satisfiesEngine('0.6.0', '0.6.0'));
  assert.ok(!satisfiesEngine('0.6.1', '0.6.0'));
  assert.ok(satisfiesEngine('0.6.0', '>0.5.9'));
  assert.ok(satisfiesEngine('0.6.0', '<=0.6.0'));
});

test('satisfiesEngine: uforståelige krav avviser (aldri last i blinde)', () => {
  for (const range of ['', '  ', 'nyeste', '>=abc', '1.x', null, undefined]) {
    assert.equal(satisfiesEngine('0.6.0', range), false, String(range));
  }
  assert.equal(satisfiesEngine('ikke-semver', '>=0.1.0'), false);
});

test('validateManifest: speiler skjemakravene', () => {
  const good = { id: 'kalender', name: 'Kalender', version: '0.1.0', requiresEngine: '>=0.6.0 <1.0.0', entry: 'index.js', provides: { blocks: ['kalender'] } };
  assert.deepEqual(validateManifest(good), []);
  assert.ok(validateManifest(null).length);
  assert.ok(validateManifest({ ...good, id: 'Stor-Bokstav' }).length);
  assert.ok(validateManifest({ ...good, version: '1.0' }).length);
  assert.ok(validateManifest({ ...good, entry: 'index.css' }).length);
  assert.ok(validateManifest({ ...good, provides: null }).length);
});

test('staging: definisjoner tas i bruk kun ved commit, og id-kollisjoner hoppes over med varsel', () => {
  const Urd = { blocks: createRegistry('blocks'), sections: createRegistry('sections'), backgrounds: createRegistry('backgrounds'), animations: createRegistry('animations') };
  Urd.blocks.define('tekst', { version: 1 });

  const staging = createStagedUrd(Urd);
  staging.staged.blocks.define('kalender', { version: 1 });
  staging.staged.blocks.define('tekst', { version: 9 });
  assert.equal(Urd.blocks.get('kalender'), undefined, 'ingenting registreres før commit');

  const warnings = staging.commit();
  assert.ok(Urd.blocks.get('kalender'), 'ny definisjon er registrert etter commit');
  assert.equal(Urd.blocks.get('tekst').version, 1, 'kollisjon overskriver aldri kjernen');
  assert.equal(warnings.length, 1);
});

test('staging: en register() som kaster etterlater ingenting', () => {
  const Urd = { blocks: createRegistry('blocks'), sections: createRegistry('sections'), backgrounds: createRegistry('backgrounds'), animations: createRegistry('animations') };
  const staging = createStagedUrd(Urd);
  assert.throws(() => {
    staging.staged.blocks.define('en', { version: 1 });
    throw new Error('plugin feiler halvveis i register()');
  });
  // commit() kalles aldri ved feil (loadPlugins fanger kastet), så registeret er urørt.
  assert.equal(Urd.blocks.get('en'), undefined);
});

test('checkProvides: melder både brutte løfter og udeklarerte definisjoner', () => {
  const provides = { blocks: ['kalender', 'lovet-men-mangler'] };
  const defined = { blocks: ['kalender', 'udeklarert'], sectionPresets: [], backgrounds: [], animations: [] };
  const diffs = checkProvides(provides, defined);
  assert.equal(diffs.length, 2);
  assert.ok(diffs.some((d) => d.includes('lovet-men-mangler')));
  assert.ok(diffs.some((d) => d.includes('udeklarert')));
});
