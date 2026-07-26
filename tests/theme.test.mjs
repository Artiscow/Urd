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
