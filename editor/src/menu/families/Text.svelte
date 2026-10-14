<script>
  /* The text block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Pin from '../Pin.svelte';
  import BoxStyle from '../BoxStyle.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps } = ed;
  const { groupReset, groupChanged } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  <!-- Text, font and size are set inline with the text editor's
       toolbar; the block has no content fields in the panel. -->
  <p class="panel-hint">{ta('hint.textInline')}</p>
{:else if area === 'style'}
  {#snippet textAlign()}
    <div class="pin-line">
      <label>{ta('lbl.align')}
        <Dropdown value={selectedBlock.props.align ?? 'left'}
          options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
          onchange={(v) => setBlockProp('align', v)} /></label>
      <Pin id="align" />
    </div>
  {/snippet}
  {#snippet textBox()}
    <div class="pin-line">
      <label class="gridmenu-snap">
        <input type="checkbox" checked={Boolean(selectedBlock.props.box)}
          onchange={(e) => setBlockProp('box', e.target.checked)} />
        {ta('lbl.textBoxToggle')}
      </label>
      <Pin id="textBox" />
    </div>
    {#if selectedBlock.props.box}
      <BoxStyle />
    {/if}
  {/snippet}
  <MenuGroup id="text-align" title={ta('lbl.align')} value={{ left: ta('common.left'), center: ta('common.center'), right: ta('common.right') }[selectedBlock.props.align ?? 'left']} reset={groupReset('text-align', { align: 'left' })}>{@render textAlign()}</MenuGroup>
  <MenuGroup id="text-box" title={ta('group.textBox')} value={selectedBlock.props.box ? ta('common.on') : ta('common.off')} reset={groupReset('text-box', { box: false, boxStyle: null })}>{@render textBox()}</MenuGroup>
{/if}
