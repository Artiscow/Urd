/**
 * Preview-broen: editoren viser den EKTE siden i en iframe (?preview=1)
 * og pusher utkast dit via postMessage. Motoren lytter og rerendrer den
 * berørte seksjonen inkrementelt (render.js renderSection). Forhånds-
 * visningen kan dermed ikke drifte fra produksjon: den ER produksjon.
 *
 * Meldingsformat:
 *   editor → side: { type: 'urd-preview', pageId, section }   (én seksjon)
 *                  { type: 'urd-preview-full', pageId, page } (hel side)
 *   side → editor: { type: 'urd-preview-height', px }         (iframe-høyde)
 */

/**
 * @param {HTMLIFrameElement} iframe Iframen som viser siden med ?preview=1
 * @returns {{sendSection(pageId: string, section: object): void, sendPage(pageId: string, page: object): void, destroy(): void}}
 */
export function createPreviewBridge(iframe) {
  throw new Error('TODO v0.2: createPreviewBridge er ikke implementert ennå');
}
