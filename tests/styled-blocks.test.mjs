/**
 * Contract tests for the styled variants of 0.7.13.11: the statistic's and the
 * FAQ's variants, the quote's card, the line's label and the two footer
 * designs. The pure parts, and the lists the editor writes out by hand.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { engineImport } from './_engine.mjs';

const { STAT_VARIANTS, statVariant, statsBlock } = await engineImport('blocks/stats.js');
const { FAQ_VARIANTS, faqVariant, faqBlock } = await engineImport('blocks/faq.js');
const { quoteBlock } = await engineImport('blocks/quote.js');
const { shapeBlock } = await engineImport('blocks/shape.js');
const { FOOTER_DESIGNS, footerDesign } = await engineImport('footer-model.js');
const { footerThumb } = await engineImport('footer-thumb.js');

const editor = readFileSync(new URL('../editor/src/App.svelte', import.meta.url), 'utf8');

test('statVariant: bare, a card or a band, and bare for anything unknown', () => {
  assert.deepEqual(STAT_VARIANTS, ['plain', 'cards', 'band']);
  for (const id of STAT_VARIANTS) assert.equal(statVariant(id), id);
  assert.equal(statVariant(undefined), 'plain');
  assert.equal(statVariant('neon'), 'plain');
});

test('faqVariant: cards is the look a stored block keeps', () => {
  assert.deepEqual(FAQ_VARIANTS, ['cards', 'list']);
  assert.equal(faqVariant('list'), 'list');
  assert.equal(faqVariant(undefined), 'cards');
  assert.equal(faqVariant('grid'), 'cards');
});

test('the variants are additive: the blocks keep their versions and their defaults', () => {
  assert.equal(statsBlock.version, 1);
  assert.equal(faqBlock.version, 1);
  assert.equal(quoteBlock.version, 2);
  assert.equal(shapeBlock.version, 1);
  assert.equal(shapeBlock.defaults().label, undefined);
});

test('the editor offers the same variants as the blocks', () => {
  const list = (name) => JSON.parse(new RegExp(`const ${name} = (\\[[^\\]]*\\]);`).exec(editor)[1].replaceAll("'", '"'));
  assert.deepEqual(list('STAT_VARIANT_IDS'), STAT_VARIANTS);
  assert.deepEqual(list('FAQ_VARIANT_IDS'), FAQ_VARIANTS);
});

test('footerDesign: the two designs, and the standard footer for anything else', () => {
  assert.deepEqual(FOOTER_DESIGNS, ['chapters', 'split']);
  assert.equal(footerDesign({ footer: { design: 'chapters' } }), 'chapters');
  assert.equal(footerDesign({ footer: { design: 'split' } }), 'split');
  assert.equal(footerDesign({ footer: { design: 'mega' } }), '');
  assert.equal(footerDesign({ footer: {} }), '');
  assert.equal(footerDesign({}), '');
});

test('the schema and the template picker know the same designs', () => {
  const schema = JSON.parse(readFileSync(new URL('../schema/site.schema.json', import.meta.url), 'utf8'));
  assert.deepEqual(schema.properties.footer.properties.design.enum, FOOTER_DESIGNS);
  for (const design of FOOTER_DESIGNS) {
    assert.ok(editor.includes(`{ id: '${design}', label: ta('footerTemplate.${design}')`), `${design} in the picker`);
    assert.ok(editor.includes(`design: '${design}'`), `${design} in a template`);
  }
  // A template without a design clears the one a former template set.
  assert.match(editor, /for \(const k of \[[^\]]*'design'\]\)/);
});

test('footerThumb: the two designs draw their own cards', () => {
  const plain = footerThumb({ cols: 3 });
  const chapters = footerThumb({ chapters: true, cols: 3 });
  const split = footerThumb({ split: true, cols: 2 });
  for (const svg of [chapters, split]) {
    assert.match(svg, /^<svg viewBox="0 0 160 80"/);
    assert.match(svg, /<\/svg>$/);
  }
  assert.notEqual(chapters, plain);
  assert.notEqual(split, plain);
  assert.notEqual(chapters, split);
});

test('the line with a label draws the word between two strokes, as text', () => {
  const made = [];
  const node = (tag) => {
    const el = { tag, className: '', style: { setProperty(k, v) { this[k] = v; } }, children: [], textContent: '', appendChild(child) { this.children.push(child); } };
    made.push(el);
    return el;
  };
  globalThis.document = { createElement: node };
  try {
    const host = node('div');
    shapeBlock.render(host, { kind: 'line', color: 'accent', thickness: 3, fill: null, label: '  <b>Kapittel 2</b> ' }, {});
    const row = host.children[0];
    assert.equal(row.className, 'urd-shape-chapter');
    assert.equal(row.style['--urd-shape-t'], '3px');
    assert.equal(row.children[0].className, 'urd-shape-chapter-label');
    assert.equal(row.children[0].textContent, '<b>Kapittel 2</b>');
    // An arrow, and a line with an empty label, are drawn as before.
    const arrow = node('div');
    shapeBlock.render(arrow, { kind: 'arrow', color: 'accent', thickness: 3, fill: null, label: 'x' }, {});
    assert.notEqual(arrow.children[0].className, 'urd-shape-chapter');
    const bare = node('div');
    shapeBlock.render(bare, { kind: 'line', color: 'accent', thickness: 3, fill: null, label: '   ' }, {});
    assert.equal(bare.children.length, 1);
    assert.notEqual(bare.children[0].className, 'urd-shape-chapter');
  } finally {
    delete globalThis.document;
  }
});
