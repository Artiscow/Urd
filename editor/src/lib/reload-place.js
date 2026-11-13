/**
 * Where the admin stood, kept for the tab's life (sessionStorage) so a reload comes back to it: the device, the section or the block selected, and where the canvas was scrolled, as the section at its top and how far past that section's top.
 * The page stands in the address (`?page=`, selectPage in state/page.svelte.js), the open panel in «Open panel» (lib/panels-start.js) and each window's own scroll in lib/scroll-place.js; a dragged width is not kept, since the sizes to come back to are the devices'.
 * Pure but for the storage, node-tested (tests/reload-place.test.mjs).
 */

const KEY = 'urd-admin-stood';

/** An id as the pages, sections and blocks carry them. */
const ID = /^[A-Za-z0-9_-]{1,64}$/;

const idOf = (value) => (typeof value === 'string' && ID.test(value) ? value : null);

/**
 * What a reload can use of what was kept, each part checked: the page it was kept on, the device among the devices, the selection and the canvas's place.
 * @param {unknown} raw
 * @param {string[]} devices The devices' ids
 * @returns {{ page: string|null, device: string|null, sectionId: string|null, blockId: string|null, top: { sectionId: string, offset: number }|null }}
 */
export function stoodOf(raw, devices) {
  const kept = raw && typeof raw === 'object' ? raw : {};
  const topId = idOf(kept.top?.sectionId);
  return {
    page: idOf(kept.page),
    device: devices.includes(kept.device) ? kept.device : null,
    sectionId: idOf(kept.sectionId),
    blockId: idOf(kept.blockId),
    top: topId && Number.isFinite(kept.top.offset) ? { sectionId: topId, offset: Math.max(0, Math.round(kept.top.offset)) } : null,
  };
}

/** What was kept, or null without it or without storage. */
export function readStood() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? 'null');
  } catch {
    return null;
  }
}

/** Keeps where the admin stands; without storage a reload starts as a fresh admin does. */
export function keepStood(value) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* The storage is blocked or full: nothing is kept. */
  }
}

/**
 * The section at the top of the canvas and how far the canvas stands past that section's top, measured as the preview's jump measures it (spotTop in urd.js: the layout top, under the page's scroll padding); null at the page's top or before a section is drawn.
 * @param {Document|null|undefined} doc The canvas's document
 * @returns {{ sectionId: string, offset: number }|null}
 */
export function canvasTop(doc) {
  const win = doc?.defaultView;
  if (!win || win.scrollY <= 0) return null;
  const clear = parseFloat(win.getComputedStyle(doc.documentElement).scrollPaddingTop) || 0;
  let found = null;
  for (const el of doc.querySelectorAll('.urd-section[data-section-id]')) {
    let top = 0;
    for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
    const at = Math.max(0, top - clear);
    if (at > win.scrollY + 1) break;
    found = { sectionId: el.dataset.sectionId, offset: Math.round(win.scrollY - at) };
  }
  return found && idOf(found.sectionId) ? found : null;
}
