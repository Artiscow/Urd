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
 *                  { type: 'urd-clipboard', clipboard }        (the last copy or cut, for the page just loaded)
 *                  { type: 'urd-active-section', sectionId }   (a section the editor selected itself: new, duplicated or pasted)
 *                  { type: 'urd-caret', blockId, offset }       (an undo of typing: the caret back in the block's text)
 *                  { type: 'urd-run-command', id }           (a plugin's command, run where it was registered)
 *   page → editor: { type: 'urd-edit', sectionId, blockId, props, rerender? }  (click-to-type/image editor)
 *                  { type: 'urd-move', sectionId, blockId, frame, frameKey, coalesce?, groupKey? }  (drag/resize)
 *                  { type: 'urd-grow', sectionId, blockId, h, fit?, seq? }  (a plugin copy's own height, or the answer to urd-fit-block: ONLY h, never x/y)
 *                  { type: 'urd-mobile-reset', sectionId, blockId? } (reset the mobile overrides; without blockId the whole section, ADR-0019)
 *                  { type: 'urd-phone-order', sectionId, blockId, change, coalesce? } (a block moved one place in the phone's reading order: the change phone-moves.js settled it into; coalesce from the keys)
 *                  { type: 'urd-phone-layout', sectionId, change } (a preset of the phone view's «Phone layout» strip: its cells and order, phone-layouts.js)
 *                  { type: 'urd-hover-block', blockId } (the block under the mouse on the canvas, null for none)
 *                  { type: 'urd-review-done', sectionId }           (mobile reviewed)
 *                  { type: 'urd-block-flag', sectionId, blockId, decor?, hideMobile?, hideDesktop? }
 *                  { type: 'urd-block-style', sectionId, blockId, fields }  (a pasted style's block-level fields; null clears one)
 *                  { type: 'urd-menu-area', area }  (1, 2 or 3 on a selected block: the editor's menu shows that area)
 *                  { type: 'urd-delete', sectionId, blockId | blockIds } (blockIds from a multi-selection: the whole selection in one undo step)
 *                  { type: 'urd-add-section', index, section }
 *                  { type: 'urd-move-section', sectionId, dir }
 *                  { type: 'urd-delete-section', sectionId }
 *                  { type: 'urd-duplicate-section', sectionId }
 *                  { type: 'urd-clipboard', clipboard, cut }  (a copy or a cut on the page: blocks or a section)
 *                  { type: 'urd-paste-section', afterId, section }  (the clipboard's section with fresh ids, below afterId, or last)
 *                  { type: 'urd-section-size', sectionId, minHeight, moves? } (moves from the seam grip, for a section changed at its top: [{blockId, dy}] in the same undo step)
 *                  { type: 'urd-undo', redo }                 (Ctrl+Z inside the iframe)
 *                  { type: 'urd-select-section', sectionId }  (active section for the palette)
 *                  { type: 'urd-select-block', sectionId, blockId } (selected block, null = deselected)
 *                  { type: 'urd-block-menu', sectionId, blockId, rect, group? } (open the block menu at the block; `group` opens that group in its Content area)
 *                  { type: 'urd-section-menu', sectionId, rect }  (open the section's settings in the floating menu, beside the section)
 *                  { type: 'urd-redraw-section', sectionId } (a block with a phone design crossed its width's line: the section is sent again from the draft)
 *                  { type: 'urd-block-design', sectionId, blockId, phone? } (open the design picker for the block, from the design button on its toolbar; `phone` from the phone view: its design on a phone)
 *                  { type: 'urd-ready' }                      (the engine is listening; safe to send drafts)
 *                  { type: 'urd-plugin-blocks', blocks }      (the plugin blocks: type/label/defaults for the Blocks panel)
 *                  { type: 'urd-navigate', path, hash }       (internal link clicked in the preview; hash is the link's fragment or '')
 *                  { type: 'urd-picture-edit', kind, sectionId?, blockId?, index?, collection?, entryId?, frameRatio, frameWidth, frameHeight } (a picture on the canvas asks the image editor to open: an image block's, a video's cover, a gallery picture, a collection entry's or a quote's portrait, with its frame's width over its height and its size in pixels as drawn)
 *                  { type: 'urd-link-edit', value, text }     (the text toolbar's link or Ctrl+K: the link at the caret in the link shape, or null, and the selected words)
 *                  { type: 'urd-add-block', sectionId, block } (block placed from the palette)
 *                  { type: 'urd-add-blocks', sectionId, blocks, minBottom, moves } (preset element from the "+ card/row" button OR paste/duplicate of a multi-selection; moves shifts existing blocks in the same undo step)
 *                  { type: 'urd-request-block', sectionId, kind, at?, files? } ("+ Add block"; at = click point {x in %, y in px}, without = centered; files = the pictures an image or a gallery is made from, picked in the preview)
 *                  { type: 'urd-calendar-designs', sectionId, at? } ("All calendar designs …" in "+ Add block": the design picker, the calendar then placed as a requested block)
 *                  { type: 'urd-shortcuts' }                  («?» on the page: the shortcut sheet)
 *                  { type: 'urd-toggle-grid' }                (G on the page: the grid shown or hidden)
 *                  { type: 'urd-palette' }                    (Ctrl/⌘+K on the page outside a text: the command palette)
 *                  { type: 'urd-save-key' }                   (Ctrl/⌘+S on the page: the ticked drafts saved)
 *                  { type: 'urd-commands', commands }          (the commands plugins registered in the preview: [{ id, label }])
 *                  { type: 'urd-move-block-section', fromSectionId, toSectionId, blockId, frame, groupKey? } (block dropped in another section; groupKey joins the frames its drag settled in the source)
 *                  { type: 'urd-collection-edit', collection, entryId, field, value } (click-to-type/image swap in the collection block)
 *                  { type: 'urd-collection-add', collection } (new entry from the "+ Product" adder in the product block)
 *                  { type: 'urd-open-entry', collection, entryId, field } (a click on a product card of a selected block: its entry in the Collections panel, the field focused)
 *                  { type: 'urd-open-panel', panel, fold, part } (the right-click menu on the site's menu: the Nav panel, at one of its folds or at its top, with `part` naming a card in the fold to open)
 *                  { type: 'urd-nav-width', width }           (side-by-side column width dragged in the preview)
 *                  { type: 'urd-save-template', kind, section | blocks } (Save as template: an unnamed snapshot; the editor names and stores it)
 *                  { type: 'urd-sticky-group', sectionId, blockIds, on } (Pin the group: one shared sticky group across the whole selection, or dissolve it)
 *                  { type: 'urd-sticky-dock', sectionId, blockId, dock } (screen-docked block dragged to a new anchor point)
 *                  { type: 'urd-delete-template', id }        (the delete button in the My templates tab; the editor confirms and deletes)
 *                  { type: 'urd-apply-layout', sectionId, frames, minHeight } (switch layout: the variant's frames + height in ONE undo step)
 *   editor → page: { type: 'urd-chrome', visible }            (show/hide the editing handles)
 *                  { type: 'urd-show-grid', visible }         (show the grid in every section)
 *                  { type: 'urd-show-guides', visible }       (guides: center/content width in every section)
 *                  { type: 'urd-spellcheck', on }             (the browser's spell check on the texts)
 *                  { type: 'urd-announce-reset' }             (the Announcement panel: forget the dismissal, so the strip returns)
 *                  { type: 'urd-select', blockId, picked? }   (select a block the editor just built, e.g. + New block; `picked` in the editor's lists, brought into view with the focus left in the list)
 *                  { type: 'urd-light', ids }                 (light blocks on the canvas for the row under the pointer in the editor's lists; [] takes the light away)
 *                  { type: 'urd-admin-theme', colors }        (the admin color theme {bg, surface, accent, text}: the editor menus in the preview follow admin, not the site)
 *                  { type: 'urd-templates', templates }               (the template drafts: a list of {id, name, kind, section?, blocks?, page?}; the My templates tab reads them)
 *                  { type: 'urd-insert-template', id }        (the Blocks panel's My templates: insert a block-group template into the active section)
 *                  { type: 'urd-zoom', scale }                (the canvas zoom; the handles counter-scale so they keep their admin size)
 *                  { type: 'urd-scroll-section', sectionId }  (scroll the preview to the section; the review marker in the top bar)
 *                  { type: 'urd-scroll-anchor', hash }        (jump to the spot a link's fragment names, once its page stands)
 *                  { type: 'urd-scroll-to', sectionId, offset } (back to where the canvas was scrolled before a reload, lib/reload-place.js)
 *                  { type: 'urd-link-apply', link }           (the link editor's answer for the text being edited: the link shape, or null to take the link away)
 *                  { type: 'urd-close-menus' }                (a click in the admin panels closes open menus in the preview)
 *                  { type: 'urd-place-block', block }         (the palette: the engine finds a placement mid-viewport and reports back)
 *                  { type: 'urd-attention', sectionId, needed } (desktop drift in an overridden section: mark it live)
 *                  { type: 'urd-demo-anim', sectionId, blockId } (play the changed animation once; blockId null = the section)
 *                  { type: 'urd-demo-motion' } (let the ribbons roll for a few seconds while editing)
 *                  { type: 'urd-open-block-config', blockId } (open a plugin block's settings from Properties)
 *                  { type: 'urd-fit-block', sectionId, blockId, seq } (ask for the height of a block that follows its content, ADR-0025; answered with urd-grow)
 *                  { type: 'urd-frames', sectionId, frames } (frames fitted to their content, block id to desktop frame: put in place without drawing the section again)
 *                  { type: 'urd-text-style', blockId, style } (a font or a size for the whole text of a block: {fontFamily} or {fontSize}, null takes the theme's)
 */

/** The page's messages that still reach the editor while a saved draft is looked at: none of them changes the draft. */
const LOOK_PASSES = new Set(['urd-ready', 'urd-navigate', 'urd-shortcuts', 'urd-palette', 'urd-save-key', 'urd-commands', 'urd-plugin-blocks', 'urd-toggle-grid']);

/**
 * @param {HTMLIFrameElement} iframe The iframe showing the page with ?preview=1
 * @param {{onEdit?: Function, onMove?: Function, onDelete?: Function, onAddSection?: Function, onMoveSection?: Function, onDeleteSection?: Function}} [handlers]
 * @returns {{sendSection(pageId: string, section: object): void, sendPage(pageId: string, page: object): void, sendSite(site: object): void, destroy(): void}}
 */
export function createPreviewBridge(iframe, handlers = {}) {
  /** While a saved draft is looked at in the canvas (setLooking): the draft's own sends wait, and the page's edits are dropped, so the saved version and this browser's never mix. */
  let looking = false;
  const listener = (event) => {
    // The bridge's own iframe alone: another preview iframe (the design picker's) has a bridge of its own.
    if (event.origin !== location.origin || event.source !== iframe.contentWindow) return;
    const msg = event.data;
    if (looking && !LOOK_PASSES.has(msg?.type)) return;
    if (msg?.type === 'urd-edit') handlers.onEdit?.(msg);
    if (msg?.type === 'urd-picture-edit') handlers.onPictureEdit?.(msg);
    if (msg?.type === 'urd-move') handlers.onMove?.(msg);
    if (msg?.type === 'urd-grow') handlers.onGrow?.(msg);
    if (msg?.type === 'urd-delete') handlers.onDelete?.(msg);
    if (msg?.type === 'urd-add-section') handlers.onAddSection?.(msg);
    if (msg?.type === 'urd-move-section') handlers.onMoveSection?.(msg);
    if (msg?.type === 'urd-delete-section') handlers.onDeleteSection?.(msg);
    if (msg?.type === 'urd-duplicate-section') handlers.onDuplicateSection?.(msg);
    if (msg?.type === 'urd-clipboard') handlers.onClipboard?.(msg);
    if (msg?.type === 'urd-paste-section') handlers.onPasteSection?.(msg);
    if (msg?.type === 'urd-section-size') handlers.onSectionSize?.(msg);
    if (msg?.type === 'urd-undo') handlers.onUndo?.(msg);
    if (msg?.type === 'urd-select-section') handlers.onSelectSection?.(msg);
    if (msg?.type === 'urd-select-block') handlers.onSelectBlock?.(msg);
    if (msg?.type === 'urd-hover-block') handlers.onHoverBlock?.(msg);
    if (msg?.type === 'urd-menu-area') handlers.onMenuArea?.(msg);
    if (msg?.type === 'urd-block-menu') handlers.onBlockMenu?.(msg);
    if (msg?.type === 'urd-section-menu') handlers.onSectionMenu?.(msg);
    if (msg?.type === 'urd-block-design') handlers.onBlockDesign?.(msg);
    if (msg?.type === 'urd-redraw-section') handlers.onRedrawSection?.(msg);
    if (msg?.type === 'urd-plugin-blocks') handlers.onPluginBlocks?.(msg);
    if (msg?.type === 'urd-ready') handlers.onReady?.(msg);
    if (msg?.type === 'urd-navigate') handlers.onNavigate?.(msg);
    if (msg?.type === 'urd-link-edit') handlers.onLinkEdit?.(msg);
    if (msg?.type === 'urd-add-block') handlers.onAddBlock?.(msg);
    if (msg?.type === 'urd-add-blocks') handlers.onAddBlocks?.(msg);
    if (msg?.type === 'urd-request-block') handlers.onRequestBlock?.(msg);
    if (msg?.type === 'urd-calendar-designs') handlers.onCalendarDesigns?.(msg);
    if (msg?.type === 'urd-shortcuts') handlers.onShortcuts?.();
    if (msg?.type === 'urd-toggle-grid') handlers.onToggleGrid?.();
    if (msg?.type === 'urd-palette') handlers.onPalette?.();
    if (msg?.type === 'urd-save-key') handlers.onSaveKey?.();
    if (msg?.type === 'urd-commands') handlers.onCommands?.(msg);
    if (msg?.type === 'urd-move-block-section') handlers.onMoveBlockSection?.(msg);
    if (msg?.type === 'urd-mobile-reset') handlers.onMobileReset?.(msg);
    if (msg?.type === 'urd-phone-order') handlers.onPhoneOrder?.(msg);
    if (msg?.type === 'urd-phone-layout') handlers.onPhoneLayout?.(msg);
    if (msg?.type === 'urd-review-done') handlers.onReviewDone?.(msg);
    if (msg?.type === 'urd-block-flag') handlers.onBlockFlag?.(msg);
    if (msg?.type === 'urd-block-style') handlers.onBlockStyle?.(msg);
    if (msg?.type === 'urd-collection-edit') handlers.onCollectionEdit?.(msg);
    if (msg?.type === 'urd-collection-add') handlers.onCollectionAdd?.(msg);
    if (msg?.type === 'urd-open-entry') handlers.onOpenEntry?.(msg);
    if (msg?.type === 'urd-open-panel') handlers.onOpenPanel?.(msg);
    if (msg?.type === 'urd-nav-width') handlers.onNavWidth?.(msg);
    if (msg?.type === 'urd-save-template') handlers.onSaveTemplate?.(msg);
    if (msg?.type === 'urd-sticky-group') handlers.onStickyGroup?.(msg);
    if (msg?.type === 'urd-sticky-dock') handlers.onStickyDock?.(msg);
    if (msg?.type === 'urd-delete-template') handlers.onDeleteTemplate?.(msg);
    if (msg?.type === 'urd-apply-layout') handlers.onApplyLayout?.(msg);
  };
  window.addEventListener('message', listener);

  const post = (msg) => iframe.contentWindow?.postMessage(msg, location.origin);
  /** A send of the draft, held while a saved draft is looked at. */
  const draftPost = (msg) => {
    if (!looking) post(msg);
  };

  return {
    /** Looking at a saved draft in the canvas, or back to this browser's: the caller sends the draft again as the look ends. */
    setLooking(on) {
      looking = on;
    },
    /** The version looked at, in the canvas while the draft's own sends wait: a page, and the site settings it stands in where they are the saved ones. */
    sendLook(pageId, page, site = null) {
      if (site) post({ type: 'urd-site', site });
      if (page) post({ type: 'urd-preview-full', pageId, page });
    },
    sendSection(pageId, section) {
      draftPost({ type: 'urd-preview', pageId, section });
    },
    sendPage(pageId, page) {
      draftPost({ type: 'urd-preview-full', pageId, page });
    },
    sendSite(site) {
      draftPost({ type: 'urd-site', site });
    },
    sendChrome(visible) {
      post({ type: 'urd-chrome', visible });
    },
    /** The Announcement panel: forget the dismissal, so the strip is shown again. */
    sendAnnounceReset() {
      post({ type: 'urd-announce-reset' });
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
      draftPost({ type: 'urd-insert-template', id });
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
    /** Runs a command a plugin registered in the preview (Urd.commands), chosen in the editor's palette. */
    sendRunCommand(id) {
      post({ type: 'urd-run-command', id });
    },
    /** The caret put back in a block's text after an undo of typing, that many characters in. */
    sendCaret(blockId, offset) {
      draftPost({ type: 'urd-caret', blockId, offset });
    },
    /** A section the editor selected itself (new, duplicated or pasted), so the page marks the same one. */
    sendActiveSection(sectionId) {
      draftPost({ type: 'urd-active-section', sectionId });
    },
    /** The last copy or cut, for the page the preview just loaded (a plain object, never a $state proxy). */
    sendClipboard(clipboard) {
      post({ type: 'urd-clipboard', clipboard });
    },
    /** Ctrl+D with focus in the admin panels: duplicate the selected block in the preview. */
    sendDuplicate() {
      draftPost({ type: 'urd-duplicate' });
    },
    sendShowGrid(visible) {
      post({ type: 'urd-show-grid', visible });
    },
    sendShowGuides(visible) {
      post({ type: 'urd-show-guides', visible });
    },
    /** The browser's spell check on the texts while editing, on or off; the clean view turns it off on its own. */
    sendSpellcheck(on) {
      post({ type: 'urd-spellcheck', on });
    },
    /** The admin color theme: the editor menus in the preview follow admin, not the site. */
    sendAdminTheme(colors) {
      post({ type: 'urd-admin-theme', colors });
    },
    /** Select a block on the canvas: one the editor just built, or one `picked` in its lists, brought into view with the focus left in the list. */
    sendSelect(blockId, picked = false) {
      draftPost({ type: 'urd-select', blockId, picked });
    },
    /** Light blocks on the canvas for the row under the pointer in the editor's lists; [] takes the light away. */
    sendLight(ids) {
      post({ type: 'urd-light', ids });
    },
    /** Ask the preview for the height a block's content needs; it answers with urd-grow. */
    sendFitBlock(sectionId, blockId, seq = 0) {
      draftPost({ type: 'urd-fit-block', sectionId, blockId, seq });
    },
    /** Frames fitted to their content (block id to desktop frame) and the section's new height, put in place without drawing the section again. */
    sendFrames(sectionId, frames) {
      draftPost({ type: 'urd-frames', sectionId, frames });
    },
    sendPlaceBlock(block) {
      draftPost({ type: 'urd-place-block', block });
    },
    sendAttention(sectionId, needed) {
      post({ type: 'urd-attention', sectionId, needed });
    },
    /** Scroll the preview to a section (the review marker in the top bar). */
    sendScrollSection(sectionId) {
      post({ type: 'urd-scroll-section', sectionId });
    },
    /** Scroll the preview back to a place: the section at its top and how far past that section's top (a reload, lib/reload-place.js). */
    sendScrollTo(sectionId, offset) {
      post({ type: 'urd-scroll-to', sectionId, offset });
    },
    /** Jump the preview to the spot a link's fragment names, as the published page does on arrival. */
    sendScrollAnchor(hash) {
      post({ type: 'urd-scroll-anchor', hash });
    },
    /** The link editor's answer for the text being edited (a plain object, never a $state proxy). */
    sendLinkApply(link) {
      draftPost({ type: 'urd-link-apply', link });
    },
    /** Play an entrance animation as a demo (blockId null = the section). */
    sendDemoAnim(sectionId, blockId = null) {
      post({ type: 'urd-demo-anim', sectionId, blockId });
    },
    /** Play the ribbons' motion for a few seconds, which stands still while editing. */
    sendDemoMotion() {
      post({ type: 'urd-demo-motion' });
    },
    /** Open an image block's editor in the preview, from its menu. */
    /** A font or a size for the whole text of a block, from its menu. */
    sendTextStyle(blockId, style) {
      draftPost({ type: 'urd-text-style', blockId, style });
    },
    /** Open a plugin block's settings (the config panel) in the preview. */
    sendOpenConfig(blockId) {
      draftPost({ type: 'urd-open-block-config', blockId });
    },
    destroy() {
      window.removeEventListener('message', listener);
    },
  };
}
