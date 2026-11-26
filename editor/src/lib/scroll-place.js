/**
 * Where the admin's large scrolling windows were left, kept for the tab's life in sessionStorage, so a reload opens each where it was.
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
 * An attachment that scrolls a window back to the place kept under `key`, trying each frame for half a second, and keeps the place as the window scrolls.
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
    // A window not drawn, a dialog closing or a panel hidden, keeps the place it had; a scroll the way back did not make ends it.
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
