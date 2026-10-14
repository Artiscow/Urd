<script>
  /* The checkout block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp } = ed;
  let { area } = $props();
</script>

{#if area === 'content'}
  <label title={ta('tip.checkout.recipient')}>{ta('lbl.recipientEmail')}
    <input type="email" value={selectedBlock.props.recipient ?? ''}
      onchange={(e) => setBlockProp('recipient', e.target.value.trim())} /></label>
  <label title={ta('tip.checkout.endpoint')}>{ta('lbl.endpointUrl')}
    <input type="url" value={selectedBlock.props.endpoint ?? ''}
      onchange={(e) => setBlockProp('endpoint', e.target.value.trim())} /></label>
  <label title={ta('tip.checkout.vipps')}>{ta('lbl.vippsNumber')}
    <input value={selectedBlock.props.vipps ?? ''}
      onchange={(e) => setBlockProp('vipps', e.target.value.trim())} /></label>
  <label class="gridmenu-snap" title={ta('tip.checkout.vippsCheckout')}>
    <input type="checkbox" checked={selectedBlock.props.vippsCheckout === true}
      onchange={(e) => setBlockProp('vippsCheckout', e.target.checked)} />
    {ta('lbl.vippsCheckout')}
  </label>
  <label title={ta('tip.product.currency')}>{ta('lbl.currency')}
    <input value={selectedBlock.props.currency ?? 'kr'}
      onchange={(e) => setBlockProp('currency', e.target.value)} /></label>
{/if}
