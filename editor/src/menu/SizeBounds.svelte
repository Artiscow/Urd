<script>
  /* The bounds the owner may give a block's base text, where the size slider then ends (ADR-0025 decision 6), shown only while a size is set, side by side so the menu keeps its height; empty, each shows the base text's size now.
     It stands under the size it belongs to: in Placement, or in Pinned while the size is pinned (ElementMenu.svelte). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { SIZE_TEXT, baseTextPx, blockSize, sizeBounds } from '$engine/push-model.js';
  const ed = getContext('urd-editor');
  const block = $derived(ed.selectedBlock);
</script>

{#if blockSize(block) !== 1}
  <div class="frame-grid">
    <label title={ta('tip.scaleMin')}>{ta('lbl.scaleMin')}<input type="number" min={SIZE_TEXT.min} max={SIZE_TEXT.max} value={sizeBounds(block).min ?? ''}
      placeholder={String(Math.round(baseTextPx(block) * blockSize(block)))} onchange={(e) => ed.setBlockSizeBound('sizeMin', e.target.value)} /></label>
    <label title={ta('tip.scaleMax')}>{ta('lbl.scaleMax')}<input type="number" min={SIZE_TEXT.min} max={SIZE_TEXT.max} value={sizeBounds(block).max ?? ''}
      placeholder={String(Math.round(baseTextPx(block) * blockSize(block)))} onchange={(e) => ed.setBlockSizeBound('sizeMax', e.target.value)} /></label>
  </div>
{/if}
