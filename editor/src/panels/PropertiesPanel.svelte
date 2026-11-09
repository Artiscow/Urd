<script>
  /* The Settings panel (the Properties panel's id): the selected block's element menu, or the selected section's settings (section/SectionMenu.svelte), narrow, each with the search over it.
     The docked forms of «Element menu» open the block's settings here from the gear on its bar; «Docked, with tabs» names the block on a card and shows one area at a time. */
  import { getContext } from 'svelte';
  import { menu } from '../menu/state.svelte.js';
  import ElementMenu from '../menu/ElementMenu.svelte';
  import SectionMenu from '../section/SectionMenu.svelte';
  import SearchField from '../lib/rows/SearchField.svelte';
  import EmptyState from '../lib/rows/EmptyState.svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const activeSectionId = $derived(ed.activeSectionId);
  const tabbed = $derived(menu.formPref === 'docked-tabs');
</script>

<div class="panel-body">
  {#if selectedBlock}
    {#if tabbed}
      <div class="emenu-card"><span class="emenu-card-name">{ed.BLOCK_LABELS[selectedBlock.type] ?? selectedBlock.type}</span><span class="emenu-card-kind">{ta('lbl.block')}</span></div>
    {:else}
      <p class="emenu-title">{ta('blocks.suffix', { label: ed.BLOCK_LABELS[selectedBlock.type] ?? selectedBlock.type })}</p>
    {/if}
    <SearchField get={() => menu.propsQuery} set={(v) => (menu.propsQuery = v)} />
    <ElementMenu layout={tabbed ? 'tabs' : 'narrow'} query={menu.propsQuery} />
  {:else if activeSectionId}
    <p class="emenu-title">{ta('lbl.section')}</p>
    <SearchField get={() => menu.propsQuery} set={(v) => (menu.propsQuery = v)} />
    <SectionMenu wide={false} query={menu.propsQuery} />
  {:else}
    <EmptyState text={ta('hint.props.empty')} />
  {/if}
</div>
