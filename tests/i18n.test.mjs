/**
 * Contract tests for the multi-language framework (ADR-0012): parity
 * between the language files (the core languages nb/en-GB/tr complete
 * against the nb base, nn/se may lag but never carry unknown keys; no
 * empty values, no em dashes, {var} token parity), and the i18n core's
 * pure logic (matchLang, interpolation, fallback, date tables). Finds
 * all locale sets automatically, so plugin and admin locales are covered
 * the moment they are created. Doubles as Urd's language file checker
 * for contributors: node --test tests/i18n.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { engineImport, ENGINE_DIR } from './_engine.mjs';
const {
  t, tp, matchLang, requestedLang, initSiteLocale, dates,
  SUPPORTED_LANGS, validateLanguages, isBuiltinLang,
} = await engineImport('i18n.js');
const { registerPackLanguages, loadPackStrings, packLanguages } = await engineImport('language-packs.js');

const ROOT = new URL('../template/', import.meta.url);
const BASE = 'nb';
/** The core languages are kept COMPLETE at every delivery (decided
 *  6 August 2026); nn/se fall back to Norwegian Bokmål at runtime and are
 *  filled in dedicated translation rounds. The test accepts gaps there,
 *  but never unknown keys (typos that would otherwise never surface). */
const CORE_LANGS = ['nb', 'en-GB', 'tr'];

const PLUGINS = new URL('plugins/', ROOT);
const pluginDirs = () => readdirSync(PLUGINS, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);

/** All locale directories with FULL parity: the engine's site/admin + each
 *  plugin's own strings. The language packs' locales/site|admin/ do not
 *  belong here (they may cover parts of the set); they are tested
 *  separately below. */
function localeDirs() {
  const dirs = [
    new URL('locales/site/', ENGINE_DIR),
    new URL('locales/admin/', ENGINE_DIR),
  ];
  for (const name of pluginDirs()) {
    const dir = new URL(`${name}/locales/`, PLUGINS);
    if (existsSync(new URL(`${BASE}.js`, dir))) dirs.push(dir);
  }
  return dirs.filter((d) => existsSync(d));
}

/** The language packs in the repo: [plugin id, manifest] for each with languages. */
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

  test(`${name}: every supported language exists, core languages match the nb base`, async () => {
    const set = await loadSet(dir);
    assert.ok(set[BASE], `${name} is missing the base ${BASE}.js`);
    for (const lang of SUPPORTED_LANGS) assert.ok(set[lang], `${name} is missing ${lang}.js`);
    const baseKeys = Object.keys(set[BASE].strings);
    for (const [lang, mod] of Object.entries(set)) {
      if (lang === BASE) continue;
      const keys = Object.keys(mod.strings);
      const missing = baseKeys.filter((k) => !keys.includes(k));
      const extra = keys.filter((k) => !baseKeys.includes(k));
      if (CORE_LANGS.includes(lang)) {
        assert.deepEqual(missing, [], `${name}${lang}: missing keys`);
      } else if (missing.length) {
        // The lag is legal outside the core languages, but is made visible
        // so the translation rounds see the scope.
        console.log(`  (${name}${lang}: ${missing.length} keys awaiting translation)`);
      }
      assert.deepEqual(extra, [], `${name}${lang}: unknown keys (not in the nb base)`);
    }
  });

  test(`${name}: values are non-empty, without em dashes, with the same {var} tokens as the base`, async () => {
    const set = await loadSet(dir);
    for (const [lang, mod] of Object.entries(set)) {
      assert.equal(mod.lang, lang, `${name}${lang}: the lang field matches the file name`);
      for (const [key, value] of Object.entries(mod.strings)) {
        assert.ok(String(value).trim().length, `${name}${lang}: '${key}' is empty`);
        assert.ok(!String(value).includes('—'), `${name}${lang}: '${key}' has an em dash`);
        if (lang !== BASE && set[BASE].strings[key] !== undefined) {
          assert.equal(
            tokensOf(value),
            tokensOf(set[BASE].strings[key]),
            `${name}${lang}: '${key}' has different {var} tokens than the base`,
          );
        }
      }
    }
  });
}

test('the site base has fallback date tables with 12/12/7/7 entries', async () => {
  const nb = (await engineImport('locales/site/nb.js')).default;
  assert.equal(nb.dates.months.length, 12);
  assert.equal(nb.dates.monthsShort.length, 12);
  assert.equal(nb.dates.weekdays.length, 7);
  assert.equal(nb.dates.weekdaysShort.length, 7);
});

test('matchLang: no/nb variants to nb, Sami variants to se, unknown gives null', () => {
  for (const [raw, want] of [
    ['no', 'nb'], ['nb', 'nb'], ['nb-NO', 'nb'], ['NO-nb', 'nb'], ['nob', 'nb'], ['', null], [undefined, null],
    ['nn', 'nn'], ['nn-NO', 'nn'], ['nno', 'nn'],
    ['se', 'se'], ['se-NO', 'se'], ['sme', 'se'], ['smj', 'se'], ['sma', 'se'],
    ['tr', 'tr'], ['tr-TR', 'tr'],
    ['en', 'en-GB'], ['en-GB', 'en-GB'], ['en-US', 'en-GB'],
    // Null is meaningful: the code may belong to a language pack.
    ['sv', null], ['de', null], ['tull', null],
    // The tag must be the WHOLE code (or the code + subtag): a pack code that
    // happens to start the same must not be redirected to a built-in language.
    ['ses', null], ['trv', null], ['nnh', null], ['ena', null], ['sea', null],
  ]) {
    assert.equal(matchLang(raw), want, String(raw));
  }
});

test('t: nb without init, {var} interpolation, unknown key gives the key itself', () => {
  // Expected values are Norwegian by design: nb is the base dictionary.
  assert.equal(t('nav.menu'), 'Meny');
  assert.equal(t('nav.submenuFor', { label: 'Om oss' }), 'Undermeny for Om oss');
  assert.equal(t('finnes.ikke'), 'finnes.ikke');
});

test('dateBadge follows the language: the nb months match the old badge names', () => {
  const d = dates();
  assert.deepEqual(
    d.monthsShort.slice(0, 3).map((s) => s.toLowerCase()),
    ['jan', 'feb', 'mar'],
  );
});

test('initSiteLocale: switches language with nb fallback for missing keys, and back', async () => {
  await initSiteLocale('en');
  assert.equal(t('nav.menu'), 'Menu');
  // The date tables follow the language (Intl where ICU has it).
  assert.equal(dates().months[2].toLowerCase(), 'march');
  await initSiteLocale('tull-språk');
  assert.equal(t('nav.menu'), 'Meny');
});

/* ---------- Language packs (0.6.8.10) ---------- */

for (const [id, manifest] of languagePacks()) {
  test(`language pack '${id}': the manifest is valid, and the files exist with keys from the base`, async () => {
    assert.deepEqual(validateLanguages(manifest.languages), [], `${id}: invalid languages list`);
    for (const entry of manifest.languages) {
      for (const kind of ['site', 'admin']) {
        if (entry[kind] !== true) continue;
        const file = new URL(`${id}/locales/${kind}/${entry.code}.js`, PLUGINS);
        assert.ok(existsSync(file), `${id}: promises ${kind} strings for ${entry.code}, but the file is missing`);
        const mod = (await import(file)).default;
        assert.equal(mod.lang, entry.code, `${id}/${kind}/${entry.code}: the lang field matches the code`);
        // A pack MAY cover parts of the set (the base sits underneath), but a
        // key that does not exist in the base is a typo that is never shown.
        const base = (await engineImport(`locales/${kind}/${BASE}.js`)).default.strings;
        for (const [key, value] of Object.entries(mod.strings)) {
          assert.ok(base[key] !== undefined, `${id}/${kind}/${entry.code}: unknown key '${key}'`);
          assert.ok(String(value).trim().length, `${id}/${kind}/${entry.code}: '${key}' is empty`);
          assert.ok(!String(value).includes('—'), `${id}/${kind}/${entry.code}: '${key}' has an em dash`);
          assert.equal(tokensOf(value), tokensOf(base[key]), `${id}/${kind}/${entry.code}: '${key}' has different {var} tokens than the base`);
        }
      }
    }
  });
}

test('validateLanguages: requires a valid code, its own name and at least one registry', () => {
  assert.deepEqual(validateLanguages([{ code: 'sv', name: 'Svenska', site: true }]), []);
  assert.deepEqual(validateLanguages([{ code: 'pt-BR', name: 'Português', admin: true }]), []);
  // Built-in languages cannot be hijacked by a plugin.
  assert.equal(validateLanguages([{ code: 'nb', name: 'Bokmål', site: true }]).length, 1);
  assert.equal(validateLanguages([{ code: 'Svensk!', name: 'Svenska', site: true }]).length, 1);
  assert.equal(validateLanguages([{ code: 'sv', site: true }]).length, 1);
  assert.equal(validateLanguages([{ code: 'sv', name: 'Svenska' }]).length, 1);
  assert.equal(validateLanguages([{ code: 'sv', name: 'Svenska', site: 'ja' }]).length, 2);
  assert.equal(validateLanguages('nei').length, 1);
});

test('isBuiltinLang: the five that ship, no others', () => {
  for (const lang of SUPPORTED_LANGS) assert.ok(isBuiltinLang(lang));
  for (const lang of ['sv', 'de', '', undefined]) assert.ok(!isBuiltinLang(lang));
});

test('requestedLang: built-in match, otherwise the pack code as-is, otherwise nb', () => {
  assert.equal(requestedLang('no'), 'nb');
  assert.equal(requestedLang('en-US'), 'en-GB');
  assert.equal(requestedLang('sv'), 'sv');
  assert.equal(requestedLang('pt-BR'), 'pt-BR');
  assert.equal(requestedLang('tull språk'), 'nb');
  assert.equal(requestedLang(''), 'nb');
  assert.equal(requestedLang(undefined), 'nb');
});

test('packLanguages: reads the manifests of the ENABLED plugins, skips the disabled', async () => {
  // Discovery goes over fetch (static hosting cannot list directories), so
  // the responses are stubbed here. Runs before the other pack tests: the
  // scan happens at most once per page, and the result is cached.
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
    assert.ok(found, 'the language from the enabled pack is missing');
    assert.equal(found.plugin, 'qa-pakke');
    assert.equal(found.site, true);
    assert.equal(found.admin, false);
    assert.ok(!langs.some((l) => l.code === 'qa-off'), 'a disabled pack must not offer languages');
  } finally {
    globalThis.fetch = original;
  }
});

test('loadPackStrings: built-in languages and unknown codes give null (never a crash without a server)', async () => {
  assert.equal(await loadPackStrings('nb', 'site'), null);
  assert.equal(await loadPackStrings('finnes-ikke', 'site'), null);
  // Registered pack without site coverage: the registry says no without loading anything.
  registerPackLanguages('test-pakke', [{ code: 'qa-test', name: 'Testspråk', admin: true }]);
  assert.equal(await loadPackStrings('qa-test', 'site'), null);
});

test('tp: plural categories via Intl.PluralRules (nb one/other)', async () => {
  await initSiteLocale('nb');
  // No plural keys in the site set yet; the contract is tested via fallback:
  // an unknown base key gives '<base>.<category>' so the error is visible and traceable.
  assert.equal(tp('x.days', 1), 'x.days.one');
  assert.equal(tp('x.days', 3), 'x.days.other');
});

test('api error codes: every code in functions has an api. key in the admin base', () => {
  // The base is read as text: the keys are extracted with a regex, the same
  // mechanical form as the rest of the parity tests.
  const nbSrc = readFileSync(new URL('locales/admin/nb.js', ENGINE_DIR), 'utf-8');
  const adminKeys = new Set([...nbSrc.matchAll(/'(api\.[A-Za-z]+)':/g)].map((m) => m[1]));
  const fnDir = new URL('functions/', ROOT);
  const codes = new Set();
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const child = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir);
      if (entry.isDirectory()) walk(child);
      else if (entry.name.endsWith('.js')) {
        for (const m of readFileSync(child, 'utf-8').matchAll(/code: '([A-Za-z]+)'/g)) codes.add(m[1]);
      }
    }
  };
  walk(fnDir);
  assert.ok(codes.size >= 30, `found only ${codes.size} codes in functions (regex drift?)`);
  for (const code of codes) {
    assert.ok(adminKeys.has(`api.${code}`), `the functions code '${code}' is missing api.${code} in the admin base`);
  }
});

test('taApiError: known code is translated with parameters, unknown falls back to the error text', async () => {
  const { taApiError, addAdminDict } = await engineImport('i18n.js');
  const nbAdmin = (await engineImport('locales/admin/nb.js')).default;
  addAdminDict(nbAdmin.strings);
  // The expected value is the Norwegian nb dictionary text by design.
  assert.equal(
    taApiError({ error: 'rå tekst', code: 'setupMissingEnv', key: 'GITHUB_REPO' }),
    'Publisering er ikke konfigurert: miljøvariabelen GITHUB_REPO mangler',
  );
  assert.equal(taApiError({ error: 'rå backend-tekst', code: 'ukjentKode' }), 'rå backend-tekst');
  assert.equal(taApiError({ error: 'kun tekst' }), 'kun tekst');
  assert.equal(taApiError(null), null);
});
