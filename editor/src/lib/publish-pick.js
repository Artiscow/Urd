/**
 * Which parts a publish sends (ADR-0032 decision 2): the ticked ones, with the parts they cannot go without.
 * A page not live yet goes with the site settings, which hold its entry; a collection not live yet with the collections' list, which holds its id; the site settings and the redirects go together, since an address change, a hidden or deleted page and a new front page write both in one step; the media tidy's moves waiting take everything with them.
 * A page whose entry went out hidden before its file (lib/not-live.js) takes the site settings with it inside the publish itself, to show the entry, even where they wait with nothing else and no row of theirs is ticked; the redirects stay, since showing an entry changes no address.
 * Where the site settings go out while a page not live yet stays behind, that page's entry goes out hidden, so the menu, the sitemap and the page's address leave it out; where the collections' list goes out while a new collection stays behind, the list goes out without it.
 * Pure, node-tested (tests/publish-pick.test.mjs).
 */
import { partOfName } from './saved-model.js';

/**
 * The parts a publish sends, and why a part left unticked goes anyway.
 * @param {{waiting: Iterable<string>, later: Iterable<string>, notLive?: {pages?: Iterable<string>, collections?: Iterable<string>}, movesPending?: boolean}} state
 *   `waiting`: the parts waiting to be published, by name (lib/saved-model.js partName); `later`: the parts unticked; `notLive`: the ids of the pages and collections whose own file is not live yet
 * @returns {{going: Set<string>, forced: Map<string, string>, kept: string[]}}
 *   `forced`: each part unticked that goes anyway, with the part it goes with (`moves` for the media tidy's moves); `kept`: the parts that stay
 */
export function pickParts({ waiting, later, notLive = {}, movesPending = false }) {
  const all = [...waiting];
  const unticked = new Set(later);
  const forced = new Map();
  if (movesPending) {
    for (const name of all) if (unticked.has(name)) forced.set(name, 'moves');
    return { going: new Set(all), forced, kept: [] };
  }
  const pages = new Set(notLive.pages ?? []);
  const collections = new Set(notLive.collections ?? []);
  const going = new Set(all.filter((name) => !unticked.has(name)));
  const tick = (name, by) => {
    if (!all.includes(name) || going.has(name)) return;
    going.add(name);
    forced.set(name, by);
  };
  // A tie can tick a part that ties another (a new page ticks the site settings, which tick the redirects), so the ties are followed until nothing more is ticked.
  for (let size = -1; size !== going.size;) {
    size = going.size;
    for (const name of [...going]) {
      const of = partOfName(name);
      if (of.kind === 'page' && pages.has(of.id)) tick('site', name);
      if (of.kind === 'collection' && collections.has(of.id)) tick('collections', name);
      if (name === 'site') tick('redirects', name);
      if (name === 'redirects') tick('site', name);
    }
  }
  return { going, forced, kept: all.filter((name) => !going.has(name)) };
}

/**
 * The site settings as a publish sends them: the draft, with each page not live yet that stays behind marked hidden; the draft given is left as it is.
 * @param {{pages?: Array<{id: string, hidden?: boolean}>}} siteDraft
 * @param {Iterable<string>} keptNotLive The ids of the pages not live yet that stay behind
 */
export function outSite(siteDraft, keptNotLive) {
  const kept = new Set(keptNotLive);
  if (!kept.size) return siteDraft;
  return { ...siteDraft, pages: (siteDraft.pages ?? []).map((entry) => (kept.has(entry.id) ? { ...entry, hidden: true } : entry)) };
}

/**
 * The pages and collections not live yet that a publish leaves behind, from the parts it sends.
 * @param {Set<string>} going
 * @param {{pages?: Iterable<string>, collections?: Iterable<string>}} notLive
 */
export function keptNotLive(going, notLive = {}) {
  return {
    pages: [...(notLive.pages ?? [])].filter((id) => !going.has(`page-${id}`)),
    collections: [...(notLive.collections ?? [])].filter((id) => !going.has(`collection-${id}`)),
  };
}
