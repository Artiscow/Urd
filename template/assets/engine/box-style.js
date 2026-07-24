/**
 * Kortstiler: skygge, kantlinje og glass-effekt for boks-flater
 * (tekstboksen og FAQ-kortene). Ren funksjon som bygger style-egenskaper;
 * DOM-renderne bruker Object.assign(el.style, boxStyleCss(props.boxStyle)).
 *
 * Alle felt er additive med standardverdier som gir dagens utseende
 * (basisstilen i .urd-text-box), så eldre data rendres uendret.
 */
import { resolveColor } from './theme.js';

const SHADOWS = {
  soft: '0 6px 20px rgb(0 0 0 / 14%)',
  strong: '0 14px 40px rgb(0 0 0 / 30%)',
};

/**
 * @param {{shadow?: string, border?: 'none'|{color?: string, width?: number}, glass?: boolean}|undefined} style
 * @returns {Record<string, string>} Style-egenskaper (camelCase) å legge PÅ basisstilen.
 *   Tomt objekt = ren basisstil. border: undefined = temaets tynne kantlinje (CSS-en).
 */
export function boxStyleCss(style) {
  const s = style ?? {};
  const css = {};
  if (SHADOWS[s.shadow]) css.boxShadow = SHADOWS[s.shadow];
  if (s.border === 'none') {
    css.border = 'none';
  } else if (s.border && typeof s.border === 'object') {
    css.border = `${s.border.width ?? 1}px solid ${resolveColor(s.border.color ?? 'accent')}`;
  }
  if (s.glass) {
    // Frostet glass: gjennomskinnelig flatefarge + uskarp bakgrunn.
    // Uten backdrop-filter-støtte står den gjennomskinnelige flaten igjen,
    // som fortsatt er lesbar (gradvis degradering).
    css.background = 'color-mix(in srgb, var(--urd-color-surface) 55%, transparent)';
    css.backdropFilter = 'blur(12px) saturate(1.4)';
    css.webkitBackdropFilter = css.backdropFilter;
  }
  return css;
}
