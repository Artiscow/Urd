<script>
  /* The button block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps, buttonTargets, setButtonTarget } = ed;
  const { groupReset, groupChanged } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  {#snippet btnLink()}
    <label>{ta('blocks.text')}
      <input value={selectedBlock.props.label}
        onchange={(e) => setBlockProp('label', e.target.value)} /></label>
    <div class="pin-line">
      <label>{ta('lbl.goesTo')}
        <Dropdown value={selectedBlock.props.page ?? '__href'} options={buttonTargets()} onchange={setButtonTarget} /></label>
      <Pin id="goesTo" />
    </div>
    {#if !selectedBlock.props.page}
      <input placeholder={ta('ph.url')}
        value={selectedBlock.props.href === '#' ? '' : selectedBlock.props.href ?? ''}
        onchange={(e) => setBlockProp('href', e.target.value || null)} />
    {/if}
  {/snippet}
  <MenuGroup id="btn-link" title={ta('group.textLink')} value={buttonTargets().find(([id]) => id === (selectedBlock.props.page ?? '__href'))?.[1] ?? ''}>{@render btnLink()}</MenuGroup>
{:else if area === 'style'}
  {#snippet btnLook()}
    <div class="pin-line">
      <label>{ta('lbl.style')}
        <Dropdown value={selectedBlock.props.style}
          options={[['primary', ta('opt.btn.primary')], ['secondary', ta('opt.btn.secondary')]]}
          onchange={(v) => setBlockProp('style', v)} /></label>
      <Pin id="btnStyle" />
    </div>
  {/snippet}
  <MenuGroup id="btn-look" title={ta('group.appearance')} value={selectedBlock.props.style === 'secondary' ? ta('opt.btn.secondary') : ta('opt.btn.primary')} reset={groupReset('btn-look', { style: 'primary' })}>{@render btnLook()}</MenuGroup>
{/if}
