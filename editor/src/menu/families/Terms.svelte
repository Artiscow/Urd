<script>
  /* The terms of sale in the element menu: the words are written on the page; Style holds the look of its design (DocLook) and the whole text's font and size. */
  import { getContext } from 'svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import DocLook from '../DocLook.svelte';
  import WholeText from '../WholeText.svelte';
  import { termsDesign } from '$engine/doc-designs.js';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProps } = ed;
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const design = $derived(termsDesign(selectedBlock.props.design));
  const LOOK = { contentsSide: null, placement: null, accent: null, headingColor: null, cardColor: null, rules: null, corners: null, headingFont: null };
</script>

{#if area === 'style'}
  {#snippet look()}
    <!-- The design's look, directly under the design it dresses -->
    <DocLook type="terms" {design} />
  {/snippet}
  <Fold id="terms-design" title={ta('group.appearance')} value={groupChanged(LOOK) ? ta('menu.changed', { n: groupChanged(LOOK) }) : ta('menu.standard')} group={groupOf('terms-design', LOOK)} defaultOpen>{@render look()}</Fold>
  <Fold id="terms-type" title={ta('group.typography')} value="" rows={2}><WholeText /></Fold>
{/if}
