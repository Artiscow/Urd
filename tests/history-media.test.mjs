/**
 * The pictures of the undo steps kept once (editor/src/lib/history-media.js): a step's state holds a token in a large data address's place, the table holds the address once, and a token names the same picture in every session.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

const { createMediaTable, MEDIA_TOKEN } = await import('../editor/src/lib/history-media.js');

const picture = (seed) => `data:image/webp;base64,${String(seed).repeat(5000)}`;

test('a state keeps each large data address once as a token, and comes back whole', () => {
  const media = createMediaTable();
  const a = picture('ab');
  const state = { page: { sections: [{ blocks: [{ props: { src: a, alt: 'x' } }, { props: { src: a } }] }] }, small: 'data:image/png;base64,AAAA', words: 'data: not a picture' };
  const text = media.stringify(state);
  assert.ok(text.length < 1000, `the state's text holds tokens, ${text.length} characters`);
  assert.equal(media.tokensIn(text).length, 1, 'one picture, one token, however often it stands');
  assert.equal(media.size(), 1);
  assert.match(text, /"small":"data:image\/png;base64,AAAA"/, 'a short address stays as it is');
  assert.deepEqual(media.parse(text), state);
});

test('the same picture has the same token in another session, and a table that holds it reads it back', () => {
  const a = picture('cd');
  const first = createMediaTable();
  const text = first.stringify({ src: a });
  const [token] = first.tokensIn(text);
  assert.ok(token.startsWith(MEDIA_TOKEN));
  const later = createMediaTable();
  assert.equal(later.stringify({ src: a }), text, 'the token comes from the picture itself');
  const reload = createMediaTable();
  assert.equal(reload.parse(text).src, token, 'a token the table does not hold stays as it is');
  reload.set(token, first.get(token));
  assert.equal(reload.parse(text).src, a);
});

test('the table lets go of the pictures no step holds', () => {
  const media = createMediaTable();
  const one = media.stringify({ src: picture('ef') });
  media.stringify({ src: picture('gh') });
  assert.equal(media.size(), 2);
  media.keepOnly(new Set(media.tokensIn(one)));
  assert.equal(media.size(), 1);
  assert.equal(media.parse(one).src, picture('ef'));
});
