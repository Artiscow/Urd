/**
 * Skala for redigerings-lerretet: iframen rendrer siden i full MÅL-BREDDE
 * (samme bredde som en besøkende med fullt vindu) og skaleres ned for å passe
 * `.frame-wrap` sin bredde, i stedet for å reflowe inn i restplassen. Da er
 * render-en identisk med den publiserte siden; kun visningsstørrelsen (zoom)
 * endres. Skalaen er BREDDE-drevet (ikke min av begge akser), så lerretet
 * fyller høyden ved at iframen gjøres tilsvarende høyere - ingen topp/bunn-barer;
 * siden scroller inni iframen som en ekte side. Rene funksjoner, node-testet.
 */

/**
 * Rå bredde-forhold: hvor mye målbredden må skaleres for å passe rammebredden.
 * Ugyldige/umålte mål gir 1 (ingen skalering før noe er målt).
 * @param {number} frameW Rammeboksens bredde (px)
 * @param {number} targetW Målviewportens bredde (px)
 * @returns {number}
 */
export function fitScale(frameW, targetW) {
  if (!(frameW > 0) || !(targetW > 0)) return 1;
  return frameW / targetW;
}

/**
 * Den anvendte skalaen ut fra zoom-modus. «full» = ekte 1:1 (lerretet kan
 * overflyte og panoreres). «fit» tilpasser til bredden, men skalerer ALDRI opp
 * over 1:1. Gulv på 0.1 hindrer scale(0) på et umålt/uendelig smalt vindu.
 * @param {number} frameW
 * @param {number} targetW
 * @param {'fit'|'full'} mode
 * @returns {number}
 */
export function previewScale(frameW, targetW, mode) {
  const s = mode === 'full' ? 1 : Math.min(1, fitScale(frameW, targetW));
  return Math.max(0.1, s);
}
