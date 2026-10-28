<script>
  /* The setup wizard: the site's name and two colours on the first visit of a fresh clone. Split out of App.svelte in 0.7.26.5; everything it reads and writes comes through the editor handle. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import ColorPicker from '../lib/ColorPicker.svelte';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');
</script>

{#if ed.showSetup}
  <!-- Setup wizard: first visit on a fresh clone -->
  <div class="setup-overlay">
    <div class="setup-card">
      <h2>{ta('setup.title')}</h2>
      <p class="panel-hint">{ta('setup.intro')}</p>
      <label title={ta('tip.site.name')}>{ta('setup.nameLabel')}
        <input bind:value={ed.setupName} placeholder={ta('ph.setup.name')}
          onkeydown={(e) => e.key === 'Enter' && ed.applySetup()} /></label>
      <label title={ta('tip.setup.accent')}>{ta('setup.accentLabel')}
        <ColorPicker value={ed.setupAccent} label={ta('setup.accentPick')} onchange={(hex) => (ed.setupAccent = hex)} /></label>
      <label title={ta('tip.setup.bg')}>{ta('setup.bgLabel')}
        <ColorPicker value={ed.setupBg} label={ta('setup.bgLabel')} onchange={(hex) => (ed.setupBg = hex)} /></label>
      <p class="panel-hint">{ta('setup.outro')}</p>
      <span class="setup-actions">
        <!-- The editor's keys stand in the shortcut sheet, one press away -->
        <button class="ghost setup-keys" title={ta('tip.shortcuts.open')} onclick={ed.openShortcuts}>{@html ICONS.keyboard}<span>{ta('shortcuts.title')}</span></button>
        <button class="ghost" onclick={ed.closeSetup}>{ta('setup.skip')}</button>
        <button class="primary" onclick={ed.applySetup} disabled={!ed.setupName.trim()}>{ta('setup.start')}</button>
      </span>
    </div>
  </div>
{/if}
