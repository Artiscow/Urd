/**
 * The plugins: the installed set, the manifests, the discovery of plugins in the repo, the live CSP, and the plugin blocks the preview reports.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { createDraftStore } from '../lib/draftStore.js';
import { validateManifest, satisfiesEngine } from '$engine/plugins.js';
import { ta } from '$engine/i18n.js';
import { historyState } from './history.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';

// plugins.json goes through the same draft flow as the rest: changes are
// drafts until they are published. Note: the preview loads plugins from
// the SERVER at boot, so activation shows only after publish and deploy.
let pluginsStore = null;

/** Explicit promise that exists from the first moment: onReady ALWAYS
 *  waits on it, so a fast iframe can never get an empty plugin list. */
let resolvePluginsReady;

const pluginsReady = new Promise((resolve) => { resolvePluginsReady = resolve; });

let pluginsView = $state(null);

let pluginInfo = $state({});

let pluginEngine = $state('0.0.0');

/** Plugin directories found in the repo (via the publishing layer) that are not in plugins.json yet. */
let pluginsFound = $state([]);

/** The plugins enabled in the PUBLISHED plugins.json (not the draft):
 *  the admin language picker can only offer language packs the engine
 *  can already load. */
let publishedPluginIds = $state([]);

/** 'pending' | 'ok' | 'unavailable': the type-a-name field is only a fallback when discovery does not work. */
let pluginDiscovery = $state('pending');

/** All plugin ids the panel knows: enabled + disabled. */
const knownPlugins = () => [...new Set([...(pluginsView?.enabled ?? []), ...(pluginsView?.disabled ?? [])])];

/** The plugins removed in the draft, whose folders the next publish deletes: never offered as found. */
const removing = () => pluginsView?.remove ?? [];

function syncPluginsView() {
  pluginsView = JSON.parse(JSON.stringify(pluginsStore.data));
}

/** The site's LIVE CSP, read from the response headers (Cloudflare sets
 *  it from _headers on all paths). null = not loaded; {unknown: true} =
 *  no CSP header (local development): then nothing is blocked, and the
 *  instructions would just be noise. */
let liveCsp = $state(null);

async function loadLiveCsp() {
  try {
    const res = await fetch('/urd.json', { cache: 'no-store' });
    const header = res.headers.get('content-security-policy');
    if (!header) { liveCsp = { unknown: true }; return; }
    const directive = (name) => new Set(
      (header.split(';').map((s) => s.trim()).find((s) => s.startsWith(`${name} `)) ?? '')
        .split(/\s+/).slice(1),
    );
    liveCsp = { frameSrc: directive('frame-src'), connectSrc: directive('connect-src'), scriptSrc: directive('script-src') };
  } catch {
    liveCsp = { unknown: true };
  }
}

async function initPlugins() {
  loadLiveCsp();
  let published = { version: 1, enabled: [] };
  try {
    published = await (await fetch('/plugins/plugins.json')).json();
  } catch { /* no plugin index is perfectly fine */ }
  publishedPluginIds = published.enabled ?? [];
  pluginsStore = createDraftStore('urd-draft-plugins', () => published, shellState.draftSaveError);
  syncPluginsView();
  try {
    pluginEngine = (await (await fetch('/urd.json')).json()).engine ?? '0.0.0';
  } catch { /* without the manifest, version requirements are shown unassessed */ }
  for (const id of knownPlugins()) loadPluginInfo(id);
  discoverPlugins();
  resolvePluginsReady();
  // Belt and suspenders against the ready race: if the iframe has
  // already reported in, the list is pushed now.
  previewState.bridge?.sendPlugins($state.snapshot(pluginsView)?.enabled ?? []);
}

/** Asks the publishing layer for the plugin directories in the repo
 *  (static hosting cannot list directories). An unavailable endpoint
 *  (local server, not logged in) is perfectly fine: then the
 *  type-a-name flow applies. */
async function discoverPlugins() {
  try {
    const res = await fetch('/api/github/plugins');
    if (!res.ok) {
      useCachedDiscovery();
      return;
    }
    const { plugins } = await res.json();
    localStorage.setItem('urd-plugins-found', JSON.stringify(plugins ?? []));
    pluginsFound = (plugins ?? []).filter((id) => !knownPlugins().includes(id) && !removing().includes(id));
    for (const id of pluginsFound) loadPluginInfo(id);
    pluginDiscovery = 'ok';
  } catch {
    useCachedDiscovery();
  }
}

/** Rate-limited/unavailable endpoint: show the last known find list from the local cache instead of nothing. */
function useCachedDiscovery() {
  try {
    const cached = JSON.parse(localStorage.getItem('urd-plugins-found') ?? '[]');
    if (Array.isArray(cached) && cached.length) {
      pluginsFound = cached.filter((id) => !knownPlugins().includes(id) && !removing().includes(id));
      for (const id of pluginsFound) loadPluginInfo(id);
      pluginDiscovery = 'ok';
      return;
    }
  } catch { /* a corrupt cache is ignored */ }
  pluginDiscovery = 'unavailable';
}

/** Fetches and assesses one plugin's manifest (name, version, requirements, provides, csp). */
async function loadPluginInfo(id) {
  try {
    const manifest = await (await fetch(`/plugins/${id}/plugin.json`)).json();
    const errors = validateManifest(manifest);
    pluginInfo[id] = {
      ...manifest,
      errors,
      satisfied: errors.length === 0 && satisfiesEngine(pluginEngine, manifest.requiresEngine),
    };
  } catch {
    pluginInfo[id] = { name: id, errors: [ta('plugin.manifestNotFound', { id })], satisfied: false };
  }
}

function setPluginEnabled(id, on) {
  historyState.pushHistory('plugins');
  const d = pluginsStore.data;
  d.enabled = (d.enabled ?? []).filter((x) => x !== id);
  d.disabled = (d.disabled ?? []).filter((x) => x !== id);
  if (on) d.enabled.push(id);
  else d.disabled.push(id);
  // A plugin taken back into the lists keeps its folder.
  if (d.remove) {
    d.remove = d.remove.filter((x) => x !== id);
    if (!d.remove.length) delete d.remove;
  }
  pluginsStore.save();
  historyState.updateDirty();
  syncPluginsView();
  previewState.reloadPreview();
}

/** Removes the plugin from both lists and marks its folder in plugins/ for the next publish to delete (`remove` in the draft, never written into plugins.json). */
function removePlugin(id) {
  historyState.pushHistory('plugins');
  const d = pluginsStore.data;
  d.enabled = (d.enabled ?? []).filter((x) => x !== id);
  d.disabled = (d.disabled ?? []).filter((x) => x !== id);
  d.remove = [...new Set([...(d.remove ?? []), id])];
  pluginsStore.save();
  historyState.updateDirty();
  syncPluginsView();
  previewState.reloadPreview();
}

/** The plugin blocks in the Blocks panel: the preview reported
 *  type/label/defaults at plugin load (urd-plugin-blocks), so the block
 *  can be built here. */
let pluginBlocks = $state([]);

/** What the other parts read and write through, and the effects the shell runs once. */
export const pluginsState = {
  get pluginsStore() { return pluginsStore; },
  set pluginsStore(v) { pluginsStore = v; },
  get resolvePluginsReady() { return resolvePluginsReady; },
  set resolvePluginsReady(v) { resolvePluginsReady = v; },
  pluginsReady,
  get pluginsView() { return pluginsView; },
  set pluginsView(v) { pluginsView = v; },
  get pluginInfo() { return pluginInfo; },
  set pluginInfo(v) { pluginInfo = v; },
  get pluginEngine() { return pluginEngine; },
  set pluginEngine(v) { pluginEngine = v; },
  get pluginsFound() { return pluginsFound; },
  set pluginsFound(v) { pluginsFound = v; },
  get publishedPluginIds() { return publishedPluginIds; },
  set publishedPluginIds(v) { publishedPluginIds = v; },
  get pluginDiscovery() { return pluginDiscovery; },
  set pluginDiscovery(v) { pluginDiscovery = v; },
  knownPlugins,
  syncPluginsView,
  get liveCsp() { return liveCsp; },
  set liveCsp(v) { liveCsp = v; },
  loadLiveCsp,
  initPlugins,
  discoverPlugins,
  useCachedDiscovery,
  loadPluginInfo,
  setPluginEnabled,
  removePlugin,
  get pluginBlocks() { return pluginBlocks; },
  set pluginBlocks(v) { pluginBlocks = v; },
};
