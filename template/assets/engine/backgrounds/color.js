/**
 * Bakgrunnslag: ensfarget. Verdien kan være en theme-token ('surface')
 * eller en rå farge ('#151a23').
 */
import { resolveColor } from '../theme.js';

export const colorLayer = {
  version: 1,
  label: 'Farge',
  defaults: () => ({ value: 'bg' }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{value: string}} props
   */
  render(el, props) {
    el.style.background = resolveColor(props.value);
  },
};
