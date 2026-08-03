/**
 * Editorens inngangspunkt. Bygges til template/admin/assets/editor.js
 * og lastes av template/admin/index.html.
 *
 * Admin-språket (ADR-0012) avgjøres FØR appen monteres: et eksplisitt
 * valg i localStorage 'urd-admin-lang' vinner; ellers matches enhetens
 * språk (navigator.languages) strengt mot de støttede - ingen treff gir
 * engelsk. Ordbøkene kjøretids-importeres fra motoren (aldri bundlet),
 * med bokmålsbasen i bunn så manglende nøkler faller tilbake dit; feiler
 * lastingen helt (f.eks. vite dev uten template-serveren) monteres appen
 * med nøklene synlige i stedet for å krasje.
 */
import { mount } from 'svelte';
import { normalizeLang, matchLang, initAdminDict } from '../../template/assets/engine/i18n.js';
import App from './App.svelte';

function detectAdminLang() {
  const stored = localStorage.getItem('urd-admin-lang');
  if (stored) return normalizeLang(stored);
  for (const cand of navigator.languages ?? [navigator.language]) {
    const hit = matchLang(cand);
    if (hit) return hit;
  }
  return 'en-GB';
}

const lang = detectAdminLang();
document.documentElement.lang = lang;

const loadDict = async (code) => {
  const mod = await import(/* @vite-ignore */ `/assets/engine/locales/admin/${code}.js`);
  return mod.default.strings;
};
let dict = {};
try {
  dict = await loadDict('nb');
  if (lang !== 'nb') Object.assign(dict, await loadDict(lang));
} catch { /* uten ordbok vises nøklene; appen skal aldri dø av dette */ }
initAdminDict(lang, dict);

export default mount(App, { target: document.getElementById('urd-admin') });
