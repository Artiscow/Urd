/**
 * The parts of a template still to fill in (editor/src/lib/fill-in.js): a marked part counts while its words are in their brackets, the seller's details apart, and a page sums its text blocks.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { openFills, pageFills } from '../editor/src/lib/fill-in.js';

test('openFills: a marked part in its brackets is open, one written over or unmarked is not', () => {
  assert.deepEqual(openFills('<p>Pay <span data-urd-fill="">[how]</span> and <span data-urd-fill>[when]</span>.</p>'), { own: 2, contact: 0 });
  assert.deepEqual(openFills('<p><span data-urd-fill="">With Vipps</span>, <span>[kept]</span> and [plain brackets]</p>'), { own: 0, contact: 0 });
  assert.deepEqual(openFills('<p><span style="color:red" data-urd-fill="contact"> [org. no.] </span></p>'), { own: 0, contact: 1 });
  assert.deepEqual(openFills('<p><span data-urd-fill="">[Write the return address.] Storgata 1</span></p>'), { own: 1, contact: 0 }, 'an answer typed beside the instruction leaves the part open');
  assert.deepEqual(openFills('<p><span data-urd-fill="">[Write <b>how</b> it is paid.]</span></p>'), { own: 1, contact: 0 }, 'formatting inside a part');
  assert.deepEqual(openFills(undefined), { own: 0, contact: 0 });
});

test('pageFills: every text block and the terms of sale on the page, other blocks never', () => {
  const page = { sections: [
    { blocks: [{ type: 'text', props: { html: '<span data-urd-fill="">[a]</span><span data-urd-fill="contact">[b]</span>' } }, { type: 'button', props: { html: '<span data-urd-fill="">[c]</span>' } }] },
    { blocks: [{ type: 'text', props: { html: '<span data-urd-fill="">[d]</span>' } }] },
    { blocks: [{ type: 'terms', props: { html: '<span data-urd-fill="contact">[e]</span><span data-urd-fill="">[f]</span>' } }] },
  ] };
  assert.deepEqual(pageFills(page), { own: 3, contact: 2 });
  assert.deepEqual(pageFills(null), { own: 0, contact: 0 });
});
