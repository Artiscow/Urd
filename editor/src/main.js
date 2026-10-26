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
// The admin's global stylesheet, after the components so its rules win a tie with theirs.
import './app.css';

// The document lang is set from what was ACTUALLY loaded: a chosen
// language-pack language that is no longer installed falls back to the base
// language (nb), and the attribute has to follow the text.
document.documentElement.lang = await initAdminLocale();

// A segment control's choice slides from the old button to the new one, in every panel and menu.
installSegSlide();

export default mount(App, { target: document.getElementById('urd-admin') });
