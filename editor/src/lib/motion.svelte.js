/**
 * The admin's motion for what opens and closes (AGENTS.md, «Folds and menus open and close smoothly»): a menu or a pop-up slides and fades in and out, and a row that opens in a list grows from nothing and shrinks back; under reduced motion each opens and closes at once.
 * The folds (`details.group`) and the pop-ups in the top layer move by app.css; these are the Svelte transitions for what a block of markup draws and takes away, the helper that keeps a top-layer pop-up's content drawn while it fades out, and the dialogs' fade out.
 */
import { fly, slide } from 'svelte/transition';

/** How long a pop-up in the top layer takes to fade out (app.css); its content stays drawn that long. */
export const POP_OUT_MS = 150;

const still = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A menu or a pop-up a block draws: it slides down a little and fades in, and back out. */
export function menuMotion(node, params = {}) {
  return fly(node, { y: -6, duration: still() ? 0 : 150, ...params });
}

/** A row that opens in a list: its body grows from nothing to its height, and shrinks back. */
export function rowMotion(node, params = {}) {
  return slide(node, { duration: still() ? 0 : 200, ...params });
}

/**
 * A top-layer pop-up's content, kept drawn through its closing fade: `shown` turns true as soon as the pop-up opens, and false POP_OUT_MS after it closes, so the pop-up never fades out empty.
 * Called while a component is set up.
 * @param {() => boolean} isOpen
 * @returns {{readonly shown: boolean}}
 */
export function lingering(isOpen) {
  let shown = $state(false);
  $effect(() => {
    if (isOpen()) {
      shown = true;
      return;
    }
    const timer = setTimeout(() => { shown = false; }, POP_OUT_MS);
    return () => clearTimeout(timer);
  });
  return { get shown() { return shown; } };
}

/** How long a closing dialog's fade takes, read from its own transition (app.css `dialog.dx.dx-closing`); none under reduced motion. */
function fadeMs(node) {
  if (still()) return 0;
  const style = getComputedStyle(node);
  if (style.transitionProperty === 'none') return 0;
  const ms = style.transitionDuration.split(',').map((d) => Number.parseFloat(d) * (d.trim().endsWith('ms') ? 1 : 1000));
  return Math.max(0, ...ms.filter(Number.isFinite));
}

/**
 * An admin dialog (`class="dx"`, `dx-large` for a large one) that fades out before it closes: its own close() first fades it and its backdrop (app.css), then closes it, so every way out that closes the dialog (its buttons, a press on the backdrop) fades, and what follows a close (the focus given back, a command run, the picker's choice applied) waits in the dialog's `close` event.
 * Escape takes the same way where the dialog's own `cancel` handler has not taken it; its listener is added after the component's own, so a handler that takes Escape is asked first. Where the browser lets no page hold Escape (a close request without a user's press since the dialog opened, as close watchers specify), the dialog closes at once.
 * The opening fades by app.css (`@starting-style`). An action: `use:fadingDialog`, with `out:dialogOut|global` beside it for a dialog taken away while it is open.
 * @param {HTMLDialogElement} node
 */
export function fadingDialog(node) {
  const close = HTMLDialogElement.prototype.close;
  let timer = 0;
  node.close = (value) => {
    if (!node.open || node.classList.contains('dx-closing')) return;
    node.classList.add('dx-closing');
    const finish = () => {
      close.call(node, value);
      node.classList.remove('dx-closing');
    };
    const ms = fadeMs(node);
    if (ms) timer = setTimeout(finish, ms);
    else finish();
  };
  const onCancel = (event) => {
    if (event.defaultPrevented) return;
    event.preventDefault();
    node.close();
  };
  let gone = false;
  queueMicrotask(() => { if (!gone) node.addEventListener('cancel', onCancel); });
  return {
    destroy() {
      gone = true;
      clearTimeout(timer);
      node.removeEventListener('cancel', onCancel);
      delete node.close;
    },
  };
}

/**
 * A dialog a block takes away while it is open (its state cleared, or a dialog closed by another opening): it fades out with its backdrop before it leaves, as its close() does.
 * The block waits two frames longer than the fade, so a close() running beside it closes the dialog first and the browser gives the focus back; a block drawn again during the fade takes the class off (Svelte's reset ticks 1).
 */
export function dialogOut(node) {
  if (!node.open) return { duration: 0 };
  const ms = fadeMs(node);
  if (!ms) return { duration: 0 };
  node.classList.add('dx-closing');
  return { duration: ms + 40, tick: (t) => node.classList.toggle('dx-closing', t < 1) };
}
