/**
 * Kontraktstester for temaets rene lys/mørk-logikk (theme.js):
 * modusoppløsning og token-utvelgelse. DOM-appliseringen (applyTheme,
 * toggleThemeMode) og nav-bryteren testes manuelt.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveThemeMode, activeTokens,
  sectionThemeVars, SECTION_THEMES, relativeLuminance, contrastRatio,
  buildThemeCss, safeCssValue,
} from '../template/assets/engine/theme.js';

test('resolveThemeMode: lagret valg vinner over OS-preferansen', () => {
  assert.equal(resolveThemeMode('light', 'dark', false), 'dark');
  assert.equal(resolveThemeMode('dark', 'light', true), 'light');
});

test('resolveThemeMode: uten lagret valg følges OS-preferansen', () => {
  assert.equal(resolveThemeMode('light', null, true), 'dark');
  assert.equal(resolveThemeMode('light', null, false), 'light');
  assert.equal(resolveThemeMode(undefined, null, true), 'dark');
});

test('resolveThemeMode: ugyldig lagret verdi ignoreres', () => {
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

test('activeTokens: hovedmodusen gir hovedtokens urørt', () => {
  assert.deepEqual(activeTokens(THEME, 'dark'), THEME.tokens);
});

test('activeTokens: motsatt modus overstyrer gruppevis, resten arves', () => {
  const light = activeTokens(THEME, 'light');
  assert.equal(light.color.bg, '#ffffff');
  assert.equal(light.color.text, '#111111');
  // Fontgruppen finnes ikke i alt og arves fra hovedtemaet
  assert.equal(light.font.body, 'serif');
});

test('activeTokens: delvis alt-gruppe beholder hovedverdiene som ikke overstyres', () => {
  const theme = {
    tokens: { color: { bg: '#000000', accent: '#7c5cff' } },
    alt: { tokens: { color: { bg: '#ffffff' } } },
  };
  // scheme mangler = light er hovedmodus; dark bruker alt
  const dark = activeTokens(theme, 'dark');
  assert.equal(dark.color.bg, '#ffffff');
  assert.equal(dark.color.accent, '#7c5cff');
});

test('activeTokens: uten alt-tema returneres hovedtokens uansett modus', () => {
  const theme = { tokens: { color: { bg: '#123456' } } };
  assert.deepEqual(activeTokens(theme, 'dark'), theme.tokens);
  assert.deepEqual(activeTokens(theme, 'light'), theme.tokens);
});

test('sectionThemeVars: kjente roller gir overstyringer, Standard/ukjent gir {}', () => {
  assert.deepEqual(sectionThemeVars('standard'), {});
  assert.deepEqual(sectionThemeVars(undefined), {});
  assert.deepEqual(sectionThemeVars('finnes-ikke'), {});
  assert.deepEqual(sectionThemeVars('flate'), SECTION_THEMES.flate);
  assert.equal(sectionThemeVars('aksent')['--urd-color-bg'], 'var(--urd-base-accent)');
  // Invers bytter bg<->text via BASIS-kopier (ikke levende tokens = ingen sykel).
  assert.equal(sectionThemeVars('invers')['--urd-color-bg'], 'var(--urd-base-text)');
  assert.equal(sectionThemeVars('invers')['--urd-color-text'], 'var(--urd-base-bg)');
  for (const vars of Object.values(SECTION_THEMES)) {
    for (const v of Object.values(vars)) {
      assert.ok(!/var\(--urd-color-/.test(v), `rolle skal ikke referere levende --urd-color-* (${v})`);
    }
  }
});

test('relativeLuminance: hvit=1, svart=0, ugyldig=null', () => {
  assert.equal(Math.round(relativeLuminance('#ffffff')), 1);
  assert.equal(relativeLuminance('#000000'), 0);
  assert.equal(relativeLuminance('#fff'), relativeLuminance('#ffffff')); // kortform
  assert.equal(relativeLuminance('accent'), null); // token-navn kan ikke måles
  assert.equal(relativeLuminance('color-mix(in srgb, red, blue)'), null);
});

test('contrastRatio: svart/hvit=21, likt=1, umålbart=null', () => {
  assert.ok(Math.abs(contrastRatio('#000000', '#ffffff') - 21) < 0.01);
  assert.equal(contrastRatio('#123456', '#123456'), 1);
  assert.equal(contrastRatio('#ffffff', 'accent'), null);
  // Hvit tekst på brønn-turkis er under WCAG 4,5 (kontrast-varselets poeng).
  assert.ok(contrastRatio('#15b39a', '#ffffff') < 4.5);
});

test('safeCssValue: godtar farger/lengder/fontstacker, avviser injeksjon', () => {
  assert.ok(safeCssValue('#f6faf8'));
  assert.ok(safeCssValue("'Courier New', monospace"));
  assert.ok(safeCssValue('clamp(3rem, 8vw, 6rem)'));
  assert.ok(safeCssValue('color-mix(in srgb, red, blue)'));
  assert.ok(safeCssValue('oklch(0.7 0.1 200)'));
  // Utbryting av deklarasjonen / farlige konstruksjoner droppes.
  assert.ok(!safeCssValue('red; } body { display: none }'));
  assert.ok(!safeCssValue('url(evil.png)'));
  assert.ok(!safeCssValue('a /* komment */ b'));
  assert.ok(!safeCssValue('expression(alert(1))'));
  assert.ok(!safeCssValue(123)); // ikke en streng
});

test('buildThemeCss: med alt blir fargene light-dark(lys, mørk) i riktig retning', () => {
  // THEME har scheme dark: lys = alt-verdiene, mørk = hovedverdiene.
  const css = buildThemeCss(THEME);
  assert.match(css, /@supports \(color: light-dark\(#000, #fff\)\)/);
  assert.match(css, /color-scheme: light dark;/);
  // bg: light = #ffffff (alt), dark = #0b0e14 (hoved)
  assert.match(css, /--urd-color-bg: light-dark\(#ffffff, #0b0e14\);/);
  assert.match(css, /--urd-base-bg: light-dark\(#ffffff, #0b0e14\);/);
  assert.match(css, /--urd-color-text: light-dark\(#111111, #eeeeee\);/);
  // Manuelt valg styrer color-scheme (og dermed hvilken side light-dark() velger).
  assert.match(css, /:root\[data-urd-theme="light"\] \{ color-scheme: light; \}/);
  assert.match(css, /:root\[data-urd-theme="dark"\] \{ color-scheme: dark; \}/);
  // Font er lik i begge moduser: enkeltverdi, ingen light-dark().
  assert.match(css, /--urd-font-body: serif;/);
  assert.ok(!/--urd-font-body: light-dark/.test(css));
});

test('buildThemeCss: fallback-enkeltverdiene står i :root FØR @supports-blokken', () => {
  const css = buildThemeCss(THEME);
  const rootAt = css.indexOf(':root {');
  const supportsAt = css.indexOf('@supports');
  assert.ok(rootAt >= 0 && supportsAt > rootAt);
  // Fallback bruker hovedtemaet (scheme dark) som enkeltverdi.
  assert.ok(css.slice(0, supportsAt).includes('--urd-color-bg: #0b0e14;'));
});

test('buildThemeCss: uten alt-tema gir enkeltverdier og låst color-scheme, ingen light-dark()', () => {
  const light = buildThemeCss({ tokens: { color: { bg: '#123456' } } });
  assert.match(light, /color-scheme: light;/);
  assert.match(light, /--urd-color-bg: #123456;/);
  assert.match(light, /--urd-base-bg: #123456;/);
  assert.ok(!light.includes('light-dark('));
  assert.ok(!light.includes('@supports'));
  // scheme dark låser color-scheme til dark.
  const dark = buildThemeCss({ scheme: 'dark', tokens: { color: { bg: '#111111' } } });
  assert.match(dark, /color-scheme: dark;/);
  assert.ok(!dark.includes('light-dark('));
});

test('buildThemeCss: farge som er lik i begge moduser blir enkeltverdi', () => {
  // accent-text er #04241d i både hoved og alt (jf. content/site.json).
  const css = buildThemeCss({
    scheme: 'light',
    tokens: { color: { bg: '#f6faf8', 'accent-text': '#04241d' } },
    alt: { tokens: { color: { bg: '#000000', 'accent-text': '#04241d' } } },
  });
  assert.match(css, /--urd-color-bg: light-dark\(#f6faf8, #000000\);/);
  // Lik verdi: kun enkeltverdi, aldri light-dark(x, x).
  assert.ok(!/accent-text: light-dark/.test(css));
  assert.match(css, /--urd-color-accent-text: #04241d;/);
});

test('buildThemeCss: injiserte verdier droppes, gyldig color-mix()/oklch() beholdes', () => {
  const css = buildThemeCss({
    tokens: { color: { bg: 'red;} body{display:none', accent: '#123456', text: 'oklch(0.2 0.1 200)' } },
    alt: { tokens: { color: { bg: '#000000', accent: '#654321', text: 'oklch(0.9 0.05 200)' } } },
  });
  // Injeksjonsverdien når aldri CSS-en (verken fallback eller light-dark()).
  assert.ok(!css.includes('display:none'));
  assert.ok(!css.includes('body{'));
  // Gyldige verdier beholdes.
  assert.match(css, /--urd-color-accent: light-dark\(#123456, #654321\);/);
  assert.match(css, /--urd-color-text: light-dark\(oklch\(0\.2 0\.1 200\), oklch\(0\.9 0\.05 200\)\);/);
});
