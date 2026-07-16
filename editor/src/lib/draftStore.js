/**
 * Utkastlagring: localStorage-utkast med baseline-sammenligning.
 *
 * Mønster (validert i ApeironLF):
 *  - Utkast skrives fortløpende til localStorage under en nøkkel per panel.
 *  - En baseline (publisert tilstand) snapshottes ved lasting; blir utkastet
 *    likt baseline igjen (f.eks. etter angre), SLETTES utkastnøkkelen, slik
 *    at «upubliserte endringer»-merket alltid er ærlig.
 *  - «Har endringer» == utkastnøkkelen finnes.
 *  - Ved vellykket publisering slettes utkastnøklene og baseline oppdateres.
 */

/**
 * @param {string} key localStorage-nøkkel, f.eks. 'urd-draft-page-hjem'
 * @param {() => object} loadPublished Leser publisert tilstand (fra content/-JSON)
 * @returns {{data: object, save(): void, reset(): void, hasDraft(): boolean}}
 */
export function createDraftStore(key, loadPublished) {
  throw new Error('TODO v0.2: createDraftStore er ikke implementert ennå');
}
