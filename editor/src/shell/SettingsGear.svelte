<script>
  /* The settings gear: at the rail's foot in the rail layouts, in the top bar's right group or the strip's end in the others. It opens Urd's own settings where «Settings window» puts them: the dialog or the sheet over the admin (settings/SettingsDialog.svelte, mounted by App.svelte), or the settings panel in the panel column (panels/SettingsPanel.svelte); pressed again, it closes them. */
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
