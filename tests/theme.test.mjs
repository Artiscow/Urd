/**
 * Contract tests for the theme's pure light/dark logic (theme.js):
 * mode resolution and token selection. The DOM application (applyTheme,
 * toggleThemeMode) and the nav switch are tested manually, apart from the
 * storage key they share with theme-init.js.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { engineImport, ENGINE_DIR } from './_engine.mjs';
const {
  resolveThemeMode, activeTokens,
  sectionThemeVars, SECTION_THEMES, relativeLuminance, contrastRatio, inkOn,
  buildThemeCss, safeCssValue,
  wordsVars,
} = await engineImport('theme.js');

test('resolveThemeMode: stored choice wins over the OS preference', () => {
  assert.equal(resolveThemeMode('light', 'dark', false), 'dark');
  assert.equal(resolveThemeMode('dark', 'light', true), 'light');
});

test('resolveThemeMode: without a stored choice the OS preference is followed', () => {
  assert.equal(resolveThemeMode('light', null, true), 'dark');
  assert.equal(resolveThemeMode('light', null, false), 'light');
  assert.equal(resolveThemeMode(undefined, null, true), 'dark');
});

test('resolveThemeMode: invalid stored value is ignored', () => {
  assert.equal(resolveThemeMode('light', 'tull', false), 'light');
});

const THEME = {
  scheme: 'dark',
  tokens: {
    color: { bg: '#0b0e14', text: '#eeeeee' },
    font: { body: 'serif' },
  },
  alt: { tokens: { color: { bg: '#ffffff', text: '#111111' } } },
};

test('activeTokens: the main mode gives the main tokens untouched', () => {
  assert.deepEqual(activeTokens(THEME, 'dark'), THEME.tokens);
});

test('activeTokens: the opposite mode overrides per group, the rest is inherited', () => {
  const light = activeTokens(THEME, 'light');
  assert.equal(light.color.bg, '#ffffff');
  assert.equal(light.color.text, '#111111');
  // The font group does not exist in alt and is inherited from the main theme
  assert.equal(light.font.body, 'serif');
});

test('activeTokens: partial alt group keeps the main values that are not overridden', () => {
  const theme = {
    tokens: { color: { bg: '#000000', accent: '#7c5cff' } },
    alt: { tokens: { color: { bg: '#ffffff' } } },
  };
  // Missing scheme = light is the main mode; dark uses alt
  const dark = activeTokens(theme, 'dark');
  assert.equal(dark.color.bg, '#ffffff');
  assert.equal(dark.color.accent, '#7c5cff');
});

test('activeTokens: without an alt theme the main tokens are returned regardless of mode', () => {
  const theme = { tokens: { color: { bg: '#123456' } } };
  assert.deepEqual(activeTokens(theme, 'dark'), theme.tokens);
  assert.deepEqual(activeTokens(theme, 'light'), theme.tokens);
});

test('sectionThemeVars: known roles give overrides, default/unknown gives {}', () => {
  assert.deepEqual(sectionThemeVars('standard'), {});
  assert.deepEqual(sectionThemeVars(undefined), {});
  assert.deepEqual(sectionThemeVars('finnes-ikke'), {});
  assert.deepEqual(sectionThemeVars('surface'), SECTION_THEMES.surface);
  assert.equal(sectionThemeVars('accent')['--urd-color-bg'], 'var(--urd-base-accent)');
  // Inverse swaps bg<->text via BASE copies (not live tokens = no cycle).
  assert.equal(sectionThemeVars('inverse')['--urd-color-bg'], 'var(--urd-base-text)');
  assert.equal(sectionThemeVars('inverse')['--urd-color-text'], 'var(--urd-base-bg)');
  for (const vars of Object.values(SECTION_THEMES)) {
    for (const v of Object.values(vars)) {
      assert.ok(!/var\(--urd-color-/.test(v), `a role must not reference live --urd-color-* (${v})`);
    }
  }
});

test('relativeLuminance: white=1, black=0, invalid=null', () => {
  assert.equal(Math.round(relativeLuminance('#ffffff')), 1);
  assert.equal(relativeLuminance('#000000'), 0);
  assert.equal(relativeLuminance('#fff'), relativeLuminance('#ffffff')); // short form
  assert.equal(relativeLuminance('accent'), null); // token names cannot be measured
  assert.equal(relativeLuminance('color-mix(in srgb, red, blue)'), null);
});

test('contrastRatio: black/white=21, equal=1, unmeasurable=null', () => {
  assert.ok(Math.abs(contrastRatio('#000000', '#ffffff') - 21) < 0.01);
  assert.equal(contrastRatio('#123456', '#123456'), 1);
  assert.equal(contrastRatio('#ffffff', 'accent'), null);
  // White text on well-teal is below WCAG 4.5 (the point of the contrast warning).
  assert.ok(contrastRatio('#15b39a', '#ffffff') < 4.5);
});

test('safeCssValue: accepts colors/lengths/font stacks, rejects injection', () => {
  assert.ok(safeCssValue('#f6faf8'));
  assert.ok(safeCssValue("'Courier New', monospace"));
  assert.ok(safeCssValue('clamp(3rem, 8vw, 6rem)'));
  assert.ok(safeCssValue('color-mix(in srgb, red, blue)'));
  assert.ok(safeCssValue('oklch(0.7 0.1 200)'));
  // Breaking out of the declaration / dangerous constructs are dropped.
  assert.ok(!safeCssValue('red; } body { display: none }'));
  assert.ok(!safeCssValue('url(evil.png)'));
  assert.ok(!safeCssValue('a /* komment */ b'));
  assert.ok(!safeCssValue('expression(alert(1))'));
  assert.ok(!safeCssValue(123)); // not a string
});

test('buildThemeCss: with alt the colors become light-dark(light, dark) in the right direction', () => {
  // THEME has scheme dark: light = the alt values, dark = the main values.
  const css = buildThemeCss(THEME);
  assert.match(css, /@supports \(color: light-dark\(#000, #fff\)\)/);
  assert.match(css, /color-scheme: light dark;/);
  // bg: light = #ffffff (alt), dark = #0b0e14 (main)
  assert.match(css, /--urd-color-bg: light-dark\(#ffffff, #0b0e14\);/);
  assert.match(css, /--urd-base-bg: light-dark\(#ffffff, #0b0e14\);/);
  assert.match(css, /--urd-color-text: light-dark\(#111111, #eeeeee\);/);
  // Manual choice controls color-scheme (and thus which side light-dark() picks).
  assert.match(css, /:root\[data-urd-theme="light"\] \{ color-scheme: light; \}/);
  assert.match(css, /:root\[data-urd-theme="dark"\] \{ color-scheme: dark; \}/);
  // Font is equal in both modes: single value, no light-dark().
  assert.match(css, /--urd-font-body: serif;/);
  assert.ok(!/--urd-font-body: light-dark/.test(css));
});

test('buildThemeCss: a group or token name that could end the rule is left out, and the names beside it are kept', () => {
  const css = buildThemeCss({ tokens: {
    color: { accent: '#ff0000', 'x: red; } body { display: none } :root { --y': '#000000' },
    'color: red; } * { --z': { a: '#111111' },
  } });
  assert.match(css, /--urd-color-accent: #ff0000;/);
  assert.ok(!css.includes('display: none'), css);
  assert.ok(!css.includes('--z'), css);
  assert.ok(!css.includes('--y'), css);
});

test('buildThemeCss: the fallback single values sit in :root BEFORE the @supports block', () => {
  const css = buildThemeCss(THEME);
  const rootAt = css.indexOf(':root {');
  const supportsAt = css.indexOf('@supports');
  assert.ok(rootAt >= 0 && supportsAt > rootAt);
  // The fallback uses the main theme (scheme dark) as the single value.
  assert.ok(css.slice(0, supportsAt).includes('--urd-color-bg: #0b0e14;'));
});

test('buildThemeCss: without an alt theme gives single values and a locked color-scheme, no light-dark()', () => {
  const light = buildThemeCss({ tokens: { color: { bg: '#123456' } } });
  assert.match(light, /color-scheme: light;/);
  assert.match(light, /--urd-color-bg: #123456;/);
  assert.match(light, /--urd-base-bg: #123456;/);
  assert.ok(!light.includes('light-dark('));
  assert.ok(!light.includes('@supports'));
  // scheme dark locks color-scheme to dark.
  const dark = buildThemeCss({ scheme: 'dark', tokens: { color: { bg: '#111111' } } });
  assert.match(dark, /color-scheme: dark;/);
  assert.ok(!dark.includes('light-dark('));
});

test('buildThemeCss: a color equal in both modes becomes a single value', () => {
  // accent-text is #04241d in both main and alt (cf. content/site.json).
  const css = buildThemeCss({
    scheme: 'light',
    tokens: { color: { bg: '#f6faf8', 'accent-text': '#04241d' } },
    alt: { tokens: { color: { bg: '#000000', 'accent-text': '#04241d' } } },
  });
  assert.match(css, /--urd-color-bg: light-dark\(#f6faf8, #000000\);/);
  // Equal value: single value only, never light-dark(x, x).
  assert.ok(!/accent-text: light-dark/.test(css));
  assert.match(css, /--urd-color-accent-text: #04241d;/);
});

test('buildThemeCss: injected values are dropped, valid color-mix()/oklch() is kept', () => {
  const css = buildThemeCss({
    tokens: { color: { bg: 'red;} body{display:none', accent: '#123456', text: 'oklch(0.2 0.1 200)' } },
    alt: { tokens: { color: { bg: '#000000', accent: '#654321', text: 'oklch(0.9 0.05 200)' } } },
  });
  // The injection value never reaches the CSS (neither fallback nor light-dark()).
  assert.ok(!css.includes('display:none'));
  assert.ok(!css.includes('body{'));
  // Valid values are kept.
  assert.match(css, /--urd-color-accent: light-dark\(#123456, #654321\);/);
  assert.match(css, /--urd-color-text: light-dark\(oklch\(0\.2 0\.1 200\), oklch\(0\.9 0\.05 200\)\);/);
});

test('buildThemeCss: without an accent-text token the browser chooses it with contrast-color(), bg as the fallback', () => {
  const css = buildThemeCss({ tokens: { color: { bg: '#ffffff', accent: '#15b39a' } } });
  assert.match(css, /--urd-color-accent-text: #ffffff;/);
  assert.match(css, /--urd-base-accent-text: #ffffff;/);
  assert.match(css, /@supports \(color: contrast-color\(#000\)\) \{\n  :root \{\n    --urd-color-accent-text: contrast-color\(var\(--urd-color-accent\)\);\n    --urd-base-accent-text: contrast-color\(var\(--urd-base-accent\)\);/);
  // The fallback sits in :root before the @supports block.
  assert.ok(css.indexOf(':root {') < css.indexOf('@supports (color: contrast-color'));
  // With a dual theme the contrast block comes too, and the accent itself is light-dark().
  const dual = buildThemeCss({ ...THEME, tokens: { ...THEME.tokens, color: { ...THEME.tokens.color, accent: '#15b39a' } } });
  assert.match(dual, /contrast-color\(var\(--urd-color-accent\)\)/);
  // Without an accent there is nothing to contrast against: no block.
  assert.ok(!buildThemeCss({ tokens: { color: { bg: '#123456' } } }).includes('contrast-color('));
});

test('buildThemeCss: an owner-set accent-text token is kept and contrast-color() is not emitted', () => {
  const css = buildThemeCss({ tokens: { color: { bg: '#ffffff', accent: '#15b39a', 'accent-text': '#04241d' } } });
  assert.match(css, /--urd-color-accent-text: #04241d;/);
  assert.ok(!css.includes('contrast-color('));
  const alt = buildThemeCss({ tokens: { color: { bg: '#ffffff', accent: '#15b39a' } }, alt: { tokens: { color: { 'accent-text': '#000000' } } } });
  assert.ok(!alt.includes('contrast-color('), 'a token set on one side only still counts as owner-set');
});

test('inkOn: dark text on a light colour, light on a dark one, the theme pair on a theme colour', () => {
  assert.equal(inkOn('#ffd36b'), '#14161c');
  assert.equal(inkOn('#1c2340'), '#ffffff');
  assert.equal(inkOn('#fff'), '#14161c');
  assert.equal(inkOn('accent'), 'var(--urd-color-accent-text)');
  assert.equal(inkOn('text'), 'var(--urd-color-bg)');
  assert.equal(inkOn('rgb(0 0 0)'), null);
  assert.equal(inkOn(''), null);
  assert.equal(inkOn('toString'), null);
  // The ink chosen is the one of the two that stands out more.
  for (const colour of ['#ffd36b', '#1c2340', '#7c5cff', '#18b39b', '#d0a74a', '#808080']) {
    const ink = inkOn(colour);
    const other = ink === '#ffffff' ? '#14161c' : '#ffffff';
    assert.ok(contrastRatio(ink, colour) >= contrastRatio(other, colour), colour);
  }
});

test('wordsVars and buildThemeCss: long words kept whole as the standard, hyphenated from the theme\'s own words, both written outright', () => {
  const whole = { '--urd-text-hyphens': 'manual', '--urd-text-wrap': 'normal' };
  assert.deepEqual(wordsVars({}), whole);
  assert.deepEqual(wordsVars({ words: 'whole' }), whole);
  assert.deepEqual(wordsVars({ words: 'hyphenate' }), { '--urd-text-hyphens': 'auto', '--urd-text-wrap': 'break-word' });
  const tokens = { color: { bg: '#ffffff', text: '#111111' }, font: { body: 'Georgia, serif' } };
  assert.ok(buildThemeCss({ tokens, words: 'hyphenate' }).includes('--urd-text-hyphens: auto;'));
  assert.ok(buildThemeCss({ tokens }).includes('--urd-text-hyphens: manual;'), 'the standard is written too, so a draft wins over a published theme.css');
});

test('onlyColoursChanged: the theme\'s colours, its dark variant\'s, its colour sets and its scheme alone; anything else, or a dark variant appearing or going, is drawn again', async () => {
  const { onlyColoursChanged } = await engineImport('theme.js');
  const site = () => ({
    site: { title: 'A' }, pages: [{ id: 'hjem' }], nav: { items: [] },
    theme: { version: 1, words: 'whole', tokens: { color: { bg: '#fff', accent: '#0a0' }, font: { body: 'Inter' }, radius: { md: '8px' } }, alt: { tokens: { color: { bg: '#000' } }, auto: false }, colorSets: [] },
  });
  const changed = (fn) => { const s = site(); fn(s); return s; };
  assert.equal(onlyColoursChanged(site(), changed((s) => { s.theme.tokens.color.accent = '#f00'; })), true);
  assert.equal(onlyColoursChanged(site(), changed((s) => { s.theme.alt.tokens.color.bg = '#111'; })), true);
  assert.equal(onlyColoursChanged(site(), changed((s) => { s.theme.colorSets = [{ id: 'a', colors: ['#123456'] }]; })), true);
  assert.equal(onlyColoursChanged(site(), changed((s) => { s.theme.scheme = 'dark'; })), true);
  assert.equal(onlyColoursChanged(site(), changed((s) => { s.theme.tokens.font.body = 'Lora'; })), false, 'a font changes what is measured');
  assert.equal(onlyColoursChanged(site(), changed((s) => { s.theme.words = 'hyphenate'; })), false);
  assert.equal(onlyColoursChanged(site(), changed((s) => { delete s.theme.alt; })), false, 'the toggle and the privacy page follow the dark variant');
  assert.equal(onlyColoursChanged(site(), changed((s) => { s.nav.items.push({ page: 'hjem' }); })), false);
  assert.equal(onlyColoursChanged(null, site()), false);
  assert.equal(onlyColoursChanged(site(), site()), false, 'a site sent unchanged is sent to be drawn again');
  const big = changed((s) => { s.nav.layers = [{ src: `data:image/webp;base64,${'A'.repeat(4_000_000)}` }]; });
  const bigColour = changed((s) => { s.nav.layers = big.nav.layers; s.theme.tokens.color.accent = '#f00'; });
  const t0 = performance.now();
  assert.equal(onlyColoursChanged(big, bigColour), true);
  assert.ok(performance.now() - t0 < 5, 'a site holding a picture is compared without writing it out');
  const urd = readFileSync(new URL('urd.js', ENGINE_DIR), 'utf8');
  assert.match(urd, /msg\?\.type === 'urd-site' && msg\.site && !msg\.page && onlyColoursChanged\(state\.site, msg\.site\)\) \{[^}]*state\.site\.theme = msg\.site\.theme;\s+applyTheme\(state\.site\.theme\);\s+\}/, 'the engine draws the theme alone for it');
});

test('theme-init.js reads the light or dark choice under the key theme.js stores and reads it under, before the first paint', async () => {
  const { runInNewContext } = await import('node:vm');
  const { toggleThemeMode, applyTheme } = await engineImport('theme.js');
  /** A storage that remembers the keys asked for. */
  const storage = (stored = {}) => {
    const log = { read: [], written: [] };
    return { log, getItem: (k) => { log.read.push(k); return stored[k] ?? null; }, setItem: (k, v) => { log.written.push(k); stored[k] = String(v); } };
  };
  const root = () => {
    const attrs = {};
    return { attrs, setAttribute: (k, v) => { attrs[k] = v; }, removeAttribute: (k) => { delete attrs[k]; }, style: { setProperty() {}, removeProperty() {} } };
  };
  const names = ['localStorage', 'document', 'window'];
  const kept = names.map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)]);
  const engineStore = storage();
  try {
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: engineStore });
    Object.defineProperty(globalThis, 'document', { configurable: true, value: { documentElement: root() } });
    Object.defineProperty(globalThis, 'window', { configurable: true, value: { matchMedia: () => ({ matches: false }) } });
    applyTheme({ tokens: {} }, root());
    toggleThemeMode({ tokens: {} });
  } finally {
    for (const [name, descriptor] of kept) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  }
  const [key] = engineStore.log.written;
  assert.ok(key, 'the switch stores the choice');
  assert.deepEqual(engineStore.log.read, [key], 'the engine reads the choice under the key it stores it under');
  const early = storage({ [key]: 'dark' });
  const html = root();
  runInNewContext(readFileSync(new URL('theme-init.js', ENGINE_DIR), 'utf8'), { localStorage: early, document: { documentElement: html } });
  assert.deepEqual(early.log.read, [key], 'theme-init.js reads the same key');
  assert.equal(html.attrs['data-urd-theme'], 'dark', 'and sets the stored choice on the page');
});
