<script>
  /* The collection block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const collectionIds = $derived(ed.collectionIds);
  const collectionsView = $derived(ed.collectionsView);
  const { setBlockProp, setBlockProps } = ed;
  const { groupReset } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const viewOptions = () => [['cards', ta('opt.collectionView.cards')], ['list', ta('opt.collectionView.list')], ['archive', ta('opt.collectionView.archive')]];
</script>

{#if area === 'content'}
  {#snippet collectionSource()}
    <label title={ta('tip.collection.source')}>{ta('blocks.collection')}
      <Dropdown value={selectedBlock.props.collection ?? ''}
        options={[['', ta('common.choose')], ...collectionIds.map((id) => [id, collectionsView[id]?.name ?? id])]}
        onchange={(v) => setBlockProp('collection', v || null)} /></label>
    <div class="pin-line">
      <label title={ta('tip.collection.limit')}>{ta('lbl.maxCount')}
        <input type="number" min="0" max="100" value={selectedBlock.props.limit ?? 6}
          onchange={(e) => setBlockProp('limit', Number(e.target.value))} /></label>
      <Pin id="limit" />
    </div>
    <label class="gridmenu-snap">
      <input type="checkbox" checked={selectedBlock.props.newestFirst !== false}
        onchange={(e) => setBlockProp('newestFirst', e.target.checked)} />
      {ta('lbl.newestFirst')}
    </label>
  {/snippet}
  <MenuGroup id="collection-source" defaultOpen title={ta('group.source')} value={collectionsView[selectedBlock.props.collection]?.name ?? ta('common.choose')} reset={groupReset('collection-source', { limit: 6, newestFirst: true })}>{@render collectionSource()}</MenuGroup>
{:else if area === 'style'}
  {#snippet collectionView()}
    <div class="pin-line">
      <label>{ta('lbl.view')}
        <Dropdown value={selectedBlock.props.view ?? 'cards'} options={viewOptions()}
          onchange={(v) => setBlockProp('view', v)} /></label>
      <Pin id="collectionView" />
    </div>
  {/snippet}
  <MenuGroup id="collection-view" defaultOpen title={ta('lbl.view')} value={viewOptions().find(([v]) => v === (selectedBlock.props.view ?? 'cards'))?.[1] ?? ''} reset={groupReset('collection-view', { view: 'cards' })}>{@render collectionView()}</MenuGroup>
{/if}
