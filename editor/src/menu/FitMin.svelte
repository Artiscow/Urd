<script>
  /* How far a block may shrink below the design width, shown while it shrinks at all.
     It stands under the narrow-screen choice it belongs to: in Placement, or in Pinned while that choice is pinned (ElementMenu.svelte). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import SliderRow from '../lib/rows/SliderRow.svelte';
  const ed = getContext('urd-editor');
  const block = $derived(ed.selectedBlock);
  const percent = $derived(Math.round((block.fitMin ?? 0.6) * 100));
</script>

{#if block.fit}
  <SliderRow label={ta('lbl.fitMin')} title={ta('tip.fitMin')} min={1} max={100} step={1} value={percent} shown={`${percent} %`}
    oninput={(v) => ed.setBlockFitMin(v / 100)} />
{/if}
