/**
 * The phone height of a block that fetches its content (0.7.21.7): a hidden
 * preview of the page at the phone width, where the editor asks for the
 * height such a block takes there once its content is drawn. The answer is
 * stored as the block's `mobileHeight`, and the loading state stands at it
 * on the phone, so the first load of a session does not jump.
 *
 * The preview is the real page (`/?preview=1`) in the mobile viewport, as
 * the design picker draws its own: same engine, same CSS, the media queries
 * of a phone. It is created on the first request and kept for the session;
 * it is fed the same drafts as the main preview by `prepare`, and measures
 * with the main preview's own fit (`urd-fit-block`, answered with
 * `urd-grow`), which waits for a feed and skips a block still loading.
 */

/** The phone width the editor's mobile view uses (FIXED_DEVICES in App.svelte). */
export const PHONE_W = 390;

/** Edits close together are measured once. */
const SETTLE_MS = 400;

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
  /** The page waiting to be measured, and its blocks with the request each asked for. */
  let pending = null;
  /** The page the hidden preview shows, so its answers are tied to it. */
  let shownPageId = null;

  const post = (msg) => frame?.contentWindow?.postMessage(msg, location.origin);

  const flush = () => {
    timer = null;
    if (!ready || !pending) return;
    const { pageId, page, blocks } = pending;
    pending = null;
    shownPageId = pageId;
    prepare(post, false);
    post({ type: 'urd-preview-full', pageId, page });
    for (const [blockId, { sectionId, seq }] of blocks) post({ type: 'urd-fit-block', sectionId, blockId, seq });
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
    // Laid out at the phone's size, inside the window but transparent,
    // behind the admin and out of reach: a frame outside the window or
    // hidden may have its rendering throttled, and the calendar decides its
    // narrow layout from an observer of its own width.
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
      window.removeEventListener('message', listener);
      frame?.remove();
      frame = null;
      ready = false;
    },
  };
}
