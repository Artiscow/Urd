/**
 * Where the admin's large scrolling windows were left (each side panel, each block's and section's element menu, the design picker for each kind of design, and the Collections table for each collection), kept for the tab's life (sessionStorage), so a reload opens each where it was; a new tab starts every window at its top.
 * The Urd settings keep their own place the same way (settings/keep-place.js).
 */

const KEY = 'urd-admin-places';

/** The places kept before a reload, each a window's key and its place; none without storage. */
function keptPlaces() {
  try {
    const kept = JSON.parse(sessionStorage.getItem(KEY) ?? '[]');
    return Array.isArray(kept) ? kept.filter((entry) => Array.isArray(entry) && typeof entry[0] === 'string' && Number.isFinite(entry[1]) && entry[1] > 0) : [];
  } catch {
    return [];
  }
}

/** The place per window, in px from its top. */
const places = new Map(keptPlaces());

// The places are written as the admin is left (a reload or a closed tab), not at every scroll.
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('pagehide', () => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify([...places]));
    } catch {
      /* The storage is blocked or full: the windows start at their top. */
    }
  });
}

/** What ends the way back before it is done: the owner's own wheel, press or key. */
const OWNER = ['wheel', 'pointerdown', 'keydown', 'touchstart'];

/**
 * An attachment for a scrolling window: it scrolls back to the place kept under `key` as the window's content is drawn, and keeps the place as it scrolls; a window with no place kept stands at its top.
 * The content can arrive over a few frames, so the way back is tried each frame until it lands, for half a second at most; the owner's own scroll ends it at once, and so does a scroll the editor makes itself (a fold brought into view), seen as the window standing where the way back did not put it. A window that is no longer drawn keeps the place it had.
 * Svelte runs it anew when `key` changes, where one window shows other content (another panel, another block).
 * @param {string|null} key The window and what it shows; null keeps nothing
 * @returns {(node: HTMLElement) => (() => void) | undefined}
 */
export function keepScroll(key) {
  return (node) => {
    if (!key) return undefined;
    const wanted = places.get(key) ?? 0;
    const started = performance.now();
    let settled = false;
    let frame = 0;
    /** Where the way back put the window last, as the browser kept it. */
    let put = 0;
    const back = () => {
      frame = 0;
      node.scrollTop = wanted;
      put = node.scrollTop;
      if (Math.abs(put - wanted) < 1 || performance.now() - started > 500) settled = true;
      else frame = requestAnimationFrame(back);
    };
    back();
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      settled = true;
    };
    // A window no longer drawn (a dialog closing, a panel hidden) loses its scroll to the browser, which is no place of the owner's.
    const keep = () => {
      if (!node.isConnected || !node.clientHeight) return;
      if (!settled && Math.abs(node.scrollTop - put) > 1) stop();
      if (!settled) return;
      if (node.scrollTop > 0) places.set(key, node.scrollTop);
      else places.delete(key);
    };
    node.addEventListener('scroll', keep, { passive: true });
    for (const type of OWNER) node.addEventListener(type, stop, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener('scroll', keep);
      for (const type of OWNER) node.removeEventListener(type, stop);
    };
  };
}
