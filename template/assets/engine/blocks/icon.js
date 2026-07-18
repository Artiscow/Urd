/**
 * Kjerneblokk: ikon. En glyf/emoji i valgfri størrelse og temafarge -
 * til punktlister, kontaktrader og små dekorelementer. Emoji har egne
 * farger; temafargen gjelder tekst-glyfer (★ ✓ → osv.).
 */
import { resolveColor } from '../theme.js';

export const iconBlock = {
  version: 1,
  label: 'Ikon',
  defaults: () => ({ glyph: '★', color: 'accent', size: 48 }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{glyph: string, color: string, size: number, image?: string|null}} props
   */
  render(el, props) {
    // Eget opplastet ikon (additivt felt): bildet vises i tegnstørrelsen og vinner over glyfen til det fjernes.
    if (props.image) {
      const img = document.createElement('img');
      img.src = props.image;
      img.alt = '';
      img.draggable = false;
      img.style.cssText = `height:${props.size || 48}px;width:auto;display:block;`;
      el.appendChild(img);
      return;
    }
    const span = document.createElement('span');
    span.className = 'urd-icon';
    span.textContent = props.glyph || '★';
    span.style.fontSize = `${props.size || 48}px`;
    span.style.color = resolveColor(props.color);
    el.appendChild(span);
  },
};
