<script>
  /* The text block in the element menu (0.7.26.2): its Style area, and the settings it writes through the editor handle; the words are written on the page.
     A text block is plain text; the document designs are the terms of sale's (Terms.svelte), which draws the whole text's font and size as this one does (WholeText.svelte). */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import WholeText from '../WholeText.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import { pinnedNow } from '../pinned.js';
  import Setting from '../../lib/rows/Setting.svelte';
  import BoxStyle from '../BoxStyle.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  /** A fold counts the settings it holds now: one whose every setting stands in Pinned is left out, and one of a single setting is that setting alone. */
  const pinned = pinnedNow();
  const selectedBlock = $derived(ed.selectedBlock);
  const viewMode = $derived(ed.viewMode);
  const { setBlockProp, setBlockProps } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

<!-- The words are written on the page, where the text is editable: the text block has no Content of its own here -->
{#if area === 'style'}
  <!-- How the whole text stands: its alignment, and in the desktop view its font and size (the toolbar's own apply to a selection) -->
  {#snippet textType()}
    <Setting key="align" pin="align">
      <Choice stack label={ta('lbl.align')} title={ta('tip.text.align')} value={selectedBlock.props.align ?? 'left'}
        options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
        onchange={(v) => setBlockProp('align', v)} />
    </Setting>
    <WholeText />
  {/snippet}
  {#snippet textBox()}
    <Setting key="box" shown={ta('common.off')} pin="textBox">
      <SwitchRow label={ta('lbl.textBoxToggle')} title={ta('tip.blocks.textBox')} checked={Boolean(selectedBlock.props.box)} onchange={(on) => setBlockProp('box', on)} />
    </Setting>
    {#if selectedBlock.props.box}
      <BoxStyle />
    {/if}
  {/snippet}
  <Fold id="text-type" title={ta('group.typography')} value={pinned.has('align') ? '' : { left: ta('common.left'), center: ta('common.center'), right: ta('common.right') }[selectedBlock.props.align ?? 'left']}
    rows={pinned.left('align') + (viewMode === 'desktop' ? 2 : 0)} group={groupOf('text-type', { align: 'left' })}>{@render textType()}</Fold>
  <!-- The box's own style goes with the text box's switch into Pinned; off, the switch stands alone -->
  <Fold id="text-box" title={ta('group.textBox')} value={selectedBlock.props.box ? ta('common.on') : ta('common.off')}
    rows={pinned.has('textBox') ? 0 : selectedBlock.props.box ? 2 : 1} group={groupOf('text-box', { box: false, boxStyle: null })}>{@render textBox()}</Fold>
{/if}
