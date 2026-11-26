/**
 * How the admin's buttons answer a press («Button press»): the six feels, the stored one read back, and the ripple; the feel stands as `data-press` on the root.
 */

/** The feels, Ripple the default. */
export const PRESS_FEELS = ['ripple', 'press', 'nudge', 'sink', 'ring', 'spring'];

/** The stored feel, Ripple for anything else. */
export function pressFeelOf(raw) {
  return PRESS_FEELS.includes(raw) ? raw : 'ripple';
}

/** The controls a press reaches: a button or a ghost control, not disabled, outside the pickers that draw their own (as the shell's button rules). */
export const PRESS_TARGET = 'button:not(:disabled), .ghost';
const OWN_PRESS = '.dd, .cp, .gp, .mp, .dp-overlay, .choice';

/** The control a pointer press landed on, or null. */
export function pressTarget(node) {
  const control = node instanceof Element ? node.closest(PRESS_TARGET) : null;
  if (!control || control.closest(OWN_PRESS) !== null) return null;
  return control;
}

/** The rings running on each control, and the position a control not positioned had before the first of them made it a containing block. */
const running = new WeakMap();

/**
 * The ripple: a ring from the pressed point inside the control's shape; a control not positioned is made a containing block while its rings run.
 * @param {Element} control
 * @param {{clientX: number, clientY: number}} point
 */
export function ripple(control, point) {
  const box = control.getBoundingClientRect();
  const layer = document.createElement('span');
  layer.className = 'urd-ripple';
  layer.setAttribute('aria-hidden', 'true');
  const ring = document.createElement('span');
  ring.className = 'urd-ripple-ring';
  ring.style.left = `${point.clientX - box.left}px`;
  ring.style.top = `${point.clientY - box.top}px`;
  layer.append(ring);
  let held = running.get(control);
  if (!held) {
    const placed = getComputedStyle(control).position !== 'static';
    held = { count: 0, placed, before: control.style.position };
    if (!placed) control.style.position = 'relative';
    running.set(control, held);
  }
  held.count += 1;
  control.append(layer);
  ring.addEventListener('animationend', () => {
    layer.remove();
    held.count -= 1;
    if (held.count > 0) return;
    running.delete(control);
    if (!held.placed) control.style.position = held.before;
  }, { once: true });
}
