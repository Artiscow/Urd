/**
 * Contract tests for the theme's pure light/dark logic (theme.js):
 * mode resolution and token selection. The DOM application (applyTheme,
 * toggleThemeMode) and the nav switch are tested manually.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const {
  resolveThemeMode, activeTokens,
  sectionThemeVars, SECTION_THEMES, relativeLuminance, contrastRatio,
  buildThemeCss, safeCssValue,
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
