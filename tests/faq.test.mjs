/**
 * Kontraktstester for FAQ-akkordeonen: gruppenavnet (native eksklusiv utfolding
 * via <details name>) og blokkens standardform. Selve utfoldingen, redigeringen
 * og autoveksten er DOM-atferd og dekkes av headless-sjekkene.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { faqBlock, groupName } = await engineImport('blocks/faq.js');

test('groupName: uten multi deler spørsmålene ett navn (eksklusiv utfolding)', () => {
  assert.equal(groupName('abc', false), 'urd-faq-abc');
});

test('groupName: med multi er navnet tomt (flere kan stå åpne)', () => {
  assert.equal(groupName('abc', true), '');
});

test('groupName: manglende blokk-id gir et stabilt reservenavn', () => {
  assert.equal(groupName('', false), 'urd-faq-x');
  assert.equal(groupName(undefined, false), 'urd-faq-x');
});

test('faqBlock: standardform er tre spørsmål, ikke multi', () => {
  const d = faqBlock.defaults();
  assert.equal(faqBlock.version, 1);
  assert.equal(d.items.length, 3);
  assert.equal(d.multi, false);
  assert.ok(d.items.every((i) => typeof i.q === 'string' && typeof i.a === 'string'));
});
