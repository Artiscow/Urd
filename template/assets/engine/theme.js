/**
 * Mapper theme.tokens fra site.json til CSS-variabler på :root.
 * tokens.color.bg → --urd-color-bg, tokens.font.heading → --urd-font-heading, osv.
 */

/**
 * @param {{tokens: Record<string, Record<string, string>>}} theme `theme`-objektet fra site.json
 * @param {HTMLElement} [root] Element variablene settes på (standard: document.documentElement)
 */
export function applyTheme(theme, root = document.documentElement) {
  for (const [group, values] of Object.entries(theme.tokens || {})) {
    for (const [name, value] of Object.entries(values)) {
      root.style.setProperty(`--urd-${group}-${name}`, value);
    }
  }
}
