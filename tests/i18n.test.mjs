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
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { engineImport, ENGINE_DIR } from './_engine.mjs';
const {
  t, tp, pluralForm, themeString, matchLang, requestedLang, initSiteLocale, dates,
  SUPPORTED_LANGS, validateLanguages, isBuiltinLang,
} = await engineImport('i18n.js');
const { registerPackLanguages, loadPackStrings, packLanguages } = await engineImport('language-packs.js');

const ROOT = new URL('../template/', import.meta.url);
const BASE = 'nb';
/** The core languages are kept COMPLETE at every delivery; nn/se fall back
 *  to Norwegian Bokmål at runtime and are
 *  filled in dedicated translation rounds. The test accepts gaps there,
 *  but never unknown keys (typos that would otherwise never surface). */
const CORE_LANGS = ['nb', 'en-GB', 'tr'];

const PLUGINS = new URL('plugins/', ROOT);
const pluginDirs = () => readdirSync(PLUGINS, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);

/**
 * The lines of a module where ta() is called as the module loads: outside every function, method, class body and Svelte $derived.
 * Walks the text by its brackets, skipping comments, strings, the words of template literals (their ${} read as code) and regular expressions; a function's parameters count as the function's.
 */
function loadTimeCalls(source) {
  const found = [];
  const stack = [];
  const arrows = [];
  let i = 0;
  let prev = '';
  let word = '';
  let pendingArrow = false;
  const KEYWORD_PARENS = new Set(['if', 'for', 'while', 'switch', 'catch', 'with']);
  const inFunction = () => arrows.length > 0 || stack.some((c) => c.fn);
  const open = (ch, fn) => stack.push({ ch, fn, word, depth: stack.length });
  const skipTo = (end) => { const at = source.indexOf(end, i); i = at < 0 ? source.length : at + end.length; };
  const significant = (ch) => { prev = ch; if (!/[\w$]/.test(ch)) word = ''; };
  const template = () => {
    while (i < source.length) {
      const ch = source[i];
      if (ch === '\\') { i += 2; continue; }
      if (ch === '`') { i++; return; }
      if (ch === '$' && source[i + 1] === '{') { i += 2; open('${', false); return 'code'; }
      i++;
    }
  };
  while (i < source.length) {
    const ch = source[i];
    if (/\s/.test(ch)) { i++; continue; }
    if (source.startsWith('//', i)) { skipTo('\n'); continue; }
    if (source.startsWith('/*', i)) { skipTo('*/'); continue; }
    if (ch === '"' || ch === "'") {
      i++;
      while (i < source.length && source[i] !== ch) i += source[i] === '\\' ? 2 : 1;
      i++;
      significant('"');
      continue;
    }
    if (ch === '`') { i++; template(); significant('"'); continue; }
    if (ch === '/' && (prev === '' || '(,=:[!&|?{};+-*%<>~^'.includes(prev) || /^(return|typeof|case|in|of)$/.test(word))) {
      i++;
      let inClass = false;
      while (i < source.length && (source[i] !== '/' || inClass)) {
        if (source[i] === '\\') i++;
        else if (source[i] === '[') inClass = true;
        else if (source[i] === ']') inClass = false;
        i++;
      }
      i++;
      while (/[a-z]/.test(source[i] ?? '')) i++;
      significant('"');
      continue;
    }
    if (/[\w$]/.test(ch)) {
      let j = i;
      while (j < source.length && /[\w$]/.test(source[j])) j++;
      const name = source.slice(i, j);
      if (pendingArrow) { pendingArrow = false; arrows.push(stack.length); }
      const called = /^\s*\(/.test(source.slice(j, j + 20));
      if (name === 'ta' && prev !== '.' && word !== 'function' && called && !inFunction()) found.push(source.slice(0, i).split('\n').length);
      i = j;
      prev = 'w';
      word = name;
      continue;
    }
    if (source.startsWith('=>', i)) { i += 2; pendingArrow = true; prev = '>'; word = ''; continue; }
    if (pendingArrow && ch !== '{') { pendingArrow = false; arrows.push(stack.length); }
    if (ch === '{') {
      const afterParen = prev === ')' && !KEYWORD_PARENS.has(stack.closedWord);
      const classBody = /\bclass\b[^;{}]*$/.test(source.slice(Math.max(0, i - 200), i));
      open('{', pendingArrow || afterParen || classBody);
      pendingArrow = false;
    } else if (ch === '(') {
      // A function's parameters are read as it is called, and a $derived as it is read.
      open('(', /\$derived(\.by)?\s*$|\bfunction\b\s*\*?\s*[\w$]*\s*$/.test(source.slice(Math.max(0, i - 60), i)));
    } else if (ch === '[') {
      open('[', false);
    } else if (ch === ')' || ch === ']' || ch === '}') {
      const closed = stack.pop();
      while (arrows.length && arrows.at(-1) > stack.length) arrows.pop();
      stack.closedWord = closed?.word;
      if (ch === '}' && closed?.ch === '${') { i++; template(); significant('"'); continue; }
    } else if ((ch === ',' || ch === ';') && arrows.length && arrows.at(-1) === stack.length) {
      arrows.pop();
    }
    i++;
    significant(ch);
  }
  return found;
}

test('the walk finds a ta() called as a module loads, and passes one inside a function', () => {
  assert.deepEqual(loadTimeCalls("const T = [['text', ta('lbl.textColor')], ['bg', ta('lbl.background')]];"), [1, 1]);
  assert.deepEqual(loadTimeCalls("const X = [['a', ta('k')], ['b', (v) => v]];"), [1], 'an arrow beside it does not hide it');
  assert.deepEqual(loadTimeCalls('const CSS = `\n.a { color: red; }\n.b { top: 0; }\n${ta(\'k\')}\n`;'), [4], 'in a template literal\'s ${}');
  assert.deepEqual(loadTimeCalls("if (ready) { ta('k'); }"), [1]);
  assert.deepEqual(loadTimeCalls([
    "const f = () => ta('k'), g = 1;",
    "const h = (x) => { return ta(x); };",
    "function i() { return ta('k'); }",
    "const o = { m() { return ta('k'); }, n: (x) => ta(x), p: [1, 2] };",
    "const L = $derived({ a: ta('k') });",
    "const M = $derived.by(() => [ta('k')]);",
    "class C { label() { return ta('k'); } }",
    "const re = /[(]/g; const q = () => ta('k');",
    "const s = 'ta(\\'k\\')'; // ta('k')",
    "/* ta('k') */ const r = obj.ta('k');",
    "function ask({ ok = ta('k') } = {}) { return ok; }",
  ].join('\n')), [], 'inside a function, a method, an arrow, $derived or a class, or not a call of ta()');
});

test('no module of the engine, the editor or a plugin calls ta() as it loads: the admin dictionary may not be read yet (ADR-0012)', () => {
  const repo = fileURLToPath(new URL('..', import.meta.url));
  const files = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { if (e.name !== 'locales' && e.name !== 'node_modules') walk(p); } else if (p.endsWith('.js')) files.push(p);
    }
  };
  for (const root of [ENGINE_DIR, new URL('../editor/src/', import.meta.url), PLUGINS]) walk(fileURLToPath(root));
  assert.ok(files.length > 100, 'the modules are found');
  const found = files.flatMap((file) => loadTimeCalls(readFileSync(file, 'utf8')).map((line) => `${path.relative(repo, file)}:${line}`));
  assert.deepEqual(found, [], 'ta() called as the module loads');
});

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

/* ---------- Language packs ---------- */

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

test('the admin dictionary: the bokmål base under the language\'s own words, read together; a language pack over the base; bokmål where there is neither', async () => {
  await import('./_site-paths.mjs');
  registerPackLanguages('lang-sv', [{ code: 'sv', name: 'Svenska', admin: true }]);
  const words = async (url) => (await import(url.href)).default.strings;
  const nb = await words(new URL('locales/admin/nb.js', ENGINE_DIR));
  const sv = await words(new URL('plugins/lang-sv/locales/admin/sv.js', ROOT));
  // Each language in a fresh copy of the module, with a dictionary of its own.
  const open = async (lang) => {
    const i18n = await import(new URL(`i18n.js?admin=${lang}`, ENGINE_DIR).href);
    return { lang: await i18n.initAdminLocale(lang), ta: i18n.ta };
  };
  const key = 'lbl.textColor';
  for (const lang of ['en-GB', 'tr', 'nn']) {
    const own = await words(new URL(`locales/admin/${lang}.js`, ENGINE_DIR));
    const got = await open(lang);
    assert.equal(got.lang, lang);
    assert.equal(got.ta(key), own[key]);
    assert.deepEqual(Object.keys(nb).filter((k) => got.ta(k) === k), [], `${lang}: every key has words, the base's where the language has none`);
  }
  const bokmal = await open('nb');
  assert.equal(bokmal.ta(key), nb[key]);
  const pack = await open('sv');
  assert.equal(pack.lang, 'sv');
  assert.equal(pack.ta(key), sv[key]);
  const gap = Object.keys(nb).find((k) => !(k in sv));
  if (gap) assert.equal(pack.ta(gap), nb[gap], 'a word the pack lacks is the base\'s');
  const none = await open('de');
  assert.equal(none.lang, 'nb', 'no dictionary and no pack: bokmål');
  assert.equal(none.ta(key), nb[key]);
});

test('tp: plural categories via Intl.PluralRules (nb one/other)', async () => {
  await initSiteLocale('nb');
  // No plural keys in the site set yet; the contract is tested via fallback:
  // an unknown base key gives '<base>.<category>' so the error is visible and traceable.
  assert.equal(tp('x.days', 1), 'x.days.one');
  assert.equal(tp('x.days', 3), 'x.days.other');
});

test('pluralForm: the form a count takes, falling back to other where the language has no key for its category', async () => {
  await initSiteLocale('nb');
  assert.deepEqual(pluralForm('calendar.inDays', 1), { form: 'one', key: 'calendar.inDays.one' });
  assert.deepEqual(pluralForm('calendar.inDays', 3), { form: 'other', key: 'calendar.inDays.other' });
  // Northern Sami counts two as a form of its own (the dual), which the calendar's texts do not have: the other form stands for it.
  await initSiteLocale('se');
  assert.deepEqual(pluralForm('calendar.inDays', 2), { form: 'other', key: 'calendar.inDays.other' });
  await initSiteLocale('nb');
  assert.deepEqual(pluralForm('x.days', 1), { form: 'one', key: 'x.days.one' }, 'an unknown key keeps its category, so tp shows it');
});

test('themeString: the design\'s own word in the site language, else the common word there, before bokmål\'s own', async () => {
  await initSiteLocale('nb');
  assert.equal(themeString('calendar.theme.pad.inDays', 'calendar.inDays', 'other'), 'I dag om {n} dager');
  assert.equal(themeString('calendar.theme.pad.inDays', 'calendar.inDays', 'one'), 'I dag om {n} dager', 'a form the theme has no key for takes its other form');
  assert.equal(themeString('calendar.theme.none.today', 'calendar.today'), 'I dag!', 'a design without the word speaks the common one');
  await initSiteLocale('en');
  assert.equal(themeString('calendar.theme.pad.inDays', 'calendar.inDays', 'other'), 'Today in {n} days');
  await initSiteLocale('nn');
  assert.equal(themeString('calendar.theme.pad.inDays', 'calendar.inDays', 'other'), 'Om {n} dagar', 'a language without the theme word speaks its own common word, never bokmål\'s theme word');
  assert.equal(themeString('calendar.theme.pad.inDays', 'nothing.here', 'other'), 'I dag om {n} dager', 'with no common word of its own either, bokmål\'s theme word');
  assert.equal(themeString('nothing.theme', 'nothing.here'), 'nothing.here');
  await initSiteLocale('nb');
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

test('literal t()/ta() keys in the engine exist in the nb base dictionaries', () => {
  // Guards consumers against key renames: a missing key renders as the key
  // name on the page. Only literal keys are checked (including the ternary
  // form t(cond ? 'a' : 'b')); keys built at runtime are out of reach here.
  const keysOf = (rel) => new Set([...readFileSync(new URL(rel, ENGINE_DIR), 'utf-8').matchAll(/'([A-Za-z0-9.]+)':/g)].map((m) => m[1]));
  const site = keysOf('locales/site/nb.js');
  const admin = keysOf('locales/admin/nb.js');
  const missing = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'locales') continue;
      const child = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir);
      if (entry.isDirectory()) { walk(child); continue; }
      if (!entry.name.endsWith('.js')) continue;
      const src = readFileSync(child, 'utf-8');
      const check = (fn, dict, key) => { if (!dict.has(key)) missing.push(`${entry.name}: ${fn}('${key}')`); };
      for (const m of src.matchAll(/\bta\(\s*'([a-z][A-Za-z0-9]*\.[A-Za-z0-9.]+)'/g)) check('ta', admin, m[1]);
      for (const m of src.matchAll(/(?<![A-Za-z])t\(\s*'([a-z][A-Za-z0-9]*\.[A-Za-z0-9.]+)'/g)) check('t', site, m[1]);
      for (const m of src.matchAll(/(?<![A-Za-z])(ta?)\([^()]*\?\s*'([a-z][A-Za-z0-9]*\.[A-Za-z0-9.]+)'\s*:\s*'([a-z][A-Za-z0-9]*\.[A-Za-z0-9.]+)'/g)) {
        const dict = m[1] === 'ta' ? admin : site;
        check(m[1], dict, m[2]); check(m[1], dict, m[3]);
      }
    }
  };
  walk(ENGINE_DIR);
  assert.deepEqual(missing, [], 'literal keys without a dictionary entry');
});
