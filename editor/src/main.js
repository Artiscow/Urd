/**
 * The editor entry point. Built to template/admin/assets/editor.js
 * and loaded by template/admin/index.html.
 *
 * The admin language (ADR-0012) is settled BEFORE the app mounts: detection
 * and dictionary loading live in the engine's i18n.js (shared with the
 * preview chrome) - an explicit choice in localStorage wins, otherwise the
 * device language, otherwise English. The dictionaries are imported at
 * runtime and never bundled.
 */
import { mount } from 'svelte';
import { initAdminLocale } from '$engine/i18n.js';
import App from './App.svelte';
import { installSegSlide } from './lib/seg-slide.js';
import { installTipScope } from './lib/tip-scope.js';
// The admin's global stylesheet, after the components so its rules win a tie with theirs.
import './app.css';

// The app is mounted once the dictionary is in, from its promise rather than an await at the module's top, so the build gathers the code the admin starts with into editor.js (vite.config.js).
initAdminLocale().then((lang) => {
  // The document lang is set from what was ACTUALLY loaded: a chosen language-pack language that is not installed falls back to the base language (nb), and the attribute follows the text.
  document.documentElement.lang = lang;
  // A segment control's choice slides from the old button to the new one, in every panel and menu.
  installSegSlide();
  // A row's tooltip shows on its name, its fields and its buttons, not on its empty room.
  installTipScope();
  mount(App, { target: document.getElementById('urd-admin') });
});
