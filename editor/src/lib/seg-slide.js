/**
 * The segment controls' slide (0.7.10.9): when a click moves the choice of a segment control (`.seg`, and Choice's `.choice-seg`), the pill of the newly chosen button starts where the old pill stood and slides into place.
 * The pill is the `::before` layer of the button marked `on` (app.css, Choice.svelte), so only the pill moves and the words stay put.
 * The slide moves the pill's edges, not a transform, so the browser paints it in place and the panel scrolling around it never gets a layer of its own.
 * One listener on the document serves every segment control in the editor; under reduced motion the pill moves at once.
 * The geometry is pure (slideFrom) and node-tested; the listener needs a DOM.
 */

const round = (n) => Math.round(n * 10) / 10;

/**
 * The insets that draw a pill laid out over the box `to` where the box `from` stands; null when the boxes match.
 * @param {{left: number, top: number, width: number, height: number}} from
 * @param {{left: number, top: number, width: number, height: number}} to
 * @returns {{left: string, top: string, right: string, bottom: string}|null}
 */
export function slideFrom(from, to) {
  const left = from.left - to.left;
  const top = from.top - to.top;
  const right = (to.left + to.width) - (from.left + from.width);
  const bottom = (to.top + to.height) - (from.top + from.height);
  if ([left, top, right, bottom].every((n) => Math.abs(n) < 0.5)) return null;
  return { left: `${round(left)}px`, top: `${round(top)}px`, right: `${round(right)}px`, bottom: `${round(bottom)}px` };
}

/** The segment control a click landed in, or null. */
function segOf(target) {
  const button = target instanceof Element ? target.closest('button') : null;
  const seg = button?.parentElement;
  return seg?.matches('.seg, .choice-seg') ? seg : null;
}

/**
 * Lets the pill slide in every segment control under `root`.
 * The listener runs in the capture phase, so it reads the old choice before the click changes it.
 * @param {Document|HTMLElement} [root]
 */
export function installSegSlide(root = document) {
  // Without animations of a pseudo-element the whole button would move, words and all, so the pill then stands in its place at once.
  if (typeof KeyframeEffect === 'undefined' || !('pseudoElement' in KeyframeEffect.prototype)) return;
  const still = window.matchMedia('(prefers-reduced-motion: reduce)');
  root.addEventListener('click', (event) => {
    if (still.matches) return;
    const seg = segOf(event.target);
    const before = seg?.querySelector(':scope > button.on');
    if (!before) return;
    const from = before.getBoundingClientRect();
    requestAnimationFrame(() => {
      const now = seg.querySelector(':scope > button.on');
      if (!now || now === before || !now.isConnected) return;
      const move = slideFrom(from, now.getBoundingClientRect());
      if (!move) return;
      now.animate([move, { left: '0px', top: '0px', right: '0px', bottom: '0px' }], { duration: 220, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', pseudoElement: '::before' });
    });
  }, true);
}
