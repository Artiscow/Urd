/**
 * Bakgrunnslag: gradient. Statisk eller animert (langsom panorering,
 * definert i base.css som .urd-bg-animate).
 */
import { resolveColor } from '../theme.js';

export const gradientLayer = {
  version: 1,
  label: 'Gradient',
  defaults: () => ({ stops: ['#0b0e14', '#1a1030'], angle: 160, animate: false, opacity: 1 }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{stops: string[], angle: number, animate: boolean, opacity?: number}} props opacity er additiv
   */
  render(el, props) {
    const stops = props.stops.map(resolveColor).join(', ');
    el.style.background = `linear-gradient(${props.angle}deg, ${stops})`;
    el.style.opacity = String(props.opacity ?? 1);
    if (props.animate) {
      el.style.backgroundSize = '200% 200%';
      el.classList.add('urd-bg-animate');
    }
  },
};
