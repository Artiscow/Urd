<script>
  /* A page's settings as a step in the Pages panel («In the panel» under Page settings): the way back to the list, the page's name and address, and the fields in fold-out groups (PageSettingsFields.svelte).
     Escape inside the step goes back to the list. */
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import IconButton from '../../lib/rows/IconButton.svelte';
  import PageSettingsFields from './PageSettingsFields.svelte';
  import HideButton from './HideButton.svelte';
  import HiddenRow from './HiddenRow.svelte';

  const ed = getContext('urd-editor');
  let backEl = $state(null);

  const id = $derived(ed.pageSettingsFor);
  const entry = $derived(ed.siteDraft.pages.find((p) => p.id === id) ?? null);

  // The way back takes the focus as the step opens, as a step in from the list does.
  tick().then(() => backEl?.focus());

  function onKey(e) {
    if (e.key !== 'Escape') return;
    e.stopPropagation();
    ed.closePageSettings();
  }
</script>

{#if entry}
  <!-- Escape anywhere in the step goes back to the list -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="ps-step" onkeydown={onKey}>
    <span class="ps-crumb">
      <IconButton icon={ICONS.foldLeft} label={ta('tip.pages.back')} bind:el={backEl} onclick={() => ed.closePageSettings()} />
      <span class="ps-words"><span class="ps-up">{ta('panel.pages')}</span><span class="ps-name">{entry.title}</span></span>
      <span class="ps-path">{entry.path}</span>
      <HideButton {id} />
    </span>
    <HiddenRow {id} />
    {#key id}<PageSettingsFields {id} grouped />{/key}
  </div>
{/if}

<style>
  .ps-step {
    display: grid;
    gap: 0.6rem;
    align-content: start;
  }

  .ps-crumb {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
  }

  .ps-words {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
  }

  .ps-up {
    font-size: 0.72rem;
    opacity: 0.6;
  }

  .ps-name {
    overflow: hidden;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ps-path {
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    opacity: 0.6;
  }
</style>
