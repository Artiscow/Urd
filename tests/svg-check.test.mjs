/**
 * The SVG check (svgProblem): the editor's copy in the engine's imageTools.js, used at upload, for a CSV file's pictures and at publishing, and the publishing guard's in functions/_lib/svg-check.js, held to the same text.
 * The hostile samples hide a script behind a prefix, a character reference, a declaration of their own or an animation; the benign ones are what drawing programs write.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';
import { engineImport } from './_engine.mjs';
import { svgProblem as guardCheck } from '../template/functions/_lib/svg-check.js';
import { isAllowedContent } from '../template/functions/_lib/guard.js';

register('./_svelte-loader.mjs', import.meta.url);
const { svgProblem, svgDataText, svgToDataUrl } = await engineImport('imageTools.js');
const { readCsv } = await engineImport('collections-csv.js');
const { materializeField } = await import('../editor/src/lib/materialize.js');

const base64 = (text) => Buffer.from(text, 'utf8').toString('base64');
const svg = (inner, attrs = '') => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10"${attrs}>${inner}</svg>`;

const HOSTILE = [
  ['script', svg('<script>alert(1)</script>')],
  ['script in capitals', svg('<SCRIPT>alert(1)</SCRIPT>')],
  ['a prefixed script', svg('<s:script xmlns:s="http://www.w3.org/2000/svg">alert(1)</s:script>')],
  ['foreignObject', svg('<foreignObject><body xmlns="http://www.w3.org/1999/xhtml"><img src="x" onerror="alert(1)"/></body></foreignObject>')],
  ['an iframe', svg('<iframe src="https://evil.example"/>')],
  ['a handler element', svg('<handler type="application/ecmascript">alert(1)</handler>')],
  ['onload on the root', svg('<rect/>', ' onload="alert(1)"')],
  ['a prefixed handler', svg('<rect ev:onclick="alert(1)"/>')],
  ['a link to a script', svg('<a href="javascript:alert(1)"><rect/></a>')],
  ['an xlink to a script, by reference', svg('<a xlink:href="&#106;avascript:alert(1)"><rect/></a>')],
  ['a scheme split by a tab reference', svg('<a href="java&#x09;script:alert(1)"><rect/></a>')],
  ['a scheme in hex references', svg('<a href="&#x6A;&#x61;&#x76;&#x61;script:alert(1)"><rect/></a>')],
  ['a declared entity', `<?xml version="1.0"?><!DOCTYPE svg [<!ENTITY x "javascript:alert(1)">]>${svg('<a href="&x;"><rect/></a>')}`],
  ['a parameter entity', `<!DOCTYPE svg [<!ENTITY % p "x">]>${svg('<rect/>')}`],
  ['an external entity', `<!DOCTYPE svg [<!ENTITY x SYSTEM "https://evil.example/x">]>${svg('<text>&x;</text>')}`],
  ['a declared attribute default', `<!DOCTYPE svg [<!ATTLIST a href CDATA "javascript:alert(1)">]>${svg('<a><rect/></a>')}`],
  ['an entity holding markup', `<!DOCTYPE svg [<!ENTITY x "&#60;script&#62;">]>${svg('<rect/>')}`],
  ['an entity used but never declared', svg('<a href="&js;alert(1)"><rect/></a>')],
  ['an entity declared outside a doctype', `<!ENTITY x "y">${svg('<rect/>')}`],
  ['a script after CDATA that looks like an open quote', svg('<text><![CDATA[<x a="]]></text><script>alert(document.domain)</script><text><![CDATA["]]></text>')],
  ['a script between CDATA that looks like a comment', svg('<style><![CDATA[ /* <!-- */ ]]></style><script>alert(1)</script><style><![CDATA[ /* --> */ ]]></style>')],
  ['a script between instructions that look like a comment', svg('<?x <!-- ?><script>alert(1)</script><?x --> ?>')],
  ['a script between instructions that look like a quote', svg('<?x <y a=" ?><script>alert(1)</script><?x " ?>')],
  ['a script between comments that look like CDATA', svg('<!-- <![CDATA[ --><script>alert(1)</script><!-- ]]> -->')],
  ['a comment never closed', svg('<!-- <rect/>')],
  ['a stylesheet instruction', `<?xml-stylesheet type="text/xsl" href="data:text/xsl,x"?>${svg('<rect/>')}`],
  ['an animation of the address', svg('<a href="#"><animate attributeName="href" values="javascript:alert(1)"/><rect/></a>')],
  ['a set of the xlink address', svg('<a><set attributeName="xlink:href" to="https://evil.example"/><rect/></a>')],
  ['an SVG inside as data', svg('<use href="data:image/svg+xml;base64,PHN2Zz4="/>')],
  ['an HTML page as data', svg('<image href="data:text/html,&lt;script&gt;alert(1)&lt;/script&gt;"/>')],
  ['a script address in a style', svg('<style>@import url("javascript:alert(1)");</style><rect/>')],
  ['vbscript', svg('<a href="vbscript:msgbox(1)"><rect/></a>')],
];

const BENIGN = [
  ['a logo', svg('<title>Logo</title><path d="M0 0h10v10z" fill="#123456"/>')],
  ['a gradient and a symbol by id', svg('<defs><linearGradient id="g"><stop offset="0" stop-color="red"/></linearGradient><symbol id="s"><rect/></symbol></defs><use xlink:href="#s" fill="url(#g)"/>')],
  ['a raster picture inside', svg('<image href="data:image/png;base64,iVBORw0KGgo=" width="10" height="10"/>')],
  ['a comment and an XML declaration', `<?xml version="1.0" encoding="UTF-8"?><!-- Generator: a drawing program -->${svg('<g opacity=".5"><circle r="4"/></g>')}`],
  ['a style block', svg('<style><![CDATA[.a{fill:#f00}]]></style><rect class="a"/>')],
  ['a link to a page', svg('<a href="https://example.no/"><rect/></a>')],
  ['an export with a public DTD', `<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">${svg('<rect/>')}`],
  ['an older Illustrator export with its namespaces as entities', `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [
	<!ENTITY ns_extend "http://ns.adobe.com/Extensibility/1.0/">
	<!ENTITY ns_ai "http://ns.adobe.com/AdobeIllustrator/10.0/">
	<!ENTITY ns_graphs "http://ns.adobe.com/Graphs/1.0/">
]>
<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><metadata><?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?><x:xmpmeta xmlns:x="adobe:ns:meta/"/><?xpacket end="w"?></metadata><g i:extraneous="self"><path d="M0 0h10v10z"/></g></svg>`],
  ['an Inkscape export', `<?xml version="1.0" encoding="UTF-8" standalone="no"?>${svg('<sodipodi:namedview xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" pagecolor="#ffffff" inkscape:zoom="1"/><g inkscape:label="Layer 1" inkscape:groupmode="layer"><rect style="fill:#000;stroke:none" width="5" height="5"/></g>', ' xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" sodipodi:docname="logo.svg"')}`],
  ['references in text and values', svg('<title>A &amp; B &#169; &#xA9;</title><text x="1" y="&#53;">&lt;tag&gt;</text>')],
  ['an animation of an opacity', svg('<rect><animate attributeName="opacity" values="0;1;0" dur="2s"/></rect>')],
];

test('the hostile samples are refused by both copies, each for its reason', () => {
  for (const [name, text] of HOSTILE) {
    assert.notEqual(svgProblem(text), null, name);
    assert.equal(guardCheck(text), svgProblem(text), `${name}: the guard agrees`);
  }
  assert.equal(svgProblem(svg('<s:script>x</s:script>')), 'element');
  assert.equal(svgProblem(svg('<rect/>', ' onload="x"')), 'handler');
  assert.equal(svgProblem(HOSTILE.find(([n]) => n === 'a declared entity')[1]), 'scriptAddress');
  assert.equal(svgProblem(HOSTILE.find(([n]) => n === 'a declared attribute default')[1]), 'declaration');
  assert.equal(svgProblem(svg('<a><set attributeName="href" to="#x"/></a>')), 'animation');
  assert.equal(svgProblem(svg('<use href="data:image/svg+xml,x"/>')), 'dataAddress');
  assert.equal(svgProblem('<p>not a drawing</p>'), 'notSvg');
});

test('the check takes a time that grows with the length alone, on shapes made to slow a pattern down', () => {
  const shapes = ['<a'.repeat(100000), '<!--'.repeat(100000), `<${'a'.repeat(300000)}`, `<a b="${'<'.repeat(100000)}`, `<a ${'b '.repeat(100000)}`, '<![CDATA['.repeat(50000), '<?x '.repeat(100000)];
  for (const shape of shapes) {
    const start = performance.now();
    svgProblem(`<svg>${shape}`);
    guardCheck(`<svg>${shape}`);
    assert.ok(performance.now() - start < 2000, `${shape.slice(0, 12)}… took ${Math.round(performance.now() - start)} ms`);
  }
});

test('what drawing programs write passes both copies', () => {
  for (const [name, text] of BENIGN) {
    assert.equal(svgProblem(text), null, name);
    assert.equal(guardCheck(text), null, name);
  }
});

test('the guard\'s copy is the editor\'s function, word for word', () => {
  assert.equal(guardCheck.toString(), svgProblem.toString());
});

test('the upload refuses with svgUnsafe, and the guard refuses to publish such a file, as base64 or as text', () => {
  assert.throws(() => svgToDataUrl(HOSTILE[2][1]), (err) => err.code === 'svgUnsafe' && err.problem === 'element');
  assert.throws(() => svgToDataUrl('<p>x</p>'), /Invalid SVG/);
  assert.ok(svgToDataUrl(BENIGN[0][1]).dataUrl.startsWith('data:image/svg+xml;base64,'));
  for (const [name, text] of HOSTILE) {
    assert.equal(isAllowedContent('media/images/logo.svg', base64(text), 'base64'), false, name);
    assert.equal(isAllowedContent('media/images/logo.SVG', text, 'utf-8'), false, name);
  }
  assert.equal(isAllowedContent('media/images/logo.svg', base64(BENIGN[1][1]), 'base64'), true);
  assert.equal(isAllowedContent('media/images/logo.svg', 'not base64 at all!', 'base64'), false);
});

test('svgDataText reads an SVG data URL in base64 or percent-encoding, and nothing else', () => {
  const text = BENIGN[0][1];
  assert.equal(svgDataText(`data:image/svg+xml;base64,${base64(text)}`), text);
  assert.equal(svgDataText(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(text)}`), text);
  assert.equal(svgDataText('data:image/png;base64,iVBORw0KGgo='), null);
  assert.equal(svgDataText('data:image/svg+xml,%E0%A4%A'), null);
});

test('a CSV picture cell: a path, a raster picture or a clean SVG is taken; a scripted SVG and another kind of data are refused', () => {
  const read = (image) => readCsv(`title,image\nKake,"${image}"\n`, 'news').rows[0];
  assert.equal(read('/media/images/kake.webp').problem ?? null, null);
  assert.equal(read('data:image/jpeg;base64,/9j/4AAQ').problem ?? null, null);
  assert.equal(read(`data:image/svg+xml;base64,${base64(BENIGN[0][1])}`).problem ?? null, null);
  const bad = read(`data:image/svg+xml;base64,${base64(HOSTILE[0][1])}`).problem;
  assert.deepEqual(bad, { key: 'svgUnsafe', column: 'image' });
  assert.equal(read('data:text/html;base64,PHA+').problem.key, 'image');
  assert.equal(read(`data:image/svg+xml,${encodeURIComponent(BENIGN[0][1])}`).problem.key, 'image', 'an SVG not in base64 could not be published as a file');
});

test('publishing writes a clean SVG to media/, and keeps a scripted one or one not in base64 as a data address the page draws as a picture', () => {
  const files = [];
  const good = { src: `data:image/svg+xml;base64,${base64(BENIGN[0][1])}` };
  materializeField(good, 'src', 'logo', files);
  assert.match(good.src, /^\/media\/.+\.svg$/);
  const bad = { src: `data:image/svg+xml;base64,${base64(HOSTILE[0][1])}` };
  const kept = bad.src;
  materializeField(bad, 'src', 'logo', files);
  assert.equal(bad.src, kept);
  const percent = { src: `data:image/svg+xml,${encodeURIComponent(BENIGN[0][1])}` };
  materializeField(percent, 'src', 'logo', files);
  assert.ok(percent.src.startsWith('data:image/svg+xml,'));
  assert.equal(files.length, 1);
});
