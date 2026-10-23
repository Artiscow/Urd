/**
 * Search in every language (0.7.10.5), the editor's side of the engine's search-langs.js.
 * The dictionaries load on the first search typed; `ready` turns true when they are in, so a search that reads it runs again with the other languages.
 */
import { loadSearchLanguages, searchLanguagesReady } from '$engine/search-langs.js';

let ready = $state(searchLanguagesReady());

export const searchLangs = {
  /** Whether the other languages are loaded; read it in a search so the search runs again once they are. */
  get ready() { return ready; },
  /** Starts the load when a query is typed; it is loaded once per page. */
  need(query) {
    if (ready || !String(query ?? '').trim()) return;
    loadSearchLanguages().then(() => { ready = true; });
  },
};
