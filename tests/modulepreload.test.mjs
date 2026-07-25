/**
 * Vakt mot at modulepreload-lista i index.html siger fra motorkilden.
 *
 * Besøkersiden forhåndslaster hele den statiske import-grafen fra boot.js med
 * <link rel="modulepreload"> (ellers oppdager nettleseren importene lag for
 * lag, et serielt fossefall). Denne testen regner ut lukningen på nytt fra
 * kilden og krever at HTML-lista er nøyaktig lik: verken en manglende modul
 * (som da faller tilbake til fossefall) eller en ekstra (som f.eks. et
 * editor-lag besøkende aldri skal hente). Samme kultur som bygg-samsvar-sjekken.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const ENGINE = new URL('../template/assets/engine/', import.meta.url);
const ENTRY = 'boot.js';
const INDEX = new URL('../template/index.html', import.meta.url);

/** Fjern blokk- og linjekommentarer FØR matching, så en utkommentert eller
 *  dynamisk import aldri teller med. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

/** Kun statiske importer: `import ... from './x.js'` og bivirknings-formen
 *  `import './x.js'`. Ankret på `import` etterfulgt av IKKE `(`, så
 *  `import(` (dynamisk) aldri matcher. */
const STATIC_RE = /\bimport\b(?!\s*\()(?:[\s\S]*?\bfrom\b)?\s*['"](\.[^'"]+)['"]/g;

function staticSpecs(src) {
  return [...stripComments(src).matchAll(STATIC_RE)].map((m) => m[1]);
}

/** Den statiske import-lukningen av boot.js, som motor-relative navn. */
function closure() {
  const seen = new Set();
  const names = new Set();
  function walk(url) {
    if (seen.has(url.href)) return;
    seen.add(url.href);
    names.add(url.href.slice(ENGINE.href.length));
    // Samle spesifikatorene FØR rekursjon: en delt global regex' lastIndex
    // korrumperes av reentrans, så matchAll (egen iterasjon) er nødvendig.
    const specs = staticSpecs(readFileSync(url, 'utf8'));
    for (const spec of specs) walk(new URL(spec, url));
  }
  walk(new URL(ENTRY, ENGINE));
  return names;
}

/** modulepreload-href-ene i index.html, som motor-relative navn. */
function preloadNames() {
  const html = readFileSync(INDEX, 'utf8');
  const names = new Set();
  const re = /<link\s+rel="modulepreload"\s+href="\/assets\/engine\/([^"]+)"\s*>/g;
  let m;
  while ((m = re.exec(html))) names.add(m[1]);
  return names;
}

// Moduler som lastes dynamisk (await import) eller kun i editoren: de skal
// ALDRI forhåndslastes for besøkende.
const EDITOR_ONLY = [
  'preview-edit.js', 'preset-thumb.js', 'image-editor.js', 'imageTools.js',
  'color-picker.js', 'dropdown.js', 'glyphs.js', 'fonts.js', 'text-typo.js',
  'place.js', 'section-size.js', 'selection.js', 'lightbox.js', 'hint.js',
];

test('modulepreload i index.html matcher boot.js sin statiske import-lukning', () => {
  const want = closure();
  const have = preloadNames();
  const missing = [...want].filter((n) => !have.has(n)).sort();
  const extra = [...have].filter((n) => !want.has(n)).sort();
  assert.deepEqual(missing, [], `mangler modulepreload for: ${missing.join(', ')}`);
  assert.deepEqual(extra, [], `overflødig modulepreload for: ${extra.join(', ')}`);
});

test('editor-laget er IKKE i den besøker-kritiske lukningen', () => {
  const want = closure();
  for (const mod of EDITOR_ONLY) {
    assert.equal(want.has(mod), false, `${mod} skal lastes dynamisk, ikke forhåndslastes`);
  }
});

test('lukningsvandreren utelater kommentert og dynamisk import', () => {
  const src = `
    import { a } from './a.js';
    // import { b } from './b.js';
    /* import { c } from './c.js'; */
    const mod = await import('./d.js');
    import('./e.js').then(() => {});
  `;
  assert.deepEqual(staticSpecs(src), ['./a.js']);
});
