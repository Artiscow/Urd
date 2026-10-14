<script>
  /* The quote block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import ColorPicker from '../../lib/ColorPicker.svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, compressOrTrim, imageErrorText, setStatus, themeSwatches } = ed;
  let { area } = $props();

  /** The quote block's portrait (the card variant): same webp path as the image block. */
  async function setQuotePortrait(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      mutateBlock(`edit:${selectedBlock.blockId}`, (b) => { b.props.image = img.dataUrl; });
    } catch (err) {
      setStatus(imageErrorText(err), 'error');
    }
  }
</script>

{#if area === 'content'}
  <label>{ta('lbl.quoteText')}
    <input value={selectedBlock.props.text ?? ''}
      onchange={(e) => setBlockProp('text', e.target.value)} /></label>
  <label>{ta('lbl.quoteName')}
    <input value={selectedBlock.props.attribution ?? ''}
      onchange={(e) => setBlockProp('attribution', e.target.value)} /></label>
  <label>{ta('lbl.quoteRole')}
    <input value={selectedBlock.props.role ?? ''}
      onchange={(e) => setBlockProp('role', e.target.value)} /></label>
{:else if area === 'style'}
  <label>{ta('lbl.variant')}
    <Dropdown value={selectedBlock.props.variant ?? 'large'}
      options={[['large', ta('opt.quote.large')], ['short', ta('opt.quote.short')]]}
      onchange={(v) => setBlockProp('variant', v)} /></label>
  {#if selectedBlock.props.variant === 'short'}
    <label class="ghost filepick">
      {ta('ui.quotePortrait')}
      <input type="file" accept="image/*" onchange={setQuotePortrait} />
    </label>
    {#if selectedBlock.props.image}
      <button class="ghost" onclick={() => setBlockProp('image', '')}>{ta('ui.quotePortraitRemove')}</button>
    {/if}
  {:else}
    <!-- The large spread can stand in a card; the short one already is one -->
    <label class="gridmenu-snap" title={ta('tip.quote.card')}>
      <input type="checkbox" checked={selectedBlock.props.card === true}
        onchange={(e) => setBlockProp('card', e.target.checked)} />
      {ta('lbl.quoteCard')}
    </label>
  {/if}
  <label>{ta('lbl.color')}
    <ColorPicker value={selectedBlock.props.accent ?? 'accent'} tokens={themeSwatches()}
      onchange={(v) => setBlockProp('accent', v === 'accent' ? null : v)} /></label>
  <hr class="gridmenu-divider" />
{/if}
