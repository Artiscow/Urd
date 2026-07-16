/**
 * Kjerneblokk: knapp. Lenker til en side i sideregisteret (page) eller
 * ekstern URL (href).
 */
export const buttonBlock = {
  version: 1,
  label: 'Knapp',
  defaults: () => ({ label: 'Les mer', page: null, href: null, style: 'primary' }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{label: string, page: string|null, href: string|null, style: string}} props
   * @param {object} ctx Render-kontekst; ctx.site brukes til page → path-oppslag
   */
  render(el, props, ctx) {
    throw new Error('TODO v0.2: button-blokken er ikke implementert ennå');
  },
};
