/**
 * A colour as a CSS value for a swatch: a hex colour as it is, a theme token as its variable, and nothing as the accent.
 * @param {string|undefined} color
 * @returns {string}
 */
export const swatchCss = (color) => (!color ? 'var(--urd-color-accent)' : color.startsWith('#') ? color : `var(--urd-color-${color})`);
