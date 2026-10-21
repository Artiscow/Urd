<script>
  /* The checkout block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  {#snippet checkoutOrder()}
    <label title={ta('tip.checkout.recipient')}>{ta('lbl.recipientEmail')}
      <input type="email" value={selectedBlock.props.recipient ?? ''}
        onchange={(e) => setBlockProp('recipient', e.target.value.trim())} /></label>
    <label title={ta('tip.checkout.endpoint')}>{ta('lbl.endpointUrl')}
      <input type="url" value={selectedBlock.props.endpoint ?? ''}
        onchange={(e) => setBlockProp('endpoint', e.target.value.trim())} /></label>
    <Setting key="currency">
      <label title={ta('tip.product.currency')}>{ta('lbl.currency')}
        <input value={selectedBlock.props.currency ?? 'kr'}
          onchange={(e) => setBlockProp('currency', e.target.value)} /></label>
    </Setting>
  {/snippet}
  {#snippet checkoutVipps()}
    <label title={ta('tip.checkout.vipps')}>{ta('lbl.vippsNumber')}
      <input value={selectedBlock.props.vipps ?? ''}
        onchange={(e) => setBlockProp('vipps', e.target.value.trim())} /></label>
    <Setting key="vippsCheckout" shown={ta('common.off')}>
      <div class="pin-line">
        <label class="gridmenu-snap" title={ta('tip.checkout.vippsCheckout')}>
          <input type="checkbox" checked={selectedBlock.props.vippsCheckout === true}
            onchange={(e) => setBlockProp('vippsCheckout', e.target.checked)} />
          {ta('lbl.vippsCheckout')}
        </label>
        <Pin id="vippsButton" />
      </div>
    </Setting>
  {/snippet}
  {#snippet checkoutSeller()}
    <Setting key="seller" shown={ta('common.on')}>
      <label class="gridmenu-snap" title={ta('tip.checkout.seller')}>
        <input type="checkbox" checked={selectedBlock.props.seller !== false}
          onchange={(e) => setBlockProp('seller', e.target.checked)} />
        {ta('lbl.checkoutSeller')}
      </label>
    </Setting>
    <button class="ghost action" onclick={() => { ed.siteContactOpen = true; ed.openPanel('site'); }}>{ta('ui.editSiteContact')}</button>
  {/snippet}
  <MenuGroup id="checkout-order" title={ta('group.order')} value={selectedBlock.props.recipient || selectedBlock.props.endpoint || ta('common.none')} group={groupOf('checkout-order', { currency: 'kr' })}>{@render checkoutOrder()}</MenuGroup>
  <MenuGroup id="checkout-vipps" title={ta('group.vipps')} value={selectedBlock.props.vippsCheckout ? ta('lbl.vippsCheckout') : (selectedBlock.props.vipps || ta('common.none'))} group={groupOf('checkout-vipps', { vippsCheckout: false })}>{@render checkoutVipps()}</MenuGroup>
  <MenuGroup id="checkout-seller" title={ta('lbl.checkoutSeller')} value={selectedBlock.props.seller === false ? ta('common.off') : ta('common.on')} group={groupOf('checkout-seller', { seller: true })}>{@render checkoutSeller()}</MenuGroup>
{/if}
