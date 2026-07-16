/**
 * Utkastlagring: localStorage-utkast med baseline-sammenligning.
 *
 * Prinsipp (validert i ApeironLF): «har upubliserte endringer» er sant
 * hvis og bare hvis utkastnøkkelen finnes i localStorage. save() sletter
 * derfor nøkkelen når utkastet er identisk med publisert tilstand, slik
 * at merket alltid er ærlig (f.eks. etter at brukeren angrer alt).
 */

/**
 * @param {string} key localStorage-nøkkel, f.eks. 'urd-draft-hjem'
 * @param {() => object} loadPublished Gir publisert tilstand (parset JSON)
 * @returns {{data: object, save(): void, reset(): object, hasDraft(): boolean}}
 */
export function createDraftStore(key, loadPublished) {
  const published = loadPublished();
  const baseline = JSON.stringify(published);

  let data = structuredClone(published);
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      localStorage.removeItem(key); // korrupt utkast: fall tilbake til publisert
    }
  }

  return {
    get data() {
      return data;
    },
    /** Persister utkastet; sletter nøkkelen hvis det er likt publisert. */
    save() {
      const now = JSON.stringify(data);
      if (now === baseline) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, now);
      }
    },
    /** Forkast utkastet og gå tilbake til publisert tilstand. */
    reset() {
      localStorage.removeItem(key);
      data = structuredClone(published);
      return data;
    },
    hasDraft() {
      return localStorage.getItem(key) !== null;
    },
  };
}
