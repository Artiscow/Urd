<script>
  /* The quote block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import ColorPicker from '../../lib/ColorPicker.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, compressOrTrim, imageErrorText, setStatus, themeSwatches } = ed;
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();

  const variantOptions = () => [['large', ta('opt.quote.large')], ['short', ta('opt.quote.short')]];
  /** The closed Quote group reads the name, else the quote's first words. */
  const quoteValue = $derived.by(() => {
    const name = (selectedBlock.props.attribution ?? '').trim();
    if (name) return name;
    const text = (selectedBlock.props.text ?? '').trim();
    return text.length > 40 ? `${text.slice(0, 40)}…` : text;
  });

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
  {#snippet quoteWords()}
    <label>{ta('lbl.quoteText')}
      <input value={selectedBlock.props.text ?? ''}
        onchange={(e) => setBlockProp('text', e.target.value)} /></label>
    <label>{ta('lbl.quoteName')}
      <input value={selectedBlock.props.attribution ?? ''}
        onchange={(e) => setBlockProp('attribution', e.target.value)} /></label>
    <label>{ta('lbl.quoteRole')}
      <input value={selectedBlock.props.role ?? ''}
        onchange={(e) => setBlockProp('role', e.target.value)} /></label>
  {/snippet}
  <MenuGroup id="quote-words" defaultOpen title={ta('group.quote')} value={quoteValue}>{@render quoteWords()}</MenuGroup>
{:else if area === 'style'}
  {#snippet quoteVariant()}
    <Setting key="variant">
      <div class="pin-line">
        <label>{ta('lbl.variant')}
          <Dropdown value={selectedBlock.props.variant ?? 'large'} options={variantOptions()}
            onchange={(v) => setBlockProp('variant', v)} /></label>
        <Pin id="variant" />
      </div>
    </Setting>
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
      <Setting key="card" shown={ta('common.off')}>
        <label class="gridmenu-snap" title={ta('tip.quote.card')}>
          <input type="checkbox" checked={selectedBlock.props.card === true}
            onchange={(e) => setBlockProp('card', e.target.checked)} />
          {ta('lbl.quoteCard')}
        </label>
      </Setting>
    {/if}
  {/snippet}
  {#snippet quoteColour()}
    <Setting key="accent" source="theme">
      <label>{ta('lbl.color')}
        <ColorPicker value={selectedBlock.props.accent ?? 'accent'} tokens={themeSwatches()}
          onchange={(v) => setBlockProp('accent', v === 'accent' ? null : v)} /></label>
    </Setting>
  {/snippet}
  {@const colourN = groupChanged({ accent: null })}
  <MenuGroup id="quote-variant" title={ta('lbl.variant')} value={variantOptions().find(([v]) => v === (selectedBlock.props.variant ?? 'large'))?.[1] ?? ''} group={groupOf('quote-variant', { variant: 'large', card: false, image: '' })}>{@render quoteVariant()}</MenuGroup>
  <MenuGroup id="quote-colour" title={ta('lbl.color')} value={colourN ? ta('menu.changed', { n: colourN }) : ta('menu.standard')} group={groupOf('quote-colour', { accent: null })}>{@render quoteColour()}</MenuGroup>
{/if}
