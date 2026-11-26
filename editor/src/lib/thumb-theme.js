/**
 * The site's own colours for the pictures drawn with var(--urd-color-*) (preset-thumb.js), since the admin does not load content/theme.css.
 */
import { safeCssValue } from '$engine/theme.js';

/**
 * @param {{theme?: {tokens?: {color?: Record<string, string>}}}|null} siteDraft
 * @returns {string} A style of custom properties, empty where the site has none
 */
export function thumbThemeStyle(siteDraft) {
  const c = siteDraft?.theme?.tokens?.color ?? {};
  return ['bg', 'surface', 'text', 'accent']
    .filter((k) => typeof c[k] === 'string' && safeCssValue(c[k]))
    .map((k) => `--urd-color-${k}: ${c[k]};`)
    .join(' ');
}
