<script>
  /* The icon block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import ColorPicker from '../../lib/ColorPicker.svelte';
  import GlyphPicker from '../../lib/GlyphPicker.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, themeSwatches } = ed;
  const { groupReset, groupChanged } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  {#snippet iconIcon()}
    <label>{ta('blocks.icon')}
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
  <MenuGroup id="icon-icon" title={ta('blocks.icon')} value={selectedBlock.props.image ? ta('gp.ownIcon') : selectedBlock.props.icon ? ta('menu.drawnIcon') : (selectedBlock.props.glyph ?? '★')}>{@render iconIcon()}</MenuGroup>
{:else if area === 'style'}
  {#snippet iconLook()}
    <div class="pin-line">
      <label>{ta('lbl.sizePx')}
        <input type="number" min="8" max="400" value={selectedBlock.props.size ?? 48}
          onchange={(e) => setBlockProp('size', Number(e.target.value))} /></label>
      <Pin id="iconSize" />
    </div>
    <div class="pin-line">
      <label title={ta('hint.icon.color')}>{ta('lbl.color')}
        <ColorPicker value={selectedBlock.props.color ?? 'accent'} tokens={themeSwatches()}
          onchange={(v) => setBlockProp('color', v)} /></label>
      <Pin id="iconColor" />
    </div>
  {/snippet}
  <MenuGroup id="icon-look" title={ta('group.appearance')} value={`${selectedBlock.props.size ?? 48} px`} reset={groupReset('icon-look', { size: 48, color: 'accent' })}>{@render iconLook()}</MenuGroup>
{/if}
