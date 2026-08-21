/**
 * Vakt om innholdsflaten (ADR-0018) og om festingen som lever oppå den.
 *
 * `.urd-canvas` binder blokkene til designbredden. Får den transform,
 * filter, perspective, backdrop-filter, contain, container-type eller
 * will-change, blir den containing block for `position: fixed`, og da dør
 * festede og skjermdokkede blokker (sticky.js) i stillhet: de ville
 * plassert seg relativt til kanvasen i stedet for til vinduet. Feilen er
 * usynlig i alle enhetstester og oppdages først som en visuell bug, så den
 * vaktes mekanisk her i stedet for med en kommentar.
 *
 * Samme sjanger som modulepreload-testen: les kilden, regn ut på nytt, krev
 * likhet.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { engineImport } from './_engine.mjs';

const { applySiteLayout } = await engineImport('render.js');

const CSS = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf-8');

/** Egenskaper som lager containing block for position: fixed. */
const FORBIDDEN = [
  'transform',
  'filter',
  'perspective',
  'backdrop-filter',
  'contain',
  'container-type',
  'will-change',
];

/** Hent deklarasjonene i regelen for en selektor, uten kommentarer.
 *  Alle regex-metategn escapes, i alle forekomster, ikke bare første
 *  punktum (CodeQL js/incomplete-sanitization). */
function ruleBody(css, selector) {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = stripped.match(new RegExp(`(^|\\})\\s*${esc}\\s*\\{([^}]*)\\}`, 'm'));
  return match ? match[2] : null;
}

test('.urd-canvas finnes i base.css', () => {
  assert.ok(ruleBody(CSS, '.urd-canvas'), 'regelen .urd-canvas mangler');
});

test('.urd-canvas har ingen egenskap som lager containing block for fixed', () => {
  const body = ruleBody(CSS, '.urd-canvas');
  for (const prop of FORBIDDEN) {
    assert.ok(
      !new RegExp(`(^|;|\\s)${prop}\\s*:`).test(body),
      `.urd-canvas setter ${prop}, som ville drept festede blokker (ADR-0018)`,
    );
  }
});

test('.urd-canvas binder bredden og sentrerer', () => {
  const body = ruleBody(CSS, '.urd-canvas');
  assert.match(body, /width:\s*min\(/, 'bredden skal være bundet med min()');
  assert.match(body, /--urd-canvas-w/, 'bredden skal lese --urd-canvas-w');
  assert.match(body, /margin-inline:\s*auto/, 'flaten skal sentreres');
});

// applySiteLayout er ren nok til å testes med en minimal stubb: den rører
// bare setProperty på ett element.
const stubRoot = () => {
  const props = new Map();
  return { props, style: { setProperty: (k, v) => props.set(k, v) } };
};

test('applySiteLayout skriver bredde i px og marg i vw', () => {
  const root = stubRoot();
  applySiteLayout({ layout: { contentWidth: 960, gutter: 9 } }, root);
  assert.equal(root.props.get('--urd-canvas-w'), '960px');
  // Enheten er det som skiller en marg som følger skjermen fra en fast en.
  assert.equal(root.props.get('--urd-canvas-gutter-desktop'), '9vw');
});

test('applySiteLayout: "full" gir ubunden flate', () => {
  const root = stubRoot();
  applySiteLayout({ layout: { contentWidth: 'full', gutter: 0 } }, root);
  assert.equal(root.props.get('--urd-canvas-w'), '100%');
  assert.equal(root.props.get('--urd-canvas-gutter-desktop'), '0vw');
});

test('applySiteLayout uten layout-felt faller til standarden', () => {
  const root = stubRoot();
  applySiteLayout({}, root);
  assert.equal(root.props.get('--urd-canvas-w'), '1440px');
  assert.equal(root.props.get('--urd-canvas-gutter-desktop'), '6vw');
});

test('applySiteLayout tåler manglende site uten å kaste', () => {
  const root = stubRoot();
  applySiteLayout(undefined, root);
  assert.equal(root.props.get('--urd-canvas-w'), '1440px');
});
