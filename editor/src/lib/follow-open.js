/**
 * Keeps what has just opened in view in the window it scrolls in: as a fold or a list opens downward past the window's foot, the window scrolls along with it while it grows, never so far that the opened thing's own top leaves the window.
 * Its top stays below the window's top by its own scroll margin where it has one larger than the edge (a sticky heading above it).
 * It follows for the length of the opening (a fold's motion in app.css, a row's in lib/motion.svelte.js) with a margin, and the owner's own wheel, touch, press or key stops it at once.
 * With reduced motion the opening is at once, and the first frame brings it into view.
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
