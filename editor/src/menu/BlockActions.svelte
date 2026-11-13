<script>
  /* The selected block's actions in the element menu's head, as on its bar and in its right-click menu: duplicate, the layer order and delete, each at the size of the head's buttons.
     Delete acts at the first press, in the dark red of a removal and with a bin, so it never reads as a way to close the menu; an undo takes it back. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import IconButton from '../lib/rows/IconButton.svelte';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');
  const block = $derived(ed.selectedBlock);
</script>

{#if block}
  <span class="block-actions" role="group" aria-label={ta('canvas.ctx.label')}>
    <IconButton icon={ICONS.copy} label={ta('canvas.ctx.duplicate')} onclick={() => ed.bridge?.sendDuplicate()} />
    <IconButton icon={ICONS.up} label={ta('canvas.ctx.toFront')} onclick={() => ed.setBlockLayer(1)} />
    <IconButton icon={ICONS.down} label={ta('canvas.ctx.toBack')} onclick={() => ed.setBlockLayer(-1)} />
    <IconButton icon={ICONS.bin} danger label={ta('canvas.ctx.delete')} onclick={() => ed.handleDelete({ sectionId: block.sectionId, blockId: block.blockId })} />
  </span>
{/if}
