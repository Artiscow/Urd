/**
 * The designs a document is drawn in (the privacy page, the terms of sale, a text) and the design a stored value reads as; doc-look.js draws them.
 * Notes: docs/engine-notes/doc-designs.md (Urd repository).
 */

/** The privacy page's designs, in the picker's order; the first is the one a block without a choice is drawn in. */
export const PRIVACY_DESIGNS = ['long', 'contents', 'glance', 'questions', 'ledger', 'ledger-cards'];

/** The designs a text is drawn in: plain text, the way every text block is drawn, and the document designs the terms of sale take. */
export const TEXT_DESIGNS = ['plain', 'long', 'contents', 'glance', 'questions', 'clauses'];

/** The terms of sale's designs, in the picker's order; the first is the one a block without a choice is drawn in. */
export const TERMS_DESIGNS = ['long', 'contents', 'glance', 'questions', 'clauses'];

/** The privacy page's design a stored value reads as. */
export function privacyDesign(value) {
  return PRIVACY_DESIGNS.includes(value) ? value : 'long';
}

/** A text's design a stored value reads as. */
export function textDesign(value) {
  return TEXT_DESIGNS.includes(value) ? value : 'plain';
}

/** The terms of sale's design a stored value reads as. */
export function termsDesign(value) {
  return TERMS_DESIGNS.includes(value) ? value : 'long';
}
