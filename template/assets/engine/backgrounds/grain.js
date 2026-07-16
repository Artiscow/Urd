/**
 * Bakgrunnslag: korn. Subtil støytekstur over de andre lagene.
 */
export const grainLayer = {
  version: 1,
  label: 'Korn',
  defaults: () => ({ opacity: 0.06 }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{opacity: number}} props
   */
  render(el, props) {
    throw new Error('TODO v0.4: grain-laget er ikke implementert ennå');
  },
};
