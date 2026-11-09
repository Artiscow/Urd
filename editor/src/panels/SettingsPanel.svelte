<script>
  /* The Urd settings as a panel in the panel column («Panel» under Settings window): the search at the top, every section open with its heading kept at the top while it scrolls and the settings stacked (settings/SettingsBody.svelte), and the way to the shortcut sheet and the version at the foot. The gear opens and closes it; the page stays in view while a setting is tried.
     It opens where it was left in the panel column's scroll while the tab is open (settings/keep-place.js). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import SettingsBody from '../settings/SettingsBody.svelte';
  import { keepPlace } from '../settings/keep-place.js';

  const ed = getContext('urd-editor');
  let query = $state('');
  let searchEl = $state(null);

  // The search takes the focus as the panel opens, from the gear or from the dialog it takes over from, as the dialog's search does.
  $effect(() => {
    searchEl?.focus({ preventScroll: true });
  });
</script>

<div class="panel-body st-panel" {@attach keepPlace('panel', query, (el) => el.closest('.panel'))}>
  <input type="text" class="st-search" placeholder={ta('settings.find')} aria-label={ta('settings.find')} bind:value={query} bind:this={searchEl} />
  <SettingsBody place="panel" {query} />
  <button type="button" class="ghost st-keys" title={ta('tip.shortcuts.open')} onclick={ed.openShortcuts}>{@html ICONS.keyboard}<span>{ta('shortcuts.title')}</span><kbd>?</kbd></button>
  <p class="st-version">{ta('settings.version', { version: ed.pluginEngine })}</p>
</div>

<style>
  .st-panel {
    display: grid;
    gap: 0.7rem;
  }

  .st-search {
    height: 2.1rem;
  }

  .st-keys {
    justify-content: flex-start;
    gap: 0.5rem;
  }

  .st-keys span {
    flex: 1;
    text-align: left;
  }

  .st-keys kbd {
    padding: 0 0.4rem;
    font: 600 11px/1.5 system-ui, sans-serif;
    border: 1px solid rgb(255 255 255 / 22%);
    border-bottom-width: 2px;
    border-radius: 5px;
  }

  .st-version {
    margin: 0;
    font-size: 0.75rem;
    opacity: 0.6;
  }
</style>
