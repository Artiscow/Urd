/**
 * The admin's motion for what a block of markup opens and closes, a pop-up kept drawn through its fade, and the dialogs' fade.
 * Reduced motion makes each instant.
 */
import { fly, slide } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

/** How long a pop-up in the top layer takes to fade out (app.css); its content stays drawn that long. */
export const POP_OUT_MS = 150;

const still = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A card's fold in a list (lib/rows/CardList.svelte): its height grows from nothing and shrinks back, its content clipped, so the cards under it move with it. */
export function cardFold(node) {
  const height = node.offsetHeight;
  return { duration: still() ? 0 : 160, easing: cubicOut, css: (t) => `height: ${t * height}px; overflow: clip;` };
}

/** A menu or a pop-up a block draws: it slides down a little and fades in, and back out. */
export function menuMotion(node, params = {}) {
  const { duration, ...rest } = params;
  return fly(node, { y: -6, duration: still() ? 0 : (duration ?? 150), ...rest });
}

/** A column at the stage's edge (panels/phone/PhoneDock.svelte): its width grows from nothing to its own and shrinks back, its content clipped to it. */
export function dockMotion(node, params = {}) {
  return slide(node, { axis: 'x', duration: still() ? 0 : 200, ...params });
}

/** A row that opens in a list: its body grows from nothing to its height, and shrinks back. */
export function rowMotion(node, params = {}) {
  return slide(node, { duration: still() ? 0 : 200, ...params });
}

/**
 * A top-layer pop-up's content, kept drawn through its fade: `shown` is true while it is open and for POP_OUT_MS after.
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
 * An admin dialog (`class="dx"`) whose close(), and Escape, fade it and its backdrop out first; what follows waits in its `close` event.
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
 * A dialog a block takes away while it is open: it fades out with its backdrop, as its close() does, two frames longer.
 */
export function dialogOut(node) {
  if (!node.open) return { duration: 0 };
  node.classList.add('dx-closing');
  const ms = fadeMs(node);
  if (!ms) {
    node.classList.remove('dx-closing');
    return { duration: 0 };
  }
  return { duration: ms + 40, tick: (t) => node.classList.toggle('dx-closing', t < 1) };
}
