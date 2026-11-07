<script>
  /* The privacy block in the element menu: whether it opens with the page's heading, and its design with the look beside it (doc-look.js).
     What the page says comes from the site's settings, so nothing else is set here. */
  import { getContext } from 'svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import DocLook from '../DocLook.svelte';
  import { ta } from '$engine/i18n.js';
  import { privacyDesign } from '$engine/doc-look.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps } = ed;
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const design = $derived(privacyDesign(selectedBlock.props.design));
  const LOOK = { contentsSide: null, placement: null, accent: null, headingColor: null, cardColor: null, rules: null, corners: null, headingFont: null, font: null };
</script>

{#if area === 'content'}
  <label title={ta('tip.privacy.heading')} class="gridmenu-snap">
    <input type="checkbox" checked={selectedBlock.props.heading === true}
      onchange={(e) => setBlockProp('heading', e.target.checked)} />
    {ta('lbl.privacyHeading')}
  </label>
{:else if area === 'style'}
  {#snippet privacyLook()}
    <DocLook type="privacy" {design} />
  {/snippet}
  <Fold id="privacy-look" defaultOpen title={ta('group.appearance')} value={groupChanged(LOOK) ? ta('menu.changed', { n: groupChanged(LOOK) }) : ta('menu.standard')}
    group={groupOf('privacy-look', LOOK)}>{@render privacyLook()}</Fold>
{/if}
