import { resolveLink } from './nav-model.js';

/** The attributes that hold an address something may run from. */
const ADDRESS_ATTRIBUTES = new Set(['href', 'xlink:href', 'src', 'action', 'formaction', 'poster', 'background']);
/** The elements stripped wherever owner or imported text is drawn; an SVG's animation elements are named as SVG writes them, since a selector matches them by their case. */
const ACTIVE_ELEMENTS = 'script, iframe, frame, frameset, object, embed, applet, portal, form, input, button, select, textarea, meta, base, link, style, animate, set, animateMotion, animateTransform';
/** A picture inline as data, in a format that runs nothing: kept where a picture is drawn, a video's poster and an SVG's image. */
const DATA_PICTURE = /^data:image\/(?:png|jpeg|gif|webp|avif)[;,]/i;

/**
 * Shared visitor-side protection for rich text (text blocks and collection entries): pasted or stored HTML can carry event attributes or active elements, and legitimate formatting never needs either.
 * The owner is trusted for MARKUP; executable code is always stripped at render, an address that would run code included.
 * With the page register a link to a page or a spot on it (data-urd-page, data-urd-target, written by the link editor) gets the address the page has now, so a change of the page's address never breaks it.
 * @param {Element} root
 * @param {Array<{id: string, path: string}>} [pages]
 */
export function stripActiveContent(root, pages = null) {
  for (const el of root.querySelectorAll('*')) {
    for (const attr of [...el.attributes]) {
      const name = attr.name.toLowerCase();
      if (name.startsWith('on')) {
        el.removeAttribute(attr.name);
        continue;
      }
      // Every attribute an address can run from, an SVG's xlink:href and a field's formaction among them, read as the URL parser reads it: tabs, newlines and control characters inside the scheme are dropped there, so they are dropped for the check too.
      if (!ADDRESS_ATTRIBUTES.has(name)) continue;
      const address = attr.value.replace(/[\u0000-\u0020\u007f]/g, '');
      const keptData = name === 'src' || ((name === 'poster' || el.tagName.toLowerCase() === 'image') && DATA_PICTURE.test(address));
      if (/^(?:javascript|vbscript):/i.test(address) || (/^data:/i.test(address) && !keptData)) el.removeAttribute(attr.name);
    }
  }
  // Elements no text needs that act on their own: a form or its fields post wherever a press reaches, a meta refreshes or redirects the page, a base moves every link, a link or a style pulls in or changes the page's look, and an SVG animation can set a link's address after the check.
  root.querySelectorAll(ACTIVE_ELEMENTS).forEach((n) => n.remove());
  if (!pages) return;
  for (const a of root.querySelectorAll('a[data-urd-page], a[data-urd-target]')) {
    a.setAttribute('href', resolveLink({ page: a.dataset.urdPage, target: a.dataset.urdTarget }, pages).href);
  }
}

const KEPT_TAGS = new Set(['P', 'BR', 'UL', 'OL', 'LI', 'B', 'STRONG', 'I', 'EM', 'U', 'BLOCKQUOTE', 'A']);
const DROPPED_TAGS = new Set(['SCRIPT', 'STYLE', 'HEAD', 'TITLE', 'IFRAME', 'OBJECT', 'EMBED', 'FORM', 'INPUT', 'BUTTON', 'SELECT', 'TEXTAREA', 'SVG', 'MATH', 'IMG', 'PICTURE', 'VIDEO', 'AUDIO', 'CANVAS', 'LINK', 'META', 'BASE', 'TEMPLATE', 'NOSCRIPT']);

/**
 * HTML from a source nobody on the site wrote (a calendar feed), as a fragment built from an allowlist: paragraphs, line breaks, lists, bold, italic, underline, quotes and links to http, https and mailto addresses, with no attribute carried over.
 * A heading becomes a bold paragraph, any other wrapper gives way to its content, and scripts, styles, forms, pictures and embedded content are left out with everything in them.
 * The markup is parsed in an inert document, so nothing in it loads or runs.
 */
export function safeHtmlFragment(html) {
  const doc = new DOMParser().parseFromString(String(html ?? ''), 'text/html');
  const copy = (from, to) => {
    for (const node of from.childNodes) {
      if (node.nodeType === 3) {
        to.appendChild(document.createTextNode(node.nodeValue));
        continue;
      }
      if (node.nodeType !== 1) continue;
      const tag = node.tagName.toUpperCase();
      if (DROPPED_TAGS.has(tag)) continue;
      if (/^H[1-6]$/.test(tag)) {
        const strong = document.createElement('strong');
        copy(node, strong);
        to.appendChild(document.createElement('p')).appendChild(strong);
      } else if (tag === 'DIV') {
        copy(node, to.appendChild(document.createElement('p')));
      } else if (!KEPT_TAGS.has(tag)) {
        copy(node, to);
      } else {
        const el = document.createElement(tag.toLowerCase());
        if (tag === 'A') {
          let address = null;
          try { address = new URL(node.getAttribute('href') ?? '', 'https://invalid.invalid/'); } catch { /* no address */ }
          if (address && ['http:', 'https:', 'mailto:'].includes(address.protocol) && address.hostname !== 'invalid.invalid') {
            el.href = address.href;
            el.target = '_blank';
            el.rel = 'noopener';
          }
        }
        copy(node, el);
        to.appendChild(el);
      }
    }
  };
  const fragment = document.createDocumentFragment();
  copy(doc.body, fragment);
  return fragment;
}

/**
 * Plain text from rich text (cart lines, emptiness checks, panel summaries): the markup is parsed in an inert document and the text content read out, so no tag remnants can survive the way they can with a regex pass.
 */
export function plainText(html) {
  const doc = new DOMParser().parseFromString(String(html ?? ''), 'text/html');
  return (doc.body.textContent ?? '').trim();
}

/**
 * The lines of a text that may be written as rich text, such as a feed's event description: markup (a tag or an entity) is parsed in an inert document, a line break and the end of a block become new lines, and the text content is read out.
 * Text without markup comes back as it is.
 */
export function plainLines(text) {
  const source = String(text ?? '');
  if (!/<[a-z!/][^>]*>|&#?\w+;/i.test(source)) return source;
  const doc = new DOMParser().parseFromString(source, 'text/html');
  for (const br of doc.body.querySelectorAll('br')) br.replaceWith('\n');
  for (const block of doc.body.querySelectorAll('p, div, li, h1, h2, h3, h4, h5, h6, blockquote, tr')) block.append('\n');
  return doc.body.textContent ?? '';
}
