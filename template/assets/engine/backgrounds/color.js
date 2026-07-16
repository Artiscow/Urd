/**
 * Bakgrunnslag: ensfarget. Det enkleste laget; verdien kan være en
 * theme-token-referanse eller en rå farge.
 */
export const colorLayer = {
  version: 1,
  label: 'Farge',
  defaults: () => ({ value: '#0b0e14' }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{value: string}} props
   */
  render(el, props) {
    throw new Error('TODO v0.2: color-laget er ikke implementert ennå');
  },
};
