<script>
  /* The text block in the element menu (0.7.26.2): its Style area, the alignment and the whole text's font and size open at its top and the text box as a capability's card (ADR-0031), and the settings it writes through the editor handle; the words are written on the page.
     A text block is plain text; the document designs are the terms of sale's (Terms.svelte), which draws the whole text's font and size as this one does (WholeText.svelte). */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import WholeText from '../WholeText.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import Capability from '../../lib/rows/Capability.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import BoxStyle from '../BoxStyle.svelte';
  import { ta } from '$engine/i18n.js';
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
  <!-- The box a capability (ADR-0031): a card while the text stands in one, or was given one this session; with its switch in Pinned the box's own style goes there with it -->
  <Capability id="text-box" group={groupOf('text-box', { box: false, boxStyle: null })}>{@render textBox()}</Capability>
{/if}
