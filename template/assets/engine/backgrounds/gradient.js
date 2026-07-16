/**
 * Bakgrunnslag: gradient. Statisk eller animert (langsom vinkel/possisjons-
 * drift). Rendres som eget lag i seksjonens bakgrunnsstabel.
 */
export const gradientLayer = {
  version: 1,
  label: 'Gradient',
  defaults: () => ({ stops: ['#0b0e14', '#1a1030'], angle: 160, animate: false }),
  migrations: {},
  /**
   * @param {HTMLElement} el Lag-elementet (fyller seksjonen, posisjonert av render.js)
   * @param {{stops: string[], angle: number, animate: boolean}} props
   */
  render(el, props) {
    throw new Error('TODO v0.2: gradient-laget er ikke implementert ennå');
  },
};
