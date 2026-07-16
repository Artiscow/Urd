/**
 * Bakgrunnslag: glød. Radiell lysflekk plassert relativt i seksjonen
 * (x/y i 0..1), for dybde og fokus.
 */
export const glowLayer = {
  version: 1,
  label: 'Glød',
  defaults: () => ({ x: 0.5, y: 0.3, color: '#7c5cff', radius: 0.5, opacity: 0.35 }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{x: number, y: number, color: string, radius: number, opacity: number}} props
   */
  render(el, props) {
    throw new Error('TODO v0.4: glow-laget er ikke implementert ennå');
  },
};
