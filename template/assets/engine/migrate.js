/**
 * Stegvis versjonsløfting - Urds kjerne-invariant (se docs/adr/0005).
 *
 * All data (blokker, bakgrunnslag, animasjoner, seksjoner) bærer `version`,
 * og hver typedefinisjon oppgir `version` + `migrations` der migrations[n]
 * løfter nøyaktig v(n) → v(n+1) som en ren funksjon (props inn, props ut).
 *
 * Løfting skjer i minnet ved lasting - filene på disk skrives først ved
 * neste publisering. Ved ukjent type eller manglende migrering droppes
 * ALDRI data: innslaget markeres som plassholder og originalen beholdes.
 */

/**
 * Løfter ett datainnslag til definisjonens nåværende versjon.
 *
 * @param {{type?: string, version: number, props: object}} data
 *   Innslag fra innholdsfil (muteres ikke).
 * @param {{version: number, migrations?: Record<number, (props: object) => object>}|undefined} def
 *   Typedefinisjon fra registeret, eller undefined om typen er ukjent.
 * @returns {{ok: boolean, version: number, props: object, placeholder?: string}}
 *   ok=true med løftede props, eller ok=false med `placeholder`-årsak og
 *   originale props urørt ('unknown-type' | 'missing-migration' | 'newer-than-engine').
 */
export function lift(data, def) {
  if (!def) {
    return { ok: false, version: data.version, props: data.props, placeholder: 'unknown-type' };
  }
  if (data.version > def.version) {
    // Innholdet er skrevet av en nyere motor - rendres som plassholder,
    // aldri feiltolket eller nedgradert.
    return { ok: false, version: data.version, props: data.props, placeholder: 'newer-than-engine' };
  }

  let version = data.version;
  let props = data.props;
  while (version < def.version) {
    const step = def.migrations && def.migrations[version];
    if (typeof step !== 'function') {
      return { ok: false, version: data.version, props: data.props, placeholder: 'missing-migration' };
    }
    props = step(structuredClone(props));
    version++;
  }
  return { ok: true, version, props };
}
