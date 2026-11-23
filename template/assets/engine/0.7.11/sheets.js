/**
 * The engine's sheets added on demand: each loaded once, and placed among the sheets of its own kind in their order.
 * Notes: docs/engine-notes/sheets.md (Urd repository).
 */

/** The stylesheets added on demand, by address. */
const sheets = new Map();

/**
 * Adds a stylesheet to the document once, where `place` puts it (else at the end of the head); resolves when it has loaded or failed, to whether it loaded.
 * @param {string} href
 * @param {(link: HTMLLinkElement) => void} [place]
 * @returns {Promise<boolean>}
 */
export function loadStylesheet(href, place = (link) => document.head.appendChild(link)) {
  if (!sheets.has(href)) {
    sheets.set(href, new Promise((resolve) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.addEventListener('load', () => resolve(true), { once: true });
      link.addEventListener('error', () => resolve(false), { once: true });
      place(link);
    }));
  }
  return sheets.get(href);
}

/**
 * A `place` for loadStylesheet keeping a group's sheets in one order, whatever order they come in: by `rank`, the first after `after()`, else at the head's end.
 * @param {string} group
 * @param {number} rank
 * @param {() => Element|null} [after]
 * @returns {(link: HTMLLinkElement) => void}
 */
export function placeInOrder(group, rank, after = () => null) {
  return (link) => {
    link.dataset.urdSheetGroup = group;
    link.dataset.urdSheetRank = String(rank);
    const placed = [...document.head.querySelectorAll('link[data-urd-sheet-group]')].filter((other) => other.dataset.urdSheetGroup === group);
    const later = placed.find((other) => Number(other.dataset.urdSheetRank) > rank);
    const anchor = after();
    if (later) later.before(link);
    else if (placed.length) placed.at(-1).after(link);
    else if (anchor) anchor.after(link);
    else document.head.appendChild(link);
  };
}

/** The base sheet's link, which the engine's own sheets follow. */
export const baseSheet = () => document.head.querySelector('link[rel="stylesheet"][href*="/assets/styles/base.css"]');

/** The last feature sheet, else the base sheet: the block sheets follow it, so the features' rules stand before theirs as in base.css. */
export const afterFeatures = () => [...document.head.querySelectorAll('link[data-urd-sheet-group="features"]')].at(-1) ?? baseSheet();
