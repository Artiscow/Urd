/**
 * Scrolls a fold or list opening past the window's foot along as it grows, its top kept in view.
 * The owner's wheel, touch, press or key stops it.
 */

/** How long it follows, in ms: the fold's 0.24 s opening with room to spare. */
const SPAN = 450;
/** How far from the window's edge what opened comes to rest, in px. */
const EDGE = 12;
const OWNER = ['wheel', 'touchstart', 'pointerdown', 'keydown'];

/** The nearest box around `node` that scrolls up and down, or null while none scrolls yet. */
function scrollerOf(node) {
  for (let el = node.parentElement; el; el = el.parentElement) {
    const { overflowY } = getComputedStyle(el);
    if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) return el;
  }
  return null;
}

/**
 * Follows `node` into view as it opens.
 * @param {Element | null | undefined} node What opened: a fold (details.group), the foot of one with its list, or a capability's card just added
 */
export function followOpen(node) {
  if (!node) return;
  const started = performance.now();
  let frame = 0;
  let scroller = null;
  const top = Math.max(EDGE, parseFloat(getComputedStyle(node).scrollMarginTop) || 0);
  const off = () => {
    cancelAnimationFrame(frame);
    for (const type of OWNER) window.removeEventListener(type, off, true);
  };
  const step = () => {
    scroller ??= scrollerOf(node);
    if (scroller && node.isConnected) {
      const box = node.getBoundingClientRect();
      const view = scroller.getBoundingClientRect();
      // As far as its foot needs, and no further than its top allows.
      const by = Math.min(box.bottom - (view.bottom - EDGE), box.top - (view.top + top));
      if (by > 0.5) scroller.scrollTop += by;
    }
    if (performance.now() - started < SPAN && node.isConnected) frame = requestAnimationFrame(step);
    else off();
  };
  for (const type of OWNER) window.addEventListener(type, off, { capture: true, passive: true });
  frame = requestAnimationFrame(step);
}
