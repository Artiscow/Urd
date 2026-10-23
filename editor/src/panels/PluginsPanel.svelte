<script>
  /* The Plugins panel: the installed plugins, the ones found in the repo, their CSP needs against the live headers, and adding one by id. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { ta, adminLang as currentAdminLang } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');
  const activePanel = $derived(ed.activePanel);
  const liveCsp = $derived(ed.liveCsp);
  const pluginDiscovery = $derived(ed.pluginDiscovery);
  const pluginEngine = $derived(ed.pluginEngine);
  const pluginInfo = $derived(ed.pluginInfo);
  const pluginsView = $derived(ed.pluginsView);
  const { knownPlugins, loadPluginInfo, removePlugin, setPluginEnabled } = ed;

  let newPluginId = $state('');

  let pluginError = $state('');

  /** Manifest CSP needs NOT already in the live CSP: only those are shown
   *  in the instructions (settings are shown only when relevant). */
  function cspMissing(csp) {
    const need = [
      ...(csp.scriptSrc ?? []).map((host) => ['script-src', host]),
      ...(csp.connectSrc ?? []).map((host) => ['connect-src', host]),
      ...(csp.frameSrc ?? []).map((host) => ['frame-src', host]),
    ];
    if (!liveCsp || liveCsp.unknown) return [];
    const present = { 'script-src': liveCsp.scriptSrc, 'connect-src': liveCsp.connectSrc, 'frame-src': liveCsp.frameSrc };
    return need.filter(([dir, host]) => !present[dir]?.has(host)).map(([dir, host]) => `${dir} ${host}`);
  }

  async function addPlugin() {
    pluginError = '';
    const id = newPluginId.trim().toLowerCase();
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) {
      pluginError = ta('plugin.invalidId');
      return;
    }
    if (knownPlugins().includes(id)) {
      pluginError = ta('plugin.alreadyListed');
      return;
    }
    await loadPluginInfo(id);
    if (pluginInfo[id].errors.length) {
      pluginError = ta('plugin.invalidManifest', { errors: pluginInfo[id].errors.join('; ') });
      return;
    }
    setPluginEnabled(id, true);
    newPluginId = '';
  }

  function addFoundPlugin(id) {
    ed.pluginsFound = ed.pluginsFound.filter((x) => x !== id);
    setPluginEnabled(id, true);
  }
</script>

<div class="panel-body">
  {#if !knownPlugins().length}
    <p class="panel-hint">{ta('hint.plugins.empty')}</p>
  {/if}
  {#each knownPlugins() as id (id)}
    {@const info = pluginInfo[id]}
    {@const enabled = (pluginsView?.enabled ?? []).includes(id)}
    <div class="plugin-row" class:plugin-broken={info?.errors?.length}>
      <span class="plugin-head">
        <span class="plugin-name">{info?.names?.[currentAdminLang()] ?? info?.name ?? id}</span>
        {#if info?.version}<span class="plugin-meta">v{info.version}</span>{/if}
        <span class="row-tools">
          <label class="gridmenu-snap plugin-toggle" title={enabled ? ta('tip.plugins.on') : ta('tip.plugins.off')}>
            <input type="checkbox" checked={enabled} disabled={Boolean(info?.errors?.length)}
              onchange={(e) => setPluginEnabled(id, e.target.checked)} />
            {enabled ? ta('ui.on') : ta('ui.off')}
          </label>
          <button class="ghost row-tool" title={ta('tip.plugins.remove')}
            onclick={() => removePlugin(id)}>{@html ICONS.cross}</button>
        </span>
      </span>
      {#if info?.errors?.length}
        <p class="panel-hint plugin-warn">{info.errors.join('; ')}</p>
      {:else if info && !info.satisfied}
        <p class="panel-hint plugin-warn">{ta('plugin.engineMismatch', { required: info.requiresEngine, current: pluginEngine })}</p>
      {:else if info?.csp && cspMissing(info.csp).length}
        <p class="panel-hint plugin-warn">{ta('plugin.cspNeeded', { list: cspMissing(info.csp).join(', ') })}</p>
      {/if}
      {#if info?.languages?.length}
        <p class="panel-hint">{ta('plugin.languages', { list: info.languages.map((l) => l.name).join(', ') })}</p>
      {/if}
    </div>
  {/each}
  {#if ed.pluginsFound.length}
    <hr class="gridmenu-divider" />
    <p class="panel-strong">{ta('hint.plugins.found')}</p>
    {#each ed.pluginsFound as id (id)}
      <div class="plugin-row">
        <span class="plugin-head">
          <span class="plugin-name">{pluginInfo[id]?.names?.[currentAdminLang()] ?? pluginInfo[id]?.name ?? id}</span>
          {#if pluginInfo[id]?.version}<span class="plugin-meta">v{pluginInfo[id].version}</span>{/if}
          <span class="row-tools">
            <button class="ghost row-tool" title={ta('tip.plugins.addFound')}
              onclick={() => addFoundPlugin(id)}>{@html ICONS.right}</button>
          </span>
        </span>
      </div>
    {/each}
  {/if}
  {#if pluginDiscovery === 'ok'}
    {#if !ed.pluginsFound.length}
      <p class="panel-hint" title={ta('hint.plugins.autoDiscover')}>{ta('plugins.noneFound')}</p>
    {/if}
  {:else}
    <!-- Fallback when repo discovery is unavailable (local server / not logged in) -->
    <hr class="gridmenu-divider" />
    <input placeholder={ta('ph.plugins.folder')} bind:value={newPluginId}
      onkeydown={(e) => e.key === 'Enter' && addPlugin()} />
    <button class="ghost action" onclick={addPlugin} disabled={!newPluginId.trim()}>{ta('ui.addPlugin')}</button>
    {#if pluginError}
      <p class="panel-hint plugin-warn">{pluginError}</p>
    {/if}
  {/if}
</div>
