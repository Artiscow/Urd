/**
 * The admin's motion for what opens and closes (AGENTS.md, «Folds and menus open and close smoothly»): a menu or a pop-up slides and fades in and out, and a row that opens in a list grows from nothing and shrinks back; under reduced motion each opens and closes at once.
 * The folds (`details.group`) and the pop-ups in the top layer move by app.css; these are the Svelte transitions for what a block of markup draws and takes away, and the helper that keeps a top-layer pop-up's content drawn while it fades out.
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
