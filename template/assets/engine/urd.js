/**
 * Urd-motoren - inngangspunkt.
 *
 * Kjøres av template/index.html. Oppretter det globale Urd-objektet med
 * registrene, laster site.json + gjeldende sidefil, registrerer kjerne-
 * typene, kjører versjonsløfting (migrate.js) og rendrer siden (render.js).
 *
 * I preview-modus (?preview=1) lytter motoren i tillegg på postMessage-
 * utkast fra editoren og rerendrer inkrementelt.
 */
import { createRegistry } from './registry.js';
import { applyTheme } from './theme.js';

export const Urd = {
  blocks: createRegistry('blocks'),
  sections: createRegistry('sections'),
  backgrounds: createRegistry('backgrounds'),
  animations: createRegistry('animations'),
};

// Gjør registrene tilgjengelige for plugins (som lastes som ES-moduler
// og kaller register(Urd)) og for editorens preview-bro.
window.Urd = Urd;

/**
 * Starter motoren: last site.json, finn siden for gjeldende path i
 * sideregisteret, last sidefilen, registrer kjernetyper og plugins,
 * løft versjoner og render.
 *
 * @param {{root: HTMLElement}} opts
 */
export async function boot(opts) {
  const site = await (await fetch('/content/site.json')).json();
  applyTheme(site.theme);
  document.title = site.site.title;

  // TODO v0.2: rutefinning fra site.pages, lasting av sidefil,
  // registrering av kjerneblokker/bakgrunner, plugin-lasting fra
  // plugins/plugins.json, migrering og render.
  console.info('Urd-motor 0.1.0 - skjelett. Rendering kommer i v0.2.', { site, opts });
}
