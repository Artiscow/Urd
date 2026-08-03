/**
 * Kontraktstester for flerspråk-rammeverket (ADR-0012): paritet mellom
 * språkfilene (identiske nøkkelsett mot nb-basen, ingen tomme verdier,
 * ingen tankestrek, {var}-token-paritet), og i18n-kjernens rene logikk
 * (normalizeLang, interpolasjon, fallback, datotabeller). Finner alle
 * locale-sett automatisk, så plugin- og admin-locales dekkes i det de
 * opprettes. Fungerer som Urds «language file checker» for bidragsytere:
 * node --test tests/i18n.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync } from 'node:fs';
import { t, tp, normalizeLang, initSiteLocale, dates, SUPPORTED_LANGS } from '../template/assets/engine/i18n.js';

const ROOT = new URL('../template/', import.meta.url);
const BASE = 'nb';

/** Alle locale-mapper: motorens site/admin + hver plugins locales/. */
function localeDirs() {
  const dirs = [
    new URL('assets/engine/locales/site/', ROOT),
    new URL('assets/engine/locales/admin/', ROOT),
  ];
  const plugins = new URL('plugins/', ROOT);
  for (const entry of readdirSync(plugins, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = new URL(`${entry.name}/locales/`, plugins);
    if (existsSync(dir)) dirs.push(dir);
  }
  return dirs.filter((d) => existsSync(d));
}

async function loadSet(dir) {
  const files = readdirSync(dir).filter((f) => f.endsWith('.js'));
  const set = {};
  for (const f of files) set[f.replace(/\.js$/, '')] = (await import(new URL(f, dir))).default;
  return set;
}

const tokensOf = (value) => [...String(value).matchAll(/\{[a-zA-Z]+\}/g)].map((m) => m[0]).sort().join(',');

for (const dir of localeDirs()) {
  const name = dir.href.replace(ROOT.href, '');

  test(`${name}: alle støttede språk finnes, og nøkkelsettene matcher nb-basen`, async () => {
    const set = await loadSet(dir);
    assert.ok(set[BASE], `${name} mangler basen ${BASE}.js`);
    for (const lang of SUPPORTED_LANGS) assert.ok(set[lang], `${name} mangler ${lang}.js`);
    const baseKeys = Object.keys(set[BASE].strings);
    for (const [lang, mod] of Object.entries(set)) {
      if (lang === BASE) continue;
      const keys = Object.keys(mod.strings);
      const missing = baseKeys.filter((k) => !keys.includes(k));
      const extra = keys.filter((k) => !baseKeys.includes(k));
      assert.deepEqual(missing, [], `${name}${lang}: mangler nøkler`);
      assert.deepEqual(extra, [], `${name}${lang}: ukjente nøkler (ikke i nb-basen)`);
    }
  });

  test(`${name}: verdiene er ikke-tomme, uten tankestrek, med samme {var}-tokens som basen`, async () => {
    const set = await loadSet(dir);
    for (const [lang, mod] of Object.entries(set)) {
      assert.equal(mod.lang, lang, `${name}${lang}: lang-feltet matcher filnavnet`);
      for (const [key, value] of Object.entries(mod.strings)) {
        assert.ok(String(value).trim().length, `${name}${lang}: '${key}' er tom`);
        assert.ok(!String(value).includes('—'), `${name}${lang}: '${key}' har tankestrek`);
        if (lang !== BASE && set[BASE].strings[key] !== undefined) {
          assert.equal(
            tokensOf(value),
            tokensOf(set[BASE].strings[key]),
            `${name}${lang}: '${key}' har andre {var}-tokens enn basen`,
          );
        }
      }
    }
  });
}

test('site-basen har fallback-datotabeller med 12/12/7/7 innslag', async () => {
  const nb = (await import('../template/assets/engine/locales/site/nb.js')).default;
  assert.equal(nb.dates.months.length, 12);
  assert.equal(nb.dates.monthsShort.length, 12);
  assert.equal(nb.dates.weekdays.length, 7);
  assert.equal(nb.dates.weekdaysShort.length, 7);
});

test('normalizeLang: no/nb-varianter til nb, samiske varianter til se, ukjent til nb', () => {
  for (const [raw, want] of [
    ['no', 'nb'], ['nb', 'nb'], ['nb-NO', 'nb'], ['NO-nb', 'nb'], ['', 'nb'], [undefined, 'nb'],
    ['nn', 'nn'], ['nn-NO', 'nn'],
    ['se', 'se'], ['se-NO', 'se'], ['smj', 'se'], ['sma', 'se'],
    ['tr', 'tr'], ['tr-TR', 'tr'],
    ['en', 'en-GB'], ['en-GB', 'en-GB'], ['en-US', 'en-GB'],
    ['de', 'nb'], ['tull', 'nb'],
  ]) {
    assert.equal(normalizeLang(raw), want, String(raw));
  }
});

test('t: nb uten init, {var}-interpolasjon, ukjent nøkkel gir nøkkelen selv', () => {
  assert.equal(t('nav.menu'), 'Meny');
  assert.equal(t('nav.submenuFor', { label: 'Om oss' }), 'Undermeny for Om oss');
  assert.equal(t('finnes.ikke'), 'finnes.ikke');
});

test('dateBadge følger språket: nb-månedene matcher de gamle badge-navnene', () => {
  const d = dates();
  assert.deepEqual(
    d.monthsShort.slice(0, 3).map((s) => s.toLowerCase()),
    ['jan', 'feb', 'mar'],
  );
});

test('initSiteLocale: bytter språk med nb-fallback for manglende nøkler, og tilbake', async () => {
  await initSiteLocale('en');
  assert.equal(t('nav.menu'), 'Menu');
  // Datotabellene følger med språket (Intl der ICU har det).
  assert.equal(dates().months[2].toLowerCase(), 'march');
  await initSiteLocale('tull-språk');
  assert.equal(t('nav.menu'), 'Meny');
});

test('tp: flertallskategorier via Intl.PluralRules (nb one/other)', async () => {
  await initSiteLocale('nb');
  // Ingen flertallsnøkler i site-settet ennå; kontrakten testes via fallback:
  // ukjent basenøkkel gir '<base>.<kategori>' så feilen er synlig og sporbar.
  assert.equal(tp('x.days', 1), 'x.days.one');
  assert.equal(tp('x.days', 3), 'x.days.other');
});
