/**
 * The phone height of a block that fetches its content, measured in a hidden preview of the page at the phone width and stored as the block's `mobileHeight`.
 */
import { PHONE_FILL_WIDTH } from './preview-width.js';

/** The phone width the hidden fit measures at: the Phone device's width alone. */
export const PHONE_W = PHONE_FILL_WIDTH;

/** Edits close together are measured once. */
const SETTLE_MS = 400;

/** How long the hidden preview stays with nothing asked of it, fed to it or answered. */
export const IDLE_MS = 30_000;

/**
 * @param {{
 *   prepare: (post: (msg: object) => void, first: boolean) => void,
 *   onHeight: (pageId: string, blockId: string, h: number, seq: number) => void,
 *   title: () => string,
 * }} opts prepare sends the drafts the page is drawn from before every
 *   measure (first is true on the hidden preview's first one); onHeight
 *   receives each answer.
 * @returns {{request(pageId: string, page: object, sectionId: string, blockId: string, seq: number): void, cancel(): void, destroy(): void}}
 */
export function createPhoneFit({ prepare, onHeight, title }) {
  let frame = null;
  let ready = false;
  let timer = null;
  let idle = null;
  /** The page waiting to be measured, and its blocks with the request each asked for. */
  let pending = null;
  /** The page the hidden preview shows, so its answers are tied to it. */
  let shownPageId = null;

  const post = (msg) => frame?.contentWindow?.postMessage(msg, location.origin);

  /** The hidden preview removed, its listener with it; the page it showed is forgotten, so a late answer is never tied to it. */
  const dropFrame = () => {
    window.removeEventListener('message', listener);
    frame?.remove();
    frame = null;
    ready = false;
    shownPageId = null;
  };

  /** The idle wait starts anew; once it runs out the hidden preview is let go, or waited for again while a request waits for it to be ready. */
  const rest = () => {
    clearTimeout(idle);
    idle = setTimeout(() => {
      idle = null;
      if (pending) rest();
      else dropFrame();
    }, IDLE_MS);
  };

  const flush = () => {
    timer = null;
    if (!ready || !pending) return;
    const { pageId, page, blocks } = pending;
    pending = null;
    shownPageId = pageId;
    prepare(post, false);
    post({ type: 'urd-preview-full', pageId, page });
    for (const [blockId, { sectionId, seq }] of blocks) post({ type: 'urd-fit-block', sectionId, blockId, seq });
    rest();
  };

  const listener = (event) => {
    if (event.origin !== location.origin || !frame || event.source !== frame.contentWindow) return;
    const msg = event.data;
    if (msg?.type === 'urd-ready') {
      ready = true;
      prepare(post, true);
      post({ type: 'urd-viewport', mode: 'mobile' });
      post({ type: 'urd-chrome', visible: false });
      flush();
    } else if (msg?.type === 'urd-grow' && msg.fit && shownPageId) {
      rest();
      onHeight(shownPageId, msg.blockId, msg.h, msg.seq ?? 0);
    }
  };

  const ensureFrame = () => {
    if (frame) return;
    window.addEventListener('message', listener);
    frame = document.createElement('iframe');
    frame.src = '/?preview=1';
    frame.title = title();
    frame.tabIndex = -1;
    frame.inert = true;
    frame.setAttribute('aria-hidden', 'true');
    // Laid out at the phone's size inside the window, transparent, behind the admin and out of reach.
    frame.style.cssText = `position:fixed;left:0;top:0;width:${PHONE_W}px;height:844px;border:0;opacity:0;pointer-events:none;z-index:-1`;
    document.body.appendChild(frame);
  };

  return {
    /**
     * Asks for a block's phone height once the edits around it have settled.
     * @param {string} pageId
     * @param {object} page A plain copy of the page draft
     * @param {string} sectionId
     * @param {string} blockId
     * @param {number} seq The request's number; only the latest per block counts
     */
    request(pageId, page, sectionId, blockId, seq) {
      ensureFrame();
      const blocks = pending?.pageId === pageId ? pending.blocks : new Map();
      blocks.set(blockId, { sectionId, seq });
      pending = { pageId, page, blocks };
      clearTimeout(timer);
      timer = setTimeout(flush, SETTLE_MS);
      rest();
    },
    /** Forgets the request still waiting (an undo, a publish): its answer would measure a draft that is gone. */
    cancel() {
      clearTimeout(timer);
      timer = null;
      pending = null;
      shownPageId = null;
    },
    destroy() {
      clearTimeout(timer);
      clearTimeout(idle);
      pending = null;
      dropFrame();
    },
  };
}
