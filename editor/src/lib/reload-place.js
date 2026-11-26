/**
 * Where the admin stood, kept in sessionStorage for a reload: the device, a dragged width, the selection, and the canvas's scroll as its top section and offset.
 */

import { FREE_WIDTH_MIN, FREE_WIDTH_MAX } from './preview-width.js';

const KEY = 'urd-admin-stood';

/** An id as the pages, sections and blocks carry them. */
const ID = /^[A-Za-z0-9_-]{1,64}$/;

const idOf = (value) => (typeof value === 'string' && ID.test(value) ? value : null);

/**
 * What a reload can use of what was kept, each part checked: the page, a known device, a width within the drag's bounds, the selection and the canvas's place.
 * @param {unknown} raw
 * @param {string[]} devices The devices' ids
 * @returns {{ page: string|null, device: string|null, width: number|null, sectionId: string|null, blockId: string|null, top: { sectionId: string, offset: number }|null }}
 */
export function stoodOf(raw, devices) {
  const kept = raw && typeof raw === 'object' ? raw : {};
  const topId = idOf(kept.top?.sectionId);
  return {
    page: idOf(kept.page),
    device: devices.includes(kept.device) ? kept.device : null,
    width: Number.isFinite(kept.width) && kept.width >= FREE_WIDTH_MIN && kept.width <= FREE_WIDTH_MAX ? Math.round(kept.width) : null,
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
 * The section at the canvas's top and how far past it the canvas stands, measured as spotTop in urd.js measures, under the scroll padding; null at the page's top.
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
