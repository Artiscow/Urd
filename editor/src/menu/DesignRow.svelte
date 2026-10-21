<script>
  /* The row that names the selected block's design and opens the design picker over the whole menu, as the calendar's design row does; the designs are a core block's (block-designs.js) or a plugin block's (blockDesigns).
     `pin` is the id the setting has in the quick row. */
  import { getContext } from 'svelte';
  import Pin from './Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { blockDesigns } from '../lib/design-sources.js';
  const ed = getContext('urd-editor');
  let { pin = 'design' } = $props();
  const block = $derived(ed.selectedBlock);
  const designs = $derived(blockDesigns(block.type, ed.pluginBlocks));
</script>

<div class="pin-line">
  <button type="button" class="menu-row" title={ta('tip.picker.design')} onclick={ed.openBlockDesignPicker}>
    <span class="menu-group-title">{ta('lbl.design')}</span><span class="menu-group-value">{designs ? designs.name(designs.read(block.props)) : ''}</span>
  </button>
  <Pin id={pin} />
</div>
