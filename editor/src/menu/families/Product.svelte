<script>
  /* The product block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const collectionIds = $derived(ed.collectionIds);
  const collectionsView = $derived(ed.collectionsView);
  const { setBlockProp, setBlockProps, addCollectionEntry, createCatalogForBlock } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  {#snippet productCatalog()}
    <label title={ta('tip.product.source')}>{ta('blocks.collection')}
      <Dropdown value={selectedBlock.props.collection ?? ''}
        options={[['', ta('common.choose')], ...collectionIds.filter((id) => collectionsView[id]?.kind === 'products').map((id) => [id, collectionsView[id]?.name ?? id])]}
        onchange={(v) => setBlockProp('collection', v || null)} /></label>
    {#if selectedBlock.props.collection && collectionsView[selectedBlock.props.collection]?.kind === 'products'}
      <span class="toolbar-row">
        <button class="ghost action" title={ta('tip.product.addProduct')}
          onclick={() => addCollectionEntry(selectedBlock.props.collection)}>{ta('ui.addProduct')}</button>
        <button class="ghost action" title={ta('tip.product.editCatalog')}
          onclick={() => ed.openCollection(selectedBlock.props.collection)}>{ta('ui.editCatalog')}</button>
      </span>
    {:else if !ed.collectionsUnavailable && !collectionIds.some((id) => collectionsView[id]?.kind === 'products')}
      <button class="ghost action" title={ta('tip.product.createCatalog')}
        onclick={createCatalogForBlock}>{ta('ui.createCatalog')}</button>
    {/if}
    <Setting key="limit" shown="0">
      <label title={ta('tip.collection.limit')}>{ta('lbl.maxCount')}
        <input type="number" min="0" max="100" value={selectedBlock.props.limit ?? 0}
          onchange={(e) => setBlockProp('limit', Number(e.target.value))} /></label>
    </Setting>
  {/snippet}
  {#snippet productPrice()}
    <Setting key="currency">
      <label title={ta('tip.product.currency')}>{ta('lbl.currency')}
        <input value={selectedBlock.props.currency ?? 'kr'}
          onchange={(e) => setBlockProp('currency', e.target.value)} /></label>
    </Setting>
  {/snippet}
  <MenuGroup id="product-catalog" title={ta('group.catalog')} value={collectionsView[selectedBlock.props.collection]?.name ?? ta('common.choose')} group={groupOf('product-catalog', { limit: 0 })}>{@render productCatalog()}</MenuGroup>
  <MenuGroup id="product-price" title={ta('lbl.price')} value={selectedBlock.props.currency ?? 'kr'} group={groupOf('product-price', { currency: 'kr' })}>{@render productPrice()}</MenuGroup>
{:else if area === 'style'}
  {#snippet productGrid()}
    <Setting key="columns" shown="0">
      <div class="pin-line">
        <label title={ta('tip.product.columns')}>{ta('lbl.columns')}
          <input type="number" min="0" max="6" value={selectedBlock.props.columns ?? 0}
            onchange={(e) => setBlockProp('columns', Number(e.target.value))} /></label>
        <Pin id="columns" />
      </div>
    </Setting>
  {/snippet}
  <MenuGroup id="product-grid" defaultOpen title={ta('group.grid')} value={selectedBlock.props.columns ? String(selectedBlock.props.columns) : ta('menu.standard')} group={groupOf('product-grid', { columns: 0 })}>{@render productGrid()}</MenuGroup>
{/if}
