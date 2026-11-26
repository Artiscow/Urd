/**
 * The preview bridge: the editor drives the real page in an iframe over postMessage (ADR-0001).
 * docs/ARCHITECTURE.md lists the messages, «The preview's messages».
 */

/** The page's messages that still reach the editor while a saved draft is looked at, none of which changes the draft. */
const LOOK_PASSES = new Set(['urd-ready', 'urd-shown', 'urd-navigate', 'urd-shortcuts', 'urd-palette', 'urd-save-key', 'urd-commands', 'urd-plugin-blocks', 'urd-toggle-grid', 'urd-attention-cards', 'urd-block-bar', 'urd-section-bar', 'urd-nav-bar', 'urd-ctx-close']);

/**
 * @param {HTMLIFrameElement} iframe The iframe showing the page with ?preview=1
 * @param {{onEdit?: Function, onMove?: Function, onDelete?: Function, onAddSection?: Function, onMoveSection?: Function, onDeleteSection?: Function}} [handlers]
 * @returns {{sendSection(pageId: string, section: object): void, sendPage(pageId: string, page: object): void, sendSite(site: object): void, destroy(): void}}
 */
export function createPreviewBridge(iframe, handlers = {}) {
  /** While a saved draft is looked at in the canvas: the draft's own sends wait, and the page's edits are dropped. */
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
    if (msg?.type === 'urd-section-phone-room') handlers.onSectionPhoneRoom?.(msg);
    if (msg?.type === 'urd-undo') handlers.onUndo?.(msg);
    if (msg?.type === 'urd-select-section') handlers.onSelectSection?.(msg);
    if (msg?.type === 'urd-select-block') handlers.onSelectBlock?.(msg);
    if (msg?.type === 'urd-hover-block') handlers.onHoverBlock?.(msg);
    if (msg?.type === 'urd-text-state') handlers.onTextState?.(msg);
    if (msg?.type === 'urd-block-bar') handlers.onBlockBar?.(msg);
    if (msg?.type === 'urd-section-bar') handlers.onSectionBar?.(msg);
    if (msg?.type === 'urd-nav-bar') handlers.onNavBar?.(msg);
    if (msg?.type === 'urd-ctx-menu') handlers.onCtxMenu?.(msg);
    if (msg?.type === 'urd-ctx-close') handlers.onCtxClose?.(msg);
    if (msg?.type === 'urd-ctx-hold') handlers.onCtxHold?.(msg);
    if (msg?.type === 'urd-ctx-hover') handlers.onCtxHover?.(msg);
    if (msg?.type === 'urd-menu-area') handlers.onMenuArea?.(msg);
    if (msg?.type === 'urd-block-menu') handlers.onBlockMenu?.(msg);
    if (msg?.type === 'urd-section-menu') handlers.onSectionMenu?.(msg);
    if (msg?.type === 'urd-block-design') handlers.onBlockDesign?.(msg);
    if (msg?.type === 'urd-redraw-section') handlers.onRedrawSection?.(msg);
    if (msg?.type === 'urd-edit-on-phone') handlers.onEditOnPhone?.(msg);
    if (msg?.type === 'urd-plugin-blocks') handlers.onPluginBlocks?.(msg);
    if (msg?.type === 'urd-ready') handlers.onReady?.(msg);
    if (msg?.type === 'urd-shown') handlers.onShown?.(msg);
    if (msg?.type === 'urd-navigate') handlers.onNavigate?.(msg);
    if (msg?.type === 'urd-link-edit') handlers.onLinkEdit?.(msg);
    if (msg?.type === 'urd-add-block') handlers.onAddBlock?.(msg);
    if (msg?.type === 'urd-new-fitted') handlers.onNewFitted?.(msg);
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
    if (msg?.type === 'urd-too-narrow') handlers.onTooNarrow?.(msg);
    if (msg?.type === 'urd-attention-cards') handlers.onAttentionCards?.(msg);
    if (msg?.type === 'urd-phone-seen') handlers.onPhoneSeen?.(msg);
    if (msg?.type === 'urd-phone-unpin') handlers.onPhoneUnpin?.(msg);
    if (msg?.type === 'urd-phone-layout') handlers.onPhoneLayout?.(msg);
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
    /** The version looked at, sent while the draft's own sends wait: a page with the saved site settings where there are any, in one message. */
    sendLook(pageId, page, site = null) {
      if (site) post({ type: 'urd-site', site, ...(page ? { page } : {}) });
      else if (page) post({ type: 'urd-preview-full', pageId, page });
    },
    sendSection(pageId, section) {
      draftPost({ type: 'urd-preview', pageId, section });
    },
    /** The page; `startup` marks the send made as the preview reports ready, which the preview skips where it already drew the same page. */
    sendPage(pageId, page, { startup = false } = {}) {
      draftPost({ type: 'urd-preview-full', pageId, page, ...(startup ? { startup } : {}) });
    },
    sendSite(site, { startup = false, page = null } = {}) {
      draftPost({ type: 'urd-site', site, ...(page ? { page } : {}), ...(startup ? { startup } : {}) });
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
    sendViewport(mode, { startup = false } = {}) {
      post({ type: 'urd-viewport', mode, ...(startup ? { startup } : {}) });
    },
    /** The canvas zoom, so the editing handles keep the admin panels' size on the screen at any zoom. */
    sendZoom(scale) {
      post({ type: 'urd-zoom', scale });
    },
    /** The editor's start is sent: the preview answers urd-shown with the same round once it has drawn it and the drawing is painted. */
    sendStartupDone(round) {
      post({ type: 'urd-startup-done', round });
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
    sendLight(ids, sectionId = undefined) {
      post({ type: 'urd-light', ids, ...(sectionId ? { sectionId } : {}) });
    },
    /** A block's words written on the page, its props and the phone's own words (null where it has none), for the page's copy of the section, without drawing it again. */
    sendBlockWords(sectionId, blockId, props, phoneProps) {
      draftPost({ type: 'urd-block-words', sectionId, blockId, props, phoneProps });
    },
    /** «Same height» for a section on the phone: the preview posts its lines' heights back (urd-phone-layout); `follow` where they belong to a preset's step. */
    sendPhoneSameHeight(sectionId, follow = false) {
      post({ type: 'urd-phone-same-height', sectionId, follow });
    },
    /** Pins the block on the phone where it stands now (the Phone panel's row menu). */
    sendPhonePin(blockId) {
      post({ type: 'urd-phone-pin', blockId });
    },
    /** «Open the image editor» in the block's menu: opens it on the block's picture as a press on it does, measured as drawn. */
    sendAskPicture(sectionId, blockId, kind) {
      post({ type: 'urd-ask-picture', sectionId, blockId, kind });
    },
    /** Nothing selected on the canvas: no block, no set of blocks and no section at work. */
    sendDeselect() {
      post({ type: 'urd-deselect' });
    },
    /** A command of the text bar on the text being written; `focus` hands the focus back to the text. */
    sendTextCommand(cmd, value = null, focus = false) {
      post({ type: 'urd-text-cmd', cmd, value, focus: Boolean(focus) });
    },
    /** The writing of the text ended from the editor. */
    sendTextEnd() {
      post({ type: 'urd-text-end' });
    },
    /** A tool pressed on a bar beside the phone: the page presses it on the block's or section's own bar (`bar`, `id`); `rest`, the ⋮ opened by a resting mouse. */
    sendBarPress(bar, id, index, rest = false) {
      post({ type: 'urd-bar-press', bar, id, index, rest: Boolean(rest) });
    },
    /** A section's settings opened from the editor's own lists (the Phone panel), as the gear on its bar opens them. */
    sendSectionSettings(sectionId) {
      post({ type: 'urd-section-settings', sectionId });
    },
    /** A row of the phone view's menu chosen: the page runs it. */
    sendCtxRun(index) {
      post({ type: 'urd-ctx-run', index });
    },
    /** The phone view's menu closed in the editor without a choice; `focus`, closed with a key, gives the page's focus back to its block. */
    sendCtxClosed(focus = false) {
      post({ type: 'urd-ctx-closed', focus: Boolean(focus) });
    },
    /** Ask the preview for the height a block's content needs; it answers with urd-grow. */
    sendFitBlock(sectionId, blockId, seq = 0) {
      draftPost({ type: 'urd-fit-block', sectionId, blockId, seq });
    },
    /** Asks for a new block's box fitted to what it draws at the width it was added at (`w`, percent), before its section is sent; answered with urd-new-fitted. */
    sendFitNew(sectionId, blockId, w) {
      draftPost({ type: 'urd-fit-new', sectionId, blockId, w });
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
