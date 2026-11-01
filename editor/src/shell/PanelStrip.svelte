<script>
  /* The strip of every panel under the top bar («top-tabs» in the Urd settings): the three groups with a small label each, parted by a line, the open panel underlined. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import SettingsGear from './SettingsGear.svelte';
  const ed = getContext('urd-editor');
</script>

<nav class="panel-strip" class:hidden={!ed.chromeVisible} aria-label={ta('rail.panels')}>
  {#each ed.PANEL_GROUPS as group, gi (gi)}
    {#if gi > 0}<span class="strip-divider" aria-hidden="true"></span>{/if}
    <span class="strip-group">{ta(ed.PANEL_GROUP_KEYS[gi])}</span>
    {#each group as name (name)}
      <button type="button" class="panel-tab" class:active={ed.activePanel === name} aria-pressed={ed.activePanel === name} onclick={() => ed.togglePanel(name)}>{ed.PANEL_LABELS[name]}</button>
    {/each}
  {/each}
  <span class="strip-end"><SettingsGear flip /></span>
</nav>
