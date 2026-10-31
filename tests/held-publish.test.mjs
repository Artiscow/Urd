/**
 * The files a publish committed, held until the deploy serves them (editor/src/lib/held-publish.js).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHeld } from '../editor/src/lib/held-publish.js';

test('a held file is read as a copy until its publish is released', () => {
  const held = createHeld();
  const page = { meta: { id: 'kaker' }, sections: [] };
  const wave = held.hold([['content/pages/kaker.json', page]]);
  page.sections.push({ id: 'later' });
  const copy = held.get('content/pages/kaker.json');
  assert.deepEqual(copy, { meta: { id: 'kaker' }, sections: [] });
  copy.sections.push({ id: 'edited' });
  assert.deepEqual(held.get('content/pages/kaker.json').sections, []);
  assert.equal(held.has('content/pages/kaker.json'), true);
  held.release(wave);
  assert.equal(held.get('content/pages/kaker.json'), null);
  assert.equal(held.has('content/pages/kaker.json'), false);
});

test('the end of an older deploy keeps what a newer publish holds', () => {
  const held = createHeld();
  const first = held.hold([['content/site.json', { v: 1 }], ['content/pages/a.json', { v: 1 }]]);
  const second = held.hold([['content/site.json', { v: 2 }]]);
  held.release(first);
  assert.deepEqual(held.get('content/site.json'), { v: 2 });
  assert.equal(held.has('content/pages/a.json'), false);
  held.release(second);
  assert.equal(held.has('content/site.json'), false);
});

test('a newer publish served first leaves an older publish\'s files held', () => {
  const held = createHeld();
  const first = held.hold([['content/pages/a.json', { v: 1 }], ['content/pages/b.json', { v: 1 }]]);
  const second = held.hold([['content/pages/a.json', { v: 0 }]]);
  held.release(second);
  assert.equal(held.has('content/pages/a.json'), false);
  assert.deepEqual(held.get('content/pages/b.json'), { v: 1 });
  held.release(first);
  assert.equal(held.has('content/pages/b.json'), false);
});

test('a path never held is read from the server', () => {
  assert.equal(createHeld().get('content/pages/om.json'), null);
});
