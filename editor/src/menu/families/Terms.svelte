<script>
  /* The terms of sale in the element menu (0.7.24.8): the Content area is the text block's (the words written on the page, the whole text's font and size), and the Style area the design it is drawn in, the design on a phone and the look beside them (DocLook). */
  import { getContext } from 'svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import DocLook from '../DocLook.svelte';
  import Text from './Text.svelte';
  import { termsDesign } from '$engine/doc-look.js';
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

{#if area === 'content'}
  <Text area="content" />
{:else if area === 'style'}
  {#snippet look()}
    <!-- The design's look, directly under the design it dresses -->
    <DocLook type="terms" {design} />
  {/snippet}
  <Fold id="terms-design" title={ta('group.appearance')} value={groupChanged(LOOK) ? ta('menu.changed', { n: groupChanged(LOOK) }) : ta('menu.standard')} group={groupOf('terms-design', LOOK)} defaultOpen>{@render look()}</Fold>
{/if}
