<script>
  /* The buttons that open the design picker for an element's looks, in an even grid, drawn unless every one of their settings stands in Pinned. */
  import { pinnedNow } from '../../menu/pinned.js';
  let { pins, children } = $props();
  const pinned = pinnedNow();
</script>

{#if !pinned.all(...pins)}
  <div class="look-rows">{@render children()}</div>
{/if}
