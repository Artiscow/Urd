<script>
  /* The settings gear: opens Urd's own settings where «Settings window» puts them, a dialog, a sheet or the settings panel; pressed again, it closes them. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';

  const ed = getContext('urd-editor');
  const open = $derived(ed.settingsOpen || ed.activePanel === 'settings');

  function toggle() {
    if (ed.settingsPlace === 'panel') ed.activePanel = ed.activePanel === 'settings' ? null : 'settings';
    else ed.settingsOpen = !ed.settingsOpen;
  }
</script>

<button class="rail-gear" class:active={open} title={ta('settings.title')} aria-label={ta('settings.title')} aria-expanded={open} onclick={toggle}>{@html ICONS.gear}</button>
