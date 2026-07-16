/**
 * Bygger navigasjonen fra site.json - sideregisteret (site.pages) og
 * nav-dataene (site.nav). Ingenting hardkodes: nav-elementer med `page`
 * slår opp path i sideregisteret; elementer med `href` er eksterne lenker.
 */

/**
 * @param {object} site site.json, allerede parset
 * @param {HTMLElement} host Element navigasjonen bygges inn i
 */
export function renderNav(site, host) {
  throw new Error('TODO v0.2: renderNav er ikke implementert ennå');
}
