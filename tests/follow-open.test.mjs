/**
 * A fold or a list that opens past its window's foot is followed into view (editor/src/lib/follow-open.js): the window scrolls as far as the opened thing's foot needs, never so far that its top leaves the window, and the owner's own input stops it.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

const listeners = new Map();
globalThis.window = {
  addEventListener: (type, fn) => listeners.set(type, fn),
  removeEventListener: (type) => listeners.delete(type),
};
globalThis.getComputedStyle = (el) => ({ overflowY: el.scrolls ? 'auto' : 'visible' });
const frames = new Map();
let nextFrame = 1;
globalThis.requestAnimationFrame = (fn) => {
  frames.set(nextFrame, fn);
  return nextFrame++;
};
globalThis.cancelAnimationFrame = (id) => frames.delete(id);
const runFrame = () => {
  const now = [...frames.values()];
  frames.clear();
  now.forEach((fn) => fn());
};

const { followOpen } = await import(new URL('../editor/src/lib/follow-open.js', import.meta.url).href);

/** A window 400 px tall that scrolls, and a fold in it at `top` that has opened to `height`. */
function scene(top, height) {
  const scroller = { scrolls: true, scrollTop: 0, scrollHeight: 3000, clientHeight: 400, parentElement: null, getBoundingClientRect: () => ({ top: 0, bottom: 400 }) };
  const fold = { isConnected: true, parentElement: { parentElement: scroller }, getBoundingClientRect: () => ({ top: top - scroller.scrollTop, bottom: top + height - scroller.scrollTop }) };
  return { scroller, fold };
}

test('a fold opening past the window\'s foot is brought into view, its foot 12 px above the window\'s', () => {
  const { scroller, fold } = scene(350, 300);
  followOpen(fold);
  runFrame();
  assert.equal(scroller.scrollTop, 650 - 388);
  runFrame();
  assert.equal(scroller.scrollTop, 650 - 388, 'and it stays there');
});

test('a fold taller than the window stops with its top 12 px under the window\'s top', () => {
  const { scroller, fold } = scene(350, 900);
  followOpen(fold);
  runFrame();
  assert.equal(scroller.scrollTop, 350 - 12);
});

test('a fold already in view moves nothing, and the owner\'s press stops the following', () => {
  const still = scene(50, 200);
  followOpen(still.fold);
  runFrame();
  assert.equal(still.scroller.scrollTop, 0);
  const pressed = scene(350, 300);
  followOpen(pressed.fold);
  listeners.get('pointerdown')();
  runFrame();
  assert.equal(pressed.scroller.scrollTop, 0, 'a press of the owner\'s before the first frame');
  assert.equal(listeners.size, 0, 'and its listeners are gone');
});
