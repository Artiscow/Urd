/**
 * Eksempel-plugin: kalender. Viser plugin-kontrakten; blir referanse-
 * implementasjon i v0.6 (hendelser fra ekstern kilde, f.eks. iCal-URL).
 */

/** @param {typeof window.Urd} Urd */
export function register(Urd) {
  Urd.blocks.define('kalender', {
    version: 1,
    label: 'Kalender',
    defaults: () => ({ source: null, view: 'list', limit: 5 }),
    migrations: {},
    render(el, props, ctx) {
      throw new Error('TODO v0.6: kalender-blokken er ikke implementert ennå');
    },
  });
}
