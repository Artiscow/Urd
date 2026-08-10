/**
 * Modellen bak innholdsbredde-innstillingen (editor/src/lib/content-width.js,
 * ADR-0018). Den levende prøven i Nettsted-panelet skal regne på nøyaktig
 * samme regel som motorens CSS: `min(100% - 2 * gutter, contentWidth)`.
 * Rene funksjoner.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  WIDTH_MIN, WIDTH_MAX, WIDTH_STEP, GUTTER_MAX,
  WIDTH_PRESETS, GUTTER_PRESETS, REF_SCREENS,
  clampWidth, clampGutter, contentBand, presetOf, bindingWidth,
} from '../editor/src/lib/content-width.js';

test('standarden 1440 er et hurtigvalg og heter standard', () => {
  assert.equal(presetOf(1440), 'standard');
  assert.deepEqual(WIDTH_PRESETS.map((p) => p.width), [1200, 1440, 1600, 'full']);
});

test('en fri verdi svarer ikke til noe hurtigvalg', () => {
  assert.equal(presetOf(1380), null);
});

test('clampWidth snapper til trinnet og holder seg innenfor grensene', () => {
  assert.equal(clampWidth(1449), 1440);
  assert.equal(clampWidth(1451), 1460);
  assert.equal(clampWidth(10), WIDTH_MIN);
  assert.equal(clampWidth(99999), WIDTH_MAX);
  assert.equal(clampWidth('ikke et tall'), 1440);
  assert.equal(clampWidth(1440) % WIDTH_STEP, 0);
});

test('clampGutter tåler 0 og klemmer oppover', () => {
  assert.equal(clampGutter(0), 0);
  assert.equal(clampGutter(-5), 0);
  assert.equal(clampGutter(1000), GUTTER_MAX);
  assert.equal(clampGutter(undefined), 6);
});

test('marg-skalaen har Middels som standardverdi', () => {
  assert.deepEqual(GUTTER_PRESETS.map((p) => p.gutter), [0, 3, 6, 9]);
  assert.equal(GUTTER_PRESETS.find((p) => p.id === 'medium').gutter, 6);
});

// Margen er en ANDEL av skjermen, ikke piksler. Regnes den som px, blir den
// levende prøven feil på alle tre skjermbreddene samtidig.

test('margen skaleres med skjermen', () => {
  // 6 % av 1000 er 60, ikke 6.
  assert.equal(contentBand('full', 6, 1000).width, 1000 - 120);
  assert.equal(contentBand('full', 6, 2000).width, 2000 - 240);
});

test('samme marg gir ulik piksel-luft på ulike skjermer', () => {
  const small = contentBand('full', 6, 1000);
  const big = contentBand('full', 6, 2000);
  assert.equal(small.margin, 60);
  assert.equal(big.margin, 120);
  // Andelen er derimot den samme, som er hele poenget med en relativ marg.
  assert.equal(Math.round(small.pct), Math.round(big.pct));
});

// bindingWidth: den bredden der innholdet FAKTISK når designbredden. Med
// relativ marg er dette ikke bredde + 2*marg, siden margen vokser med vinduet.

test('bindingWidth er ikke bredde pluss to marger', () => {
  assert.equal(bindingWidth(1440, 6), 1637);
  assert.notEqual(bindingWidth(1440, 6), 1440 + 2 * 6);
});

test('bindingWidth med marg 0 er bredden selv', () => {
  assert.equal(bindingWidth(1440, 0), 1440);
});

test('bindingWidth stemmer med contentBand: der og bredere binder det', () => {
  const w = bindingWidth(1440, 6);
  assert.equal(contentBand(1440, 6, w).bound, true);
  assert.equal(contentBand(1440, 6, w + 200).bound, true);
  assert.equal(contentBand(1440, 6, w - 50).bound, false);
});

test('bindingWidth er 0 ved full bredde (ingen slik bredde finnes)', () => {
  assert.equal(bindingWidth('full', 6), 0);
});

// Kjernen: at prøven forteller sannheten om hvor bredden faktisk binder.
// Det var nettopp dette som ble regnet feil da standarden først ble satt.

test('standarden 1440 med 6 vw binder på 1920, men ikke på 1536 og 1366', () => {
  // Konsekvens av at margen er relativ: bindingsgrensen er 1637, ikke 1488.
  // Med px-marg bandt den også på 1536. Flaten er fortsatt BUNDET på de to
  // smalere (den vokser ikke fritt), den når bare ikke helt opp i 1440.
  const [wide, scaled, small] = REF_SCREENS.map((s) => contentBand(1440, 6, s));
  assert.equal(wide.bound, true, '1920 er over 1637 og skal binde');
  assert.equal(scaled.bound, false, '1536 er under 1637');
  assert.equal(small.bound, false, '1366 er under 1637');
});

test('1440 på 1920 gir 240 px marg på hver side', () => {
  const band = contentBand(1440, 6, 1920);
  assert.equal(band.width, 1440);
  assert.equal(band.margin, 240);
});

test('1200 lot over en tredjedel av en 1920-skjerm stå tom', () => {
  // Belegget for at standarden ble endret: dokumentert som tall, ikke prosa.
  const band = contentBand(1200, 6, 1920);
  assert.equal(band.margin, 360);
  assert.ok((1 - band.pct / 100) > 0.37);
});

test('full bredde binder aldri, men respekterer margen', () => {
  const band = contentBand('full', 6, 1920);
  assert.equal(band.bound, false);
  assert.equal(band.width, 1920 - 2 * 0.06 * 1920);
});

test('bredden binder ikke når margene spiser den opp', () => {
  // 12 vw av 1536 er 184 hver side, så det er 1168 igjen og 1440 får ikke plass.
  const band = contentBand(1440, 12, 1536);
  assert.equal(band.bound, false);
  assert.equal(band.width, 1536 - 2 * 0.12 * 1536);
});

test('prosenten er flatens andel av skjermen', () => {
  const band = contentBand(960, 0, 1920);
  assert.equal(band.pct, 50);
});

test('gutter 0 gir kant til kant ved full bredde', () => {
  const band = contentBand('full', 0, 1366);
  assert.equal(band.width, 1366);
  assert.equal(band.margin, 0);
  assert.equal(band.pct, 100);
});
