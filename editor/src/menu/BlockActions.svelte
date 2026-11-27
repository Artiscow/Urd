<script>
  /* The selected block's actions in the element menu's head: duplicate, the layer order, greyed on the phone for a block that flows, and delete. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import IconButton from '../lib/rows/IconButton.svelte';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');
  const block = $derived(ed.selectedBlock);
  const noLayer = $derived(ed.viewMode === 'mobile' && block?.mobileRow === null);
</script>

{#if block}
  <span class="block-actions" role="group" aria-label={ta('canvas.ctx.label')}>
    <IconButton icon={ICONS.copy} label={ta('canvas.ctx.duplicate')} onclick={() => ed.bridge?.sendDuplicate()} />
    <IconButton icon={ICONS.up} label={ta('canvas.ctx.toFront')} disabled={noLayer} onclick={() => ed.setBlockLayer(1)} />
    <IconButton icon={ICONS.down} label={ta('canvas.ctx.toBack')} disabled={noLayer} onclick={() => ed.setBlockLayer(-1)} />
    <IconButton icon={ICONS.bin} danger label={ta('canvas.ctx.delete')} onclick={() => ed.handleDelete({ sectionId: block.sectionId, blockId: block.blockId })} />
  </span>
{/if}
