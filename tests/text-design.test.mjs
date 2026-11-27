/**
 * The text's design: the six heading levels in the text bar (TextToolbar.svelte, preview-edit.js) with their sizes and wrapping in base.css,
 * a plain text in columns (blocks/text.js textColumns), and a card's title and text kept to their lines (blocks/collection.js clampLines, blocks/product.js).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE_DIR, engineImport, stripComments } from './_engine.mjs';

const noComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const BASE = noComments(readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8'));
const PREVIEW = noComments(readFileSync(new URL('preview.css', ENGINE_DIR), 'utf8'));
const engineSource = (path) => stripComments(readFileSync(new URL(path, ENGINE_DIR), 'utf8'));
const TOOLBAR = readFileSync(new URL('../editor/src/lib/TextToolbar.svelte', import.meta.url), 'utf8');
const { RICH_TEXT } = await engineImport('sanitize.js');
const { textColumns } = await engineImport('blocks/text.js');
const { clampLines } = await engineImport('blocks/collection.js');

/** The declarations of the rule whose whole selector is `selector`, or null. */
function rule(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return css.match(new RegExp(`(?:^|\\})\\s*${escaped}\\s*\\{([^}]*)\\}`))?.[1] ?? null;
}

test('the text bar offers a paragraph and the six headings, and the engine sets each, reads each back and keeps each in a text', () => {
  assert.match(TOOLBAR, /const levels = \[\['p', ta\('tt\.paragraph'\)\], \.\.\.\[1, 2, 3, 4, 5, 6\]\.map\(\(n\) => \[`h\$\{n\}`, ta\('tt\.headingN', \{ n \}\)\]\)\];/);
  const edit = engineSource('preview-edit.js');
  assert.match(edit, /const LEVELS = \['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'\];/);
  assert.match(edit, /level: \(value\) => \{ if \(LEVELS\.includes\(value\)\) exec\('formatBlock', value\); \}/, 'the command sets any of them');
  assert.match(edit, /level = LEVELS\.includes\(value\) \? value : 'p';/, 'and the bar shows the one at the caret');
  for (const level of ['h4', 'h5', 'h6']) assert.ok(RICH_TEXT.elements[level], `a stored text keeps its ${level}`);
});

test('in a text an H4 stands a step above the body text, and an H5 and an H6 at its size, never smaller', () => {
  assert.match(rule(BASE, '.urd-text h4') ?? '', /font-size: 1\.1em;/);
  assert.match(rule(BASE, '.urd-text :is(h5, h6)') ?? '', /font-size: 1em;/);
  assert.match(rule(BASE, '.urd-text h6') ?? '', /font-variant-caps: small-caps;/, 'an H6 is told apart by small capitals');
  assert.doesNotMatch(rule(BASE, '.urd-text h6'), /font-size/, 'and keeps the body size');
  for (const level of ['.urd-text h4', '.urd-text :is(h5, h6)', '.urd-text h6']) {
    assert.doesNotMatch(rule(BASE, level), /margin/, `${level} sets no margin, as the other levels have none`);
  }
});

test('headings wrap balanced and body text pretty, by the longhand that never changes whether a line may wrap', () => {
  assert.match(rule(BASE, 'h1, h2, h3, h4, h5, h6') ?? '', /text-wrap-style: balance;/);
  assert.match(rule(BASE, 'p, li') ?? '', /text-wrap-style: pretty;/);
  assert.doesNotMatch(BASE, /(?<![-\w])text-wrap\s*:/, 'base.css sets no text-wrap shorthand, which would wrap a nowrap parent\'s children again');
});

test('a plain text stands in two to four columns, each at least 14em wide, with the gap the owner sets', () => {
  assert.equal(textColumns({}, 'plain'), null, 'one column by default');
  assert.equal(textColumns({ columns: 1 }, 'plain'), null);
  assert.equal(textColumns({ columns: 5 }, 'plain'), null, 'no more than four');
  assert.deepEqual(textColumns({ columns: 2 }, 'plain'), { columns: '2 14em', gap: '32px' });
  assert.deepEqual(textColumns({ columns: 4, columnGap: 20 }, 'plain'), { columns: '4 14em', gap: '20px' });
  assert.deepEqual(textColumns({ columns: 3, columnGap: -4 }, 'plain'), { columns: '3 14em', gap: '32px' }, 'a gap below nothing is the standard one');
  assert.deepEqual(textColumns({ columns: 3, columnGap: 900 }, 'plain'), { columns: '3 14em', gap: '200px' });
  for (const empty of [null, '']) {
    assert.equal(textColumns({ columns: 3, columnGap: empty }, 'plain').gap, '32px', `a gap stored as ${JSON.stringify(empty)} is the standard one`);
  }
  assert.equal(textColumns({ columns: 2 }, 'contents'), null, 'a document design keeps its own layout');
  const text = engineSource('blocks/text.js');
  assert.match(text, /const columns = textColumns\(props, design\);\s*if \(columns\) \{\s*content\.style\.columns = columns\.columns;\s*content\.style\.columnGap = columns\.gap;/);
});

/** A stand-in node with the class list and the style a clamp writes. */
function node() {
  const classes = new Set();
  const props = new Map();
  return { classes, props, classList: { add: (name) => classes.add(name) }, style: { setProperty: (name, value) => props.set(name, value) } };
}

test('a card\'s title or text is kept to 1 to 10 lines, ending in an ellipsis; any other number leaves it whole', () => {
  const two = node();
  clampLines([two], 2.4);
  assert.deepEqual([...two.classes], ['urd-lines']);
  assert.equal(two.props.get('--urd-lines'), '2');
  for (const lines of [undefined, null, 0, 11, 'x']) {
    const whole = node();
    clampLines([whole], lines);
    assert.equal(whole.classes.size + whole.props.size, 0, `${lines} leaves the text whole`);
  }
  const lines = rule(BASE, '.urd-lines') ?? '';
  for (const declaration of ['display: -webkit-box;', '-webkit-box-orient: vertical;', '-webkit-line-clamp: var(--urd-lines);', 'overflow: hidden;']) {
    assert.ok(lines.includes(declaration), `.urd-lines holds ${declaration}`);
  }
  assert.match(PREVIEW, /\.urd-preview \.urd-lines:is\(\[contenteditable='true'\]:focus, \[data-urd-writing\]\) \{\s*-webkit-line-clamp: none;/,
    'a clamped field shows whole while it is typed in, also while the text bar\'s own fields hold the focus');
  const edit = engineSource('preview-edit.js');
  assert.match(edit, /markedText\?\.removeAttribute\('data-urd-writing'\);\s*writing\?\.setAttribute\('data-urd-writing', ''\);/, 'the text being written carries the mark, and only it');
});

test('the collection clamps every view\'s titles and texts, and the product block its cards\' but never its quick view\'s', () => {
  const collection = engineSource('blocks/collection.js');
  assert.match(collection, /view\(host, entries\);\s*clampLines\(host\.querySelectorAll\('\.urd-collection-title'\), props\.titleLines\);\s*clampLines\(host\.querySelectorAll\('\.urd-collection-text'\), props\.textLines\);/);
  const product = engineSource('blocks/product.js');
  const card = product.slice(product.indexOf('function renderCard('), product.indexOf('function buyRow('));
  assert.match(card, /clampLines\(title \? \[title\] : \[\], props\.titleLines\);\s*clampLines\(text \? \[text\] : \[\], props\.textLines\);/);
  const rich = product.slice(product.indexOf('function richNode('), product.indexOf('function choiceRow('));
  assert.match(rich, /const node = el2\(tag, className\);\s*node\.classList\.add\('urd-text'\);/, 'a product\'s title and text are texts on the published page, as in the editor');
  const quick = product.slice(product.indexOf('function openQuickView('), product.indexOf('function renderCard('));
  assert.doesNotMatch(quick, /clampLines/, 'the quick view shows the whole text');
});
