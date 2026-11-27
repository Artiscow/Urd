<script>
  /* The text block in the element menu: its Style area, with the alignment, font and size open at its top and the text box as a capability's card. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import WholeText from '../WholeText.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import Capability from '../../lib/rows/Capability.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import BoxStyle from '../BoxStyle.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { textDesign } from '$engine/doc-designs.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

<!-- The words are written on the page, where the text is editable: the text block has no Content of its own here -->
{#if area === 'style'}
  <!-- How the whole text stands: its alignment, its font and its size (the toolbar's own apply to a selection) -->
  {#snippet textType()}
    <Setting pin="align" own={(selectedBlock.props.align ?? 'left') !== 'left'} reset={() => setBlockProp('align', 'left')}>
      <Choice stack label={ta('lbl.align')} title={ta('tip.text.align')} value={selectedBlock.props.align ?? 'left'}
        options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
        onchange={(v) => setBlockProp('align', v)} />
    </Setting>
    <WholeText />
    <!-- Long words: the theme's, hyphenated, or kept whole (ADR-0034) -->
    <Setting source="theme" own={Boolean(selectedBlock.props.words)} reset={() => setBlockProp('words', null)}>
      <Choice stack label={ta('lbl.longWords')} title={ta('tip.text.longWords')} value={selectedBlock.props.words ?? ''}
        options={[['', ta('opt.longWords.theme')], ['whole', ta('opt.longWords.whole')], ['hyphenate', ta('opt.longWords.hyphenate')]]}
        onchange={(v) => setBlockProp('words', v || null)} />
    </Setting>
    {#if textDesign(selectedBlock.props.design) === 'plain'}
      <!-- Text in columns, and the space between them while there is more than one -->
      <Setting own={Boolean(selectedBlock.props.columns)} reset={() => setBlockProps('columns', { columns: null, columnGap: null })}>
        <Choice stack label={ta('lbl.columns')} title={ta('tip.text.columns')} value={String(selectedBlock.props.columns ?? 1)}
          options={['1', '2', '3', '4'].map((n) => [n, n])}
          onchange={(v) => (v === '1' ? setBlockProps('columns', { columns: null, columnGap: null }) : setBlockProp('columns', Number(v)))} />
      </Setting>
      {#if selectedBlock.props.columns > 1}
        <Setting own={selectedBlock.props.columnGap != null} reset={() => setBlockProp('columnGap', null)}>
          <SliderRow label={ta('lbl.columnGap')} value={selectedBlock.props.columnGap ?? 32} min={8} max={96} step={4}
            shown={`${selectedBlock.props.columnGap ?? 32} px`} oninput={(v) => setBlockProp('columnGap', v)} />
        </Setting>
      {/if}
    {/if}
  {/snippet}
  {#snippet textBox()}
    <Setting key="box" pin="textBox">
      <SwitchRow label={ta('lbl.textBoxToggle')} title={ta('tip.blocks.textBox')} checked={Boolean(selectedBlock.props.box)} onchange={(on) => setBlockProp('box', on)} />
    </Setting>
    {#if selectedBlock.props.box}
      <BoxStyle />
    {/if}
  {/snippet}
  <!-- The alignment, the font and the size stand open first in Style, not in a group -->
  {@render textType()}
  <!-- The box, a capability's card; with its switch in Pinned the box's own style goes there with it -->
  <Capability id="text-box" group={groupOf('text-box', { box: false, boxStyle: null })}>{@render textBox()}</Capability>
{/if}
