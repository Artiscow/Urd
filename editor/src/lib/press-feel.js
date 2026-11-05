/**
 * How the admin's buttons answer a press (Urd settings «Button press»): the six feels, the stored one read back, and the ripple, the one feel that needs a script.
 * The feel stands as `data-press` on the document's root; app.css holds the rules for every button and ghost control. Movement uses the separate `translate` and `scale` properties, which add to a control's own transform instead of replacing it, so a control placed by a transform keeps its place.
 * Pure but for `ripple`, which draws on the page; node-tested (tests/press-feel.test.mjs).
 */

/** The feels, Ripple the default. */
export const PRESS_FEELS = ['ripple', 'press', 'nudge', 'sink', 'ring', 'spring'];

/** The stored feel, Ripple for anything else. */
export function pressFeelOf(raw) {
  return PRESS_FEELS.includes(raw) ? raw : 'ripple';
}

/** The controls a press reaches: a button or a ghost control, not disabled, outside the pickers that draw their own (the same exclusions as the shell's button rules). */
export const PRESS_TARGET = 'button:not(:disabled), .ghost';
const OWN_PRESS = '.dd, .cp, .gp, .mp, .dp-overlay, .ie-overlay, .choice';

/** The control a pointer press landed on, or null. */
export function pressTarget(node) {
  const control = node instanceof Element ? node.closest(PRESS_TARGET) : null;
  if (!control || control.closest(OWN_PRESS) !== null) return null;
  return control;
}

/** The rings running on each control, and the position a control not positioned had before the first of them made it a containing block. */
const running = new WeakMap();

/**
 * The ripple: a ring from where the pointer pressed, inside the control's own shape, gone when it has spread.
 * A control that is not positioned is made a containing block while its rings run, and given back as it was when the last of them ends, so a quick second press never loses its ring's place.
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
