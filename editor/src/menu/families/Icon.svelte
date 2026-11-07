<script>
  /* The icon block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import NumberRow from '../../lib/rows/NumberRow.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import GlyphPicker from '../../lib/GlyphPicker.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import { pinnedNow } from '../pinned.js';
  import Setting from '../../lib/rows/Setting.svelte';
  import { ta } from '$engine/i18n.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  /** A fold counts the settings it holds now: one whose every setting stands in Pinned is left out, and one of a single setting is that setting alone. */
  const pinned = pinnedNow();
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, themeSwatches } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  {#snippet iconIcon()}
    <label title={ta('tip.icon.pick')}>{ta('blocks.icon')}
      <span class="toolbar-row">
        <GlyphPicker value={selectedBlock.props.glyph ?? '★'}
          icon={selectedBlock.props.icon ?? null}
          image={selectedBlock.props.image ?? null}
          onpick={(glyph) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
            b.props.glyph = glyph;
            b.props.icon = null;
            b.props.image = null;
          })}
          onicon={(id) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
            b.props.icon = id;
            b.props.image = null;
          })}
          onimage={(dataUrl) => setBlockProp('image', dataUrl)} />
        {#if !selectedBlock.props.icon}
          <input class="token-input" value={selectedBlock.props.glyph ?? ''} maxlength="4"
            title={ta('tip.icon.typeGlyph')}
            onchange={(e) => setBlockProp('glyph', e.target.value || '★')} />
        {:else}
          <button class="ghost" title={ta('tip.icon.backToGlyph')}
            onclick={() => setBlockProp('icon', null)}>{ta('ui.removeDrawnIcon')}</button>
        {/if}
      </span></label>
    {#if selectedBlock.props.image}
      <span class="toolbar-row" title={ta('hint.icon.ownImage')}>
        <img class="site-icon-preview" src={selectedBlock.props.image} alt={ta('gp.ownIcon')} />
        <button class="ghost" onclick={() => setBlockProp('image', null)}>{ta('ui.removeOwnIcon')}</button>
      </span>
    {/if}
  {/snippet}
  <Fold id="icon-icon" defaultOpen rows={selectedBlock.props.image ? 2 : 1} title={ta('blocks.icon')} value={selectedBlock.props.image ? ta('gp.ownIcon') : selectedBlock.props.icon ? ta('menu.drawnIcon') : (selectedBlock.props.glyph ?? '★')}>{@render iconIcon()}</Fold>
{:else if area === 'style'}
  {#snippet iconLook()}
    <Setting key="size" shown="48" pin="iconSize">
      <NumberRow label={ta('lbl.sizePx')} title={ta('tip.icon.size')} value={selectedBlock.props.size ?? 48} min={8} max={400} onchange={(v) => setBlockProp('size', v)} />
    </Setting>
    <Setting key="color" pin="iconColor">
      <ColourRow label={ta('lbl.color')} title={ta('hint.icon.color')} value={selectedBlock.props.color ?? 'accent'} tokens={themeSwatches()} onchange={(v) => setBlockProp('color', v)} />
    </Setting>
  {/snippet}
  <Fold id="icon-look" defaultOpen title={ta('group.appearance')} value={`${selectedBlock.props.size ?? 48} px`} rows={pinned.left('iconSize', 'iconColor')} group={groupOf('icon-look', { size: 48, color: 'accent' })}>{@render iconLook()}</Fold>
{/if}
