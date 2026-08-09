/**
 * Bakgrunnslag: glød. Radiell lysflekk plassert relativt i seksjonen
 * (x/y i 0..1), for dybde og fokus.
 */
import { resolveColor } from '../theme.js';

export const glowLayer = {
  version: 1,
  label: 'Glød',
  labelKey: 'bgLayer.glow',
  defaults: () => ({ x: 0.5, y: 0.3, color: 'accent', radius: 0.5, opacity: 0.35 }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{x: number, y: number, color: string, radius: number, opacity: number}} props
   */
  render(el, props) {
    const color = resolveColor(props.color);
    // Gamle lag kan mangle feltene (lift fyller ikke inn defaults): fall tilbake til
    // standardverdiene. Uten dette blir plassering og radius NaN%, og CSS forkaster
    // hele gradienten, altså et usynlig lag i stedet for et med standardutseende.
    const x = props.x ?? 0.5;
    const y = props.y ?? 0.3;
    const radius = props.radius ?? 0.5;
    el.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${color} 0%, transparent ${radius * 100}%)`;
    el.style.opacity = String(props.opacity ?? 0.35);
  },
};
