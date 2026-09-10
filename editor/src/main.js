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

// The document lang is set from what was ACTUALLY loaded: a chosen
// language-pack language that is no longer installed falls back to the base
// language (nb), and the attribute has to follow the text.
document.documentElement.lang = await initAdminLocale();

export default mount(App, { target: document.getElementById('urd-admin') });
