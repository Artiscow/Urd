<script>
  /* The panel rail, in the two layouts that have one (the Urd settings, «Panel navigation»): the icon rail with the panels as icons in their groups and their names as tooltips, or the sidebar with the panels as words under a heading per group. Both end in the mark and the settings gear. The other layouts reach the panels from the panel's top, a strip under the top bar or the top bar itself (PanelNav, PanelStrip, TopBar). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import SettingsGear from './SettingsGear.svelte';
  const ed = getContext('urd-editor');
</script>

{#if ed.adminLayout === 'rail'}
  <nav class="rail rail-icons" class:hidden={!ed.chromeVisible} aria-label={ta('rail.panels')}>
    {#each ed.PANEL_GROUPS as group, gi (gi)}
      {#if gi > 0}<span class="rail-divider" aria-hidden="true"></span>{/if}
      {#each group as name (name)}
        <button class="rail-icon" class:active={ed.activePanel === name} title={name === 'update' && ed.updateNotice === 'dot' ? ta('tip.updateOut', { version: ed.updateTarget }) : ed.PANEL_LABELS[name]} aria-label={name === 'legal' && ed.legal?.dot ? `${ed.PANEL_LABELS[name]}, ${ta('legal.dotLabel')}` : ed.PANEL_LABELS[name]}
          onclick={() => ed.togglePanel(name)}>{@html ICONS[`panel_${name}`]}{#if name === 'update' && ed.updateNotice === 'dot'}<span class="update-dot" aria-hidden="true"></span>{/if}{#if name === 'legal' && ed.legal?.dot}<span class="update-dot legal-dot" aria-hidden="true"></span>{/if}</button>
      {/each}
    {/each}
    <span class="rail-settings rail-settings-stack">
      <span class="rail-brand" title="Urd">
        <svg class="brand-mark" viewBox="10.3 8.3 19.4 25.4" aria-hidden="true"><path d="M12 32V10l16 6.5V32" fill="none" stroke="var(--urd-brand)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </span>
      <SettingsGear />
    </span>
  </nav>
{:else if ed.adminLayout === 'sidebar'}
  <nav class="rail" class:hidden={!ed.chromeVisible} aria-label={ta('rail.panels')}>
    {#each ed.PANEL_GROUPS as group, gi (gi)}
      <!-- Uppercase label above each group: page tools, site settings
           and system read as three levels. -->
      <span class="rail-group">{ta(ed.PANEL_GROUP_KEYS[gi])}</span>
      {#each group as name (name)}
        <button class:active={ed.activePanel === name} title={name === 'update' && ed.updateNotice === 'dot' ? ta('tip.updateOut', { version: ed.updateTarget }) : undefined} onclick={() => ed.togglePanel(name)}>{ed.PANEL_LABELS[name]}{#if name === 'update' && ed.updateNotice === 'dot'}<span class="update-dot update-dot-inline" aria-hidden="true"></span>{/if}{#if name === 'legal' && ed.legal?.dot}<span class="update-dot update-dot-inline legal-dot" role="img" aria-label={ta('legal.dotLabel')}></span>{/if}</button>
      {/each}
    {/each}
    <span class="rail-settings">
      <!-- The mark lives at the bottom of the rail by the gear, not in
           the top bar: there it would take the space the discard
           confirmation needs to grow. -->
      <span class="rail-brand" title="Urd">
        <!-- The viewBox is cropped to the glyph's visual box (stroke
             included), so the svg bottom IS the rune's foot and the
             baseline alignment lands. -->
        <svg class="brand-mark" viewBox="10.3 8.3 19.4 25.4" aria-hidden="true"><path d="M12 32V10l16 6.5V32" fill="none" stroke="var(--urd-brand)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <span class="brand-word">Urd</span>
      </span>
      <SettingsGear />
    </span>
  </nav>
{/if}
