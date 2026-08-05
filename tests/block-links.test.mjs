/**
 * Test av lenke-vokteren i innholdsblokkene: brukerstyrt href skal gjennom
 * isSafeHref (isSafeUrl-skjemaene pluss site-interne stier og ankere), så
 * javascript:/data: aldri blir en levende lenke. Knappen testes med en minimal
 * document-stub; de DOM-tunge blokkene (bilde/samling/galleri) bruker samme
 * vokter og dekkes av testrunde-sjekkene.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { buttonBlock } = await engineImport('blocks/button.js');
const { isSafeHref } = await engineImport('nav-model.js');

/** Minste mulige element-stub: nok til buttonBlock.render. */
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

test('isSafeHref: eksterne skjemaer pluss interne stier og ankere, aldri protokoll-relativ eller skript', () => {
  for (const ok of ['https://x.no', 'mailto:a@b.no', '/om-oss', '/om-oss#kart', '#', '#kontakt']) {
    assert.equal(isSafeHref(ok), true, ok);
  }
  for (const bad of ['//evil.no', '/\\evil.no', '/x\\y', 'javascript:alert(1)', 'data:text/html,x', 'om-oss', '', null]) {
    assert.equal(isSafeHref(bad), false, String(bad));
  }
});

test('knapp: trygg ekstern og intern href består', () => {
  for (const ok of ['https://eksempel.no/side', '/om-oss', '#kontakt', '#']) {
    const a = renderButton({ label: 'Les mer', page: null, href: ok, style: 'primary' });
    assert.equal(a.href, ok, ok);
  }
});

test('knapp: utrygg href blir død lenke', () => {
  for (const bad of ['javascript:alert(1)', 'data:text/html,x', 'JavaScript:x', '//evil.no']) {
    const a = renderButton({ label: 'Les mer', page: null, href: bad, style: 'primary' });
    assert.equal(a.href, '#', bad);
  }
});

test('knapp: intern side-lenke er urørt av vokteren', () => {
  const a = renderButton({ label: 'Hjem', page: 'hjem', href: null, style: 'primary' });
  assert.equal(a.href, '/');
});
