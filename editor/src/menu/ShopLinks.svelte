<script>
  /* The Shop group of the shop's blocks: the way to the shop's other parts, the catalogue, the pages and the currency, in one click each. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  /** `from` is the block the group stands in: 'product' or 'checkout'. */
  let { from } = $props();
  const productsId = $derived(ed.collectionIds.find((id) => ed.collectionsView[id]?.kind === 'products') ?? null);
</script>

<span class="shop-links">
  {#if from === 'checkout'}
    {#if productsId}
      <button type="button" class="linkish" title={ta('tip.shop.products')} onclick={() => ed.openCollection(productsId)}>{ta('ui.editCatalog')}</button>
    {/if}
    <button type="button" class="linkish" title={ta('tip.shop.shopPage')} onclick={() => ed.openPageWith('product')}>{ta('ui.goToShopPage')}</button>
  {:else}
    <button type="button" class="linkish" title={ta('tip.shop.checkoutPage')} onclick={() => ed.openPageWith('checkout')}>{ta('ui.goToCheckoutPage')}</button>
  {/if}
  <button type="button" class="linkish" title={ta('tip.shop.currency')} onclick={() => ed.openPanel('site', { shop: true })}>{ta('settings.currency')}</button>
</span>
