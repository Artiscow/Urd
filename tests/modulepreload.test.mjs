/**
 * Vakt mot at HTML-skallene siger fra motorkilden og fra ADR-0013-invariantene.
 *
 * Besøkersiden forhåndslaster hele den statiske import-grafen fra boot.js med
 * <link rel="modulepreload"> (ellers oppdager nettleseren importene lag for
 * lag, et serielt fossefall). Denne testen regner ut lukningen på nytt fra
 * kilden og krever at HTML-lista er nøyaktig lik: verken en manglende modul
 * (som da faller tilbake til fossefall) eller en ekstra (som f.eks. et
 * editor-lag besøkende aldri skal hente). Samme kultur som bygg-samsvar-sjekken.
 *
 * Med motorversjoneringen (ADR-0013) vokter den også: at mappenavnet er lik
 * urd.json.engine, at slug-kopiene av index.html er byte-like roten (de skrives
 * som rå kopier ved publisering, og drift gir foreldreløse kopier ved bump),
 * at skallmodulene i assets/urd/ re-eksporterer fra gjeldende versjon, at
 * _headers har de versjonsnøytrale immutable-reglene, og at base.css-stempelet
 * i skallene matcher filinnholdet.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { ENGINE_VERSION, ENGINE_DIR } from './_engine.mjs';

const ENTRY = 'boot.js';
const TEMPLATE = new URL('../template/', import.meta.url);
const INDEX = new URL('index.html', TEMPLATE);
const SLUG_COPIES = ['om-oss', 'kaker', 'kontakt'];
const URD_DIR = new URL('assets/urd/', TEMPLATE);

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
    names.add(url.href.slice(ENGINE_DIR.href.length));
    // Samle spesifikatorene FØR rekursjon: en delt global regex' lastIndex
    // korrumperes av reentrans, så matchAll (egen iterasjon) er nødvendig.
    const specs = staticSpecs(readFileSync(url, 'utf8'));
    for (const spec of specs) walk(new URL(spec, url));
  }
  walk(new URL(ENTRY, ENGINE_DIR));
  return names;
}

/** modulepreload-href-ene i index.html, som motor-relative navn.
 *  Prefikset er den VERSJONERTE mappa: en referanse uten versjon (eller med
 *  feil versjon) matcher ikke og feiler som manglende preload. */
function preloadNames() {
  const html = readFileSync(INDEX, 'utf8');
  const names = new Set();
  const re = new RegExp(
    `<link\\s+rel="modulepreload"\\s+href="/assets/engine/${ENGINE_VERSION.replaceAll('.', '\\.')}/([^"]+)"\\s*>`,
    'g',
  );
  let m;
  while ((m = re.exec(html))) names.add(m[1]);
  return names;
}

/** Samme innholdshash som imageTools.contentHash (djb2, 8 hex-tegn). */
function contentHash(text) {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) hash = ((hash << 5) + hash + text.charCodeAt(i)) >>> 0;
  return hash.toString(16).padStart(8, '0');
}

// Moduler som lastes dynamisk (await import) eller kun i editoren: de skal
// ALDRI forhåndslastes for besøkende.
const EDITOR_ONLY = [
  'preview-edit.js', 'preset-thumb.js', 'image-editor.js', 'imageTools.js',
  'color-picker.js', 'dropdown.js', 'glyphs.js', 'fonts.js', 'text-typo.js',
  'place.js', 'section-size.js', 'selection.js', 'lightbox.js', 'hint.js',
];

test('motormappa finnes og heter det urd.json.engine sier', () => {
  assert.ok(statSync(ENGINE_DIR).isDirectory(), `mangler mappe for motorversjonen ${ENGINE_VERSION}`);
  // Nøyaktig ÉN versjonert mappe: en glemt sletting av forrige versjon ville
  // blåst opp repoet og skjult at HTML-referansene peker feil.
  const versions = readdirSync(new URL('assets/engine/', TEMPLATE));
  assert.deepEqual(versions, [ENGINE_VERSION], `assets/engine/ skal kun ha ${ENGINE_VERSION}: ${versions.join(', ')}`);
});

test('modulepreload i index.html matcher boot.js sin statiske import-lukning', () => {
  const want = closure();
  const have = preloadNames();
  const missing = [...want].filter((n) => !have.has(n)).sort();
  const extra = [...have].filter((n) => !want.has(n)).sort();
  assert.deepEqual(missing, [], `mangler modulepreload for: ${missing.join(', ')}`);
  assert.deepEqual(extra, [], `overflødig modulepreload for: ${extra.join(', ')}`);
});

test('alle motor-referanser i index.html bruker den versjonerte stien', () => {
  const html = readFileSync(INDEX, 'utf8');
  const re = /\/assets\/engine\/([^"']+)/g;
  for (const [, rest] of html.matchAll(re)) {
    assert.ok(
      rest.startsWith(`${ENGINE_VERSION}/`),
      `uversjonert motor-referanse i index.html: /assets/engine/${rest}`,
    );
  }
});

test('slug-kopiene av index.html er byte-like roten', () => {
  // Kopiene skrives som rå kopier av servert rot ved publisering; driver de i
  // malen (slik theme.css-lenken og theme-init.js gjorde), arver ferske kloner
  // avviket til første publisering.
  const root = readFileSync(INDEX, 'utf8');
  for (const slug of SLUG_COPIES) {
    const copy = readFileSync(new URL(`${slug}/index.html`, TEMPLATE), 'utf8');
    assert.equal(copy, root, `${slug}/index.html har drevet fra rot-index.html`);
  }
});

test('skallene i assets/urd/ re-eksporterer fra gjeldende motorversjon', () => {
  const shellFiles = (dir) => readdirSync(dir, { recursive: true })
    .filter((name) => String(name).endsWith('.js'))
    .map((name) => new URL(String(name).replaceAll('\\', '/'), dir));
  const shells = shellFiles(URD_DIR);
  assert.ok(shells.length >= 9, `fant kun ${shells.length} skall i assets/urd/`);
  // Skallene er re-exports (`export * from` / `export { default } from`),
  // ikke importer, så de trenger sin egen spesifikator-regex.
  const EXPORT_FROM_RE = /\bexport\b[^;]*?\bfrom\b\s*['"](\.[^'"]+)['"]/g;
  for (const url of shells) {
    const src = readFileSync(url, 'utf8');
    const specs = [...stripComments(src).matchAll(EXPORT_FROM_RE)].map((m) => m[1]);
    assert.equal(specs.length, 1, `${url.pathname}: et skall skal ha nøyaktig én re-export`);
    const target = new URL(specs[0], url);
    assert.ok(
      target.href.startsWith(ENGINE_DIR.href),
      `${url.pathname} peker utenfor motorversjonen ${ENGINE_VERSION}: ${specs[0]}`,
    );
    assert.ok(statSync(target).isFile(), `${url.pathname} peker på en fil som ikke finnes: ${specs[0]}`);
  }
});

test('_headers har de versjonsnøytrale immutable-reglene', () => {
  const headers = readFileSync(new URL('_headers', TEMPLATE), 'utf8');
  for (const rule of ['/assets/engine/*', '/assets/styles/base.css', '/media/*']) {
    const idx = headers.indexOf(`\n${rule}\n`);
    assert.ok(idx !== -1, `_headers mangler regelen ${rule}`);
    const block = headers.slice(idx, headers.indexOf('\n\n', idx + 1) === -1 ? undefined : headers.indexOf('\n\n', idx + 1));
    assert.match(block, /immutable/, `${rule}-blokken i _headers mangler immutable`);
  }
  // Regelen skal være versjonsnøytral: _headers er håndredigerbar (ADR-0006)
  // og skal aldri trenge endring ved motor-bump.
  assert.ok(!headers.includes(`/assets/engine/${ENGINE_VERSION}`), '_headers skal ikke inneholde en versjonert motorsti');
});

test('base.css-stempelet i HTML-skallene matcher filinnholdet', () => {
  const stamp = contentHash(readFileSync(new URL('assets/styles/base.css', TEMPLATE), 'utf8'));
  for (const file of ['index.html', 'admin/index.html']) {
    const html = readFileSync(new URL(file, TEMPLATE), 'utf8');
    const m = html.match(/href="\/assets\/styles\/base\.css\?v=([0-9a-f]{8})"/);
    assert.ok(m, `${file} mangler stemplet base.css-referanse`);
    assert.equal(m[1], stamp, `${file} har utdatert base.css-stempel (ventet ${stamp})`);
  }
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
