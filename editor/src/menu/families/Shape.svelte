<script>
  /* The shape block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { colorTokens, shapeKinds } from '../options.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps, setBlockFrame, designWidth, shapePx, setShapeSizePx } = ed;
  const { groupReset, groupChanged } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  {#snippet shapeShape()}
    <label>{ta('blocks.shape')}
      <Dropdown value={selectedBlock.props.kind}
        options={shapeKinds()}
        onchange={(v) => setBlockProp('kind', v)} /></label>
    {#if selectedBlock.props.kind === 'line'}
      <label title={ta('tip.shape.label')}>{ta('lbl.shapeLabel')}
        <input value={selectedBlock.props.label ?? ''}
          onchange={(e) => setBlockProp('label', e.target.value.trim() || undefined)} /></label>
    {/if}
  {/snippet}
  <MenuGroup id="shape-shape" defaultOpen title={ta('blocks.shape')} value={shapeKinds().find(([v]) => v === selectedBlock.props.kind)?.[1] ?? ''}>{@render shapeShape()}</MenuGroup>
{:else if area === 'style'}
  {#snippet shapeStroke()}
    <div class="pin-line">
      <label>{ta('lbl.color')}
        <Dropdown value={selectedBlock.props.color}
          options={colorTokens()}
          onchange={(v) => setBlockProp('color', v)} /></label>
      <Pin id="shapeColor" />
    </div>
    <div class="pin-line">
      <label>{ta('lbl.thickness')}
        <input type="number" min="1" max="40" value={selectedBlock.props.thickness}
          onchange={(e) => setBlockProp('thickness', Number(e.target.value))} /></label>
      <Pin id="thickness" />
    </div>
    <label class="gridmenu-snap" title={ta('tip.shape.fill')}>
      <input type="checkbox" checked={Boolean(selectedBlock.props.fill)}
        onchange={(e) => setBlockProp('fill', e.target.checked ? selectedBlock.props.color : null)} />
      {ta('lbl.filled')}
    </label>
  {/snippet}
  {#snippet shapeSize()}
    {#if (selectedBlock.props.kind === 'line' || selectedBlock.props.kind === 'arrow') && designWidth()}
      <!-- A line's length is its frame width, shown in px at the design
           width, so it can be set without reaching the resize corner. -->
      <label title={ta('tip.shapeSize')}>{ta('lbl.length')}
        <input type="number" min="4" max={shapePx(100 - selectedBlock.frame.x)} step="1" value={shapePx(selectedBlock.frame.w)}
          onchange={(e) => setShapeSizePx(Number(e.target.value), false)} /></label>
    {:else if selectedBlock.props.kind === 'line' || selectedBlock.props.kind === 'arrow'}
      <!-- Without a design width the length stays in percent of the content surface -->
      <label>{ta('lbl.length')}
        <input type="number" min="1" max={Math.max(1, Math.round(100 - selectedBlock.frame.x))} step="0.5" value={selectedBlock.frame.w}
          onchange={(e) => setBlockFrame('w', Math.max(1, Math.min(Number(e.target.value), 100 - selectedBlock.frame.x)))} /></label>
    {:else}
      <!-- A shape's size is its frame, shown in px at the design width; the height follows the shape's own ratio -->
      <label title={ta('tip.shapeSize')}>{ta('lbl.sizePx')}
        <input type="number" min="4" max={shapePx(100 - selectedBlock.frame.x)} step="1" value={shapePx(selectedBlock.frame.w)}
          onchange={(e) => setShapeSizePx(Number(e.target.value), true)} /></label>
    {/if}
  {/snippet}
  {@const lineKind = selectedBlock.props.kind === 'line' || selectedBlock.props.kind === 'arrow'}
  <MenuGroup id="shape-stroke" title={ta('group.strokeFill')} value={`${colorTokens().find(([v]) => v === selectedBlock.props.color)?.[1] ?? ''} · ${selectedBlock.props.thickness ?? 2} px`} reset={groupReset('shape-stroke', { color: 'accent', thickness: 2, fill: null })}>{@render shapeStroke()}</MenuGroup>
  {#if lineKind || designWidth()}
    <MenuGroup id="shape-size" title={ta('group.measures')} value={designWidth() ? `${shapePx(selectedBlock.frame.w)} px` : `${selectedBlock.frame.w} %`}>{@render shapeSize()}</MenuGroup>
  {/if}
{/if}
