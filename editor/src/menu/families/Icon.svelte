<script>
  /* The icon block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import ColorPicker from '../../lib/ColorPicker.svelte';
  import GlyphPicker from '../../lib/GlyphPicker.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import { pinnedNow } from '../pinned.js';
  import Setting from '../../lib/rows/Setting.svelte';
  import { ta } from '$engine/i18n.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  /** A fold whose every setting stands in Pinned is left out. */
  const pinned = pinnedNow();
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, themeSwatches } = ed;
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
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
  <Fold id="icon-icon" defaultOpen title={ta('blocks.icon')} value={selectedBlock.props.image ? ta('gp.ownIcon') : selectedBlock.props.icon ? ta('menu.drawnIcon') : (selectedBlock.props.glyph ?? '★')}>{@render iconIcon()}</Fold>
{:else if area === 'style'}
  {#snippet iconLook()}
    <Setting key="size" shown="48" pin="iconSize">
      <label title={ta('tip.icon.size')}>{ta('lbl.sizePx')}
        <input type="number" min="8" max="400" value={selectedBlock.props.size ?? 48}
          onchange={(e) => setBlockProp('size', Number(e.target.value))} /></label>
    </Setting>
    <Setting key="color" pin="iconColor">
      <label title={ta('hint.icon.color')}>{ta('lbl.color')}
        <ColorPicker value={selectedBlock.props.color ?? 'accent'} tokens={themeSwatches()}
          onchange={(v) => setBlockProp('color', v)} /></label>
    </Setting>
  {/snippet}
  {#if !pinned.all('iconSize', 'iconColor')}<Fold id="icon-look" defaultOpen title={ta('group.appearance')} value={`${selectedBlock.props.size ?? 48} px`} group={groupOf('icon-look', { size: 48, color: 'accent' })}>{@render iconLook()}</Fold>{/if}
{/if}
