/**
 * Render-løkka: side → seksjoner → bakgrunnslag + blokker.
 *
 * Flyt (implementeres i v0.2):
 *  1. For hver seksjon: opprett container med size/grid, render
 *     bakgrunnslagene i rekkefølge, deretter blokkene.
 *  2. Hver blokk løftes via migrate.lift() mot sitt register før render;
 *     plassholder-resultater rendres som nøytral boks med typenavn.
 *  3. Frames oversettes fra grid-enheter til CSS (se frameToCss).
 *  4. Inkrementelt: renderSection() kan kalles for én seksjon alene -
 *     det er dette editorens preview bruker ved utkast-endringer.
 *  5. Mobil: frames.mobile === null → auto-avledet stabling i én kolonne,
 *     sortert på desktop-y, deretter x. Tilsyn-flagget ignoreres helt her.
 */

/**
 * Render en hel side inn i root.
 * @param {object} page Sidefil (content/pages/*.json), allerede parset
 * @param {object} site site.json (for grid-standard og tema)
 * @param {HTMLElement} root
 * @param {{preview?: boolean}} [opts]
 */
export function renderPage(page, site, root, opts = {}) {
  throw new Error('TODO v0.2: renderPage er ikke implementert ennå');
}

/**
 * Render (eller rerender) én seksjon - grunnlaget for inkrementell preview.
 * @param {object} section Seksjonsdata
 * @param {object} site site.json
 * @param {HTMLElement} host Eksisterende seksjons-element eller ny container
 */
export function renderSection(section, site, host) {
  throw new Error('TODO v0.2: renderSection er ikke implementert ennå');
}

/**
 * Oversetter en frame i grid-enheter til CSS-posisjonering.
 * @param {{x: number, y: number, w: number, h: number, z?: number, rot?: number}} frame
 * @param {{columns: number, rowHeight: number, gap?: number}} grid Effektivt grid (seksjonens eller nettstedets)
 * @returns {object} CSS-egenskaper (left/top i %, width i %, height i px, zIndex, transform)
 */
export function frameToCss(frame, grid) {
  throw new Error('TODO v0.2: frameToCss er ikke implementert ennå');
}
