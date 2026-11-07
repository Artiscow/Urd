<script>
  /* The terms of sale in the element menu (0.7.24.8): the Content area is the text block's (the words written on the page, the whole text's font and size), and the Style area the design it is drawn in, the design on a phone and the look beside them (DocLook). */
  import { getContext } from 'svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import DesignRow from '../DesignRow.svelte';
  import DocLook from '../DocLook.svelte';
  import Text from './Text.svelte';
  import { termsDesign } from '$engine/doc-look.js';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProps } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const design = $derived(termsDesign(selectedBlock.props.design));
  const LOOK = { design: 'long', phoneDesign: null, contentsSide: null, placement: null, accent: null, headingColor: null, cardColor: null, rules: null, corners: null, headingFont: null };
</script>

{#if area === 'content'}
  <Text area="content" />
{:else if area === 'style'}
  {#snippet look()}
    <Setting key="design">
      <DesignRow pin="design" />
    </Setting>
    <!-- The design it draws while narrow, on a phone or in a narrow column, directly under the design -->
    <Setting key="phoneDesign">
      <DesignRow phone pin="phoneDesign" />
    </Setting>
    <!-- The design's look, directly under the design it dresses -->
    <DocLook type="terms" {design} />
  {/snippet}
  <Fold id="terms-design" title={ta('group.appearance')} value={ta(`opt.textDesign.${design}`)} group={groupOf('terms-design', LOOK)} defaultOpen>{@render look()}</Fold>
{/if}
