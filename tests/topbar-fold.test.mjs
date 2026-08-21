/**
 * Vakt om at topplinja folder seg i stedet for å bryte.
 *
 * Linja skal holde ÉN høyde uansett vindusbredde: det som ikke får plass
 * foldes bort i faste trinn. Tre ting kan knekke det i stillhet, og ingen av
 * dem synes i en enhetstest av logikk:
 *
 * 1. `flex-wrap: wrap` sniker seg tilbake inn i topplinja, og den blir to
 *    rader igjen.
 * 2. De tre siste trinnene flytter hver sin verktøyklynge inn i en meny og
 *    finnes derfor BÅDE som CSS-terskel og som tall i FOLD_MQ. Driver de fra
 *    hverandre, blir det et bånd der en klynge fortsatt står utfoldet mens
 *    CSS-en har strammet inn rundt den, eller omvendt.
 * 3. Kortformene («!» i statuspilla, tallet i mobil-merket) står skjult som
 *    standard og slås på i en media-spørring med SAMME spesifisitet. Da
 *    avgjør kilderekkefølgen: står standard-regelen etter spørringen, vinner
 *    den, og kortformen blir usynlig på nettopp de breddene den er til for.
 *
 * Samme sjanger som canvas- og modulepreload-testene: les kilden, regn ut på
 * nytt, krev likhet.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const SRC = readFileSync(new URL('../editor/src/App.svelte', import.meta.url), 'utf-8');
const NO_COMMENTS = SRC.replace(/\/\*[\s\S]*?\*\//g, '');

/** Deklarasjonene i regelen for én selektor, uten kommentarer.
 *  Alle regex-metategn escapes, ikke bare punktum (CodeQL
 *  js/incomplete-sanitization). */
function ruleBody(selector) {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = NO_COMMENTS.match(new RegExp(`(^|\\})\\s*${esc}\\s*\\{([^}]*)\\}`, 'm'));
  return match ? match[2] : null;
}

for (const selector of ['.topbar', '.topbar-group']) {
  test(`${selector} bryter aldri til flere rader`, () => {
    const body = ruleBody(selector);
    assert.ok(body, `regelen ${selector} mangler`);
    assert.match(body, /flex-wrap:\s*nowrap/, `${selector} må si nowrap uttrykkelig`);
    assert.ok(
      !/flex-wrap:\s*wrap/.test(body),
      `${selector} setter flex-wrap: wrap, og topplinja blir to rader igjen`,
    );
  });
}

/* Foldetrinnene er avgrenset av sin egen overskrift, så en urelatert
   media-spørring et annet sted i fila ikke teller som et trinn. */
const FOLD = SRC.slice(SRC.indexOf('---- Foldetrinnene'));

const cssSteps = () => [...FOLD.matchAll(/@media \(max-width:\s*(\d+)px\)/g)].map((m) => Number(m[1]));

test('foldetrinnene finnes og er strengt synkende', () => {
  assert.ok(FOLD.length > 0, 'fant ikke foldetrinn-seksjonen i App.svelte');
  const steps = cssSteps();
  assert.ok(steps.length >= 6, `ventet minst seks foldetrinn, fant ${steps.length}`);
  for (let i = 1; i < steps.length; i += 1) {
    assert.ok(
      steps[i] < steps[i - 1],
      `trinn ${i + 1} (${steps[i]}px) er ikke smalere enn trinn ${i} (${steps[i - 1]}px), så det ene er dødt`,
    );
  }
});

/** Tersklene i FOLD_MQ, altså de trinnene som bytter en klynge mot en meny. */
function jsSteps() {
  const block = SRC.match(/const FOLD_MQ = \{([^}]*)\}/);
  assert.ok(block, 'fant ikke FOLD_MQ i App.svelte');
  return Object.fromEntries(
    [...block[1].matchAll(/(\w+):\s*(\d+)/g)].map((m) => [m[1], Number(m[2])]),
  );
}

test('klyngene folder seg én om gangen, ikke alle på samme terskel', () => {
  const steps = Object.values(jsSteps());
  assert.equal(steps.length, 3, 'ventet tre klynger med hver sin terskel');
  assert.equal(new Set(steps).size, 3, 'to klynger deler terskel, og spranget blir dobbelt så stort');
});

test('hver klynge-terskel i JS har sin tvilling i CSS', () => {
  const css = new Set(cssSteps());
  for (const [key, px] of Object.entries(jsSteps())) {
    assert.ok(
      css.has(px),
      `FOLD_MQ.${key} er ${px}px, men ingen media-spørring i foldestigen bruker samme tall`,
    );
  }
});

for (const short of ['.badge-mini', '.chip-mini']) {
  test(`${short} skjules før den slås på`, () => {
    const hidden = NO_COMMENTS.search(new RegExp(`\\${short}[^{]*\\{[^}]*display:\\s*none`));
    const shown = NO_COMMENTS.search(new RegExp(`\\${short}\\s*\\{\\s*display:\\s*inline`));
    assert.ok(hidden >= 0, `${short} mangler en standard display: none`);
    assert.ok(shown >= 0, `${short} slås aldri på i noe foldetrinn`);
    assert.ok(
      hidden < shown,
      `${short} skjules ETTER at den slås på; lik spesifisitet gjør at standarden da vinner`,
    );
  });
}
