<script>
  /* The cart block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import DesignRow from '../DesignRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  import LinkField from '../../lib/LinkField.svelte';
  import { linkOf, linkText } from '../../lib/link-edit.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const siteDraft = $derived(ed.siteDraft);
  const { setBlockProp, setBlockProps, setBlockLink } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const viewOptions = () => [['button', ta('opt.cart.button')], ['icon', ta('opt.cart.icon')]];
</script>

{#if area === 'content'}
  {#snippet cartCheckout()}
    <LinkField label={ta('lbl.checkoutPage')} title={ta('tip.cart.checkout')} pagesOnly value={linkOf(selectedBlock.props)} onchange={setBlockLink} />
    <Setting key="currency">
      <label title={ta('tip.product.currency')}>{ta('lbl.currency')}
        <input value={selectedBlock.props.currency ?? 'kr'}
          onchange={(e) => setBlockProp('currency', e.target.value)} /></label>
    </Setting>
  {/snippet}
  <MenuGroup id="cart-checkout" defaultOpen title={ta('group.checkout')} value={linkText(linkOf(selectedBlock.props), { pages: siteDraft.pages, here: ed.pageId }) || ta('common.none')} group={groupOf('cart-checkout', { currency: 'kr' })}>{@render cartCheckout()}</MenuGroup>
{:else if area === 'style'}
  {#snippet cartView()}
    <Setting key="variant">
      <DesignRow pin="cartView" />
    </Setting>
  {/snippet}
  <MenuGroup id="cart-view" defaultOpen title={ta('lbl.view')} value={viewOptions().find(([v]) => v === (selectedBlock.props.variant ?? 'button'))?.[1] ?? ''} group={groupOf('cart-view', { variant: 'button' })}>{@render cartView()}</MenuGroup>
{/if}
