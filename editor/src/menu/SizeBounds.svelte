<script>
  /* The bounds of a block's base text size, where the size slider ends (ADR-0025), shown while a size is set; empty, each shows the size now. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { SIZE_TEXT, baseTextPx, blockSize, sizeBounds } from '$engine/push-model.js';
  const ed = getContext('urd-editor');
  const block = $derived(ed.selectedBlock);
</script>

{#if blockSize(block) !== 1 || block.phoneSize !== undefined}
  <div class="frame-grid">
    <label title={ta('tip.scaleMin')}>{ta('lbl.scaleMin')}<input type="number" min={SIZE_TEXT.min} max={SIZE_TEXT.max} value={sizeBounds(block).min ?? ''}
      placeholder={String(Math.round(baseTextPx(block) * blockSize(block)))} onchange={(e) => ed.setBlockSizeBound('sizeMin', e.target.value)} /></label>
    <label title={ta('tip.scaleMax')}>{ta('lbl.scaleMax')}<input type="number" min={SIZE_TEXT.min} max={SIZE_TEXT.max} value={sizeBounds(block).max ?? ''}
      placeholder={String(Math.round(baseTextPx(block) * blockSize(block)))} onchange={(e) => ed.setBlockSizeBound('sizeMax', e.target.value)} /></label>
  </div>
{/if}
