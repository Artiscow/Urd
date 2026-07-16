/**
 * Kjerneblokk: form. Streker (horisontale, vertikale og skrå via framens
 * rot-felt), sirkler og rektangler. Dekorelementer for fri komposisjon.
 */
import { resolveColor } from '../theme.js';

export const shapeBlock = {
  version: 1,
  label: 'Form',
  defaults: () => ({ kind: 'line', color: 'accent', thickness: 2, fill: null }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{kind: 'line'|'circle'|'rect', color: string, thickness: number, fill: string|null}} props
   * @param {object} ctx
   */
  render(el, props, ctx) {
    const color = resolveColor(props.color);
    if (props.kind === 'line') {
      // Horisontal strek sentrert i framen; retning styres med rot.
      const line = document.createElement('div');
      line.style.cssText = `position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);height:${props.thickness}px;background:${color};`;
      el.appendChild(line);
      return;
    }
    if (props.fill) {
      el.style.background = resolveColor(props.fill);
    } else {
      el.style.border = `${props.thickness}px solid ${color}`;
    }
    if (props.kind === 'circle') el.style.borderRadius = '50%';
  },
};
