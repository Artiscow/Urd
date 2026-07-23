/**
 * Preview-broen: editoren viser den EKTE siden i en iframe (?preview=1)
 * og snakker med den via postMessage. Forhåndsvisningen kan dermed ikke
 * drifte fra produksjon: den ER produksjon.
 *
 * Meldingsformat:
 *   editor → side: { type: 'urd-preview', pageId, section }    (én seksjon)
 *                  { type: 'urd-preview-full', pageId, page }  (hel side)
 *                  { type: 'urd-site', site }                  (site-utkast: grid/tema/nav)
 *                  { type: 'urd-plugins', enabled }            (plugin-utkastets aktive liste; lastes live i preview)
 *                  { type: 'urd-collections', collections }    (samlingsutkastene: id → data; previewen bruker dem i stedet for serverfilene)
 *                  { type: 'urd-viewport', mode }              (editorens visningsvalg: desktop/mobile)
 *                  { type: 'urd-duplicate' }                   (Ctrl+D i admin: dupliser markert blokk)
 *   side → editor: { type: 'urd-edit', sectionId, blockId, props, rerender? }  (klikk-og-skriv/bildeeditor)
 *                  { type: 'urd-move', sectionId, blockId, frame, frameKey }  (dra/resize)
 *                  { type: 'urd-grow', sectionId, blockId, h }  (auto-høyde for datablokker: KUN h, aldri x/y)
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
 *                  { type: 'urd-block-menu', sectionId, blockId, rect } (åpne blokkmenyen ved blokken)
 *                  { type: 'urd-ready' }                      (motoren lytter; trygt å sende utkast)
 *                  { type: 'urd-plugin-blocks', blocks }      (plugin-blokkene: type/label/defaults til Blokker-panelet)
 *                  { type: 'urd-navigate', path }             (intern lenke klikket i preview)
 *                  { type: 'urd-add-block', sectionId, block } (plassert blokk fra paletten)
 *                  { type: 'urd-add-blocks', sectionId, blocks, minBottom, moves } (preset-element fra «+ kort/rad»-knappen; moves flytter eksisterende blokker i samme angre-steg)
 *                  { type: 'urd-request-block', sectionId, kind } («+ Legg til blokk» i seksjonen)
 *                  { type: 'urd-move-block-section', fromSectionId, toSectionId, blockId, frame } (blokk sluppet i annen seksjon)
 *                  { type: 'urd-collection-edit', collection, entryId, field, value } (klikk-og-skriv/bildebytte i samling-blokken)
 *                  { type: 'urd-nav-width', width }           (sidestilt kolonnebredde dratt i preview)
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
    if (msg?.type === 'urd-grow') handlers.onGrow?.(msg);
    if (msg?.type === 'urd-delete') handlers.onDelete?.(msg);
    if (msg?.type === 'urd-add-section') handlers.onAddSection?.(msg);
    if (msg?.type === 'urd-move-section') handlers.onMoveSection?.(msg);
    if (msg?.type === 'urd-delete-section') handlers.onDeleteSection?.(msg);
    if (msg?.type === 'urd-section-size') handlers.onSectionSize?.(msg);
    if (msg?.type === 'urd-undo') handlers.onUndo?.(msg);
    if (msg?.type === 'urd-select-section') handlers.onSelectSection?.(msg);
    if (msg?.type === 'urd-select-block') handlers.onSelectBlock?.(msg);
    if (msg?.type === 'urd-block-menu') handlers.onBlockMenu?.(msg);
    if (msg?.type === 'urd-plugin-blocks') handlers.onPluginBlocks?.(msg);
    if (msg?.type === 'urd-ready') handlers.onReady?.(msg);
    if (msg?.type === 'urd-navigate') handlers.onNavigate?.(msg);
    if (msg?.type === 'urd-add-block') handlers.onAddBlock?.(msg);
    if (msg?.type === 'urd-add-blocks') handlers.onAddBlocks?.(msg);
    if (msg?.type === 'urd-request-block') handlers.onRequestBlock?.(msg);
    if (msg?.type === 'urd-move-block-section') handlers.onMoveBlockSection?.(msg);
    if (msg?.type === 'urd-mobile-manual') handlers.onMobileManual?.(msg);
    if (msg?.type === 'urd-mobile-auto') handlers.onMobileAuto?.(msg);
    if (msg?.type === 'urd-review-done') handlers.onReviewDone?.(msg);
    if (msg?.type === 'urd-block-flag') handlers.onBlockFlag?.(msg);
    if (msg?.type === 'urd-collection-edit') handlers.onCollectionEdit?.(msg);
    if (msg?.type === 'urd-nav-width') handlers.onNavWidth?.(msg);
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
    sendPlugins(enabled) {
      post({ type: 'urd-plugins', enabled });
    },
    sendCollections(collections) {
      post({ type: 'urd-collections', collections });
    },
    sendViewport(mode) {
      post({ type: 'urd-viewport', mode });
    },
    /** Klikk i admin-panelene skal lukke åpne menyer i forhåndsvisningen. */
    sendCloseMenus() {
      post({ type: 'urd-close-menus' });
    },
    /** Ctrl+D med fokus i admin-panelene: dupliser markert blokk i previewen. */
    sendDuplicate() {
      post({ type: 'urd-duplicate' });
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
    /** Spill en inngangsanimasjon som demo (blockId null = seksjonen). */
    sendDemoAnim(sectionId, blockId = null) {
      post({ type: 'urd-demo-anim', sectionId, blockId });
    },
    destroy() {
      window.removeEventListener('message', listener);
    },
  };
}
