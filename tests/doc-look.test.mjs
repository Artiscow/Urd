/**
 * Documents (engine/doc-look.js): the designs a stored value reads as, the look written as custom properties only where the owner set it and only when it is safe, and the settings each design draws.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { PRIVACY_DESIGNS, TEXT_DESIGNS, TERMS_DESIGNS, DOC_CORNERS, privacyDesign, textDesign, termsDesign, docColor, docRadius, docLookVars, docLookSettings } = await engineImport('doc-look.js');

test('a stored design reads as one of the block\'s, a missing or unknown one as its first', () => {
  assert.deepEqual(PRIVACY_DESIGNS, ['long', 'contents', 'glance', 'questions', 'ledger', 'ledger-cards']);
  assert.deepEqual(TEXT_DESIGNS, ['plain', 'long', 'contents', 'glance', 'questions', 'clauses']);
  for (const id of PRIVACY_DESIGNS) assert.equal(privacyDesign(id), id);
  for (const id of TEXT_DESIGNS) assert.equal(textDesign(id), id);
  assert.equal(privacyDesign(undefined), 'long');
  assert.equal(privacyDesign('clauses'), 'long', 'numbered clauses are a text\'s design');
  assert.equal(textDesign('ledger'), 'plain', 'the ledger is the privacy page\'s');
  assert.equal(textDesign(null), 'plain');
  assert.deepEqual(TERMS_DESIGNS, TEXT_DESIGNS.filter((id) => id !== 'plain'), 'the terms of sale take the document designs');
  for (const id of TERMS_DESIGNS) assert.equal(termsDesign(id), id);
  assert.equal(termsDesign(undefined), 'long');
  assert.equal(termsDesign('plain'), 'long', 'the terms of sale are always a document');
});

test('the look: a colour is a hex value or a theme token, a font a plain stack, the corners one of four', () => {
  assert.equal(docColor('#15b39a'), '#15b39a');
  assert.equal(docColor('accent'), 'var(--urd-color-accent)');
  assert.equal(docColor('red; background: url(x)'), null);
  assert.equal(docColor(undefined), null);
  assert.deepEqual(DOC_CORNERS, ['none', 'sm', 'md', 'round']);
  assert.equal(docRadius('none'), '0px');
  assert.equal(docRadius('md'), null, 'the theme\'s medium radius needs no property');
  assert.equal(docRadius('nope'), null);
  assert.deepEqual(docLookVars({}), {}, 'nothing set, nothing written: the theme draws it');
  assert.deepEqual(docLookVars({ accent: 'text', headingColor: '#123', cardColor: 'surface', corners: 'round', headingFont: "Georgia, 'Times New Roman', serif", font: 'system-ui, sans-serif' }), {
    '--urd-doc-accent': 'var(--urd-color-text)',
    '--urd-doc-heading': '#123',
    '--urd-doc-card': 'var(--urd-color-surface)',
    '--urd-doc-radius': 'calc(var(--urd-radius-md) * 2.2)',
    '--urd-doc-heading-font': "Georgia, 'Times New Roman', serif",
    '--urd-doc-font': 'system-ui, sans-serif',
  });
  assert.deepEqual(docLookVars({ headingFont: 'x; color: red', font: 'a{b}' }), {}, 'a font that is not a plain stack is left out');
});

test('the menu shows the settings a design draws, and none for plain text', () => {
  const on = (s) => Object.entries(s).filter(([, v]) => v).map(([k]) => k).sort();
  assert.deepEqual(on(docLookSettings('text', 'plain')), []);
  assert.deepEqual(on(docLookSettings('terms', 'long', { html: '<h2>A</h2>' })), ['accent', 'headingColor', 'headingFont', 'rules']);
  assert.deepEqual(on(docLookSettings('terms', 'long', { html: '<blockquote data-urd-form></blockquote>' })), ['accent', 'cardColor', 'corners', 'headingColor', 'headingFont', 'rules'], 'a withdrawal form is a card');
  assert.deepEqual(on(docLookSettings('terms', 'glance', {})), ['accent', 'cardColor', 'corners', 'headingColor', 'headingFont', 'rules']);
  assert.deepEqual(on(docLookSettings('terms', 'contents', {})), ['accent', 'align', 'cardColor', 'corners', 'headingColor', 'headingFont', 'rules', 'side'], 'the side the contents stand on and the text\'s place, with the contents alone');
  assert.deepEqual(on(docLookSettings('text', 'clauses', {})), ['accent', 'corners', 'headingColor', 'headingFont'], 'numbered clauses have no lines, and their numbers have corners');
  for (const design of PRIVACY_DESIGNS) {
    const contents = design === 'contents';
    assert.deepEqual(on(docLookSettings('privacy', design)), ['accent', 'align', 'cardColor', 'corners', 'font', 'headingColor', 'headingFont', 'rules', ...(contents ? ['side'] : [])], `${design}: the placement in the block in every design`);
  }
});
