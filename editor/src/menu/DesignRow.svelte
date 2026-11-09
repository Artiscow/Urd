<script>
  /* The selected block's design, as Urd settings «Designs» asks: the row that names it, with its picture, and opens the design picker over the whole menu, or the designs' pictures in place (lib/rows/LookChoice.svelte); the designs are a core block's (block-designs.js) or a plugin block's (blockDesigns).
     With `phone` it is always the row, naming and opening the block's phone design instead: the design it draws while narrow (PHONE_DESIGNS in push-model.js).
     The menu sets it first in Style on a setting row that carries its pin (ElementMenu.svelte). */
  import { getContext } from 'svelte';
  import PictureRow from '../lib/rows/PictureRow.svelte';
  import LookChoice from '../lib/rows/LookChoice.svelte';
  import { ta } from '$engine/i18n.js';
  import { blockDesigns, phoneDesignName, phoneDesignOf, pictureList, SAME_DESIGN } from '../lib/design-sources.js';
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

{#if phone}
  <PictureRow label={ta('lbl.phoneDesign')} {value} {picture} title={ta('tip.picker.phoneDesign')} onclick={ed.openBlockPhonePicker} />
{:else}
  <LookChoice label={ta('lbl.design')} {value} {picture} title={ta('tip.picker.design')} current={designs?.read(block.props) ?? null}
    designs={designs ? () => pictureList(designs) : null} onpick={(id) => ed.setBlockProp(designs.prop, id)} onopen={ed.openBlockDesignPicker} />
{/if}
