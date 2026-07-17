/**
 * Preview-broen: editoren viser den EKTE siden i en iframe (?preview=1)
 * og snakker med den via postMessage. Forhåndsvisningen kan dermed ikke
 * drifte fra produksjon: den ER produksjon.
 *
 * Meldingsformat:
 *   editor → side: { type: 'urd-preview', pageId, section }    (én seksjon)
 *                  { type: 'urd-preview-full', pageId, page }  (hel side)
 *                  { type: 'urd-site', site }                  (site-utkast: grid/tema/nav)
 *   side → editor: { type: 'urd-edit', sectionId, blockId, props }  (klikk-og-skriv)
 *                  { type: 'urd-move', sectionId, blockId, frame, frameKey }  (dra/resize)
 *                  { type: 'urd-mobile-manual', sectionId, frames } (seksjon materialisert)
 *                  { type: 'urd-mobile-auto', sectionId }           (tilbake til auto)
 *                  { type: 'urd-review-done', sectionId }           (mobil gjennomgått)
 *                  { type: 'urd-block-flag', sectionId, blockId, decor }
 *                  { type: 'urd-delete', sectionId, blockId }
 *                  { type: 'urd-add-section', index, section }
 *                  { type: 'urd-move-section', sectionId, dir }
 *                  { type: 'urd-delete-section', sectionId }
 *                  { type: 'urd-section-size', sectionId, minHeight }
 *                  { type: 'urd-undo', redo }                 (Ctrl+Z inne i iframen)
 *                  { type: 'urd-select-section', sectionId }  (aktiv seksjon for paletten)
 *                  { type: 'urd-select-block', sectionId, blockId } (markert blokk, null = avvalgt)
 *                  { type: 'urd-ready' }                      (motoren lytter; trygt å sende utkast)
 *                  { type: 'urd-navigate', path }             (intern lenke klikket i preview)
 *                  { type: 'urd-add-block', sectionId, block } (plassert blokk fra paletten)
 *                  { type: 'urd-preview-height', px }
 *   editor → side: { type: 'urd-chrome', visible }            (vis/skjul editeringshåndtak)
 *                  { type: 'urd-show-grid', visible }         (vis gridet i alle seksjoner)
 */

/**
 * @param {HTMLIFrameElement} iframe Iframen som viser siden med ?preview=1
 * @param {{onEdit?: Function, onMove?: Function, onDelete?: Function, onAddSection?: Function, onMoveSection?: Function, onDeleteSection?: Function}} [handlers]
 * @returns {{sendSection(pageId: string, section: object): void, sendPage(pageId: string, page: object): void, sendSite(site: object): void, destroy(): void}}
 */
export function createPreviewBridge(iframe, handlers = {}) {
  const listener = (event) => {
    if (event.origin !== location.origin) return;
    const msg = event.data;
    if (msg?.type === 'urd-edit') handlers.onEdit?.(msg);
    if (msg?.type === 'urd-move') handlers.onMove?.(msg);
    if (msg?.type === 'urd-delete') handlers.onDelete?.(msg);
    if (msg?.type === 'urd-add-section') handlers.onAddSection?.(msg);
    if (msg?.type === 'urd-move-section') handlers.onMoveSection?.(msg);
    if (msg?.type === 'urd-delete-section') handlers.onDeleteSection?.(msg);
    if (msg?.type === 'urd-section-size') handlers.onSectionSize?.(msg);
    if (msg?.type === 'urd-undo') handlers.onUndo?.(msg);
    if (msg?.type === 'urd-select-section') handlers.onSelectSection?.(msg);
    if (msg?.type === 'urd-select-block') handlers.onSelectBlock?.(msg);
    if (msg?.type === 'urd-ready') handlers.onReady?.(msg);
    if (msg?.type === 'urd-navigate') handlers.onNavigate?.(msg);
    if (msg?.type === 'urd-add-block') handlers.onAddBlock?.(msg);
    if (msg?.type === 'urd-mobile-manual') handlers.onMobileManual?.(msg);
    if (msg?.type === 'urd-mobile-auto') handlers.onMobileAuto?.(msg);
    if (msg?.type === 'urd-review-done') handlers.onReviewDone?.(msg);
    if (msg?.type === 'urd-block-flag') handlers.onBlockFlag?.(msg);
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
    sendSite(site) {
      post({ type: 'urd-site', site });
    },
    sendChrome(visible) {
      post({ type: 'urd-chrome', visible });
    },
    sendShowGrid(visible) {
      post({ type: 'urd-show-grid', visible });
    },
    sendPlaceBlock(block) {
      post({ type: 'urd-place-block', block });
    },
    sendAttention(sectionId, needed) {
      post({ type: 'urd-attention', sectionId, needed });
    },
    destroy() {
      window.removeEventListener('message', listener);
    },
  };
}
