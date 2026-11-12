/**
 * The site's own colours for the pictures drawn with var(--urd-color-*) (preset-thumb.js): the template grids and the Drafts window's Saved tab show the site's palette, not the admin's, since the admin never loads content/theme.css. Invalid values are dropped.
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
