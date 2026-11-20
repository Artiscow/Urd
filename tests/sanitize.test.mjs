/**
 * The cleaner of owner and imported rich text (stripActiveContent in sanitize.js), run on a small stand-in for the DOM: event attributes and every address a script could run from are removed, and so is each element that acts on its own (a form and its fields, a meta, a base, a link, a style, a script, an embed).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { stripActiveContent } = await engineImport('sanitize.js');

/** A stand-in element: a tag, attributes and children, with the few DOM calls the cleaner makes. */
function el(tag, attrs = {}, children = []) {
  const node = {
    tagName: tag.toUpperCase(),
    attributes: Object.entries(attrs).map(([name, value]) => ({ name, value })),
    children: [],
    parent: null,
    getAttribute(name) { return this.attributes.find((a) => a.name === name)?.value ?? null; },
    removeAttribute(name) { this.attributes = this.attributes.filter((a) => a.name !== name); },
    remove() { if (this.parent) this.parent.children = this.parent.children.filter((c) => c !== this); },
    querySelectorAll(selector) {
      const all = [];
      const walk = (n) => n.children.forEach((c) => { all.push(c); walk(c); });
      walk(this);
      if (selector === '*') return all;
      const tags = selector.split(',').map((s) => s.trim().toUpperCase());
      assert.ok(tags.every((t) => /^[A-Z]+$/.test(t)), `a selector of tag names: ${selector}`);
      return all.filter((n) => tags.includes(n.tagName));
    },
  };
  for (const child of children) { child.parent = node; node.children.push(child); }
  return node;
}

const tags = (root) => root.querySelectorAll('*').map((n) => n.tagName.toLowerCase());
const attr = (node, name) => node.getAttribute(name);

test('event attributes go in every case, and other attributes stay', () => {
  const p = el('p', { onclick: 'x()', ONMOUSEOVER: 'y()', class: 'lead' });
  stripActiveContent(el('div', {}, [p]));
  assert.deepEqual(p.attributes.map((a) => a.name), ['class']);
});

test('an address that runs a script goes from every attribute that holds one, a scheme split by tabs or control characters included', () => {
  const a = el('a', { href: 'java\tscript:alert(1)' });
  const ok = el('a', { href: 'https://example.no/side' });
  const use = el('use', { 'xlink:href': 'javascript:alert(1)' });
  const video = el('video', { poster: 'data:image/svg+xml,<svg onload=alert(1)>', src: 'vbscript:x' });
  const td = el('td', { background: ' javascript:alert(1)' });
  const img = el('img', { src: 'data:image/png;base64,iVBORw0KGgo=' });
  const area = el('area', { href: 'data:text/html,<script>alert(1)</script>' });
  stripActiveContent(el('div', {}, [a, ok, use, video, td, img, area]));
  assert.equal(attr(a, 'href'), null);
  assert.equal(attr(ok, 'href'), 'https://example.no/side');
  assert.equal(attr(use, 'xlink:href'), null);
  assert.equal(attr(video, 'poster'), null);
  assert.equal(attr(video, 'src'), null);
  assert.equal(attr(td, 'background'), null);
  assert.equal(attr(img, 'src'), 'data:image/png;base64,iVBORw0KGgo=', 'a picture inline as data stays');
  assert.equal(attr(area, 'href'), null, 'a data address to go to is refused');
});

test('a picture inline as data stays on a poster and an SVG image in a format that runs nothing, and an SVG animation that could set a link goes', () => {
  const video = el('video', { poster: 'data:image/jpeg;base64,/9j/4AAQ' });
  const image = el('image', { href: 'data:image/png;base64,iVBORw0KGgo=', 'xlink:href': 'data:image/webp;base64,UklGR' });
  const svgImage = el('image', { href: 'data:image/svg+xml,<svg onload=alert(1)>' });
  const use = el('use', { href: 'data:image/png;base64,iVBORw0KGgo=' });
  const link = el('a', { href: '#' }, [el('animate', { attributeName: 'href', values: 'javascript:alert(1)' }), el('set', { attributeName: 'href', to: 'javascript:alert(1)' })]);
  const root = el('svg', {}, [image, svgImage, use, link, el('animateMotion'), el('animateTransform')]);
  stripActiveContent(el('div', {}, [video, root]));
  assert.equal(attr(video, 'poster'), 'data:image/jpeg;base64,/9j/4AAQ');
  assert.equal(attr(image, 'href'), 'data:image/png;base64,iVBORw0KGgo=');
  assert.equal(attr(image, 'xlink:href'), 'data:image/webp;base64,UklGR');
  assert.equal(attr(svgImage, 'href'), null, 'an SVG inline can hold a script');
  assert.equal(attr(use, 'href'), null, 'only a picture element keeps data');
  assert.deepEqual(tags(root), ['image', 'image', 'use', 'a']);
});

test('a CSV title holding a form or a meta refresh is drawn without them, and its text formatting stays', () => {
  const root = el('div', {}, [
    el('p', {}, [el('b'), el('a', { href: '/om-oss' })]),
    el('form', { action: 'https://evil.example/collect' }, [el('input', { name: 'password' }), el('button', { formaction: 'javascript:x' })]),
    el('meta', { 'http-equiv': 'refresh', content: '0;url=https://evil.example' }),
    el('base', { href: 'https://evil.example/' }),
    el('link', { rel: 'stylesheet', href: 'https://evil.example/x.css' }),
    el('style'), el('script'), el('iframe'), el('object'), el('embed'), el('select'), el('textarea'),
  ]);
  stripActiveContent(root);
  assert.deepEqual(tags(root), ['p', 'b', 'a']);
});
