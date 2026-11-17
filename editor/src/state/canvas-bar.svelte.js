/**
 * The phone view's bars and menus, drawn by the editor beside the phone (lib/CanvasBar.svelte): the selected block's bar (0.7.3.19.2) and the section's (0.7.3.23), each with its box in the canvas and its tools, and a menu's rows, as the preview tells them (urd-block-bar, urd-section-bar, urd-ctx-menu).
 * The tools and the rows stay the page's own (preview-edit.js pressPhoneBar, runPhoneMenu): a press here is sent back and acts there, so every tool and row does what it does on the page.
 */
import { previewState } from './preview.svelte.js';

/** A bar as the preview tells it: its block's or section's id, its box in the canvas's own px, and its tools in the bar's order ({html, text, label, tip, pressed, danger, more, help, opensMenu}). */
const none = () => ({ id: null, rect: null, tools: [] });

/** The selected block's bar, and the section's. */
let block = $state(none());
let section = $state(none());
/** The menu standing: {label, rows, at, editor, rest}, `editor` the bar whose ⋮ opened it ('block' or 'section') or false, or null. */
let menu = $state(null);
/** Whether the pointer is on a ⋮ of the page's that opened the menu by a rest. */
let pageHover = $state(false);
/** Where each bar stands in the window, once drawn, for the text bar and the review cards to stand clear of it: {id, left, top, w, h, side}. */
let placed = $state(null);
let sectionPlaced = $state(null);

/** A bar's word from the preview: where it stands and its tools, or that none stands (its id null). */
function told(bar, msg, key) {
  const id = typeof msg?.[key] === 'string' ? msg[key] : null;
  if (!id) return none();
  return { id, rect: msg.rect ?? bar.rect, tools: Array.isArray(msg.tools) ? msg.tools : bar.id === id ? bar.tools : [] };
}

function onBlockBar(msg) {
  block = told(block, msg, 'blockId');
}

function onSectionBar(msg) {
  section = told(section, msg, 'sectionId');
}

/** A menu of the phone view to draw. */
function onCtxMenu(msg) {
  if (!Array.isArray(msg?.rows)) return;
  const editor = msg.editor === 'block' || msg.editor === 'section' ? msg.editor : false;
  menu = { label: String(msg.label ?? ''), rows: msg.rows, at: msg.at ?? { x: 0, y: 0 }, editor, rest: msg.rest === true };
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

/** A tool of a bar pressed ('block' or 'section'); `rest`, the ⋮ opened by a mouse resting on it. */
function press(kind, index, rest = false) {
  const id = kind === 'section' ? section.id : block.id;
  if (id) previewState.bridge?.sendBarPress(kind, id, index, rest);
}

/** A row of the menu chosen, by its action's place. */
function run(index) {
  menu = null;
  previewState.bridge?.sendCtxRun(index);
}

/** The menu closed here without a choice; `focus`, closed with a key, gives the page's focus back to the block or section it was opened on. */
function close(focus = false) {
  if (!menu) return;
  menu = null;
  previewState.bridge?.sendCtxClosed(focus);
}

/** No bar and no menu: a new canvas, or another page. */
function reset() {
  block = none();
  section = none();
  menu = null;
  placed = null;
  sectionPlaced = null;
}

export const canvasBarState = {
  get block() { return block; },
  get section() { return section; },
  /** The selected block's id, for the text bar's place. */
  get blockId() { return block.id; },
  get menu() { return menu; },
  get pageHover() { return pageHover; },
  get placed() { return placed; },
  set placed(v) { placed = v; },
  get sectionPlaced() { return sectionPlaced; },
  set sectionPlaced(v) { sectionPlaced = v; },
  onBlockBar,
  onSectionBar,
  onCtxMenu,
  onCtxClose,
  onCtxHold,
  onCtxHover,
  press,
  run,
  close,
  reset,
};
