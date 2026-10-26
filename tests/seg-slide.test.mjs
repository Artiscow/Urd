/**
 * The segment controls' slide (editor/src/lib/seg-slide.js): the transform that starts the new pill where the old one stood.
 * The listener is browser code covered by the manual test rounds.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

const { slideFrom } = await import(new URL('../editor/src/lib/seg-slide.js', import.meta.url).href);

test('the new pill starts on the old one: its edges stand on the old button\'s edges', () => {
  // The old button at 10-50, the new one at 90-170: the pill starts 80px further left and ends 120px short of the new right edge.
  assert.deepEqual(slideFrom({ left: 10, top: 5, width: 40, height: 20 }, { left: 90, top: 5, width: 80, height: 20 }), { left: '-80px', top: '0px', right: '120px', bottom: '0px' });
  assert.deepEqual(slideFrom({ left: 120, top: 5, width: 60, height: 20 }, { left: 20, top: 5, width: 40, height: 20 }), { left: '100px', top: '0px', right: '-120px', bottom: '0px' });
});

test('a choice in a list of rows starts from the row above', () => {
  assert.deepEqual(slideFrom({ left: 10, top: 0, width: 50, height: 24 }, { left: 10, top: 24, width: 50, height: 24 }), { left: '0px', top: '-24px', right: '0px', bottom: '24px' });
});

test('the same box gives no slide', () => {
  assert.equal(slideFrom({ left: 10, top: 5, width: 40, height: 20 }, { left: 10.2, top: 5, width: 40, height: 20 }), null);
});
