<script>
  /* The button block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import LinkField from '../../lib/LinkField.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  import { linkOf, linkText } from '../../lib/link-edit.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps, setBlockLink } = ed;
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  {#snippet btnLink()}
    <label title={ta('tip.button.text')}>{ta('blocks.text')}
      <input value={selectedBlock.props.label}
        onchange={(e) => setBlockProp('label', e.target.value)} /></label>
    <Setting pin="goesTo">
      <LinkField label={ta('lbl.goesTo')} value={linkOf(selectedBlock.props)} onchange={setBlockLink} />
    </Setting>
  {/snippet}
  <Fold id="btn-link" defaultOpen title={ta('group.textLink')} value={linkText(linkOf(selectedBlock.props), { pages: ed.siteDraft?.pages ?? [], here: ed.pageId }) || ta('link.none')}>{@render btnLink()}</Fold>
{/if}
