<script>
  /* The checkout block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. The payment settings (block version 2, ADR-0028) are one
     object, written whole through paymentsOf so every field keeps its shape. */
  import { getContext } from 'svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import Choice from '../../lib/Choice.svelte';
  import { ta } from '$engine/i18n.js';
  import { paymentsOf, anyProvider, currencyWord, CARD_PROVIDERS } from '$engine/shop.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();

  const pays = $derived(paymentsOf(selectedBlock.props));
  const providerOn = $derived(anyProvider(pays));
  const siteCurrency = $derived(currencyWord(ed.siteDraft?.site?.commerce?.currency));
  /** Writes the payment settings with one field changed. */
  const setPay = (patch) => setBlockProp('payments', { ...pays, ...patch });
  /** Writes one payment instruction's field. */
  const setInstruction = (i, patch) => setPay({ manual: pays.manual.map((m, j) => (j === i ? { ...m, ...patch } : m)) });
  const addInstruction = () => setPay({ manual: [...pays.manual, { id: `pay-${Date.now().toString(36)}`, label: '', text: '' }] });
  const removeInstruction = (i) => setPay({ manual: pays.manual.filter((_, j) => j !== i) });
  /** The closed value of the Payment group: the providers on, else the count of instructions. */
  const paymentValue = $derived.by(() => {
    const on = [];
    if (pays.vipps) on.push('Vipps');
    if (pays.card !== 'none') on.push(ta('lbl.payCard'));
    if (pays.paypal) on.push('PayPal');
    if (on.length) return on.join(', ');
    return pays.manual.length ? String(pays.manual.length) : ta('common.none');
  });
  const cardOptions = $derived(CARD_PROVIDERS.filter((id) => id !== 'stripe').map((id) => [id, ta(`opt.payCard.${id}`)]));
</script>

{#if area === 'content'}
  {#snippet checkoutOrder()}
    <label title={ta('tip.checkout.recipient')}>{ta('lbl.recipientEmail')}
      <input type="email" value={selectedBlock.props.recipient ?? ''}
        onchange={(e) => setBlockProp('recipient', e.target.value.trim())} /></label>
    <label title={ta('tip.checkout.endpoint')}>{ta('lbl.endpointUrl')}
      <input type="url" value={selectedBlock.props.endpoint ?? ''}
        onchange={(e) => setBlockProp('endpoint', e.target.value.trim())} /></label>
    <!-- With a provider on the prices are charged in the site's currency, so the word follows it and cannot be changed -->
    <Setting key="currency">
      <label title={ta(providerOn ? 'tip.checkout.currencyVipps' : 'tip.product.currency')}>{ta('lbl.currency')}
        <input value={providerOn ? siteCurrency : (selectedBlock.props.currency ?? 'kr')} disabled={providerOn}
          onchange={(e) => setBlockProp('currency', e.target.value)} /></label>
    </Setting>
  {/snippet}
  {#snippet checkoutPayment()}
    <Setting key="payments" shown={ta('common.off')}>
      <div class="pin-line">
        <label class="gridmenu-snap" title={ta('tip.checkout.vippsCheckout')}>
          <input type="checkbox" checked={pays.vipps}
            onchange={(e) => setPay({ vipps: e.target.checked })} />
          {ta('lbl.vippsCheckout')}
        </label>
        <Pin id="vippsButton" />
      </div>
      <Choice label={ta('lbl.payCard')} value={pays.card} title={ta('tip.checkout.payCard')}
        options={cardOptions} onchange={(v) => setPay({ card: v })} />
      <!-- The ways to pay without a provider: a label and a text each, shown above the order summary -->
      <span class="mini-label" title={ta('tip.checkout.instructions')}>{ta('lbl.payInstructions')}</span>
      {#each pays.manual as method, i (method.id)}
        <div class="pay-instruction">
          <input value={method.label} placeholder={ta('ph.instructionLabel')} aria-label={ta('lbl.name')}
            onchange={(e) => setInstruction(i, { label: e.target.value.trim() })} />
          <input value={method.text} placeholder={ta('ph.instructionText')} aria-label={ta('lbl.instructionText')}
            onchange={(e) => setInstruction(i, { text: e.target.value.trim() })} />
          <button class="ghost" title={ta('ui.remove')} aria-label={ta('ui.remove')} onclick={() => removeInstruction(i)}>
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" /></svg>
          </button>
        </div>
      {/each}
      <button class="ghost action" onclick={addInstruction}>{ta('ui.addInstruction')}</button>
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
  <MenuGroup id="checkout-payment" title={ta('group.payment')} value={paymentValue} group={groupOf('checkout-payment', { payments: { vipps: false, card: 'none', paypal: false, capture: 'ship', manual: [] } })}>{@render checkoutPayment()}</MenuGroup>
  <MenuGroup id="checkout-seller" title={ta('lbl.checkoutSeller')} value={selectedBlock.props.seller === false ? ta('common.off') : ta('common.on')} group={groupOf('checkout-seller', { seller: true })}>{@render checkoutSeller()}</MenuGroup>
{/if}
