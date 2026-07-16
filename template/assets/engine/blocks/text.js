/**
 * Kjerneblokk: tekst. Redigerbar rik tekst (begrenset HTML) med justering.
 * Kontraktform, se docs/SKJEMA.md (migreringskontrakten).
 */
export const textBlock = {
  version: 1,
  label: 'Tekst',
  defaults: () => ({ html: '<p>Ny tekst</p>', align: 'left' }),
  migrations: {},
  /**
   * @param {HTMLElement} el Blokk-elementet (posisjonert av render.js)
   * @param {{html: string, align: string}} props
   * @param {object} ctx Render-kontekst (tema, preview-modus, …)
   */
  render(el, props, ctx) {
    throw new Error('TODO v0.2: text-blokken er ikke implementert ennå');
  },
};
