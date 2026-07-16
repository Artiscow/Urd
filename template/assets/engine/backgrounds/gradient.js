/**
 * Bakgrunnslag: gradient. Statisk eller animert (langsom panorering,
 * definert i base.css som .urd-bg-animate).
 */
import { resolveColor } from '../theme.js';

export const gradientLayer = {
  version: 1,
  label: 'Gradient',
  defaults: () => ({ stops: ['#0b0e14', '#1a1030'], angle: 160, animate: false }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{stops: string[], angle: number, animate: boolean}} props
   */
  render(el, props) {
    const stops = props.stops.map(resolveColor).join(', ');
    el.style.background = `linear-gradient(${props.angle}deg, ${stops})`;
    if (props.animate) {
      el.style.backgroundSize = '200% 200%';
      el.classList.add('urd-bg-animate');
    }
  },
};
