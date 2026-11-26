/**
 * The editor's entry point, built to template/admin/assets/editor.js: it mounts the app once the admin language (ADR-0012) and its dictionary are in.
 */
import { mount } from 'svelte';
import { initAdminLocale } from '$engine/i18n.js';
import App from './App.svelte';
import { installSegSlide } from './lib/seg-slide.js';
import { installTipScope } from './lib/tip-scope.js';
// The admin's global stylesheet, after the components so its rules win a tie with theirs.
import './app.css';

// The app mounts from the dictionary's promise, not a top-level await, so the build keeps the admin's start in editor.js.
initAdminLocale().then((lang) => {
  // The document's lang is the language actually loaded.
  document.documentElement.lang = lang;
  // A segment control's choice slides from the old button to the new one, in every panel and menu.
  installSegSlide();
  // A row's tooltip shows on its name, its fields and its buttons, not on its empty room.
  installTipScope();
  mount(App, { target: document.getElementById('urd-admin') });
});
