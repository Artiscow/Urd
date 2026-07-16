/**
 * Preview-broen: editoren viser den EKTE siden i en iframe (?preview=1)
 * og snakker med den via postMessage. Forhåndsvisningen kan dermed ikke
 * drifte fra produksjon: den ER produksjon.
 *
 * Meldingsformat:
 *   editor → side: { type: 'urd-preview', pageId, section }    (én seksjon)
 *                  { type: 'urd-preview-full', pageId, page }  (hel side)
 *   side → editor: { type: 'urd-edit', sectionId, blockId, props }  (klikk-og-skriv)
 *                  { type: 'urd-move', sectionId, blockId, frame }  (dra/resize)
 *                  { type: 'urd-delete', sectionId, blockId }
 *                  { type: 'urd-preview-height', px }
 */

/**
 * @param {HTMLIFrameElement} iframe Iframen som viser siden med ?preview=1
 * @param {{onEdit?: Function, onMove?: Function, onDelete?: Function}} [handlers]
 * @returns {{sendSection(pageId: string, section: object): void, sendPage(pageId: string, page: object): void, destroy(): void}}
 */
export function createPreviewBridge(iframe, handlers = {}) {
  const listener = (event) => {
    if (event.origin !== location.origin) return;
    const msg = event.data;
    if (msg?.type === 'urd-edit') handlers.onEdit?.(msg);
    if (msg?.type === 'urd-move') handlers.onMove?.(msg);
    if (msg?.type === 'urd-delete') handlers.onDelete?.(msg);
  };
  window.addEventListener('message', listener);

  const post = (msg) => iframe.contentWindow?.postMessage(msg, location.origin);

  return {
    sendSection(pageId, section) {
      post({ type: 'urd-preview', pageId, section });
    },
    sendPage(pageId, page) {
      post({ type: 'urd-preview-full', pageId, page });
    },
    destroy() {
      window.removeEventListener('message', listener);
    },
  };
}
