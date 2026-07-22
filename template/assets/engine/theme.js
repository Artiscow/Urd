/**
 * Mapper theme.tokens fra site.json til CSS-variabler på :root.
 * tokens.color.bg → --urd-color-bg, tokens.font.heading → --urd-font-heading, osv.
 *
 * Lys/mørk-bryteren (additivt fra v0.6): har temaet et `alt`-felt, finnes
 * siden i to moduser. `theme.scheme` sier hva HOVEDTEMAET er (light/dark,
 * standard light); alt-tokens overstyrer hovedtokens i motsatt modus.
 * Første besøk følger prefers-color-scheme; et aktivt valg med bryteren
 * (i nav-en) huskes i localStorage og vinner ved neste besøk.
 */

/** localStorage-nøkkel for besøkendes aktive valg ('light'/'dark'). */
const MODE_KEY = 'urd-theme-mode';

/** Gjeldende modus i denne økten (null før første applyTheme). */
let activeMode = null;

/**
 * Ren modusoppløsning: et lagret valg vinner, ellers OS-preferansen.
 * @param {string|undefined} scheme theme.scheme ('light'/'dark', standard light)
 * @param {string|null} stored Lagret valg ('light'/'dark') eller null
 * @param {boolean} prefersDark Besøkendes prefers-color-scheme
 * @returns {'light'|'dark'}
 */
export function resolveThemeMode(scheme, stored, prefersDark) {
  if (stored === 'light' || stored === 'dark') return stored;
  // Uten alt-tema finnes bare hovedmodusen; scheme brukes da kun som svar.
  return prefersDark ? 'dark' : 'light';
}

/**
 * Ren token-utvelgelse for en modus: hovedtokens, overstyrt gruppevis av
 * alt-tokens når modusen er motsatt av hovedtemaets scheme. Uten alt-tema
 * returneres hovedtokens uansett modus.
 * @param {{tokens: object, scheme?: string, alt?: {tokens: object}}} theme
 * @param {'light'|'dark'} mode
 * @returns {Record<string, Record<string, string>>}
 */
export function activeTokens(theme, mode) {
  const main = theme.tokens || {};
  const mainScheme = theme.scheme === 'dark' ? 'dark' : 'light';
  if (!theme.alt?.tokens || mode === mainScheme) return main;
  const merged = {};
  for (const group of new Set([...Object.keys(main), ...Object.keys(theme.alt.tokens)])) {
    merged[group] = { ...main[group], ...theme.alt.tokens[group] };
  }
  return merged;
}

function readStoredMode() {
  // localStorage kan være avslått (privat modus); da følges OS-preferansen.
  try { return localStorage.getItem(MODE_KEY); } catch { return null; }
}

function applyTokens(tokens, root) {
  for (const [group, values] of Object.entries(tokens)) {
    for (const [name, value] of Object.entries(values)) {
      root.style.setProperty(`--urd-${group}-${name}`, value);
    }
  }
}

/**
 * @param {{tokens: Record<string, Record<string, string>>}} theme `theme`-objektet fra site.json
 * @param {HTMLElement} [root] Element variablene settes på (standard: document.documentElement)
 */
export function applyTheme(theme, root = document.documentElement) {
  activeMode = resolveThemeMode(
    theme.scheme,
    readStoredMode(),
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  applyTokens(activeTokens(theme, activeMode), root);
}

/** Gjeldende modus ('light'/'dark'); satt av applyTheme ved boot. */
export function themeMode() {
  return activeMode ?? 'light';
}

/**
 * Bytter modus (nav-bryteren), husker valget og re-applikerer tokens.
 * @param {{tokens: object, scheme?: string, alt?: object}} theme
 * @returns {'light'|'dark'} Ny modus
 */
export function toggleThemeMode(theme) {
  activeMode = themeMode() === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem(MODE_KEY, activeMode); } catch { /* privat modus */ }
  applyTokens(activeTokens(theme, activeMode), document.documentElement);
  return activeMode;
}

/**
 * Løser en fargeverdi fra innhold til CSS. Enkle navn ('accent', 'bg')
 * tolkes som theme-tokens og blir var(--urd-color-<navn>); alt annet
 * ('#7c5cff', 'rgb(...)') brukes rått.
 * @param {string} value
 * @returns {string}
 */
export function resolveColor(value) {
  return /^[a-z][a-z0-9-]*$/.test(value) ? `var(--urd-color-${value})` : value;
}
