/**
 * The hidden preview that measures a block's phone height (editor/src/lib/phone-fit.js): made on the first request, let go once it has been neither asked nor answered for IDLE_MS, and made again, readied from the start, for the next request.
 */
import { test, mock } from 'node:test';
import assert from 'node:assert/strict';

const listeners = new Set();
const frames = [];
globalThis.location = { origin: 'http://localhost' };
globalThis.window = {
  addEventListener: (type, fn) => { if (type === 'message') listeners.add(fn); },
  removeEventListener: (type, fn) => { if (type === 'message') listeners.delete(fn); },
};
globalThis.document = {
  createElement: () => {
    const frame = { style: {}, setAttribute() {}, removed: false, posted: [], contentWindow: null };
    frame.contentWindow = { postMessage: (msg) => frame.posted.push(msg.type) };
    frame.remove = () => { frame.removed = true; };
    frames.push(frame);
    return frame;
  },
  body: { appendChild() {} },
};
const { createPhoneFit, IDLE_MS } = await import('../editor/src/lib/phone-fit.js');

/** A message from a frame, as the window would hand it to the listeners. */
const from = (frame, data) => { for (const fn of [...listeners]) fn({ origin: location.origin, source: frame.contentWindow, data }); };

test('the hidden preview is let go once idle, an answer or a waiting request keeping it, and is made again for the next request', () => {
  mock.timers.enable({ apis: ['setTimeout'] });
  try {
    const firsts = [];
    const heights = [];
    const fit = createPhoneFit({ title: () => 'Phone', prepare: (post, first) => firsts.push(first), onHeight: (...args) => heights.push(args) });
    fit.request('hjem', { sections: [] }, 's1', 'b1', 1);
    assert.equal(frames.length, 1, 'made on the first request');
    const style = frames[0].style.cssText;
    assert.match(style, /position:fixed;left:0;top:0;/, 'laid out inside the window, so its drawing is never held back');
    assert.match(style, /opacity:0;/, 'unseen by its opacity alone');
    assert.doesNotMatch(style, /display:\s*none|visibility:\s*hidden|left:-|top:-/, 'never hidden or moved off the screen, which would leave its blocks unmeasured');
    from(frames[0], { type: 'urd-ready' });
    mock.timers.tick(400);
    assert.deepEqual(firsts, [true, false], 'readied, then fed the drafts it measures');
    mock.timers.tick(IDLE_MS - 1000);
    from(frames[0], { type: 'urd-grow', fit: true, blockId: 'b1', h: 320, seq: 1 });
    assert.deepEqual(heights, [['hjem', 'b1', 320, 1]]);
    mock.timers.tick(IDLE_MS - 1);
    assert.equal(frames[0].removed, false, 'an answer starts the wait anew');
    mock.timers.tick(1);
    assert.equal(frames[0].removed, true, 'let go once idle');
    assert.equal(listeners.size, 0, 'with its listener');
    fit.request('hjem', { sections: [] }, 's1', 'b1', 2);
    assert.equal(frames.length, 2, 'made again for the next request');
    from(frames[1], { type: 'urd-ready' });
    assert.deepEqual(firsts.slice(2), [true, false], 'and readied from the start, then fed the request waiting');
    from(frames[0], { type: 'urd-grow', fit: true, blockId: 'b1', h: 999, seq: 1 });
    assert.equal(heights.length, 1, 'an answer from the frame let go is not heard');
    fit.destroy();
    assert.equal(frames[1].removed, true);
    // A frame still booting holds its request, and is kept while it does; once it is fed, the wait runs from then, so a measure that comes late is still heard, and a frame that never answers is let go.
    const late = [];
    const slow = createPhoneFit({ title: () => 'Phone', prepare: () => {}, onHeight: (...args) => late.push(args) });
    slow.request('hjem', { sections: [] }, 's1', 'b2', 1);
    const booting = frames.at(-1);
    mock.timers.tick(IDLE_MS * 2);
    assert.equal(booting.removed, false, 'a request waiting for the frame to be ready keeps it');
    from(booting, { type: 'urd-ready' });
    mock.timers.tick(IDLE_MS - 1);
    from(booting, { type: 'urd-grow', fit: true, blockId: 'b2', h: 210, seq: 1 });
    assert.deepEqual(late, [['hjem', 'b2', 210, 1]], 'the wait runs from the frame being fed');
    mock.timers.tick(IDLE_MS);
    assert.equal(booting.removed, true, 'and the frame is let go once idle after it');
    slow.request('hjem', { sections: [] }, 's1', 'b2', 2);
    const silent = frames.at(-1);
    from(silent, { type: 'urd-ready' });
    mock.timers.tick(IDLE_MS);
    assert.equal(silent.removed, true, 'a frame fed and never answering is let go too');
    slow.destroy();
  } finally {
    mock.timers.reset();
  }
});
