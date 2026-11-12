<script>
  /* The buttons that open the design picker for an element's looks, side by side in an even grid (`.look-rows` in app.css).
     Drawn only while one of its settings stands here and not every one in Pinned (`pins`, read as the setting rows read it, menu/pinned.js), so no area holds an empty part. */
  import { pinnedNow } from '../../menu/pinned.js';
  let { pins, children } = $props();
  const pinned = pinnedNow();
</script>

{#if !pinned.all(...pins)}
  <div class="look-rows">{@render children()}</div>
{/if}
