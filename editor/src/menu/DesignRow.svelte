<script>
  /* The row that names the selected block's design, with its picture, and opens the design picker over the whole menu, as the calendar's design row does; the designs are a core block's (block-designs.js) or a plugin block's (blockDesigns).
     With `phone` it names and opens the block's phone design instead: the design it draws while narrow (PHONE_DESIGNS in push-model.js).
     Drawn by the row kit's picture row (lib/rows/PictureRow.svelte); the menu sets it first in Style on a setting row that carries its pin (ElementMenu.svelte). */
  import { getContext } from 'svelte';
  import PictureRow from '../lib/rows/PictureRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { blockDesigns, phoneDesignName, phoneDesignOf, SAME_DESIGN } from '../lib/design-sources.js';
  const ed = getContext('urd-editor');
  let { phone = false } = $props();
  const block = $derived(ed.selectedBlock);
  const designs = $derived(blockDesigns(block.type, ed.pluginBlocks));
  const value = $derived(!designs ? '' : phone ? phoneDesignName(designs, block.props) : designs.name(designs.read(block.props)));
  /** The chosen design's picture: the phone's own where a phone design is chosen, the design's where the phone keeps it. */
  const picture = $derived.by(() => {
    if (!designs) return '';
    const id = designs.read(block.props);
    if (!phone) return designs.picture?.(id) ?? '';
    const phoneId = phoneDesignOf(designs, block.props);
    return (phoneId === SAME_DESIGN ? designs.picture?.(id) : designs.phonePicture?.(phoneId)) ?? '';
  });
</script>

<PictureRow label={ta(phone ? 'lbl.phoneDesign' : 'lbl.design')} {value} {picture} title={ta(phone ? 'tip.picker.phoneDesign' : 'tip.picker.design')}
  onclick={phone ? ed.openBlockPhonePicker : ed.openBlockDesignPicker} />
