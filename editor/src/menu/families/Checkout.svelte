<script>
  /* The checkout block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. The payment settings (block version 2, ADR-0028) are one
     object, written whole through paymentsOf so every field keeps its shape. */
  import { getContext } from 'svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import Choice from '../../lib/Choice.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import SubHeading from '../../lib/rows/SubHeading.svelte';
  import ListEditor from '../../lib/rows/ListEditor.svelte';
  import { ta } from '$engine/i18n.js';
  import { paymentsOf, anyProvider, currencyWord, CARD_PROVIDERS } from '$engine/shop.js';
  import { makeGroupHelpers } from '../groups.js';
  import ShopLinks from '../ShopLinks.svelte';
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
  /** Moves an instruction from one place to another, as the list editor's drag and keys do. */
  const moveInstruction = (from, to) => {
    const manual = [...pays.manual];
    manual.splice(to, 0, ...manual.splice(from, 1));
    setPay({ manual });
  };
  /** The closed value of the Payment group: the providers on, else the count of instructions. */
  const paymentValue = $derived.by(() => {
    const on = [];
    if (pays.vipps) on.push('Vipps');
    if (pays.card !== 'none') on.push(ta('lbl.payCard'));
    if (pays.paypal) on.push('PayPal');
    if (on.length) return on.join(', ');
    return pays.manual.length ? String(pays.manual.length) : ta('common.none');
  });
  const cardOptions = $derived(CARD_PROVIDERS.map((id) => [id, ta(`opt.payCard.${id}`)]));
  /** The capture choice matters only for Stripe: Vipps always holds the money, PayPal always takes it at the order (ADR-0028). */
  const captureShown = $derived(pays.card === 'stripe');
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
    <!-- The shop's own settings stand in its panel -->
    <ShopLinks from="checkout" />
  {/snippet}
  {#snippet checkoutPayment()}
    <!-- Each provider is a setting row of its own inside the one payments prop, its way back turning that provider off; when to take the money stands under the card provider it belongs to -->
    <Setting pin="vippsButton" own={pays.vipps} reset={() => setPay({ vipps: false })}>
      <SwitchRow label={ta('lbl.vippsCheckout')} title={ta('tip.checkout.vippsCheckout')} checked={pays.vipps} onchange={(on) => setPay({ vipps: on })} />
    </Setting>
    <Setting own={pays.card !== 'none'} reset={() => setPay({ card: 'none', capture: 'ship' })}>
      <Choice label={ta('lbl.payCard')} value={pays.card} title={ta('tip.checkout.payCard')}
        options={cardOptions} onchange={(v) => setPay({ card: v })} />
      {#snippet more()}
        {#if captureShown}
          <Setting own={pays.capture !== 'ship'} reset={() => setPay({ capture: 'ship' })}>
            <Choice label={ta('lbl.payCapture')} value={pays.capture} title={ta('tip.checkout.payCapture')}
              options={[['ship', ta('opt.payCapture.ship')], ['now', ta('opt.payCapture.now')]]} onchange={(v) => setPay({ capture: v })} />
          </Setting>
        {/if}
      {/snippet}
    </Setting>
    <Setting pin="paypalButton" own={pays.paypal} reset={() => setPay({ paypal: false })}>
      <SwitchRow label={ta('lbl.payPaypal')} title={ta('tip.checkout.payPaypal')} checked={pays.paypal} onchange={(on) => setPay({ paypal: on })} />
    </Setting>
    {#if providerOn}
      <button type="button" class="ghost action" title={ta('tip.testPayment')} onclick={ed.testPayment}>{ta('ui.testPayment')}</button>
    {/if}
    <!-- The ways to pay without a provider: a label and a text each, shown above the order summary -->
    <SubHeading text={ta('lbl.payInstructions')} />
    <ListEditor items={pays.manual} label={ta('lbl.payInstructions')} key={(method) => method.id}
      onmove={moveInstruction} onremove={removeInstruction} onadd={addInstruction} addLabel={ta('ui.addInstruction')}>
      {#snippet row(method, i)}
        <div class="pay-instruction" title={ta('tip.checkout.instructions')}>
          <input value={method.label} placeholder={ta('ph.instructionLabel')} aria-label={ta('lbl.name')}
            onchange={(e) => setInstruction(i, { label: e.target.value.trim() })} />
          <input value={method.text} placeholder={ta('ph.instructionText')} aria-label={ta('lbl.instructionText')}
            onchange={(e) => setInstruction(i, { text: e.target.value.trim() })} />
        </div>
      {/snippet}
    </ListEditor>
  {/snippet}
  {#snippet checkoutSeller()}
    <Setting key="seller">
      <SwitchRow label={ta('lbl.checkoutSeller')} title={ta('tip.checkout.seller')} checked={selectedBlock.props.seller !== false} onchange={(on) => setBlockProp('seller', on)} />
    </Setting>
    <button class="ghost action" onclick={() => ed.openPanel('legal', { fold: 'who' })}>{ta('ui.editSiteContact')}</button>
  {/snippet}
  <Fold id="checkout-order" title={ta('group.order')} value={selectedBlock.props.recipient || selectedBlock.props.endpoint || ta('common.none')} group={groupOf('checkout-order', { currency: 'kr' })}>{@render checkoutOrder()}</Fold>
  <Fold id="checkout-payment" title={ta('group.payment')} value={paymentValue} group={groupOf('checkout-payment', { payments: { vipps: false, card: 'none', paypal: false, capture: 'ship', manual: [] } })}>{@render checkoutPayment()}</Fold>
  <Fold id="checkout-seller" title={ta('lbl.checkoutSeller')} value={selectedBlock.props.seller === false ? ta('common.off') : ta('common.on')} group={groupOf('checkout-seller', { seller: true })}>{@render checkoutSeller()}</Fold>
{/if}
