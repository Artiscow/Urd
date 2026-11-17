/**
 * The phone view's block bar and menus, drawn by the editor beside the phone (lib/CanvasBar.svelte, 0.7.3.19.2): the selected block's box in the canvas and its bar's tools, and a menu's rows, as the preview tells them (urd-block-bar, urd-ctx-menu).
 * The tools and the rows stay the page's own (preview-edit.js pressPhoneBar, runPhoneMenu): a press here is sent back and acts there, so every tool and row does what it does on the page.
 */
import { previewState } from './preview.svelte.js';

/** The block whose bar stands, or null. */
let blockId = $state(null);
/** Its box in the canvas's own px. */
let rect = $state(null);
/** Its bar's tools, in the bar's order: {html, text, label, tip, pressed, danger, more, help, opensMenu}. */
let tools = $state([]);
/** The menu standing: {label, rows, at, editor, rest}, or null. */
let menu = $state(null);
/** Whether the pointer is on a ⋮ of the page's that opened the menu by a rest. */
let pageHover = $state(false);
/** Where the bar stands in the window, once drawn, for the text bar to stand clear of it: {blockId, left, top, w, h, side}. */
let placed = $state(null);

/** The preview's word on the selected block's bar in the phone view, or that none stands. */
function onBlockBar(msg) {
  blockId = typeof msg?.blockId === 'string' ? msg.blockId : null;
  if (!blockId) {
    rect = null;
    tools = [];
    return;
  }
  if (msg.rect) rect = msg.rect;
  if (Array.isArray(msg.tools)) tools = msg.tools;
}

/** A menu of the phone view to draw. */
function onCtxMenu(msg) {
  if (!Array.isArray(msg?.rows)) return;
  menu = { label: String(msg.label ?? ''), rows: msg.rows, at: msg.at ?? { x: 0, y: 0 }, editor: msg.editor === true, rest: msg.rest === true };
  pageHover = menu.rest && !menu.editor;
}

/** The page closed the menu. */
function onCtxClose() {
  menu = null;
}

/** A menu a rest opened, held by a press on its ⋮: it stays, with the focus on its first row. */
function onCtxHold() {
  if (menu) menu = { ...menu, rest: false };
}

/** The pointer on or off the page's ⋮ that opened the menu by a rest. */
function onCtxHover(msg) {
  pageHover = msg?.over === true;
}

/** A tool of the bar pressed; `rest`, the ⋮ opened by a mouse resting on it. */
function press(index, rest = false) {
  if (blockId) previewState.bridge?.sendBarPress(blockId, index, rest);
}

/** A row of the menu chosen, by its action's place. */
function run(index) {
  menu = null;
  previewState.bridge?.sendCtxRun(index);
}

/** The menu closed here without a choice; `focus`, closed with a key from a menu opened on the page, gives the page's focus back to its block. */
function close(focus = false) {
  if (!menu) return;
  menu = null;
  previewState.bridge?.sendCtxClosed(focus);
}

/** No bar and no menu: a new canvas, or another page. */
function reset() {
  blockId = null;
  rect = null;
  tools = [];
  menu = null;
  placed = null;
}

export const canvasBarState = {
  get blockId() { return blockId; },
  get rect() { return rect; },
  get tools() { return tools; },
  get menu() { return menu; },
  get pageHover() { return pageHover; },
  get placed() { return placed; },
  set placed(v) { placed = v; },
  onBlockBar,
  onCtxMenu,
  onCtxClose,
  onCtxHold,
  onCtxHover,
  press,
  run,
  close,
  reset,
};
