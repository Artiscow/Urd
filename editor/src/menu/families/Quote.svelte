<script>
  /* The quote block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, compressOrTrim, imageErrorText, openImageEditor, setStatus, themeSwatches } = ed;
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();

  /** The closed Quote group reads the name, else the quote's first words. */
  const quoteValue = $derived.by(() => {
    const name = (selectedBlock.props.attribution ?? '').trim();
    if (name) return name;
    const text = (selectedBlock.props.text ?? '').trim();
    return text.length > 40 ? `${text.slice(0, 40)}…` : text;
  });

  /** The quote block's portrait (the card variant): through the upload's checks, then the image editor on it to frame it in its circle. */
  async function setQuotePortrait(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file, 'portrait');
      mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
        b.props.image = img.dataUrl;
        delete b.props.imageStyle;
      });
      openImageEditor();
    } catch (err) {
      setStatus(imageErrorText(err), 'error');
    }
  }
</script>

{#if area === 'content'}
  {#snippet quoteWords()}
    <label title={ta('tip.quote.text')}>{ta('lbl.quoteText')}
      <input value={selectedBlock.props.text ?? ''}
        onchange={(e) => setBlockProp('text', e.target.value)} /></label>
    <label title={ta('tip.quote.name')}>{ta('lbl.quoteName')}
      <input value={selectedBlock.props.attribution ?? ''}
        onchange={(e) => setBlockProp('attribution', e.target.value)} /></label>
    <label title={ta('tip.quote.role')}>{ta('lbl.quoteRole')}
      <input value={selectedBlock.props.role ?? ''}
        onchange={(e) => setBlockProp('role', e.target.value)} /></label>
    <!-- The short quote's portrait, framed in its circle in the image editor -->
    {#if selectedBlock.props.variant === 'short'}
      <label title={ta('tip.quote.portrait')} class="ghost filepick">
        {ta('ui.quotePortrait')}
        <input type="file" accept="image/*" onchange={setQuotePortrait} />
      </label>
      {#if selectedBlock.props.image}
        <button class="ghost" title={ta('tip.quote.editPortrait')} onclick={openImageEditor}>{ta('ui.quotePortraitEdit')}</button>
        <button class="ghost" onclick={() => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => { b.props.image = ''; delete b.props.imageStyle; })}>{ta('ui.quotePortraitRemove')}</button>
      {/if}
    {/if}
  {/snippet}
  <Fold id="quote-words" defaultOpen title={ta('group.quote')} value={quoteValue}>{@render quoteWords()}</Fold>
{:else if area === 'style'}
  {#snippet quoteLook()}
    <!-- The large spread can stand in a card; the short one already is one -->
    {#if selectedBlock.props.variant !== 'short'}
      <Setting key="card" shown={ta('common.off')}>
        <SwitchRow label={ta('lbl.quoteCard')} title={ta('tip.quote.card')} checked={selectedBlock.props.card === true} onchange={(on) => setBlockProp('card', on)} />
      </Setting>
    {/if}
    <Setting key="accent" source="theme">
      <ColourRow label={ta('lbl.color')} title={ta('tip.quote.color')} value={selectedBlock.props.accent ?? 'accent'} tokens={themeSwatches()}
        onchange={(v) => setBlockProp('accent', v === 'accent' ? null : v)} />
    </Setting>
  {/snippet}
  {@const lookN = groupChanged({ card: false, accent: null })}
  <Fold id="quote-look" title={ta('group.appearance')} value={lookN ? ta('menu.changed', { n: lookN }) : ta('menu.standard')}
    rows={selectedBlock.props.variant === 'short' ? 1 : 2} group={groupOf('quote-look', { card: false, accent: null })}>{@render quoteLook()}</Fold>
{/if}
