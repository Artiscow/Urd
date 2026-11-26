/**
 * The text bar's state (lib/TextToolbar.svelte): the text being written on the canvas (urd-text-state), its block's box and selection, and the commands back.
 */
import { previewState } from './preview.svelte.js';

/** The block of the text being written, or null while none is. */
let blockId = $state(null);
/** Its block's box in the canvas's own px, its bar above it included. */
let rect = $state(null);
/** What the selection holds: {level, quote, marks, size, font, colour, highlight, linkable}. */
let selection = $state(null);

/** The preview's word on the text being written: its place and its selection, or none (blockId null). */
function onTextState(msg) {
  blockId = typeof msg?.blockId === 'string' ? msg.blockId : null;
  rect = blockId && msg.rect ? msg.rect : null;
  selection = blockId && msg.state ? msg.state : null;
}

/** A command of the bar on the text's selection; `focus` hands the focus back to the text, for the owner to go on typing. */
function run(cmd, value = null, focus = false) {
  previewState.bridge?.sendTextCommand(cmd, value, focus);
}

/** The writing ended from the editor: a press outside the bar. */
function end() {
  if (!blockId) return;
  previewState.bridge?.sendTextEnd();
  reset();
}

/** No text written: a new canvas, or another page. */
function reset() {
  blockId = null;
  rect = null;
  selection = null;
}

export const textBarState = {
  get blockId() { return blockId; },
  get rect() { return rect; },
  get selection() { return selection; },
  onTextState,
  run,
  end,
  reset,
};
