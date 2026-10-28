/**
 * The editor's keyboard shortcuts as the shortcut sheet lists them (ShortcutSheet.svelte), in groups by where they work.
 * Each row names its action by a dictionary key, with a tooltip where the action holds for some blocks only, and lists its ways to press it: a way is a list of tokens pressed together, and a row with more than one way takes any of them.
 * A token is a key's name (KEY_LABELS), an arrow (ARROW_TOKENS, drawn) or the character on the key.
 * The keys are handled where they work: the page in preview-edit.js, the panels in state/shell.svelte.js and the element menu in menu/ElementMenu.svelte; tests/shortcuts.test.mjs holds the list to the dictionaries and to the «?» that opens it.
 */

/** The names of the keys and of the pointer's actions, as dictionary keys; an arrow's name is what a screen reader says for its drawing. */
export const KEY_LABELS = {
  ctrl: 'shortcuts.key.ctrl',
  shift: 'shortcuts.key.shift',
  alt: 'shortcuts.key.alt',
  esc: 'shortcuts.key.esc',
  enter: 'shortcuts.key.enter',
  delete: 'shortcuts.key.delete',
  backspace: 'shortcuts.key.backspace',
  menu: 'shortcuts.key.menu',
  click: 'shortcuts.key.click',
  drag: 'shortcuts.key.drag',
  dragEmpty: 'shortcuts.key.dragEmpty',
  dblclick: 'shortcuts.key.dblclick',
  home: 'shortcuts.key.home',
  end: 'shortcuts.key.end',
  tab: 'shortcuts.key.tab',
  up: 'shortcuts.key.up',
  down: 'shortcuts.key.down',
  arrows: 'shortcuts.key.arrows',
};

/** The pointer's actions, drawn apart from the keys. */
export const POINTER_TOKENS = ['click', 'drag', 'dragEmpty', 'dblclick'];

/** The tokens drawn as arrows: one up, one down, or the four together. */
export const ARROW_TOKENS = ['up', 'down', 'arrows'];

/** The groups in the order the sheet shows them, each with its rows. */
export const SHORTCUT_GROUPS = [
  { id: 'general', labelKey: 'shortcuts.group.general', rows: [
    { labelKey: 'shortcuts.undo', ways: [['ctrl', 'Z']] },
    { labelKey: 'shortcuts.redo', ways: [['ctrl', 'shift', 'Z'], ['ctrl', 'Y']] },
    { labelKey: 'shortcuts.escape', ways: [['esc']] },
    { labelKey: 'shortcuts.sheet', ways: [['?']] },
  ] },
  { id: 'blocks', labelKey: 'shortcuts.group.blocks', tipKey: 'tip.shortcuts.blocks', rows: [
    { labelKey: 'shortcuts.newBlock', ways: [['/']] },
    { labelKey: 'shortcuts.copy', ways: [['ctrl', 'C']] },
    { labelKey: 'shortcuts.paste', ways: [['ctrl', 'V']] },
    { labelKey: 'shortcuts.duplicate', ways: [['ctrl', 'D']] },
    { labelKey: 'shortcuts.delete', ways: [['delete'], ['backspace']] },
    { labelKey: 'shortcuts.nudge', ways: [['arrows']] },
    { labelKey: 'shortcuts.nudgeFine', ways: [['shift', 'arrows']] },
    { labelKey: 'canvas.ctx.toFront', ways: [['ctrl', 'shift', 'up']] },
    { labelKey: 'canvas.ctx.toBack', ways: [['ctrl', 'shift', 'down']] },
    { labelKey: 'shortcuts.copyStyle', ways: [['ctrl', 'alt', 'C']] },
    { labelKey: 'shortcuts.pasteStyle', ways: [['ctrl', 'alt', 'V']] },
    { labelKey: 'shortcuts.contextMenu', ways: [['shift', 'F10'], ['menu']] },
  ] },
  { id: 'text', labelKey: 'shortcuts.group.text', tipKey: 'tip.shortcuts.text', rows: [
    { labelKey: 'shortcuts.bold', ways: [['ctrl', 'B']] },
    { labelKey: 'shortcuts.italic', ways: [['ctrl', 'I']] },
    { labelKey: 'shortcuts.underline', ways: [['ctrl', 'U']] },
    { labelKey: 'shortcuts.link', ways: [['ctrl', 'K']] },
    { labelKey: 'shortcuts.unlink', ways: [['ctrl', 'shift', 'K']] },
  ] },
  { id: 'mouse', labelKey: 'shortcuts.group.mouse', tipKey: 'tip.shortcuts.mouse', rows: [
    { labelKey: 'shortcuts.multi', ways: [['shift', 'click'], ['dragEmpty']] },
    { labelKey: 'shortcuts.free', ways: [['ctrl', 'drag']] },
    { labelKey: 'shortcuts.axis', ways: [['shift', 'drag']] },
    { labelKey: 'shortcuts.ratio', tipKey: 'tip.shortcuts.ratio', ways: [['shift', 'drag']] },
    { labelKey: 'shortcuts.rotate', ways: [['shift', 'drag']] },
    { labelKey: 'shortcuts.sectionHeight', ways: [['ctrl', 'drag']] },
    { labelKey: 'shortcuts.dblBlock', ways: [['dblclick']] },
    { labelKey: 'shortcuts.dblImage', ways: [['dblclick']] },
  ] },
  { id: 'menu', labelKey: 'shortcuts.group.menu', tipKey: 'tip.shortcuts.menu', rows: [
    { labelKey: 'props.tabContent', ways: [['1']] },
    { labelKey: 'props.tabStyle', ways: [['2']] },
    { labelKey: 'props.tabPlacement', ways: [['3']] },
    { labelKey: 'shortcuts.menuSearch', ways: [['/']] },
    { labelKey: 'shortcuts.menuFirst', ways: [['enter']] },
    { labelKey: 'shortcuts.menuEscape', ways: [['esc']] },
  ] },
  { id: 'lists', labelKey: 'shortcuts.group.lists', tipKey: 'tip.shortcuts.lists', rows: [
    { labelKey: 'shortcuts.walk', ways: [['arrows']] },
    { labelKey: 'shortcuts.take', ways: [['enter']] },
    { labelKey: 'shortcuts.close', ways: [['esc']] },
  ] },
  { id: 'context', labelKey: 'shortcuts.group.context', rows: [
    { labelKey: 'shortcuts.ctxWalk', ways: [['up'], ['down']] },
    { labelKey: 'shortcuts.ctxEnds', ways: [['home'], ['end']] },
    { labelKey: 'shortcuts.ctxChoose', ways: [['enter']] },
    { labelKey: 'shortcuts.close', ways: [['esc'], ['tab']] },
  ] },
];

/**
 * Whether a key press in the panels opens the shortcut sheet: «?» with no Ctrl, Cmd or Alt, outside a place where it is typed.
 * The page asks the same in its own key handler (preview-edit.js), which then sends `urd-shortcuts`.
 * @param {{ key: string, ctrlKey: boolean, metaKey: boolean, altKey: boolean }} event
 * @param {boolean} inField The focus stands where text is typed (a field, a text area, an editable text)
 */
export function opensShortcuts(event, inField) {
  return event.key === '?' && !event.ctrlKey && !event.metaKey && !event.altKey && !inField;
}
