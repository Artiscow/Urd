/**
 * Kjerneblokk: bilde. Refererer filer i media/ (aldri innbakt base64).
 */
export const imageBlock = {
  version: 1,
  label: 'Bilde',
  defaults: () => ({ src: '', alt: '', fit: 'cover', radius: 'md' }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{src: string, alt: string, fit: string, radius: string}} props
   * @param {object} ctx
   */
  render(el, props, ctx) {
    throw new Error('TODO v0.3: image-blokken er ikke implementert ennå');
  },
};
