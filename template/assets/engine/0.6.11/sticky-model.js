/**
 * Ren tilstandslogikk for sticky blokker («fest ved scrolling»): gitt
 * scrollposisjon og dokumentmål avgjøres om blokken skal stå i sin
 * vanlige absolutte posisjon (static), festes ved vindustoppen (fixed)
 * eller parkeres ved slippgrensen (parked). DOM-arbeidet bor i
 * sticky.js; denne modulen er DOM-fri og kontraktstestes i
 * tests/sticky.test.mjs.
 *
 * Festing er posisjonering, ikke animasjon (ingen transitions), så
 * prefers-reduced-motion krever ingen særbehandling her.
 */

/**
 * @param {number} scrollY
 * @param {{
 *   sectionTop: number,   // seksjonens topp i dokument-px
 *   blockY: number,       // blokkens desktop-y (seksjonsrelativ px)
 *   blockH: number,       // blokkens høyde i px
 *   limitBottom: number,  // slippgrensen i dokument-px: bunnen av until-
 *                         // seksjonen, eller egen seksjons bunn uten until
 *   offset: number        // ønsket avstand fra vindustoppen
 * }} m
 * @returns {{ mode: 'static' } | { mode: 'fixed', top: number } | { mode: 'parked', y: number }}
 *   parked.y er seksjonsrelativ px (kan overstige seksjonshøyden når
 *   until peker på en senere seksjon; seksjoner klipper aldri).
 */
/**
 * Omsluttende boks for en gruppe festede blokker. Gruppen festes og slippes
 * som ÉN enhet, og hvert medlem beholder sin plass inne i boksen, i stedet
 * for at alle legger seg oppå hverandre ved vindustoppen.
 * @param {Array<{x: number, y: number, w: number, h: number}>} items
 * @returns {{x: number, y: number, w: number, h: number}}
 */
export function groupBox(items) {
  const x = Math.min(...items.map((i) => i.x));
  const y = Math.min(...items.map((i) => i.y));
  const right = Math.max(...items.map((i) => i.x + i.w));
  const bottom = Math.max(...items.map((i) => i.y + i.h));
  return { x, y, w: right - x, h: bottom - y };
}

/**
 * Skjermdokking («fest til skjermen»): boksen legges i ett av ni ankerpunkter
 * i vinduet og blir stående der uansett scrolling. Marginen gjelder kun de
 * kantene boksen dokkes til; senterakser sentreres og ignorerer den.
 * @param {string} dock 'top-left' … 'bottom-right' (vertikal-horisontal)
 * @param {number} margin avstand fra de dokkede kantene i px
 * @param {{w: number, h: number}} box boksens mål i px
 * @param {{w: number, h: number}} view vindusmålene i px
 * @returns {{left: number, top: number}} posisjon i px fra vinduets venstre/topp
 */
export function dockPosition(dock, margin, box, view) {
  const [vert, horz] = String(dock || 'bottom-right').split('-');
  const m = Number.isFinite(margin) ? margin : 0;
  // Er boksen større enn vinduet, vinner toppen/venstre kant: da er
  // sentrering meningsløs, og innholdet skal ikke skyves ut av skjermen.
  const center = (available) => Math.max(0, available / 2);
  let top;
  if (vert === 'top') top = m;
  else if (vert === 'bottom') top = Math.max(0, view.h - box.h - m);
  else top = center(view.h - box.h);
  let left;
  if (horz === 'left') left = m;
  else if (horz === 'right') left = Math.max(0, view.w - box.w - m);
  else left = center(view.w - box.w);
  return { left, top };
}

export function stickyState(scrollY, m) {
  // Ugyldig eller for tidlig grense (over blokkens naturlige plass):
  // festing gir ikke mening, blokken står alltid der den står.
  const parkY = m.limitBottom - m.sectionTop - m.blockH;
  if (parkY < m.blockY) return { mode: 'static' };

  // Blokken har ikke nådd festepunktet ennå.
  if (m.sectionTop + m.blockY - scrollY >= m.offset) return { mode: 'static' };

  // Festet, så lenge det er plass mellom vindustoppen og slippgrensen.
  if (m.offset + m.blockH <= m.limitBottom - scrollY) return { mode: 'fixed', top: m.offset };

  // Slippgrensen er passert: blokken legges igjen ved grensen.
  return { mode: 'parked', y: parkY };
}
