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
import { initAdminLocale } from '$engine/i18n.js';
import App from './App.svelte';

// Dokumentets lang settes fra det som FAKTISK ble lastet: et valgt
// språkpakke-språk som ikke lenger er installert faller til bokmål, og da
// skal attributtet følge teksten.
document.documentElement.lang = await initAdminLocale();

export default mount(App, { target: document.getElementById('urd-admin') });
