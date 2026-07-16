/**
 * Editorens inngangspunkt. Bygges til template/admin/assets/editor.js
 * og lastes av template/admin/index.html.
 */
import { mount } from 'svelte';
import App from './App.svelte';

export default mount(App, { target: document.getElementById('urd-admin') });
