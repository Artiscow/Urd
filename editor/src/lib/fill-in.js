/**
 * The parts of a page made from a template that the owner still has to fill in: the words in [brackets] the template marks (`data-urd-fill`, sections/presets.js), counted while words in brackets remain in them.
 * `contact` parts are the seller's details, which the site's contact details had none of when the page was made.
 * Read by the Pages panel's count on a page's row and by the warning before publishing.
 */

/** A marked part as the text stores it: its kind, if any, and its words, with any formatting the owner put inside them. */
const PART = /<span\b[^>]*?\bdata-urd-fill(?:="(\w*)")?[^>]*>([^]*?)<\/span>/g;

/** Words in brackets left in a part: it is not filled in. */
const OPEN = /\[[^\]]*\]/;

const TAG = /<[^>]*>/g;

/** A part's words without the formatting inside them, the tags taken off until none is left. */
function bareWords(words) {
  let text = String(words);
  let before;
  do {
    before = text;
    text = text.replace(TAG, '');
  } while (text !== before);
  return text;
}

/**
 * The open parts in a text's HTML.
 * @param {string} html
 * @returns {{own: number, contact: number}}
 */
export function openFills(html) {
  const open = { own: 0, contact: 0 };
  for (const [, kind, words] of String(html ?? '').matchAll(PART)) {
    if (!OPEN.test(bareWords(words))) continue;
    if (kind === 'contact') open.contact += 1;
    else open.own += 1;
  }
  return open;
}

/**
 * The open parts on a page: every text block's and the terms of sale's, summed.
 * @param {{sections?: Array<{blocks?: Array<{type?: string, props?: {html?: string}}>}>}|null} page
 * @returns {{own: number, contact: number}}
 */
export function pageFills(page) {
  const open = { own: 0, contact: 0 };
  for (const section of page?.sections ?? []) {
    for (const block of section?.blocks ?? []) {
      if (block?.type !== 'text' && block?.type !== 'terms') continue;
      const parts = openFills(block.props?.html);
      open.own += parts.own;
      open.contact += parts.contact;
    }
  }
  return open;
}
