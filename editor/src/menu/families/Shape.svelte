<script>
  /* The shape block in the element menu: its Content and Style areas, drawn where the menu asks for one. */
  import { getContext } from 'svelte';
  import SelectRow from '../../lib/rows/SelectRow.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import GlyphPicker from '../../lib/GlyphPicker.svelte';
  import NumberRow from '../../lib/rows/NumberRow.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import { pinnedNow } from '../pinned.js';
  import Setting from '../../lib/rows/Setting.svelte';
  import { ta } from '$engine/i18n.js';
  import { colorTokens, lineStyles } from '../options.js';
  import { makeGroupHelpers } from '../groups.js';
  import { ICONS } from '../../lib/icons.js';
  const ed = getContext('urd-editor');
  /** A fold counts the settings it holds now: one whose every setting stands in Pinned is left out, and one of a single setting is that setting alone. */
  const pinned = pinnedNow();
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, setBlockFrame, designWidth, shapePx, setShapeSizePx, themeSwatches } = ed;
  /** The mark a line carries, written as one undo step: a character or a drawn icon, each taking the other's place, or none. */
  const setMark = (mark) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
    delete b.props.icon;
    delete b.props.glyph;
    Object.assign(b.props, mark);
  });
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  <!-- The words and the mark a line carries; the shape itself is the design, first in Style -->
  {#if selectedBlock.props.kind === 'line'}
    {@const marked = Boolean(selectedBlock.props.icon || selectedBlock.props.glyph)}
    <label title={ta('tip.shape.label')}>{ta('lbl.shapeLabel')}
      <input value={selectedBlock.props.label ?? ''}
        onchange={(e) => setBlockProp('label', e.target.value.trim() || undefined)} /></label>
    <div class="ctl-row">
      <span class="row-label" title={ta('tip.shape.mark')}>{ta('lbl.shapeMark')}</span>
      <GlyphPicker value={selectedBlock.props.glyph ?? ''} icon={selectedBlock.props.icon ?? null} blank={ICONS.plus} label={ta('lbl.shapeMark')}
        onpick={(glyph) => setMark({ glyph })}
        onicon={(id) => setMark({ icon: id })}
        onremove={marked ? () => setMark({}) : undefined} removeLabel={ta('ui.removeLineMark')} />
    </div>
  {/if}
{:else if area === 'style'}
  {#snippet shapeStroke()}
    <Setting key="color" pin="shapeColor">
      <ColourRow label={ta('lbl.color')} title={ta('tip.shape.color')} value={selectedBlock.props.color ?? 'accent'} tokens={themeSwatches()} onchange={(v) => setBlockProp('color', v)} />
    </Setting>
    <!-- Thickness draws the line, the arrow and the stroke of an unfilled circle or rectangle; Filled fills a circle or a rectangle (a triangle is always filled) -->
    {#if ['line', 'arrow'].includes(selectedBlock.props.kind) || (['circle', 'rect'].includes(selectedBlock.props.kind) && !selectedBlock.props.fill)}
      <Setting key="thickness" pin="thickness">
        <NumberRow label={ta('lbl.thickness')} title={ta('tip.shape.thickness')} value={selectedBlock.props.thickness ?? 2} min={1} max={40} onchange={(v) => setBlockProp('thickness', v)} />
      </Setting>
    {/if}
    {#if ['line', 'arrow'].includes(selectedBlock.props.kind)}
      <Setting key="lineStyle">
        <SelectRow label={ta('lbl.lineStyle')} title={ta('tip.shape.lineStyle')} value={selectedBlock.props.lineStyle ?? 'solid'} options={lineStyles()} onchange={(v) => setBlockProp('lineStyle', v)} />
      </Setting>
    {/if}
    {#if ['circle', 'rect'].includes(selectedBlock.props.kind)}
      <Setting key="fill">
        <SwitchRow label={ta('lbl.filled')} title={ta('tip.shape.fill')} checked={Boolean(selectedBlock.props.fill)} onchange={(on) => setBlockProp('fill', on ? true : null)} />
      </Setting>
    {/if}
    {#if (selectedBlock.props.kind === 'line' || selectedBlock.props.kind === 'arrow') || designWidth()}
      {@render shapeSize()}
    {/if}
  {/snippet}
  {#snippet shapeSize()}
    {#if (selectedBlock.props.kind === 'line' || selectedBlock.props.kind === 'arrow') && designWidth()}
      <!-- A line's length is its frame width, shown in px at the design width. -->
      <label title={ta('tip.shapeSize')}>{ta('lbl.length')}
        <input type="number" min="4" max={shapePx(100 - selectedBlock.frame.x)} step="1" value={shapePx(selectedBlock.frame.w)}
          onchange={(e) => setShapeSizePx(Number(e.target.value), false)} /></label>
    {:else if selectedBlock.props.kind === 'line' || selectedBlock.props.kind === 'arrow'}
      <!-- Without a design width the length stays in percent of the content surface -->
      <label title={ta('tip.shape.length')}>{ta('lbl.length')}
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
  {@const stroked = lineKind || (['circle', 'rect'].includes(selectedBlock.props.kind) && !selectedBlock.props.fill)}
  {@const fillable = ['circle', 'rect'].includes(selectedBlock.props.kind)}
  {@const colourName = colorTokens().find(([v]) => v === (selectedBlock.props.color ?? 'accent'))?.[1] ?? ta('menu.ownColour')}
  {@const styled = lineKind && (selectedBlock.props.lineStyle ?? 'solid') !== 'solid'}
  <Fold id="shape-look" title={ta('group.appearance')} value={`${colourName}${stroked ? ` · ${selectedBlock.props.thickness ?? 2} px` : ''}${styled ? ` · ${ta(`opt.lineStyle.${selectedBlock.props.lineStyle}`)}` : ''}`}
    rows={pinned.left('shapeColor') + (stroked ? pinned.left('thickness') : 0) + (lineKind ? 1 : 0) + (fillable ? 1 : 0) + (lineKind || designWidth() ? 1 : 0)}
    group={groupOf('shape-look', { color: 'accent', thickness: 2, fill: null, lineStyle: 'solid' })}>{@render shapeStroke()}</Fold>
{/if}
