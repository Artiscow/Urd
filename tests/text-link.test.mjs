/**
 * The text toolbar's link (template/assets/engine/<version>/preview-edit.js): the toolbar asks the editor's link editor for a link (urd-link-edit), the focus goes to the editor's dialog, which takes the text from the toolbar, and the dialog's answer (urd-link-apply) is written on the text and the words it was asked for.
 * And a link in a block is followed in the Clean view, as on the published page.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const ENGINE = JSON.parse(readFileSync(new URL('../template/urd.json', import.meta.url), 'utf8')).engine;
const edit = readFileSync(new URL(`../template/assets/engine/${ENGINE}/preview-edit.js`, import.meta.url), 'utf8');
const body = (start) => edit.slice(edit.indexOf(start), edit.indexOf('\n  };\n', edit.indexOf(start)) + 4);

test('the link editor\'s answer is written on the text the link was asked for, not on the text the toolbar holds when the answer comes', () => {
  const ask = edit.slice(edit.indexOf('function editLink() {'), edit.indexOf('\n  }\n', edit.indexOf('function editLink() {')));
  assert.match(ask, /linkField = activeText;\s*linkBlockId = activeBlockId;/, 'the text and its block are kept as the link is asked for');
  assert.ok(ask.indexOf('linkField = activeText;') < ask.indexOf("post({ type: 'urd-link-edit'"), 'before the editor is asked');
  const apply = body('textLinkApply = (link, pages) => {');
  assert.ok(apply.length > 100, 'the answer\'s handler is found');
  assert.doesNotMatch(apply, /if \(!activeText\?\.isConnected\) return;/, 'the toolbar\'s own text, which the dialog took the focus from, is not asked for');
  assert.match(apply, /const field = linkTarget\(\);/, 'the text the link was asked for');
  assert.match(apply, /activeText = field;\s*activeBlockId = linkBlockId;\s*activeText\.focus\(\{ preventScroll: true \}\);\s*restoreSelection\(\);/, 'the words chosen are chosen again on that text');
  // A text drawn anew meanwhile: the text in its place in its block, and the words chosen again in it by their paths.
  assert.match(ask, /linkFieldIndex = fields\.indexOf\(activeText\);/);
  assert.match(ask, /start: pathTo\(activeText, range\.startContainer\), startOffset: range\.startOffset, end: pathTo\(activeText, range\.endContainer\), endOffset: range\.endOffset/);
  const target = edit.slice(edit.indexOf('const linkTarget = () => {'), edit.indexOf('\n  };\n', edit.indexOf('const linkTarget = () => {')));
  assert.match(target, /if \(linkField\?\.isConnected\) return linkField;/);
  assert.match(target, /const field = fields\?\.\[linkFieldIndex\] \?\? null;/, 'the text in its own place, not the block\'s first');
  assert.match(target, /const start = nodeAt\(field, linkWords\.start\);\s*const end = nodeAt\(field, linkWords\.end\);/);
  assert.match(target, /savedRange = range;/, 'the words chosen are chosen again in the new text');
});

test('in the Clean view, which shows the page as visitors see it, every link in a block is followed, and a press on one keeps its click', () => {
  const start = edit.indexOf("document.addEventListener('click', (event) => {\n  if (event.defaultPrevented) return;\n  const a = eventTarget(event)?.closest('a[href]')");
  assert.ok(start > 0, 'the preview\'s link handler is found');
  const click = edit.slice(start, edit.indexOf('\n});\n', start));
  assert.match(click, /if \(a\.closest\('\.urd-block'\) && !chromeOff && !linksRow && !cartDrawer\) \{\s*event\.preventDefault\(\);/, 'only while editing does a link in a block wait');
  assert.match(click, /if \(\(chromeOff \|\| linksRow\) && url\.origin !== location\.origin && a\.target === '_blank'\) return;/, 'a new tab of its own is the browser\'s');
  assert.match(click, /if \(a\.hasAttribute\('download'\)\) return;/, 'a file to save is the browser\'s');
  assert.match(click, /if \(url\.origin === location\.origin && !\/\\\.\[a-z0-9\]\{2,5\}\$\/i\.test\(url\.pathname\)\) \{\s*post\(\{ type: 'urd-navigate'/, 'a file of the site opens in a tab, a page through the editor');
  assert.match(edit, /handle\.addEventListener\('pointerdown', \(event\) => \{\s*if \(opts\.surface\) \{\s*\/\/[^\n]*\n\s*if \(document\.body\.classList\.contains\('urd-chrome-off'\)\) return;/, 'no press in the Clean view selects or drags a block, so the link keeps its click');
  // The pointer says the link is followed, over the block's move cursor and an editable text's caret.
  const css = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8');
  assert.match(css, /\.urd-preview\.urd-chrome-off \.urd-editable a\[href\],\s*\.urd-preview\.urd-chrome-off \.urd-editable a\[href\] \* \{\s*cursor: pointer;/);
});

test('in the Clean view every text written in place is plain text, as on the published page, and editable again as the editing view returns', () => {
  const urd = readFileSync(new URL(`../template/assets/engine/${ENGINE}/urd.js`, import.meta.url), 'utf8');
  assert.match(urd, /document\.body\.classList\.toggle\('urd-chrome-off', !msg\.visible\);[\s\S]{0,400}cleanTexts\(!msg\.visible\);/, 'the switch to the Clean view makes the texts plain');
  const start = urd.indexOf('function cleanTexts(on) {');
  const clean = urd.slice(start, urd.indexOf('\n}\n', start));
  assert.match(clean, /querySelectorAll\('\[contenteditable="true"\], \[contenteditable="plaintext-only"\]'\)/, 'both kinds of text written in place');
  assert.match(clean, /node\.dataset\.urdEditable = node\.getAttribute\('contenteditable'\);\s*node\.setAttribute\('contenteditable', 'false'\);/, 'its own kind kept');
  assert.match(clean, /cleanWatcher = new MutationObserver\(\(records\) => \{[\s\S]*?plain\(\);/, 'a text drawn while the Clean view stands is made plain too');
  assert.match(clean, /node\.setAttribute\('contenteditable', node\.dataset\.urdEditable\);\s*delete node\.dataset\.urdEditable;/, 'and given back');
  assert.match(clean, /records\.some\(\(record\) => \[\.\.\.record\.addedNodes\]\.some\(\(node\) => node\.nodeType === Node\.ELEMENT_NODE\)\)/, 'read again only as an element comes');
  // A text the blocks draw as plain text in the Clean view would be left out of the giving back, so they draw it editable and leave the Clean view to cleanTexts.
  const calendar = readFileSync(new URL(`../template/assets/engine/${ENGINE}/blocks/calendar.js`, import.meta.url), 'utf8');
  assert.doesNotMatch(calendar, /contentEditable = clean\(\)/);
  assert.match(calendar, /node\.classList\.add\('urd-text'\);\s*node\.contentEditable = 'true';/);
  // In the Clean view the basket opens its drawer at a press, as on the published page.
  assert.match(readFileSync(new URL(`../template/assets/engine/${ENGINE}/blocks/cart.js`, import.meta.url), 'utf8'), /openArmed = document\.body\.classList\.contains\('urd-chrome-off'\) \|\|/);
});
