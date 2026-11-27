<script>
  /* The product block in the element menu: its Content and Style areas, and the settings it writes through the editor handle. */
  import { getContext } from 'svelte';
  import SelectRow from '../../lib/rows/SelectRow.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import { pinnedNow } from '../pinned.js';
  import Setting from '../../lib/rows/Setting.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  import ShopLinks from '../ShopLinks.svelte';
  const ed = getContext('urd-editor');
  /** A fold counts the settings it holds now: one whose every setting stands in Pinned is left out, and one of a single setting is that setting alone. */
  const pinned = pinnedNow();
  const selectedBlock = $derived(ed.selectedBlock);
  const collectionIds = $derived(ed.collectionIds);
  const collectionsView = $derived(ed.collectionsView);
  const { setBlockProp, setBlockProps, addCollectionEntry, createCatalogForBlock } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  {#snippet productCatalog()}
    <SelectRow label={ta('blocks.collection')} title={ta('tip.product.source')} value={selectedBlock.props.collection ?? ''}
      options={[['', ta('common.choose')], ...collectionIds.filter((id) => collectionsView[id]?.kind === 'products').map((id) => [id, collectionsView[id]?.name ?? id])]}
      onchange={(v) => setBlockProp('collection', v || null)} />
    {#if selectedBlock.props.collection && collectionsView[selectedBlock.props.collection]?.kind === 'products'}
      <!-- The two actions stacked, each on one line across the column -->
      <span class="menu-stack">
        <button class="ghost action" title={ta('tip.product.addProduct')}
          onclick={() => addCollectionEntry(selectedBlock.props.collection)}>{ta('ui.addProduct')}</button>
        <button class="ghost action" title={ta('tip.product.editCatalog')}
          onclick={() => ed.openCollection(selectedBlock.props.collection)}>{ta('ui.editCatalog')}</button>
      </span>
    {:else if !ed.collectionsUnavailable && !collectionIds.some((id) => collectionsView[id]?.kind === 'products')}
      <button class="ghost action" title={ta('tip.product.createCatalog')}
        onclick={createCatalogForBlock}>{ta('ui.createCatalog')}</button>
    {/if}
    <Setting key="limit">
      <label title={ta('tip.collection.limit')}>{ta('lbl.maxCount')}
        <input type="number" min="0" max="100" value={selectedBlock.props.limit || ''} placeholder={ta('common.all')}
          onchange={(e) => { const n = Math.max(0, Math.min(100, Math.round(Number(e.target.value)) || 0)); setBlockProp('limit', n); e.target.value = n || ''; }} /></label>
    </Setting>
  {/snippet}
  {#snippet productShop()}
    <ShopLinks from="product" />
    <Setting key="currency">
      <label title={ta('tip.product.currency')}>{ta('lbl.currency')}
        <input value={selectedBlock.props.currency ?? 'kr'}
          onchange={(e) => setBlockProp('currency', e.target.value)} /></label>
    </Setting>
  {/snippet}
  <Fold id="product-catalog" title={ta('group.catalog')} value={collectionsView[selectedBlock.props.collection]?.name ?? ta('common.choose')} group={groupOf('product-catalog', { limit: 0 })}>{@render productCatalog()}</Fold>
  <!-- The shop's own settings in its panel, and the word the prices are written with here -->
  <Fold id="product-shop" title={ta('group.siteShop')} value={selectedBlock.props.currency ?? 'kr'} group={groupOf('product-shop', { currency: 'kr' })}>{@render productShop()}</Fold>
{:else if area === 'style'}
  {#snippet productGrid()}
    <Setting key="columns" pin="columns">
      <label title={ta('tip.product.columns')}>{ta('lbl.columns')}
        <input type="number" min="0" max="6" value={selectedBlock.props.columns || ''} placeholder={ta('common.auto')}
          onchange={(e) => { const n = Math.max(0, Math.min(6, Math.round(Number(e.target.value)) || 0)); setBlockProp('columns', n); e.target.value = n || ''; }} /></label>
    </Setting>
  {/snippet}
  <Fold id="product-grid" defaultOpen title={ta('group.grid')} value={selectedBlock.props.columns ? String(selectedBlock.props.columns) : ta('common.auto')}
    rows={pinned.left('columns')} group={groupOf('product-grid', { columns: 0 })}>{@render productGrid()}</Fold>
  <!-- How many lines each card's title and text show -->
  {#snippet productLines()}
    <Setting key="titleLines">
      <label title={ta('tip.cards.titleLines')}>{ta('lbl.titleLines')}
        <input type="number" min="0" max="10" value={selectedBlock.props.titleLines || ''} placeholder={ta('common.all')}
          onchange={(e) => { const n = Math.max(0, Math.min(10, Math.round(Number(e.target.value)) || 0)); setBlockProp('titleLines', n || null); e.target.value = n || ''; }} /></label>
    </Setting>
    <Setting key="textLines">
      <label title={ta('tip.cards.textLines')}>{ta('lbl.textLines')}
        <input type="number" min="0" max="10" value={selectedBlock.props.textLines || ''} placeholder={ta('common.all')}
          onchange={(e) => { const n = Math.max(0, Math.min(10, Math.round(Number(e.target.value)) || 0)); setBlockProp('textLines', n || null); e.target.value = n || ''; }} /></label>
    </Setting>
  {/snippet}
  <Fold id="product-lines" title={ta('group.textLines')} value={`${selectedBlock.props.titleLines || ta('common.all')} · ${selectedBlock.props.textLines || ta('common.all')}`}
    group={groupOf('product-lines', { titleLines: null, textLines: null })}>{@render productLines()}</Fold>
{/if}
