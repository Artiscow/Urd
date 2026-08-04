/**
 * Editorens inngangspunkt. Bygges til template/admin/assets/editor.js
 * og lastes av template/admin/index.html.
 *
 * Admin-språket (ADR-0012) avgjøres FØR appen monteres: deteksjonen og
 * ordbok-lastingen bor i motorens i18n.js (delt med preview-chromen) -
 * eksplisitt valg i localStorage vinner, ellers enhetens språk, ellers
 * engelsk. Ordbøkene kjøretids-importeres og bundles aldri.
 */
import { mount } from 'svelte';
import { detectAdminLang, initAdminLocale } from '../../template/assets/engine/i18n.js';
import App from './App.svelte';

const lang = detectAdminLang();
document.documentElement.lang = lang;
await initAdminLocale(lang);

export default mount(App, { target: document.getElementById('urd-admin') });
