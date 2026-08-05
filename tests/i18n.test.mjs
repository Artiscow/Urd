/**
 * Kontraktstester for flerspråk-rammeverket (ADR-0012): paritet mellom
 * språkfilene (identiske nøkkelsett mot nb-basen, ingen tomme verdier,
 * ingen tankestrek, {var}-token-paritet), og i18n-kjernens rene logikk
 * (matchLang, interpolasjon, fallback, datotabeller). Finner alle
 * locale-sett automatisk, så plugin- og admin-locales dekkes i det de
 * opprettes. Fungerer som Urds «language file checker» for bidragsytere:
 * node --test tests/i18n.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import {
  t, tp, matchLang, requestedLang, initSiteLocale, dates,
  SUPPORTED_LANGS, validateLanguages, isBuiltinLang,
} from '../template/assets/engine/i18n.js';
import { registerPackLanguages, loadPackStrings, packLanguages } from '../template/assets/engine/language-packs.js';

const ROOT = new URL('../template/', import.meta.url);
const BASE = 'nb';

const PLUGINS = new URL('plugins/', ROOT);
const pluginDirs = () => readdirSync(PLUGINS, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);

/** Alle locale-mapper med FULL paritet: motorens site/admin + hver plugins
 *  egne tekster. Språkpakkenes locales/site|admin/ hører ikke hit (de kan
 *  dekke deler av settet); de testes for seg under. */
function localeDirs() {
  const dirs = [
    new URL('assets/engine/locales/site/', ROOT),
    new URL('assets/engine/locales/admin/', ROOT),
  ];
  for (const name of pluginDirs()) {
    const dir = new URL(`${name}/locales/`, PLUGINS);
    if (existsSync(new URL(`${BASE}.js`, dir))) dirs.push(dir);
  }
  return dirs.filter((d) => existsSync(d));
}

/** Språkpakkene i repoet: [plugin-id, manifest] for hver med languages. */
function languagePacks() {
  const packs = [];
  for (const name of pluginDirs()) {
    const manifestFile = new URL(`${name}/plugin.json`, PLUGINS);
    if (!existsSync(manifestFile)) continue;
    const manifest = JSON.parse(readFileSync(manifestFile, 'utf-8'));
    if (Array.isArray(manifest.languages) && manifest.languages.length) packs.push([name, manifest]);
  }
  return packs;
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

test('matchLang: no/nb-varianter til nb, samiske varianter til se, ukjent gir null', () => {
  for (const [raw, want] of [
    ['no', 'nb'], ['nb', 'nb'], ['nb-NO', 'nb'], ['NO-nb', 'nb'], ['nob', 'nb'], ['', null], [undefined, null],
    ['nn', 'nn'], ['nn-NO', 'nn'], ['nno', 'nn'],
    ['se', 'se'], ['se-NO', 'se'], ['sme', 'se'], ['smj', 'se'], ['sma', 'se'],
    ['tr', 'tr'], ['tr-TR', 'tr'],
    ['en', 'en-GB'], ['en-GB', 'en-GB'], ['en-US', 'en-GB'],
    // Null er meningsbærende: koden kan tilhøre en språkpakke.
    ['sv', null], ['de', null], ['tull', null],
    // Tagen må være HELE koden (eller koden + undertagg): en pakkekode som
    // tilfeldigvis begynner likt skal ikke omdirigeres til et innebygd språk.
    ['ses', null], ['trv', null], ['nnh', null], ['ena', null], ['sea', null],
  ]) {
    assert.equal(matchLang(raw), want, String(raw));
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

/* ---------- Språkpakker (0.6.8.10) ---------- */

for (const [id, manifest] of languagePacks()) {
  test(`språkpakken '${id}': manifestet er gyldig, og filene finnes med nøkler fra basen`, async () => {
    assert.deepEqual(validateLanguages(manifest.languages), [], `${id}: ugyldig languages-liste`);
    for (const entry of manifest.languages) {
      for (const kind of ['site', 'admin']) {
        if (entry[kind] !== true) continue;
        const file = new URL(`${id}/locales/${kind}/${entry.code}.js`, PLUGINS);
        assert.ok(existsSync(file), `${id}: lover ${kind}-tekster for ${entry.code}, men filen mangler`);
        const mod = (await import(file)).default;
        assert.equal(mod.lang, entry.code, `${id}/${kind}/${entry.code}: lang-feltet matcher koden`);
        // En pakke KAN dekke deler av settet (basen ligger under), men en
        // nøkkel som ikke finnes i basen er en skrivefeil som aldri vises.
        const base = (await import(new URL(`assets/engine/locales/${kind}/${BASE}.js`, ROOT))).default.strings;
        for (const [key, value] of Object.entries(mod.strings)) {
          assert.ok(base[key] !== undefined, `${id}/${kind}/${entry.code}: ukjent nøkkel '${key}'`);
          assert.ok(String(value).trim().length, `${id}/${kind}/${entry.code}: '${key}' er tom`);
          assert.ok(!String(value).includes('—'), `${id}/${kind}/${entry.code}: '${key}' har tankestrek`);
          assert.equal(tokensOf(value), tokensOf(base[key]), `${id}/${kind}/${entry.code}: '${key}' har andre {var}-tokens enn basen`);
        }
      }
    }
  });
}

test('validateLanguages: krever gyldig kode, eget navn og minst ett register', () => {
  assert.deepEqual(validateLanguages([{ code: 'sv', name: 'Svenska', site: true }]), []);
  assert.deepEqual(validateLanguages([{ code: 'pt-BR', name: 'Português', admin: true }]), []);
  // Innebygde språk kan ikke kapres av en plugin.
  assert.equal(validateLanguages([{ code: 'nb', name: 'Bokmål', site: true }]).length, 1);
  assert.equal(validateLanguages([{ code: 'Svensk!', name: 'Svenska', site: true }]).length, 1);
  assert.equal(validateLanguages([{ code: 'sv', site: true }]).length, 1);
  assert.equal(validateLanguages([{ code: 'sv', name: 'Svenska' }]).length, 1);
  assert.equal(validateLanguages([{ code: 'sv', name: 'Svenska', site: 'ja' }]).length, 2);
  assert.equal(validateLanguages('nei').length, 1);
});

test('isBuiltinLang: de fem som følger med, ingen andre', () => {
  for (const lang of SUPPORTED_LANGS) assert.ok(isBuiltinLang(lang));
  for (const lang of ['sv', 'de', '', undefined]) assert.ok(!isBuiltinLang(lang));
});

test('requestedLang: innebygd treff, ellers pakkekode som den er, ellers nb', () => {
  assert.equal(requestedLang('no'), 'nb');
  assert.equal(requestedLang('en-US'), 'en-GB');
  assert.equal(requestedLang('sv'), 'sv');
  assert.equal(requestedLang('pt-BR'), 'pt-BR');
  assert.equal(requestedLang('tull språk'), 'nb');
  assert.equal(requestedLang(''), 'nb');
  assert.equal(requestedLang(undefined), 'nb');
});

test('packLanguages: leser manifestene til de AKTIVERTE pluginene, hopper over de deaktiverte', async () => {
  // Oppdagelsen går over fetch (statisk hosting kan ikke liste mapper), så
  // svarene stubbes her. Kjøres før de andre pakketestene: skanningen gjøres
  // maks én gang per side, og resultatet caches.
  const files = {
    '/plugins/plugins.json': { version: 1, enabled: ['qa-pakke'], disabled: ['qa-avslatt'] },
    '/plugins/qa-pakke/plugin.json': {
      id: 'qa-pakke', name: 'QA', version: '1.0.0', requiresEngine: '>=0.5.0',
      languages: [{ code: 'qa-on', name: 'QA-språk', site: true }],
    },
    '/plugins/qa-avslatt/plugin.json': {
      id: 'qa-avslatt', name: 'QA av', version: '1.0.0', requiresEngine: '>=0.5.0',
      languages: [{ code: 'qa-off', name: 'Skal ikke med', site: true }],
    },
  };
  const original = globalThis.fetch;
  globalThis.fetch = async (url) => ({ json: async () => files[url] ?? Promise.reject(new Error('404')) });
  try {
    const langs = await packLanguages();
    const found = langs.find((l) => l.code === 'qa-on');
    assert.ok(found, 'språket fra den aktiverte pakken mangler');
    assert.equal(found.plugin, 'qa-pakke');
    assert.equal(found.site, true);
    assert.equal(found.admin, false);
    assert.ok(!langs.some((l) => l.code === 'qa-off'), 'en deaktivert pakke skal ikke tilby språk');
  } finally {
    globalThis.fetch = original;
  }
});

test('loadPackStrings: innebygde språk og ukjente koder gir null (aldri krasj uten server)', async () => {
  assert.equal(await loadPackStrings('nb', 'site'), null);
  assert.equal(await loadPackStrings('finnes-ikke', 'site'), null);
  // Registrert pakke uten site-dekning: registret svarer nei uten å laste noe.
  registerPackLanguages('test-pakke', [{ code: 'qa-test', name: 'Testspråk', admin: true }]);
  assert.equal(await loadPackStrings('qa-test', 'site'), null);
});

test('tp: flertallskategorier via Intl.PluralRules (nb one/other)', async () => {
  await initSiteLocale('nb');
  // Ingen flertallsnøkler i site-settet ennå; kontrakten testes via fallback:
  // ukjent basenøkkel gir '<base>.<kategori>' så feilen er synlig og sporbar.
  assert.equal(tp('x.days', 1), 'x.days.one');
  assert.equal(tp('x.days', 3), 'x.days.other');
});
