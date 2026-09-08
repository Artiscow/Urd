/**
 * Tests for the link guard in the content blocks: user-controlled href must
 * pass isSafeHref (the isSafeUrl schemes plus site-internal paths and
 * anchors), so javascript:/data: never becomes a live link. The button is
 * tested with a minimal document stub; the DOM-heavy blocks
 * (image/collection/gallery) use the same guard and are covered by the
 * test-round checks.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { buttonBlock } = await engineImport('blocks/button.js');
const { isSafeHref } = await engineImport('nav-model.js');

/** The smallest possible element stub: enough for buttonBlock.render. */
function makeElement() {
  return { className: '', textContent: '', href: null, children: [], appendChild(child) { this.children.push(child); } };
}

function renderButton(props) {
  globalThis.document = { createElement: () => makeElement() };
  try {
    const el = makeElement();
    buttonBlock.render(el, props, { site: { pages: [{ id: 'hjem', path: '/' }] } });
    return el.children[0];
  } finally {
    delete globalThis.document;
  }
}

test('isSafeHref: external schemes plus internal paths and anchors, never protocol-relative or script', () => {
  for (const ok of ['https://x.no', 'mailto:a@b.no', '/om-oss', '/om-oss#kart', '#', '#kontakt']) {
    assert.equal(isSafeHref(ok), true, ok);
  }
  for (const bad of ['//evil.no', '/\\evil.no', '/x\\y', 'javascript:alert(1)', 'data:text/html,x', 'om-oss', '', null]) {
    assert.equal(isSafeHref(bad), false, String(bad));
  }
});

test('button: safe external and internal href passes', () => {
  for (const ok of ['https://eksempel.no/side', '/om-oss', '#kontakt', '#']) {
    const a = renderButton({ label: 'Les mer', page: null, href: ok, style: 'primary' });
    assert.equal(a.href, ok, ok);
  }
});

test('button: an unsafe href becomes a dead link', () => {
  for (const bad of ['javascript:alert(1)', 'data:text/html,x', 'JavaScript:x', '//evil.no']) {
    const a = renderButton({ label: 'Les mer', page: null, href: bad, style: 'primary' });
    assert.equal(a.href, '#', bad);
  }
});

test('button: an internal page link is untouched by the guard', () => {
  const a = renderButton({ label: 'Hjem', page: 'hjem', href: null, style: 'primary' });
  assert.equal(a.href, '/');
});
