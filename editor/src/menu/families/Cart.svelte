<script>
  /* The cart block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const siteDraft = $derived(ed.siteDraft);
  const { setBlockProp } = ed;
  let { area } = $props();
</script>

{#if area === 'content'}
  <label title={ta('tip.cart.checkout')}>{ta('lbl.checkoutPage')}
    <Dropdown value={selectedBlock.props.href ?? ''}
      options={[['', ta('common.none')], ...siteDraft.pages.map((p) => [p.path, p.title])]}
      onchange={(v) => setBlockProp('href', v)} /></label>
  <label title={ta('tip.product.currency')}>{ta('lbl.currency')}
    <input value={selectedBlock.props.currency ?? 'kr'}
      onchange={(e) => setBlockProp('currency', e.target.value)} /></label>
{:else if area === 'style'}
  <label>{ta('lbl.view')}
    <Dropdown value={selectedBlock.props.variant ?? 'button'}
      options={[['button', ta('opt.cart.button')], ['icon', ta('opt.cart.icon')]]}
      onchange={(v) => setBlockProp('variant', v)} /></label>
  <hr class="gridmenu-divider" />
{/if}
