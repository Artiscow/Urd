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
const { FOOTER_PRESETS, presetSample, applyPreset } = await engineImport('footer-presets.js');
// The editor's design picker reads the variants from the blocks' design catalogue.
const { BLOCK_DESIGNS, blockDesignOf } = await engineImport('block-designs.js');

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

test('the editor offers the same variants as the blocks, and reads a stored one as the blocks do', () => {
  assert.deepEqual(BLOCK_DESIGNS.stats.ids, STAT_VARIANTS);
  assert.deepEqual(BLOCK_DESIGNS.faq.ids, FAQ_VARIANTS);
  for (const value of [...STAT_VARIANTS, undefined, 'neon']) assert.equal(blockDesignOf('stats', { variant: value }), statVariant(value));
  for (const value of [...FAQ_VARIANTS, undefined, 'grid']) assert.equal(blockDesignOf('faq', { variant: value }), faqVariant(value));
});

test('footerDesign: the two designs, and the standard footer for anything else', () => {
  assert.deepEqual(FOOTER_DESIGNS, ['chapters', 'split']);
  assert.equal(footerDesign({ footer: { design: 'chapters' } }), 'chapters');
  assert.equal(footerDesign({ footer: { design: 'split' } }), 'split');
  assert.equal(footerDesign({ footer: { design: 'mega' } }), '');
  assert.equal(footerDesign({ footer: {} }), '');
  assert.equal(footerDesign({}), '');
});

test('the schema and the footer\'s presets know the same designs', () => {
  const schema = JSON.parse(readFileSync(new URL('../schema/site.schema.json', import.meta.url), 'utf8'));
  assert.deepEqual(schema.properties.footer.properties.design.enum, FOOTER_DESIGNS);
  const ta = (key) => key;
  for (const design of FOOTER_DESIGNS) {
    assert.ok(FOOTER_PRESETS.includes(design), `${design} is a preset`);
    assert.equal(presetSample(design, { ta }).design, design, `the ${design} preset sets its design`);
  }
  // A preset without a design clears the one a former preset set.
  assert.equal(applyPreset({ version: 1, design: 'split' }, presetSample('minimal', { ta })).design, undefined);
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
    const el = { tag, className: '', style: { setProperty(k, v) { this[k] = v; } }, attrs: {}, children: [], textContent: '', innerHTML: '', setAttribute(k, v) { this.attrs[k] = v; }, appendChild(child) { this.children.push(child); } };
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
    assert.equal(row.style['--urd-shape-style'], 'solid');
    const mid = row.children[0];
    assert.equal(mid.className, 'urd-shape-chapter-mid');
    assert.equal(mid.children[0].className, 'urd-shape-chapter-label');
    assert.equal(mid.children[0].textContent, '<b>Kapittel 2</b>');
    // A mark stands before the word, hidden from assistive technology: a drawn icon of Urd's set, else a character.
    const marked = node('div');
    shapeBlock.render(marked, { kind: 'line', color: '#c0ffee', thickness: 2, fill: null, label: 'Del 1', icon: 'star', glyph: '§', lineStyle: 'dashed' }, {});
    const [mark, word] = marked.children[0].children[0].children;
    assert.equal(mark.className, 'urd-shape-chapter-mark');
    assert.equal(mark.attrs['aria-hidden'], 'true');
    assert.match(mark.innerHTML, /^<svg/);
    assert.equal(word.textContent, 'Del 1');
    assert.equal(marked.children[0].style.color, '#c0ffee', 'a colour of its own');
    assert.equal(marked.children[0].style['--urd-shape-style'], 'dashed');
    const glyphOnly = node('div');
    shapeBlock.render(glyphOnly, { kind: 'line', color: 'accent', thickness: 1, fill: null, glyph: ' § ', icon: 'no-such-icon', lineStyle: 'double' }, {});
    const lone = glyphOnly.children[0];
    assert.equal(lone.children[0].children.length, 1, 'a mark alone, no word');
    assert.equal(lone.children[0].children[0].textContent, '§');
    assert.equal(lone.style['--urd-shape-t'], '3px', 'a double line takes at least 3 px');
    // A line and an arrow's shaft are drawn as a top border in their style, solid where it is absent or unknown.
    for (const [lineStyle, drawn] of [[undefined, '2px solid'], ['dotted', '2px dotted'], ['wavy', '2px solid'], ['double', '3px double']]) {
      const plain = node('div');
      shapeBlock.render(plain, { kind: 'line', color: 'accent', thickness: 2, fill: null, lineStyle }, {});
      assert.match(plain.children[0].style.cssText, new RegExp(`border-top:${drawn} var\\(--urd-color-accent\\)`), String(lineStyle));
    }
    const shaft = node('div');
    shapeBlock.render(shaft, { kind: 'arrow', color: 'accent', thickness: 2, fill: null, lineStyle: 'dashed', glyph: '§' }, {});
    assert.match(shaft.children[0].style.cssText, /border-top:2px dashed/);
    assert.equal(shaft.children.length, 2, 'an arrow carries no mark');
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

test('the menu offers the line styles the engine draws', async () => {
  const { LINE_STYLES } = await engineImport('blocks/shape.js');
  const options = readFileSync(new URL('../editor/src/menu/options.js', import.meta.url), 'utf8');
  const listed = options.match(/export const lineStyles = \(\) => \[([^\]]+)\]/)?.[1].match(/'([a-z]+)'/g).map((s) => s.slice(1, -1));
  assert.deepEqual(listed, LINE_STYLES);
});
