/**
 * Kjerneblokk: form. Streker (horisontale, vertikale og skrå via framens
 * rot-felt), sirkler og rektangler. Dekorelementer for fri komposisjon.
 */
export const shapeBlock = {
  version: 1,
  label: 'Form',
  defaults: () => ({ kind: 'line', color: 'accent', thickness: 2, fill: null }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{kind: 'line'|'circle'|'rect', color: string, thickness: number, fill: string|null}} props
   * @param {object} ctx
   */
  render(el, props, ctx) {
    throw new Error('TODO v0.3: shape-blokken er ikke implementert ennå');
  },
};
