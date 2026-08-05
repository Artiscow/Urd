/**
 * Oppdaterings-planen (ADR-0014): ren logikk, tre-lister inn og
 * endringssett ut. Scenarioene speiler regeltabellen i update-plan.js,
 * inkludert motorbytte-swappen (gammel versjonert mappe slettes, ny legges
 * inn) som faller ut av de generiske reglene uten egen kode.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  planUpdate, highestVersionTag, isAtomPath, chunkEntries,
} from '../template/functions/_lib/update-plan.js';

const change = (plan, path) => plan.changes.find((c) => c.path === path);

test('highestVersionTag: høyeste treparts vinner, andre navn ignoreres', () => {
  assert.equal(highestVersionTag(['v0.6.8', 'v0.6.9', 'v0.6.10']), 'v0.6.10');
  assert.equal(highestVersionTag(['v0.9.1', 'v1.0.0', 'v0.10.2']), 'v1.0.0');
  assert.equal(highestVersionTag(['v0.6.9-rc.1', 'utkast', 'v0.6']), null);
  assert.equal(highestVersionTag(['v0.6.9-rc.1', 'v0.6.8']), 'v0.6.8');
  assert.equal(highestVersionTag([]), null);
  assert.equal(highestVersionTag(undefined), null);
});

test('isAtomPath: motorgruppen låses, functions og løse rotfiler er valgfrie', () => {
  for (const path of ['index.html', 'urd.json', 'admin/assets/editor.js',
    'assets/engine/0.7.0/boot.js', 'assets/urd/i18n.js', 'assets/styles/base.css']) {
    assert.equal(isAtomPath(path), true, path);
  }
  for (const path of ['functions/api/github/update.js', 'speculation-rules.json', '.gitignore']) {
    assert.equal(isAtomPath(path), false, path);
  }
});

test('ren oppdatering: endret oppstrøms + urørt lokalt skrives uten konflikt', () => {
  const plan = planUpdate(
    { 'index.html': 'a', 'functions/f.js': 'x' },
    { 'index.html': 'b', 'functions/f.js': 'x' },
    { 'index.html': 'a', 'functions/f.js': 'x' },
  );
  assert.deepEqual(plan.changes, [{ path: 'index.html', action: 'write', atom: true, conflict: null }]);
  assert.equal(plan.upToDate, false);
});

test('motorbytte: gammel versjonert mappe slettes, ny legges inn', () => {
  const plan = planUpdate(
    { 'assets/engine/0.6.8/boot.js': 'a', 'assets/urd/i18n.js': 's1' },
    { 'assets/engine/0.7.0/boot.js': 'b', 'assets/urd/i18n.js': 's2' },
    { 'assets/engine/0.6.8/boot.js': 'a', 'assets/urd/i18n.js': 's1' },
  );
  assert.deepEqual(change(plan, 'assets/engine/0.7.0/boot.js'), { path: 'assets/engine/0.7.0/boot.js', action: 'write', atom: true, conflict: null });
  assert.deepEqual(change(plan, 'assets/engine/0.6.8/boot.js'), { path: 'assets/engine/0.6.8/boot.js', action: 'delete', atom: true, conflict: null });
  assert.deepEqual(change(plan, 'assets/urd/i18n.js'), { path: 'assets/urd/i18n.js', action: 'write', atom: true, conflict: null });
});

test('håndredigert fil flagges: edited, created og editedDelete', () => {
  const plan = planUpdate(
    { 'functions/f.js': 'base', 'functions/g.js': 'base', 'functions/borte.js': 'base' },
    { 'functions/f.js': 'ny', 'functions/ny.js': 'ny' },
    { 'functions/f.js': 'redigert', 'functions/g.js': 'base', 'functions/borte.js': 'redigert', 'functions/ny.js': 'egen' },
  );
  assert.equal(change(plan, 'functions/f.js').conflict, 'edited');
  assert.equal(change(plan, 'functions/ny.js').conflict, 'created');
  assert.deepEqual(change(plan, 'functions/borte.js'), { path: 'functions/borte.js', action: 'delete', atom: false, conflict: 'editedDelete' });
  // g.js: fjernet oppstrøms + urørt lokalt = stille sletting.
  assert.deepEqual(change(plan, 'functions/g.js'), { path: 'functions/g.js', action: 'delete', atom: false, conflict: null });
});

test('uendret oppstrøms røres aldri, men gjenopprettes om den mangler', () => {
  const plan = planUpdate(
    { 'functions/f.js': 'x', 'functions/slettet.js': 'x', 'index.html': 'a' },
    { 'functions/f.js': 'x', 'functions/slettet.js': 'x', 'index.html': 'b' },
    { 'functions/f.js': 'LOKALT-ENDRET', 'index.html': 'a' },
  );
  // Lokale endringer i en fil oppstrøms ikke rørte, består i stillhet.
  assert.equal(change(plan, 'functions/f.js'), undefined);
  // En eid fil brukeren har slettet ved et uhell, gjenopprettes.
  assert.deepEqual(change(plan, 'functions/slettet.js'), { path: 'functions/slettet.js', action: 'write', atom: false, conflict: null });
});

test('brukereide stier og _headers er alltid utenfor planen', () => {
  const plan = planUpdate(
    { 'content/site.json': 'a', '_headers': 'h1', 'media/x.webp': 'a' },
    { 'content/site.json': 'b', '_headers': 'h2', 'media/x.webp': 'b' },
    { 'content/site.json': 'mitt', '_headers': 'mitt', 'media/x.webp': 'mitt' },
  );
  assert.deepEqual(plan.changes, []);
  assert.equal(plan.upToDate, true);
});

test('allerede på mål-innholdet gir ingen endring', () => {
  const plan = planUpdate(
    { 'index.html': 'a' },
    { 'index.html': 'b' },
    { 'index.html': 'b' },
  );
  assert.equal(plan.upToDate, true);
});

test('chunkEntries: deler i grupper og bevarer rekkefølgen', () => {
  const entries = Array.from({ length: 7 }, (_, i) => i);
  assert.deepEqual(chunkEntries(entries, 3), [[0, 1, 2], [3, 4, 5], [6]]);
  assert.deepEqual(chunkEntries([], 3), []);
  assert.equal(chunkEntries(entries).length, 1);
});
