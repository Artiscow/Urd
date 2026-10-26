/**
 * The segment controls' slide (editor/src/lib/seg-slide.js): the transform that starts the new pill where the old one stood.
 * The listener is browser code covered by the manual test rounds.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

const { slideFrom } = await import(new URL('../editor/src/lib/seg-slide.js', import.meta.url).href);

test('the new pill starts on the old one: moved by the distance between them and scaled to the old width', () => {
  assert.equal(slideFrom({ left: 10, top: 5, width: 40 }, { left: 90, top: 5, width: 80 }), 'translate(-80px, 0px) scaleX(0.5)');
  assert.equal(slideFrom({ left: 120, top: 5, width: 60 }, { left: 20, top: 5, width: 40 }), 'translate(100px, 0px) scaleX(1.5)');
});

test('a choice that wrapped to another row starts from the row above', () => {
  assert.equal(slideFrom({ left: 10, top: 0, width: 50 }, { left: 10, top: 24, width: 50 }), 'translate(0px, -24px) scaleX(1)');
});

test('the same box gives no slide, and a box without width is not divided by', () => {
  assert.equal(slideFrom({ left: 10, top: 5, width: 40 }, { left: 10.2, top: 5, width: 40 }), null);
  assert.equal(slideFrom({ left: 10, top: 5, width: 40 }, { left: 60, top: 5, width: 0 }), 'translate(-50px, 0px) scaleX(1)');
});
