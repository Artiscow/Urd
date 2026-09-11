/**
 * The preview bridge: the editor shows the REAL page in an iframe (?preview=1)
 * and talks to it over postMessage. The preview therefore cannot drift from
 * production: it IS production.
 *
 * Message format:
 *   editor → page: { type: 'urd-preview', pageId, section }    (one section)
 *                  { type: 'urd-preview-full', pageId, page }  (whole page)
 *                  { type: 'urd-site', site }                  (site draft: grid/theme/nav)
 *                  { type: 'urd-plugins', enabled }            (the plugin draft's enabled list; loaded live in the preview)
 *                  { type: 'urd-collections', collections }    (the collection drafts: id → data; the preview uses them instead of the server files)
 *                  { type: 'urd-viewport', mode }              (the editor's viewport choice: desktop/mobile)
 *                  { type: 'urd-duplicate' }                   (Ctrl+D in admin: duplicate the selected block)
 *   page → editor: { type: 'urd-edit', sectionId, blockId, props, rerender? }  (click-to-type/image editor)
 *                  { type: 'urd-move', sectionId, blockId, frame, frameKey }  (drag/resize)
 *                  { type: 'urd-grow', sectionId, blockId, h }  (auto height for data blocks: ONLY h, never x/y)
 *                  { type: 'urd-mobile-reset', sectionId, blockId? } (reset the mobile overrides; without blockId the whole section, ADR-0019)
 *                  { type: 'urd-mobile-order', sectionId, blockId, mobileOrder } (arrow moves in the mobile reading order)
 *                  { type: 'urd-review-done', sectionId }           (mobile reviewed)
 *                  { type: 'urd-block-flag', sectionId, blockId, decor?, hideMobile? }
 *                  { type: 'urd-delete', sectionId, blockId | blockIds } (blockIds from a multi-selection: the whole selection in one undo step)
 *                  { type: 'urd-add-section', index, section }
 *                  { type: 'urd-move-section', sectionId, dir }
 *                  { type: 'urd-delete-section', sectionId }
 *                  { type: 'urd-section-size', sectionId, minHeight, moves? } (moves from the top-edge handle: [{blockId, dy}] in the same undo step)
 *                  { type: 'urd-undo', redo }                 (Ctrl+Z inside the iframe)
 *                  { type: 'urd-select-section', sectionId }  (active section for the palette)
 *                  { type: 'urd-select-block', sectionId, blockId } (selected block, null = deselected)
 *                  { type: 'urd-block-menu', sectionId, blockId, rect } (open the block menu at the block)
 *                  { type: 'urd-ready' }                      (the engine is listening; safe to send drafts)
 *                  { type: 'urd-plugin-blocks', blocks }      (the plugin blocks: type/label/defaults for the Blocks panel)
 *                  { type: 'urd-navigate', path }             (internal link clicked in the preview)
 *                  { type: 'urd-add-block', sectionId, block } (block placed from the palette)
 *                  { type: 'urd-add-blocks', sectionId, blocks, minBottom, moves } (preset element from the "+ card/row" button OR paste/duplicate of a multi-selection; moves shifts existing blocks in the same undo step)
 *                  { type: 'urd-request-block', sectionId, kind, at? } ("+ Add block"; at = click point {x in %, y in px}, without = centered)
 *                  { type: 'urd-move-block-section', fromSectionId, toSectionId, blockId, frame } (block dropped in another section)
 *                  { type: 'urd-collection-edit', collection, entryId, field, value } (click-to-type/image swap in the collection block)
 *                  { type: 'urd-collection-add', collection } (new entry from the "+ Product" adder in the product block)
 *                  { type: 'urd-nav-width', width }           (side-by-side column width dragged in the preview)
 *                  { type: 'urd-save-template', kind, section | blocks } (Save as template: an unnamed snapshot; the editor names and stores it)
 *                  { type: 'urd-sticky-group', sectionId, blockIds, on } (Pin the group: one shared sticky group across the whole selection, or dissolve it)
 *                  { type: 'urd-sticky-dock', sectionId, blockId, dock } (screen-docked block dragged to a new anchor point)
 *                  { type: 'urd-delete-template', id }        (the delete button in the My templates tab; the editor confirms and deletes)
 *                  { type: 'urd-apply-layout', sectionId, frames, minHeight } (switch layout: the variant's frames + height in ONE undo step)
 *   editor → page: { type: 'urd-chrome', visible }            (show/hide the editing handles)
 *                  { type: 'urd-show-grid', visible }         (show the grid in every section)
 *                  { type: 'urd-show-guides', visible }       (guides: center/content width in every section)
 *                  { type: 'urd-select', blockId }            (select a block the editor just built, e.g. + New block)
 *                  { type: 'urd-admin-theme', colors }        (the admin color theme {bg, surface, accent, text}: the editor menus in the preview follow admin, not the site)
 *                  { type: 'urd-templates', templates }               (the template drafts: a list of {id, name, kind, section?, blocks?, page?}; the My templates tab reads them)
 *                  { type: 'urd-insert-template', id }        (the Blocks panel's My templates: insert a block-group template into the active section)
 *                  { type: 'urd-zoom', scale }                (the canvas zoom; the handles counter-scale so they keep their admin size)
 *                  { type: 'urd-scroll-section', sectionId }  (scroll the preview to the section; the review marker in the top bar)
 *                  { type: 'urd-close-menus' }                (a click in the admin panels closes open menus in the preview)
 *                  { type: 'urd-place-block', block }         (the palette: the engine finds a placement mid-viewport and reports back)
 *                  { type: 'urd-attention', sectionId, needed } (desktop drift in an overridden section: mark it live)
 *                  { type: 'urd-demo-anim', sectionId, blockId } (play the changed animation once; blockId null = the section)
 *                  { type: 'urd-open-block-config', blockId } (open a plugin block's settings from Properties)
 */

/**
 * @param {HTMLIFrameElement} iframe The iframe showing the page with ?preview=1
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
    if (msg?.type === 'urd-mobile-reset') handlers.onMobileReset?.(msg);
    if (msg?.type === 'urd-mobile-order') handlers.onMobileOrder?.(msg);
    if (msg?.type === 'urd-review-done') handlers.onReviewDone?.(msg);
    if (msg?.type === 'urd-block-flag') handlers.onBlockFlag?.(msg);
    if (msg?.type === 'urd-collection-edit') handlers.onCollectionEdit?.(msg);
    if (msg?.type === 'urd-collection-add') handlers.onCollectionAdd?.(msg);
    if (msg?.type === 'urd-nav-width') handlers.onNavWidth?.(msg);
    if (msg?.type === 'urd-save-template') handlers.onSaveTemplate?.(msg);
    if (msg?.type === 'urd-sticky-group') handlers.onStickyGroup?.(msg);
    if (msg?.type === 'urd-sticky-dock') handlers.onStickyDock?.(msg);
    if (msg?.type === 'urd-delete-template') handlers.onDeleteTemplate?.(msg);
    if (msg?.type === 'urd-apply-layout') handlers.onApplyLayout?.(msg);
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
    /** The template drafts for the My templates tab in "+ New section" (plain copies). */
    sendTemplates(templates) {
      post({ type: 'urd-templates', templates });
    },
    /** The Blocks panel's My templates: insert the block-group template into the active section. */
    sendInsertTemplate(id) {
      post({ type: 'urd-insert-template', id });
    },
    sendViewport(mode) {
      post({ type: 'urd-viewport', mode });
    },
    /** The canvas zoom, so the editing handles can counter-scale and keep the
     *  same on-screen size as the admin panels at any zoom level. */
    sendZoom(scale) {
      post({ type: 'urd-zoom', scale });
    },
    /** A click in the admin panels closes any open menus in the preview. */
    sendCloseMenus() {
      post({ type: 'urd-close-menus' });
    },
    /** Ctrl+D with focus in the admin panels: duplicate the selected block in the preview. */
    sendDuplicate() {
      post({ type: 'urd-duplicate' });
    },
    sendShowGrid(visible) {
      post({ type: 'urd-show-grid', visible });
    },
    sendShowGuides(visible) {
      post({ type: 'urd-show-guides', visible });
    },
    /** The admin color theme: the editor menus in the preview follow admin, not the site. */
    sendAdminTheme(colors) {
      post({ type: 'urd-admin-theme', colors });
    },
    sendSelect(blockId) {
      post({ type: 'urd-select', blockId });
    },
    sendPlaceBlock(block) {
      post({ type: 'urd-place-block', block });
    },
    sendAttention(sectionId, needed) {
      post({ type: 'urd-attention', sectionId, needed });
    },
    /** Scroll the preview to a section (the review marker in the top bar). */
    sendScrollSection(sectionId) {
      post({ type: 'urd-scroll-section', sectionId });
    },
    /** Play an entrance animation as a demo (blockId null = the section). */
    sendDemoAnim(sectionId, blockId = null) {
      post({ type: 'urd-demo-anim', sectionId, blockId });
    },
    /** Open a plugin block's settings (the config panel) in the preview. */
    sendOpenConfig(blockId) {
      post({ type: 'urd-open-block-config', blockId });
    },
    destroy() {
      window.removeEventListener('message', listener);
    },
  };
}
