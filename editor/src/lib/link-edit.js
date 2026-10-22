/**
 * Link editing shared by the panels and the block menus: the link shape is in SCHEMA.md under Links and anchors.
 */

/** The parts of a link that belong to what it points at: a spot on its page, a new tab and the rel words. */
const LINK_EXTRAS = ['target', 'newTab', 'rel'];

/**
 * Removes the parts of a link that belong to what it pointed at, in place.
 * @param {object} link
 */
export function clearLinkExtras(link) {
  for (const key of LINK_EXTRAS) delete link[key];
}

/**
 * Points a link at a page (its id), a typed address ('__href') or nothing ('__none'), in place.
 * The spot, the new tab and the rel words belonged to what it pointed at before, so they go with it.
 * @param {object} link
 * @param {string} value
 */
export function pointLink(link, value) {
  clearLinkExtras(link);
  if (value === '__href') {
    delete link.page;
    link.href = link.href ?? 'https://';
  } else if (value === '__none' || !value) {
    delete link.page;
    delete link.href;
  } else {
    link.page = value;
    delete link.href;
  }
}
