<script>
  /* The row that names the selected block's design and opens the design picker over the whole menu, as the calendar's design row does; the designs are a core block's (block-designs.js) or a plugin block's (blockDesigns).
     With `phone` it names and opens the block's phone design instead: the design it draws while narrow (PHONE_DESIGNS in push-model.js).
     `pin` is the id the setting has in the quick row. */
  import { getContext } from 'svelte';
  import Pin from './Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { blockDesigns, phoneDesignName } from '../lib/design-sources.js';
  const ed = getContext('urd-editor');
  let { pin = 'design', phone = false } = $props();
  const block = $derived(ed.selectedBlock);
  const designs = $derived(blockDesigns(block.type, ed.pluginBlocks));
  const value = $derived(!designs ? '' : phone ? phoneDesignName(designs, block.props) : designs.name(designs.read(block.props)));
</script>

<div class="pin-line">
  <button type="button" class="menu-row" title={ta(phone ? 'tip.picker.phoneDesign' : 'tip.picker.design')} onclick={phone ? ed.openBlockPhonePicker : ed.openBlockDesignPicker}>
    <span class="menu-group-title">{ta(phone ? 'lbl.phoneDesign' : 'lbl.design')}</span><span class="menu-group-value">{value}</span>
  </button>
  <Pin id={pin} />
</div>
