/**
 * Skala for redigerings-lerretet: iframen rendrer siden i en MÅL-VIEWPORT og
 * skaleres ned for å passe `.frame-wrap`, i stedet for å reflowe inn i
 * restplassen. Da er render-en identisk med den publiserte siden; kun
 * visningsstørrelsen (zoom) endres. Rene funksjoner, node-testet.
 *
 * To visningsmodi (ADR-0018):
 *
 * - **Enhet** (standard): mål-viewporten har BÅDE bredde og høyde, og
 *   skalaen tilpasses begge akser. Da stemmer folden: en `85vh`-seksjon
 *   slutter der en besøkende ser den slutte. Prisen er en bar på den aksen
 *   som har overskudd (Squarespace- og DevTools-modellen).
 * - **Fyll**: kun bredden er pinnet, og iframen gjøres tilsvarende høyere,
 *   så lerretet fyller panelet uten barer. Dette var eneste modus til v0.7
 *   (0.6.6.5.9), og beholdes fordi det gir mest arbeidsflate; men `vh`
 *   løses da mot panelets sideforhold, så folden er ikke til å stole på.
 *
 * Fyll er `targetH = 0`, altså «ingen høydebegrensning».
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
 * overflyte og panoreres). «fit» tilpasser til målet, men skalerer ALDRI opp
 * over 1:1. Gulv på 0.1 hindrer scale(0) på et umålt/uendelig smalt vindu.
 *
 * Høydeargumentene er valgfrie: uten dem (eller med `targetH: 0`) er skalaen
 * rent bredde-drevet, som er fyll-modus. Med dem tilpasses begge akser, som
 * er enhetsmodus.
 *
 * @param {number} frameW Rammeboksens bredde (px)
 * @param {number} targetW Målviewportens bredde (px)
 * @param {'fit'|'full'} mode
 * @param {number} [frameH] Rammeboksens høyde (px)
 * @param {number} [targetH] Målviewportens høyde (px); 0 = ingen høydegrense
 * @returns {number}
 */
export function previewScale(frameW, targetW, mode, frameH = 0, targetH = 0) {
  if (mode === 'full') return 1;
  const byHeight = targetH > 0 ? fitScale(frameH, targetH) : Infinity;
  return Math.max(0.1, Math.min(1, fitScale(frameW, targetW), byHeight));
}
