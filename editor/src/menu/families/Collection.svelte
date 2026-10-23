<script>
  /* The collection block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import DesignRow from '../DesignRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const collectionIds = $derived(ed.collectionIds);
  const collectionsView = $derived(ed.collectionsView);
  const { setBlockProp, setBlockProps } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const viewOptions = () => [['cards', ta('opt.collectionView.cards')], ['list', ta('opt.collectionView.list')], ['archive', ta('opt.collectionView.archive')]];
</script>

{#if area === 'content'}
  {#snippet collectionSource()}
    <label title={ta('tip.collection.source')}>{ta('blocks.collection')}
      <Dropdown value={selectedBlock.props.collection ?? ''}
        options={[['', ta('common.choose')], ...collectionIds.map((id) => [id, collectionsView[id]?.name ?? id])]}
        onchange={(v) => setBlockProp('collection', v || null)} /></label>
    <Setting key="limit" shown="6">
      <div class="pin-line">
        <label title={ta('tip.collection.limit')}>{ta('lbl.maxCount')}
          <input type="number" min="0" max="100" value={(selectedBlock.props.limit ?? 6) || ''} placeholder={ta('common.all')}
            onchange={(e) => { const n = Math.max(0, Math.min(100, Math.round(Number(e.target.value)) || 0)); setBlockProp('limit', n); e.target.value = n || ''; }} /></label>
        <Pin id="limit" />
      </div>
    </Setting>
    <Setting key="newestFirst" shown={ta('common.on')}>
      <label class="gridmenu-snap">
        <input type="checkbox" checked={selectedBlock.props.newestFirst !== false}
          onchange={(e) => setBlockProp('newestFirst', e.target.checked)} />
        {ta('lbl.newestFirst')}
      </label>
    </Setting>
  {/snippet}
  <MenuGroup id="collection-source" defaultOpen title={ta('group.source')} value={collectionsView[selectedBlock.props.collection]?.name ?? ta('common.choose')} group={groupOf('collection-source', { limit: 6, newestFirst: true })}>{@render collectionSource()}</MenuGroup>
{:else if area === 'style'}
  {#snippet collectionView()}
    <Setting key="view">
      <DesignRow pin="collectionView" />
    </Setting>
  {/snippet}
  <MenuGroup id="collection-view" defaultOpen title={ta('lbl.view')} value={viewOptions().find(([v]) => v === (selectedBlock.props.view ?? 'cards'))?.[1] ?? ''} group={groupOf('collection-view', { view: 'cards' })}>{@render collectionView()}</MenuGroup>
{/if}
