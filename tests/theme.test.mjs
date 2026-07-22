/**
 * Kontraktstester for temaets rene lys/mørk-logikk (theme.js):
 * modusoppløsning og token-utvelgelse. DOM-appliseringen (applyTheme,
 * toggleThemeMode) og nav-bryteren testes manuelt.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveThemeMode, activeTokens } from '../template/assets/engine/theme.js';

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
