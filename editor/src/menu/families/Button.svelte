<script>
  /* The button block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import LinkField from '../../lib/LinkField.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import DesignRow from '../DesignRow.svelte';
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
    <div class="pin-line">
      <LinkField label={ta('lbl.goesTo')} value={linkOf(selectedBlock.props)} onchange={setBlockLink} />
      <Pin id="goesTo" />
    </div>
  {/snippet}
  <MenuGroup id="btn-link" defaultOpen title={ta('group.textLink')} value={linkText(linkOf(selectedBlock.props), { pages: ed.siteDraft?.pages ?? [], here: ed.pageId }) || ta('link.none')}>{@render btnLink()}</MenuGroup>
{:else if area === 'style'}
  {#snippet btnLook()}
    <Setting key="style">
      <DesignRow pin="btnStyle" />
    </Setting>
  {/snippet}
  <MenuGroup id="btn-look" defaultOpen title={ta('group.appearance')} value={selectedBlock.props.style === 'secondary' ? ta('opt.btn.secondary') : ta('opt.btn.primary')} group={groupOf('btn-look', { style: 'primary' })}>{@render btnLook()}</MenuGroup>
{/if}
